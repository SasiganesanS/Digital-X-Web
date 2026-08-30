import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SolarSystemHero from "./SolarSystemHero";
import SpaceHeroBackground from "./SpaceHeroBackground";
import HeroLayout from "../common/HeroLayout";
import SectionBadge from "../common/SectionBadge";

function AnimatedStat({ targetNum, suffix = "+", label, delay = 0 }) {
  const [count, setCount] = useState(targetNum || 0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-20px" });

  useEffect(() => {
    if (!isInView) {
      setCount(targetNum || 0);
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
      badge={
        <SectionBadge text="Home" theme="dark" />
      }
      title={
        <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-black leading-[1.08] sm:leading-[1.1] tracking-[-0.035em] text-white font-sans mb-5 sm:mb-6 max-w-2xl">
          Where brands evolve into{" "}
          <span className="text-[#E31D2E]">powerful</span> digital movements.
        </h1>
      }
      description={
        <p className="hero-description text-neutral-300 text-base sm:text-lg lg:text-[19px] font-normal leading-[1.6] font-sans max-w-2xl mb-7 sm:mb-8">
          Your strategic growth partner for branding, performance marketing, software development, and digital transformation. We convert creative vision into measurable business results.
        </p>
      }
      media={media}
    />
  );
};

export default HeroSection;