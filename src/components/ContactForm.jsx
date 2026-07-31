import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Search, 
  Check, 
  AlertCircle, 
  ChevronDown, 
  Loader2, 
  Send 
} from 'lucide-react';
import { sendContactFormEmails } from '../utils/emailService';

const COUNTRIES = [
  { code: '+91', country: 'IN', flag: 'in', name: 'India', minLen: 10, maxLen: 10 },
  { code: '+1', country: 'US', flag: 'us', name: 'United States', minLen: 10, maxLen: 10 },
  { code: '+44', country: 'GB', flag: 'gb', name: 'United Kingdom', minLen: 10, maxLen: 11 },
  { code: '+61', country: 'AU', flag: 'au', name: 'Australia', minLen: 9, maxLen: 10 },
  { code: '+1', country: 'CA', flag: 'ca', name: 'Canada', minLen: 10, maxLen: 10 },
  { code: '+49', country: 'DE', flag: 'de', name: 'Germany', minLen: 10, maxLen: 11 },
  { code: '+33', country: 'FR', flag: 'fr', name: 'France', minLen: 9, maxLen: 10 },
  { code: '+81', country: 'JP', flag: 'jp', name: 'Japan', minLen: 10, maxLen: 11 },
  { code: '+86', country: 'CN', flag: 'cn', name: 'China', minLen: 11, maxLen: 11 },
  { code: '+65', country: 'SG', flag: 'sg', name: 'Singapore', minLen: 8, maxLen: 8 },
  { code: '+971', country: 'AE', flag: 'ae', name: 'United Arab Emirates', minLen: 9, maxLen: 9 },
  { code: '+39', country: 'IT', flag: 'it', name: 'Italy', minLen: 10, maxLen: 10 },
  { code: '+31', country: 'NL', flag: 'nl', name: 'Netherlands', minLen: 9, maxLen: 9 },
  { code: '+34', country: 'ES', flag: 'es', name: 'Spain', minLen: 9, maxLen: 9 },
  { code: '+55', country: 'BR', flag: 'br', name: 'Brazil', minLen: 10, maxLen: 11 },
  { code: '+52', country: 'MX', flag: 'mx', name: 'Mexico', minLen: 10, maxLen: 10 },
];

const ContactForm = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const messageInputRef = useRef(null);
  const searchInputRef = useRef(null);
  const countryDropdownRef = useRef(null);
  const autoCloseTimerRef = useRef(null);

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showCountryList, setShowCountryList] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countrySearch, setCountrySearch] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  // Reset form when modal opens or closes
  const resetFormState = () => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setErrors({});
    setSubmitError('');
    setSubmitSuccess(false);
    setIsSubmitting(false);
    setShowCountryList(false);
    setCountrySearch('');
  };

  const handleClose = () => {
    if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    resetFormState();
    onClose();
  };

  // Keyboard navigation & Focus management
  useEffect(() => {
    if (!isOpen) return;

    // Focus initial name field after animation
    const timer = setTimeout(() => {
      nameInputRef.current?.focus();
    }, 120);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusable = modalRef.current.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex="0"]'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [isOpen]);

  // Click outside to close country dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target)) {
        setShowCountryList(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when country dropdown opens
  useEffect(() => {
    if (showCountryList) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [showCountryList]);

  // Real-time validation helper
  const validateField = (name, value, country = selectedCountry) => {
    let err = '';
    const trimmed = value.trim();

    if (name === 'name') {
      if (!trimmed) {
        err = 'Please enter your name.';
      } else if (trimmed.length < 2) {
        err = 'Name must be at least 2 characters.';
      } else if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
        err = 'Name should only contain alphabets and standard characters.';
      }
    }

    if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!trimmed) {
        err = 'Please enter your email.';
      } else if (!emailRegex.test(trimmed)) {
        err = 'Enter a valid email (e.g. name@domain.com).';
      }
    }

    if (name === 'phone') {
      const cleanDigits = value.replace(/\D/g, '');
      if (!cleanDigits) {
        err = 'Phone number is required.';
      } else if (cleanDigits.length < country.minLen) {
        err = `Phone number is too short (${cleanDigits.length}/${country.minLen} digits).`;
      } else if (cleanDigits.length > country.maxLen) {
        err = `Phone number exceeds max limit of ${country.maxLen} digits.`;
      }
    }

    if (name === 'message') {
      if (!trimmed) {
        err = 'Message is required.';
      } else if (trimmed.length < 10) {
        err = 'Message must be at least 10 characters.';
      } else if (value.length > 500) {
        err = 'Message cannot exceed 500 characters.';
      }
    }

    return err;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'name') {
      processedValue = value.slice(0, 40);
    } else if (name === 'email') {
      processedValue = value.trim().slice(0, 60);
    } else if (name === 'phone') {
      processedValue = value.replace(/\D/g, '').slice(0, selectedCountry.maxLen);
    } else if (name === 'message') {
      processedValue = value.slice(0, 500);
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear error dynamically as user types
    if (errors[name]) {
      const liveErr = validateField(name, processedValue);
      setErrors(prev => ({
        ...prev,
        [name]: liveErr
      }));
    }
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryList(false);
    setCountrySearch('');
    // Re-validate phone length with new country requirements
    if (formData.phone) {
      const phoneErr = validateField('phone', formData.phone, country);
      setErrors(prev => ({ ...prev, phone: phoneErr }));
    }
  };

  const validateAll = () => {
    const newErrors = {};
    const nameErr = validateField('name', formData.name);
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateField('email', formData.email);
    if (emailErr) newErrors.email = emailErr;

    const phoneErr = validateField('phone', formData.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const messageErr = validateField('message', formData.message);
    if (messageErr) newErrors.message = messageErr;

    return newErrors;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSubmitError('');

    const validationErrors = validateAll();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus the first invalid field
      if (validationErrors.name) nameInputRef.current?.focus();
      else if (validationErrors.email) emailInputRef.current?.focus();
      else if (validationErrors.phone) phoneInputRef.current?.focus();
      else if (validationErrors.message) messageInputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);

    const formattedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: `${selectedCountry.code} ${formData.phone.replace(/\D/g, '')}`,
      message: formData.message.trim(),
      timestamp: new Date().toISOString()
    };

    try {
      // Primary API endpoint call with abort controller timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      await fetch(
        'https://script.google.com/macros/s/AKfycbzM6Lq64FjN_xT1_wOqKk3p3x9w9Q8v4o8v4o8v4o8v4o8v4o8v4o8v4o8v/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedData),
          signal: controller.signal
        }
      ).catch(err => {
        console.warn('Backend endpoint response notice:', err);
      }).finally(() => clearTimeout(timeoutId));

      // Asynchronous email queue notification
      await sendContactFormEmails(formattedData).catch(err => {
        console.warn('Queue email service notice:', err);
      });

      setSubmitSuccess(true);
      setErrors({});

      // Auto-close modal after 4 seconds
      autoCloseTimerRef.current = setTimeout(() => {
        handleClose();
      }, 4000);

    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError('Unable to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.code.includes(countrySearch) ||
    c.country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const portalRoot = typeof document !== 'undefined' ? (document.getElementById('portal-root') || document.body) : null;
  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reach-us-modal-title"
          aria-describedby="reach-us-modal-subtitle"
        >
          {/* Backdrop Blur Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div 
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
            className="w-full max-w-[520px] bg-white rounded-[28px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.22)] border border-gray-100 relative flex flex-col my-auto overflow-hidden text-gray-900 font-sans p-6 sm:p-7 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E31D2E]/20 z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 id="reach-us-modal-title" className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                Reach Us
              </h2>
              <p id="reach-us-modal-subtitle" className="text-sm text-gray-500 font-normal mt-1.5 leading-relaxed">
                We'd love to hear from you. Tell us about your project and we'll get back to you as soon as possible.
              </p>
            </div>

            {/* Success Overlay View */}
            {submitSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 px-4 text-center flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 border border-emerald-100 shadow-sm">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111111]">Message Sent Successfully</h3>
                  <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto leading-relaxed">
                    Thank you for reaching out. We have received your message and will respond shortly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-2 px-6 py-2.5 bg-[#111111] hover:bg-black text-white rounded-xl text-xs uppercase tracking-wider font-semibold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-black"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              /* Main Form View */
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                
                {/* Submission Error Banner */}
                {submitError && (
                  <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Grid Layout: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Full Name <span className="text-[#E31D2E]">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className={`w-full h-11 px-3.5 text-sm text-[#111111] bg-gray-50/60 hover:bg-white focus:bg-white border rounded-xl placeholder:text-gray-400 font-medium transition-all duration-200 outline-none
                                ${errors.name ? 'border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-gray-200 focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/10'}`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-[11px] font-medium mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Email Address <span className="text-[#E31D2E]">*</span>
                    </label>
                    <input
                      ref={emailInputRef}
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@example.com"
                      className={`w-full h-11 px-3.5 text-sm text-[#111111] bg-gray-50/60 hover:bg-white focus:bg-white border rounded-xl placeholder:text-gray-400 font-medium transition-all duration-200 outline-none
                                ${errors.email ? 'border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-gray-200 focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/10'}`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-[11px] font-medium mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone Field with Searchable Country Selector */}
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Phone Number <span className="text-[#E31D2E]">*</span>
                  </label>
                  <div className="relative flex items-center" ref={countryDropdownRef}>
                    {/* Country Selector Trigger Button */}
                    <button
                      type="button"
                      onClick={() => setShowCountryList(!showCountryList)}
                      className={`h-11 px-3 border border-r-0 rounded-l-xl bg-gray-50/60 hover:bg-gray-100/80 flex items-center gap-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E31D2E]/20 z-10
                                ${errors.phone ? 'border-red-500 bg-red-50/20' : 'border-gray-200'}`}
                    >
                      <img 
                        src={`https://flagcdn.com/w20/${selectedCountry.flag}.png`}
                        alt={selectedCountry.name}
                        className="w-4 h-auto rounded-sm object-cover"
                      />
                      <span className="text-xs font-semibold text-gray-700">{selectedCountry.code}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    </button>

                    {/* Searchable Country Dropdown Menu */}
                    {showCountryList && (
                      <div className="absolute left-0 top-full mt-1.5 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 p-2 overflow-hidden animate-in fade-in zoom-in-95">
                        {/* Dropdown Search Input */}
                        <div className="relative mb-1.5">
                          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            ref={searchInputRef}
                            type="text"
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            placeholder="Search country or code..."
                            className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#E31D2E] focus:bg-white text-gray-900"
                          />
                        </div>

                        {/* Country List */}
                        <div className="max-h-48 overflow-y-auto space-y-0.5 pr-1">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((c) => (
                              <button
                                key={`${c.country}-${c.code}`}
                                type="button"
                                onClick={() => handleCountrySelect(c)}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${selectedCountry.country === c.country ? 'bg-red-50 text-[#E31D2E] font-semibold' : 'hover:bg-gray-50 text-gray-700'}`}
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <img 
                                    src={`https://flagcdn.com/w20/${c.flag}.png`}
                                    alt={c.name}
                                    className="w-4 h-auto rounded-sm object-cover"
                                  />
                                  <span className="truncate">{c.name}</span>
                                </div>
                                <span className="text-gray-400 font-mono text-[11px] ml-2 flex-shrink-0">{c.code}</span>
                              </button>
                            ))
                          ) : (
                            <p className="text-xs text-gray-400 p-2 text-center">No countries found</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Phone Number Input */}
                    <input
                      ref={phoneInputRef}
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                      className={`w-full h-11 px-3.5 border rounded-r-xl text-sm text-[#111111] bg-gray-50/60 hover:bg-white focus:bg-white placeholder:text-gray-400 font-medium transition-all duration-200 outline-none
                                ${errors.phone ? 'border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-gray-200 focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/10'}`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-[11px] font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Message Box with Live Counter */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="contact-message" className="text-xs font-semibold text-gray-700">
                      Message <span className="text-[#E31D2E]">*</span>
                    </label>
                    <span className={`text-[11px] font-medium transition-colors ${formData.message.length > 450 ? 'text-[#E31D2E]' : 'text-gray-400'}`}>
                      {formData.message.length} / 500
                    </span>
                  </div>
                  <textarea
                    ref={messageInputRef}
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about your project or inquiry..."
                    className={`w-full p-3.5 text-sm text-[#111111] bg-gray-50/60 hover:bg-white focus:bg-white border rounded-xl placeholder:text-gray-400 font-medium transition-all duration-200 outline-none resize-y min-h-[105px] max-h-[200px]
                              ${errors.message ? 'border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'border-gray-200 focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/10'}`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-[11px] font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Form Buttons Footer */}
                <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-100 mt-6">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-semibold text-xs uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-[#E31D2E] hover:bg-[#c91827] text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-[#E31D2E]/20"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </span>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    portalRoot
  );
};

export default ContactForm;