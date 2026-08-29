import React, { useState } from 'react';
import {
  FaCheck,
  FaTimes,
  FaTimes as CloseIcon,
  FaEuroSign,
  FaRupeeSign,
  FaDesktop,
  FaLaptopCode,
  FaServer,
  FaRocket
} from 'react-icons/fa';
import mock1 from "../../assets/pricing/mock1.webp";
import mock2 from "../../assets/pricing/mock2.webp";
import mock3 from "../../assets/pricing/mock3.webp";
import mock4 from "../../assets/pricing/mock4.webp";
import { sendPricingQuoteEmails } from '../../utils/emailService';
import BrandX from '../common/BrandX';
import LegalSpaceBackground from '../legal/LegalSpaceBackground';

const SoftwareDevelopmentPricing = () => {
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

  // Software development plans with icons
  const softwarePlans = [
    {
      plan: "Basic",
      name: "SPARK PLAN",
      description: "Simple Tools for Smooth Internal Operations",
      icon: <FaDesktop className="text-[#371445] text-4xl" />
    },
    {
      plan: "Startup",
      name: "IGNITE PLAN",
      description: "Smart Desktop Apps for Small Businesses",
      icon: <FaLaptopCode className="text-[#371445] text-4xl" />
    },
    {
      plan: "Standard",
      name: "ACCELERATE PLAN",
      description: "Advanced Desktop Solutions for Growing Brands",
      icon: <FaServer className="text-[#371445] text-4xl" />
    },
    {
      plan: "Premium",
      name: "ASCEND PLAN",
      description: "Enterprise-Level Desktop Applications with Powerful Capabilities",
      icon: <FaRocket className="text-[#371445] text-4xl" />
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      subtitle: "Spark Plan",
      features: [
        { name: "Platform: Windows only", included: true },
        { name: "Language: Python / C# / Electron (Basic GUI)", included: true },
        { name: "UI: Simple (Up to 2–3 screens)", included: true },
        { name: "Function: Single-purpose tools", included: true },
        { name: "Database Integration", included: false },
        { name: "Delivery: 5–7 days", included: true },
        { name: "1 Week Free Bug Fix Support", included: true },
        { name: "Multi-screen UI", included: false },
        { name: "Cross-platform Support", included: false },
        { name: "User Roles & Permissions", included: false },
        { name: "API Integrations", included: false },
        { name: "Remote Database Sync", included: false }
      ]
    },
    {
      name: "Startup",
      subtitle: "Ignite Plan",
      features: [
        { name: "Platform: Windows / Cross-platform (Electron/Qt)", included: true },
        { name: "UI: Multi-screen (Up to 5 screens)", included: true },
        { name: "Local Database: SQLite or JSON-based", included: true },
        { name: "Features: Basic CRUD, input forms, export options", included: true },
        { name: "Delivery: 10–14 days", included: true },
        { name: "1 Month Free Support", included: true },
        { name: "Advanced UI with animations", included: false },
        { name: "User Roles & Permissions", included: false },
        { name: "Multi-OS Support", included: false },
        { name: "API Integrations", included: false },
        { name: "Remote Database Sync", included: false },
        { name: "Auto Updates", included: false }
      ]
    },
    {
      name: "Standard",
      subtitle: "Accelerate Plan",
      features: [
        { name: "Platforms: Windows / macOS / Linux", included: true },
        { name: "Tech Stack: Python, Java, C#, Electron, Qt", included: true },
        { name: "UI: Modern with validation, animations", included: true },
        { name: "Database: Integrated (SQLite/MySQL)", included: true },
        { name: "Features: User Roles, Search, Filters, Reporting", included: true },
        { name: "Delivery: 3–4 weeks", included: true },
        { name: "2 Months Bug Fix + Minor Upgrades", included: true },
        { name: "Login System & Permissions", included: true },
        { name: "Remote Database Sync", included: false },
        { name: "Encryption", included: false },
        { name: "API Integrations (Payment, Cloud, etc.)", included: false },
        { name: "Auto Updates & Notifications", included: false }
      ]
    },
    {
      name: "Premium",
      subtitle: "Ascend Plan",
      features: [
        { name: "Platforms: Multi-OS with enhanced UX/UI", included: true },
        { name: "Remote Database Sync", included: true },
        { name: "Login System, Permissions, Encryption", included: true },
        { name: "API Integrations (Payment, Cloud, etc.)", included: true },
        { name: "Auto Updates, Notifications", included: true },
        { name: "Delivery: 4–6 weeks", included: true },
        { name: "3 Months Support & Optimization", included: true },
        { name: "Custom Branding", included: true },
        { name: "Advanced Reports & Analytics", included: true },
        { name: "Dedicated Project Manager", included: true },
        { name: "Technical Documentation", included: true },
        { name: "Performance Optimization", included: true }
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
    } else if (plan === "Professional") {
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

  // Add validation functions and handlers
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
        service: "Software Development"
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
              Software Development Pricing
            </h1>
            <div className="w-24 h-1 bg-[#E31D2E] mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Custom software solutions tailored to your business needs
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

        {/* Software Development Plans Section */}
        <div className="mt-20 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#371445] mb-4">
              Our Software Development Plans
            </h2>
            <div className="w-24 h-1 bg-[#371445] mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your software development needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {softwarePlans.map((plan, index) => (
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
            Simple Tools for Smooth Internal Operations
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At <span className="font-inlander font-bold text-[#111111]">PRASKLA DIGITAL</span> <BrandX className="text-[1.65em] font-pdx text-[#E31D2E] inline-block translate-y-[0.08em] -ml-0.5" />, we know that even small tools can make a big impact. Our Basic / Spark Plan is
            tailored for quick, reliable desktop applications that serve a focused internal purpose. Whether it's
            automating a repetitive task or simplifying a daily process, this plan delivers efficient functionality
            without the fluff.
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
                <span>Platform: Windows (only)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Technology: Python / C# / Electron</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Simple UI (Up to 2–3 Screens)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Purpose-Built Tools (e.g., File Renamer, Invoice Generator)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>No Database Integration</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Delivery Timeline: 5–7 Days</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>1 Week Free Bug Fix Support</span>
              </li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-lg">
              <img
                src={mock1}
                alt="Basic plan software features"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Bottom Image */}
          <div className="flex items-center justify-center p-4 md:p-8 md:order-3">
            <div className="w-full max-w-lg">
              <img
                src={mock2}
                alt="Basic plan software mockup"
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
                <span>Internal Utility Tools</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Solo Professionals</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Admin & Office Automation Tasks</span>
              </li>
            </ul>
            <div className="mt-8">
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-[#371445] pl-4">
                "Build simple. Deliver impact."
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
            Smart Desktop Apps for Small Businesses
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stepping into software automation for your business? Our Startup / Ignite Plan is made for entrepreneurs
            and small business owners who need practical tools to streamline operations. With multi-screen support
            and local data storage, you get everything you need — without overcomplicating things.
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
                <span>Platforms: Windows / Cross-platform (Electron or Qt)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>UI: Up to 5 Interactive Screens</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Local Database (SQLite or JSON)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Core Features: CRUD Functions, Data Input Forms, Export Options</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Delivery Timeline: 10–14 Days</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>1 Month Free Support</span>
              </li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-lg">
              <img
                src={mock3}
                alt="Startup plan software features"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Bottom Image */}
          <div className="flex items-center justify-center p-4 md:p-8 md:order-3">
            <div className="w-full max-w-lg">
              <img
                src={mock4}
                alt="Startup plan software mockup"
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
                <span>Small Business Operations</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Billing & Order Systems</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Inventory or Customer Tracking Tools</span>
              </li>
            </ul>
            <div className="mt-8">
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-[#371445] pl-4">
                "Kickstart productivity with intuitive tools built just for you."
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
            Advanced Desktop Solutions for Growing Brands
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            As your business evolves, so should your software. The Standard / Accelerate Plan is designed for
            growing teams that require polished, functional, and scalable desktop solutions. With integrated
            databases, enhanced UI/UX, and smart user flows — it's built for performance and professionalism.
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
                <span>Platforms: Windows, macOS, Linux</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Tech Stack: Python, Java, C#, Electron, Qt</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>UI: Multi-screen with Modern Features, Animations, and Validation</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Database: Integrated (SQLite / MySQL)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Features: User Roles, Filters, Reports, Search Functionality</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Delivery Timeline: 3–4 Weeks</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>2 Months Free Bug Fix + Minor Upgrades</span>
              </li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-lg">
              <img
                src={mock1}
                alt="Standard plan software features"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Bottom Image */}
          <div className="flex items-center justify-center p-4 md:p-8 md:order-3">
            <div className="w-full max-w-lg">
              <img
                src={mock2}
                alt="Standard plan software mockup"
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
                <span>Mid-scale Companies</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Service & Retail Management Software</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Operational Workflow Tools</span>
              </li>
            </ul>
            <div className="mt-8">
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-[#371445] pl-4">
                "Go from functional to phenomenal with software that grows with you."
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
            Enterprise-Level Desktop Applications with Powerful Capabilities
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Need secure, scalable, and highly interactive desktop software? The Premium / Ascend Plan is crafted for
            businesses that demand excellence. With features like remote sync, encrypted logins, and smart
            automation, it's perfect for professional-grade solutions that don't compromise.
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
                <span>Multi-Platform (Windows/macOS/Linux)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Advanced UI/UX Design with Performance Focus</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Remote Database Integration & Cloud Sync</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Login Systems, Permissions, Data Encryption</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>API Integrations (Payment Gateways, Cloud Services, etc.)</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Auto-Updater, Real-Time Notifications</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Delivery Timeline: 4–6 Weeks</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>3 Months Full Support & Optimization</span>
              </li>
            </ul>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-lg">
              <img
                src={mock3}
                alt="Premium plan software features"
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* Bottom Image */}
          <div className="flex items-center justify-center p-4 md:p-8 md:order-3">
            <div className="w-full max-w-lg">
              <img
                src={mock4}
                alt="Premium plan software mockup"
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
                <span>Product-Based Companies</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>B2B Software Providers</span>
              </li>
              <li className="flex items-center text-lg">
                <span className="text-[#371445] mr-3 text-xl">•</span>
                <span>Desktop SaaS Platforms</span>
              </li>
            </ul>
            <div className="mt-8">
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-[#371445] pl-4">
                "Power your business with feature-rich, future-ready software."
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-4 sm:p-7 max-w-md w-[94%] sm:w-full relative max-h-[90dvh] overflow-y-auto custom-scrollbar border border-[#111111] shadow-2xl my-auto pb-8 sm:pb-10">
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
                      placeholder="Tell us about your software project requirements..."
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

export default SoftwareDevelopmentPricing;