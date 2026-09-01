# PRASKLA DIGITAL X — Static Frontend Application

This repository contains the static frontend application for **PRASKLA DIGITAL X**, built using React, Vite, and Tailwind CSS for deployment on MilesWeb static web hosting.

## Architecture

```
Customer Browser
    ↓
praskladigitalx.com (Static HTML/JS on MilesWeb)
    ↓ HTTPS API Request
Mail/PY API Service (https://mail.prasklatechnology.com/api/send-email)
    ↓
business@praskladigitalx.com
```

## Form Dispatcher (`src/utils/emailService.js`)

All frontend forms (Contact Form, Project Brief Applications, Service Quotations, and Career Applications) dispatch submissions via HTTPS `fetch()` requests directly to the Mail/PY service.

- **Recipient**: `business@praskladigitalx.com`
- **Endpoint**: `https://mail.prasklatechnology.com/api/send-email`
- **Security**: 100% frontend-only. Contains NO secret API keys, SMTP credentials, or database connection strings.

## Build Command

```bash
npm run build
```

Generates static distribution assets in the `dist/` directory for uploading to MilesWeb `public_html`.
