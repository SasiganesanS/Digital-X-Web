import React from "react";
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
  CheckCircle2
} from "lucide-react";
import HeroLayout from "../common/HeroLayout";
import SectionBadge from "../common/SectionBadge";
import BrandX from "../common/BrandX";
import LegalSpaceBackground from "./LegalSpaceBackground";

const PrivacyPolicy = () => {
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
          <span className="text-xs font-extrabold text-[#111111] uppercase tracking-wider">Data Protection</span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#111111] bg-neutral-100 px-2.5 py-1 rounded-xl border border-neutral-200/80">
          Active Security
        </span>
      </div>

      {/* Feature Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
          <div className="flex items-center gap-2 mb-1 text-[#111111]">
            <Lock className="w-4 h-4" />
            <span className="text-xs font-black text-[#111111]">256-Bit SSL</span>
          </div>
          <p className="text-[11px] text-neutral-600 font-medium leading-snug">Bank-grade data encryption in transit.</p>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
          <div className="flex items-center gap-2 mb-1 text-[#111111]">
            <UserCheck className="w-4 h-4" />
            <span className="text-xs font-black text-[#111111]">Zero Data Sale</span>
          </div>
          <p className="text-[11px] text-neutral-600 font-medium leading-snug">We never sell or lease user records.</p>
        </div>
      </div>

      {/* Compliance Seal */}
      <div className="p-3.5 rounded-xl bg-[#111111] text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-white" />
          <div>
            <div className="text-xs font-black">GDPR & DPDP Framework</div>
            <div className="text-[10px] text-neutral-400 font-medium">Strict Privacy Protocol Verified</div>
          </div>
        </div>
        <Eye className="w-5 h-5 text-white shrink-0" />
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
            {/* Top Row: Vertically Centered Header & Data Protection Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
              {/* Left Column: Badge -> Heading -> Description */}
              <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                <div className="mb-4 flex justify-center lg:justify-start w-full">
                  <SectionBadge text="Legal & Transparency" theme="dark" />
                </div>
                
                <h1 className="text-white text-[36px] sm:text-[44px] lg:text-[52px] font-black leading-tight tracking-tight mb-4">
                  Privacy <span className="text-[#E31D2E]">Policy</span>
                </h1>

                <p className="text-neutral-300 text-base sm:text-lg font-medium leading-relaxed max-w-xl">
                  We value your trust and are committed to protecting your personal information. Read our transparent privacy standards.
                </p>
              </div>

              {/* Right Column: Hero Media Card */}
              <div className="lg:col-span-5 w-full flex justify-center lg:justify-end items-center pt-2 lg:pt-0">
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
              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center mb-3">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-[#111111] mb-1">256-Bit SSL Encryption</h3>
                <p className="text-xs text-neutral-600 font-medium leading-relaxed">All user communications and form submissions are encrypted in transit.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center mb-3">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-[#111111] mb-1">Zero Data Selling</h3>
                <p className="text-xs text-neutral-600 font-medium leading-relaxed">We never sell, rent, or trade client or visitor records with third parties.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center mb-3">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-[#111111] mb-1">Purpose-Driven Use</h3>
                <p className="text-xs text-neutral-600 font-medium leading-relaxed">Data collection is strictly limited to fulfilling requested digital services.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-[#111111] mb-1">Full Privacy Rights</h3>
                <p className="text-xs text-neutral-600 font-medium leading-relaxed">Request data exports, access logs, or permanent deletion anytime.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3 — DOCUMENT CONTENT */}
        <section className="legal-content w-full pb-16 lg:pb-24 pt-2 sm:pt-4">
          <div className="site-container max-w-4xl mx-auto w-full min-w-0">
            {/* Document Content Sections */}
            <div className="space-y-8 w-full min-w-0">

                {/* 1. Overview & Scope */}
                <motion.div
                  id="overview"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#111111]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
                      <span className="text-[#E31D2E]">1.</span> Overview & Scope
                    </h2>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                    <span className="font-inlander font-bold text-[#111111]">PRASKLA DIGITAL</span> <BrandX className="text-[1.65em] font-pdx text-[#E31D2E] inline-block translate-y-[0.08em] -ml-0.5" /> ("we", "us", "our") respects your privacy and is committed to protecting the personal information you share with us when visiting our website or using our digital agency services.
                  </p>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information across all interaction points, including our web applications, client portals, and communication channels.
                  </p>
                </motion.div>

                {/* 2. Information We Collect */}
                <motion.div
                  id="collection"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#111111]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center shrink-0">
                      <Database className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
                      <span className="text-[#E31D2E]">2.</span> Information We Collect
                    </h2>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                    We collect information that identifies or relates to you in the following circumstances:
                  </p>
                  <ul className="space-y-2.5 text-neutral-600 text-sm sm:text-base font-medium">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#111111] shrink-0 mt-1" />
                      <span><strong>Contact Information:</strong> Full name, professional email address, phone number, company name, and job title provided via our contact forms.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#111111] shrink-0 mt-1" />
                      <span><strong>Career Applications:</strong> Resumes, cover letters, portfolio links, and employment history submitted for open job roles.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#111111] shrink-0 mt-1" />
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
                  className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#111111]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center shrink-0">
                      <Eye className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
                      <span className="text-[#E31D2E]">3.</span> How We Use Your Data
                    </h2>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                    We use collected information solely for legitimate business purposes:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                      <h4 className="font-black text-sm text-[#111111] mb-1">Service Delivery</h4>
                      <p className="text-neutral-600 text-xs font-medium">Fulfilling service requests, proposals, project execution, and client communication.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                      <h4 className="font-black text-sm text-[#111111] mb-1">Platform Analytics</h4>
                      <p className="text-neutral-600 text-xs font-medium">Analyzing usage patterns to optimize user experience, performance, and accessibility.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                      <h4 className="font-black text-sm text-[#111111] mb-1">Recruitment</h4>
                      <p className="text-neutral-600 text-xs font-medium">Reviewing applicant qualifications and conducting interview processes.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                      <h4 className="font-black text-sm text-[#111111] mb-1">Legal Compliance</h4>
                      <p className="text-neutral-600 text-xs font-medium">Meeting regulatory requirements, accounting standards, and enforcing legal terms.</p>
                    </div>
                  </div>
                </motion.div>

                {/* 4. Data Sharing & Third-Parties */}
                <motion.div
                  id="sharing"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#111111]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center shrink-0">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
                      <span className="text-[#E31D2E]">4.</span> Data Sharing & Third-Parties
                    </h2>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                    We do not sell, rent, or trade your personal data to third parties. Data is shared only with trusted infrastructure providers bound by confidentiality obligations (e.g. cloud hosting, analytics services, email delivery endpoints).
                  </p>
                </motion.div>

                {/* 5. Security & Storage */}
                <motion.div
                  id="security"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#111111]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center shrink-0">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
                      <span className="text-[#E31D2E]">5.</span> Security & Retention
                    </h2>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                    We implement robust technical and organizational security measures, including 256-bit SSL encryption, restricted access protocols, and regular system monitoring to protect data against unauthorized access.
                  </p>
                </motion.div>

                {/* 6. Your Rights & Choices */}
                <motion.div
                  id="rights"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#111111]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center shrink-0">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
                      <span className="text-[#E31D2E]">6.</span> Your Rights & Choices
                    </h2>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                    Depending on your jurisdiction, you have the right to request access to, correction of, or deletion of your personal data held by us. You may also opt out of promotional communications at any time.
                  </p>
                </motion.div>

                {/* 7. Contact Us */}
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
                      <span className="text-[#E31D2E]">7.</span> Contact Our Privacy Team
                    </h2>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-4 font-medium">
                    For privacy queries, data access requests, or regulatory questions, reach us directly:
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

export default PrivacyPolicy;
