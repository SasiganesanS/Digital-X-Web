import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   Mini sparkline SVG
───────────────────────────────────────────── */
const SparkLine = ({ up = true }) => (
    <svg viewBox="0 0 80 32" className="w-14 h-5" fill="none">
        <polyline
            points={
                up
                    ? "0,28 16,20 32,22 48,12 64,8 80,2"
                    : "0,6 16,14 32,10 48,20 64,18 80,26"
            }
            stroke="#E8192C"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <circle cx="80" cy={up ? "2" : "26"} r="3.5" fill="#E8192C" />
    </svg>
);

/* ─────────────────────────────────────────────
   Animated Dashboard Card (right-side visual)
───────────────────────────────────────────── */
const DashboardCard = () => {
    const [ready, setReady] = useState(false);
    const bars = useMemo(() => [55, 72, 48, 88, 65, 95, 78, 100, 82, 70], []);

    useEffect(() => {
        const t = setTimeout(() => setReady(true), 500);
        return () => clearTimeout(t);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
            className="relative w-full max-w-[min(480px,90%)] mx-auto"
        >
            {/* Red glow behind */}
            <div className="absolute inset-0 rounded-2xl bg-[#E8192C]/15 blur-3xl scale-95 -z-10" />

            {/* Main card */}
            <div
                className="rounded-2xl border border-white/10 p-5 space-y-4"
                style={{ background: "rgba(12,12,12,0.97)" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <span className="text-white/40 text-[10px] font-medium tracking-widest uppercase">
                        Campaign Overview
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] text-[#E8192C] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C] animate-pulse" />
                        Live
                    </span>
                </div>

                {/* KPI grid */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: "ROAS", value: ready ? "340%" : "—", up: true },
                        { label: "Reach", value: ready ? "2.1M" : "—", up: true },
                        { label: "CTR", value: ready ? "8.4%" : "—", up: false },
                    ].map((kpi) => (
                        <div
                            key={kpi.label}
                            className="rounded-xl p-3 border border-white/5 flex flex-col gap-1.5"
                            style={{ background: "#111" }}
                        >
                            <span className="text-white/40 text-[10px] uppercase tracking-wider">
                                {kpi.label}
                            </span>
                            <span className="text-white font-bold text-lg leading-none">
                                {kpi.value}
                            </span>
                            <SparkLine up={kpi.up} />
                        </div>
                    ))}
                </div>

                {/* Bar chart */}
                <div
                    className="rounded-xl p-4 border border-white/5"
                    style={{ background: "#0d0d0d" }}
                >
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-white/40 text-[10px] uppercase tracking-wider">
                            Monthly Performance
                        </span>
                        <span className="text-[#E8192C] text-[10px] font-semibold">
                            +28% vs last month
                        </span>
                    </div>
                    <div className="flex items-end gap-1.5 h-14">
                        {bars.map((h, i) => (
                            <motion.div
                                key={i}
                                className="flex-1 rounded-sm"
                                style={{
                                    background:
                                        i === bars.length - 1
                                            ? "#E8192C"
                                            : i >= bars.length - 3
                                                ? "rgba(232,25,44,0.45)"
                                                : "rgba(255,255,255,0.07)",
                                }}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ duration: 0.6, delay: 0.9 + i * 0.05, ease: "easeOut" }}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom row */}
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { label: "Conversions", value: "12,480", change: "+18%" },
                        { label: "Ad Spend ROI", value: "4.2x", change: "+0.8x" },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="rounded-xl p-3 border border-white/5 flex justify-between items-center"
                            style={{ background: "#111" }}
                        >
                            <div>
                                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">
                                    {item.label}
                                </p>
                                <p className="text-white font-bold text-sm">{item.value}</p>
                            </div>
                            <span className="text-[#E8192C] text-[10px] font-semibold bg-[#E8192C]/10 px-2 py-1 rounded-lg">
                                {item.change}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating badge — top right */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-4 flex items-center gap-2 rounded-full px-3.5 py-2 border border-white/10 shadow-xl"
                style={{ background: "rgba(12,12,12,0.97)" }}
            >
                <span className="text-sm">🚀</span>
                <div className="flex flex-col leading-none">
                    <span className="text-white font-bold text-xs">+340% ROAS</span>
                    <span className="text-white/30 text-[9px]">Avg campaign result</span>
                </div>
            </motion.div>

            {/* Floating badge — bottom left */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-5 -left-4 flex items-center gap-2 rounded-full px-3.5 py-2 border border-white/10 shadow-xl"
                style={{ background: "rgba(12,12,12,0.97)" }}
            >
                <span className="text-sm">🎯</span>
                <div className="flex flex-col leading-none">
                    <span className="text-white font-bold text-xs">2.1M Reach</span>
                    <span className="text-white/30 text-[9px]">This quarter</span>
                </div>
            </motion.div>
        </motion.div>
    );
};

/* ─────────────────────────────────────────────
   Main HeroSection Component
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
                {/* Red glow — bottom left */}
                <div
                    className="absolute bottom-0 left-0 w-[clamp(300px,50vw,650px)] h-[clamp(300px,50vw,650px)] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(232,25,44,0.12) 0%, transparent 65%)",
                        transform: "translate(-25%, 25%)",
                    }}
                />
                {/* Red glow — top right */}
                <div
                    className="absolute top-0 right-0 w-[clamp(250px,40vw,500px)] h-[clamp(250px,40vw,500px)] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(232,25,44,0.07) 0%, transparent 65%)",
                        transform: "translate(25%, -25%)",
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
                {/* Subtle center line */}
                <div
                    className="absolute top-1/2 left-0 w-full h-px"
                    style={{
                        background: "linear-gradient(to right, transparent, rgba(232,25,44,0.12), transparent)",
                    }}
                />
            </div>

            {/* ── Main content ── */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-20 sm:pt-22 md:pt-24 pb-8">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

                    {/* LEFT — Copy */}
                    <div className="flex-1 text-center lg:text-left">

                        {/* Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 mb-6"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C] animate-pulse" />
                            <span className="text-[#E8192C] text-xs font-semibold tracking-[0.2em] uppercase">
                                Digital Marketing Agency
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                            className="text-[clamp(2.25rem,6vw,3.75rem)] font-black leading-[1.1] tracking-tight text-white mb-6"
                        >
                            Where brands evolve into{" "}
                            <span className="relative inline-block">
                                <span className="text-[#E8192C]">powerful</span>
                                <motion.span
                                    className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-[#E8192C]"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 0.8, delay: 0.9 }}
                                />
                            </span>{" "}
                            digital movements
                        </motion.h1>

                        {/* Subtext */}
                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
                            className="text-white/50 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
                        >
                            Your strategic growth partner for branding, performance marketing,
                            and long-term digital scale.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="flex flex-wrap items-center gap-4 justify-center lg:justify-start"
                        >
                            {/* Primary */}
                            <button
                                onClick={() => scrollTo("contact")}
                                className="relative group flex items-center gap-2 bg-[#E8192C] text-white
                           px-7 py-3.5 rounded-full font-semibold text-sm
                           hover:bg-[#ff2235] transition-all duration-300
                           hover:shadow-[0_0_32px_rgba(232,25,44,0.5)] hover:-translate-y-0.5
                           active:scale-95 overflow-hidden"
                            >
                                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 -skew-x-12" />
                                <span className="relative z-10">Start Growing</span>
                                <svg
                                    className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-0.5"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>

                            {/* Secondary */}
                            <Link
                                to="/projects"
                                className="flex items-center gap-2 text-white/60 text-sm font-medium
                           border border-white/10 px-7 py-3.5 rounded-full
                           hover:border-white/25 hover:text-white hover:bg-white/5
                           transition-all duration-300 hover:-translate-y-0.5"
                            >
                                See Our Work
                                <svg
                                    className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </motion.div>

                        {/* Trust stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.7 }}
                            className="mt-12 flex flex-wrap items-center gap-6 justify-center lg:justify-start"
                        >
                            {[
                                { num: "50+", label: "Brands Scaled" },
                                { num: "4x", label: "Avg. ROAS" },
                                { num: "98%", label: "Client Retention" },
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    {i > 0 && <div className="w-px h-8 bg-white/10 hidden sm:block" />}
                                    <div>
                                        <p className="text-white font-black text-xl leading-none">{stat.num}</p>
                                        <p className="text-white/35 text-xs mt-0.5">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* RIGHT — Dashboard visual */}
                    <div className="flex-1 w-full max-w-[500px] mx-auto lg:mx-0 relative mt-8 lg:mt-0">
                        <DashboardCard />
                    </div>
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
