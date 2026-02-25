// src/data/projects.js

// Import your project images here
import honeybeeImg from "../assets/project-cover/honeybee1.jpeg";
import skillbridgeImg from "../assets/project-cover/skillBridge1.jpeg";
import tipyImg from "../assets/project-cover/tipy1.jpeg";

export const projects = [
  {
    id: 1,
    slug: "3d-studios",
    title: "3D Studios",
    description: "Event Photography & Videography studio",
    tags: "Post-Production + Social Media Strategy",
    result: "Reduced video delivery from 4 months to 5 days",
    image: tipyImg, // Reusing existing asset as placeholder
    bgColor: "bg-red-100",
    featuresLabel: "Features",
    featuresTitle: "Growth & Performance Highlights",
    techLabel: "Technologies",
    techTitle: "Powered by Creative & Performance Tools",
    techDesc: "Leveraging industry leading creative digital marketing platforms to deliver exceptional growth.",
    overview: {
      headline: "Transforming Event Media Production",
      paragraph: "3D Studios is a Germany-based event photography and videography company specializing in weddings, pre-wedding shoots, birthday functions, and milestone celebrations. We redefined their post-production workflow and digital presence by creating a structured editing pipeline and performance-driven social media strategy that drastically reduced delivery time and increased client acquisition.",
      challenges: [
        "Excessive post-production time — up to 4 months to deliver 2–3 hour event videos",
        "Manual, unstructured editing workflow causing backlog and delayed payments",
        "Limited content strategy for social media growth",
        "Missed opportunities in converting Instagram engagement into client inquiries",
      ],
      solutions: [
        "Built a structured content planning system before editing to streamline post-production",
        "Collaborated between content strategists, scriptwriters, and video editors for optimized storytelling",
        "Reduced full-length event video delivery timeline to just 5 days",
        "Developed high-performing Instagram reel strategy to boost visibility and generate direct leads",
      ],
    },
    features: [
      {
        id: 1,
        icon: "⚡",
        title: "Express Post-Production Workflow",
        description: "Structured editing pipeline that reduced 2–3 hour event video delivery from 4 months to just 5 days.",
      },
      {
        id: 2,
        icon: "📝",
        title: "Strategic Content Planning",
        description: "Pre-edit scripting and storytelling structure developed by content strategists to ensure cinematic clarity and faster execution.",
      },
      {
        id: 3,
        icon: "📱",
        title: "Instagram Growth Strategy",
        description: "High-impact reels designed to increase engagement, reach new audiences, and convert views into inquiries.",
      },
      {
        id: 4,
        icon: "🚀",
        title: "Rapid Turnaround System",
        description: "Optimized collaboration between planners, writers, and editors to eliminate backlog and improve delivery efficiency.",
      },
      {
        id: 5,
        icon: "💰",
        title: "Revenue Acceleration Model",
        description: "Faster project completion enabled quicker payments and higher monthly project intake.",
      },
      {
        id: 6,
        icon: "📈",
        title: "Lead-Driven Social Media Marketing",
        description: "Performance-focused content strategy that generated consistent client inquiries through organic Instagram reach.",
      },
    ],
    results: [
      {
        id: 1,
        metric: "24x Faster Delivery",
        text: "Reduced full-length event video delivery timeline from 4 months to just 5 days",
      },
      {
        id: 2,
        metric: "3x Increase in Client Inquiries",
        text: "Boosted Instagram-driven leads through strategic reel content and optimized posting",
      },
      {
        id: 3,
        metric: "40% Revenue Growth",
        text: "Faster turnaround enabled higher monthly project intake and quicker payment cycles",
      },
      {
        id: 4,
        metric: "90% Client Satisfaction Improvement",
        text: "Improved delivery speed, structured storytelling, and consistent communication enhanced overall client experience",
      },
    ],
    techStack: [
      "Adobe Premiere Pro",
      "Adobe After Effects",
      "Adobe Photoshop",
      "Instagram Creator Tools",
    ],
  },
  {
    id: 2,
    slug: "adhithya-fashions",
    title: "Adhithya Fashions",
    description: "Men’s Shirt Manufacturer, Wholesaler, and Retailer",
    tags: "Personal Branding + Digital Transformation",
    result: "4x Increase in Social Media Reach",
    image: honeybeeImg, // Placeholder
    bgColor: "bg-blue-100",
    featuresLabel: "Features",
    featuresTitle: "Brand Growth & Digital Expansion Highlights",
    techLabel: "Technologies",
    techTitle: "Powered by Creative & Marketing Tools",
    techDesc: "",
    overview: {
      headline: "Elevating a Legacy Brand Through Strategic Personal Branding",
      paragraph: "Adhithya Fashions is a leading men’s shirt manufacturer, wholesaler, and retailer based in Erode, Tamil Nadu. Despite strong offline credibility, the brand lacked a structured digital presence. DigitalX transformed Adhithya Fashions into a visible and authoritative men’s fashion brand through strategic personal branding, content marketing, and complete digital development.",
      challenges: [
        "Established offline presence but minimal digital identity",
        "No structured personal branding strategy",
        "Low Instagram reach and inconsistent content planning",
        "No optimized website or SEO framework",
        "Limited visibility on Google search and Maps",
      ],
      solutions: [
        "Built a strong personal branding roadmap highlighting manufacturing expertise and retail authority",
        "Executed professional in-store live shoots to showcase collections and craftsmanship",
        "Created reels, promotional posters, and engaging visual content",
        "Managed Instagram stories, engagement, and insight tracking",
        "Developed a professional website with SEO optimization",
        "Integrated and optimized Google Business Profile for improved local discovery",
      ],
    },
    features: [
      {
        id: 1,
        icon: "📸",
        title: "Professional Brand Shoots",
        description: "High-quality in-store shoots presenting products, environment, and brand personality.",
      },
      {
        id: 2,
        icon: "👔",
        title: "Personal Branding Execution",
        description: "Positioned the business and leadership as trusted names in men’s fashion manufacturing.",
      },
      {
        id: 3,
        icon: "📊",
        title: "Instagram Growth Management",
        description: "Strategic reels, daily stories, engagement tracking, and performance monitoring.",
      },
      {
        id: 4,
        icon: "🌐",
        title: "Website Development & SEO",
        description: "Search-optimized website designed to improve brand authority and online reach.",
      },
      {
        id: 5,
        icon: "📍",
        title: "Local SEO & Maps Integration",
        description: "Enhanced store discoverability and improved local customer acquisition.",
      },
      {
        id: 6,
        icon: "🎨",
        title: "Creative Campaign Design",
        description: "Designed branded posters and marketing creatives for digital promotions.",
      },
    ],
    results: [
      {
        id: 1,
        metric: "4x Increase in Social Media Reach",
        text: "Significant improvement in impressions and audience engagement",
      },
      {
        id: 2,
        metric: "Stronger Brand Recognition",
        text: "Recognized as a structured and premium men’s fashion brand in the local textile market",
      },
      {
        id: 3,
        metric: "Improved Search Visibility",
        text: "Better ranking and discoverability through SEO and Maps optimization",
      },
      {
        id: 4,
        metric: "Increase in Retail Footfall",
        text: "Digital visibility translated into more in-store visits",
      },
    ],
    techStack: ["Adobe Premiere Pro", "Adobe Photoshop", "Google Business Profile"],
  },
];
