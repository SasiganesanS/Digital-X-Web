import vishnu from "../assets/clients/School.jpg";
import vilcet from "../assets/clients/VILCET.png";
import jkk_tex from "../assets/clients/JKK-TEX.png";
import thilaga from "../assets/clients/Thilaga-Impex.png";
import capturever from "../assets/clients/Captureever.png";

export const clientData = [
 {
  id: 1,
  name: "Vishnu Lakshmi School",
  description: "Nurturing young minds with quality English-medium education since 1988.",
  year: "Education Partner",
  logo: vishnu,
},
{
  id: 2,
  name: "VILCET",
  description: "Empowering India by shaping skilled and innovative engineers.",
  year: "Education Partner",
  logo: vilcet,
},
{
  id: 3,
  name: "JKK TEX",
  description: "Leading ready-made textile brand known for quality and style.",
  year: "Textile Partner",
  logo: jkk_tex,
},
{
  id: 4,
  name: "Thilaga Impex",
  description: "Manufacturers of premium export fabrics with global standards.",
  year: "Export Partner",
  logo: thilaga,
},
{
  id: 5,
  name: "Captureever",
  description: "Fashion and photography redefined with creative storytelling.",
  year: "Creative Partner",
  logo: capturever,
},
{
  id: 6,
  name: "Vishnu Lakshmi School",
  description: "Nurturing young minds with quality English-medium education since 1988.",
  year: "Education Partner",
  logo: vishnu,
}
];

export const data = [
 {
  title: "Research & Discover",
  desc: "Analyze business needs and user behavior to uncover insights that guide strategic innovation.",
  code: "RSD",
},
{
  title: "Design & Prototype",
  desc: "Craft intuitive interfaces and seamless user experiences that align with brand identity and goals.",
  code: "DSN",
},
{
  title: "Build & Integrate",
  desc: "Develop scalable, secure, and high-performance solutions with modern technologies and agile practices.",
  code: "BLD",
},
{
  title: "Deploy & Optimize",
  desc: "Launch efficiently and continuously improve through monitoring, analytics, and real-world feedback.",
  code: "DPL",
},
];

import mock1 from "../assets/pricing/mock1.png";
import mock2 from "../assets/pricing/mock2.png";
import mock3 from "../assets/pricing/mock3.png";
import mock4 from "../assets/pricing/mock4.png";
import PHero1 from "../assets/P-Hero-1.jpg";
import PHero3 from "../assets/P-Hero-3.jpg";
import PHero4 from "../assets/P-Hero-4.jpg";
import PHero5 from "../assets/P-Hero-5.jpg";
export const ServiceHeroData = [
 {
  title: "Web Development",
  desc: "We design and develop fast, responsive, and visually engaging websites that elevate your brand presence and deliver an exceptional user experience across all devices.",
  image: PHero4,
},
{
  title: "App Development",
  desc: "We build scalable, high-performance mobile applications that blend creativity and functionality, helping businesses connect seamlessly with users on Android and iOS platforms.",
  image: PHero5,
},
{
  title: "Cyber Security",
  desc: "We protect your digital infrastructure through advanced security frameworks, proactive monitoring, and strategic risk management to ensure complete data integrity and trust.",
  image: PHero3,
},
{
  title: "Sustainability",
  desc: "We leverage innovative technologies and green practices to help your organization grow responsibly, minimizing environmental impact while maximizing business value.",
  image: PHero1,
},

];

export const blogPosts = [
  {
    title: "A Complete Showcase of Our General Portfolio and Creative Projects",
    image: mock1,
    link: "#",
    overview: {
      headline: "Our Portfolio & Creative Works",
      paragraph:
        "A curated selection of web, mobile, and design projects showcasing our range — from small business websites to enterprise-grade solutions. Highlights include responsive design, e-commerce builds, and UX-forward brand work.",
      features: [
        "Responsive websites",
        "E-commerce & storefronts",
        "Brand & UI design",
        "Cross-platform compatibility",
        "Performance-optimized builds",
        "Modern tech stacks with SEO integration"
      ],
      caseStudy: "/projects/portfolio"
    },
    valueAddition: [
      {
        id: "1",
        text: "POS, Inventory, Resource management, Appointments, CRM, and E-commerce — integrated into a unified environment to reduce data silos and improve operations."
      },
      {
        id: "2",
        text: "Conducted a detailed audit of their existing systems, mapping data flow and identifying integration opportunities to merge multiple tools via secure APIs."
      },
      {
        id: "3",
        text: "Delivered the solution within 12 months, ensuring scalable backend support and minimal downtime during migration."
      },
      {
        id: "4",
        text: "Over 30,000 customer records analyzed; advanced data analytics enabled personalized marketing and campaign optimization."
      },
      {
        id: "5",
        text: "Achieved 15% sales growth with improved engagement and reduced pilferage through intelligent tracking modules."
      },
      {
        id: "6",
        text: "Optimized supply chain visibility — all supplier payments and order processes were monitored and automated."
      }
    ]
  },
  {
    title: "Exploring Our Premium and Advanced Design Portfolio for Modern Brands",
    image: mock2,
    link: "#",
    overview: {
      headline: "Premium Design & Brand Systems",
      paragraph:
        "Design systems and premium UI work crafted for modern brands — focused on conversion, accessibility, and performance. Includes case studies on identity, digital experiences, and product design.",
      features: [
        "Design systems",
        "Product UX",
        "Accessible interfaces",
        "Interactive prototypes & testing",
        "Scalable brand guidelines",
        "Pixel-perfect responsive layouts"
      ],
      caseStudy: "/projects/design-portfolio"
    },
    valueAddition: [
      {
        id: "1",
        text: "Conducted extensive user research and usability testing to align digital experiences with target audience expectations."
      },
      {
        id: "2",
        text: "Created unified design systems to ensure consistency across multiple brand touchpoints and digital assets."
      },
      {
        id: "3",
        text: "Enhanced accessibility compliance by implementing WCAG standards and contrast-optimized color palettes."
      },
      {
        id: "4",
        text: "Implemented heatmap tracking to monitor user behavior, improving conversion rates through informed design tweaks."
      },
      {
        id: "5",
        text: "Reduced page load time by 28% using image optimization and lazy loading techniques."
      },
      {
        id: "6",
        text: "Increased client retention by 20% through brand refresh strategies and better digital communication design."
      }
    ]
  },
  {
    title: "JKK Tex – A Premium Shopping Website Crafted for Growing Businesses",
    image: mock3,
    link: "#",
    overview: {
      headline: "E-commerce & Inventory",
      paragraph:
        "Implemented a full e-commerce storefront with inventory sync, order tracking, and supplier integrations to streamline sales operations.",
      features: [
        "E-commerce storefront",
        "Inventory sync",
        "Order tracking",
        "Secure online payments",
        "Real-time product analytics",
        "Customer account management"
      ],
      caseStudy: "/projects/jkk-tex"
    },
    valueAddition: [
      {
        id: "1",
        text: "Developed a centralized dashboard integrating inventory, sales, and customer analytics for real-time insights."
      },
      {
        id: "2",
        text: "Automated supplier updates and stock alerts, reducing manual errors by 30%."
      },
      {
        id: "3",
        text: "Enabled seamless multi-device shopping experiences with advanced cart persistence and secure payment flow."
      },
      {
        id: "4",
        text: "Used predictive analytics to track buying trends and improve upsell/cross-sell strategies."
      },
      {
        id: "5",
        text: "Optimized checkout flow, improving conversion rate by 18% within the first quarter of launch."
      },
      {
        id: "6",
        text: "Reduced customer support tickets by integrating real-time order tracking and automated updates."
      }
    ]
  },
  {
    title: "Thilaga Impex – A Premium Fabric Selling Business Website with Elegant Design",
    image: mock4,
    link: "#",
    overview: {
      headline: "Supply Chain & Inventory Tool",
      paragraph:
        "Built a real-time supply chain dashboard used to track shipments, manage inventory across warehouses, and automate reorder alerts.",
      features: [
        "Shipment tracking",
        "Multi-warehouse inventory",
        "Automated reorder alerts",
        "Dynamic stock reports",
        "Supplier integration & management",
        "Data-driven decision dashboards"
      ],
      caseStudy: "/projects/thilaga-impex"
    },
    valueAddition: [
      {
        id: "1",
        text: "Integrated all warehouses into one digital platform, providing a single-view inventory system."
      },
      {
        id: "2",
        text: "Implemented real-time stock movement tracking and supplier payment automation."
      },
      {
        id: "3",
        text: "Created a custom reporting module for order forecasting and material planning."
      },
      {
        id: "4",
        text: "Enabled 24/7 monitoring of over 25,000 SKU entries with automated alerts for low stock."
      },
      {
        id: "5",
        text: "Improved supplier coordination efficiency by 40% with transparent communication channels."
      },
      {
        id: "6",
        text: "Reduced pilferage and order delays by 10% using optimized logistics tracking and vendor validation."
      }
    ]
  }
];

// --- Platforms Data (migrated from PricingData.json) ---
export const platforms = [
  // Web Development
  {
    id: "web",
    title: "Web Development",
    price: 10000,
    icon: "FaGlobe",
    plans: [
      {
        id: "basic",
        title: "Basic Web",
        price: 2000,
        icon: "MdDiamond",
        availableDetails: [
          "3-5 Pages",
          "Responsive Design",
          "Contact Form",
          "1-Month Support"
        ],
        unavailableDetails: [
          "Basic Template",
          "SEO Optimization",
          "E-Commerce Support",
          "Blog Integration",
          "Hosting & Domain",
          "Security (SSL, Firewall)",
          "Speed Optimization",
          "Custom Features (API, Integrations, etc.)"
        ]
      },
      {
        id: "startup",
        title: "Startup Web",
        price: 4000,
        icon: "MdRocketLaunch",
        availableDetails: [
         "Semi-Custom",
         "Responsive & Mobile-Friendly",
         "5-7 Pages",
         "Basic SEO Optimization",
         "Advanced Contact Form",
         "Blog Integration",
         "Basic SSL",
         "Basic Optimization",
         "3-Months Tech Support"
        ],
        unavailabeDetails: [
         "E-Commerce Support",
         "Hosting & Domain",
         "Custom Features (API, Integrations, etc.)"
        ]
      },
      {
        id: "standard",
        title: "Standard Web",
        price: 6000,
        icon: "MdStars",
        details: [
          "Fully Custom",
          "Responsive & Mobile-Friendly",
          "10-15 Pages",
          "Standard SEO Optimization",
          "Basic Store",
          "Advanced Contact Form",
          "Blog Integration",
          "1-Year Free Hosting & Domain",
          "Standard (SSL, Firewall)",
          "Advanced Optimization",
          "Basic Custom Features (API, Integrations, etc.)",
          "6-Months Tech Support"
        ]
      },
      {
        id: "premium",
        title: "Premium Web",
        price: 8000,
        icon: "MdWorkspacePremium",
        details: [
          "Premium Custom",
          "Responsive & Mobile-Friendly",
          "20+ Pages",
          "Advanced SEO Optimization",
          "Advanced Store",
          "Multi-Step & CRM",
          "Blog Integration",
          "1-Year Free Hosting & Domain",
          "Advanced (SSL, Firewall)",
          "Ultra-Fast Optimization",
          "Advanced Custom Features (API, Integrations, etc.)",
          "1 Year Tech Support"
        ]
      }
    ]
  },
  // Mobile App Development
  {
    id: "app",
    title: "Mobile App Development",
    price: 25000,
    icon: "FaMobileAlt",
    plans: [
      {
        id: "basic",
        title: "Basic App",
        price: 3000,
        icon: "MdDiamond",
        availableDetails: [
          "Android/iOS Only",
          "Basic UI & Prototype",
          "Basic Onboarding",
          "Basic Auth + SSL",
          "Basic Analytics",
          "Basic Store SEO",
          "1 API Only",
          "1-Month Support"
        ],
        unavailableDetails: [
          "Payment Gateway",
          "Offline/Real-Time Features",
          "Loyalty Features",
          "Admin Panel"
        ]
      },
      {
        id: "startup",
        title: "Startup App",
        price: 6000,
        icon: "MdRocketLaunch",
        availableDetails: [
          "Android + iOS + PWA",
          "Custom UI & Prototype",
          "Advanced Onboarding",
          "Advanced Auth",
          "Single Payment Gateway",
          "Standard Analytics",
          "Standard Optimization",
          "3 APIs",
          "Basic Loyalty",
          "Basic Admin",
          "3-Months + Strategy Support"
        ],
        unavailableDetails: [
          "Offline/Real-Time Features"
        ]
      },
      {
        id: "standard",
        title: "Standard App",
        price: 9000,
        icon: "MdStars",
        availableDetails: [
          "Android + iOS + Web",
          "Animated UI & Prototype",
          "Premium Onboarding",
          "Security Suite",
          "Multiple Payment Gateways",
          "BI + Advanced Insights",
          "Premium Optimization",
          "Chat + Offline",
          "5 APIs",
          "Gamification + Messaging",
          "Full Admin + Scalable",
          "6-Months + Reviews Support"
        ]
      },
      {
        id: "premium",
        title: "Premium App",
        price: 12000,
        icon: "MdWorkspacePremium",
        availableDetails:[
          "Full Platform Ecosystem",
          "Bespoke UI & Prototype",
          "Custom Onboarding",
          "Enterprise Security",
          "Wallet + Multi-Gateway",
          "Executive BI Suite",
          "Full Optimization Package",
          "Full Real-Time + Offline",
          "Unlimited APIs",
          "Custom Rewards",
          "Role-Based Admin Access",
          "SLA Support + Launch Campaign"
        ]
      }
    ]
  },
  // Software Development
  {
    id: "software",
    title: "Software Development",
    price: 7500,
    icon: "FaLaptopCode",
    plans: [
      {
        id: "basic",
        title: "Basic Software",
        price: 2500,
        icon: "MdDiamond",
        availableDetails: [
          "Platform: Windows only",
          "Language: Python / C# / Electron (Basic GUI)",
          "UI: Simple (Up to 2–3 screens)",
          "Function: Single-purpose tools",
          "Delivery: 5–7 days",
          "1 Week Free Bug Fix Support"
        ],
        unavailableDetails: [
          "Database Integration",
          "Multi-screen UI",
          "Cross-platform Support",
          "User Roles & Permissions",
          "API Integrations",
          "Remote Database Sync"
        ]
      },
      {
        id: "startup",
        title: "Startup Software",
        price: 5000,
        icon: "MdRocketLaunch",
        availableDetails:[
         "Platform: Windows / Cross-platform (Electron/Qt)",
         "UI: Multi-screen (Up to 5 screens)",
         "Local Database: SQLite or JSON-based",
         "Features: Basic CRUD, input forms, export options",
         "Delivery: 10–14 days",
         "1 Month Free Support"
        ]
      },
      {
        id: "standard",
        title: "Standard Software",
        price: 8000,
        icon: "MdStars",
        availableDetails:[
          "Platforms: Windows / macOS / Linux",
          "Tech Stack: Python, Java, C#, Electron, Qt",
          "UI: Modern with validation, animations",
          "Database: Integrated (SQLite/MySQL)",
          "Features: User Roles, Search, Filters, Reporting",
          "Delivery: 3–4 weeks",
          "2 Months Bug Fix + Minor Upgrades",
          "Login System & Permissions"
        ],
        unavailableDetails: [
          "Remote Database Sync",
          "Encryption",
          "API Integrations (Payment, Cloud, etc.)",
          "Auto Updates & Notifications"
        ]
      },
      {
        id: "premium",
        title: "Premium Software",
        price: 11000,
        icon: "MdWorkspacePremium",
        availableDetails: [
         "Platforms: Multi-OS with enhanced UX/UI",
         "Remote Database Sync",
         "Login System, Permissions, Encryption",
         "API Integrations (Payment, Cloud, etc.)",
         "Auto Updates, Notifications",
         "Delivery: 4–6 weeks",
         "3 Months Support & Optimization",
         "Custom Branding",
         "Advanced Reports & Analytics",
         "Dedicated Project Manager",
         "Technical Documentation",
         "Performance Optimization"
        ]
      }
    ]
  },
  // Digital Marketing
  {
    id: "digital",
    title: "Digital Marketing",
    price: 7500,
    icon: "FaBullhorn",
    plans: [
      {
        id: "basic",
        title: "Basic Marketing",
        price: 2000,
        icon: "MdDiamond",
        availableDetails:[
          "SEO Basics (On-page SEO only)",
          "Basic Social Media Management (2 Platforms - 3 posts/week)",
          "Basic Email Campaign (1 Campaign/Month)",
          "1-Month Reporting",
          "1-Month Tech Support"
        ],
        unavailableDetails: [
          "Video Production",
          "Paid Ads (PPC)",
          "Conversion Rate Tracking",
          "Content Strategy Planning",
          "Marketing Videos",
          "CRO (Conversion Rate Optimization)",
          "Advanced Data Analytics"
        ]
      },
      {
        id: "startup",
        title: "Startup Marketing",
        price: 4000,
        icon: "MdRocketLaunch",
        availableDetails:[
         "Full SEO (On-Page + Basic Off-Page)",
         "Social Media Management (3 Platforms - 4 posts/week)",
         "Email Marketing Campaigns (2 Campaigns/Month)",
         "Conversion Rate Tracking (basic)",
         "PPC Campaign Setup (Basic - Ad Budget Extra)",
         "2-Month Reporting",
         "3-Months Tech Support"
        ],
        unavailableDetails: [
          "Video Production",
          "Content Strategy Planning",
          "Marketing Videos",
          "CRO (Advanced)",
          "Advanced Data Analytics"
        ]
      },
      {
        id: "standard",
        title: "Standard Marketing",
        price: 6000,
        icon: "MdStars",
        availableDetails:[
         "Advanced SEO (Full On-Page + Off-Page)",
         "Social Media Management (5 Platforms - Daily Posts)",
         "Email Marketing Campaigns (4 Campaigns/Month)",
         "Conversion Rate Optimization (Standard level)",
         "Full PPC Ad Management (Google, Meta Ads)",
         "Monthly Content Strategy Planning",
         "Basic Marketing Video (1 Video/Month)",
         "3-Month Reporting",
         "6-Months Tech Support"
       ],
       unavailableDetails: [
        "Email Marketing Automation",
        "Advanced Data Analytics Integration",
        "Custom Marketing Videos"
      ]
    },
    {
      id: "premium",
      title: "Premium Marketing",
        price: 9000,
        icon: "MdWorkspacePremium",
        availableDetails:[
         "Advanced SEO (AI-powered Audits + Reporting)",
         "Social Media Growth Campaigns (5+ Platforms + Paid Promotions)",
         "Email Marketing Automation (Full Funnel Setup)",
         "Full CRO (Advanced Data Analytics Integration)",
         "Full PPC Campaign Management (Across Google, Meta, LinkedIn)",
         "Content Strategy + Monthly Video Content (2 Videos/Month)",
         "Custom Marketing Videos (Animated, Product Demos)",
         "Bi-Weekly Reporting",
         "1-Year Tech Support",
         "Dedicated Account Manager",
         "Custom Brand Strategy Development",
         "Competitor Analysis & Tracking"
        ]
      }
    ]
  },
  // Cyber Security
  {
    id: "cyber",
    title: "Cyber Security",
    price: 9000,
    icon: "FaShieldAlt",
    plans: [
      {
        id: "basic",
        title: "Basic Security",
        price: 2500,
        icon: "MdDiamond",
        availableDetails:[
         "Vulnerability assessments and penetration testing",
         "Red team simulations with threat emulation",
         "Web, mobile, and thick client security testing",
         "ATM and virtualization environment assessments",
         "Secure code reviews and configuration validation",
         "CVSS-based risk scoring and monthly reports",
         "Social engineering and physical security testing",
         "Executive-level summary reports"
        ]
      },
      {
        id: "startup",
        title: "Startup Security",
        price: 5000,
        icon: "MdRocketLaunch",
        availableDetails:[
         "GDPR, HIPAA, and CCPA compliance consulting",
         "Data Protection Officer (DPO) advisory",
         "ISO 27001 alignment for privacy programs",
         "Data flow mapping and consent management",
         "Privacy policy evaluation and staff training",
         "Third-party data sharing audits",
         "Customized training for compliance",
         "Comprehensive privacy implementation"
        ]
      },
      {
        id: "standard",
        title: "Standard Security",
        price: 8000,
        icon: "MdStars",
        availableDetails:[
         "Development of risk-based security roadmaps",
         "KPI setting and quarterly progress reviews",
         "Tool selection and budget planning support",
         "CISO advisory for strategic planning",
         "Alignment with NIST, CIS frameworks",
         "Milestone-based security maturity planning",
         "Power BI CS analytics",
         "Executive reporting and guidance"
        ]
      },
      {
        id: "premium",
        title: "Premium Security",
        price: 12000,
        icon: "MdWorkspacePremium",
        availableDetails:[
         "ISO 22301 business continuity implementation",
         "Business Impact Analysis (BIA)",
         "Crisis management and recovery planning",
         "Cloud-based backup strategies",
         "Simulation and testing of continuity plans",
         "Crisis communication protocols",
         "Regular resilience assessments",
         "Stakeholder management planning"
        ]
      }
    ]
  },
  // Sustainability Solutions
  {
    id: "sustainability",
    title: "Sustainability Solutions",
    price: 8500,
    icon: "FaLeaf",
    plans: [
      {
        id: "basic",
        title: "Basic Sustainability",
        price: 2000,
        icon: "MdDiamond",
       availableDetails:[
        "Energy Consumption Assessment",
        "Basic Carbon Footprint Analysis",
        "Green IT Recommendations",
        "Energy-Efficient Hardware Suggestions",
        "3-Month Support"
       ],
       unavailableDetails: [
        "Sustainable Cloud Options",
        "E-Waste Management Plan",
        "ESG Reporting",
        "Green Office Assessment",
        "Renewable Energy Integration",
        "Green Software Architecture",
        "Sustainability Workshops"
       ]
      },
      {
        id: "startup",
        title: "Startup Sustainability",
        price: 4000,
        icon: "MdRocketLaunch",
        availableDetails:[
          "Advanced Energy Consumption Analysis",
          "Detailed Carbon Footprint Reporting",
          "Comprehensive Green IT Strategy",
          "Energy-Efficient Hardware Procurement",
          "Sustainable Cloud Migration Plan",
          "E-Waste Management Program",
          "Basic ESG Reporting Framework",
          "Green Office Assessment",
          "6-Month Support"
        ],
        unavailableDetails: [
         "Renewable Energy Options",
         "Green Software Principles",
         "Sustainability Workshops"
        ]
      },
      {
        id: "standard",
        title: "Standard Sustainability",
        price: 7000,
        icon: "MdStars",
        availableDetails:[
         "Enterprise Energy Consumption Analysis",
         "Advanced Carbon Footprint Management",
         "Strategic Green IT Implementation",
         "Complete Hardware Sustainability Plan",
         "End-to-End Cloud Sustainability",
         "Comprehensive E-Waste Strategy",
         "Advanced ESG Reporting Framework",
         "Complete Green Office Transformation",
         "Renewable Energy Integration",
         "Energy-Efficient Software Development",
         "Sustainability Workshops & Training",
         "1-Year Support"
        ]
      },
      {
        id: "premium",
        title: "Premium Sustainability",
        price: 10000,
        icon: "MdWorkspacePremium",
        availableDetails:[
         "Global Energy Consumption Monitoring",
         "Real-time Carbon Footprint Dashboard",
         "Enterprise Green IT Transformation",
         "Circular Economy Hardware Program",
         "Multi-Cloud Sustainability Optimization",
         "Circular E-Waste Management",
         "Comprehensive ESG Program Development",
         "Global Green Office Standards",
         "On-Site Renewable Energy Solutions",
         "Green Software Factory Implementation",
         "Executive Sustainability Leadership Program",
         "Dedicated Sustainability Team"
        ]
      }
    ]
  }
];
export const businessWebsitePricingPlans = [
  {
    name: "Basic",
    subtitle: "Small businesses & simple websites",
    features: [
      { name: "Basic Template", included: false },
      { name: "Responsive & Mobile-Friendly", included: true },
      { name: "3-5 Pages", included: true },
      { name: "SEO Optimization", included: false },
      { name: "E-Commerce Support", included: false },
      { name: "Basic Contact Form", included: true },
      { name: "Blog Integration", included: false },
      { name: "Hosting & Domain", included: false },
      { name: "Security (SSL, Firewall)", included: false },
      { name: "Speed Optimization", included: false },
      { name: "Custom Features (API, Integrations, etc.)", included: false },
      { name: "1-Month Tech Support", included: true }
    ]
  },
  {
    name: "Startup",
    subtitle: "Startups, personal brands, & small businesses",
    features: [
      { name: "Semi-Custom", included: true },
      { name: "Responsive & Mobile-Friendly", included: true },
      { name: "5-7 Pages", included: true },
      { name: "Basic SEO Optimization", included: true },
      { name: "E-Commerce Support", included: false },
      { name: "Advanced Contact Form", included: true },
      { name: "Blog Integration", included: true },
      { name: "Hosting & Domain", included: false },
      { name: "Basic SSL", included: true },
      { name: "Basic Optimization", included: true },
      { name: "Custom Features(API, Integrations, etc.)", included: false },
      { name: "3-Months Tech Support", included: true }
    ]
  },
  {
    name: "Standard",
    subtitle: "Small to mid-sized businesses & professionals",
    features: [
      { name: "Fully Custom", included: true },
      { name: "Responsive & Mobile-Friendly", included: true },
      { name: "10-15 Pages", included: true },
      { name: "Standard SEO Optimization", included: true },
      { name: "Basic Store", included: true },
      { name: "Advanced Contact Form", included: true },
      { name: "Blog Integration", included: true },
      { name: "1-Year Free H & D", included: true },
      { name: "Standard (SSL, Firewall)", included: true },
      { name: "Advanced Optimization", included: true },
      { name: "Basic Custom Features (API, Integrations, etc.)", included: true },
      { name: "6-Months Tech Support", included: true }
    ]
  },
  {
    name: "Premium",
    subtitle: "Feature-rich, high-conversion websites",
    features: [
      { name: "Premium Custom", included: true },
      { name: "Responsive & Mobile-Friendly", included: true },
      { name: "20+ Pages", included: true },
      { name: "Advanced SEO Optimization", included: true },
      { name: "Advanced Store", included: true },
      { name: "Multi-Step & CRM", included: true },
      { name: "Blog Integration", included: true },
      { name: "1-Year Free H & D", included: true },
      { name: "Advanced (SSL, Firewall)", included: true },
      { name: "Ultra-Fast Optimization", included: true },
      { name: "Advanced Custom Features (API, Integrations, etc.)", included: true },
      { name: "1 Year Tech Support", included: true }
    ]
  }
];

import vp from "../assets/clients/vp.png";
import jkk from "../assets/clients/jkk.png";
// Removed duplicate import of vilcet
import praskla from "../assets/py.jpg";

export const businessWebsiteExampleWorks = [
  {
    plan: "Basic",
    name: "Dr. Vishnu Priya",
    description: "A Simple Static, professional, and budget-friendly portfolio website",
    logo: vp
  },
  {
    plan: "Startup",
    name: "JKK TEX",
    description: "Perfect for startups and personal brands looking to establish an online presence",
    logo: jkk
  },
  {
    plan: "Standard",
    name: "VILCET",
    description: "For small to mid-sized businesses needing a polished, functional website",
    logo: vilcet
  },
  {
    plan: "Premium",
    name: "PRASKLA TECHNOLOGY",
    description: "Feature-rich, high-conversion website built for business growth and impact",
    logo: praskla
  }
];
import germany from "../assets/germany.jpeg";
import sus from "../assets/sus.jpeg";
import web from "../assets/web.jpeg";

export const contentData = [
  {
    title: "Clients in Germany",
    description: "We are building a community app that enables users to post, engage, and advertise effectively, creating a dynamic digital space for interaction and growth.",
    background: germany,
    imageGroup: 'german'
  },
  {
    title: "The Next",
    description: "A grocery store management app that streamlines inbound and outbound stock operations, optimizing inventory, tracking orders, and ensuring smooth logistics. This solution enhances efficiency while improving overall store management.",
    background: germany,
    imageGroup: 'german'
  },
  {
    title: "Our Commitment to Sustainability",
    description: "Sustainability is at the core of our values. For every project delivered, we plant one tree to contribute to a greener future. By combining innovation with eco-conscious practices, we help businesses grow while making a positive impact on the environment.",
    background: sus,
    imageGroup: 'sustainability'
  },
  {
    title: "Web Development",
    description: "We specialize in fast and efficient web development, creating individual portfolios for doctors, advocates, and professionals within 24 hours of onboarding. To enhance accessibility, we also provide a custom visiting card with a QR code, making it easier for clients to connect.",
    background: web,
    imageGroup: 'web'
  }
];
