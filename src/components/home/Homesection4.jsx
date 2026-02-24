import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/* ─── Services data ─── */
const services = [
  {
    id: "01",
    title: "Content Creation",
    short: "Stories that convert.",
    desc: "Compelling copy, graphics, and videos crafted to capture attention and communicate your brand story across every platform — from reels to blogs.",
    tags: ["Copywriting", "Graphic Design", "Video Editing"],
    stat: { num: "3x", label: "Avg. engagement lift" },
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-9 9H9v-3z" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Social Media Management",
    short: "Always-on brand presence.",
    desc: "End-to-end management of your social channels — content calendars, community engagement, performance analytics, and platform-specific strategy.",
    tags: ["Scheduling", "Engagement", "Analytics"],
    stat: { num: "85%", label: "Avg. follower growth" },
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2M15 3H9a1 1 0 00-1 1v4a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1z" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Paid Advertising",
    short: "ROI-focused campaigns.",
    desc: "Precisely targeted ad campaigns across Meta, Google, and beyond — built to reach your ideal audience, maximise returns, and scale profitably.",
    tags: ["Meta Ads", "Google Ads", "Retargeting"],
    stat: { num: "4x", label: "Avg. ROAS delivered" },
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "SEO Optimization",
    short: "Rank higher. Stay visible.",
    desc: "Strategic on-page and technical SEO that drives organic visibility, improves rankings, and delivers a consistent stream of high-intent visitors.",
    tags: ["On-Page SEO", "Technical SEO", "Keyword Research"],
    stat: { num: "60%", label: "Avg. organic traffic boost" },
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
      </svg>
    ),
  },
  {
    id: "05",
    title: "Website Development",
    short: "Built to convert visitors.",
    desc: "Fast, modern, conversion-optimised websites and landing pages that represent your brand beautifully and turn visitors into paying customers.",
    tags: ["React / Next.js", "CMS", "Performance"],
    stat: { num: "2s", label: "Avg. load time target" },
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: "06",
    title: "Sales Strategy",
    short: "Prospects into clients.",
    desc: "Data-backed sales funnels, CRM setup, and conversion frameworks designed to systematically turn prospects into loyal, high-value clients.",
    tags: ["Funnels", "CRM", "Lead Gen"],
    stat: { num: "+40%", label: "Avg. conversion rate lift" },
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
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
      className="relative w-full overflow-hidden pt-0 pb-10 md:pb-16"
      style={{ background: "#0A0A0A" }}
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 mb-12">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C] animate-pulse" />
              <span className="text-[#E8192C] text-xs font-semibold tracking-[0.2em] uppercase">Our Services</span>
            </div>
            <h2 className="text-[clamp(1.85rem,5.5vw,3.25rem)] font-black leading-[1.1] tracking-tight text-white">
              Everything you need to{" "}
              <span className="text-[#E8192C]">grow</span>
            </h2>
          </motion.div>

          <motion.p
            className="flex-1 text-white/45 text-base md:text-lg leading-relaxed self-end lg:max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            We drive brand growth through thoughtful strategy, creative storytelling, and
            performance-focused execution — delivering measurable{" "}
            <span className="text-white/70 font-medium">visibility, engagement, and revenue</span>.
          </motion.p>
        </div>

        <motion.div
          className="flex flex-col lg:flex-row gap-4 lg:gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
                className="h-full rounded-2xl border border-white/8 p-5 md:p-7 lg:p-10 flex flex-col justify-between overflow-hidden relative"
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