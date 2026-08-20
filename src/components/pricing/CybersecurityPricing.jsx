import React, { useState } from 'react';
import { FaCheck, FaTimes, FaTimes as CloseIcon, FaShieldAlt, FaLock, FaUserShield, FaClipboardCheck, FaServer, FaEuroSign, FaRupeeSign } from 'react-icons/fa';
import mock1 from "../../assets/pricing/mock1.webp";
import mock2 from "../../assets/pricing/mock2.webp";
import mock3 from "../../assets/pricing/mock3.webp";
import mock4 from "../../assets/pricing/mock4.webp";
import { sendPricingQuoteEmails } from '../../utils/emailService';

const CybersecurityPricing = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBudgetRange, setSelectedBudgetRange] = useState("");
  const [customBudget, setCustomBudget] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectDetails: ''
  });

  const securityServices = [
    {
      name: "Technical Security Assessments",
      subtitle: "Comprehensive vulnerability testing and security evaluation",
      features: [
        { name: "Vulnerability assessments and penetration testing", included: true },
        { name: "Red team simulations with threat emulation", included: true },
        { name: "Web, mobile, and thick client security testing", included: true },
        { name: "ATM and virtualization environment assessments", included: true },
        { name: "Secure code reviews and configuration validation", included: true },
        { name: "CVSS-based risk scoring and monthly reports", included: true },
        { name: "Social engineering and physical security testing", included: true },
        { name: "Executive-level summary reports", included: true }
      ]
    },
    {
      name: "Data Protection & Privacy",
      subtitle: "Regulatory compliance and data protection services",
      features: [
        { name: "GDPR, HIPAA, and CCPA compliance consulting", included: true },
        { name: "Data Protection Officer (DPO) advisory", included: true },
        { name: "ISO 27001 alignment for privacy programs", included: true },
        { name: "Data flow mapping and consent management", included: true },
        { name: "Privacy policy evaluation and staff training", included: true },
        { name: "Third-party data sharing audits", included: true },
        { name: "Customized training for compliance", included: true },
        { name: "Comprehensive privacy implementation", included: true }
      ]
    },
    {
      name: "Strategic Security Roadmap",
      subtitle: "Long-term security planning and advisory services",
      features: [
        { name: "Development of risk-based security roadmaps", included: true },
        { name: "KPI setting and quarterly progress reviews", included: true },
        { name: "Tool selection and budget planning support", included: true },
        { name: "CISO advisory for strategic planning", included: true },
        { name: "Alignment with NIST, CIS frameworks", included: true },
        { name: "Milestone-based security maturity planning", included: true },
        { name: "Power BI CS analytics", included: true },
        { name: "Executive reporting and guidance", included: true }
      ]
    },
    {
      name: "Business Continuity",
      subtitle: "Resilience planning and disaster recovery",
      features: [
        { name: "ISO 22301 business continuity implementation", included: true },
        { name: "Business Impact Analysis (BIA)", included: true },
        { name: "Crisis management and recovery planning", included: true },
        { name: "Cloud-based backup strategies", included: true },
        { name: "Simulation and testing of continuity plans", included: true },
        { name: "Crisis communication protocols", included: true },
        { name: "Regular resilience assessments", included: true },
        { name: "Stakeholder management planning", included: true }
      ]
    }
  ];

  // Service category icons and descriptions
  const serviceCategories = [
    {
      service: "Technical Security Assessments",
      name: "Vulnerability Testing",
      description: "Comprehensive security testing to identify and address vulnerabilities in your systems",
      icon: <FaShieldAlt className="text-[#371445] text-5xl" />
    },
    {
      service: "Data Protection & Privacy",
      name: "Privacy Compliance",
      description: "Ensure your organization meets regulatory requirements for data protection",
      icon: <FaLock className="text-[#371445] text-5xl" />
    },
    {
      service: "Strategic Security Roadmap",
      name: "Security Planning",
      description: "Long-term strategic planning and advisory services for your security program",
      icon: <FaUserShield className="text-[#371445] text-5xl" />
    },
    {
      service: "Business Continuity",
      name: "Resilience Planning",
      description: "Ensure business operations can continue during and after disruptive incidents",
      icon: <FaServer className="text-[#371445] text-5xl" />
    }
  ];

  const openQuoteModal = (service) => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectDetails: ''
    });
    setSubmitSuccess(false);
    setFormError("");
    setSelectedService(service);

    // Set the budget range based on the selected service
    if (service === "Technical Security Assessments") {
      setSelectedBudgetRange("below-5k");
    } else if (service === "Data Protection & Privacy") {
      setSelectedBudgetRange("5k-10k");
    } else if (service === "Strategic Security Roadmap") {
      setSelectedBudgetRange("10k-20k");
    } else if (service === "Business Continuity") {
      setSelectedBudgetRange("20k-50k");
    } else {
      setSelectedBudgetRange("custom");
    }

    // Always set custom budget to empty string
    setCustomBudget("");

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

     // Form validation
     const validateEmail = (email) => {
      // Check if email is empty
      if (!email) return false;
 
      // Split email into username and domain parts
      const [username, domain] = email.split('@');
      
      // Check if both username and domain exist
      if (!username || !domain) return false;
 
      // Username validation
      const usernameRegex = /^[a-zA-Z][a-zA-Z0-9._]*$/;
      if (!usernameRegex.test(username)) return false;
 
      // Domain validation
      const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
      if (!domainRegex.test(domain)) return false;
 
      return true;
    };
 
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

  // Function to handle currency change
  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone) {
      setFormError("Please fill in all required fields");
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setFormError("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    setFormError("");
    
    try {
      // Prepare data for email
      const emailData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectDetails: formData.projectDetails,
        selectedService,
        budget: customBudget ? `${selectedCurrency} ${customBudget}` : selectedBudgetRange,
        timestamp: new Date().toISOString(),
        service: "Cybersecurity Services"
      };
      
      // Send email using Brevo SMTP
      const emailResult = await sendPricingQuoteEmails(emailData);
      
      if (emailResult.success) {
        setSubmitSuccess(true);
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectDetails: ''
        });
        setCustomBudget("");
      } else {
        setFormError("Failed to send quote request. Please try again.");
        console.error("Email sending failed:", emailResult.error);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-10">
      <div className="w-[90%] max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#371445] mb-4">
            Cybersecurity Services
          </h1>
          <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive security solutions to protect your business in an evolving threat landscape
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {securityServices.map((service, index) => {
            return (
              <div
                key={index}
                className="bg-gray-100 rounded-2xl overflow-hidden h-full flex flex-col"
              >
                {/* Service Header */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{service.name}</h3>
                  <p className="text-sm text-[#371445] mb-4">{service.subtitle}</p>
                </div>

                {/* Feature List */}
                <div className="px-6 pb-6 flex-grow">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-start space-x-3 mb-3"
                    >
                      <span className="text-green-500 mt-1"><FaCheck /></span>
                      <span className="text-gray-700">{feature.name}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="px-6 pb-6 mt-auto">
                  <button
                    className="w-full py-3 bg-[#371445] text-white rounded-xl font-semibold
                             hover:bg-[#4a1b5d] transition-colors duration-300"
                    onClick={() => openQuoteModal(service.name)}
                  >
                    REQUEST QUOTE
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Categories Section */}
        <div className="mt-20 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#371445] mb-4">
              Specialized Security Solutions
            </h2>
            <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceCategories.map((category, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Service Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.service}</h3>

                {/* Icon */}
                <div className="w-28 h-28 mb-4 flex items-center justify-center rounded-full bg-gray-100 overflow-hidden">
                  {category.icon}
                </div>

                {/* Name and Description */}
                <h4 className="text-lg font-semibold text-[#371445] mb-1 text-center">{category.name}</h4>
                <p className="text-sm text-gray-700 text-center">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Security Assessments Section */}
      <div className="w-[90%] max-w-[1280px] mx-auto mt-20 mb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#371445] mb-4">
            TECHNICAL SECURITY ASSESSMENTS
          </h1>
          <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Comprehensive Vulnerability Testing & Security Evaluation
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our technical security assessment services help identify vulnerabilities and security gaps in
            your infrastructure, applications, and systems before they can be exploited by attackers.
          </p>
        </div>

        {/* Content Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Content */}
          <div className="flex flex-col justify-center p-4 md:p-8">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">What We Provide:</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Vulnerability assessments and penetration testing</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Red team simulations with threat emulation</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Web, mobile, and thick client security testing</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>ATM and virtualization environment assessments</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Secure code reviews and configuration validation</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>CVSS-based risk scoring and monthly reports</span>
              </li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-lg">
              <img
                src={mock1}
                alt="Security assessment features"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Bottom Image */}
          <div className="flex items-center justify-center p-4 md:p-8 md:order-3">
            <div className="w-full max-w-lg">
              <img
                src={mock2}
                alt="Security monitoring dashboard"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-center p-4 md:p-8 md:order-4">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">Additional Services:</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Social engineering and physical security testing</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Executive-level summary reports and technical debriefs</span>
              </li>
            </ul>
            <div className="mt-8">
              <blockquote className="italic text-gray-700 border-l-4 border-[#371445] pl-4 py-2">
                "Proactive security testing is essential for organizations seeking to protect their digital assets and sensitive data."
              </blockquote>
            </div>
            <div className="mt-8">
              <button
                onClick={() => openQuoteModal("Technical Security Assessments")}
                className="px-8 py-3 bg-[#371445] text-white text-lg font-semibold rounded-full
                          hover:bg-[#4a1b5d] transition-colors duration-300 shadow-md"
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Data Protection Section */}
      <div className="w-[90%] max-w-[1280px] mx-auto mt-20 mb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#371445] mb-4">
            DATA PROTECTION & PRIVACY PROGRAMS
          </h1>
          <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Comprehensive Regulatory Compliance & Data Protection
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our data protection and privacy services help organizations meet regulatory requirements
            while ensuring effective protection of sensitive data and customer privacy.
          </p>
        </div>

        {/* Content Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Content */}
          <div className="flex flex-col justify-center p-4 md:p-8">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">What We Provide:</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>GDPR, HIPAA, and CCPA compliance consulting</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Data Protection Officer (DPO) advisory</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>ISO 27001 alignment for privacy programs</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Data flow mapping and consent management review</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Privacy policy evaluation and staff awareness training</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Third-party data sharing audits and risk analysis</span>
              </li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-lg">
              <img
                src={mock3}
                alt="Data protection features"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Bottom Image */}
          <div className="flex items-center justify-center p-4 md:p-8 md:order-3">
            <div className="w-full max-w-lg">
              <img
                src={mock4}
                alt="Privacy compliance dashboard"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-center p-4 md:p-8 md:order-4">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">Additional Services:</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Customized training programs for compliance</span>
              </li>
            </ul>
            <div className="mt-8">
              <blockquote className="italic text-gray-700 border-l-4 border-[#371445] pl-4 py-2">
                "Effective data protection programs not only ensure compliance but also build customer trust and enhance business reputation."
              </blockquote>
            </div>
            <div className="mt-8">
              <button
                onClick={() => openQuoteModal("Data Protection & Privacy")}
                className="px-8 py-3 bg-[#371445] text-white text-lg font-semibold rounded-full
                          hover:bg-[#4a1b5d] transition-colors duration-300 shadow-md"
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <CloseIcon />
            </button>

            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
                <p className="text-gray-600 mb-6">
                  We've received your quote request for the {selectedService} Plan. Our team will contact you shortly.
                </p>
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-[#371445] text-white rounded-lg font-medium hover:bg-[#4a1b5d] transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-[#371445] mb-6">Request Quote for {selectedService} Plan</h2>

                {formError && (
                  <div className="bg-[#FF2B2B]/5 border border-[#FF2B2B]/20 text-[#FF2B2B] px-4 py-3 rounded-lg mb-4">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#371445] focus:border-[#371445]"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#371445] focus:border-[#371445]"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#371445] focus:border-[#371445]"
                      placeholder="Your phone number"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Security Requirements</label>
                    <textarea
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#371445] focus:border-[#371445] h-32"
                      placeholder="Tell us about your cybersecurity needs..."
                    ></textarea>
                  </div>

                  {/* Budget Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Budget</label>
                    <div className="flex items-center space-x-2 mb-3">
                      <button
                        type="button"
                        className={`flex items-center justify-center p-2 rounded-lg ${
                          selectedCurrency === "EUR"
                            ? "bg-[#371445] text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => handleCurrencyChange("EUR")}
                      >
                        <FaEuroSign className="mr-1" />
                        <span>EUR</span>
                      </button>
                      <button
                        type="button"
                        className={`flex items-center justify-center p-2 rounded-lg ${
                          selectedCurrency === "INR"
                            ? "bg-[#371445] text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => handleCurrencyChange("INR")}
                      >
                        <FaRupeeSign className="mr-1" />
                        <span>INR</span>
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-[#371445] focus:border-[#371445]"
                        placeholder="Enter your budget"
                        value={customBudget}
                        onChange={(e) => setCustomBudget(e.target.value)}
                      />
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        {selectedCurrency === "EUR" ? (
                          <FaEuroSign className="text-gray-400" />
                        ) : (
                          <FaRupeeSign className="text-gray-400" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Please enter your budget for the {selectedService} plan
                    </p>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 bg-[#371445] text-white rounded-xl font-semibold
                               hover:bg-[#4a1b5d] transition-colors duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'SUBMITTING...' : 'CONFIRM PLAN SELECTION'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CybersecurityPricing;