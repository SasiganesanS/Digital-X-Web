import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import pyLogo from "../../assets/praskla_logo.jpeg";

const HeroSection = () => {
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section
            id="home"
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: "#000000" }}
        >
            {/* ── Background Elements ── */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Dynamic Grid Background */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Animated Red Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px]"
                    style={{ background: "radial-gradient(circle, rgba(232,25,44,0.15) 0%, transparent 70%)" }}
                />
                
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[140px]"
                    style={{ background: "radial-gradient(circle, rgba(232,25,44,0.12) 0%, transparent 60%)" }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/50 to-[#000000] z-0" />
            </div>

            {/* ── Main content — two-column layout ── */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-20 pb-6">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
                    
                    {/* ── LEFT: Text Content ── */}
                    <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                        {/* Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative inline-flex items-center gap-3 mb-5 px-6 py-3 rounded-full overflow-hidden"
                            style={{
                                background: "linear-gradient(135deg, rgba(232,25,44,0.18) 0%, rgba(0,0,0,0.6) 50%, rgba(232,25,44,0.12) 100%)",
                                border: "1px solid rgba(232,25,44,0.5)",
                                boxShadow: "0 0 18px rgba(232,25,44,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
                            }}
                        >
                            {/* shimmer sweep */}
                            <motion.span
                                className="absolute inset-0 rounded-full"
                                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)" }}
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
                            />
                            {/* top glow line */}
                            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-[#E8192C]/80 to-transparent" />
                            {/* glitter particles */}
                            {[{ top: "20%", left: "8%", delay: 0 }, { top: "70%", left: "15%", delay: 0.4 }, { top: "30%", right: "10%", delay: 0.8 }, { top: "65%", right: "18%", delay: 0.2 }, { top: "15%", left: "45%", delay: 0.6 }].map((pos, i) => (
                                <motion.span
                                    key={i}
                                    className="absolute w-[3px] h-[3px] rounded-full bg-white"
                                    style={{ top: pos.top, left: pos.left, right: pos.right }}
                                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }}
                                />
                            ))}
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8192C] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E8192C]"></span>
                            </span>
                            <span className="relative text-white text-xs sm:text-sm font-bold tracking-[0.3em] uppercase"
                                style={{ textShadow: "0 0 10px rgba(232,25,44,0.7)" }}>
                                A Mindful Marketing and Production Firm
                            </span>
                            {/* sparkle star right */}
                            <motion.span
                                className="relative text-[#E8192C] text-base leading-none"
                                animate={{ rotate: [0, 180, 360], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >✦</motion.span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-[clamp(2rem,5.5vw,5rem)] font-black leading-[1.05] tracking-tight text-white mb-5 max-w-[1000px] drop-shadow-2xl"
                        >
                            Where brands evolve into{" "}
                            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8192C] to-[#E8192C]">
                                powerful
                                <motion.span
                                    className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-gradient-to-r from-transparent via-[#E8192C] to-transparent w-full"
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
                            className="text-white/60 text-sm sm:text-lg font-medium leading-relaxed mb-8 max-w-2xl"
                        >
                            Your strategic growth partner for branding, performance marketing,
                            and long-term digital scale. We don't just create campaigns; we build legacies.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-8 w-full sm:w-auto"
                        >
                            <Link
                                to="/projects"
                                className="relative group flex items-center justify-center gap-3 text-white text-xs sm:text-sm font-bold uppercase tracking-widest
                               border border-white/20 px-10 py-5 rounded-full w-full sm:w-auto
                               hover:border-white hover:bg-white/5 backdrop-blur-sm
                               transition-all duration-300 hover:-translate-y-1 active:scale-95"
                            >
                                See Our Work
                                <svg
                                    className="w-4 h-4 transition-transform group-hover:rotate-45" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" strokeWidth={2.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </motion.div>

                        {/* Trust Stats with Glassmorphism */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="grid grid-cols-3 gap-3 sm:gap-5 justify-center max-w-3xl w-full"
                        >
                            {[
                                { num: "15+", label: "Clients", icon: "👥" },
                                { num: "20+", label: "Projects", icon: "🚀" },
                                { num: "20+", label: "Tie-ups", icon: "🤝" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -4, scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="relative flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl overflow-hidden cursor-default"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(232,25,44,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                                        border: "1px solid rgba(232,25,44,0.25)",
                                        boxShadow: "0 0 24px rgba(232,25,44,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
                                    }}
                                >
                                    {/* Glow spot */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-[#E8192C]/60 to-transparent" />
                                    <span className="text-lg sm:text-2xl mb-1">{stat.icon}</span>
                                    <p className="text-white font-black text-2xl sm:text-4xl tracking-tighter"
                                       style={{ textShadow: "0 0 20px rgba(232,25,44,0.5)" }}>
                                        {stat.num}
                                    </p>
                                    <p className="text-white/50 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] mt-1">{stat.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── RIGHT: Praskla Star Logo ── */}
                    <motion.div
                        className="hidden lg:flex flex-shrink-0 items-center justify-center relative -mt-16"
                        initial={{ opacity: 0, scale: 0.8, x: 40 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        style={{ width: "480px", height: "480px" }}
                    >
                        {/* Outer glow behind the star */}
                        <div
                            className="absolute inset-0 rounded-full blur-[80px] pointer-events-none"
                            style={{ background: "radial-gradient(circle, rgba(232,25,44,0.2) 0%, transparent 70%)" }}
                        />

                        {/* Floating sparkles around the star */}
                        {[
                            { top: "5%", left: "10%", delay: 0, size: 3 },
                            { top: "15%", right: "5%", delay: 0.5, size: 2.5 },
                            { top: "80%", left: "8%", delay: 1, size: 2 },
                            { top: "85%", right: "12%", delay: 1.5, size: 3 },
                            { top: "50%", left: "2%", delay: 2, size: 2 },
                            { top: "30%", right: "2%", delay: 0.8, size: 2.5 },
                            { top: "10%", left: "50%", delay: 1.2, size: 2 },
                            { top: "90%", left: "45%", delay: 0.3, size: 2.5 },
                            { top: "40%", left: "5%", delay: 1.8, size: 2 },
                            { top: "65%", right: "5%", delay: 0.6, size: 3 },
                        ].map((pos, i) => (
                            <motion.span
                                key={i}
                                className="absolute rounded-full bg-white pointer-events-none z-0"
                                style={{
                                    top: pos.top, left: pos.left, right: pos.right,
                                    width: `${pos.size}px`, height: `${pos.size}px`,
                                    boxShadow: "0 0 8px 2px rgba(232,25,44,0.6)",
                                }}
                                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                                transition={{ duration: 2 + Math.random() * 1.5, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }}
                            />
                        ))}

                        {/* Rotating ring */}
                        <motion.div
                            className="absolute w-[95%] h-[95%] rounded-full border border-white/10 pointer-events-none"
                            style={{ transform: "rotateX(65deg)", transformOrigin: "center" }}
                            animate={{ rotateZ: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="absolute top-0 left-[20%] w-2 h-2 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.8)]" />
                        </motion.div>

                        <motion.div
                            className="absolute w-full h-full rounded-full border-[1.5px] border-[#E8192C]/20 pointer-events-none"
                            style={{ transform: "rotateX(65deg) rotateY(10deg)", transformOrigin: "center" }}
                            animate={{ rotateZ: -360 }}
                            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="absolute bottom-0 right-[20%] w-2 h-2 rounded-full bg-[#E8192C] shadow-[0_0_10px_3px_rgba(232,25,44,0.8)]" />
                        </motion.div>

                        {/* 4-pointed star shape with logo inside */}
                        <motion.div
                            className="relative z-10"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            {/* Star shape shadow/glow */}
                            <div
                                className="absolute inset-0 blur-[30px] opacity-40 pointer-events-none"
                                style={{
                                    clipPath: "polygon(50% 0%, 62% 32%, 100% 50%, 62% 68%, 50% 100%, 38% 68%, 0% 50%, 38% 32%)",
                                    background: "linear-gradient(135deg, #E8192C, #ff4757)",
                                    width: "340px",
                                    height: "340px",
                                }}
                            />

                            {/* Main star shape */}
                            <div
                                className="relative flex items-center justify-center"
                                style={{
                                    width: "340px",
                                    height: "340px",
                                    clipPath: "polygon(50% 0%, 62% 32%, 100% 50%, 62% 68%, 50% 100%, 38% 68%, 0% 50%, 38% 32%)",
                                    background: "linear-gradient(135deg, rgba(232,25,44,0.15) 0%, rgba(20,0,5,0.95) 50%, rgba(232,25,44,0.1) 100%)",
                                    border: "none",
                                    boxShadow: "0 0 40px rgba(232,25,44,0.3)",
                                }}
                            >
                                {/* Inner border effect using a slightly smaller star */}
                                <div
                                    className="absolute inset-[2px] flex items-center justify-center"
                                    style={{
                                        clipPath: "polygon(50% 0%, 62% 32%, 100% 50%, 62% 68%, 50% 100%, 38% 68%, 0% 50%, 38% 32%)",
                                        background: "linear-gradient(135deg, rgba(232,25,44,0.08) 0%, #0a0a0a 40%, rgba(232,25,44,0.05) 100%)",
                                    }}
                                />

                                {/* Logo in center */}
                                <div className="relative z-10 flex flex-col items-center justify-center gap-2">
                                    <div
                                        className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden"
                                        style={{
                                            background: "rgba(232,25,44,0.12)",
                                            border: "1.5px solid rgba(232,25,44,0.4)",
                                            boxShadow: "0 0 20px rgba(232,25,44,0.2)",
                                        }}
                                    >
                                        <img src={pyLogo} alt="Praskla Digital X" className="w-14 h-14 object-contain" />
                                    </div>
                                    <span
                                        className="text-white font-black text-sm tracking-[0.25em] uppercase"
                                        style={{ textShadow: "0 0 10px rgba(232,25,44,0.5)" }}
                                    >
                                        PRASKLA
                                    </span>
                                </div>
                            </div>

                            {/* Edge glow accents */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-[#E8192C]/60 to-transparent rounded-full" />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-[#E8192C]/60 to-transparent rounded-full" />
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-1 bg-gradient-to-r from-[#E8192C]/60 to-transparent rounded-full" />
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-1 bg-gradient-to-l from-[#E8192C]/60 to-transparent rounded-full" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* ── Scroll indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => scrollTo("about")}
            >
                <motion.div
                    animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[2px] h-10 bg-gradient-to-b from-[#E8192C] to-transparent rounded-full"
                />
            </motion.div>
        </section>
    );
};

export default HeroSection;
