import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import SectionBadge from "../common/SectionBadge";
import BrandX from "../common/BrandX";

import { useLanguage } from "../../context/LanguageContext";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="home-about"
      className="relative w-full flex flex-col justify-center overflow-hidden py-5 sm:py-12 lg:py-14 bg-transparent"
    >

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* ── Premium Content Panel ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="relative flex flex-col lg:flex-row gap-4 sm:gap-8 lg:gap-14 rounded-2xl p-3 sm:p-8 md:p-10 lg:p-12 overflow-hidden bg-[#FFFFFF] border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.18)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)] transition-all duration-500"
        >
          {/* Left — label + headline */}
          <div className="flex-1">
            {/* Eyebrow badge */}
            <motion.div variants={fadeUp} className="mb-2 sm:mb-6">
              <SectionBadge text={t("about_badge", "our goal")} />
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={fadeUp}
              className="text-lg sm:text-3xl lg:text-[40px] xl:text-[44px] font-black leading-[1.1] tracking-[-0.035em] text-[#111111] font-sans"
            >
              {t("about_title_1", "Empowering Brands through ")}
              <span className="text-[#E31D2E]">
                {t("about_title_highlight", "Mindful")}
              </span>{" "}
              {t("about_title_2", "Marketing.")}
            </motion.h2>
          </div>

          {/* Right — body copy */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.div variants={fadeUp} className="relative pl-3 sm:pl-5 flex flex-col gap-2 sm:gap-4 border-l-2 border-[#E31D2E]">
              <p className="text-[#111111] text-xs sm:text-lg md:text-xl leading-relaxed font-semibold">
                <span className="font-inlander font-bold">PRASKLA DIGITAL</span> <BrandX className="text-[1.4em] sm:text-[1.65em] font-pdx text-[#E31D2E] inline-block translate-y-[0.1em] -ml-0.5" /> {t("about_text_1")}
              </p>

              <p className="text-neutral-600 text-[11px] sm:text-base leading-relaxed font-normal">
                {t("about_text_2")}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;