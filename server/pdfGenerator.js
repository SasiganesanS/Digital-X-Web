const PDFDocument = require('pdfkit');

/**
 * Generates a professional PDF Project Brief buffer
 * @param {Object} data - Application data object
 * @returns {Promise<Buffer>} - Resolves with PDF Buffer
 */
const generateProjectBriefPdf = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40, size: 'A4' });
      const buffers = [];

      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err) => reject(err));

      const primaryColor = '#E31D2E';
      const darkColor = '#111111';
      const grayColor = '#555555';
      const lightBg = '#F8F9FA';

      // Header Banner
      doc
        .rect(0, 0, doc.page.width, 90)
        .fill(darkColor);

      doc
        .fillColor('#FFFFFF')
        .fontSize(22)
        .font('Helvetica-Bold')
        .text('PRASKLA DIGITAL X', 40, 25, { characterSpacing: 1 });

      doc
        .fontSize(12)
        .font('Helvetica')
        .fillColor(primaryColor)
        .text('CLIENT PROJECT BRIEF & REQUIREMENT SPECIFICATION', 40, 52);

      doc
        .fontSize(9)
        .fillColor('#AAAAAA')
        .text(`Application ID: ${data.applicationId || 'N/A'}`, doc.page.width - 240, 30, { align: 'right' })
        .text(`Date: ${new Date().toLocaleString()}`, doc.page.width - 240, 45, { align: 'right' });

      let currentY = 110;

      const addSectionHeader = (title) => {
        if (currentY > 720) {
          doc.addPage();
          currentY = 40;
        }

        doc
          .rect(40, currentY, doc.page.width - 80, 24)
          .fill(lightBg);

        doc
          .fillColor(primaryColor)
          .fontSize(11)
          .font('Helvetica-Bold')
          .text(title.toUpperCase(), 50, currentY + 6);

        currentY += 32;
      };

      const addField = (label, value) => {
        if (!value && value !== 0) value = 'N/A';
        if (typeof value === 'object') value = JSON.stringify(value, null, 2);

        if (currentY > 740) {
          doc.addPage();
          currentY = 40;
        }

        doc
          .fillColor(darkColor)
          .fontSize(9)
          .font('Helvetica-Bold')
          .text(`${label}: `, 50, currentY, { continued: true })
          .font('Helvetica')
          .fillColor(grayColor)
          .text(String(value));

        currentY += 16;
      };

      // SECTION 1: COMPANY INFORMATION
      addSectionHeader('Section 1 — Company Information');
      addField('Company / Organization', data.companyName);
      addField('Business Type', data.businessType);
      addField('Industry', data.industry);
      addField('Company Website', data.companyWebsite);
      addField('Years in Business', data.yearsInBusiness);
      addField('Business Description', data.businessDescription);
      currentY += 10;

      // SECTION 2: PRIMARY CONTACT
      addSectionHeader('Section 2 — Primary Contact');
      addField('Full Name', data.fullName);
      addField('Designation / Role', data.designation);
      addField('Email Address', data.email);
      addField('Primary Phone', data.phone);
      addField('Alternative Phone', data.altPhone);
      addField('WhatsApp Number', data.whatsapp);
      addField('Preferred Contact Method', data.preferredContactMethod);
      addField('Full Address', `${data.officeAddress || ''} ${data.city || ''} ${data.state || ''} ${data.country || ''} ${data.postalCode || ''}`);
      currentY += 10;

      // SECTION 3: BRAND IDENTITY
      addSectionHeader('Section 3 — Brand Identity');
      addField('Existing Logo Available', data.hasLogo);
      addField('Existing Brand Guidelines', data.existingBrandGuidelines);
      addField('Existing Brand Colors', data.existingBrandColors);
      addField('Preferred Brand Colors', data.preferredColors);
      addField('Colors to Avoid', data.colorsToAvoid);
      addField('Existing / Preferred Font', `${data.existingFont || 'N/A'} / ${data.preferredFont || 'N/A'}`);
      addField('Typography Preferences', data.typographyPreferences);
      addField('Existing Patterns / Visual Style', data.existingPatterns);
      addField('Reference Websites', data.referenceWebsites);
      currentY += 10;

      // SECTION 4: PROJECT DETAILS
      addSectionHeader('Section 4 — Project Details');
      addField('Project Name', data.projectName);
      addField('Project Type', data.projectType);
      addField('Project Description', data.projectDescription);
      addField('Existing Website / App', `${data.existingWebsite || 'No'} ${data.existingUrl ? `(${data.existingUrl})` : ''}`);
      addField('Current Problems', data.currentProblems);
      addField('Required Features', data.requiredFeatures);
      addField('Required Pages', data.requiredPages);
      addField('Integrations', data.integrations);
      addField('Competitors', data.competitors);
      currentY += 10;

      // SECTION 5: PROJECT GOALS
      addSectionHeader('Section 5 — Project Goals');
      addField('Primary Goal', data.primaryGoal);
      addField('Target Audience', data.targetAudience);
      addField('Business Objectives', data.businessObjectives);
      addField('Expected Outcome', data.expectedOutcome);
      addField('Problems to Solve', data.problemsToSolve);
      addField('Success Criteria', data.successCriteria);
      currentY += 10;

      // SECTION 6: TIMELINE
      addSectionHeader('Section 6 — Timeline');
      addField('Desired Start Date', data.desiredStartDate);
      addField('Desired Completion Date', data.desiredCompletionDate);
      addField('Hard Deadline', data.deadline);
      addField('Is Deadline Flexible?', data.isDeadlineFlexible);
      addField('Reason for Deadline', data.reasonForDeadline);
      currentY += 10;

      // SECTION 7: BUDGET
      addSectionHeader('Section 7 — Budget');
      addField('Selected Budget Range', data.budgetRange);
      currentY += 10;

      // SECTION 8: REFERENCES
      addSectionHeader('Section 8 — References & Links');
      addField('Competitor Websites', data.competitorWebsites);
      addField('Inspiration Websites', data.inspirationWebsites);
      addField('Reference Designs', data.referenceDesigns);
      addField('Social Media Links', data.socialMediaLinks);
      currentY += 10;

      // SECTION 9: ADDITIONAL INFORMATION
      addSectionHeader('Section 9 — Additional Information');
      addField('Additional Requirements', data.additionalRequirements);
      addField('Special Requirements', data.specialRequirements);
      addField('Technical Requirements', data.technicalRequirements);
      addField('Restrictions', data.restrictions);
      addField('Additional Notes', data.additionalNotes);
      currentY += 10;

      // QUOTATION / SELECTED PACKAGE (IF APPLICABLE)
      if (data.quotationData) {
        addSectionHeader('Selected Service Package & Estimated Quotation');
        const q = typeof data.quotationData === 'string' ? JSON.parse(data.quotationData) : data.quotationData;
        addField('Selected Service', q.platform?.title || q.serviceTitle);
        addField('Selected Package', q.plan?.title || q.packageTitle);
        addField('Contract Duration', q.durationLabel);
        if (q.configuredPrice || q.grandTotal) {
          addField('Estimated Investment', `₹${Number(q.configuredPrice || q.grandTotal).toLocaleString()}`);
        }
        if (q.deliverables && q.deliverables.length > 0) {
          addField('Selected Add-ons / Deliverables', q.deliverables.map(d => `${d.name} (${d.cost ? `₹${d.cost}` : ''})`).join(', '));
        }
        currentY += 10;
      }

      // Footer notice on last page
      doc
        .fontSize(8)
        .fillColor('#999999')
        .text('Generated automatically by Praskla Digital X Client Portal. Confidential & Proprietary.', 50, doc.page.height - 30, { align: 'center' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { generateProjectBriefPdf };
