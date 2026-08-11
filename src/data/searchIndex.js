import servicesData from "./servicesData";
import { projects } from "./projects";
import { blogPosts, clientData, contentData } from "../constants/index";
import { SERVICES_CONFIG } from "./pricingConfig";

export const jobListingsData = [
  {
    id: "job-1",
    title: "Jr. Video Editor / Motion Graphic Designer",
    description: "Bring our brand stories to life through compelling edits and motion graphics. Work on reels, brand videos, and campaign content.",
    department: "VISCOM",
    type: "Full-time",
    location: "On-site",
    keywords: ["video", "editor", "motion", "graphics", "viscom", "editing", "capcut", "premiere", "after effects"]
  },
  {
    id: "job-2",
    title: "React / Frontend Developer",
    description: "Build modern, high-performance web applications using React, Next.js, and modern frontend tools.",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    keywords: ["react", "frontend", "developer", "javascript", "tailwind", "typescript", "ui/ux", "web"]
  },
  {
    id: "job-3",
    title: "UI/UX & Product Designer",
    description: "Design intuitive user interfaces and experiences for web and mobile platforms. Craft design systems and prototypes.",
    department: "Design",
    type: "Full-time",
    location: "Remote",
    keywords: ["ui", "ux", "design", "figma", "product", "wireframing", "prototyping", "designer"]
  },
  {
    id: "job-4",
    title: "SEO & Performance Marketing Specialist",
    description: "Lead search engine optimization strategies, conduct technical SEO audits, and optimize organic performance.",
    department: "Marketing",
    type: "Full-time",
    location: "Hybrid",
    keywords: ["seo", "marketing", "google", "analytics", "keyword", "search", "semrush", "ahrefs"]
  },
  {
    id: "job-5",
    title: "Social Media Executive",
    description: "Manage social media channels, create engaging campaign posts, analyze engagement metrics, and track digital marketing trends.",
    department: "Marketing",
    type: "Internship",
    location: "Hybrid",
    keywords: ["social media", "smm", "marketing", "instagram", "canva", "content", "meta"]
  },
  {
    id: "job-6",
    title: "Client Acquisition Executive",
    description: "Drive new business growth by identifying, pitching, and onboarding clients. Build lasting relationships.",
    department: "Sales",
    type: "Full-time",
    location: "On-site",
    keywords: ["sales", "client", "acquisition", "crm", "lead generation", "outreach", "pitching"]
  },
  {
    id: "job-7",
    title: "Videography / Photography Specialist",
    description: "Capture high-quality photo and video content for brand shoots, events, and campaigns.",
    department: "VISCOM",
    type: "Full-time",
    location: "On-site",
    keywords: ["videography", "photography", "camera", "lightroom", "photoshop", "cinematography", "photoshoot"]
  },
  {
    id: "job-8",
    title: "Content Creator & Strategist",
    description: "Ideate and create engaging content for brand and client social channels, including short-form video and captions.",
    department: "Marketing",
    type: "Internship",
    location: "Hybrid",
    keywords: ["content", "creator", "strategist", "copywriting", "social", "reels"]
  }
];

export const searchIndex = [
  // --- Core Pages ---
  {
    id: "page-home",
    title: "Home - Praskla Digital X",
    category: "Pages",
    description: "Where Strategy Meets Creativity. Mindful Growth & Brand Scale with Data-Driven Digital Impact.",
    keywords: ["home", "praskla", "digital", "agency", "marketing", "branding", "web development"],
    target: "/",
    type: "page"
  },
  {
    id: "page-about",
    title: "About Us & Vision",
    category: "About",
    description: "We build powerful brand identities, data-driven marketing systems, and high-impact digital campaigns.",
    keywords: ["about", "story", "mission", "vision", "values", "praskla", "team", "growth"],
    target: "/about",
    type: "page"
  },
  {
    id: "page-services",
    title: "Services & Calculator",
    category: "Services",
    description: "Explore all our digital services and use our interactive Service Cost Calculator to estimate your project.",
    keywords: ["services", "calculator", "pricing", "packages", "quote", "cost", "digital marketing", "web design"],
    target: "/services",
    type: "page"
  },
  {
    id: "page-projects",
    title: "Our Projects & Work",
    category: "Projects",
    description: "A showcase of our digital solutions, web apps, e-commerce stores, CAD tools, and video production case studies.",
    keywords: ["projects", "portfolio", "case studies", "work", "clients", "results"],
    target: "/projects",
    type: "page"
  },
  {
    id: "page-careers",
    title: "Careers & Open Positions",
    category: "Careers",
    description: "Join the Praskla Digital X team. View current open roles in VISCOM, Engineering, Design, Sales, and Marketing.",
    keywords: ["careers", "jobs", "hiring", "positions", "openings", "work with us", "internships"],
    target: "/careers",
    type: "page"
  },
  {
    id: "page-contact",
    title: "Contact Us / Get in Touch",
    category: "Contact",
    description: "Connect with Praskla Digital X to discuss your project, request a consultation, or start a collaboration.",
    keywords: ["contact", "get in touch", "phone", "email", "office", "consultation", "talk"],
    target: "#contact",
    type: "contact"
  },
  {
    id: "page-blog",
    title: "Blog & Insights",
    category: "Blog",
    description: "Read articles, case studies, and market insights on digital scale, SEO, e-commerce, and software development.",
    keywords: ["blog", "articles", "insights", "news", "updates", "guides"],
    target: "/blog",
    type: "page"
  },

  // --- Services from servicesData.js ---
  ...(servicesData || []).map((svc, idx) => ({
    id: `service-data-${idx}`,
    title: svc.title,
    category: "Services",
    description: svc.desc,
    keywords: [
      svc.title.toLowerCase(),
      ...svc.title.toLowerCase().split(" "),
      "service",
      "digital marketing",
      "growth",
      "agency"
    ],
    target: `/services#${svc.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    type: "service"
  })),

  // --- Services from pricingConfig.js (Platforms & Pricing Pages) ---
  ...(SERVICES_CONFIG || []).map((svc) => ({
    id: `pricing-service-${svc.id}`,
    title: `${svc.title} Pricing & Plans`,
    category: "Services",
    description: svc.description,
    keywords: [
      svc.title.toLowerCase(),
      svc.id,
      "pricing",
      "plans",
      "package",
      ...(svc.packages || []).map((p) => p.title.toLowerCase())
    ],
    target:
      svc.id === "web"
        ? "/business-website-pricing"
        : svc.id === "software"
        ? "/software-development-pricing"
        : svc.id === "app"
        ? "/mobile-application-pricing"
        : svc.id === "marketing"
        ? "/digital-marketing-pricing"
        : svc.id === "cyber"
        ? "/cybersecurity-pricing"
        : "/sustainability-pricing",
    type: "service"
  })),

  // --- Combo Services ---
  {
    id: "combo-ecommerce-marketing",
    title: "E-Commerce & Digital Marketing Combo",
    category: "Services",
    description: "Combined e-commerce web platform build with high-intent digital marketing & ad campaigns.",
    keywords: ["ecommerce", "marketing", "combo", "package", "store", "ads"],
    target: "/ecommerce-marketing-combo",
    type: "service"
  },
  {
    id: "combo-software-marketing",
    title: "Software Development & Marketing Combo",
    category: "Services",
    description: "Custom software engineering bundled with growth marketing and user acquisition strategies.",
    keywords: ["software", "marketing", "combo", "engineering", "scale"],
    target: "/software-marketing-combo",
    type: "service"
  },
  {
    id: "combo-mobile-marketing",
    title: "Mobile App & Marketing Combo",
    category: "Services",
    description: "Full-stack mobile application development paired with App Store Optimization and launch campaigns.",
    keywords: ["mobile", "app", "marketing", "combo", "ios", "android"],
    target: "/mobile-marketing-combo",
    type: "service"
  },

  // --- Projects from projects.js ---
  ...(projects || []).map((proj) => ({
    id: `project-${proj.id}`,
    title: proj.title,
    category: "Projects",
    description: proj.overview?.paragraph || proj.description || "",
    keywords: [
      proj.slug || "",
      proj.title.toLowerCase(),
      ...(proj.services || []).map((s) => s.toLowerCase()),
      ...(proj.techStack || []).map((t) => t.toLowerCase()),
      ...(proj.tags ? proj.tags.toLowerCase().split(" ") : []),
      "project",
      "case study"
    ],
    target: `/case-study/${proj.id}`,
    type: "project"
  })),

  // --- Blog / Portfolio items from constants/index.js ---
  ...(blogPosts || []).map((post, idx) => ({
    id: `blog-post-${idx}`,
    title: post.title,
    category: "Projects",
    description: post.overview?.paragraph || "",
    keywords: [
      "portfolio",
      "work",
      "project",
      ...post.title.toLowerCase().split(" ")
    ],
    target: post.overview?.caseStudy || `/blog/${idx + 1}`,
    type: "project"
  })),

  // --- Team Members from Teams.jsx ---
  {
    id: "team-pranesh",
    title: "Pranesh Kumar Baskaran - Founder / CEO",
    category: "Team",
    description: "Committed to delivering quality-assured software solutions that generate sustainable value. Strategic vision & CEO.",
    keywords: ["pranesh", "founder", "ceo", "baskaran", "leadership", "team", "executive"],
    target: "/about#team",
    type: "team"
  },
  {
    id: "team-jaillesh",
    title: "Jaillesh Kathirvel - Business Head & Manager",
    category: "Team",
    description: "Drives business growth and client partnerships with precision and strategic execution.",
    keywords: ["jaillesh", "kathirvel", "business head", "manager", "leadership", "team"],
    target: "/about#team",
    type: "team"
  },
  {
    id: "team-naveen",
    title: "Naveen - Team Lead",
    category: "Team",
    description: "Leads technical & creative teams with a hands-on approach, balancing creative direction with operational discipline.",
    keywords: ["naveen", "team lead", "engineering", "leadership", "team"],
    target: "/about#team",
    type: "team"
  },

  // --- Job Listings ---
  ...jobListingsData.map((job) => ({
    id: job.id,
    title: job.title,
    category: "Careers",
    description: `${job.description} (${job.department} • ${job.type} • ${job.location})`,
    keywords: [
      "career",
      "job",
      "hiring",
      job.department.toLowerCase(),
      job.type.toLowerCase(),
      job.location.toLowerCase(),
      ...job.keywords
    ],
    target: `/careers#${job.id}`,
    type: "job"
  })),

  // --- Client Partners from constants/index.js ---
  ...(clientData || []).map((client, idx) => ({
    id: `client-${client.id || idx}`,
    title: `${client.name} (${client.year})`,
    category: "About",
    description: client.description,
    keywords: [client.name.toLowerCase(), client.year.toLowerCase(), "client", "partner"],
    target: "/about#clients",
    type: "page"
  })),

  // --- Content sections from constants/index.js ---
  ...(contentData || []).map((item, idx) => ({
    id: `content-${idx}`,
    title: item.title,
    category: "About",
    description: item.description,
    keywords: [item.title.toLowerCase(), "about", "sustainability", "germany", "next"],
    target: "/about",
    type: "page"
  })),

  // --- Legal Pages ---
  {
    id: "legal-privacy",
    title: "Privacy Policy",
    category: "Legal",
    description: "Read Praskla Digital X's data privacy policies, information handling, and data security terms.",
    keywords: ["privacy", "policy", "terms", "data", "security", "legal"],
    target: "/privacy-policy",
    type: "page"
  },
  {
    id: "legal-terms",
    title: "Terms and Conditions",
    category: "Legal",
    description: "Terms and conditions governing the use of Praskla Digital X services and website.",
    keywords: ["terms", "conditions", "legal", "agreement", "service"],
    target: "/terms-and-conditions",
    type: "page"
  },
  {
    id: "legal-cookie",
    title: "Cookie Policy",
    category: "Legal",
    description: "Learn about how cookies and tracking technologies are used on our website.",
    keywords: ["cookie", "cookies", "policy", "tracking", "legal"],
    target: "/cookie-policy",
    type: "page"
  }
];

/**
 * Intelligent Search Engine with Score-Based Ranking
 * Priorities:
 * 1. Exact title match (100 pts)
 * 2. Title starts with search term (80 pts)
 * 3. Title contains search term (60 pts)
 * 4. Keyword match (40-45 pts)
 * 5. Description match (20 pts)
 * 6. Category match (10 pts)
 */
export function performSearch(query) {
  if (!query || typeof query !== "string") return [];
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const tokens = q.split(/\s+/).filter(Boolean);

  const results = [];

  for (const item of searchIndex) {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const descLower = (item.description || "").toLowerCase();
    const catLower = (item.category || "").toLowerCase();
    const keywordsLower = (item.keywords || []).map((k) => (k ? k.toLowerCase() : ""));

    // 1. Exact title match
    if (titleLower === q) {
      score += 100;
    }
    // 2. Title starts with query
    else if (titleLower.startsWith(q)) {
      score += 80;
    }
    // 3. Title contains query
    else if (titleLower.includes(q)) {
      score += 60;
    }

    // 4. Keyword match
    const exactKeywordMatch = keywordsLower.some((k) => k === q);
    if (exactKeywordMatch) {
      score += 45;
    } else if (keywordsLower.some((k) => k && k.includes(q))) {
      score += 35;
    }

    // 5. Description match
    if (descLower.includes(q)) {
      score += 20;
    }

    // 6. Category match
    if (catLower.includes(q)) {
      score += 10;
    }

    // Multi-token boosting
    if (tokens.length > 1) {
      let tokenMatchCount = 0;
      for (const token of tokens) {
        if (
          titleLower.includes(token) ||
          descLower.includes(token) ||
          keywordsLower.some((k) => k && k.includes(token)) ||
          catLower.includes(token)
        ) {
          tokenMatchCount++;
        }
      }
      if (tokenMatchCount === tokens.length) {
        score += 25;
      } else if (tokenMatchCount > 0) {
        score += 5 * tokenMatchCount;
      }
    }

    if (score > 0) {
      results.push({ item, score });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results.map((r) => r.item);
}
