import React, { useMemo, useState, useEffect, useRef } from "react";
import "./ServiceCalculator.css";
import balajiPortraits from '../assets/tie/Balaji-Portraits.jpg';
import ibodhiAcademy from '../assets/tie/ibodhi-academy-removebg.png';
import vilcet from '../assets/tie/VILCET-removebg.png';
import shipyon from '../assets/tie/shipyon.png';
import pt from '../assets/tie/pt.png';
import ourServicesImg from "../assets/services-img/our services.png";
import servicesData from "../data/servicesData";
import { motion, AnimatePresence } from "framer-motion";
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
import { ChevronLeft, ChevronRight } from "lucide-react";
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

export default function ServiceCalculator() {
  const navigate = useNavigate();
  const location = useLocation();
  const calculatorRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalPlatform, setModalPlatform] = useState(null);
  const [selectedPlanInModal, setSelectedPlanInModal] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [highlightedIndex, setHighlightedIndex] = useState(null);

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

        // Scroll inside the carousel
        setTimeout(() => {
          if (scrollRef.current) {
            const cardWidth = 380 + 32; // card width + gap
            scrollRef.current.scrollTo({ left: index * cardWidth, behavior: "smooth" });
            setActiveIndex(index);
          }
          setHighlightedIndex(index);
        }, 600);

        // Turn off highlight after 4 seconds
        const timer = setTimeout(() => {
          setHighlightedIndex(null);
        }, 4000);
        return () => clearTimeout(timer);
      }
    }
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

  const scrollToService = (index) => {
    if (!scrollRef.current) return;

    const safeIndex = Math.max(0, Math.min(servicesData.length - 1, index));
    const card = scrollRef.current.children[safeIndex];

    if (card) {
      const left = card.offsetLeft - 24;
      scrollRef.current.scrollTo({ left, behavior: "smooth" });
    } else {
      scrollRef.current.scrollTo({ left: safeIndex * 360, behavior: "smooth" });
    }

    setActiveIndex(safeIndex);
    setHighlightedIndex(safeIndex);
  };

  const scrollLeft = () => {
    if (!scrollRef.current) return;
    const nextIndex = Math.max(0, activeIndex - 1);
    scrollToService(nextIndex);
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    const nextIndex = Math.min(servicesData.length - 1, activeIndex + 1);
    scrollToService(nextIndex);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollX = scrollRef.current.scrollLeft;
      const index = Math.min(
        servicesData.length - 1,
        Math.round((scrollX / scrollRef.current.scrollWidth) * servicesData.length)
      );
      setActiveIndex(index);
      setHighlightedIndex(index);
    }
  };

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
              <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full overflow-hidden mb-8"
                style={{
                  background: "linear-gradient(135deg, rgba(232,25,44,0.18) 0%, rgba(0,0,0,0.6) 50%, rgba(232,25,44,0.12) 100%)",
                  border: "1px solid rgba(232,25,44,0.5)",
                  boxShadow: "0 0 18px rgba(232,25,44,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}>
                <motion.span className="absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.08) 50%,transparent 100%)" }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }} />
                {[{ top: "20%", left: "8%", delay: 0 }, { top: "70%", left: "15%", delay: 0.4 }, { top: "30%", right: "10%", delay: 0.8 }, { top: "65%", right: "18%", delay: 0.2 }, { top: "15%", left: "45%", delay: 0.6 }].map((pos, i) => (
                  <motion.span key={i} className="absolute w-[3px] h-[3px] rounded-full bg-white"
                    style={{ top: pos.top, left: pos.left, right: pos.right }}
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }} />
                ))}
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8192C] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E8192C]" />
                </span>
                <span className="relative text-white text-xs sm:text-sm font-bold tracking-[0.3em] uppercase"
                  style={{ textShadow: "0 0 10px rgba(232,25,44,0.7)" }}>Our Services</span>
                <motion.span className="relative text-[#E8192C] text-base leading-none"
                  animate={{ rotate: [0, 180, 360], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>✦</motion.span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-[1.05] tracking-tight text-white">
                Transforming Brands into <br />
                <span className="text-[#E8192C]">Digital Authority</span>
              </h1>

              {/* Description */}
              <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl font-medium mb-10">
                Comprehensive branding, media, and performance marketing solutions designed to help your business grow strategically, creatively, and profitably.
              </p>

              {/* Unique Stats Section - Redesigned to be more premium */}
              <div className="flex flex-wrap gap-6 sm:gap-10 mt-4 relative">
                {[{ num: "15+", label: "Clients" }, { num: "20+", label: "Projects" }, { num: "6", label: "Services" }].map((s, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="flex flex-col">
                      <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="text-4xl md:text-5xl font-black text-white tracking-tighter" 
                        style={{ textShadow: "0 0 30px rgba(232,25,44,0.3)" }}
                      >
                        {s.num}
                      </motion.span>
                      <span className="text-[#E8192C] text-[10px] font-black uppercase tracking-[0.3em] mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        {s.label}
                      </span>
                    </div>
                    {i < 2 && (
                      <div className="h-10 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden sm:block" />
                    )}
                  </div>
                ))}
                
                {/* Subtle background glow for stats */}
                <div className="absolute -inset-x-6 -inset-y-4 bg-white/[0.02] border border-white/5 rounded-3xl -z-10 backdrop-blur-sm" />
              </div>
            </motion.div>

            {/* RIGHT — Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Glow behind image */}
              <div className="absolute -inset-4 bg-[#E8192C]/10 rounded-[3rem] blur-[40px] pointer-events-none" />
              {/* Image frame */}
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#E8192C]/20 via-transparent to-transparent z-10 pointer-events-none" />
                <img
                  src={ourServicesImg}
                  alt="Digital Marketing Strategy"
                  className="w-full aspect-[4/3] object-cover"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3 px-5 py-3 rounded-2xl"
                  style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(232,25,44,0.3)" }}>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E8192C] shadow-[0_0_8px_rgba(232,25,44,0.8)]" />
                  <span className="text-white text-sm font-bold">Performance-Driven Growth</span>
                </div>
              </div>
              {/* Floating sparkles */}
              {[{ top: "10%", right: "8%", delay: 0 }, { top: "60%", right: "4%", delay: 0.8 }, { top: "30%", left: "4%", delay: 1.4 }].map((pos, i) => (
                <motion.div key={i} className="absolute w-2 h-2 rounded-full bg-[#E8192C] pointer-events-none"
                  style={{ top: pos.top, right: pos.right, left: pos.left, boxShadow: "0 0 12px 4px rgba(232,25,44,0.6)" }}
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.4, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }} />
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Infinite Carousel Slider Section ── */}
      <section id="expertise" className="relative w-full px-[5%] py-20 pb-32 overflow-hidden bg-[#080808]">
        {/* Tilted Container with rich red/black mix and sparkles */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#080808] via-[#1a0000] to-[#250000] -rotate-3 scale-[1.2] shadow-2xl pointer-events-none" />
        
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

        <div className="relative z-10 w-full max-w-[1400px] mx-auto min-h-[550px]">
          
          <div className="flex flex-col items-center justify-center gap-2 mb-16 transform -rotate-2">
            <h2 className="text-4xl md:text-5xl font-black text-white text-center tracking-tight">
              Our <span className="text-[#E8192C]">Core Expertise</span>
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-[#E8192C] to-transparent rounded-full" />
          </div>

          <div className="relative w-full flex items-center justify-center transform -rotate-2">
            
            {/* Left Button */}
            <button
              onClick={scrollLeft}
              className="absolute -left-2 md:-left-12 lg:-left-16 z-30 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(232,25,44,0.3)] hover:scale-110 transition-transform active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Slider Track Container */}
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto gap-6 sm:gap-8 overflow-y-hidden snap-x snap-mandatory px-4 md:px-10 py-10 w-full no-scrollbar"
              onScroll={handleScroll}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {servicesData.map((service, i) => (
                <div
                  key={i}
                  className="w-[85vw] sm:w-[320px] md:w-[350px] lg:w-[380px] flex-shrink-0 snap-center"
                >
                  <div className={`relative bg-gradient-to-br from-[#080808] via-black to-[#E8192C]/20 rounded-2xl p-8 pt-10 flex flex-col items-center text-center h-[340px] md:h-[360px] cursor-pointer hover:-translate-y-4 transition-all duration-700 group border overflow-hidden ${
                    highlightedIndex === i 
                      ? 'border-[#E8192C] shadow-[0_0_60px_rgba(232,25,44,0.6)] -translate-y-4 scale-[1.03]' 
                      : 'border-white/5 hover:border-[#E8192C]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:shadow-[0_30px_60px_rgba(232,25,44,0.2)]'
                  }`}>
                    
                    {/* Internal sparkles inside the card */}
                    {[...Array(6)].map((_, si) => (
                      <motion.div
                        key={`card-sparkle-${si}`}
                        className="absolute w-1 h-1 bg-white rounded-full pointer-events-none z-0"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          boxShadow: "0 0 10px 2px rgba(232,25,44,0.6)",
                        }}
                        animate={{
                          opacity: [0, 0.8, 0],
                          scale: [0.5, 1.2, 0.5],
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 3,
                          ease: "easeInOut"
                        }}
                      />
                    ))}

                    {/* Circle Image */}
                    <div className={`relative z-10 w-[110px] h-[110px] mb-8 rounded-full p-1.5 border-[3px] transition-all duration-500 flex items-center justify-center -mt-8 bg-black shadow-xl ${
                      highlightedIndex === i ? 'border-[#E8192C]' : 'border-[#E8192C]/30 group-hover:border-[#E8192C]'
                    }`}>
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>

                    <h3 className="relative z-10 text-xl md:text-2xl font-black text-white mb-3 tracking-tight group-hover:text-[#E8192C] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="relative z-10 text-white/50 font-medium text-sm md:text-base leading-relaxed px-2 group-hover:text-white/70 transition-colors duration-300">
                      {service.desc}
                    </p>

                    {/* Bottom accent glow */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E8192C]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  </div>
                </div>
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={scrollRight}
              className="absolute -right-2 md:-right-12 lg:-right-16 z-30 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(232,25,44,0.3)] hover:scale-110 transition-transform active:scale-95"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-12 transform -rotate-2">
            {servicesData.map((_, i) => {
              const isActive = highlightedIndex === i || activeIndex === i;
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
                  onClick={() => scrollToService(i)}
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
                      className="group flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#E8192C]/40 hover:bg-[#E8192C]/5 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#E8192C]/60 group-hover:text-[#E8192C] transition-colors">
                        {p.icon && <p.icon className="text-xl" />}
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-bold text-white text-lg">{p.title}</div>
                        <div className="text-[#E8192C] text-sm font-bold mt-0.5">
                          ₹{(p.price || 0).toLocaleString()}
                          <span className="text-white/20 font-normal text-xs ml-2">base</span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#E8192C]/40 transition-colors">
                        <FaArrowRight className="text-white/20 text-xs group-hover:text-[#E8192C]" />
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
                    <div className="flex justify-between items-center p-5 bg-white/5 rounded-2xl border border-white/5">
                      <span className="text-white/40 font-semibold tracking-wide uppercase text-[11px]">Base Setup Fee</span>
                      <span className="font-black text-white">₹5,000</span>
                    </div>

                    <div className="max-h-[350px] overflow-y-auto pr-1 space-y-3 custom-scrollbar">
                      <AnimatePresence>
                        {selectedItems.map((item, idx) => (
                          <motion.div
                            key={`${item.platform.id}-${item.plan.id}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 group"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="text-sm font-black text-white uppercase tracking-tight">{item.platform.title}</div>
                                <div className="text-[#E8192C] text-xs font-bold mt-1 inline-flex items-center gap-1">
                                  <MdStars className="text-xs" />
                                  {item.plan.title}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-black text-white">₹{((item.platform.price || 0) + (item.plan.price || 0)).toLocaleString()}</div>
                                <button
                                  onClick={() => setSelectedItems(prev => prev.filter((_, i) => i !== idx))}
                                  className="text-white/20 hover:text-[#E8192C] text-[10px] uppercase font-black mt-2 tracking-tighter"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    <div className="pt-8 mt-4 border-t border-white/10">
                      <div className="flex items-center justify-between mb-8">
                        <span className="text-white/30 text-xs font-black uppercase tracking-[0.2em]">Investment Est.</span>
                        <div className="text-4xl font-black text-white">
                          <span className="text-[#E8192C] text-xl align-top mt-1 mr-1">₹</span>
                          {total.toLocaleString()}
                        </div>
                      </div>

                      <button
                        onClick={handleWhatsAppClick}
                        className="w-full py-5 rounded-2xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-black flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-[0_15px_40px_rgba(37,211,102,0.2)]"
                      >
                        <IoLogoWhatsapp className="text-2xl" />
                        GET DETAILED PROPOSAL
                      </button>

                      <p className="text-center text-white/20 text-[10px] uppercase font-black tracking-widest mt-6">
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
      <section className="py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-white/50 font-black uppercase tracking-[0.4em] text-xs mb-16">Ecosystem Partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-80 hover:opacity-100 transition-all duration-700">
            <img src={balajiPortraits} alt="Partner" className="h-10 md:h-16 w-auto object-contain hover:scale-110 transition-transform" />
            <img src={ibodhiAcademy} alt="Partner" className="h-10 md:h-16 w-auto object-contain hover:scale-110 transition-transform" />
            <img src={vilcet} alt="Partner" className="h-10 md:h-16 w-auto object-contain hover:scale-110 transition-transform" />
            
            <img src={pt} alt="Partner" className="h-10 md:h-16 w-auto object-contain hover:scale-110 transition-transform" />
            <img src={shipyon} alt="Partner" className="h-10 md:h-16 w-auto object-contain hover:scale-110 transition-transform" />
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
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(232, 25, 44, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(232, 25, 44, 0.4);
        }
      `}</style>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="rounded-[40px] p-8 md:p-10 bg-white/[0.03] border border-white/10 backdrop-blur-xl">
      <h3 className="text-sm font-black text-white/40 uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
        <span className="w-12 h-[1px] bg-white/10" />
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
