import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import servicesData from "../../data/servicesData";

/* Keep ToyAstronaut defined for file exports and compatibility */
const ToyAstronaut = ({ style, className = "", seated = false }) => (
  <motion.div
    className={`pointer-events-none select-none ${className}`}
    style={style}
    animate={{
      y: [0, -6, 0, 4, 0],
      x: [0, 2, -1, 1, 0],
    }}
    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_8px_16px_rgba(17,17,17,0.1)]">
      <ellipse cx="60" cy="42" rx="26" ry="28" fill="#E5E7EB" stroke="white" strokeWidth="2" />
      <ellipse cx="60" cy="40" rx="19" ry="18" fill="#111827" />
      <rect x="36" y="68" width="48" height="48" rx="14" fill="#E5E7EB" stroke="white" strokeWidth="2" />
      <rect x="46" y="74" width="28" height="16" rx="4" fill="#1F2937" opacity="0.6" />
      <circle cx="52" cy="82" r="3" fill="#E31D2E" />
      <circle cx="62" cy="82" r="3" fill="#111111" />
      <circle cx="72" cy="82" r="2" fill="#E5E7EB" />
      <rect x="20" y="66" width="14" height="38" rx="5" fill="#6B7280" stroke="#9CA3AF" strokeWidth="1" />
      <rect x="86" y="66" width="14" height="38" rx="5" fill="#6B7280" stroke="#9CA3AF" strokeWidth="1" />
      <path d="M48 116V140H40" stroke="#E5E7EB" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M72 116V140H80" stroke="#E5E7EB" strokeWidth="6" strokeLinecap="round" fill="none" />
      <rect x="34" y="136" width="14" height="8" rx="4" fill="#6B7280" />
      <rect x="72" y="136" width="14" height="8" rx="4" fill="#6B7280" />
    </svg>
  </motion.div>
);

const CARD_W = 210;
const CARD_H = 270;

const ServicesCoverflow = () => {
  const navigate = useNavigate();
  const total = servicesData.length;
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate
  const DOCK_MS = 3500;
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
  const radius = 280; // Sightly tighter for premium density

  const getCardStyle = (index) => {
    const offset = ((index - active + total) % total);
    const angle = offset * angleStep;
    const rad = (angle * Math.PI) / 180;

    const x = Math.sin(rad) * radius;
    const z = Math.cos(rad) * radius;
    const y = Math.abs(Math.sin(rad)) * 12; // Gentle arc

    const depthNorm = (1 - Math.cos(rad)) / 2;

    const scale = 1 - depthNorm * 0.45;
    const opacity = 1 - depthNorm * 0.65;
    const blur = depthNorm * 3;
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
      {/* Soft clay-like background glow highlight */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "40%",
          left: "50%",
          width: 500,
          height: 500,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 mb-1.5 z-10"
      >
        <div className="w-2 h-2 rounded-full bg-[#E31D2E]" />
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#111111]">
          Our Services
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-[#8B8B8B] text-[9px] font-medium tracking-[0.2em] uppercase mb-4 z-10"
      >
        Tactile digital solutions
      </motion.p>

      {/* ── 3D Carousel Stage ── */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{ height: 320, perspective: 1200, perspectiveOrigin: "50% 45%" }}
      >
        {/* Soft shadow ellipse under the front card */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            bottom: 15,
            width: CARD_W * 0.85,
            height: 12,
            background: "radial-gradient(ellipse, rgba(17,17,17,0.1) 0%, transparent 70%)",
            filter: "blur(6px)",
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
                  scale: s.isFront ? 1.1 : s.scale,
                  opacity: s.opacity,
                  filter: s.isFront ? "blur(0px)" : `blur(${s.blur}px)`,
                }}
                whileHover={{
                  scale: s.isFront ? 1.14 : s.scale * 1.03,
                  rotateY: s.isFront ? 4 : 0,
                  rotateX: s.isFront ? 4 : 0,
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
                  className="relative w-full h-full rounded-[24px] overflow-hidden flex flex-col"
                  style={{
                    background: s.isFront
                      ? "rgba(255, 255, 255, 0.8)"
                      : "rgba(255, 255, 255, 0.45)",
                    backdropFilter: "blur(20px) saturate(120%)",
                    WebkitBackdropFilter: "blur(20px) saturate(120%)",
                    border: s.isFront
                      ? "1px solid rgba(255, 255, 255, 0.7)"
                      : "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: s.isFront
                      ? "0 20px 48px rgba(17,17,17,0.06), 0 2px 10px rgba(17,17,17,0.02), inset 0 1px 0 rgba(255,255,255,0.8)"
                      : "0 8px 24px rgba(17,17,17,0.03)",
                  }}
                >
                  {/* Image */}
                  <div className="relative w-full h-[52%] p-2 pb-0">
                    <div
                      className="relative w-full h-full rounded-2xl overflow-hidden"
                      style={{
                        border: "1px solid rgba(255,255,255,0.4)",
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
                          background: "linear-gradient(to top, rgba(17,17,17,0.15) 0%, transparent 60%)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="relative flex-1 flex flex-col justify-center px-5 py-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#E31D2E]">
                        Service
                      </span>
                    </div>
                    <h3 className="text-[#111111] font-black uppercase tracking-wide leading-tight mb-1 text-xs">
                      {service.title}
                    </h3>
                    <p className="text-[#575757] leading-relaxed font-normal line-clamp-2 text-[10px]">
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
      <div className="flex items-center gap-2 mt-3 z-10 flex-wrap justify-center max-w-md px-4">
        {servicesData.map((service, i) => (
          <button
            key={service.title + i}
            aria-label={`Go to ${service.title}`}
            onClick={() => goTo(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              background: i === active ? "#E31D2E" : "rgba(17,17,17,0.15)",
            }}
          />
        ))}
      </div>

      {/* View Services Button */}
      <button
        onClick={() => navigate("/services")}
        className="mt-4 z-10 text-[9px] font-black uppercase tracking-[0.25em] text-white bg-[#E31D2E] px-6 py-2.5 rounded-full whitespace-nowrap transition-all hover:bg-[#111111]"
      >
        View Services
      </button>
    </div>
  );
};

export default ServicesCoverflow;
export { ToyAstronaut };