import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const previewVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
};

const contentVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const PROJECTS_PER_PAGE = 4;

function ProjectPreview({ project }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        variants={previewVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="group relative flex h-[560px] sm:h-[620px] lg:h-[660px] flex-col overflow-hidden rounded-[32px] border border-neutral-200/80 bg-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.12)] cursor-pointer"
      >
        {/* Full Cover Visual Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
          {/* Subtle dark gradient overlay at bottom for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-95" />
        </div>

        {/* Bottom-Left Overlay Content */}
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-10 lg:p-12"
        >
          {/* Badge & Year */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-3">
            <span className="px-3.5 py-1 rounded-full bg-white/20 border border-white/30 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
              Featured Case Study
            </span>
            <span className="text-white/60 text-xs font-medium">2026</span>
          </motion.div>

          {/* Project Title */}
          <motion.h3
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-3"
          >
            {project.title}
          </motion.h3>

          {/* Short Description */}
          <motion.p
            variants={itemVariants}
            className="text-white/80 text-sm sm:text-base leading-relaxed font-normal max-w-xl mb-6"
          >
            {project.description}
          </motion.p>

          {/* Services Tags */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
            {project.services?.map((service, index) => (
              <span
                key={index}
                className="rounded-full border border-white/25 bg-white/15 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white/90"
              >
                {service}
              </span>
            ))}
          </motion.div>

          {/* Integrated Case Study CTA Button */}
          <motion.div variants={itemVariants} className="flex items-center">
            <Link
              to={`/project/${project.slug}`}
              className="primary-btn inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white shadow-lg group/btn hover:scale-102 transition-all group-hover:-translate-y-0.5"
            >
              <span>View Case Study</span>
              <ArrowUpRight className="w-4 h-4 text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
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
      className={`group relative flex items-center gap-4 overflow-hidden rounded-[22px] border p-4 text-left transition-all duration-300 ${
        active
          ? "border-[#E31D2E] bg-white shadow-[0_10px_30px_rgba(227,29,46,0.12)] scale-[1.02]"
          : "border-neutral-200/80 bg-white hover:border-[#E31D2E]/40 hover:-translate-y-1 hover:scale-[1.015] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
      }`}
    >
      {/* Active Red Indicator Bar */}
      <span
        className={`absolute inset-y-0 left-0 w-1.5 rounded-r-full transition-colors duration-300 ${
          active ? "bg-[#E31D2E]" : "bg-transparent group-hover:bg-[#E31D2E]/40"
        }`}
      />

      {/* Thumbnail Image */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-neutral-200/80 flex-shrink-0 bg-neutral-100">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Card Details */}
      <div className="relative z-10 flex-1 min-w-0 pr-2">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E31D2E]">
            Project {String(project.id).padStart(2, "0")}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#E31D2E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </div>
        <h4 className="text-sm sm:text-base font-black text-[#111111] truncate group-hover:text-[#E31D2E] transition-colors">
          {project.title}
        </h4>
        <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5 font-normal">
          {project.description}
        </p>
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
        {/* Section Header */}
        <div className="mb-12 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E31D2E]/20 bg-white/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#111111] shadow-[0_8px_16px_rgba(17,17,17,0.02)]">
            <span className="h-2 w-2 rounded-full bg-[#E31D2E] animate-pulse" />
            Case Studies
          </div>
          <h2 className="text-4xl font-black tracking-tight text-[#111111] sm:text-5xl lg:text-6xl">
            Explore our{" "}
            <span className="text-[#E31D2E]">Featured Work</span>.
          </h2>
          <p className="max-w-xl text-base leading-7 text-[#575757] sm:text-lg font-medium">
            Curated brand legacy building and performance marketing campaigns that deliver results.
          </p>
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="grid gap-8 xl:grid-cols-[1.5fr_0.9fr] items-start">
          <div>
            <ProjectPreview project={activeProject} />
          </div>

          <div className="flex flex-col justify-between h-full space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              {featuredProjects.map((project, index) => (
                <ProjectNavItem
                  key={project.id}
                  project={project}
                  active={index === activeIndex}
                  onSelect={() => setActiveIndex(index)}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-3 pt-4">
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
              <div className="flex items-center gap-1 rounded-full border border-neutral-200/80 bg-white/80 px-2 py-1 shadow-xs">
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
                          : "text-[#575757] hover:bg-neutral-100 hover:text-[#111111]"
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