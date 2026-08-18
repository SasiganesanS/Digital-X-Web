import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Rich extended details for all 12 services in servicesData.js
 */
export const SERVICE_DETAILS_MAP = {
  "SEO": {
    categoryTag: "MARKETING",
    fullDesc: "Search Engine Optimization (SEO) boosts your digital presence by bringing your website to the top of Google search results. Our targeted approach drives high-intent organic traffic, builds Domain Authority, and turns search queries into paying customers.",
    features: [
      "Technical SEO & Core Web Vitals Optimization",
      "High-Intent Keyword Research & Competitor Analysis",
      "On-Page Content Optimization & Internal Linking",
      "Authority Backlink Acquisition & Digital PR",
      "Local SEO & Google Business Profile Management",
      "Monthly Ranking & Conversion Analytics Reports"
    ],
    highlights: ["Organic Traffic", "Keyword Ranking", "Technical Audit", "Local SEO"]
  },
  "SSM": {
    categoryTag: "SOCIAL MEDIA",
    fullDesc: "Social Media Management (SMM) establishes your brand authority across Instagram, Facebook, and LinkedIn. We curate high-converting content, design thumb-stopping visual assets, and actively engage your audience to turn followers into loyal brand advocates.",
    features: [
      "Custom Social Media Strategy & Content Calendars",
      "High-Impact Reel, Short & Graphic Creation",
      "24/7 Community Engagement & Comment Management",
      "Brand Voice Alignment & Hashtag Optimization",
      "Influencer Collaboration & Cross-Promotions",
      "Comprehensive Monthly Engagement Metrics"
    ],
    highlights: ["Content Strategy", "Reel Creation", "Community Growth", "Monthly Analytics"]
  },
  "ADS": {
    categoryTag: "PAID ACQUISITION",
    fullDesc: "Paid advertising delivers immediate, measurable, and scalable customer acquisition. We manage multi-channel PPC campaigns across Google, Meta, and LinkedIn with continuous A/B testing to ensure maximum Return on Ad Spend (ROAS).",
    features: [
      "Google Search, Shopping & Display Campaigns",
      "Meta (Facebook & Instagram) Retargeting Funnels",
      "High-Converting Ad Copywriting & Creative Design",
      "Real-Time Bid Optimization & ROAS Scaling",
      "Custom Conversion Tracking & Audience Pixel Setup",
      "Weekly Ad Performance Tuning & Scaling"
    ],
    highlights: ["Google Ads", "Meta Ads", "ROAS Scaling", "Lead Conversion"]
  },
  "Website Design": {
    categoryTag: "DEVELOPMENT & UI/UX",
    fullDesc: "Your website is your 24/7 digital storefront. We design modern, lightning-fast, and mobile-responsive websites with fluid animations and intuitive UI/UX that captivate visitors and convert them into sales.",
    features: [
      "Custom Responsive Web Architecture & UI/UX Design",
      "Mobile-First & High-Speed Performance Tuning",
      "SEO-Friendly Code Structure & Schema Markup",
      "Interactive Animations & Dynamic Micro-Interactions",
      "E-commerce & Custom CMS Integration",
      "End-to-End Security & SSL Certificate Configuration"
    ],
    highlights: ["Custom UI/UX", "Mobile First", "SEO Friendly", "High Speed"]
  },
  "Video Production": {
    categoryTag: "CREATIVE & MEDIA",
    fullDesc: "Video content drives higher engagement than any other medium. We produce cinematic brand stories, promo reels, motion graphics, and product showcases that convey your brand values with visual perfection.",
    features: [
      "Commercial & Brand Story Scripting & Shooting",
      "Motion Graphics, 2D/3D Animation & VFX",
      "High-Definition 4K Editing & Professional Color Grading",
      "Short-Form Video Production for Instagram Reels & TikTok",
      "Professional Voiceover & Sound Design Engineering",
      "Multi-Format Delivery for Web, Broadcast & Social"
    ],
    highlights: ["Brand Films", "Reels & Shorts", "Motion Graphics", "4K Editing"]
  },
  "Content Marketing": {
    categoryTag: "CONTENT STRATEGY",
    fullDesc: "Content is the engine of brand trust. We develop value-driven blogs, whitepapers, case studies, and infographics that position your leadership at the top of your industry and fuel your inbound lead pipeline.",
    features: [
      "SEO-Driven Blog Articles & Thought Leadership",
      "High-Converting Sales Copywriting & Landing Pages",
      "Visual Infographic & eBook Design",
      "Content Funnel Mapping & Distribution Strategy",
      "Email & Social Syndication Channels",
      "Content Audit & Performance Iteration"
    ],
    highlights: ["Blog Content", "Copywriting", "Infographics", "Content Funnels"]
  },
  "E-commerce Marketing": {
    categoryTag: "E-COMMERCE GROWTH",
    fullDesc: "Drive sustainable online store sales and repeat customer lifetime value. We optimize your e-commerce storefront, manage Google Shopping feeds, execute abandoned cart recovery, and scale paid acquisition.",
    features: [
      "Store Conversion Rate Optimization (CRO) Audits",
      "Google Shopping & Merchant Center Management",
      "Automated Cart Abandonment & Win-Back Email Sequences",
      "Product Page UX & Upsell Engine Optimization",
      "Cross-Channel Retargeting & Loyalty Programs",
      "ROAS & Lifetime Value (LTV) Performance Analytics"
    ],
    highlights: ["Store Sales", "Shopping Ads", "CRO Audit", "Retargeting"]
  },
  "Email Marketing": {
    categoryTag: "RETENTION & AUTOMATION",
    fullDesc: "Nurture relationships and maximize customer retention with automated, personalized email sequences. From welcome flows to promotional blasts, we deliver emails that land straight in the primary inbox.",
    features: [
      "Automated Nurture & Onboarding Email Workflows",
      "Bespoke HTML Newsletter Design & Copywriting",
      "Subscriber List Segmentation & Lifecycle Targeting",
      "Spam Filter & Deliverability Rate Optimization",
      "Subject Line A/B Testing & Open Rate Optimization",
      "Revenue Attribution & Conversion Tracking"
    ],
    highlights: ["Auto Sequences", "HTML Newsletters", "Segmentation", "High Open Rates"]
  },
  "Influencer Marketing": {
    categoryTag: "CREATOR NETWORK",
    fullDesc: "Amplify your brand message through trusted creators and industry authorities. We handle everything from vetting creators and negotiating rates to managing deliverables and tracking campaign ROI.",
    features: [
      "Creator Sourcing & Vetting (Micro, Macro & Celebrity)",
      "Campaign Concept Briefing & Creative Co-Creation",
      "Contract Negotiation, Rights & Compliance Management",
      "Multi-Platform Campaign Execution (IG, YouTube, TikTok)",
      "Promo Code & Affiliate Attribution Tracking",
      "Post-Campaign Reach & ROI Performance Audits"
    ],
    highlights: ["Creator Sourcing", "Campaign Briefs", "Brand Authority", "Viral Reach"]
  },
  "Performance Marketing": {
    categoryTag: "GROWTH & ROI",
    fullDesc: "Our high-precision performance marketing campaigns focus on one goal: measurable revenue growth. We analyze data continuously to allocate budget to high-yield channels and maximize ROI.",
    features: [
      "Full-Funnel Conversion Architecture & Ad Scaling",
      "Multi-Touch Attribution Modeling & Analytics",
      "Landing Page A/B Testing & Funnel Optimization",
      "Algorithmic Campaign Budget Allocation",
      "Real-Time CPA & CPL Cost Reduction Strategies",
      "Comprehensive Revenue & Lead Pipeline Dashboards"
    ],
    highlights: ["Data-Driven ROI", "Lead Generation", "Ad Scaling", "Funnel Analytics"]
  },
  "ORM": {
    categoryTag: "REPUTATION & TRUST",
    fullDesc: "Protect and elevate your online reputation. We monitor brand sentiment 24/7, remove/suppress negative search results, generate positive customer reviews, and build unshakeable market trust.",
    features: [
      "24/7 Brand Sentiment & Review Monitoring",
      "Negative Review Resolution & Crisis Mitigation",
      "Automated Positive Customer Review Campaigns",
      "Google Business Profile Rating Optimization",
      "Search Engine Result Page (SERP) Positive Cleanup",
      "Brand Reputation Trust Badging & Strategy"
    ],
    highlights: ["Review Management", "Brand Trust", "Positive Perception", "SERP Cleanup"]
  },
  "Analytics & Reporting": {
    categoryTag: "STRATEGY & DATA",
    fullDesc: "Unlock clear actionable insights from your marketing data. We build custom live dashboards that track conversions, user paths, and channel efficiency, empowering smarter business decisions.",
    features: [
      "Custom Live Analytics Dashboards (GA4, Looker Studio)",
      "Cross-Channel Conversion Funnel Mapping",
      "User Behavior, Heatmaps & Drop-off Diagnostics",
      "Attribution Modeling for Multi-Channel Campaigns",
      "Monthly Executive Strategy & ROI Briefings",
      "Data Governance & Privacy Compliance Audit"
    ],
    highlights: ["Live Dashboards", "Conversion Funnels", "Data Insights", "Monthly Reports"]
  }
};

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

  const details = SERVICE_DETAILS_MAP[service.title] || {
    categoryTag: "DIGITAL SERVICE",
    fullDesc: service.desc || "Comprehensive service tailored to elevate your business performance and digital presence.",
    features: [
      "Custom Strategy & Architecture Planning",
      "High-Performance Campaign Execution",
      "Dedicated Division Team Support",
      "Real-Time Data Analytics & Performance Reports",
      "Continuous Optimization & A/B Testing",
      "End-to-End Strategic Growth Roadmap"
    ],
    highlights: service.highlights || ["Strategy", "Growth", "Execution"]
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Backdrop Blur Overlay */}
          <div
            className="absolute inset-0 bg-black/65 backdrop-blur-lg"
            aria-hidden="true"
          />

          {/* Premium Service Modal Card */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-[2.5rem] bg-white border border-neutral-200/90 shadow-[0_30px_80px_rgba(0,0,0,0.4)] overflow-hidden z-10 text-[#111111]"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button — Top Right Positioned */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-neutral-100 border border-neutral-200 text-neutral-500 hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-all duration-300 shadow-sm cursor-pointer z-30 group"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable Modal Body */}
            <div className="p-6 sm:p-8 md:p-9 overflow-y-auto custom-scrollbar">
              
              {/* Header Hero Area — Icon & Service Title */}
              <div className="flex items-center gap-5 sm:gap-6 mb-7 pr-12 pt-1">
                {/* Icon Container */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-2 border border-neutral-200 bg-gradient-to-br from-[#111111] via-neutral-900 to-neutral-800 shadow-[0_8px_20px_rgba(0,0,0,0.25)] flex items-center justify-center overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center bg-[#E31D2E] text-white shadow-[0_2px_6px_rgba(0,0,0,0.3)] border border-white">
                    <span className="text-[9px] font-black">✓</span>
                  </div>
                </div>

                {/* Category Tag & Service Title */}
                <div className="flex flex-col items-start justify-center">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.22em] bg-[#E31D2E]/10 text-[#E31D2E] border border-[#E31D2E]/20 mb-2 inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E31D2E] animate-pulse" />
                    {details.categoryTag}
                  </span>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111111] leading-tight tracking-tight">
                    {service.title}
                  </h2>
                </div>
              </div>

              {/* Clean Divider Line */}
              <div className="w-full h-px bg-neutral-200/80 mb-7" />

              {/* Overview Section */}
              <div className="mb-7">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#E31D2E]" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#111111]">
                    Overview
                  </h3>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium pl-4 border-l-2 border-[#E31D2E]/30">
                  {details.fullDesc}
                </p>
              </div>

              {/* What We Deliver — Feature Cards Grid */}
              <div className="mb-7 bg-gradient-to-br from-neutral-50/90 via-neutral-50 to-white rounded-2xl p-5 sm:p-6 border border-neutral-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between mb-4 border-b border-neutral-200/80 pb-3">
                  <h3 className="text-xs font-black uppercase tracking-[0.18em] text-[#111111] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E31D2E]" />
                    What We Deliver
                  </h3>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E31D2E]/10 text-[#E31D2E]">
                    6 Core Capabilities
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {details.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-neutral-200/70 shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:border-[#E31D2E]/40 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-200"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#E31D2E] text-white flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5 shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                        ✓
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-neutral-800 leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights Pill Row */}
              {details.highlights && details.highlights.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-extrabold text-neutral-400 uppercase tracking-widest mr-1">
                    Key Pillars:
                  </span>
                  {details.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-neutral-100 hover:bg-[#E31D2E]/10 text-[#111111] hover:text-[#E31D2E] border border-neutral-200 hover:border-[#E31D2E]/20 transition-all duration-200 inline-flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E31D2E]" />
                      {highlight}
                    </span>
                  ))}
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
