import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Wrench,
  Shield,
  TrendingUp,
  Eye,
  Target,
  Award,
  Video,
  ArrowRight,
  Zap,
  Layers,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import pyLogo from "../../assets/Praskla_Digital_X_Logo_Trasnparent_Background.webp";
import { motion, AnimatePresence } from "framer-motion";
import Teams from "../Teams";
import HeroLayout from "../common/HeroLayout";
import SectionBadge from "../common/SectionBadge";
import BrandX from "../common/BrandX";
import AboutSpaceBackground from "./AboutSpaceBackground";

function AnimatedCounter({ target, suffix = "", prefix = "", duration = 1.6 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId;
    const numVal = parseFloat(target) || 0;
    const isFloat = target.toString().includes(".");

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // Smooth deceleration curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const val = easeOut * numVal;
      setCount(isFloat ? val.toFixed(1) : Math.floor(val));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(isFloat ? numVal.toFixed(1) : numVal);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

const About = () => {
  const [index, setIndex] = useState(0);
  const [panelMouse, setPanelMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const handlePanelMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setPanelMouse({ x, y });
  };

  const handlePanelMouseLeave = () => setPanelMouse({ x: 0, y: 0 });

  const phrases = [
    "We Build Powerful Brand Identities",
    "We Create Data-Driven Marketing Systems",
    "We Deliver High-Impact Digital Campaigns",
    "We Transform Businesses into Recognized Brands",
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const badge = (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <SectionBadge text="About Us" theme="dark" />
    </motion.div>
  );

  const title = (
    <motion.h1
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] font-black leading-[1.08] sm:leading-[1.1] tracking-[-0.035em] text-white font-sans mb-5 sm:mb-6 max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
    >
      Where Mindful Strategy{" "}
      <span className="text-[#E31D2E]">Meets Scalable Growth.</span>
    </motion.h1>
  );

  const description = (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="text-neutral-300 text-base sm:text-lg lg:text-[19px] font-normal leading-[1.6] font-sans max-w-2xl mb-7 sm:mb-8 text-center lg:text-left mx-auto lg:mx-0"
    >
      A trusted marketing partner delivering brand transformation, performance campaigns,
      and high-impact digital ecosystems that accelerate business growth.
    </motion.p>
  );

  const actions = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.3 }}
      className="w-full max-w-xl"
    >
      {/* 3 Compact Horizontal White Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
        {[
          {
            icon: <TrendingUp className="w-4 h-4 text-[#111111]" />,
            title: "Growth Strategy",
            sub: "Real-World Impact",
          },
          {
            icon: <Award className="w-4 h-4 text-[#111111]" />,
            title: "Proven Execution",
            sub: "Cross-Industry",
          },
          {
            icon: <Users className="w-4 h-4 text-[#111111]" />,
            title: "Dedicated Team",
            sub: "Performance Focused",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -3, scale: 1.02 }}
            className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 shadow-md hover:border-neutral-300 hover:shadow-lg transition-all duration-300 flex flex-col items-start gap-2 text-[#111111]"
          >
            <div className="w-8 h-8 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center text-[#111111]">
              {item.icon}
            </div>
            <div>
              <h4 className="text-xs font-black text-[#111111]">{item.title}</h4>
              <p className="text-[10px] text-neutral-500 font-medium leading-none mt-0.5">{item.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const media = (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      className="w-full max-w-[480px] mx-auto"
    >
      <motion.div
        onMouseMove={handlePanelMouseMove}
        onMouseLeave={handlePanelMouseLeave}
        animate={{
          x: panelMouse.x,
          y: panelMouse.y,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="group relative rounded-2xl p-6 sm:p-7 overflow-hidden border border-neutral-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.18)] transition-all duration-500"
      >
        {/* Header Row: Logo Orb + Title + Pill Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white border border-neutral-200 p-2 shadow-xs flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform duration-500">
              <img src={pyLogo} alt="Praskla Digital X" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <h3 className="font-inlander text-xs sm:text-sm font-black text-[#111111] flex items-center gap-1.5 leading-none">
                PRASKLA DIGITAL <BrandX className="text-[22px] sm:text-[30px] leading-none shrink-0 text-[#E31D2E] -mt-1 -ml-1" />
              </h3>
              <p className="text-[10px] sm:text-[11px] font-semibold text-neutral-500 mt-0.5 truncate max-w-[210px] sm:max-w-none">A Mindful Marketing and Production Firm</p>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-xl bg-neutral-100 border border-neutral-200/80 text-[9px] sm:text-[10px] font-extrabold text-[#111111] uppercase tracking-wider flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E31D2E] animate-pulse" />
            Excellence
          </span>
        </div>

        {/* Cycling phrase banner card */}
        <div className="relative rounded-2xl p-4 bg-neutral-50 border border-neutral-200/80 mb-4 min-h-[72px] flex flex-col justify-center items-center text-center shadow-2xs">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-[#111111] font-black text-sm sm:text-[15px] leading-snug tracking-tight"
            >
              {phrases[index]}
            </motion.p>
          </AnimatePresence>

          {/* Progress bar line */}
          <div className="flex gap-1.5 justify-center mt-3">
            {phrases.map((_, idx) => (
              <div
                key={idx}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: idx === index ? "20px" : "6px",
                  background: idx === index ? "#111111" : "rgba(17,17,17,0.18)",
                }}
              />
            ))}
          </div>
        </div>

        {/* 2x2 Agency Core Focus Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {[
            {
              icon: <Zap className="w-4 h-4" />,
              title: "Performance First",
              desc: "ROI-Focused Execution",
            },
            {
              icon: <Layers className="w-4 h-4" />,
              title: "Brand Systems",
              desc: "Cohesive Identity & Tech",
            },
            {
              icon: <ShieldCheck className="w-4 h-4" />,
              title: "Mindful Strategy",
              desc: "Transparent & Scalable",
            },
            {
              icon: <Sparkles className="w-4 h-4" />,
              title: "Creative Mastery",
              desc: "High-Impact Content",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="p-3 rounded-xl bg-white border border-neutral-200/90 shadow-2xs hover:border-black/30 hover:shadow-md transition-all duration-300 flex items-center gap-2.5 group/box cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center shrink-0 text-[#111111] group-hover/box:bg-[#111111] group-hover/box:text-white group-hover/box:border-[#111111] transition-all duration-300 shadow-2xs">
                {item.icon}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-black text-[#111111] leading-tight truncate">
                  {item.title}
                </h4>
                <p className="text-[10px] text-neutral-500 font-bold leading-tight truncate mt-0.5">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote Box */}
        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 shadow-2xs">
          <p className="text-neutral-700 text-xs sm:text-[13px] leading-relaxed font-semibold italic text-center">
            "Creating impactful digital brand experiences that combine strategic clarity, high performance, and human connection."
          </p>
        </div>

        {/* Footer Bar */}
        <div className="mt-4 pt-3 border-t border-neutral-200/80 flex items-center justify-between text-[11px] text-neutral-500 font-bold uppercase tracking-wider">
          <span className="inline-flex items-center gap-1.5 font-inlander font-bold text-[#111111]">
            PRASKLA DIGITAL <BrandX className="text-[22px] leading-none shrink-0 text-[#111111] -mt-0.5 -ml-0.5" />
          </span>
          <span className="text-[#111111]">Established Excellence</span>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="relative w-full overflow-hidden bg-[#050609]">
      {/* About-scoped Continuous Parallax Saturn Space Environment */}
      <AboutSpaceBackground />

      {/* Main About Content Sections */}
      <div className="relative z-10 w-full">
        {/* ── About Hero Section ── */}
        <HeroLayout
          bgElements={null}
          badge={badge}
          title={title}
          description={description}
          actions={actions}
          media={media}
        />

        {/* Vision & Mission Section */}
        <section className="relative py-10 sm:py-12 lg:py-14 overflow-hidden bg-transparent">
          {/* Background ambient glows */}
          <div className="absolute top-1/2 left-10 -translate-y-1/2 w-80 h-80 bg-[#E31D2E]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-[#E31D2E]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-4"
              >
                <SectionBadge text="Vision & Mission" theme="dark" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-black !text-white tracking-tight mt-4"
              >
                Pioneering Purpose & Direction
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="!text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto mt-3 font-normal"
              >
                Building long-term brand impact through creative storytelling, data intelligence, and measurable results.
              </motion.p>
            </div>

          {/* 2-Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl p-8 sm:p-10 border border-white/90 bg-white shadow-2xl hover:shadow-[0_30px_70px_rgba(0,0,0,0.15)] transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Header row with Icon & Number */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-[#111111] shadow-xs group-hover:scale-110 group-hover:bg-[#111111] group-hover:text-white transition-all duration-500">
                    <Eye className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <span className="px-3.5 py-1 rounded-xl bg-neutral-100 border border-neutral-200/80 text-xs font-black font-mono text-neutral-500 group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                    01
                  </span>
                </div>

                {/* Subtitle & Main Title */}
                <span className="text-[#E31D2E] text-xs font-bold tracking-[0.25em] uppercase block mb-2">
                  OUR VISION
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mb-4">
                  Powered by a Vision
                </h3>

                {/* Paragraph */}
                <p className="text-[#575757] text-base leading-relaxed font-normal">
                  To become a leading mindful marketing and production firm known for innovative strategies, measurable growth, and long-term brand impact. We envision building a collaborative ecosystem where businesses scale confidently through creative storytelling, data intelligence, and sustainable growth practices — becoming a trusted partner in every stage of their journey.
                </p>
              </div>

              {/* Mini Highlight Tags */}
              <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-wrap gap-2.5">
                {["Innovative Strategies", "Data Intelligence", "Sustainable Growth"].map((tag, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 border border-neutral-200/60 text-xs font-extrabold text-[#111111]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="group relative rounded-2xl p-8 sm:p-10 border border-white/90 bg-white shadow-2xl hover:shadow-[0_30px_70px_rgba(0,0,0,0.15)] transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Header row with Icon & Number */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-[#111111] shadow-xs group-hover:scale-110 group-hover:bg-[#111111] group-hover:text-white transition-all duration-500">
                    <Target className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <span className="px-3.5 py-1 rounded-xl bg-neutral-100 border border-neutral-200/80 text-xs font-black font-mono text-neutral-500 group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                    02
                  </span>
                </div>

                {/* Subtitle & Main Title */}
                <span className="text-[#E31D2E] text-xs font-bold tracking-[0.25em] uppercase block mb-2">
                  OUR MISSION
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight mb-4">
                  Driven by a Mission
                </h3>

                {/* Paragraph */}
                <p className="text-[#575757] text-base leading-relaxed font-normal">
                  At <span className="font-inlander font-bold text-[#111111]">PRASKLA DIGITAL</span> <BrandX className="text-[1.65em] font-pdx text-[#E31D2E] inline-block translate-y-[0.1em] -ml-0.5" />, our mission is to deliver performance-driven marketing strategies and impactful brand experiences that accelerate visibility, credibility, and revenue growth. We are committed to transforming investments into measurable returns through continuous optimization, creative excellence, and transparent partnerships that prioritize shared success.
                </p>
              </div>

              {/* Mini Highlight Tags */}
              <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-wrap gap-2.5">
                {["Performance Marketing", "Creative Excellence", "Measurable ROI"].map((tag, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 border border-neutral-200/60 text-xs font-extrabold text-[#111111]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section: Who We Are / Agency Impact Highlights ── */}
      <div className="relative py-12 sm:py-16 overflow-hidden bg-transparent">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="clay-card p-8 sm:p-10 md:p-12 rounded-2xl bg-white border border-white/90 shadow-2xl text-[#111111]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left side text copy */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                <div className="mb-4">
                  <SectionBadge text="Who We Are" />
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-[#111111] font-sans mb-6">
                  A Team Built for{" "}
                  <span className="text-[#E31D2E]">Impact and Scale</span>
                </h2>

                <p className="text-[#575757] text-base sm:text-lg leading-relaxed font-medium mb-4">
                  At <span className="font-inlander font-bold text-[#111111]">PRASKLA DIGITAL</span> <BrandX className="text-[1.65em] font-pdx text-[#E31D2E] inline-block translate-y-[0.1em] -ml-0.5" />, we bring together creative visual creators, copywriting experts,
                  ad strategists, and performance analytics professionals.
                </p>

                <p className="text-[#575757] text-base leading-relaxed">
                  By bridging strategy, visual production, and media buying, we eliminate the friction 
                  between branding and ROI — making campaign scale faster and more predictable for your company.
                </p>
              </div>

              {/* Right side capability pillar grid */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    icon: Target,
                    title: "Strategic Clarity",
                    sub: "Brand Positioning",
                  },
                  {
                    icon: Zap,
                    title: "High ROI Execution",
                    sub: "Performance Marketing",
                  },
                  {
                    icon: Sparkles,
                    title: "Creative Production",
                    sub: "Visuals & Design",
                  },
                  {
                    icon: Layers,
                    title: "Scalable Systems",
                    sub: "Digital Ecosystems",
                  },
                ].map((item, i) => {
                  const IconComp = item.icon;
                  return (
                    <motion.div
                      key={i}
                      className="group rounded-2xl p-5 flex flex-col items-start text-left bg-neutral-50/90 border border-neutral-200/80 text-[#111111] shadow-2xs hover:bg-white hover:border-black/20 hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-[#111111] mb-3 shadow-2xs group-hover:scale-105 group-hover:bg-[#111111] group-hover:text-white transition-all duration-300">
                        <IconComp className="w-5 h-5 stroke-[2]" />
                      </div>
                      <h4 className="text-sm font-black text-[#111111] leading-tight mb-1">
                        {item.title}
                      </h4>
                      <p className="text-neutral-500 text-xs font-bold leading-tight">
                        {item.sub}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="relative overflow-hidden bg-transparent">
        <Teams />
      </section>

      {/* What We Bring to the Table — Expertise Section */}
      <section className="relative w-full py-12 sm:py-16 bg-transparent overflow-hidden">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="clay-card p-8 sm:p-10 md:p-12 rounded-2xl bg-white border border-white/90 shadow-2xl text-[#111111] text-center"
          >
            {/* Section Header inside Box */}
            <div className="max-w-3xl mx-auto mb-10 sm:mb-12">
              <div className="mb-4 flex justify-center">
                <SectionBadge text="CORE EXPERTISE" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] leading-tight tracking-tight">
                What We <span className="text-[#E31D2E]">Bring to the Table</span>
              </h2>
              <p className="text-[#575757] text-sm sm:text-base font-medium leading-relaxed mt-4 max-w-xl mx-auto">
                Strategic brand positioning, growth marketing, and visual production engineered to scale your business.
              </p>
            </div>

            {/* Cards Grid inside Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {[
                {
                  id: "01",
                  icon: Target,
                  title: "Mindful Brand Strategy",
                  desc: "Strategic brand positioning, identity frameworks, and content ecosystems designed to build authority, clarity, and long-term market recognition.",
                  link: "/services"
                },
                {
                  id: "02",
                  icon: TrendingUp,
                  title: "Performance Marketing",
                  desc: "Data-driven growth campaigns including technical SEO, Meta Ads, targeted PPC, and conversion optimization focused on measurable ROI.",
                  link: "/services"
                },
                {
                  id: "03",
                  icon: Video,
                  title: "Creative Media & Production",
                  desc: "High-impact brand videography, photography, motion graphics, and digital storytelling that transform businesses into visual powerhouses.",
                  link: "/services"
                }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    className="group relative"
                  >
                    <div className="h-full bg-neutral-50/90 border border-neutral-200/80 rounded-xl p-7 sm:p-8 hover:border-black/20 hover:bg-neutral-100 transition-all duration-300 flex flex-col justify-between relative overflow-hidden text-left">
                      {/* Top Row: Icon Container + Category Number */}
                      <div>
                        <div className="flex items-center justify-between gap-4 mb-6">
                          <div className="w-14 h-14 rounded-2xl bg-white border border-neutral-200/80 flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                            <IconComponent className="w-7 h-7 stroke-[2.2]" />
                          </div>
                          <span className="font-mono text-xs font-bold text-[#111111] tracking-wider bg-neutral-100 px-3 py-1 rounded-xl border border-neutral-200/80">
                            {item.id}
                          </span>
                        </div>

                        {/* Headline */}
                        <h3 className="text-xl sm:text-2xl font-black text-[#111111] mb-3 leading-snug">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Explore Our Services CTA */}
      <div className="relative py-12 sm:py-14 lg:py-16 overflow-hidden bg-transparent">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
              Ready to Transform <br />
              <span className="text-[#E31D2E]">Your Digital Presence?</span>
            </h2>
            <p className="text-neutral-300 text-base md:text-lg mb-8 max-w-2xl mx-auto font-medium leading-relaxed">
              From mindful strategy to high-performance execution, we bring the tools and expertise to scale your brand effectively.
            </p>

            <Link
              to="/services"
              className="px-8 py-4 rounded-xl border border-white/80 bg-white text-[#111111] hover:bg-neutral-100 font-black text-xs sm:text-sm uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 shadow-md"
            >
              <span>Explore Our Expertise</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default About;