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
    title: "Research & Strategize",
    desc: "Analyze market trends, audience behavior, and brand positioning to uncover insights that drive impactful marketing decisions.",
    code: "RSD",
  },
  {
    title: "Design & Create",
    desc: "Craft compelling content, visual storytelling, and campaign creatives that align with brand identity and audience psychology",
    code: "DSN",
  },
  {
    title: "Launch & Amplify",
    desc: "Execute performance campaigns across social media, SEO, paid ads, and digital platforms to maximize reach and engagement.",
    code: "LCH",
  },
  {
    title: "Optimize & Scale",
    desc: "Continuously monitor data, refine strategies, and scale winning campaigns to improve ROI and long-term brand growth.",
    code: "OPT",
  },
];

import mock1 from "../assets/pricing/mock1.png";
import mock2 from "../assets/pricing/mock2.png";
import mock3 from "../assets/pricing/mock3.png";
import mock4 from "../assets/pricing/mock4.png";
import PHero1 from "../assets/P-Hero-1.jpg";
import tipyImg from "../assets/tipy.png";
import PHero3 from "../assets/P-Hero-3.jpg";
import PHero4 from "../assets/P-Hero-4.jpg";
import PHero5 from "../assets/P-Hero-5.jpg";
export const ServiceHeroData = [
  {
    title: "Content Creation",
    desc: "Stories that convert through compelling copy, graphics, and high-impact video production.",
    image: PHero4,
  },
  {
    title: "Social Media Management",
    desc: "Strategic community building and always-on brand presence across all major platforms.",
    image: PHero5,
  },
  {
    title: "Paid Advertising",
    desc: "ROI-focused campaigns designed to reach your ideal audience and scale profitably.",
    image: PHero3,
  },
  {
    title: "SEO Optimization",
    desc: "Organic visibility and authority building that drives consistent, high-intent traffic.",
    image: PHero1,
  },
  {
    title: "Sales Strategy",
    desc: "Data-backed funnels and frameworks that systematically turn prospects into loyal clients.",
    image: PHero4, // Reusing PHero4 for now
  },
];

export const blogPosts = [
  {
    title: "Our Portfolio & Creative Works",
    image: mock1,
    link: "#",
    overview: {
      headline: "Our Portfolio & Creative Works",
      paragraph:
        "A curated selection of web, mobile, and design projects that reflect our versatility—from agile small-business solutions to enterprise-grade digital platforms. Our work emphasizes clean design, robust engineering, and user-centric experiences across every build.",
      features: [
        "Responsive, mobile-first websites",
        "E-commerce platforms & custom storefronts",
        "Brand identity, UI & UX design systems",
        "Seamless cross-platform compatibility",
        "Performance-optimized, scalable builds",
        "Modern technology stacks with built-in SEO optimization"
      ],
      caseStudy: "/project/1"
    },
    valueAddition: [
      {
        id: "1",
        text: "Presented the individual’s skills, experience, and achievements through a clear and well-structured portfolio layout, making it easy for visitors to quickly understand their professional profile."
      },
      {
        id: "2",
        text: "Designed a responsive and visually consistent interface that reflects the individual’s personal brand while ensuring accessibility across devices and screen sizes."
      },
      {
        id: "3",
        text: "Highlighted key projects, expertise, and career milestones in a concise and engaging format, helping the individual stand out to recruiters, clients, and collaborators."
      },
      {
        id: "4",
        text: "Optimized the portfolio for performance and search visibility, improving loading speed and discoverability while maintaining a clean, modern user experience."
      }
    ]
  },
  {
    title: "Tipy – Intelligent Textile CAD Software for Precision Manufacturing",
    image: tipyImg,
    link: "#",
    overview: {
      headline: "Textile Design & Production Management Tool",
      paragraph: "Explore how we engineered a high-performance CAD solution. Built an intelligent CAD-driven production system to design fabrics, calculate yarn requirements, track manufacturing stages, and manage orders with complete production visibility.",
      features: [
        "Fabric design visualization",
        "Warp & weft configuration control",
        "Automated yarn and material calculations",
        "Stage-wise production tracking",
        "Wastage monitoring & yarn returns",
        "Integrated order management & invoicing"
      ],
      caseStudy: "/project/1"
    },
    valueAddition: [
      {
        id: "1",
        text: "Unified fabric design, yarn calculation, and production planning into a single CAD-driven platform."
      },
      {
        id: "2",
        text: "Automated yarn quantity and color-wise material calculations, eliminating manual estimation errors."
      },
      {
        id: "3",
        text: "Enabled real-time stage-wise production tracking with clear visibility across manufacturing workflows."
      },
      {
        id: "4",
        text: "Introduced systematic wastage recording and yarn return tracking at every production stage."
      },
      {
        id: "5",
        text: "Streamlined order execution by integrating design sheets, production status, and invoicing."
      },
      {
        id: "6",
        text: "Improved operational accuracy and delivery timelines through centralized data and process automation."
      }
    ]
  },
  {
    title: "JKK Tex – A Premium Shopping Website Crafted for Growing Businesses",
    image: mock3,
    link: "#",
    overview: {
      headline: "E-commerce & Inventory",
      paragraph: "Discover how we designed and developed a fully secure, feature-rich eCommerce platform. Implemented a fully secure and scalable e-commerce ecosystem with real-time inventory synchronization, seamless order tracking, and robust customer management to ensure smooth and efficient sales operations.",
      features: [
        "Full-featured e-commerce storefront",
        "Real-time inventory synchronization",
        "Order tracking and status management",
        "Secure online payment processing",
        "Real-time product and sales analytics",
        "Customer account and profile management"
      ],
      caseStudy: "/project/1"
    },
    valueAddition: [
      {
        id: "1",
        text: "Developed a centralized dashboard combining inventory, sales, and customer analytics to deliver real-time business insights."
      },
      {
        id: "2",
        text: "Automated supplier updates and stock alerts, reducing manual intervention and minimizing operational errors by 30%."
      },
      {
        id: "3",
        text: "Enabled seamless multi-device shopping experiences with persistent carts and a secure, streamlined payment flow."
      },
      {
        id: "4",
        text: "Leveraged predictive analytics to identify buying patterns and strengthen upsell and cross-sell strategies."
      },
      {
        id: "5",
        text: "Optimized the checkout journey, resulting in an 18% improvement in conversion rate within the first quarter after launch."
      },
      {
        id: "6",
        text: "Reduced customer support requests by integrating real-time order tracking and automated customer notifications."
      }
    ]
  }
];

// --- Platforms Data ---
export const platforms = [
  // Web Development
  {
    id: "web",
    title: "Web Development",
    price: 15000,
    icon: "FaGlobe",
    plans: [
      {
        id: "starter",
        title: "Standard Web",
        price: 5000,
        icon: "MdDiamond",
        availableDetails: [
          "5 Pages Responsive Website",
          "SEO Optimized Core",
          "Contact Form Integration",
          "Basic CMS Access"
        ]
      },
      {
        id: "growth",
        title: "Business Pro",
        price: 15000,
        icon: "MdStars",
        availableDetails: [
          "15 Pages Custom Design",
          "Advanced SEO & Analytics",
          "E-commerce Integration",
          "Custom Animations (Framer)"
        ]
      },
      {
        id: "premium",
        title: "Enterprise Web",
        price: 35000,
        icon: "MdWorkspacePremium",
        availableDetails: [
          "Unlimited Pages & Scalability",
          "Full Custom UI/UX Design",
          "Multi-language Support",
          "Dedicated 24/7 Support"
        ]
      }
    ]
  },
  // Software Development
  {
    id: "software",
    title: "Software Development",
    price: 25000,
    icon: "FaLaptopCode",
    plans: [
      {
        id: "mvp",
        title: "MVP Development",
        price: 10000,
        icon: "MdRocketLaunch",
        availableDetails: [
          "Core Functionality Build",
          "Single Platform Focus",
          "Basic Admin Dashboard",
          "3-Month Maintenance"
        ]
      },
      {
        id: "custom",
        title: "Custom SaaS",
        price: 35000,
        icon: "MdStars",
        availableDetails: [
          "Full Product Development",
          "Cloud Infrastructure Setup",
          "Third-party Integrations",
          "Scalable Architecture"
        ]
      },
      {
        id: "enterprise",
        title: "Enterprise Suite",
        price: 75000,
        icon: "MdWorkspacePremium",
        availableDetails: [
          "Complex Business Logic",
          "High-Level Security",
          "Multi-tenant Architecture",
          "Dedicated Dev Team"
        ]
      }
    ]
  },
  // App Development
  {
    id: "app",
    title: "App Development",
    price: 20000,
    icon: "FaMobileAlt",
    plans: [
      {
        id: "hybrid",
        title: "Hybrid Starter",
        price: 8000,
        icon: "MdRocketLaunch",
        availableDetails: [
          "Cross-platform Build (React)",
          "Push Notifications",
          "App Store Deployment",
          "Standard UI Components"
        ]
      },
      {
        id: "pro",
        title: "Pro Experience",
        price: 22000,
        icon: "MdStars",
        availableDetails: [
          "Advanced Animations",
          "Payment Gateway Integration",
          "Social Login Systems",
          "Performance Optimization"
        ]
      },
      {
        id: "native",
        title: "Full Native Suite",
        price: 45000,
        icon: "MdWorkspacePremium",
        availableDetails: [
          "Native Performance Focus",
          "Offline Functionality",
          "Complex Data Syncing",
          "Lifetime Priority Support"
        ]
      }
    ]
  },
  // Cyber Security
  {
    id: "cyber",
    title: "Cyber Security",
    price: 30000,
    icon: "FaShieldAlt",
    plans: [
      {
        id: "audit",
        title: "Security Audit",
        price: 5000,
        icon: "MdDiamond",
        availableDetails: [
          "Vulnerability Assessment",
          "Penetration Testing",
          "Compliance Checklist",
          "Actionable Report"
        ]
      },
      {
        id: "shield",
        title: "Threat Shield",
        price: 18000,
        icon: "MdStars",
        availableDetails: [
          "24/7 Active Monitoring",
          "Firewall Management",
          "End-point Protection",
          "Incident Response"
        ]
      },
      {
        id: "fortress",
        title: "Digital Fortress",
        price: 40000,
        icon: "MdWorkspacePremium",
        availableDetails: [
          "Zero Trust Architecture",
          "Advanced Encryption",
          "Disaster Recovery Plan",
          "Dedicated CISO Support"
        ]
      }
    ]
  },
  // Digital Marketing
  {
    id: "marketing",
    title: "Digital Marketing",
    price: 12000,
    icon: "FaBullhorn",
    plans: [
      {
        id: "visibility",
        title: "Brand Visibility",
        price: 4000,
        icon: "MdDiamond",
        availableDetails: [
          "Social Media Setup",
          "On-page SEO Audit",
          "Basic Content Calendar",
          "Monthly Reach Report"
        ]
      },
      {
        id: "growth",
        title: "Performance Growth",
        price: 12000,
        icon: "MdStars",
        availableDetails: [
          "Paid Ads Management",
          "Full SEO Execution",
          "Influencer Partnerships",
          "CRO Landing Pages"
        ]
      },
      {
        id: "authority",
        title: "Dominion Strategy",
        price: 25000,
        icon: "MdWorkspacePremium",
        availableDetails: [
          "Full Omni-channel Growth",
          "Global Ad Campaigns",
          "Premium Video Content",
          "AI-driven Analytics"
        ]
      }
    ]
  },
  // Sustainability
  {
    id: "sustainability",
    title: "Sustainability",
    price: 10000,
    icon: "FaLeaf",
    plans: [
      {
        id: "green",
        title: "Green Initiative",
        price: 2000,
        icon: "MdDiamond",
        availableDetails: [
          "Digital Carbon Audit",
          "Green Hosting Migration",
          "Impact Badge Integration",
          "CSR Reporting Support"
        ]
      },
      {
        id: "eco",
        title: "Eco-Optimization",
        price: 7000,
        icon: "MdStars",
        availableDetails: [
          "Smart Asset Delivery",
          "Clean Code Practices",
          "Energy Efficiency Plan",
          "Community Impact Projects"
        ]
      },
      {
        id: "regenerative",
        title: "Regenerative Core",
        price: 15000,
        icon: "MdWorkspacePremium",
        availableDetails: [
          "Circular Economy Strategy",
          "Net Zero Implementation",
          "Regenerative Tech Stack",
          "Sustainability Partner Status"
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
