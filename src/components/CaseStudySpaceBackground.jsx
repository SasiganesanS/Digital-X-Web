import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import CanvasPlanet from "./home/CanvasPlanet";

import JupiterImg from "../assets/planets/jupiter.png";
import BigMeteorImg from "../assets/planets/big_meteor.png";

/** Generate 100 stable twinkling star positions for continuous full-page galaxy field */
const FULLPAGE_STARS = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  top: `${(i * 13 + 3) % 97}%`,
  left: `${(i * 19 + 7) % 97}%`,
  size: i % 7 === 0 ? 3.5 : i % 3 === 0 ? 2.2 : 1.2,
  delay: (i * 0.17) % 4,
  duration: 1.8 + (i % 5) * 0.6,
  glow: i % 4 === 0,
}));

/** Shooting stars / Comets data positioned along outer open margins */
const FULLPAGE_COMETS = [
  { id: 1, top: "7%", left: "-10%", delay: 0, duration: 2.8, angle: 32 },
  { id: 2, top: "28%", left: "-15%", delay: 4.5, duration: 2.5, angle: 35 },
  { id: 3, top: "52%", left: "-12%", delay: 8.5, duration: 3.0, angle: 28 },
  { id: 4, top: "76%", left: "-8%", delay: 12.5, duration: 2.7, angle: 36 },
];

export default function CaseStudySpaceBackground() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Multi-layered Parallax depth transforms
  const layer1Y = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]); // Stars
  const layer2Y = useTransform(scrollYProgress, [0, 1], ["0px", "-260px"]); // Meteors
  const layer3Y = useTransform(scrollYProgress, [0, 1], ["0px", "-420px"]); // Jupiter Planet

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#050609]">
      
      {/* ── BASE DARK SPACE ATMOSPHERE ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030407] via-[#06080E] via-[#090C14] to-[#040508]" />

      {/* Warm Amber & Crimson Cosmic Ambient Glows */}
      <div
        className="absolute top-[6%] right-[8%] w-[850px] h-[520px] rounded-full opacity-35 blur-[140px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(217,119,6,0.25) 0%, rgba(227,29,46,0.12) 55%, transparent 80%)",
        }}
      />
      <div
        className="absolute top-[40%] left-[6%] w-[950px] h-[650px] rounded-full opacity-30 blur-[150px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(245,158,11,0.22) 0%, rgba(217,119,6,0.1) 60%, transparent 80%)",
        }}
      />
      <div
        className="absolute top-[76%] right-[12%] w-[800px] h-[550px] rounded-full opacity-25 blur-[140px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(217,119,6,0.2) 0%, rgba(10,12,20,0.1) 60%, transparent 80%)",
        }}
      />

      {/* Grid Stardust Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── LAYER 1: FAR BACKGROUND (STARS) ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: shouldReduceMotion ? 0 : layer1Y }}
      >
        {FULLPAGE_STARS.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: star.glow
                ? "0 0 8px rgba(255, 255, 255, 0.95), 0 0 14px rgba(217, 119, 6, 0.85)"
                : "0 0 4px rgba(255, 255, 255, 0.6)",
            }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    opacity: [0.2, 0.95, 0.2],
                    scale: star.glow ? [0.8, 1.4, 0.8] : [0.85, 1.15, 0.85],
                  }
            }
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
          />
        ))}
      </motion.div>

      {/* ── LAYER 2: MID BACKGROUND (BIG METEORS & COMETS) ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: shouldReduceMotion ? 0 : layer2Y }}
      >
        {/* Giant Meteor 1 (Top Left Edge) */}
        <motion.div
          className="absolute top-[17%] -left-12 sm:-left-16 lg:left-4 pointer-events-none opacity-80"
          animate={shouldReduceMotion ? {} : { y: [-10, 10, -10], rotate: [0, 8, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-28 h-28 sm:w-40 sm:h-40 lg:w-48 lg:h-48 drop-shadow-[0_0_35px_rgba(217,119,6,0.45)]">
            <CanvasPlanet
              src={BigMeteorImg}
              alt="Giant Meteor Asteroid"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Giant Meteor 2 (Lower Right Edge) */}
        <motion.div
          className="absolute top-[67%] -right-10 sm:-right-12 lg:right-4 pointer-events-none opacity-75"
          animate={shouldReduceMotion ? {} : { y: [8, -8, 8], rotate: [-5, 5, -5] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="relative w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 drop-shadow-[0_0_30px_rgba(227,29,46,0.5)]">
            <CanvasPlanet
              src={BigMeteorImg}
              alt="Giant Meteor Asteroid"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Dynamic Shooting Stars / Comets */}
        {!shouldReduceMotion &&
          FULLPAGE_COMETS.map((comet) => (
            <motion.div
              key={comet.id}
              className="absolute pointer-events-none z-10 flex items-center"
              style={{
                top: comet.top,
                left: comet.left,
              }}
              initial={{
                rotate: comet.angle,
                opacity: 0,
                scale: 0.3,
              }}
              animate={{
                rotate: comet.angle,
                x: ["0vw", "130vw"],
                y: ["0vh", "75vh"],
                opacity: [0, 0.15, 0.95, 0.3, 0],
                scale: [0.3, 0.7, 1.3, 0.5, 0],
              }}
              transition={{
                duration: comet.duration,
                repeat: Infinity,
                ease: [0.25, 0.1, 0.25, 1],
                delay: comet.delay,
                repeatDelay: 5.5,
              }}
            >
              {/* Flame Tail */}
              <div className="h-[2.5px] w-[220px] bg-gradient-to-r from-transparent via-[#D97706]/80 to-white rounded-full shadow-[0_0_12px_rgba(217,119,6,0.85)] flex-shrink-0" />
              {/* Meteor Head */}
              <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_16px_#FFFFFF,0_0_28px_rgba(217,119,6,1)] -ml-1 z-10 flex-shrink-0" />
            </motion.div>
          ))}
      </motion.div>

      {/* ── LAYER 3: FOREGROUND (JUPITER PLANET VIEWS FOR CASE STUDY & DETAILS) ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: shouldReduceMotion ? 0 : layer3Y }}
      >
        {/* ── JUPITER VIEW 1: Main Swirling Gas Giant (Hero Top-Right Outer Edge) ── */}
        <motion.div
          className="absolute top-[2%] -right-12 sm:-right-16 lg:-right-6 z-0 pointer-events-none opacity-90"
          animate={shouldReduceMotion ? {} : { y: [-10, 10, -10], rotate: [-3, 5, -3] }}
          transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-44 h-44 sm:w-60 sm:h-60 lg:w-72 lg:h-72">
            <CanvasPlanet
              src={JupiterImg}
              alt="Jupiter Planet - Great Red Spot View"
              className="w-full h-full object-contain drop-shadow-[0_0_55px_rgba(217,119,6,0.6)]"
            />
          </div>
        </motion.div>

        {/* ── JUPITER VIEW 2: Mid-Page Orbital Perspective (Mid Page Outer-Left Edge) ── */}
        <motion.div
          className="absolute top-[35%] -left-10 sm:-left-14 lg:-left-6 z-0 pointer-events-none opacity-90"
          animate={shouldReduceMotion ? {} : { y: [12, -12, 12], rotate: [4, -4, 4] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          <div className="relative w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
            <CanvasPlanet
              src={JupiterImg}
              alt="Jupiter Planet - Orbital View"
              className="w-full h-full object-contain drop-shadow-[0_0_45px_rgba(245,158,11,0.65)]"
            />
          </div>
        </motion.div>

        {/* ── JUPITER VIEW 3: Lower Horizon View (Lower Right Outer Edge) ── */}
        <motion.div
          className="absolute top-[72%] -right-10 sm:-right-12 lg:right-4 z-0 pointer-events-none opacity-85"
          animate={shouldReduceMotion ? {} : { y: [-8, 8, -8], rotate: [-3, 3, -3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        >
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56">
            <CanvasPlanet
              src={JupiterImg}
              alt="Jupiter Planet - Horizon View"
              className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(217,119,6,0.55)]"
            />
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}
