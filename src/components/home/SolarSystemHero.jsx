import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import servicesData from "../../data/servicesData";

import SectionBadge from "../common/SectionBadge";

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

const CARD_W = 230;
const CARD_H = 308;

const ServicesCoverflow = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardW = isMobile ? 195 : 230;
  const cardH = isMobile ? 235 : 308;

  const total = servicesData.length;
  const [active, setActive] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef(null);

  // Auto-rotate
  const DOCK_MS = 2000;
  useEffect(() => {
    if (isHovered || isDragging || isPaused) return;
    const id = setInterval(() => setActive((p) => (p + 1) % total), DOCK_MS);
    return () => clearInterval(id);
  }, [isHovered, isDragging, isPaused, total]);

  // Handle 3-second delay after user interaction before resuming auto-rotation
  const triggerResumeTimer = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsHovered(false);
      setIsPaused(false);
    }, 3000);
  }, []);

  // Keyboard navigation: ArrowLeft, ArrowRight, Space (pause/resume)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setActive((p) => (p - 1 + total) % total);
        triggerResumeTimer();
      } else if (e.key === "ArrowRight") {
        setActive((p) => (p + 1) % total);
        triggerResumeTimer();
      } else if (e.key === " " || e.code === "Space") {
        if (document.activeElement === document.body || document.activeElement?.getAttribute('role') === 'region') {
          e.preventDefault();
        }
        setIsPaused((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [total, triggerResumeTimer]);

  const goTo = useCallback(
    (i) => setActive(((i % total) + total) % total),
    [total]
  );

  const handleCardClick = (index) => {
    if (isDragging) return;
    if (index === active) {
      if (servicesData[index]?.title) {
        navigate("/services", {
          state: { highlightService: servicesData[index].title },
        });
      } else {
        navigate("/services");
      }
    } else {
      setActive(index);
    }
  };

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const STEP_PX = isMobile ? 130 : 170;

    // Calculate exact continuous card shift based on drag distance & velocity momentum
    const totalShift = -(offset + velocity * 0.25) / STEP_PX;
    const targetFloat = active + totalShift;
    const finalIndex = ((Math.round(targetFloat) % total) + total) % total;

    setActive(finalIndex);
    setDragX(0);
    setTimeout(() => setIsDragging(false), 50);
    triggerResumeTimer();
  };

  /* ── Compute each card's position tightly centered in the static box ── */
  const getCardStyle = (index) => {
    const STEP_PX = isMobile ? 130 : 160;
    const activePos = isDragging
      ? (((active - dragX / STEP_PX) % total) + total) % total
      : active;

    let rawOffset = index - activePos;
    while (rawOffset > total / 2) rawOffset -= total;
    while (rawOffset < -total / 2) rawOffset += total;

    const absOffset = Math.abs(rawOffset);

    // Only 3 cards ever visible: 1 front, 1 left, 1 right
    if (absOffset > 1.15) {
      return {
        x: 0,
        y: 0,
        z: -100,
        scale: 0.7,
        opacity: 0,
        zIndex: 0,
        blurAmount: 0,
        isFront: false,
        rawOffset,
      };
    }

    const isFront = absOffset < 0.35;
    const isLeft = rawOffset < -0.35 && rawOffset >= -1.15;
    const isRight = rawOffset > 0.35 && rawOffset <= 1.15;

    // Horizontal offset for enlarged cards strictly bounded within outer box
    const x = rawOffset * (isMobile ? 58 : 76);
    const z = isFront ? 0 : -40;
    const y = isFront ? 0 : 3;
    const scale = isFront ? 1 : 0.92;
    const opacity = isFront ? 1 : 0.95;
    const zIndex = isFront ? 100 : 80;
    const blurAmount = isFront || isMobile ? 0 : 0.5;

    return {
      x,
      y,
      z,
      scale,
      opacity,
      zIndex,
      blurAmount,
      isFront,
      rawOffset,
    };
  };

  return (
    <div
      className={`relative w-full flex flex-col items-center justify-center select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      style={{ minHeight: isMobile ? 250 : 375 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(true);
        triggerResumeTimer();
      }}
      tabIndex={0}
      role="region"
      aria-label="Expertise Carousel"
    >

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-1 sm:mb-1.5 z-10"
      >
        <SectionBadge text="OUR EXPERTISE" theme="dark" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="expertise-subtitle !text-neutral-300 text-[8px] sm:text-[9px] font-bold tracking-[0.2em] uppercase mb-1.5 sm:mb-2.5 z-10"
      >
        TACTILE DIGITAL SOLUTIONS
      </motion.p>

      {/* ── 3D Carousel Stage ── */}
      <motion.div
        className="relative w-full max-w-[380px] flex items-center justify-center overflow-hidden"
        style={{
          height: isMobile ? 235 : 330,
          perspective: 1200,
          perspectiveOrigin: "50% 45%",
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDrag={(e, info) => setDragX(info.offset.x)}
        onDragEnd={handleDragEnd}
      >


        {/* Soft shadow ellipse under the front card */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            bottom: 5,
            width: cardW * 0.9,
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
            width: cardW,
            height: cardH,
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
                  width: cardW,
                  height: cardH,
                  zIndex: s.zIndex,
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  x: s.x,
                  y: s.y,
                  scale: s.scale,
                  opacity: s.opacity,
                  filter: `blur(${s.blurAmount}px)`,
                }}
                whileHover={s.isFront ? {
                  y: s.y - 8,
                  scale: 1.03,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                } : {}}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => handleCardClick(i)}
              >
                <div
                  className="relative w-full h-full overflow-hidden flex flex-col p-2 sm:p-3 transition-all duration-300"
                  style={{
                    background: s.isFront ? "#FFFFFF" : "rgba(255, 255, 255, 0.88)",
                    backdropFilter: "none",
                    WebkitBackdropFilter: "none",
                    border: s.isFront ? "1px solid #FFFFFF" : "1px solid rgba(255, 255, 255, 0.95)",
                    borderRadius: "16px",
                    boxShadow: s.isFront
                      ? "0 20px 45px rgba(0, 0, 0, 0.6)"
                      : "0 10px 25px rgba(0, 0, 0, 0.35)",
                  }}
                >
                  {/* Image container frame — Fixed identical height matching 3rd image size */}
                  <div className={`relative w-full ${isMobile ? "h-[85px]" : "h-[140px]"} shrink-0 flex-shrink-0 rounded-xl overflow-hidden flex items-center justify-center p-1.5 sm:p-2 border border-black/10 transition-colors duration-300 ${
                    s.isFront ? "bg-[#000000]" : "bg-[#111111]"
                  }`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      draggable={false}
                      className="w-full h-full object-contain rounded-[14px]"
                    />
                  </div>

                  {/* Text (Only visible on active card) */}
                  <div
                    className="relative flex-1 flex flex-col justify-between px-1.5 sm:px-3 py-1.5 sm:py-2 transition-opacity duration-300 overflow-hidden text-left"
                    style={{
                      opacity: s.isFront ? 1 : 0,
                      pointerEvents: s.isFront ? "auto" : "none"
                    }}
                  >
                    <div className="flex flex-col gap-0.5 sm:gap-1 text-left">
                      <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.25em] text-[#ef2029] text-left block">
                        Expertise
                      </span>
                      <h3 className="text-[#111111] font-black uppercase tracking-tight leading-[1.2] text-[10.5px] sm:text-xs text-left">
                        {service.title}
                      </h3>
                      <p
                        className="font-normal"
                        style={{
                          color: "#333333",
                          fontSize: isMobile ? "9.5px" : "10.5px",
                          lineHeight: "1.35",
                          letterSpacing: "normal",
                          textAlign: "left",
                          marginTop: "2px",
                          marginBottom: "0px",
                          maxWidth: "none",
                        }}
                      >
                        {service.desc}
                      </p>
                    </div>

                    {/* Focus tag inside active card — Replaces Learn More */}
                    <div className="mt-1 inline-flex items-center gap-1 text-[#ef2029] font-extrabold text-[8px] sm:text-[9px] uppercase tracking-wider shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ef2029]" />
                      <span>High Impact Strategy</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Pagination dots */}
      <div className="flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-2 z-10 flex-wrap justify-center max-w-md px-4">
        {servicesData.map((service, i) => (
          <button
            key={service.title + i}
            aria-label={`Go to ${service.title}`}
            onClick={() => goTo(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === active ? (isMobile ? 14 : 18) : (isMobile ? 4 : 5),
              height: isMobile ? 4 : 5,
              background: i === active ? "#ef2029" : "rgba(17,17,17,0.15)",
            }}
          />
        ))}
      </div>

      {/* View Expertise Button */}
      <button
        onClick={() => navigate("/services")}
        className="mt-1.5 sm:mt-2.5 z-10 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.25em] bg-[#FF2B2B] hover:bg-[#E51D1D] text-white px-5 sm:px-6 py-1.5 sm:py-2.5 rounded-xl whitespace-nowrap shadow-[0_8px_20px_rgba(255,43,43,0.4)] transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        VIEW EXPERTISE
      </button>
    </div>
  );
};

export default ServicesCoverflow;
export { ToyAstronaut };