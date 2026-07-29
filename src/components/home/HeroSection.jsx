import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SolarSystemHero from "./SolarSystemHero";
import HeroLayout from "../common/HeroLayout";

function AnimatedStat({ targetNum, suffix = "+", label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const start = performance.now();
    const numVal = parseInt(targetNum, 10) || 0;

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const current = Math.floor(progress * numVal);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [targetNum]);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="clay-card relative flex flex-col items-center text-center py-4 px-3 cursor-default"
    >
      <p className="text-[#E31D2E] font-black text-xl sm:text-3xl">
        {count}{suffix}
      </p>
      <p className="text-[#575757] text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.18em] mt-1">
        {label}
      </p>
    </motion.div>
  );
}

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 18;
    const y = (clientY / innerHeight - 0.5) * 18;
    setMousePos({ x, y });
  };

  const bgElements = (
    <>
      {/* ── Background Layer 1: Ambient Glows & Noise Grid ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(227,29,46,0.05) 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          style={{
            transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)`,
          }}
          className="absolute -top-20 left-10 w-[450px] h-[450px] rounded-full bg-[#E31D2E]/5 blur-[120px]"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{
            transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
          }}
          className="absolute bottom-0 right-10 w-[500px] h-[500px] rounded-full bg-[#E31D2E]/4 blur-[140px]"
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #111111 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        onClick={() => {
          const el = document.getElementById("projects") || document.getElementById("expertise");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#575757]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-7 rounded-full border border-neutral-300 flex items-start justify-center p-1 bg-white/40 backdrop-blur-xs"
        >
          <span className="w-1 h-1.5 rounded-full bg-[#E31D2E]" />
        </motion.div>
      </motion.div>
    </>
  );

  const badge = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
      transition={{
        opacity: { duration: 0.6, ease: "easeOut" },
        scale: { duration: 0.6, ease: "easeOut" },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      }}
      className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full overflow-hidden border border-[#E31D2E]/20 bg-white/60 shadow-[0_8px_16px_rgba(17,17,17,0.03)] backdrop-blur-sm"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31D2E]" />
      </span>
      <span className="relative text-[#111111] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
        A Mindful Marketing and Production Firm
      </span>
    </motion.div>
  );

  const title = (
    <h1
      className="font-black leading-[1.08] tracking-tight text-[#111111] w-full text-4xl sm:text-5xl lg:text-[52px]"
    >
      <motion.span
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="inline-block"
      >
        Where brands evolve into
      </motion.span>{" "}
      <motion.span
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
        className="relative inline-block text-[#E31D2E]"
      >
        powerful
      </motion.span>{" "}
      <motion.span
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
        className="inline-block"
      >
        digital movements.
      </motion.span>
    </h1>
  );

  const description = (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      className="text-[#575757] text-sm sm:text-base font-medium leading-relaxed max-w-lg"
    >
      Your strategic growth partner for branding, performance marketing,
      and long-term digital scale. We don't just create campaigns; we build legacies.
    </motion.p>
  );

  const actions = (
    <div className="flex flex-col items-center lg:items-start gap-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.95 }}
      >
        <Link
          to="/projects"
          className="primary-btn group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.15em] sm:tracking-[0.18em] text-white shadow-md hover:scale-102 transition-all"
        >
          <span className="relative z-10">See Our Work</span>
          <svg
            className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="grid grid-cols-3 gap-3 w-full max-w-[280px] sm:max-w-xs lg:max-w-sm"
      >
        <AnimatedStat targetNum="15" suffix="+" label="Clients" />
        <AnimatedStat targetNum="20" suffix="+" label="Projects" />
        <AnimatedStat targetNum="20" suffix="+" label="Tie-ups" />
      </motion.div>
    </div>
  );

  const media = (
    <motion.div
      className="w-full max-w-[420px] sm:max-w-[460px] lg:max-w-none lg:w-[500px] flex-shrink-0 relative mx-auto lg:mx-0 transition-transform duration-300 ease-out"
      style={{
        transform: `translate3d(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px, 0)`,
      }}
      initial={{ opacity: 0, scale: 0.8, x: 40 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
    >
      <SolarSystemHero />
    </motion.div>
  );

  return (
    <HeroLayout
      sectionId="home"
      onMouseMove={handleMouseMove}
      bgElements={bgElements}
      badge={badge}
      title={title}
      description={description}
      actions={actions}
      media={media}
    />
  );
};

export default HeroSection;