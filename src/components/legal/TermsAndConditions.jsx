import React from "react";
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
  ShieldCheck
} from "lucide-react";
import HeroLayout from "../common/HeroLayout";
import SectionBadge from "../common/SectionBadge";
import BrandX from "../common/BrandX";
import LegalSpaceBackground from "./LegalSpaceBackground";

const TermsAndConditions = () => {
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
          <span className="text-xs font-extrabold text-[#111111] uppercase tracking-wider">Agreement Standard</span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#111111] bg-neutral-100 px-2.5 py-1 rounded-xl border border-neutral-200/80">
          Legal Governance
        </span>
      </div>

      {/* Key Highlights Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
          <div className="flex items-center gap-2 mb-1 text-[#111111]">
            <Scale className="w-4 h-4" />
            <span className="text-xs font-black text-[#111111]">Fair Terms</span>
          </div>
          <p className="text-[11px] text-neutral-600 font-medium leading-snug">Transparent rights & client obligations.</p>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80">
          <div className="flex items-center gap-2 mb-1 text-[#111111]">
            <Copyright className="w-4 h-4" />
            <span className="text-xs font-black text-[#111111]">IP Protection</span>
          </div>
          <p className="text-[11px] text-neutral-600 font-medium leading-snug">Client owns final deliverable assets.</p>
        </div>
      </div>

      {/* Compliance Banner */}
      <div className="p-3.5 rounded-xl bg-[#111111] text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <FileCheck className="w-5 h-5 text-white" />
          <div>
            <div className="text-xs font-black">Standard MSA & SOW</div>
            <div className="text-[10px] text-neutral-400 font-medium">Binding Commercial Governance</div>
          </div>
        </div>
        <ShieldCheck className="w-5 h-5 text-white shrink-0" />
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
            {/* Top Row: Standard Baseline Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Badge -> Heading -> Description */}
              <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                <div className="mb-4 flex justify-center lg:justify-start w-full">
                  <SectionBadge text="Legal & Terms" theme="dark" />
                </div>
                
                <h1 className="text-white text-[36px] sm:text-[44px] lg:text-[52px] font-black leading-tight tracking-tight mb-4">
                  Terms of <span className="text-[#E31D2E]">Service</span>
                </h1>

                <p className="text-neutral-300 text-base sm:text-lg font-medium leading-relaxed max-w-xl">
                  Please review the terms and conditions governing the use of Praskla DigitalX services, deliverables, and digital platforms.
                </p>
              </div>

              {/* Right Column: Hero Media Card */}
              <div className="lg:col-span-5 w-full flex justify-center lg:justify-end items-start pt-2 lg:pt-0">
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
                  <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-[#111111] mb-1">Clear Scope of Work</h3>
                <p className="text-xs text-neutral-600 font-medium leading-relaxed">All digital projects operate under explicit Statement of Work agreements.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center mb-3">
                  <Copyright className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-[#111111] mb-1">Intellectual Property</h3>
                <p className="text-xs text-neutral-600 font-medium leading-relaxed">Clients receive full ownership of approved deliverables upon final payment.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center mb-3">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-[#111111] mb-1">Transparent Billing</h3>
                <p className="text-xs text-neutral-600 font-medium leading-relaxed">Milestone-based invoices with clear deliverables and commercial terms.</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center mb-3">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-[#111111] mb-1">Governing Standards</h3>
                <p className="text-xs text-neutral-600 font-medium leading-relaxed">Commercial agreements are structured in compliance with applicable law.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3 — DOCUMENT CONTENT */}
        <section className="legal-content w-full pb-16 lg:pb-24 pt-2 sm:pt-4">
          <div className="site-container max-w-4xl mx-auto w-full min-w-0">
            {/* Document Content Sections */}
            <div className="space-y-8 w-full min-w-0">

                {/* 1. Acceptance of Terms */}
                <motion.div
                  id="acceptance"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#111111]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center shrink-0">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
                      <span className="text-[#E31D2E]">1.</span> Acceptance of Terms
                    </h2>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                    By accessing or using the website and digital services of <span className="font-inlander font-bold text-[#111111]">PRASKLA DIGITAL</span> <BrandX className="text-[1.65em] font-pdx text-[#E31D2E] inline-block translate-y-[0.08em] -ml-0.5" /> ("we", "us", "our"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should refrain from using our services.
                  </p>
                </motion.div>

                {/* 2. Services Scope */}
                <motion.div
                  id="services"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#111111]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
                      <span className="text-[#E31D2E]">2.</span> Services Scope
                    </h2>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                    <span className="font-inlander font-bold text-[#111111]">PRASKLA DIGITAL</span> <BrandX className="text-[1.65em] font-pdx text-[#E31D2E] inline-block translate-y-[0.08em] -ml-0.5" /> provides digital marketing, web application development, branding, content creation, and creative collaborator coordination. Specific deliverables, timelines, and budgets are governed by individual project Statements of Work (SOW).
                  </p>
                </motion.div>

                {/* 3. Intellectual Property */}
                <motion.div
                  id="ip"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#111111]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center shrink-0">
                      <Copyright className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
                      <span className="text-[#E31D2E]">3.</span> Intellectual Property Rights
                    </h2>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                    Upon full settlement of agreed invoices, clients receive ownership rights to custom visual deliverables and code written specifically for their engagement. <span className="font-inlander font-bold text-[#111111]">PRASKLA DIGITAL</span> <BrandX className="text-[1.65em] font-pdx text-[#E31D2E] inline-block translate-y-[0.08em] -ml-0.5" /> retains rights to pre-existing proprietary tools, frameworks, and unselected draft concepts.
                  </p>
                </motion.div>

                {/* 4. Client Obligations */}
                <motion.div
                  id="responsibilities"
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
                      <span className="text-[#E31D2E]">4.</span> Client Obligations
                    </h2>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                    Clients agree to provide timely feedback, required brand assets, and necessary access permissions to maintain project schedules. Delays resulting from missing client inputs may impact scheduled delivery dates.
                  </p>
                </motion.div>

                {/* 5. Payment & Billing */}
                <motion.div
                  id="payments"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#111111]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center shrink-0">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
                      <span className="text-[#E31D2E]">5.</span> Payment Terms & Invoicing
                    </h2>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                    Invoices are payable within the timeframe specified in the project proposal or SOW. Milestone payments are non-refundable once the associated project phase has been completed and approved.
                  </p>
                </motion.div>

                {/* 6. Limitation of Liability */}
                <motion.div
                  id="liability"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#111111]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
                      <span className="text-[#E31D2E]">6.</span> Limitation of Liability
                    </h2>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                    <span className="font-inlander font-bold text-[#111111]">PRASKLA DIGITAL</span> <BrandX className="text-[1.65em] font-pdx text-[#E31D2E] inline-block translate-y-[0.08em] -ml-0.5" /> will execute services with professional due care. Our maximum liability for any claims arising from an engagement shall not exceed the total fees paid by the client for the specific project phase giving rise to the claim.
                  </p>
                </motion.div>

                {/* 7. Governing Law */}
                <motion.div
                  id="governing"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 text-[#111111]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-[#111111] border border-neutral-200/80 flex items-center justify-center shrink-0">
                      <Scale className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
                      <span className="text-[#E31D2E]">7.</span> Governing Law & Jurisdiction
                    </h2>
                  </div>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                    These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the courts in Tamil Nadu, India.
                  </p>
                </motion.div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
