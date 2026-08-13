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
 * Add a new service here → it automatically appears on the Home page AND Services page.
 */
const servicesData = [
  {
    image: seoImg,
    title: "SEO",
    desc: "SEO helps improve the website's visibility in search engines.",
  },
  {
    image: smmImg,
    title: "SSM",
    desc: "SSM (Social Media Management) is used to manage and grow social media presence.",
  },
  {
    image: adsImg,
    title: "ADS",
    desc: "ADS include platforms like Google, Facebook, and Instagram for promotions.",
  },
 
 
    {
    image: webDesignImg,
    title: "Website Design",
    desc: "Website design focuses on creating user-friendly and effective UI/UX websites.",
  },
   {
    image: videoProdImg,
    title: "Video Production",
    desc: "We enhance your images with professional editing. Whether you share your photos or require custom visuals, we ensure high-quality results that match your requirements.",
  },
  {
    image: contentImg,
    title: "Content Marketing",
    desc: "Content marketing involves creating and sharing valuable content like videos and blogs.",
  },
   {
    image: ecommerceImg,
    title: "E-commerce Marketing",
    desc: "E-commerce marketing focuses on promoting online stores and increasing sales.",
  },
  {
    image: emailImg,
    title: "Email Marketing",
    desc: "Email marketing is used to communicate offers, updates, and build customer relationships.",
  },
   {
    image: influencerImg,
    title: "Influencer Marketing",
    desc: "Influencer marketing is used to promote the brand through popular personalities.",
  },
   {
    image: performanceImg,
    title: "Performance Marketing",
    desc: "Our optimized campaigns are designed to increase brand visibility, generate quality leads, and drive measurable business growth.",
  },

  {
    image: ormImg,
    title: "ORM",
    desc: "ORM (Online Reputation Management) helps in managing brand ratings, reviews, and customer feedback.",
  },
 
  {
    image: analyticsImg,
    title: "Analytics & Reporting",
    desc: "Analytics and reporting help track performance and improve strategies.",
  },
  
 
];

export default servicesData;
