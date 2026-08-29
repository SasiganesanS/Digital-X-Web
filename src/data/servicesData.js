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
    desc: "We help your business rank higher on search engines, attract the right audience, and turn organic traffic into meaningful business opportunities. From keyword strategy and on-page optimization to technical SEO and authority building, we create a sustainable search presence that grows over time.",
  },
  {
    id: "02",
    image: smmImg,
    title: "Social Media Management",
    shortTitle: "SMM — Social Media Marketing",
    category: "Social Growth",
    headline: "Turn social media into a growth engine.",
    desc: "Your social media should do more than fill a feed. We build engaging social strategies that make your brand visible, relatable, and memorable while creating genuine connections with your audience.",
  },
  {
    id: "03",
    image: adsImg,
    title: "Paid Advertising",
    shortTitle: "Paid Advertising",
    category: "Paid Growth",
    headline: "Put your brand in front of the right people.",
    desc: "Great advertising isn't about spending more. It's about reaching the right audience with the right message at the right moment. We create and manage targeted advertising campaigns designed to generate awareness, leads, sales, and measurable business growth.",
  },
  {
    id: "04",
    image: webDesignImg,
    title: "Website Design & Development",
    shortTitle: "Website Design & Development",
    category: "Digital Experience",
    headline: "Your website is your digital first impression. Make it count.",
    desc: "We create modern, responsive, conversion-focused websites that don't just look beautiful—they work hard for your business. From user experience and visual design to development and conversion optimization, we build websites that communicate your value clearly.",
  },
  {
    id: "05",
    image: contentImg,
    title: "Content Marketing",
    shortTitle: "Content Marketing",
    category: "Content Strategy",
    headline: "Content that earns attention—and builds trust.",
    desc: "People don't buy from brands they don't understand or trust. We create strategic content that educates your audience, answers their questions, strengthens your authority, and moves potential customers closer to choosing you.",
  },
  {
    id: "06",
    image: videoProdImg,
    title: "Video Production & Editing",
    shortTitle: "Video Production",
    category: "Creative Production",
    headline: "Tell your story. Show your value. Make it unforgettable.",
    desc: "Video is one of the most powerful ways to communicate your brand. We create engaging video content designed to capture attention, communicate your message, and make your brand easier to remember—from concept to final edit.",
  },
  {
    id: "07",
    image: ecommerceImg,
    title: "E-commerce Growth Marketing",
    shortTitle: "E-Commerce Solutions",
    category: "Commerce Growth",
    headline: "Build an online store designed to sell.",
    desc: "A successful e-commerce business needs more than an attractive storefront. It needs a smooth customer journey, compelling product presentation, strong conversion strategy, and continuous optimization.",
  },
  {
    id: "08",
    image: emailImg,
    title: "Email & Lifecycle Marketing",
    shortTitle: "Email Marketing",
    category: "Lifecycle Marketing",
    headline: "Turn subscribers into repeat revenue.",
    desc: "Nurture relationships and maximize customer retention with automated, personalized email sequences. From welcome flows to promotional blasts, we deliver emails that land straight in the primary inbox.",
  },
  {
    id: "09",
    image: influencerImg,
    title: "Influencer Partnerships",
    shortTitle: "Influencer Marketing",
    category: "Creator Partnerships",
    headline: "Amplify your brand with authentic creator voices.",
    desc: "Expand brand reach and build trust by pairing your products with aligned content creators and industry figures for authentic brand endorsement.",
  },
  {
    id: "10",
    image: performanceImg,
    title: "Performance Marketing",
    shortTitle: "Performance Marketing",
    category: "Paid Growth",
    headline: "Scale customer acquisition with data precision.",
    desc: "Execute data-driven acquisition campaigns designed to generate qualified business leads, lower acquisition costs, and accelerate scalable growth.",
  },
  {
    id: "11",
    image: ormImg,
    title: "Online Reputation Management",
    shortTitle: "ORM",
    category: "Brand Reputation",
    headline: "Protect and elevate your brand perception.",
    desc: "Protect and elevate your brand perception by monitoring online sentiment, managing customer reviews, and highlighting positive brand stories.",
  },
  {
    id: "12",
    image: analyticsImg,
    title: "Analytics & Business Intelligence",
    shortTitle: "Analytics & Reporting",
    category: "Insights",
    headline: "Turn raw data into actionable growth strategies.",
    desc: "Gain actionable clarity into user behavior, funnel drop-offs, and marketing performance with automated dashboards and custom reporting.",
  },
];

export default servicesData;
