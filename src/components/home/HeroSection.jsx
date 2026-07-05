import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import pyLogo from "../../assets/Praskla_Digital_X_Logo_Trasnparent_Background.png";
import SolarSystemHero, { ToyAstronaut } from "./SolarSystemHero";

const HeroSection = () => {
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const sparklePositions = [
        { top: "5%",  left: "10%",  delay: 0,   size: 3   },
        { top: "15%", right: "5%",  delay: 0.5, size: 2.5 },
        { top: "80%", left: "8%",   delay: 1,   size: 2   },
        { top: "85%", right: "12%", delay: 1.5, size: 3   },
        { top: "50%", left: "2%",   delay: 2,   size: 2   },
        { top: "30%", right: "2%",  delay: 0.8, size: 2.5 },
        { top: "10%", left: "50%",  delay: 1.2, size: 2   },
        { top: "90%", left: "45%",  delay: 0.3, size: 2.5 },
    ];

    return (
        <section
            id="home"
            className="relative w-full h-screen min-h-[100vh] max-h-[100vh] overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: "transparent" }}
        >
            {/* ── Background ── */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px]"
                    style={{ background: "radial-gradient(circle, rgba(232,25,44,0.15) 0%, transparent 70%)" }}
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[140px]"
                    style={{ background: "radial-gradient(circle, rgba(232,25,44,0.12) 0%, transparent 60%)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/40 to-[#000000] z-0" />
            </div>

            {/* ── Single unified content block ── */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-16">

                {/* Two-column row: Left text | Right star */}              
                 
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

                    {/* ── LEFT: ALL text content + stats ── */}
                    <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl w-full relative">

                        {/* Eyebrow badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-full overflow-hidden"
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
                                className="relative text-white text-[10px] sm:text-xs font-bold tracking-[0.28em] uppercase"
                                style={{ textShadow: "0 0 10px rgba(232,25,44,0.7)" }}
                            >
                                A Mindful Marketing and Production Firm
                            </span>
                            <motion.span
                                className="relative text-[#E8192C] text-sm leading-none"
                                animate={{ rotate: [0, 180, 360], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >✦</motion.span>
                        </motion.div>

                        {/* Standing astronaut beside the badge on larger screens (repositioned) */}
                        <ToyAstronaut
                            className="hidden lg:block pointer-events-none"
                            style={{ width: 110, height: 150, position: 'absolute', left: -100, top: -115 }}
                        />


                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="font-black leading-[1.08] tracking-tight text-white mb-3 drop-shadow-2xl w-full"
                            style={{ fontSize: "clamp(1.55rem, 3.2vw, 3.1rem)" }}
                        >
                            Where brands evolve into{" "}
                            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8192C] to-[#E8192C]">
                                powerful
                                <motion.span
                                    className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#E8192C] to-transparent w-full"
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
                            className="text-white/55 text-xs sm:text-sm font-medium leading-relaxed mb-4 max-w-lg"
                        >
                            Your strategic growth partner for branding, performance marketing,
                            and long-term digital scale. We don't just create campaigns; we build legacies.
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                           
                            className="flex items-center gap-4 justify-center lg:justify-start mb-5"
                           >
                            <Link
                                to="/projects"
                                className="relative group flex items-center justify-center gap-2 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest
                               border border-white/20 px-6 py-3 rounded-full
                               hover:border-white hover:bg-white/5 backdrop-blur-sm
                               transition-all duration-300 hover:-translate-y-1 active:scale-95"
                                >
                                See Our Work
                                <svg
                                    className="w-3.5 h-3.5 transition-transform group-hover:rotate-45" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" strokeWidth={2.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </motion.div>

                        {/* ── Stats boxes — fully inside hero ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-[280px] sm:max-w-xs lg:max-w-sm"
                        >
                            {[
                                { num: "15+", label: "Clients" },
                                { num: "20+", label: "Projects" },
                                { num: "20+", label: "Tie-ups" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -3, scale: 1.04 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="relative flex flex-col items-center text-center py-3 px-2 rounded-xl overflow-hidden cursor-default"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(232,25,44,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                                        border: "1px solid rgba(232,25,44,0.25)",
                                        boxShadow: "0 0 20px rgba(232,25,44,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
                                    }}
                                >
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-[#E8192C]/60 to-transparent" />
                                    <p
                                        className="text-white font-black text-lg sm:text-2xl tracking-tighter"
                                        style={{ textShadow: "0 0 16px rgba(232,25,44,0.5)" }}
                                    >
                                        {stat.num}
                                    </p>
                                    <p className="text-white/50 text-[7px] sm:text-[9px] font-bold uppercase tracking-[0.18em] mt-0.5">{stat.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── RIGHT: Interactive Solar System ── */}
                    <motion.div
                        className="w-full lg:w-[500px] flex-shrink-0 relative"
                        initial={{ opacity: 0, scale: 0.8, x: 40 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    >
                        <SolarSystemHero />
                    </motion.div>
                </div>
            </div>

            {/* ── Scroll indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => scrollTo("about")}
            >
                <motion.div
                    animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[2px] h-8 bg-gradient-to-b from-[#E8192C] to-transparent rounded-full"
                />
            </motion.div>
        </section>
    );
};

export default HeroSection;
