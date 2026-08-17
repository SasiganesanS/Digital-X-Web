import React, { useState } from 'react';
import {
  FaCheck,
  FaTimes,
  FaTimes as CloseIcon,
  FaEuroSign,
  FaRupeeSign,
  FaSearch,
  FaShareAlt,
  FaEnvelope,
  FaChartLine
} from 'react-icons/fa';
import mock1 from "../../assets/pricing/mock1.webp";
import mock2 from "../../assets/pricing/mock2.webp";
import mock3 from "../../assets/pricing/mock3.webp";
import mock4 from "../../assets/pricing/mock4.webp";
import { sendPricingQuoteEmails } from '../../utils/emailService';

const DigitalMarketingPricing = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedBudgetRange, setSelectedBudgetRange] = useState("");
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

  // Digital marketing plans with icons
  const marketingPlans = [
    {
      plan: "Basic",
      name: "SPARK PLAN",
      description: "For Small Businesses Starting Online",
      icon: <FaSearch className="text-[#371445] text-4xl" />
    },
    {
      plan: "Startup",
      name: "IGNITE PLAN",
      description: "For Startups & Growing Brands",
      icon: <FaShareAlt className="text-[#371445] text-4xl" />
    },
    {
      plan: "Standard",
      name: "ACCELERATE PLAN",
      description: "For Mid-Sized Businesses & Professionals",
      icon: <FaEnvelope className="text-[#371445] text-4xl" />
    },
    {
      plan: "Premium",
      name: "ASCEND PLAN",
      description: "For Feature-Rich, High-Performance Brands",
      icon: <FaChartLine className="text-[#371445] text-4xl" />
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      subtitle: "Spark Plan",
      features: [
        { name: "SEO Basics (On-page SEO only)", included: true },
        { name: "Basic Social Media Management (2 Platforms - 3 posts/week)", included: true },
        { name: "Basic Email Campaign (1 Campaign/Month)", included: true },
        { name: "Video Production", included: false },
        { name: "Paid Ads (PPC)", included: false },
        { name: "1-Month Reporting", included: true },
        { name: "1-Month Tech Support", included: true },
        { name: "Conversion Rate Tracking", included: false },
        { name: "Content Strategy Planning", included: false },
        { name: "Marketing Videos", included: false },
        { name: "CRO (Conversion Rate Optimization)", included: false },
        { name: "Advanced Data Analytics", included: false }
      ]
    },
    {
      name: "Startup",
      subtitle: "Ignite Plan",
      features: [
        { name: "Full SEO (On-Page + Basic Off-Page)", included: true },
        { name: "Social Media Management (3 Platforms - 4 posts/week)", included: true },
        { name: "Email Marketing Campaigns (2 Campaigns/Month)", included: true },
        { name: "Conversion Rate Tracking (basic)", included: true },
        { name: "PPC Campaign Setup (Basic - Ad Budget Extra)", included: true },
        { name: "2-Month Reporting", included: true },
        { name: "3-Months Tech Support", included: true },
        { name: "Video Production", included: false },
        { name: "Content Strategy Planning", included: false },
        { name: "Marketing Videos", included: false },
        { name: "CRO (Advanced)", included: false },
        { name: "Advanced Data Analytics", included: false }
      ]
    },
    {
      name: "Standard",
      subtitle: "Accelerate Plan",
      features: [
        { name: "Advanced SEO (Full On-Page + Off-Page)", included: true },
        { name: "Social Media Management (5 Platforms - Daily Posts)", included: true },
        { name: "Email Marketing Campaigns (4 Campaigns/Month)", included: true },
        { name: "Conversion Rate Optimization (Standard level)", included: true },
        { name: "Full PPC Ad Management (Google, Meta Ads)", included: true },
        { name: "Monthly Content Strategy Planning", included: true },
        { name: "Basic Marketing Video (1 Video/Month)", included: true },
        { name: "3-Month Reporting", included: true },
        { name: "6-Months Tech Support", included: true },
        { name: "Email Marketing Automation", included: false },
        { name: "Advanced Data Analytics Integration", included: false },
        { name: "Custom Marketing Videos", included: false }
      ]
    },
    {
      name: "Premium",
      subtitle: "Ascend Plan",
      features: [
        { name: "Advanced SEO (AI-powered Audits + Reporting)", included: true },
        { name: "Social Media Growth Campaigns (5+ Platforms + Paid Promotions)", included: true },
        { name: "Email Marketing Automation (Full Funnel Setup)", included: true },
        { name: "Full CRO (Advanced Data Analytics Integration)", included: true },
        { name: "Full PPC Campaign Management (Across Google, Meta, LinkedIn)", included: true },
        { name: "Content Strategy + Monthly Video Content (2 Videos/Month)", included: true },
        { name: "Custom Marketing Videos (Animated, Product Demos)", included: true },
        { name: "Bi-Weekly Reporting", included: true },
        { name: "1-Year Tech Support", included: true },
        { name: "Dedicated Account Manager", included: true },
        { name: "Custom Brand Strategy Development", included: true },
        { name: "Competitor Analysis & Tracking", included: true }
      ]
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
    } else if (plan === "Premium") {
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
        service: "Digital Marketing"
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
            Digital Marketing Pricing
          </h1>
          <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect digital marketing plan to boost your online presence
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => {
            // Sort features to show included ones first
            const sortedFeatures = [...plan.features].sort((a, b) => {
              if (a.included && !b.included) return -1;
              if (!a.included && b.included) return 1;
              return 0;
            });

            return (
              <div
                key={index}
                className="bg-gray-100 rounded-3xl overflow-hidden h-full flex flex-col"
              >
                {/* Plan Header */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-[#371445] mb-4">{plan.subtitle}</p>
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

                {/* CTA Button */}
                <div className="px-6 pb-6 mt-auto">
                  <button
                    className="w-full py-3 bg-[#371445] text-white rounded-xl font-semibold
                             hover:bg-[#4a1b5d] transition-colors duration-300"
                    onClick={() => openQuoteModal(plan.name)}
                  >
                    CHOOSE PLAN
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Digital Marketing Plans Section */}
        <div className="mt-20 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#371445] mb-4">
              Our Digital Marketing Plans
            </h2>
            <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketingPlans.map((plan, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Plan Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">{plan.plan}</h3>

                {/* Icon */}
                <div className="w-28 h-28 mb-4 flex items-center justify-center rounded-full bg-gray-100 shadow-md">
                  {plan.icon}
                </div>

                {/* Plan Name and Description */}
                <h4 className="text-lg font-semibold text-[#371445] mb-1 text-center">{plan.name}</h4>
                <p className="text-sm text-gray-700 text-center">{plan.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Basic Plan Section */}
      <div className="w-[90%] max-w-[1280px] mx-auto mt-20 mb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#371445] mb-4">
            BASIC PLAN
          </h1>
          <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            For Small Businesses Starting Online
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At PRASKLA DIGITAL X, we know that getting started online should be simple and stress‑free.
            Our Basic / Spark Plan delivers essential digital marketing services so you can build your
            presence without breaking the bank.
          </p>
        </div>

        {/* Content Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Content */}
          <div className="flex flex-col justify-center p-4 md:p-8">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">What's Included:</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>SEO Basics (On‑page optimization only)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Social Media Management (2 Platforms, 3 posts/week)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Email Campaigns (1 Campaign/Month)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>No Video Production</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>No Paid Ads (PPC)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Monthly Performance Reporting (1 Month)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>1‑Month Tech Support</span>
              </li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-lg">
              <img
                src={mock1}
                alt="Basic plan marketing features"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Bottom Image */}
          <div className="flex items-center justify-center p-4 md:p-8 md:order-3">
            <div className="w-full max-w-lg">
              <img
                src={mock2}
                alt="Basic plan marketing mockup"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-center p-4 md:p-8 bg-gray-100 rounded-3xl md:order-4">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">Perfect For:</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>New Local Businesses</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Micro‑brands & Solopreneurs</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Simple Lead‑Generation Needs</span>
              </li>
            </ul>
            <div className="mt-8">
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-[#371445] pl-4">
                "Get online with confidence and clarity."
              </blockquote>
            </div>
            <div className="mt-8">
              <button
                onClick={() => openQuoteModal("Basic")}
                className="px-8 py-3 bg-[#371445] text-white text-lg font-semibold rounded-full
                          hover:bg-[#4a1b5d] transition-colors duration-300 shadow-md"
              >
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Startup Plan Section */}
      <div className="w-[90%] max-w-[1280px] mx-auto mt-20 mb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#371445] mb-4">
            STARTUP PLAN
          </h1>
          <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            For Startups & Growing Brands
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ready to scale your online efforts? The Startup / Ignite Plan gives you a comprehensive
            toolkit—spanning SEO, social media, email marketing, and basic PPC setup—to spark real growth.
          </p>
        </div>

        {/* Content Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Content */}
          <div className="flex flex-col justify-center p-4 md:p-8">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">What's Included:</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Full SEO (On‑page + Basic Off‑page)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Social Media Management (3 Platforms, 4 posts/week)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Email Marketing Campaigns (2 Campaigns/Month)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Conversion Rate Tracking (Basic Analytics)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>PPC Campaign Setup (Ad spend extra)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Bi‑Monthly Performance Reporting (2 Months)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>3‑Month Tech Support</span>
              </li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-lg">
              <img
                src={mock3}
                alt="Startup plan marketing features"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Bottom Image */}
          <div className="flex items-center justify-center p-4 md:p-8 md:order-3">
            <div className="w-full max-w-lg">
              <img
                src={mock4}
                alt="Startup plan marketing mockup"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-center p-4 md:p-8 bg-gray-100 rounded-3xl md:order-4">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">Perfect For:</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Small & Early‑Stage Startups</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Personal Brands & Coaches</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Service‑based Businesses</span>
              </li>
            </ul>
            <div className="mt-8">
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-[#371445] pl-4">
                "Fuel your growth with data‑driven marketing."
              </blockquote>
            </div>
            <div className="mt-8">
              <button
                onClick={() => openQuoteModal("Startup")}
                className="px-8 py-3 bg-[#371445] text-white text-lg font-semibold rounded-full
                          hover:bg-[#4a1b5d] transition-colors duration-300 shadow-md"
              >
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Standard Plan Section */}
      <div className="w-[90%] max-w-[1280px] mx-auto mt-20 mb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#371445] mb-4">
            STANDARD PLAN
          </h1>
          <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            For Mid‑Sized Businesses & Professionals
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            When you need more muscle behind your marketing, turn to our Standard / Accelerate Plan.
            We integrate advanced SEO, robust social media strategies, conversion optimization, and
            full PPC management to power your next stage.
          </p>
        </div>

        {/* Content Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Content */}
          <div className="flex flex-col justify-center p-4 md:p-8">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">What's Included:</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Advanced SEO (Full On‑page + Off‑page)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Social Media Management (5 Platforms, Daily Posts)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Email Marketing Campaigns (4 Campaigns/Month)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Conversion Rate Optimization (Standard Level)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Full PPC Management (Google & Meta Ads)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Monthly Content Strategy Planning</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Basic Marketing Video (1 Video/Month)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Quarterly Tech Support (6 Months)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Performance Reporting (Every 3 Months)</span>
              </li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-lg">
              <img
                src={mock1}
                alt="Standard plan marketing features"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Bottom Image */}
          <div className="flex items-center justify-center p-4 md:p-8 md:order-3">
            <div className="w-full max-w-lg">
              <img
                src={mock2}
                alt="Standard plan marketing mockup"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-center p-4 md:p-8 bg-gray-100 rounded-3xl md:order-4">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">Perfect For:</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Established SMEs</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>E‑commerce & Retail Professionals</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Consultants & Agencies</span>
              </li>
            </ul>
            <div className="mt-8">
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-[#371445] pl-4">
                "Accelerate your ROI with integrated campaigns."
              </blockquote>
            </div>
            <div className="mt-8">
              <button
                onClick={() => openQuoteModal("Standard")}
                className="px-8 py-3 bg-[#371445] text-white text-lg font-semibold rounded-full
                          hover:bg-[#4a1b5d] transition-colors duration-300 shadow-md"
              >
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Plan Section */}
      <div className="w-[90%] max-w-[1280px] mx-auto mt-20 mb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#371445] mb-4">
            PREMIUM PLAN
          </h1>
          <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            For Feature‑Rich, High‑Performance Brands
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            For brands that demand the very best, the Premium / Ascend Plan combines AI‑powered SEO,
            paid promotion growth hacks, full‑funnel automation, and premium video content to deliver
            unmatched impact.
          </p>
        </div>

        {/* Content Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Content */}
          <div className="flex flex-col justify-center p-4 md:p-8">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">What's Included:</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Advanced SEO (AI‑powered Audits & Reporting)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Social Media Growth Campaigns (5+ Platforms + Paid Promotions)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Email Marketing Automation (Full Funnel Setup)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Advanced CRO (Data Analytics Integration)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Comprehensive PPC Management (Google, Meta, LinkedIn)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Content Strategy + Video Content (2 Videos/Month)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Custom Marketing Videos (Animated, Demos)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Bi‑Weekly Performance Reporting</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>1‑Year Tech Support</span>
              </li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-lg">
              <img
                src={mock3}
                alt="Premium plan marketing features"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Bottom Image */}
          <div className="flex items-center justify-center p-4 md:p-8 md:order-3">
            <div className="w-full max-w-lg">
              <img
                src={mock4}
                alt="Premium plan marketing mockup"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-center p-4 md:p-8 bg-gray-100 rounded-3xl md:order-4">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">Perfect For:</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>High‑growth Startups</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Product Launch Campaigns</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Enterprise‑level Brands</span>
              </li>
            </ul>
            <div className="mt-8">
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-[#371445] pl-4">
                "Dominate your market with premium, data-driven marketing strategies."
              </blockquote>
            </div>
            <div className="mt-8">
              <button
                onClick={() => openQuoteModal("Premium")}
                className="px-8 py-3 bg-[#371445] text-white text-lg font-semibold rounded-full
                          hover:bg-[#4a1b5d] transition-colors duration-300 shadow-md"
              >
                Choose Plan
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
                      placeholder="Tell us about your marketing goals and requirements..."
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

export default DigitalMarketingPricing;