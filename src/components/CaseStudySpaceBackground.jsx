import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import CanvasPlanet from "./home/CanvasPlanet";

import JupiterImg from "../assets/planets/jupiter.png";
import SpiralGalaxyImg from "../assets/planets/spiral_galaxy.png";
import FieryMeteorImg from "../assets/planets/fiery_meteor.png";
import ExplodingAsteroidImg from "../assets/planets/exploding_asteroid.png";
import BlackHoleImg from "../assets/planets/black_hole.png";

/** Generate 180 twinkling stars with 3D glow spread across full height */
const FULLPAGE_STARS = Array.from({ length: 180 }, (_, i) => ({
  id: i,
  top: `${(i * 9.7 + 2) % 98}%`,
  left: `${(i * 13.3 + 4) % 96}%`,
  size: i % 8 === 0 ? 6.5 : i % 4 === 0 ? 4.5 : i % 2 === 0 ? 3.0 : 2.0,
  delay: (i * 0.13) % 4,
  duration: 1.5 + (i % 6) * 0.4,
  glow: i % 3 === 0,
}));

/** Shooting stars / Comets data positioned along outer open margins */
const FULLPAGE_COMETS = [
  { id: 1, top: "8%", left: "-10%", delay: 0, duration: 2.8, angle: 32 },
  { id: 2, top: "28%", left: "-15%", delay: 4.5, duration: 2.5, angle: 35 },
  { id: 3, top: "52%", left: "-12%", delay: 8.5, duration: 3.0, angle: 28 },
  { id: 4, top: "78%", left: "-8%", delay: 12.5, duration: 2.7, angle: 36 },
];

export default function CaseStudySpaceBackground() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Multi-layered Parallax depth transforms
  const layer1Y = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]); // Stars
  const layer2Y = useTransform(scrollYProgress, [0, 1], ["0px", "-260px"]); // Galaxy, Meteors, Black Hole
  const layer3Y = useTransform(scrollYProgress, [0, 1], ["0px", "-420px"]); // Jupiter Planets

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#030407]">
      
      {/* ── BASE DARK SPACE ATMOSPHERE ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020306] via-[#07070E] via-[#0B0914] to-[#030407]" />

      {/* Warm Amber & Crimson Cosmic Ambient Glows */}
      <div
        className="absolute top-[4%] right-[2%] w-[850px] h-[520px] rounded-full opacity-40 blur-[140px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(217,119,6,0.28) 0%, rgba(227,29,46,0.14) 55%, transparent 80%)",
        }}
      />
      <div
        className="absolute top-[36%] left-[2%] w-[950px] h-[650px] rounded-full opacity-35 blur-[150px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(245,158,11,0.28) 0%, rgba(217,119,6,0.12) 60%, transparent 80%)",
        }}
      />
      <div
        className="absolute top-[70%] right-[4%] w-[800px] h-[550px] rounded-full opacity-30 blur-[140px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(217,119,6,0.24) 0%, rgba(10,12,20,0.1) 60%, transparent 80%)",
        }}
      />

      {/* Grid Stardust Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── LAYER 1: FAR BACKGROUND (STARS & NEBULAE) ── */}
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
                ? "0 0 12px rgba(255, 255, 255, 1), 0 0 20px rgba(217, 119, 6, 0.9)"
                : "0 0 6px rgba(255, 255, 255, 0.8)",
            }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    opacity: [0.3, 1, 0.3],
                    scale: star.glow ? [0.8, 1.6, 0.8] : [0.85, 1.25, 0.85],
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

      {/* ── LAYER 2: MID BACKGROUND (ALTERNATING GALAXY, METEORS, ASTEROID & BLACK HOLE) ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: shouldReduceMotion ? 0 : layer2Y }}
      >
        {/* ITEM 2 (Upper-Left ~ 22%): Photorealistic 3D Deep Blue Spiral Galaxy */}
        <motion.div
          className="absolute top-[22%] -left-8 sm:-left-10 lg:left-0 pointer-events-none opacity-90 z-10"
          animate={shouldReduceMotion ? {} : { y: [-10, 10, -10], rotate: [0, 6, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-44 h-44 sm:w-60 sm:h-60 lg:w-72 lg:h-72">
            <CanvasPlanet
              src={SpiralGalaxyImg}
              alt="3D Deep Blue Spiral Galaxy"
              className="w-full h-full object-contain"
              threshold={25}
            />
          </div>
        </motion.div>

        {/* ITEM 3 (Mid-Right ~ 38%): Burning Fiery Plasma Meteor */}
        <motion.div
          className="absolute top-[38%] -right-6 sm:-right-8 lg:right-0 pointer-events-none opacity-90 z-10"
          animate={shouldReduceMotion ? {} : { y: [8, -8, 8], rotate: [-4, 4, -4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56">
            <CanvasPlanet
              src={FieryMeteorImg}
              alt="Fiery Plasma Meteor"
              className="w-full h-full object-contain"
              threshold={25}
            />
          </div>
        </motion.div>

        {/* ITEM 5 (Lower-Right ~ 68%): Exploding Fiery Asteroid */}
        <motion.div
          className="absolute top-[68%] -right-6 sm:-right-8 lg:right-0 pointer-events-none z-10 opacity-90"
          animate={shouldReduceMotion ? {} : { y: [-10, 10, -10], rotate: [-6, 6, -6] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56">
            <CanvasPlanet
              src={ExplodingAsteroidImg}
              alt="Exploding Fiery Asteroid"
              className="w-full h-full object-contain"
              threshold={25}
            />
          </div>
        </motion.div>

        {/* ITEM 6 (Bottom-Left ~ 82%): Interstellar Glowing Black Hole */}
        <motion.div
          className="absolute top-[82%] -left-8 sm:-left-10 lg:left-0 pointer-events-none opacity-90 z-10"
          animate={shouldReduceMotion ? {} : { y: [12, -12, 12], rotate: [5, -5, 5] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
            <CanvasPlanet
              src={BlackHoleImg}
              alt="Glowing Cosmic Black Hole"
              className="w-full h-full object-contain"
              threshold={25}
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
                opacity: [0, 0.2, 1, 0.35, 0],
                scale: [0.3, 0.7, 1.35, 0.5, 0],
              }}
              transition={{
                duration: comet.duration,
                repeat: Infinity,
                ease: [0.25, 0.1, 0.25, 1],
                delay: comet.delay,
                repeatDelay: 5.5,
              }}
            >
              <div className="h-[2.5px] w-[220px] bg-gradient-to-r from-transparent via-[#D97706]/85 to-white rounded-full shadow-[0_0_14px_rgba(217,119,6,0.9)] flex-shrink-0" />
              <div className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_18px_#FFFFFF,0_0_30px_rgba(217,119,6,1)] -ml-1 z-10 flex-shrink-0" />
            </motion.div>
          ))}
      </motion.div>

      {/* ── LAYER 3: FOREGROUND (2 JUPITER PLANET VIEWS - TOP RIGHT & MID LEFT) ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: shouldReduceMotion ? 0 : layer3Y }}
      >
        {/* ITEM 1 (Top-Right ~ 3%): Jupiter Planet View 1 */}
        <motion.div
          className="absolute top-[3%] -right-10 sm:-right-14 lg:-right-4 z-0 pointer-events-none opacity-95"
          animate={shouldReduceMotion ? {} : { y: [-10, 10, -10], rotate: [-4, 6, -4] }}
          transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-76 lg:h-76">
            <CanvasPlanet
              src={JupiterImg}
              alt="Jupiter Planet - Great Red Spot View"
              className="w-full h-full object-contain drop-shadow-[0_0_55px_rgba(217,119,6,0.65)]"
            />
          </div>
        </motion.div>

        {/* ITEM 4 (Mid-Left ~ 52%): Jupiter Planet View 2 */}
        <motion.div
          className="absolute top-[52%] -left-10 sm:-left-14 lg:-left-4 z-0 pointer-events-none opacity-95"
          animate={shouldReduceMotion ? {} : { y: [12, -12, 12], rotate: [5, -5, 5] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          <div className="relative w-44 h-44 sm:w-60 sm:h-60 lg:w-68 lg:h-68">
            <CanvasPlanet
              src={JupiterImg}
              alt="Jupiter Planet - Orbital View"
              className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(227,29,46,0.7)]"
            />
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}
