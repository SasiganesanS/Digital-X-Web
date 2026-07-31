import React, { useMemo, useState, useEffect, useRef } from "react";
import HeroLayout from "./common/HeroLayout";
import "./ServiceCalculator.css";
import balajiPortraits from '../assets/tie/Balaji-Portraits.jpg';
import ibodhiAcademy from '../assets/tie/ibodhi-academy-removebg.png';
import vilcet from '../assets/tie/VILCET-removebg.png';
import shipyon from '../assets/tie/Shipyon.png';
import pt from '../assets/tie/pt.png';
import ourServicesImg from "../assets/services-img/digital.jpeg";
import servicesData from "../data/servicesData";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
  animate,
  useTransform,
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

// Duplicated service list so the marquee track can loop seamlessly
const LOOPED_SERVICES = [...servicesData, ...servicesData];

// Category tag mapping for services
const getServiceCategoryTag = (title = "") => {
  const t = title.toLowerCase();
  if (t.includes("seo")) return "Strategy";
  if (t.includes("ssm") || t.includes("social")) return "Marketing";
  if (t.includes("ads")) return "Paid Media";
  if (t.includes("web") || t.includes("design")) return "Creative";
  if (t.includes("video") || t.includes("production")) return "Production";
  if (t.includes("analytics") || t.includes("report")) return "Analytics";
  if (t.includes("content")) return "Creative";
  if (t.includes("e-commerce") || t.includes("ecommerce")) return "Performance";
  if (t.includes("email")) return "Marketing";
  if (t.includes("influencer")) return "Strategy";
  if (t.includes("performance")) return "Performance";
  if (t.includes("orm")) return "Reputation";
  return "Marketing";
};

// Partner logos for the auto-scrolling "Ecosystem Partners" strip
const PARTNERS = [
  { src: balajiPortraits, alt: "Balaji Portraits" },
  { src: ibodhiAcademy, alt: "iBodhi Academy" },
  { src: vilcet, alt: "VILCET" },
  { src: pt, alt: "Praskla Technology" },
  { src: shipyon, alt: "Shipyon" },
];
const LOOPED_PARTNERS = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

// ── Services Hero Helper Components ──
function AnimatedPriceDisplay({ value = 5000 }) {
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
    <div className="flex items-baseline gap-1 text-4xl sm:text-[2.75rem] font-black text-[#111111] tracking-tight">
      <span className="text-[#E31D2E] text-2xl sm:text-3xl font-black">₹</span>
      <span>{numToFormat.toLocaleString()}</span>
    </div>
  );
}

function HeroAnimatedStat({ targetNum, suffix = "+", label, icon: Icon, delay = 0 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1800; // ms
    const numVal = parseInt(targetNum, 10) || 0;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Smooth easeOutCubic
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
  }, [targetNum, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 + delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="clay-card relative flex items-center gap-3.5 p-4 px-5 sm:px-6 rounded-[1.75rem] border border-white/70 shadow-[0_10px_28px_rgba(17,17,17,0.03)] backdrop-blur-xl bg-white/75 hover:bg-white/90 cursor-default group transition-all duration-300 min-w-[135px] sm:min-w-[160px]"
    >
      {/* Light glass highlight overlay */}
      <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-white/70 via-transparent to-transparent pointer-events-none" />

      {/* Icon container */}
      {Icon && (
        <div className="relative z-10 p-2.5 rounded-2xl bg-[#E31D2E]/10 text-[#E31D2E] group-hover:bg-[#E31D2E] group-hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        <span className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight group-hover:text-[#E31D2E] transition-colors duration-300">
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
      className="relative w-full max-w-xl mx-auto lg:max-w-none perspective-[1000px] select-none"
    >
      {/* 3D Container Wrapper */}
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative transition-transform duration-300 ease-out transform-gpu cursor-pointer"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Claymorphic Outer Showcase Frame */}
        <div className={`relative rounded-[2.5rem] p-3.5 sm:p-4 bg-white/50 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_rgba(17,17,17,0.06)] transition-all duration-500 overflow-visible ${
          isHovered ? "border-[#E31D2E]/40 shadow-[0_25px_60px_rgba(227,29,46,0.16)] bg-white/70" : ""
        }`}>
          
          {/* Inner Light Highlight Reflection */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-white/80 via-transparent to-white/40 pointer-events-none z-10" />

          {/* Image Container with Parallax Effect */}
          <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3]">
            <img
              src={ourServicesImg}
              alt="Digital Marketing Strategy"
              className="w-full h-full object-cover transition-transform duration-500 ease-out scale-[1.06]"
              style={{
                transform: isHovered
                  ? `scale(1.12) translate(${tilt.px}px, ${tilt.py}px)`
                  : "scale(1.06)",
              }}
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />
          </div>

          {/* SERVICE HIGHLIGHT PANEL — Floating Glass Overlay overlapping bottom of image by ~20% */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="absolute -bottom-5 left-6 sm:-bottom-6 sm:left-8 z-30 p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_20px_45px_rgba(17,17,17,0.12)] max-w-[240px] sm:max-w-[280px]"
          >
            {/* Panel Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E31D2E]" />
              </span>
              <span className="text-[#111111] text-[11px] sm:text-xs font-black uppercase tracking-wider">
                Performance-Driven Growth
              </span>
            </div>

            {/* Panel Check Items */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-black/5">
              {[
                { name: "SEO" },
                { name: "Branding" },
                { name: "Content" },
                { name: "Paid Ads" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-left">
                  <FiCheckCircle className="w-3.5 h-3.5 text-[#E31D2E] shrink-0" />
                  <span className="text-[#333333] text-[11px] font-bold tracking-tight">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServiceCalculator() {
  const navigate = useNavigate();
  const location = useLocation();
  const calculatorRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalPlatform, setModalPlatform] = useState(null);
  const [selectedPlanInModal, setSelectedPlanInModal] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
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

  // Measure actual rendered card width + gap so navigation lands exactly on a card,
  // no matter the responsive card size.
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track || track.children.length < 2) return;
      const first = track.children[0];
      const second = track.children[1];
      const step = second.offsetLeft - first.offsetLeft;
      if (step > 0) {
        cardStepRef.current = step;
        halfWidthRef.current = step * servicesData.length;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Continuous auto-scroll — pauses while hovered or while the user is
  // actively interacting via an arrow/dot click.
  useAnimationFrame((t, delta) => {
    if (hoverRef.current || interactingRef.current) return;
    const speed = 0.045; // px per ms
    let next = x.get() - speed * delta;
    const half = halfWidthRef.current || 1;
    if (next <= -half) next += half;
    x.set(next);

    const step = cardStepRef.current || 1;
    const rawIndex = Math.round(-next / step);
    const normalized = ((rawIndex % servicesData.length) + servicesData.length) % servicesData.length;
    setActiveIndex((prev) => (prev === normalized ? prev : normalized));
  });

  const pauseThenResume = (delay = 3000) => {
    interactingRef.current = true;
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      interactingRef.current = false;
    }, delay);
  };

  const goToIndex = (index, resumeDelay = 3000) => {
    const normalized = ((index % servicesData.length) + servicesData.length) % servicesData.length;
    const target = -(normalized * cardStepRef.current);
    pauseThenResume(resumeDelay);
    animate(x, target, { duration: 0.6, ease: "easeInOut" });
    setActiveIndex(normalized);
  };

  useEffect(() => {
    if (location.state?.highlightService) {
      const targetService = location.state.highlightService;
      const index = servicesData.findIndex(s => s.title.toLowerCase() === targetService.toLowerCase() || s.title.toLowerCase().includes(targetService.toLowerCase()));
      if (index !== -1) {
        // Scroll to the expertise section first
        setTimeout(() => {
          const expertiseSection = document.getElementById("expertise");
          if (expertiseSection) {
            expertiseSection.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 150);

        // Jump the marquee to that card and hold it a little longer than usual
        setTimeout(() => {
          goToIndex(index, 4500);
        }, 600);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

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
        setSelectedItems(restoreFromIds(items));
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

  const applyPlan = (plan) => {
    if (!modalPlatform || !plan) return;
    setSelectedItems(prev => {
      const current = Array.isArray(prev) ? prev : [];
      const exists = current.find(i => i?.platform?.id === modalPlatform.id && i?.plan?.id === plan.id);
      if (exists) return current;
      return [...current, { platform: modalPlatform, plan }];
    });
    setModalPlatform(null);
  };

  // servicesData is imported from ../data/servicesData.js

  const total = useMemo(() => {
    let sum = 5000;
    if (Array.isArray(selectedItems)) {
      selectedItems.forEach(i => {
        if (i && typeof i === 'object') {
          const platformPrice = typeof i.platform?.price === 'number' ? i.platform.price : 0;
          const planPrice = typeof i.plan?.price === 'number' ? i.plan.price : 0;
          sum += platformPrice + planPrice;
        }
      });
    }
    return sum;
  }, [selectedItems]);

  const handleGetProposalClick = () => {
    let message = `Hello Praskla DigitalX, I’m interested in your marketing services proposal.\n\n`;
    message += `📋 *PLAN SUMMARY*\n`;
    message += `• Base Setup Fee: ₹5,000\n`;
    
    if (Array.isArray(selectedItems) && selectedItems.length > 0) {
      message += `\n*Selected Pillars (${selectedItems.length}):*\n`;
      selectedItems.forEach(i => {
        if (i && i.platform && i.plan) {
          const pTitle = i.platform.title || 'Service Pillar';
          const planTitle = i.plan.title || 'Plan';
          const cost = (i.platform.price || 0) + (i.plan.price || 0);
          message += `• ${pTitle} — ${planTitle}: ₹${cost.toLocaleString()}\n`;
        }
      });
    } else {
      message += `• Custom Plan Inquiry\n`;
    }
    
    message += `\n💰 *Total Investment Est.:* ₹${(total || 0).toLocaleString()}\n`;
    message += `\nPlease provide a detailed proposal and scope breakdown for my project.`;

    try {
      window.open(`https://wa.me/919500690740?text=${encodeURIComponent(message)}`, "_blank");
    } catch (err) {
      console.error('WhatsApp open error:', err);
    }
    setShowContactForm(true);
  };

  const handleWhatsAppClick = handleGetProposalClick;

  return (
    <div className="bg-[#080808] min-h-screen text-white pt-0 overflow-hidden font-outfit">
      {/* ── Hero Section — Shared HeroLayout baseline and vertical rhythm ── */}
      <HeroLayout
        bgElements={
          <>
            <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#E31D2E]/6 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#E31D2E]/5 rounded-full blur-[140px] pointer-events-none" />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#E31D2E]/3 blur-[120px] pointer-events-none"
            />
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
            className="relative inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-[#E31D2E]/25 bg-white/70 shadow-[0_8px_20px_rgba(17,17,17,0.04)] backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31D2E]" />
            </span>
            <span className="relative text-[#111111] text-xs font-black tracking-[0.25em] uppercase">
              Our Services
            </span>
          </motion.div>
        }
        title={
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-[52px] font-black leading-[1.08] tracking-tight text-[#111111]"
          >
            Transforming Brands into <br className="hidden sm:block" />
            <span className="text-[#E31D2E] relative inline-block">
              Digital Authority
            </span>
          </motion.h1>
        }
        description={
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#575757] text-base sm:text-lg leading-relaxed font-medium"
          >
            Comprehensive branding, media, and performance marketing solutions designed to help your business grow strategically, creatively, and profitably.
          </motion.p>
        }
        actions={
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 relative z-10 w-full justify-center lg:justify-start">
            <HeroAnimatedStat
              targetNum="15"
              suffix="+"
              label="Clients"
              icon={FiUsers}
              delay={0}
            />
            <HeroAnimatedStat
              targetNum="20"
              suffix="+"
              label="Projects"
              icon={FiBriefcase}
              delay={0.1}
            />
            <HeroAnimatedStat
              targetNum="6"
              suffix=""
              label="Services"
              icon={FiLayers}
              delay={0.2}
            />
          </div>
        }
        media={<HeroShowcase ourServicesImg={ourServicesImg} />}
      />

      {/* ── Auto-Scrolling Marquee Section with manual arrow/dot control ── */}
      <section id="expertise" className="relative w-full py-12 sm:py-14 lg:py-16 overflow-hidden bg-transparent">
        {/* Subtle Decorative Background Elements (Section only) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#E31D2E]/4 rounded-full blur-[160px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle,#111 1px,transparent 1px)", backgroundSize: "40px 40px" }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 min-h-[520px]">
          
          {/* Section Heading & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center gap-2 mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#111111] tracking-tight">
              Our <span className="text-[#E31D2E]">Core Expertise</span>
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-[#E31D2E] to-transparent rounded-full mb-1" />
            <p className="text-[#575757] text-sm md:text-base font-medium max-w-md tracking-wide">
              Strategic services designed to accelerate modern brands.
            </p>
          </motion.div>

          <div className="relative w-full flex items-center justify-center">

            {/* Marquee viewport */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
              }}
            >
              {/* Left/right fade masks */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 md:w-24 z-20 bg-gradient-to-r from-[#f1eaeaff] to-transparent opacity-80" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 md:w-24 z-20 bg-gradient-to-l from-[#f1eaeaff] to-transparent opacity-80" />

              <motion.div
                ref={trackRef}
                className="flex gap-6 sm:gap-8 py-10"
                style={{ x, width: "max-content" }}
                onMouseEnter={() => { hoverRef.current = true; }}
                onMouseLeave={() => { hoverRef.current = false; }}
              >
                {LOOPED_SERVICES.map((service, i) => {
                  const originalIndex = i % servicesData.length;
                  const isHighlighted = activeIndex === originalIndex;

                  return (
                    <div
                      key={`${service.title}-${i}`}
                      className="w-[85vw] sm:w-[320px] md:w-[340px] lg:w-[360px] flex-shrink-0"
                    >
                      <div
                        className={`relative rounded-[2.25rem] md:rounded-[2.5rem] p-7 md:p-8 pt-9 md:pt-10 flex flex-col justify-between items-start text-left min-h-[420px] md:min-h-[440px] cursor-pointer transition-all duration-500 ease-out group border overflow-hidden select-none ${
                          isHighlighted
                            ? 'border-[#E31D2E]/70 bg-white shadow-[0_20px_50px_rgba(227,29,46,0.14)] -translate-y-4 scale-[1.03] opacity-100 z-10'
                            : 'border-neutral-200/80 bg-white/75 shadow-[0_10px_30px_rgba(17,17,17,0.03)] hover:border-[#E31D2E]/50 hover:bg-white hover:-translate-y-2 opacity-90 hover:opacity-100'
                        }`}
                      >
                        {/* Light Inner Glass Highlight */}
                        <div className="absolute inset-0 rounded-[2.25rem] md:rounded-[2.5rem] bg-gradient-to-br from-white/80 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Top Area — Floating Icon Container */}
                        <div className="relative mb-6">
                          {/* Outer Glow Ring */}
                          <div className={`absolute inset-0 rounded-full blur-md transition-all duration-500 ${
                            isHighlighted ? 'bg-[#E31D2E]/25 scale-110' : 'bg-[#E31D2E]/10 group-hover:bg-[#E31D2E]/20 group-hover:scale-110'
                          }`} />

                          {/* Glass Icon Capsule */}
                          <div className={`relative z-10 w-20 h-20 sm:w-22 sm:h-22 rounded-full p-2 border transition-all duration-500 flex items-center justify-center bg-gradient-to-br from-white via-white/95 to-white/70 shadow-[0_10px_25px_rgba(17,17,17,0.06)] group-hover:-translate-y-1.5 group-hover:rotate-[6deg] ${
                            isHighlighted ? 'border-[#E31D2E] shadow-[0_0_25px_rgba(227,29,46,0.25)]' : 'border-[#E31D2E]/20 group-hover:border-[#E31D2E]'
                          }`}>
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        </div>

                        {/* Content Hierarchy */}
                        <div className="relative z-10 flex flex-col items-start w-full">
                          {/* Category Tag */}
                          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] bg-[#E31D2E]/10 text-[#E31D2E] border border-[#E31D2E]/15 mb-3 inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E31D2E]" />
                            {getServiceCategoryTag(service.title)}
                          </span>

                          {/* Title */}
                          <h3 className="text-xl md:text-2xl font-black text-[#111111] mb-2.5 tracking-tight group-hover:text-[#E31D2E] transition-colors duration-300">
                            {service.title}
                          </h3>

                          {/* Description */}
                          <p className="text-[#575757] font-medium text-xs sm:text-sm leading-relaxed line-clamp-3 mb-6 transition-colors duration-300">
                            {service.desc}
                          </p>
                        </div>

                        {/* Bottom Action — Inline CTA */}
                        <div className="relative z-10 flex items-center gap-2 pt-2 text-[#111111] font-bold text-xs uppercase tracking-wider group-hover:text-[#E31D2E] transition-colors duration-300">
                          <span className="relative">
                            Learn More
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E31D2E] group-hover:w-full transition-all duration-300" />
                          </span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-[#E31D2E]">→</span>
                        </div>

                        {/* Bottom Hover Accent Glow Line */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E31D2E] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
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
                      ? "w-9 h-2.5 bg-[#E31D2E] rounded-full scale-105 shadow-[0_2px_10px_rgba(227,29,46,0.4)]"
                      : "w-2.5 h-2.5 bg-neutral-300 hover:bg-neutral-400 rounded-full"
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
            <div className="relative inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-[#E31D2E]/25 bg-white/70 shadow-[0_8px_20px_rgba(17,17,17,0.04)] backdrop-blur-md mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31D2E]" />
              </span>
              <span className="relative text-[#111111] text-xs font-black tracking-[0.25em] uppercase">
                BUILD YOUR PLAN
              </span>
            </div>

            {/* Large Heading */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#111111] tracking-tight mb-4">
Create Your <span className="text-[#E31D2E]">Digital Growth Package</span>
            </h2>

            {/* Small Supporting Paragraph */}
            <p className="text-[#575757] text-base md:text-lg max-w-xl font-medium">
              Select the services you need and instantly preview your investment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Pillars */}
            <div className="lg:col-span-7 space-y-6">
              <div className="clay-card p-6 sm:p-8 md:p-10 rounded-[2.25rem]">
                <h3 className="text-xs font-black text-[#575757] uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                  <span className="w-8 h-[1.5px] bg-[#E31D2E]" />
                  Select Service Pillars
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
                  {PLATFORMS.map((p) => {
                    if (!p) return null;
                    const isSelected = Array.isArray(selectedItems) && selectedItems.some((item) => item?.platform?.id === p.id);
                    const PlatformIcon = typeof p.icon === 'function' || typeof p.icon === 'object' ? p.icon : null;
                    const pPrice = typeof p.price === 'number' ? p.price : 0;
                    const pTitle = p.title || 'Service Pillar';

                    return (
                      <button
                        key={p.id || pTitle}
                        onClick={(e) => handlePlatformClick(p, e)}
                        className={`group relative p-5 sm:p-6 rounded-[2rem] bg-white/75 backdrop-blur-xl border transition-all duration-500 text-left overflow-hidden flex items-center justify-between cursor-pointer min-h-[110px] ${
                          isSelected
                            ? "border-[#E31D2E] bg-white shadow-[0_16px_40px_rgba(227,29,46,0.14)] scale-[1.02] -translate-y-1"
                            : "border-white/80 shadow-[0_10px_30px_rgba(17,17,17,0.03)] hover:border-[#E31D2E]/50 hover:bg-white hover:-translate-y-1 hover:scale-[1.02]"
                        }`}
                      >
                        {/* Light Inner Glass Highlight */}
                        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/80 via-transparent to-transparent pointer-events-none" />

                        <div className="relative z-10 flex items-center gap-4">
                          {/* Floating Layered Icon Container */}
                          <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 shadow-sm ${
                            isSelected
                              ? "bg-[#E31D2E] text-white border-[#E31D2E] shadow-[0_0_15px_rgba(227,29,46,0.4)]"
                              : "bg-gradient-to-br from-white via-white/95 to-white/70 text-[#E31D2E] border-white/90 group-hover:rotate-[8deg] group-hover:scale-110"
                          }`}>
                            {PlatformIcon ? <PlatformIcon className="text-xl transition-transform duration-300" /> : null}
                          </div>

                          {/* Content */}
                          <div>
                            <div className="font-black text-[#111111] text-base sm:text-lg group-hover:text-[#E31D2E] transition-colors duration-300">
                              {pTitle}
                            </div>
                            <div className="text-[#E31D2E] text-xs sm:text-sm font-black mt-0.5 inline-flex items-center gap-1.5">
                              <span>₹{pPrice.toLocaleString()}</span>
                              <span className="text-[#8B8B8B] font-bold text-[10px] uppercase tracking-wider">base</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Indicator (Check or Arrow) */}
                        <div className="relative z-10">
                          {isSelected ? (
                            <div className="w-8 h-8 rounded-full bg-[#E31D2E] text-white flex items-center justify-center shadow-md animate-pulse">
                              <FaCheckCircle className="text-sm" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#E31D2E] group-hover:bg-[#E31D2E]/10 transition-all bg-white shadow-sm">
                              <FaArrowRight className="text-[#8B8B8B] text-xs group-hover:text-[#E31D2E] transition-colors" />
                            </div>
                          )}
                        </div>

                        {/* Bottom Glow Line on hover/selected */}
                        <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E31D2E] to-transparent transition-transform duration-500 ${
                          isSelected ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Redesigned Dashboard-Style Sticky Summary Card */}
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <div className="bg-white p-6 sm:p-7 rounded-[2.25rem] border border-gray-200/80 shadow-[0_20px_50px_rgba(17,17,17,0.06)] relative overflow-hidden">
                  
                  {/* Subtle top accent gradient */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E31D2E] via-red-400 to-[#E31D2E]" />

                  <div className="relative z-10 space-y-5">
                    {/* Header with Inline Status Badge */}
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                      <h3 className="text-xs font-black text-[#111111] uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#E31D2E]" />
                        PLAN SUMMARY
                      </h3>
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-50 text-[#E31D2E] border border-red-100 shadow-2xs">
                        {Array.isArray(selectedItems) ? selectedItems.length : 0} {selectedItems?.length === 1 ? "Selected Pillar" : "Selected Pillars"}
                      </span>
                    </div>

                    {/* Premium Base Setup Fee Card */}
                    <div className="flex justify-between items-center p-4 px-4.5 bg-gray-50/80 rounded-2xl border border-gray-100/90 shadow-2xs">
                      <div>
                        <div className="text-[#111111] font-extrabold text-xs sm:text-sm tracking-tight">
                          Base Setup Fee
                        </div>
                        <div className="text-[#6B7280] text-[11px] font-normal mt-0.5">
                          One-time onboarding & planning fee
                        </div>
                      </div>
                      <span className="font-black text-[#111111] text-base sm:text-lg">₹5,000</span>
                    </div>

                    {/* Selected Services Area with Elegant Empty State */}
                    <div className="max-h-[320px] overflow-y-auto pr-1 space-y-2.5 custom-scrollbar">
                      <AnimatePresence mode="popLayout">
                        {!Array.isArray(selectedItems) || selectedItems.length === 0 ? (
                          <motion.div
                            key="empty-state"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="py-8 px-4 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/40 flex flex-col items-center justify-center space-y-2"
                          >
                            <div className="w-11 h-11 rounded-full bg-red-50/80 border border-red-100 flex items-center justify-center text-[#E31D2E] shadow-2xs">
                              <FiLayers className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-[#111111]">No services selected yet</h4>
                              <p className="text-[11px] text-[#6B7280] font-normal mt-1 leading-relaxed max-w-[240px] mx-auto">
                                Choose one or more service pillars from the left to build your custom proposal.
                              </p>
                            </div>
                          </motion.div>
                        ) : (
                          selectedItems.map((item, idx) => {
                            if (!item || !item.platform || !item.plan) return null;
                            const platformTitle = item.platform.title || "Service";
                            const planTitle = item.plan.title || "Plan";
                            const itemPrice = (item.platform.price || 0) + (item.plan.price || 0);

                            return (
                              <motion.div
                                key={`${item.platform.id || idx}-${item.plan.id || idx}`}
                                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="p-3.5 px-4 rounded-xl bg-gray-50/80 border border-gray-100 shadow-2xs hover:border-red-200 transition-all flex items-center justify-between group"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-[#E31D2E] shrink-0 font-bold">
                                    <FiCheckCircle className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-xs sm:text-sm font-extrabold text-[#111111] tracking-tight">{platformTitle}</div>
                                    <div className="text-[#E31D2E] text-[10px] font-bold mt-0.5 inline-flex items-center gap-1">
                                      <MdStars className="text-xs" />
                                      {planTitle}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs sm:text-sm font-black text-[#111111]">₹{itemPrice.toLocaleString()}</span>
                                  <button
                                    type="button"
                                    onClick={() => setSelectedItems(prev => prev.filter((_, i) => i !== idx))}
                                    className="w-7 h-7 rounded-full bg-gray-200/60 hover:bg-red-50 text-gray-400 hover:text-[#E31D2E] flex items-center justify-center transition-colors"
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
                    <div className="p-3.5 bg-gray-50/70 rounded-2xl border border-gray-100">
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-[#374151]">
                        <div className="flex items-center gap-1.5">
                          <FiCheckCircle className="text-[#E31D2E] shrink-0 w-3.5 h-3.5" />
                          <span>Dedicated Support</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiCheckCircle className="text-[#E31D2E] shrink-0 w-3.5 h-3.5" />
                          <span>Strategy & Audits</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiCheckCircle className="text-[#E31D2E] shrink-0 w-3.5 h-3.5" />
                          <span>Timeline Planning</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiCheckCircle className="text-[#E31D2E] shrink-0 w-3.5 h-3.5" />
                          <span>Monthly Reporting</span>
                        </div>
                      </div>
                    </div>

                    {/* Investment Estimate & Proposal CTA */}
                    <div className="pt-4 border-t border-gray-100 space-y-4">
                      <div className="bg-gray-50/90 p-4 rounded-2xl border border-gray-100">
                        <div className="text-[#6B7280] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                          Estimated Investment
                        </div>
                        <AnimatedPriceDisplay value={total} />
                        <div className="text-[#9CA3AF] text-[10px] font-medium mt-1">
                          Includes base setup fee & selected pillars
                        </div>
                      </div>

                      {/* CTA Button: STAYS GREEN ON HOVER */}
                      <button
                        type="button"
                        onClick={handleGetProposalClick}
                        className="w-full py-3.5 sm:py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1eb757] text-white font-extrabold flex items-center justify-center gap-2.5 transition-all duration-200 shadow-[0_10px_25px_rgba(37,211,102,0.25)] hover:shadow-[0_14px_32px_rgba(37,211,102,0.4)] hover:-translate-y-0.5 hover:scale-[1.005] active:scale-[0.98] text-xs sm:text-sm uppercase tracking-wider group"
                      >
                        <IoLogoWhatsapp className="text-xl sm:text-2xl" />
                        <span>GET DETAILED PROPOSAL</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1 font-bold">→</span>
                      </button>

                      <p className="text-center text-[#9CA3AF] text-[10px] font-semibold uppercase tracking-widest pt-1">
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

      {/* ── Ecosystem Partners ── */}
      <section className="py-12 sm:py-14 lg:py-16 border-t border-gray-200 bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-[#575757] font-black uppercase tracking-[0.4em] text-xs mb-16">Ecosystem Partners</h2>
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Fade masks so logos don't hard-cut at the edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 z-20 bg-gradient-to-r from-[#F3E9E9] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 z-20 bg-gradient-to-l from-[#F3E9E9] to-transparent" />

          <div className="flex partners-marquee-track w-max py-2">
            {LOOPED_PARTNERS.map((partner, i) => (
              <div
                key={`${partner.alt}-${i}`}
                className="flex-shrink-0 mr-6 md:mr-8 w-[160px] h-[96px] md:w-[190px] md:h-[110px] rounded-2xl
                           bg-white/60 border border-white/80 flex items-center justify-center p-5
                           hover:border-[#E31D2E]/40 hover:shadow-[0_8px_24px_rgba(227,29,46,0.08)]
                           hover:scale-105 transition-all duration-500 shadow-sm"
              >
                <img
                  src={partner.src}
                  alt={partner.alt}
                  className="max-w-full max-h-full w-auto h-auto object-contain"
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