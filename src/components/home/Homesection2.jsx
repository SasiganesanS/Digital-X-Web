import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const PROJECTS_PER_PAGE = 4;

export default function FeaturedWorks() {
  // Single master source of truth state
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollContainerRef = useRef(null);
  const itemRefs = useRef([]);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const totalProjects = projects?.length || 0;
  const totalPages = Math.ceil(totalProjects / PROJECTS_PER_PAGE);

  // Derived page index for numbered page indicators (1, 2, 3, 4)
  const page = Math.min(
    Math.floor(activeIndex / PROJECTS_PER_PAGE),
    Math.max(totalPages - 1, 0)
  );

  // Derived active project object
  const activeProject = projects[activeIndex] || projects[0] || {};

  // Safely scroll to a target project index and lock scroll event listener during animation
  const scrollToItem = (index) => {
    if (index < 0 || index >= totalProjects) return;

    isProgrammaticScrollRef.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    const el = itemRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 450);
  };

  // Synchronize activeIndex dynamically while user performs natural mouse / touch scrolling
  const handleScroll = () => {
    if (isProgrammaticScrollRef.current) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const containerTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const focusPoint = containerTop + containerHeight / 3;

    let closestIndex = activeIndex;
    let minDistance = Infinity;

    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      const elCenter = el.offsetTop + el.offsetHeight / 2;
      const distance = Math.abs(focusPoint - elCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  // Strict Prev arrow navigation: decrements master activeIndex by 1
  const handlePrev = () => {
    if (activeIndex <= 0) return;
    const prevIdx = activeIndex - 1;
    setActiveIndex(prevIdx);
    scrollToItem(prevIdx);
  };

  // Strict Next arrow navigation: increments master activeIndex by 1
  const handleNext = () => {
    if (activeIndex >= totalProjects - 1) return;
    const nextIdx = activeIndex + 1;
    setActiveIndex(nextIdx);
    scrollToItem(nextIdx);
  };

  // Page number button navigation: jumps directly to the start of section
  const handlePageSelect = (targetPage) => {
    const targetIndex = Math.min(targetPage * PROJECTS_PER_PAGE, totalProjects - 1);
    setActiveIndex(targetIndex);
    scrollToItem(targetIndex);
  };

  // Direct card click navigation
  const handleCardClick = (index) => {
    setActiveIndex(index);
    scrollToItem(index);
  };

  // Keyboard accessibility handler for Arrow keys
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "PageDown") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      handlePrev();
    }
  };

  // Autoplay every 5s (pauses on hover)
  useEffect(() => {
    if (isPaused || totalProjects === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % totalProjects;
        scrollToItem(next);
        return next;
      });
    }, 5000);
    return () => {
      clearInterval(timer);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [isPaused, totalProjects]);

  return (
    <section id="projects" className="relative overflow-hidden bg-transparent py-12 sm:py-14 lg:py-16">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
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
                key={activeProject.id || activeIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={activeProject.image}
                  alt={activeProject.title || "Project preview"}
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

          {/* ── RIGHT COLUMN: Portfolio List Navigator ── */}
          <div className="lg:col-span-5 xl:col-span-4 relative h-full w-full rounded-[32px] border border-neutral-200/80 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-5 sm:p-6 flex flex-col justify-between overflow-hidden self-stretch">
            {/* Top Bar Controls */}
            <div className="flex items-center justify-end pb-3 border-b border-neutral-100 flex-shrink-0">
              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white border border-neutral-200/80 text-neutral-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:scale-105 hover:bg-[#FF2B2B] hover:border-[#FF2B2B] hover:text-white hover:shadow-[0_4px_12px_rgba(255,43,43,0.25)] disabled:opacity-30 disabled:pointer-events-none disabled:scale-100"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={activeIndex === totalProjects - 1}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white border border-neutral-200/80 text-neutral-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:scale-105 hover:bg-[#FF2B2B] hover:border-[#FF2B2B] hover:text-white hover:shadow-[0_4px_12px_rgba(255,43,43,0.25)] disabled:opacity-30 disabled:pointer-events-none disabled:scale-100"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Middle: Continuous Native Scroll Container */}
            <div
              ref={scrollContainerRef}
              tabIndex={0}
              onScroll={handleScroll}
              onKeyDown={handleKeyDown}
              className="flex-1 my-2.5 py-1 flex flex-col gap-2.5 overflow-y-auto overscroll-contain scroll-smooth focus:outline-none select-none pr-1 custom-scrollbar"
              style={{ overscrollBehavior: "contain" }}
            >
              {projects.map((project, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={project.id || idx}
                    ref={(el) => (itemRefs.current[idx] = el)}
                    type="button"
                    onClick={() => handleCardClick(idx)}
                    className={`group relative flex items-center justify-between w-full p-2.5 sm:p-3 rounded-2xl border text-left transition-all duration-300 min-w-[230px] lg:min-w-0 flex-shrink-0 overflow-hidden box-border ${
                      isActive
                        ? "border-[#FF2B2B] bg-neutral-100/70 text-[#111111] shadow-[0_4px_16px_rgba(255,43,43,0.08)]"
                        : "border-neutral-100 bg-neutral-50/60 text-neutral-600 hover:border-neutral-200 hover:bg-neutral-100/80 hover:text-[#111111]"
                    }`}
                  >
                    {/* Active Red Accent Bar */}
                    <span
                      className={`absolute inset-y-0 left-0 w-1.5 transition-all duration-300 ${
                        isActive
                          ? "bg-[#FF2B2B]"
                          : "bg-transparent group-hover:bg-[#FF2B2B]/30"
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
            </div>

            {/* Bottom Section: Numbered Circular Page Indicators & Pinned CTA Button */}
            <div className="flex-shrink-0 pt-3 flex flex-col gap-3">
              {/* Numbered Circular Page Indicators */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2.5 py-0.5">
                  {Array.from({ length: totalPages }).map((_, pageIdx) => {
                    const isCurrent = pageIdx === page;
                    return (
                      <button
                        key={pageIdx}
                        type="button"
                        onClick={() => handlePageSelect(pageIdx)}
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                          isCurrent
                            ? "bg-[#FF2B2B] text-white shadow-[0_4px_12px_rgba(255,43,43,0.25)] scale-105"
                            : "bg-white border border-neutral-200/80 text-[#111111] hover:border-[#FF2B2B] hover:text-[#FF2B2B] hover:scale-105"
                        }`}
                        aria-label={`Go to section ${pageIdx + 1}`}
                      >
                        {pageIdx + 1}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Pinned View Project Button */}
              <Link
                to={`/project/${activeProject.slug || ""}`}
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