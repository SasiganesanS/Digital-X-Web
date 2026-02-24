import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

/* Order: Tipy first, then Honeybee, SkillBridge */
const ordered = [
    projects.find((p) => p.id === 3), // Tipy
    projects.find((p) => p.id === 1), // Honeybee
    projects.find((p) => p.id === 2), // SkillBridge
].filter(Boolean);

const accents = ["#E8192C", "#E8192C", "#E8192C"];

const CaseStudy = () => {
    return (
        <section
            className="relative w-full min-h-screen overflow-hidden"
            style={{ background: "#080808" }}
        >
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full"
                    style={{
                        background:
                            "radial-gradient(ellipse, rgba(232,25,44,0.07) 0%, transparent 65%)",
                    }}
                />
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                        backgroundSize: "44px 44px",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-32 pb-20">
                {/* Header */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C] animate-pulse" />
                        <span className="text-[#E8192C] text-xs font-semibold tracking-[0.2em] uppercase">
                            Case Studies
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black leading-[1.1] tracking-tight text-white mb-5">
                        Work that speaks{" "}
                        <span className="text-[#E8192C]">results</span>
                    </h1>
                    <p className="text-white/40 text-base md:text-lg max-w-xl leading-relaxed">
                        Deep dives into how we partnered with brands to solve real challenges
                        and deliver measurable, lasting impact.
                    </p>
                </motion.div>

                {/* Case study cards */}
                <div className="flex flex-col gap-6">
                    {ordered.map((project, i) => {
                        const accent = accents[i];
                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 32 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, delay: i * 0.12 }}
                            >
                                <Link
                                    to={`/project/${project.id}`}
                                    className="group relative flex flex-col md:flex-row items-stretch rounded-2xl border border-white/6 overflow-hidden transition-all duration-300 hover:border-white/12"
                                    style={{ background: "#0F0F0F" }}
                                >
                                    {/* Hover accent glow */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(ellipse at 20% 50%, ${accent}10 0%, transparent 60%)`,
                                        }}
                                    />

                                    {/* Left — number + accent bar */}
                                    <div
                                        className="flex-shrink-0 w-full md:w-[80px] flex md:flex-col items-center justify-center gap-3 md:gap-0 px-6 py-5 md:py-8 md:px-0 border-b md:border-b-0 md:border-r border-white/6"
                                    >
                                        <div
                                            className="w-1 h-full rounded-full hidden md:block"
                                            style={{ background: `${accent}30`, minHeight: "60px" }}
                                        >
                                            <div
                                                className="w-full transition-all duration-700 rounded-full group-hover:h-full"
                                                style={{ background: accent, height: "100%" }}
                                            />
                                        </div>
                                        <span
                                            className="font-black text-4xl md:text-3xl leading-none select-none absolute md:static"
                                            style={{ color: `${accent}15` }}
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                    </div>

                                    {/* Center — content */}
                                    <div className="flex-1 p-7 md:p-10">
                                        <div className="flex flex-wrap items-start gap-3 mb-4">
                                            <span
                                                className="text-xs font-semibold px-3 py-1 rounded-full border"
                                                style={{
                                                    color: accent,
                                                    borderColor: `${accent}30`,
                                                    background: `${accent}10`,
                                                }}
                                            >
                                                {project.tags}
                                            </span>
                                        </div>

                                        <h2 className="text-white font-black text-2xl md:text-3xl mb-2 group-hover:text-white transition-colors">
                                            {project.title}
                                        </h2>
                                        <p className="text-white/40 text-sm mb-6">
                                            {project.description}
                                        </p>

                                        {/* Challenges preview */}
                                        {project.overview?.challenges && (
                                            <div className="flex flex-col gap-2 mb-6">
                                                {project.overview.challenges.slice(0, 2).map((c, ci) => (
                                                    <div key={ci} className="flex items-start gap-2.5">
                                                        <span
                                                            className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold mt-0.5"
                                                            style={{
                                                                background: `${accent}15`,
                                                                color: accent,
                                                            }}
                                                        >
                                                            {ci + 1}
                                                        </span>
                                                        <span className="text-white/35 text-sm leading-relaxed">
                                                            {c}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Result chip */}
                                        <div className="inline-flex items-center gap-2">
                                            <span
                                                className="w-1.5 h-1.5 rounded-full"
                                                style={{ background: accent }}
                                            />
                                            <span className="text-white/50 text-xs font-medium">
                                                {project.result}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right — CTA */}
                                    <div className="flex-shrink-0 flex items-center justify-center p-6 md:p-10">
                                        <div
                                            className="w-12 h-12 rounded-full border flex items-center justify-center
                                 group-hover:scale-110 transition-all duration-300"
                                            style={{
                                                borderColor: `${accent}30`,
                                                background: `${accent}10`,
                                                color: accent,
                                            }}
                                        >
                                            <svg
                                                className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CaseStudy;
