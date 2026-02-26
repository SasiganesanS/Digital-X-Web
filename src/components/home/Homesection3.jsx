import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


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
            className="relative w-full overflow-hidden pt-10 md:pt-16 pb-4 md:pb-6"
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
                            Praskla Digital X is a mindful marketing firm built on the belief that true growth
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

            </div>
        </section>
    );
};

export default AboutSection;