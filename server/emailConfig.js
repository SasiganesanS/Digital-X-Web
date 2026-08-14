const nodemailer = require('nodemailer');

// Fallback SMTP Transporter Setup
const createTransporter = () => {
    const host = process.env.SMTP_HOST || process.env.MAIL_HOST || 'smtp.hostinger.com';
    const port = parseInt(process.env.SMTP_PORT || process.env.MAIL_PORT || '465');
    const isSecure = process.env.SMTP_SECURE === 'true' || port === 465;
    const user = process.env.SMTP_USERNAME || process.env.SMTP_USER || process.env.MAIL_USER;
    const pass = process.env.SMTP_PASSWORD || process.env.MAIL_PASSWORD || process.env.SMTP_PASS || process.env.EMAIL_PASS || '';

    return nodemailer.createTransport({
        host,
        port,
        secure: isSecure,
        auth: {
            user,
            pass
        },
        tls: {
            rejectUnauthorized: false
        }
    });
};

const transporter = createTransporter();

// Helper function to send email
const sendEmail = async(mailOptions) => {
    try {
        const fromName = process.env.SMTP_FROM_NAME || process.env.EMAIL_FROM_NAME || 'Praskla Digital X';
        const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USERNAME || process.env.SMTP_USER || process.env.MAIL_USER;
        console.log('Attempting to send email to:', mailOptions.to);
        const info = await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            ...mailOptions
        });
        console.log('Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
};

// Email queue implementation
const emailQueue = [];
let isProcessingQueue = false;
const DELAY_BETWEEN_EMAILS = 5000;

const queueEmail = (mailOptions) => {
    return new Promise((resolve) => {
        emailQueue.push({
            mailOptions,
            callback: (result) => resolve(result)
        });

        if (!isProcessingQueue) {
            processEmailQueue();
        }
    });
};

const processEmailQueue = async() => {
    if (isProcessingQueue || emailQueue.length === 0) return;

    isProcessingQueue = true;
    console.log(`Starting to process email queue. ${emailQueue.length} emails in queue.`);

    try {
        while (emailQueue.length > 0) {
            const { mailOptions, callback } = emailQueue.shift();

            console.log(`Processing email to ${mailOptions.to} (${emailQueue.length} remaining in queue)`);
            const result = await sendEmail(mailOptions);
            callback(result);

            if (emailQueue.length > 0) {
                console.log(`Waiting ${DELAY_BETWEEN_EMAILS/1000} seconds before sending next email...`);
                await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_EMAILS));
            }
        }
    } catch (error) {
        console.error('Error processing email queue:', error);
    } finally {
        isProcessingQueue = false;
        console.log('Email queue processing completed');
    }
};

const sendEmailsInBackground = (adminOptions, userOptions) => {
    queueEmail(adminOptions)
        .then(result => {
            console.log('Admin email queued result:', result);
            if (userOptions) {
                return queueEmail(userOptions);
            }
        })
        .then(result => {
            if (result) {
                console.log('User email queued result:', result);
            }
        })
        .catch(error => {
            console.error('Error queueing emails:', error);
        });
};

module.exports = {
    sendEmail: queueEmail,
    sendEmailsInBackground,
    getQueueStatus: () => ({
        queueLength: emailQueue.length,
        isProcessing: isProcessingQueue
    })
};