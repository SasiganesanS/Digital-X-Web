//Contact section component for homepage

import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiMail, HiCalendar } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";

const ContactSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [callMessage, setCallMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "", // 'client' or 'career'
    companyName: "",
    role: "",
    position: "", // 'intern' or 'employee'
    message: "",
  });

  // Email validation function
  const validateEmail = (email) => {
    if (!email) return false;
    const emailRegex =
      /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9][a-zA-Z0-9.-]*\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Build detailed message body based on inquiry type
      let messageBody = "";

      if (formData.inquiryType === "client") {
        messageBody = `Inquiry Type: Client/Business Inquiry\n\n`;
        messageBody += `Name: ${formData.name}\n`;
        messageBody += `Email: ${formData.email}\n`;
        messageBody += `Company Name: ${formData.companyName}\n`;
        messageBody += `Role: ${formData.role}\n\n`;
        messageBody += `Message:\n${formData.message}`;
      } else if (formData.inquiryType === "career") {
        const positionType =
          formData.position === "intern" ? "Internship" : "Full-time Employee";
        messageBody = `Inquiry Type: Career/Job Application\n\n`;
        messageBody += `Name: ${formData.name}\n`;
        messageBody += `Email: ${formData.email}\n`;
        messageBody += `Position Type: ${positionType}\n\n`;
        messageBody += `Message:\n${formData.message}`;
      }

      // Build email data matching the expected format
      const emailData = {
        timestamp: new Date().toISOString(),
        name: formData.name,
        email: formData.email,
        phone: "",
        message: messageBody,
        targetGid: "528138283", // ReachUs sheet GID
      };

      console.log("Sending contact data:", emailData);

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxhy7gcPdsxeOWFPj8NpGYp6RD4PQN2DcLKRkGVSUSlnLeTdnYQbEPzbxa-Xqd8stDD/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );

      setSubmitSuccess(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        inquiryType: "",
        companyName: "",
        role: "",
        position: "",
        message: "",
      });
      setCurrentStep(1);
      setEmailError("");

      setTimeout(() => {
        setSubmitSuccess(false);
        setShowModal(false);
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error submitting your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    // Clear email error when user types in email field
    if (field === "email" && emailError) {
      setEmailError("");
    }
  };

  const openEmailModal = () => {
    setShowModal(true);
    setCurrentStep(1);
    setEmailError("");
    setFormData({
      name: "",
      email: "",
      inquiryType: "",
      companyName: "",
      role: "",
      position: "",
      message: "",
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentStep(1);
    setSubmitSuccess(false);
    setEmailError("");
  };

  const openCallModal = () => {
    setShowCallModal(true);
    setCallMessage("");
  };

  const closeCallModal = () => {
    setShowCallModal(false);
    setCallMessage("");
  };

  const handleCallSubmit = async () => {
    if (!callMessage.trim()) return;

    setIsSubmitting(true);

    try {
      const emailData = {
        timestamp: new Date().toISOString(),
        name: "Call Request",
        email: "praskladigitalx@gmail.com",
        phone: "",
        message: `Book a Call Request:\n\n${callMessage}`,
        targetGid: "528138283",
      };

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxhy7gcPdsxeOWFPj8NpGYp6RD4PQN2DcLKRkGVSUSlnLeTdnYQbEPzbxa-Xqd8stDD/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );

      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        closeCallModal();
      }, 2000);
    } catch (error) {
      console.error("Error submitting call request:", error);
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      // Validate email before proceeding
      if (!formData.name || !formData.email) {
        return;
      }
      if (!validateEmail(formData.email)) {
        setEmailError(
          "Please enter a valid email address (e.g., username@domain.com)"
        );
        return;
      }
      setEmailError("");
      setCurrentStep(2);
    } else if (currentStep === 2 && formData.inquiryType) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.name && formData.email && validateEmail(formData.email);
    }
    if (currentStep === 2) {
      return formData.inquiryType;
    }
    if (currentStep === 3) {
      if (formData.inquiryType === "client") {
        return formData.companyName && formData.role && formData.message;
      } else {
        return formData.position && formData.message;
      }
    }
    return false;
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#371445] mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
          <p className="text-sm md:text-[15px] lg:text-base text-[#5F5F5F] max-w-2xl mx-auto">
            Let's collaborate and bring your ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Column - Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl md:text-[22px] lg:text-2xl font-bold text-[#371445] mb-3">
                Collaborate
              </h3>
              <a
                href="mailto:praskladigitalx@gmail.com"
                className="text-[#371445] hover:text-[#4a1d5a] text-sm md:text-[15px] lg:text-base font-medium transition-colors"
              >
                praskladigitalx@gmail.com
              </a>
              <div className="flex items-center gap-2 mt-3 text-xs md:text-sm text-[#5F5F5F]">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Available for projects</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl md:text-[22px] lg:text-2xl font-bold text-[#371445] mb-4">
                Connect
              </h3>
              <div className="flex flex-col gap-3">
                <motion.button
                  onClick={openCallModal}
                  className="group relative inline-flex items-center justify-center gap-2 bg-[#371445]/90 backdrop-blur-sm border border-[#fff] text-white px-6 py-3 rounded-full font-light text-sm sm:text-base overflow-hidden transition-all duration-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/50 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <HiCalendar className="w-5 h-5 relative z-10" />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Book a call
                  </span>
                </motion.button>
                <motion.button
                  onClick={openEmailModal}
                  className="group relative inline-flex items-center justify-center gap-2 bg-[#371445]/90 backdrop-blur-sm border border-[#fff] text-white px-6 py-3 rounded-full font-light text-sm sm:text-base overflow-hidden transition-all duration-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/50 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <HiMail className="w-5 h-5 relative z-10" />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Email us
                  </span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl md:text-[22px] lg:text-2xl font-bold text-[#371445] mb-3">
              Quick Message
            </h3>
            <p className="text-sm md:text-[15px] lg:text-base text-[#5F5F5F] mb-6">
              Send us a quick message and we'll get back to you soon.
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!validateEmail(formData.email)) {
                  setEmailError("Please enter a valid email address");
                  return;
                }
                setEmailError("");
                setIsSubmitting(true);

                try {
                  const emailData = {
                    timestamp: new Date().toISOString(),
                    name: formData.name,
                    email: formData.email,
                    phone: "",
                    message: `Quick Contact Message:\n\n${formData.message}`,
                    targetGid: "528138283",
                  };

                  await fetch(
                    "https://script.google.com/macros/s/AKfycbxhy7gcPdsxeOWFPj8NpGYp6RD4PQN2DcLKRkGVSUSlnLeTdnYQbEPzbxa-Xqd8stDD/exec",
                    {
                      method: "POST",
                      mode: "no-cors",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(emailData),
                    }
                  );

                  setSubmitSuccess(true);
                  setFormData({
                    ...formData,
                    name: "",
                    email: "",
                    message: "",
                  });

                  setTimeout(() => {
                    setSubmitSuccess(false);
                  }, 3000);
                } catch (error) {
                  console.error("Error:", error);
                  alert("Error sending message. Please try again.");
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm md:text-base lg:text-lg font-semibold text-[#371445] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#371445] focus:border-[#371445] outline-none transition-all text-sm md:text-[15px] lg:text-base"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm md:text-base lg:text-lg font-semibold text-[#371445] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#371445] focus:border-[#371445] outline-none transition-all text-sm md:text-[15px] lg:text-base ${
                    emailError ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="your@email.com"
                />
                {emailError && (
                  <p className="text-red-500 text-xs md:text-sm mt-1">
                    {emailError}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm md:text-base lg:text-lg font-semibold text-[#371445] mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#371445] focus:border-[#371445] outline-none resize-none transition-all text-sm md:text-[15px] lg:text-base"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              {submitSuccess && !showModal && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm md:text-[15px] lg:text-base">
                  ✓ Message sent successfully!
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex items-center justify-center gap-2 bg-[#371445]/90 backdrop-blur-sm border border-[#fff] text-white px-6 py-3.5 rounded-full font-light text-sm md:text-base overflow-hidden transition-all duration-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/50 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 relative z-10"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span className="relative z-10">Sending...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      Send Message
                    </span>
                    <IoSend className="w-5 h-5 relative z-10" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center overflow-hidden p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl transform transition-all relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-3 -right-3 bg-white text-gray-500 hover:text-gray-700 p-2 rounded-full shadow-lg transition-colors z-10"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <div className="border-b border-gray-200 p-6 flex-shrink-0">
              <h2 className="text-2xl md:text-[28px] lg:text-[32px] font-bold text-[#371445]">
                Get In Touch
              </h2>
              <p className="text-sm md:text-[15px] lg:text-base text-[#5F5F5F] mt-2">
                Step {currentStep} of 3
              </p>
              <div className="flex gap-2 mt-3">
                <div
                  className={`h-1 flex-1 rounded ${
                    currentStep >= 1 ? "bg-[#371445]" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`h-1 flex-1 rounded ${
                    currentStep >= 2 ? "bg-[#371445]" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`h-1 flex-1 rounded ${
                    currentStep >= 3 ? "bg-[#371445]" : "bg-gray-200"
                  }`}
                ></div>
              </div>
            </div>

            {/* Success Message */}
            {submitSuccess && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/95 rounded-2xl z-50">
                <div className="text-center p-6">
                  <svg
                    className="w-16 h-16 text-green-500 mx-auto mb-4"
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
                  <h3 className="text-xl md:text-[22px] lg:text-2xl font-bold text-[#371445] mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-sm md:text-[15px] lg:text-base text-[#5F5F5F]">
                    We'll get back to you soon.
                  </p>
                </div>
              </div>
            )}

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div>
                      <label className="block text-sm md:text-base lg:text-lg font-semibold text-[#371445] mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#371445] focus:border-[#371445] outline-none transition-all text-sm md:text-[15px] lg:text-base"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm md:text-base lg:text-lg font-semibold text-[#371445] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#371445] focus:border-[#371445] outline-none transition-all text-sm md:text-[15px] lg:text-base ${
                          emailError ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="john@example.com"
                      />
                      {emailError && (
                        <p className="text-red-500 text-xs md:text-sm mt-1">
                          {emailError}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Inquiry Type */}
                {currentStep === 2 && (
                  <div className="space-y-4 animate-fadeIn">
                    <label className="block text-sm md:text-base lg:text-lg font-semibold text-[#371445] mb-4">
                      I am a: *
                    </label>
                    <div className="grid grid-cols-1 gap-4">
                      <button
                        type="button"
                        onClick={() => handleChange("inquiryType", "client")}
                        className={`p-6 border-2 rounded-xl text-left transition-all ${
                          formData.inquiryType === "client"
                            ? "border-[#371445] bg-[#371445]/5"
                            : "border-gray-200 hover:border-[#371445]/50"
                        }`}
                      >
                        <div className="flex items-start">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 mt-1 ${
                              formData.inquiryType === "client"
                                ? "border-[#371445] bg-[#371445]"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.inquiryType === "client" && (
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#371445] text-base md:text-lg mb-1">
                              Client / Business
                            </h4>
                            <p className="text-[#5F5F5F] text-xs md:text-sm">
                              I represent a company interested in your services
                            </p>
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleChange("inquiryType", "career")}
                        className={`p-6 border-2 rounded-xl text-left transition-all ${
                          formData.inquiryType === "career"
                            ? "border-[#371445] bg-[#371445]/5"
                            : "border-gray-200 hover:border-[#371445]/50"
                        }`}
                      >
                        <div className="flex items-start">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 mt-1 ${
                              formData.inquiryType === "career"
                                ? "border-[#371445] bg-[#371445]"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.inquiryType === "career" && (
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#371445] text-base md:text-lg mb-1">
                              Job Seeker
                            </h4>
                            <p className="text-[#5F5F5F] text-xs md:text-sm">
                              I'm interested in working with your company
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Details and Message */}
                {currentStep === 3 && (
                  <div className="space-y-4 animate-fadeIn">
                    {formData.inquiryType === "client" && (
                      <>
                        <div>
                          <label className="block text-sm md:text-base lg:text-lg font-semibold text-[#371445] mb-2">
                            Company Name *
                          </label>
                          <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) =>
                              handleChange("companyName", e.target.value)
                            }
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#371445] focus:border-[#371445] outline-none transition-all text-sm md:text-[15px] lg:text-base"
                            placeholder="Your company name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm md:text-base lg:text-lg font-semibold text-[#371445] mb-2">
                            Your Role *
                          </label>
                          <input
                            type="text"
                            value={formData.role}
                            onChange={(e) =>
                              handleChange("role", e.target.value)
                            }
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#371445] focus:border-[#371445] outline-none transition-all text-sm md:text-[15px] lg:text-base"
                            placeholder="e.g., CEO, Marketing Manager"
                          />
                        </div>
                      </>
                    )}

                    {formData.inquiryType === "career" && (
                      <div>
                        <label className="block text-sm md:text-base lg:text-lg font-semibold text-[#371445] mb-2">
                          Position Type *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => handleChange("position", "intern")}
                            className={`p-4 border-2 rounded-lg font-medium transition-all text-sm md:text-base ${
                              formData.position === "intern"
                                ? "border-[#371445] bg-[#371445] text-white"
                                : "border-gray-200 text-gray-700 hover:border-[#371445]"
                            }`}
                          >
                            Internship
                          </button>
                          <button
                            type="button"
                            onClick={() => handleChange("position", "employee")}
                            className={`p-4 border-2 rounded-lg font-medium transition-all text-sm md:text-base ${
                              formData.position === "employee"
                                ? "border-[#371445] bg-[#371445] text-white"
                                : "border-gray-200 text-gray-700 hover:border-[#371445]"
                            }`}
                          >
                            Full-time Employee
                          </button>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm md:text-base lg:text-lg font-semibold text-[#371445] mb-2">
                        Message *
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) =>
                          handleChange("message", e.target.value)
                        }
                        required
                        rows="6"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#371445] focus:border-[#371445] outline-none resize-none transition-all text-sm md:text-[15px] lg:text-base"
                        placeholder={
                          formData.inquiryType === "client"
                            ? "Tell us about your project requirements..."
                            : "Tell us about your skills and why you want to join our team..."
                        }
                      ></textarea>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 flex justify-between items-center flex-shrink-0">
              <button
                type="button"
                onClick={currentStep === 1 ? closeModal : handleBack}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-all font-medium text-sm md:text-base"
                disabled={isSubmitting}
              >
                {currentStep === 1 ? "Cancel" : "Back"}
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`px-6 py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
                    canProceed()
                      ? "bg-[#371445] text-white hover:scale-105"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  style={
                    canProceed()
                      ? { boxShadow: "0 6px 20px rgba(45, 27, 78, 0.3)" }
                      : {}
                  }
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className={`px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all text-sm md:text-base ${
                    canProceed() && !isSubmitting
                      ? "bg-[#371445] text-white hover:scale-105"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  style={
                    canProceed() && !isSubmitting
                      ? { boxShadow: "0 6px 20px rgba(45, 27, 78, 0.3)" }
                      : {}
                  }
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <IoSend className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {!submitSuccess ? (
              <>
                <div className="sticky top-0 bg-gradient-to-r from-[#371445] to-[#4a1d5a] p-6 rounded-t-2xl">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl md:text-[22px] lg:text-2xl font-bold text-white">
                      Book a Call
                    </h2>
                    <button
                      onClick={closeCallModal}
                      className="text-white/80 hover:text-white text-3xl leading-none transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-base md:text-lg font-semibold text-[#371445] mb-4">
                      Contact Numbers
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:shadow-md transition-shadow">
                        <div className="bg-[#371445] p-2 rounded-lg">
                          <FaPhone className="text-white w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs text-[#5F5F5F] font-medium">
                            India Office
                          </p>
                          <a
                            href="tel:+919344305986"
                            className="text-[#371445] font-semibold hover:underline text-base md:text-lg"
                          >
                            +91 93443 05986
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:shadow-md transition-shadow">
                        <div className="bg-[#371445] p-2 rounded-lg">
                          <FaPhone className="text-white w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs text-[#5F5F5F] font-medium">
                            German Office
                          </p>
                          <a
                            href="tel:+4915156840689"
                            className="text-[#371445] font-semibold hover:underline text-base md:text-lg"
                          >
                            +49 1515 6840 689
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm md:text-base lg:text-lg font-semibold text-[#371445] mb-2">
                      Let us know what you need to discuss briefly. We'll get
                      back to you shortly.
                    </label>
                    <textarea
                      value={callMessage}
                      onChange={(e) => setCallMessage(e.target.value)}
                      rows="5"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#371445] focus:border-[#371445] outline-none resize-none transition-all text-sm md:text-[15px] lg:text-base"
                      placeholder="Brief description of what you'd like to discuss..."
                    />
                  </div>

                  <button
                    onClick={handleCallSubmit}
                    disabled={isSubmitting || !callMessage.trim()}
                    className={`w-full py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all text-sm md:text-base ${
                      callMessage.trim() && !isSubmitting
                        ? "bg-[#371445] text-white hover:scale-105"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    style={
                      callMessage.trim() && !isSubmitting
                        ? { boxShadow: "0 6px 20px rgba(45, 27, 78, 0.3)" }
                        : {}
                    }
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <IoSend className="w-5 h-5" />
                        Submit Request
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl md:text-[22px] lg:text-2xl font-bold text-[#371445] mb-2">
                  Request Submitted!
                </h3>
                <p className="text-sm md:text-[15px] lg:text-base text-[#5F5F5F]">
                  We'll get back to you shortly.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactSection;
