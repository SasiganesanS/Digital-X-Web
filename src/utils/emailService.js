// src/utils/emailService.js
// Centralized Form Submissions Bridge routing through src/services/mailService.js

import { sendMail } from '../services/mailService';

const generateLeadId = () => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `PDX-LEAD-${dateStr}-${randomSuffix}`;
};

/**
 * 1. Contact Form Submission
 * Maps fields to digital-x-admin template: LEAD_ID, NAME, EMAIL, PHONE, COMPANY, SERVICE, MESSAGE
 */
export const sendContactFormEmails = async (formData) => {
  const leadId = generateLeadId();
  const variables = {
    LEAD_ID: leadId,
    NAME: formData.name || 'N/A',
    EMAIL: formData.email || 'N/A',
    PHONE: formData.phone || 'N/A',
    COMPANY: formData.company || 'N/A',
    SERVICE: formData.interestedService || 'General Inquiry',
    MESSAGE: formData.message || 'N/A',
  };

  return await sendMail({
    subject: `New Contact Enquiry — ${formData.name || 'Lead'} — ${leadId}`,
    template: 'digital-x-admin',
    variables,
  });
};

/**
 * 2. Project Application / Brief Submission
 * Maps fields to digital-x-admin template: LEAD_ID, NAME, EMAIL, PHONE, COMPANY, SERVICE, MESSAGE
 */
export const sendProjectApplicationEmails = async (formDataPayload) => {
  let dataObj = {};
  if (formDataPayload instanceof FormData) {
    formDataPayload.forEach((value, key) => {
      if (typeof value === 'string') {
        dataObj[key] = value;
      }
    });
  } else {
    dataObj = formDataPayload || {};
  }

  const leadId = generateLeadId();
  const overview = dataObj.projectOverview || dataObj.additionalRequirements || 'N/A';
  const variables = {
    LEAD_ID: leadId,
    NAME: dataObj.fullName || dataObj.companyName || 'Client',
    EMAIL: dataObj.workEmail || 'N/A',
    PHONE: dataObj.phoneNumber || 'N/A',
    COMPANY: dataObj.companyName || 'N/A',
    SERVICE: `Project Brief: ${dataObj.primaryServices || 'Services'}`,
    MESSAGE: `Industry: ${dataObj.industry || 'N/A'}\nBudget: ${dataObj.projectBudget || 'N/A'}\nTimeline: ${dataObj.targetTimeline || 'N/A'}\nOverview: ${overview}`,
  };

  return await sendMail({
    subject: `New Project Brief — ${dataObj.companyName || dataObj.fullName || 'Client'} — ${leadId}`,
    template: 'digital-x-admin',
    variables,
  });
};

/**
 * 3. Quote Form Submission
 * Maps fields to digital-x-admin template: LEAD_ID, NAME, EMAIL, PHONE, COMPANY, SERVICE, MESSAGE
 */
export const sendPricingQuoteEmails = async (formData) => {
  const leadId = generateLeadId();
  const variables = {
    LEAD_ID: leadId,
    NAME: formData.name || 'Client',
    EMAIL: formData.email || 'N/A',
    PHONE: formData.phone || 'N/A',
    COMPANY: formData.company || 'N/A',
    SERVICE: `Quotation Request: ${formData.service || 'Service'} (${formData.selectedPlan || 'Plan'})`,
    MESSAGE: `Budget: ${formData.budget || 'N/A'}\nDetails: ${formData.projectDetails || 'N/A'}`,
  };

  return await sendMail({
    subject: `New Quotation Request — ${formData.name || 'Client'} — ${leadId}`,
    template: 'digital-x-admin',
    variables,
  });
};

/**
 * 4. Career Form Submission
 * Maps fields to digital-x-admin template: LEAD_ID, NAME, EMAIL, PHONE, COMPANY, SERVICE, MESSAGE
 */
export const sendJobApplicationEmails = async (formData, job) => {
  const leadId = generateLeadId();
  const variables = {
    LEAD_ID: leadId,
    NAME: formData.name || 'Applicant',
    EMAIL: formData.email || 'N/A',
    PHONE: formData.phone || 'N/A',
    COMPANY: 'Careers Applicant',
    SERVICE: `Job Application: ${job?.title || 'Position'}`,
    MESSAGE: `Target Position: ${job?.title || 'General Position'}\nExperience: ${formData.experience || 'N/A'}\nNotes: ${formData.coverLetter || 'N/A'}`,
  };

  return await sendMail({
    subject: `New Career Application — ${formData.name || 'Applicant'} — ${job?.title || 'Position'}`,
    template: 'digital-x-admin',
    variables,
  });
};