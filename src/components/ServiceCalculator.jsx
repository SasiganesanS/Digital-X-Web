import React, { useMemo, useState, useEffect, useRef } from "react";
import HeroLayout from "./common/HeroLayout";
import "./ServiceCalculator.css";
import balajiPortraits from '../assets/tie/Balaji-Portraits.webp';
import shipyon from '../assets/tie/Shipyon.webp';
import pt from '../assets/tie/pt.webp';
import ourServicesImg from "../assets/services-img/digital.webp";
import servicesData from "../data/servicesData";
import ProjectBriefModal from "./ProjectBriefModal";
import ServiceDetailModal from "./ServiceDetailModal";
import CollaboratorSection from "./collaborators/CollaboratorSection";
import SectionBadge from "./common/SectionBadge";
import ServicesSpaceBackground from "./ServicesSpaceBackground";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
  animate,
  useTransform,
  useInView,
} from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaTimesCircle,
  FaCheckCircle,
  FaGlobe,
  FaMobileAlt,
  FaLaptopCode,
  FaBullhorn,
  FaShieldAlt,
  FaLeaf,
  FaPalette,
  FaVideo,
} from "react-icons/fa";
import {
  FiUsers,
  FiBriefcase,
  FiLayers,
  FiSearch,
  FiTrendingUp,
  FiShare2,
  FiBarChart2,
  FiCode,
  FiCheckCircle,
  FiZap,
} from "react-icons/fi";
import {
  MdDiamond,
  MdRocketLaunch,
  MdStars,
  MdWorkspacePremium,
  MdIntegrationInstructions,
} from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { HiLightningBolt } from "react-icons/hi";
import { platforms } from "../constants/index";
import ContactForm from "./ContactForm";
import PlatformPlanModal from "./PlatformPlanModal";

// Icon mapping object
const iconMap = {
  FaGlobe,
  FaMobileAlt,
  FaLaptopCode,
  FaBullhorn,
  FaVideo,
  FaShieldAlt,
  FaLeaf,
  FaTimesCircle,
  FaCheckCircle,
  MdDiamond,
  MdRocketLaunch,
  MdStars,
  MdWorkspacePremium,
  MdIntegrationInstructions,
  IoLogoWhatsapp,
  HiLightningBolt,
};

const resolveIcon = (icon) => {
  if (!icon) return null;
  if (typeof icon === "string") {
    return iconMap[icon] || null;
  }
  return icon;
};

const PLATFORMS = platforms.map((platform) => ({
  ...platform,
  icon: resolveIcon(platform.icon),
  plans: (platform.plans || []).map((plan) => ({
    ...plan,
    icon: resolveIcon(plan.icon),
  })),
}));

// Multi-set service list so the marquee track loops infinitely without blank space on either side
const LOOPED_SERVICES = [...servicesData, ...servicesData, ...servicesData, ...servicesData];

// Category tag mapping for services
const getServiceCategoryTag = (title) => {
  const t = title.toLowerCase();
  if (t.includes("seo") || t.includes("analytics")) return "Strategy";
  if (t.includes("smm") || t.includes("content") || t.includes("influencer") || t.includes("orm")) return "Marketing";
  if (t.includes("ads") || t.includes("performance") || t.includes("ecommerce") || t.includes("email")) return "Growth";
  return "Engineering";
};

const getServiceHighlights = (title) => {
  const map = {
    "SEO": ["Keyword Strategy", "Technical Audit", "Rank Growth"],
    "SSM": ["Content Calendar", "Audience Scale", "Brand Vibe"],
    "ADS": ["Google & Meta Ads", "ROI Optimization", "High Conversion"],
    "Website Design": ["Custom UI/UX", "Mobile First", "Speed Optimized"],
    "Video Production": ["Reels & Shorts", "Product Shoots", "High-End Edit"],
    "Content Marketing": ["SEO Blogs", "Copywriting", "Brand Voice"],
    "E-commerce Marketing": ["Store Scale", "Cart Recovery", "Revenue Growth"],
    "Email Marketing": ["Automation", "High Open Rate", "Lead Nurturing"],
    "Influencer Marketing": ["Creator Match", "Campaign Strategy", "Viral Reach"],
    "Performance Marketing": ["Data-Driven ROI", "Lead Generation", "Ad Scaling"],
    "ORM": ["Review Management", "Brand Trust", "Positive Perception"],
    "Analytics & Reporting": ["Live Dashboards", "Conversion Tracking", "Data Insights"]
  };

  return map[title] || ["Strategy & Execution", "Data Insights", "Brand Growth"];
};

// Partner logos for the auto-scrolling "Ecosystem Partners" strip
const PARTNERS = [
  { src: balajiPortraits, alt: "Balaji Portraits" },
  { src: pt, alt: "PRASKLA DIGITAL X" },
  { src: shipyon, alt: "Shipyon" },
];
const LOOPED_PARTNERS = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

// ── Services Hero Helper Components ──
function AnimatedPriceDisplay({ value = 5000, textColor = "text-[#111111]" }) {
  const safeEndValue = typeof value === 'number' && !isNaN(value) ? value : 5000;
  const [displayValue, setDisplayValue] = useState(safeEndValue);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 800;
    const startValue = typeof displayValue === 'number' && !isNaN(displayValue) ? displayValue : safeEndValue;
    const endValue = safeEndValue;
    let animFrameId = null;

    if (startValue === endValue) return;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (endValue - startValue) * easeOut);
      setDisplayValue(isNaN(current) ? endValue : current);
      if (progress < 1) {
        animFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(endValue);
      }
    };

    animFrameId = requestAnimationFrame(step);

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [safeEndValue]);

  const numToFormat = typeof displayValue === 'number' && !isNaN(displayValue) ? displayValue : 5000;

  return (
    <div className={`flex items-baseline gap-1 text-3xl sm:text-[2.5rem] font-black ${textColor} tracking-tight`}>
      <span className="text-[#111111] text-2xl sm:text-3xl font-black">₹</span>
      <span>{numToFormat.toLocaleString()}</span>
    </div>
  );
}

function HeroAnimatedStat({ targetNum, suffix = "+", label, icon: Icon, delay = 0 }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-20px" });

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    const duration = 1800; // ms
    const numVal = parseInt(targetNum, 10) || 0;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * numVal));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(numVal);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, targetNum, delay]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20, scale: 0.92 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.92 }}
      transition={{ duration: 0.6, delay: delay * 0.3, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="clay-card relative flex items-center gap-3.5 p-4 px-5 sm:px-6 rounded-2xl border border-white/90 shadow-xl bg-white hover:bg-white cursor-default group transition-all duration-300 min-w-[135px] sm:min-w-[160px]"
    >
      {/* Light glass highlight overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/70 via-transparent to-transparent pointer-events-none" />

      {/* Icon container */}
      {Icon && (
        <div className="relative z-10 p-2.5 rounded-2xl bg-neutral-100 text-[#111111] border border-neutral-200/80 group-hover:bg-[#111111] group-hover:text-white transition-all duration-300 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        <span className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight transition-colors duration-300">
          {count}{suffix}
        </span>
        <span className="text-[#575757] text-[10px] font-bold uppercase tracking-[0.2em] mt-0.5">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

function HeroShowcase({ ourServicesImg }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, px: 0, py: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalized coordinates (-0.5 to 0.5)
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    // Smooth tilt angles and parallax offset
    setTilt({
      x: yPct * -10,
      y: xPct * 10,
      px: xPct * -14,
      py: yPct * -14,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, px: 0, py: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-full lg:max-w-[640px] xl:max-w-[700px] 2xl:max-w-[760px] mx-auto lg:mx-0 perspective-[1000px] select-none"
    >
      {/* 3D Container Wrapper */}
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative transition-transform duration-300 ease-out transform-gpu cursor-pointer w-full"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Outer Showcase Frame */}
        <div className={`relative w-full rounded-2xl p-2 sm:p-2.5 lg:p-3 bg-white border border-neutral-200/90 shadow-2xl transition-all duration-500 overflow-visible ${
          isHovered ? "shadow-[0_30px_70px_rgba(0,0,0,0.18)] bg-white" : ""
        }`}>
          {/* Image Container with Parallax Effect */}
          <div className="relative w-full rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9.5] min-h-[220px] sm:min-h-[400px] lg:min-h-[440px] bg-white border border-neutral-200/60">
            <img
              src={ourServicesImg}
              alt="Digital Marketing Strategy"
              className="w-full h-full object-cover transition-transform duration-500 ease-out scale-[1.04]"
              style={{
                transform: isHovered
                  ? `scale(1.08) translate(${tilt.px}px, ${tilt.py}px)`
                  : "scale(1.04)",
              }}
            />

            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10" />

            {/* SERVICE HIGHLIGHT PANEL — Pinned Cleanly Inside Card */}
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-30 p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_16px_40px_rgba(0,0,0,0.15)] max-w-[260px] sm:max-w-[320px]"
            >
              {/* Panel Header */}
              <div className="flex items-center gap-2.5 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E31D2E]" />
                </span>
                <span className="text-[#111111] text-xs sm:text-sm font-black uppercase tracking-wider">
                  Performance-Driven Growth
                </span>
              </div>

              {/* Panel Check Items */}
              <div className="grid grid-cols-2 gap-2.5 pt-2.5 border-t border-neutral-200/80">
                {[
                  { name: "SEO" },
                  { name: "Branding" },
                  { name: "Content" },
                  { name: "Paid Ads" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-left">
                    <FiCheckCircle className="w-4 h-4 text-[#E31D2E] shrink-0" />
                    <span className="text-[#111111] text-xs font-black tracking-tight">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServiceCalculator() {
  const navigate = useNavigate();
  const location = useLocation();
  const calculatorRef = useRef(null);
  const expertiseRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalPlatform, setModalPlatform] = useState(null);
  const [selectedPlanInModal, setSelectedPlanInModal] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showBriefModal, setShowBriefModal] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // ── Marquee state ──
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const hoverRef = useRef(false);
  const interactingRef = useRef(false);
  const resumeTimeoutRef = useRef(null);
  const cardStepRef = useRef(360);
  const halfWidthRef = useRef(360 * servicesData.length);
  const [activeIndex, setActiveIndex] = useState(0);

  // Measure actual rendered card width + gap & center initial track so left side is pre-filled
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track || track.children.length < 2) return;
      const first = track.children[0];
      const second = track.children[1];
      const step = second.offsetLeft - first.offsetLeft;
      if (step > 0) {
        cardStepRef.current = step;
        const setWidth = step * servicesData.length;
        halfWidthRef.current = setWidth;

        // Initialize x position so preceding set pre-fills the left viewport edge
        const container = track.parentElement;
        if (container) {
          const containerWidth = container.offsetWidth;
          const cardWidth = first.offsetWidth || step;
          const centerOffset = (containerWidth - cardWidth) / 2;
          if (x.get() === 0) {
            x.set(centerOffset - setWidth);
          }
        }
      }
    };
    measure();
    const t1 = setTimeout(measure, 150);
    const t2 = setTimeout(measure, 600);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Click & Drag physics refs & state
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(null);
  const dragVelocityRef = useRef(0);

  const handlePointerDown = (e) => {
    if (interactingRef.current) return;
    if (e.button !== undefined && e.button !== 0) return;

    isDraggingRef.current = true;
    setIsDragging(true);
    lastPointerXRef.current = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : null);
    dragVelocityRef.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : null);
    if (currentX !== null && lastPointerXRef.current !== null) {
      const deltaX = currentX - lastPointerXRef.current;
      let next = x.get() + deltaX;
      
      // Continuous multi-set wrapping while dragging
      const setWidth = halfWidthRef.current || (cardStepRef.current * servicesData.length);
      if (next <= -setWidth * 2) next += setWidth;
      else if (next >= -setWidth * 0.5) next -= setWidth;

      x.set(next);
      dragVelocityRef.current = deltaX;
    }
    lastPointerXRef.current = currentX;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    lastPointerXRef.current = null;
  };

  // Global drag release listeners
  useEffect(() => {
    const onMove = (e) => {
      if (isDraggingRef.current) handlePointerMove(e);
    };
    const onUp = () => {
      if (isDraggingRef.current) handlePointerUp();
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Continuous physics engine & inertia — applies friction momentum decay on release,
  // wraps seamlessly, and updates activeIndex for the card closest to the horizontal viewport center.
  useAnimationFrame((t, delta) => {
    if (interactingRef.current) return;

    // Apply friction decay on drag release or continuous smooth auto-scroll
    if (!isDraggingRef.current) {
      if (Math.abs(dragVelocityRef.current) > 0.01) {
        dragVelocityRef.current *= 0.95;
        let next = x.get() + dragVelocityRef.current;
        const setWidth = halfWidthRef.current || (cardStepRef.current * servicesData.length);
        if (next <= -setWidth * 2) next += setWidth;
        else if (next >= -setWidth * 0.5) next -= setWidth;
        x.set(next);
      } else {
        dragVelocityRef.current = 0;
        // Continuous auto-scroll when not hovering over carousel
        if (!hoverRef.current) {
          const moveStep = (delta / 1000) * 35;
          let next = x.get() - moveStep;
          const setWidth = halfWidthRef.current || (cardStepRef.current * servicesData.length);
          if (next <= -setWidth * 2) next += setWidth;
          else if (next >= -setWidth * 0.5) next -= setWidth;
          x.set(next);
        }
      }
    }

    // Active state calculation: find card i whose horizontal center is closest to viewport center
    const track = trackRef.current;
    const container = track?.parentElement;
    if (track && container) {
      const viewportCenter = container.offsetWidth / 2;
      const cardWidth = track.children[0]?.offsetWidth || cardStepRef.current;
      const step = cardStepRef.current || 1;
      const currentX = x.get();

      let minDistance = Infinity;
      let centerCardOriginalIndex = 0;

      for (let i = 0; i < LOOPED_SERVICES.length; i++) {
        const cardCenter = currentX + (i * step) + (cardWidth / 2);
        const dist = Math.abs(cardCenter - viewportCenter);
        if (dist < minDistance) {
          minDistance = dist;
          centerCardOriginalIndex = i % servicesData.length;
        }
      }

      setActiveIndex((prev) => (prev === centerCardOriginalIndex ? prev : centerCardOriginalIndex));
    }
  });

  const [focusedService, setFocusedService] = useState(null);
  const [selectedDetailService, setSelectedDetailService] = useState(null);

  const pauseThenResume = (delay = 3000) => {
    interactingRef.current = true;
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      interactingRef.current = false;
    }, delay);
  };

  const goToIndex = (index, resumeDelay = 3000, explicitCardIndex = null) => {
    const track = trackRef.current;
    const container = track?.parentElement;
    if (!track || !container || track.children.length < 2) return;

    const first = track.children[0];
    const second = track.children[1];
    const actualStep = (second.offsetLeft - first.offsetLeft) || cardStepRef.current || 360;
    cardStepRef.current = actualStep;

    const containerWidth = container.offsetWidth;
    const cardWidth = first.offsetWidth || 340;
    const centerOffset = (containerWidth - cardWidth) / 2;
    const currentX = x.get();

    const normalized = ((index % servicesData.length) + servicesData.length) % servicesData.length;

    let targetCardIndex;
    if (typeof explicitCardIndex === "number" && explicitCardIndex >= 0) {
      targetCardIndex = explicitCardIndex;
    } else {
      let minDistance = Infinity;
      let bestCardIndex = servicesData.length + normalized;

      for (let k = normalized; k < LOOPED_SERVICES.length; k += servicesData.length) {
        const testTarget = centerOffset - (k * actualStep);
        const dist = Math.abs(testTarget - currentX);
        if (dist < minDistance) {
          minDistance = dist;
          bestCardIndex = k;
        }
      }
      targetCardIndex = bestCardIndex;
    }

    let target = centerOffset - (targetCardIndex * actualStep);

    // If target position causes continuous set boundary wrap, adjust boundary offset
    const setWidth = halfWidthRef.current || (actualStep * servicesData.length);
    if (target <= -setWidth * 2.5) {
      target += setWidth;
    } else if (target >= -setWidth * 0.2) {
      target -= setWidth;
    }

    pauseThenResume(resumeDelay);
    animate(x, target, { duration: 0.6, ease: [0.25, 1, 0.5, 1] });
    setActiveIndex(normalized);
  };

  useEffect(() => {
    const rawTarget =
      location.state?.highlightService ||
      location.state?.selectedService ||
      new URLSearchParams(location.search).get("service") ||
      (location.hash ? location.hash.replace("#", "") : null);

    if (rawTarget) {
      const cleanTarget = rawTarget.toLowerCase().replace(/-/g, " ");
      const matched = servicesData.find(
        (s) =>
          s.title.toLowerCase() === cleanTarget ||
          s.title.toLowerCase().includes(cleanTarget) ||
          cleanTarget.includes(s.title.toLowerCase())
      );

      if (matched) {
        const index = servicesData.indexOf(matched);
        const titleToFocus = matched.title;

        // Step 1: Immediately rotate carousel track so target card (e.g. ORM) is placed dead center
        const carouselTimer = setTimeout(() => {
          goToIndex(index, 4000);
        }, 150);

        // Step 2: Smooth-scroll page vertically so the carousel track container is centered in viewport
        const scrollTimer = setTimeout(() => {
          const el = trackRef.current?.parentElement || document.getElementById("expertise");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 300);

        // Step 3: Trigger pop highlight animation on card
        const focusTimer = setTimeout(() => {
          setFocusedService(titleToFocus);
        }, 800);

        // Step 4: After focus animation completes, clear focusedService
        const clearFocusTimer = setTimeout(() => {
          setFocusedService(null);
        }, 3500);

        return () => {
          clearTimeout(scrollTimer);
          clearTimeout(carouselTimer);
          clearTimeout(focusTimer);
          clearTimeout(clearFocusTimer);
        };
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, location.search, location.hash]);

  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile && !isMobile && modalPlatform) {
        setModalPlatform(null);
        setSelectedPlanInModal(null);
        sessionStorage.setItem('currentPlatformId', modalPlatform.id);
        navigate('/platform-plan');
      }
      setIsMobile(newIsMobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile, modalPlatform, navigate]);

  const restoreFromIds = (items) => {
    if (!Array.isArray(items)) return [];
    return items.map(item => {
      if (!item || typeof item !== 'object') return null;
      if (item.platform && item.plan) return item;
      if (item.platformId && item.planId) {
        const platform = PLATFORMS.find(p => p && p.id === item.platformId);
        const plan = platform?.plans?.find(p => p && p.id === item.planId);
        if (platform && plan) return { platform, plan };
      }
      return null;
    }).filter(Boolean);
  };

  useEffect(() => {
    const storedItems = sessionStorage.getItem('serviceCalculatorItems');
    if (storedItems) {
      try {
        const items = JSON.parse(storedItems);
        const restored = restoreFromIds(items);
        setSelectedItems(restored.slice(-1));
      } catch (e) { }
    }
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      try {
        const itemsToSave = (selectedItems || [])
          .filter(item => item && item.platform && item.plan)
          .map(item => ({
            platformId: item.platform.id,
            planId: item.plan.id
          }));
        sessionStorage.setItem('serviceCalculatorItems', JSON.stringify(itemsToSave));
      } catch (e) {
        console.error('Failed to save serviceCalculatorItems:', e);
      }
    }
  }, [selectedItems, isInitialLoad]);

  const handlePlatformClick = (platform, event) => {
    if (!platform) return;
    if (isMobile) {
      sessionStorage.setItem('currentPlatformId', platform.id);
      navigate('/platform-plan');
      return;
    }
    const rect = event?.currentTarget ? event.currentTarget.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
    setClickPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setModalPlatform(platform);
    setSelectedPlanInModal(null);
  };

  const applyPlan = (itemObj) => {
    if (!itemObj) return;

    const platformObj = itemObj.platform || modalPlatform;
    if (!platformObj) return;

    const isConfigured = Boolean(itemObj.configuredPrice);
    const planObj = isConfigured ? itemObj.plan : itemObj;

    const itemToStore = {
      platform: platformObj,
      plan: planObj,
      configuredPrice: isConfigured
        ? itemObj.configuredPrice
        : (platformObj.price || 0) + (planObj.price || 0),
      durationLabel: itemObj.durationLabel || itemObj.timeline || "Project Scope",
      durationMonths: itemObj.durationMonths || 1,
      deliverables: itemObj.deliverables || [],
      includedFeatures: itemObj.includedFeatures || [],
    };

    // Single option selection mode: replace with single selected item
    setSelectedItems([itemToStore]);

    setModalPlatform(null);
  };

  // servicesData is imported from ../data/servicesData.js

  const total = useMemo(() => {
    let sum = 0;
    if (Array.isArray(selectedItems)) {
      selectedItems.forEach((i) => {
        if (i && typeof i === "object") {
          if (typeof i.configuredPrice === "number") {
            sum += i.configuredPrice;
          } else {
            const platformPrice = typeof i.platform?.price === "number" ? i.platform.price : 0;
            const planPrice = typeof i.plan?.price === "number" ? i.plan.price : 0;
            sum += platformPrice + planPrice;
          }
        }
      });
    }
    return sum;
  }, [selectedItems]);

  const handleGetProposalClick = () => {
    let message = `Hello PRASKLA DIGITAL X, I’m interested in your marketing services proposal.\n\n`;
    message += `📋 *PROJECT PROPOSAL SUMMARY*\n`;

    if (Array.isArray(selectedItems) && selectedItems.length > 0) {
      message += `\n*Selected Configured Pillars (${selectedItems.length}):*\n`;
      selectedItems.forEach((i) => {
        if (i && i.platform && i.plan) {
          const pTitle = i.platform.title || "Service Pillar";
          const planTitle = i.plan.title || "Plan";
          const cost =
            typeof i.configuredPrice === "number"
              ? i.configuredPrice
              : (i.platform.price || 0) + (i.plan.price || 0);
          const duration = i.durationLabel ? ` (${i.durationLabel})` : "";
          message += `• ${pTitle} — ${planTitle}${duration}: ₹${cost.toLocaleString()}\n`;

          if (Array.isArray(i.deliverables) && i.deliverables.length > 0) {
            i.deliverables.forEach((d) => {
              if (d.type === "quantity") {
                message += `   - ${d.name}: ×${d.qty} ${d.unit || ""}\n`;
              } else if (d.type === "toggle" && d.enabled) {
                message += `   - ${d.name} (ON)\n`;
              }
            });
          }
        }
      });
    } else {
      message += `• Custom Plan Inquiry\n`;
    }

    message += `\n💰 *Total Investment Est.:* ₹${(total || 0).toLocaleString()}\n`;
    message += `\nPlease provide a detailed proposal and scope breakdown for my project.`;

    try {
      window.open(
        `https://wa.me/919566880740?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    } catch (err) {
      console.error("WhatsApp open error:", err);
    }
    setShowBriefModal(true);
  };

  const handleWhatsAppClick = handleGetProposalClick;

  return (
    <div className="relative w-full overflow-hidden bg-[#050609]">
      {/* Services-scoped Continuous Parallax Neptune Space Environment */}
      <ServicesSpaceBackground />

      {/* Main Services Content Sections */}
      <div className="relative z-10 w-full">
        {/* ── Hero Section — Shared HeroLayout baseline and vertical rhythm ── */}
        <HeroLayout
          bgElements={
            <>
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
                style={{
                  backgroundImage: "radial-gradient(circle, #fff 1.2px, transparent 1.2px)",
                  backgroundSize: "44px 44px",
                }}
              />
            </>
          }
          badge={
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionBadge text="Our Services" theme="dark" />
            </motion.div>
          }
          title={
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] font-black leading-[1.08] sm:leading-[1.1] tracking-[-0.035em] text-white font-sans mb-5 sm:mb-6 max-w-2xl"
            >
              Transforming Brands into{" "}
              <span className="text-[#E31D2E]">
                Digital Authority
              </span>
            </motion.h1>
          }
          description={
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-neutral-300 text-base sm:text-lg lg:text-[19px] font-normal leading-[1.6] font-sans max-w-2xl mb-7 sm:mb-8"
            >
              Comprehensive branding, media, and performance marketing solutions designed to help your business grow strategically, creatively, and profitably.
            </motion.p>
          }
        actions={
          <div className="flex flex-col items-center lg:items-start gap-3.5 relative z-10 w-full">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 w-full">
              <button
                type="button"
                onClick={() => {
                  calculatorRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="primary-btn px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider text-white shadow-md shadow-red-500/20 inline-flex items-center gap-2"
              >
                <span>Calculate Plan Estimate</span>
                <FiZap className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        }
        media={<HeroShowcase ourServicesImg={ourServicesImg} />}
      />

      {/* ── Auto-Scrolling Marquee Section with manual arrow/dot control ── */}
      <section ref={expertiseRef} id="services" className="relative w-full py-12 sm:py-14 lg:py-16 overflow-hidden bg-transparent">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 min-h-[520px]">
          
          {/* Section Heading & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center gap-2 mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Our <span className="text-[#FF2B2B]">Core Services</span>
            </h2>
            <div className="h-1.5 w-24 bg-[#FF2B2B] rounded-xl mb-1" />
            <p className="text-neutral-300 text-sm md:text-base font-medium max-w-md tracking-wide">
              Strategic services designed to accelerate modern brands.
            </p>
          </motion.div>

          <div className="relative w-full flex items-center justify-center">
            {/* Marquee viewport with smooth edge alpha fade mask (no square background boxes) */}
            <div
              onPointerDown={handlePointerDown}
              className={`relative w-full overflow-hidden select-none ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              style={{
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}
            >
              <motion.div
                ref={trackRef}
                className="flex gap-6 sm:gap-8 py-8"
                style={{ x, width: "max-content" }}
                onMouseEnter={() => { hoverRef.current = true; }}
                onMouseLeave={() => { hoverRef.current = false; }}
              >
                {LOOPED_SERVICES.map((service, i) => {
                  const originalIndex = i % servicesData.length;
                  const isHighlighted = activeIndex === originalIndex;
                  const isProgrammaticHover = Boolean(focusedService && service.title.toLowerCase() === focusedService.toLowerCase());

                  const isClone = i >= servicesData.length;

                  return (
                    <div
                      key={`${service.title}-${i}`}
                      aria-hidden={isClone ? "true" : undefined}
                      className="w-[85vw] sm:w-[320px] md:w-[340px] lg:w-[360px] flex-shrink-0"
                      onClick={() => {
                        goToIndex(originalIndex, 3000, i);
                        setFocusedService(service.title);
                        setSelectedDetailService(service);
                      }}
                    >
                      <div
                        tabIndex={isClone ? -1 : 0}
                        className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between items-start text-left h-[420px] cursor-pointer transition-all duration-300 ease-out group overflow-hidden select-none bg-white border ${
                          isProgrammaticHover || isHighlighted
                            ? 'border-[#111111] shadow-[0_20px_45px_rgba(0,0,0,0.14)] z-30'
                            : 'border-neutral-300 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-black/30 hover:shadow-[0_14px_32px_rgba(0,0,0,0.1)] z-10'
                        }`}
                      >
                        {/* Light Inner Glass Highlight */}
                        <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none z-0" />
                        
                        {/* Top Area — Floating Icon Container */}
                        <div className="relative mb-3.5">
                          {/* Outer Glow Ring */}
                          <div className={`absolute inset-0 rounded-2xl blur-md transition-all duration-500 ${
                            isProgrammaticHover ? 'bg-black/10 scale-110' : 'bg-black/5'
                          }`} />

                          {/* Icon Capsule */}
                          <div className={`relative z-10 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl p-2 border transition-all duration-500 flex items-center justify-center bg-gradient-to-br from-white via-white/95 to-white/70 shadow-[0_8px_20px_rgba(17,17,17,0.05)] ${
                            isProgrammaticHover ? 'border-black/40 shadow-[0_4px_16px_rgba(0,0,0,0.08)] -translate-y-1 rotate-[5deg]' : 'border-neutral-200'
                          }`}>
                            <img
                              src={service.image}
                              alt={service.title}
                              width="64"
                              height="64"
                              loading={isClone ? "lazy" : "eager"}
                              decoding="async"
                              className="w-full h-full object-cover rounded-2xl"
                            />
                          </div>
                        </div>

                        {/* Content Hierarchy */}
                        <div className="relative z-10 flex flex-col items-start w-full">
                          {/* Category Tag */}
                          <span className="px-2.5 py-0.5 rounded-xl text-[9px] font-extrabold uppercase tracking-[0.2em] bg-neutral-100 text-[#111111] border border-neutral-200 mb-2 inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                            {getServiceCategoryTag(service.title)}
                          </span>

                          {/* Title */}
                          <h3 className="text-lg md:text-xl font-extrabold leading-[1.1] mb-2 tracking-tight text-[#111111]">
                            {service.title}
                          </h3>

                          {/* Description */}
                          <p className="text-[#575757] font-medium text-xs sm:text-sm leading-relaxed mb-3.5">
                            {service.desc}
                          </p>
                        </div>

                        {/* Bottom Feature Deliverables — Replaces Learn More */}
                        <div className="relative z-10 w-full pt-3 mt-auto border-t border-black/10 flex flex-wrap items-center gap-1.5">
                          {getServiceHighlights(service.title).map((highlight, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-neutral-100 text-neutral-800 border border-neutral-200 flex items-center gap-1"
                            >
                              <span className="w-1 h-1 rounded-full bg-[#111111]" />
                              {highlight}
                            </span>
                          ))}
                        </div>

                        {/* Bottom Hover Accent Line */}
                        <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#111111] to-transparent transition-transform duration-700 ${
                          isProgrammaticHover ? 'scale-x-100' : 'scale-x-0'
                        }`} />
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

          </div>

          {/* Premium Pagination Dots */}
          <div className="flex justify-center items-center gap-3 mt-14">
            {servicesData.map((_, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to ${servicesData[i].title} service`}
                  className={`transition-all duration-500 cursor-pointer border border-transparent ${
                    isActive
                      ? "w-9 h-2.5 bg-[#E31D2E] rounded-xl scale-105 shadow-[0_2px_10px_rgba(0,0,0,0.12)]"
                      : "w-2.5 h-2.5 bg-neutral-300 hover:bg-neutral-400 rounded-xl"
                  }`}
                  onClick={() => goToIndex(i)}
                />
              );
            })}
          </div>

        </div>
      </section>

      {/* ── Pricing Calculator / Growth Package Estimator ── */}
      <div
        ref={calculatorRef}
        className="relative py-12 sm:py-14 lg:py-16 overflow-hidden bg-transparent"
      >
        {/* Subtle Decorative Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#E31D2E]/4 rounded-full blur-[160px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle,#111 1px,transparent 1px)", backgroundSize: "40px 40px" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center mb-16"
          >
            {/* Small Badge */}
            <div className="mb-4">
              <SectionBadge text="BUILD YOUR PLAN" theme="dark" />
            </div>

            {/* Large Heading */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
              Create Your <span className="text-[#E31D2E]">Digital Growth Package</span>
            </h2>

            {/* Small Supporting Paragraph */}
            <p className="text-neutral-300 text-base md:text-lg max-w-xl font-medium">
              Select the services you need and instantly preview your investment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Pillars */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-6 sm:p-8 md:p-9 rounded-2xl border border-gray-200/90 shadow-[0_20px_50px_rgba(17,17,17,0.05)] relative overflow-hidden">
                <div className="flex items-center justify-between mb-7 pb-4 border-b border-gray-100">
                  <h3 className="text-xs font-black text-[#111111] uppercase tracking-[0.2em] flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-xl bg-[#111111] animate-pulse" />
                    SELECT THE PACKAGES
                  </h3>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-xl">
                    {PLATFORMS.length} Available
                  </span>
                </div>

                {(() => {
                  const ICON_COMPONENT_MAP = {
                    FaGlobe,
                    FaLaptopCode,
                    FaMobileAlt,
                    FaBullhorn,
                    FaVideo,
                    FaShieldAlt,
                    FaLeaf,
                  };

                  const renderCard = (p) => {
                    if (!p) return null;
                    const isSelected = Array.isArray(selectedItems) && selectedItems.some((item) => item?.platform?.id === p.id);
                    const PlatformIcon = typeof p.icon === 'function' || typeof p.icon === 'object' ? p.icon : (ICON_COMPONENT_MAP[p.icon] || FaGlobe);
                    const pPrice = typeof p.price === 'number' ? p.price : 0;
                    const pTitle = p.title || 'Service Package';

                    return (
                      <button
                        key={p.id || pTitle}
                        type="button"
                        onClick={(e) => handlePlatformClick(p, e)}
                        className={`group relative p-5 rounded-xl border transition-all duration-300 text-left overflow-hidden flex items-center justify-between cursor-pointer min-h-[105px] ${
                          isSelected
                            ? "bg-[#111111] text-white border-[#111111] shadow-[0_14px_36px_rgba(0,0,0,0.12)] scale-[1.02] -translate-y-0.5"
                            : "bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-black/20 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
                        }`}
                      >
                        <div className="relative z-10 flex items-center gap-3.5">
                          {/* Floating Layered Icon Container */}
                          <div className={`relative w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 shrink-0 ${
                            isSelected
                              ? "bg-white text-[#111111] border-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] scale-105"
                              : "bg-white text-[#111111] border-gray-200 group-hover:border-black/20 group-hover:scale-105 group-hover:rotate-[6deg]"
                          }`}>
                            {PlatformIcon ? <PlatformIcon className="text-lg transition-transform duration-300" /> : null}
                          </div>

                          {/* Content */}
                          <div>
                            <div className={`font-extrabold text-sm sm:text-base leading-snug transition-colors duration-300 ${
                              isSelected ? "text-white" : "text-[#111111]"
                            }`}>
                              {pTitle}
                            </div>
                            <div className="text-xs font-bold mt-1 inline-flex items-center gap-1.5">
                              <span className={`font-black ${isSelected ? "text-white" : "text-[#111111]"}`}>₹{pPrice.toLocaleString()}</span>
                              <span className={`font-semibold text-[10px] uppercase tracking-wider ${isSelected ? "text-neutral-300" : "text-gray-400"}`}>base</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Indicator (Check or Arrow) */}
                        <div className="relative z-10 shrink-0 ml-2">
                          {isSelected ? (
                            <div className="w-7 h-7 rounded-xl bg-white text-[#111111] flex items-center justify-center shadow-md">
                              <FaCheckCircle className="text-xs text-[#111111]" />
                            </div>
                          ) : (
                            <div className="w-7 h-7 rounded-xl border border-gray-200 flex items-center justify-center bg-white group-hover:border-black/30 group-hover:bg-neutral-100 transition-all shadow-2xs">
                              <FaArrowRight className="text-gray-400 text-[10px] group-hover:text-[#111111] transition-colors" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  };

                  const marketingList = PLATFORMS.filter((p) => p && (p.id === "marketing" || p.id === "video"));
                  const techList = PLATFORMS.filter((p) => p && p.id !== "marketing" && p.id !== "video");

                  return (
                    <div className="space-y-7">
                      {/* Group 1: Digital Marketing */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-extrabold text-[#111111] uppercase tracking-[0.18em] bg-neutral-100 border border-neutral-200 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                            Digital Marketing
                          </span>
                          <div className="h-[1px] flex-1 bg-gradient-to-r from-neutral-300 via-neutral-200 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {marketingList.map((p) => renderCard(p))}
                        </div>
                      </div>

                      {/* Group 2: Technology */}
                      <div className="space-y-4 pt-1">
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-extrabold text-[#111111] uppercase tracking-[0.18em] bg-neutral-100 border border-neutral-200 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                            Technology
                          </span>
                          <div className="h-[1px] flex-1 bg-gradient-to-r from-neutral-300 via-neutral-200 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {techList.map((p) => renderCard(p))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Right Column: Redesigned Dashboard-Style Sticky Summary Card */}
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/90 shadow-[0_20px_50px_rgba(17,17,17,0.05)] relative overflow-hidden">
                  <div className="relative z-10 space-y-5">
                    {/* Header with Inline Status Badge */}
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                      <h3 className="text-xs font-black text-[#111111] uppercase tracking-[0.2em] flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-xl bg-[#111111]" />
                        Plan Summary
                      </h3>
                      <span className="px-3 py-1 rounded-xl text-[11px] font-bold uppercase tracking-wider bg-neutral-100 text-[#111111] border border-neutral-200">
                        {Array.isArray(selectedItems) ? selectedItems.length : 0} {selectedItems?.length === 1 ? "Pillar" : "Pillars"}
                      </span>
                    </div>

                    {/* Selected Services Area with Elegant Empty State */}
                    <div className="max-h-[300px] overflow-y-auto pr-1 space-y-2.5 custom-scrollbar">
                      <AnimatePresence mode="popLayout">
                        {!Array.isArray(selectedItems) || selectedItems.length === 0 ? (
                          <motion.div
                            key="empty-state"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="py-8 px-4 text-center border border-dashed border-gray-200 rounded-2xl bg-slate-50/50 flex flex-col items-center justify-center space-y-2.5"
                          >
                            <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[#111111] shadow-2xs">
                              <FiLayers className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-xs font-extrabold text-[#111111]">No services selected yet</h4>
                              <p className="text-[11px] text-gray-500 font-medium mt-1 leading-relaxed max-w-[240px] mx-auto">
                                Click one or more packages on the left to build your tailored growth plan.
                              </p>
                            </div>
                          </motion.div>
                        ) : (
                          selectedItems.map((item, idx) => {
                            if (!item || !item.platform || !item.plan) return null;
                            const platformTitle = item.platform.title || "Service";
                            const planTitle = item.plan.title || "Plan";
                            const itemPrice =
                              typeof item.configuredPrice === "number"
                                ? item.configuredPrice
                                : (item.platform.price || 0) + (item.plan.price || 0);

                            return (
                              <motion.div
                                key={`${item.platform.id || idx}-${item.plan.id || idx}`}
                                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="p-3.5 px-4 rounded-xl bg-slate-50/80 border border-slate-100 shadow-2xs hover:border-black/20 transition-all flex items-center justify-between group"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[#111111] shrink-0 font-bold">
                                    <FiCheckCircle className="w-4 h-4 text-[#111111]" />
                                  </div>
                                  <div>
                                    <div className="text-xs sm:text-sm font-extrabold text-[#111111] tracking-tight">{platformTitle}</div>
                                    <div className="text-[#111111] text-[10px] font-bold mt-0.5 inline-flex items-center gap-1.5">
                                      <MdStars className="text-xs text-[#111111]" />
                                      <span>{planTitle}</span>
                                      {item.durationLabel && (
                                        <span className="text-gray-500 font-semibold text-[9px] bg-gray-200/60 px-1.5 py-0.2 rounded-md">
                                          {item.durationLabel}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs sm:text-sm font-black text-[#111111]">₹{itemPrice.toLocaleString()}</span>
                                  <button
                                    type="button"
                                    onClick={() => setSelectedItems(prev => prev.filter((_, i) => i !== idx))}
                                    className="w-7 h-7 rounded-full bg-gray-200/60 hover:bg-neutral-200 text-gray-400 hover:text-[#111111] flex items-center justify-center transition-colors cursor-pointer"
                                    title="Remove service"
                                  >
                                    <FaTimesCircle className="text-xs" />
                                  </button>
                                </div>
                              </motion.div>
                            );
                          })
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Included Benefits Two-Column Checklist */}
                    <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100">
                      <div className="grid grid-cols-2 gap-2.5 text-[11px] font-bold text-gray-700">
                        <div className="flex items-center gap-1.5">
                          <FiCheckCircle className="text-[#111111] shrink-0 w-3.5 h-3.5" />
                          <span>Dedicated Support</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FiCheckCircle className="text-[#111111] shrink-0 w-3.5 h-3.5" />
                          <span>Strategy & Audits</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FiCheckCircle className="text-[#111111] shrink-0 w-3.5 h-3.5" />
                          <span>Timeline Planning</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FiCheckCircle className="text-[#111111] shrink-0 w-3.5 h-3.5" />
                          <span>Monthly Reporting</span>
                        </div>
                      </div>
                    </div>

                    {/* Investment Estimate & Proposal CTA */}
                    <div className="pt-4 border-t border-gray-100 space-y-4">
                      {/* High Contrast Clean Investment Display Card */}
                      <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-2xs relative overflow-hidden">
                        <div className="relative z-10">
                          <div className="text-gray-500 text-[10px] font-extrabold uppercase tracking-[0.2em] mb-1">
                            Estimated Investment
                          </div>
                          <AnimatedPriceDisplay value={total} textColor="text-[#111111]" />
                          <div className="text-gray-400 text-[10px] font-medium mt-1">
                            Includes base setup fee & selected pillars
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp Green CTA Button */}
                      <button
                        type="button"
                        onClick={handleGetProposalClick}
                        className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1eb757] text-white font-extrabold flex items-center justify-center gap-2.5 transition-all duration-200 shadow-[0_10px_25px_rgba(37,211,102,0.25)] hover:shadow-[0_14px_32px_rgba(37,211,102,0.4)] hover:-translate-y-0.5 active:scale-[0.98] text-xs sm:text-sm uppercase tracking-wider group cursor-pointer"
                      >
                        <IoLogoWhatsapp className="text-xl sm:text-2xl shrink-0" />
                        <span>GET DETAILED PROPOSAL</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1 font-bold">→</span>
                      </button>

                      <p className="text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest pt-0.5">
                        Final pricing subject to specific scope requirements
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Creative Collaborator Network ── */}
      <CollaboratorSection />

      {/* ── Ecosystem Partners ── */}
      <section className="py-12 sm:py-14 lg:py-16 border-t border-white/10 bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-white font-black uppercase tracking-[0.4em] text-xs sm:text-sm mb-12">Ecosystem Partners</h2>
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Edge fade masks matching dark background */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 z-20 bg-gradient-to-r from-[#050508] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 z-20 bg-gradient-to-l from-[#050508] to-transparent" />

          <div className="flex partners-marquee-track w-max py-2">
            {LOOPED_PARTNERS.map((partner, i) => (
              <div
                key={`${partner.alt}-${i}`}
                className="flex-shrink-0 mr-6 md:mr-8 w-[180px] h-[104px] md:w-[220px] md:h-[120px] rounded-xl
                           bg-white/90 border border-neutral-200/80 flex items-center justify-center px-5 py-3.5
                           hover:border-black/20 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]
                           hover:scale-105 transition-all duration-500 shadow-xs"
              >
                <img
                  src={partner.src}
                  alt={partner.alt}
                  className={`object-contain max-h-[85%] max-w-[85%] transition-transform duration-300 ${
                    partner.alt.includes("PRASKLA") || partner.alt.includes("Praskla")
                      ? "scale-125 md:scale-135"
                      : "scale-110 md:scale-120"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <PlatformPlanModal
        isOpen={!!modalPlatform}
        onClose={() => setModalPlatform(null)}
        clickPosition={clickPosition}
        platform={modalPlatform}
        selectedPlan={selectedPlanInModal}
        onSelectPlan={setSelectedPlanInModal}
        onApplyPlan={applyPlan}
      />

      <ContactForm
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
      />

      <ProjectBriefModal
        isOpen={showBriefModal}
        onClose={() => setShowBriefModal(false)}
        initialQuotationData={{ selectedItems, grandTotal: total }}
      />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(17, 17, 17, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(227, 29, 46, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(227, 29, 46, 0.4);
        }

        @keyframes partners-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        .partners-marquee-track {
          animation: partners-scroll 28s linear infinite;
        }
        .partners-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <ServiceDetailModal
        service={selectedDetailService}
        isOpen={Boolean(selectedDetailService)}
        onClose={() => setSelectedDetailService(null)}
      />
      </div>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="clay-card p-8 md:p-10">
      <h3 className="text-xs font-black text-[#575757] uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-[#E31D2E]/20" />
        {title}
      </h3>
      {children}
    </div>
  );
}

const FaArrowRight = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);