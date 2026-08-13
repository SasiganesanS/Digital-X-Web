import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import SectionBadge from "../common/SectionBadge";

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

  // Derived page index for active project
  const page = Math.min(
    Math.floor(activeIndex / PROJECTS_PER_PAGE),
    Math.max(totalPages - 1, 0)
  );

  // Active scroll page indicator state & sliding window start state
  const [scrollPage, setScrollPage] = useState(0);
  const [windowStart, setWindowStart] = useState(1);

  useEffect(() => {
    setScrollPage(page);
  }, [page]);

  // Derived active project object
  const activeProject = projects[activeIndex] || projects[0] || {};

  // Click + Drag-to-scroll state & refs
  const [isDraggingState, setIsDraggingState] = useState(false);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const startYRef = useRef(0);
  const startScrollTopRef = useRef(0);

  const handlePointerDown = (e) => {
    // Only trigger on primary mouse button (left-click) or touch
    if (e.pointerType === "mouse" && e.button !== 0) return;

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startYRef.current = e.clientY;
    startScrollTopRef.current = scrollContainerRef.current ? scrollContainerRef.current.scrollTop : 0;

    if (scrollContainerRef.current) {
      try {
        scrollContainerRef.current.setPointerCapture(e.pointerId);
      } catch (err) {
        // Fallback for environment constraints
      }
    }
    setIsDraggingState(true);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;

    const deltaY = e.clientY - startYRef.current;
    if (Math.abs(deltaY) > 6) {
      hasDraggedRef.current = true;
    }

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = startScrollTopRef.current - deltaY;
    }
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (scrollContainerRef.current) {
      try {
        scrollContainerRef.current.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Fallback
      }
    }
    setIsDraggingState(false);
  };

  const handlePointerCancel = () => {
    isDraggingRef.current = false;
    setIsDraggingState(false);
  };

  // Safely scroll to a target project index inside the portfolio list container (NEVER scrolls window/page)
  const scrollToItem = (index) => {
    if (index < 0 || index >= totalProjects) return;

    isProgrammaticScrollRef.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    const container = scrollContainerRef.current;
    const el = itemRefs.current[index];
    if (container && el) {
      const targetTop = el.offsetTop - container.offsetTop;
      container.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 450);
  };

  // Natural scroll handler (updates scrollPage indicator as user scrolls list)
  const handleScroll = () => {
    if (isProgrammaticScrollRef.current) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const containerTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const focusPoint = containerTop + containerHeight / 3;

    let closestIndex = 0;
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

    const currentScrollPage = Math.floor(closestIndex / PROJECTS_PER_PAGE);
    if (currentScrollPage !== scrollPage) {
      setScrollPage(currentScrollPage);
    }
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

  // Strict Prev arrow navigation (currentPage - 1)
  const handlePrev = () => {
    if (scrollPage <= 0) return;
    const prevPage = scrollPage - 1;
    handlePageSelect(prevPage);
    const prevPageNum = prevPage + 1;
    if (prevPageNum < windowStart) {
      setWindowStart(Math.max(1, prevPageNum));
    } else if (windowStart > 1) {
      setWindowStart((prev) => Math.max(1, prev - 1));
    }
  };

  // Strict Next arrow navigation (currentPage + 1)
  const handleNext = () => {
    if (scrollPage >= totalPages - 1) return;
    const nextPage = scrollPage + 1;
    handlePageSelect(nextPage);
    const maxWStart = Math.max(1, totalPages - 6);
    const nextPageNum = nextPage + 1;
    if (nextPageNum > windowStart + 1 && windowStart < maxWStart) {
      setWindowStart((prev) => Math.min(prev + 1, maxWStart));
    }
  };

  // Page number button navigation (changes active page and updates content)
  const handlePageSelect = (targetPage) => {
    const targetIndex = Math.min(targetPage * PROJECTS_PER_PAGE, totalProjects - 1);
    setActiveIndex(targetIndex);
    setScrollPage(targetPage);
    scrollToItem(targetIndex);

    const pageNum = targetPage + 1;
    const maxWStart = Math.max(1, totalPages - 6);
    if (pageNum < windowStart) {
      setWindowStart(Math.max(1, pageNum));
    } else if (pageNum > windowStart + 6) {
      setWindowStart(Math.min(maxWStart, pageNum - 6));
    }
  };

  // Direct card click navigation
  const handleCardClick = (index) => {
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false;
      return;
    }
    setActiveIndex(index);
    const targetPage = Math.floor(index / PROJECTS_PER_PAGE);
    setScrollPage(targetPage);
    scrollToItem(index);

    const pageNum = targetPage + 1;
    const maxWStart = Math.max(1, totalPages - 6);
    if (pageNum < windowStart) {
      setWindowStart(Math.max(1, pageNum));
    } else if (pageNum > windowStart + 6) {
      setWindowStart(Math.min(maxWStart, pageNum - 6));
    }
  };

  // Ellipsis button click handler (shifts windowStart forward and updates page/content)
  const handleEllipsisClick = () => {
    const maxWStart = Math.max(1, totalPages - 6);
    if (windowStart >= maxWStart) return;
    const nextWin = Math.min(windowStart + 1, maxWStart);
    setWindowStart(nextWin);
    const targetPage = Math.min(nextWin - 1, totalPages - 1);
    const targetIndex = Math.min(targetPage * PROJECTS_PER_PAGE, totalProjects - 1);
    setActiveIndex(targetIndex);
    setScrollPage(targetPage);
    scrollToItem(targetIndex);
  };

  // Calculate Sliding Window Pagination items array (e.g. 1 2 ... 6 7 -> 2 3 ... 7 8 -> 3 4 ... 8 9 -> 4 5 ... 9 10)
  const getSlidingWindowItems = (winStart, total) => {
    if (total <= 1) return [];

    // Small number of pages (<= 5): No ellipsis needed! Show all page numbers directly.
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const maxStart = Math.max(1, total - 6);
    const currentStart = Math.min(Math.max(1, winStart), maxStart);

    const left1 = currentStart;
    const left2 = currentStart + 1;
    const right1 = Math.min(currentStart + 5, total - 1);
    const right2 = Math.min(currentStart + 6, total);

    return [
      left1,
      left2,
      "...",
      right1,
      right2
    ];
  };

  return (
    <section id="projects" className="relative overflow-hidden bg-transparent py-12 sm:py-14 lg:py-16">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="mb-8 max-w-3xl space-y-2.5">
          <div className="mb-4">
            <SectionBadge text="Case Studies" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111111]">
            Featured <span className="text-[#E31D2E]">Case Studies</span>.
          </h2>
          <p className="max-w-xl text-sm sm:text-base leading-6 text-[#575757] font-medium">
            Browse our curated case studies across branding, digital media, 3D studios, and production.
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
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              </motion.div>
            </AnimatePresence>

            {/* Category Pill Tag Overlay — High Contrast & Visible on All Images */}
            <div className="absolute top-5 left-5 z-20">
              <span className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.18)] text-[#111111] text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E31D2E]" />
                <span>{activeProject.category || activeProject.services?.[0] || "Featured Work"}</span>
              </span>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Portfolio List Navigator ── */}
          <div className="lg:col-span-5 xl:col-span-4 relative h-full w-full rounded-[32px] border border-neutral-200/80 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-5 sm:p-6 flex flex-col justify-between overflow-hidden self-stretch">
            
            {/* Middle: Continuous Native Scroll Container with Click-and-Drag Scrolling */}
            <div
              ref={scrollContainerRef}
              tabIndex={0}
              onScroll={handleScroll}
              onKeyDown={handleKeyDown}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              onDragStart={(e) => e.preventDefault()}
              className={`flex-1 my-1 py-1 flex flex-col gap-2.5 overflow-y-auto overscroll-contain focus:outline-none select-none pr-1 custom-scrollbar ${
                isDraggingState ? "cursor-grabbing select-none scroll-auto" : "cursor-grab scroll-smooth"
              }`}
              style={{ overscrollBehavior: "contain", touchAction: "pan-y" }}
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
                    {/* Project Cover Thumbnail + Details */}
                    <div className="flex items-center gap-3 truncate pr-2 pointer-events-none">
                      <div className="relative w-[42px] h-[42px] sm:w-[48px] sm:h-[48px] lg:w-[50px] lg:h-[50px] rounded-xl overflow-hidden border border-neutral-200/80 flex-shrink-0 bg-neutral-100 shadow-xs">
                        <img
                          src={project.image}
                          alt={project.title}
                          draggable={false}
                          onDragStart={(e) => e.preventDefault()}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none select-none"
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

            {/* Bottom Section: Glass Capsule Segmented Page Controller & Pinned CTA Button */}
            <div className="flex-shrink-0 pt-3 flex flex-col gap-3">
              {/* Premium Glass Segmented Controller (Formatted like 1 2 ... 50 with smooth spring animations) */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center select-none">
                  <motion.div 
                    layout
                    className="inline-flex items-center gap-1 p-1 rounded-full bg-neutral-100/90 border border-neutral-200/80 shadow-xs backdrop-blur-md"
                  >
                    {/* Left Chevron Button */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handlePrev}
                      disabled={scrollPage === 0}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-500 hover:text-[#111111] hover:bg-white/80 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </motion.button>

                    {/* Sliding Window Page Numbers & Interactive Ellipsis */}
                    {getSlidingWindowItems(windowStart, totalPages).map((item, idx) => {
                      if (item === "...") {
                        return (
                          <motion.button
                            key={`ellipsis-${idx}`}
                            type="button"
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleEllipsisClick}
                            className="flex h-7 px-1.5 items-center justify-center text-xs font-bold text-neutral-400 hover:text-[#E31D2E] transition-colors cursor-pointer select-none"
                            aria-label="Jump forward 3 pages"
                          >
                            ...
                          </motion.button>
                        );
                      }

                      const pageIdx = item - 1;
                      const isCurrent = pageIdx === scrollPage;

                      return (
                        <motion.button
                          key={pageIdx}
                          type="button"
                          onClick={() => handlePageSelect(pageIdx)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`relative flex h-7 w-7 items-center justify-center rounded-full text-xs font-black transition-colors cursor-pointer ${
                            isCurrent ? "text-white" : "text-neutral-600 hover:text-[#111111] hover:bg-white/80"
                          }`}
                          aria-label={`Page ${item}`}
                        >
                          {isCurrent && (
                            <motion.span
                              layoutId="activePagePill"
                              className="absolute inset-0 rounded-full bg-[#E31D2E] shadow-[0_4px_12px_rgba(227,29,46,0.35)]"
                              transition={{ type: "spring", stiffness: 450, damping: 35 }}
                            />
                          )}
                          <span className="relative z-10">{item}</span>
                        </motion.button>
                      );
                    })}

                    {/* Right Chevron Button */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleNext}
                      disabled={scrollPage === totalPages - 1}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-500 hover:text-[#111111] hover:bg-white/80 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </motion.div>
                </div>
              )}

              {/* Pinned View Case Study Button */}
              <Link
                to={`/case-study/${activeProject.slug || ""}`}
                state={{ from: '/' }}
                className="primary-btn flex items-center justify-between w-full rounded-full px-5 py-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white shadow-md transition-all hover:scale-[1.01]"
              >
                <span>View Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}