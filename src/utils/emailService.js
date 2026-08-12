// src/utils/emailService.js
// Client API service connecting frontend components to Praskla Digital X Backend Server

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Helper to normalize fetch errors into user-friendly error messages
 */
const handleFetchError = (error) => {
  const msg = error?.message || '';
  if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('Load failed')) {
    return 'Unable to connect to server. Please ensure the backend server is running or contact us directly on WhatsApp.';
  }
  return msg || 'Unable to submit enquiry. Please try again.';
};

/**
 * Submits Quick Contact Reach Us enquiry to backend
 * @param {Object} formData
 */
export const sendContactFormEmails = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit enquiry');
    }

    return {
      success: true,
      leadId: data.leadId,
      message: data.message || 'Message received! Thanks for contacting Praskla Digital X.',
    };
  } catch (error) {
    console.error('Error in sendContactFormEmails:', error);
    return {
      success: false,
      message: handleFetchError(error),
    };
  }
};

/**
 * Submits complete 10-section Project Brief application to backend
 * @param {Object|FormData} formDataPayload
 */
export const sendProjectApplicationEmails = async (formDataPayload) => {
  try {
    const isFormData = formDataPayload instanceof FormData;
    const options = {
      method: 'POST',
    };

    if (isFormData) {
      options.body = formDataPayload;
    } else {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(formDataPayload);
    }

    const response = await fetch(`${API_BASE_URL}/api/project-application`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit project brief');
    }

    return {
      success: true,
      applicationId: data.applicationId,
      message: data.message || 'Project Brief received successfully.',
    };
  } catch (error) {
    console.error('Error in sendProjectApplicationEmails:', error);
    return {
      success: false,
      message: handleFetchError(error),
    };
  }
};

/**
 * Submits pricing quotation request to backend
 * @param {Object} formData
 */
export const sendPricingQuoteEmails = async (formData) => {
  try {
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || '',
      interestedService: `${formData.service || 'Service'} — ${formData.selectedPlan || 'Quotation'}`,
      message: `Quotation Request:\nService: ${formData.service || 'N/A'}\nPlan: ${formData.selectedPlan || 'N/A'}\nBudget: ${formData.budget || 'N/A'}\nDetails: ${formData.projectDetails || 'N/A'}`,
      sourcePage: 'Service Quotation Flow',
    };

    return await sendContactFormEmails(payload);
  } catch (error) {
    console.error('Error in sendPricingQuoteEmails:', error);
    return {
      success: false,
      message: handleFetchError(error),
    };
  }
};

/**
 * Submits job application to backend
 * @param {Object} formData
 * @param {Object} job
 */
export const sendJobApplicationEmails = async (formData, job) => {
  try {
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: 'Careers Applicant',
      interestedService: `Job Application: ${job?.title || 'Position'}`,
      message: `Job Application for ${job?.title || 'Position'}\nCover Letter: ${formData.coverLetter || 'N/A'}\nExperience: ${formData.experience || 'N/A'}`,
      sourcePage: 'Careers Page',
    };

    return await sendContactFormEmails(payload);
  } catch (error) {
    console.error('Error in sendJobApplicationEmails:', error);
    return {
      success: false,
      message: handleFetchError(error),
    };
  }
};