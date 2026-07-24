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

const CARD_W = 240;
const CARD_H = 330;

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
  const radius = 360; 

  const getCardStyle = (index) => {
    const offset = ((index - active + total) % total);
    const angle = offset * angleStep;
    const rad = (angle * Math.PI) / 180;

    const distance = Math.min(
      Math.abs(index - active),
      total - Math.abs(index - active)
    );

    const x = Math.sin(rad) * radius;
    const z = Math.cos(rad) * radius;
    const y = Math.abs(Math.sin(rad)) * 10; 

    let scale = 1;
    let opacity = 1;
    let blur = 0;
    let zIndex = 100;

    if (distance === 0) {
      scale = 1;
      opacity = 1;
      blur = 0;
      zIndex = 100;
    } else if (distance === 1) {
      scale = 0.82;
      opacity = 0.35;
      blur = 3;
      zIndex = 50;
    } else if (distance === 2) {
      scale = 0.70;
      opacity = 0.12;
      blur = 5;
      zIndex = 20;
    } else {
      scale = 0.60;
      opacity = 0.02;
      blur = 8;
      zIndex = 10;
    }

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
      style={{ minHeight: 460 }}
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
        <div className="w-2 h-2 rounded-full bg-[#ef2029]" />
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
        style={{ height: 380, perspective: 1200, perspectiveOrigin: "50% 45%" }}
      >
        {/* Soft shadow ellipse under the front card */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            bottom: 5,
            width: CARD_W * 0.9,
            height: 12,
            background: "radial-gradient(ellipse, rgba(17,17,17,0.12) 0%, transparent 70%)",
            filter: "blur(6px)",
            zIndex: 90,
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
                className="absolute top-0 left-0 cursor-pointer group"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  zIndex: s.zIndex,
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  x: s.x,
                  y: s.y,
                  scale: s.scale,
                  opacity: s.opacity,
                  filter: s.isFront ? "blur(0px)" : `blur(${s.blur}px)`,
                }}
                whileHover={s.isFront ? {
                  y: s.y - 8,
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                } : {}}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 25,
                  mass: 0.75,
                }}
                onClick={() => handleCardClick(i)}
              >
                <div
                  className="relative w-full h-full overflow-hidden flex flex-col p-3"
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(255, 255, 255, 0.85)",
                    borderRadius: "30px",
                    boxShadow: s.isFront
                      ? "0 20px 48px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(255, 255, 255, 0.9) inset"
                      : "0 12px 40px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(255, 255, 255, 0.9) inset",
                  }}
                >
                  {/* Image container frame */}
                  <div className="relative w-full h-[48%] rounded-[22px] overflow-hidden bg-[#f3e9e9]/50 flex items-center justify-center p-2 border border-white/40 shadow-inner">
                    <img
                      src={service.image}
                      alt={service.title}
                      draggable={false}
                      className="w-full h-full object-contain rounded-[16px]"
                    />
                  </div>

                  {/* Text (Only visible on active card) */}
                  <div 
                    className="relative flex-1 flex flex-col justify-between px-3 py-2.5 transition-opacity duration-300"
                    style={{ 
                      opacity: s.isFront ? 1 : 0, 
                      pointerEvents: s.isFront ? "auto" : "none" 
                    }}
                  >
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#ef2029]">
                        Service
                      </span>
                      <h3 className="text-[#111111] font-black uppercase tracking-wide leading-tight text-xs">
                        {service.title}
                      </h3>
                      <p className="text-[#575757] leading-relaxed font-normal text-[10px] line-clamp-3">
                        {service.desc}
                      </p>
                    </div>

                    {/* CTA link inside active card */}
                    <div className="mt-1 flex items-center text-[#ef2029] font-black text-[9px] uppercase tracking-wider">
                      Learn More
                      <svg className="w-3 h-3 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex items-center gap-2 mt-4 z-10 flex-wrap justify-center max-w-md px-4">
        {servicesData.map((service, i) => (
          <button
            key={service.title + i}
            aria-label={`Go to ${service.title}`}
            onClick={() => goTo(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              background: i === active ? "#ef2029" : "rgba(17,17,17,0.15)",
            }}
          />
        ))}
      </div>

      {/* View Services Button */}
      <button
        onClick={() => navigate("/services")}
        className="primary-btn mt-5 z-10 text-[9px] font-black uppercase tracking-[0.25em] text-white px-6 py-2.5 rounded-full whitespace-nowrap"
      >
        View Services
      </button>
    </div>
  );
};

export default ServicesCoverflow;
export { ToyAstronaut };