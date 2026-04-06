import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects";

const glitterParticles = [
  { top: "20%", left: "8%", delay: 0 },
  { top: "70%", left: "15%", delay: 0.4 },
  { top: "30%", right: "10%", delay: 0.8 },
  { top: "65%", right: "18%", delay: 0.2 },
  { top: "15%", left: "45%", delay: 0.6 },
];

const icons = ["🎬", "💄", "👔", "🌿"];

/* ─── Single sticky card (original design) ─── */
const ProjectCard = ({ project, index, total, icon }) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const topOffset = isMobile ? (60 + index * 40) : (80 + index * 14);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const opacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0.5]);
  const isLast = index === total - 1;

  const displayId = String(project.id).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      className="sticky flex items-start justify-center px-4 md:px-6"
      style={{
        top: topOffset,
        paddingTop: "24px",
        paddingBottom: "24px",
        scale: isLast ? 1 : scale,
        opacity: isLast ? 1 : opacity,
        willChange: "transform",
      }}
    >
      <div
        className="relative w-full max-w-[min(1100px,96vw)] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl"
        style={{
          background: "linear-gradient(135deg, rgba(232,25,44,0.07) 0%, rgba(10,10,10,0.97) 40%, rgba(232,25,44,0.04) 100%)",
          border: "1px solid rgba(232,25,44,0.25)",
          boxShadow: "0 0 60px rgba(232,25,44,0.08), 0 0 120px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* top glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#E8192C]/50 to-transparent" />

        {/* Red glow top-left */}
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none blur-[100px]"
          style={{
            background: "radial-gradient(circle, rgba(232,25,44,0.12) 0%, transparent 60%)",
            transform: "translate(-30%, -30%)",
          }}
        />

        {/* Dynamic Vertical Accent Line */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-[#E8192C] to-transparent opacity-60 mix-blend-screen" />

        <div className="flex flex-col md:flex-row items-stretch gap-0 relative z-10">
          {/* Left — project info */}
          <div className="flex-1 p-10 md:p-16 lg:p-20 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4 md:mb-8">
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-br from-[#E8192C]/40 to-transparent text-5xl md:text-7xl leading-none select-none drop-shadow-md">
                  {displayId}
                </span>
                <div className="flex flex-col gap-1 md:gap-2">
                  <span className="inline-block px-3 py-1 text-[9px] md:text-[10px] text-white bg-white/5 border border-white/10 rounded-full uppercase tracking-[0.2em] font-semibold">
                    {project.tags}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-black text-white leading-tight mt-1 tracking-tight">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5 mb-8 md:mb-12">
                {project.services.map((svc, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-4 py-1.5 rounded-full transition-colors duration-300"
                    style={{
                      color: "rgba(232,25,44,0.9)",
                      background: "rgba(232,25,44,0.08)",
                      border: "1px solid rgba(232,25,44,0.2)",
                    }}
                  >
                    {svc}
                  </span>
                ))}
              </div>
            </div>

            <Link
              to={`/project/${project.slug}`}
              className="relative inline-flex items-center xl:w-max w-full justify-between gap-4 self-start group px-6 py-3 rounded-full overflow-hidden transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(232,25,44,0.18) 0%, rgba(0,0,0,0.6) 50%, rgba(232,25,44,0.12) 100%)",
                border: "1px solid rgba(232,25,44,0.5)",
                boxShadow: "0 0 18px rgba(232,25,44,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)" }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
              />
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-[#E8192C]/80 to-transparent" />
              {glitterParticles.map((pos, i) => (
                <motion.span
                  key={i}
                  className="absolute w-[3px] h-[3px] rounded-full bg-white"
                  style={{ top: pos.top, left: pos.left, right: pos.right }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }}
                />
              ))}
              
              <div className="relative z-10 flex items-center justify-between w-full gap-4">
                <span className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8192C] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E8192C]" />
                  </span>
                  <span className="text-white text-xs md:text-sm font-bold uppercase tracking-widest group-hover:text-[#E8192C] transition-colors duration-300"
                    style={{ textShadow: "0 0 10px rgba(232,25,44,0.7)" }}>
                    View Case Study
                  </span>
                  <motion.span
                    className="relative text-[#E8192C] text-base leading-none"
                    animate={{ rotate: [0, 180, 360], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >✦</motion.span>
                </span>
                
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent group-hover:bg-[#E8192C] border border-[#E8192C]/50 group-hover:border-transparent group-hover:scale-105 transition-all duration-300">
                  <svg className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>

          {/* Right — visual panel */}
          <div className="w-full md:w-[280px] lg:w-[350px] flex-shrink-0 flex items-center justify-center border-t md:border-t-0 md:border-l border-white/5 p-10 md:p-16 bg-gradient-to-br from-transparent to-black/40">
            <div className="flex flex-row md:flex-col items-center gap-6 text-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-20 h-20 md:w-32 md:h-32 rounded-3xl md:rounded-[2.5rem] flex items-center justify-center text-4xl md:text-6xl relative"
                style={{
                  border: "1px solid rgba(232,25,44,0.3)",
                  boxShadow: "0 0 50px rgba(232,25,44,0.15)",
                  background: "linear-gradient(135deg, rgba(232,25,44,0.1) 0%, transparent 100%)",
                }}
              >
                <div className="absolute inset-0 bg-white/5 rounded-3xl md:rounded-[2.5rem] animate-pulse opacity-50" />
                <span className="relative z-10 drop-shadow-2xl">{icon}</span>
              </motion.div>
              <div className="hidden md:block w-12 h-px bg-gradient-to-r from-transparent via-[#E8192C]/50 to-transparent" />
              <p className="text-white/30 text-[10px] md:text-sm uppercase tracking-[0.3em] font-black">Project {displayId}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main section ─── */
const FeaturedWorks = () => {
  return (
    <section
      id="projects"
      className="relative w-full overflow-visible pt-16 md:pt-24 pb-20 md:pb-32"
      style={{ backgroundColor: "#000000", zIndex: 1 }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle, rgba(232,25,44,0.1) 0%, transparent 60%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Header ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            {/* Featured Works badge */}
            <div
              className="relative inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(232,25,44,0.18) 0%, rgba(0,0,0,0.6) 50%, rgba(232,25,44,0.12) 100%)",
                border: "1px solid rgba(232,25,44,0.5)",
                boxShadow: "0 0 18px rgba(232,25,44,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)" }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
              />
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-[#E8192C]/80 to-transparent" />
              {glitterParticles.map((pos, i) => (
                <motion.span
                  key={i}
                  className="absolute w-[3px] h-[3px] rounded-full bg-white"
                  style={{ top: pos.top, left: pos.left, right: pos.right }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }}
                />
              ))}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8192C] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E8192C]" />
              </span>
              <span
                className="relative text-white text-xs sm:text-sm font-bold tracking-[0.3em] uppercase"
                style={{ textShadow: "0 0 10px rgba(232,25,44,0.7)" }}
              >
                Featured Works
              </span>
              <motion.span
                className="relative text-[#E8192C] text-base leading-none"
                animate={{ rotate: [0, 180, 360], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >✦</motion.span>
            </div>

            <h2 className="text-[clamp(2rem,6vw,4rem)] font-black leading-[1.05] tracking-tight text-white drop-shadow-lg">
              Brands We've{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8192C] to-[#E8192C]">
                Scaled
              </span>
            </h2>
          </div>

          {/* View all projects — glitter badge style */}
          <div
            className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full overflow-hidden cursor-pointer self-end sm:self-auto mb-2"
            style={{
              background: "linear-gradient(135deg, rgba(232,25,44,0.18) 0%, rgba(0,0,0,0.6) 50%, rgba(232,25,44,0.12) 100%)",
              border: "1px solid rgba(232,25,44,0.5)",
              boxShadow: "0 0 18px rgba(232,25,44,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)" }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
            />
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-[#E8192C]/80 to-transparent" />
            {glitterParticles.map((pos, i) => (
              <motion.span
                key={i}
                className="absolute w-[3px] h-[3px] rounded-full bg-white"
                style={{ top: pos.top, left: pos.left, right: pos.right }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: pos.delay + 0.3, ease: "easeInOut" }}
              />
            ))}
            <Link
              to="/projects"
              className="relative flex items-center gap-3"
            >
              <span
                className="text-white text-xs sm:text-sm font-bold tracking-[0.3em] uppercase"
                style={{ textShadow: "0 0 10px rgba(232,25,44,0.7)" }}
              >
                View All Projects
              </span>
              <motion.span
                className="relative text-[#E8192C] text-base leading-none"
                animate={{ rotate: [0, 180, 360], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >✦</motion.span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Sticky scroll cards ── */}
      <div className="relative z-10" style={{ height: `calc(${projects.length} * 85vh)` }}>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
            icon={icons[index]}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedWorks;
