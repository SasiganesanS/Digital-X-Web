require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sendEmail, sendEmailsInBackground } = require('./emailConfig');

const app = express();

// Middleware with increased limits
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Job application emails endpoint
app.post('/api/job-application', async(req, res) => {
    try {
        console.log('Received job application request');

        // Handle both direct form data and wrapped formData
        const formData = req.body.formData || req.body;

        // Check if resume data is being sent (but we'll ignore it)
        if (formData.resumeBase64 && formData.resumeBase64.length > 1000) {
            console.log('WARNING: Large resume data received but not being used. Consider removing this from client-side submission to improve performance.');
        }

        // Extract only the fields we need
        const { name, email, phone, coverLetter, jobTitle } = formData;

        // Log that we're processing a valid request
        console.log(`Processing job application for ${name} (${email}) for position: ${jobTitle || 'Not specified'}`);

        // Prepare email options
        const adminOptions = {
            to: 'humanresource@prasklatechnology.com',
            subject: `New Job Application: ${jobTitle || 'Position'}`,
            html: `
                <h2>New Job Application Received</h2>
                <p><strong>Position:</strong> ${jobTitle || 'Not specified'}</p>
                <p><strong>Applicant Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Cover Letter:</strong> ${coverLetter}</p>
                <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
            `
        };

        const userOptions = {
            to: email,
            subject: 'Your Application to Praskla Technology has been received',
            html: `
                <h2>Application Received</h2>
                <p>Dear ${name},</p>
                <p>Thank you for applying to the <strong>${jobTitle || 'position'}</strong> at Praskla. We have received your application and will review it shortly.</p>
                <p>Here's a summary of your application:</p>
                <ul>
                    <li><strong>Position:</strong> ${jobTitle || 'Not specified'}</li>
                    <li><strong>Submitted at:</strong> ${new Date().toLocaleString()}</li>
                </ul>
                <p>If your qualifications match our requirements, our hiring team will contact you for the next steps in the recruitment process.</p>
                <p>Best regards,<br>The Praskla Recruiting Team</p>
            `
        };

        // Send emails in the background
        sendEmailsInBackground(adminOptions, userOptions);
        console.log('Emails queued for sending in background');

        // Respond to the client
        res.json({
            success: true,
            message: "Application submitted successfully. Confirmation emails will be sent."
        });
    } catch (error) {
        console.error('Job application error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Contact form emails endpoint
app.post('/api/contact', async(req, res) => {
    try {
        // Handle both direct form data and wrapped formData
        const formData = req.body.formData || req.body;
        const { name, email, phone, message } = formData;

        // Prepare email options
        const adminOptions = {
            to: 'info@prasklatechnology.com',
            subject: 'New Contact Form Submission',
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong> ${message}</p>
                <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
            `
        };

        const userOptions = {
            to: email,
            subject: 'Thank you for contacting Praskla',
            html: `
                <h2>Thank You for Reaching Out!</h2>
                <p>Dear ${name},</p>
                <p>Thank you for contacting Praskla. We have received your message and will get back to you shortly.</p>
                <p>Here's a summary of your message:</p>
                <p><strong>Message:</strong> ${message}</p>
                <p>Our team will review your inquiry and respond as soon as possible.</p>
                <p>Best regards,<br>The Praskla Team</p>
            `
        };

        // Send emails in the background
        sendEmailsInBackground(adminOptions, userOptions);

        // Respond to the client
        res.json({
            success: true,
            message: "Form submitted successfully. Confirmation emails will be sent."
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Test endpoint
app.post('/api/test-email', async(req, res) => {
    try {
        // Send test email
        const result = await sendEmail({
            to: 'info@prasklatechnology.com',
            subject: 'Test Email from Praskla Server',
            html: '<h1>Test Email</h1><p>This is a test email from the Praskla server.</p>'
        });

        res.json({
            success: true,
            message: "Test email sent successfully"
        });
    } catch (error) {
        console.error('Test endpoint error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});