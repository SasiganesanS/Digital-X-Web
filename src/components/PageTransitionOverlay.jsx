import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/Praskla_Digital_X_Logo_Trasnparent_Background.webp";

/**
 * PageTransitionOverlay
 * Ultra-smooth GPU hardware-accelerated page transition overlay.
 * Static centered logo with a pitch-black (0% -> 70%) progress line.
 */
export default function PageTransitionOverlay() {
  const location = useLocation();
  const [active, setActive] = useState(false);
  const prevPathRef = useRef(location.pathname + location.search);

  // 1. Intercept navigation click events immediately
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target.closest("a, button, [role='button']");
      if (target) {
        const href = target.getAttribute("href") || target.getAttribute("to");
        if (href && !href.startsWith("#") && !href.startsWith("mailto:") && !href.startsWith("tel:")) {
          setActive(true);
        }
      }
    };

    window.addEventListener("click", handleGlobalClick, { capture: true, passive: true });
    return () => window.removeEventListener("click", handleGlobalClick, { capture: true });
  }, []);

  // 2. Synchronous location update check
  useLayoutEffect(() => {
    const currentPath = location.pathname + location.search;
    if (prevPathRef.current !== currentPath) {
      prevPathRef.current = currentPath;
      setActive(true);
    }
  }, [location.pathname, location.search]);

  // 3. Fast dismissal as soon as route location changes, with safety max timer
  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        setActive(false);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [active, location.pathname, location.search]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="page-transition-overlay"
          className="fixed inset-0 pointer-events-auto z-[9999999] bg-white flex flex-col items-center justify-center overflow-hidden border-2 sm:border-[3px] border-black box-border"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Static Centered Logo (No Rotation, No Sub-components) */}
          <div className="w-28 sm:w-36 md:w-40 h-auto flex items-center justify-center">
            <img
              src={Logo}
              alt="PRASKLA DIGITAL X Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
            />
          </div>

          {/* Pure Black GPU Hardware-Accelerated Loading Line (0% -> 85%) */}
          <div className="fixed bottom-12 sm:bottom-16 left-0 right-0 w-full h-[5px] pointer-events-none z-[9999999]">
            <div className="w-full h-full bg-[#000000] origin-left animate-load-progress shadow-md" />
          </div>

          <style>{`
            @keyframes loadProgress {
              0% {
                transform: scaleX(0);
              }
              100% {
                transform: scaleX(0.85);
              }
            }
            .animate-load-progress {
              animation: loadProgress 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              will-change: transform;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
