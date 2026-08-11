import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileCheck,
  Briefcase,
  Copyright,
  UserCheck,
  CreditCard,
  AlertTriangle,
  Scale,
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
  { id: "acceptance", label: "1. Acceptance of Terms", icon: FileCheck },
  { id: "services", label: "2. Services Scope", icon: Briefcase },
  { id: "ip", label: "3. Intellectual Property", icon: Copyright },
  { id: "responsibilities", label: "4. Client Obligations", icon: UserCheck },
  { id: "payments", label: "5. Payment & Billing", icon: CreditCard },
  { id: "liability", label: "6. Limitation of Liability", icon: AlertTriangle },
  { id: "governing", label: "7. Governing Law", icon: Scale },
];

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState("acceptance");

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
          <SectionBadge text="Terms of Agreement" />
        }
        title={
          <h1 className="text-[#111111] text-[36px] sm:text-[44px] lg:text-[52px] font-black leading-tight tracking-tight">
            Terms & <span className="text-[#E31D2E]">Conditions</span>
          </h1>
        }
        description="Review the agreement governing your use of Praskla Digital X website, applications, and professional digital services."
        actions={
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-neutral-500">
            <div className="flex items-center gap-1.5 bg-white border border-neutral-200 px-3.5 py-1.5 rounded-full shadow-xs">
              <Clock className="w-3.5 h-3.5 text-[#E31D2E]" />
              <span>Effective Date: January 31, 2026</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-neutral-200 px-3.5 py-1.5 rounded-full shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Binding Legal Agreement</span>
            </div>
          </div>
        }
      />

      {/* Main Content Grid */}
      <section className="w-full pb-16 lg:pb-24">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Sticky Sidebar Navigation */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
              <div className="bg-white border border-neutral-200/80 rounded-[28px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                <h3 className="text-[#111111] font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#E31D2E]" />
                  <span>Sections</span>
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
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#FF2B2B]" : "text-neutral-400"}`} />
                        <span className="truncate">{section.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Need Help Box */}
              <div className="bg-[#111111] text-white rounded-[28px] p-6 shadow-md relative overflow-hidden">
                <h4 className="font-bold text-base mb-1">Contract Inquiries?</h4>
                <p className="text-neutral-400 text-xs leading-relaxed mb-4">
                  For service agreements or legal contracts, contact our operations desk.
                </p>
                <a
                  href="mailto:hello@praskla.com"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#FF2B2B] hover:text-white transition-colors"
                >
                  <span>Contact Operations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Document Content Sections */}
            <div className="lg:col-span-8 space-y-8">

              {/* 1. Acceptance of Terms */}
              <motion.div
                id="acceptance"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200/80 rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex items-center gap-3 text-[#FF2B2B]">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF2B2B]/5 flex items-center justify-center border border-[#FF2B2B]/20">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111]">1. Acceptance of Terms</h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  By accessing, browsing, or utilizing the Praskla Digital X website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and our Privacy Policy.
                </p>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  If you are agreeing to these terms on behalf of a company or organization, you represent that you possess authority to bind such entity to these obligations.
                </p>
              </motion.div>

              {/* 2. Services Scope */}
              <motion.div
                id="services"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200/80 rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex items-center gap-3 text-[#FF2B2B]">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF2B2B]/5 flex items-center justify-center border border-[#FF2B2B]/20">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111]">2. Services Scope</h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Praskla Digital X offers digital agency solutions including UI/UX design, website development, performance marketing, search engine optimization (SEO), brand strategy, motion graphics, and software development.
                </p>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Specific deliverables, timelines, and pricing for client projects are defined in individual Master Service Agreements (MSA) or Statements of Work (SOW).
                </p>
              </motion.div>

              {/* 3. Intellectual Property */}
              <motion.div
                id="ip"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200/80 rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex items-center gap-3 text-[#FF2B2B]">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF2B2B]/5 flex items-center justify-center border border-[#FF2B2B]/20">
                    <Copyright className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111]">3. Intellectual Property Rights</h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  All branding, design graphics, software code, concepts, trademarks, and content on this website are the property of Praskla Digital X.
                </p>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Upon full payment for custom agency deliverables, ownership rights of final custom assets transfer to the client as specified in the applicable Statement of Work.
                </p>
              </motion.div>

              {/* 4. Client Obligations */}
              <motion.div
                id="responsibilities"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200/80 rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex items-center gap-3 text-[#FF2B2B]">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF2B2B]/5 flex items-center justify-center border border-[#FF2B2B]/20">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111]">4. Client Obligations</h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Clients agree to provide accurate information, timely approvals, and necessary brand assets required for project completion. Delays in feedback may adjust project delivery schedules.
                </p>
              </motion.div>

              {/* 5. Payment & Billing */}
              <motion.div
                id="payments"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200/80 rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex items-center gap-3 text-[#FF2B2B]">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF2B2B]/5 flex items-center justify-center border border-[#FF2B2B]/20">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111]">5. Payment & Billing</h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Invoices are issued according to project milestone schedules or monthly retainer agreements. Payments must be rendered in accordance with agreed invoice due dates.
                </p>
              </motion.div>

              {/* 6. Limitation of Liability */}
              <motion.div
                id="liability"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200/80 rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex items-center gap-3 text-[#FF2B2B]">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF2B2B]/5 flex items-center justify-center border border-[#FF2B2B]/20">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111]">6. Limitation of Liability</h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  To the maximum extent permitted by law, Praskla Digital X shall not be liable for indirect, incidental, or consequential damages resulting from website downtime or service interruptions.
                </p>
              </motion.div>

              {/* 7. Governing Law */}
              <motion.div
                id="governing"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-neutral-200/80 rounded-[28px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4"
              >
                <div className="flex items-center gap-3 text-[#FF2B2B]">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF2B2B]/5 flex items-center justify-center border border-[#FF2B2B]/20">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111111]">7. Governing Law</h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  These Terms are governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of courts located in Coimbatore, Tamil Nadu, India.
                </p>
              </motion.div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;
