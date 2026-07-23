import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SolarSystemHero from "./SolarSystemHero";

const HeroSection = () => {
    return (
        <section
            id="home"
            className="relative w-full h-screen max-h-screen overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: "transparent" }}
        >
            {/* ── Background (handled by CinematicUniverse) ── */}
            <div className="absolute inset-0 pointer-events-none z-0" />

            {/* ── Content Block ── */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 pt-24 sm:pt-20 lg:pt-16 pb-10 lg:pb-0">

                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

                    {/* ── LEFT: Text content + stats ── */}
                    <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl w-full relative">

                        {/* Eyebrow badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full overflow-hidden border border-[#E31D2E]/20 bg-white/60 shadow-[0_8px_16px_rgba(17,17,17,0.03)]"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31D2E]" />
                            </span>
                            <span className="relative text-[#111111] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                                A Mindful Marketing and Production Firm
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="font-black leading-[1.08] tracking-tight text-[#111111] mb-4 w-full"
                            style={{ fontSize: "clamp(2.0rem, 4.8vw, 4.0rem)" }}
                        >
                            Where brands evolve into{" "}
                            <span className="relative inline-block text-[#E31D2E]">
                                powerful
                                <motion.span
                                    className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-[#E31D2E] w-full"
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{ scaleX: 1, opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 1.2, ease: "circOut" }}
                                    style={{ transformOrigin: "center" }}
                                />
                            </span>{" "}
                            digital movements.
                        </motion.h1>

                        {/* Subtext */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="text-[#575757] text-sm sm:text-base font-medium leading-relaxed mb-6 max-w-lg"
                        >
                            Your strategic growth partner for branding, performance marketing,
                            and long-term digital scale. We don't just create campaigns; we build legacies.
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex items-center gap-4 justify-center lg:justify-start mb-6"
                        >
                            <Link
                                to="/projects"
                                className="group relative inline-flex items-center justify-center gap-3
                                overflow-hidden rounded-full bg-[#E31D2E]
                                px-8 py-4
                                text-xs sm:text-sm font-bold uppercase tracking-[0.15em] sm:tracking-[0.18em] text-white
                                shadow-[0_8px_20px_rgba(227,29,46,0.2)]
                                transition-all duration-300
                                hover:bg-[#111111] hover:scale-105 active:scale-95"
                            >
                                <span className="relative z-10">See Our Work</span>
                                <svg
                                    className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-45"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </Link>
                        </motion.div>

                        {/* Stats boxes */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="grid grid-cols-3 gap-3 w-full max-w-[280px] sm:max-w-xs lg:max-w-sm"
                        >
                            {[
                                { num: "15+", label: "Clients" },
                                { num: "20+", label: "Projects" },
                                { num: "20+", label: "Tie-ups" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -3 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="clay-card relative flex flex-col items-center text-center py-4 px-3 cursor-default"
                                >
                                    <p className="text-[#E31D2E] font-black text-xl sm:text-3xl">
                                        {stat.num}
                                    </p>
                                    <p className="text-[#575757] text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.18em] mt-1">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── RIGHT: Interactive Services coverflow ── */}
                    <motion.div
                        className="w-full max-w-[420px] sm:max-w-[460px] lg:max-w-none lg:w-[500px] flex-shrink-0 relative mx-auto lg:mx-0"
                        initial={{ opacity: 0, scale: 0.8, x: 40 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    >
                        <SolarSystemHero />
                    </motion.div>
                </div>
            </div>

        </section>
    );
};

export default HeroSection;