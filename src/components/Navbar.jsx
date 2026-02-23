import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
// <-- 1. Import both logos
import logoDark from "../assets/py.png"; // Your original dark purple logo
import logoLight from "../assets/py.jpg"; // <-- A white/light version of your logo

// <-- 2. Accept the new 'isOverDarkSection' prop
const Navbar = ({ setShowContactForm, isOverDarkSection = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const location = useLocation();
  const navRef = useRef(null);

  const activeTab =
    location.pathname === "/" ? "home" : location.pathname.slice(1);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  useEffect(() => {
    // Scroll to top when location changes
    window.scrollTo(0, 0);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinkStyles = (
    path
  ) => `px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 font-medium
    text-sm md:text-[15px] lg:text-base
    relative overflow-hidden
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-400/0 before:via-purple-400/20 before:to-purple-400/0
    before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700
    ${
      activeTab === path
        ? isOverDarkSection
          ? "bg-white/20 text-white shadow-md backdrop-blur-sm ring-2 ring-white/30"
          : "bg-[#371445] text-white shadow-md ring-2 ring-[#371445]/50"
        : // <-- 5. Conditionally change inactive link color
        isOverDarkSection
        ? "text-white hover:bg-white/20 hover:shadow-lg" // White text for dark bg
        : "text-[#371445] hover:bg-white/30 hover:shadow-lg" // Purple text for light bg
    }`;

  const handleTabClick = (tab) => {
    setIsOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed w-[90%] max-w-[1280px] z-30 top-4 left-1/2 -translate-x-1/2 
                  rounded-full border border-white/40
                  bg-gradient-to-r from-white/15 via-white/10 to-white/15
                  shadow-[0_12px_40px_rgba(0,0,0,0.25),0_0_60px_rgba(55,20,69,0.15)]
                  transition-all duration-300 transform
                  px-6
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.3),0_0_80px_rgba(55,20,69,0.25)]
                  hover:border-white/50
                  before:absolute before:inset-0 before:rounded-full before:p-[1px]
                  before:bg-gradient-to-r before:from-purple-400/20 before:via-pink-400/20 before:to-purple-400/20
                  before:-z-10 before:blur-sm before:opacity-0 hover:before:opacity-100
                  before:transition-opacity before:duration-500
                  ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-full opacity-0"
                  }`}
      style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
    >
      <div className="flex items-center justify-between h-16">
        {/* Logo / Brand */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <img
                // <-- 3. Conditionally change the logo source
                src={isOverDarkSection ? logoLight : logoDark}
                alt="Praskla Logo"
                className="h-10 w-10 mr-2 rounded-lg
                           shadow-[0_8px_15px_-3px_rgba(55,20,69,0.2)]
                           transition-all duration-300
                           group-hover:scale-110 group-hover:rotate-3
                           group-hover:shadow-[0_12px_25px_-3px_rgba(55,20,69,0.4)]"
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
            </div>
            <span
              className={`font-bold whitespace-nowrap
                             drop-shadow-[0_2px_2px_rgba(55,20,69,0.1)]
                             transition-all duration-300
                             group-hover:tracking-wide
                             text-lg md:text-xl
                             ${
                               // <-- 4. Conditionally change brand text color
                               isOverDarkSection
                                 ? "text-white"
                                 : "text-[#371445]"
                             }`}
            >
              Praskla Technology
            </span>
          </Link>
        </div>
        {/* Desktop Menu - Centered */}
        <div className="hidden lg:flex justify-center flex-grow">
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              onClick={() => handleTabClick("home")}
              className={navLinkStyles("home")}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => handleTabClick("about")}
              className={navLinkStyles("about")}
            >
              About
            </Link>
            <Link
              to="/services"
              onClick={() => handleTabClick("services")}
              className={navLinkStyles("services")}
            >
              Services
            </Link>
            <Link
              to="/projects"
              onClick={() => handleTabClick("projects")}
              className={navLinkStyles("projects")}
            >
              Projects
            </Link>
            <Link
              to="/careers"
              onClick={() => handleTabClick("careers")}
              className={navLinkStyles("careers")}
            >
              Careers
            </Link>
          </div>
        </div>
        {/* Contact Us Button - Right Side */}
        <div className="hidden lg:flex flex-shrink-0">
          <button
            onClick={() => setShowContactForm(true)}
            className="group relative inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-2.5 rounded-full font-light whitespace-nowrap
                       text-sm md:text-[15px] lg:text-base
                       overflow-hidden transition-all duration-300 hover:bg-purple-500/30 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/30"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
              Contact Us
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </button>
        </div>
        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            type="button"
            className={`flex items-center justify-center p-2 rounded-md focus:outline-none 
                        transition-colors duration-300
                        ${
                          // <-- 6. Conditionally change mobile icon color
                          isOverDarkSection
                            ? "text-white hover:text-gray-200"
                            : "text-[#371445] hover:text-[#4a1c5e]"
                        }`}
          >
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-[80px] left-4 right-4 
                    bg-white shadow-lg rounded-2xl
                    transform transition-all duration-200 ease-in-out
                    ${
                      isOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
      >
        <div className="p-2">
          <Link
            to="/"
            onClick={() => handleTabClick("home")}
            className={`flex items-center w-full px-4 py-3 rounded-xl transition-colors
                      text-sm
                      ${
                        activeTab === "home"
                          ? "bg-[#371445]/5 text-[#371445] font-medium"
                          : "text-[#5F5F5F] hover:bg-gray-50"
                      }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => handleTabClick("about")}
            className={`flex items-center w-full px-4 py-3 rounded-xl transition-colors
                      text-sm
                      ${
                        activeTab === "about"
                          ? "bg-[#371445]/5 text-[#371445] font-medium"
                          : "text-[#5F5F5F] hover:bg-gray-50"
                      }`}
          >
            About
          </Link>
          <Link
            to="/services"
            onClick={() => handleTabClick("services")}
            className={`flex items-center w-full px-4 py-3 rounded-xl transition-colors
                      text-sm
                      ${
                        activeTab === "services"
                          ? "bg-[#371445]/5 text-[#371445] font-medium"
                          : "text-[#5F5F5F] hover:bg-gray-50"
                      }`}
          >
            Services
          </Link>
          <Link
            to="/projects"
            onClick={() => handleTabClick("projects")}
            className={`flex items-center w-full px-4 py-3 rounded-xl transition-colors
                      text-sm
                      ${
                        activeTab === "projects"
                          ? "bg-[#371445]/5 text-[#371445] font-medium"
                          : "text-[#5F5F5F] hover:bg-gray-50"
                      }`}
          >
            Projects
          </Link>
          <Link
            to="/careers"
            onClick={() => handleTabClick("careers")}
            className={`flex items-center w-full px-4 py-3 rounded-xl transition-colors
                      text-sm
                      ${
                        activeTab === "careers"
                          ? "bg-[#371445]/5 text-[#371445] font-medium"
                          : "text-[#5F5F5F] hover:bg-gray-50"
                      }`}
          >
            Careers
          </Link>
          {/* Contact Us Button for Mobile */}
          <button
            onClick={() => {
              setShowContactForm(true);
              setIsOpen(false);
            }}
            className="flex items-center justify-center w-full px-4 py-3 mt-2 rounded-full 
                       bg-[#371445] text-white font-medium transition-all
                       text-sm
                       shadow-[0_6px_20px_rgba(45,27,78,0.3)]
                       hover:shadow-[0_8px_25px_rgba(45,27,78,0.4)]"
          >
            Reach Us
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
