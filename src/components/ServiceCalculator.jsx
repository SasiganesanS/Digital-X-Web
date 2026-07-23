import React, { useMemo, useState, useEffect, useRef } from "react";
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
} from "react-icons/fa";
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

// Partner logos for the auto-scrolling "Ecosystem Partners" strip
const PARTNERS = [
  { src: balajiPortraits, alt: "Balaji Portraits" },
  { src: ibodhiAcademy, alt: "iBodhi Academy" },
  { src: vilcet, alt: "VILCET" },
  { src: pt, alt: "Praskla Technology" },
  { src: shipyon, alt: "Shipyon" },
];
const LOOPED_PARTNERS = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

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
    return items.map(item => {
      if (item.platformId && item.planId) {
        const platform = PLATFORMS.find(p => p.id === item.platformId);
        const plan = platform?.plans?.find(p => p.id === item.planId);
        if (platform && plan) return { platform, plan };
      }
      return item;
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
      const itemsToSave = selectedItems.map(item => ({
        platformId: item.platform.id,
        planId: item.plan.id
      }));
      sessionStorage.setItem('serviceCalculatorItems', JSON.stringify(itemsToSave));
    }
  }, [selectedItems, isInitialLoad]);

  const handlePlatformClick = (platform, event) => {
    if (isMobile) {
      sessionStorage.setItem('currentPlatformId', platform.id);
      navigate('/platform-plan');
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    setClickPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setModalPlatform(platform);
    setSelectedPlanInModal(null);
  };

  const applyPlan = (plan) => {
    setSelectedItems(prev => {
      const exists = prev.find(i => i.platform.id === modalPlatform.id && i.plan.id === plan.id);
      if (exists) return prev;
      return [...prev, { platform: modalPlatform, plan }];
    });
    setModalPlatform(null);
  };

  // servicesData is imported from ../data/servicesData.js

  const total = useMemo(() => {
    let sum = 5000;
    selectedItems.forEach(i => {
      sum += (i.platform.price || 0) + (i.plan.price || 0);
    });
    return sum;
  }, [selectedItems]);

  const handleWhatsAppClick = () => {
    let message = `Hello Praskla DigitalX, I’m interested in your marketing services. Breakdown:\n\nBase Fee: ₹5,000\n`;
    selectedItems.forEach(i => {
      message += `- ${i.platform.title} (${i.plan.title}): ₹${((i.platform.price || 0) + (i.plan.price || 0)).toLocaleString()}\n`;
    });
    message += `\nTotal Estimate: ₹${total.toLocaleString()}`;
    window.open(`https://wa.me/919500690740?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="bg-[#080808] min-h-screen text-white pt-24 overflow-hidden font-outfit">
      {/* ── Hero Section — Split Layout: Text Left, Image Right ── */}
      <section className="relative w-full min-h-[calc(100vh-6rem)] flex items-center overflow-hidden px-6 md:px-[5%]">
        {/* Background glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E8192C]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E8192C]/4 rounded-full blur-[120px] pointer-events-none" />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "44px 44px" }} />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT — Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start text-left"
            >
              {/* Badge */}
              <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full overflow-hidden mb-8 border border-[#E31D2E]/20 bg-white/60 shadow-[0_8px_16px_rgba(17,17,17,0.03)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31D2E]" />
                </span>
                <span className="relative text-[#111111] text-xs font-bold tracking-[0.25em] uppercase">Our Services</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-[1.05] tracking-tight text-[#111111]">
                Transforming Brands into <br />
                <span className="text-[#E31D2E]">Digital Authority</span>
              </h1>

              {/* Description */}
              <p className="text-[#575757] text-base md:text-lg leading-relaxed max-w-xl font-medium mb-10">
                Comprehensive branding, media, and performance marketing solutions designed to help your business grow strategically, creatively, and profitably.
              </p>

              {/* Unique Stats Section - Redesigned as clean clay pills */}
              <div className="flex flex-wrap gap-4 mt-6 relative z-10">
                {[{ num: "15+", label: "Clients" }, { num: "20+", label: "Projects" }, { num: "6", label: "Services" }].map((s, i) => (
                  <div key={i} className="clay-card relative flex flex-col items-center justify-center p-4 px-6 min-w-[100px]">
                    <span className="text-3xl font-black text-[#E31D2E] tracking-tighter">
                      {s.num}
                    </span>
                    <span className="text-[#575757] text-[9px] font-bold uppercase tracking-[0.25em] mt-1">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Image frame */}
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/50 bg-white/45 shadow-[0_12px_32px_rgba(17,17,17,0.04)] p-3">
                <img
                  src={ourServicesImg}
                  alt="Digital Marketing Strategy"
                  className="w-full aspect-[4/3] object-cover rounded-[2rem] border border-white/50"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-10 left-10 z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[#E31D2E]/20 bg-white/80 shadow-md backdrop-blur-md">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E31D2E] shadow-[0_0_8px_rgba(227,29,46,0.5)] animate-pulse" />
                  <span className="text-[#111111] text-xs font-bold uppercase tracking-wider">Performance-Driven Growth</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Auto-Scrolling Marquee Section with manual arrow/dot control ── */}
      <section id="expertise" className="relative w-full px-[5%] py-20 pb-32 overflow-hidden bg-[#080808]">
        {/* Animated Background Glows */}
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#E8192C]/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#E8192C]/5 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

        {/* Floating Sparkles in Background */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`bg-sparkle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full pointer-events-none z-0"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: "0 0 10px 2px rgba(232,25,44,0.6)",
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}

        <div className="relative z-10 w-full max-w-[1400px] mx-auto min-h-[520px]">
          
          <div className="flex flex-col items-center justify-center gap-2 mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white text-center tracking-tight">
              Our <span className="text-[#E8192C]">Core Expertise</span>
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-[#E8192C] to-transparent rounded-full" />
          </div>

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
>     {/* Left/right fade masks so cards don't hard-cut at the edges */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 md:w-24 z-20 bg-gradient-to-r from-[#080808] to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 md:w-24 z-20 bg-gradient-to-l from-[#080808] to-transparent" />

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
                      className="w-[85vw] sm:w-[300px] md:w-[320px] lg:w-[340px] flex-shrink-0"
                    >
                      <div
                        className={`relative rounded-[2rem] p-8 pt-10 flex flex-col items-center text-center h-[340px] md:h-[360px] cursor-pointer transition-all duration-500 ease-out group border overflow-hidden ${
                          isHighlighted
                            ? 'border-[#E31D2E] bg-white/80 shadow-[0_12px_32px_rgba(227,29,46,0.08)] -translate-y-4 scale-[1.03]'
                            : 'border-white/60 bg-white/45 shadow-[0_8px_24px_rgba(17,17,17,0.02)] hover:border-[#E31D2E]/40'
                        }`}
                      >
                        
                        {/* Circle Image */}
                        <div className={`relative z-10 w-[110px] h-[110px] mb-8 rounded-full p-1.5 border-[3px] transition-all duration-500 flex items-center justify-center -mt-8 bg-white shadow-md ${
                          isHighlighted ? 'border-[#E31D2E]' : 'border-[#E31D2E]/20 group-hover:border-[#E31D2E]'
                        }`}>
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>

                        <h3 className="relative z-10 text-xl md:text-2xl font-black text-[#111111] mb-3 tracking-tight group-hover:text-[#E31D2E] transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="relative z-10 text-[#575757] font-medium text-sm md:text-base leading-relaxed px-2 transition-colors duration-300">
                          {service.desc}
                        </p>

                        {/* Bottom accent line */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#E31D2E]/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

          </div>

          {/* Pagination Dots — click to jump straight to a service */}
          <div className="flex justify-center gap-3 mt-12">
            {servicesData.map((_, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to ${servicesData[i].title} service`}
                  className={`transition-all duration-500 rounded-full cursor-pointer border border-transparent ${
                    isActive
                      ? "w-8 h-2.5 bg-[#E8192C] scale-110 shadow-[0_0_12px_rgba(232,25,44,0.7)]"
                      : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
                  }`}
                  onClick={() => goToIndex(i)}
                />
              );
            })}
          </div>

        </div>
      </section>

      {/* ── Pricing Calculator ── */}
      <div
        ref={calculatorRef}
        className="relative px-6 md:px-[5%] py-24 md:py-32"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8192C]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Pricing Calculator</h2>
            <p className="text-white/40 text-lg">Pick your pillars and plans to see an estimated growth investment.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Pillars */}
            <div className="lg:col-span-7 space-y-6">
              <Panel title="Select Pillars">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PLATFORMS.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={(e) => handlePlatformClick(p, e)}
                      className="group flex items-center gap-4 p-6 rounded-2xl bg-white/50 border border-white/80 hover:border-[#E31D2E]/40 hover:bg-white/80 transition-all duration-300 shadow-sm"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center text-[#E31D2E]/60 group-hover:text-[#E31D2E] transition-colors border border-white/50 shadow-sm">
                        {p.icon && <p.icon className="text-xl" />}
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-bold text-[#111111] text-lg">{p.title}</div>
                        <div className="text-[#E31D2E] text-sm font-bold mt-0.5">
                          ₹{(p.price || 0).toLocaleString()}
                          <span className="text-[#8B8B8B] font-normal text-xs ml-2">base</span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#E31D2E] transition-colors bg-white shadow-sm">
                        <FaArrowRight className="text-[#8B8B8B] text-xs group-hover:text-[#E31D2E]" />
                      </div>
                    </button>
                  ))}
                </div>
              </Panel>
            </div>

            {/* Right Column: Checkout */}
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <Panel title="Plan Summary">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-5 bg-white/60 rounded-2xl border border-white/80 shadow-sm">
                      <span className="text-[#575757] font-semibold tracking-wide uppercase text-[11px]">Base Setup Fee</span>
                      <span className="font-black text-[#111111]">₹5,000</span>
                    </div>

                    <div className="max-h-[350px] overflow-y-auto pr-1 space-y-3 custom-scrollbar">
                      <AnimatePresence>
                        {selectedItems.map((item, idx) => (
                          <motion.div
                            key={`${item.platform.id}-${item.plan.id}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="p-5 rounded-2xl bg-white/50 border border-white/80 space-y-3 group shadow-sm"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="text-sm font-black text-[#111111] uppercase tracking-tight">{item.platform.title}</div>
                                <div className="text-[#E31D2E] text-xs font-bold mt-1 inline-flex items-center gap-1">
                                  <MdStars className="text-xs" />
                                  {item.plan.title}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-black text-[#111111]">₹{((item.platform.price || 0) + (item.plan.price || 0)).toLocaleString()}</div>
                                <button
                                  onClick={() => setSelectedItems(prev => prev.filter((_, i) => i !== idx))}
                                  className="text-[#8B8B8B] hover:text-[#E31D2E] text-[10px] uppercase font-black mt-2 tracking-tighter"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    <div className="pt-8 mt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-8">
                        <span className="text-[#575757] text-xs font-black uppercase tracking-[0.2em]">Investment Est.</span>
                        <div className="text-4xl font-black text-[#111111]">
                          <span className="text-[#E31D2E] text-xl align-top mt-1 mr-1">₹</span>
                          {total.toLocaleString()}
                        </div>
                      </div>

                      <button
                        onClick={handleWhatsAppClick}
                        className="w-full py-5 rounded-full bg-[#25D366] hover:bg-[#111111] text-white font-black flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-[1.02] shadow-[0_8px_20px_rgba(37,211,102,0.15)] active:scale-95 text-sm sm:text-base uppercase tracking-wider"
                      >
                        <IoLogoWhatsapp className="text-2xl" />
                        GET DETAILED PROPOSAL
                      </button>

                      <p className="text-center text-[#8B8B8B] text-[10px] uppercase font-black tracking-widest mt-6">
                        Final pricing subject to specific scope requirements
                      </p>
                    </div>
                  </div>
                </Panel>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Partners ── */}
      <section className="py-24 border-t border-gray-200 bg-transparent overflow-hidden">
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