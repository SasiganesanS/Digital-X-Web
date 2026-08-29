import React, { useState } from 'react';
import { FaCheck, FaTimes, FaExternalLinkAlt, FaArrowRight, FaEuroSign, FaRupeeSign } from 'react-icons/fa';
import { sendPricingQuoteEmails } from '../../utils/emailService';
import LegalSpaceBackground from '../legal/LegalSpaceBackground';

const EcommerceMarketingCombo = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedAddOn, setSelectedAddOn] = useState(null);
  const [activeTab, setActiveTab] = useState("plans"); // "plans" or "addons"
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

  // E-commerce plans data
  const ecommercePlans = [
    {
      name: "Basic",
      description: "For small businesses starting online",
      price: "₹8k–₹12k one-time",
      features: [
        { name: "Up to 10 Products Upload", included: true },
        { name: "Mobile-Responsive Store Design", included: true },
        { name: "Basic SEO Setup", included: true },
        { name: "Payment Gateway Integration (Razorpay/Stripe)", included: true },
        { name: "1 Month Tech Support", included: true },
        { name: "No advanced custom features", included: true },
        { name: "E-Commerce Support", included: true },
        { name: "Blog Integration", included: false },
        { name: "Hosting & Domain", included: false },
        { name: "Security (SSL, Firewall)", included: false },
        { name: "Speed Optimization", included: false },
        { name: "Custom Features (API, Integrations, etc.)", included: false }
      ],
      addon: "Spark Marketing Add-on"
    },
    {
      name: "Startup",
      description: "For growing brands and online shops",
      price: "₹18k–₹25k one-time",
      features: [
        { name: "Up to 50 Products Upload", included: true },
        { name: "Mobile-Responsive Store Design", included: true },
        { name: "Enhanced SEO & Product Optimization", included: true },
        { name: "Cart Abandonment Setup", included: true },
        { name: "Coupon Codes & Discount Management", included: true },
        { name: "Email Notification Setup", included: true },
        { name: "3 Months Tech Support", included: true },
        { name: "E-Commerce Support", included: true },
        { name: "Blog Integration", included: true },
        { name: "Hosting & Domain", included: false },
        { name: "Basic SSL", included: true },
        { name: "Basic Optimization", included: true },
        { name: "Custom Features (API, Integrations, etc.)", included: false }
      ],
      addon: "Ignite Marketing Toolkit"
    },
    {
      name: "Standard",
      description: "For mid-sized, scaling e-commerce brands",
      price: "₹30k–₹45k one-time",
      features: [
        { name: "Unlimited Product Upload Support", included: true },
        { name: "Mobile-Responsive Store Design", included: true },
        { name: "Full SEO Optimization (Products, Pages, Blog)", included: true },
        { name: "Advanced Cart Features (Wishlist, Save for Later)", included: true },
        { name: "Integrated Analytics Dashboard", included: true },
        { name: "Speed Optimization", included: true },
        { name: "6 Months Tech Support", included: true },
        { name: "E-Commerce Support", included: true },
        { name: "Blog Integration", included: true },
        { name: "1-Year Free Hosting & Domain", included: true },
        { name: "Standard SSL & Firewall", included: true },
        { name: "Advanced Optimization", included: true },
        { name: "Basic Custom Features", included: true }
      ],
      addon: "Accelerate Marketing Combo"
    },
    {
      name: "Premium",
      description: "For brands needing full-scale e-commerce operations",
      price: "₹50k–₹80k one-time",
      features: [
        { name: "Marketplace Integration (Amazon, Flipkart optional)", included: true },
        { name: "Mobile-Responsive Store Design", included: true },
        { name: "Loyalty Program & Customer Points", included: true },
        { name: "Multi-Currency & Multi-Language Setup", included: true },
        { name: "Advanced Custom Checkout Pages", included: true },
        { name: "Marketing Automation Integration", included: true },
        { name: "1 Year Tech Support", included: true },
        { name: "Advanced Store", included: true },
        { name: "Blog Integration", included: true },
        { name: "1-Year Free Hosting & Domain", included: true },
        { name: "Advanced SSL & Firewall", included: true },
        { name: "Ultra-Fast Optimization", included: true },
        { name: "Advanced Custom Features", included: true }
      ],
      addon: "Ascend Full-Scale Marketing Add-on"
    }
  ];

  // Marketing add-on plans
  const marketingAddOns = [
    {
      name: "Spark Marketing Add-on",
      description: "For Small Businesses Starting Online",
      price: "₹5,000",
      range: "₹6k - ₹10k / month",
      features: [
        { name: "SEO Basics (On-page SEO only)", included: true },
        { name: "Basic Social Media Management (2 Platforms - 3 posts/week)", included: true },
        { name: "Basic Email Campaign (1 Campaign/Month)", included: true },
        { name: "Video Production", included: false },
        { name: "Paid Ads (PPC)", included: false },
        { name: "1-Month Reporting", included: true },
        { name: "1-Month Tech Support", included: true }
      ],
      addons: [
        "On-page SEO",
        "1 email",
        "2 SM posts/week"
      ],
      forPlan: "Basic"
    },
    {
      name: "Ignite Marketing Toolkit",
      description: "For Startups & Growing Brands",
      price: "₹10,000",
      range: "₹12k - ₹18k / month",
      features: [
        { name: "Full SEO (On-Page + Basic Off-Page)", included: true },
        { name: "Social Media Management (3 Platforms - 4 posts/week)", included: true },
        { name: "Email Marketing Campaigns (2 Campaigns/Month)", included: true },
        { name: "Conversion Rate Tracking (basic)", included: true },
        { name: "PPC Campaign Setup (Basic - ₹Ad Budget Extra)", included: true },
        { name: "2-Month Reporting", included: true },
        { name: "3-Months Tech Support", included: true },
        { name: "Video Production", included: false }
      ],
      addons: [
        "Enhanced SEO",
        "2 emails",
        "4 posts/week report"
      ],
      forPlan: "Startup"
    },
    {
      name: "Accelerate Marketing Combo",
      description: "For Mid-Sized Businesses & Professionals",
      price: "₹18,000",
      range: "₹20k - ₹30k / month",
      features: [
        { name: "Advanced SEO (Full On-Page + Off-Page)", included: true },
        { name: "Social Media Management (5 Platforms - Daily Posts)", included: true },
        { name: "Email Marketing Campaigns (4 Campaigns/Month)", included: true },
        { name: "Conversion Rate Optimization (Standard level)", included: true },
        { name: "Full PPC Ad Management (Google, Meta Ads)", included: true },
        { name: "Monthly Content Strategy Planning", included: true },
        { name: "Basic Marketing Video (1 Video/Month)", included: true },
        { name: "3-Month Reporting", included: true },
        { name: "6-Months Tech Support", included: true }
      ],
      addons: [
        "Full SEO",
        "analytics, automation",
        "Video",
        "6 posts/week"
      ],
      forPlan: "Standard"
    },
    {
      name: "Ascend Full-Scale Marketing Add-on",
      description: "For Feature-Rich, High-Performance Brands",
      price: "₹25,000+",
      range: "₹35k - ₹60k / month",
      features: [
        { name: "Advanced SEO (AI-powered Audits + Reporting)", included: true },
        { name: "Social Media Growth Campaigns (5+ Platforms + Paid Promotions)", included: true },
        { name: "Email Marketing Automation (Full Funnel Setup)", included: true },
        { name: "Full CRO (Advanced Data Analytics Integration)", included: true },
        { name: "Full PPC Campaign Management (Across Google, Meta, LinkedIn)", included: true },
        { name: "Content Strategy + Monthly Video Content (2 Videos/Month)", included: true },
        { name: "Custom Marketing Videos (Animated, Product Demos)", included: true },
        { name: "Bi-Weekly Reporting", included: true }
      ],
      addons: [
        "Paid ads setup",
        "Automation",
        "video + blog strategy"
      ],
      forPlan: "Premium"
    }
  ];

  const openModal = (plan, addon) => {
    setSelectedPlan(plan);
    setSelectedAddOn(addon);

    // Always set custom budget to empty string
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

  // Update openQuoteModal function
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
        service: "Ecommerce & Marketing Combo"
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
    <div className="relative w-full overflow-hidden bg-[#050609]">
      <LegalSpaceBackground />
      <div className="relative z-10 w-full pt-4 pb-10">
        <div className="w-[90%] max-w-[1280px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">
              E-COMMERCE WEBSITES COMBO PLANS
            </h1>
            <div className="w-24 h-1 bg-[#E31D2E] mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our most popular combo plans combine powerful e-commerce websites with
            targeted digital marketing strategies to help your business grow online.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full shadow-md p-1 flex">
            <button
              className={`px-6 py-2 rounded-full transition-colors duration-300 ${activeTab === "plans" ? "bg-[#371445] text-white" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setActiveTab("plans")}
            >
              E-commerce Plans
            </button>
            <button
              className={`px-6 py-2 rounded-full transition-colors duration-300 ${activeTab === "addons" ? "bg-[#371445] text-white" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setActiveTab("addons")}
            >
              Marketing Add-ons
            </button>
          </div>
        </div>

        {/* E-commerce Plans Cards */}
        {activeTab === "plans" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {ecommercePlans.map((plan, index) => {
              // Sort features to show included ones first
              const sortedFeatures = [...plan.features].sort((a, b) => {
                if (a.included && !b.included) return -1;
                if (!a.included && b.included) return 1;
                return 0;
              });

              return (
                <div
                  key={index}
                  className="bg-gray-100 rounded-2xl overflow-hidden h-full flex flex-col"
                >
                  {/* Plan Header */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                    <p className="text-sm text-[#371445] mb-4">{plan.description}</p>
                  </div>

                  {/* Feature List */}
                  <div className="px-6 pb-6 flex-grow">
                    {sortedFeatures.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start space-x-3 mb-3"
                      >
                        {feature.included ? (
                          <span className="text-green-500 mt-1"><FaCheck /></span>
                        ) : (
                          <span className="text-red-500 mt-1"><FaTimes /></span>
                        )}
                        <span className="text-gray-700">{feature.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Marketing Add-on */}
                  <div className="px-6 pb-3 border-t border-gray-200 pt-4">
                    <p className="text-sm font-medium text-gray-500 mb-1">Suggested Add-on:</p>
                    <p className="text-[#371445] font-semibold">{plan.addon}</p>
                  </div>

                  {/* CTA Button */}
                  <div className="px-6 pb-6 mt-auto">
                    <button
                      className="w-full py-3 bg-[#371445] text-white rounded-xl font-semibold
                               hover:bg-[#4a1b5d] transition-colors duration-300"
                      onClick={() => openModal(plan.name, plan.addon)}
                    >
                      CHOOSE PLAN
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Marketing Add-ons Cards */}
        {activeTab === "addons" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {marketingAddOns.map((addon, index) => {
              // Sort features to show included ones first
              const sortedFeatures = [...addon.features].sort((a, b) => {
                if (a.included && !b.included) return -1;
                if (!a.included && b.included) return 1;
                return 0;
              });

              return (
                <div
                  key={index}
                  className="bg-gray-100 rounded-2xl overflow-hidden h-full flex flex-col"
                >
                  {/* Add-on Header */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{addon.name}</h3>
                    <p className="text-sm text-[#371445] mb-4">{addon.description}</p>
                    <p className="text-sm text-gray-600">{addon.range}</p>
                  </div>

                  {/* Feature List */}
                  <div className="px-6 pb-6 flex-grow">
                    {sortedFeatures.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start space-x-3 mb-3"
                      >
                        {feature.included ? (
                          <span className="text-green-500 mt-1"><FaCheck /></span>
                        ) : (
                          <span className="text-red-500 mt-1"><FaTimes /></span>
                        )}
                        <span className="text-gray-700">{feature.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Recommended For */}
                  <div className="px-6 pb-3 border-t border-gray-200 pt-4">
                    <p className="text-sm font-medium text-gray-500 mb-1">Recommended For:</p>
                    <p className="text-[#371445] font-semibold">{addon.forPlan}</p>
                  </div>

                  {/* CTA Button */}
                  <div className="px-6 pb-6 mt-auto">
                    <button
                      className="w-full py-3 bg-[#371445] text-white rounded-xl font-semibold
                               hover:bg-[#4a1b5d] transition-colors duration-300"
                      onClick={() => openModal(addon.forPlan, addon.name)}
                    >
                      CHOOSE PLAN
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Combo Benefits */}
        <div className="bg-white/90 rounded-2xl shadow-lg p-8 border border-white/50 mt-16">
          <h2 className="text-3xl font-bold text-[#371445] mb-6">Why Choose Our Combo Plans?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Integrated Solution Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#371445] mr-2 mt-1">•</span>
                  <span className="text-gray-700">Seamless integration between your website and marketing efforts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#371445] mr-2 mt-1">•</span>
                  <span className="text-gray-700">Cohesive brand experience across all platforms</span>
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
                We believe in creating e-commerce experiences that not only look great but also convert visitors
                into customers. Our combo plans are designed to provide a complete solution that addresses both
                your website needs and marketing requirements.
              </p>
              <p className="text-gray-700">
                Each plan is customizable to your specific business needs, and our team works closely with you
                to ensure your online store succeeds.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-4 sm:p-7 max-w-md w-[94%] sm:w-full relative max-h-[90dvh] overflow-y-auto custom-scrollbar border border-[#111111] shadow-2xl my-auto pb-8 sm:pb-10">
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Details</label>
                    <textarea
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#371445] focus:border-[#371445] h-32"
                      placeholder="Tell us about your ecommerce and marketing requirements..."
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
    </div>
  );
};

export default EcommerceMarketingCombo;