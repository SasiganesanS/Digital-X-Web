import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { projects } from "../../data/projects";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import SectionBadge from "../common/SectionBadge";

import { useLanguage } from "../../context/LanguageContext";

const PROJECTS_PER_PAGE = 4;

export default function FeaturedWorks() {
  const { t } = useLanguage();
  const navigate = useNavigate();
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
    // Only trigger on desktop mouse dragging (let mobile touch devices use smooth native scroll)
    if (e.pointerType !== "mouse" || e.button !== 0) return;

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startYRef.current = e.clientY;
    startScrollTopRef.current = scrollContainerRef.current ? scrollContainerRef.current.scrollTop : 0;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;

    const deltaY = e.clientY - startYRef.current;
    if (Math.abs(deltaY) > 10) {
      if (!hasDraggedRef.current) {
        hasDraggedRef.current = true;
        setIsDraggingState(true);
        if (scrollContainerRef.current) {
          try {
            scrollContainerRef.current.setPointerCapture(e.pointerId);
          } catch (err) {}
        }
      }
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = startScrollTopRef.current - deltaY;
      }
    }
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (scrollContainerRef.current && hasDraggedRef.current) {
      try {
        scrollContainerRef.current.releasePointerCapture(e.pointerId);
      } catch (err) {}
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
    <section id="projects" className="relative overflow-hidden bg-transparent py-5 sm:py-12 lg:py-14">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Main Unified Card Container — Header & Showcase in ONE Box (matching Hero Section card) */}
        <div className="relative flex flex-col items-start p-2.5 sm:p-8 lg:p-9 rounded-2xl border border-white/90 shadow-[0_25px_60px_rgba(0,0,0,0.4)] bg-white text-[#111111] transition-all duration-300 w-full overflow-hidden">
          
          {/* Section Header (Inside the Card Box) */}
          <div className="mb-2 sm:mb-6 w-full max-w-3xl space-y-1 sm:space-y-2">
            <div className="mb-1 sm:mb-3 flex justify-start">
              <SectionBadge text={t("projects_badge", "Case Studies")} />
            </div>
            <h2 className="text-base sm:text-3xl lg:text-[36px] font-black leading-[1.1] tracking-[-0.035em] text-[#111111] font-sans">
              {t("projects_title_1", "Featured ")}
              <span className="text-[#E31D2E]">{t("projects_title_highlight", "Case Studies")}</span>.
            </h2>
            <p className="text-neutral-600 text-[10.5px] sm:text-base font-normal leading-[1.4] sm:leading-[1.6] max-w-2xl font-sans">
              {t("projects_desc")}
            </p>
          </div>

          {/* ── Main Portfolio Showcase Grid ── */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex flex-col lg:flex-row gap-2.5 sm:gap-5 items-stretch w-full h-auto lg:h-[415px]"
          >
            {/* ── LEFT COLUMN: Fitted Aspect-Square Preview Card (Zero Wasted Space) ── */}
            <div className="flex-shrink-0 flex items-center justify-center w-full lg:w-auto h-[125px] sm:h-[280px] lg:h-full">
              <div 
                onClick={() => navigate(`/case-study/${activeProject.slug || activeProject.id}`)}
                className="relative h-full aspect-square max-w-full overflow-hidden rounded-xl sm:rounded-2xl border border-neutral-200/90 bg-neutral-900 shadow-md transition-all duration-300 group cursor-pointer"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id || activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={activeProject.image}
                      alt={activeProject.title || "Project preview"}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-50 pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Category Pill Tag Overlay - Hidden on mobile so it never obscures image or logo */}
                <div className="hidden sm:flex absolute top-4 left-4 z-20">
                  <span className="px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.18)] text-[#111111] text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E31D2E]" />
                    <span>{activeProject.category || activeProject.services?.[0] || "Featured Work"}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Portfolio List Navigator (Bounded height scrollable container on mobile) ── */}
            <div className="flex-1 relative h-auto sm:h-full w-full rounded-xl sm:rounded-2xl border border-neutral-200/80 bg-neutral-50/70 shadow-xs transition-all duration-300 p-1.5 sm:p-4 flex flex-col justify-between overflow-hidden self-stretch">
              
              {/* Middle: Continuous Native Scroll Container */}
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
                className={`flex-1 min-h-0 h-[140px] max-h-[140px] sm:h-auto sm:max-h-none my-0.5 p-0.5 flex flex-col gap-1.5 overflow-y-auto overscroll-contain focus:outline-none select-none custom-scrollbar ${
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
                      className={`group relative flex items-center justify-between w-full p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border text-left transition-all duration-300 min-w-[200px] lg:min-w-0 flex-shrink-0 box-border ${
                        isActive
                          ? "border-[#111111] bg-white text-[#111111] shadow-[0_4px_16px_rgba(17,17,17,0.12)]"
                          : "border-neutral-200/60 bg-white/60 text-neutral-600 hover:border-neutral-300 hover:bg-white hover:text-[#111111]"
                      }`}
                    >
                      {/* Project Cover Thumbnail + Details */}
                      <div className="flex items-center gap-2 truncate pr-2 pointer-events-none">
                        <div className="relative w-[28px] h-[28px] sm:w-[42px] sm:h-[42px] rounded-md sm:rounded-lg overflow-hidden border border-neutral-200/80 flex-shrink-0 bg-neutral-100 shadow-xs">
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
                            className={`text-[11px] sm:text-sm font-extrabold truncate transition-colors ${
                              isActive ? "text-[#111111]" : "text-neutral-700 group-hover:text-[#111111]"
                            }`}
                          >
                            {project.title}
                          </h4>
                          <span className="text-[9px] sm:text-[11px] font-medium text-neutral-400 block truncate mt-0.5">
                            {project.category || project.services?.[0] || "Portfolio Showcase"}
                          </span>
                        </div>
                      </div>

                      {/* Arrow Icon */}
                      <ArrowUpRight
                        className={`w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 transition-all duration-300 pointer-events-none ${
                          isActive
                            ? "text-[#111111] translate-x-0.5 -translate-y-0.5"
                            : "text-neutral-300 group-hover:text-neutral-500"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Bottom Section: Glass Capsule Segmented Page Controller & Pinned CTA Button */}
              <div className="flex-shrink-0 pt-1.5 flex flex-col gap-1.5 sm:gap-2.5">
                {/* Segmented Controller */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center select-none">
                    <motion.div 
                      layout
                      className="inline-flex items-center gap-1 p-0.5 sm:p-1 rounded-lg sm:rounded-xl bg-white border border-neutral-200/80 shadow-xs"
                    >
                      {/* Left Chevron Button */}
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handlePrev}
                        disabled={scrollPage === 0}
                        className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-neutral-500 hover:text-[#111111] hover:bg-neutral-100 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </motion.button>

                      {/* Sliding Window Page Numbers */}
                      {getSlidingWindowItems(windowStart, totalPages).map((item, idx) => {
                        if (item === "...") {
                          return (
                            <motion.button
                              key={`ellipsis-${idx}`}
                              type="button"
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={handleEllipsisClick}
                              className="flex h-5 px-1 items-center justify-center text-[10px] sm:text-xs font-bold text-neutral-400 hover:text-[#111111] transition-colors cursor-pointer select-none"
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
                            className={`relative flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-[10px] sm:text-[11px] font-black transition-colors cursor-pointer ${
                              isCurrent ? "text-white" : "text-neutral-600 hover:text-[#111111] hover:bg-neutral-100"
                            }`}
                            aria-label={`Page ${item}`}
                          >
                            {isCurrent && (
                              <motion.span
                                layoutId="activePagePill"
                                className="absolute inset-0 rounded-full bg-[#111111] shadow-[0_4px_12px_rgba(17,17,17,0.35)]"
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
                        className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-neutral-500 hover:text-[#111111] hover:bg-neutral-100 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                        aria-label="Next page"
                      >
                        <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </motion.button>
                    </motion.div>
                  </div>
                )}

                {/* Pinned View Case Study Button */}
                <Link
                  to={`/case-study/${activeProject.slug || ""}`}
                  state={{ from: '/' }}
                  className="primary-btn flex items-center justify-between w-full rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2.5 text-[9.5px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-md transition-all hover:scale-[1.01]"
                >
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}