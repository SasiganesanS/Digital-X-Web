# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Praskla Technology Website

This repository contains the Praskla Technology website built with React and Vite. The website includes contact forms, career pages, and pricing information.

## Features

- Contact form with email notifications
- Career application forms with resume upload
- Pricing pages with quote request forms
- Email notifications for all form submissions

## Email Integration

The website uses Hostinger SMTP for sending emails with an asynchronous message queue system. The configuration is set up in `src/utils/emailService.js`.

### Email Configuration

- SMTP Server: smtp.hostinger.com
- Port: 465 (SSL)
- Email: info@prasklatechnology.com

### Message Queue System

The email service implements a message queue with the following features:

- Asynchronous processing: Forms submit immediately while emails are sent in the background
- Delayed sending: 2-second delay between emails to avoid rate limiting
- Failure resilience: Queue continues processing even if one email fails

### Testing Email Functionality

To test the email functionality:

