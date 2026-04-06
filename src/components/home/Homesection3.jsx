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
            className="relative w-full overflow-hidden py-24 md:py-32"
            style={{ backgroundColor: "#040404" }}
        >
            {/* ── Background accents ── */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Top-right red glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-[clamp(300px,50vw,600px)] h-[clamp(300px,50vw,600px)] rounded-full blur-[100px]"
                    style={{
                        background: "radial-gradient(circle, rgba(232,25,44,0.12) 0%, transparent 60%)",
                        transform: "translate(20%, -20%)",
                    }}
                />
                {/* Bottom-left red glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-0 left-0 w-[clamp(250px,40vw,500px)] h-[clamp(250px,40vw,500px)] rounded-full blur-[120px]"
                    style={{
                        background: "radial-gradient(circle, rgba(232,25,44,0.1) 0%, transparent 60%)",
                        transform: "translate(-20%, 20%)",
                    }}
                />
                {/* Dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                        backgroundSize: "44px 44px",
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

                {/* ── Structured Glass Card ── */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="relative flex flex-col lg:flex-row gap-12 lg:gap-20 backdrop-blur-2xl rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 lg:p-20 overflow-hidden"
                    style={{
                        background: "linear-gradient(135deg, rgba(232,25,44,0.07) 0%, rgba(15,15,15,0.95) 40%, rgba(232,25,44,0.04) 100%)",
                        border: "1px solid rgba(232,25,44,0.3)",
                        boxShadow: "0 0 60px rgba(232,25,44,0.1), 0 0 120px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)",
                    }}
                >
                    {/* top glow line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#E8192C]/60 to-transparent" />
                    {/* corner accent */}
                    <div className="absolute top-0 left-0 w-32 h-32 opacity-20"
                        style={{ background: "radial-gradient(circle at top left, rgba(232,25,44,0.5), transparent 70%)" }} />

                    {/* Left — label + headline */}
                    <div className="flex-1">
                        {/* Eyebrow */}
                        <motion.div variants={fadeUp} className="relative inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full overflow-hidden"
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
                            <span className="relative text-white text-xs md:text-sm font-bold tracking-[0.3em] uppercase"
                                style={{ textShadow: "0 0 10px rgba(232,25,44,0.7)" }}>
                                About Us
                            </span>
                            {/* sparkle star right */}
                            <motion.span
                                className="relative text-[#E8192C] text-base leading-none"
                                animate={{ rotate: [0, 180, 360], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >✦</motion.span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h2
                            variants={fadeUp}
                            className="text-[clamp(2rem,6vw,4rem)] font-black leading-[1.05] tracking-tight text-white mb-6"
                        >
                            Empowering Brands through{" "}
                            <span className="relative inline-block mt-2">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8192C] to-[#E8192C]">
                                    Mindful
                                </span>
                            </span>{" "}
                            Marketing.
                        </motion.h2>
                        
                        <motion.div variants={fadeUp} className="w-20 h-1 bg-gradient-to-r from-[#E8192C] to-transparent rounded-full mt-8" />

                    </div>

                    {/* Right — body copy */}
                    <div className="flex-1 flex flex-col justify-center gap-6">
                        <motion.div variants={fadeUp} className="relative">
                            <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#E8192C] to-transparent opacity-50 rounded-full" />
                            <p className="text-white/70 text-lg md:text-xl leading-relaxed font-medium">
                                DigitalX is a mindful marketing firm built on the belief that true growth
                                comes from <span className="text-white font-bold">clarity, creativity, and collaboration</span>.
                                We partner with businesses and personal brands to transform their ideas into
                                measurable digital success. From content creation and media production to paid
                                advertising, SEO, and sales strategy, we design structured marketing
                                ecosystems tailored to modern market demands.
                            </p>
                        </motion.div>
                        
                        <motion.p
                            variants={fadeUp}
                            className="text-white/60 text-base md:text-lg leading-relaxed"
                        >
                            By combining strategic thinking, creative execution, and performance-driven
                            optimization, we help brands build <span className="text-white font-semibold">visibility, credibility,
                            and sustainable growth</span> — growing alongside them at every stage.
                        </motion.p>

                        <motion.div variants={fadeUp} className="mt-6">
                            <Link
                                to="/about"
                                className="group inline-flex items-center gap-3 text-white text-sm font-bold uppercase tracking-widest
                               bg-[#E8192C] px-8 py-4 rounded-full shadow-[0_0_20px_rgba(232,25,44,0.3)]
                               hover:bg-white hover:text-[#E8192C] hover:shadow-[0_0_30px_rgba(232,25,44,0.6)]
                               transition-all duration-300 hover:-translate-y-1 active:scale-95"
                            >
                                Learn more about us
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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