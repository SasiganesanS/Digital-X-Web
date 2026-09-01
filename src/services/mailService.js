// src/services/mailService.js
// Centralized Frontend Mail Service interacting directly with Mail/PY REST API

const getMailApiUrl = () => import.meta.env.VITE_MAIL_API_URL || 'https://mail.prasklatechnology.com/api/send-email';
const getMailApiKey = () => import.meta.env.VITE_MAIL_API_KEY || '';
const getMailRecipient = () => import.meta.env.VITE_MAIL_RECIPIENT || 'business@praskladigitalx.com';

/**
 * Normalizes HTTP status & network fetch errors into user-friendly messages
 */
const handleApiError = (response, data, error) => {
  if (error) {
    const msg = error.message || '';
    if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('Load failed')) {
      return 'Unable to connect to email service. Please check your network connection or reach out on WhatsApp.';
    }
    return msg || 'Failed to submit form. Please try again.';
  }

  if (!response) return 'Unable to complete request.';

  switch (response.status) {
    case 400:
      return data?.message || data?.error || 'Invalid form parameters. Please review your input.';
    case 401:
      return data?.message || data?.error || 'Mail service authorization key is invalid or missing.';
    case 403:
      return data?.message || data?.error || 'Request origin restricted or access forbidden.';
    case 422:
      return data?.message || data?.error || 'Submission flagged by security filter. Please adjust your message.';
    case 500:
    default:
      return data?.message || data?.error || 'Mail transmission error. Please try again or reach out on WhatsApp.';
  }
};

/**
 * Universal Mail/PY API Caller
 * POST https://mail.prasklatechnology.com/api/send-email
 */
export const sendMail = async ({ subject, html, template, variables, to }) => {
  try {
    const apiUrl = getMailApiUrl();
    const apiKey = getMailApiKey();
    const recipient = to || getMailRecipient();

    const payload = {
      queue: true,
      to: recipient,
    };

    if (template) {
      payload.template = template;
      payload.variables = variables || {};
      if (subject) payload.subject = subject;
    } else if (html) {
      payload.subject = subject || 'New Website Submission';
      payload.html = html;
    } else {
      throw new Error('Either template or html must be provided to sendMail');
    }

    const headers = {
      'Content-Type': 'application/json',
    };

    if (apiKey) {
      headers['X-API-Key'] = apiKey;
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.success === false) {
      return {
        success: false,
        message: handleApiError(response, data, null),
        status: response.status,
      };
    }

    return {
      success: true,
      data,
      message: data.message || 'Email sent successfully.',
    };
  } catch (error) {
    return {
      success: false,
      message: handleApiError(null, null, error),
    };
  }
};
