import React from "react";
import { Link } from "react-router-dom";
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
  return (
    <div className="bg-[#050505] min-h-screen text-white overflow-x-hidden">
      {/* Unified: intro copy (left) + Core Expertise grid (right) + glitter */}
      <section
        id="services-main"
        className="services-unified-section relative w-full flex flex-col justify-center overflow-hidden px-[5%] py-12 sm:py-14 lg:py-16 scroll-mt-24"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#080808] to-[#1a0305] pointer-events-none" />
        <div className="services-glitter-layer absolute inset-0 pointer-events-none z-[1]" aria-hidden />
        <div className="absolute top-1/4 left-0 w-[420px] h-[420px] bg-[#E8192C]/10 rounded-full blur-[130px] pointer-events-none z-[1]" />
        <div className="absolute bottom-0 right-0 w-[380px] h-[380px] bg-[#E8192C]/6 rounded-full blur-[100px] pointer-events-none z-[1]" />

        {SECTION_SPARKLES.map((pos, i) => (
          <motion.div
            key={`svc-bg-sparkle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-white pointer-events-none z-[2]"
            style={{
              top: pos.top,
              left: pos.left,
              boxShadow: "0 0 12px 2px rgba(232,25,44,0.55)",
            }}
            animate={{
              opacity: [0, 0.95, 0],
              scale: [0.4, 1.15, 0.4],
              y: [0, -12, 0],
            }}
            transition={{
              duration: pos.dur,
              repeat: Infinity,
              delay: pos.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="relative z-10 w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 xl:gap-16 items-start lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl mx-auto lg:mx-0"
            >
              <div className="inline-flex items-center border border-white/10 gap-2 px-4 py-1.5 bg-[#E8192C]/10 rounded-full mb-6 shadow-[0_0_15px_rgba(232,25,44,0.2)]">
                <div className="w-2 h-2 rounded-full bg-[#E8192C] shadow-[0_0_8px_rgba(232,25,44,0.8)]" />
                <span className="text-xs font-bold text-white uppercase tracking-[0.2em] ml-1">
                  Our Services
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-[1.05] tracking-tight text-white">
                Transforming Brands into <br className="hidden sm:block" />
                <span className="text-[#E8192C]">Digital Authority</span>
              </h1>

              <p className="text-white/50 text-base md:text-lg leading-relaxed font-medium mb-8">
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
                  className="px-8 py-4 rounded-full font-bold border border-white/15 text-white/90 hover:border-[#E8192C]/50 hover:text-white transition-all"
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
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Our <span className="text-[#E8192C]">Core Expertise</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#E8192C] to-transparent rounded-full mx-auto lg:mx-0" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 w-full">
                {servicesData.map((service, i) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="relative bg-gradient-to-br from-[#080808] via-black to-[#E8192C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-5 md:p-6 pt-7 flex flex-col items-center text-center min-h-[260px] sm:min-h-[280px] cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgba(232,25,44,0.2)] transition-all duration-500 group border border-white/5 hover:border-[#E8192C]/40 overflow-hidden"
                  >
                    {[0, 1, 2].map((si) => (
                      <motion.div
                        key={si}
                        className="absolute w-1 h-1 bg-white rounded-full pointer-events-none z-0"
                        style={{
                          top: `${(i * 11 + si * 27) % 88}%`,
                          left: `${(i * 19 + si * 31) % 88}%`,
                          boxShadow: "0 0 10px 2px rgba(232,25,44,0.6)",
                        }}
                        animate={{
                          opacity: [0, 0.85, 0],
                          scale: [0.5, 1.2, 0.5],
                        }}
                        transition={{
                          duration: 2.2 + si * 0.3,
                          repeat: Infinity,
                          delay: (i * 0.2 + si * 0.4) % 2.5,
                          ease: "easeInOut",
                        }}
                      />
                    ))}

                    <div className="relative z-10 w-[88px] h-[88px] md:w-[100px] md:h-[100px] mb-5 rounded-full p-1.5 border-[3px] border-[#E8192C]/30 group-hover:border-[#E8192C] transition-all duration-500 flex items-center justify-center -mt-1 bg-black shadow-xl">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>

                    <h3 className="relative z-10 text-lg md:text-xl font-black text-white mb-2 tracking-tight group-hover:text-[#E8192C] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="relative z-10 text-white/50 font-medium text-sm leading-relaxed px-1 group-hover:text-white/70 transition-colors duration-300">
                      {service.desc}
                    </p>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E8192C]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-[5%] py-12 md:py-16 pb-20 bg-[#080808]">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] bg-gradient-to-r from-[#E8192C] to-[#b71422] p-8 md:p-12 text-center relative overflow-hidden shadow-[0_0_50px_rgba(232,25,44,0.15)]"
          >
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />

            <h2 className="text-2xl md:text-3xl font-black text-white mb-6 relative z-10 leading-tight">
              See the Impact <br className="hidden md:block" />
              We&apos;ve Delivered
            </h2>

            <Link
              to="/projects"
              className="inline-flex items-center justify-center bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95 relative z-10 shadow-2xl"
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
