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
        className="relative w-full overflow-visible lg:overflow-hidden py-10 sm:py-12 lg:py-14 bg-transparent"
        style={{ zIndex: 1 }}
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* ── LEFT SIDE ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={containerVariants}
              className="flex flex-col items-start text-left"
            >
              {/* Small badge */}
              <motion.div variants={fadeUp} className="mb-6">
                <SectionBadge text="Start Your Project" />
              </motion.div>

              {/* Large Heading */}
              <motion.h2
                variants={fadeUp}
                className="text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] font-black leading-[1.08] sm:leading-[1.1] tracking-[-0.035em] text-[#111111] mb-5 sm:mb-6 max-w-2xl font-sans"
              >
                Let's Build Something{" "}
                <span className="text-[#E31D2E]">Exceptional Together</span>
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="text-[#575757] text-base sm:text-lg lg:text-[19px] font-normal leading-[1.6] mb-7 sm:mb-8 max-w-2xl font-sans"
              >
                Every successful project starts with understanding your business.
                Tell us about your goals, timeline, and budget, and let's craft
                a high-performance digital solution together.
              </motion.p>

              {/* Small benefits */}
              <motion.div variants={fadeUp} className="w-full max-w-xl">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {benefits.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E31D2E]/10 flex items-center justify-center text-[#E31D2E] font-bold text-xs sm:text-sm">
                        ✓
                      </span>
                      <span className="text-[#111111] text-sm sm:text-base font-semibold">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* ── RIGHT SIDE ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={containerVariants}
              className="relative w-full"
            >
              {/* Clean Card */}
              <div className="relative mx-auto w-full max-w-[520px] rounded-[32px] sm:rounded-[36px] border border-neutral-200/80 bg-white p-7 sm:p-8 md:p-9 shadow-[0_20px_50px_rgba(17,17,17,0.06)] transition-all duration-300 text-left">
                <div className="flex flex-col items-start space-y-5">
                  {/* Top Header Row with Icon & Badge */}
                  <div className="w-full flex items-center justify-between">
                    <motion.div
                      variants={fadeUp}
                      className="w-14 h-14 rounded-2xl bg-[#E31D2E]/10 border border-[#E31D2E]/20 flex items-center justify-center text-[#E31D2E] shadow-xs"
                    >
                      <Sparkles className="w-7 h-7 stroke-[2]" />
                    </motion.div>

                    <motion.span
                      variants={fadeUp}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E31D2E]/10 border border-[#E31D2E]/20 text-[11px] font-extrabold text-[#E31D2E] uppercase tracking-wider"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E31D2E] animate-pulse" />
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
                    className="w-full pt-1 flex flex-wrap gap-2.5"
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100/80 border border-neutral-200/60 text-xs font-semibold text-neutral-700">
                      3 Min Brief
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100/80 border border-neutral-200/60 text-xs font-semibold text-neutral-700">
                      Custom Strategy
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100/80 border border-neutral-200/60 text-xs font-semibold text-neutral-700">
                      Quick Response
                    </span>
                  </motion.div>

                  {/* Clean CTA Button */}
                  <motion.div variants={fadeUp} className="w-full pt-2">
                    <button
                      type="button"
                      onClick={() => setIsBriefModalOpen(true)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#E31D2E] hover:bg-[#C1121F] text-white px-7 py-3.5 rounded-full font-bold text-base shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer group/btn"
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