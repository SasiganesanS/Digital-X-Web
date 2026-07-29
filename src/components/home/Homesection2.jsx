import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const PROJECTS_PER_PAGE = 4;

export default function FeaturedWorks() {
  const [page, setPage] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

  // Get projects for current page group
  const currentGroupProjects = projects.slice(
    page * PROJECTS_PER_PAGE,
    (page + 1) * PROJECTS_PER_PAGE
  );

  const activeProject = currentGroupProjects[activeIndex] || currentGroupProjects[0];

  // Autoplay every 5s (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      if (activeIndex < currentGroupProjects.length - 1) {
        setActiveIndex((prev) => prev + 1);
      } else {
        setPage((prevPage) => (prevPage + 1) % totalPages);
        setActiveIndex(0);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, activeIndex, currentGroupProjects.length, totalPages]);

  const handleNext = () => {
    if (activeIndex < currentGroupProjects.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else {
      setPage((prevPage) => (prevPage + 1) % totalPages);
      setActiveIndex(0);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    } else {
      const prevPage = (page - 1 + totalPages) % totalPages;
      setPage(prevPage);
      const prevPageProjects = projects.slice(
        prevPage * PROJECTS_PER_PAGE,
        (prevPage + 1) * PROJECTS_PER_PAGE
      );
      setActiveIndex(prevPageProjects.length - 1);
    }
  };

  const handlePageSelect = (targetPage) => {
    setPage(targetPage);
    setActiveIndex(0);
  };

  // Vertical drag end handler to switch project groups smoothly
  const handleDragEnd = (event, info) => {
    const offsetY = info.offset.y;
    const velocityY = info.velocity.y;

    // Drag upward -> next group
    if (offsetY < -40 || velocityY < -250) {
      setPage((prevPage) => (prevPage + 1) % totalPages);
      setActiveIndex(0);
    }
    // Drag downward -> previous group
    else if (offsetY > 40 || velocityY > 250) {
      setPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
      setActiveIndex(0);
    }
  };

  return (
    <section id="projects" className="relative overflow-hidden bg-transparent py-12 sm:py-14 lg:py-16">
      <div className="relative mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-8 max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E31D2E]/20 bg-white/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#111111] shadow-[0_8px_16px_rgba(17,17,17,0.02)]">
            <span className="h-2 w-2 rounded-full bg-[#E31D2E] animate-pulse" />
            Portfolio Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111]">
            Featured <span className="text-[#E31D2E]">Projects</span>.
          </h2>
          <p className="max-w-xl text-sm sm:text-base leading-6 text-[#575757] font-medium">
            Browse our curated agency work across branding, digital media, 3D studios, and production.
          </p>
        </div>

        {/* ── Main Portfolio Showcase Grid (65% Left Image / 35% Right Project List) ── */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch w-full h-auto sm:h-[clamp(460px,58vh,560px)] lg:h-[clamp(520px,62vh,640px)]"
        >
          {/* ── LEFT COLUMN: Compact Preview Screen (~65% width on Desktop) ── */}
          <div className="lg:col-span-7 xl:col-span-8 relative h-[340px] sm:h-full w-full overflow-hidden rounded-[32px] border border-neutral-200/80 bg-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,0.08)] group self-stretch">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              </motion.div>
            </AnimatePresence>

            {/* Category Pill Tag Overlay */}
            <div className="absolute top-5 left-5 z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-black/50 border border-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-[0.2em]">
                {activeProject.category || activeProject.services?.[0] || "Featured Work"}
              </span>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Portfolio List Navigator with Synchronized Vertical Drag ── */}
          <div className="lg:col-span-5 xl:col-span-4 relative h-full w-full rounded-[32px] border border-neutral-200/80 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-5 sm:p-6 flex flex-col justify-between overflow-hidden self-stretch">
            {/* Top Bar Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E31D2E]">
                  Group {String(page + 1).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
                </span>
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-[#111111] transition-all hover:bg-[#E31D2E] hover:text-white"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-[#111111] transition-all hover:bg-[#E31D2E] hover:text-white"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Middle: Interactive Vertical Drag Navigator Container */}
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 my-auto py-3 flex flex-col justify-between gap-2.5 overflow-hidden cursor-grab active:cursor-grabbing touch-pan-x select-none"
              >
                {currentGroupProjects.map((project, idx) => {
                  const isActive = idx === activeIndex;

                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`group relative flex items-center justify-between w-full p-2.5 sm:p-3 rounded-2xl border text-left transition-all duration-300 min-w-[230px] lg:min-w-0 flex-shrink-0 flex-1 ${
                        isActive
                          ? "border-[#E31D2E]/40 bg-gradient-to-r from-[#E31D2E]/8 to-transparent text-[#111111] shadow-[0_6px_16px_rgba(227,29,46,0.1)] scale-[1.015]"
                          : "border-neutral-100 bg-neutral-50/60 text-neutral-600 hover:border-neutral-200 hover:bg-neutral-100/80 hover:text-[#111111]"
                      }`}
                    >
                      {/* Active Red Accent Bar */}
                      <span
                        className={`absolute inset-y-0 left-0 w-1.5 rounded-r-full transition-all duration-300 ${
                          isActive
                            ? "bg-[#E31D2E] shadow-[0_0_10px_rgba(227,29,46,0.8)]"
                            : "bg-transparent group-hover:bg-[#E31D2E]/30"
                        }`}
                      />

                      {/* Project Cover Thumbnail + Details */}
                      <div className="flex items-center gap-3 pl-1.5 truncate pr-2 pointer-events-none">
                        <div className="relative w-[42px] h-[42px] sm:w-[48px] sm:h-[48px] lg:w-[50px] lg:h-[50px] rounded-xl overflow-hidden border border-neutral-200/80 flex-shrink-0 bg-neutral-100 shadow-xs">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        <div className="truncate">
                          <h4
                            className={`text-xs sm:text-sm font-extrabold truncate transition-colors ${
                              isActive ? "text-[#111111]" : "text-neutral-700 group-hover:text-[#111111]"
                            }`}
                          >
                            {project.title}
                          </h4>
                          <span className="text-[10px] sm:text-[11px] font-medium text-neutral-400 block truncate mt-0.5">
                            {project.category || project.services?.[0] || "Portfolio Showcase"}
                          </span>
                        </div>
                      </div>

                      {/* Arrow Icon */}
                      <ArrowUpRight
                        className={`w-3.5 h-3.5 flex-shrink-0 transition-all duration-300 pointer-events-none ${
                          isActive
                            ? "text-[#E31D2E] translate-x-0.5 -translate-y-0.5"
                            : "text-neutral-300 group-hover:text-neutral-500"
                        }`}
                      />
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Bottom Section: Pagination Dots & Pinned CTA Button */}
            <div className="flex-shrink-0 pt-3 flex flex-col gap-3">
              {/* Pagination Dots sitting 24-32px below 4th card */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 py-0.5">
                  {Array.from({ length: totalPages }).map((_, pageIdx) => (
                    <button
                      key={pageIdx}
                      type="button"
                      onClick={() => handlePageSelect(pageIdx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        pageIdx === page
                          ? "w-7 bg-[#E31D2E]"
                          : "w-2 bg-neutral-200 hover:bg-neutral-300"
                      }`}
                      aria-label={`Go to project group ${pageIdx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Pinned View Project Button */}
              <Link
                to={`/project/${activeProject.slug}`}
                className="primary-btn flex items-center justify-between w-full rounded-full px-5 py-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white shadow-md transition-all hover:scale-[1.01]"
              >
                <span>View Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}