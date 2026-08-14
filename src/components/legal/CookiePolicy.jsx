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

  return (
    <div className="page-layout-wrapper">
      {/* Hero Section */}
      <HeroLayout
        badge={
          <SectionBadge text="Web Technology & Privacy" />
        }
        title={
          <h1 className="text-[#111111] text-[36px] sm:text-[44px] lg:text-[52px] font-black leading-tight tracking-tight">
            Cookie <span className="text-[#E31D2E]">Policy</span>
          </h1>
        }
        description="Learn how Praskla Digital X uses cookies and similar web technologies to enhance performance, analytics, and browsing security."
        actions={
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
        }
      />

      {/* Main Content Grid */}
      <section className="w-full pb-16 lg:pb-24">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Table of Contents */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
              <div className="bg-white border border-neutral-200/80 rounded-[28px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                <h3 className="text-[#111111] font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#E31D2E]" />
                  <span>Cookie Guide</span>
                </h3>
                <nav className="space-y-1">
                  {SECTIONS.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-3 ${isActive
                            ? "bg-[#E31D2E]/10 text-[#E31D2E] border border-[#E31D2E]/20"
                            : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                          }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#E31D2E]" : "text-neutral-400"}`} />
                        <span className="truncate">{section.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Box */}
              <div className="bg-[#111111] text-white rounded-[28px] p-6 shadow-md relative overflow-hidden">
                <h4 className="font-bold text-base mb-1">Cookie Preferences</h4>
                <p className="text-neutral-400 text-xs leading-relaxed mb-4">
                  You can modify your browser settings to accept or block cookies at any time.
                </p>
                <a
                  href="mailto:hello@praskla.com"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#FF2B2B] hover:text-white transition-colors"
                >
                  <span>Contact Tech Support</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Document Content Sections */}
            <div className="lg:col-span-8 space-y-8">

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
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;
