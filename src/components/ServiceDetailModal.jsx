import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Official extended details for all 12 services matching provided card designs.
 */
export const SERVICE_DETAILS_MAP = {
  // 01 SEO
  "SEO": {
    id: "01",
    cardTitle: "SEO",
    aliases: [
      "seo",
      "search engine optimization",
      "search engine optimization (seo)"
    ],
    categoryTag: "DIGITAL SERVICE",
    headline: "Be found when your customers are searching.",
    fullDesc: "We help your business rank higher on search engines, attract the right audience, and turn organic traffic into meaningful business opportunities. From keyword strategy and on-page optimization to technical SEO and authority building, we create a sustainable search presence that grows over time.",
    whatWeDo: "Keyword Research • On-Page SEO • Technical SEO • Local SEO • Content SEO • Link Building • SEO Audits • Search Performance Tracking",
    features: [
      "Keyword Research",
      "On-Page SEO",
      "Technical SEO",
      "Local SEO",
      "Content SEO",
      "Link Building",
      "SEO Audits",
      "Search Performance Tracking"
    ],
    goal: "More visibility. More qualified traffic. More opportunities."
  },

  // 02 SMM — Social Media Marketing
  "SMM": {
    id: "02",
    cardTitle: "SMM — Social Media Marketing",
    aliases: [
      "smm",
      "social media",
      "social media management",
      "social media marketing",
      "smm — social media marketing"
    ],
    categoryTag: "DIGITAL SERVICE",
    headline: "Turn social media into a growth engine.",
    fullDesc: "Your social media should do more than fill a feed. We build engaging social strategies that make your brand visible, relatable, and memorable while creating genuine connections with your audience.",
    whatWeDo: "Social Strategy • Content Creation • Post Design • Reels • Community Management • Hashtag Strategy • Social Campaigns • Performance Tracking",
    features: [
      "Social Strategy",
      "Content Creation",
      "Post Design",
      "Reels",
      "Community Management",
      "Hashtag Strategy",
      "Social Campaigns",
      "Performance Tracking"
    ],
    goal: "Build attention, engagement, and a loyal community around your brand."
  },

  // 03 Paid Advertising
  "Paid Advertising": {
    id: "03",
    cardTitle: "Paid Advertising",
    aliases: [
      "paid advertising",
      "ads",
      "paid ads",
      "google ads",
      "meta ads"
    ],
    categoryTag: "DIGITAL SERVICE",
    headline: "Put your brand in front of the right people.",
    fullDesc: "Great advertising isn't about spending more. It's about reaching the right audience with the right message at the right moment. We create and manage targeted advertising campaigns designed to generate awareness, leads, sales, and measurable business growth.",
    whatWeDo: "Google Ads • Meta Ads • Display Advertising • Search Campaigns • Remarketing • Lead Generation • Audience Targeting • Ad Creative",
    features: [
      "Google Ads",
      "Meta Ads",
      "Display Advertising",
      "Search Campaigns",
      "Remarketing",
      "Lead Generation",
      "Audience Targeting",
      "Ad Creative"
    ],
    goal: "Turn advertising budgets into measurable results."
  },

  // 04 Website Design & Development
  "Website Design & Development": {
    id: "04",
    cardTitle: "Website Design & Development",
    aliases: [
      "website design",
      "website design & development",
      "web design",
      "web development",
      "ui/ux design"
    ],
    categoryTag: "DIGITAL SERVICE",
    headline: "Your website is your digital first impression. Make it count.",
    fullDesc: "We create modern, responsive, conversion-focused websites that don't just look beautiful—they work hard for your business. From user experience and visual design to development and conversion optimization, we build websites that communicate your value clearly.",
    whatWeDo: "UI/UX Design • Business Websites • Landing Pages • Corporate Websites • Responsive Design • Conversion Optimization • Website Maintenance",
    features: [
      "UI/UX Design",
      "Business Websites",
      "Landing Pages",
      "Corporate Websites",
      "Responsive Design",
      "Conversion Optimization",
      "Website Maintenance"
    ],
    goal: "A website that looks credible, feels effortless, and converts visitors into customers."
  },

  // 05 Content Marketing
  "Content Marketing": {
    id: "05",
    cardTitle: "Content Marketing",
    aliases: [
      "content marketing",
      "content strategy",
      "blog content",
      "copywriting"
    ],
    categoryTag: "DIGITAL SERVICE",
    headline: "Content that earns attention—and builds trust.",
    fullDesc: "People don't buy from brands they don't understand or trust. We create strategic content that educates your audience, answers their questions, strengthens your authority, and moves potential customers closer to choosing you.",
    whatWeDo: "Blog Content • Website Copy • SEO Content • Social Content • Thought Leadership • Case Studies • Brand Storytelling",
    features: [
      "Blog Content",
      "Website Copy",
      "SEO Content",
      "Social Content",
      "Thought Leadership",
      "Case Studies",
      "Brand Storytelling"
    ],
    goal: "Turn ideas into content that attracts, engages, and converts."
  },

  // 06 Video Production & Editing
  "Video Production & Editing": {
    id: "06",
    cardTitle: "Video Production",
    aliases: [
      "video production",
      "video production & editing",
      "video editing",
      "reels",
      "video marketing"
    ],
    categoryTag: "DIGITAL SERVICE",
    headline: "Tell your story. Show your value. Make it unforgettable.",
    fullDesc: "Video is one of the most powerful ways to communicate your brand. We create engaging video content designed to capture attention, communicate your message, and make your brand easier to remember—from concept to final edit.",
    whatWeDo: "Brand Videos • Product Videos • Corporate Videos • Reels • Social Media Videos • Promotional Videos • Explainer Videos • Video Editing",
    features: [
      "Brand Videos",
      "Product Videos",
      "Corporate Videos",
      "Reels",
      "Social Media Videos",
      "Promotional Videos",
      "Explainer Videos",
      "Video Editing"
    ],
    goal: "Turn your message into visuals people want to watch and share."
  },

  // 07 E-commerce Growth Marketing
  "E-commerce Growth Marketing": {
    id: "07",
    cardTitle: "E-Commerce Solutions",
    aliases: [
      "e-commerce",
      "e-commerce growth marketing",
      "e-commerce solutions",
      "ecommerce marketing",
      "online store"
    ],
    categoryTag: "DIGITAL SERVICE",
    headline: "Build an online store designed to sell.",
    fullDesc: "A successful e-commerce business needs more than an attractive storefront. It needs a smooth customer journey, compelling product presentation, strong conversion strategy, and continuous optimization.",
    whatWeDo: "E-Commerce Website Design • Product Pages • Store Setup • Conversion Optimization • Payment Integration • Shopping Experience • Product Content • Analytics",
    features: [
      "E-Commerce Website Design",
      "Product Pages",
      "Store Setup",
      "Conversion Optimization",
      "Payment Integration",
      "Shopping Experience",
      "Product Content",
      "Analytics"
    ],
    goal: "More visitors becoming buyers—and more buyers becoming repeat customers."
  },

  // 08 Email & Lifecycle Marketing
  "Email & Lifecycle Marketing": {
    id: "08",
    cardTitle: "Email Marketing",
    aliases: [
      "email marketing",
      "email & lifecycle marketing",
      "email automation"
    ],
    categoryTag: "DIGITAL SERVICE",
    headline: "Turn subscribers into repeat revenue.",
    fullDesc: "Nurture relationships and maximize customer retention with automated, personalized email sequences. From welcome flows to promotional blasts, we deliver emails that land straight in the primary inbox.",
    whatWeDo: "Automated Sequences • HTML Newsletters • List Segmentation • Deliverability Optimization • A/B Testing • Revenue Attribution",
    features: [
      "Automated Sequences",
      "HTML Newsletters",
      "List Segmentation",
      "Deliverability Optimization",
      "A/B Testing",
      "Revenue Attribution"
    ],
    goal: "Turn casual readers into loyal, repeat customers."
  },

  // 09 Influencer Partnerships
  "Influencer Partnerships": {
    id: "09",
    cardTitle: "Influencer Partnerships",
    aliases: [
      "influencer partnerships",
      "influencer marketing",
      "creator networks"
    ],
    categoryTag: "DIGITAL SERVICE",
    headline: "Amplify your brand with authentic creator voices.",
    fullDesc: "Expand brand reach and build trust by pairing your products with aligned content creators and industry figures for authentic brand endorsement.",
    whatWeDo: "Creator Sourcing • Campaign Briefing • Contract & Rights • Multi-Platform Campaigns • Affiliate Tracking • ROI Audits",
    features: [
      "Creator Sourcing",
      "Campaign Briefing",
      "Contract & Rights",
      "Multi-Platform Campaigns",
      "Affiliate Tracking",
      "ROI Audits"
    ],
    goal: "Build trust and viral reach through creator endorsements."
  },

  // 10 Performance Marketing
  "Performance Marketing": {
    id: "10",
    cardTitle: "Performance Marketing",
    aliases: [
      "performance marketing",
      "growth marketing",
      "lead generation"
    ],
    categoryTag: "DIGITAL SERVICE",
    headline: "Scale customer acquisition with data precision.",
    fullDesc: "Execute data-driven acquisition campaigns designed to generate qualified business leads, lower acquisition costs, and accelerate scalable growth.",
    whatWeDo: "Full-Funnel Scaling • Multi-Touch Attribution • Landing Page Testing • Budget Allocation • CPA Reduction • Pipeline Dashboards",
    features: [
      "Full-Funnel Scaling",
      "Multi-Touch Attribution",
      "Landing Page Testing",
      "Budget Allocation",
      "CPA Reduction",
      "Pipeline Dashboards"
    ],
    goal: "Turn acquisition campaigns into predictable, scalable revenue."
  },

  // 11 Online Reputation Management
  "Online Reputation Management": {
    id: "11",
    cardTitle: "Online Reputation Management",
    aliases: [
      "online reputation management",
      "orm",
      "brand reputation"
    ],
    categoryTag: "DIGITAL SERVICE",
    headline: "Protect and elevate your brand perception.",
    fullDesc: "Protect and elevate your brand perception by monitoring online sentiment, managing customer reviews, and highlighting positive brand stories.",
    whatWeDo: "24/7 Sentiment Monitoring • Review Resolution • Customer Review Campaigns • Google Profile Rating • SERP Cleanup • Trust Badging",
    features: [
      "24/7 Sentiment Monitoring",
      "Review Resolution",
      "Customer Review Campaigns",
      "Google Profile Rating",
      "SERP Cleanup",
      "Trust Badging"
    ],
    goal: "Unshakeable brand credibility and positive search presence."
  },

  // 12 Analytics & Business Intelligence
  "Analytics & Business Intelligence": {
    id: "12",
    cardTitle: "Analytics & Business Intelligence",
    aliases: [
      "analytics & business intelligence",
      "analytics & reporting",
      "data analytics"
    ],
    categoryTag: "DIGITAL SERVICE",
    headline: "Turn raw data into actionable growth strategies.",
    fullDesc: "Gain actionable clarity into user behavior, funnel drop-offs, and marketing performance with automated dashboards and custom reporting.",
    whatWeDo: "GA4 & Looker Dashboards • Funnel Mapping • Heatmaps & Diagnostics • Attribution Modeling • Strategy Briefings • Data Audits",
    features: [
      "GA4 & Looker Dashboards",
      "Funnel Mapping",
      "Heatmaps & Diagnostics",
      "Attribution Modeling",
      "Strategy Briefings",
      "Data Audits"
    ],
    goal: "Complete clarity on marketing performance and customer journeys."
  }
};

/**
 * Bulletproof helper to retrieve details for any service object.
 */
export function getServiceDetails(service) {
  if (!service) return null;
  const rawTitle = (service.title || service.name || "").trim();
  const rawShort = (service.shortTitle || "").trim();
  const lowerTitle = rawTitle.toLowerCase();
  const lowerShort = rawShort.toLowerCase();

  for (const details of Object.values(SERVICE_DETAILS_MAP)) {
    if (
      details.aliases.some(
        (alias) =>
          lowerTitle === alias ||
          lowerShort === alias ||
          lowerTitle.includes(alias) ||
          alias.includes(lowerTitle)
      )
    ) {
      return details;
    }
  }

  return {
    id: service.id || "01",
    cardTitle: service.title || "SEO",
    categoryTag: "DIGITAL SERVICE",
    headline: service.headline || "Be found when your customers are searching.",
    fullDesc: service.desc || "Comprehensive service tailored to drive strategic growth and digital authority.",
    whatWeDo: "Custom Strategy • Architecture Planning • Performance Execution • Team Support • Analytics Reports",
    features: [
      "Custom Strategy",
      "Architecture Planning",
      "Performance Execution",
      "Team Support",
      "Analytics Reports"
    ],
    goal: "Measurable business growth and digital authority."
  };
}

export default function ServiceDetailModal({ service, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!service) return null;

  const details = getServiceDetails(service);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          {/* Backdrop Blur Overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Exact Card Design Container (Matching image card structure) */}
          <motion.div
            className="relative w-[96%] sm:w-full max-w-2xl flex flex-col rounded-xl bg-white border border-neutral-300 shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden z-10 text-[#111111] my-auto"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Black Header Bar */}
            <div className="bg-[#000000] text-white px-6 py-4 flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-4">
                <span className="text-xl sm:text-2xl font-black text-[#E31D2E] tracking-tight">
                  {details.id}
                </span>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  {details.cardTitle || service.title}
                </h2>
              </div>

              {/* Close Button (X) */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close card"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-white/10 border border-white/15 text-neutral-300 hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-sm cursor-pointer group"
              >
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Card Main Body */}
            <div className="p-6 sm:p-8 flex flex-col gap-5 text-left bg-white">
              {/* Red Headline */}
              {details.headline && (
                <h3 className="text-lg sm:text-xl font-bold text-[#E31D2E] leading-snug">
                  {details.headline}
                </h3>
              )}

              {/* Overview Description */}
              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                {details.fullDesc}
              </p>

              {/* WHAT WE DO Section */}
              <div className="flex flex-col gap-2 pt-1">
                <h4 className="text-xs font-black uppercase tracking-wider text-black">
                  WHAT WE DO
                </h4>
                {details.whatWeDo ? (
                  <p className="text-neutral-800 text-xs sm:text-sm font-medium leading-relaxed">
                    {details.whatWeDo}
                  </p>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    {details.features.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs sm:text-sm font-medium text-neutral-800"
                      >
                        {item} {idx < details.features.length - 1 && "• "}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* THE GOAL Section (Clean text format — No black banner!) */}
              {details.goal && (
                <div className="flex flex-col gap-1.5 pt-2 border-t border-neutral-100">
                  <h4 className="text-xs font-black uppercase tracking-wider text-black">
                    THE GOAL
                  </h4>
                  <p className="text-neutral-800 text-xs sm:text-sm font-medium leading-relaxed">
                    {details.goal}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
