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
  ArrowRight
} from "lucide-react";
import pyLogo from "../../assets/Praskla_Digital_X_Logo_Trasnparent_Background.webp";
import { motion, AnimatePresence } from "framer-motion";
import Teams from "../Teams";
import HeroLayout from "../common/HeroLayout";
import SectionBadge from "../common/SectionBadge";
import BrandX from "../common/BrandX";

function AnimatedCounter({ target, suffix = "", prefix = "", duration = 1.6 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // Smooth deceleration curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
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

  const bgElements = null;

  const badge = (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <SectionBadge text="About Us" />
    </motion.div>
  );

  const title = (
    <motion.h1
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="text-3xl sm:text-4xl lg:text-[48px] xl:text-[52px] font-black leading-[0.98] tracking-[-0.04em] text-[#111111]"
    >
      <span className="block mb-1 sm:mb-1.5">Where Mindful Strategy</span>
      <span className="block text-[#E31D2E]">Meets Scalable Growth.</span>
    </motion.h1>
  );

  const description = (
    <motion.p
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="text-neutral-600 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl font-normal"
    >
      A trusted marketing partner delivering brand transformation, performance campaigns,
      and high-impact digital ecosystems that accelerate business growth.
    </motion.p>
  );

  const actions = (
    <motion.div
      className="space-y-3.5 pt-2 w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.12 }}
    >
      {[
        {
          icon: <TrendingUp />,
          title: "Growth-Driven Strategy",
          desc: "Designed for real-world market challenges",
        },
        {
          icon: <Award />,
          title: "Proven Execution",
          desc: "Across diverse industries and personal brands",
        },
        {
          icon: <Users />,
          title: "Dedicated Team",
          desc: "Creative, analytical, and performance-focused professionals",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          whileHover={{ y: -3, scale: 1.01 }}
          className="group flex items-center gap-4 bg-white/80 border border-neutral-200/80 rounded-[20px] p-4 shadow-xs hover:border-black/20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.05)] transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-xl bg-[#E31D2E]/10 border border-[#E31D2E]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E31D2E] transition-colors duration-300">
            {React.cloneElement(item.icon, {
              className: "w-5 h-5 text-[#E31D2E] group-hover:text-white transition-colors duration-300",
            })}
          </div>
          <div>
            <h4 className="text-sm font-black text-[#111111] group-hover:text-[#E31D2E] transition-colors duration-300">
              {item.title}
            </h4>
            <p className="text-xs text-neutral-500 font-normal mt-0.5">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
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
        className="group relative rounded-[32px] p-6 sm:p-7 overflow-hidden border border-neutral-200/80 bg-white/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(17,17,17,0.06)] hover:shadow-[0_25px_60px_rgba(17,17,17,0.09)] transition-all duration-500"
      >
        {/* Soft Background Radial Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#E31D2E]/5 blur-[80px] pointer-events-none" />

        {/* Header Row: Logo Orb + Title + Pill Badge */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200/80 p-2 shadow-xs flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform duration-500">
              <img src={pyLogo} alt="Praskla Digital X" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-inlander text-sm font-black text-[#111111] flex items-center gap-1.5 leading-none">
                Praskla Digital <BrandX className="h-[18px] w-auto text-[#E31D2E] translate-y-[1px]" />
              </h3>
              <p className="text-[11px] font-semibold text-neutral-400 mt-0.5">Mindful Marketing Firm</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-[#E31D2E]/10 border border-[#E31D2E]/20 text-[10px] font-extrabold text-[#E31D2E] uppercase tracking-wider flex items-center gap-1.5 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E31D2E] animate-pulse" />
            Excellence
          </span>
        </div>

        {/* Cycling phrase banner card */}
        <div className="relative rounded-2xl p-4 bg-neutral-50/80 border border-neutral-200/60 mb-4 min-h-[72px] flex flex-col justify-center items-center text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-[#111111] font-black text-sm leading-snug"
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
                  background: idx === index ? "#E31D2E" : "rgba(17,17,17,0.15)",
                }}
              />
            ))}
          </div>
        </div>

        {/* 2x2 Agency Impact Highlights Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <motion.div
            whileHover={{ y: -3, scale: 1.02 }}
            className="relative p-3.5 rounded-2xl bg-gradient-to-br from-white via-neutral-50/80 to-[#E31D2E]/5 border border-neutral-200/80 shadow-2xs hover:border-black/20 hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xl font-black text-[#E31D2E] block tracking-tight">
                <AnimatedCounter target={50} suffix="+" />
              </span>
              <div className="w-6 h-6 rounded-lg bg-[#E31D2E]/10 flex items-center justify-center text-[#E31D2E]">
                <Award className="w-3.5 h-3.5" />
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#111111] block mt-1">
              Projects Delivered
            </span>
          </motion.div>

          <motion.div
            whileHover={{ y: -3, scale: 1.02 }}
            className="relative p-3.5 rounded-2xl bg-gradient-to-br from-white via-neutral-50/80 to-[#E31D2E]/5 border border-neutral-200/80 shadow-2xs hover:border-black/20 hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xl font-black text-[#E31D2E] block tracking-tight">
                <AnimatedCounter target={98} suffix="%" />
              </span>
              <div className="w-6 h-6 rounded-lg bg-[#E31D2E]/10 flex items-center justify-center text-[#E31D2E]">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#111111] block mt-1">
              Client Satisfaction
            </span>
          </motion.div>

          <motion.div
            whileHover={{ y: -3, scale: 1.02 }}
            className="relative p-3.5 rounded-2xl bg-gradient-to-br from-white via-neutral-50/80 to-[#E31D2E]/5 border border-neutral-200/80 shadow-2xs hover:border-black/20 hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xl font-black text-[#E31D2E] block tracking-tight">
                <AnimatedCounter target={100} suffix="%" />
              </span>
              <div className="w-6 h-6 rounded-lg bg-[#E31D2E]/10 flex items-center justify-center text-[#E31D2E]">
                <Target className="w-3.5 h-3.5" />
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#111111] block mt-1">
              Tailored Strategy
            </span>
          </motion.div>

          <motion.div
            whileHover={{ y: -3, scale: 1.02 }}
            className="relative p-3.5 rounded-2xl bg-gradient-to-br from-white via-neutral-50/80 to-[#E31D2E]/5 border border-neutral-200/80 shadow-2xs hover:border-black/20 hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xl font-black text-[#E31D2E] block tracking-tight">
                <AnimatedCounter target={24} suffix="/7" />
              </span>
              <div className="w-6 h-6 rounded-lg bg-[#E31D2E]/10 flex items-center justify-center text-[#E31D2E]">
                <Shield className="w-3.5 h-3.5" />
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#111111] block mt-1">
              Dedicated Support
            </span>
          </motion.div>
        </div>

        {/* Quote Box */}
        <div className="p-3.5 rounded-2xl bg-[#E31D2E]/5 border border-[#E31D2E]/15">
          <p className="text-[#575757] text-xs leading-relaxed font-medium italic text-center">
            "Creating impactful digital brand experiences that combine strategic clarity, high performance, and human connection."
          </p>
        </div>

        {/* Footer Bar */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-bold uppercase tracking-wider">
          <span className="inline-flex items-center gap-1.5 font-inlander font-bold">
            Praskla Digital <BrandX className="h-[15px] w-auto text-[#E31D2E] translate-y-[1px]" />
          </span>
          <span className="text-[#E31D2E]">Established Excellence</span>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-transparent" style={{ backgroundColor: "transparent" }}>
      {/* ── About Hero Section ── */}
      <HeroLayout
        bgElements={bgElements}
        badge={badge}
        title={title}
        description={description}
        actions={actions}
        media={media}
      />

      {/* Vision & Mission Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-transparent">
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
              <SectionBadge text="Vision & Mission" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] tracking-tight mt-4"
            >
              Pioneering Purpose & Direction
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[#575757] text-base sm:text-lg max-w-2xl mx-auto mt-3 font-normal"
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
              className="group relative rounded-[2.5rem] p-8 sm:p-10 border border-neutral-200/80 bg-white/80 shadow-[0_20px_50px_rgba(17,17,17,0.04),_inset_0_2px_4px_rgba(255,255,255,0.9)] backdrop-blur-xl hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] hover:border-black/20 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Header row with Icon & Number */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#E31D2E]/10 border border-[#E31D2E]/20 flex items-center justify-center text-[#E31D2E] shadow-xs group-hover:scale-110 group-hover:bg-[#E31D2E] group-hover:text-white transition-all duration-500">
                    <Eye className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-xs font-black font-mono text-neutral-500 group-hover:bg-[#E31D2E]/10 group-hover:text-[#E31D2E] group-hover:border-black/20 transition-colors duration-300">
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
                  To become a leading mindful marketing firm known for innovative strategies, measurable growth, and long-term brand impact. We envision building a collaborative ecosystem where businesses scale confidently through creative storytelling, data intelligence, and sustainable growth practices — becoming a trusted partner in every stage of their journey.
                </p>
              </div>

              {/* Mini Highlight Tags */}
              <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-wrap gap-2.5">
                {["Innovative Strategies", "Data Intelligence", "Sustainable Growth"].map((tag, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100/80 text-xs font-bold text-[#111111]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E31D2E]" />
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
              className="group relative rounded-[2.5rem] p-8 sm:p-10 border border-neutral-200/80 bg-white/80 shadow-[0_20px_50px_rgba(17,17,17,0.04),_inset_0_2px_4px_rgba(255,255,255,0.9)] backdrop-blur-xl hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] hover:border-black/20 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Header row with Icon & Number */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#E31D2E]/10 border border-[#E31D2E]/20 flex items-center justify-center text-[#E31D2E] shadow-xs group-hover:scale-110 group-hover:bg-[#E31D2E] group-hover:text-white transition-all duration-500">
                    <Target className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-xs font-black font-mono text-neutral-500 group-hover:bg-[#E31D2E]/10 group-hover:text-[#E31D2E] group-hover:border-black/20 transition-colors duration-300">
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
                  At Praskla Digital <BrandX className="h-[1em] w-auto text-[#E31D2E] inline-block translate-y-[0.12em]" />, our mission is to deliver performance-driven marketing strategies and impactful brand experiences that accelerate visibility, credibility, and revenue growth. We are committed to transforming investments into measurable returns through continuous optimization, creative excellence, and transparent partnerships that prioritize shared success.
                </p>
              </div>

              {/* Mini Highlight Tags */}
              <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-wrap gap-2.5">
                {["Performance Marketing", "Creative Excellence", "Measurable ROI"].map((tag, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100/80 text-xs font-bold text-[#111111]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E31D2E]" />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          WHO WE ARE — Praskla Digital X identity section
      ═══════════════════════════════════════════════ */}
      <div
        className="relative py-12 sm:py-14 lg:py-16 overflow-hidden bg-transparent"
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* Left side text container */}
            <motion.div
              className="space-y-7"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              {/* Eyebrow badge */}
              <div className="mb-2">
                <SectionBadge text="Who we are" />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] font-black text-[#111111] leading-[1.18] tracking-tight mb-4">
                A Team Built for{" "}
                <span className="text-[#E31D2E]">Impact and Scale</span>
              </h2>

              <p className="text-[#575757] text-base sm:text-lg leading-relaxed font-medium">
                At Praskla Digital <BrandX className="h-[1.05em] w-auto text-[#E31D2E] inline-block translate-y-[0.14em]" />, we bring together creative visual creators, copywriting experts,
                ad strategists, and performance analytics professionals.
              </p>

              <p className="text-[#575757] text-base leading-relaxed">
                By bridging strategy, visual production, and media buying, we eliminate the friction 
                between branding and ROI — making campaign scale faster and more predictable for your company.
              </p>
            </motion.div>

            {/* Right side metric grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { count: "15+", text: "Happy Brands Reached" },
                { count: "20+", text: "Successful Projects Executed" },
                { count: "20+", text: "Ecosystem Collaborations" },
                { count: "98%", text: "Client Partnership Retention" },
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  className="clay-card rounded-2xl p-6 md:p-8 flex flex-col justify-center items-center text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <span className="text-[#E31D2E] text-3xl sm:text-4xl font-black mb-2">{metric.count}</span>
                  <span className="text-[#575757] text-xs sm:text-sm leading-relaxed font-bold">{metric.text}</span>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <section className="relative overflow-hidden bg-transparent">
        <Teams />
      </section>

      {/* What We Bring to the Table — Expertise Section */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-transparent overflow-hidden">

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex justify-center mb-4"
            >
              <SectionBadge text="Our Core Expertise" />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] leading-tight tracking-tight"
            >
              What We <span className="text-[#E31D2E]">Bring to the Table</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-neutral-500 text-sm sm:text-base font-medium leading-relaxed mt-4 max-w-xl mx-auto"
            >
              Strategic brand positioning, growth marketing, and visual production engineered to scale your business.
            </motion.p>
          </div>

          {/* Cards Grid: Desktop 3 col, Tablet 2+1, Mobile 1 col */}
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
                  className="group relative"
                >
                  <div className="h-full bg-white border border-neutral-200/80 rounded-[28px] p-7 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:border-black/20 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                    
                    {/* Top Row: Icon Container + Category Number */}
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-[#FF2B2B]/10 border border-[#FF2B2B]/20 flex items-center justify-center text-[#FF2B2B] group-hover:bg-[#FF2B2B] group-hover:text-white group-hover:border-[#FF2B2B] transition-all duration-300 shrink-0 shadow-xs">
                          <IconComponent className="w-7 h-7 stroke-[2.2]" />
                        </div>
                        <span className="font-space-grotesk text-sm font-bold text-[#FF2B2B] tracking-wider bg-[#FF2B2B]/10 px-3 py-1 rounded-full border border-[#FF2B2B]/20">
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
        </div>
      </section>

      {/* Explore Our Services CTA */}
      <div className="relative py-12 sm:py-14 lg:py-16 overflow-hidden bg-transparent">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="clay-card p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group text-[#111111]"
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#111111] mb-6 leading-tight">
              Ready to Transform <br />
              <span className="text-[#E31D2E]">Your Digital Presence?</span>
            </h2>
            <p className="text-[#575757] text-base md:text-lg mb-10 max-w-2xl mx-auto font-medium">
              From mindful strategy to high-performance execution, we bring the tools and expertise to scale your brand effectively.
            </p>

            <Link
              to="/services"
              className="primary-btn inline-flex items-center gap-3 text-white px-8 py-4 rounded-full font-bold text-lg"
            >
              Explore Our Services
            </Link>
          </motion.div>
        </div>
      </div>
    </div >
  );
};

export default About;