import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Upload, 
  FileText, 
  Check, 
  AlertCircle, 
  Loader2, 
  ChevronDown, 
  Search, 
  Globe, 
  Linkedin,
  Briefcase,
  MapPin,
  Clock
} from 'lucide-react';
import usePreventScroll from '../hooks/usePreventScroll';
import { sendJobApplicationEmails } from '../utils/emailService';

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
];

const JobApplication = ({ job, onClose }) => {
  const modalRef = useRef(null);
  const nameInputRef = useRef(null);
  const countryDropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const autoCloseTimerRef = useRef(null);

  // Prevent background body scroll while modal is active
  usePreventScroll(true);

  // Safe default job object to prevent null/undefined crashes
  const activeJob = {
    title: 'General Application',
    department: 'General',
    location: 'Remote / On-site',
    type: 'Full-time',
    description: 'Submit your resume for current or future career opportunities with Praskla Digital X.',
    ...(job || {})
  };

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
    portfolio: '',
    linkedin: '',
    resume: null,
    coverLetter: ''
  });

  const [errors, setErrors] = useState({});

  const handleClose = () => {
    if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    if (onClose) onClose();
  };

  // Keyboard navigation listener (Escape closes modal)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  // Focus search input when country list dropdown opens
  useEffect(() => {
    if (showCountryList) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [showCountryList]);

  // Validation helper
  const validateField = (name, value, currentFile = formData.resume, country = selectedCountry) => {
    let err = '';
    const trimmed = typeof value === 'string' ? value.trim() : '';

    if (name === 'name') {
      if (!trimmed) {
        err = 'Please enter your full name.';
      } else if (trimmed.length < 2) {
        err = 'Name must be at least 2 characters.';
      } else if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
        err = 'Name should only contain alphabets and standard characters.';
      }
    }

    if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!trimmed) {
        err = 'Please enter your email address.';
      } else if (!emailRegex.test(trimmed)) {
        err = 'Enter a valid email (e.g. name@domain.com).';
      }
    }

    if (name === 'phone') {
      const cleanDigits = typeof value === 'string' ? value.replace(/\D/g, '') : '';
      if (!cleanDigits) {
        err = 'Phone number is required.';
      } else if (cleanDigits.length < country.minLen) {
        err = `Phone number is too short (${cleanDigits.length}/${country.minLen} digits).`;
      } else if (cleanDigits.length > country.maxLen) {
        err = `Phone number exceeds max limit of ${country.maxLen} digits.`;
      }
    }

    if (name === 'coverLetter') {
      if (!trimmed) {
        err = 'Cover letter is required.';
      } else if (trimmed.length < 10) {
        err = 'Cover letter must be at least 10 characters.';
      } else if (value.length > 500) {
        err = 'Cover letter cannot exceed 500 characters.';
      }
    }

    if (name === 'resume') {
      if (!currentFile) {
        err = 'Please upload your resume (PDF or Word).';
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
    } else if (name === 'coverLetter') {
      processedValue = value.slice(0, 500);
    } else if (name === 'portfolio' || name === 'linkedin') {
      processedValue = value.trim().slice(0, 150);
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    if (errors[name]) {
      const liveErr = validateField(name, processedValue);
      setErrors(prev => ({
        ...prev,
        [name]: liveErr
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const validTypes = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!validTypes.includes(file.type) && !/\.(pdf|doc|docx)$/i.test(file.name)) {
        setErrors(prev => ({
          ...prev,
          resume: 'Invalid format. Please upload a PDF, DOC, or DOCX file.'
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          resume: 'File size exceeds maximum limit of 5MB.'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        resume: file
      }));

      setErrors(prev => ({
        ...prev,
        resume: ''
      }));
    }
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryList(false);
    setCountrySearch('');
    if (formData.phone) {
      const phoneErr = validateField('phone', formData.phone, formData.resume, country);
      setErrors(prev => ({ ...prev, phone: phoneErr }));
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const validateAll = () => {
    const newErrors = {};
    const nameErr = validateField('name', formData.name);
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateField('email', formData.email);
    if (emailErr) newErrors.email = emailErr;

    const phoneErr = validateField('phone', formData.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const coverErr = validateField('coverLetter', formData.coverLetter);
    if (coverErr) newErrors.coverLetter = coverErr;

    const resumeErr = validateField('resume', null, formData.resume);
    if (resumeErr) newErrors.resume = resumeErr;

    return newErrors;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSubmitError('');

    const validationErrors = validateAll();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      let resumeBase64 = '';
      if (formData.resume) {
        resumeBase64 = await convertFileToBase64(formData.resume).catch(() => '');
      }

      const formattedData = {
        timestamp: new Date().toISOString(),
        jobTitle: activeJob.title || 'General Application',
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: `${selectedCountry.code} ${formData.phone.replace(/\D/g, '')}`,
        portfolio: formData.portfolio.trim(),
        linkedin: formData.linkedin.trim(),
        coverLetter: formData.coverLetter.trim(),
        resumeFileName: formData.resume ? formData.resume.name : '',
        resumeBase64: resumeBase64,
        targetGid: "0"
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      await fetch(
        'https://script.google.com/macros/s/AKfycbxhy7gcPdsxeOWFPj8NpGYp6RD4PQN2DcLKRkGVSUSlnLeTdnYQbEPzbxa-Xqd8stDD/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedData),
          signal: controller.signal
        }
      ).catch(err => {
        console.warn('Google script application endpoint notice:', err);
      }).finally(() => clearTimeout(timeoutId));

      await sendJobApplicationEmails(formattedData, activeJob).catch(err => {
        console.warn('Queue application email service notice:', err);
      });

      setSubmitSuccess(true);
      setErrors({});

      autoCloseTimerRef.current = setTimeout(() => {
        handleClose();
      }, 4500);

    } catch (err) {
      console.error('Job application submission error:', err);
      setSubmitError('Unable to submit application. Please try again.');
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
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-app-modal-title"
      >
        {/* Backdrop Blur Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-md"
          onClick={handleClose}
        />

        {/* Modal Container Card */}
        <motion.div 
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
          className="w-full max-w-[620px] bg-white rounded-[28px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] border border-gray-100 relative flex flex-col my-auto overflow-hidden text-gray-900 font-sans p-6 sm:p-7 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Circle Button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E31D2E]/20 z-20"
            aria-label="Close application modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FF2B2B]/5 text-[#FF2B2B] border border-[#FF2B2B]/20">
                {activeJob.department || 'Career Opportunity'}
              </span>
              <span className="text-gray-400 text-xs">•</span>
              <span className="text-gray-500 text-xs font-medium">{activeJob.location || 'Remote'}</span>
            </div>
            <h2 id="job-app-modal-title" className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">
              Apply for {activeJob.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1 leading-relaxed line-clamp-2">
              {activeJob.description}
            </p>
          </div>

          {/* Success Overlay View */}
          {submitSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 px-4 text-center flex flex-col items-center justify-center space-y-4"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 border border-emerald-100 shadow-sm">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#111111]">Application Submitted Successfully</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">
                  Thank you for applying to Praskla Digital X! We have received your application and resume, and our recruitment team will get back to you soon.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="mt-2 px-6 py-2.5 bg-[#111111] hover:bg-black text-white rounded-xl text-xs uppercase tracking-wider font-semibold shadow-md transition-all focus:outline-none"
              >
                Close
              </button>
            </motion.div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} noValidate className="space-y-4 max-h-[72vh] overflow-y-auto pr-1">
              
              {/* Submission Error Banner */}
              {submitError && (
                <div className="p-3.5 bg-[#FF2B2B]/5 border border-[#FF2B2B]/20 rounded-xl text-[#FF2B2B] text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Grid: Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Full Name */}
                <div>
                  <label htmlFor="applicant-name" className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Full Name <span className="text-[#FF2B2B]">*</span>
                  </label>
                  <input
                    ref={nameInputRef}
                    id="applicant-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Jane Doe"
                    className={`w-full h-10 px-3.5 text-xs sm:text-sm text-[#111111] bg-white hover:bg-gray-50 focus:bg-white border rounded-xl placeholder:text-gray-400 font-medium transition-all outline-none
                              ${errors.name ? 'border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' : 'border-[#E5E5E5] focus:border-[#FF2B2B] focus:ring-4 focus:ring-[#FF2B2B]/15'}`}
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
                  <label htmlFor="applicant-email" className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Email Address <span className="text-[#FF2B2B]">*</span>
                  </label>
                  <input
                    id="applicant-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jane@example.com"
                    className={`w-full h-10 px-3.5 text-xs sm:text-sm text-[#111111] bg-white hover:bg-gray-50 focus:bg-white border rounded-xl placeholder:text-gray-400 font-medium transition-all outline-none
                              ${errors.email ? 'border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' : 'border-[#E5E5E5] focus:border-[#FF2B2B] focus:ring-4 focus:ring-[#FF2B2B]/15'}`}
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
                <label htmlFor="applicant-phone" className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Phone Number <span className="text-[#FF2B2B]">*</span>
                </label>
                <div
                  ref={countryDropdownRef}
                  className={`relative flex items-center w-full h-10 bg-white hover:bg-gray-50/80 focus-within:bg-white border rounded-xl transition-all duration-200 ${
                    errors.phone
                      ? 'border-red-500 bg-red-50/20 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/10'
                      : 'border-[#E5E5E5] focus-within:border-[#FF2B2B] focus-within:ring-4 focus-within:ring-[#FF2B2B]/15'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setShowCountryList(!showCountryList)}
                    className="h-full px-3 flex items-center gap-1.5 hover:bg-gray-100/70 transition-colors rounded-l-xl focus:outline-none shrink-0 cursor-pointer"
                  >
                    <img 
                      src={`https://flagcdn.com/w20/${selectedCountry.flag}.png`}
                      alt={selectedCountry.name}
                      className="w-4 h-auto rounded-sm object-cover shadow-2xs"
                    />
                    <span className="text-xs font-bold text-gray-800">{selectedCountry.code}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {/* Subtle Vertical Divider Line */}
                  <div className="w-[1px] h-5 bg-gray-200 shrink-0" />

                  <input
                    id="applicant-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                    className="w-full h-full px-3 bg-transparent text-xs sm:text-sm text-[#111111] placeholder:text-gray-400 font-medium outline-none rounded-r-xl"
                  />

                  {/* Dropdown Menu */}
                  {showCountryList && (
                    <div className="absolute left-0 top-full mt-1.5 w-60 bg-white border border-[#ECECEC] rounded-2xl shadow-xl z-50 p-2 overflow-hidden">
                      <div className="relative mb-1.5">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          placeholder="Search country..."
                          className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-[#E5E5E5] rounded-lg outline-none focus:border-[#FF2B2B] text-gray-900"
                        />
                      </div>
                      <div className="max-h-40 overflow-y-auto space-y-0.5 pr-1">
                        {filteredCountries.map((c) => (
                          <button
                            key={`${c.country}-${c.code}`}
                            type="button"
                            onClick={() => handleCountrySelect(c)}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${selectedCountry.country === c.country ? 'bg-[#FF2B2B]/10 text-[#FF2B2B] font-semibold' : 'hover:bg-gray-50 text-gray-700'}`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <img src={`https://flagcdn.com/w20/${c.flag}.png`} alt={c.name} className="w-4 h-auto rounded-sm" />
                              <span className="truncate">{c.name}</span>
                            </div>
                            <span className="text-gray-400 font-mono text-[11px] ml-2 flex-shrink-0">{c.code}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-[11px] font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Grid: Optional Links (Portfolio & LinkedIn) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="applicant-portfolio" className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-gray-400" />
                    <span>Portfolio / Website <span className="text-gray-400 font-normal">(Optional)</span></span>
                  </label>
                  <input
                    id="applicant-portfolio"
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    placeholder="https://yourportfolio.com"
                    className="w-full h-10 px-3.5 text-xs sm:text-sm text-[#111111] bg-white hover:bg-gray-50 focus:bg-white border border-[#E5E5E5] focus:border-[#FF2B2B] focus:ring-4 focus:ring-[#FF2B2B]/15 rounded-xl placeholder:text-gray-400 font-medium transition-all outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="applicant-linkedin" className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                    <Linkedin className="w-3 h-3 text-gray-400" />
                    <span>LinkedIn Profile <span className="text-gray-400 font-normal">(Optional)</span></span>
                  </label>
                  <input
                    id="applicant-linkedin"
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full h-10 px-3.5 text-xs sm:text-sm text-[#111111] bg-white hover:bg-gray-50 focus:bg-white border border-[#E5E5E5] focus:border-[#FF2B2B] focus:ring-4 focus:ring-[#FF2B2B]/15 rounded-xl placeholder:text-gray-400 font-medium transition-all outline-none"
                  />
                </div>
              </div>

              {/* Resume Upload Drop Area */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Resume / CV <span className="text-[#FF2B2B]">*</span>
                </label>
                <label className={`relative flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 ${
                  errors.resume 
                    ? 'border-red-400 bg-red-50/20' 
                    : formData.resume 
                    ? 'border-emerald-500/80 bg-emerald-50/30' 
                    : 'border-[#E5E5E5] hover:border-[#FF2B2B]/50 bg-white hover:bg-gray-50'
                }`}>
                  {formData.resume ? (
                    <div className="flex items-center gap-2.5 text-emerald-700 font-semibold text-xs">
                      <FileText className="w-5 h-5 text-emerald-600" />
                      <span className="truncate max-w-[280px]">{formData.resume.name}</span>
                      <span className="text-[10px] text-emerald-600 font-normal">({(formData.resume.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center">
                      <Upload className="w-5 h-5 text-gray-400 mb-1.5" />
                      <span className="text-xs font-semibold text-gray-700">Upload your resume</span>
                      <span className="text-[11px] text-gray-400 mt-0.5">PDF, DOC, or DOCX (Max 5MB)</span>
                    </div>
                  )}
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                </label>
                {errors.resume && (
                  <p className="text-red-500 text-[11px] font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{errors.resume}</span>
                  </p>
                )}
              </div>

              {/* Cover Letter with Live Character Counter */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="applicant-cover-letter" className="text-xs font-semibold text-gray-700">
                    Cover Letter / Statement <span className="text-[#FF2B2B]">*</span>
                  </label>
                  <span className={`text-[11px] font-medium transition-colors ${formData.coverLetter.length > 450 ? 'text-[#FF2B2B]' : 'text-gray-400'}`}>
                    {formData.coverLetter.length} / 500
                  </span>
                </div>
                <textarea
                  id="applicant-cover-letter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Tell us why you are a great fit for this position..."
                  className={`w-full p-3 text-xs sm:text-sm text-[#111111] bg-white hover:bg-gray-50 focus:bg-white border rounded-xl placeholder:text-gray-400 font-medium transition-all outline-none resize-y min-h-[90px] max-h-[160px]
                            ${errors.coverLetter ? 'border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' : 'border-[#E5E5E5] focus:border-[#FF2B2B] focus:ring-4 focus:ring-[#FF2B2B]/15'}`}
                />
                {errors.coverLetter && (
                  <p className="text-red-500 text-[11px] font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{errors.coverLetter}</span>
                  </p>
                )}
              </div>

              {/* Buttons Footer */}
              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-100 mt-5">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-semibold text-xs uppercase tracking-wider transition-all focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#FF2B2B] hover:bg-[#E51D1D] text-white font-semibold text-xs uppercase tracking-wider shadow-[0_8px_20px_rgba(0,0,0,0.10)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-[#FF2B2B]/20"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </span>
                  ) : (
                    <span>Submit Application</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>,
    portalRoot
  );
};

export default JobApplication;