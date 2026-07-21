import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Praskla_Digital_X_Logo_Trasnparent_Background.png";

const Navbar = ({ setShowContactForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);

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

  // Close the mobile menu automatically if the viewport is resized up to
  // desktop width (e.g. rotating a tablet or resizing a browser window).
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

  const navLinkClass = (path) =>
    `relative px-3 xl:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
     overflow-hidden group whitespace-nowrap
     ${activeTab === path
      ? "bg-[#E8192C] text-white shadow-[0_0_20px_rgba(232,25,44,0.4)]"
      : "text-black/80 hover:text-black"
    }`;

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed w-[92%] sm:w-[90%] md:w-[88%] max-w-[1280px] z-50 top-3 sm:top-4 left-1/2 -translate-x-1/2
                    rounded-full border transition-all duration-500 transform px-3 sm:px-4 lg:px-5
                    ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
                    ${scrolled
            ? "border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_80px_rgba(232,25,44,0.08)]"
            : "border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          }`}
        style={{
          background: "white",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        <div className="flex items-center justify-between h-[56px] sm:h-[60px]">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0 min-w-0 pr-2">
            {/* Icon mark — transparent background */}
            <div
              className="relative w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center overflow-hidden rounded-lg flex-shrink-0"
              style={{ background: "", boxShadow: "0 0 12px rgba(232,25,44,0.2)" }}
            >
              <img
                src={Logo}
                alt="Praskla Digital X"
                
                className="w-full h-full object-cover"
              />
        
            </div>

            {/* Brand text */}
           <div className="flex flex-col justify-center min-w-0 pl-1">
             <span
  className="font-semibold text-[10px] sm:text-[13px] tracking-normal text-black transition-all duration-300 group-hover:tracking-wide truncate"
>
  Praskla Digital <span className="text-[#E8192C]">X</span>
</span>
              <span
  className="mt-0.2 text-[7px] sm:text-[9px] text-gray-600 font-light tracking-[1px] sm:tracking-[1.5px] whitespace-nowrap truncate"
>
  A Mindful Marketing and Production Firm
</span>
            </div>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map(({ path, to, label }) => (
              <Link
                key={path}
                to={to}
                onClick={() => setIsOpen(false)}
                className={navLinkClass(path)}
              >
                {/* Hover shimmer */}
                {activeTab !== path && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                )}
                {label}
              </Link>
            ))}
          </div>

          {/* ── CTA Button (desktop) ── */} 
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setShowContactForm(true)}
              className="relative group flex items-center gap-2 bg-[#E8192C] text-white
                         px-4 xl:px-5 py-2 rounded-full text-sm font-semibold
                         transition-all duration-300
                         hover:bg-[#ff2235] hover:shadow-[0_0_25px_rgba(232,25,44,0.5)]
                         hover:scale-105 active:scale-95 overflow-hidden whitespace-nowrap"
            >
              {/* Shine sweep */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 -skew-x-12" />
              <span className="relative z-10">Get Started</span>
              <svg
                className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            type="button"
            onClick={toggleMenu}
            className="lg:hidden relative z-10 flex flex-col justify-center items-center
                       w-10 h-10 sm:w-11 sm:h-11 gap-[5px] flex-shrink-0 ml-2
                       rounded-full hover:bg-[#E8192C]/10 active:bg-[#E8192C]/15 transition-colors duration-200"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {/* Lines use the brand red so they stay clearly visible
                against the white navbar on every screen size. */}
            <span
              style={{ backgroundColor: "#E8192C" }}
              className={`block w-5 h-[2px] rounded-full transition-all duration-300 origin-center
                ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              style={{ backgroundColor: "#E8192C" }}
              className={`block h-[2px] rounded-full transition-all duration-300
                ${isOpen ? "w-0 opacity-0" : "w-5"}`}
            />
            <span
              style={{ backgroundColor: "#E8192C" }}
              className={`block w-5 h-[2px] rounded-full transition-all duration-300 origin-center
                ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Backdrop ── */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[9998] bg-black/20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ── Mobile Menu ── */}
      <div
        className={`lg:hidden fixed top-[76px] sm:top-[80px] left-3 right-3 sm:left-4 sm:right-4 z-[9999] rounded-2xl border border-white/10
                    transition-[opacity,transform] duration-300 ease-out overflow-hidden
                    max-h-[calc(100vh-96px)] overflow-y-auto
                    ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none"}`}
        style={{
          background: "rgba(10, 10, 10, 0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="p-3 flex flex-col gap-1">
          {navLinks.map(({ path, to, label }) => (
            <button
              key={path}
              style={{ touchAction: "manipulation", cursor: "pointer" }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("[NavMobile-touch] navigating to →", to);
                setIsOpen(false);
                setIsVisible(true);
                navigate(to);
              }}
              onClick={(e) => {
                e.stopPropagation();
                console.log("[NavMobile-click] navigating to →", to);
                setIsOpen(false);
                setIsVisible(true);
                navigate(to);
              }}
              className={`flex items-center w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200
                ${activeTab === path
                  ? "bg-[#E8192C]/15 text-[#E8192C] border border-[#E8192C]/30"
                  : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
            >
              {label}
            </button>
          ))}

          {/* Mobile CTA */}
          <button
            style={{ touchAction: "manipulation", cursor: "pointer" }}
            onClick={() => { setShowContactForm(true); setIsOpen(false); }}
            className="mt-2 w-full py-3 rounded-xl bg-[#E8192C] text-white font-semibold text-sm
                       hover:bg-[#ff2235] transition-colors duration-200
                       shadow-[0_4px_20px_rgba(232,25,44,0.3)]"
          >
            Get Started →
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;