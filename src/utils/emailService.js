// Email service with asynchronous queue system
import axios from 'axios';

// Server endpoint - prioritize production URL if available
const EMAIL_SERVER_URL = import.meta.env.VITE_EMAIL_API_URL_PROD || 'https://praskla.onrender.com/api/send-email';
console.log('Email API URL:', EMAIL_SERVER_URL);

// Email queue system that works in browser environment
class EmailQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.delay = 2000; // 2 seconds delay between emails
  }

  // Add email to queue
  enqueue(emailData) {
    this.queue.push(emailData);
    console.log(`Email added to queue. Queue size: ${this.queue.length}`);
    
    // Start processing if not already
    if (!this.processing) {
      this.processQueue();
    }
  }

  // Process queue with delay
  async processQueue() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const emailData = this.queue.shift();
    
    try {
      console.log('Processing email from queue...');
      // Send to our email server
      const response = await axios.post(EMAIL_SERVER_URL, emailData);
      console.log('Email sent successfully:', response.data.messageId);
    } catch (error) {
      console.error('Error sending email from queue:', error);
    }

    // Wait for delay before processing next email
    setTimeout(() => {
      this.processQueue();
    }, this.delay);
  }
}

// Initialize email queue
const emailQueue = new EmailQueue();

// Logging function for debugging
const logEmailAttempt = (type, data, result) => {
  console.log(`===== EMAIL ${type} =====`);
  console.log('Data:', JSON.stringify(data, null, 2));
  console.log('Result:', result);
  console.log('========================');
};

// Email templates
const EMAIL_TEMPLATES = {
  // Contact form notification to admin
  contactFormAdmin: (formData) => ({
    from: {
      name: 'Praskla Digital X',
      address: 'info@prasklatechnology.com',
    },
    to: 'info@prasklatechnology.com',
    subject: 'New Contact Form Submission',
    html: `
      <html>
        <body>
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Message:</strong> ${formData.message}</p>
          <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        </body>
      </html>
    `,
  }),

  // Contact form confirmation to user
  contactFormConfirmation: (formData) => ({
    from: {
      name: 'Praskla Digital X',
      address: 'info@prasklatechnology.com',
    },
    to: formData.email,
    subject: 'Thank you for contacting Praskla Digital X',
    html: `
      <html>
        <body>
          <h2>Thank You for Reaching Out!</h2>
          <p>Dear ${formData.name},</p>
          <p>Thank you for contacting Praskla Digital X. We have received your message and will get back to you shortly.</p>
          <p>Here's a summary of your message:</p>
          <p><strong>Message:</strong> ${formData.message}</p>
          <p>Our team will review your inquiry and respond as soon as possible.</p>
          <p>Best regards,<br>The Praskla Digital X Team</p>
        </body>
      </html>
    `,
  }),

  // Job application notification to admin
  jobApplicationAdmin: (formData, job) => ({
    from: {
      name: 'Praskla Digital X',
      address: 'info@prasklatechnology.com',
    },
    to: 'info@prasklatechnology.com',
    subject: `New Job Application: ${job?.title || 'Position'}`,
    html: `
      <html>
        <body>
          <h2>New Job Application Received</h2>
          <p><strong>Position:</strong> ${job?.title || 'Not specified'}</p>
          <p><strong>Applicant Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Cover Letter:</strong> ${formData.coverLetter}</p>
          <p><strong>Resume File Name:</strong> ${formData.resume ? formData.resume.name : 'Not provided'}</p>
          <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
          <p>Please check the Google Sheet for complete application details including the resume.</p>
        </body>
      </html>
    `,
    attachments: formData.resumeBase64 ? [
      {
        filename: formData.resumeFileName || 'resume.pdf',
        content: formData.resumeBase64.split('base64,')[1],
        encoding: 'base64'
      }
    ] : []
  }),

  // Job application confirmation to applicant
  jobApplicationConfirmation: (formData, job) => ({
    from: {
      name: 'Praskla Digital X',
      address: 'info@prasklatechnology.com',
    },
    to: formData.email,
    subject: 'Your Application to Praskla Digital X has been received',
    html: `
      <html>
        <body>
          <h2>Application Received</h2>
          <p>Dear ${formData.name},</p>
          <p>Thank you for applying to the <strong>${job?.title || 'position'}</strong> at Praskla Digital X. We have received your application and will review it shortly.</p>
          <p>Here's a summary of your application:</p>
          <ul>
            <li><strong>Position:</strong> ${job?.title || 'Not specified'}</li>
            <li><strong>Submitted at:</strong> ${new Date().toLocaleString()}</li>
          </ul>
          <p>If your qualifications match our requirements, our hiring team will contact you for the next steps in the recruitment process.</p>
          <p>Best regards,<br>The Praskla Digital X Recruiting Team</p>
        </body>
      </html>
    `,
  }),
  
  // Pricing quote request notification to admin
  pricingQuoteAdmin: (formData) => ({
    from: {
      name: 'Praskla Digital X',
      address: 'info@prasklatechnology.com',
    },
    to: 'info@prasklatechnology.com',
    subject: `New Quote Request: ${formData.service} - ${formData.selectedPlan} Plan`,
    html: `
      <html>
        <body>
          <h2>New Quote Request Received</h2>
          <p><strong>Service:</strong> ${formData.service}</p>
          <p><strong>Plan:</strong> ${formData.selectedPlan}</p>
          <p><strong>Customer Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Budget:</strong> ${formData.budget}</p>
          <p><strong>Project Details:</strong> ${formData.projectDetails || 'Not provided'}</p>
          <p><strong>Submitted at:</strong> ${new Date(formData.timestamp).toLocaleString()}</p>
        </body>
      </html>
    `,
  }),
  
  // Pricing quote confirmation to customer
  pricingQuoteConfirmation: (formData) => ({
    from: {
      name: 'Praskla Digital X',
      address: 'info@prasklatechnology.com',
    },
    to: formData.email,
    subject: `Your Quote Request for ${formData.service} has been received`,
    html: `
      <html>
        <body>
          <h2>Quote Request Received</h2>
          <p>Dear ${formData.name},</p>
          <p>Thank you for your interest in our ${formData.service} service. We have received your request for the <strong>${formData.selectedPlan}</strong> plan and will prepare a custom quote for you shortly.</p>
          <p>Here's a summary of your request:</p>
          <ul>
            <li><strong>Service:</strong> ${formData.service}</li>
            <li><strong>Plan:</strong> ${formData.selectedPlan}</li>
            <li><strong>Submitted at:</strong> ${new Date(formData.timestamp).toLocaleString()}</li>
          </ul>
          <p>Our team will review your requirements and get back to you within 24-48 hours with a detailed proposal.</p>
          <p>Best regards,<br>The Praskla Digital X Sales Team</p>
        </body>
      </html>
    `,
  }),
};

/**
 * Adds email to queue for asynchronous processing
 * @param {Object} emailData - Email data
 */
const queueEmail = (emailData) => {
  emailQueue.enqueue(emailData);
  return { success: true, message: 'Email queued for delivery' };
};

/**
 * Sends a contact form submission email
 * @param {Object} formData - Contact form data
 * @returns {Promise} - Resolves when emails are queued
 */
export const sendContactFormEmails = async (formData) => {
  console.log('sendContactFormEmails called with data:', formData);
  
  try {
    // Prepare admin email data
    const adminEmailData = {
      type: 'contact_admin',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      timestamp: formData.timestamp || new Date().toISOString()
    };
    
    // Send admin notification email
    const adminResponse = await fetch(EMAIL_SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminEmailData)
    });
    
    if (!adminResponse.ok) {
      throw new Error('Failed to send admin notification email');
    }
    
    // Prepare user confirmation email data
    const userEmailData = {
      type: 'contact_user',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      timestamp: formData.timestamp || new Date().toISOString()
    };
    
    // Send user confirmation email
    const userResponse = await fetch(EMAIL_SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userEmailData)
    });
    
    if (!userResponse.ok) {
      throw new Error('Failed to send user confirmation email');
    }
    
    return { 
      success: true,
      message: 'Emails sent successfully'
    };
  } catch (error) {
    console.error('Error in sendContactFormEmails:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

/**
 * Sends job application emails
 * @param {Object} formData - Job application form data
 * @param {Object} job - Job details
 * @returns {Promise} - Resolves when emails are queued
 */
export const sendJobApplicationEmails = async (formData, job) => {
  console.log('sendJobApplicationEmails called with data:', formData);
  
  try {
    // Prepare admin email data
    const adminEmailData = {
      type: 'job_admin',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      jobTitle: job?.title || 'Not specified',
      coverLetter: formData.coverLetter,
      resumeFileName: formData.resumeFileName || '',
      resumeBase64: formData.resumeBase64,
      timestamp: formData.timestamp || new Date().toISOString()
    };
    
    // Send admin notification email
    const adminResponse = await fetch(EMAIL_SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminEmailData)
    });
    
    if (!adminResponse.ok) {
      throw new Error('Failed to send admin notification email');
    }
    
    // Prepare confirmation email to applicant
    const userEmailData = {
      type: 'job_user',
      name: formData.name,
      email: formData.email,
      jobTitle: job?.title || 'Not specified',
      timestamp: formData.timestamp || new Date().toISOString()
    };
    
    // Send user confirmation email
    const userResponse = await fetch(EMAIL_SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userEmailData)
    });
    
    if (!userResponse.ok) {
      throw new Error('Failed to send user confirmation email');
    }
    
    return { 
      success: true,
      message: 'Application received and emails sent successfully'
    };
  } catch (error) {
    console.error('Error in sendJobApplicationEmails:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

/**
 * Sends pricing quote emails
 * @param {Object} formData - Quote request form data
 * @returns {Promise} - Resolves when emails are queued
 */
export const sendPricingQuoteEmails = async (formData) => {
  console.log('sendPricingQuoteEmails called with data:', formData);
  
  try {
    // Prepare admin email data
    const adminEmailData = {
      type: 'quote_admin',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      selectedPlan: formData.selectedPlan,
      budget: formData.budget,
      projectDetails: formData.projectDetails,
      timestamp: formData.timestamp || new Date().toISOString()
    };
    
    // Send admin notification email
    const adminResponse = await fetch(EMAIL_SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminEmailData)
    });
    
    if (!adminResponse.ok) {
      throw new Error('Failed to send admin notification email');
    }
    
    // Prepare confirmation email to customer
    const userEmailData = {
      type: 'quote_user',
      name: formData.name,
      email: formData.email,
      service: formData.service,
      selectedPlan: formData.selectedPlan,
      timestamp: formData.timestamp || new Date().toISOString()
    };
    
    // Send user confirmation email
    const userResponse = await fetch(EMAIL_SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userEmailData)
    });
    
    if (!userResponse.ok) {
      throw new Error('Failed to send user confirmation email');
    }
    
    return { 
      success: true,
      message: 'Quote request received and emails sent successfully'
    };
  } catch (error) {
    console.error('Error in sendPricingQuoteEmails:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

/**
 * Test function to verify email connectivity
 */
// export const testEmailSending = async () => {
//   const testData = {
//     name: 'Test User',
//     email: 'test@example.com',
//     phone: '+1234567890',
//     message: 'This is a test message'
//   };
  
//   return await sendContactFormEmails(testData);
// };