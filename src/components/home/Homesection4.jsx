import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionBadge from "../common/SectionBadge";
import { ArrowRight, Sparkles } from "lucide-react";
import ProjectBriefModal from "../ProjectBriefModal";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Homesection4 = () => {
  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);

  const benefits = [
    "Free consultation",
    "Tailored strategy",
    "Transparent quotation",
    "Faster project onboarding",
    "Dedicated project manager",
    "No commitment required",
  ];

  return (
    <>
      <section
        id="start-project"
        className="relative w-full overflow-visible lg:overflow-hidden py-6 sm:py-8 lg:py-10 bg-transparent"
        style={{ zIndex: 1 }}
      >
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          {/* ── SLEEK COMPACT CONTAINER BOX ── */}
          <div className="relative rounded-2xl p-5 sm:p-8 lg:p-10 overflow-hidden bg-[#FFFFFF] border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.18)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)] transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              
              {/* ── LEFT COLUMN INSIDE BIG BOX ── */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={containerVariants}
                className="lg:col-span-7 flex flex-col items-start text-left"
              >
                {/* Small badge */}
                <motion.div variants={fadeUp} className="mb-4">
                  <SectionBadge text="Start Your Project" />
                </motion.div>

                {/* Large Heading */}
                <motion.h2
                  variants={fadeUp}
                  className="text-xl sm:text-2xl lg:text-3xl xl:text-[34px] font-black leading-[1.1] tracking-[-0.03em] text-[#111111] mb-3 sm:mb-4 max-w-xl font-sans"
                >
                  Let's Build Something{" "}
                  <span className="text-[#E31D2E]">Exceptional Together</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  variants={fadeUp}
                  className="text-[#575757] text-sm sm:text-base leading-relaxed font-normal mb-5 sm:mb-6 max-w-xl font-sans"
                >
                  Every successful project starts with understanding your business.
                  Tell us about your goals, timeline, and budget, and let's craft
                  a high-performance digital solution together.
                </motion.p>

                {/* Small benefits */}
                <motion.div variants={fadeUp} className="w-full max-w-xl">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {benefits.map((item, index) => (
                      <li key={index} className="flex items-center gap-2.5">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-[#111111] font-bold text-xs">
                          ✓
                        </span>
                        <span className="text-[#111111] text-xs sm:text-sm font-semibold">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>

              {/* ── RIGHT COLUMN: SEPARATE INNER BOX INSIDE THE BIG BOX ── */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={containerVariants}
                className="lg:col-span-5 relative w-full"
              >
                {/* Inner Separate Card Box */}
                <div className="relative w-full rounded-2xl border border-neutral-200/90 bg-[#F8F9FA] p-5 sm:p-6 shadow-sm text-left">
                  <div className="flex flex-col items-start space-y-5">
                    {/* Top Header Row with Badge */}
                    <div className="w-full flex items-center justify-end">
                      <motion.span
                        variants={fadeUp}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-neutral-200/80 text-[11px] font-extrabold text-[#111111] uppercase tracking-wider shadow-xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111] animate-pulse" />
                        Instant Onboarding
                      </motion.span>
                    </div>

                    {/* Heading */}
                    <motion.h3
                      variants={fadeUp}
                      className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight"
                    >
                      Begin Your Project
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      variants={fadeUp}
                      className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal"
                    >
                      Tell us everything about your business in one place.
                      <br className="hidden sm:inline" />
                      Once submitted, our team will analyze your requirements and
                      contact you with a customized proposal.
                    </motion.p>

                    {/* Highlights Bar */}
                    <motion.div
                      variants={fadeUp}
                      className="w-full pt-1 flex flex-wrap gap-2"
                    >
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-neutral-200/70 text-xs font-semibold text-neutral-700 shadow-xs">
                        3 Min Brief
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-neutral-200/70 text-xs font-semibold text-neutral-700 shadow-xs">
                        Custom Strategy
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-neutral-200/70 text-xs font-semibold text-neutral-700 shadow-xs">
                        Quick Response
                      </span>
                    </motion.div>

                    {/* Clean CTA Button */}
                    <motion.div variants={fadeUp} className="w-full pt-2">
                      <button
                        type="button"
                        onClick={() => setIsBriefModalOpen(true)}
                        className="w-full inline-flex items-center justify-center gap-2.5 bg-[#E31D2E] hover:bg-[#C1121F] text-white px-7 py-3.5 rounded-xl font-bold text-base shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer group/btn"
                      >
                        <span>Apply for Your Project</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete 10-Section Project Brief Modal */}
      <ProjectBriefModal
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
      />
    </>
  );
};

export default Homesection4;