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
  Clock,
  ShieldCheck
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

  const media = (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-md p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-neutral-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.06)] space-y-4 relative overflow-hidden"
    >
      {/* Decorative Glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#E31D2E]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider">Agreement Standard</span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#E31D2E] bg-[#E31D2E]/5 px-2.5 py-1 rounded-full border border-[#E31D2E]/15">
          Legal Governance
        </span>
      </div>

      {/* Key Highlights Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60">
          <div className="flex items-center gap-2 mb-1 text-[#E31D2E]">
            <Scale className="w-4 h-4" />
            <span className="text-xs font-black text-[#111111]">Fair Terms</span>
          </div>
          <p className="text-[11px] text-neutral-500 leading-snug">Transparent rights & client obligations.</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60">
          <div className="flex items-center gap-2 mb-1 text-[#E31D2E]">
            <Copyright className="w-4 h-4" />
            <span className="text-xs font-black text-[#111111]">IP Protection</span>
          </div>
          <p className="text-[11px] text-neutral-500 leading-snug">Client owns final deliverable assets.</p>
        </div>
      </div>

      {/* Compliance Banner */}
      <div className="p-3.5 rounded-2xl bg-[#111111] text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <FileCheck className="w-5 h-5 text-[#E31D2E]" />
          <div>
            <div className="text-xs font-bold">Standard MSA & SOW</div>
            <div className="text-[10px] text-neutral-400">Binding Commercial Governance</div>
          </div>
        </div>
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
      </div>
    </motion.div>
  );

  return (
    <div className="w-full bg-transparent">
      {/* Hero Section */}
      <HeroLayout className="py-4 sm:py-6 lg:py-8">
        {/* Top Row: Standard Baseline Header & Agreement Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Badge -> Heading -> Description -> Badges */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
            <div className="mb-4 flex justify-center lg:justify-start w-full">
              <SectionBadge text="Terms of Agreement" />
            </div>
            
            <h1 className="text-[#111111] text-[36px] sm:text-[44px] lg:text-[52px] font-black leading-tight tracking-tight mb-4">
              Terms & <span className="text-[#E31D2E]">Conditions</span>
            </h1>

            <p className="text-[#575757] text-base sm:text-lg font-medium leading-relaxed mb-6 max-w-xl">
              Review the agreement governing your use of Praskla Digital X website, applications, and professional digital services.
            </p>

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
          </div>

          {/* Right Column: Hero Media Card */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end items-start pt-2 lg:pt-0">
            {media}
          </div>
        </div>

        {/* Bottom Feature Cards Grid: Covers the hero area gracefully */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 lg:mt-10"
        >
          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-neutral-200/80 shadow-xs hover:border-[#E31D2E]/30 transition-all duration-300">
            <div className="w-9 h-9 rounded-xl bg-[#E31D2E]/10 text-[#E31D2E] flex items-center justify-center mb-3">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#111111] mb-1">Defined Scope of Work</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">Structured project deliverables, SOW milestones, and timeline SLAs.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-neutral-200/80 shadow-xs hover:border-[#E31D2E]/30 transition-all duration-300">
            <div className="w-9 h-9 rounded-xl bg-[#E31D2E]/10 text-[#E31D2E] flex items-center justify-center mb-3">
              <Copyright className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#111111] mb-1">Client IP Ownership</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">Full ownership and transfer of approved final creative assets upon settlement.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-neutral-200/80 shadow-xs hover:border-[#E31D2E]/30 transition-all duration-300">
            <div className="w-9 h-9 rounded-xl bg-[#E31D2E]/10 text-[#E31D2E] flex items-center justify-center mb-3">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#111111] mb-1">Transparent Billing</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">Itemized pricing quotes, structured milestones, and zero hidden costs.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-neutral-200/80 shadow-xs hover:border-[#E31D2E]/30 transition-all duration-300">
            <div className="w-9 h-9 rounded-xl bg-[#E31D2E]/10 text-[#E31D2E] flex items-center justify-center mb-3">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#111111] mb-1">Governing Resolution</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">Structured dispute resolution mechanisms and fair limitation of liability.</p>
          </div>
        </motion.div>
      </HeroLayout>

      {/* Main Content Grid */}
      <section className="w-full pb-16 lg:pb-24">
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
                  These Terms are governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of courts located in Namakkal, Tamil Nadu, India.
                </p>
              </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;
