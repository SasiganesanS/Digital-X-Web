import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import CanvasPlanet from "./home/CanvasPlanet";

import EarthImg from "../assets/planets/earth.png";
import BigMeteorImg from "../assets/planets/big_meteor.png";
import ExplodingAsteroidImg from "../assets/planets/exploding_asteroid.png";
import FieryMeteorImg from "../assets/planets/fiery_meteor.png";
import BlackHoleImg from "../assets/planets/black_hole.png";
import SatelliteImg from "../assets/planets/satellite.png";

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

/** Dynamic shooting stars comets */
const FULLPAGE_COMETS = [
  { id: 1, top: "8%", left: "-10%", delay: 0, duration: 2.6, angle: 30 },
  { id: 2, top: "28%", left: "-15%", delay: 3.8, duration: 2.4, angle: 34 },
  { id: 3, top: "52%", left: "-12%", delay: 7.2, duration: 2.8, angle: 26 },
  { id: 4, top: "78%", left: "-8%", delay: 11.0, duration: 2.5, angle: 32 },
];

export default function ProjectsSpaceBackground() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Multi-layered Parallax depth transforms
  const layer1Y = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]); // Stars
  const layer2Y = useTransform(scrollYProgress, [0, 1], ["0px", "-260px"]); // Asteroids & Satellites
  const layer3Y = useTransform(scrollYProgress, [0, 1], ["0px", "-420px"]); // Earth Planets

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#030407]">
      
      {/* ── BASE DARK SPACE ATMOSPHERE ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020306] via-[#05070D] via-[#070A14] to-[#030407]" />

      {/* Cosmic Nebulae Glows (Filling Empty Spaces) */}
      <div
        className="absolute top-[3%] right-[2%] w-[850px] h-[520px] rounded-full opacity-40 blur-[140px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(14,165,233,0.28) 0%, rgba(227,29,46,0.14) 55%, transparent 80%)",
        }}
      />
      <div
        className="absolute top-[35%] left-[2%] w-[950px] h-[650px] rounded-full opacity-35 blur-[150px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(59,130,246,0.28) 0%, rgba(14,165,233,0.12) 60%, transparent 80%)",
        }}
      />
      <div
        className="absolute top-[68%] right-[4%] w-[800px] h-[550px] rounded-full opacity-30 blur-[140px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(14,165,233,0.22) 0%, rgba(227,29,46,0.12) 60%, transparent 80%)",
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
                ? "0 0 12px rgba(255, 255, 255, 1), 0 0 20px rgba(14, 165, 233, 0.9)"
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

      {/* ── LAYER 2: MID BACKGROUND (ALTERNATING ASTEROIDS, BLACK HOLE, SATELLITE & COMETS) ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: shouldReduceMotion ? 0 : layer2Y }}
      >
        {/* ITEM 2 (Upper-Left ~ 22%): Exploding Fiery Asteroid */}
        <motion.div
          className="absolute top-[22%] -left-6 sm:-left-8 lg:left-0 pointer-events-none opacity-90 z-10"
          animate={shouldReduceMotion ? {} : { y: [-10, 10, -10], rotate: [0, 6, 0] }}
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

        {/* ITEM 3 (Mid-Right ~ 38%): Photorealistic 3D Space Satellite */}
        <motion.div
          className="absolute top-[38%] -right-6 sm:-right-8 lg:right-0 pointer-events-none z-10 opacity-90"
          animate={shouldReduceMotion ? {} : { y: [-10, 10, -10], rotate: [-6, 6, -6] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56">
            <CanvasPlanet
              src={SatelliteImg}
              alt="3D Space Satellite Orbiter"
              className="w-full h-full object-contain"
              threshold={25}
            />
          </div>
        </motion.div>

        {/* ITEM 5 (Lower-Right ~ 68%): Interstellar Glowing Black Hole */}
        <motion.div
          className="absolute top-[68%] -right-8 sm:-right-10 lg:right-2 pointer-events-none opacity-90 z-10"
          animate={shouldReduceMotion ? {} : { y: [8, -8, 8], rotate: [-4, 4, -4] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
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

        {/* ITEM 6 (Bottom-Left ~ 82%): Burning Fiery Plasma Meteor */}
        <motion.div
          className="absolute top-[82%] -left-6 sm:-left-8 lg:left-0 pointer-events-none opacity-90 z-10"
          animate={shouldReduceMotion ? {} : { y: [10, -10, 10], rotate: [4, -4, 4] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
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
                repeatDelay: 5.0,
              }}
            >
              {/* Flame Tail */}
              <div className="h-[2.5px] w-[220px] bg-gradient-to-r from-transparent via-[#0EA5E9]/85 to-white rounded-full shadow-[0_0_14px_rgba(14,165,233,0.9)] flex-shrink-0" />
              {/* Meteor Head */}
              <div className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_18px_#FFFFFF,0_0_30px_rgba(14,165,233,1)] -ml-1 z-10 flex-shrink-0" />
            </motion.div>
          ))}
      </motion.div>

      {/* ── LAYER 3: FOREGROUND (2 EARTH PLANET VIEWS - TOP RIGHT & MID LEFT) ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: shouldReduceMotion ? 0 : layer3Y }}
      >
        {/* ITEM 1 (Top-Right ~ 3%): Earth Planet View 1 */}
        <motion.div
          className="absolute top-[3%] -right-10 sm:-right-14 lg:-right-4 z-0 pointer-events-none opacity-95"
          animate={shouldReduceMotion ? {} : { y: [-10, 10, -10], rotate: [-3, 5, -3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-76 lg:h-76">
            <CanvasPlanet
              src={EarthImg}
              alt="Earth Planet - Terrestrial View"
              className="w-full h-full object-contain drop-shadow-[0_0_55px_rgba(14,165,233,0.65)]"
            />
          </div>
        </motion.div>

        {/* ITEM 4 (Mid-Left ~ 52%): Earth Planet View 2 */}
        <motion.div
          className="absolute top-[52%] -left-10 sm:-left-14 lg:-left-4 z-0 pointer-events-none opacity-95"
          animate={shouldReduceMotion ? {} : { y: [12, -12, 12], rotate: [4, -4, 4] }}
          transition={{ duration: 10.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          <div className="relative w-44 h-44 sm:w-60 sm:h-60 lg:w-68 lg:h-68">
            <CanvasPlanet
              src={EarthImg}
              alt="Earth Planet - Orbital View"
              className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(59,130,246,0.7)]"
            />
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}


