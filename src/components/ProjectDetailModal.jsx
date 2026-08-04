import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import { projects } from "../data/projects";

/**
 * Project Detail Modal
 * Full-screen premium overlay for exploring project details without leaving the current page.
 */
export default function ProjectDetailModal({ isOpen, onClose, project: initialProject }) {
    const [project, setProject] = useState(initialProject);

    useEffect(() => {
        if (initialProject) {
            setProject(initialProject);
        }
    }, [initialProject]);

    if (!isOpen || !project) return null;

    const handleSwitchProject = (p) => {
        setProject(p);
        // Scroll modal content to top
        const modalContent = document.getElementById('project-modal-content');
        if (modalContent) modalContent.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080808]/95 backdrop-blur-xl"
                >
                    <motion.div
                        id="project-modal-content"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 200 }}
                        className="w-full h-full overflow-y-auto overflow-x-hidden pt-32 pb-12 custom-scrollbar"
                    >
                        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

                            {/* ── HERO SECTION ── */}
                            <div className="relative mb-20">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <div className="inline-flex items-center gap-2 mb-6">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C] animate-pulse" />
                                            <span className="text-[#E8192C] text-xs font-black tracking-[0.3em] uppercase">Case Study</span>
                                        </div>
                                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tighter">
                                            {project.title}
                                        </h1>
                                        <p className="text-white/40 text-lg md:text-xl mb-8 leading-relaxed">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            <span className="px-4 py-2 rounded-full border border-[#E8192C]/30 text-[#E8192C] text-xs font-bold bg-[#E8192C]/5">
                                                {project.tags}
                                            </span>
                                            <span className="px-4 py-2 rounded-full border border-white/10 text-white/40 text-xs font-bold bg-white/5">
                                                ✓ {project.result}
                                            </span>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="relative aspect-square lg:aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl"
                                    >
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 to-transparent" />
                                    </motion.div>
                                </div>
                            </div>

                            {/* ── STRATEGY & APPROACH ── */}
                            <div className="mb-24">
                                <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5">
                                    <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">Strategy & Approach</h2>
                                    <p className="text-white/50 text-lg leading-relaxed mb-10">
                                        {project.overview?.paragraph}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-[#E8192C] text-[10px] font-black uppercase tracking-[0.2em] mb-4">The Challenge</h3>
                                            <ul className="space-y-4">
                                                {project.overview?.challenges?.map((c, i) => (
                                                    <li key={i} className="flex gap-3 text-white/40 text-sm font-medium leading-relaxed">
                                                        <span className="shrink-0 w-5 h-5 rounded-full border border-[#E8192C]/20 flex items-center justify-center text-[10px] text-[#E8192C]">{i + 1}</span>
                                                        {c}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-[#E8192C] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Our Solution</h3>
                                            <ul className="space-y-4">
                                                {project.overview?.solutions?.map((s, i) => (
                                                    <li key={i} className="flex gap-3 text-white/60 text-sm font-medium leading-relaxed">
                                                        <FaCheck className="shrink-0 text-[#E8192C] mt-1" />
                                                        {s}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── FEATURES GRID ── */}
                            <div className="mb-24">
                                <div className="text-center mb-14">
                                    <span className="text-[#E8192C] text-xs font-black tracking-[0.3em] uppercase mb-4 block">Capabilities</span>
                                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">Key Features</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {project.features?.map((f, i) => (
                                        <div key={i} className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:border-[#E8192C]/30 transition-all duration-300 group">
                                            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
                                            <h4 className="text-white font-black uppercase tracking-tight mb-2">{f.title}</h4>
                                            <p className="text-white/30 text-xs leading-relaxed">{f.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ── MEASURABLE RESULTS (Restored to Full Width Grid) ── */}
                            <div className="mb-24 pt-20 border-t border-white/5">
                                <div className="text-center mb-14">
                                    <span className="text-[#E8192C] text-xs font-black tracking-[0.3em] uppercase mb-4 block">Impact</span>
                                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">Measurable Results</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {project.results?.map((r, i) => (
                                        <div key={i} className="p-10 rounded-[2.5rem] bg-[#0F0F0F] border border-white/5 group hover:border-[#E8192C]/20 transition-all duration-500">
                                            <div className="text-4xl md:text-5xl font-black text-[#E8192C] mb-4 leading-none tracking-tighter">{r.metric}</div>
                                            <div className="text-white/40 text-sm leading-relaxed tracking-tight">{r.text}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ── TECH STACK (Restored to Centered Section) ── */}
                            <div className="mb-24 pt-20 border-t border-white/5 text-center">
                                <span className="text-[#E8192C] text-xs font-black tracking-[0.3em] uppercase mb-4 block">Technologies</span>
                                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter uppercase">Built With Modern Tools</h2>
                                <p className="text-white/40 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
                                    Leveraging industry-leading technologies and creative platforms to deliver exceptional growth and performance.
                                </p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {project.techStack?.map((t, i) => (
                                        <span key={i} className="px-6 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white/50 text-xs font-black uppercase tracking-widest hover:border-[#E8192C]/40 hover:text-white transition-all duration-300">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* ── NAVIGATION FLOW CTA ── */}
                            <div className="pt-24 border-t border-white/5 flex justify-center">
                                {project.id === 1 ? (
                                    <button
                                        onClick={() => {
                                            const nextProject = projects.find(p => p.id === 2);
                                            if (nextProject) handleSwitchProject(nextProject);
                                        }}
                                        className="group relative flex items-center gap-4 bg-[#FF2B2B] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-[#E51D1D] transition-all duration-300 shadow-[0_10px_24px_rgba(255,43,43,0.22)]"
                                    >
                                        Next Impact Story: Adhithya Fashions
                                        <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={onClose}
                                        className="group relative flex items-center gap-4 bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white/10 transition-all duration-300"
                                    >
                                        Explore More Brands (Back to Home)
                                        <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                                    </button>
                                )}
                            </div>

                        </div>
                    </motion.div>
                </motion.div>
            )}

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 0px;
                }
                @media (min-width: 768px) {
                   .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #FF2B2B; border-radius: 10px; }
            `}</style>
        </AnimatePresence>
    );
}
