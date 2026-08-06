import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  AlertCircle,
  Loader2,
  Send,
  Building2,
  User,
  Palette,
  Layers,
  Target,
  Calendar,
  Wallet,
  Link2,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { sendContactFormEmails } from "../utils/emailService";

export default function ProjectBriefModal({ isOpen, onClose }) {
  const [activeSection, setActiveSection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    // Section 1
    companyName: "",
    businessType: "Small & Medium Business",
    industry: "",
    companyWebsite: "",
    businessDescription: "",
    yearsInBusiness: "1–3 years",

    // Section 2
    fullName: "",
    designation: "",
    email: "",
    phone: "",
    altPhone: "",
    whatsapp: "",
    officeAddress: "",
    city: "",
    state: "",
    country: "India",
    postalCode: "",
    preferredContactMethod: "Email",

    // Section 3
    hasLogo: "No",
    logoLink: "",
    existingAssets: [],
    assetDriveLink: "",
    preferredColors: "",
    preferredFonts: "",
    brandStyles: [],

    // Section 4
    services: [],
    otherService: "",

    // Section 5
    projectGoals: [],
    otherGoal: "",
    projectDetail: "",

    // Section 6
    startDate: "Immediately",
    expectedCompletionDate: "",

    // Section 7
    budgetRange: "₹50K–1L",

    // Section 8
    referenceWebsites: "",
    competitorWebsites: "",
    pinterestLinks: "",
    instagramPages: "",
    driveLinks: "",
    inspirationFiles: "",

    // Section 9
    additionalInfo: "",

    // Section 10
    agreed: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleArrayToggle = (category, value) => {
    setFormData((prev) => {
      const current = prev[category] || [];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.businessType.trim()) newErrors.businessType = "Business type is required";
    if (!formData.industry.trim()) newErrors.industry = "Industry is required";
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.agreed) newErrors.agreed = "You must confirm accuracy to submit";

    return newErrors;
  };

  const isSectionComplete = (num) => {
    if (num === 1) return Boolean(formData.companyName.trim() && formData.industry.trim());
    if (num === 2) return Boolean(formData.fullName.trim() && formData.email.trim() && formData.phone.trim());
    if (num === 3) return Boolean(formData.hasLogo);
    if (num === 4) return formData.services.length > 0;
    if (num === 5) return Boolean(formData.projectGoals.length > 0 || formData.projectDetail.trim());
    if (num === 6) return Boolean(formData.startDate);
    if (num === 7) return Boolean(formData.budgetRange);
    if (num === 8) return Boolean(formData.referenceWebsites || formData.driveLinks);
    if (num === 9) return Boolean(formData.additionalInfo);
    if (num === 10) return formData.agreed;
    return false;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSubmitError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (validationErrors.companyName || validationErrors.businessType || validationErrors.industry) {
        setActiveSection(1);
      } else if (validationErrors.fullName || validationErrors.email || validationErrors.phone) {
        setActiveSection(2);
      } else if (validationErrors.agreed) {
        setActiveSection(10);
      }
      return;
    }

    setIsSubmitting(true);

    const formattedMessage = `
--- PROJECT BRIEF SUBMISSION ---
COMPANY INFO:
- Company Name: ${formData.companyName}
- Business Type: ${formData.businessType}
- Industry: ${formData.industry}
- Website: ${formData.companyWebsite || "N/A"}
- Description: ${formData.businessDescription || "N/A"}
- Years in Business: ${formData.yearsInBusiness}

PRIMARY CONTACT:
- Name: ${formData.fullName} (${formData.designation || "N/A"})
- Email: ${formData.email}
- Phone: ${formData.phone}
- Alt Phone: ${formData.altPhone || "N/A"}
- WhatsApp: ${formData.whatsapp || "N/A"}
- Address: ${formData.officeAddress || "N/A"}, ${formData.city || ""}, ${formData.state || ""}, ${formData.country || ""} ${formData.postalCode || ""}
- Preferred Contact: ${formData.preferredContactMethod}

BRAND IDENTITY:
- Logo: ${formData.hasLogo} ${formData.logoLink ? `(${formData.logoLink})` : ""}
- Brand Assets: ${formData.existingAssets.join(", ") || "None"}
- Asset Link: ${formData.assetDriveLink || "N/A"}
- Preferred Colors: ${formData.preferredColors || "N/A"}
- Preferred Fonts: ${formData.preferredFonts || "N/A"}
- Brand Styles: ${formData.brandStyles.join(", ") || "None"}

PROJECT DETAILS:
- Services Needed: ${formData.services.join(", ") || "None"} ${formData.otherService ? `(Other: ${formData.otherService})` : ""}

PROJECT GOALS:
- Goals: ${formData.projectGoals.join(", ") || "None"} ${formData.otherGoal ? `(Other: ${formData.otherGoal})` : ""}
- Details: ${formData.projectDetail || "N/A"}

TIMELINE & BUDGET:
- Start Time: ${formData.startDate}
- Expected Completion: ${formData.expectedCompletionDate || "N/A"}
- Budget Range: ${formData.budgetRange}

REFERENCES:
- Ref Websites: ${formData.referenceWebsites || "N/A"}
- Competitors: ${formData.competitorWebsites || "N/A"}
- Pinterest: ${formData.pinterestLinks || "N/A"}
- Instagram: ${formData.instagramPages || "N/A"}
- Drive Links: ${formData.driveLinks || "N/A"}

ADDITIONAL INFO:
${formData.additionalInfo || "N/A"}
`;

    const formattedData = {
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: formData.companyName.trim(),
      message: formattedMessage,
      timestamp: new Date().toISOString(),
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      await fetch(
        "https://script.google.com/macros/s/AKfycbzM6Lq64FjN_xT1_wOqKk3p3x9w9Q8v4o8v4o8v4o8v4o8v4o8v4o8v4o8v/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedData),
          signal: controller.signal,
        }
      )
        .catch((err) => console.warn("Endpoint notice:", err))
        .finally(() => clearTimeout(timeoutId));

      await sendContactFormEmails(formattedData).catch((err) =>
        console.warn("Queue notice:", err)
      );

      setSubmitSuccess(true);
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError("Failed to submit Project Brief. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (activeSection < 10) {
      setActiveSection((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (activeSection > 1) {
      setActiveSection((prev) => prev - 1);
    }
  };

  const steps = [
    { num: 1, label: "Company", icon: Building2, desc: "Organization details" },
    { num: 2, label: "Contact", icon: User, desc: "Primary contact info" },
    { num: 3, label: "Branding", icon: Palette, desc: "Logo & brand style" },
    { num: 4, label: "Services", icon: Layers, desc: "Required capabilities" },
    { num: 5, label: "Goals", icon: Target, desc: "Objectives & vision" },
    { num: 6, label: "Timeline", icon: Calendar, desc: "Project schedule" },
    { num: 7, label: "Budget", icon: Wallet, desc: "Investment range" },
    { num: 8, label: "References", icon: Link2, desc: "Inspirations & links" },
    { num: 9, label: "Additional Info", icon: FileText, desc: "Extra notes" },
    { num: 10, label: "Review", icon: CheckCircle2, desc: "Confirm & submit" },
  ];

  const currentStepInfo = steps[activeSection - 1];

  const portalRoot =
    typeof document !== "undefined"
      ? document.getElementById("portal-root") || document.body
      : null;
  if (!portalRoot) return null;

  const progressPercent = Math.round((activeSection / 10) * 100);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-hidden font-sans">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.08 }}
            className="w-full max-w-[1350px] h-[92vh] bg-[#ECECEC] rounded-[30px] shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-black/10 relative flex flex-col overflow-hidden text-[#111111] z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Progress Bar & Header Header */}
            <div className="bg-white border-b border-neutral-100 z-20 relative flex flex-col">
              {/* Animated Progress Bar */}
              <div className="w-full bg-neutral-100 h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#E31D2E] to-[#FF4D5E] rounded-r-full"
                />
              </div>

              <div className="px-6 sm:px-10 py-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#E31D2E]/10 border border-[#E31D2E]/20 flex items-center justify-center text-[#E31D2E]">
                    {React.createElement(currentStepInfo.icon, { className: "w-5 h-5" })}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-black text-[#E31D2E] tracking-[0.25em] uppercase">
                        STEP {activeSection} OF 10
                      </span>
                      <span className="text-xs font-bold text-neutral-400">
                        ({progressPercent}% COMPLETE)
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight mt-0.5">
                      {currentStepInfo.label} Information
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-11 h-11 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 flex items-center justify-center transition-all focus:outline-none"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Content Body */}
            {submitSuccess ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-14 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-md"
                >
                  <Check className="w-10 h-10 stroke-[3]" />
                </motion.div>
                <h3 className="text-3xl sm:text-4xl font-black text-[#111111] mb-3 tracking-tight">
                  Project Brief Received!
                </h3>
                <p className="text-neutral-600 text-base max-w-md mb-8 leading-relaxed font-normal">
                  Thank you for completing your project brief. Our strategy team is reviewing your requirements and will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="h-[56px] px-10 rounded-[18px] bg-[#E31D2E] hover:bg-[#c91827] text-white font-bold text-base shadow-[0_8px_20px_rgba(227,29,46,0.3)] hover:shadow-[0_12px_28px_rgba(227,29,46,0.4)] transition-all"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
                {/* Left Stepper Sidebar */}
                <div className="w-full md:w-80 bg-[#FAFAFA] border-r border-neutral-200/60 p-6 overflow-y-auto hidden md:block">
                  <div className="mb-6 px-2">
                    <p className="text-[11px] font-black text-neutral-400 uppercase tracking-[0.25em]">
                      PROJECT ONBOARDING
                    </p>
                  </div>
                  <nav className="space-y-2">
                    {steps.map((step) => {
                      const isActive = activeSection === step.num;
                      const isComplete = isSectionComplete(step.num) && !isActive;
                      const IconComp = step.icon;

                      return (
                        <button
                          key={step.num}
                          type="button"
                          onClick={() => setActiveSection(step.num)}
                          className={`w-full text-left px-4 py-3.5 rounded-[18px] transition-all flex items-center justify-between group cursor-pointer ${
                            isActive
                              ? "bg-[#E31D2E] text-white shadow-[0_8px_20px_rgba(227,29,46,0.3)] scale-[1.02]"
                              : isComplete
                              ? "bg-white text-neutral-800 border border-neutral-200/80 shadow-xs hover:border-[#E31D2E]/40"
                              : "bg-transparent text-neutral-500 hover:bg-neutral-200/50 hover:text-neutral-800"
                          }`}
                        >
                          <div className="flex items-center gap-3.5 truncate">
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                                isActive
                                  ? "bg-white/20 text-white"
                                  : isComplete
                                  ? "bg-emerald-100 text-emerald-600"
                                  : "bg-neutral-200/70 text-neutral-500 group-hover:bg-neutral-200"
                              }`}
                            >
                              {isComplete ? (
                                <Check className="w-4 h-4 stroke-[3]" />
                              ) : (
                                <IconComp className="w-4 h-4" />
                              )}
                            </div>
                            <div className="truncate">
                              <p className={`text-xs font-bold truncate ${isActive ? "text-white" : "text-neutral-900"}`}>
                                {step.label}
                              </p>
                              <p className={`text-[10px] truncate ${isActive ? "text-white/80" : "text-neutral-400"}`}>
                                {step.desc}
                              </p>
                            </div>
                          </div>

                          <ChevronRight
                            className={`w-4 h-4 flex-shrink-0 transition-transform ${
                              isActive ? "text-white translate-x-0.5" : "text-neutral-300 group-hover:text-neutral-500"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Mobile Stepper Bar */}
                <div className="w-full bg-[#FAFAFA] border-b border-neutral-200/60 p-3 flex md:hidden overflow-x-auto gap-2">
                  {steps.map((step) => {
                    const isActive = activeSection === step.num;
                    return (
                      <button
                        key={step.num}
                        type="button"
                        onClick={() => setActiveSection(step.num)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                          isActive
                            ? "bg-[#E31D2E] text-white shadow-sm"
                            : "bg-white text-neutral-700 border border-neutral-200"
                        }`}
                      >
                        {step.num}. {step.label}
                      </button>
                    );
                  })}
                </div>

                {/* Main Form Content View */}
                <div className="flex-1 flex flex-col justify-between overflow-y-auto relative">
                  <form onSubmit={handleSubmit} className="p-6 sm:p-10 lg:p-14 space-y-8 flex-1">
                    {submitError && (
                      <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 15, scale: 0.99 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -15, scale: 0.99 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="space-y-6"
                      >
                        {/* SECTION 1: Company Information */}
                        {activeSection === 1 && (
                          <div className="space-y-6">
                            <div className="border-b border-neutral-100 pb-5">
                              <span className="text-[11px] font-black text-[#E31D2E] tracking-[0.25em] uppercase">
                                SECTION 1 OF 10
                              </span>
                              <h3 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-1">
                                Company Information
                              </h3>
                              <p className="text-sm text-neutral-500 font-normal mt-1.5">
                                Share details about your organization, business model, and operational scale.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-xs font-bold text-neutral-800 mb-2">
                                  Company / Organization Name <span className="text-[#E31D2E]">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="companyName"
                                  value={formData.companyName}
                                  onChange={handleInputChange}
                                  placeholder="e.g. Acme Innovations"
                                  className={`w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border rounded-[16px] placeholder:text-neutral-400 transition-all outline-none ${
                                    errors.companyName
                                      ? "border-red-500 bg-red-50/20 focus:ring-4 focus:ring-red-500/10"
                                      : "border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15"
                                  }`}
                                />
                                {errors.companyName && (
                                  <p className="text-red-500 text-[11px] font-medium mt-1">
                                    {errors.companyName}
                                  </p>
                                )}
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-neutral-800 mb-2">
                                  Business Type <span className="text-[#E31D2E]">*</span>
                                </label>
                                <select
                                  name="businessType"
                                  value={formData.businessType}
                                  onChange={handleInputChange}
                                  className="w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[16px] transition-all outline-none cursor-pointer"
                                >
                                  <option value="Startup">Startup</option>
                                  <option value="Small & Medium Business">Small & Medium Business</option>
                                  <option value="Enterprise">Enterprise</option>
                                  <option value="Personal Brand">Personal Brand</option>
                                  <option value="E-commerce">E-commerce</option>
                                  <option value="Non-Profit">Non-Profit</option>
                                  <option value="Agency">Agency</option>
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-xs font-bold text-neutral-800 mb-2">
                                  Industry <span className="text-[#E31D2E]">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="industry"
                                  value={formData.industry}
                                  onChange={handleInputChange}
                                  placeholder="e.g. Technology, Fashion, Real Estate"
                                  className={`w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border rounded-[16px] placeholder:text-neutral-400 transition-all outline-none ${
                                    errors.industry
                                      ? "border-red-500 bg-red-50/20 focus:ring-4 focus:ring-red-500/10"
                                      : "border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15"
                                  }`}
                                />
                                {errors.industry && (
                                  <p className="text-red-500 text-[11px] font-medium mt-1">
                                    {errors.industry}
                                  </p>
                                )}
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-neutral-800 mb-2">
                                  Company Website
                                </label>
                                <input
                                  type="text"
                                  name="companyWebsite"
                                  value={formData.companyWebsite}
                                  onChange={handleInputChange}
                                  placeholder="https://example.com"
                                  className="w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[16px] transition-all outline-none"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-neutral-800 mb-2">
                                Years in Business
                              </label>
                              <select
                                name="yearsInBusiness"
                                value={formData.yearsInBusiness}
                                onChange={handleInputChange}
                                className="w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[16px] transition-all outline-none cursor-pointer"
                              >
                                <option value="Less than 1 year">Less than 1 year</option>
                                <option value="1–3 years">1–3 years</option>
                                <option value="3–5 years">3–5 years</option>
                                <option value="5–10 years">5–10 years</option>
                                <option value="10+ years">10+ years</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-neutral-800 mb-2">
                                Business Description
                              </label>
                              <textarea
                                name="businessDescription"
                                value={formData.businessDescription}
                                onChange={handleInputChange}
                                rows={4}
                                placeholder="Briefly describe what your company does, your products or services, and target customers..."
                                className="w-full p-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[20px] transition-all outline-none resize-y min-h-[120px]"
                              />
                            </div>
                          </div>
                        )}

                        {/* SECTION 2: Primary Contact */}
                        {activeSection === 2 && (
                          <div className="space-y-6">
                            <div className="border-b border-neutral-100 pb-5">
                              <span className="text-[11px] font-black text-[#E31D2E] tracking-[0.25em] uppercase">
                                SECTION 2 OF 10
                              </span>
                              <h3 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-1">
                                Primary Contact Details
                              </h3>
                              <p className="text-sm text-neutral-500 font-normal mt-1.5">
                                Who should our project leads contact regarding proposal & onboarding details?
                              </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-xs font-bold text-neutral-800 mb-2">
                                  Full Name <span className="text-[#E31D2E]">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="fullName"
                                  value={formData.fullName}
                                  onChange={handleInputChange}
                                  placeholder="John Doe"
                                  className={`w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border rounded-[16px] transition-all outline-none ${
                                    errors.fullName
                                      ? "border-red-500 focus:ring-4 focus:ring-red-500/10"
                                      : "border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15"
                                  }`}
                                />
                                {errors.fullName && (
                                  <p className="text-red-500 text-[11px] font-medium mt-1">
                                    {errors.fullName}
                                  </p>
                                )}
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-neutral-800 mb-2">
                                  Designation / Role
                                </label>
                                <input
                                  type="text"
                                  name="designation"
                                  value={formData.designation}
                                  onChange={handleInputChange}
                                  placeholder="e.g. Founder, Chief Marketing Officer"
                                  className="w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[16px] transition-all outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-xs font-bold text-neutral-800 mb-2">
                                  Email Address <span className="text-[#E31D2E]">*</span>
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  placeholder="john@example.com"
                                  className={`w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border rounded-[16px] transition-all outline-none ${
                                    errors.email
                                      ? "border-red-500 focus:ring-4 focus:ring-red-500/10"
                                      : "border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15"
                                  }`}
                                />
                                {errors.email && (
                                  <p className="text-red-500 text-[11px] font-medium mt-1">
                                    {errors.email}
                                  </p>
                                )}
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-neutral-800 mb-2">
                                  Phone Number <span className="text-[#E31D2E]">*</span>
                                </label>
                                <input
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  placeholder="+91 98765 43210"
                                  className={`w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border rounded-[16px] transition-all outline-none ${
                                    errors.phone
                                      ? "border-red-500 focus:ring-4 focus:ring-red-500/10"
                                      : "border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15"
                                  }`}
                                />
                                {errors.phone && (
                                  <p className="text-red-500 text-[11px] font-medium mt-1">
                                    {errors.phone}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-xs font-bold text-neutral-800 mb-2">
                                  Alternative Phone Number
                                </label>
                                <input
                                  type="tel"
                                  name="altPhone"
                                  value={formData.altPhone}
                                  onChange={handleInputChange}
                                  placeholder="Secondary contact phone"
                                  className="w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[16px] transition-all outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-neutral-800 mb-2">
                                  WhatsApp Number
                                </label>
                                <input
                                  type="tel"
                                  name="whatsapp"
                                  value={formData.whatsapp}
                                  onChange={handleInputChange}
                                  placeholder="WhatsApp number"
                                  className="w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[16px] transition-all outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-xs font-bold text-neutral-800 mb-2">
                                  City
                                </label>
                                <input
                                  type="text"
                                  name="city"
                                  value={formData.city}
                                  onChange={handleInputChange}
                                  placeholder="e.g. Mumbai"
                                  className="w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[16px] transition-all outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-neutral-800 mb-2">
                                  State
                                </label>
                                <input
                                  type="text"
                                  name="state"
                                  value={formData.state}
                                  onChange={handleInputChange}
                                  placeholder="e.g. Maharashtra"
                                  className="w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[16px] transition-all outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-neutral-800 mb-2">
                                  Country
                                </label>
                                <input
                                  type="text"
                                  name="country"
                                  value={formData.country}
                                  onChange={handleInputChange}
                                  placeholder="e.g. India"
                                  className="w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[16px] transition-all outline-none"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-neutral-800 mb-3">
                                Preferred Contact Method
                              </label>
                              <div className="flex flex-wrap gap-4">
                                {["Email", "Phone", "WhatsApp"].map((method) => (
                                  <label
                                    key={method}
                                    className={`flex items-center gap-3 cursor-pointer text-xs font-bold px-6 py-4 rounded-[16px] border transition-all ${
                                      formData.preferredContactMethod === method
                                        ? "border-[#E31D2E] bg-[#E31D2E]/5 text-[#E31D2E]"
                                        : "border-neutral-200/80 bg-neutral-50/60 text-neutral-700 hover:bg-neutral-100"
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name="preferredContactMethod"
                                      value={method}
                                      checked={formData.preferredContactMethod === method}
                                      onChange={handleInputChange}
                                      className="accent-[#E31D2E]"
                                    />
                                    {method}
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* SECTION 3: Brand Identity */}
                        {activeSection === 3 && (
                          <div className="space-y-6">
                            <div className="border-b border-neutral-100 pb-5">
                              <span className="text-[11px] font-black text-[#E31D2E] tracking-[0.25em] uppercase">
                                SECTION 3 OF 10
                              </span>
                              <h3 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-1">
                                Brand Identity & Assets
                              </h3>
                              <p className="text-sm text-neutral-500 font-normal mt-1.5">
                                Tell us about your existing design assets and visual preferences.
                              </p>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-neutral-800 mb-3">
                                Do you already have a logo?
                              </label>
                              <div className="flex gap-4">
                                {["Yes", "No"].map((opt) => (
                                  <label
                                    key={opt}
                                    className={`flex items-center gap-3 cursor-pointer text-xs font-bold px-6 py-4 rounded-[16px] border transition-all ${
                                      formData.hasLogo === opt
                                        ? "border-[#E31D2E] bg-[#E31D2E]/5 text-[#E31D2E]"
                                        : "border-neutral-200/80 bg-neutral-50/60 text-neutral-700 hover:bg-neutral-100"
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name="hasLogo"
                                      value={opt}
                                      checked={formData.hasLogo === opt}
                                      onChange={handleInputChange}
                                      className="accent-[#E31D2E]"
                                    />
                                    {opt}
                                  </label>
                                ))}
                              </div>
                            </div>

                            {formData.hasLogo === "Yes" && (
                              <div>
                                <label className="block text-xs font-bold text-neutral-800 mb-2">
                                  Upload Logo / Link to Logo File
                                </label>
                                <input
                                  type="text"
                                  name="logoLink"
                                  value={formData.logoLink}
                                  onChange={handleInputChange}
                                  placeholder="Insert Google Drive / Dropbox link to your logo"
                                  className="w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[16px] transition-all outline-none"
                                />
                              </div>
                            )}

                            <div>
                              <label className="block text-xs font-bold text-neutral-800 mb-3">
                                Do you already have existing brand assets? (Select all that apply)
                              </label>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {["Brand Guidelines", "Color Palette", "Typography", "Brand Book"].map(
                                  (asset) => (
                                    <label
                                      key={asset}
                                      className={`flex items-center gap-3 cursor-pointer text-xs font-bold p-4 border rounded-[16px] transition-all ${
                                        formData.existingAssets.includes(asset)
                                          ? "border-[#E31D2E] bg-[#E31D2E]/5 text-[#E31D2E]"
                                          : "border-neutral-200/80 bg-neutral-50/60 text-neutral-700 hover:bg-neutral-100"
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={formData.existingAssets.includes(asset)}
                                        onChange={() => handleArrayToggle("existingAssets", asset)}
                                        className="accent-[#E31D2E]"
                                      />
                                      {asset}
                                    </label>
                                  )
                                )}
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-neutral-800 mb-2">
                                Upload Existing Brand Assets / Drive Link
                              </label>
                              <input
                                type="text"
                                name="assetDriveLink"
                                value={formData.assetDriveLink}
                                onChange={handleInputChange}
                                placeholder="Drive or Cloud folder URL containing brand files"
                                className="w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[16px] transition-all outline-none"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-xs font-bold text-neutral-800 mb-2">
                                  Preferred Brand Colors
                                </label>
                                <input
                                  type="text"
                                  name="preferredColors"
                                  value={formData.preferredColors}
                                  onChange={handleInputChange}
                                  placeholder="e.g. Red, Black, White (#E31D2E)"
                                  className="w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[16px] transition-all outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-neutral-800 mb-2">
                                  Preferred Fonts
                                </label>
                                <input
                                  type="text"
                                  name="preferredFonts"
                                  value={formData.preferredFonts}
                                  onChange={handleInputChange}
                                  placeholder="e.g. Inter, Outfit, Helvetica"
                                  className="w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[16px] transition-all outline-none"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-neutral-800 mb-3">
                                Brand Style (Select all that apply)
                              </label>
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {[
                                  "Modern",
                                  "Luxury",
                                  "Minimal",
                                  "Corporate",
                                  "Bold",
                                  "Creative",
                                  "Fun",
                                  "Elegant",
                                  "Other",
                                ].map((style) => (
                                  <label
                                    key={style}
                                    className={`flex items-center gap-3 cursor-pointer text-xs font-bold p-4 border rounded-[16px] transition-all ${
                                      formData.brandStyles.includes(style)
                                        ? "border-[#E31D2E] bg-[#E31D2E]/5 text-[#E31D2E]"
                                        : "border-neutral-200/80 bg-neutral-50/60 text-neutral-700 hover:bg-neutral-100"
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={formData.brandStyles.includes(style)}
                                      onChange={() => handleArrayToggle("brandStyles", style)}
                                      className="accent-[#E31D2E]"
                                    />
                                    {style}
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* SECTION 4: Project Details */}
                        {activeSection === 4 && (
                          <div className="space-y-6">
                            <div className="border-b border-neutral-100 pb-5">
                              <span className="text-[11px] font-black text-[#E31D2E] tracking-[0.25em] uppercase">
                                SECTION 4 OF 10
                              </span>
                              <h3 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-1">
                                Services Needed
                              </h3>
                              <p className="text-sm text-neutral-500 font-normal mt-1.5">
                                Select all digital, branding, media, and development capabilities required.
                              </p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {[
                                "Branding",
                                "Logo Design",
                                "Graphic Design",
                                "Website Design",
                                "Website Development",
                                "SEO",
                                "Google Ads",
                                "Meta Ads",
                                "Performance Marketing",
                                "Content Marketing",
                                "Social Media Management",
                                "Social Media Posting",
                                "Reels Editing",
                                "Video Editing",
                                "Photography",
                                "Product Shoot",
                                "Influencer Marketing",
                                "Email Marketing",
                                "ORM",
                                "Custom Software",
                                "Mobile App",
                              ].map((srv) => (
                                <label
                                  key={srv}
                                  className={`flex items-center gap-3 cursor-pointer text-xs font-bold p-4 border rounded-[16px] transition-all ${
                                    formData.services.includes(srv)
                                      ? "border-[#E31D2E] bg-[#E31D2E]/5 text-[#E31D2E]"
                                      : "border-neutral-200/80 bg-neutral-50/60 text-neutral-700 hover:bg-neutral-100"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={formData.services.includes(srv)}
                                    onChange={() => handleArrayToggle("services", srv)}
                                    className="accent-[#E31D2E]"
                                  />
                                  <span className="truncate">{srv}</span>
                                </label>
                              ))}
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-neutral-800 mb-2">
                                Other Custom Services
                              </label>
                              <input
                                type="text"
                                name="otherService"
                                value={formData.otherService}
                                onChange={handleInputChange}
                                placeholder="Specify any other custom requirements"
                                className="w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[16px] transition-all outline-none"
                              />
                            </div>
                          </div>
                        )}

                        {/* SECTION 5: Project Goals */}
                        {activeSection === 5 && (
                          <div className="space-y-6">
                            <div className="border-b border-neutral-100 pb-5">
                              <span className="text-[11px] font-black text-[#E31D2E] tracking-[0.25em] uppercase">
                                SECTION 5 OF 10
                              </span>
                              <h3 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-1">
                                Project Goals & Vision
                              </h3>
                              <p className="text-sm text-neutral-500 font-normal mt-1.5">
                                What core business outcomes are you aiming to achieve with this project?
                              </p>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-neutral-800 mb-3">
                                What are you trying to achieve? (Select all that apply)
                              </label>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {[
                                  "Lead Generation",
                                  "More Sales",
                                  "Brand Awareness",
                                  "Website Redesign",
                                  "Business Launch",
                                  "Product Launch",
                                  "Increase Followers",
                                  "Other",
                                ].map((goal) => (
                                  <label
                                    key={goal}
                                    className={`flex items-center gap-3 cursor-pointer text-xs font-bold p-4 border rounded-[16px] transition-all ${
                                      formData.projectGoals.includes(goal)
                                        ? "border-[#E31D2E] bg-[#E31D2E]/5 text-[#E31D2E]"
                                        : "border-neutral-200/80 bg-neutral-50/60 text-neutral-700 hover:bg-neutral-100"
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={formData.projectGoals.includes(goal)}
                                      onChange={() => handleArrayToggle("projectGoals", goal)}
                                      className="accent-[#E31D2E]"
                                    />
                                    {goal}
                                  </label>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-neutral-800 mb-2">
                                Describe your project in detail
                              </label>
                              <textarea
                                name="projectDetail"
                                value={formData.projectDetail}
                                onChange={handleInputChange}
                                rows={5}
                                placeholder="Share comprehensive details about your vision, target market, specific features, and overall business objectives..."
                                className="w-full p-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[20px] transition-all outline-none resize-y min-h-[140px]"
                              />
                            </div>
                          </div>
                        )}

                        {/* SECTION 6: Timeline */}
                        {activeSection === 6 && (
                          <div className="space-y-6">
                            <div className="border-b border-neutral-100 pb-5">
                              <span className="text-[11px] font-black text-[#E31D2E] tracking-[0.25em] uppercase">
                                SECTION 6 OF 10
                              </span>
                              <h3 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-1">
                                Timeline & Onboarding Schedule
                              </h3>
                              <p className="text-sm text-neutral-500 font-normal mt-1.5">
                                When would you prefer to initiate strategy and execution?
                              </p>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-neutral-800 mb-3">
                                When do you want to start?
                              </label>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {["Immediately", "Within 2 Weeks", "Within 1 Month", "Flexible"].map(
                                  (time) => (
                                    <label
                                      key={time}
                                      className={`flex items-center gap-3 cursor-pointer text-xs font-bold p-5 border rounded-[18px] transition-all ${
                                        formData.startDate === time
                                          ? "border-[#E31D2E] bg-[#E31D2E]/5 text-[#E31D2E]"
                                          : "border-neutral-200/80 bg-neutral-50/60 text-neutral-700 hover:bg-neutral-100"
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        name="startDate"
                                        value={time}
                                        checked={formData.startDate === time}
                                        onChange={handleInputChange}
                                        className="accent-[#E31D2E]"
                                      />
                                      {time}
                                    </label>
                                  )
                                )}
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-neutral-800 mb-2">
                                Expected Completion Date
                              </label>
                              <input
                                type="date"
                                name="expectedCompletionDate"
                                value={formData.expectedCompletionDate}
                                onChange={handleInputChange}
                                className="w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[16px] transition-all outline-none"
                              />
                            </div>
                          </div>
                        )}

                        {/* SECTION 7: Budget */}
                        {activeSection === 7 && (
                          <div className="space-y-6">
                            <div className="border-b border-neutral-100 pb-5">
                              <span className="text-[11px] font-black text-[#E31D2E] tracking-[0.25em] uppercase">
                                SECTION 7 OF 10
                              </span>
                              <h3 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-1">
                                Investment & Budget Range
                              </h3>
                              <p className="text-sm text-neutral-500 font-normal mt-1.5">
                                Select your planned budget range so we can align our resources and team capacity.
                              </p>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-neutral-800 mb-3">
                                Budget Range
                              </label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {[
                                  "Under ₹25,000",
                                  "₹25K–50K",
                                  "₹50K–1L",
                                  "₹1L–3L",
                                  "₹3L+",
                                ].map((b) => (
                                  <label
                                    key={b}
                                    className={`flex items-center gap-3 cursor-pointer text-sm font-bold p-5 border rounded-[18px] transition-all ${
                                      formData.budgetRange === b
                                        ? "border-[#E31D2E] bg-[#E31D2E]/5 text-[#E31D2E] shadow-sm"
                                        : "border-neutral-200/80 bg-neutral-50/60 text-neutral-800 hover:bg-neutral-100"
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name="budgetRange"
                                      value={b}
                                      checked={formData.budgetRange === b}
                                      onChange={handleInputChange}
                                      className="accent-[#E31D2E]"
                                    />
                                    {b}
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* SECTION 8: References */}
                        {activeSection === 8 && (
                          <div className="space-y-6">
                            <div className="border-b border-neutral-100 pb-5">
                              <span className="text-[11px] font-black text-[#E31D2E] tracking-[0.25em] uppercase">
                                SECTION 8 OF 10
                              </span>
                              <h3 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-1">
                                References & Inspirations
                              </h3>
                              <p className="text-sm text-neutral-500 font-normal mt-1.5">
                                Share examples, competitor links, and inspiration boards you admire.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-xs font-bold text-neutral-800 mb-2">
                                  Reference Websites
                                </label>
                                <input
                                  type="text"
                                  name="referenceWebsites"
                                  value={formData.referenceWebsites}
                                  onChange={handleInputChange}
                                  placeholder="URLs of websites you like"
                                  className="w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[16px] transition-all outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-neutral-800 mb-2">
                                  Competitor Websites
                                </label>
                                <input
                                  type="text"
                                  name="competitorWebsites"
                                  value={formData.competitorWebsites}
                                  onChange={handleInputChange}
                                  placeholder="URLs of key competitors"
                                  className="w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[16px] transition-all outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-xs font-bold text-neutral-800 mb-2">
                                  Pinterest Links
                                </label>
                                <input
                                  type="text"
                                  name="pinterestLinks"
                                  value={formData.pinterestLinks}
                                  onChange={handleInputChange}
                                  placeholder="Pinterest board or pin URL"
                                  className="w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[16px] transition-all outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-neutral-800 mb-2">
                                  Instagram Pages
                                </label>
                                <input
                                  type="text"
                                  name="instagramPages"
                                  value={formData.instagramPages}
                                  onChange={handleInputChange}
                                  placeholder="Instagram handles or links"
                                  className="w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[16px] transition-all outline-none"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-neutral-800 mb-2">
                                Drive Links / Upload Inspirations
                              </label>
                              <input
                                type="text"
                                name="driveLinks"
                                value={formData.driveLinks}
                                onChange={handleInputChange}
                                placeholder="Google Drive link with moodboards, images, or assets"
                                className="w-full h-[56px] px-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[16px] transition-all outline-none"
                              />
                            </div>
                          </div>
                        )}

                        {/* SECTION 9: Additional Info */}
                        {activeSection === 9 && (
                          <div className="space-y-6">
                            <div className="border-b border-neutral-100 pb-5">
                              <span className="text-[11px] font-black text-[#E31D2E] tracking-[0.25em] uppercase">
                                SECTION 9 OF 10
                              </span>
                              <h3 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-1">
                                Additional Notes & Context
                              </h3>
                              <p className="text-sm text-neutral-500 font-normal mt-1.5">
                                Any specific instructions, preferences, or details we should know?
                              </p>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-neutral-800 mb-2">
                                Anything else you'd like us to know?
                              </label>
                              <textarea
                                name="additionalInfo"
                                value={formData.additionalInfo}
                                onChange={handleInputChange}
                                rows={6}
                                placeholder="Share any extra thoughts, technical constraints, team preferences, or special requests..."
                                className="w-full p-5 text-sm font-medium text-[#111111] bg-neutral-50/60 border border-neutral-200/80 focus:bg-white focus:border-[#E31D2E] focus:ring-4 focus:ring-[#E31D2E]/15 rounded-[20px] transition-all outline-none resize-y min-h-[160px]"
                              />
                            </div>
                          </div>
                        )}

                        {/* SECTION 10: Agreement */}
                        {activeSection === 10 && (
                          <div className="space-y-6">
                            <div className="border-b border-neutral-100 pb-5">
                              <span className="text-[11px] font-black text-[#E31D2E] tracking-[0.25em] uppercase">
                                SECTION 10 OF 10
                              </span>
                              <h3 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mt-1">
                                Review & Confirmation
                              </h3>
                              <p className="text-sm text-neutral-500 font-normal mt-1.5">
                                Please confirm accuracy before submitting your project brief to our team.
                              </p>
                            </div>

                            <div className="p-6 border border-neutral-200/80 rounded-[24px] bg-neutral-50/60 space-y-4">
                              <h4 className="text-base font-extrabold text-[#111111]">Application Summary</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-600 font-medium">
                                <div>
                                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Company Name</span>
                                  <span className="text-neutral-900 font-bold text-sm">{formData.companyName || "Not specified"}</span>
                                </div>
                                <div>
                                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Industry & Type</span>
                                  <span className="text-neutral-900 font-bold text-sm">{formData.industry || "Not specified"} ({formData.businessType})</span>
                                </div>
                                <div>
                                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Primary Contact</span>
                                  <span className="text-neutral-900 font-bold text-sm">{formData.fullName || "Not specified"} ({formData.email})</span>
                                </div>
                                <div>
                                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Budget & Schedule</span>
                                  <span className="text-neutral-900 font-bold text-sm">{formData.budgetRange} | {formData.startDate}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className="flex items-start gap-4 cursor-pointer p-6 border border-neutral-200/80 rounded-[20px] bg-white hover:bg-neutral-50 transition-all">
                                <input
                                  type="checkbox"
                                  name="agreed"
                                  checked={formData.agreed}
                                  onChange={handleInputChange}
                                  className="mt-1 accent-[#E31D2E] w-5 h-5"
                                />
                                <span className="text-xs sm:text-sm font-semibold text-neutral-800 leading-relaxed">
                                  I confirm the information provided is accurate. *
                                </span>
                              </label>
                              {errors.agreed && (
                                <p className="text-red-500 text-[11px] font-medium mt-1">
                                  {errors.agreed}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </form>

                  {/* Sticky Footer Controls Inside Modal */}
                  <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-neutral-100 py-4 px-6 sm:px-10 lg:px-14 z-30 flex items-center justify-between">
                    {activeSection > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="h-[56px] px-8 rounded-[18px] border border-neutral-200 text-neutral-700 hover:bg-neutral-100 font-bold text-sm transition-all flex items-center gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={isSubmitting}
                      className="h-[56px] px-8 sm:px-10 rounded-[18px] bg-[#E31D2E] hover:bg-[#c91827] text-white font-bold text-sm sm:text-base shadow-[0_8px_20px_rgba(227,29,46,0.3)] hover:shadow-[0_12px_28px_rgba(227,29,46,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2.5 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting Brief...</span>
                        </>
                      ) : activeSection < 10 ? (
                        <>
                          <span>Continue</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      ) : (
                        <>
                          <span>Submit Project Brief</span>
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    portalRoot
  );
}
