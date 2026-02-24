import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

/* ─── Project data ─── */
const projects = [
  {
    id: "01",
    name: "3D Studios",
    services: ["Website Development", "Social Media Edits & Management", "Post Production"],
    slug: "3d-studios",
    accent: "#E8192C",
    bg: "#111",
    tag: "Creative Studio",
    icon: "🎬",
  },
  {
    id: "02",
    name: "Nofa Beauty Center",
    services: ["Social Media Edits & Management"],
    slug: "nofa-beauty",
    accent: "#E8192C",
    bg: "#0F0F0F",
    tag: "Beauty & Wellness",
    icon: "✨",
  },
  {
    id: "03",
    name: "Adhithya Fashions",
    services: ["Website Development", "SEO Optimization", "Map Integration", "Social Media Edits & Management"],
    slug: "adhithya-fashions",
    accent: "#E8192C",
    bg: "#111",
    tag: "Fashion & Retail",
    icon: "👗",
  },
  {
    id: "04",
    name: "Leaf World",
    services: ["Website Development", "Social Media Edits & Management", "Sales Strategy"],
    slug: "leaf-world",
    accent: "#E8192C",
    bg: "#0F0F0F",
    tag: "Lifestyle & Nature",
    icon: "🌿",
  },
];

/* ─── Single sticky card ─── */
const ProjectCard = ({ project, index, total }) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

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
  const opacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0.6]);

  const isLast = index === total - 1;

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
        className="relative w-full max-w-[min(1024px,92vw)] rounded-2xl md:rounded-3xl border border-white/8 overflow-hidden"
        style={{ background: project.bg }}
      >
        {/* Red glow top-left */}
        <div
          className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(232,25,44,0.08) 0%, transparent 70%)",
            transform: "translate(-30%, -30%)",
          }}
        />

        <div className="flex flex-col md:flex-row items-stretch gap-0">
          {/* Left — project info */}
          <div className="flex-1 p-5 md:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* Project number + tag row */}
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <span
                  className="font-black text-[#E8192C]/20 text-4xl md:text-6xl leading-none select-none"
                  aria-hidden
                >
                  {project.id}
                </span>
                <div className="flex flex-col gap-0.5 md:gap-1">
                  <span className="text-[9px] md:text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium">
                    {project.tag}
                  </span>
                  <h3 className="text-xl md:text-3xl font-black text-white leading-tight">
                    {project.name}
                  </h3>
                </div>
              </div>

              {/* Service chips */}
              <div className="flex flex-wrap gap-2 mb-5 md:mb-8">
                {project.services.map((svc, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium text-white/50 border border-white/8
                               px-3 py-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    {svc}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              to={`/case-study/${project.slug}`}
              className="inline-flex items-center gap-2.5 self-start group"
            >
              <span
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E8192C]
                           group-hover:bg-[#ff2235] group-hover:scale-110
                           transition-all duration-300 shadow-[0_0_20px_rgba(232,25,44,0.3)]"
              >
                <svg className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <span className="text-white/60 text-xs md:text-sm font-medium group-hover:text-white transition-colors duration-300">
                View Case Study
              </span>
            </Link>
          </div>

          {/* Right — visual panel */}
          <div
            className="w-full md:w-[220px] lg:w-[280px] flex-shrink-0 flex items-center justify-center
                       border-t md:border-t-0 md:border-l border-white/5 p-4 md:p-6"
          >
            <div className="flex flex-row md:flex-col items-center gap-4 text-center">
              {/* Emoji icon in a glowing container */}
              <div
                className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center text-3xl md:text-4xl
                           border border-[#E8192C]/20 shadow-[0_0_30px_rgba(232,25,44,0.1)]"
                style={{ background: "rgba(232,25,44,0.06)" }}
              >
                {project.icon}
              </div>
              <div className="hidden md:block w-8 h-px bg-[#E8192C]/30" />
              <p className="text-white/20 text-[10px] md:text-xs uppercase tracking-widest">Project {project.id}</p>
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
      className="relative w-full overflow-visible pt-12 md:pt-20 pb-20 md:pb-32"
      style={{ background: "#080808", zIndex: 1 }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      {/* Section header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C] animate-pulse" />
              <span className="text-[#E8192C] text-xs font-semibold tracking-[0.2em] uppercase">
                Featured Works
              </span>
            </div>
            <h2 className="text-[clamp(1.85rem,5.5vw,3.25rem)] font-black leading-[1.1] tracking-tight text-white">
              Brands We've{" "}
              <span className="text-[#E8192C]">Scaled</span>
            </h2>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-white/40 text-sm font-medium
                       hover:text-white transition-colors duration-300 self-end sm:self-auto pb-1 flex-shrink-0"
          >
            View all projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>

      <div
        className="relative z-10"
        style={{ height: `calc(${projects.length} * 80vh)` }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedWorks;