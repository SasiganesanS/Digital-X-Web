import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function CollaborationRequestModal({ collaborator, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    projectType: "Social Media Campaign",
    projectDescription: "",
    expectedDate: "",
    estimatedBudget: "₹25,000 - ₹50,000",
    additionalRequirements: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
      setErrorMsg("");
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!collaborator) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg("Please enter your phone number.");
      return;
    }
    if (!formData.projectDescription.trim()) {
      setErrorMsg("Please describe your project requirements.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Backdrop Blur Overlay */}
          <div
            className="absolute inset-0 bg-black/65 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-[2.2rem] bg-white border border-neutral-200/90 shadow-[0_30px_80px_rgba(0,0,0,0.35)] overflow-hidden z-10 text-[#111111]"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-neutral-100 border border-neutral-200 text-neutral-500 hover:bg-[#111111] hover:text-white transition-all duration-300 shadow-sm cursor-pointer z-30 group"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable Form Body */}
            <div className="p-6 sm:p-8 md:p-9 overflow-y-auto custom-scrollbar">
              
              {!submitted ? (
                <>
                  {/* Header Area */}
                  <div className="mb-6 pr-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-neutral-100 text-[#111111] border border-neutral-200/80 mb-3 inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111111] animate-pulse" />
                      Praskla DigitalX Agency Coordination
                    </span>

                    <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight leading-tight mb-2">
                      Request Collaboration
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-500 font-medium leading-relaxed">
                      Praskla DigitalX manages the collaboration from scope definition to commercial terms and delivery.
                    </p>
                  </div>

                  {/* Prefilled Collaborator Info Card */}
                  <div className="mb-6 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center gap-4">
                    <img
                      src={collaborator.image}
                      alt={collaborator.name}
                      className="w-12 h-12 rounded-xl object-cover border border-neutral-200 shadow-sm flex-shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-extrabold text-[#E31D2E] uppercase tracking-wider block">
                        Requested Collaborator
                      </span>
                      <h4 className="text-base font-black text-[#111111]">
                        {collaborator.name} — <span className="font-semibold text-neutral-600">{collaborator.role}</span>
                      </h4>
                    </div>
                  </div>

                  {/* Error Notification */}
                  {errorMsg && (
                    <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                      {errorMsg}
                    </div>
                  )}

                  {/* Form Inputs */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold text-neutral-700 uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#E31D2E] focus:ring-2 focus:ring-[#E31D2E]/10 outline-none text-sm font-medium transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-neutral-700 uppercase tracking-wider mb-1.5">
                          Company / Brand Name
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="e.g. Apex Media Ltd."
                          className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#E31D2E] focus:ring-2 focus:ring-[#E31D2E]/10 outline-none text-sm font-medium transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold text-neutral-700 uppercase tracking-wider mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@company.com"
                          className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#E31D2E] focus:ring-2 focus:ring-[#E31D2E]/10 outline-none text-sm font-medium transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-neutral-700 uppercase tracking-wider mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#E31D2E] focus:ring-2 focus:ring-[#E31D2E]/10 outline-none text-sm font-medium transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold text-neutral-700 uppercase tracking-wider mb-1.5">
                          Project Type
                        </label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#E31D2E] focus:ring-2 focus:ring-[#E31D2E]/10 outline-none text-sm font-medium bg-white transition-all"
                        >
                          <option value="Social Media Campaign">Social Media Campaign</option>
                          <option value="Video Editing & Post Production">Video Editing & Post Production</option>
                          <option value="Brand Model / Lifestyle Shoot">Brand Model / Lifestyle Shoot</option>
                          <option value="Creative Production Support">Creative Production Support</option>
                          <option value="Full Package Campaign">Full Package Campaign</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-neutral-700 uppercase tracking-wider mb-1.5">
                          Estimated Budget
                        </label>
                        <select
                          name="estimatedBudget"
                          value={formData.estimatedBudget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#E31D2E] focus:ring-2 focus:ring-[#E31D2E]/10 outline-none text-sm font-medium bg-white transition-all"
                        >
                          <option value="₹15,000 - ₹25,000">₹15,000 - ₹25,000</option>
                          <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                          <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                          <option value="₹1,00,000+">₹1,00,000+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Project Description *
                      </label>
                      <textarea
                        name="projectDescription"
                        rows={3}
                        value={formData.projectDescription}
                        onChange={handleChange}
                        placeholder="Briefly describe your deliverables, timeline, target platform, and creative goals..."
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#E31D2E] focus:ring-2 focus:ring-[#E31D2E]/10 outline-none text-sm font-medium transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Additional Requirements (Optional)
                      </label>
                      <input
                        type="text"
                        name="additionalRequirements"
                        value={formData.additionalRequirements}
                        onChange={handleChange}
                        placeholder="Specific locations, format requirements, or target completion dates..."
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#E31D2E] focus:ring-2 focus:ring-[#E31D2E]/10 outline-none text-sm font-medium transition-all"
                      />
                    </div>

                    {/* Notice */}
                    <p className="text-[11px] font-semibold text-neutral-400 italic pt-1">
                      * Collaborator availability and commercial terms are coordinated through Praskla DigitalX.
                    </p>

                    {/* Submit Button */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 px-8 rounded-full bg-[#111111] hover:bg-[#FF2B2B] text-white font-extrabold text-sm tracking-wide shadow-[0_10px_25px_rgba(0,0,0,0.18)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.28)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {loading ? (
                          <span>Processing Request...</span>
                        ) : (
                          <>
                            <span>Send Collaboration Request</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* Success Confirmation State */
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 border border-neutral-200 text-[#111111] flex items-center justify-center mb-5">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-black text-[#111111] mb-3 tracking-tight">
                    Collaboration Request Sent!
                  </h3>

                  <p className="text-neutral-600 text-sm sm:text-base font-medium leading-relaxed max-w-md mx-auto mb-8">
                    Your collaboration request for <strong className="text-[#111111]">{collaborator.name}</strong> has been received. Our Praskla DigitalX agency team will review your requirements and contact you shortly.
                  </p>

                  <button
                    type="button"
                    onClick={onClose}
                    className="py-3.5 px-8 rounded-full bg-[#111111] hover:bg-[#E31D2E] text-white font-extrabold text-sm transition-all duration-300 shadow-md cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              )}

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
