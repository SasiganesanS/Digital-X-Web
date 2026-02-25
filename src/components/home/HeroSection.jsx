import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   Mini sparkline SVG
───────────────────────────────────────────── */
const HeroSection = () => {
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section
            id="home"
            className="dark-section relative w-full min-h-screen flex items-center overflow-hidden"
            style={{ background: "#080808" }}
        >
            {/* ── Background ── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Red glow — center bottom */}
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[clamp(400px,60vw,800px)] h-[clamp(400px,60vw,800px)] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(232,25,44,0.12) 0%, transparent 65%)",
                        transform: "translate(0, 35%)",
                    }}
                />
                {/* Red glow — top center */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[clamp(300px,40vw,600px)] h-[clamp(300px,40vw,600px)] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(232,25,44,0.06) 0%, transparent 65%)",
                        transform: "translate(0, -35%)",
                    }}
                />
                {/* Dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            {/* ── Main content ── */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-32 pb-20">
                <div className="flex flex-col items-center text-center">

                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#E8192C] animate-pulse" />
                        <span className="text-[#E8192C] text-xs font-black tracking-[0.4em] uppercase">
                            A Mindful Marketing and Production Firm
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        className="text-[clamp(2.5rem,8vw,5rem)] font-black leading-[1.05] tracking-tight text-white mb-8 max-w-5xl"
                    >
                        Where brands evolve into{" "}
                        <span className="relative inline-block">
                            <span className="text-[#E8192C]">powerful</span>
                            <motion.span
                                className="absolute -bottom-2 left-0 h-[4px] rounded-full bg-[#E8192C]"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1, delay: 1 }}
                            />
                        </span>{" "}
                        digital movements
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="text-white/50 text-lg sm:text-xl leading-relaxed mb-12 max-w-2xl"
                    >
                        Your strategic growth partner for branding, performance marketing,
                        and long-term digital scale. We don't just create campaigns; we build legacies.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-wrap items-center gap-5 justify-center mb-20"
                    >
                        {/* Primary */}
                        <button
                            onClick={() => scrollTo("contact")}
                            className="relative group flex items-center gap-3 bg-[#E8192C] text-white
                       px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest
                       hover:bg-[#ff2235] transition-all duration-300
                       hover:shadow-[0_0_40px_rgba(232,25,44,0.4)] hover:-translate-y-1
                       active:scale-95 overflow-hidden"
                        >
                            <span className="relative z-10">Start Growing</span>
                            <svg
                                className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>

                        {/* Secondary */}
                        <Link
                            to="/projects"
                            className="flex items-center gap-3 text-white/60 text-xs font-black uppercase tracking-widest
                       border border-white/10 px-10 py-5 rounded-full
                       hover:border-white/25 hover:text-white hover:bg-white/5
                       transition-all duration-300 hover:-translate-y-1"
                        >
                            See Our Work
                            <svg
                                className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" strokeWidth={2.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </motion.div>

                    {/* Trust stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-wrap items-center gap-12 justify-center"
                    >
                        {[
                            { num: "15+", label: "Clients" },
                            { num: "20+", label: "Projects" },
                            { num: "20+", label: "Tie-ups" },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center text-center">
                                <p className="text-white font-black text-3xl mb-1 tracking-tighter">{stat.num}</p>
                                <p className="text-[#E8192C] text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* ── Scroll indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-white/20 text-[9px] tracking-[0.25em] uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-8 bg-gradient-to-b from-[#E8192C]/60 to-transparent rounded-full"
                />
            </motion.div>
        </section>
    );
};

export default HeroSection;
