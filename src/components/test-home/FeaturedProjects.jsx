import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import DotGrid from "../backgrounds/Dotgrids";

// --- 1. A simple hook to detect screen size ---
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);
  return matches;
};

// --- 2. The STICKY card for ALL DEVICES ---
function ProjectCardSticky({ project, index, range, targetScale, isMobile }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, range, [1, targetScale]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Cards stack directly on top of each other at top:0
  const topOffset = `0px`;

  return (
    <motion.div
      ref={ref}
      // Added will-change-transform for smoother performance
      className="sticky h-screen flex items-center justify-center px-4 will-change-transform"
      style={{ scale, opacity, top: topOffset }}
    >
      <div
        className={`relative w-full max-w-6xl ${isMobile ? "h-[70vh]" : "h-[75vh]"
          } rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden ${index === 0
            ? "bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950"
            : project.bgColor
          } border-[3px] border-black`}
      >
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover rounded-2xl md:rounded-3xl"
        />

        {index !== 0 && (
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/60 z-[2]" />
        )}

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-10 z-[3] pointer-events-none">
          <div className="absolute top-10 right-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-white rounded-full"></div>
        </div>

        <div
          className={`absolute bottom-0 left-0 ${isMobile ? "p-4 md:p-6" : "p-6 md:p-10"
            } text-white max-w-2xl z-[4]`}
        >
          <div className="mb-4">
            <span
              className={`${isMobile ? "text-xs" : "text-sm md:text-base lg:text-lg"
                } font-medium bg-white/20 px-3 py-1 rounded-full text-white/70`}
            >
              Project {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h3
            className={`${isMobile
                ? "text-2xl md:text-[28px]"
                : "text-2xl md:text-[28px] lg:text-[32px]"
              } text-white font-bold mb-3 [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]`}
          >
            {project.title}
          </h3>
          <p
            className={`${isMobile
                ? "text-sm md:text-[15px]"
                : "text-sm md:text-[15px] lg:text-base"
              } text-white mb-4 leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]`}
          >
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.split(" + ").map((tag) => (
              <span
                key={tag}
                className={`bg-white/20 backdrop-blur-md ${isMobile ? "text-xs" : "text-sm"
                  } font-medium px-4 py-2 rounded-full border border-white/30 text-white`}
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            to={`/project/${project.id}`}
            state={{ project }}
            className={`inline-flex items-center gap-2 font-semibold text-[#371445] bg-white hover:scale-105 transition-all ${isMobile ? "px-6 py-2.5 text-sm" : "px-8 py-3 text-base"
              } rounded-full hover:bg-gray-50`}
            style={{ boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4)" }}
          >
            View Case Study
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// --- 3. The MAIN Component ---
function FeaturedProjects() {
  const ref = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section
      ref={ref}
      id="projects"
      className="relative bg-gray-50" // Removed gradient here to let dots shine
    >
      {/* --- FIXED BACKGROUND CONTAINER --- */}
      {/* 1. 'absolute inset-0' makes this container as tall as the entire section */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* 2. 'sticky top-0 h-screen' makes the inner div lock to the viewport 
               while scrolling through the tall parent */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <DotGrid
            dotSize={2}
            gap={20}
            baseColor="#b5a2ffff" // Lighter gray for better contrast with cards
            activeColor="#9333ea" // Purple to match your theme
            proximity={100}
            shockRadius={300}
            shockStrength={8}
            resistance={800}
            returnDuration={1}
          />
          {/* Optional: subtle gradient overlay on the dots so they fade at edges */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-transparent to-gray-50 opacity-80"></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Header */}
        <div className="w-[90%] max-w-6xl mx-auto pt-16 md:pt-24 pb-0 md:pb-0">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-extrabold text-[#371445] mb-6 tracking-tight">
              Featured Works
            </h2>
            <p className="text-sm md:text-[15px] lg:text-base text-[#5F5F5F] max-w-2xl mx-auto leading-relaxed">
              A selection of our most impactful projects.
            </p>
          </motion.div>
        </div>

        {/* Stacked Cards Area */}
        {/* Added extra space at bottom so last card can be fully viewed and stacked */}
        <div style={{ height: `${(projects.length + 0.5) * 100}vh` }}>
          {projects.map((project, index) => {
            // Slightly adjusted scale for a more subtle stacking effect
            const targetScale = 1 - (projects.length - index) * 0.04;
            return (
              <ProjectCardSticky
                key={project.id}
                project={project}
                index={index}
                range={[0, 1]}
                targetScale={targetScale}
                isMobile={isMobile}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
