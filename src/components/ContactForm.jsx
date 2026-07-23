import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { sendContactFormEmails } from '../utils/emailService';

const countries = [
  { code: '+91', country: 'IN', flag: 'in', name: 'India' },
  { code: '+1', country: 'US', flag: 'us', name: 'United States' },
  { code: '+44', country: 'GB', flag: 'gb', name: 'United Kingdom' },
  { code: '+61', country: 'AU', flag: 'au', name: 'Australia' },
  { code: '+86', country: 'CN', flag: 'cn', name: 'China' },
  { code: '+81', country: 'JP', flag: 'jp', name: 'Japan' },
  { code: '+49', country: 'DE', flag: 'de', name: 'Germany' },
  { code: '+33', country: 'FR', flag: 'fr', name: 'France' },
  { code: '+39', country: 'IT', flag: 'it', name: 'Italy' },
  { code: '+7', country: 'RU', flag: 'ru', name: 'Russia' },
];

const ContactForm = ({ isOpen, onClose }) => {
  const modalRef = useRef();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showCountryList, setShowCountryList] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    if (!email) return false;
    const [username, domain] = email.split('@');
    if (!username || !domain) return false;
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9._]*$/;
    if (!usernameRegex.test(username)) return false;
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z0-9]\.com$/;
    if (!domainRegex.test(domain)) return false;
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    const maxLengths = {
      name: 18,
      email: 28,
      phone: 10,
      message: 500
    };
    if (name === 'name') {
      processedValue = value.replace(/[^a-zA-Z\s]/g, '').slice(0, maxLengths[name]);
    } else if (name === 'email') {
      processedValue = value.replace(/[^a-zA-Z0-9@.]/g, '').slice(0, maxLengths[name]);
    } else if (name === 'phone') {
      processedValue = value.replace(/\D/g, '').slice(0, maxLengths[name]);
    } else {
      processedValue = value.slice(0, maxLengths[name]);
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryList(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name should only contain alphabets';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., username@domain.com)';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const formattedData = {
        ...formData,
        phone: `${selectedCountry.code}${formData.phone}`
      };

      await fetch(
        'https://script.google.com/macros/s/AKfycbzM6Lq64FjN_xT1_wOqKk3p3x9w9Q8v4o8v4o8v4o8v4o8v4o8v4o8v4o8v/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedData)
        }
      );

      setSubmitSuccess(true);
      setErrors({});
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      sendContactFormEmails(formattedData)
        .then(emailResult => {
          if (!emailResult.success) {
            console.warn('Email sending had an issue:', emailResult.message);
          } else {
            console.log('Emails queued successfully:', emailResult.message);
          }
        })
        .catch(error => {
          console.error('Error queueing emails:', error);
        });

      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 5000);

    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const portalRoot = document.getElementById('portal-root');
  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-md z-[9999] flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div 
        ref={modalRef}
        className="w-full max-w-2xl bg-white/90 backdrop-blur-2xl border border-white/60 rounded-[28px] shadow-[0_24px_64px_rgba(17,17,17,0.1)] transform transition-all relative flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white text-gray-500 hover:text-[#111111] hover:scale-105 p-2 rounded-full shadow-[0_4px_12px_rgba(17,17,17,0.1)] border border-gray-100 transition-all z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Header */}
        <div className="border-b border-gray-100 p-6 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-black text-[#111111]">
                Reach Us
              </h2>
              <p className="text-[#575757] mt-1 text-sm">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </div>

        {/* Error Message Display */}
        {Object.keys(errors).length > 0 && Object.values(errors).some(error => error) && (
          <div className="fixed top-4 right-4 z-50 max-w-md bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold mb-1">Please fix the following errors:</p>
                <ul className="list-disc list-inside">
                  {Object.values(errors).filter(Boolean).map((error, index) => (
                    <li key={index} className="text-xs">{error}</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => setErrors({})}
                className="text-red-700 hover:text-red-900 ml-4"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {submitSuccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/95 rounded-[28px] z-[55]">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <svg 
                className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h3 className="text-xl font-black text-[#111111] mb-2">Message Sent Successfully!</h3>
              <p className="text-[#575757] text-sm">Thank you for reaching out to us. We'll get back to you soon.</p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  maxLength={18}
                  className={`w-full px-4 py-3 rounded-full border text-[#111111] bg-white/50
                            focus:ring-2 focus:ring-[#E31D2E]/20 focus:border-[#E31D2E]/40 outline-none transition-all
                            ${errors.name ? 'border-red-500 font-medium' : 'border-white/80'}`}
                  placeholder="Enter your name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  maxLength={28}
                  className={`w-full px-4 py-3 rounded-full border text-[#111111] bg-white/50
                            focus:ring-2 focus:ring-[#E31D2E]/20 focus:border-[#E31D2E]/40 outline-none transition-all
                            ${errors.email ? 'border-red-500 font-medium' : 'border-white/80'}`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative flex">
                <div 
                  className="relative"
                  onBlur={() => setTimeout(() => setShowCountryList(false), 200)}
                >
                  <button
                    type="button"
                    className="flex items-center px-4 py-3 border border-r-0 border-white/80 rounded-l-full bg-white/50 text-[#111111] hover:bg-white/70 focus:outline-none"
                    onClick={() => setShowCountryList(!showCountryList)}
                  >
                    <img 
                      src={`https://flagcdn.com/w20/${selectedCountry.flag}.png`}
                      alt={selectedCountry.name}
                      className="w-5 h-auto mr-2"
                    />
                    <span className="text-[#575757] text-xs font-semibold">{selectedCountry.code}</span>
                    <svg className="w-4 h-4 ml-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Country Selection Dropdown */}
                  {showCountryList && (
                    <div className="absolute z-[60] mt-1 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl max-h-60 overflow-y-auto p-1">
                      {countries.map((country) => (
                        <button
                          key={country.country}
                          type="button"
                          className="flex items-center w-full px-3 py-2 text-left rounded-xl hover:bg-gray-50 transition-colors text-xs"
                          onClick={() => handleCountrySelect(country)}
                        >
                          <img
                            src={`https://flagcdn.com/w20/${country.flag}.png`}
                            alt={country.name}
                            className="w-5 h-auto mr-2"
                          />
                          <span className="text-[#111111] font-medium">{country.name}</span>
                          <span className="text-[#8B8B8B] ml-auto">{country.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  maxLength={10}
                  className={`w-full px-4 py-3 border rounded-r-full text-[#111111] bg-white/50
                            focus:ring-2 focus:ring-[#E31D2E]/20 focus:border-[#E31D2E]/40 outline-none transition-all
                            ${errors.phone ? 'border-red-500 font-medium' : 'border-white/80'}`}
                  placeholder="Enter phone number"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="4"
                maxLength={500}
                className={`w-full px-4 py-3 border rounded-[20px] text-[#111111] bg-white/50
                          focus:ring-2 focus:ring-[#E31D2E]/20 focus:border-[#E31D2E]/40 outline-none transition-all
                          resize-y max-h-[160px] min-h-[90px]
                          ${errors.message ? 'border-red-500 font-medium' : 'border-white/80'}`}
                placeholder="Your message here..."
                style={{ resize: 'vertical' }}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              <p className="text-[10px] text-[#8B8B8B] mt-1.5 font-semibold uppercase tracking-wide">{formData.message.length}/500 characters</p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-4 sm:p-6 flex-shrink-0">
          <div className="flex justify-between sm:justify-end items-center space-x-3 sm:space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-3 border border-white/80 rounded-full text-[#575757] hover:bg-black/5 hover:text-[#111111] transition-all duration-300 font-bold text-xs sm:text-sm uppercase tracking-wider"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 sm:flex-none px-6 py-3 bg-[#E31D2E] text-white rounded-full
                        hover:bg-[#111111] transition-all duration-300 font-bold text-xs sm:text-sm uppercase tracking-wider
                        disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_20px_rgba(227,29,46,0.15)]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : "Send Message"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    portalRoot
  );
};

export default ContactForm;