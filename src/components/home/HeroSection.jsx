import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SolarSystemHero from "./SolarSystemHero";
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
    const numVal = parseInt(targetNum, 10) || 0;
    let start = null;
    let animFrameId = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * numVal));
      if (progress < 1) {
        animFrameId = requestAnimationFrame(step);
      } else {
        setCount(numVal);
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
      whileHover={{ y: -5, scale: 1.02 }}
      className="clay-card relative flex flex-col items-start p-2.5 sm:p-3.5 px-3 sm:px-4 rounded-2xl border border-white/70 shadow-[0_10px_28px_rgba(17,17,17,0.03)] backdrop-blur-xl bg-white/75 hover:bg-white/90 cursor-default group transition-all duration-300 w-full overflow-hidden"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/70 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col w-full min-w-0">
        <span className="text-xl sm:text-2xl lg:text-3xl font-black text-[#111111] tracking-tight group-hover:text-[#E31D2E] transition-colors duration-300">
          {count}{suffix}
        </span>
        <span className="text-[#575757] text-[8.5px] sm:text-[9.5px] lg:text-[10px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.14em] mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
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
      className="text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] font-black leading-[1.08] sm:leading-[1.1] tracking-[-0.035em] text-[#111111] font-sans mb-5 sm:mb-6 max-w-2xl"
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
      className="text-[#575757] text-base sm:text-lg lg:text-[19px] font-normal leading-[1.6] font-sans max-w-2xl mb-7 sm:mb-8"
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
      className="flex flex-col items-center lg:items-start gap-3.5 w-full"
    >
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5 w-full max-w-xl">
        <AnimatedStat targetNum="50" suffix="+" label="Projects Delivered" delay={0.05} />
        <AnimatedStat targetNum="15" suffix="+" label="Brands" delay={0.1} />
        <AnimatedStat targetNum="98" suffix="%" label="Client Satisfaction" delay={0.15} />
        <AnimatedStat targetNum="5" suffix="+" label="Years Experience" delay={0.2} />
      </div>

      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 w-full">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E31D2E]/10 border border-[#E31D2E]/25 text-[#E31D2E] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#E31D2E] animate-pulse" />
          <span className="text-[11px] font-black uppercase tracking-wider">
            Mindful Marketing & Sustainable Growth
          </span>
        </div>
        <span className="text-[10px] sm:text-xs font-bold text-[#575757] flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-gray-200/80 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>Crafting Scalable Digital Ecosystems</span>
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