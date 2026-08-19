import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SolarSystemHero from "./SolarSystemHero";
import SpaceHeroBackground from "./SpaceHeroBackground";
import HeroLayout from "../common/HeroLayout";

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
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative flex flex-col items-start p-3 sm:p-3.5 px-3.5 sm:px-4 rounded-2xl border border-white/25 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md bg-black/40 hover:bg-black/60 cursor-default group transition-all duration-300 w-full overflow-hidden"
    >
      <div className="relative z-10 flex flex-col w-full min-w-0">
        <span className="text-2xl sm:text-3xl font-black !text-white tracking-tight group-hover:!text-[#FF2B2B] transition-colors duration-300">
          {count}{suffix}
        </span>
        <span className="!text-neutral-300 text-[8.5px] sm:text-[9.5px] lg:text-[10px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
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
      {/* ── Space Theme Background (Pitch Black Space, Twinkling Stars & 3 Small Planets) ── */}
      <SpaceHeroBackground />

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
          <span className="w-1 h-1.5 rounded-full bg-[#FF2B2B]" />
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
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/25 !text-white shadow-lg backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-[#FF2B2B] animate-pulse" />
        <span className="text-xs font-mono font-bold tracking-wider uppercase !text-white">
          WHERE STRATEGY MEETS PERFORMANCE
        </span>
        <span className="!text-neutral-300 text-xs font-mono">:::</span>
      </div>
    </motion.div>
  );

  const title = (
    <h1
      className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black leading-[1.08] sm:leading-[1.1] tracking-[-0.035em] !text-white font-sans mb-5 sm:mb-6 max-w-2xl"
    >
      <motion.span
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="inline-block !text-white"
      >
        Where brands evolve into
      </motion.span>{" "}
      <motion.span
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
        className="relative inline-block !text-[#FF2B2B]"
      >
        powerful
      </motion.span>{" "}
      <motion.span
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
        className="inline-block !text-white"
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
      className="!text-neutral-200 text-base sm:text-lg lg:text-[19px] font-normal leading-[1.6] font-sans max-w-2xl mb-7 sm:mb-8"
    >
      Your strategic growth partner for branding, performance marketing,
      software development, and digital transformation. We convert creative vision
      into measurable business results.
    </motion.p>
  );

  const actions = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.95 }}
      className="flex flex-col items-center lg:items-start gap-4 w-full"
    >
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-xl">
        <AnimatedStat targetNum="10" suffix="+" label="PROJECTS DEL..." delay={0.05} />
        <AnimatedStat targetNum="8" suffix="+" label="BRANDS" delay={0.1} />
        <AnimatedStat targetNum="98" suffix="%" label="CLIENT SATISF..." delay={0.15} />
        <AnimatedStat targetNum="1.5" suffix="+" label="YEARS EXPERI..." delay={0.2} />
      </div>

      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 w-full">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/25 !text-white shadow-md backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-[11px] font-black uppercase tracking-wider !text-white">
            MINDFUL MARKETING & SUSTAINABLE GROWTH
          </span>
        </div>
        <span className="text-[10px] sm:text-xs font-bold !text-white flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full border border-white/25 shadow-md backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="!text-white">Crafting Scalable Digital Ecosystems</span>
        </span>
      </div>
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
      badge={badge}
      title={title}
      description={description}
      actions={actions}
      media={media}
    />
  );
};

export default HeroSection;