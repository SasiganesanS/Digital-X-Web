import React, { useState } from 'react';
import { FaCheck, FaTimes, FaExternalLinkAlt, FaArrowRight, FaMobileAlt, FaChartLine, FaEuroSign, FaRupeeSign } from 'react-icons/fa';
import { sendPricingQuoteEmails } from '../../utils/emailService';

const MobileMarketingCombo = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeTab, setActiveTab] = useState("plans");
  const [customBudget, setCustomBudget] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("EUR"); // Default is euros
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

  // Combo plans data
  const comboPlans = [
    {
      name: "Basic",
      tagline: "Perfect for MVPs & Initial Market Entry",
      mobileFeatures: [
        { name: "Native Android or iOS App", included: true },
        { name: "Basic UI Design & Prototype", included: true },
        { name: "Simple Onboarding Flow", included: true },
        { name: "Core Functionality (3-5 screens)", included: true },
        { name: "Basic User Authentication", included: true },
        { name: "1-Month Bug Fix Support", included: true },
        { name: "Push Notifications", included: false },
        { name: "Offline Mode", included: false }
      ],
      marketingFeatures: [
        { name: "App Store Optimization (ASO)", included: true },
        { name: "Social Media Presence Setup (2 platforms)", included: true },
        { name: "Basic User Acquisition Strategy", included: true },
        { name: "Monthly Performance Report", included: true },
        { name: "PPC Campaigns", included: false },
        { name: "Content Marketing", included: false }
      ],
      idealFor: "Startups, MVPs, Solo founders, Pilot product launches"
    },
    {
      name: "Startup",
      tagline: "For Apps Ready to Scale & Monetize",
      mobileFeatures: [
        { name: "Android + iOS + PWA Deployment", included: true },
        { name: "Custom UI Design & Interactive Prototype", included: true },
        { name: "Advanced User Onboarding", included: true },
        { name: "In-App Purchases/Payment Integration", included: true },
        { name: "Push Notifications", included: true },
        { name: "User Analytics Integration", included: true },
        { name: "3-Month Bug Fix Support", included: true },
        { name: "Offline Mode", included: false }
      ],
      marketingFeatures: [
        { name: "Advanced ASO & Keyword Optimization", included: true },
        { name: "Social Media Management (3 platforms)", included: true },
        { name: "User Acquisition Campaigns", included: true },
        { name: "Email Marketing Setup", included: true },
        { name: "Basic PPC Campaign Setup", included: true },
        { name: "Bi-weekly Performance Reports", included: true },
        { name: "Video Marketing", included: false }
      ],
      idealFor: "Growing startups, D2C brands, Service-based apps with monetization"
    },
    {
      name: "Standard",
      tagline: "For Established Apps Seeking Growth",
      mobileFeatures: [
        { name: "Deployment Across Android, iOS & Web", included: true },
        { name: "Animated UI & High-Fidelity Prototype", included: true },
        { name: "Premium Onboarding Experiences", included: true },
        { name: "Advanced Payment Systems", included: true },
        { name: "Push Notifications & In-App Messaging", included: true },
        { name: "Advanced Analytics & User Behavior Tracking", included: true },
        { name: "Offline Mode & Data Synchronization", included: true },
        { name: "6-Month Bug Fix Support", included: true }
      ],
      marketingFeatures: [
        { name: "Full ASO Strategy & Implementation", included: true },
        { name: "Social Media Growth Strategy (5 platforms)", included: true },
        { name: "Targeted User Acquisition Campaigns", included: true },
        { name: "Email Marketing Automation", included: true },
        { name: "Full PPC Campaign Management", included: true },
        { name: "Content Marketing Strategy", included: true },
        { name: "Basic Video Marketing", included: true },
        { name: "Weekly Performance Reports", included: true }
      ],
      idealFor: "Funded startups, Marketplaces & platforms, Apps with growing user base"
    },
    {
      name: "Premium",
      tagline: "Complete Mobile Ecosystem with Full Marketing Suite",
      mobileFeatures: [
        { name: "Complete Platform Ecosystem (Mobile, Web, Backend)", included: true },
        { name: "Bespoke UI with Advanced Prototype", included: true },
        { name: "Custom Onboarding Journeys", included: true },
        { name: "Enterprise-Grade Payment Processing", included: true },
        { name: "Advanced Messaging & Notification System", included: true },
        { name: "Custom Analytics & Business Intelligence", included: true },
        { name: "Full Offline Capabilities", included: true },
        { name: "12-Month SLA Support", included: true },
        { name: "Dedicated Project Manager", included: true }
      ],
      marketingFeatures: [
        { name: "Enterprise ASO & Market Positioning", included: true },
        { name: "Full Social Media Management & Strategy", included: true },
        { name: "Advanced User Acquisition & Retention Strategy", included: true },
        { name: "Complete Email Marketing Automation", included: true },
        { name: "Enterprise PPC & Paid Media Management", included: true },
        { name: "Content Marketing & SEO Strategy", included: true },
        { name: "Professional Video Marketing", included: true },
        { name: "Custom Reporting Dashboard", included: true },
        { name: "Dedicated Marketing Manager", included: true }
      ],
      idealFor: "Enterprises & Corporates, FinTech, Logistics, Healthcare, Complex apps with large-scale users"
    }
  ];

  const openQuoteModal = (plan) => {
    // Reset form data and states when opening modal
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectDetails: ''
    });
    setSubmitSuccess(false);
    setFormError("");
    setSelectedPlan(plan);

    // Set the budget range based on the selected plan
    if (plan === "Basic") {
      setSelectedBudgetRange("below-5k");
    } else if (plan === "Standard") {
      setSelectedBudgetRange("5k-15k");
    } else if (plan === "Pro") {
      setSelectedBudgetRange("15k-30k");
    } else if (plan === "Enterprise") {
      setSelectedBudgetRange("30k+");
    } else {
      setSelectedBudgetRange("");
    }

    setCustomBudget("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Function to handle currency change
  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  // Add email validation function
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
    // 2. Must end with .com, .org, .net, etc.
    // 3. Can only contain letters, numbers, dots, and hyphens
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
        selectedPlan,
        budget: customBudget ? `${selectedCurrency} ${customBudget}` : selectedBudgetRange,
        timestamp: new Date().toISOString(),
        service: "Mobile & Marketing Combo"
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
    <div className="min-h-screen bg-gray-50 pt-24 pb-10">
      <div className="w-[90%] max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#371445] mb-4">
            MOBILE APP + DIGITAL MARKETING COMBO PLANS
          </h1>
          <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Powerful mobile applications paired with strategic digital marketing to maximize
            user acquisition, engagement, and retention for your mobile business.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full shadow-md p-1 flex">
            <button
              className={`px-6 py-2 rounded-full transition-colors duration-300 ${activeTab === "plans" ? "bg-[#371445] text-white" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setActiveTab("plans")}
            >
              Combo Plans
            </button>
            <button
              className={`px-6 py-2 rounded-full transition-colors duration-300 ${activeTab === "compare" ? "bg-[#371445] text-white" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setActiveTab("compare")}
            >
              Feature Comparison
            </button>
          </div>
        </div>

        {/* Plans View */}
        {activeTab === "plans" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {comboPlans.map((plan, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]
                         rounded-4xl border border-white/50 p-8
                         hover:shadow-[0_8px_32px_0_rgba(55,20,69,0.2)]
                         transition-all duration-300 relative overflow-hidden rounded-2xl
                         flex flex-col h-auto min-h-[650px]"
              >
                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#371445]/5 rounded-full -mr-20 -mt-20 transition-transform group-hover:scale-150 duration-500"></div>

                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-[#371445] mb-3">{plan.tagline}</p>
                </div>

                {/* Mobile App Features */}
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <FaMobileAlt className="text-[#371445] mr-2" />
                    <h4 className="font-semibold text-gray-800">Mobile App Development</h4>
                  </div>
                  <div className="pl-2 mb-4">
                    {plan.mobileFeatures.map((feature, featureIndex) => (
                      <div
                        key={`mob-${featureIndex}`}
                        className="flex items-start space-x-2 mb-1.5"
                      >
                        {feature.included ? (
                          <span className="text-green-500 mt-1 text-sm flex-shrink-0"><FaCheck /></span>
                        ) : (
                          <span className="text-red-500 mt-1 text-sm flex-shrink-0"><FaTimes /></span>
                        )}
                        <span className="text-gray-700 text-sm">{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Marketing Features */}
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <FaChartLine className="text-[#371445] mr-2" />
                    <h4 className="font-semibold text-gray-800">Digital Marketing</h4>
                  </div>
                  <div className="pl-2 mb-4">
                    {plan.marketingFeatures.map((feature, featureIndex) => (
                      <div
                        key={`mkt-${featureIndex}`}
                        className="flex items-start space-x-2 mb-1.5"
                      >
                        {feature.included ? (
                          <span className="text-green-500 mt-1 text-sm flex-shrink-0"><FaCheck /></span>
                        ) : (
                          <span className="text-red-500 mt-1 text-sm flex-shrink-0"><FaTimes /></span>
                        )}
                        <span className="text-gray-700 text-sm">{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal For */}
                <div className="mt-auto">
                  <p className="text-sm font-medium text-gray-500 mb-1">Ideal For:</p>
                  <p className="text-[#371445] font-semibold text-sm mb-4">{plan.idealFor}</p>

                  {/* Button */}
                  <button
                    onClick={() => openQuoteModal(plan.name)}
                    className="w-full py-3 bg-[#371445] text-white rounded-xl font-semibold
                             hover:bg-[#4a1c5e] transition-colors duration-300 flex items-center justify-center"
                  >
                    CHOOSE PLAN
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Comparison View */}
        {activeTab === "compare" && (
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 overflow-x-auto">
            <div className="min-w-[800px]">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                      Feature
                    </th>
                    {comboPlans.map((plan, index) => (
                      <th key={index} scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Mobile App Features Section */}
                  <tr className="bg-gray-50">
                    <td colSpan={comboPlans.length + 1} className="px-6 py-3 text-left text-xs font-medium text-[#371445] uppercase tracking-wider">
                      Mobile App Development Features
                    </td>
                  </tr>
                  {comboPlans[0].mobileFeatures.concat(comboPlans[3].mobileFeatures.filter(f => !comboPlans[0].mobileFeatures.some(sf => sf.name === f.name))).map((feature, featureIndex) => (
                    <tr key={`mob-comp-${featureIndex}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {feature.name}
                      </td>
                      {comboPlans.map((plan, planIndex) => (
                        <td key={`mob-${planIndex}-${featureIndex}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {plan.mobileFeatures.some(f => f.name === feature.name && f.included) ? (
                            <FaCheck className="inline text-green-500" />
                          ) : (
                            <FaTimes className="inline text-red-500" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Marketing Features Section */}
                  <tr className="bg-gray-50">
                    <td colSpan={comboPlans.length + 1} className="px-6 py-3 text-left text-xs font-medium text-[#371445] uppercase tracking-wider">
                      Digital Marketing Features
                    </td>
                  </tr>
                  {comboPlans[0].marketingFeatures.concat(comboPlans[3].marketingFeatures.filter(f => !comboPlans[0].marketingFeatures.some(sf => sf.name === f.name))).map((feature, featureIndex) => (
                    <tr key={`mkt-comp-${featureIndex}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {feature.name}
                      </td>
                      {comboPlans.map((plan, planIndex) => (
                        <td key={`mkt-${planIndex}-${featureIndex}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {plan.marketingFeatures.some(f => f.name === feature.name && f.included) ? (
                            <FaCheck className="inline text-green-500" />
                          ) : (
                            <FaTimes className="inline text-red-500" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Combo Benefits */}
        <div className="bg-white/90 rounded-2xl shadow-lg p-8 border border-white/50 mt-16">
          <h2 className="text-3xl font-bold text-[#371445] mb-6">Why Choose Our Combo Plans?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Mobile + Marketing Synergy</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#371445] mr-2 mt-1">•</span>
                  <span className="text-gray-700">Unified approach to mobile app success</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#371445] mr-2 mt-1">•</span>
                  <span className="text-gray-700">Strategic alignment between app features and marketing goals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#371445] mr-2 mt-1">•</span>
                  <span className="text-gray-700">Cost savings compared to purchasing services separately</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#371445] mr-2 mt-1">•</span>
                  <span className="text-gray-700">Simplified management with a single point of contact</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Our Approach</h3>
              <p className="text-gray-700 mb-4">
                We believe in creating mobile experiences that not only look great but also drive user
                acquisition and retention. Our mobile + marketing combos provide a comprehensive approach
                to launching and growing your mobile application.
              </p>
              <p className="text-gray-700">
                Each plan is customizable to your specific business needs, and our team works closely with you
                to ensure both your mobile app and marketing strategy work together seamlessly.
              </p>
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
              <FaTimes />
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
                  We've received your quote request for the {selectedPlan} Plan. Our team will contact you shortly.
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
                <h2 className="text-2xl font-bold text-[#371445] mb-6">Request Quote for {selectedPlan} Plan</h2>

                {formError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Details</label>
                    <textarea
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#371445] focus:border-[#371445] h-32"
                      placeholder="Tell us about your mobile app and marketing needs..."
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
                      Please enter your budget for the {selectedPlan} plan
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

export default MobileMarketingCombo;
