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

  return (
    <div className="page-layout-wrapper">
      {/* Hero Section */}
      <HeroLayout
        badge={
          <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E31D2E]/20 bg-white/60 shadow-[0_8px_16px_rgba(17,17,17,0.03)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31D2E]" />
            </span>
            <span className="relative text-[#111111] text-xs font-bold tracking-[0.25em] uppercase">
              Legal & Transparency
            </span>
          </div>
        }
        title={
          <h1 className="text-[#111111] text-[36px] sm:text-[44px] lg:text-[52px] font-black leading-tight tracking-tight">
            Privacy <span className="text-[#E31D2E]">Policy</span>
          </h1>
        }
        description="We value your trust and are committed to protecting your personal information. Read our transparent privacy standards."
        actions={
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
        }
      />

      {/* Main Content Grid */}
      <section className="w-full pb-16 lg:pb-24">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Sticky Table of Contents Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
              <div className="bg-white border border-neutral-200/80 rounded-[28px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                <h3 className="text-[#111111] font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#E31D2E]" />
                  <span>Table of Contents</span>
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

              {/* Need Help Box */}
              <div className="bg-[#111111] text-white rounded-[28px] p-6 shadow-md relative overflow-hidden">
                <h4 className="font-bold text-base mb-1">Have Privacy Questions?</h4>
                <p className="text-neutral-400 text-xs leading-relaxed mb-4">
                  Our compliance team is ready to answer any questions regarding your personal data.
                </p>
                <a
                  href="mailto:hello@praskla.com"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#FF2B2B] hover:text-white transition-colors"
                >
                  <span>Contact Data Officer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Document Content Sections */}
            <div className="lg:col-span-8 space-y-8">

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
                  Praskla Digital X ("we", "us", "our") respects your privacy and is committed to protecting the personal information you share with us when visiting our website or using our digital agency services.
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
                  <a href="mailto:hello@praskla.com" className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 flex items-center gap-3 hover:border-[#E31D2E] transition-colors group">
                    <Mail className="w-5 h-5 text-[#E31D2E] shrink-0" />
                    <div>
                      <div className="text-xs text-neutral-400 font-semibold">Email Us</div>
                      <div className="text-xs sm:text-sm font-bold text-[#111111] truncate">hello@praskla.com</div>
                    </div>
                  </a>
                  <a href="tel:+919566880740" className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 flex items-center gap-3 hover:border-[#E31D2E] transition-colors group">
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
                      <div className="text-xs sm:text-sm font-bold text-[#111111]">Coimbatore, TN</div>
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

export default PrivacyPolicy;
