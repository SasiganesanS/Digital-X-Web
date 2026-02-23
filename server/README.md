# Praskla Email Server

Email handling server for the Praskla Technology website. This server processes and sends emails for contact forms, job applications, and pricing quotes.

## Setup

1. Install dependencies:
```
npm install
```

2. Configure environment variables:
Create a `.env` file in the root directory with the following variables:
```
PORT=3001
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-email-password
```

## Usage

### Development
```
npm run dev
```

### Production
```
npm start
```

## API Endpoints

- `POST /api/send-email`: Sends email based on provided data
- `GET /health`: Health check endpoint

## Email Types

- Contact forms (`contact_admin`, `contact_user`)
- Job applications (`job_admin`, `job_user`)
- Pricing quotes (`quote_admin`, `quote_user`) 