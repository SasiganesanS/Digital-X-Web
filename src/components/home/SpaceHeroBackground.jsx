import React from "react";
import { motion } from "framer-motion";
import CanvasPlanet from "./CanvasPlanet";

import MarsImg from "../../assets/planets/mars.png";
import SaturnImg from "../../assets/planets/saturn.png";
import NeptuneImg from "../../assets/planets/neptune.png";

/** Generate 65 stable twinkling star positions for rich galaxy field */
const GALAXY_STARS = Array.from({ length: 65 }, (_, i) => ({
  id: i,
  top: `${(i * 17 + 5) % 96}%`,
  left: `${(i * 23 + 9) % 96}%`,
  size: i % 6 === 0 ? 3.5 : i % 3 === 0 ? 2.5 : 1.5,
  delay: (i * 0.19) % 3.5,
  duration: 1.6 + (i % 5) * 0.5,
  glow: i % 4 === 0,
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
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#030306]">
      
      {/* Pitch Black Cosmic Void Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020204] via-[#05050A] to-[#030305]" />

      {/* ── GALAXY ANIMATION LAYERS ── */}

      {/* 1. Rotating Galaxy Core Spiral */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[750px] rounded-[100%] opacity-45 blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(227,29,46,0.25) 0%, rgba(139,92,246,0.2) 35%, rgba(59,130,246,0.12) 65%, transparent 80%)",
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

      {/* 2. Diagonal Galaxy Stardust River Stream */}
      <motion.div
        className="absolute -top-[25%] -left-[15%] w-[150%] h-[90%] -rotate-12 opacity-40 blur-[110px] pointer-events-none"
        style={{
          background:
            "linear-gradient(115deg, transparent 15%, rgba(227,29,46,0.28) 35%, rgba(168,85,247,0.22) 55%, rgba(59,130,246,0.18) 75%, transparent 90%)",
        }}
        animate={{
          x: [-25, 25, -25],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 3. DYNAMIC LUMINOUS SHOOTING STARS / COMETS (Ignites -> Peaks -> Vanishes along Diagonal Trajectory) */}
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
            x: ["0vw", "130vw"],
            y: ["0vh", "75vh"],
            opacity: [0, 0.2, 1, 0.35, 0],
            scale: [0.3, 0.7, 1.25, 0.5, 0],
          }}
          transition={{
            duration: comet.duration,
            repeat: Infinity,
            ease: [0.25, 0.1, 0.25, 1],
            delay: comet.delay,
            repeatDelay: 4.5,
          }}
        >
          {/* Flame Tail (Trailing behind the head, fading from transparent to red to white) */}
          <div className="h-[2.5px] w-[200px] bg-gradient-to-r from-transparent via-[#FF2B2B]/70 via-[#FF2B2B] to-white rounded-full shadow-[0_0_12px_rgba(255,43,43,0.85)] flex-shrink-0" />
          {/* Glowing Meteor Head (Leading at the front tip) */}
          <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_16px_#FFFFFF,0_0_28px_rgba(255,43,43,1)] -ml-1 z-10 flex-shrink-0" />
        </motion.div>
      ))}

      {/* 4. Cosmic Space Horizon Curve at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[260px] bg-gradient-to-t from-[#200512]/60 via-[#12040b]/35 to-transparent pointer-events-none" />
      <div className="absolute bottom-[-90px] left-1/2 -translate-x-1/2 w-[140%] h-[180px] rounded-[100%] bg-gradient-to-t from-[#E31D2E]/25 via-[#E31D2E]/8 to-transparent blur-2xl pointer-events-none" />

      {/* Star Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* 5. Bright Twinkling Stars */}
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
              ? "0 0 10px rgba(255, 255, 255, 0.95), 0 0 16px rgba(227, 29, 46, 0.75)"
              : "0 0 6px rgba(255, 255, 255, 0.7)",
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: star.glow ? [0.75, 1.5, 0.75] : [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}

      {/* ── 100% TRANSPARENT PNG PLANET CUTOUTS (ZERO BLACK BACKGROUND) ── */}

      {/* Planet 1: Photorealistic Mars (Top-Left) */}
      <motion.div
        className="absolute top-4 -left-4 sm:top-6 sm:left-4 z-0 pointer-events-none opacity-90"
        animate={{
          y: [-8, 8, -8],
          rotate: [0, 6, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative w-28 h-28 sm:w-40 sm:h-40">
          <CanvasPlanet
            src={MarsImg}
            alt="Mars Planet"
            className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(255,60,40,0.6)]"
          />
        </div>
      </motion.div>

      {/* Planet 2: Photorealistic Saturn (Top-Right) */}
      <motion.div
        className="absolute top-2 -right-4 sm:top-4 sm:right-6 z-0 pointer-events-none opacity-90"
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
            src={SaturnImg}
            alt="Saturn Planet"
            className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(245,158,11,0.5)]"
          />
        </div>
      </motion.div>

      {/* Planet 3: Photorealistic Neptune (Bottom-Right) */}
      <motion.div
        className="absolute bottom-8 right-6 sm:bottom-12 sm:right-16 z-0 pointer-events-none opacity-85"
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
        <div className="relative w-24 h-24 sm:w-36 sm:h-36">
          <CanvasPlanet
            src={NeptuneImg}
            alt="Neptune Planet"
            className="w-full h-full object-contain drop-shadow-[0_0_24px_rgba(59,130,246,0.6)]"
          />
        </div>
      </motion.div>

    </div>
  );
}
