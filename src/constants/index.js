import vishnu from "../assets/clients/School.webp";
import vilcet from "../assets/clients/VILCET.webp";
import jkk_tex from "../assets/clients/JKK-TEX.webp";
import thilaga from "../assets/clients/Thilaga-Impex.webp";
import capturever from "../assets/clients/Captureever.webp";

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
    desc: "We dive deep into market trends, audience behavior and brand positioning to uncover insights that power smarter, high-impact marketing decisions.",
    code: "RSD",
  },
  {
    title: "Design & Create",
    desc: "We create compelling content, visual stories and campaign creatives that align perfectly with your brand and truly connect with your audience.",
    code: "DSN",
  },
  {
    title: "Launch & Amplify",
    desc: "From social media to SEO and paid ads, we run strategic campaigns that expand your reach and turn attention into meaningful engagement.",
    code: "LCH",
  },
  {
    title: "Optimize & Scale",
    desc: "Through continuous analysis and optimization, we refine strategies and scale high-performing campaigns to enhance ROI and ensure sustained brand growth.",
    code: "OPT",
  },
];

import mock1 from "../assets/pricing/mock1.webp";
import mock2 from "../assets/pricing/mock2.webp";
import mock3 from "../assets/pricing/mock3.webp";
import mock4 from "../assets/pricing/mock4.webp";
import PHero1 from "../assets/P-Hero-1.webp";
import tipyImg from "../assets/tipy.webp";
import PHero3 from "../assets/P-Hero-3.webp";
import PHero4 from "../assets/P-Hero-4.webp";
import PHero5 from "../assets/P-Hero-5.webp";
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

import { SERVICES_CONFIG } from "../data/pricingConfig";

// --- Platforms Data (Single Source of Truth derived from pricingConfig.js) ---
export const platforms = SERVICES_CONFIG.map((service) => ({
  id: service.id,
  title: service.title,
  price: service.basePrice,
  icon:
    service.id === "marketing"
      ? "FaBullhorn"
      : service.id === "video"
      ? "FaVideo"
      : service.id === "web"
      ? "FaGlobe"
      : service.id === "software"
      ? "FaLaptopCode"
      : service.id === "app"
      ? "FaMobileAlt"
      : service.id === "cyber"
      ? "FaShieldAlt"
      : "FaLeaf",
  plans: service.packages.map((pkg) => ({
    id: pkg.id,
    title: pkg.title,
    price: pkg.price - service.basePrice > 0 ? pkg.price - service.basePrice : 0,
    flatPackagePrice: pkg.price,
    icon:
      pkg.id === "standard"
        ? "MdDiamond"
        : pkg.id === "business"
        ? "MdStars"
        : "MdWorkspacePremium",
    availableDetails: pkg.features,
  })),
}));
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

import vp from "../assets/clients/vp.webp";
import jkk from "../assets/clients/jkk.webp";
// Removed duplicate import of vilcet
import praskla from "../assets/py.webp";

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
    name: "Praskla Technology",
    description: "Feature-rich, high-conversion website built for business growth and impact",
    logo: praskla
  }
];
import germany from "../assets/germany.webp";
import sus from "../assets/sus.webp";
import web from "../assets/web.webp";

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
