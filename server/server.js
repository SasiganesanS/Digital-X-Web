const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const rateLimit = require('express-rate-limit');

const { runQuery, getQuery, allQuery } = require('./db');
const { generateProjectBriefPdf } = require('./pdfGenerator');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MARKETING_EMAIL = process.env.TEST_MODE === 'true' && process.env.TEST_EMAIL
  ? process.env.TEST_EMAIL
  : (process.env.MARKETING_EMAIL || process.env.ADMIN_EMAIL || 'marketing@prasklatechnology.com');
const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME || process.env.EMAIL_FROM_NAME || 'Praskla Digital X';
const SMTP_FROM_EMAIL = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USERNAME || process.env.SMTP_USER || process.env.MAIL_USER || MARKETING_EMAIL;
const ADMIN_EMAIL = MARKETING_EMAIL;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Storage Configuration for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip',
    'application/x-zip-compressed',
    'text/plain',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} is not allowed.`), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit per file
  fileFilter,
});

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60, // Limit each IP to 60 requests per windowMs
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
});
app.use('/api/', apiLimiter);

// Nodemailer Transporter Setup (Fallback Engine)
const createTransporter = () => {
  const host = process.env.SMTP_HOST || process.env.MAIL_HOST || 'smtp.hostinger.com';
  const port = parseInt(process.env.SMTP_PORT || process.env.MAIL_PORT || '465');
  const isSecure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USERNAME || process.env.SMTP_USER || process.env.MAIL_USER || SMTP_FROM_EMAIL;
  const pass = process.env.SMTP_PASSWORD || process.env.MAIL_PASSWORD || process.env.SMTP_PASS || process.env.EMAIL_PASS || '';

  return nodemailer.createTransport({
    host,
    port,
    secure: isSecure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

// HTML Email Template Compiler
const loadEmailTemplate = (templateName, variables = {}) => {
  try {
    const filePath = path.join(__dirname, 'templates', `${templateName}.html`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    let content = fs.readFileSync(filePath, 'utf8');
    Object.keys(variables).forEach((key) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      content = content.replace(regex, variables[key] || '');
    });
    return content;
  } catch (err) {
    console.error(`Error loading email template ${templateName}:`, err.message);
    return null;
  }
};

// Universal Email Dispatcher (Primary Mail/PY REST API Engine, Fallback Hostinger SMTP Engine)
const dispatchEmail = async ({ to, subject, html, template, variables }) => {
  const mailApiUrl = process.env.MAIL_API_URL;
  const apiKey = process.env.MAIL_API_KEY || process.env.SMTP_API_KEY;
  const mailOrigin = process.env.MAIL_API_ORIGIN || 'https://prasklatechnology.com';

  // 1. Primary Engine: Mail/PY REST API
  if (mailApiUrl && apiKey) {
    try {
      let payload;
      if (template && !html) {
        payload = {
          api_key: apiKey,
          from_name: SMTP_FROM_NAME,
          to,
          template,
          variables,
        };
      } else {
        payload = {
          api_key: apiKey,
          from_name: SMTP_FROM_NAME,
          to,
          subject,
          html,
        };
      }

      const res = await fetch(mailApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': mailOrigin,
          'Authorization': `Bearer ${apiKey}`,
          'X-API-Key': apiKey,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success !== false) {
        console.log(`[PRIMARY MAIL API SUCCESS] Email sent to ${to} (Request ID: ${data.request_id || 'OK'})`);
        return true;
      }
      console.warn(`[PRIMARY MAIL API WARN] API dispatch failed for ${to}, trying Fallback SMTP:`, data.error || data.message);
    } catch (apiErr) {
      console.warn(`[PRIMARY MAIL API WARN] API error for ${to}, trying Fallback SMTP:`, apiErr.message);
    }
  }

  // 2. Fallback Engine: Hostinger / Standard SMTP
  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: `"${SMTP_FROM_NAME}" <${SMTP_FROM_EMAIL}>`,
      to,
      subject,
      html,
    });
    console.log(`[FALLBACK SMTP SUCCESS] Email sent to ${to} via SMTP. Message ID: ${info.messageId}`);
    return true;
  } catch (mailErr) {
    console.error(`[SMTP ERROR] Could not send email to ${to}:`, mailErr.message);
    return false;
  }
};

// ID Generators
const generateLeadId = () => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `PDX-LEAD-${dateStr}-${randomSuffix}`;
};

const generateApplicationId = () => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `PDX-${dateStr}-${randomSuffix}`;
};

// ===================================================================
// ROUTE 1: QUICK REACH US ENQUIRY (/api/contact)
// ===================================================================
app.post('/api/contact', async (req, res) => {
  try {
    const data = req.body.formData || req.body;
    const { name, email, phone, company, interestedService, message, sourcePage } = data;

    // Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields (Name, Email, Phone, Message are required).',
      });
    }

    const leadId = generateLeadId();
    const timestamp = new Date().toISOString();

    // 1. Save to Database FIRST
    await runQuery(
      `INSERT INTO leads (lead_id, full_name, email, phone, company, interested_service, message, source_page)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        leadId,
        name.trim(),
        email.trim(),
        phone.trim(),
        company ? company.trim() : '',
        interestedService || 'General Inquiry',
        message.trim(),
        sourcePage || 'Website Reach Us Modal',
      ]
    );

    // 2. Prepare & Send Admin Email (Digital X - Admin Template ONLY to MARKETING_EMAIL)
    const adminTemplateVars = {
      LEAD_ID: leadId,
      NAME: name.trim(),
      EMAIL: email.trim(),
      PHONE: phone.trim(),
      COMPANY: company ? company.trim() : 'N/A',
      SERVICE: interestedService || 'General Inquiry',
      MESSAGE: message.trim(),
      SOURCE_PAGE: sourcePage || 'Website Reach Us Modal',
      DATE: new Date(timestamp).toLocaleString(),
    };

    const fallbackAdminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #111; line-height: 1.6; border: 1px solid #eee; padding: 24px; borderRadius: 12px;">
        <h2 style="color: #E31D2E; margin-top: 0;">New Website Enquiry — Praskla Digital X</h2>
        <p style="background: #F8F9FA; padding: 10px 14px; border-left: 4px solid #E31D2E; font-weight: bold;">
          Lead ID: ${leadId}
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 6px 0; font-weight: bold; width: 140px;">Full Name:</td><td>${name}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Phone:</td><td><a href="tel:${phone}">${phone}</a></td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Company:</td><td>${company || 'N/A'}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Interested Service:</td><td>${interestedService || 'N/A'}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Submission Date/Time:</td><td>${new Date(timestamp).toLocaleString()}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Source Page:</td><td>${sourcePage || 'Website Reach Us Modal'}</td></tr>
        </table>
        <div style="margin-top: 16px; padding: 14px; background: #FAF9F6; border-radius: 8px;">
          <strong style="display: block; margin-bottom: 6px;">Client Message:</strong>
          <p style="margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    `;
    const adminHtml = loadEmailTemplate('digital-x-admin', adminTemplateVars) || fallbackAdminHtml;

    // Admin Notification -> ONLY to marketing@prasklatechnology.com
    const adminEmailSent = await dispatchEmail({
      to: MARKETING_EMAIL,
      subject: `New Website Enquiry — ${name.trim()} — ${leadId}`,
      html: adminHtml,
      template: process.env.ADMIN_SLUG || 'digital X-admin',
      variables: adminTemplateVars,
    });

    // 3. Prepare & Send Thank You Email (Digital X - User Template ONLY to User Email)
    const userTemplateVars = {
      LEAD_ID: leadId,
      NAME: name.trim(),
      EMAIL: email.trim(),
      SERVICE: interestedService || 'General Inquiry',
    };
    const userHtml = loadEmailTemplate('digital-x-user', userTemplateVars);
    if (userHtml) {
      // Thank You Email -> ONLY to the user's email address (email.trim())
      await dispatchEmail({
        to: email.trim(),
        subject: 'Thank You for Contacting Praskla Digital X',
        html: userHtml,
        template: process.env.USER_SLUG || 'digital X- User',
        variables: userTemplateVars,
      });
    }

    res.status(200).json({
      success: true,
      leadId,
      emailSent: adminEmailSent,
      message: 'Message received! Thanks for contacting Praskla Digital X. Our team will review your enquiry and get back to you shortly.',
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while saving your inquiry. Please try again.',
    });
  }
});

// ===================================================================
// ROUTE 2: COMPLETE PROJECT APPLICATION (/api/project-application)
// ===================================================================
app.post('/api/project-application', upload.any(), async (req, res) => {
  try {
    let data = req.body;

    // Handle nested stringified JSON if passed as formData
    if (typeof data.payload === 'string') {
      try {
        data = JSON.parse(data.payload);
      } catch (e) {
        console.warn('Could not parse stringified payload JSON');
      }
    }

    const {
      companyName,
      businessType,
      industry,
      companyWebsite,
      yearsInBusiness,
      businessDescription,
      fullName,
      designation,
      email,
      phone,
      altPhone,
      whatsapp,
      preferredContactMethod,
      officeAddress,
      city,
      state,
      country,
      postalCode,
      hasLogo,
      existingBrandGuidelines,
      existingBrandColors,
      preferredColors,
      colorsToAvoid,
      existingFont,
      preferredFont,
      typographyPreferences,
      existingPatterns,
      referenceWebsites,
      projectName,
      projectType,
      projectDescription,
      existingWebsite,
      existingUrl,
      currentProblems,
      requiredFeatures,
      requiredPages,
      integrations,
      competitors,
      primaryGoal,
      targetAudience,
      businessObjectives,
      expectedOutcome,
      problemsToSolve,
      successCriteria,
      desiredStartDate,
      desiredCompletionDate,
      deadline,
      isDeadlineFlexible,
      reasonForDeadline,
      budgetRange,
      competitorWebsites,
      inspirationWebsites,
      referenceDesigns,
      socialMediaLinks,
      additionalRequirements,
      specialRequirements,
      technicalRequirements,
      restrictions,
      additionalNotes,
      quotationData,
    } = data;

    // Validate required fields
    if (!companyName || !fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields (Company Name, Full Name, Email, Phone).',
      });
    }

    const applicationId = generateApplicationId();
    const timestamp = new Date().toISOString();

    // Store File Metadata in DB if files were uploaded
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const fileId = `FILE-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        await runQuery(
          `INSERT INTO uploaded_files (file_id, application_id, field_name, original_name, stored_name, mime_type, size_bytes, file_path)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            fileId,
            applicationId,
            file.fieldname,
            file.originalname,
            file.filename,
            file.mimetype,
            file.size,
            file.path,
          ]
        );
      }
    }

    // Save Complete Application to Database FIRST
    await runQuery(
      `INSERT INTO project_applications (
        application_id, company_name, business_type, industry, company_website, years_in_business, business_description,
        full_name, designation, email, phone, alt_phone, whatsapp, preferred_contact_method, office_address, city, state, country, postal_code,
        has_logo, existing_brand_guidelines, existing_brand_colors, preferred_colors, colors_to_avoid, existing_font, preferred_font, typography_preferences, existing_patterns, reference_websites,
        project_name, project_type, project_description, existing_website, existing_url, current_problems, required_features, required_pages, integrations, competitors,
        primary_goal, target_audience, business_objectives, expected_outcome, problems_to_solve, success_criteria,
        desired_start_date, desired_completion_date, deadline, is_deadline_flexible, reason_for_deadline, budget_range,
        competitor_websites, inspiration_websites, reference_designs, social_media_links,
        additional_requirements, special_requirements, technical_requirements, restrictions, additional_notes, quotation_data
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        applicationId,
        companyName.trim(),
        businessType || '',
        industry || '',
        companyWebsite || '',
        yearsInBusiness || '',
        businessDescription || '',
        fullName.trim(),
        designation || '',
        email.trim(),
        phone.trim(),
        altPhone || '',
        whatsapp || '',
        preferredContactMethod || 'Email',
        officeAddress || '',
        city || '',
        state || '',
        country || 'India',
        postalCode || '',
        hasLogo || 'No',
        existingBrandGuidelines || 'No',
        existingBrandColors || '',
        preferredColors || '',
        colorsToAvoid || '',
        existingFont || '',
        preferredFont || '',
        typographyPreferences || '',
        existingPatterns || '',
        referenceWebsites || '',
        projectName || '',
        projectType || '',
        projectDescription || '',
        existingWebsite || '',
        existingUrl || '',
        currentProblems || '',
        requiredFeatures || '',
        requiredPages || '',
        integrations || '',
        competitors || '',
        primaryGoal || '',
        targetAudience || '',
        businessObjectives || '',
        expectedOutcome || '',
        problemsToSolve || '',
        successCriteria || '',
        desiredStartDate || '',
        desiredCompletionDate || '',
        deadline || '',
        isDeadlineFlexible || '',
        reasonForDeadline || '',
        budgetRange || '',
        competitorWebsites || '',
        inspirationWebsites || '',
        referenceDesigns || '',
        socialMediaLinks || '',
        additionalRequirements || '',
        specialRequirements || '',
        technicalRequirements || '',
        restrictions || '',
        additionalNotes || '',
        typeof quotationData === 'object' ? JSON.stringify(quotationData) : quotationData || '',
      ]
    );

    // Save Quotation if present
    if (quotationData) {
      const q = typeof quotationData === 'string' ? JSON.parse(quotationData) : quotationData;
      const quotationId = `QUOTE-${Date.now()}`;
      await runQuery(
        `INSERT INTO quotations (quotation_id, application_id, service_id, package_id, duration_label, duration_months, addons_json, deliverables_json, grand_total)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          quotationId,
          applicationId,
          q.platform?.id || q.serviceId || '',
          q.plan?.id || q.packageId || '',
          q.durationLabel || '',
          q.durationMonths || 1,
          JSON.stringify(q.addons || []),
          JSON.stringify(q.deliverables || []),
          q.configuredPrice || q.grandTotal || 0,
        ]
      );
    }

    // Generate PDF Project Brief
    const pdfPayload = { ...data, applicationId };
    let pdfBuffer = null;
    try {
      pdfBuffer = await generateProjectBriefPdf(pdfPayload);
    } catch (pdfErr) {
      console.error('Error generating PDF Project Brief:', pdfErr);
    }

    let emailSentToAdmin = false;
    let emailSentToClient = false;

    // Send Emails in Background / Try Catch
    try {
      const transporter = createTransporter();

      // Google Sheet / Forms Webhook Sync (Optional)
      if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
        try {
          await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              applicationId,
              timestamp,
              companyName,
              businessType,
              industry,
              companyWebsite,
              yearsInBusiness,
              businessDescription,
              fullName,
              designation,
              email,
              phone,
              altPhone,
              whatsapp,
              preferredContactMethod,
              city,
              state,
              country,
              projectName,
              projectType,
              projectDescription,
              primaryGoal,
              targetAudience,
              requiredFeatures,
              desiredStartDate,
              deadline,
              budgetRange,
              competitorWebsites,
              inspirationWebsites,
              additionalRequirements
            }),
          });
          console.log('[GOOGLE SYNC] Project application synced to Google Sheet');
        } catch (gErr) {
          console.warn('[GOOGLE SYNC WARN] Error syncing to Google Webhook:', gErr.message);
        }
      }

      // 1. Admin Email (Sent to marketing@prasklatechnology.com)
      const adminMailOptions = {
        from: `"${SMTP_FROM_NAME}" <${SMTP_FROM_EMAIL}>`,
        to: MARKETING_EMAIL,
        subject: `New Project Application — ${companyName} — ${applicationId}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { margin: 0; padding: 0; background-color: #f4f5f7; font-family: 'Segoe UI', Arial, sans-serif; color: #111; }
              .container { max-width: 680px; margin: 20px auto; background: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
              .header { background-color: #0a0a0a; padding: 28px 32px; text-align: center; border-bottom: 3px solid #E31D2E; color: #fff; }
              .header h1 { margin: 0; font-size: 22px; font-weight: 800; }
              .header p { margin: 6px 0 0 0; color: #a1a1aa; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; }
              .content { padding: 28px 32px; }
              .lead-badge { background: #fff5f5; border-left: 4px solid #E31D2E; padding: 12px 16px; border-radius: 6px; margin-bottom: 24px; }
              .section-title { font-size: 15px; font-weight: 700; color: #1e293b; margin: 24px 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; }
              .data-table { width: 100%; border-collapse: collapse; margin-bottom: 8px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
              .data-table tr { border-bottom: 1px solid #e2e8f0; }
              .data-table tr:last-child { border-bottom: none; }
              .data-table td.label-cell { width: 35%; padding: 10px 14px; background-color: #f8fafc; font-weight: 600; font-size: 13px; color: #475569; border-right: 1px solid #e2e8f0; vertical-align: top; }
              .data-table td.value-cell { width: 65%; padding: 10px 14px; font-size: 13px; color: #0f172a; font-weight: 500; vertical-align: top; background-color: #ffffff; }
              .highlight-val { color: #E31D2E; font-weight: 700; }
              .alert-box { margin-top: 24px; padding: 14px 18px; background: #FFF5F5; border-radius: 8px; border: 1px solid #FED7D7; font-size: 13px; color: #4A5568; }
              .footer { background-color: #f8fafc; padding: 18px 32px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>PRASKLA <span style="color: #E31D2E;">DIGITAL X</span></h1>
                <p>New Project Onboarding Application</p>
              </div>

              <div class="content">
                <div class="lead-badge">
                  <div style="font-size: 11px; font-weight: 700; color: #E31D2E; text-transform: uppercase; letter-spacing: 1px;">APPLICATION REFERENCE ID</div>
                  <div style="font-size: 18px; font-weight: 800; color: #111; font-family: monospace; margin-top: 2px;">${applicationId}</div>
                  <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Submitted: ${new Date(timestamp).toLocaleString()}</div>
                </div>

                <div class="section-title">1. Company Information</div>
                <table class="data-table">
                  <tr>
                    <td class="label-cell">Company Name</td>
                    <td class="value-cell" style="font-weight: 700;">${companyName}</td>
                  </tr>
                  <tr>
                    <td class="label-cell">Business Type</td>
                    <td class="value-cell">${businessType || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="label-cell">Industry</td>
                    <td class="value-cell">${industry || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="label-cell">Company Website</td>
                    <td class="value-cell">${companyWebsite ? `<a href="${companyWebsite}" style="color: #E31D2E; text-decoration: none;">${companyWebsite}</a>` : 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="label-cell">Years in Business</td>
                    <td class="value-cell">${yearsInBusiness || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="label-cell">Business Description</td>
                    <td class="value-cell">${businessDescription || 'N/A'}</td>
                  </tr>
                </table>

                <div class="section-title">2. Primary Contact Details</div>
                <table class="data-table">
                  <tr>
                    <td class="label-cell">Full Name</td>
                    <td class="value-cell" style="font-weight: 700;">${fullName}</td>
                  </tr>
                  <tr>
                    <td class="label-cell">Designation / Role</td>
                    <td class="value-cell">${designation || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="label-cell">Email Address</td>
                    <td class="value-cell"><a href="mailto:${email}" style="color: #E31D2E; font-weight: 700; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td class="label-cell">Phone Number</td>
                    <td class="value-cell"><a href="tel:${phone}" style="color: #0f172a; text-decoration: none;">${phone}</a></td>
                  </tr>
                  <tr>
                    <td class="label-cell">WhatsApp Number</td>
                    <td class="value-cell">${whatsapp || phone}</td>
                  </tr>
                  <tr>
                    <td class="label-cell">Preferred Contact</td>
                    <td class="value-cell">${preferredContactMethod || 'Email'}</td>
                  </tr>
                  <tr>
                    <td class="label-cell">Location / Address</td>
                    <td class="value-cell">${[officeAddress, city, state, country, postalCode].filter(Boolean).join(', ') || 'N/A'}</td>
                  </tr>
                </table>

                <div class="section-title">3. Project Scope & Requirements</div>
                <table class="data-table">
                  <tr>
                    <td class="label-cell">Project Name</td>
                    <td class="value-cell" style="font-weight: 700;">${projectName || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="label-cell">Required Capabilities</td>
                    <td class="value-cell"><span class="highlight-val">${projectType || 'N/A'}</span></td>
                  </tr>
                  <tr>
                    <td class="label-cell">Project Scope / Details</td>
                    <td class="value-cell">${projectDescription || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="label-cell">Primary Goal</td>
                    <td class="value-cell">${primaryGoal || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="label-cell">Target Audience</td>
                    <td class="value-cell">${targetAudience || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="label-cell">Required Features</td>
                    <td class="value-cell">${requiredFeatures || 'N/A'}</td>
                  </tr>
                </table>

                <div class="section-title">4. Timeline & Budget</div>
                <table class="data-table">
                  <tr>
                    <td class="label-cell">Budget Range</td>
                    <td class="value-cell"><span class="highlight-val">${budgetRange || 'N/A'}</span></td>
                  </tr>
                  <tr>
                    <td class="label-cell">Desired Start Date</td>
                    <td class="value-cell">${desiredStartDate || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="label-cell">Target Deadline</td>
                    <td class="value-cell">${deadline || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="label-cell">Competitor References</td>
                    <td class="value-cell">${competitorWebsites || competitors || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="label-cell">Inspiration / Style Links</td>
                    <td class="value-cell">${inspirationWebsites || referenceWebsites || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td class="label-cell">Additional Notes</td>
                    <td class="value-cell">${additionalRequirements || additionalNotes || 'N/A'}</td>
                  </tr>
                </table>

                <div class="alert-box">
                  <strong style="color: #E31D2E;">Full 10-Section PDF Attached:</strong>
                  <div style="margin-top: 4px;">
                    The comprehensive Project Brief PDF including branding rules, design guidelines, files, and quotations is attached as <strong>${applicationId}-ProjectBrief.pdf</strong>.
                  </div>
                </div>

                <div style="margin-top: 28px; text-align: center;">
                  <a href="mailto:${email}?subject=Re:%20Praskla%20Digital%20X%20Project%20Brief%20-%20${applicationId}" style="display: inline-block; background-color: #E31D2E; color: #ffffff; font-size: 14px; font-weight: 700; padding: 12px 32px; border-radius: 50px; text-decoration: none; box-shadow: 0 4px 14px rgba(227, 29, 46, 0.3);">
                    Reply to Client →
                  </a>
                </div>
              </div>

              <div class="footer">
                Praskla Digital X — Project Onboarding Notification System
              </div>
            </div>
          </body>
          </html>
        `,
        attachments: pdfBuffer ? [
          {
            filename: `${applicationId}-ProjectBrief.pdf`,
            content: pdfBuffer,
            contentType: 'application/pdf',
          },
        ] : [],
      };

      await transporter.sendMail(adminMailOptions);
      emailSentToAdmin = true;

      // 2. Client Confirmation Email
      const clientMailOptions = {
        from: `"${SMTP_FROM_NAME}" <${SMTP_FROM_EMAIL}>`,
        to: email.trim(),
        subject: 'Project Brief Received — Praskla Digital X',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; color: #111; line-height: 1.6; border: 1px solid #eee; padding: 24px; border-radius: 12px;">
            <h2 style="color: #111; margin-top: 0;">Project Brief Received</h2>
            <p>Dear ${fullName},</p>
            <p>Thank you for sharing your project requirements with <strong>Praskla Digital X</strong>.</p>
            <p>We have successfully received your project brief.</p>
            <div style="background: #FAF9F6; padding: 14px 18px; border-radius: 8px; margin: 16px 0; border: 1px solid #E5E5E5;">
              <strong style="color: #E31D2E; font-size: 14px;">Application Reference ID:</strong>
              <div style="font-size: 18px; font-weight: bold; color: #111; margin-top: 4px;">${applicationId}</div>
            </div>
            <p>Our strategy and technical team will review your requirements and reach out within 24 business hours.</p>
            <br/>
            <p style="margin-bottom: 0;">Best regards,<br/><strong>The Praskla Digital X Team</strong></p>
          </div>
        `,
      };

      await transporter.sendMail(clientMailOptions);
      emailSentToClient = true;
    } catch (mailErr) {
      console.error('Error dispatching application emails:', mailErr.message);
    }

    if (emailSentToAdmin || emailSentToClient) {
      return res.status(200).json({
        success: true,
        applicationId,
        emailSent: true,
        message: 'Project Brief received successfully. Confirmation emails sent.',
      });
    } else {
      return res.status(200).json({
        success: true,
        applicationId,
        emailSent: false,
        message: 'We received your information, but there was a temporary issue sending the confirmation. Our team can still access your submission.',
      });
    }
  } catch (error) {
    console.error('Error in /api/project-application:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while saving your project brief. Please try again.',
    });
  }
});

// App Config & Role Slugs endpoint
app.get('/api/config', (req, res) => {
  res.status(200).json({
    userSlug: process.env.USER_SLUG || 'digital X- User',
    adminSlug: process.env.ADMIN_SLUG || 'digital X-admin',
    smtpConfigured: !!(process.env.SMTP_API_KEY || process.env.SMTP_USER || process.env.MAIL_USER),
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'Praskla Digital X Backend Server' });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Praskla Digital X Backend Server is running on port ${PORT}`);
});