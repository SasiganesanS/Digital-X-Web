import React from "react";
import { motion } from "framer-motion";

/* ─── Main section ─── */
const OurServices = () => {

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
        {/* ── Header Area ── */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Glitter badge */}
            <div
              className="relative inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(232,25,44,0.18) 0%, rgba(0,0,0,0.6) 50%, rgba(232,25,44,0.12) 100%)",
                border: "1px solid rgba(232,25,44,0.5)",
                boxShadow: "0 0 18px rgba(232,25,44,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)" }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
              />
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-[#E8192C]/80 to-transparent" />
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8192C] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E8192C]" />
              </span>
              <span
                className="relative text-white text-xs sm:text-sm font-bold tracking-[0.3em] uppercase"
                style={{ textShadow: "0 0 10px rgba(232,25,44,0.7)" }}
              >
                Our Services
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Transforming Brands into <br />
              <span className="text-[#E8192C]">Digital Authority</span>
            </h2>
            
            <p className="text-white/50 text-lg md:text-xl leading-relaxed">
              We drive brand growth through thoughtful strategy, creative storytelling, and performance-focused execution — continuously planning, refining, and optimizing every campaign to deliver measurable visibility, engagement, and revenue.
            </p>

            <div className="pt-4">
              <button
                className="px-8 py-3.5 bg-gradient-to-r from-[#E8192C] to-red-800 text-white rounded-full font-bold hover:scale-105 transition-all shadow-[0_10px_30px_rgba(232,25,44,0.2)]"
              >
                Explore All Services
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            {/* Sparkles around image */}
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-1.5 h-1.5 bg-white rounded-full z-20 pointer-events-none"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  boxShadow: "0 0 10px 2px rgba(232,25,44,0.6)",
                }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              />
            ))}

            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E8192C]/20 to-transparent mix-blend-overlay z-10" />
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
                alt="Digital Strategy"
                className="w-full aspect-[4/3] object-cover group-hover:scale-110 transition-transform duration-1000"
              />
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#E8192C]/20 blur-[60px] rounded-full" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default OurServices;