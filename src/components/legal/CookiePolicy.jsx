import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Cookie,
  Layers,
  BarChart3,
  Sliders,
  Settings,
  Mail,
  Phone,
  MapPin,
  CheckCircle2
} from "lucide-react";
import HeroLayout from "../common/HeroLayout";
import SectionBadge from "../common/SectionBadge";
import LegalSpaceBackground from "./LegalSpaceBackground";

const CookiePolicy = () => {
  const media = (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-md p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-2xl space-y-4 relative overflow-hidden text-[#111111]"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E31D2E] animate-pulse" />
          <span className="text-xs font-extrabold text-[#111111] uppercase tracking-wider">Tracking Controls</span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#111111] bg-neutral-100 px-2.5 py-1 rounded-xl border border-neutral-200/80">
          User Consent
        </span>
      </div>

      {/* Feature Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
          <div className="flex items-center gap-2 mb-1 text-[#111111]">
            <Cookie className="w-4 h-4" />
            <span className="text-xs font-black text-[#111111]">Essential Only</span>
          </div>
          <p className="text-[11px] text-neutral-600 font-medium leading-snug">Strictly functional session cookies.</p>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
          <div className="flex items-center gap-2 mb-1 text-[#111111]">
            <Settings className="w-4 h-4" />
            <span className="text-xs font-black text-[#111111]">Preferences</span>
          </div>
          <p className="text-[11px] text-neutral-600 font-medium leading-snug">Full user opt-in control at any time.</p>
        </div>
      </div>

      {/* Compliance Seal */}
      <div className="p-3.5 rounded-xl bg-[#111111] text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <BarChart3 className="w-5 h-5 text-white" />
          <div>
            <div className="text-xs font-black">Transparent Analytics</div>
            <div className="text-[10px] text-neutral-400 font-medium">No Aggressive Cross-Site Tracking</div>
          </div>
        </div>
        <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
      </div>
    </motion.div>
  );

  return (
    <div className="relative w-full overflow-hidden bg-[#050609]">
      {/* Legal-scoped Continuous Parallax Mercury Space Environment */}
      <LegalSpaceBackground />

      {/* Main Content Sections */}
      <div className="relative z-10 w-full">
        {/* SECTION 1 — HERO */}
        <section className="legal-hero relative bg-transparent">
          <HeroLayout verticalCenter={true}>
            {/* Top Row: Vertically Centered Header & Media Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
              {/* Left Column: Badge -> Heading -> Description */}
              <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                <div className="mb-4 flex justify-center lg:justify-start w-full">
                  <SectionBadge text="Legal & Compliance" theme="dark" />
                </div>
                
                <h1 className="text-white text-[36px] sm:text-[44px] lg:text-[52px] font-black leading-tight tracking-tight mb-4">
                  Cookie <span className="text-[#E31D2E]">Policy</span>
                </h1>

                <p className="text-neutral-300 text-base sm:text-lg font-medium leading-relaxed max-w-xl">
                  Learn how Praskla DigitalX uses cookies and tracking technologies to enhance performance, security, and site functionality.
                </p>
              </div>

              {/* Right Column: Hero Media Card */}
              <div className="lg:col-span-5 w-full flex justify-center lg:justify-end items-center pt-2 lg:pt-0">
                {media}
              </div>
            </div>
          </HeroLayout>
        </section>

        {/* SECTION 2 — KEY HIGHLIGHTS */}
        <section className="legal-features w-full py-4 sm:py-6 lg:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center mb-3">
                  <Cookie className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-[#111111] mb-1">Essential Cookies</h3>
                <p className="text-xs text-neutral-600 font-medium leading-relaxed">Necessary for core site navigation, form security, and session state.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center mb-3">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-[#111111] mb-1">Performance Analytics</h3>
                <p className="text-xs text-neutral-600 font-medium leading-relaxed">Anonymous traffic insights to improve page speeds and user experience.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center mb-3">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-[#111111] mb-1">Functional Memory</h3>
                <p className="text-xs text-neutral-600 font-medium leading-relaxed">Remembers user preferences such as active filters and theme choices.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center mb-3">
                  <Settings className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-[#111111] mb-1">User Control</h3>
                <p className="text-xs text-neutral-600 font-medium leading-relaxed">Manage or disable cookies anytime via standard web browser settings.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3 — DOCUMENT CONTENT */}
        <section className="legal-content w-full pb-16 lg:pb-24 pt-2 sm:pt-4">
          <div className="site-container max-w-4xl mx-auto w-full min-w-0">
            {/* Document Content Sections */}
            <div className="space-y-8 w-full min-w-0">

                {/* 1. What Are Cookies */}
                <motion.div
                  id="what"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#111111]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center shrink-0">
                      <Cookie className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
                      <span className="text-[#E31D2E]">1.</span> What Are Cookies
                    </h2>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                    Cookies are small text files stored on your device when you visit a website. They allow the platform to remember your actions, preferences, and session state over time for smooth navigation.
                  </p>
                </motion.div>

                {/* 2. Types of Cookies We Use */}
                <motion.div
                  id="types"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#111111]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center shrink-0">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
                      <span className="text-[#E31D2E]">2.</span> Types of Cookies We Use
                    </h2>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                    We utilize the following categories of cookies:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                      <h4 className="font-black text-sm text-[#111111] mb-1">Strictly Necessary</h4>
                      <p className="text-neutral-600 text-xs font-medium">Essential for security, form validation, and session routing.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                      <h4 className="font-black text-sm text-[#111111] mb-1">Performance & Analytics</h4>
                      <p className="text-neutral-600 text-xs font-medium">Aggregated traffic data to measure page load speeds and visitor flows.</p>
                    </div>
                  </div>
                </motion.div>

                {/* 3. Analytics & Third-Party */}
                <motion.div
                  id="analytics"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#111111]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center shrink-0">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
                      <span className="text-[#E31D2E]">3.</span> Analytics & Third-Party Services
                    </h2>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                    We use trusted analytics tools (e.g. Google Analytics) to help us understand website performance. These providers process data anonymously and do not collect personally identifiable information without consent.
                  </p>
                </motion.div>

                {/* 4. Your Preferences */}
                <motion.div
                  id="preferences"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#111111]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center shrink-0">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
                      <span className="text-[#E31D2E]">4.</span> Your Preferences & Choices
                    </h2>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                    You can adjust your browser settings to decline or clear cookies at any time. Please note that disabling essential cookies may impact certain interactive features on our platform.
                  </p>
                </motion.div>

                {/* 5. Managing & Disabling */}
                <motion.div
                  id="managing"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#111111]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center shrink-0">
                      <Settings className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
                      <span className="text-[#E31D2E]">5.</span> Managing Browser Cookies
                    </h2>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                    Most modern browsers allow you to control cookies through their settings preferences (Chrome, Safari, Firefox, Edge). Consult your browser's help documentation to manage tracking preferences.
                  </p>
                </motion.div>

                {/* 6. Questions & Contact */}
                <motion.div
                  id="contact"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#111111]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
                      <span className="text-[#E31D2E]">6.</span> Questions & Contact
                    </h2>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-4 font-medium">
                    If you have any questions regarding our Cookie Policy or data practices, contact us:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <a href="mailto:hello@praskla.com" className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center gap-3 hover:border-black/30 transition-colors group">
                      <Mail className="w-5 h-5 text-[#111111] shrink-0" />
                      <div>
                        <div className="text-xs text-neutral-400 font-semibold">Email Us</div>
                        <div className="text-xs sm:text-sm font-bold text-[#111111] truncate">hello@praskla.com</div>
                      </div>
                    </a>
                    <a href="tel:+919566880740" className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center gap-3 hover:border-black/30 transition-colors group">
                      <Phone className="w-5 h-5 text-[#111111] shrink-0" />
                      <div>
                        <div className="text-xs text-neutral-400 font-semibold">Call Us</div>
                        <div className="text-xs sm:text-sm font-bold text-[#111111]">+91 95668 80740</div>
                      </div>
                    </a>
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-[#111111] shrink-0" />
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
      </div>
    </div>
  );
};

export default CookiePolicy;
