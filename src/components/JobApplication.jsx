import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import usePreventScroll from '../hooks/usePreventScroll';
import axios from 'axios';
import { sendJobApplicationEmails } from '../utils/emailService';

// Country codes data
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

const JobApplication = ({ job, onClose }) => {
  const modalRef = useRef();
  const formRef = useRef();
  usePreventScroll(true); // Pass true to indicate modal is open
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showCountryList, setShowCountryList] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Default to India
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    // Check if email is empty
    if (!email) return false;

    // Split email into username and domain parts
    const [username, domain] = email.split('@');

    // Check if both username and domain exist
    if (!username || !domain) return false;

    // Username validation:
    // 1. Must start with a letter (not number or special char)
    // 2. Can only contain letters, numbers, dots, or underscores
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9._]*$/;
    if (!usernameRegex.test(username)) return false;

    // Domain validation:
    // 1. Must have at least one dot
    // 2. Must end with .com
    // 3. Can only contain letters, numbers, dots, and hyphens
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z0-9]\.com$/;
    if (!domainRegex.test(domain)) return false;

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Apply max length restrictions
    const maxLengths = {
      name: 18,
      email: 28,
      phone: 10,
      coverLetter: 500
    };

    // Validate name (only alphabets)
    if (name === 'name') {
      processedValue = value.replace(/[^a-zA-Z\s]/g, '').slice(0, maxLengths[name]);
    }
    // Validate email (only allow letters, numbers, @, and .)
    else if (name === 'email') {
      processedValue = value.replace(/[^a-zA-Z0-9@.]/g, '').slice(0, maxLengths[name]);
    }
    // Validate phone (only numbers)
    else if (name === 'phone') {
      processedValue = value.replace(/\D/g, '').slice(0, maxLengths[name]);
    }
    // Other fields just apply max length
    else {
      processedValue = value.slice(0, maxLengths[name] || value.length);
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          resume: 'Please upload a PDF or Word document'
        }));
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          resume: 'File size should be less than 5MB'
        }));
        return;
      }

      // Clear any existing resume errors and set the file
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.resume; // Remove resume error if exists
        return newErrors;
      });

      console.log('File uploaded successfully:', file.name);
    }
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryList(false);
  };

  // Function to convert file to base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit handler triggered');
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name should only contain alphabets';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., username@domain.com)';
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    // Validate cover letter
    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter is required';
    }

    // Validate resume - only if no file is selected
    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    }

    // If there are any errors, show them and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Only show alert if there are actual error messages
      if (Object.values(newErrors).some(error => error)) {
        alert('Please fix the following errors:\n' + Object.values(newErrors).filter(Boolean).join('\n'));
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert resume file to base64 if it exists
      let resumeBase64 = '';
      if (formData.resume) {
        resumeBase64 = await convertFileToBase64(formData.resume);
        console.log('Resume converted to base64');
      }

      // Prepare data for Google Sheets
      const formattedData = {
        timestamp: new Date().toISOString(),
        jobTitle: job?.title || 'Not specified',
        name: formData.name,
        email: formData.email,
        phone: `${selectedCountry.code}${formData.phone}`,
        coverLetter: formData.coverLetter,
        resumeFileName: formData.resume ? formData.resume.name : '',
        resumeBase64: resumeBase64,
        targetGid: "0" // Careers sheet GID
      };

      console.log('Sending data to Google Sheets...');

      // Using fetch with no-cors mode
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbxhy7gcPdsxeOWFPj8NpGYp6RD4PQN2DcLKRkGVSUSlnLeTdnYQbEPzbxa-Xqd8stDD/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedData)
        }
      );

      // Show success message immediately
      console.log('Form submitted successfully');
      setSubmitSuccess(true);
      setErrors({});

      // Send emails using queue system (non-blocking)
      console.log('Queueing job application emails...');
      sendJobApplicationEmails(formattedData, job)
        .then(emailResult => {
          if (!emailResult.success) {
            console.warn('Email sending had an issue:', emailResult.message);
          } else {
            console.log('Application emails queued successfully:', emailResult.message);
          }
        })
        .catch(error => {
          console.error('Error queueing emails:', error);
        });

      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 6000);

    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    (
      <div
        className="fixed inset-0 flex items-center justify-center p-4 bg-black/60"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          overflow: 'hidden' // prevent page scroll; modal will handle internal scrolling
        }}
      >
        <div
          ref={modalRef}
          className="w-full bg-[#111111] rounded-xl shadow-2xl transform transition-all flex flex-col text-white"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10000,
            width: 'min(720px, calc(100% - 48px))', // leave 24px gap on each side
            maxHeight: 'calc(100vh - 96px)', // leave 48px gap top/bottom
            overflowY: 'auto',
            boxSizing: 'border-box',
            border: '1px solid rgba(255,255,255,0.05)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            aria-label="Close application modal"
            className="absolute top-4 right-4 bg-[#1a1a1a] text-white/60 hover:text-white p-0 rounded-full shadow-md transition-colors z-20 border border-white/10 w-10 h-10 flex items-center justify-center"
            style={{ backdropFilter: 'blur(4px)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="border-b border-white/5 p-6 pr-14 flex-shrink-0">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-[#E8192C]">
                  Apply for {job.title}
                </h2>
                <p className="text-white/60 mt-1 uppercase text-[10px] tracking-widest font-bold">ABOUT THE ROLE</p>
                <p className="text-white/40 mt-1 text-sm">{job.description}</p>
              </div>
            </div>
          </div>

          {/* Form - Make this section scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Full Name <span className="text-[#E8192C]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    maxLength={18}
                    className={`w-full px-4 py-2 bg-[#1a1a1a] border rounded-lg text-white
                            focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C]
                            ${errors.name ? 'border-red-500' : 'border-white/10'}`}
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Email Address <span className="text-[#E8192C]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    maxLength={28}
                    className={`w-full px-4 py-2 bg-[#1a1a1a] border rounded-lg text-white
                            focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C]
                            ${errors.email ? 'border-red-500' : 'border-white/10'}`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Phone Number <span className="text-[#E8192C]">*</span>
                </label>
                <div className="relative flex">
                  <div
                    className="relative"
                    onBlur={() => setTimeout(() => setShowCountryList(false), 200)}
                  >
                    <button
                      type="button"
                      className="flex items-center px-3 py-2 border border-r-0 border-white/10 rounded-l-lg bg-[#1a1a1a] hover:bg-[#252525] focus:outline-none"
                      onClick={() => setShowCountryList(!showCountryList)}
                    >
                      <img
                        src={`https://flagcdn.com/w20/${selectedCountry.flag}.png`}
                        alt={selectedCountry.name}
                        className="w-5 h-auto mr-2"
                      />
                      <span className="text-white/60">{selectedCountry.code}</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Country Selection Dropdown */}
                    {showCountryList && (
                      <div className="absolute z-10 mt-1 w-56 bg-[#1a1a1a] border border-[#2A2A2A] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {countries.map((country) => (
                          <button
                            key={country.country}
                            type="button"
                            className="flex items-center w-full px-4 py-2 text-left hover:bg-white/5"
                            onClick={() => handleCountrySelect(country)}
                          >
                            <img
                              src={`https://flagcdn.com/w20/${country.flag}.png`}
                              alt={country.name}
                              className="w-5 h-auto mr-2"
                            />
                            <span className="text-white/80">{country.name}</span>
                            <span className="text-white/40 ml-auto">{country.code}</span>
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
                    className={`w-full px-4 py-2 bg-[#1a1a1a] border rounded-r-lg text-white
                            focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C]
                            ${errors.phone ? 'border-red-500' : 'border-white/10'}`}
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Cover Letter <span className="text-[#E8192C]">*</span>
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  maxLength={500}
                  className={`w-full px-4 py-2 bg-[#1a1a1a] border rounded-lg text-white
                          focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C]
                          resize-y max-h-[200px] min-h-[100px]
                          ${errors.coverLetter ? 'border-red-500' : 'border-white/10'}`}
                  placeholder="Tell us why you're interested in this position..."
                  style={{ resize: 'vertical' }}
                />
                {errors.coverLetter && <p className="text-red-500 text-sm mt-1">{errors.coverLetter}</p>}
                <p className="text-sm text-white/40 mt-1">{formData.coverLetter.length}/500 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Resume <span className="text-[#E8192C]">*</span>
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className={`w-full flex flex-col items-center px-4 py-6 bg-[#1a1a1a]
                                border-2 border-dashed rounded-lg cursor-pointer
                                ${errors.resume ? 'border-red-500' : 'border-white/10 hover:border-[#E8192C]'}`}>
                    <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="mt-2 text-sm text-white/40 text-center">
                      {formData.resume ? formData.resume.name : 'Drop your resume here or click to upload'}
                    </span>
                    <input
                      type="file"
                      name="resume"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      required
                      className="hidden"
                    />
                  </label>
                </div>
                {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
                <p className="text-sm text-white/40 mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
              </div>
            </form>
          </div>

          {/* Footer - Keep this fixed at the bottom */}
          <div className="border-t border-white/5 p-4 sm:p-6 flex-shrink-0">
            <div className="flex justify-between sm:justify-end items-center space-x-3 sm:space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2 border border-white/10 rounded-lg text-white/70
                        hover:bg-white/5 transition-colors duration-300 font-medium text-sm sm:text-base"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-[#E8192C] text-white rounded-lg
                        hover:bg-[#C0141C] transition-colors duration-300 font-medium text-sm sm:text-base
                        disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : "Submit Application"}
              </button>
            </div>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#111111]/90 rounded-xl">
              <div className="text-center p-6 bg-[#1a1a1a] rounded-lg shadow-lg border border-[#E8192C]/20">
                <svg
                  className="w-16 h-16 text-[#E8192C] mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <h3 className="text-xl font-bold text-white mb-2">Application Submitted!</h3>
                <p className="text-white/40">Thank you for applying. We'll review your application and get back to you soon.</p>
              </div>
            </div>
          )}

          {/* Error Message Display */}
          {Object.keys(errors).length > 0 && Object.values(errors).some(error => error) && (
            <div className="fixed top-4 right-4 z-50 max-w-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold mb-2">Please fix the following errors:</p>
                  <ul className="list-disc list-inside">
                    {Object.values(errors).filter(Boolean).map((error, index) => (
                      <li key={index} className="text-sm">{error}</li>
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
        </div>
      </div>
    ),
    document.body
  );
};

export default JobApplication; 