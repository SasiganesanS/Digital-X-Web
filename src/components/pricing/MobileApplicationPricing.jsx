import React, { useState } from 'react';
import { FaCheck, FaTimes, FaTimes as CloseIcon, FaEuroSign, FaRupeeSign } from 'react-icons/fa';
import mock1 from "../../assets/pricing/mock1.webp"
import mock2 from "../../assets/pricing/mock2.webp"
import mock3 from "../../assets/pricing/mock3.webp"
import mock4 from "../../assets/pricing/mock4.webp"
import { sendPricingQuoteEmails } from '../../utils/emailService';
import BrandX from '../common/BrandX';

const MobileApplicationPricing = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedBudgetRange, setSelectedBudgetRange] = useState("");
  const [customBudget, setCustomBudget] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("EUR"); // Default is euros
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectDetails: ''
  });

  const pricingPlans = [
    {
      name: "Basic",
      subtitle: "Essential features for your app launch",
      features: [
        { name: "Android/iOS Only", included: true },
        { name: "Basic UI & Prototype", included: true },
        { name: "Basic Onboarding", included: true },
        { name: "Basic Auth + SSL", included: true },
        { name: "Payment Gateway", included: false },
        { name: "Basic Analytics", included: true },
        { name: "Basic Store SEO", included: true },
        { name: "Offline/Real-Time Features", included: false },
        { name: "1 API Only", included: true },
        { name: "Loyalty Features", included: false },
        { name: "Admin Panel", included: false },
        { name: "1-Month Support", included: true }
      ]
    },
    {
      name: "Startup",
      subtitle: "Enhanced features for growing businesses",
      features: [
        { name: "Android + iOS + PWA", included: true },
        { name: "Custom UI & Prototype", included: true },
        { name: "Advanced Onboarding", included: true },
        { name: "Advanced Auth", included: true },
        { name: "Single Payment Gateway", included: true },
        { name: "Standard Analytics", included: true },
        { name: "Standard Optimization", included: true },
        { name: "Offline/Real-Time Features", included: false },
        { name: "3 APIs", included: true },
        { name: "Basic Loyalty", included: true },
        { name: "Basic Admin", included: true },
        { name: "3-Months + Strategy Support", included: true }
      ]
    },
    {
      name: "Standard",
      subtitle: "Comprehensive solutions for scaling your business",
      features: [
        { name: "Android + iOS + Web", included: true },
        { name: "Animated UI & Prototype", included: true },
        { name: "Premium Onboarding", included: true },
        { name: "Security Suite", included: true },
        { name: "Multiple Payment Gateways", included: true },
        { name: "BI + Advanced Insights", included: true },
        { name: "Premium Optimization", included: true },
        { name: "Chat + Offline", included: true },
        { name: "5 APIs", included: true },
        { name: "Gamification + Messaging", included: true },
        { name: "Full Admin + Scalable", included: true },
        { name: "6-Months + Reviews Support", included: true }
      ]
    },
    {
      name: "Premium",
      subtitle: "Custom enterprise-level solutions",
      features: [
        { name: "Full Platform Ecosystem", included: true },
        { name: "Bespoke UI & Prototype", included: true },
        { name: "Custom Onboarding", included: true },
        { name: "Enterprise Security", included: true },
        { name: "Wallet + Multi-Gateway", included: true },
        { name: "Executive BI Suite", included: true },
        { name: "Full Optimization Package", included: true },
        { name: "Full Real-Time + Offline", included: true },
        { name: "Unlimited APIs", included: true },
        { name: "Custom Rewards", included: true },
        { name: "Role-Based Admin Access", included: true },
        { name: "SLA Support + Launch Campaign", included: true }
      ]
    }
  ];

  const openQuoteModal = (plan) => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectDetails: ''
    });
    setSubmitSuccess(false);
    setFormError("");
    setSelectedPlan(plan);

    if (plan === "Basic") {
      setSelectedBudgetRange("launch");
    } else if (plan === "Startup") {
      setSelectedBudgetRange("growth");
    } else if (plan === "Standard") {
      setSelectedBudgetRange("scale");
    } else if (plan === "Premium") {
      setSelectedBudgetRange("enterprise");
    } else {
      setSelectedBudgetRange("");
    }

    setCustomBudget("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const validateEmail = (email) => {
    if (!email) return false;

    const [username, domain] = email.split('@');
    
    if (!username || !domain) return false;

    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9._]*$/;
    if (!usernameRegex.test(username)) return false;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
      const emailData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectDetails: formData.projectDetails,
        selectedPlan,
        budget: customBudget ? `${selectedCurrency} ${customBudget}` : selectedBudgetRange,
        timestamp: new Date().toISOString(),
        service: "Mobile Application"
      };
      
      const emailResult = await sendPricingQuoteEmails(emailData);
      
      if (emailResult.success) {
        setSubmitSuccess(true);
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
            Mobile Application Pricing-plan
          </h1>
          <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the Perfect plan that suits you or your business
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => {
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
      </div>

      {/* LAUNCH PLAN Section */}
      <div className="w-[90%] max-w-[1280px] mx-auto mt-20 mb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#371445] mb-4">
            Basic
          </h1>
          <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Android/iOS Only
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At <span className="font-inlander font-bold text-[#111111]">PRASKLA DIGITAL</span> <BrandX className="text-[1.65em] font-pdx text-[#E31D2E] inline-block translate-y-[0.08em] -ml-0.5" />, we understand that launching your first mobile app can feel overwhelming — that's why our Launch Plan is crafted to be a straightforward and cost-effective option, perfect for startups and MVPs. We're here to get your app into users' hands, quickly and confidently.
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
                <span>Native Android & iOS App</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Basic UI Design & Prototype</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Simple Onboarding Flow</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Basic Authentication + SSL</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Integrated Basic Analytics</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Store Listing with Basic SEO</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Single API Integration</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>1-Month Post-Launch Support</span>
              </li>
            </ul>
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-center p-4 md:p-8 md:order-4">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">Perfect For:</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Startup MVPs</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Solo founders</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Pilot product launches</span>
              </li>
            </ul>
            <div className="mt-8">
              <blockquote className="italic text-gray-700 border-l-4 border-[#371445] pl-4 py-2">
                "Get your app idea into users' hands quickly and affordably."
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

          {/* Image Content - Left */}
          <div className="p-4 md:p-8 md:order-3 flex items-center justify-center">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={mock1}
                alt="Launch Plan App Example"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Image Content - Right */}
          <div className="p-4 md:p-8 md:order-2 flex items-center justify-center">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={mock2}
                alt="Launch Plan App Interface"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* GROWTH PLAN Section */}
      <div className="w-[90%] max-w-[1280px] mx-auto mt-20 mb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#371445] mb-4">
            Startup
          </h1>
          <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Android + iOS + PWA
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The Growth Plan is ideal for teams ready to go multi-platform with smooth UI and payments. It's the perfect balance between performance, usability, and reach — helping your app grow efficiently and strategically.
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
                <span>Android, iOS & PWA Deployment</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Custom UI Design & Interactive Prototype</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Advanced User Onboarding</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Enhanced Authentication Mechanism</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Single Payment Gateway Integration</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Standard Analytics Dashboard</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>App Store Optimization</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>3 API Integrations</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Basic Loyalty Program</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Basic Admin Dashboard</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>3-Month Support with Strategic Guidance</span>
              </li>
            </ul>
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-center p-4 md:p-8 md:order-4">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">Perfect For:</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Growing startups</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>D2C brands</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Service-based apps with monetization</span>
              </li>
            </ul>
            <div className="mt-8">
              <blockquote className="italic text-gray-700 border-l-4 border-[#371445] pl-4 py-2">
                "Expand your reach across platforms and start monetizing your app effectively."
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

          {/* Image Content - Left */}
          <div className="p-4 md:p-8 md:order-3 flex items-center justify-center">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={mock3}
                alt="Growth Plan App Example"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Image Content - Right */}
          <div className="p-4 md:p-8 md:order-2 flex items-center justify-center">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={mock4}
                alt="Growth Plan App Interface"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SCALE PLAN Section */}
      <div className="w-[90%] max-w-[1280px] mx-auto mt-20 mb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#371445] mb-4">
            Standard
          </h1>
          <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Android + iOS + Web App
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Built for serious growth, the Scale Plan offers a refined experience, smart engagement tools, and seamless access across platforms. Designed for businesses looking to boost user retention and backend performance.
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
                <span>Deployment Across Android, iOS & Web</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Animated UI & High-Fidelity Prototype</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Premium Onboarding Experiences</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Full Security Suite Implementation</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Multiple Payment Gateway Integrations</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>BI-Driven Analytics & Insight Reports</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Premium App Store Optimization</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Chat, Notifications & Offline Access</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>5 API Integrations</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Gamified Loyalty & Messaging</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Full Admin Dashboard with Scalability</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>6-Month Support + Monthly Reviews</span>
              </li>
            </ul>
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-center p-4 md:p-8 md:order-4">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">Perfect For:</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Funded startups</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Marketplaces & platforms</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Apps with growing user base</span>
              </li>
            </ul>
            <div className="mt-8">
              <blockquote className="italic text-gray-700 border-l-4 border-[#371445] pl-4 py-2">
                "Scale your app with advanced features and a seamless cross-platform experience."
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

          {/* Image Content - Left */}
          <div className="p-4 md:p-8 md:order-3 flex items-center justify-center">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={mock1}
                alt="Scale Plan App Example"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Image Content - Right */}
          <div className="p-4 md:p-8 md:order-2 flex items-center justify-center">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={mock2}
                alt="Scale Plan App Interface"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ENTERPRISE PLAN Section */}
      <div className="w-[90%] max-w-[1280px] mx-auto mt-20 mb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#371445] mb-4">
            Premium
          </h1>
          <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Full Platform Ecosystem
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The Enterprise Plan is crafted for mission-critical apps that need advanced architecture, real-time features, and full ecosystem control. This is your full-suite mobile-first transformation.
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
                <span>Complete Platform Ecosystem (Mobile, Web, Backend)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Bespoke UI with Advanced Prototype</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Custom Onboarding Journeys</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Enterprise-Grade Security & Compliance</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Wallet Integration & Multi-Gateway Payments</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Executive BI Suite & Custom Reports</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Full Offline Support & Real-Time Features</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Unlimited API Integrations</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Custom Loyalty & Rewards Engine</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Role-Based Admin Dashboard</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>SLA-Based Support + Launch Campaign</span>
              </li>
            </ul>
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-center p-4 md:p-8 md:order-4">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">Perfect For:</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Enterprises & Corporates</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>FinTech, Logistics, Healthcare</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Complex apps with large-scale users</span>
              </li>
            </ul>
            <div className="mt-8">
              <blockquote className="italic text-gray-700 border-l-4 border-[#371445] pl-4 py-2">
                "Transform your business with a complete, enterprise-grade mobile ecosystem."
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

          {/* Image Content - Left */}
          <div className="p-4 md:p-8 md:order-3 flex items-center justify-center">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={mock3}
                alt="Enterprise Plan App Example"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Image Content - Right */}
          <div className="p-4 md:p-8 md:order-2 flex items-center justify-center">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={mock4}
                alt="Enterprise Plan App Interface"
                className="w-full h-auto"
              />
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

export default MobileApplicationPricing;