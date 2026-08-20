import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import SectionBadge from "../common/SectionBadge";
import BrandX from "../common/BrandX";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative w-full flex flex-col justify-center overflow-hidden py-10 sm:py-12 lg:py-14 bg-transparent"
    >

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* ── Premium Content Panel ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="relative flex flex-col lg:flex-row gap-12 lg:gap-20 rounded-[36px] p-8 md:p-14 lg:p-20 overflow-hidden bg-[#FFFFFF] border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.18)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)] transition-all duration-500"
        >
          {/* Left — label + headline */}
          <div className="flex-1">
            {/* Eyebrow badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <SectionBadge text="About Us" />
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] font-black leading-[1.08] sm:leading-[1.1] tracking-[-0.035em] text-[#111111] mb-5 sm:mb-6 max-w-2xl font-sans"
            >
              Empowering Brands through{" "}
              <span className="text-[#E31D2E]">
                Mindful
              </span>{" "}
              Marketing.
            </motion.h2>
          </div>

          {/* Right — body copy */}
          <div className="flex-1 flex flex-col justify-center gap-6">
            <motion.div variants={fadeUp} className="relative">
              <div className="absolute -left-5 sm:-left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E31D2E] via-[#E31D2E]/60 to-transparent rounded-full" />
              <p className="text-[#111111] text-lg md:text-xl leading-relaxed font-semibold pl-1">
                <span className="font-inlander font-bold">PRASKLA DIGITAL</span> <BrandX className="h-[1.1em] w-auto text-[#E31D2E] inline-block translate-y-[0.14em] -ml-0.5" /> is a mindful marketing and production firm built on the belief that true growth
                comes from <span className="text-[#E31D2E] font-black">clarity, creativity, and collaboration</span>.
                We partner with businesses and personal brands to transform their ideas into
                measurable digital success.
              </p>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-neutral-600 text-base leading-relaxed font-normal"
            >
              By combining strategic thinking, creative execution, and performance-driven
              optimization, we help brands build <span className="text-[#111111] font-bold">visibility, credibility,
                and sustainable growth</span> — growing alongside them at every stage.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-4">
              <Link
                to="/about"
                className="primary-btn group inline-flex items-center gap-3 text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full shadow-md hover:scale-102 transition-all"
              >
                <span>Learn more about us</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;