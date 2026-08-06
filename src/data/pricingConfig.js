// src/data/pricingConfig.js
// Centralized Single Source of Truth for Pricing & Package System

export const SERVICE_BASE_PRICES = {
  web: 15000,
  software: 25000,
  app: 20000,
  marketing: 12000,
  cyber: 30000,
  sustainability: 10000,
};

export const PACKAGE_MULTIPLIERS = {
  standard: 1.0,
  business: 1.5,
  enterprise: 2.5,
};

export const DURATION_OPTIONS = [
  { label: "1 Month", months: 1 },
  { label: "3 Months", months: 3 },
  { label: "6 Months", months: 6 },
  { label: "12 Months", months: 12 },
];

export const ADDONS_PRICING = {
  extra_page: { name: "Extra Website Page", price: 1000, type: "qty", unit: "page" },
  animation_section: { name: "Animation Section", price: 2500, type: "qty", unit: "section" },
  landing_page: { name: "CRO Landing Page", price: 3000, type: "toggle" },
  seo_pro: { name: "SEO Pro Execution", price: 4000, type: "toggle" },
  hosting: { name: "Eco Green Hosting", price: 3000, type: "toggle" },
  maintenance: { name: "Monthly Maintenance", price: 2500, type: "monthly" },
  video_editing: { name: "Video Editing", price: 1500, type: "qty", unit: "video" },
  instagram_reel: { name: "Instagram Reel", price: 900, type: "qty", unit: "reel" },
  content_writing: { name: "Content Writing Article", price: 800, type: "qty", unit: "article" },
};

/**
 * Calculates Package Price from Service Base Price & Multiplier
 * Standard = Base * 1.0
 * Business = Base * 1.5
 * Enterprise = Base * 2.5
 */
export const getPackagePrice = (serviceId, packageKey) => {
  const basePrice = SERVICE_BASE_PRICES[serviceId] || 15000;
  const multiplier = PACKAGE_MULTIPLIERS[packageKey] || 1.0;
  return Math.round(basePrice * multiplier);
};

// Complete Service Pillars Definitions derived strictly from Single Source of Truth
export const SERVICES_CONFIG = [
  {
    id: "web",
    title: "Web Development",
    desc: "Modern responsive websites, web apps, and CMS platforms with world-class UI/UX.",
    basePrice: SERVICE_BASE_PRICES.web,
    packages: [
      {
        id: "standard",
        title: "Standard Web",
        idealFor: "Startups & Small Sites",
        timeline: "14 Days",
        price: getPackagePrice("web", "standard"), // ₹15,000
        features: [
          "5 Pages Responsive Website",
          "Responsive Mobile Build",
          "Contact Form Integration",
          "Basic SEO Setup",
          "Core Performance Optimization",
        ],
      },
      {
        id: "business",
        title: "Business Pro",
        idealFor: "Growing Companies & E-commerce",
        timeline: "30 Days",
        price: getPackagePrice("web", "business"), // ₹22,500
        features: [
          "15 Pages Custom UI/UX Design",
          "Framer / React Micro-Animations",
          "E-commerce & CMS Integration",
          "Advanced SEO & Speed Optimization",
          "Priority Support",
        ],
      },
      {
        id: "enterprise",
        title: "Enterprise Suite",
        idealFor: "Scale-ups & Large Brands",
        timeline: "45 Days",
        price: getPackagePrice("web", "enterprise"), // ₹37,500
        features: [
          "Unlimited Pages & Scalability",
          "Full Custom Web Application",
          "Multi-language & Localization",
          "Custom API Integrations",
          "24/7 Dedicated Support & SLA",
        ],
      },
    ],
    addons: [
      { id: "extra_page", ...ADDONS_PRICING.extra_page },
      { id: "animation_section", ...ADDONS_PRICING.animation_section },
      { id: "landing_page", ...ADDONS_PRICING.landing_page },
      { id: "seo_pro", ...ADDONS_PRICING.seo_pro },
      { id: "hosting", ...ADDONS_PRICING.hosting },
      { id: "maintenance", ...ADDONS_PRICING.maintenance },
      { id: "content_writing", ...ADDONS_PRICING.content_writing },
    ],
  },
  {
    id: "software",
    title: "Software Development",
    desc: "Scalable SaaS platforms, custom backend systems, APIs, and enterprise cloud solutions.",
    basePrice: SERVICE_BASE_PRICES.software,
    packages: [
      {
        id: "standard",
        title: "MVP Build",
        idealFor: "Early Stage Products",
        timeline: "30 Days",
        price: getPackagePrice("software", "standard"), // ₹25,000
        features: [
          "Core Feature Architecture",
          "Single Platform Focus",
          "Basic Admin Dashboard",
          "3-Month Maintenance",
        ],
      },
      {
        id: "business",
        title: "Custom SaaS",
        idealFor: "Growing SaaS Companies",
        timeline: "60 Days",
        price: getPackagePrice("software", "business"), // ₹37,500
        features: [
          "Full SaaS Architecture",
          "Cloud Infrastructure Setup",
          "Payment & Billing System",
          "Scalable Multi-tenant DB",
        ],
      },
      {
        id: "enterprise",
        title: "Enterprise Core",
        idealFor: "High-load Platforms",
        timeline: "90 Days",
        price: getPackagePrice("software", "enterprise"), // ₹62,500
        features: [
          "Complex Microservices",
          "High-level Encryption & Security",
          "Dedicated Dev Team",
          "24/7 Incident Support",
        ],
      },
    ],
    addons: [
      { id: "seo_pro", ...ADDONS_PRICING.seo_pro },
      { id: "hosting", ...ADDONS_PRICING.hosting },
      { id: "maintenance", ...ADDONS_PRICING.maintenance },
    ],
  },
  {
    id: "app",
    title: "App Development",
    desc: "High-performance iOS and Android applications with native feel and smooth motion.",
    basePrice: SERVICE_BASE_PRICES.app,
    packages: [
      {
        id: "standard",
        title: "Hybrid Starter",
        idealFor: "iOS & Android MVP",
        timeline: "25 Days",
        price: getPackagePrice("app", "standard"), // ₹20,000
        features: [
          "Cross-platform Build (React Native)",
          "Push Notifications",
          "App Store & Play Store Deployment",
          "Standard UI Screens (up to 8)",
        ],
      },
      {
        id: "business",
        title: "Pro Experience",
        idealFor: "Feature-Rich Mobile Apps",
        timeline: "45 Days",
        price: getPackagePrice("app", "business"), // ₹30,000
        features: [
          "Advanced Motion & Micro-animations",
          "Payment Gateway Integration",
          "Social Login & Authentication",
          "Offline Syncing Engine",
        ],
      },
      {
        id: "enterprise",
        title: "Native Suite",
        idealFor: "High Performance Apps",
        timeline: "75 Days",
        price: getPackagePrice("app", "enterprise"), // ₹50,000
        features: [
          "Full Native Optimization",
          "Custom Hardware / Camera Access",
          "Complex Real-time Data Sync",
          "Lifetime Priority Support",
        ],
      },
    ],
    addons: [
      { id: "landing_page", ...ADDONS_PRICING.landing_page },
      { id: "seo_pro", ...ADDONS_PRICING.seo_pro },
      { id: "maintenance", ...ADDONS_PRICING.maintenance },
    ],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    desc: "Performance marketing, SEO execution, paid ads, content, and revenue growth.",
    basePrice: SERVICE_BASE_PRICES.marketing,
    packages: [
      {
        id: "standard",
        title: "Brand Visibility",
        idealFor: "Brand Launch & Awareness",
        timeline: "Monthly",
        price: getPackagePrice("marketing", "standard"), // ₹12,000
        features: [
          "Social Media Management (12 Posts)",
          "On-page SEO Execution",
          "Basic Content Calendar",
          "Monthly Growth Report",
        ],
      },
      {
        id: "business",
        title: "Performance Growth",
        idealFor: "Lead Generation & Sales",
        timeline: "Monthly",
        price: getPackagePrice("marketing", "business"), // ₹18,000
        features: [
          "Paid Ads Management (Meta & Google)",
          "Advanced SEO Execution & Ranking",
          "8 Instagram Reels / Short Videos",
          "CRO Landing Page Optimization",
        ],
      },
      {
        id: "enterprise",
        title: "Dominion Strategy",
        idealFor: "Omni-channel Dominance",
        timeline: "Monthly",
        price: getPackagePrice("marketing", "enterprise"), // ₹30,000
        features: [
          "Full Omni-Channel Execution",
          "Global Campaign Scale",
          "Premium Video Production",
          "AI-Driven Analytics & CRO",
        ],
      },
    ],
    addons: [
      { id: "instagram_reel", ...ADDONS_PRICING.instagram_reel },
      { id: "video_editing", ...ADDONS_PRICING.video_editing },
      { id: "content_writing", ...ADDONS_PRICING.content_writing },
      { id: "landing_page", ...ADDONS_PRICING.landing_page },
      { id: "seo_pro", ...ADDONS_PRICING.seo_pro },
    ],
  },
  {
    id: "cyber",
    title: "Cyber Security",
    desc: "24/7 threat protection, vulnerability audits, zero-trust architecture, and compliance.",
    basePrice: SERVICE_BASE_PRICES.cyber,
    packages: [
      {
        id: "standard",
        title: "Security Audit",
        idealFor: "Security Risk Inspection",
        timeline: "10 Days",
        price: getPackagePrice("cyber", "standard"), // ₹30,000
        features: [
          "Vulnerability Assessment",
          "Penetration Testing",
          "Compliance Checklist",
          "Actionable Remediation Report",
        ],
      },
      {
        id: "business",
        title: "Threat Shield",
        idealFor: "Active Business Protection",
        timeline: "Ongoing",
        price: getPackagePrice("cyber", "business"), // ₹45,000
        features: [
          "24/7 Threat Monitoring",
          "Managed Firewall Protection",
          "Endpoint Security",
          "Rapid Incident Response",
        ],
      },
      {
        id: "enterprise",
        title: "Digital Fortress",
        idealFor: "Enterprise & Finance",
        timeline: "Ongoing",
        price: getPackagePrice("cyber", "enterprise"), // ₹75,000
        features: [
          "Zero-Trust Architecture",
          "End-to-End Encryption",
          "Disaster Recovery Strategy",
          "Dedicated CISO Consultant",
        ],
      },
    ],
    addons: [
      { id: "maintenance", ...ADDONS_PRICING.maintenance },
      { id: "hosting", ...ADDONS_PRICING.hosting },
    ],
  },
  {
    id: "sustainability",
    title: "Sustainability",
    desc: "Digital carbon audits, eco-friendly green hosting, energy optimization, and CSR impact.",
    basePrice: SERVICE_BASE_PRICES.sustainability,
    packages: [
      {
        id: "standard",
        title: "Green Initiative",
        idealFor: "Digital Carbon Reduction",
        timeline: "14 Days",
        price: getPackagePrice("sustainability", "standard"), // ₹10,000
        features: [
          "Digital Carbon Audit",
          "Green Hosting Migration",
          "Impact Badge Integration",
          "CSR Impact Certificate",
        ],
      },
      {
        id: "business",
        title: "Eco-Optimization",
        idealFor: "Sustainable Digital Core",
        timeline: "30 Days",
        price: getPackagePrice("sustainability", "business"), // ₹15,000
        features: [
          "Smart Asset & Code Optimization",
          "Energy-Efficiency Plan",
          "Clean Web Standards",
          "Community Carbon Offsetting",
        ],
      },
      {
        id: "enterprise",
        title: "Regenerative Core",
        idealFor: "Net-Zero Tech Stacks",
        timeline: "45 Days",
        price: getPackagePrice("sustainability", "enterprise"), // ₹25,000
        features: [
          "Circular Tech Economy Strategy",
          "Net-Zero Implementation",
          "Regenerative Architecture",
          "Certified Partner Status",
        ],
      },
    ],
    addons: [
      { id: "hosting", ...ADDONS_PRICING.hosting },
      { id: "maintenance", ...ADDONS_PRICING.maintenance },
    ],
  },
];
