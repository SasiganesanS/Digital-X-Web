import React, { useState } from "react";
import { motion } from "framer-motion";
import pyLogo from "../assets/Praskla_Digital_X_Logo_Trasnparent_Background.webp";
import BrandX from "./common/BrandX";
import career01 from "../assets/Careers/career01.webp";
import career02 from "../assets/Careers/career02.webp";
import career03 from "../assets/Careers/career03.webp";
import career04 from "../assets/Careers/career04.webp";
import career05 from "../assets/Careers/career05.webp";
import career06 from "../assets/Careers/career06.webp";
import career07 from "../assets/Careers/career07.webp";
import career08 from "../assets/Careers/career08.webp";

const DEFAULT_MEMBERS = [
  { id: 1, image: career01, alt: "Marketing Dashboard", title: "Marketing", sub: "Dashboard" },
  { id: 2, image: career02, alt: "Team Collaboration", title: "Team", sub: "Collaboration" },
  { id: 3, image: career03, alt: "Email Marketing", title: "Email", sub: "Marketing" },
  { id: 4, image: career04, alt: "Analytics Dashboard", title: "Analytics", sub: "Insights" },
  { id: 5, image: pyLogo, alt: "Praskla Digital X Logo", title: "Praskla", sub: "Digital X", isCenter: true },
  { id: 6, image: career05, alt: "Strategy Presentation", title: "Strategy", sub: "Presentation" },
  { id: 7, image: career06, alt: "SEO", title: "SEO", sub: "Growth" },
  { id: 8, image: career07, alt: "Creative Content", title: "Creative", sub: "Content" },
  { id: 9, image: career08, alt: "Website Optimization", title: "Website", sub: "Optimization" },
];

const FLOAT_CONFIGS = [
  { duration: 6.2, delay: 0 },
  { duration: 7.4, delay: 0.3 },
  { duration: 6.8, delay: 0.6 },
  { duration: 7.1, delay: 0.2 },
  { duration: 4.0, delay: 0 }, // Center breathing
  { duration: 8.0, delay: 0.4 },
  { duration: 6.5, delay: 0.1 },
  { duration: 7.8, delay: 0.5 },
  { duration: 6.9, delay: 0.3 },
];

// SVG Connection Line targets from Center Card (Index 4)
const CENTER_CONNECTIONS = [
  { x2: "17%", y2: "17%" }, // 0: Top-Left
  { x2: "50%", y2: "17%" }, // 1: Top-Center
  { x2: "83%", y2: "17%" }, // 2: Top-Right
  { x2: "17%", y2: "50%" }, // 3: Mid-Left
  { x2: "83%", y2: "50%" }, // 5: Mid-Right
  { x2: "17%", y2: "83%" }, // 6: Bottom-Left
  { x2: "50%", y2: "83%" }, // 7: Bottom-Center
  { x2: "83%", y2: "83%" }, // 8: Bottom-Right
];

export default function CareersImageGrid({ teamMembers }) {
  const members = teamMembers && teamMembers.length === 9 ? teamMembers : DEFAULT_MEMBERS;
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[480px] sm:max-w-[530px] lg:max-w-[560px] aspect-square mx-auto select-none"
    >
      {/* Outer Claymorphism Showcase Container */}
      <div className="relative w-full h-full rounded-[2.5rem] p-3.5 sm:p-4 md:p-5 bg-white/40 backdrop-blur-2xl border border-white/70 shadow-[0_20px_50px_rgba(17,17,17,0.04)] overflow-hidden flex items-center justify-center">
        {/* Soft Radial Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-[#E31D2E]/7 rounded-full blur-[90px] pointer-events-none z-0" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
          style={{
            backgroundImage: "radial-gradient(circle,#111 1.2px,transparent 1.2px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* SVG Connecting Energy Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {CENTER_CONNECTIONS.map((line, i) => (
            <React.Fragment key={i}>
              <line
                x1="50%"
                y1="50%"
                x2={line.x2}
                y2={line.y2}
                stroke="rgba(0, 0, 0, 0.05)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <motion.circle
                r="2.5"
                fill="#FF2B2B"
                initial={{ offsetDistance: "0%" }}
                animate={{
                  cx: ["50%", line.x2],
                  cy: ["50%", line.y2],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              />
            </React.Fragment>
          ))}
        </svg>

        {/* Inner Light Reflection */}
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-white/70 via-transparent to-white/40 pointer-events-none z-10" />

        {/* 3×3 Grid Container */}
        <div className="grid grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 w-full h-full relative z-20">
          {members.map((member, index) => {
            const isCenter = index === 4 || member.id === 5;
            const isHovered = hoveredIndex === index;
            const config = FLOAT_CONFIGS[index] || { duration: 6, delay: 0 };
            const labelInfo = DEFAULT_MEMBERS[index] || { title: "Team", sub: "Work" };

            return (
              <TileCard
                key={member.id || index}
                member={member}
                index={index}
                isCenter={isCenter}
                isHovered={isHovered}
                config={config}
                labelInfo={labelInfo}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function TileCard({
  member,
  index,
  isCenter,
  isHovered,
  config,
  labelInfo,
  onMouseEnter,
  onMouseLeave,
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: yPct * -10, y: xPct * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    onMouseLeave();
  };

  return (
    <motion.div
      animate={
        isCenter
          ? { scale: [1, 1.04, 1] }
          : {
              y: isHovered ? -12 : [-5, 5, -5],
              rotate: isHovered ? 0 : [-1, 1, -1],
            }
      }
      transition={
        isCenter
          ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
          : {
              y: isHovered
                ? { type: "spring", stiffness: 280, damping: 20 }
                : {
                    duration: config.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: config.delay,
                  },
              rotate: {
                duration: config.duration * 1.1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: config.delay,
              },
            }
      }
      onMouseEnter={onMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`clay-card relative rounded-[24px] sm:rounded-[28px] lg:rounded-[30px] p-2.5 sm:p-3 flex flex-col items-center justify-between border backdrop-blur-xl transition-all duration-500 overflow-hidden cursor-pointer select-none ${
        isCenter
          ? "bg-white border-white shadow-[0_12px_32px_rgba(17,17,17,0.06)]"
          : isHovered
          ? "bg-white border-[#FF2B2B]/40 shadow-[0_12px_40px_rgba(0,0,0,0.08)] z-30"
          : "bg-white/80 border-white/80 shadow-[0_8px_24px_rgba(17,17,17,0.03)] hover:bg-white"
      }`}
      style={{
        transform: isHovered ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : "none",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Light Inner Glass Highlight */}
      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/80 via-transparent to-transparent pointer-events-none z-10" />

      {/* Center Faint Glow */}
      {/* Center Faint Glow */}
      {isCenter && (
        <div className="absolute inset-0 bg-[#E31D2E]/15 blur-xl pointer-events-none z-0" />
      )}

      {/* Image Area */}
      <div className={`relative w-full aspect-square overflow-hidden flex items-center justify-center z-10 ${
        isCenter ? "bg-transparent p-0" : "rounded-[18px] sm:rounded-[22px] p-2 bg-gradient-to-br from-neutral-50/80 to-transparent"
      }`}>
        <motion.img
          src={member.image || member}
          alt={member.alt || "Praskla Work"}
          className={`w-full h-full object-contain transition-transform duration-500 ease-out ${
            isCenter
              ? "scale-125 hover:scale-130"
              : isHovered
              ? "scale-110"
              : "scale-100"
          }`}
          loading="lazy"
        />
      </div>

      {/* Label Subtitle */}
      <div className="relative z-10 text-center pb-0.5 mt-1.5 w-full flex flex-col items-center">
        <span className={`tracking-tight block leading-tight ${
          isCenter
            ? "font-inlander text-[12px] sm:text-[13.5px] font-black text-[#E31D2E] uppercase tracking-wide text-center"
            : isHovered
            ? "text-[10px] sm:text-[11px] font-black text-[#E31D2E]"
            : "text-[10px] sm:text-[11px] font-black text-[#111111]"
        }`}>
          {labelInfo.title}
        </span>
        <div className="flex items-center justify-center w-full">
          <span className={`block -mt-0.5 inline-flex items-center justify-center gap-0.5 leading-tight ${
            isCenter
              ? "font-inlander text-[9.5px] sm:text-[11px] font-black uppercase tracking-wider text-[#111111] pl-1.5"
              : "text-[9px] font-bold uppercase tracking-widest text-[#575757]"
          }`}>
            {labelInfo.sub === "Digital X" ? (
              <>
                <span>Digital</span> <BrandX className="h-[11px] sm:h-[12px] w-auto text-[#E31D2E] translate-y-[1px] -mr-2 sm:-mr-2.5" />
              </>
            ) : (
              labelInfo.sub
            )}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
