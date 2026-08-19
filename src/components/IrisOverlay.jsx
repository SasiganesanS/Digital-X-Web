import React, { useEffect, useState, useId, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/** Global touch / click coordinate listener — ultra lightweight */
let lastTouchPos = null;

if (typeof window !== "undefined") {
  lastTouchPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  const handlePointer = (e) => {
    if (e.clientX !== undefined && e.clientY !== undefined) {
      lastTouchPos = { x: e.clientX, y: e.clientY };
    } else if (e.touches && e.touches[0]) {
      lastTouchPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  // Single passive listener for zero input latency
  window.addEventListener("pointerdown", handlePointer, { passive: true });
}

export default function IrisOverlay({ color = "#0a0a0a", duration = 0.42 }) {
  const location = useLocation();
  const reactId = useId();
  const maskId = useMemo(() => `iris-mask-${reactId.replace(/:/g, "")}`, [reactId]);

  const [active, setActive] = useState(true);
  const [geometry, setGeometry] = useState(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1920;
    const h = typeof window !== "undefined" ? window.innerHeight : 1080;
    const x = lastTouchPos ? lastTouchPos.x : w / 2;
    const y = lastTouchPos ? lastTouchPos.y : h / 2;
    const radius = Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) * 1.05;
    return { x, y, radius, w, h };
  });

  const prevPathRef = useRef(location.pathname + location.search);

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    if (prevPathRef.current !== currentPath) {
      prevPathRef.current = currentPath;

      const w = window.innerWidth || document.documentElement.clientWidth || 1920;
      const h = window.innerHeight || document.documentElement.clientHeight || 1080;
      const x = lastTouchPos ? lastTouchPos.x : w / 2;
      const y = lastTouchPos ? lastTouchPos.y : h / 2;
      const radius = Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) * 1.05;

      setGeometry({ x, y, radius, w, h });
      setActive(true);
    }
  }, [location.pathname, location.search]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={`iris-${location.pathname}-${location.search}`}
          className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
        >
          <svg
            aria-hidden="true"
            className="w-full h-full block"
            width="100%"
            height="100%"
            viewBox={`0 0 ${geometry.w} ${geometry.h}`}
            preserveAspectRatio="none"
          >
            <defs>
              <mask
                id={maskId}
                width={geometry.w}
                height={geometry.h}
                x="0"
                y="0"
                maskUnits="userSpaceOnUse"
                maskContentUnits="userSpaceOnUse"
                style={{ maskType: "luminance" }}
              >
                {/* White background: dark cover covers screen initially */}
                <rect x="0" y="0" width={geometry.w} height={geometry.h} fill="white" />

                {/* Black circle expands from exact touch point (x, y) to reveal new page */}
                <motion.circle
                  cx={geometry.x}
                  cy={geometry.y}
                  initial={{ r: 0 }}
                  animate={{ r: geometry.radius }}
                  transition={{
                    duration: duration,
                    ease: [0.76, 0, 0.24, 1], // Requested Iris easing curve
                  }}
                  onAnimationComplete={() => setActive(false)}
                  fill="black"
                />
              </mask>
            </defs>

            {/* Dark Masked Overlay */}
            <rect
              x="0"
              y="0"
              width={geometry.w}
              height={geometry.h}
              fill={color}
              mask={`url(#${maskId})`}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
