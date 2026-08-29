import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RocketScrollbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rocketMotion, setRocketMotion] = useState("idle"); // "ascending" (moving UP), "descending" (moving DOWN), or "idle"
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const trackRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const lastDragYRef = useRef(0);

  const ROCKET_HEIGHT = 44; // Total thumb height including thruster flame area
  const TRACK_PADDING = 88; // Track length with 88px top & bottom inset

  // Calculate & update scroll position with natural rocket motion:
  // Scrolling DOWN page => Rocket moves DOWN track ("descending")
  // Scrolling UP page   => Rocket moves UP track ("ascending")
  const updateScrollProgress = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollY > lastScrollYRef.current + 1) {
      setRocketMotion("descending"); // Rocket moves DOWN
    } else if (scrollY < lastScrollYRef.current - 1) {
      setRocketMotion("ascending"); // Rocket moves UP
    }
    lastScrollYRef.current = scrollY;

    if (docHeight > 0) {
      const progress = Math.min(Math.max(scrollY / docHeight, 0), 1);
      setScrollProgress(progress);
    } else {
      setScrollProgress(0);
    }
  }, []);

  // Handle Window Scroll & Resize Events
  useEffect(() => {
    const handleScroll = () => {
      updateScrollProgress();
      setIsScrolling(true);

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        setRocketMotion("idle");
      }, 300);
    };

    const handleResize = () => {
      updateScrollProgress();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [updateScrollProgress]);

  // Convert natural scroll progress (0..1) to page scroll Y
  const scrollPageToProgress = (pageProgress, smooth = false) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    const targetY = pageProgress * docHeight;
    window.scrollTo({
      top: targetY,
      behavior: smooth ? "smooth" : "instant",
    });
  };

  // Track Click Handler (Click Top => Scroll to Top, Click Bottom => Scroll to Bottom)
  const handleTrackClick = (e) => {
    if (isDragging || !trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top - TRACK_PADDING;
    const availableHeight = rect.height - TRACK_PADDING * 2 - ROCKET_HEIGHT;

    if (availableHeight <= 0) return;

    const targetPageProgress = Math.min(Math.max(clickY / availableHeight, 0), 1);

    if (targetPageProgress > scrollProgress) {
      setRocketMotion("descending");
    } else {
      setRocketMotion("ascending");
    }

    setScrollProgress(targetPageProgress);
    scrollPageToProgress(targetPageProgress, true);
  };

  // Dragging Handlers
  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragging(true);
    lastDragYRef.current = e.clientY;

    if (e.target.setPointerCapture) {
      e.target.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !trackRef.current) return;

    const currentDragY = e.clientY;
    if (currentDragY > lastDragYRef.current + 0.5) {
      setRocketMotion("descending");
    } else if (currentDragY < lastDragYRef.current - 0.5) {
      setRocketMotion("ascending");
    }
    lastDragYRef.current = currentDragY;

    const rect = trackRef.current.getBoundingClientRect();
    const dragY = currentDragY - rect.top - TRACK_PADDING;
    const availableHeight = rect.height - TRACK_PADDING * 2 - ROCKET_HEIGHT;

    if (availableHeight <= 0) return;

    const targetPageProgress = Math.min(Math.max(dragY / availableHeight, 0), 1);

    setScrollProgress(targetPageProgress);
    scrollPageToProgress(targetPageProgress, false);
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    setRocketMotion("idle");

    if (e.target.releasePointerCapture) {
      e.target.releasePointerCapture(e.pointerId);
    }
  };

  // Convert scroll progress to natural Y translation in track:
  // Page at TOP (0% scroll)      => Rocket at TOP of track
  // Page at BOTTOM (100% scroll) => Rocket at BOTTOM of track
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800;
  const availableTrackHeight = Math.max(viewportHeight - TRACK_PADDING * 2 - ROCKET_HEIGHT, 0);
  const currentRocketY = TRACK_PADDING + scrollProgress * availableTrackHeight;

  // Effects: Thruster Fire when moving UP ("ascending"), Smoke when moving DOWN ("descending")
  const isFlameActive = rocketMotion === "ascending";
  const isSmokeActive = rocketMotion === "descending";

  return (
    <aside
      ref={trackRef}
      onClick={handleTrackClick}
      aria-label="Rocket Scrollbar"
      className="fixed right-1 sm:right-3 top-0 bottom-0 w-12 z-[9999] hidden sm:flex flex-col items-center justify-start select-none cursor-pointer group"
    >
      {/* ── Background Track Line ── */}
      <div className="absolute top-[88px] bottom-[88px] w-[1.5px] bg-[#111111]/10 rounded-full pointer-events-none" />

      {/* ── Subtle Red Scroll Trail (Connecting Top of Track to Rocket Nose) ── */}
      <div
        className="absolute top-[88px] w-[2px] bg-gradient-to-b from-[#E31D2E]/20 via-[#E31D2E]/60 to-[#E31D2E] rounded-full pointer-events-none"
        style={{
          height: Math.max(0, currentRocketY - TRACK_PADDING + 10),
          willChange: "height",
        }}
      />

      {/* ── ROCKET THUMB ── */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center cursor-grab active:cursor-grabbing"
        style={{
          transform: `translate3d(-50%, ${currentRocketY}px, 0)`,
          willChange: "transform",
        }}
      >
        {/* Rocket Icon Box with Smooth Scale Transition */}
        <div
          className={`relative p-1 rounded-full transition-all duration-200 ${
            isHovered || isDragging ? "scale-[1.08]" : "scale-100"
          } ${
            isFlameActive
              ? "drop-shadow-[0_0_12px_rgba(227,29,46,0.7)]"
              : isSmokeActive
              ? "drop-shadow-[0_0_8px_rgba(148,163,184,0.5)]"
              : isHovered || isDragging
              ? "drop-shadow-[0_0_8px_rgba(227,29,46,0.4)]"
              : "drop-shadow-[0_4px_8px_rgba(17,17,17,0.15)]"
          }`}
        >
          <svg
            width="46"
            height="56"
            viewBox="0 0 24 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-11 h-14 text-[#E31D2E]"
          >
            {/* Main Metallic Body */}
            <path
              d="M12 2C8 6 6 12 6 18C6 21 7.5 24 12 24C16.5 24 18 21 18 18C18 12 16 6 12 2Z"
              fill="#FFFFFF"
              stroke="#111111"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Red Nose Cone */}
            <path
              d="M12 2C10.2 4.8 9.5 7.5 9.5 9.5H14.5C14.5 7.5 13.8 4.8 12 2Z"
              fill="#E31D2E"
            />
            {/* Left Fin Wing */}
            <path
              d="M6 16L2 21.5C2 21.5 4 22.5 6 21.5V16Z"
              fill="#E31D2E"
              stroke="#111111"
              strokeWidth="1.5"
            />
            {/* Right Fin Wing */}
            <path
              d="M18 16L22 21.5C22 21.5 20 22.5 18 21.5V16Z"
              fill="#E31D2E"
              stroke="#111111"
              strokeWidth="1.5"
            />
            {/* Porthole Window */}
            <circle cx="12" cy="14" r="2.5" fill="#111111" />
            <circle cx="12.8" cy="13.2" r="0.8" fill="#FFFFFF" />
          </svg>

          {/* ── Engine Thruster Flame (Fires when rocket moves UPWARD) ── */}
          <AnimatePresence>
            {isFlameActive && (
              <motion.div
                key="thruster-flame"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{
                  scaleY: [1.1, 1.45, 1.15],
                  opacity: [0.85, 1, 0.8],
                }}
                exit={{ opacity: 0, scaleY: 0, transition: { duration: 0.15 } }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center -mt-3 origin-top pointer-events-none"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 0C10 4 14 7 14 11C14 14 11.5 16 8 16C4.5 16 2 14 2 11C2 7 6 4 8 0Z"
                    fill="#E31D2E"
                  />
                  <path
                    d="M8 4C9.5 6.5 11.5 8.5 11.5 11C11.5 13 10 14.5 8 14.5C6 14.5 4.5 13 4.5 11C4.5 8.5 6.5 6.5 8 4Z"
                    fill="#FF9F1C"
                  />
                  <path
                    d="M8 8C9 9.5 10 10.5 10 12C10 13 9 13.5 8 13.5C7 13.5 6 13 6 12C6 10.5 7 9.5 8 8Z"
                    fill="#FFE600"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Reentry Exhaust Smoke Puffs (Emits when rocket moves DOWNWARD) ── */}
          <AnimatePresence>
            {isSmokeActive && (
              <motion.div
                key="exhaust-smoke"
                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 0.85, 0],
                  y: [0, 10, 20],
                  scale: [0.6, 1.2, 1.6],
                }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{
                  duration: 0.45,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="flex flex-col items-center -mt-3 origin-top pointer-events-none"
              >
                <svg
                  width="31"
                  height="38"
                  viewBox="0 0 20 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="10" cy="4" r="3.5" fill="rgba(203, 213, 225, 0.8)" />
                  <circle cx="6" cy="10" r="4.5" fill="rgba(148, 163, 184, 0.65)" />
                  <circle cx="14" cy="12" r="5" fill="rgba(226, 232, 240, 0.55)" />
                  <circle cx="10" cy="18" r="5.5" fill="rgba(203, 213, 225, 0.35)" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </aside>
  );
}
