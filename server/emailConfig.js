const nodemailer = require('nodemailer');

// Create email transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Email queue implementation
const emailQueue = [];
let isProcessingQueue = false;
const DELAY_BETWEEN_EMAILS = 5000; // 5 seconds delay between emails to avoid rate limits

// Helper function to send email
const sendEmail = async(mailOptions) => {
    try {
        console.log('Attempting to send email to:', mailOptions.to);
        const info = await transporter.sendMail({
            from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
            ...mailOptions
        });
        console.log('Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
};

// Function to add emails to queue
const queueEmail = (mailOptions) => {
    return new Promise((resolve) => {
        // Add the email to the queue with a callback
        emailQueue.push({
            mailOptions,
            callback: (result) => resolve(result)
        });

        // Start processing the queue if it's not already being processed
        if (!isProcessingQueue) {
            processEmailQueue();
        }
    });
};

// Function to process the email queue
const processEmailQueue = async() => {
    if (isProcessingQueue || emailQueue.length === 0) return;

    isProcessingQueue = true;
    console.log(`Starting to process email queue. ${emailQueue.length} emails in queue.`);

    try {
        while (emailQueue.length > 0) {
            const { mailOptions, callback } = emailQueue.shift();

            console.log(`Processing email to ${mailOptions.to} (${emailQueue.length} remaining in queue)`);

            // Send the email
            const result = await sendEmail(mailOptions);

            // Call the callback with the result
            callback(result);

            // Add delay between emails to avoid hitting rate limits
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

// Send emails in background but now using the queue
const sendEmailsInBackground = (adminOptions, userOptions) => {
    // Queue admin email
    queueEmail(adminOptions)
        .then(result => {
            console.log('Admin email queued result:', result);

            // Queue user email if provided
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
    sendEmail: queueEmail, // Replace direct sending with queueing
    sendEmailsInBackground,
    getQueueStatus: () => ({
        queueLength: emailQueue.length,
        isProcessing: isProcessingQueue
    })
};