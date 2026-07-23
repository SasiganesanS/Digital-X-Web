import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const fadeSlide = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

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
        className="relative flex h-[560px] flex-col overflow-hidden rounded-[32px] border border-white/40 bg-white/45 bg-clip-padding shadow-[0_12px_32px_rgba(17,17,17,0.04)] backdrop-blur-xl sm:h-[600px] lg:h-[640px]"
      >
        {/* Image layer */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        </div>

        <motion.div
          variants={contentContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-10 lg:p-12 dark-surface"
        >
          <motion.div variants={contentItem} className="flex justify-end">
            <Link
              to={`/project/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#E31D2E] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.25em] text-white shadow-[0_8px_20px_rgba(227,29,46,0.2)] transition-all duration-300 hover:bg-[#111111] hover:-translate-y-0.5 active:scale-95"
            >
              View Case Study
              <ArrowUpRight className="w-4 h-4 text-white" />
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
      className={`group relative overflow-hidden rounded-[24px] border p-5 text-left transition-all duration-300 ${
        active
          ? "border-[#E31D2E]/40 bg-white/80 shadow-[0_12px_32px_rgba(17,17,17,0.04)]"
          : "border-white/50 bg-white/40 shadow-[0_4px_12px_rgba(17,17,17,0.02)] hover:border-white/80 hover:bg-white/60"
      }`}
    >
      <span className={`absolute inset-y-0 left-0 w-1 rounded-r-full ${active ? "bg-[#E31D2E]" : "bg-transparent"}`} />
      <div className="relative z-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E31D2E]">Project {String(project.id).padStart(2, "0")}</p>
        <h4 className="mt-3 text-[15px] font-black text-[#111111]">{project.title}</h4>
        <p className="mt-2 text-xs leading-relaxed text-[#575757] line-clamp-2">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.services.slice(0, 2).map((service, index) => (
            <span key={index} className="rounded-full border border-white/80 bg-white/50 px-3 py-0.5 text-[8px] uppercase tracking-[0.2em] text-[#575757] font-semibold">
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

  return (
    <section id="projects" className="relative overflow-hidden bg-transparent py-20 sm:py-24 lg:py-28">
      <div className="relative mx-auto w-full max-w-[1240px] px-6 sm:px-8 lg:px-12">
        <div className="mb-12 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E31D2E]/20 bg-white/60 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-[#E31D2E] shadow-[0_8px_16px_rgba(17,17,17,0.02)]">
            <span className="h-2 w-2 rounded-full bg-[#E31D2E] animate-pulse" />
            Case Studies
          </div>
          <h2 className="text-4xl font-black tracking-tight text-[#111111] sm:text-5xl lg:text-6xl">
            Explore our{" "}
            <span className="text-[#E31D2E]">Featured Work</span>.
          </h2>
          <p className="max-w-xl text-base leading-7 text-[#575757] sm:text-lg">
            Curated brand legacy building and performance marketing campaigns that deliver results.
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
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E31D2E] text-white shadow-[0_4px_14px_rgba(227,29,46,0.15)] transition-all duration-300 hover:bg-[#111111] hover:scale-110 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              {/* Project Numbers */}
              <div className="flex items-center gap-1 rounded-full border border-white/50 bg-white/40 px-2 py-1">
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
                          ? "bg-[#E31D2E] text-white shadow-[0_4px_10px_rgba(227,29,46,0.2)]"
                          : "text-[#575757] hover:bg-black/5 hover:text-[#111111]"
                      }`}
                    >
                      {projectNum}
                    </button>
                  );
                })}
              </div>

              {/* Next */}
              <button
                type="button"
                onClick={handleNextProject}
                disabled={!hasNextPage && activeIndex === featuredProjects.length - 1}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E31D2E] text-white shadow-[0_4px_14px_rgba(227,29,46,0.15)] transition-all duration-300 hover:bg-[#111111] hover:scale-110 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}