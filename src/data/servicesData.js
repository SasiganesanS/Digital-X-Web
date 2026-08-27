import seoImg from "../assets/services-img/SEO (2).webp";
import smmImg from "../assets/services-img/SMM (2).webp";
import adsImg from "../assets/services-img/ADS (2).webp";
import contentImg from "../assets/services-img/content marketing (2).webp";
import emailImg from "../assets/services-img/Email marketing (2).webp";
import videoProdImg from "../assets/services-img/video-production.svg";
import performanceImg from "../assets/services-img/performance-marketing.svg";
import webDesignImg from "../assets/services-img/web desigh.webp";
import ormImg from "../assets/services-img/ORM (2).webp";
import influencerImg from "../assets/services-img/influencer marketing (2).webp";
import analyticsImg from "../assets/services-img/Analytics & report.webp";
import ecommerceImg from "../assets/services-img/Ecommerce marketing (2).webp";

/**
 * Single source of truth for all services.
 * Enhanced with outcome-driven copywriting and industry-standard classifications.
 */
const servicesData = [
  {
    image: seoImg,
    title: "Search Engine Optimization (SEO)",
    category: "Organic Growth",
    desc: "Strengthen your search visibility through keyword strategy, technical optimization, local SEO, and content built to attract high-intent customers.",
  },
  {
    image: smmImg,
    title: "Social Media Management",
    category: "Social Growth",
    desc: "Build strong brand authority and engaged communities across platforms with structured content planning, reels, and active account management.",
  },
  {
    image: adsImg,
    title: "Paid Advertising",
    category: "Paid Growth",
    desc: "Drive targeted traffic and immediate inquiries with high-converting Meta and Google ad funnels built for maximum return on ad spend.",
  },
  {
    image: webDesignImg,
    title: "Website Design & Development",
    category: "Digital Experience",
    desc: "Craft responsive, high-converting digital storefronts and web applications engineered for seamless user experience, speed, and brand credibility.",
  },
  {
    image: videoProdImg,
    title: "Video Production & Editing",
    category: "Creative Production",
    desc: "From concept and production to editing and delivery, we create reels, advertisements, product videos, and brand films designed to capture attention and communicate your story.",
  },
  {
    image: contentImg,
    title: "Content Marketing",
    category: "Content Strategy",
    desc: "Engage and nurture your audience with strategic content, high-impact video scripts, and visual storytelling that establishes market leadership.",
  },
  {
    image: ecommerceImg,
    title: "E-commerce Growth Marketing",
    category: "Commerce Growth",
    desc: "Scale storefront revenue and customer lifetime value through funnel optimization, retargeting campaigns, and conversion-focused product merchandising.",
  },
  {
    image: emailImg,
    title: "Email & Lifecycle Marketing",
    category: "Lifecycle Marketing",
    desc: "Turn subscribers into repeat customers through targeted promotional campaigns, automated customer journeys, and performance tracking.",
  },
  {
    image: influencerImg,
    title: "Influencer Partnerships",
    category: "Creator Partnerships",
    desc: "Expand brand reach and build trust by pairing your products with aligned content creators and industry figures for authentic brand endorsement.",
  },
  {
    image: performanceImg,
    title: "Performance Marketing",
    category: "Paid Growth",
    desc: "Execute data-driven acquisition campaigns designed to generate qualified business leads, lower acquisition costs, and accelerate scalable growth.",
  },
  {
    image: ormImg,
    title: "Online Reputation Management",
    category: "Brand Reputation",
    desc: "Protect and elevate your brand perception by monitoring online sentiment, managing customer reviews, and highlighting positive brand stories.",
  },
  {
    image: analyticsImg,
    title: "Analytics & Business Intelligence",
    category: "Insights",
    desc: "Gain actionable clarity into user behavior, funnel drop-offs, and marketing performance with automated dashboards and custom reporting.",
  },
];

export default servicesData;
