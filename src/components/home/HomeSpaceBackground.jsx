import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import CanvasPlanet from "./CanvasPlanet";

import MarsMainImg from "../../assets/planets/mars_main.png";
import MarsPolarImg from "../../assets/planets/mars_polar.png";
import MarsCrescentImg from "../../assets/planets/mars_crescent.png";
import BigMeteorImg from "../../assets/planets/big_meteor.png";

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
  { id: 1, top: "6%", left: "-10%", delay: 0, duration: 2.8, angle: 32 },
  { id: 2, top: "25%", left: "-15%", delay: 4.5, duration: 2.5, angle: 35 },
  { id: 3, top: "48%", left: "-12%", delay: 8.5, duration: 3.0, angle: 28 },
  { id: 4, top: "72%", left: "-8%", delay: 12.5, duration: 2.7, angle: 36 },
];

export default function HomeSpaceBackground() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Multi-layered Parallax depth transforms (GPU transform-only)
  const layer1Y = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]); // Far Background (Stars)
  const layer2Y = useTransform(scrollYProgress, [0, 1], ["0px", "-260px"]); // Mid Background (Nebula & Meteors)
  const layer3Y = useTransform(scrollYProgress, [0, 1], ["0px", "-420px"]); // Foreground (Mars Planet Views)

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#050609]">
      
      {/* ── BASE DARK SPACE ATMOSPHERE ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030407] via-[#06080E] via-[#0A0C14] to-[#040508]" />

      {/* Brand Red & Mars Crimson Cosmic Ambient Glows */}
      <div
        className="absolute top-[8%] left-[15%] w-[850px] h-[520px] rounded-full opacity-35 blur-[140px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(239,32,41,0.22) 0%, rgba(15,18,28,0.1) 60%, transparent 80%)",
        }}
      />
      <div
        className="absolute top-[45%] right-[10%] w-[950px] h-[650px] rounded-full opacity-30 blur-[150px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(239,32,41,0.18) 0%, rgba(20,24,38,0.1) 65%, transparent 80%)",
        }}
      />
      <div
        className="absolute top-[75%] left-[20%] w-[800px] h-[550px] rounded-full opacity-25 blur-[140px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(227,29,46,0.16) 0%, rgba(10,12,20,0.1) 60%, transparent 80%)",
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
                ? "0 0 8px rgba(255, 255, 255, 0.95), 0 0 14px rgba(239, 32, 41, 0.8)"
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

      {/* ── LAYER 2: MID BACKGROUND (NEBULA, BIG METEORS & SHOOTING STARS) ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: shouldReduceMotion ? 0 : layer2Y }}
      >
        {/* Rotating Galaxy Core Ambient Blur */}
        <motion.div
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[1100px] h-[650px] rounded-[100%] opacity-35 blur-[130px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(239,32,41,0.2) 0%, rgba(20,24,36,0.15) 50%, transparent 80%)",
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  rotate: [0, 360],
                  scale: [0.96, 1.05, 0.96],
                }
          }
          transition={{
            rotate: { duration: 140, repeat: Infinity, ease: "linear" },
            scale: { duration: 18, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* ── BIG METEOR 1 (Upper-Mid Right Space Field) ── */}
        <motion.div
          className="absolute top-[16%] right-[6%] sm:right-[10%] lg:right-[12%] z-0 pointer-events-none opacity-85"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [-12, 14, -12],
                  x: [8, -8, 8],
                  rotate: [0, 360],
                }
          }
          transition={{
            y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 14, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 90, repeat: Infinity, ease: "linear" },
          }}
        >
          <div className="relative w-28 h-28 sm:w-40 sm:h-40 lg:w-48 lg:h-48 drop-shadow-[0_0_35px_rgba(255,60,40,0.6)]">
            <CanvasPlanet
              src={BigMeteorImg}
              alt="Giant Meteor Asteroid"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* ── BIG METEOR 2 (Lower Right Space Field) ── */}
        <motion.div
          className="absolute top-[62%] right-[4%] sm:right-[8%] lg:right-[10%] z-0 pointer-events-none opacity-80"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [10, -10, 10],
                  x: [-6, 6, -6],
                  rotate: [360, 0],
                }
          }
          transition={{
            y: { duration: 14, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 110, repeat: Infinity, ease: "linear" },
          }}
        >
          <div className="relative w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 drop-shadow-[0_0_30px_rgba(239,32,41,0.5)]">
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
              <div className="h-[2.5px] w-[220px] bg-gradient-to-r from-transparent via-[#EF2029]/80 to-white rounded-full shadow-[0_0_12px_rgba(239,32,41,0.85)] flex-shrink-0" />
              {/* Meteor Head */}
              <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_16px_#FFFFFF,0_0_28px_rgba(239,32,41,1)] -ml-1 z-10 flex-shrink-0" />
            </motion.div>
          ))}
      </motion.div>

      {/* ── LAYER 3: FOREGROUND (3 UNIQUE MARS PLANET VIEWS FOR HOME PAGE) ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: shouldReduceMotion ? 0 : layer3Y }}
      >
        {/* ── MARS VIEW 1: Main Valles Marineris Canyon View (Hero Top-Left Edge) ── */}
        <motion.div
          className="absolute top-[2%] -left-12 sm:-left-16 lg:-left-10 z-0 pointer-events-none opacity-90"
          animate={shouldReduceMotion ? {} : { y: [-8, 8, -8], rotate: [0, 6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 lg:w-60 lg:h-60">
            <CanvasPlanet
              src={MarsMainImg}
              alt="Mars Planet - Canyon View"
              className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(239,32,41,0.55)]"
            />
          </div>
        </motion.div>

        {/* ── MARS VIEW 2: Polar Ice Cap Orbital Perspective (Mid Page Outer-Right Edge) ── */}
        <motion.div
          className="absolute top-[34%] -right-10 sm:-right-14 lg:-right-8 z-0 pointer-events-none opacity-90"
          animate={shouldReduceMotion ? {} : { y: [10, -10, 10], rotate: [-4, 4, -4] }}
          transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <div className="relative w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
            <CanvasPlanet
              src={MarsPolarImg}
              alt="Mars Planet - Polar View"
              className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(255,80,60,0.5)]"
            />
          </div>
        </motion.div>

        {/* ── MARS VIEW 3: Crescent Horizon Shadow View (Lower Left Outer Edge) ── */}
        <motion.div
          className="absolute top-[72%] -left-10 sm:-left-12 lg:left-2 z-0 pointer-events-none opacity-85"
          animate={shouldReduceMotion ? {} : { y: [-7, 7, -7], rotate: [0, -5, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        >
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56">
            <CanvasPlanet
              src={MarsCrescentImg}
              alt="Mars Planet - Crescent View"
              className="w-full h-full object-contain drop-shadow-[0_0_35px_rgba(227,29,46,0.6)]"
            />
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}
