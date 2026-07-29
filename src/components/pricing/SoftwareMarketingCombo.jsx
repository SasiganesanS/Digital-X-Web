import React, { useState } from 'react';
import { FaCheck, FaTimes, FaExternalLinkAlt, FaArrowRight, FaLaptopCode, FaChartLine, FaEuroSign, FaRupeeSign } from 'react-icons/fa';
import { sendPricingQuoteEmails } from '../../utils/emailService';

const SoftwareMarketingCombo = () => {
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
      tagline: "Perfect for Internal Tools + Online Presence Setup",
      softwareFeatures: [
        { name: "Basic Desktop Tool (Windows, Python/C#/Electron)", included: true },
        { name: "2–3 screen UI with single function (no DB)", included: true },
        { name: "Delivered in 5–7 days", included: true },
        { name: "1 Week Free Bug Fix Support", included: true },
        { name: "Multi-platform support", included: false },
        { name: "Database integration", included: false },
        { name: "User roles", included: false },
        { name: "Advanced reporting", included: false }
      ],
      marketingFeatures: [
        { name: "SEO Basics (On-page)", included: true },
        { name: "Social Media Setup (2 Platforms – 2 posts/week)", included: true },
        { name: "1 Basic Email Campaign", included: true },
        { name: "1-Month Reporting & Support", included: true },
        { name: "PPC Campaign", included: false },
        { name: "Video Content", included: false },
        { name: "Advanced Analytics", included: false }
      ],
      idealFor: "Small businesses, consultants, internal teams"
    },
    {
      name: "Startup",
      tagline: "Business Tool + Foundational Digital Marketing",
      softwareFeatures: [
        { name: "Business Utility Software (up to 5 screens)", included: true },
        { name: "Local database (SQLite/JSON)", included: true },
        { name: "CRUD, form inputs, basic reporting", included: true },
        { name: "10–14 day delivery", included: true },
        { name: "1 Month Support", included: true },
        { name: "Multi-platform support", included: false },
        { name: "User roles", included: false },
        { name: "API integration", included: false }
      ],
      marketingFeatures: [
        { name: "Full SEO (On-Page + Basic Off-Page)", included: true },
        { name: "Social Media (3 Platforms – 3 posts/week)", included: true },
        { name: "2 Email Campaigns", included: true },
        { name: "Conversion Tracking Setup", included: true },
        { name: "Basic PPC Campaign Setup", included: true },
        { name: "Video Content", included: false },
        { name: "Email Marketing Automation", included: false }
      ],
      idealFor: "Service providers, startups going digital"
    },
    {
      name: "Standard",
      tagline: "Advanced Software + Smart Growth Marketing",
      softwareFeatures: [
        { name: "Modern Desktop App (Windows/macOS/Linux)", included: true },
        { name: "MySQL/SQLite integration", included: true },
        { name: "User roles, filters, reporting dashboard", included: true },
        { name: "3–4 week delivery", included: true },
        { name: "2 Months Bug Fix + Minor Upgrades", included: true },
        { name: "Remote DB Sync", included: false },
        { name: "API integration", included: false },
        { name: "Encryption", included: false }
      ],
      marketingFeatures: [
        { name: "SEO + Content Strategy Planning", included: true },
        { name: "Social Media (4 Platforms – 4 posts/week)", included: true },
        { name: "4 Email Campaigns/Month", included: true },
        { name: "Full PPC Management (Google, Meta)", included: true },
        { name: "Monthly Analytics Report", included: true },
        { name: "Video Content (1 Explainer Video)", included: true },
        { name: "Email Marketing Automation", included: false }
      ],
      idealFor: "Growing brands, SaaS apps, product-based businesses"
    },
    {
      name: "Premium",
      tagline: "Feature-Rich App + Marketing Engine",
      softwareFeatures: [
        { name: "Multi-platform Software", included: true },
        { name: "Remote DB Sync, login, encryption", included: true },
        { name: "API integration, auto updates", included: true },
        { name: "4–6 week delivery", included: true },
        { name: "3 Months Optimization Support", included: true },
        { name: "CRM integration", included: false },
        { name: "Licensing system", included: false },
        { name: "Enterprise features", included: false }
      ],
      marketingFeatures: [
        { name: "Full SEO Audit & Execution", included: true },
        { name: "5 Platforms Social Media – Daily Posts", included: true },
        { name: "Email Marketing Automation (Full Funnel)", included: true },
        { name: "CRO Setup + Analytics Dashboard", included: true },
        { name: "2 Custom Marketing Videos", included: true },
        { name: "Bi-weekly Reporting & Dedicated Manager", included: true },
        { name: "Custom automation", included: false }
      ],
      idealFor: "SaaS platforms, high-growth businesses, digital-first brands"
    },

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
        service: "Software & Marketing Combo"
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
            SOFTWARE + DIGITAL MARKETING COMBO PLANS
          </h1>
          <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Powerful software solutions paired with strategic digital marketing to accelerate
            your business growth and digital transformation.
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

                {/* Software Features */}
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <FaLaptopCode className="text-[#371445] mr-2" />
                    <h4 className="font-semibold text-gray-800">Software Development</h4>
                  </div>
                  <div className="pl-2 mb-4">
                    {plan.softwareFeatures.map((feature, featureIndex) => (
                      <div
                        key={`sw-${featureIndex}`}
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
                  {/* Software Features Section */}
                  <tr className="bg-gray-50">
                    <td colSpan={comboPlans.length + 1} className="px-6 py-3 text-left text-xs font-medium text-[#371445] uppercase tracking-wider">
                      Software Development Features
                    </td>
                  </tr>
                  {comboPlans[0].softwareFeatures.concat(comboPlans[3].softwareFeatures.filter(f => !comboPlans[0].softwareFeatures.some(sf => sf.name === f.name))).map((feature, featureIndex) => (
                    <tr key={`sw-comp-${featureIndex}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {feature.name}
                      </td>
                      {comboPlans.map((plan, planIndex) => (
                        <td key={`sw-${planIndex}-${featureIndex}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {plan.softwareFeatures.some(f => f.name === feature.name && f.included) ? (
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
              <h3 className="text-xl font-bold text-gray-800 mb-4">Software + Marketing Synergy</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#371445] mr-2 mt-1">•</span>
                  <span className="text-gray-700">Unified approach to digital transformation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#371445] mr-2 mt-1">•</span>
                  <span className="text-gray-700">Strategic alignment between software capabilities and marketing goals</span>
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
                We believe in creating integrated solutions that enable businesses to automate processes
                internally while growing their customer base externally. Our software + marketing combos
                provide a comprehensive approach to digital transformation.
              </p>
              <p className="text-gray-700">
                Each plan is customizable to your specific business needs, and our team works closely with you
                to ensure both your software tool and marketing strategy work together seamlessly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Request Quote Modal */}
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
                      placeholder="Tell us about your project requirements..."
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

export default SoftwareMarketingCombo;