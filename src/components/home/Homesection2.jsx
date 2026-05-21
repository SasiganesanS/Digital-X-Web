import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACC = "#E8192C";
const BORDER = "rgba(232,25,44,0.2)";
const GLOW = "rgba(232,25,44,0.15)";

/* ── Sparkle Particle Component ── */
const SparkleParticle = ({ delay = 0, left, top, size = 2 }) => (
  <motion.div
    className="absolute rounded-full bg-white opacity-0"
    style={{ left, top, width: size, height: size, boxShadow: `0 0 10px 1px ${ACC}` }}
    animate={{
      opacity: [0, 0.8, 0],
      scale: [0, 1.2, 0],
      y: [0, -20, -40],
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

/* ── Project Card Component ── */
const ProjectCard = ({ project, total }) => {
  const id = String(project.id).padStart(2, "0");
  return (
    <div className="relative w-full h-full overflow-hidden group"
      style={{
        borderRadius: 32,
        background: "linear-gradient(145deg, #0d0d0d 0%, #111 40%, #0a0a0a 100%)",
        border: `1px solid ${BORDER}`,
        boxShadow: `0 30px 80px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 60px ${GLOW}`,
      }}>
      
      {/* Background Sparkles / Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <SparkleParticle left="10%" top="25%" delay={0} />
        <SparkleParticle left="30%" top="75%" delay={1.5} size={3} />
        <SparkleParticle left="60%" top="45%" delay={0.8} />
        <SparkleParticle left="80%" top="20%" delay={2.2} size={4} />
        <SparkleParticle left="25%" top="90%" delay={1.1} />
        <SparkleParticle left="50%" top="15%" delay={2.8} />
        <SparkleParticle left="15%" top="60%" delay={0.5} size={3} />
        <SparkleParticle left="75%" top="80%" delay={1.9} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      
      {/* Accent Lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${ACC}66, transparent)` }} />
      <div className="absolute left-0 w-[3px] rounded-r-full"
        style={{ top: "15%", bottom: "15%", background: `linear-gradient(180deg, transparent, ${ACC}, transparent)`, opacity: 0.45 }} />

      <div className="relative z-10 flex h-full">
        {/* Left Content */}
        <div className="flex-1 p-8 md:p-12 lg:p-14 flex flex-col justify-center relative overflow-hidden">
          {/* Watermark ID */}
          <div className="absolute top-0 left-4 text-[9rem] md:text-[12rem] font-black leading-none select-none pointer-events-none"
            style={{ color: "rgba(232,25,44,0.11)" }}>{id}</div>
          
          <div className="relative z-10 mt-36 lg:mt-48">
            <p className="text-[11px] uppercase tracking-[0.3em] font-semibold mb-2 text-[#E8192C] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {project.tags}
            </p>
            <h3 className="text-3xl md:text-5xl font-black leading-tight mb-4 text-white"
              style={{ textShadow: `0 0 40px ${GLOW}` }}>{project.title}</h3>
            <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-sm mb-8">{project.description}</p>
            
            {/* Redesigned Service Tags (Glassmorphism Small Boxes) */}
            <div className="flex flex-wrap gap-3 mb-10">
              {project.services.map((s, i) => (
                <motion.span 
                  key={i} 
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "rgba(232,25,44,0.18)",
                    borderColor: "rgba(232,25,44,0.6)"
                  }}
                  className="text-[10px] font-bold px-4 py-2 rounded-xl backdrop-blur-md transition-all duration-300 cursor-default"
                  style={{ 
                    background: "rgba(255,255,255,0.04)", 
                    border: "1px solid rgba(232,25,44,0.25)", 
                    color: "#ff8a95",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2), inset 0 0 10px rgba(232,25,44,0.05)"
                  }}>
                  {s}
                </motion.span>
              ))}
            </div>

            <Link to={`/project/${project.slug}`}
              className="group/b inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
              style={{ background: "linear-gradient(135deg, rgba(232,25,44,0.25), rgba(232,25,44,0.12))", border: `1px solid ${BORDER}`, color: "#fff" }}>
              View Case Study
              <span className="w-8 h-8 rounded-full flex items-center justify-center bg-[#E8192C] shadow-[0_0_20px_rgba(232,25,44,0.5)]">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </span>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden lg:block w-[42%] flex-shrink-0 relative overflow-hidden bg-black/20">
          <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default function FeaturedWorks() {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const cardRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile || !containerRef.current || !triggerRef.current) return;

    const cards = cardRefs.current.filter(Boolean);
    const n = cards.length;

    gsap.set(cards[0], { y: "0%" });
    for (let i = 1; i < n; i++) {
      gsap.set(cards[i], { y: "100%" });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${n * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      for (let i = 1; i < n; i++) {
        tl.to(cards[i], {
          y: "0%",
          ease: "none",
          duration: 1,
        }, `card-${i}`);
      }
    });

    return () => ctx.revert();
  }, [isMobile]);

  const n = projects.length;

  return (
    <section ref={triggerRef} className="relative w-full bg-black overflow-hidden" id="projects">
      {/* ── Mobile Layout ── */}
      {isMobile ? (
        <div className="py-24 px-6 bg-[#040404]">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-4xl font-black text-white mb-12">Brands We've <span className="text-[#E8192C]">Scaled</span></h2>
            <div className="flex flex-col gap-10">
              {projects.map((p, i) => (
                <div key={p.id} className="h-[500px]">
                  <ProjectCard project={p} total={n} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ── Desktop Layout ── */
        <div ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center bg-[#040404]">
          {/* Section Header */}
          <div className="absolute top-10 left-0 right-0 z-[100] px-10">
            <div className="max-w-[1100px] mx-auto w-full flex justify-between items-end">
              <div>
                <div className="inline-flex items-center gap-3 mb-4 px-5 py-2.5 rounded-full bg-red-600/10 border border-red-600/30">
                  <span className="w-2 h-2 rounded-full bg-[#E8192C] animate-pulse shadow-[0_0_10px_rgba(232,25,44,0.8)]" />
                  <span className="text-white text-[11px] font-bold tracking-[0.4em] uppercase">Featured Works</span>
                </div>
                <h2 className="text-6xl font-black text-white tracking-tight">Brands We've <span className="text-[#E8192C]">Scaled</span></h2>
              </div>
            </div>
          </div>

          {/* Fixed Card Container Area */}
          <div className="relative w-[92%] max-w-[1100px] h-[72vh] mt-32 overflow-hidden rounded-[36px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
            {projects.map((project, i) => (
              <div
                key={project.id}
                ref={el => { cardRefs.current[i] = el; }}
                className="absolute inset-0"
                style={{ zIndex: 10 + i }}
              >
                <ProjectCard project={project} total={n} />
              </div>
            ))}
          </div>

          {/* Background Ambient Glows */}
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/5 blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/3 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          </div>
        </div>
      )}
    </section>
  );
}
