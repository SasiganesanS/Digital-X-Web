import React, { useState } from 'react';
import {
  FaCheck,
  FaTimes,
  FaTimes as CloseIcon,
  FaEuroSign,
  FaRupeeSign,
  FaStore,
  FaShoppingCart,
  FaBoxOpen,
  FaGlobe
} from 'react-icons/fa';
import mock1 from "../../assets/pricing/mock1.webp";
import mock2 from "../../assets/pricing/mock2.webp";
import mock3 from "../../assets/pricing/mock3.webp";
import mock4 from "../../assets/pricing/mock4.webp";
import { sendPricingQuoteEmails } from '../../utils/emailService';
import BrandX from '../common/BrandX';
import LegalSpaceBackground from '../legal/LegalSpaceBackground';

const EcommerceWebsitePricing = () => {
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

  // E-commerce plans with icons
  const ecommercePlans = [
    {
      plan: "Basic",
      name: "STARTER STORE",
      description: "For Small Businesses Just Starting Online",
      icon: <FaStore className="text-[#371445] text-4xl" />
    },
    {
      plan: "Startup",
      name: "BUSINESS STORE",
      description: "For Growing Brands & Online Shops",
      icon: <FaShoppingCart className="text-[#371445] text-4xl" />
    },
    {
      plan: "Standard",
      name: "PRO STORE",
      description: "For Mid-Sized, Scaling E-Commerce Brands",
      icon: <FaBoxOpen className="text-[#371445] text-4xl" />
    },
    {
      plan: "Premium",
      name: "ULTIMATE STORE",
      description: "For Brands Needing Full-Scale E-Commerce Operations",
      icon: <FaGlobe className="text-[#371445] text-4xl" />
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      subtitle: "For small businesses starting online",
      price: "₹8k–₹12k one-time",
      features: [
        { name: "Up to 10 Products Upload", included: true },
        { name: "Mobile-Responsive Store Design", included: true },
        { name: "Basic SEO Setup", included: true },
        { name: "Payment Gateway Integration (Razorpay/Stripe)", included: true },
        { name: "1 Month Tech Support", included: true },
        { name: "No advanced custom features", included: false }
      ]
    },
    {
      name: "Startup",
      subtitle: "For growing brands and online shops",
      price: "₹18k–₹25k one-time",
      features: [
        { name: "Up to 50 Products Upload", included: true },
        { name: "Enhanced SEO & Product Optimization", included: true },
        { name: "Cart Abandonment Setup", included: true },
        { name: "Coupon Codes & Discount Management", included: true },
        { name: "Email Notification Setup (Order Confirmations, Abandoned Cart)", included: true },
        { name: "3 Months Tech Support", included: true }
      ]
    },
    {
      name: "Standard",
      subtitle: "For mid-sized, scaling e-commerce brands",
      price: "₹30k–₹45k one-time",
      features: [
        { name: "Unlimited Product Upload Support", included: true },
        { name: "Full SEO Optimization (Products, Pages, Blog)", included: true },
        { name: "Advanced Cart Features (Wishlist, Save for Later)", included: true },
        { name: "Integrated Analytics Dashboard (Google Analytics + Facebook Pixel)", included: true },
        { name: "Speed Optimization", included: true },
        { name: "6 Months Tech Support", included: true }
      ]
    },
    {
      name: "Premium",
      subtitle: "For brands needing full-scale e-commerce operations",
      price: "₹50k–₹80k one-time",
      features: [
        { name: "Dedicated Account Manager", included: true },
        { name: "24/7 Priority Support", included: true },
        { name: "Marketplace Integration (Amazon, Flipkart optional)", included: true },
        { name: "Loyalty Program & Customer Points", included: true },
        { name: "Multi-Currency & Multi-Language Setup", included: true },
        { name: "Advanced Custom Checkout Pages", included: true },
        { name: "Marketing Automation Integration (emails, WhatsApp, SMS)", included: true },
        { name: "1 Year Tech Support", included: true }
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
        service: "Ecommerce Website"
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
              E-commerce Website Pricing-plan
            </h1>
            <div className="w-24 h-1 bg-[#E31D2E] mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Find the Perfect plan that suits you or your business
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

        {/* E-commerce Plans Section */}
        <div className="mt-20 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#371445] mb-4">
              Our E-commerce Plans
            </h2>
            <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your online store
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ecommercePlans.map((plan, index) => (
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

      {/* Basic Plan Section */}
      <div className="w-[90%] max-w-[1280px] mx-auto mt-20 mb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#371445] mb-4">
            BASIC PLAN
          </h1>
          <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            For Small Businesses Just Starting Online
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At <span className="font-inlander font-bold text-[#111111]">PRASKLA DIGITAL</span> <BrandX className="text-[1.65em] font-pdx text-[#E31D2E] inline-block translate-y-[0.08em] -ml-0.5" />, we make your first foray into e‑commerce simple and cost‑effective.
            Our Basic / Starter Store gets you up and running quickly, with a clean, responsive online
            storefront that showcases your products and captures orders.
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
                <span>Up to 10 Product Uploads</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Mobile‑Responsive Store Design</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Basic SEO Setup</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Payment Gateway Integration (Razorpay / Stripe)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>1‑Month Tech Support</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>No Advanced Custom Features</span>
              </li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-lg">
              <img
                src={mock1}
                alt="Basic plan e-commerce features"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Bottom Image */}
          <div className="flex items-center justify-center p-4 md:p-8 md:order-3">
            <div className="w-full max-w-lg">
              <img
                src={mock2}
                alt="Basic plan e-commerce mockup"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-center p-4 md:p-8 bg-gray-100 rounded-2xl md:order-4">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">Perfect For:</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>New Local & Niche Shops</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Artisans & Makers</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Simple Catalog‑Style Stores</span>
              </li>
            </ul>
            <div className="mt-8">
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-[#371445] pl-4">
                "Start selling online with confidence."
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
            For Growing Brands & Online Shops
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ready to level up your store? The Growth / Business Store plan adds powerful features to improve
            conversions and customer engagement—helping your shop grow revenue and repeat orders.
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
                <span>Up to 50 Product Uploads</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Enhanced SEO & Product Optimization</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Cart Abandonment Recovery Setup</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Coupon Codes & Discount Management</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Automated Email Notifications (Order Confirmations, Abandoned Cart)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>3‑Months Tech Support</span>
              </li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-lg">
              <img
                src={mock3}
                alt="Startup plan e-commerce features"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Bottom Image */}
          <div className="flex items-center justify-center p-4 md:p-8 md:order-3">
            <div className="w-full max-w-lg">
              <img
                src={mock4}
                alt="Startup plan e-commerce mockup"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-center p-4 md:p-8 bg-gray-100 rounded-2xl md:order-4">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">Perfect For:</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Scaling Boutiques & Retailers</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Subscription & Replenishment Models</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Seasonal & Promotion‑Driven Stores</span>
              </li>
            </ul>
            <div className="mt-8">
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-[#371445] pl-4">
                "Turn visitors into loyal customers."
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
            For Mid‑Sized, Scaling E‑Commerce Brands
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            When your business demands more sophistication, our Standard / Pro Store plan delivers a fully featured
            shopping experience, deep analytics, and optimized performance to keep your brand ahead of the
            competition.
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
                <span>Unlimited Product Upload Support</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Full SEO Optimization (Products, Pages, Blog)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Advanced Cart Features (Wishlist, Save for Later)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Integrated Analytics Dashboard (Google Analytics + Facebook Pixel)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Site Speed & Performance Optimization</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>6‑Months Tech Support</span>
              </li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-lg">
              <img
                src={mock1}
                alt="Standard plan e-commerce features"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Bottom Image */}
          <div className="flex items-center justify-center p-4 md:p-8 md:order-3">
            <div className="w-full max-w-lg">
              <img
                src={mock2}
                alt="Standard plan e-commerce mockup"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-center p-4 md:p-8 bg-gray-100 rounded-2xl md:order-4">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">Perfect For:</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Established Online Retailers</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Niche & Subscription E‑Commerce</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Direct‑to‑Consumer Brands</span>
              </li>
            </ul>
            <div className="mt-8">
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-[#371445] pl-4">
                "Scale seamlessly with enterprise‑grade features."
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
            For Brands Needing Full‑Scale E‑Commerce Operations
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            For ambitious brands targeting wide reach and deep customer loyalty, the Premium / Ultimate Store
            unleashes advanced customization, multi‑channel integration, and powerful marketing automation to
            maximize sales and lifetime value.
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
                <span>Marketplace Integrations (Amazon, Flipkart — optional)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Loyalty Programs & Customer Rewards</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Multi‑Currency & Multi‑Language Setup</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Custom Checkout Flows & Upsells</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Marketing Automation Integration (Email, WhatsApp, SMS)</span>
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
                alt="Premium plan e-commerce features"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Bottom Image */}
          <div className="flex items-center justify-center p-4 md:p-8 md:order-3">
            <div className="w-full max-w-lg">
              <img
                src={mock4}
                alt="Premium plan e-commerce mockup"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-center p-4 md:p-8 bg-gray-100 rounded-2xl md:order-4">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">Perfect For:</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>High‑Volume E‑Commerce Businesses</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>International & Multi‑Market Brands</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Complex Catalogs & Subscription Services</span>
              </li>
            </ul>
            <div className="mt-8">
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-[#371445] pl-4">
                "Deliver a world‑class shopping experience."
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
                      placeholder="Tell us about your ecommerce website requirements..."
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

export default EcommerceWebsitePricing;