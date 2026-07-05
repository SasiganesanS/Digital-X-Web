import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import servicesData from "../../data/servicesData";

/* ─────────────────────────────────────────────────────
   Cute Toy Astronaut SVG — floats around with a jetpack
   ───────────────────────────────────────────────────── */
const ToyAstronaut = ({ style, className = "", seated = false }) => (
  <motion.div
    className={`pointer-events-none select-none ${className}`}
    style={style}
    animate={{
      y: [0, -12, 0, 8, 0],
      x: [0, 5, -3, 2, 0],
      rotate: seated ? [0, 2, -1, 1, 0] : [0, 4, -3, 2, 0],
    }}
    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-[0_0_20px_rgba(232,25,44,0.3)]"
    >
      {/* Helmet glass reflection */}
      <ellipse cx="60" cy="42" rx="26" ry="28" fill="#E5E7EB" stroke="white" strokeWidth="2" />
      <ellipse cx="60" cy="40" rx="19" ry="18" fill="#111827" />
      <path d="M48 34C50 28 56 24 64 26" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <circle cx="52" cy="36" r="3" fill="white" opacity="0.3" />

      {/* Body suit */}
      <rect x="36" y="68" width="48" height="48" rx="14" fill="#E5E7EB" stroke="white" strokeWidth="2" />
      {/* Suit chest panel */}
      <rect x="46" y="74" width="28" height="16" rx="4" fill="#1F2937" opacity="0.6" />
      {/* Chest buttons */}
      <circle cx="52" cy="82" r="3" fill="#E8192C" />
      <circle cx="62" cy="82" r="3" fill="#10B981" />
      <circle cx="72" cy="82" r="2" fill="#3B82F6" />
      {/* Praskla logo hint */}
      <text x="52" y="89" fill="white" fontSize="5" fontWeight="bold" opacity="0.4">PX</text>

      {/* Backpack / Jetpack */}
      <rect x="20" y="66" width="14" height="38" rx="5" fill="#6B7280" stroke="#9CA3AF" strokeWidth="1" />
      <rect x="86" y="66" width="14" height="38" rx="5" fill="#6B7280" stroke="#9CA3AF" strokeWidth="1" />
      {/* Jetpack flame */}
      <motion.ellipse
        cx="27"
        cy="108"
        rx="4"
        ry="6"
        fill="#E8192C"
        animate={{ ry: [6, 10, 5, 8, 6], opacity: [0.8, 1, 0.6, 0.9, 0.8] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.ellipse
        cx="93"
        cy="108"
        rx="4"
        ry="6"
        fill="#E8192C"
        animate={{ ry: [5, 9, 6, 8, 5], opacity: [0.7, 1, 0.5, 0.8, 0.7] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
      />
      {/* Inner flame glow */}
      <motion.ellipse cx="27" cy="108" rx="2" ry="4" fill="#FBBF24"
        animate={{ ry: [4, 7, 3], opacity: [0.9, 1, 0.7] }}
        transition={{ duration: 0.4, repeat: Infinity }} />
      <motion.ellipse cx="93" cy="108" rx="2" ry="4" fill="#FBBF24"
        animate={{ ry: [3, 6, 4], opacity: [0.8, 1, 0.6] }}
        transition={{ duration: 0.45, repeat: Infinity, delay: 0.1 }} />

      {/* Arms */}
      {seated ? (
        <>
          <path d="M36 78C28 84 24 92 22 100" stroke="#E5E7EB" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M84 78C92 84 96 92 98 100" stroke="#E5E7EB" strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="22" cy="100" r="5" fill="white" />
          <circle cx="98" cy="100" r="5" fill="white" />
        </>
      ) : (
        <>
          <motion.path
            d="M36 78C24 82 18 90 22 96"
            stroke="#E5E7EB"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            animate={{ d: ["M36 78C24 82 18 90 22 96", "M36 78C22 76 14 82 16 90", "M36 78C24 82 18 90 22 96"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <path d="M84 78C96 82 102 90 98 96" stroke="#E5E7EB" strokeWidth="6" strokeLinecap="round" fill="none" />
          <motion.circle cx="22" cy="96" r="5" fill="white"
            animate={{ cy: [96, 90, 96] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          <circle cx="98" cy="96" r="5" fill="white" />
        </>
      )}

      {/* Legs / seated pose */}
      {seated ? (
        <>
          <path d="M48 116C46 124 42 130 38 136" stroke="#E5E7EB" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M72 116C74 124 78 130 82 136" stroke="#E5E7EB" strokeWidth="6" strokeLinecap="round" fill="none" />
          <rect x="24" y="132" width="72" height="10" rx="5" fill="#111827" opacity="0.75" />
          <rect x="32" y="138" width="14" height="8" rx="4" fill="#6B7280" />
          <rect x="74" y="138" width="14" height="8" rx="4" fill="#6B7280" />
        </>
      ) : (
        <>
          <path d="M48 116V140H40" stroke="#E5E7EB" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M72 116V140H80" stroke="#E5E7EB" strokeWidth="6" strokeLinecap="round" fill="none" />
          <rect x="34" y="136" width="14" height="8" rx="4" fill="#6B7280" />
          <rect x="72" y="136" width="14" height="8" rx="4" fill="#6B7280" />
        </>
      )}

      {/* Tether line */}
      <motion.path
        d="M60 116C60 130 30 140 10 148"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
        strokeDasharray="4 4"
        fill="none"
        animate={{ strokeDashoffset: [0, -16] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Helmet antenna */}
      <line x1="60" y1="14" x2="60" y2="6" stroke="#9CA3AF" strokeWidth="2" />
      <motion.circle cx="60" cy="5" r="3" fill="#E8192C"
        animate={{ opacity: [0.4, 1, 0.4], r: [3, 4, 3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
    </svg>
  </motion.div>
);

/* ─────────────────────────────────────────────────────
   Single service bubble — floats in the orbit marquee
   ───────────────────────────────────────────────────── */
const ServiceBubble = ({ service, index, onHover, onLeave, isHovered, onClick }) => (
  <motion.div
    className="relative flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group"
    style={{ width: 100 }}
    onMouseEnter={() => onHover(index)}
    onMouseLeave={onLeave}
    onClick={onClick}
    whileHover={{ scale: 1.15, y: -6 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    {/* Glow ring */}
    <div
      className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: isHovered ? "2px solid #E8192C" : "2px solid rgba(255,255,255,0.08)",
        boxShadow: isHovered
          ? "0 0 30px rgba(232,25,44,0.5), 0 0 60px rgba(232,25,44,0.15), inset 0 0 20px rgba(232,25,44,0.1)"
          : "0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      <img
        src={service.image}
        alt={service.title}
        className="w-11 h-11 rounded-full object-cover"
        draggable={false}
      />
      {/* Pulse ring on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#E8192C]"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </div>
    <span
      className="text-[9px] font-bold text-center leading-tight tracking-wider uppercase transition-colors duration-300 max-w-[90px]"
      style={{ color: isHovered ? "#E8192C" : "rgba(255,255,255,0.5)" }}
    >
      {service.title}
    </span>
  </motion.div>
);

/* ─────────────────────────────────────────────────────
   MAIN COMPONENT — Infinite Marquee + Astronaut
   ───────────────────────────────────────────────────── */
const SolarSystemHero = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);

  const handleServiceClick = (title) => {
    navigate("/services", { state: { highlightService: title } });
  };

  // Double the array for seamless infinite scroll
  const doubledServices = [...servicesData, ...servicesData];

  // Tooltip content for hovered service
  const hoveredService =
    hoveredIndex !== null ? servicesData[hoveredIndex % servicesData.length] : null;

  return (
    <div
       className="relative w-full flex flex-col items-center justify-center select-none overflow-hidden"
      style={{ minHeight: 380 }}
    >

      <motion.div
         className="absolute z-10 hidden md:block"
        style={{ width: 40, left: 10, top: 60, opacity: 0.25 }}
        animate={{ y: [0, -8, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        
        <svg viewBox="0 0 64 64" fill="none">
          <ellipse cx="32" cy="22" rx="14" ry="15" fill="#D1D5DB" />
          <ellipse cx="32" cy="21" rx="9" ry="9" fill="#1F2937" />
          <rect x="20" y="36" width="24" height="22" rx="8" fill="#D1D5DB" />
        </svg>
      </motion.div>

      {/* ── Ambient particles ── */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-white pointer-events-none"
          style={{
            top: `${15 + ((i * 37) % 70)}%`,
            left: `${5 + ((i * 29) % 90)}%`,
            boxShadow: "0 0 8px 2px rgba(232,25,44,0.4)",
          }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0.5, 1.3, 0.5],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 2.5 + (i % 3) * 0.5,
            repeat: Infinity,
            delay: (i * 0.4) % 2.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* astronaut removed from SolarSystemHero */}

      {/* ── Section label ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-2 mb-6"
      >
        <div className="w-2 h-2 rounded-full bg-[#E8192C] shadow-[0_0_8px_rgba(232,25,44,0.8)]" />
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">
          Our Services
        </span>
        <motion.span
          className="text-[#E8192C] text-xs"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          ✦
        </motion.span>
      </motion.div>

      {/* ── TOP marquee row — scrolls LEFT ── */}
      <div
        className="relative w-full overflow-hidden mb-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredIndex(null);
        }}
      >
        <motion.div
          className="flex gap-6 py-3"
          animate={{ x: isPaused ? undefined : ["0%", "-50%"] }}
          transition={{
            x: { duration: 30, repeat: Infinity, ease: "linear" },
          }}
          style={{ width: "max-content" }}
        >
          {doubledServices.map((service, i) => (
            <ServiceBubble
              key={`top-${i}`}
              service={service}
              index={i}
              isHovered={hoveredIndex === i}
              onHover={setHoveredIndex}
              onLeave={() => setHoveredIndex(null)}
              onClick={() => handleServiceClick(service.title)}
            />
          ))}
        </motion.div>
      </div>

      {/* ── BOTTOM marquee row — scrolls RIGHT (reversed) ── */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredIndex(null);
        }}
      >
        <motion.div
          className="flex gap-6 py-3"
          animate={{ x: isPaused ? undefined : ["-50%", "0%"] }}
          transition={{
            x: { duration: 35, repeat: Infinity, ease: "linear" },
          }}
          style={{ width: "max-content" }}
        >
          {[...doubledServices].reverse().map((service, i) => {
            const realIndex = servicesData.length * 2 + i;
            return (
              <ServiceBubble
                key={`bot-${i}`}
                service={service}
                index={realIndex}
                isHovered={hoveredIndex === realIndex}
                onHover={setHoveredIndex}
                onLeave={() => setHoveredIndex(null)}
                onClick={() => handleServiceClick(service.title)}
              />
            );
          })}
        </motion.div>
      </div>

      {/* ── Tooltip Card — glassmorphism popup ── */}
      <AnimatePresence>
        {hoveredService && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-5 py-4 rounded-2xl max-w-xs w-full text-center pointer-events-none"
            style={{
              background: "rgba(10,10,10,0.8)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(232,25,44,0.3)",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(232,25,44,0.1)",
            }}
          >
            <p className="text-white font-black text-sm uppercase tracking-wider mb-1">
              {hoveredService.title}
            </p>
            <p className="text-white/50 text-[11px] leading-relaxed font-medium">
              {hoveredService.desc}
            </p>
            <div className="mt-2">
              <span className="text-[8px] font-black uppercase tracking-widest text-[#E8192C]">
                Click to explore →
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom CTA ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 z-10"
      >
        <button
          onClick={() => navigate("/services")}
          className="text-[9px] font-black uppercase tracking-[0.25em] text-white/50 hover:text-white border border-white/10 hover:border-[#E8192C]/50 px-6 py-2 rounded-full transition-all duration-300 hover:bg-white/5"
        >
          View All {servicesData.length} Services
        </button>
      </motion.div>
    </div>
  );
};

export { ToyAstronaut };
export default SolarSystemHero;
