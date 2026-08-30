import React from "react";
import { motion } from "framer-motion";
import CanvasPlanet from "./CanvasPlanet";

import MarsMainImg from "../../assets/planets/mars_main.png";
import MarsPolarImg from "../../assets/planets/mars_polar.png";
import MarsCrescentImg from "../../assets/planets/mars_crescent.png";
import ExplodingAsteroidImg from "../../assets/planets/exploding_asteroid.png";
import SpaceStationImg from "../../assets/planets/space_station.png";
import SatelliteImg from "../../assets/planets/satellite.png";

/** Generate 140 stable twinkling star positions for rich galaxy field */
const GALAXY_STARS = Array.from({ length: 140 }, (_, i) => ({
  id: i,
  top: `${(i * 11 + 3) % 96}%`,
  left: `${(i * 17 + 5) % 96}%`,
  size: i % 7 === 0 ? 6.0 : i % 3 === 0 ? 4.0 : 2.0,
  delay: (i * 0.15) % 3.5,
  duration: 1.5 + (i % 5) * 0.5,
  glow: i % 3 === 0,
}));

/** Shooting stars / Comets animation data */
const COMETS = [
  { id: 1, top: "-5%", left: "-15%", delay: 0, duration: 2.8, angle: 32 },
  { id: 2, top: "15%", left: "-20%", delay: 4.2, duration: 2.5, angle: 35 },
  { id: 3, top: "35%", left: "-10%", delay: 8, duration: 3.0, angle: 28 },
  { id: 4, top: "-10%", left: "15%", delay: 11.5, duration: 2.6, angle: 38 },
];

export default function SpaceHeroBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#030306]"
      style={{
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
      }}
    >
      
      {/* Pitch Black Cosmic Void Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020204] via-[#05050A] to-[#030305]" />

      {/* ── GALAXY ANIMATION LAYERS ── */}

      {/* 1. Rotating Galaxy Core Spiral */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[750px] rounded-[100%] opacity-45 blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(227,29,46,0.25) 0%, rgba(20,20,30,0.15) 45%, transparent 80%)",
        }}
        animate={{
          rotate: [0, 360],
          scale: [0.95, 1.08, 0.95],
        }}
        transition={{
          rotate: { duration: 130, repeat: Infinity, ease: "linear" },
          scale: { duration: 16, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* 2. NEW Photorealistic 3D Futuristic Space Station (Positioned at Upper-Right 20%) */}
      <motion.div
        className="absolute top-[20%] -right-8 sm:-right-10 lg:right-2 z-0 pointer-events-none opacity-90"
        animate={{
          y: [-10, 10, -10],
          rotate: [-4, 4, -4],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
          <CanvasPlanet
            src={SpaceStationImg}
            alt="3D Futuristic Space Station"
            className="w-full h-full object-contain"
            threshold={25}
          />
        </div>
      </motion.div>

      {/* 3. Exploding Fiery Asteroid (Positioned at Lower-Right 62%) */}
      <motion.div
        className="absolute top-[62%] -right-6 sm:-right-8 lg:right-0 z-0 pointer-events-none opacity-90"
        animate={{
          y: [10, -10, 10],
          rotate: [0, 360],
        }}
        transition={{
          y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 80, repeat: Infinity, ease: "linear" },
        }}
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

      {/* 4. Real Photorealistic 3D Floating Space Satellite Asset (Positioned at 38% Height on Mid-Left) */}
      <motion.div
        className="absolute top-[38%] -left-6 sm:-left-8 lg:left-0 pointer-events-none z-10 opacity-90"
        animate={{ y: [-8, 8, -8], rotate: [-5, 5, -5] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
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

      {/* 3. DYNAMIC LUMINOUS SHOOTING STARS / COMETS */}
      {COMETS.map((comet) => (
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
            x: ["0vw", "125vw"],
            y: ["0vh", "70vh"],
            opacity: [0, 0.2, 1, 0.3, 0],
            scale: [0.3, 0.7, 1.2, 0.5, 0],
          }}
          transition={{
            duration: comet.duration,
            repeat: Infinity,
            ease: [0.25, 0.1, 0.25, 1],
            delay: comet.delay,
            repeatDelay: 4.5,
          }}
        >
          {/* Crimson Comet Tail */}
          <div className="h-[2px] w-[180px] bg-gradient-to-r from-transparent via-[#E31D2E]/80 to-white rounded-full shadow-[0_0_12px_rgba(227,29,46,0.9)] flex-shrink-0" />
          {/* Glowing Head */}
          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_15px_#FFFFFF,0_0_25px_rgba(227,29,46,1)] -ml-1 z-10 flex-shrink-0" />
        </motion.div>
      ))}

      {/* 4. HIGH DENSITY TWINKLING STARDUST FIELD */}
      <div className="absolute inset-0">
        {GALAXY_STARS.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: star.glow
                ? "0 0 10px rgba(255, 255, 255, 1), 0 0 18px rgba(239, 32, 41, 0.8)"
                : "0 0 4px rgba(255, 255, 255, 0.7)",
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: star.glow ? [0.8, 1.5, 0.8] : [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* ── FOREGROUND MARS PLANET VIEWS (TOP LEFT, TOP RIGHT, BOTTOM RIGHT) ── */}

      {/* MARS VIEW 1: Main Canyon Planet (Top-Left 3%) */}
      <motion.div
        className="absolute top-[3%] -left-10 sm:-left-14 lg:-left-4 z-0 pointer-events-none opacity-95"
        animate={{ y: [-10, 10, -10], rotate: [-4, 6, -4] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative w-32 h-32 sm:w-44 sm:h-44 lg:w-52 lg:h-52">
          <CanvasPlanet
            src={MarsMainImg}
            alt="Mars Planet - Canyon View"
            className="w-full h-full object-contain drop-shadow-[0_0_35px_rgba(255,60,40,0.5)]"
          />
        </div>
      </motion.div>

      {/* Planet 2: Mars Polar View (Top-Right 4% Height - NO meteor overlap!) */}
      <motion.div
        className="absolute top-[4%] -right-4 sm:right-4 z-0 pointer-events-none opacity-90"
        animate={{
          y: [8, -8, 8],
          rotate: [-2, 3, -2],
        }}
        transition={{
          duration: 8.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <div className="relative w-36 h-36 sm:w-52 sm:h-52">
          <CanvasPlanet
            src={MarsPolarImg}
            alt="Mars Planet - Polar View"
            className="w-full h-full object-contain drop-shadow-[0_0_35px_rgba(255,80,60,0.5)]"
          />
        </div>
      </motion.div>

      {/* Planet 3: Mars Crescent View (Bottom-Right 85% Height) */}
      <motion.div
        className="absolute bottom-6 right-4 sm:bottom-10 sm:right-12 z-0 pointer-events-none opacity-85"
        animate={{
          y: [-6, 6, -6],
          x: [-4, 4, -4],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="relative w-28 h-28 sm:w-40 sm:h-40">
          <CanvasPlanet
            src={MarsCrescentImg}
            alt="Mars Planet - Crescent View"
            className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(227,29,46,0.6)]"
          />
        </div>
      </motion.div>

    </div>
  );
}
