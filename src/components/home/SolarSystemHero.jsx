import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import servicesData from "../../data/servicesData";

/* ─────────────────────────────────────────────────────
   Toy Astronaut SVG — kept exported for other files
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
    <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_20px_rgba(232,25,44,0.3)]">
      <ellipse cx="60" cy="42" rx="26" ry="28" fill="#E5E7EB" stroke="white" strokeWidth="2" />
      <ellipse cx="60" cy="40" rx="19" ry="18" fill="#111827" />
      <path d="M48 34C50 28 56 24 64 26" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <circle cx="52" cy="36" r="3" fill="white" opacity="0.3" />
      <rect x="36" y="68" width="48" height="48" rx="14" fill="#E5E7EB" stroke="white" strokeWidth="2" />
      <rect x="46" y="74" width="28" height="16" rx="4" fill="#1F2937" opacity="0.6" />
      <circle cx="52" cy="82" r="3" fill="#E8192C" />
      <circle cx="62" cy="82" r="3" fill="#10B981" />
      <circle cx="72" cy="82" r="2" fill="#3B82F6" />
      <text x="52" y="89" fill="white" fontSize="5" fontWeight="bold" opacity="0.4">PX</text>
      <rect x="20" y="66" width="14" height="38" rx="5" fill="#6B7280" stroke="#9CA3AF" strokeWidth="1" />
      <rect x="86" y="66" width="14" height="38" rx="5" fill="#6B7280" stroke="#9CA3AF" strokeWidth="1" />
      <motion.ellipse cx="27" cy="108" rx="4" ry="6" fill="#E8192C" animate={{ ry: [6, 10, 5, 8, 6], opacity: [0.8, 1, 0.6, 0.9, 0.8] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }} />
      <motion.ellipse cx="93" cy="108" rx="4" ry="6" fill="#E8192C" animate={{ ry: [5, 9, 6, 8, 5], opacity: [0.7, 1, 0.5, 0.8, 0.7] }} transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0.15 }} />
      <motion.ellipse cx="27" cy="108" rx="2" ry="4" fill="#FBBF24" animate={{ ry: [4, 7, 3], opacity: [0.9, 1, 0.7] }} transition={{ duration: 0.4, repeat: Infinity }} />
      <motion.ellipse cx="93" cy="108" rx="2" ry="4" fill="#FBBF24" animate={{ ry: [3, 6, 4], opacity: [0.8, 1, 0.6] }} transition={{ duration: 0.45, repeat: Infinity, delay: 0.1 }} />
      {seated ? (
        <>
          <path d="M36 78C28 84 24 92 22 100" stroke="#E5E7EB" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M84 78C92 84 96 92 98 100" stroke="#E5E7EB" strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="22" cy="100" r="5" fill="white" />
          <circle cx="98" cy="100" r="5" fill="white" />
        </>
      ) : (
        <>
          <motion.path d="M36 78C24 82 18 90 22 96" stroke="#E5E7EB" strokeWidth="6" strokeLinecap="round" fill="none" animate={{ d: ["M36 78C24 82 18 90 22 96", "M36 78C22 76 14 82 16 90", "M36 78C24 82 18 90 22 96"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          <path d="M84 78C96 82 102 90 98 96" stroke="#E5E7EB" strokeWidth="6" strokeLinecap="round" fill="none" />
          <motion.circle cx="22" cy="96" r="5" fill="white" animate={{ cy: [96, 90, 96] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          <circle cx="98" cy="96" r="5" fill="white" />
        </>
      )}
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
      <motion.path d="M60 116C60 130 30 140 10 148" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" fill="none" animate={{ strokeDashoffset: [0, -16] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
      <line x1="60" y1="14" x2="60" y2="6" stroke="#9CA3AF" strokeWidth="2" />
      <motion.circle cx="60" cy="5" r="3" fill="#E8192C" animate={{ opacity: [0.4, 1, 0.4], r: [3, 4, 3] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
    </svg>
  </motion.div>
);

/* ─────────────────────────────────────────────────────
   3D Circular Carousel — cards arranged in a ring
   with the active card scaling up in front
   ───────────────────────────────────────────────────── */
const CARD_W = 200;
const CARD_H = 260;

const ServicesCoverflow = () => {
  const navigate = useNavigate();
  const total = servicesData.length;
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate
  const DOCK_MS = 3200;
  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(() => setActive((p) => (p + 1) % total), DOCK_MS);
    return () => clearInterval(id);
  }, [isHovered, total]);

  const goTo = useCallback(
    (i) => setActive(((i % total) + total) % total),
    [total]
  );

  const handleCardClick = (index) => {
    if (index === active) {
      navigate("/services", {
        state: { highlightService: servicesData[index].title },
      });
    } else {
      setActive(index);
    }
  };

  /* ── Compute each card's 3D position in the circular ring ── */
  const angleStep = 360 / total;
  const radius = 320;

  const getCardStyle = (index) => {
    const offset = ((index - active + total) % total);
    const angle = offset * angleStep;
    const rad = (angle * Math.PI) / 180;

    // X position on the ellipse
    const x = Math.sin(rad) * radius;
    // Z depth (how far back)
    const z = Math.cos(rad) * radius;
    // Slight Y curve for a gentle arc
    const y = Math.abs(Math.sin(rad)) * 20;

    // Normalized 0→1 (0 = front, 1 = back)
    const depthNorm = (1 - Math.cos(rad)) / 2;

    const scale = 1 - depthNorm * 0.5;
    const opacity = 1 - depthNorm * 0.7;
    const blur = depthNorm * 4;
    const zIndex = Math.round((1 - depthNorm) * 100);

    return {
      x,
      y,
      z,
      scale,
      opacity,
      blur,
      zIndex,
      isFront: offset === 0,
    };
  };

  return (
    <div
      className="relative w-full flex flex-col items-center justify-center select-none overflow-hidden"
      style={{ minHeight: 430 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient glowing red light */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          left: "50%",
          width: 600,
          height: 600,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(232,25,44,0.18) 0%, rgba(232,25,44,0) 65%)",
          filter: "blur(10px)",
        }}
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 mb-1 z-10"
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

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-white/25 text-[8px] sm:text-[9px] font-medium tracking-[0.2em] uppercase mb-2 sm:mb-4 z-10"
      >
        Crafted by{" "}
        <span className="text-[#E8192C]/70">Praskla Digital X</span>
      </motion.p>

      {/* ── 3D Carousel Stage ── */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{ height: 330, perspective: 1200, perspectiveOrigin: "50% 45%" }}
      >
        {/* Red glow reflection under the front card */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            bottom: 20,
            width: CARD_W * 0.9,
            height: 20,
            background:
              "radial-gradient(ellipse, rgba(232,25,44,0.4) 0%, rgba(232,25,44,0) 70%)",
            filter: "blur(8px)",
          }}
        />

        {/* Cards in circular arrangement */}
        <div
          className="relative"
          style={{
            width: CARD_W,
            height: CARD_H,
            transformStyle: "preserve-3d",
          }}
        >
          {servicesData.map((service, i) => {
            const s = getCardStyle(i);

            return (
              <motion.div
                key={service.title + i}
                className="absolute top-0 left-0 cursor-pointer"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  zIndex: s.zIndex,
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  x: s.x,
                  y: s.y,
                  scale: s.isFront ? 1.12 : s.scale,
                  opacity: s.opacity,
                  filter: s.isFront ? "blur(0px)" : `blur(${s.blur}px)`,
                }}
                whileHover={{
                  scale: s.isFront ? 1.16 : s.scale * 1.05,
                  rotateY: s.isFront ? 5 : 0,
                  rotateX: s.isFront ? 5 : 0,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  mass: 0.8,
                }}
                onClick={() => handleCardClick(i)}
              >
                <div
                  className="relative w-full h-full rounded-[22px] overflow-hidden flex flex-col"
                  style={{
                    background: s.isFront
                      ? "rgba(255,255,255,0.07)"
                      : "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(20px) saturate(130%)",
                    WebkitBackdropFilter: "blur(20px) saturate(130%)",
                    border: s.isFront
                      ? "1px solid rgba(232,25,44,0.35)"
                      : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: s.isFront
                      ? "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(232,25,44,0.15), inset 0 1px 0 rgba(255,255,255,0.12)"
                      : "0 8px 30px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Top light edge */}
                  {s.isFront && (
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(232,25,44,0.5), transparent)",
                      }}
                    />
                  )}

                  {/* Image */}
                  <div className="relative w-full h-[52%] p-2 pb-0">
                    <div
                      className="relative w-full h-full rounded-2xl overflow-hidden"
                      style={{
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        draggable={false}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(6,6,6,0.5) 0%, rgba(6,6,6,0) 60%)",
                        }}
                      />
                      {/* Sheen effect on front card */}
                      {s.isFront && (
                        <motion.div
                          className="absolute inset-y-0 w-1/3 pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(100deg, transparent, rgba(255,255,255,0.15), transparent)",
                          }}
                          initial={{ x: "-120%" }}
                          animate={{ x: "320%" }}
                          transition={{
                            duration: 2.5,
                            delay: 0.3,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Text */}
                  <div className="relative flex-1 flex flex-col justify-center px-5 py-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="w-4 h-px"
                        style={{ background: "rgba(232,25,44,0.6)" }}
                      />
                      <span className="text-[8px] font-semibold uppercase tracking-[0.28em] text-white/40">
                        Service
                      </span>
                    </div>
                    <h3 className="text-white/90 font-bold uppercase tracking-wide leading-tight mb-1.5 text-sm">
                      {service.title}
                    </h3>
                    <p className="text-white/45 leading-relaxed font-normal line-clamp-2 text-[10px]">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex items-center gap-2 mt-2 sm:mt-3 z-10 flex-wrap justify-center max-w-md px-4">
        {servicesData.map((service, i) => (
          <button
            key={service.title + i}
            aria-label={`Go to ${service.title}`}
            onClick={() => goTo(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === active ? 22 : 6,
              height: 6,
              background:
                i === active ? "#E8192C" : "rgba(255,255,255,0.2)",
              boxShadow:
                i === active
                  ? "0 0 10px rgba(232,25,44,0.7)"
                  : "none",
            }}
          />
        ))}
      </div>

      {/* View Services Button */}
      <button
        onClick={() => navigate("/services")}
        className="mt-3 sm:mt-4 z-10 text-[9px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white bg-[#E8192C] px-5 sm:px-6 py-2 rounded-full whitespace-nowrap"
      >
        View Services
      </button>
    </div>
  );
};

export { ToyAstronaut };
export default ServicesCoverflow;