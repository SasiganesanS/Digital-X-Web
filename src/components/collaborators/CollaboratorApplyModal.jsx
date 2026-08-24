import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";

export default function CollaboratorApplyModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Influencer",
    portfolioUrl: "",
    experience: "1-3 Years",
    bio: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
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

  if (typeof document === "undefined") return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-xl bg-white rounded-[2rem] p-6 sm:p-8 shadow-2xl border border-neutral-200 text-[#111111] overflow-hidden my-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-100 hover:bg-[#111111] hover:text-white transition-colors flex items-center justify-center text-neutral-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                <div className="mb-6">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-neutral-100 text-[#111111] border border-neutral-200 mb-3 inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E31D2E]" />
                    Join Our Network
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                    Apply as a Collaborator
                  </h2>
                  <p className="text-neutral-500 text-xs sm:text-sm font-medium mt-1">
                    Are you an Influencer, Executive, Specialist, Creator, Model, or Editor? Join Praskla DigitalX’s creative network.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#111111] focus:ring-2 focus:ring-black/10 outline-none text-sm font-medium transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@domain.com"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#111111] focus:ring-2 focus:ring-black/10 outline-none text-sm font-medium transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#111111] focus:ring-2 focus:ring-black/10 outline-none text-sm font-medium transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-700 mb-1">
                        Primary Role / Category *
                      </label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#111111] focus:ring-2 focus:ring-black/10 outline-none text-sm font-medium bg-white transition-all"
                      >
                        <option value="Influencer">Influencer</option>
                        <option value="Executive">Executive</option>
                        <option value="Specialist & Expert">Specialist & Expert</option>
                        <option value="Content Creator">Content Creator</option>
                        <option value="Model">Model</option>
                        <option value="Video Editor">Video Editor</option>
                        <option value="Freelancer">Freelancer</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-700 mb-1">
                        Experience Level *
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#111111] focus:ring-2 focus:ring-black/10 outline-none text-sm font-medium bg-white transition-all"
                      >
                        <option value="1-2 Years">1-2 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                        <option value="5+ Years">5+ Years</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-700 mb-1">
                      Portfolio / Social Profile Link *
                    </label>
                    <input
                      type="url"
                      required
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleChange}
                      placeholder="https://instagram.com/yourprofile or portfolio site"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#111111] focus:ring-2 focus:ring-black/10 outline-none text-sm font-medium transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-700 mb-1">
                      Brief Introduction / Highlights
                    </label>
                    <textarea
                      rows={3}
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about your recent campaigns, audience reach, or key expertise..."
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#111111] focus:ring-2 focus:ring-black/10 outline-none text-sm font-medium transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-full bg-[#111111] hover:bg-[#E31D2E] text-white font-extrabold text-sm tracking-wide shadow-md transition-all cursor-pointer disabled:opacity-50 mt-2"
                  >
                    {loading ? "Submitting Application..." : "Submit Collaborator Application"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="py-8 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-neutral-100 border border-neutral-200 text-[#111111] flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-black text-[#111111] mb-2 tracking-tight">
                  Application Received!
                </h3>
                <p className="text-neutral-600 text-sm font-medium max-w-md mx-auto mb-6">
                  Thank you for applying to join the Praskla DigitalX Creative Collaborator Network. Our agency team will review your profile and get in touch soon.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-8 py-3 rounded-full bg-[#111111] text-white font-extrabold text-xs tracking-wider uppercase cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
