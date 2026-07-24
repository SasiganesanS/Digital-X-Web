import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const AboutSection = () => {
    return (
        <section
            id="about"
            className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden py-24"
            style={{ backgroundColor: "transparent" }}
        >
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

                {/* ── Structured Clay Card ── */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="relative flex flex-col lg:flex-row gap-12 lg:gap-20 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 lg:p-20 overflow-hidden"
                    style={{
                        background: "rgba(255, 255, 255, 0.65)",
                        backdropFilter: "blur(20px) saturate(120%)",
                        WebkitBackdropFilter: "blur(20px) saturate(120%)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        boxShadow: "0 12px 32px rgba(17, 17, 17, 0.04), 0 2px 8px rgba(17, 17, 17, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                    }}
                >
                    {/* Left — label + headline */}
                    <div className="flex-1">
                        {/* Eyebrow badge */}
                        <motion.div
                            variants={fadeUp}
                            className="relative inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full overflow-hidden border border-[#E31D2E]/20 bg-white/60 shadow-[0_8px_16px_rgba(17,17,17,0.03)]"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31D2E]"></span>
                            </span>
                            <span className="relative text-[#111111] text-xs font-bold tracking-[0.25em] uppercase">
                                About Us
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h2
                            variants={fadeUp}
                            className="text-[clamp(1.8rem,5vw,3.2rem)] font-black leading-[1.1] tracking-tight text-[#111111] mb-6"
                        >
                            Empowering Brands through{" "}
                            <span className="text-[#E31D2E]">
                                Mindful
                            </span>{" "}
                            Marketing.
                        </motion.h2>
                    </div>

                    {/* Right — body copy */}
                    <div className="flex-1 flex flex-col justify-center gap-6">
                        <motion.div variants={fadeUp} className="relative">
                            <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#E31D2E] to-transparent opacity-50 rounded-full" />
                            <p className="text-[#111111] text-lg md:text-xl leading-relaxed font-semibold">
                                PRASKLA Digital X is a mindful marketing firm built on the belief that true growth
                                comes from <span className="text-[#E31D2E] font-black">clarity, creativity, and collaboration</span>.
                                We partner with businesses and personal brands to transform their ideas into
                                measurable digital success.
                            </p>
                        </motion.div>
                        
                        <motion.p
                            variants={fadeUp}
                            className="text-[#575757] text-base leading-relaxed"
                        >
                            By combining strategic thinking, creative execution, and performance-driven
                            optimization, we help brands build <span className="text-[#111111] font-bold">visibility, credibility,
                            and sustainable growth</span> — growing alongside them at every stage.
                        </motion.p>

                        <motion.div variants={fadeUp} className="mt-4">
                            <Link
                                to="/about"
                                className="primary-btn group inline-flex items-center gap-3 text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full"
                            >
                                Learn more about us
                                <svg className="w-4 h-4 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default AboutSection;