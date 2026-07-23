import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Logo from "../assets/Praskla_Digital_X_Logo_Trasnparent_Background.png";

const MagneticWrapper = ({ children, disabled = false }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  if (disabled) return children;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    // 0.15 pull factor for subtle magnetic effect
    const x = (clientX - (left + width / 2)) * 0.15;
    const y = (clientY - (top + height / 2)) * 0.15;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.1 }}
      className="relative flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
};

const Navbar = ({ setShowContactForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [width, setWidth] = useState("92%");
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const activeTab =
    location.pathname === "/" ? "home" : location.pathname.slice(1).split("/")[0];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      setScrolled(currentScrollTop > 20);

      if (currentScrollTop > lastScrollTop && currentScrollTop > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  // Dynamically calculate target width based on scroll state & viewport
  useEffect(() => {
    const handleWidth = () => {
      const isSmall = window.innerWidth < 768;
      if (scrolled) {
        setWidth(isSmall ? "90%" : "80%");
      } else {
        setWidth("92%");
      }
    };
    handleWidth();
    window.addEventListener("resize", handleWidth);
    return () => window.removeEventListener("resize", handleWidth);
  }, [scrolled]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: "home", to: "/", label: "Home" },
    { path: "about", to: "/about", label: "About" },
    { path: "services", to: "/services", label: "Services" },
    { path: "projects", to: "/projects", label: "Projects" },
    { path: "careers", to: "/careers", label: "Careers" },
  ];

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ width: "92%", height: 80, y: 0, x: "-50%", opacity: 1 }}
        animate={{
          width: width,
          height: scrolled ? 64 : 80,
          y: isVisible ? 16 : -120, // 16px matches top-4
          x: "-50%",
          opacity: isVisible ? 1 : 0,
          backgroundColor: scrolled ? "rgba(255, 255, 255, 0.90)" : "rgba(255, 255, 255, 0.82)",
          boxShadow: scrolled
            ? "0 20px 40px rgba(0, 0, 0, 0.08), inset 0 -4px 8px rgba(0, 0, 0, 0.03), inset 0 4px 8px rgba(255, 255, 255, 0.6)"
            : "0 10px 25px rgba(0, 0, 0, 0.04), inset 0 -4px 8px rgba(0, 0, 0, 0.02), inset 0 4px 8px rgba(255, 255, 255, 0.5)",
        }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 220, damping: 26 }
        }
        className="fixed z-50 left-1/2 rounded-full border border-white/40 flex items-center justify-between px-6 md:px-8 max-w-[1000px]"
        style={{
          backdropFilter: "blur(28px) saturate(120%)",
          WebkitBackdropFilter: "blur(28px) saturate(120%)",
        }}
      >
        <div className="flex items-center justify-between w-full h-full">
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0 min-w-0 pr-2">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              whileHover={{ rotate: 2 }}
              transition={{
                scale: { duration: 0.5, ease: "easeOut" },
                rotate: { type: "spring", stiffness: 300, damping: 15 }
              }}
              className="flex items-center gap-2 sm:gap-2.5"
            >
              {/* Icon mark — transparent background */}
              <div
                className="relative w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center overflow-hidden rounded-lg flex-shrink-0"
                style={{ boxShadow: "0 0 12px rgba(232,25,44,0.15)" }}
              >
                <img
                  src={Logo}
                  alt="Praskla Digital X"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Brand text */}
              <div className="flex flex-col justify-center min-w-0 pl-1">
                <span className="font-semibold text-[10px] sm:text-[13px] tracking-normal text-black transition-all duration-300 group-hover:tracking-wide truncate">
                  Praskla Digital <span className="text-[#E31D2E]">X</span>
                </span>
                <span className="mt-0.2 text-[7px] sm:text-[9px] text-gray-600 font-light tracking-[1px] sm:tracking-[1.5px] whitespace-nowrap truncate">
                  A Mindful Marketing and Production Firm
                </span>
              </div>
            </motion.div>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map(({ path, to, label }) => {
              const isActive = activeTab === path;
              return (
                <MagneticWrapper key={path} disabled={shouldReduceMotion}>
                  <Link
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className="relative px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 whitespace-nowrap z-10 outline-none focus-visible:ring-2 focus-visible:ring-[#E31D2E]"
                    style={{
                      color: isActive ? "#ffffff" : "#575757",
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBackground"
                        className="absolute inset-0 bg-[#E31D2E] rounded-full -z-10"
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 350, damping: 28 }
                        }
                        style={{
                          boxShadow: "0 6px 12px rgba(227,29,46,0.25), inset 0 2px 4px rgba(255,255,255,0.3)"
                        }}
                      />
                    )}
                    {label}
                  </Link>
                </MagneticWrapper>
              );
            })}
          </div>

          {/* ── CTA Button & Optional Icon (desktop) ── */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {/* Optional Language / Theme Icon */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-black border border-white/40 cursor-pointer"
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                boxShadow: "inset 0 2px 4px rgba(255,255,255,0.6), 0 4px 8px rgba(0,0,0,0.03)",
                backdropFilter: "blur(10px)"
              }}
              title="Language / Theme"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </motion.div>

            {/* Claymorphic CTA Button */}
            <motion.button
              onClick={() => setShowContactForm(true)}
              whileHover="hover"
              className="relative flex items-center gap-2 text-white font-semibold text-sm rounded-full overflow-hidden px-5 py-2.5 whitespace-nowrap cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#E31D2E] focus-visible:ring-offset-2"
              style={{
                backgroundColor: "#E31D2E",
              }}
              variants={{
                default: {
                  y: 0,
                  backgroundColor: "#E31D2E",
                  boxShadow: "0 8px 16px rgba(227, 29, 46, 0.2), inset 0 3px 6px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.25)"
                },
                hover: {
                  y: -2,
                  backgroundColor: "#000000",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3), inset 0 3px 6px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.5)"
                }
              }}
              initial="default"
              animate="default"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <span className="relative z-10">Start Your Project</span>
              <motion.svg
                className="relative z-10 w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                variants={{
                  default: { x: 0 },
                  hover: { x: 4 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            type="button"
            onClick={toggleMenu}
            className="lg:hidden relative z-10 flex flex-col justify-center items-center
                       w-10 h-10 sm:w-11 sm:h-11 gap-[5px] flex-shrink-0 ml-2
                       rounded-full hover:bg-[#E31D2E]/10 active:bg-[#E31D2E]/15 transition-colors duration-200"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span
              style={{ backgroundColor: "#E31D2E" }}
              className={`block w-5 h-[2px] rounded-full transition-all duration-300 origin-center
                ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              style={{ backgroundColor: "#E31D2E" }}
              className={`block h-[2px] rounded-full transition-all duration-300
                ${isOpen ? "w-0 opacity-0" : "w-5"}`}
            />
            <span
              style={{ backgroundColor: "#E31D2E" }}
              className={`block w-5 h-[2px] rounded-full transition-all duration-300 origin-center
                ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu Backdrop & Floating Bottom Sheet ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px]"
            />
            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "spring", damping: 25, stiffness: 200 }
              }
              className="lg:hidden fixed bottom-4 left-4 right-4 z-[9999] rounded-[28px] border border-white/40 p-6 flex flex-col gap-3 max-w-[500px] mx-auto shadow-[0_-12px_36px_rgba(0,0,0,0.12),inset 0 4px 8px rgba(255,255,255,0.6),inset 0 -4px 8px rgba(0,0,0,0.03)]"
              style={{
                background: "rgba(255, 255, 255, 0.88)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
              }}
            >
              {/* Drag handle decoration */}
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

              <div className="flex flex-col gap-2">
                {navLinks.map(({ path, to, label }) => {
                  const isActive = activeTab === path;
                  return (
                    <button
                      key={path}
                      style={{ touchAction: "manipulation", cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(false);
                        setIsVisible(true);
                        navigate(to);
                      }}
                      className={`flex items-center justify-center w-full py-4 rounded-2xl text-base font-semibold transition-all duration-300
                        ${isActive
                          ? "bg-[#E31D2E] text-white shadow-[0_8px_16px_rgba(227,29,46,0.2),inset 0 2px 4px rgba(255,255,255,0.3)]"
                          : "text-[#444444] hover:text-[#111111] hover:bg-black/5"
                        }`}
                    >
                      {label}
                    </button>
                  );
                })}

                {/* Mobile CTA Button */}
                <button
                  style={{ touchAction: "manipulation", cursor: "pointer" }}
                  onClick={() => {
                    setShowContactForm(true);
                    setIsOpen(false);
                  }}
                  className="mt-2 w-full py-4 rounded-2xl bg-black text-white font-bold text-base
                             hover:bg-[#111111] active:bg-gray-900 transition-all duration-300
                             shadow-[0_8px_20px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2"
                >
                  Start Your Project
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;