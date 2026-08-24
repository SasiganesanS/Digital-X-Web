import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/Praskla_Digital_X_Logo_Trasnparent_Background.webp";

/**
 * PageTransitionOverlay - Immediate Pre-Paint White Screen Transition
 * Guarantees white screen overlay covers viewport instantly BEFORE new page content is loaded/painted.
 */
export default function PageTransitionOverlay() {
  const location = useLocation();
  const [active, setActive] = useState(false);
  const prevPathRef = useRef(location.pathname + location.search);

  // 1. Intercept navigation click events immediately on pointer down/click
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

  // 2. Synchronous useLayoutEffect before browser paint on location change
  useLayoutEffect(() => {
    const currentPath = location.pathname + location.search;
    if (prevPathRef.current !== currentPath) {
      prevPathRef.current = currentPath;
      setActive(true);
    }
  }, [location.pathname, location.search]);

  // 3. Exactly 1 second (1000ms) transition active duration
  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        setActive(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [active, location.pathname, location.search]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={`page-transition-${location.pathname}-${location.search}`}
          className="fixed inset-0 pointer-events-auto z-[9999999] bg-white flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Outer Bouncing Container */}
          <div className="relative flex flex-col items-center justify-center p-6 transform-gpu">
            
            {/* Bounce Wrapper */}
            <div className="animate-logo-bounce transform-gpu">
              
              {/* Inner Smooth 360 Spin Wrapper (Independent of Bounce Easing) */}
              <div className="animate-logo-spin w-28 sm:w-36 md:w-40 h-auto flex items-center justify-center transform-gpu">
                <img
                  src={Logo}
                  alt="PRASKLA DIGITAL X Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
                />
              </div>

            </div>

            {/* Synchronized ground shadow */}
            <div className="animate-shadow-pulse w-24 sm:w-32 h-2.5 bg-black/15 rounded-full mt-5 transform-gpu" />
          </div>

          {/* Embedded Compositor Keyframes - 1.0s Duration */}
          <style>{`
            /* 1. Continuous Smooth 360 Rotation */
            @keyframes logoSpin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }

            /* 2. Fluid Vertical Spring Bounce over 1 second */
            @keyframes logoBounce {
              0% {
                transform: translate3d(0, 45px, 0) scale(0.6);
                opacity: 0;
              }
              30% {
                transform: translate3d(0, -30px, 0) scale(1.12);
                opacity: 1;
              }
              55% {
                transform: translate3d(0, 0px, 0) scale(0.94);
                opacity: 1;
              }
              75% {
                transform: translate3d(0, -12px, 0) scale(1.04);
                opacity: 1;
              }
              90% {
                transform: translate3d(0, -2px, 0) scale(0.99);
                opacity: 1;
              }
              100% {
                transform: translate3d(0, 0px, 0) scale(1);
                opacity: 1;
              }
            }

            /* 3. Ground Shadow Expansion/Shrink */
            @keyframes shadowPulse {
              0% {
                transform: scale3d(0.25, 1, 1);
                opacity: 0.05;
              }
              30% {
                transform: scale3d(0.4, 1, 1);
                opacity: 0.1;
              }
              55% {
                transform: scale3d(1, 1, 1);
                opacity: 0.25;
              }
              75% {
                transform: scale3d(0.7, 1, 1);
                opacity: 0.15;
              }
              90% {
                transform: scale3d(0.95, 1, 1);
                opacity: 0.22;
              }
              100% {
                transform: scale3d(1, 1, 1);
                opacity: 0.25;
              }
            }

            .animate-logo-spin {
              animation: logoSpin 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
              will-change: transform;
            }

            .animate-logo-bounce {
              animation: logoBounce 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
              will-change: transform, opacity;
            }

            .animate-shadow-pulse {
              animation: shadowPulse 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
              will-change: transform, opacity;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
