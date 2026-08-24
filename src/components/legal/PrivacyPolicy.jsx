import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  UserCheck,
  Globe,
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
import LegalSpaceBackground from "./LegalSpaceBackground";

const SECTIONS = [
  { id: "overview", label: "1. Overview & Scope", icon: ShieldCheck },
  { id: "collection", label: "2. Information We Collect", icon: Database },
  { id: "usage", label: "3. How We Use Data", icon: Eye },
  { id: "sharing", label: "4. Data Sharing & Third-Parties", icon: Globe },
  { id: "security", label: "5. Security & Storage", icon: Lock },
  { id: "rights", label: "6. Your Rights & Choices", icon: UserCheck },
  { id: "contact", label: "7. Contact Us", icon: Mail },
];

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("overview");

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
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider">Data Protection</span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          Active Security
        </span>
      </div>

      {/* Feature Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60">
          <div className="flex items-center gap-2 mb-1 text-emerald-600">
            <Lock className="w-4 h-4" />
            <span className="text-xs font-black text-[#111111]">256-Bit SSL</span>
          </div>
          <p className="text-[11px] text-neutral-500 leading-snug">Bank-grade data encryption in transit.</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60">
          <div className="flex items-center gap-2 mb-1 text-emerald-600">
            <UserCheck className="w-4 h-4" />
            <span className="text-xs font-black text-[#111111]">Zero Data Sale</span>
          </div>
          <p className="text-[11px] text-neutral-500 leading-snug">We never sell or lease user records.</p>
        </div>
      </div>

      {/* Compliance Seal */}
      <div className="p-3.5 rounded-2xl bg-[#111111] text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <div>
            <div className="text-xs font-bold">GDPR & DPDP Framework</div>
            <div className="text-[10px] text-neutral-400">Strict Privacy Protocol Verified</div>
          </div>
        </div>
        <Eye className="w-5 h-5 text-[#E31D2E] shrink-0" />
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
          <HeroLayout className="py-4 sm:py-6 lg:py-8">
            {/* Top Row: Standard Baseline Header & Data Protection Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Badge -> Heading -> Description -> Badges */}
              <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                <div className="mb-4 flex justify-center lg:justify-start w-full">
                  <SectionBadge text="Legal & Transparency" theme="dark" />
                </div>
                
                <h1 className="text-white text-[36px] sm:text-[44px] lg:text-[52px] font-black leading-tight tracking-tight mb-4">
                  Privacy <span className="text-[#E31D2E]">Policy</span>
                </h1>

                <p className="text-neutral-300 text-base sm:text-lg font-medium leading-relaxed mb-6 max-w-xl">
                  We value your trust and are committed to protecting your personal information. Read our transparent privacy standards.
                </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-neutral-500">
                <div className="flex items-center gap-1.5 bg-white border border-neutral-200 px-3.5 py-1.5 rounded-full shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-[#E31D2E]" />
                  <span>Last Updated: January 31, 2026</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white border border-neutral-200 px-3.5 py-1.5 rounded-full shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>GDPR & DPDP Compliant</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Media Card */}
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
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#111111] mb-1">256-Bit SSL Encryption</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">All user communications and form submissions are encrypted in transit.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-neutral-200/80 shadow-xs hover:border-black/30 transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#111111] mb-1">Zero Data Selling</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">We never sell, rent, or trade client or visitor records with third parties.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-neutral-200/80 shadow-xs hover:border-black/30 transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#111111] mb-1">Purpose-Driven Use</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">Data collection is strictly limited to fulfilling requested digital services.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-neutral-200/80 shadow-xs hover:border-black/30 transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#111111] mb-1">Full Privacy Rights</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">Request data exports, access logs, or permanent deletion anytime.</p>
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

              {/* 1. Overview & Scope */}
              <motion.div
                id="overview"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200/80 rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex items-center gap-3 text-[#FF2B2B]">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF2B2B]/5 flex items-center justify-center border border-[#FF2B2B]/20">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111]">1. Overview & Scope</h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  PRASKLA DIGITAL X ("we", "us", "our") respects your privacy and is committed to protecting the personal information you share with us when visiting our website or using our digital agency services.
                </p>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information across all interaction points, including our web applications, client portals, and communication channels.
                </p>
              </motion.div>

              {/* 2. Information We Collect */}
              <motion.div
                id="collection"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200/80 rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex items-center gap-3 text-[#FF2B2B]">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF2B2B]/5 flex items-center justify-center border border-[#FF2B2B]/20">
                    <Database className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111]">2. Information We Collect</h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  We collect information that identifies or relates to you in the following circumstances:
                </p>
                <ul className="space-y-2.5 text-neutral-600 text-sm sm:text-base">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E31D2E] shrink-0 mt-1" />
                    <span><strong>Contact Information:</strong> Full name, professional email address, phone number, company name, and job title provided via our contact forms.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E31D2E] shrink-0 mt-1" />
                    <span><strong>Career Applications:</strong> Resumes, cover letters, portfolio links, and employment history submitted for open job roles.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E31D2E] shrink-0 mt-1" />
                    <span><strong>Technical Data:</strong> IP address, browser type, operating system, referring URL, page views, and timestamps collected via analytics tools.</span>
                  </li>
                </ul>
              </motion.div>

              {/* 3. How We Use Data */}
              <motion.div
                id="usage"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200/80 rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex items-center gap-3 text-[#FF2B2B]">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF2B2B]/5 flex items-center justify-center border border-[#FF2B2B]/20">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111]">3. How We Use Your Data</h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  We use collected information solely for legitimate business purposes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60">
                    <h4 className="font-bold text-sm text-[#111111] mb-1">Service Delivery</h4>
                    <p className="text-neutral-500 text-xs">Fulfilling service requests, proposals, project execution, and client communication.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60">
                    <h4 className="font-bold text-sm text-[#111111] mb-1">Platform Analytics</h4>
                    <p className="text-neutral-500 text-xs">Analyzing usage patterns to optimize user experience, performance, and accessibility.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60">
                    <h4 className="font-bold text-sm text-[#111111] mb-1">Recruitment</h4>
                    <p className="text-neutral-500 text-xs">Reviewing applicant qualifications and conducting interview processes.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60">
                    <h4 className="font-bold text-sm text-[#111111] mb-1">Legal Compliance</h4>
                    <p className="text-neutral-500 text-xs">Meeting regulatory requirements, accounting standards, and enforcing legal terms.</p>
                  </div>
                </div>
              </motion.div>

              {/* 4. Data Sharing & Third-Parties */}
              <motion.div
                id="sharing"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200/80 rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex items-center gap-3 text-[#FF2B2B]">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF2B2B]/5 flex items-center justify-center border border-[#FF2B2B]/20">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111]">4. Data Sharing & Third-Parties</h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  We do not sell, rent, or trade your personal data to third parties. Data is shared only with trusted infrastructure providers bound by confidentiality obligations (e.g. cloud hosting, analytics services, email delivery endpoints).
                </p>
              </motion.div>

              {/* 5. Security & Storage */}
              <motion.div
                id="security"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200/80 rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex items-center gap-3 text-[#FF2B2B]">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF2B2B]/5 flex items-center justify-center border border-[#FF2B2B]/20">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111]">5. Security & Retention</h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  We implement robust technical and organizational security measures, including 256-bit SSL encryption, restricted access protocols, and regular system monitoring to protect data against unauthorized access.
                </p>
              </motion.div>

              {/* 6. Your Rights & Choices */}
              <motion.div
                id="rights"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200/80 rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex items-center gap-3 text-[#FF2B2B]">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF2B2B]/5 flex items-center justify-center border border-[#FF2B2B]/20">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111]">6. Your Rights & Choices</h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Depending on your jurisdiction, you have the right to request access to, correction of, or deletion of your personal data held by us. You may also opt out of promotional communications at any time.
                </p>
              </motion.div>

              {/* 7. Contact Us */}
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
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111]">7. Contact Our Privacy Team</h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-4">
                  For privacy queries, data access requests, or regulatory questions, reach us directly:
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
      </div>
    </div>
  );
};

export default PrivacyPolicy;
