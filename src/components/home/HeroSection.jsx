import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SolarSystemHero from "./SolarSystemHero";
import SpaceHeroBackground from "./SpaceHeroBackground";
import HeroLayout from "../common/HeroLayout";
import SectionBadge from "../common/SectionBadge";

function AnimatedStat({ targetNum, suffix = "+", label, delay = 0 }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-20px" });

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    const duration = 1800; // ms
    const numVal = parseFloat(targetNum) || 0;
    const isFloat = targetNum.toString().includes(".");
    let start = null;
    let animFrameId = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const val = easeOut * numVal;
      setCount(isFloat ? val.toFixed(1) : Math.floor(val));
      if (progress < 1) {
        animFrameId = requestAnimationFrame(step);
      } else {
        setCount(isFloat ? numVal.toFixed(1) : numVal);
      }
    };

    const timer = setTimeout(() => {
      animFrameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [isInView, targetNum, delay]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.95 }}
      transition={{ duration: 0.6, delay: delay * 0.3, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, scale: 1.02 }}
      className="relative flex flex-col items-start p-2.5 sm:p-3 px-3 sm:px-3.5 rounded-2xl border border-neutral-200/80 bg-neutral-50/90 hover:bg-neutral-100/90 cursor-default group transition-all duration-300 w-full overflow-hidden"
    >
      <div className="relative z-10 flex flex-col w-full min-w-0">
        <span className="text-xl sm:text-2xl lg:text-3xl font-black text-[#111111] tracking-tight group-hover:text-[#E31D2E] transition-colors duration-300">
          {count}{suffix}
        </span>
        <span className="text-neutral-500 text-[8px] sm:text-[9px] lg:text-[9.5px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.12em] mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
          {label}
        </span>
      </div>
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
      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer opacity-90 hover:opacity-100 transition-opacity"
        onClick={() => {
          const el = document.getElementById("projects") || document.getElementById("expertise");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] !text-neutral-300">
          SCROLL .
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-6 rounded-full border border-neutral-600 flex items-start justify-center p-1 bg-black/60 backdrop-blur-md"
        >
          <span className="w-1 h-1.5 rounded-full bg-[#E31D2E]" />
        </motion.div>
      </motion.div>
    </>
  );

  const heroCard = (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-start p-6 sm:p-8 lg:p-9 rounded-[32px] border border-white/90 shadow-[0_25px_60px_rgba(0,0,0,0.5)] bg-white text-[#111111] transition-all duration-300 w-full max-w-2xl overflow-hidden group"
    >
      {/* ── Badge ── */}
      <div className="mb-4 flex justify-start w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="will-change-transform transform-gpu"
        >
          <SectionBadge text="WHERE STRATEGY MEETS PERFORMANCE" />
        </motion.div>
      </div>

      {/* ── Title ── */}
      <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-black leading-[1.08] sm:leading-[1.1] tracking-[-0.035em] text-[#111111] font-sans mb-4 sm:mb-5 w-full">
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="inline-block text-[#111111]"
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
          className="inline-block text-[#111111]"
        >
          digital movements.
        </motion.span>
      </h1>

      {/* ── Description ── */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="text-neutral-600 text-base sm:text-lg lg:text-[18px] font-normal leading-[1.6] font-sans w-full mb-6 sm:mb-8"
      >
        Your strategic growth partner for branding, performance marketing,
        software development, and digital transformation. We convert creative vision
        into measurable business results.
      </motion.p>

      {/* ── Stat Counter Grid inside the Card Box ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="grid grid-cols-4 gap-2 sm:gap-2.5 w-full"
      >
        <AnimatedStat targetNum="10" suffix="+" label="PROJECTS DEL..." delay={0.05} />
        <AnimatedStat targetNum="8" suffix="+" label="BRANDS" delay={0.1} />
        <AnimatedStat targetNum="98" suffix="%" label="CLIENT SATISF..." delay={0.15} />
        <AnimatedStat targetNum="1.5" suffix="+" label="YEARS EXPERI..." delay={0.2} />
      </motion.div>
    </motion.div>
  );

  const media = (
    <motion.div
      className="w-full max-w-[380px] flex-shrink-0 relative mx-auto lg:mx-0"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
    >
      <SolarSystemHero />
    </motion.div>
  );

  return (
    <HeroLayout
      sectionId="home"
      onMouseMove={handleMouseMove}
      className="bg-[#050508] !text-white"
      bgElements={bgElements}
      title={heroCard}
      media={media}
    />
  );
};

export default HeroSection;