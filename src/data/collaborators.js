import naveenImg from "../assets/team/Naveen.webp";
import hariImg from "../assets/team/balaji.webp";
import kaviImg from "../assets/team/ragavi.webp";
import jogarImg from "../assets/team/Satya.webp";

// Sample work portfolio image imports
import sampleProj1 from "../assets/project-cover/photo 1.webp";
import sampleProj2 from "../assets/project-cover/photo 2.webp";
import sampleProj3 from "../assets/project-cover/photo 3.webp";
import sampleProj4 from "../assets/project-cover/3d-studios.webp";
import sampleProj5 from "../assets/project-cover/AF (2).webp";
import sampleProj6 from "../assets/project-cover/Leaf world (3).webp";
import sampleProj7 from "../assets/project-cover/Nofa.webp";
import sampleProj8 from "../assets/project-cover/shipyon.webp";

export const COLLABORATORS_DATA = [
  {
    slug: "naveen",
    name: "Naveen",
    role: "Content Creator",
    category: "content-creators",
    categoryLabel: "Content Creator",
    image: naveenImg,
    shortDescription: "Creative content creator specializing in social media campaigns, branded content, product storytelling, and short-form video concepts.",
    bio: "Naveen is an experienced content creator working in partnership with DigitalX to deliver engaging social media stories, high-converting video concepts, and brand storytelling. Through DigitalX's production pipeline, Naveen helps brands connect authentically with their audiences through creative visual concepts, product showcases, and viral Reels.",
    experience: "3+ Years",
    availability: "Available for selected projects",
    skills: [
      "Social Media Content",
      "Reels",
      "Product Content",
      "Brand Storytelling",
      "Creative Campaigns"
    ],
    services: [
      "Social Media Video Strategy",
      "Brand Storytelling Reels",
      "Product Demonstration Shorts",
      "Campaign Concept & Scripting"
    ],
    portfolio: [
      { id: 1, title: "Branded Reel Campaign", category: "Social Media", image: sampleProj1 },
      { id: 2, title: "Product Storytelling Shoot", category: "Content", image: sampleProj2 },
      { id: 3, title: "Lifestyle Short Film", category: "Reels", image: sampleProj3 }
    ]
  },
  {
    slug: "hari",
    name: "Hari",
    role: "Video Editor",
    category: "video-editors",
    categoryLabel: "Video Editor",
    image: hariImg,
    shortDescription: "Video editor focused on polished short-form and long-form content for brands, campaigns, social media, and promotional videos.",
    bio: "Hari is a high-precision video editing specialist collaborating with DigitalX on brand media production. With expertise in motion graphics, color grading, and dynamic fast-paced cuts, Hari transforms raw footage into cinematic brand stories that drive viewer retention and high engagement.",
    experience: "4+ Years",
    availability: "Available for selected projects",
    skills: [
      "Video Editing",
      "Reels",
      "Promotional Videos",
      "Motion Graphics",
      "Color Correction"
    ],
    services: [
      "Commercial & Promo Video Editing",
      "Short-Form Reel & TikTok Editing",
      "Motion Graphics & Title Animations",
      "Color Grading & Audio Mixing"
    ],
    portfolio: [
      { id: 1, title: "Commercial Promo Cut", category: "Editing", image: sampleProj4 },
      { id: 2, title: "Motion Graphics Reel", category: "Animation", image: sampleProj5 },
      { id: 3, title: "Brand Identity Film", category: "Production", image: sampleProj6 }
    ]
  },
  {
    slug: "kavi",
    name: "Kavi",
    role: "Model",
    category: "models",
    categoryLabel: "Model",
    image: kaviImg,
    shortDescription: "Professional model available for fashion, lifestyle, product, promotional, and brand campaign shoots.",
    bio: "Kavi is a versatile commercial and fashion model represented in DigitalX's collaborator network. Kavi works alongside DigitalX's creative directors and photography team for brand lookbooks, e-commerce product shoots, lifestyle commercials, and promotional digital campaigns.",
    experience: "2+ Years",
    availability: "Available for selected projects",
    skills: [
      "Fashion",
      "Lifestyle",
      "Product Shoots",
      "Brand Campaigns",
      "Promotional Content"
    ],
    services: [
      "Fashion & E-commerce Lookbooks",
      "Lifestyle Brand Photography",
      "Product Commercial Shoots",
      "Promotional Video Modeling"
    ],
    portfolio: [
      { id: 1, title: "Apparel Brand Campaign", category: "Fashion", image: sampleProj7 },
      { id: 2, title: "Lifestyle Commercial Shoot", category: "Lifestyle", image: sampleProj8 },
      { id: 3, title: "Product Showcase Shoot", category: "E-Commerce", image: sampleProj1 }
    ]
  },
  {
    slug: "jogar",
    name: "Jogar",
    role: "Freelance Creative Specialist",
    category: "freelancers",
    categoryLabel: "Creative Specialist",
    image: jogarImg,
    shortDescription: "Independent creative professional supporting brands with flexible project-based creative and digital production requirements.",
    bio: "Jogar is a multidisciplinary creative specialist partner supporting DigitalX on high-impact digital design and campaign productions. Bringing versatile skills across creative direction, digital asset creation, and campaign support, Jogar enables agile execution for complex client projects.",
    experience: "3+ Years",
    availability: "Available for selected projects",
    skills: [
      "Creative Support",
      "Campaign Assistance",
      "Digital Projects",
      "Production Support",
      "Brand Projects"
    ],
    services: [
      "Multidisciplinary Creative Direction",
      "Digital Production Assistance",
      "Special Campaign Execution",
      "Brand Asset Strategy"
    ],
    portfolio: [
      { id: 1, title: "Digital Campaign Suite", category: "Creative", image: sampleProj2 },
      { id: 2, title: "Brand Identity System", category: "Branding", image: sampleProj4 },
      { id: 3, title: "Interactive Media Assets", category: "Production", image: sampleProj6 }
    ]
  },
  {
    slug: "rohan",
    name: "Rohan",
    role: "Digital Influencer & Key Opinion Leader",
    category: "influencers",
    categoryLabel: "Influencer",
    image: sampleProj1,
    shortDescription: "Lifestyle & tech influencer driving authentic audience engagement, brand partnerships, and promotional campaigns.",
    bio: "Rohan collaborates with DigitalX to deliver high-converting influencer campaigns, sponsored content, and brand ambassadorships across major digital platforms.",
    experience: "4+ Years",
    availability: "Available for selected projects",
    skills: [
      "Brand Partnerships",
      "Influencer Campaigns",
      "Sponsored Content",
      "Audience Engagement",
      "Social Media Reach"
    ],
    services: [
      "Influencer Brand Integration",
      "Product Placement Reels",
      "Social Media Takeovers",
      "Sponsored Campaign Shoots"
    ],
    portfolio: [
      { id: 1, title: "Tech Brand Takeover", category: "Influencer", image: sampleProj1 },
      { id: 2, title: "Lifestyle Product Launch", category: "Campaign", image: sampleProj3 }
    ]
  },
  {
    slug: "siddharth",
    name: "Siddharth",
    role: "Executive Producer & Strategy Director",
    category: "executives",
    categoryLabel: "Executive",
    image: sampleProj4,
    shortDescription: "Senior executive director overseeing high-value media production, creative direction, and campaign strategy.",
    bio: "Siddharth brings executive-level strategic leadership to complex brand productions, managing creative teams and enterprise campaign execution.",
    experience: "8+ Years",
    availability: "Available for selected projects",
    skills: [
      "Executive Direction",
      "Production Leadership",
      "Brand Strategy",
      "Enterprise Campaigns"
    ],
    services: [
      "Executive Production Management",
      "High-Value Campaign Strategy",
      "Creative Team Direction"
    ],
    portfolio: [
      { id: 1, title: "Enterprise Rebrand Film", category: "Production", image: sampleProj5 },
      { id: 2, title: "Global Campaign Strategy", category: "Strategy", image: sampleProj7 }
    ]
  },
  {
    slug: "ananya",
    name: "Ananya",
    role: "SEO & Growth Marketing Expert",
    category: "experts",
    categoryLabel: "Specialist & Expert",
    image: sampleProj6,
    shortDescription: "Specialist in technical SEO, performance marketing analytics, and conversion rate optimization.",
    bio: "Ananya works with DigitalX as a growth specialist, helping brands maximize organic visibility, search rankings, and paid campaign performance.",
    experience: "5+ Years",
    availability: "Available for selected projects",
    skills: [
      "Technical SEO",
      "Growth Marketing",
      "Conversion Optimization",
      "Analytics & Insights"
    ],
    services: [
      "Advanced SEO Audits & Execution",
      "Performance Funnel Optimization",
      "Search Engine Marketing Strategy"
    ],
    portfolio: [
      { id: 1, title: "Organic Growth Case Study", category: "SEO", image: sampleProj8 },
      { id: 2, title: "Conversion Funnel Scale", category: "Growth", image: sampleProj2 }
    ]
  }
];

export const getCollaboratorBySlug = (slug) => {
  if (!slug) return null;
  return COLLABORATORS_DATA.find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase()
  );
};
