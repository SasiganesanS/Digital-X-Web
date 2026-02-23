import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGlobe, FaMobileAlt, FaShieldAlt } from "react-icons/fa";
import ServiceCalculator from "./ServiceCalculator";
import { ServiceHeroData } from "../constants";
import './Services.css';

export default function ModernServiceHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIndex((p) => (p + 1) % ServiceHeroData.length),
      4000
    );
    return () => clearInterval(t);
  }, []);

  // Handle scroll to calculator from mobile page resize
  useEffect(() => {
    const shouldScroll =
      sessionStorage.getItem("scrollToCalculator") === "true";

    if (shouldScroll) {
      // Try multiple times with increasing delays to ensure it works
      const attemptScroll = (attempt = 1) => {
        const calculatorElement = document.getElementById("service-calculator");

        if (calculatorElement) {
          const elementPosition =
            calculatorElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - 80;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          calculatorElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          sessionStorage.removeItem("scrollToCalculator");
        } else if (attempt < 5) {
          setTimeout(() => attemptScroll(attempt + 1), attempt * 200);
        }
      };

      setTimeout(() => attemptScroll(1), 300);
    }
  }, []);

  // Preload hero images
  useEffect(() => {
    ServiceHeroData.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  // Add responsive styles for tab view
  const responsiveStyles = `
    @media (min-width: 768px) and (max-width: 1024px) {
      .h-screen {
        height: auto;
      }
      .flex-row {
        flex-direction: column;
      }
      .gap-6 {
        gap: 1.5rem;
      }
      .text-[40px] {
        font-size: 1.5rem;
      }
    }
  `;

  // Inject responsive styles
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = responsiveStyles;
  document.head.appendChild(styleSheet);

  // Add responsive styles for 768x744 screen size
  const specificResponsiveStyles = `
    @media (min-width: 768px) and (max-width: 768px) and (min-height: 744px) and (max-height: 744px) {
      .text-[40px] {
        font-size: 1.25rem; /* Reduce hero text size */
      }
      .sliding-image-text {
        font-size: 0.875rem; /* Reduce text size inside sliding image */
      }
    }
  `;

  // Inject specific responsive styles
  const specificStyleSheet = document.createElement("style");
  specificStyleSheet.type = "text/css";
  specificStyleSheet.innerText = specificResponsiveStyles;
  document.head.appendChild(specificStyleSheet);

  const logosAndTexts = [
    {
      logo: FaGlobe,
      text: "Our solutions are global-ready, ensuring your business can seamlessly connect with audiences across the world, no matter the region or language."
    },
    {
      logo: FaMobileAlt,
      text: "We design with a mobile-first approach, delivering smooth, responsive, and user-friendly experiences that captivate users on any device."
    },
    {
      logo: FaShieldAlt,
      text: "Your business is secure by design, with robust protections and cutting-edge security measures implemented from the very beginning."
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logosAndTexts.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <section className="relative min-h-screen dark-section w-full bg-gradient-to-br from-[#0f0418] via-[#1a0b2e] to-[#2d1b3d] flex items-center justify-center overflow-hidden service-hero-4k">

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
        </div>

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
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-indigo-600 blur-[140px]"
        />

        {/* Elegant geometric pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />

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

        <div className="relative z-10 w-full h-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-20 sm:py-24 md:py-28 lg:py-32">
          <div className="max-w-7xl mx-auto w-full h-full flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center justify-center">
              <div className="w-full md:w-1/2 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 text-center md:text-left">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="hidden hide-design  md:block h-[2px] bg-gradient-to-r from-purple-400 to-transparent mb-4 md:mb-6 mx-auto md:mx-0"
              />

              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-[40px] hero-title sm:text-5xl text-center md:text-left md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight sm:leading-[1.15] tracking-wide"
              >
                Transforming
                <br />
                <span className="bg-gradient-to-r from-purple-300 via-purple-100 to-white bg-clip-text text-transparent">
                  Ideas
                </span>{" "}
                into
                <br />
                Digital Excellence
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex items-center gap-3 sm:gap-4 justify-center md:justify-start"
              >
                <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-purple-400/50 to-transparent" />
                <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-purple-400/50" />
                <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-purple-400/50 to-transparent" />
              </motion.div>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="text-center hero-desc md:text-left text-sm sm:text-base md:text-lg text-white/80 max-w-xl mx-auto md:mx-0 leading-relaxed font-light px-2 sm:px-0"
              >
                Comprehensive web, mobile and marketing solutions tailored to
                help your business grow fast, secure and user-focused.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start items-center"
              >
                <button
                  onClick={() => {
                    const el = document.getElementById("service-calculator");
                    if (el)
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="group relative inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-light text-sm sm:text-base overflow-hidden transition-all duration-300 hover:bg-purple-500/30 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/30 w-auto max-w-fit"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                    Get a Free Estimate
                  </span>
                </button>
              </motion.div>

              {/* Mobile: show as a sentence, Desktop: show as icons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="w-full"
              >
                {/* Mobile view: each feature as a sentence with icon */}
                <div className="block md:hidden pt-10">
                  <div
                    className="mx-auto max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-5 flex flex-col items-center space-y-4"
                    style={{
                      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
                      height: '230px', // Set a static height for the container
                    }}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                        {React.createElement(logosAndTexts[currentIndex].logo, {
                          className: "text-[#371445]/80 text-4xl sm:text-5xl", // Dark purple color
                        })}
                      </div>
                      <span className="text-center text-md sm:text-lg text-white/80 font-light mt-4">
                        {logosAndTexts[currentIndex].text}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Desktop view: icons */}
                <div className="hidden md:flex flex-wrap gap-3 sm:gap-4 md:gap-6 justify-center md:justify-start">
                  <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 text-white/70 group cursor-default">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                      <FaGlobe className="text-purple-300 text-sm sm:text-base " />
                    </div>
                    <span className="text-xs sm:text-sm font-light">Global-ready</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 text-white/70 group cursor-default">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                      <FaMobileAlt className="text-purple-300 text-sm sm:text-base" />
                    </div>
                    <span className="text-xs sm:text-sm font-light">Mobile-first</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 text-white/70 group cursor-default">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                      <FaShieldAlt className="text-purple-300 text-sm sm:text-base" />
                    </div>
                    <span className="text-xs sm:text-sm font-light">Secure by design</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="hidden md:flex w-full md:w-1/2 items-center justify-center mt-6 sm:mt-8 md:mt-0 "> 
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
              >
                <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 border-t-2 border-l-2 border-purple-400/30 hidden-4k " />
                <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 border-t-2 border-r-2 border-purple-400/30 hidden-4k " />
                <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 border-b-2 border-l-2 border-purple-400/30 hidden-4k " />
                <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 border-b-2 border-r-2 border-purple-400/30 hidden-4k " />


                <div className="relative  hero-image-container w-full h-[35vh] sm:h-[40vh] md:h-[45vh] lg:h-[50vh] max-h-[600px] rounded-sm overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/50">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                     
                      key={ServiceHeroData[index].image}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute inset-0 "
                      style={{
                        backgroundImage: `url(${ServiceHeroData[index].image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Content overlay with elegant typography */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 md:p-6 lg:p-8 text-white"
                      >
                        <div className="h-px w-10 hidden-4k sm:w-14 md:w-16 bg-gradient-to-r from-purple-400 to-transparent mb-2 sm:mb-2.5 md:mb-3 lg:mb-4" />
                        <h3 className="font-bold text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3 tracking-wide">
                          {ServiceHeroData[index].title}
                        </h3>
                        <p className="text-xs  sliding-image-text sm:text-sm md:text-base lg:text-lg text-white/80 font-light leading-relaxed">
                          {ServiceHeroData[index].desc}
                        </p>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 md:right-8 flex gap-1.5 sm:gap-2 z-20">
                    {ServiceHeroData.map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{
                          scale: i === index ? 1.2 : 0.8,
                          opacity: i === index ? 1 : 0.4,
                          width: i === index ? "24px" : "6px",
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-1.5 sm:h-2 rounded-full bg-white cursor-pointer"
                        onClick={() => setIndex(i)}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div id="service-calculator">
        <ServiceCalculator />
      </div>
    </>
  );
}
