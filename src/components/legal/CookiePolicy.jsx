import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Cookie,
  Layers,
  BarChart3,
  Sliders,
  Settings,
  ShieldCheck,
  Zap,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  FileText,
  CheckCircle2,
  Clock
} from "lucide-react";
import HeroLayout from "../common/HeroLayout";
import SectionBadge from "../common/SectionBadge";

const SECTIONS = [
  { id: "what", label: "1. What Are Cookies", icon: Cookie },
  { id: "types", label: "2. Types of Cookies We Use", icon: Layers },
  { id: "analytics", label: "3. Analytics & Third-Party", icon: BarChart3 },
  { id: "preferences", label: "4. Your Preferences", icon: Sliders },
  { id: "managing", label: "5. Managing & Disabling", icon: Settings },
  { id: "contact", label: "6. Questions & Contact", icon: Mail },
];

const CookiePolicy = () => {
  const [activeSection, setActiveSection] = useState("what");

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const media = (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-md p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-neutral-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.06)] space-y-4 relative overflow-hidden"
    >
      {/* Decorative Glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-black/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider">Tracking Controls</span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#111111] bg-black/5 px-2.5 py-1 rounded-full border border-black/15">
          User Consent
        </span>
      </div>

      {/* Feature Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60">
          <div className="flex items-center gap-2 mb-1 text-[#E31D2E]">
            <Cookie className="w-4 h-4" />
            <span className="text-xs font-black text-[#111111]">Essential Only</span>
          </div>
          <p className="text-[11px] text-neutral-500 leading-snug">Strictly functional session cookies.</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60">
          <div className="flex items-center gap-2 mb-1 text-[#E31D2E]">
            <Settings className="w-4 h-4" />
            <span className="text-xs font-black text-[#111111]">Preferences</span>
          </div>
          <p className="text-[11px] text-neutral-500 leading-snug">Full user opt-in control at any time.</p>
        </div>
      </div>

      {/* Compliance Seal */}
      <div className="p-3.5 rounded-2xl bg-[#111111] text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BarChart3 className="w-5 h-5 text-[#E31D2E]" />
          <div>
            <div className="text-xs font-bold">Transparent Analytics</div>
            <div className="text-[10px] text-neutral-400">No Aggressive Cross-Site Tracking</div>
          </div>
        </div>
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      </div>
    </motion.div>
  );

  return (
    <main className="w-full bg-transparent">
      {/* SECTION 1 — HERO */}
      <section className="legal-hero">
        <HeroLayout className="py-4 sm:py-6 lg:py-8">
          {/* Top Row: Standard Baseline Header & Tracking Controls Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Badge -> Heading -> Description -> Badges */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
              <div className="mb-4 flex justify-center lg:justify-start w-full">
                <SectionBadge text="Web Technology & Privacy" />
              </div>
              
              <h1 className="text-[#111111] text-[36px] sm:text-[44px] lg:text-[52px] font-black leading-tight tracking-tight mb-4">
                Cookie <span className="text-[#E31D2E]">Policy</span>
              </h1>

              <p className="text-[#575757] text-base sm:text-lg font-medium leading-relaxed mb-6 max-w-xl">
                Learn how PRASKLA DIGITAL X uses cookies and similar web technologies to enhance performance, analytics, and browsing security.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-neutral-500">
                <div className="flex items-center gap-1.5 bg-white border border-neutral-200 px-3.5 py-1.5 rounded-full shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-[#E31D2E]" />
                  <span>Last Updated: January 31, 2026</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white border border-neutral-200 px-3.5 py-1.5 rounded-full shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Transparent Tracking</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Tracking Card */}
            <div className="lg:col-span-5 w-full flex justify-center lg:justify-end items-start pt-2 lg:pt-0">
              {media}
            </div>
          </div>
        </HeroLayout>
      </section>

      {/* SECTION 2 — KEY PRINCIPLES / FEATURES */}
      <section className="legal-features w-full py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-neutral-200/80 shadow-xs hover:border-black/30 transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-black/5 border border-black/10 text-[#111111] flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#111111] mb-1">Essential Cookies</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">Core authentication, security tokens, and essential session states.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-neutral-200/80 shadow-xs hover:border-black/30 transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-black/5 border border-black/10 text-[#111111] flex items-center justify-center mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#111111] mb-1">Performance & Cache</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">Accelerates asset delivery, smooth animations, and fast page loads.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-neutral-200/80 shadow-xs hover:border-black/30 transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-black/5 border border-black/10 text-[#111111] flex items-center justify-center mb-3">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#111111] mb-1">Anonymized Telemetry</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">Aggregated traffic measurement without personal identity tracking.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-neutral-200/80 shadow-xs hover:border-black/30 transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-black/5 border border-black/10 text-[#111111] flex items-center justify-center mb-3">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#111111] mb-1">User Control</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">Opt-in or opt-out anytime through browser settings or policy controls.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 & 4 — LEGAL NAVIGATION & CONTENT */}
      <section className="legal-content w-full pb-16 lg:pb-24 pt-2 sm:pt-4">
        <div className="site-container max-w-4xl mx-auto w-full min-w-0">
          
          {/* Sticky Single-Row Horizontal Navigation Bar */}
          <div className="sticky top-24 z-30 bg-white/90 backdrop-blur-md border border-neutral-200/80 rounded-2xl p-2 shadow-xs mb-8 w-full min-w-0 relative group">
            <div className="w-full overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth">
              <div className="flex flex-nowrap items-center gap-2 w-max min-w-max px-1 py-1">
                {SECTIONS.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`flex-none shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                        isActive
                          ? "bg-[#E31D2E] text-white shadow-xs"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="whitespace-nowrap">{section.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Subtle Right-Side Gradient Fade Affordance */}
            <div className="absolute right-2 top-2 bottom-2 w-12 bg-gradient-to-l from-white via-white/40 to-transparent pointer-events-none rounded-r-xl" />
          </div>

          {/* Document Content Sections */}
          <div className="space-y-8 w-full min-w-0">

              {/* 1. What Are Cookies */}
              <motion.div
                id="what"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200/80 rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex items-center gap-3 text-[#FF2B2B]">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF2B2B]/5 flex items-center justify-center border border-[#FF2B2B]/20">
                    <Cookie className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111]">1. What Are Cookies?</h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Cookies are small text files placed on your computer or mobile device when you visit a website. They are widely used to make websites function efficiently, remember user preferences, and provide analytical data to website owners.
                </p>
              </motion.div>

              {/* 2. Types of Cookies We Use */}
              <motion.div
                id="types"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200/80 rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex items-center gap-3 text-[#FF2B2B]">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF2B2B]/5 flex items-center justify-center border border-[#FF2B2B]/20">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111]">2. Types of Cookies We Use</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60">
                    <h4 className="font-bold text-sm text-[#111111] mb-1">Essential Cookies</h4>
                    <p className="text-neutral-500 text-xs">Necessary for site navigation, security authentication, and service calculator functionality.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60">
                    <h4 className="font-bold text-sm text-[#111111] mb-1">Performance & Analytics</h4>
                    <p className="text-neutral-500 text-xs">Help us understand visitor engagement, page speeds, and popular services to refine site performance.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60">
                    <h4 className="font-bold text-sm text-[#111111] mb-1">Preference Cookies</h4>
                    <p className="text-neutral-500 text-xs">Remember user choices such as selected country code or interactive estimator filters.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60">
                    <h4 className="font-bold text-sm text-[#111111] mb-1">Marketing Cookies</h4>
                    <p className="text-neutral-500 text-xs">Used to deliver relevant campaign insights and optimize performance marketing attribution.</p>
                  </div>
                </div>
              </motion.div>

              {/* 3. Analytics & Third-Party Cookies */}
              <motion.div
                id="analytics"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200/80 rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex items-center gap-3 text-[#FF2B2B]">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF2B2B]/5 flex items-center justify-center border border-[#FF2B2B]/20">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111]">3. Third-Party Analytics Services</h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  We utilize privacy-focused analytics services like Google Analytics and Meta Pixel to collect anonymized website traffic data. Third-party providers operate under their own privacy policies.
                </p>
              </motion.div>

              {/* 4. Your Preferences */}
              <motion.div
                id="preferences"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200/80 rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex items-center gap-3 text-[#FF2B2B]">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF2B2B]/5 flex items-center justify-center border border-[#FF2B2B]/20">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111]">4. Your Preferences</h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  You have full control over your cookie settings. You can accept or decline non-essential cookies via your web browser settings.
                </p>
              </motion.div>

              {/* 5. Managing & Disabling */}
              <motion.div
                id="managing"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200/80 rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex items-center gap-3 text-[#FF2B2B]">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF2B2B]/5 flex items-center justify-center border border-[#FF2B2B]/20">
                    <Settings className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111]">5. Managing & Disabling Cookies</h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Most modern web browsers allow you to manage cookies in their preferences or settings panel:
                </p>
                <ul className="space-y-2 text-neutral-600 text-sm sm:text-base">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E31D2E] shrink-0" />
                    <span><strong>Google Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E31D2E] shrink-0" />
                    <span><strong>Apple Safari:</strong> Preferences → Privacy → Block all cookies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E31D2E] shrink-0" />
                    <span><strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</span>
                  </li>
                </ul>
              </motion.div>

              {/* 6. Questions & Contact */}
              <motion.div
                id="contact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200/80 rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex items-center gap-3 text-[#FF2B2B]">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF2B2B]/5 flex items-center justify-center border border-[#FF2B2B]/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111]">6. Contact Technical Support</h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-4">
                  For questions about our cookie policy or web data practices:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <a href="mailto:hello@praskla.com" className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 flex items-center gap-3 hover:border-black/30 transition-colors group">
                    <Mail className="w-5 h-5 text-[#E31D2E] shrink-0" />
                    <div>
                      <div className="text-xs text-neutral-400 font-semibold">Email Us</div>
                      <div className="text-xs sm:text-sm font-bold text-[#111111] truncate">hello@praskla.com</div>
                    </div>
                  </a>
                  <a href="tel:+919566880740" className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 flex items-center gap-3 hover:border-black/30 transition-colors group">
                    <Phone className="w-5 h-5 text-[#E31D2E] shrink-0" />
                    <div>
                      <div className="text-xs text-neutral-400 font-semibold">Call Us</div>
                      <div className="text-xs sm:text-sm font-bold text-[#111111]">+91 95668 80740</div>
                    </div>
                  </a>
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#E31D2E] shrink-0" />
                    <div>
                      <div className="text-xs text-neutral-400 font-semibold">Location</div>
                      <div className="text-xs sm:text-sm font-bold text-[#111111]">Tiruchengode, Namakkal, TN</div>
                    </div>
                  </div>
                </div>
              </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default CookiePolicy;
