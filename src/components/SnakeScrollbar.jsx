import React, { useState, useEffect, useRef } from "react";

export default function SnakeScrollbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bendOffset, setBendOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const fadeTimeoutRef = useRef(null);
  const straightenTimeoutRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    // 100% PASSIVE: Reads window.scrollY ONLY. Never modifies scroll position.
    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight > 0) {
        const progress = Math.min(Math.max(scrollY / docHeight, 0), 1);
        setScrollProgress(progress);

        // Compute 7.5px sine-wave bend offset strictly driven by scroll progress
        const bend = Math.sin(progress * Math.PI * 14) * 7.5;
        setBendOffset(bend);
      }

      // User is scrolling -> fade in smoothly and activate shape bending
      setIsVisible(true);
      setIsScrolling(true);

      // Reset timeouts on active scroll
      if (straightenTimeoutRef.current) clearTimeout(straightenTimeoutRef.current);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);

      // Step 1: Smoothly straighten SVG path back to straight line (bendOffset = 0) 400ms after scrolling stops
      straightenTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        setBendOffset(0);
      }, 400);

      // Step 2: Fade out completely 700ms after scrolling stops
      fadeTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 700);

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (straightenTimeoutRef.current) clearTimeout(straightenTimeoutRef.current);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, []);

  const thumbHeight = 64;
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800;
  const maxTop = Math.max(viewportHeight - thumbHeight - 24, 0);
  const translateY = scrollProgress * maxTop + 12;

  // Pure SVG Path calculation:
  // Idle (isScrolling = false): M 12 0 Q 12 32 12 64 (perfectly straight vertical line)
  // Active Scroll: M 12 0 Q (12 + bendOffset) 32 12 64 (shape bends left/right into a smooth 7.5px sine-wave curve)
  const currentBend = isScrolling ? bendOffset : 0;
  const pathData = `M 12 0 Q ${12 + currentBend} 32 12 64`;

  return (
    <div
      aria-hidden="true"
      className={`fixed right-2.5 top-0 z-50 pointer-events-none transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        style={{
          transform: `translate3d(0px, ${translateY}px, 0)`,
          willChange: "transform",
        }}
        className="w-6 h-16 flex items-center justify-center"
      >
        {/* Clean, Flat SVG Stroke — Zero Shadows, Zero Glows, Zero Filters */}
        <svg
          width="24"
          height="64"
          viewBox="0 0 24 64"
          className="overflow-visible"
        >
          <path
            d={pathData}
            fill="none"
            stroke="#FF2B2B"
            strokeWidth="6"
            strokeLinecap="round"
            className="transition-all duration-200 ease-out"
          />
        </svg>
      </div>
    </div>
  );
}
