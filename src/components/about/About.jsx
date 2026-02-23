import React from "react";
import {
  Users,
  Wrench,
  Sparkles,
  Shield,
  Zap,
  TrendingUp,
  Eye,
  Target,
  Flame,
  CheckCircle2,
  Award
} from "lucide-react";
// import logoLight from "../../assets/py.jpg"
import pyLogo from "../../assets/py.png";
import { motion, AnimatePresence } from "framer-motion";
import Homesection3 from "../home/Homesection3";
import { useState, useEffect } from "react";

const About = () => {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);
  const values = [
    { icon: Award, title: "Clarity", desc: "Thoughtful strategies with defined direction" },
    { icon: Users, title: "Collaboration", desc: "Strong partnerships that grow together" },
    { icon: Target, title: "Innovation", desc: "Creative, future-ready marketing solutions" },
  ];
  const phrases = [
    "We Build Powerful Brand Identities",
    "We Create Data-Driven Marketing Systems",
    "We Deliver High-Impact Digital Campaigns",
    "We Transform Businesses into Recognized Brands",
  ];
  const orbit1 = [
    { icon: TrendingUp, label: "Growth Focused" },
    { icon: Shield, label: "Secure & Reliable" },
  ];

  const orbit2 = [
    { icon: Sparkles, label: "Innovative" },
    { icon: Users, label: "Client Centric" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>
      {/* ═══════════════════════════════════════════════
          BRAND MANIFESTO — About Page Hero Section
      ═══════════════════════════════════════════════ */}
      <div className="relative pt-24 pb-20 min-h-screen flex items-center overflow-hidden">

        {/* Background: dot grid + red glow blob */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(192,20,28,0.10) 0%, transparent 65%)" }}
          />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
        </div>

        <div className="relative z-10 w-[90%] max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* ── LEFT: Main Content ── */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Eyebrow label */}
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C0141C] animate-pulse" />
                <span className="text-[#C0141C] text-xs font-semibold tracking-[0.2em] uppercase">
                  About Us
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-black leading-[1.1] tracking-tight text-white">
                Where Mindful Strategy{" "}
                <span
                  className="inline-block"
                  style={{
                    background: "linear-gradient(135deg, #C0141C 0%, #E02020 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Meets Scalable Growth
                </span>
              </h1>

              {/* Sub-copy */}
              <p className="text-[#A0A0A0] text-lg leading-relaxed max-w-xl">
                A trusted marketing partner delivering brand transformation, performance campaigns,
                and high-impact digital ecosystems that accelerate business growth.
              </p>

              {/* Three bullet points */}
              <div className="space-y-4 pt-2">
                {[
                  "Growth-driven strategies designed for real-world market challenges",
                  "Proven execution across diverse industries and personal brands",
                  "A dedicated team of creative, analytical, and performance-focused professionals",
                ].map((point, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                  >
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: "rgba(192,20,28,0.15)", color: "#C0141C" }}
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[#A0A0A0] text-sm leading-relaxed">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── RIGHT: Side Card + Values ── */}
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              {/* Cycling phrases card */}
              <div
                className="relative rounded-2xl p-8 overflow-hidden border border-[#2A2A2A]"
                style={{ background: "#111111" }}
              >
                {/* Twinkling dots */}
                <motion.div className="absolute inset-0 pointer-events-none" initial={false}>
                  {[
                    { x: "12%", y: "18%", delay: 0, size: 2.5 },
                    { x: "88%", y: "25%", delay: 0.5, size: 2 },
                    { x: "22%", y: "72%", delay: 1, size: 3 },
                    { x: "78%", y: "78%", delay: 1.5, size: 2 },
                    { x: "50%", y: "10%", delay: 2, size: 2.5 },
                    { x: "65%", y: "88%", delay: 2.5, size: 2 },
                    { x: "8%", y: "48%", delay: 3, size: 2.5 },
                    { x: "92%", y: "55%", delay: 3.5, size: 2 },
                  ].map((pos, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        left: pos.x, top: pos.y,
                        width: `${pos.size}px`, height: `${pos.size}px`,
                        background: "#C0141C",
                        boxShadow: "0 0 8px rgba(192,20,28,0.8)",
                      }}
                      animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: pos.delay }}
                    />
                  ))}
                </motion.div>

                {/* Logo orb */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(192,20,28,0.12)", border: "1.5px solid rgba(192,20,28,0.3)" }}
                    >
                      <img src={pyLogo} alt="Praskla" className="w-12 h-12 object-contain" />
                    </div>
                  </motion.div>
                </div>

                {/* Animated cycling text */}
                <div className="relative flex items-center justify-center min-h-[36px] mb-4">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="text-white font-semibold text-lg text-center"
                    >
                      {phrases[index]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Progress dots */}
                <div className="flex gap-2 justify-center">
                  {phrases.map((_, idx) => (
                    <div
                      key={idx}
                      className="h-1 rounded-full transition-all duration-300"
                      style={{
                        width: idx === index ? "24px" : "8px",
                        background: idx === index ? "#C0141C" : "#2A2A2A",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Three value pillars below the card */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: "🎯", title: "Clarity", desc: "Thoughtful strategies with defined direction" },
                  { icon: "🤝", title: "Collaboration", desc: "Strong partnerships that grow together" },
                  { icon: "💡", title: "Innovation", desc: "Creative, future-ready marketing solutions" },
                ].map((v, i) => (
                  <motion.div
                    key={i}
                    className="rounded-xl p-4 text-center border border-[#2A2A2A] hover:border-[#C0141C]/40 transition-all duration-300 cursor-default group"
                    style={{ background: "#111111" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="text-2xl mb-2">{v.icon}</div>
                    <h4 className="text-white font-bold text-sm mb-1 group-hover:text-[#C0141C] transition-colors duration-300">
                      {v.title}
                    </h4>
                    <p className="text-[#606060] text-xs leading-snug">{v.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
      {/* ═══════════════════════════════════════════════
          WHO WE ARE — DigitalX identity section
      ═══════════════════════════════════════════════ */}
      <div
        className="relative py-24 overflow-hidden"
        style={{ background: "#080808" }}
      >
        {/* Subtle section divider glow */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(192,20,28,0.3), transparent)" }}
        />

        <div className="relative z-10 w-[90%] max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* ── LEFT: Decorative visual panel ── */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Main card */}
              <div
                className="relative rounded-2xl p-8 border border-[#2A2A2A] overflow-hidden"
                style={{ background: "#111111" }}
              >
                {/* Red corner accent */}
                <div
                  className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                  style={{ background: "linear-gradient(180deg, #C0141C 0%, transparent 100%)" }}
                />

                {/* Floating red glow */}
                <div
                  className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(192,20,28,0.12) 0%, transparent 70%)" }}
                />

                <p className="text-[#606060] text-xs font-semibold tracking-[0.2em] uppercase mb-3 pl-4">
                  DigitalX — Who We Are
                </p>
                <h3 className="text-white font-black text-2xl leading-snug mb-6 pl-4">
                  A mindful partner in<br />
                  <span style={{ color: "#C0141C" }}>digital growth</span> &amp; brand innovation
                </h3>

                {/* Stat row */}
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {[
                    { metric: "100+", label: "Brands Grown" },
                    { metric: "5+", label: "Years Active" },
                    { metric: "3x", label: "Avg. ROI" },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      className="rounded-xl p-4 text-center border border-[#2A2A2A] hover:border-[#C0141C]/30 transition-all duration-300"
                      style={{ background: "#0D0D0D" }}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
                      whileHover={{ y: -3 }}
                    >
                      <p className="text-2xl font-black" style={{ color: "#C0141C" }}>{s.metric}</p>
                      <p className="text-[#606060] text-xs mt-1">{s.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Service tags */}
                <div className="flex flex-wrap gap-2 mt-6 pl-1">
                  {[
                    "Strategic Branding",
                    "Performance Marketing",
                    "Media Production",
                    "Sales-Driven Digital",
                  ].map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium px-3 py-1.5 rounded-full border"
                      style={{
                        color: "#C0141C",
                        borderColor: "rgba(192,20,28,0.25)",
                        background: "rgba(192,20,28,0.07)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Floating bottom accent card */}
              <motion.div
                className="absolute -bottom-5 -right-5 rounded-xl px-5 py-4 border border-[#2A2A2A] shadow-xl"
                style={{ background: "#111111" }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: "rgba(192,20,28,0.15)" }}
                  >
                    📈
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">Measurable Results</p>
                    <p className="text-[#606060] text-[10px]">Insight-led execution</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Copy ── */}
            <motion.div
              className="order-1 lg:order-2 space-y-7"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C0141C] animate-pulse" />
                <span className="text-[#C0141C] text-xs font-semibold tracking-[0.2em] uppercase">
                  Who We Are
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-white">
                A growth-focused<br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #C0141C 0%, #E02020 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  digital marketing
                </span>{" "}company
              </h2>

              {/* Divider */}
              <div className="w-12 h-0.5 rounded-full" style={{ background: "#C0141C" }} />

              {/* Body paragraphs */}
              <div className="space-y-5">
                <p className="text-[#A0A0A0] text-lg leading-relaxed">
                  DigitalX is a growth-focused digital marketing company delivering{" "}
                  <span className="text-white font-medium">strategic branding</span>,{" "}
                  <span className="text-white font-medium">performance marketing</span>,{" "}
                  <span className="text-white font-medium">media production</span>, and{" "}
                  <span className="text-white font-medium">sales-driven digital solutions</span>.
                </p>
                <p className="text-[#A0A0A0] text-lg leading-relaxed">
                  We partner with businesses and personal brands to build strong digital presence,
                  streamline marketing systems, and achieve measurable results through structured,
                  insight-led execution.
                </p>
              </div>

              {/* Two feature rows */}
              <div className="space-y-3 pt-2">
                {[
                  { icon: "🎯", label: "Businesses & brands of all scales" },
                  { icon: "⚡", label: "Structured, insight-led execution" },
                  { icon: "🔗", label: "End-to-end digital ecosystem delivery" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 rounded-xl px-5 py-3.5 border border-[#2A2A2A] hover:border-[#C0141C]/30 transition-all duration-300"
                    style={{ background: "#111111" }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-[#A0A0A0] text-sm font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      <Homesection3 />

      {/* Vision & Mission Section */}
      <div className="relative bg-white py-24 2xl:py-32 3xl:py-40 4xl:py-48">
        <div className="w-[90%] max-w-[1280px] 2xl:max-w-[1920px] 3xl:max-w-[2560px] 4xl:max-w-[3440px] mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16 2xl:mb-20 3xl:mb-24 4xl:mb-32">
            <div className="inline-flex items-center border border-[#371445]/90 gap-2 px-3 py-1.5 2xl:px-4 2xl:py-2 3xl:px-5 3xl:py-2.5 4xl:px-6 4xl:py-3 bg-[#FFFFFF] rounded-full mb-6 2xl:mb-8 3xl:mb-10 4xl:mb-12">
              <Sparkles className="w-4 h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7 text-[#4a1c5e]" />
              <span className="text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl font-semibold text-[#4a1c5e]">
                Our Purpose
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl 2xl:text-6xl 3xl:text-7xl 4xl:text-8xl font-bold bg-gradient-to-br from-[#371445] via-[#4a1c5e] to-[#2a0e34] bg-clip-text text-transparent mb-3 2xl:mb-4 3xl:mb-6 4xl:mb-8 tracking-tight">
              Vision & Mission
            </h2>

            <div className="h-1 2xl:h-1.5 3xl:h-2 4xl:h-2.5 w-24 2xl:w-28 3xl:w-32 4xl:w-36 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto" />
          </div>

          {/* Cards Container */}
          <div className="space-y-8 2xl:space-y-10 3xl:space-y-12 4xl:space-y-16">
            {/* Vision Card */}
            <div className="group relative">
              <div className="relative bg-gradient-to-bl from-pink-50/50 to-white rounded-3xl 2xl:rounded-4xl 3xl:rounded-5xl 4xl:rounded-6xl border-2 border-pink-100 overflow-hidden hover:border-purple-300 hover:shadow-2xl transition-all duration-500">
                <div className="relative flex flex-col lg:flex-row items-center">
                  {/* Left Content Section */}
                  <div className="flex-1 p-10 md:p-14 lg:pr-8 2xl:p-16 3xl:p-20 4xl:p-24">
                    <div className="mb-6 2xl:mb-8 3xl:mb-10 4xl:mb-12">
                      <div className="inline-flex items-center gap-3 mb-4 2xl:mb-5 3xl:mb-6 4xl:mb-8">
                        <div className="w-14 h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 4xl:w-24 4xl:h-24 rounded-2xl 2xl:rounded-3xl 3xl:rounded-4xl 4xl:rounded-5xl bg-[#4a1c5e] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                          <Eye
                            className="w-7 h-7 2xl:w-8 2xl:h-8 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12 text-white"
                            strokeWidth={2.5}
                          />
                        </div>
                        <h3 className="text-3xl md:text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl font-bold text-[#371445]">
                          Powered by a Vision
                        </h3>
                      </div>
                      <div className="h-1 2xl:h-1.5 3xl:h-2 4xl:h-2.5 w-20 2xl:w-24 3xl:w-28 4xl:w-32 bg-gradient-to-r from-[#7B2D9E] to-purple-400 rounded-full" />
                    </div>

                    <p className="text-gray-700 text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl leading-relaxed">
                      To be a leading industry pioneer in software solutions and digital marketing within the next two
                      years by delivering high-quality, innovative, and reliable technology services. We are committed
                      to adopting sustainable green practices while empowering businesses with cutting-edge solutions
                      that enhance their digital presence. Our goal is to establish ourselves as a trusted partner,
                      ensuring long-term success for our clients and stakeholders through excellence, commitment, and
                      environmental responsibility.
                    </p>
                  </div>

                  {/* Right Decorative Section */}
                  <div className="relative lg:w-[300px] 2xl:w-[400px] 3xl:w-[500px] 4xl:w-[600px] h-72 lg:h-auto lg:aspect-square p-8 lg:p-12 2xl:p-14 3xl:p-16 4xl:p-20">
                    <div className="absolute inset-8 lg:inset-12 2xl:inset-14 3xl:inset-16 4xl:inset-20">
                      <div className="absolute inset-0 rounded-full border-2 border-purple-300/40 animate-[spin_25s_linear_infinite]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 2xl:w-4 2xl:h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6 rounded-full bg-[#2a0e34]" />
                      </div>
                      <div className="absolute inset-6 rounded-full border-2 border-purple-200/40 animate-[spin_18s_linear_infinite_reverse]">
                        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 2xl:w-3 2xl:h-3 3xl:w-4 3xl:h-4 4xl:w-5 4xl:h-5 rounded-full bg-[#2a0e34]" />
                      </div>
                      <div className="absolute inset-12 rounded-full border border-purple-100/40 animate-[spin_12s_linear_infinite]" />

                      {/* Center Orb */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-2xl animate-[pulse_3s_ease-in-out_infinite]" />
                          <div className="relative w-24 h-24 2xl:w-32 2xl:h-32 3xl:w-40 3xl:h-40 4xl:w-48 4xl:h-56 rounded-full bg-[#2a0e34] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-700">
                            <Eye
                              className="w-12 h-12 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 4xl:w-20 4xl:h-20 text-white"
                              strokeWidth={2}
                            />
                          </div>
                          <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 2xl:w-3 2xl:h-3 3xl:w-4 3xl:h-4 4xl:w-5 4xl:h-5 rounded-full bg-[#2a0e34]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group relative">
              <div className="relative bg-gradient-to-bl from-pink-50/50 to-white rounded-3xl 2xl:rounded-4xl 3xl:rounded-5xl 4xl:rounded-6xl border-2 border-pink-100 overflow-hidden hover:border-pink-300 hover:shadow-2xl transition-all duration-500">
                <div className="relative flex flex-col lg:flex-row-reverse items-center">
                  {/* Right Content Section */}
                  <div className="flex-1 p-10 md:p-14 lg:pl-8 2xl:p-16 3xl:p-20 4xl:p-24">
                    <div className="mb-6 2xl:mb-8 3xl:mb-10 4xl:mb-12">
                      <div className="inline-flex items-center gap-3 mb-4 2xl:mb-5 3xl:mb-6 4xl:mb-8">
                        <div className="w-14 h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 4xl:w-24 4xl:h-24 rounded-2xl 2xl:rounded-3xl 3xl:rounded-4xl 4xl:rounded-5xl bg-[#4a1c5e] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                          <Target
                            className="w-7 h-7 2xl:w-8 2xl:h-8 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12 text-white"
                            strokeWidth={2.5}
                          />
                        </div>
                        <h3 className="text-3xl md:text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl font-bold text-[#371445]">
                          Driven by a Mission
                        </h3>
                      </div>
                      <div className="h-1 2xl:h-1.5 3xl:h-2 4xl:h-2.5 w-20 2xl:w-24 3xl:w-28 4xl:w-32 bg-gradient-to-r from-[#7B2D9E] to-purple-400 rounded-full" />
                    </div>

                    <p className="text-gray-700 text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl leading-relaxed">
                      At Praskla Technology, our mission is to provide high-quality software solutions and result-driven
                      digital marketing strategies that drive efficiency, innovation, and growth for businesses. We are
                      dedicated to delivering value-driven technology that benefits all stakeholders while integrating
                      sustainable green practices to reduce our environmental footprint. By continuously improving,
                      prioritizing customer satisfaction, and helping our clients reach their consumers effectively, we
                      aim to set new industry standards and build lasting relationships.
                    </p>
                  </div>

                  {/* Left Decorative Section */}
                  <div className="relative lg:w-[300px] 2xl:w-[400px] 3xl:w-[500px] 4xl:w-[600px] h-72 lg:h-auto lg:aspect-square p-8 lg:p-12 2xl:p-14 3xl:p-16 4xl:p-20">
                    <div className="absolute inset-8 lg:inset-12 2xl:inset-14 3xl:inset-16 4xl:inset-20">
                      <div className="absolute inset-0 rounded-full border-2 border-pink-300/40 animate-[spin_22s_linear_infinite_reverse]">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 2xl:w-4 2xl:h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6 rounded-full bg-[#2a0e34]" />
                      </div>
                      <div className="absolute inset-6 rounded-full border-2 border-pink-200/40 animate-[spin_16s_linear_infinite]">
                        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 2xl:w-3 2xl:h-3 3xl:w-4 3xl:h-4 4xl:w-5 4xl:h-5 rounded-full  bg-[#2a0e34]" />
                      </div>
                      <div className="absolute inset-12 rounded-full border border-pink-100/40 animate-[spin_10s_linear_infinite_reverse]" />

                      {/* Center Orb */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div
                            className="absolute inset-0 bg-pink-400/20 rounded-full blur-2xl animate-[pulse_3s_ease-in-out_infinite]"
                            style={{ animationDelay: "1s" }}
                          />
                          <div className="relative w-24 h-24 2xl:w-32 2xl:h-32 3xl:w-40 3xl:h-40 4xl:w-48 4xl:h-56 rounded-full bg-[#4a1c5e] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-700">
                            <Target
                              className="w-12 h-12 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 4xl:w-20 4xl:h-20 text-white"
                              strokeWidth={2}
                            />
                          </div>
                          <div className="absolute inset-0 animate-[spin_7s_linear_infinite_reverse]">
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 2xl:w-3 2xl:h-3 3xl:w-4 3xl:h-4 4xl:w-5 4xl:h-5 rounded-full  bg-[#2a0e34]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Our Expertise */}
      <div className="relative bg-white py-20 2xl:py-28 3xl:py-36 4xl:py-44">
        <div className="w-[90%] max-w-[1280px] 2xl:max-w-[1920px] 3xl:max-w-[2560px] 4xl:max-w-[3440px] mx-auto">
          <div className="text-center mb-12 2xl:mb-16 3xl:mb-20 4xl:mb-24">
            <div className="inline-flex items-center border border-[#371445]/90 gap-2 px-3 py-1.5 2xl:px-4 2xl:py-2 3xl:px-5 3xl:py-2.5 4xl:px-6 4xl:py-3 bg-[#FFFFFF] rounded-full mb-6 2xl:mb-8 3xl:mb-10 4xl:mb-12">
              <Wrench className="w-4 h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7 text-[#4a1c5e]" />
              <span className="text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl font-semibold text-[#4a1c5e]">
                Our Purpose
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl font-bold text-[#371445] mb-4 2xl:mb-6 3xl:mb-8 4xl:mb-10">
              What we bring to the table
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 2xl:gap-8 3xl:gap-10 4xl:gap-12">
            <div className="group relative bg-gradient-to-br from-white to-purple-50/30 rounded-3xl 2xl:rounded-4xl 3xl:rounded-5xl 4xl:rounded-6xl p-8 2xl:p-10 3xl:p-12 4xl:p-16 border border-gray-200 hover:border-[#371445]/30 transition-all duration-300 hover:shadow-2xl">
              <div className="absolute top-6 right-6 text-6xl 2xl:text-7xl 3xl:text-8xl 4xl:text-9xl font-bold text-[#371445]/5">
                01
              </div>
              <div className="relative mb-6 2xl:mb-8 3xl:mb-10 4xl:mb-12">
                <div className="w-14 h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 4xl:w-24 4xl:h-24 bg-gradient-to-br from-[#371445] via-[#4a1c5e] to-[purple] rounded-2xl 2xl:rounded-3xl 3xl:rounded-4xl 4xl:rounded-5xl flex items-center justify-center text-white mb-4 2xl:mb-5 3xl:mb-6 4xl:mb-8">
                  <svg
                    className="w-7 h-7 2xl:w-8 2xl:h-8 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-bold text-[#371445] mb-3 2xl:mb-4 3xl:mb-5 4xl:mb-6">
                  Software Solutions
                </h3>
                <p className="text-gray-600 2xl:text-lg 3xl:text-xl 4xl:text-2xl leading-relaxed">
                  High-quality mobile app development and website development that ensure seamless user experiences.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-white to-purple-50/30 rounded-3xl 2xl:rounded-4xl 3xl:rounded-5xl 4xl:rounded-6xl p-8 2xl:p-10 3xl:p-12 4xl:p-16 border border-gray-200 hover:border-[#371445]/30 transition-all duration-300 hover:shadow-2xl md:mt-8">
              <div className="absolute top-6 right-6 text-6xl 2xl:text-7xl 3xl:text-8xl 4xl:text-9xl font-bold text-[#371445]/5">
                02
              </div>
              <div className="relative mb-6 2xl:mb-8 3xl:mb-10 4xl:mb-12">
                <div className="w-14 h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 4xl:w-24 4xl:h-24 bg-gradient-to-br from-[#371445] via-[#4a1c5e] to-[purple] rounded-2xl 2xl:rounded-3xl 3xl:rounded-4xl 4xl:rounded-5xl flex items-center justify-center text-white mb-4 2xl:mb-5 3xl:mb-6 4xl:mb-8">
                  <svg
                    className="w-7 h-7 2xl:w-8 2xl:h-8 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-bold text-[#371445] mb-3 2xl:mb-4 3xl:mb-5 4xl:mb-6">
                  Digital Marketing
                </h3>
                <p className="text-gray-600 2xl:text-lg 3xl:text-xl 4xl:text-2xl leading-relaxed">
                  Strategic online marketing solutions, including SEO and social media management.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-white to-purple-50/30 rounded-3xl 2xl:rounded-4xl 3xl:rounded-5xl 4xl:rounded-6xl p-8 2xl:p-10 3xl:p-12 4xl:p-16 border border-gray-200 hover:border-[#371445]/30 transition-all duration-300 hover:shadow-2xl md:mt-16">
              <div className="absolute top-6 right-6 text-6xl 2xl:text-7xl 3xl:text-8xl 4xl:text-9xl font-bold text-[#371445]/5">
                03
              </div>
              <div className="relative mb-6 2xl:mb-8 3xl:mb-10 4xl:mb-12">
                <div className="w-14 h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 4xl:w-24 4xl:h-24 bg-gradient-to-br from-[#371445] via-[#4a1c5e] to-[purple] rounded-2xl 2xl:rounded-3xl 3xl:rounded-4xl 4xl:rounded-5xl flex items-center justify-center text-white mb-4 2xl:mb-5 3xl:mb-6 4xl:mb-8">
                  <Shield className="w-7 h-7 2xl:w-8 2xl:h-8 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12" />
                </div>
                <h3 className="text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-bold text-[#371445] mb-3 2xl:mb-4 3xl:mb-5 4xl:mb-6">
                  IT Security Solutions
                </h3>
                <p className="text-gray-600 2xl:text-lg 3xl:text-xl 4xl:text-2xl leading-relaxed">
                  Advanced security services to safeguard businesses from cyber threats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;