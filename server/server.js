const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.EMAIL_PORT || '465'),
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER || 'info@prasklatechnology.com',
    pass: process.env.EMAIL_PASS || 'Pranesh@232000'
  }
});

// Email templates
const createHtmlTemplate = (type, data) => {
  switch (type) {
    case 'contact_admin':
      return `
        <html>
          <body>
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Message:</strong> ${data.message}</p>
            <p><strong>Submitted at:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
          </body>
        </html>
      `;
    case 'contact_user':
      return `
        <html>
          <body>
            <h2>Thank You for Reaching Out!</h2>
            <p>Dear ${data.name},</p>
            <p>Thank you for contacting Praskla. We have received your message and will get back to you shortly.</p>
            <p>Here's a summary of your message:</p>
            <p><strong>Message:</strong> ${data.message}</p>
            <p>Our team will review your inquiry and respond as soon as possible.</p>
            <p>Best regards,<br>The Praskla Team</p>
          </body>
        </html>
      `;
    case 'job_admin':
      return `
        <html>
          <body>
            <h2>New Job Application Received</h2>
            <p><strong>Position:</strong> ${data.jobTitle}</p>
            <p><strong>Applicant Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Cover Letter:</strong> ${data.coverLetter}</p>
            <p><strong>Resume File Name:</strong> ${data.resumeFileName || 'Not provided'}</p>
            <p><strong>Submitted at:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
            <p>Please check the Google Sheet for complete application details including the resume.</p>
          </body>
        </html>
      `;
    case 'job_user':
      return `
        <html>
          <body>
            <h2>Application Received</h2>
            <p>Dear ${data.name},</p>
            <p>Thank you for applying to the <strong>${data.jobTitle}</strong> at Praskla. We have received your application and will review it shortly.</p>
            <p>Here's a summary of your application:</p>
            <ul>
              <li><strong>Position:</strong> ${data.jobTitle}</li>
              <li><strong>Submitted at:</strong> ${new Date(data.timestamp).toLocaleString()}</li>
            </ul>
            <p>If your qualifications match our requirements, our hiring team will contact you for the next steps in the recruitment process.</p>
            <p>Best regards,<br>The Praskla Recruiting Team</p>
          </body>
        </html>
      `;
    case 'quote_admin':
      return `
        <html>
          <body>
            <h2>New Quote Request Received</h2>
            <p><strong>Service:</strong> ${data.service}</p>
            <p><strong>Plan:</strong> ${data.selectedPlan}</p>
            <p><strong>Customer Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Budget:</strong> ${data.budget}</p>
            <p><strong>Project Details:</strong> ${data.projectDetails || 'Not provided'}</p>
            <p><strong>Submitted at:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
          </body>
        </html>
      `;
    case 'quote_user':
      return `
        <html>
          <body>
            <h2>Quote Request Received</h2>
            <p>Dear ${data.name},</p>
            <p>Thank you for your interest in our ${data.service} service. We have received your request for the <strong>${data.selectedPlan}</strong> plan and will prepare a custom quote for you shortly.</p>
            <p>Here's a summary of your request:</p>
            <ul>
              <li><strong>Service:</strong> ${data.service}</li>
              <li><strong>Plan:</strong> ${data.selectedPlan}</li>
              <li><strong>Submitted at:</strong> ${new Date(data.timestamp).toLocaleString()}</li>
            </ul>
            <p>Our team will review your requirements and get back to you within 24-48 hours with a detailed proposal.</p>
            <p>Best regards,<br>The Praskla Sales Team</p>
          </body>
        </html>
      `;
    default:
      return `<html><body><h2>Email Notification</h2><p>This is an automated email.</p></body></html>`;
  }
};

// Email sending route
app.post('/api/send-email', async (req, res) => {
  try {
    const { type, ...data } = req.body;
    console.log(`Processing ${type} email for ${data.email}`);
    
    let mailOptions = {
      from: {
        name: 'Praskla Technology',
        address: 'info@prasklatechnology.com'
      },
      html: createHtmlTemplate(type, data)
    };
    
    // Configure recipients based on email type
    if (type.includes('admin')) {
      mailOptions.to = 'info@prasklatechnology.com';
      
      // Set subject based on type
      if (type === 'contact_admin') {
        mailOptions.subject = 'New Contact Form Submission';
      } else if (type === 'job_admin') {
        mailOptions.subject = `New Job Application: ${data.jobTitle}`;
        
        // Add resume attachment if available
        if (data.resumeBase64) {
          mailOptions.attachments = [{
            filename: data.resumeFileName || 'resume.pdf',
            content: data.resumeBase64.split('base64,')[1],
            encoding: 'base64'
          }];
        }
      } else if (type === 'quote_admin') {
        mailOptions.subject = `New Quote Request: ${data.service} - ${data.selectedPlan} Plan`;
      }
    } else {
      // User emails
      mailOptions.to = data.email;
      
      // Set subject based on type
      if (type === 'contact_user') {
        mailOptions.subject = 'Thank you for contacting Praskla';
      } else if (type === 'job_user') {
        mailOptions.subject = 'Your Application to Praskla Technology has been received';
      } else if (type === 'quote_user') {
        mailOptions.subject = `Your Quote Request for ${data.service} has been received`;
      }
    }
    
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    
    res.status(200).json({ 
      success: true, 
      messageId: info.messageId,
      message: 'Email sent successfully' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Email server is running on port ${PORT}`);
}); 