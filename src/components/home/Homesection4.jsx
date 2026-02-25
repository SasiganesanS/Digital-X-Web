import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/* ─── Services data ─── */
const services = [
  {
    id: "01",
    title: "Web Development",
    short: "Fast & Responsive.",
    desc: "We craft fast, responsive, and visually refined websites that strengthen brand presence and deliver seamless experiences across all devices.",
    tags: ["React & Vite", "UI/UX Design", "Performance"],
    stat: { num: "99%", label: "Core Web Vitals" },
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Software Development",
    short: "Scalable Solutions.",
    desc: "We design and build reliable, scalable software solutions tailored to business needs, enabling efficiency, performance, and long-term growth.",
    tags: ["Custom ERP", "API Integration", "Cloud Native"],
    stat: { num: "40%", label: "Efficiency Gain" },
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "App Development",
    short: "Native Performance.",
    desc: "We develop high-performance mobile applications that combine intuitive design with robust functionality across Android and iOS platforms.",
    tags: ["React Native", "iOS & Android", "App Store SEO"],
    stat: { num: "4.8", label: "Avg. User Rating" },
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Cyber Security",
    short: "Digital Resilience.",
    desc: "We secure digital ecosystems through advanced security architectures, continuous monitoring, and proactive risk management to safeguard data and build trust.",
    tags: ["Encryption", "Cloud Security", "Auditing"],
    stat: { num: "24/7", label: "Threat Monitoring" },
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: "05",
    title: "Digital Marketing",
    short: "Data-Driven Growth.",
    desc: "We deliver data-driven digital marketing strategies that enhance brand visibility, engage audiences, and drive measurable business results.",
    tags: ["Performance Marketing", "Social Ads", "Growth Hacking"],
    stat: { num: "340%", label: "Avg. ROI Increase" },
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
  {
    id: "06",
    title: "Sustainability",
    short: "Responsible Growth.",
    desc: "We integrate smart technologies and sustainable practices to support responsible growth while reducing environmental impact and creating lasting value.",
    tags: ["Green Hosting", "Sustainable Tech", "Social Impact"],
    stat: { num: "Zero", label: "Carbon Strategy" },
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

/* ─── Main section ─── */
const OurServices = () => {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden pt-12 md:pt-20 lg:pt-28 pb-10 md:pb-16"
      style={{ background: "#0A0A0A", zIndex: 0 }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ background: "radial-gradient(circle, rgba(232,25,44,0.04) 0%, transparent 65%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "44px 44px" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 focus-within:z-20">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 mb-12">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C] animate-pulse" />
              <span className="text-[#E8192C] text-xs font-semibold tracking-[0.2em] uppercase">Our Services</span>
            </div>
            <h2 className="text-[clamp(1.85rem,5.5vw,3.25rem)] font-black leading-tight tracking-tight text-white">
              Our <span className="text-[#E8192C]">Services</span>
            </h2>
          </motion.div>

          <motion.p
            className="flex-1 text-white/45 text-base md:text-lg leading-relaxed self-end lg:max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            We drive brand growth through thoughtful strategy, creative storytelling, and performance-focused execution — continuously planning, refining, and optimizing every campaign to deliver measurable visibility, engagement, and revenue.
          </motion.p>
        </div>

        <motion.div
          className="flex flex-col lg:flex-row gap-4 lg:gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible
                       flex-shrink-0 lg:basis-[280px] pb-2 lg:pb-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((svc, i) => {
              const isActive = i === active;
              return (
                <button
                  key={svc.id}
                  onClick={() => setActive(i)}
                  className="relative flex items-center gap-3 text-left rounded-xl px-3 py-3 lg:px-4 lg:py-3.5
                             flex-shrink-0 lg:flex-shrink w-auto min-w-[140px] sm:min-w-[170px] lg:w-full
                             transition-colors duration-300 group"
                  style={{
                    background: isActive ? "#161616" : "transparent",
                    border: isActive ? "1px solid rgba(232,25,44,0.3)" : "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Active left bar */}
                  {isActive && (
                    <motion.div
                      layoutId="tab-bar"
                      className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-[#E8192C]"
                    />
                  )}

                  {/* Icon */}
                  <span
                    className="flex-shrink-0 transition-colors duration-300"
                    style={{ color: isActive ? "#E8192C" : "rgba(255,255,255,0.25)" }}
                  >
                    {svc.icon}
                  </span>

                  {/* Label */}
                  <div className="flex flex-col min-w-0">
                    <span
                      className="font-semibold text-sm leading-tight transition-colors duration-300 truncate"
                      style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.4)" }}
                    >
                      {svc.title}
                    </span>
                    {isActive && (
                      <span className="text-white/30 text-[10px] mt-0.5 truncate">{svc.short}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT — Content panel */}
          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-full rounded-2xl border border-white/8 p-5 md:p-7 lg:p-10 flex flex-col justify-between relative"
                style={{ background: "#111" }}
              >
                {/* Background glow */}
                <div
                  className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 80% 10%, rgba(232,25,44,0.07) 0%, transparent 65%)" }}
                />
                {/* Large faded number */}
                <span
                  className="absolute bottom-4 right-6 font-black leading-none select-none text-[#E8192C]/5"
                  style={{ fontSize: "10rem" }}
                  aria-hidden
                >
                  {current.id}
                </span>

                <div className="relative z-10">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-[#E8192C]
                                 border border-[#E8192C]/20"
                      style={{ background: "rgba(232,25,44,0.08)" }}
                    >
                      {current.icon}
                    </div>
                    {/* Stat chip */}
                    <div
                      className="flex flex-col items-end rounded-xl px-4 py-2 border border-[#E8192C]/15"
                      style={{ background: "rgba(232,25,44,0.05)" }}
                    >
                      <span className="text-[#E8192C] font-black text-2xl leading-none">{current.stat.num}</span>
                      <span className="text-white/30 text-[10px] mt-0.5 text-right">{current.stat.label}</span>
                    </div>
                  </div>

                  {/* Title + desc */}
                  <h3 className="text-white font-black text-xl md:text-2xl lg:text-3xl mb-3">{current.title}</h3>
                  <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-xl">{current.desc}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {current.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium px-3 py-1.5 rounded-full border border-white/8 text-white/40"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 bg-[#E8192C] text-white
                               px-6 py-2.5 rounded-full font-semibold text-sm
                               hover:bg-[#ff2235] hover:shadow-[0_0_24px_rgba(232,25,44,0.4)]
                               hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                  >
                    Learn more
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>

                  {/* Step indicator */}
                  <div className="flex items-center gap-1.5">
                    {services.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className="transition-all duration-300 rounded-full"
                        style={{
                          width: i === active ? "20px" : "6px",
                          height: "6px",
                          background: i === active ? "#E8192C" : "rgba(255,255,255,0.15)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default OurServices;