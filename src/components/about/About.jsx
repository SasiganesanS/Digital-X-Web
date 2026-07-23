import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Wrench,
  Shield,
  TrendingUp,
  Eye,
  Target,
  Award
} from "lucide-react";
import pyLogo from "../../assets/Praskla_Digital_X_Logo_Trasnparent_Background.png";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Teams from "../Teams";

const About = () => {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const phrases = [
    "We Build Powerful Brand Identities",
    "We Create Data-Driven Marketing Systems",
    "We Deliver High-Impact Digital Campaigns",
    "We Transform Businesses into Recognized Brands",
  ];

  return (
    <div className="min-h-screen bg-transparent" style={{ backgroundColor: "transparent" }}>
      {/* ── About Hero Section ── */}
      <section className="relative h-screen min-h-[100vh] max-h-[100vh] flex items-center overflow-hidden bg-transparent">

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
              <div
                className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full overflow-hidden border border-[#E31D2E]/20 bg-white/60 shadow-[0_8px_16px_rgba(17,17,17,0.03)]"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E31D2E]" />
                </span>
                <span className="relative text-[#111111] text-xs sm:text-sm font-bold tracking-[0.3em] uppercase">About Us</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-black leading-[1.1] tracking-tight text-[#111111]">
                Where Mindful Strategy{" "}
                <span className="inline-block text-[#E31D2E]">
                  Meets Scalable Growth
                </span>
              </h1>

              {/* Sub-copy */}
              <p className="text-[#575757] text-lg leading-relaxed max-w-xl font-medium">
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
                      style={{ background: "rgba(227,29,46,0.1)", color: "#E31D2E" }}
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[#575757] text-sm leading-relaxed font-semibold">{point}</span>
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
                className="relative rounded-3xl p-8 overflow-hidden border border-white/50 transition-all duration-300 ease-out shadow-[0_12px_32px_rgba(17,17,17,0.04)] bg-white/60"
              >
                {/* Logo orb */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center bg-white border border-gray-100 shadow-sm"
                    >
                      <img src={pyLogo} alt="Praskla Digital X" className="w-12 h-12 object-contain" />
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
                      className="text-[#111111] font-black text-lg text-center"
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
                        background: idx === index ? "#E31D2E" : "rgba(17,17,17,0.1)",
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
                    className="clay-card rounded-xl p-4 text-center transition-all duration-300 ease-out cursor-default group hover:-translate-y-[5px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  >
                    <h4 className="text-[#111111] font-bold text-sm mb-1 group-hover:text-[#E31D2E] transition-colors duration-300">
                      {v.title}
                    </h4>
                    <p className="text-[#8B8B8B] text-[10px] leading-snug font-medium">{v.desc}</p>
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
        className="relative py-16 lg:py-24 overflow-hidden bg-transparent"
      >
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
              {/* Eyebrow badge */}
              <div
                className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#E31D2E]/20 bg-white/60 shadow-[0_8px_16px_rgba(17,17,17,0.03)]"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E31D2E]" />
                </span>
                <span className="relative text-[#111111] text-xs sm:text-sm font-bold tracking-[0.3em] uppercase">Who we are</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] leading-tight">
                A Team Built for{" "}
                <span className="text-[#E31D2E]">Impact and Scale</span>
              </h2>

              <p className="text-[#575757] text-base sm:text-lg leading-relaxed font-medium">
                At PRASKLA Digital X, we bring together creative visual creators, copywriting experts,
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

      {/* Vision & Mission Section */}
      <section className="relative py-16 overflow-visible bg-transparent">
        <div className="relative z-10 w-[90%] max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center">
              <div
                className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#E31D2E]/20 bg-white/60 shadow-[0_8px_16px_rgba(17,17,17,0.03)]"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E31D2E]" />
                </span>
                <span className="relative text-[#111111] text-xs sm:text-sm font-bold tracking-[0.3em] uppercase">Vision & Mission</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 max-w-5xl mx-auto px-4 pb-6">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative rounded-[2rem] overflow-hidden w-full md:max-w-[88%] md:mr-auto"
            style={{
              background: "rgba(255, 255, 255, 0.65)",
              backdropFilter: "blur(20px) saturate(120%)",
              WebkitBackdropFilter: "blur(20px) saturate(120%)",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              boxShadow: "0 12px 32px rgba(17, 17, 17, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            }}
          >
            <div className="relative z-10 flex flex-col md:flex-row items-start gap-6 p-6 md:p-10">
              <div className="flex flex-col gap-3 flex-shrink-0">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#E31D2E]/10 border border-[#E31D2E]/30 text-[#E31D2E] text-sm font-black font-mono">01</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[#E31D2E] text-xs font-bold tracking-[0.25em] uppercase block mb-2">Our Vision</span>
                <h3 className="text-xl md:text-2xl font-black text-[#111111] mb-3 tracking-tight">Powered by a Vision</h3>
                <div className="w-12 h-0.5 rounded-full mb-4 bg-gradient-to-r from-[#E31D2E] to-transparent" />
                <p className="text-[#575757] text-sm md:text-base leading-relaxed">
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
              background: "rgba(255, 255, 255, 0.65)",
              backdropFilter: "blur(20px) saturate(120%)",
              WebkitBackdropFilter: "blur(20px) saturate(120%)",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              boxShadow: "0 12px 32px rgba(17, 17, 17, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            }}
          >
            <div className="relative z-10 flex flex-col md:flex-row items-start gap-6 p-6 md:p-10">
              <div className="flex flex-col gap-3 flex-shrink-0">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#E31D2E]/10 border border-[#E31D2E]/30 text-[#E31D2E] text-sm font-black font-mono">02</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[#E31D2E] text-xs font-bold tracking-[0.25em] uppercase block mb-2">Our Mission</span>
                <h3 className="text-xl md:text-2xl font-black text-[#111111] mb-3 tracking-tight">Driven by a Mission</h3>
                <div className="w-12 h-0.5 rounded-full mb-4 bg-gradient-to-r from-[#E31D2E] to-transparent" />
                <p className="text-[#575757] text-sm md:text-base leading-relaxed">
                  At Praskla Digital X, our mission is to deliver performance-driven marketing strategies and impactful brand experiences that accelerate visibility, credibility, and revenue growth. We are committed to transforming investments into measurable returns through continuous optimization, creative excellence, and transparent partnerships that prioritize shared success.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Bring to the Table — Expertise Section */}
      <section className="relative w-full py-24 md:py-32 bg-transparent overflow-hidden">
        <div className="relative z-10 w-[92%] max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mb-6"
            >
              <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#E31D2E]/20 bg-white/60">
                <div className="w-2 h-2 rounded-full bg-[#E31D2E] shadow-[0_0_8px_#E31D2E]" />
                <span className="text-[#111111] text-xs font-black tracking-[0.3em] uppercase">Our Expertise</span>
              </div>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-[#111111]"
            >
              What We <span className="text-[#E31D2E]">Bring to the Table</span>
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
                  onMouseEnter={() => setIsHovered(true)}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative flex-1 group min-h-[350px] cursor-default"
                  style={{ zIndex: isHovered ? 20 : index }}
                >
                  {/* Outer layer border */}
                  <div 
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      isHovered ? "bg-[#991A23] shadow-md" : "bg-white/60"
                    }`}
                    style={{
                      clipPath: item.type === "start" 
                        ? "polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%)"
                        : item.type === "middle"
                        ? "polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%, 12% 50%)"
                        : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 12% 50%)",
                    }}
                  />

                  {/* Core Inner Layer */}
                  <div 
                    className={`absolute inset-[2.5px] transition-all duration-700 ease-out ${
                      isHovered ? "bg-[#E31D2E]" : "bg-white"
                    }`}
                    style={{
                      clipPath: item.type === "start" 
                        ? "polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%)"
                        : item.type === "middle"
                        ? "polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%, 12% 50%)"
                        : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 12% 50%)",
                    }}
                  />

                  {/* Content Area */}
                  <div className="relative z-20 h-full p-10 md:p-14 flex flex-col justify-center items-start pr-16 lg:pr-20 pl-10 lg:pl-16">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-3xl filter grayscale brightness-200">{item.icon}</span>
                      <span className={`text-xl font-black ${isHovered ? "text-white/40" : "text-[#E31D2E]/30"}`}>
                        {item.id}
                      </span>
                    </div>
                    
                    <h3 className={`text-2xl md:text-3xl font-black mb-6 leading-tight transition-colors duration-500 ${
                      isHovered ? "text-white" : "text-[#111111]"
                    }`}>
                      {item.title}
                    </h3>
                    
                    <p className={`text-base md:text-lg leading-relaxed transition-all duration-500 ${
                      isHovered ? "text-white/95 font-medium" : "text-[#575757]"
                    }`}>
                      {item.desc}
                    </p>

                    <motion.div 
                      className="mt-10 flex items-center gap-3"
                      animate={{ x: isHovered ? 10 : 0 }}
                    >
                      <div className={`w-8 h-px ${isHovered ? "bg-white" : "bg-[#E31D2E]/40"}`} />
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${
                        isHovered ? "text-white" : "text-[#E31D2E]/60"
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
      <div className="relative py-16 md:py-24 overflow-hidden bg-transparent">
        <div className="relative z-10 w-[90%] max-w-4xl mx-auto text-center">
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
              className="inline-flex items-center gap-3 bg-[#E31D2E] hover:bg-[#111111] text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_8px_20px_rgba(227,29,46,0.15)]"
            >
              <span className="text-white">Explore Our Services</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div >
  );
};

export default About;