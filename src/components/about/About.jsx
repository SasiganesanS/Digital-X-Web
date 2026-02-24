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
import { useState, useEffect } from "react";
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

      {/* Our Team Section */}
      <section className="relative overflow-hidden" style={{ background: "#080808" }}>
        <Teams />
      </section>

      {/* <Homesection3 /> */}

      {/* Vision & Mission Section
      <div className="relative bg-white py-24 2xl:py-32 3xl:py-40 4xl:py-48">
        ... (commented out)
      </div> */}
      {/* Our Expertise
      <div className="relative bg-white py-20 2xl:py-28 3xl:py-36 4xl:py-44">
        ... (commented out)
      </div> */}
    </div>
  );
};
export default About;