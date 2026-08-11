import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SolarSystemHero from "./SolarSystemHero";
import HeroLayout from "../common/HeroLayout";
import SectionBadge from "../common/SectionBadge";

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
      className="clay-card relative flex flex-col items-center text-center py-2.5 px-2.5 cursor-default"
    >
      <p className="text-[#E31D2E] font-black text-lg sm:text-2xl">
        {count}{suffix}
      </p>
      <p className="text-[#575757] text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.16em] mt-0.5">
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
      {/* ── Background Layer 1: Ambient Grid ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
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
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        onClick={() => {
          const el = document.getElementById("projects") || document.getElementById("expertise");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#575757]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-3.5 h-6 rounded-full border border-neutral-300 flex items-start justify-center p-1 bg-white/40 backdrop-blur-xs"
        >
          <span className="w-1 h-1.5 rounded-full bg-[#E31D2E]" />
        </motion.div>
      </motion.div>
    </>
  );

  const badge = (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="will-change-transform transform-gpu"
    >
      <SectionBadge text="Where Strategy Meets Performance" />
    </motion.div>
  );

  const title = (
    <h1
      className="font-black leading-[1.08] tracking-tight text-[#111111] w-full text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px]"
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
      className="text-[#575757] text-xs sm:text-sm lg:text-base font-medium leading-relaxed max-w-xl"
    >
      Your strategic growth partner for branding, performance marketing,
      and long-term digital scale. We don't just create campaigns; we build legacies.
    </motion.p>
  );

  const actions = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.95 }}
      className="flex flex-col items-center lg:items-start gap-3.5 w-full"
    >
      <div className="grid grid-cols-3 gap-2.5 w-full max-w-[280px] sm:max-w-xs lg:max-w-md">
        <AnimatedStat targetNum="15" suffix="+" label="Clients" />
        <AnimatedStat targetNum="20" suffix="+" label="Projects" />
        <AnimatedStat targetNum="20" suffix="+" label="Tie-ups" />
      </div>

      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 w-full">
        <Link
          to="/services"
          className="primary-btn px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-wider text-white shadow-md shadow-red-500/20 inline-flex items-center gap-2"
        >
          <span>Explore Services</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <span className="text-[10px] sm:text-xs font-bold text-[#575757] flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-gray-200/80 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Data-Driven Strategy & Performance Scale</span>
        </span>
      </div>
    </motion.div>
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