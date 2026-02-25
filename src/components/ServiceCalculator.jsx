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
            <div className="inline-flex items-center border border-white/10 gap-2 px-3 py-1.5 bg-white/5 rounded-full mb-6 mx-auto">
              <HiLightningBolt className="w-4 h-4 text-[#E8192C]" />
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Our Services</span>
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

      {/* ── Informational Services Grid ── */}
      <section className="relative px-6 md:px-[5%] py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                icon: <FaGlobe />,
                title: "Web Development",
                desc: "We craft fast, responsive, and visually refined websites that strengthen brand presence and deliver seamless experiences across all devices."
              },
              {
                icon: <FaLaptopCode />,
                title: "Software Development",
                desc: "We design and build reliable, scalable software solutions tailored to business needs, enabling efficiency, performance, and long-term growth."
              },
              {
                icon: <FaMobileAlt />,
                title: "App Development",
                desc: "We develop high-performance mobile applications that combine intuitive design with robust functionality across Android and iOS platforms."
              },
              {
                icon: <FaShieldAlt />,
                title: "Cyber Security",
                desc: "We secure digital ecosystems through advanced security architectures, continuous monitoring, and proactive risk management to safeguard data and build trust."
              },
              {
                icon: <FaBullhorn />,
                title: "Digital Marketing",
                desc: "We deliver data-driven digital marketing strategies that enhance brand visibility, engage audiences, and drive measurable business results."
              },
              {
                icon: <FaLeaf />,
                title: "Sustainability",
                desc: "We integrate smart technologies and sustainable practices to support responsible growth while reducing environmental impact and creating lasting value."
              }
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#E8192C]/30 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-[#E8192C]/10 group-hover:border-[#E8192C]/40 group-hover:scale-110">
                  <div className="text-white/30 text-2xl group-hover:text-[#E8192C] transition-colors duration-500">
                    {s.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#E8192C] transition-colors">{s.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
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
