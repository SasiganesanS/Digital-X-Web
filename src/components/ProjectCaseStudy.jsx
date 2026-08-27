import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  TrendingUp,
  Layers,
  Award,
  Zap,
  ChevronRight
} from "lucide-react";
import { projects } from "../data/projects";
import SectionBadge from "./common/SectionBadge";
import ContactForm from "./ContactForm";
import CaseStudySpaceBackground from "./CaseStudySpaceBackground";

const renderStyledTitle = (title) => {
  if (!title) return null;
  if (title.includes("–")) {
    const [part1, ...rest] = title.split("–");
    return (
      <>
        <span>{part1.trim()} – </span>
        <span className="text-[#E31D2E]">{rest.join("–").trim()}</span>
      </>
    );
  }
  if (title.includes("-")) {
    const [part1, ...rest] = title.split("-");
    return (
      <>
        <span>{part1.trim()} – </span>
        <span className="text-[#E31D2E]">{rest.join("-").trim()}</span>
      </>
    );
  }
  const words = title.split(" ");
  if (words.length > 2) {
    const mainWords = words.slice(0, words.length - 2).join(" ");
    const redWords = words.slice(words.length - 2).join(" ");
    return (
      <>
        <span>{mainWords} </span>
        <span className="text-[#E31D2E]">{redWords}</span>
      </>
    );
  }
  return <span className="text-[#E31D2E]">{title}</span>;
};

const ProjectCaseStudy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [showContactForm, setShowContactForm] = useState(false);

  const fromPath = location.state?.from;
  const projectSlug = location.state?.projectSlug || id;

  const handleBack = () => {
    if (fromPath === '/' || fromPath === 'home') {
      navigate('/', { replace: true });
      setTimeout(() => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (fromPath === '/projects') {
      navigate('/projects', { state: { scrollToId: projectSlug } });
    } else if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/projects', { state: { scrollToId: projectSlug } });
    }
  };

  // Find project by id or slug
  const project = projects.find(
    (p) => String(p.id) === id || p.slug === id
  );

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [id]);

  const renderStyledTitle = (rawTitle) => {
    if (!rawTitle) return null;
    const words = rawTitle.trim().split(" ");
    if (words.length === 1) {
      return words[0];
    }
    const mainText = words.slice(0, -1).join(" ");
    const lastWord = words[words.length - 1];
    return (
      <>
        {mainText} <span className="text-[#E31D2E]">{lastWord}</span>
      </>
    );
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#111111] flex items-center justify-center px-6">
        <div className="text-center max-w-md bg-white p-8 sm:p-10 rounded-2xl border border-gray-200">
          <div className="w-16 h-16 rounded-xl bg-neutral-100 border border-neutral-200 text-[#111111] flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#111111] mb-2">Project Not Found</h2>
          <p className="text-neutral-600 mb-6 font-medium">The requested case study could not be located.</p>
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2.5 bg-[#E31D2E] hover:bg-[#c91827] text-white px-7 py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-none transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{fromPath === '/projects' ? "Back to Projects" : "Back to Case Studies"}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden bg-[#050609]">
      <CaseStudySpaceBackground />

      <div className="relative z-10 w-full">
        <section className="relative w-full pt-2 sm:pt-3 lg:pt-4 pb-10 sm:pb-12 lg:pb-14 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 flex flex-col items-start"
              >
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white shadow-none hover:border-black/20 text-[#111111] text-xs font-bold uppercase tracking-wider transition-all duration-200 group cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#E31D2E]" />
                    <span>{fromPath === '/projects' ? "Back to Projects" : "Back to Case Studies"}</span>
                  </button>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-white/90 text-[#111111] text-xs font-black tracking-wide shadow-none">
                    <span className="w-2 h-2 rounded-full bg-[#E31D2E]" />
                    <span>{project.breadcrumb || `Blog / ${project.title}`}</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] font-black leading-[1.08] sm:leading-[1.1] tracking-[-0.035em] text-white mb-5 sm:mb-6 max-w-2xl font-sans">
                  {renderStyledTitle(project.title)}
                </h1>

                {/* Subtitle */}
                <p className="text-neutral-300 text-base sm:text-lg lg:text-[19px] font-normal leading-[1.6] mb-7 sm:mb-8 max-w-2xl font-sans">
                  {project.description}
                </p>

              {/* Impact Metric Banner Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/90 shadow-[0_10px_30px_rgba(17,17,17,0.04)] mb-7 sm:mb-8 w-full max-w-xl flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#E31D2E] text-white flex items-center justify-center shrink-0 shadow-md shadow-red-500/20">
                  <TrendingUp className="w-5.5 h-5.5" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.12em] text-[#E31D2E] mb-0.5 font-sans">
                    Impact Metric
                  </div>
                  <div className="text-lg sm:text-xl lg:text-[22px] font-extrabold text-[#111111] tracking-[-0.02em] font-sans">
                    {project.result}
                  </div>
                </div>
              </div>

              {/* Service Badges */}
              <div className="flex flex-wrap gap-2.5">
                {project.services.map((svc, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-2 rounded-xl border border-slate-200/90 bg-white text-[#333333] hover:text-[#E31D2E] hover:border-red-200 hover:bg-red-50/50 text-xs sm:text-[13px] font-semibold tracking-[0.04em] shadow-2xs transition-all font-sans"
                  >
                    {svc}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right Column: High-Impact Showcase Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 w-full flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
                <div className="relative rounded-2xl p-3.5 sm:p-4 bg-white border border-gray-200/90 shadow-[0_20px_50px_rgba(17,17,17,0.06)] overflow-hidden">
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-white">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Clean floating status badge */}
                  <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 p-3 px-4 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200 shadow-md flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E31D2E] animate-ping" />
                    <span className="text-[#111111] text-xs font-extrabold uppercase tracking-wider">
                      Featured Case Study
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── OVERVIEW / CHALLENGES & SOLUTIONS SECTION (COMPACT SHORTER BOX) ── */}
      {project.overview && (
        <section className="relative w-full py-8 sm:py-10 lg:py-12 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
            
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-white/90 shadow-2xl relative overflow-hidden text-[#111111]">
              
              {/* Top Narrative Row */}
              <div className="mb-6 pb-6 border-b border-neutral-100">
                <div className="inline-flex items-center gap-2 text-[#E31D2E] text-xs font-black uppercase tracking-[0.2em] mb-2.5">
                  <span className="w-5 h-[2px] bg-[#E31D2E]" />
                  Project Overview
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#111111] leading-snug mb-2.5 tracking-tight font-sans">
                  {project.overview.headline}
                </h2>
                <p className="text-[#575757] text-sm leading-relaxed font-medium font-sans max-w-4xl">
                  {project.overview.paragraph}
                </p>
              </div>

              {/* Bottom 2-Column Side-by-Side Subgrid: Key Challenges (Left) & Our Solution (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch relative z-10">
                {/* Key Challenges Box */}
                {project.overview.challenges && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-3.5">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.18em] text-[#E31D2E] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#E31D2E]" />
                      Key Challenges
                    </h3>
                    <ul className="space-y-2.5">
                      {project.overview.challenges.map((c, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#111111]">
                          <span className="w-4 h-4 rounded-full bg-neutral-200/70 border border-neutral-300 text-[#111111] font-black text-[9px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                            0{i + 1}
                          </span>
                          <span className="leading-snug font-semibold">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Solutions Box */}
                {project.overview.solutions && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-3.5">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Our Solution & Strategy
                    </h3>
                    <ul className="space-y-2.5">
                      {project.overview.solutions.map((s, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#111111]">
                          <span className="w-4 h-4 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 font-black text-[9px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                            ✓
                          </span>
                          <span className="leading-snug font-semibold">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

            </div>

          </div>
        </section>
      )}

      {/* ── FEATURES & CAPABILITIES GRID ── */}
      {project.features?.length > 0 && (
        <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-transparent border-t border-gray-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-[#E31D2E] text-xs font-black tracking-[0.25em] uppercase mb-3 block">
                {project.featuresLabel || "Execution Details"}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {project.featuresTitle || "Key Capabilities Implemented"}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.features.map((f, i) => (
                <motion.div
                  key={f.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  whileHover={{ y: -5 }}
                  className="group relative p-7 sm:p-8 rounded-2xl bg-white border border-gray-200/90 shadow-[0_10px_30px_rgba(17,17,17,0.03)] hover:border-black/20 hover:shadow-[0_18px_44px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/5 border border-black/20 text-[#111111] text-[10px] font-black uppercase tracking-widest mb-4">
                      <span>Feature 0{i + 1}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-[#111111] mb-2.5 leading-snug tracking-tight font-sans">
                      {f.title}
                    </h3>
                    <p className="text-[#575757] text-sm leading-relaxed font-medium">
                      {f.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ── MEASURABLE RESULTS & IMPACT (100% SOLID WHITE CONTAINER) ── */}
      {project.results?.length > 0 && (
        <section className="relative w-full py-14 sm:py-16 lg:py-20 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
            
            <div className="bg-white rounded-2xl p-8 sm:p-10 md:p-12 border border-white/90 shadow-2xl relative overflow-hidden text-[#111111]">
              
              {/* Balanced Header Row — Title Left, Impact Badge Right (No Empty Space) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 relative z-10 border-b border-neutral-100 pb-8"
              >
                <div className="max-w-2xl">
                  <div className="mb-3">
                    <SectionBadge text="Impact & Outcomes" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] tracking-tight leading-tight mb-3 font-sans">
                    Measurable Business Growth
                  </h2>
                  <p className="text-[#575757] text-sm sm:text-base font-medium leading-relaxed font-sans">
                    Concrete performance metrics and real outcomes achieved through our tailored strategy and execution.
                  </p>
                </div>

                {/* Right Badge Summary Pill (Fills Top Right White Space) */}
                <div className="shrink-0 flex items-center gap-3 px-5 py-3 rounded-2xl bg-neutral-50 border border-neutral-200/80 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-neutral-200/80 text-[#111111] font-black text-xs flex items-center justify-center">
                    ✓
                  </div>
                  <div className="text-xs font-extrabold text-[#111111] tracking-wide uppercase font-sans">
                    Verified Performance Metrics
                  </div>
                </div>
              </motion.div>

              {/* Metric Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {project.results.map((r, i) => (
                  <motion.div
                    key={r.id || i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="p-6 sm:p-7 rounded-2xl bg-neutral-50 border border-neutral-200/80 shadow-2xs hover:border-black/20 hover:shadow-md flex flex-col justify-between group transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#111111] bg-neutral-200/60 px-2.5 py-1 rounded-md border border-neutral-300/80 font-sans">
                          Metric 0{i + 1}
                        </span>
                      </div>

                      {/* Black Headline */}
                      <h4 className="text-xl sm:text-2xl font-black text-[#111111] leading-tight mb-3 font-sans">
                        {r.metric}
                      </h4>
                    </div>

                    <p className="text-[#575757] text-xs sm:text-sm font-semibold leading-relaxed border-t border-neutral-200/60 pt-4 mt-2 font-sans">
                      {r.text}
                    </p>
                  </motion.div>
                ))}
              </div>

            </div>

          </div>
        </section>
      )}

      {/* ── TECH STACK & CTA FOOTER ── */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 border-t border-gray-200/60 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          
          {/* Tech Stack Pills */}
          {project.techStack?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <span className="text-gray-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4 block">
                {project.techLabel || "Technologies & Tools"}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] mb-6">
                {project.techTitle || "Powered by Industry-Leading Tools"}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white shadow-2xs hover:border-black/20 hover:text-[#E31D2E] text-[#333333] text-xs font-extrabold uppercase tracking-wider transition-all duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Divider */}
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-16" />

          {/* CTA Box */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-8 sm:p-12 md:p-14 rounded-2xl bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#111111] text-white shadow-2xl relative overflow-hidden"
          >
            <span className="text-[#E31D2E] text-xs font-black tracking-[0.3em] uppercase mb-3 block">
              Start Your Journey
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
              Ready to scale your brand like <span className="text-[#E31D2E]">{project.title}?</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed font-medium">
              Let's craft a custom digital strategy tailored to your growth goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                type="button"
                onClick={() => setShowContactForm(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#E31D2E] hover:bg-[#c91827] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-red-500/25 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2.5"
              >
                <span>Get Detailed Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/projects"
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/90 bg-white text-[#111111] hover:bg-neutral-100 font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Explore All Projects</span>
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Contact Form Modal */}
      <ContactForm
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
      />
      </div>
    </div>
  );
};

export default ProjectCaseStudy;
