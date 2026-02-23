import React, { useMemo, useState, useEffect, useRef } from "react";
import "./ServiceCalculator.css";
import balajiPortraits from '../assets/tie/Balaji-Portraits.jpg';
import ibodhiAcademy from '../assets/tie/ibodhi-academy-removebg.png';
import vilcet from '../assets/tie/VILCET-removebg.png';
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaTimesCircle,
  FaCheckCircle,
  FaShoppingCart,
  FaChartLine,
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

// Icon mapping object (string keys -> components)
const iconMap = {
  FaGlobe,
  FaMobileAlt,
  FaLaptopCode,
  FaBullhorn,
  FaShieldAlt,
  FaLeaf,
  FaShoppingCart,
  FaTimesCircle,
  FaCheckCircle,
  FaChartLine,
  MdDiamond,
  MdRocketLaunch,
  MdStars,
  MdWorkspacePremium,
  MdIntegrationInstructions,
  IoLogoWhatsapp,
  HiLightningBolt,
};

// helper to resolve icon which may be a string key or already a component
const resolveIcon = (icon) => {
  if (!icon) return null;
  if (typeof icon === "string") {
    return iconMap[icon] || null;
  }
  // assume it's already a component
  return icon;
};

// Map JS constants data to include actual icon components (robust to string/component)
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
  const [selectedPlanInModal, setSelectedPlanInModal] = useState(null); // For showing details in modal
  const [showContactForm, setShowContactForm] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Detect mobile screen size and handle modal-to-page transition
  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth < 768;
      
     
      if (newIsMobile && !isMobile) {
        if (modalPlatform) {
  
          setModalPlatform(null);
          setSelectedPlanInModal(null);
          sessionStorage.setItem('currentPlatformId', modalPlatform.id);
          navigate('/platform-plan');
        }
      }
      
      setIsMobile(newIsMobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile, modalPlatform, navigate]);

  // Helper function to restore full objects from IDs
  const restoreFromIds = (items) => {
    return items.map(item => {
     
      if (item.platformId && item.planId) {
        const platform = PLATFORMS.find(p => p.id === item.platformId);
        const plan = platform?.plans?.find(p => p.id === item.planId);
        if (platform && plan) {
          return { platform, plan };
        }
      }
      // Handle legacy format (from desktop modals) - already has platform/plan objects
      else if (item.platform) {
        const platformWithIcons = PLATFORMS.find(p => p.id === item.platform.id);
        if (platformWithIcons) {
          const planWithIcons = platformWithIcons.plans?.find(p => p.id === item.plan?.id);
          return {
            platform: platformWithIcons,
            plan: planWithIcons || item.plan
          };
        }
      }
      return item;
    }).filter(Boolean); 
  };


  useEffect(() => {
    const shouldScroll = sessionStorage.getItem('scrollToCalculator') === 'true';
    
    if (shouldScroll) {
      // Backup scroll mechanism with multiple attempts
      const attemptScroll = (attempt = 1) => {
        if (calculatorRef.current) {
          const elementPosition = calculatorRef.current.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - 80;
          
          // Use both methods
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          calculatorRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
          });
          
          // Only remove flag after successful scroll
          if (attempt >= 3) {
            sessionStorage.removeItem('scrollToCalculator');
          }
        } else if (attempt < 5) {
          setTimeout(() => attemptScroll(attempt + 1), attempt * 300);
        }
      };
      
      // Start scrolling after delay
      setTimeout(() => attemptScroll(1), 600);
    }
  }, [location.pathname, location.key]);


  useEffect(() => {
    const loadItemsFromStorage = () => {
      const storedItems = sessionStorage.getItem('serviceCalculatorItems');
      if (storedItems) {
        try {
          const items = JSON.parse(storedItems);
          const restoredItems = restoreFromIds(items);
          setSelectedItems(restoredItems);
          setIsInitialLoad(false);
        } catch (error) {
          console.error('Failed to parse stored items:', error);
        }
      } else {
        setIsInitialLoad(false);
      }
    };

    // Load items when location changes (includes navigation back from mobile pages)
    loadItemsFromStorage();

    // Check if returning from mobile page on desktop - reopen modal
    if (window.innerWidth >= 768) {
      const platformId = sessionStorage.getItem('currentPlatformId');
      const shouldScroll = sessionStorage.getItem('scrollToCalculator') === 'true';
      
  
      const modalDelay = shouldScroll ? 900 : 300;
      
      if (platformId && !modalPlatform) {
        const platform = PLATFORMS.find(p => p.id === platformId);
        if (platform) {
          // Delay modal opening to allow scroll to complete
          setTimeout(() => {
            setModalPlatform(platform);
            setSelectedPlanInModal(platform.plans?.[0] || null);
          }, modalDelay);
        }
      }
    }

  
    const handleStorageUpdate = () => {
      loadItemsFromStorage();
    };

    window.addEventListener('serviceCalculatorUpdate', handleStorageUpdate);

    return () => {
      window.removeEventListener('serviceCalculatorUpdate', handleStorageUpdate);
      // Only clean up sessionStorage if not on mobile (to preserve for navigation)
      // Mobile needs the currentPlatformId to navigate to PlatformPlanPage
      if (window.innerWidth >= 768) {
        sessionStorage.removeItem('currentPlatformId');
      }
    };
  }, [location.pathname, location.key]);
  useEffect(() => {
    if (isInitialLoad) {
      return;
    }

    const itemsToSave = selectedItems.map(item => {
      if (item.platform && item.plan) {
        return { platformId: item.platform.id, planId: item.plan.id };
      }
      return item;
    });
    sessionStorage.setItem('serviceCalculatorItems', JSON.stringify(itemsToSave));
  }, [selectedItems, isInitialLoad]);

  const handlePlatformClick = (platform, event) => {
    // On mobile, navigate to dedicated page instead of opening modal
    if (isMobile) {
     
      sessionStorage.setItem('currentPlatformId', platform.id);
      navigate('/platform-plan');
      return;
    }

    // Desktop: use modal
    const rect = event.currentTarget.getBoundingClientRect();
    setClickPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    sessionStorage.setItem('currentPlatformId', platform.id);
    setModalPlatform(platform);
    setSelectedPlanInModal(null);
  };

  const handleCloseModal = () => {
    // Only clear sessionStorage on desktop (mobile needs it for navigation)
    if (window.innerWidth >= 768) {
      sessionStorage.removeItem('currentPlatformId');
    }
    setModalPlatform(null);
    setSelectedPlanInModal(null);
  };

  const applyPlan = (plan) => {
    if (!modalPlatform || !plan) return;

    setSelectedItems((prev) => {
      const exists = prev.find(
        (item) =>
          item.platform?.id === modalPlatform.id && item.plan?.id === plan.id
      );
      if (exists) {
        return prev;
      }
      return [...prev, { platform: modalPlatform, plan }];
    });

    setSelectedPlanInModal(null);
    sessionStorage.removeItem('currentPlatformId');
    setModalPlatform(null);
  };

  const removeItem = (index) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const total = useMemo(() => {
    let sum = 5000;
    selectedItems.forEach((item) => {
      if (item.platform) sum += item.platform.price || 0;
      if (item.plan) sum += item.plan.price || 0;
    });
    return sum;
  }, [selectedItems]);

  const handleWhatsAppClick = () => {
    // Generate WhatsApp message
    let message = `Hello Praskla Technologies, I’m interested in your development services. Here's my requirement breakdown:\n\n`;
    message += `📋 Base Price: ₹5,000\n\n`;

    // Group selected items by platform
    const platformItems = selectedItems.filter((item) => item.platform);

    if (platformItems.length > 0) {
      message += `🎯 Platform Selection:\n`;
      platformItems.forEach((item) => {
        message += `- ${item.platform.title}: ₹${(
          item.platform.price || 0
        ).toLocaleString()}\n`;
        if (item.plan) {
          message += `  └ ${item.plan.title}: ₹${(
            item.plan.price || 0
          ).toLocaleString()}\n`;
        }
      });
      message += `\n`;
    }

    message += `💰 Total Estimated Cost: ₹${total.toLocaleString()}\n\n`;
    message += `I'd like to discuss the development timeline and process.`;

    const encodedMessage = encodeURIComponent(message);

    // WhatsApp phone number
    const whatsappNumber = "919876543210";

    // Open WhatsApp with pre-filled message
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div
      ref={calculatorRef}
      id="service-calculator"
      className="service-calculator-4k dark-section relative min-h-screen bg-gradient-to-br  from-[#0f0418] via-[#1a0b2e] to-[#2d1b3d] pt-15 text-white px-6 py-8 animate-fadeIn overflow-hidden"
    >
      {/* Elegant decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
      </div>

      {/* Sophisticated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-96 h-96 rounded-full bg-purple-500 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-indigo-600 blur-[140px]"
      />

      {/* Elegant geometric pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Floating decorative lines */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: [0, 0.3, 0],
            y: [-100, -400],
            rotate: [0, 360],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            delay: i * 3,
            ease: "linear",
          }}
          className="absolute w-px h-32 bg-gradient-to-b from-transparent via-purple-400/40 to-transparent"
          style={{
            left: `${15 + i * 15}%`,
            bottom: 0,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto mt-12 md:mt-20">
        <header className="text-center mb-8 animate-slideDown">
          <h1 className="text-4xl font-bold text-white">
            <span>Service Pricing Calculator</span>
          </h1>
          <p
            className="text-white/70 mt-2 animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            Customize your platform and choose a plan
          </p>
         
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Panels */}
          <div className="lg:col-span-3 space-y-6">
            <Panel title="Choose Platform">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PLATFORMS.map((p, index) => (
                  <button
                    key={p.id}
                    onClick={(e) => handlePlatformClick(p, e)}
                    className="group flex items-center gap-3 p-6 rounded-xl transition-all duration-300 bg-white/10 backdrop-blur-xl border border-white/20 hover:scale-[1.05] hover:shadow-2xl hover:shadow-purple-500/20 hover:bg-white/15 hover:border-white/40 hover:-translate-y-1 animate-fadeInUp min-h-[100px]"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-center p-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
                      {p.icon ? (
                        <p.icon className="text-white text-2xl" />
                      ) : null}
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold text-base text-white group-hover:text-purple-200 transition-colors">
                        {p.title}
                      </div>
                      <div className="mt-0.5">
                        <span className="text-purple-200/70 price-font text-xs font-medium">Starts at </span>
                        <span className="text-purple-200 text-sm font-bold group-hover:scale-105 transition-transform inline-block starts-at-price-4k">
                          ₹{(p.price || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Panel>
          </div>

          {/* Right Panel - Sticky Price Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-6">
              <Panel title="Price Summary">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/6 border border-white/10 rounded-lg animate-fadeIn">
                    <span className="text-white/70 font-medium">
                      Base Price
                    </span>
                    <span className="font-bold text-white">₹5,000</span>
                  </div>

                  {/* Selected Items */}
                  {selectedItems.length > 0 && (
                    <div className="space-y-2 animate-slideDown">
                      <div className="text-white/70 text-sm font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-300 rounded-full animate-pulse"></span>
                        Selected Items:
                      </div>
                      {selectedItems.map((item, index) => (
                        <div
                          key={index}
                          className="pl-2 space-y-1 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300 animate-fadeInUp"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {item.platform && (
                            <div className="flex justify-between items-center">
                              <div className="flex-1">
                                <div className="text-white font-medium text-sm">
                                  {item.platform.title}
                                </div>
                              </div>
                              <span className="font-medium text-purple-200">
                                +₹{(item.platform.price || 0).toLocaleString()}
                              </span>
                            </div>
                          )}
                          {item.plan && (
                            <div className="flex justify-between items-center pl-3">
                              <div className="flex-1">
                                <div className="text-white/80 text-xs">
                                  {item.plan.title}
                                </div>
                              </div>
                              <span className="font-medium text-purple-200 text-sm">
                                +₹{(item.plan.price || 0).toLocaleString()}
                              </span>
                            </div>
                          )}
                          <button
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-700 transition-all text-xs flex items-center gap-1 mt-2"
                          >
                            <FaTimesCircle /> Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-white/20 pt-4 animate-fadeIn">
                    <div className="text-sm font-medium text-white/60 mb-1 flex items-center gap-2">
                      <span>Estimated Project Cost</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-lg font-medium text-white/80">Starting from</span>
                      <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-200 via-pink-200 to-purple-300 bg-clip-text text-transparent">
                        ₹{total.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Smart estimate disclaimer */}
                  <div className="mt-3 mb-1 p-3 rounded-lg bg-yellow-900/40 border-2 border-yellow-500/20">
                    <div className="flex items-start gap-2">
                      <MdStars className="text-yellow-200 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-white/80 leading-relaxed">
                        <span className="font-semibold text-yellow-200 text-[17px]">Note: </span> Final pricing may vary based on project complexity, custom features, technical requirements, and development timeline.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 sm:gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-3 px-3 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <IoLogoWhatsapp className="text-2xl flex-shrink-0" />
                    <span className="text-sm sm:text-base leading-tight">Get Detailed Quote on WhatsApp</span>
                  </button>
                </div>
              </Panel>

              {/* Contact Form Section */}
              {!showContactForm ? (
                <p className="text-center text-white text-base py-4 animate-fadeInUp">
                  Still not satisfied? Contact our team.{" "}
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="text-purple-200 font-bold hover:text-pink-200 transition-colors"
                  >
                    Click here
                  </button>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Platform Modal - Shows Plans */}
      <PlatformPlanModal
        isOpen={!!modalPlatform}
        onClose={handleCloseModal}
        clickPosition={clickPosition}
        platform={modalPlatform}
        selectedPlan={selectedPlanInModal}
        onSelectPlan={setSelectedPlanInModal}
        onApplyPlan={applyPlan}
      />

      {/* Removed old inline modal fallback code - modal is now handled via PlatformPlanModal and PlatformPlanPage */}

      <ContactForm
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
      />

      {/* Partners Section */}
      <div className="mt-[100px] mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Simple Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
              In Tie-up with
            </h2>
          </div>
          
          {/* Simple Marquee Container */}
          <div className="relative">
            <div className="marquee-container py-4" style={{
              width: '100%',
              overflow: 'hidden',
            }}>
              <div className="marquee-content grayscale  marquee-mobile" style={{
                display: 'flex',
                animation: 'marquee 25s linear infinite',
                whiteSpace: 'nowrap',
                gap: '5rem',
                willChange: 'transform',
              }}>
                {/* Original set */}
                {[
                  { name: 'Balaji Portraits', logo: balajiPortraits },
                  { name: 'IBODHI ACADEMY', logo: ibodhiAcademy },
                  { name: 'VILCET', logo: vilcet },
                ].map((partner, index) => (
                  <motion.div 
                    key={`logo-${index}`} 
                    className="logo-item group"
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-8 sm:h-12 md:h-14 lg:h-16 w-auto object-contain opacity-60 transition-all duration-500 filter drop-shadow-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.opacity = 0.3;
                        e.target.style.width = '60px';
                      }}
                      loading="lazy"
                    />
                  </motion.div>
                ))}
                {/* First copy */}
                {[
                  { name: 'Balaji Portraits', logo: balajiPortraits },
                  { name: 'IBODHI ACADEMY', logo: ibodhiAcademy },
                  { name: 'VILCET', logo: vilcet },
                ].map((partner, index) => (
                  <motion.div 
                    key={`logo-copy1-${index}`} 
                    className="logo-item group"
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-8 sm:h-12 md:h-14 lg:h-16 w-auto object-contain opacity-60 transition-all duration-500 filter drop-shadow-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.opacity = 0.3;
                        e.target.style.width = '60px';
                      }}
                      loading="lazy"
                    />
                  </motion.div>
                ))}
                {/* Second copy */}
                {[
                  { name: 'Balaji Portraits', logo: balajiPortraits },
                  { name: 'IBODHI ACADEMY', logo: ibodhiAcademy },
                  { name: 'VILCET', logo: vilcet },
                ].map((partner, index) => (
                  <motion.div 
                    key={`logo-copy2-${index}`} 
                    className="logo-item group"
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-8 sm:h-12 md:h-14 lg:h-16 w-auto object-contain opacity-60 transition-all duration-500 filter drop-shadow-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.opacity = 0.3;
                        e.target.style.width = '60px';
                      }}
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="rounded-2xl p-6 bg-white/10 shadow-xl shadow-black/10 border border-white/10 transition-all duration-300 animate-fadeInUp">
      <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-300 bg-clip-text text-transparent flex items-center gap-2">
        <span className="w-1.5 h-6 bg-gradient-to-b from-purple-300 to-pink-300 rounded-full"></span>
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}
