import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const fadeSlide = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

// Staggered entrance for the content stacked on top of the image —
// each block (badge, heading, stats, services, footer) animates in
// slightly after the previous one, so the whole card feels alive
// together instead of only the photo moving.
const contentContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const contentItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const PROJECTS_PER_PAGE = 4;

function ProjectPreview({ project }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        variants={fadeSlide}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative flex h-[560px] flex-col overflow-hidden rounded-[36px] border border-white/15 bg-white/5 bg-clip-padding shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:h-[600px] lg:h-[640px]"
      >
        {/* Image layer — fills the rectangle cleanly, no shifting/padding.
            A slow, gentle Ken Burns zoom (scale only, no drift) so it
            never breaks alignment with the content sitting on top. */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent" />
        </div>

        <motion.div
          variants={contentContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-10 lg:p-12"
        >
          <motion.div variants={contentItem} className="flex justify-end">
            <Link
              to={`/project/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#E8192C] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.25em] text-white shadow-[0_20px_50px_rgba(232,25,44,0.24)] transition-all duration-300 hover:-translate-y-0.5"
            >
              View Case Study
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectNavItem({ project, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-[28px] border p-5 text-left transition-all duration-300 ${
        active
          ? "border-[#E8192C] bg-[#1d0a10]/70 shadow-[0_20px_60px_rgba(232,25,44,0.18)]"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
      }`}
    >
      <span className={`absolute inset-y-0 left-0 w-1 rounded-r-full ${active ? "bg-[#E8192C]" : "bg-transparent"}`} />
      <div className="relative z-10">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#E8192C]">Project {String(project.id).padStart(2, "0")}</p>
        <h4 className="mt-4 text-[15px] font-bold text-white">{project.title}</h4>
        <p className="mt-3 text-sm leading-6 text-white/65">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.services.slice(0, 2).map((service, index) => (
            <span key={index} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-white/70">
              {service}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

export default function FeaturedWorks() {
  const [page, setPage] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const pageStart = page * PROJECTS_PER_PAGE;
  const featuredProjects = projects.slice(pageStart, pageStart + PROJECTS_PER_PAGE);
  const activeProject = featuredProjects[activeIndex] || featuredProjects[0];

  const hasNextPage = pageStart + PROJECTS_PER_PAGE < projects.length;
  const hasPrevPage = page > 0;
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

const handlePageChange = (pageNumber) => {
  setPage(pageNumber);
  setActiveIndex(0);
};

  const handleNextProjects = () => {
    if (!hasNextPage) return;
    setPage((prev) => prev + 1);
    setActiveIndex(0);
  };

  const handlePrevProjects = () => {
    if (!hasPrevPage) return;
    setPage((prev) => prev - 1);
    setActiveIndex(0);
  };

  const handleNextProject = () => {
    if (activeIndex < featuredProjects.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else if (hasNextPage) {
      setPage((prev) => prev + 1);
      setActiveIndex(0);
    }
  };

  const handlePrevProject = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    } else if (hasPrevPage) {
      setPage((prev) => prev - 1);
      setActiveIndex(PROJECTS_PER_PAGE - 1);
    }
  };
  
const getVisiblePages = () => {
  let start = Math.max(0, page - 1);
  let end = Math.min(totalPages - 1, start + 2);

  if (end - start < 2) {
    start = Math.max(0, end - 2);
  }

  return Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );
};

  return (
    <section id="projects" className="relative overflow-hidden bg-[#040404] text-white py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-16 h-72 w-72 rounded-full bg-[#E8192C]/10 blur-[110px]" />
        <div className="absolute right-0 bottom-16 h-80 w-80 rounded-full bg-[#E8192C]/12 blur-[140px]" />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-6 sm:px-8 lg:px-12">
        <div className="mb-12 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#E8192C]/20 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.34em] text-[#E8192C] shadow-[0_0_20px_rgba(232,25,44,0.12)]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E8192C] animate-pulse" />
            Case Studies
          </div>
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
  Explore our{" "}
  <span className="text-[#E8192C]">
    Featured Work
  </span>.
</h2>
          <p className="max-w-xl text-base leading-7 text-white/65 sm:text-lg">
            A curated collection of our most compelling cases and success stories.
          </p>
        </div>
        <div className="grid gap-8 xl:grid-cols-[1.5fr_0.9fr]">
          <div>
            <ProjectPreview project={activeProject} />
          </div>

         <div className="flex flex-col justify-between h-full">
            <div className="grid gap-5 sm:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <ProjectNavItem
                  key={project.id}
                  project={project}
                  active={index === activeIndex}
                  onSelect={() => setActiveIndex(index)}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 mt-6">
              {/* Previous */}
              <button
                type="button"
                onClick={handlePrevProject}
                disabled={page === 0 && activeIndex === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8192C] text-white shadow-[0_4px_14px_rgba(232,25,44,0.3)] transition-all duration-300 hover:bg-red-600 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Project Numbers */}
              <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2 py-1">
                
                {featuredProjects.map((project, index) => {
                  const projectNum = pageStart + index + 1;
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                        isActive
                          ? "bg-[#E8192C] text-white shadow-[0_0_15px_rgba(232,25,44,0.4)]"
                          : "text-white/60 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {projectNum}
                    </button>
                  );
                })}
                
                {hasNextPage && (
                  <button
                    type="button"
                    onClick={handleNextProjects}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white/50 transition-all hover:bg-white/10 hover:text-white"
                  >
                    ...
                  </button>
                )}
              </div>

              {/* Next */}
              <button
                type="button"
                onClick={handleNextProject}
                disabled={!hasNextPage && activeIndex === featuredProjects.length - 1}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8192C] text-white shadow-[0_4px_14px_rgba(232,25,44,0.3)] transition-all duration-300 hover:bg-red-600 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}