import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Homesection4 = () => {
  return (
    <>
      {/* ── Our Services Overview Section (Split Layout) ── */}
      <section
        id="services"
        className="relative w-full min-h-screen flex flex-col justify-center overflow-visible lg:overflow-hidden py-20 bg-transparent"
        style={{ zIndex: 1 }}
      >
        {/* Soft Background Glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(227,29,46,0.03) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={containerVariants}
              className="flex flex-col items-start text-left"
            >
              {/* Eyebrow Badge */}
              <motion.div variants={fadeUp} className="inline-flex items-center border border-[#E31D2E]/20 gap-2 px-4 py-2 bg-white/80 rounded-full mb-8 shadow-[0_8px_16px_rgba(17,17,17,0.03)] backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31D2E]" />
                </span>
                <span className="text-xs font-bold text-[#111111] uppercase tracking-[0.25em] ml-1">Our Services</span>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-7xl font-black mb-8 leading-[1.05] tracking-tight text-[#111111]">
                Transforming Brands into <br />
                <span className="text-[#E31D2E]">Digital Authority</span>
              </motion.h1>

              {/* Description */}
              <motion.p variants={fadeUp} className="text-[#575757] text-lg md:text-xl leading-relaxed max-w-xl font-normal mb-10">
                Comprehensive branding, media, and performance marketing solutions designed to help your business grow strategically, creatively, and profitably.
              </motion.p>

              {/* Button */}
              <motion.div variants={fadeUp}>
                <Link to="/services">
                  <button className="primary-btn px-8 py-4 text-white rounded-full font-bold text-sm sm:text-base shadow-md hover:scale-102 transition-all">
                    Explore All Services
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Visual & Cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={containerVariants}
              className="relative block lg:block"
            >
              <div className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[32px] border border-neutral-200/80 bg-white/60 p-6 md:p-8 shadow-[0_16px_40px_rgba(17,17,17,0.04)] backdrop-blur-xl">
                <div className="relative z-10 space-y-4">
                  {/* Top Visual Anchor Card */}
                  <motion.div variants={fadeUp} className="relative overflow-hidden rounded-[24px] border border-neutral-200/80 bg-white p-6 sm:p-7 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
                    <span className="absolute inset-y-0 left-0 w-1.5 rounded-r-full bg-[#E31D2E]" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E31D2E]">What we deliver</p>
                    <h3 className="mt-2 text-2xl font-black text-[#111111]">A premium digital growth system</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#575757] font-normal">
                      From brand positioning to performance marketing, every service is built to elevate visibility, trust, and conversion.
                    </p>
                  </motion.div>

                  {/* 4 Feature Cards Grid */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      ["Brand Strategy", "Thoughtful positioning, visual identity, and messaging that feels intentional."],
                      ["Performance Marketing", "Paid campaigns and conversion-focused systems designed for measurable growth."],
                      ["Content & Media", "Creative storytelling and high-impact digital content that strengthens your presence."],
                      ["Growth Consulting", "Clear direction, planning, and execution support for long-term scale."],
                    ].map(([title, text]) => (
                      <motion.div
                        key={title}
                        variants={fadeUp}
                        className="group rounded-[22px] border border-neutral-200/80 bg-white p-5 shadow-xs hover:border-[#E31D2E]/40 hover:-translate-y-2 hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] transition-all duration-300"
                      >
                        <p className="text-base font-black text-[#111111] group-hover:text-[#E31D2E] transition-colors">{title}</p>
                        <p className="mt-2 text-xs leading-relaxed text-neutral-500 font-normal">{text}</p>
                      </motion.div>
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