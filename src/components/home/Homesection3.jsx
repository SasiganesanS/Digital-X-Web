import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/* ─── Service pillars data ─── */
const pillars = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-9 9H9v-3z" />
            </svg>
        ),
        label: "Content Creation",
        desc: "Stories that connect and convert.",
        accent: "#E8192C",
        delay: 0.1,
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.277A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.895L15 14M3 8h12a2 2 0 012 2v4a2 2 0 01-2 2H3a2 2 0 01-2-2V10a2 2 0 012-2z" />
            </svg>
        ),
        label: "Media Production",
        desc: "Visual assets crafted to impress.",
        accent: "#E8192C",
        delay: 0.2,
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
        ),
        label: "Paid Advertising",
        desc: "ROI-driven campaigns that scale.",
        accent: "#E8192C",
        delay: 0.3,
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
            </svg>
        ),
        label: "SEO",
        desc: "Rank higher. Get found faster.",
        accent: "#E8192C",
        delay: 0.4,
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        ),
        label: "Sales Strategy",
        desc: "Turning leads into loyal clients.",
        accent: "#E8192C",
        delay: 0.5,
    },
];

/* ─── Stat chips ─── */
const stats = [
    { num: "50+", label: "Brands Grown" },
    { num: "4x", label: "Avg. ROAS" },
    { num: "98%", label: "Retention Rate" },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const AboutSection = () => {
    return (
        <section
            id="about"
            className="relative w-full overflow-hidden py-10 md:py-16"
            style={{ background: "#0A0A0A" }}
        >
            {/* ── Background accents ── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top-right red glow */}
                <div
                    className="absolute top-0 right-0 w-[clamp(250px,45vw,500px)] h-[clamp(250px,45vw,500px)] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(232,25,44,0.08) 0%, transparent 65%)",
                        transform: "translate(20%, -20%)",
                    }}
                />
                {/* Bottom-left red glow */}
                <div
                    className="absolute bottom-0 left-0 w-[clamp(200px,35vw,400px)] h-[clamp(200px,35vw,400px)] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(232,25,44,0.06) 0%, transparent 65%)",
                        transform: "translate(-20%, 20%)",
                    }}
                />
                {/* Dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                        backgroundSize: "44px 44px",
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

                {/* ── Two-column header ── */}
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 mb-10 md:mb-20">

                    {/* Left — label + headline */}
                    <motion.div
                        className="flex-1"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={containerVariants}
                    >
                        {/* Eyebrow */}
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C] animate-pulse" />
                            <span className="text-[#E8192C] text-xs font-semibold tracking-[0.2em] uppercase">
                                About Us
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h2
                            variants={fadeUp}
                            className="text-[clamp(1.85rem,5.5vw,3.25rem)] font-black leading-[1.1] tracking-tight text-white"
                        >
                            Empowering Brands through{" "}
                            <span className="relative inline-block">
                                <span className="text-[#E8192C]">Mindful</span>
                            </span>{" "}
                            Marketing.
                        </motion.h2>

                        {/* Stat chips */}
                        <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-10">
                            {stats.map((s, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col px-5 py-3 rounded-xl border border-white/8"
                                    style={{ background: "#111" }}
                                >
                                    <span className="text-white font-black text-2xl leading-none">{s.num}</span>
                                    <span className="text-white/40 text-xs mt-1">{s.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right — body copy */}
                    <motion.div
                        className="flex-1 flex flex-col justify-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={containerVariants}
                    >
                        <motion.p
                            variants={fadeUp}
                            className="text-white/55 text-base md:text-lg leading-relaxed mb-6"
                        >
                            DigitalX is a mindful marketing firm built on the belief that true growth
                            comes from <span className="text-white/80 font-medium">clarity, creativity, and collaboration</span>.
                            We partner with businesses and personal brands to transform their ideas into
                            measurable digital success.
                        </motion.p>
                        <motion.p
                            variants={fadeUp}
                            className="text-white/55 text-base md:text-lg leading-relaxed mb-8"
                        >
                            By combining strategic thinking, creative execution, and performance-driven
                            optimization, we help brands build <span className="text-white/80 font-medium">visibility, credibility,
                                and sustainable growth</span> — growing alongside them at every stage.
                        </motion.p>

                        <motion.div variants={fadeUp}>
                            <Link
                                to="/about"
                                className="inline-flex items-center gap-2 text-[#E8192C] text-sm font-semibold
                           border border-[#E8192C]/30 px-5 py-2.5 rounded-full
                           hover:bg-[#E8192C]/10 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                Learn more about us
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* ── Pillar cards — infinite marquee ── */}
                <style>{`
                  @keyframes marquee-left {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                  .marquee-track {
                    display: flex;
                    width: max-content;
                    animation: marquee-left 28s linear infinite;
                  }
                  .marquee-track:hover {
                    animation-play-state: paused;
                  }
                `}</style>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="overflow-hidden relative"
                >
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none"
                        style={{ background: "linear-gradient(to right, #0A0A0A, transparent)" }} />
                    <div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none"
                        style={{ background: "linear-gradient(to left, #0A0A0A, transparent)" }} />

                    <div className="marquee-track gap-4">
                        {/* Render twice for seamless loop */}
                        {[...pillars, ...pillars].map((p, i) => (
                            <div
                                key={i}
                                className="group relative rounded-2xl border border-white/8 p-5 flex flex-col gap-4
                                           hover:border-[#E8192C]/40 transition-all duration-300
                                           cursor-default overflow-hidden flex-shrink-0"
                                style={{ background: "#111", width: "clamp(180px, 20vw, 240px)" }}
                            >
                                {/* Hover glow */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ background: "radial-gradient(circle at 50% 0%, rgba(232,25,44,0.09) 0%, transparent 70%)" }}
                                />
                                {/* Icon */}
                                <div className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center text-[#E8192C]
                                                bg-[#E8192C]/8 border border-[#E8192C]/15
                                                group-hover:bg-[#E8192C]/15 transition-colors duration-300">
                                    {p.icon}
                                </div>
                                {/* Number accent */}
                                <span className="absolute top-3 right-4 text-[#E8192C]/10 font-black text-4xl leading-none select-none
                                                 group-hover:text-[#E8192C]/20 transition-colors duration-300">
                                    {String((i % pillars.length) + 1).padStart(2, "0")}
                                </span>
                                {/* Text */}
                                <div className="relative z-10">
                                    <h3 className="text-white font-bold text-sm mb-1">{p.label}</h3>
                                    <p className="text-white/40 text-xs leading-relaxed">{p.desc}</p>
                                </div>
                                {/* Bottom accent line */}
                                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full
                                                bg-gradient-to-r from-[#E8192C] to-transparent rounded-full
                                                transition-all duration-500" />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ── Bottom quote strip ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-8 rounded-2xl border border-white/8 px-5 py-5 md:px-8 md:py-7 flex flex-col sm:flex-row
                     items-start sm:items-center gap-4 sm:gap-8"
                    style={{ background: "#111" }}
                >
                    <div className="text-[#E8192C] opacity-20 flex-shrink-0">
                        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                        </svg>
                    </div>
                    <p className="text-white/50 text-base md:text-lg italic leading-relaxed flex-1">
                        We design structured marketing ecosystems tailored to modern market demands —
                        because real growth comes from{" "}
                        <span className="text-white/80 not-italic font-medium">
                            strategy, not chance.
                        </span>
                    </p>
                    <div className="flex-shrink-0 hidden sm:flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C]" />
                        <span className="text-white/30 text-xs font-medium tracking-wider uppercase">DigitalX</span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default AboutSection;