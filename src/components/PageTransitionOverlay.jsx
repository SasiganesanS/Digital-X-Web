import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../assets/Praskla_Digital_X_Logo_Trasnparent_Background.webp";

const bounceKeyframes = [
  {
    opacity: 0,
    transform: "translateY(40px) scale(0.96)",
  },
  {
    opacity: 1,
    transform: "translateY(-8px) scale(1.01)",
  },
  {
    transform: "translateY(2px) scale(0.995)",
  },
  {
    transform: "translateY(0) scale(1)",
  },
];

const bounceOptions = {
  duration: 700,
  easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  fill: "both",
};

export default function PageTransitionOverlay() {
  const location = useLocation();
  const [active, setActive] = useState(false);
  const prevPathRef = useRef(location.pathname + location.search);
  const logoBoxRef = useRef(null);

  useLayoutEffect(() => {
    const currentPath = location.pathname + location.search;
    if (prevPathRef.current !== currentPath) {
      prevPathRef.current = currentPath;
      setActive(true);
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (active) {
      if (logoBoxRef.current && typeof logoBoxRef.current.animate === 'function') {
        logoBoxRef.current.animate(bounceKeyframes, bounceOptions);
      }
      const timer = setTimeout(() => {
        setActive(false);
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-auto z-[9999999] bg-white flex flex-col items-center justify-center overflow-hidden border-2 sm:border-[3px] border-black box-border"
      style={{ opacity: 1, transition: "opacity 200ms ease-out" }}
    >
      {/* Centered Logo with Web Animations API Bounce Transition */}
      <div ref={logoBoxRef} className="w-28 sm:w-36 md:w-40 h-auto flex items-center justify-center">
        <img
          src={Logo}
          alt="PRASKLA DIGITAL X Logo"
          className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
        />
      </div>

      {/* Pure Black Progress Line */}
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
          animation: loadProgress 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
