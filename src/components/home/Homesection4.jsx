import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Homesection4 = () => {
  return (
    <>
      {/* ── Our Services Section (Split Layout) ── */}
      <section
        id="services"
        className="relative w-full min-h-screen flex flex-col justify-center overflow-visible lg:overflow-hidden py-16"
        style={{ background: "transparent", zIndex: 1 }}
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start text-left"
            >
              <div className="inline-flex items-center border border-[#E31D2E]/20 gap-2 px-4 py-1.5 bg-white/60 rounded-full mb-8 shadow-[0_8px_16px_rgba(17,17,17,0.02)]">
                <div className="w-2 h-2 rounded-full bg-[#E31D2E]" />
                <span className="text-xs font-bold text-[#111111] uppercase tracking-[0.25em] ml-1">Our Services</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-8 leading-[1.05] tracking-tight text-[#111111]">
                Transforming Brands into <br />
                <span className="text-[#E31D2E]">Digital Authority</span>
              </h1>

              <p className="text-[#575757] text-lg md:text-xl leading-relaxed max-w-xl font-normal mb-10">
                Comprehensive branding, media, and performance marketing solutions designed to help your business grow strategically, creatively, and profitably.
              </p>

              <Link to="/services">
                <button className="px-8 py-4 bg-[#E31D2E] text-white rounded-full font-bold transition-all duration-300 hover:bg-[#111111] hover:scale-105 active:scale-95 shadow-[0_8px_20px_rgba(227,29,46,0.15)]">
                  Explore All Services
                </button>
              </Link>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative block lg:block"
            >
              <div className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[2.5rem] border border-white/50 bg-white/45 p-6 shadow-[0_12px_32px_rgba(17,17,17,0.04)] backdrop-blur-xl md:p-8 lg:p-10">
                <div className="relative z-10 space-y-5">
                  <div className="rounded-[1.4rem] border border-[#E31D2E]/20 bg-white/60 p-5 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E31D2E]">What we deliver</p>
                    <h3 className="mt-2 text-2xl font-black text-[#111111]">A premium digital growth system</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#575757]">
                      From brand positioning to performance marketing, every service is built to elevate visibility, trust, and conversion.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      ["Brand Strategy", "Thoughtful positioning, visual identity, and messaging that feels intentional."],
                      ["Performance Marketing", "Paid campaigns and conversion-focused systems designed for measurable growth."],
                      ["Content & Media", "Creative storytelling and high-impact digital content that strengthens your presence."],
                      ["Growth Consulting", "Clear direction, planning, and execution support for long-term scale."],
                    ].map(([title, text]) => (
                      <div key={title} className="rounded-[1.2rem] border border-[#E31D2E]/10 bg-white/50 p-4 shadow-sm">
                        <p className="text-sm font-black text-[#111111]">{title}</p>
                        <p className="mt-2 text-xs leading-relaxed text-[#575757]">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homesection4;