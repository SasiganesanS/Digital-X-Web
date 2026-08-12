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
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'sasiganesan7421@gmail.com';

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

// Nodemailer Transporter Setup
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.MAIL_PORT || '587'),
    secure: process.env.MAIL_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER || 'sasiganesan7421@gmail.com',
      pass: process.env.MAIL_PASSWORD || process.env.EMAIL_PASS || '',
    },
  });
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

    // 2. Prepare Admin Email
    const adminHtml = `
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

    let emailSent = false;
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"Praskla Digital X Web" <${process.env.MAIL_USER || 'sasiganesan7421@gmail.com'}>`,
        to: ADMIN_EMAIL,
        subject: 'New Website Enquiry — Praskla Digital X',
        html: adminHtml,
      });
      emailSent = true;
    } catch (mailErr) {
      console.error('Nodemailer error sending lead email:', mailErr.message);
    }

    res.status(200).json({
      success: true,
      leadId,
      emailSent,
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

      // 1. Admin Email
      const adminMailOptions = {
        from: `"Praskla Digital X Web" <${process.env.MAIL_USER || 'sasiganesan7421@gmail.com'}>`,
        to: ADMIN_EMAIL,
        subject: `New Project Application — ${companyName} — ${applicationId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 650px; color: #111; line-height: 1.6; border: 1px solid #eee; padding: 24px; border-radius: 12px;">
            <h2 style="color: #E31D2E; margin-top: 0;">New Project Application Submitted</h2>
            <p style="background: #F8F9FA; padding: 10px 14px; border-left: 4px solid #E31D2E; font-weight: bold;">
              Application ID: ${applicationId}
            </p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr><td style="padding: 6px 0; font-weight: bold; width: 160px;">Company Name:</td><td>${companyName}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Industry / Type:</td><td>${industry || 'N/A'} (${businessType || 'N/A'})</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Primary Contact:</td><td>${fullName} (${designation || 'N/A'})</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Phone:</td><td><a href="tel:${phone}">${phone}</a></td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Budget Range:</td><td>${budgetRange || 'N/A'}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Desired Start Date:</td><td>${desiredStartDate || 'N/A'}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Submission Date:</td><td>${new Date(timestamp).toLocaleString()}</td></tr>
            </table>
            <p style="margin-top: 18px; font-size: 13px; color: #666;">
              The full detailed Project Brief document is attached to this email as a PDF (<strong>${applicationId}.pdf</strong>).
            </p>
          </div>
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
        from: `"Praskla Digital X" <${process.env.MAIL_USER || 'sasiganesan7421@gmail.com'}>`,
        to: email.trim(),
        subject: 'Project Brief Received — Praskla Digital X',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; color: #111; line-height: 1.6; border: 1px solid #eee; padding: 24px; border-radius: 12px;">
            <h2 style="color: #111; margin-top: 0;">Project Brief Received</h2>
            <p>Dear ${fullName},</p>
            <p>Thank you for sharing your project requirements with Praskla Digital X.</p>
            <p>We have successfully received your project brief.</p>
            <div style="background: #FAF9F6; padding: 14px 18px; border-radius: 8px; margin: 16px 0; border: 1px solid #E5E5E5;">
              <strong style="color: #E31D2E; font-size: 14px;">Application ID:</strong>
              <div style="font-size: 18px; font-weight: bold; color: #111; margin-top: 4px;">${applicationId}</div>
            </div>
            <p>Our team will review your requirements and contact you shortly.</p>
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

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'Praskla Digital X Backend Server' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Praskla Digital X Backend Server is running on port ${PORT}`);
});