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
 * Enhanced with official copywriting, headlines, capabilities, and goals.
 */
const servicesData = [
  {
    id: "01",
    image: seoImg,
    title: "Search Engine Optimization (SEO)",
    shortTitle: "SEO",
    category: "Organic Growth",
    headline: "Be found when your customers are searching.",
    desc: "We help your business rank higher on search engines, attract high-intent visitors, and drive organic growth.",
  },
  {
    id: "02",
    image: smmImg,
    title: "Social Media Management",
    shortTitle: "SMM — Social Media Marketing",
    category: "Social Growth",
    headline: "Turn social media into a growth engine.",
    desc: "We build engaging social strategies that make your brand visible, relatable, and memorable.",
  },
  {
    id: "03",
    image: adsImg,
    title: "Paid Advertising",
    shortTitle: "Paid Advertising",
    category: "Paid Growth",
    headline: "Put your brand in front of the right people.",
    desc: "We manage targeted ad campaigns designed to reach high-intent audiences and accelerate ROI.",
  },
  {
    id: "04",
    image: webDesignImg,
    title: "Website Design & Development",
    shortTitle: "Website Design & Development",
    category: "Digital Experience",
    headline: "Your website is your digital first impression. Make it count.",
    desc: "We build modern, conversion-focused websites that look stunning and perform seamlessly.",
  },
  {
    id: "05",
    image: contentImg,
    title: "Content Marketing",
    shortTitle: "Content Marketing",
    category: "Content Strategy",
    headline: "Content that earns attention—and builds trust.",
    desc: "We create strategic content that educates your audience, builds authority, and guides sales.",
  },
  {
    id: "06",
    image: videoProdImg,
    title: "Video Production & Editing",
    shortTitle: "Video Production",
    category: "Creative Production",
    headline: "Tell your story. Show your value. Make it unforgettable.",
    desc: "We produce captivating video content designed to capture attention and communicate your value.",
  },
  {
    id: "07",
    image: ecommerceImg,
    title: "E-commerce Growth Marketing",
    shortTitle: "E-Commerce Solutions",
    category: "Commerce Growth",
    headline: "Build an online store designed to sell.",
    desc: "We optimize storefront conversions to transform your online store into a high-revenue sales engine.",
  },
  {
    id: "08",
    image: emailImg,
    title: "Email & Lifecycle Marketing",
    shortTitle: "Email Marketing",
    category: "Lifecycle Marketing",
    headline: "Turn subscribers into repeat revenue.",
    desc: "Nurture customer retention with automated, personalized email sequences that land in primary inbox.",
  },
  {
    id: "09",
    image: influencerImg,
    title: "Influencer Partnerships",
    shortTitle: "Influencer Marketing",
    category: "Creator Partnerships",
    headline: "Amplify your brand with authentic creator voices.",
    desc: "Expand brand reach and build trust by pairing your products with aligned content creators.",
  },
  {
    id: "10",
    image: performanceImg,
    title: "Performance Marketing",
    shortTitle: "Performance Marketing",
    category: "Paid Growth",
    headline: "Scale customer acquisition with data precision.",
    desc: "Execute data-driven acquisition campaigns to generate qualified leads and accelerate scalable growth.",
  },
  {
    id: "11",
    image: ormImg,
    title: "Online Reputation Management",
    shortTitle: "ORM",
    category: "Brand Reputation",
    headline: "Protect and elevate your brand perception.",
    desc: "Protect and elevate your brand perception by monitoring online sentiment and managing reviews.",
  },
  {
    id: "12",
    image: analyticsImg,
    title: "Analytics & Business Intelligence",
    shortTitle: "Analytics & Reporting",
    category: "Insights",
    headline: "Turn raw data into actionable growth strategies.",
    desc: "Gain actionable clarity into user behavior and funnel performance with automated custom reporting.",
  },
];

export default servicesData;
