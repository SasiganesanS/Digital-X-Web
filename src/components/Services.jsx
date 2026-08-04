import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./Services.css";
import servicesData from "../data/servicesData";

/** Stable sparkle positions (avoid Math.random() each render) */
const SECTION_SPARKLES = Array.from({ length: 18 }, (_, i) => ({
  top: `${(i * 17 + 7) % 92}%`,
  left: `${(i * 23 + 11) % 92}%`,
  delay: (i * 0.31) % 3,
  dur: 2.5 + (i % 5) * 0.35,
}));

const Services = () => {
  const location = useLocation();
  const cardRefs = useRef({});
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const serviceTarget =
      location.state?.highlightService ||
      location.state?.selectedService ||
      new URLSearchParams(location.search).get("service");

    if (serviceTarget) {
      const matchedService = servicesData.find(
        (s) =>
          s.title.toLowerCase() === serviceTarget.toLowerCase() ||
          s.title.toLowerCase().includes(serviceTarget.toLowerCase())
      );

      if (matchedService) {
        const titleKey = matchedService.title;
        setSelectedTitle(titleKey);

        const timer = setTimeout(() => {
          const cardEl = cardRefs.current[titleKey];
          if (cardEl) {
            cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
            setIsFocused(true);
          }
        }, 150);

        return () => clearTimeout(timer);
      }
    }
  }, [location]);

  return (
    <div className="bg-white min-h-screen text-[#111111] overflow-x-hidden">
      {/* Unified: intro copy (left) + Core Expertise grid (right) */}
      <section
        id="services-main"
        className="services-unified-section relative w-full flex flex-col justify-center overflow-hidden py-12 sm:py-14 lg:py-16 scroll-mt-24 bg-white"
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 xl:gap-16 items-start lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl mx-auto lg:mx-0"
            >
              <div className="inline-flex items-center border border-neutral-200 gap-2 px-4 py-1.5 bg-[#FF2B2B]/5 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-[#FF2B2B]" />
                <span className="text-xs font-bold text-[#FF2B2B] uppercase tracking-[0.2em] ml-1">
                  Our Services
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-[1.05] tracking-tight text-[#111111]">
                Transforming Brands into <br className="hidden sm:block" />
                <span className="text-[#FF2B2B]">Digital Authority</span>
              </h1>

              <p className="text-[#555555] text-base md:text-lg leading-relaxed font-medium mb-8">
                Comprehensive branding, media, and performance marketing solutions designed to help
                your business grow strategically, creatively, and profitably.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  to="/projects"
                  className="primary-btn px-8 py-4 text-white rounded-full font-bold"
                >
                  View Our Portfolio
                </Link>
                <a
                  href="#expertise"
                  className="px-8 py-4 rounded-full font-bold border border-neutral-200 text-[#111111] hover:border-[#FF2B2B] hover:text-[#FF2B2B] transition-all"
                >
                  Core Expertise
                </a>
              </div>
            </motion.div>

            <motion.div
              id="expertise"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="w-full min-w-0"
            >
              <div className="flex flex-col gap-2 mb-8 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
                  Our <span className="text-[#FF2B2B]">Core Expertise</span>
                </h2>
                <div className="h-1 w-24 bg-[#FF2B2B] rounded-full mx-auto lg:mx-0" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 w-full">
                {servicesData.map((service, i) => {
                  const isSelected = service.title === selectedTitle;

                  return (
                    <motion.div
                      key={service.title}
                      ref={(el) => (cardRefs.current[service.title] = el)}
                      id={`service-card-${service.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      animate={
                        isSelected && isFocused
                          ? {
                              scale: [1, 1.07, 1.04],
                              y: [0, -12, -8],
                              boxShadow: [
                                "0 8px 30px rgba(0,0,0,0.04)",
                                "0 24px 60px rgba(255,43,43,0.3)",
                                "0 18px 45px rgba(255,43,43,0.2)"
                              ]
                            }
                          : {}
                      }
                      transition={
                        isSelected && isFocused
                          ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                          : { duration: 0.5, delay: i * 0.06 }
                      }
                      style={{
                        border: isSelected
                          ? "2px solid #FF2B2B"
                          : "1px solid rgba(75, 46, 131, 0.35)",
                      }}
                      className={`relative bg-white rounded-2xl p-5 md:p-6 pt-7 flex flex-col items-center text-center min-h-[260px] sm:min-h-[280px] cursor-pointer transition-all duration-500 group overflow-hidden ${
                        isSelected
                          ? "shadow-[0_18px_45px_rgba(255,43,43,0.2)] -translate-y-2 z-20"
                          : "hover:border-[#FF2B2B]/40 hover:-translate-y-1.5 hover:shadow-[0_16px_50px_rgba(0,0,0,0.08)] shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                      }`}
                    >
                      {/* Active Red Tag Indicator */}
                      {isSelected && (
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF2B2B]/10 border border-[#FF2B2B]/30">
                          <span className="h-2 w-2 rounded-full bg-[#FF2B2B] animate-pulse" />
                          <span className="text-[10px] font-bold text-[#FF2B2B] uppercase tracking-wider">
                            Selected
                          </span>
                        </div>
                      )}

                      <div className={`relative z-10 w-[88px] h-[88px] md:w-[100px] md:h-[100px] mb-5 rounded-full p-1.5 transition-all duration-500 flex items-center justify-center -mt-1 bg-white shadow-sm ${
                        isSelected
                          ? "border-[3px] border-[#FF2B2B] ring-4 ring-[#FF2B2B]/15"
                          : "border-[3px] border-neutral-200 group-hover:border-[#FF2B2B]"
                      }`}>
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>

                      <h3 className={`relative z-10 text-lg md:text-xl font-black mb-2 tracking-tight transition-colors duration-300 ${
                        isSelected ? "text-[#FF2B2B]" : "text-[#111111] group-hover:text-[#FF2B2B]"
                      }`}>
                        {service.title}
                      </h3>
                      <p className="relative z-10 text-[#555555] font-medium text-sm leading-relaxed px-1 group-hover:text-[#111111] transition-colors duration-300">
                        {service.desc}
                      </p>

                      <div className={`absolute bottom-0 left-0 w-full h-1 bg-[#FF2B2B] transition-transform duration-700 ${
                        isSelected ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`} />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-16 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] bg-[#111111] p-8 md:p-12 text-center relative overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
          >
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6 relative z-10 leading-tight">
              See the Impact <br className="hidden md:block" />
              We&apos;ve Delivered
            </h2>

            <Link
              to="/projects"
              className="inline-flex items-center justify-center bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm hover:bg-neutral-100 transition-all duration-300 hover:scale-105 active:scale-95 relative z-10 shadow-md"
            >
              View Our Portfolio
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
