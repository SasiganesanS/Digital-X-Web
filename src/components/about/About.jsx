import React from "react";
import { Link } from "react-router-dom";
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
import pyLogo from "../../assets/Praskla_Digital_X_Logo_Trasnparent_Background.png";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Teams from "../Teams";

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

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>
      {/* ── About Hero Section ── */}
      <section className="relative h-screen min-h-[100vh] max-h-[100vh] flex items-center overflow-hidden">

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
              {/* Eyebrow label — glitter badge */}
              <div
                className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(232,25,44,0.18) 0%, rgba(0,0,0,0.6) 50%, rgba(232,25,44,0.12) 100%)",
                  border: "1px solid rgba(232,25,44,0.5)",
                  boxShadow: "0 0 18px rgba(232,25,44,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)" }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
                />
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-[#E8192C]/80 to-transparent" />
                {[{ top: "20%", left: "8%", delay: 0 }, { top: "70%", left: "15%", delay: 0.4 }, { top: "30%", right: "10%", delay: 0.8 }, { top: "65%", right: "18%", delay: 0.2 }, { top: "15%", left: "45%", delay: 0.6 }].map((pos, i) => (
                  <motion.span key={i} className="absolute w-[3px] h-[3px] rounded-full bg-white"
                    style={{ top: pos.top, left: pos.left, right: pos.right }}
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }} />
                ))}
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8192C] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E8192C]" />
                </span>
                <span className="relative text-white text-xs sm:text-sm font-bold tracking-[0.3em] uppercase"
                  style={{ textShadow: "0 0 10px rgba(232,25,44,0.7)" }}>About Us</span>
                <motion.span className="relative text-[#E8192C] text-base leading-none"
                  animate={{ rotate: [0, 180, 360], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>✦</motion.span>
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
                className="relative rounded-2xl p-8 overflow-hidden border border-[#2A2A2A] transition-all duration-300 ease-out hover:-translate-y-[5px] hover:border-[#E8192C]/70 hover:shadow-[0_0_32px_rgba(232,25,44,0.35),0_0_0_1px_rgba(232,25,44,0.2)]"
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
                      <img src={pyLogo} alt="Praskla Digital X" className="w-12 h-12 object-contain" style={{ filter: "url(#logo-dark-mode-filter)" }} />
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
                  { title: "Clarity", desc: "Thoughtful strategies with defined direction" },
                  { title: "Collaboration", desc: "Strong partnerships that grow together" },
                  { title: "Innovation", desc: "Creative, future-ready marketing solutions" },
                ].map((v, i) => (
                  <motion.div
                    key={i}
                    className="rounded-xl p-4 text-center border border-[#2A2A2A] transition-all duration-300 ease-out cursor-default group hover:-translate-y-[5px] hover:border-[#E8192C]/70 hover:shadow-[0_0_28px_rgba(232,25,44,0.3),0_0_0_1px_rgba(232,25,44,0.15)]"
                    style={{ background: "#111111" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  >
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
      </section>
      {/* ═══════════════════════════════════════════════
          WHO WE ARE — Praskla Digital X identity section
      ═══════════════════════════════════════════════ */}
      <div
        className="relative py-12 lg:py-16 overflow-hidden mt-[200px]"
        style={{ background: "#080808" }}
      >
        {/* Subtle section divider glow */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(192,20,28,0.3), transparent)" }}
        />

        <div className="relative z-10 w-[90%] max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* Left side text container */}
            <motion.div
              className="space-y-7"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              {/* Eyebrow — glitter badge */}
              <div
                className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(232,25,44,0.18) 0%, rgba(0,0,0,0.6) 50%, rgba(232,25,44,0.12) 100%)",
                  border: "1px solid rgba(232,25,44,0.5)",
                  boxShadow: "0 0 18px rgba(232,25,44,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)" }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
                />
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-[#E8192C]/80 to-transparent" />
                {[{ top: "20%", left: "8%", delay: 0 }, { top: "70%", left: "15%", delay: 0.4 }, { top: "30%", right: "10%", delay: 0.8 }, { top: "65%", right: "18%", delay: 0.2 }, { top: "15%", left: "45%", delay: 0.6 }].map((pos, i) => (
                  <motion.span key={i} className="absolute w-[3px] h-[3px] rounded-full bg-white"
                    style={{ top: pos.top, left: pos.left, right: pos.right }}
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }} />
                ))}
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8192C] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E8192C]" />
                </span>
                <span className="relative text-white text-xs sm:text-sm font-bold tracking-[0.3em] uppercase"
                  style={{ textShadow: "0 0 10px rgba(232,25,44,0.7)" }}>Who We Are</span>
                <motion.span className="relative text-[#E8192C] text-base leading-none"
                  animate={{ rotate: [0, 180, 360], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>✦</motion.span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-white">
                A mindful partner in{" "}
                <span style={{ background: "linear-gradient(135deg, #C0141C 0%, #E02020 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  digital growth
                </span>{" "}and brand innovation.
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
            </motion.div>

            {/* Right side Visual Container (Orbital 3D Cards) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center mt-10 lg:mt-0"
            >
              {/* Outer Glow behind the rings */}
              <div className="absolute inset-0 bg-[#E8192C]/20 rounded-full blur-[100px] pointer-events-none" />

              {/* 3D Rings */}
              <motion.div
                className="absolute w-[90%] h-[90%] rounded-full border border-white/20"
                style={{ transform: "rotateX(65deg)", transformOrigin: "center" }}
                animate={{ rotateZ: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-0 left-[20%] w-2 h-2 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.8)]" />
              </motion.div>

              <motion.div
                className="absolute w-[100%] h-[100%] rounded-full border-[2px] border-[#E8192C]/30"
                style={{ transform: "rotateX(65deg) rotateY(10deg)", transformOrigin: "center" }}
                animate={{ rotateZ: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute bottom-0 right-[20%] w-2 h-2 rounded-full bg-[#E8192C] shadow-[0_0_10px_3px_rgba(232,25,44,0.8)]" />
              </motion.div>

              {/* Sparkles globally scattered */}
              {[...Array(15)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute w-[2px] h-[2px] rounded-full bg-white z-0 pointer-events-none"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    boxShadow: "0 0 8px 2px rgba(232,25,44,0.8)",
                  }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                  transition={{ duration: 1.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                />
              ))}

              {/* Center Core: PRASKLA */}
              <div className="relative z-10 w-32 h-32 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-[#E8192C] to-[#400000] border border-white/20 shadow-[0_0_40px_rgba(232,25,44,0.6)] flex items-center justify-center transform -translate-y-4">
                {/* Internal container glow */}
                <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#ff6b7b]/30 to-transparent rounded-b-2xl" />
                <span className="relative text-white font-black text-xl md:text-2xl tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  DIGITALX
                </span>
              </div>

              {/* Card 1: TOP (Growth Focused) */}
              <motion.div
                className="absolute z-20 -top-8 right-[5%] w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-[#1a0000]/90 to-[#E8192C]/40 backdrop-blur-xl border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-4 gap-2 rotate-6"
                animate={{ y: [-10, 10, -10], rotate: [6, 4, 6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 rounded-3xl border-t border-white/30 opacity-50" />
                <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-md" />
                <span className="text-white text-xs md:text-[13px] font-bold text-center tracking-wide mt-1">Growth Focused</span>
              </motion.div>

              {/* Card 2: BOTTOM LEFT (Client Centric) */}
              <motion.div
                className="absolute z-20 bottom-0 -left-[10%] md:-left-[5%] w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-gradient-to-br from-[#1a0000]/90 to-[#E8192C]/40 backdrop-blur-xl border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-4 gap-2 -rotate-12"
                animate={{ y: [10, -10, 10], rotate: [-12, -10, -12] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 rounded-3xl border-l border-white/30 opacity-50" />
                <Users className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-md" />
                <span className="text-white text-xs md:text-sm font-bold text-center tracking-wide mt-1">Client Centric</span>
              </motion.div>

              {/* Card 3: BOTTOM RIGHT (Secure & Reliable) */}
              <motion.div
                className="absolute z-20 bottom-4 -right-[5%] md:right-[0%] w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-gradient-to-br from-[#1a0000]/90 to-[#E8192C]/40 backdrop-blur-xl border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-4 gap-2 rotate-12"
                animate={{ y: [-8, 8, -8], rotate: [12, 14, 12] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 rounded-3xl border-r border-[#E8192C]/30 opacity-50" />
                <Shield className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-md" />
                <span className="text-white text-xs md:text-sm font-bold text-center tracking-wide mt-1">Secure & Reliable</span>
              </motion.div>

            </motion.div>

          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <section className="relative overflow-hidden" style={{ background: "#080808" }}>
        <Teams />
      </section>

      {/* <Homesection3 /> */}

      {/* Vision & Mission Section — staggered steps */}
      <section className="relative py-10 md:py-14 overflow-visible scroll-mt-24" style={{ background: "#080808" }}>
        <div className="relative z-10 w-[90%] max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-10">
            <div className="flex justify-center">
              <div
                className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(232,25,44,0.18) 0%, rgba(0,0,0,0.6) 50%, rgba(232,25,44,0.12) 100%)",
                  border: "1px solid rgba(232,25,44,0.5)",
                  boxShadow: "0 0 18px rgba(232,25,44,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)" }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
                />
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-[#E8192C]/80 to-transparent" />
                {[{ top: "20%", left: "8%", delay: 0 }, { top: "70%", left: "15%", delay: 0.4 }, { top: "30%", right: "10%", delay: 0.8 }, { top: "65%", right: "18%", delay: 0.2 }, { top: "15%", left: "45%", delay: 0.6 }].map((pos, i) => (
                  <motion.span key={i} className="absolute w-[3px] h-[3px] rounded-full bg-white"
                    style={{ top: pos.top, left: pos.left, right: pos.right }}
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }} />
                ))}
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8192C] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E8192C]" />
                </span>
                <span className="relative text-white text-xs sm:text-sm font-bold tracking-[0.3em] uppercase"
                  style={{ textShadow: "0 0 10px rgba(232,25,44,0.7)" }}>Vision & Mission</span>
                <motion.span className="relative text-[#E8192C] text-base leading-none"
                  animate={{ rotate: [0, 180, 360], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>✦</motion.span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 md:gap-6 max-w-5xl mx-auto px-4 pb-6">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative rounded-[2rem] overflow-hidden w-full md:max-w-[88%] md:mr-auto"
            style={{
              background: "linear-gradient(135deg, rgba(232,25,44,0.07) 0%, rgba(12,12,12,0.98) 40%, rgba(232,25,44,0.04) 100%)",
              border: "1px solid rgba(232,25,44,0.3)",
              boxShadow: "0 0 60px rgba(232,25,44,0.1), 0 0 120px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#E8192C]/60 to-transparent" />
            <div className="absolute top-0 left-0 w-40 h-40 opacity-20"
              style={{ background: "radial-gradient(circle at top left, rgba(232,25,44,0.5), transparent 70%)" }} />
            {[{ top: "15%", left: "5%", delay: 0 }, { top: "75%", left: "10%", delay: 0.5 }, { top: "20%", right: "8%", delay: 1 }, { top: "70%", right: "12%", delay: 0.3 }, { top: "45%", left: "50%", delay: 0.7 }].map((pos, i) => (
              <motion.span key={i} className="absolute w-[2px] h-[2px] rounded-full bg-white/50 pointer-events-none"
                style={{ top: pos.top, left: pos.left, right: pos.right }}
                animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.3, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }} />
            ))}
            <div className="relative z-10 flex flex-col md:flex-row items-start gap-6 p-6 md:p-10">
              <div className="flex flex-col gap-3 flex-shrink-0">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#E8192C]/20 border border-[#E8192C]/50 text-[#E8192C] text-sm font-black font-mono">01</span>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(232,25,44,0.12)", border: "1px solid rgba(232,25,44,0.35)", boxShadow: "0 0 20px rgba(232,25,44,0.2)" }}>
                  <Eye className="w-8 h-8 text-[#E8192C]" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[#E8192C] text-xs font-bold tracking-[0.25em] uppercase block mb-2"
                  style={{ textShadow: "0 0 8px rgba(232,25,44,0.4)" }}>Our Vision</span>
                <h3 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight">Powered by a Vision</h3>
                <div className="w-12 h-0.5 rounded-full mb-4" style={{ background: "linear-gradient(90deg, #E8192C, transparent)" }} />
                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                  To become a leading mindful marketing firm known for innovative strategies, measurable growth, and long-term brand impact. We envision building a collaborative ecosystem where businesses scale confidently through creative storytelling, data intelligence, and sustainable growth practices — becoming a trusted partner in every stage of their journey.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="relative rounded-[2rem] overflow-hidden w-full md:max-w-[88%] md:ml-auto"
            style={{
              background: "linear-gradient(135deg, rgba(232,25,44,0.07) 0%, rgba(12,12,12,0.98) 40%, rgba(232,25,44,0.04) 100%)",
              border: "1px solid rgba(232,25,44,0.3)",
              boxShadow: "0 0 60px rgba(232,25,44,0.1), 0 0 120px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#E8192C]/60 to-transparent" />
            <div className="absolute top-0 right-0 w-40 h-40 opacity-20"
              style={{ background: "radial-gradient(circle at top right, rgba(232,25,44,0.5), transparent 70%)" }} />
            {[{ top: "15%", left: "5%", delay: 0.2 }, { top: "75%", left: "10%", delay: 0.7 }, { top: "20%", right: "8%", delay: 1.2 }, { top: "70%", right: "12%", delay: 0.5 }, { top: "45%", left: "50%", delay: 0.9 }].map((pos, i) => (
              <motion.span key={i} className="absolute w-[2px] h-[2px] rounded-full bg-white/50 pointer-events-none"
                style={{ top: pos.top, left: pos.left, right: pos.right }}
                animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.3, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }} />
            ))}
            <div className="relative z-10 flex flex-col md:flex-row items-start gap-6 p-6 md:p-10">
              <div className="flex flex-col gap-3 flex-shrink-0">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#E8192C]/20 border border-[#E8192C]/50 text-[#E8192C] text-sm font-black font-mono">02</span>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(232,25,44,0.12)", border: "1px solid rgba(232,25,44,0.35)", boxShadow: "0 0 20px rgba(232,25,44,0.2)" }}>
                  <Target className="w-8 h-8 text-[#E8192C]" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[#E8192C] text-xs font-bold tracking-[0.25em] uppercase block mb-2"
                  style={{ textShadow: "0 0 8px rgba(232,25,44,0.4)" }}>Our Mission</span>
                <h3 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight">Driven by a Mission</h3>
                <div className="w-12 h-0.5 rounded-full mb-4" style={{ background: "linear-gradient(90deg, #E8192C, transparent)" }} />
                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                  At DigitalX, our mission is to deliver performance-driven marketing strategies and impactful brand experiences that accelerate visibility, credibility, and revenue growth. We are committed to transforming investments into measurable returns through continuous optimization, creative excellence, and transparent partnerships that prioritize shared success.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Bring to the Table — Expertise Section */}
      <section className="relative w-full py-24 md:py-32 bg-[#080808] overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.05]"
            style={{ background: "radial-gradient(circle, #E8192C 0%, transparent 70%)", filter: "blur(100px)" }} />
        </div>

        <div className="relative z-10 w-[92%] max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mb-6"
            >
              <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#E8192C]/40 bg-[#E8192C]/5 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-[#E8192C] animate-pulse shadow-[0_0_8px_#E8192C]" />
                <span className="text-white text-xs font-black tracking-[0.4em] uppercase">Our Expertise</span>
              </div>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-white"
            >
              What We <span className="text-[#E8192C]">Bring to the Table</span>
            </motion.h2>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch justify-center -space-y-4 lg:-space-y-0 lg:-space-x-12">
            {[
              {
                id: "01",
                icon: "🎯",
                title: "Mindful Brand Strategy",
                desc: "Strategic brand positioning and content ecosystems designed to build authority, clarity, and long-term recognition.",
                type: "start"
              },
              {
                id: "02",
                icon: "📈",
                title: "Performance Marketing",
                desc: "Data-driven campaigns including SEO, Meta Ads, PPC, and social media management focused on measurable growth and ROI.",
                type: "middle"
              },
              {
                id: "03",
                icon: "🎬",
                title: "Creative Media & Production",
                desc: "High-impact videography, photography, post-production, and digital storytelling that transform businesses into powerful visual brands.",
                type: "end"
              }
            ].map((item, index) => {
              const [isHovered, setIsHovered] = useState(false);
              
              return (
                <motion.div
                  key={item.id}
                  onMouseEnter={() => setIsHovered(index === 0 ? true : true)} // Force state for all
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative flex-1 group min-h-[350px] cursor-default"
                  style={{ zIndex: isHovered ? 20 : index }}
                >
                  {/* Custom Thick Red Border (Outer Layer) */}
                  <div 
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      isHovered ? "bg-[#E8192C] shadow-[0_0_40px_rgba(232,25,44,0.5)]" : "bg-[#E8192C]/40"
                    }`}
                    style={{
                      clipPath: item.type === "start" 
                        ? "polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%)"
                        : item.type === "middle"
                        ? "polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%, 12% 50%)"
                        : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 12% 50%)",
                    }}
                  />

                  {/* Card Core (Inner Layer - Inset to create border effect) */}
                  <div 
                    className={`absolute inset-[2.5px] transition-all duration-700 ease-out ${
                      isHovered ? "bg-[#B71422]" : "bg-[#111111]"
                    }`}
                    style={{
                      clipPath: item.type === "start" 
                        ? "polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%)"
                        : item.type === "middle"
                        ? "polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%, 12% 50%)"
                        : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 12% 50%)",
                    }}
                  />

                  {/* Sparkles (Appear on hover) */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        initial={{ opacity: 0 }}
                        animate={isHovered ? {
                          opacity: [0, 1, 0],
                          scale: [0.5, 1.2, 0.5],
                          y: ["0%", "-30%"]
                        } : { opacity: 0 }}
                        transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: Math.random() }}
                        style={{
                          left: `${Math.random() * 80 + 10}%`,
                          top: `${Math.random() * 80 + 10}%`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Content Area */}
                  <div className="relative z-20 h-full p-10 md:p-14 flex flex-col justify-center items-start pr-16 lg:pr-20 pl-10 lg:pl-16">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-3xl filter grayscale brightness-200">{item.icon}</span>
                      <span className={`text-xl font-black ${isHovered ? "text-white/40" : "text-[#E8192C]/30"}`}>
                        {item.id}
                      </span>
                    </div>
                    
                    <h3 className={`text-2xl md:text-3xl font-black mb-6 leading-tight transition-colors duration-500 ${
                      isHovered ? "text-white" : "text-white/90"
                    }`}>
                      {item.title}
                    </h3>
                    
                    <p className={`text-base md:text-lg leading-relaxed transition-all duration-500 ${
                      isHovered ? "text-white/95 font-medium" : "text-white/40"
                    }`}>
                      {item.desc}
                    </p>

                    <motion.div 
                      className="mt-10 flex items-center gap-3"
                      animate={{ x: isHovered ? 10 : 0 }}
                    >
                      <div className={`w-8 h-px ${isHovered ? "bg-white" : "bg-[#E8192C]/40"}`} />
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${
                        isHovered ? "text-white" : "text-[#E8192C]/60"
                      }`}>Explore</span>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explore Our Services CTA */}
      <div className="relative py-16 md:py-24 overflow-hidden" style={{ background: "#080808" }}>
        <div className="relative z-10 w-[90%] max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 relative overflow-hidden group"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#E8192C]/10 rounded-full blur-[80px] group-hover:bg-[#E8192C]/20 transition-all duration-700" />

            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
              Ready to Transform <br />
              <span className="text-[#E8192C]">Your Digital Presence?</span>
            </h2>
            <p className="text-white/50 text-base md:text-lg mb-10 max-w-2xl mx-auto">
              From mindful strategy to high-performance execution, we bring the tools and expertise to scale your brand effectively.
            </p>

            <Link
              to="/services"
              className="inline-flex items-center gap-3 bg-[#E8192C] hover:bg-[#ff1f35] text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(232,25,44,0.3)]"
            >
              Explore Our Services
              <Zap className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div >
  );
};

export default About;