import React, { useMemo, useState, useEffect, useRef } from "react";
import "./ServiceCalculator.css";
import balajiPortraits from '../assets/tie/Balaji-Portraits.jpg';
import ibodhiAcademy from '../assets/tie/ibodhi-academy-removebg.png';
import vilcet from '../assets/tie/VILCET-removebg.png';
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

  const servicesData = [
    {
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
      title: "Web Development",
      desc: "We craft fast, responsive, and visually refined websites that strengthen brand presence."
    },
    {
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80",
      title: "Software Development",
      desc: "Reliable solutions tailored to business needs, enabling performance and growth."
    },
    {
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80",
      title: "App Development",
      desc: "High-performance applications that combine intuitive design with robustness."
    },
    {
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=400&q=80",
      title: "Cyber Security",
      desc: "Securing systems through advanced architectures, monitoring, and proactive risk management."
    },
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
      title: "Digital Marketing",
      desc: "Data-driven marketing strategies that enhance visibility and drive business results."
    },
    {
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
      title: "Sustainability",
      desc: "Integrating smart technologies and practices to support responsible digital scaling."
    }
  ];

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollX = scrollRef.current.scrollLeft;
      const index = Math.min(
        servicesData.length - 1,
        Math.round((scrollX / scrollRef.current.scrollWidth) * servicesData.length)
      );
      setActiveIndex(index);
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
    window.open(`https://wa.me/919591310740?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="bg-[#080808] min-h-screen text-white pt-24 overflow-hidden font-outfit">
      {/* ── Hero Section ── */}
      <section className="relative px-6 md:px-[5%] pt-12 pb-16 overflow-hidden">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#E8192C]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Glitter badge */}
            <div className="flex justify-center mb-8">
              <div
                className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(232,25,44,0.18) 0%, rgba(0,0,0,0.6) 50%, rgba(232,25,44,0.12) 100%)",
                  border: "1px solid rgba(232,25,44,0.5)",
                  boxShadow: "0 0 18px rgba(232,25,44,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)" }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
                />
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-[#E8192C]/80 to-transparent" />
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
            </div>
            <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-black mb-8 leading-[1.1] tracking-tight text-white max-w-5xl mx-auto">
              Transforming Brands into <br />
              <span className="text-[#E8192C]">Digital Authority</span>
            </h1>
            <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              Comprehensive branding, media, and performance marketing solutions designed to help your business grow strategically, creatively, and profitably.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Infinite Carousel Slider Section ── */}
      <section className="relative w-full px-[5%] py-20 pb-32 overflow-hidden bg-[#080808]">
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
                  <div className="relative bg-gradient-to-br from-[#080808] via-black to-[#E8192C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-8 pt-10 flex flex-col items-center text-center h-[340px] md:h-[360px] cursor-pointer hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(232,25,44,0.2)] transition-all duration-700 group border border-white/5 hover:border-[#E8192C]/40 overflow-hidden">
                    
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
                    <div className="relative z-10 w-[110px] h-[110px] mb-8 rounded-full p-1.5 border-[3px] border-[#E8192C]/30 group-hover:border-[#E8192C] transition-all duration-500 flex items-center justify-center -mt-8 bg-black shadow-xl">
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
            {servicesData.map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-500 rounded-full cursor-pointer ${
                  activeIndex % servicesData.length === i ? "w-8 h-2.5 bg-white scale-110" : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
                }`}
                onClick={() => {
                  if (scrollRef.current) {
                    scrollRef.current.scrollTo({ left: i * 360, behavior: "smooth" });
                  }
                }}
              />
            ))}
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
          <h2 className="text-center text-white/10 font-black uppercase tracking-[0.4em] text-[10px] mb-16">Ecosystem Partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            <img src={balajiPortraits} alt="Partner" className="h-8 md:h-12 w-auto object-contain hover:scale-110 transition-transform" />
            <img src={ibodhiAcademy} alt="Partner" className="h-8 md:h-12 w-auto object-contain hover:scale-110 transition-transform" />
            <img src={vilcet} alt="Partner" className="h-8 md:h-12 w-auto object-contain hover:scale-110 transition-transform" />
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
