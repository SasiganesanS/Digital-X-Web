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

const renderStyledTitle = (title) => {
  if (!title) return null;
  if (title.includes("–")) {
    const [part1, ...rest] = title.split("–");
    return (
      <>
        <span className="block">{part1.trim()} –</span>
        <span className="block text-[#E31D2E]">{rest.join("–").trim()}</span>
      </>
    );
  }
  if (title.includes("-")) {
    const [part1, ...rest] = title.split("-");
    return (
      <>
        <span className="block">{part1.trim()} –</span>
        <span className="block text-[#E31D2E]">{rest.join("-").trim()}</span>
      </>
    );
  }
  const words = title.split(" ");
  if (words.length > 2) {
    const mainWords = words.slice(0, words.length - 2).join(" ");
    const redWords = words.slice(words.length - 2).join(" ");
    return (
      <>
        <span className="block">{mainWords}</span>
        <span className="block text-[#E31D2E]">{redWords}</span>
      </>
    );
  }
  return <span className="block text-[#E31D2E]">{title}</span>;
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

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#111111] flex items-center justify-center px-6">
        <div className="text-center max-w-md bg-white p-8 sm:p-10 rounded-[2.5rem] border border-gray-200 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 text-[#E31D2E] flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-[#111111] mb-2">Project Not Found</h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">
            The requested case study could not be located or may have moved.
          </p>
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2.5 bg-[#E31D2E] hover:bg-[#c91827] text-white px-7 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{fromPath === '/projects' ? "Back to Projects" : "Back to Case Studies"}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#111111] font-sans overflow-x-hidden selection:bg-[#E31D2E] selection:text-white">
      
      {/* ── CASE STUDY HERO ── */}
      <section className="relative w-full pt-2 sm:pt-3 lg:pt-4 pb-10 sm:pb-12 lg:pb-14 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Metadata & Hero Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              {/* Top Navigation Row: Back Button & Breadcrumb */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-2xs hover:border-black/20 text-[#111111] text-xs font-bold uppercase tracking-wider transition-all duration-200 group cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#E31D2E]" />
                  <span>{fromPath === '/projects' ? "Back to Projects" : "Back to Case Studies"}</span>
                </button>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50/90 border border-red-100/90 text-[#E31D2E] text-xs font-bold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-[#E31D2E] animate-pulse" />
                  <span>{project.breadcrumb || `Blog / ${project.title}`}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] font-black leading-[1.08] sm:leading-[1.1] tracking-[-0.035em] text-[#111111] mb-5 sm:mb-6 max-w-2xl font-sans">
                {renderStyledTitle(project.title)}
              </h1>

              {/* Subtitle */}
              <p className="text-[#575757] text-base sm:text-lg lg:text-[19px] font-normal leading-[1.6] mb-7 sm:mb-8 max-w-2xl font-sans">
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
                <div className="relative rounded-[2.5rem] p-3.5 sm:p-4 bg-white border border-gray-200/90 shadow-[0_20px_50px_rgba(17,17,17,0.06)] overflow-hidden">
                  <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] bg-gray-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
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

      {/* ── OVERVIEW / CHALLENGES & SOLUTIONS SECTION ── */}
      {project.overview && (
        <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
            
            <div className="bg-white p-8 sm:p-12 md:p-14 rounded-[2.5rem] border border-gray-200/90 shadow-[0_20px_50px_rgba(17,17,17,0.04)] relative overflow-hidden">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
                
                {/* Left Column: Narrative Headline & Paragraph */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="lg:col-span-6"
                >
                  <div className="inline-flex items-center gap-2.5 text-[#E31D2E] text-xs font-black uppercase tracking-[0.25em] mb-4">
                    <span className="w-6 h-[2px] bg-[#E31D2E]" />
                    Project Overview
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-[#111111] leading-tight mb-6 tracking-tight">
                    {project.overview.headline}
                  </h2>
                  <p className="text-[#575757] text-base sm:text-lg leading-relaxed font-medium">
                    {project.overview.paragraph}
                  </p>
                </motion.div>

                {/* Right Column: Challenges & Solutions Cards */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="lg:col-span-6 space-y-6"
                >
                  {/* Challenges Box */}
                  {project.overview.challenges && (
                    <div className="p-6 sm:p-7 rounded-[1.75rem] bg-slate-50 border border-slate-200/80 space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#E31D2E] flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E31D2E]" />
                        Key Challenges
                      </h3>
                      <ul className="space-y-3">
                        {project.overview.challenges.map((c, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-[#333333]">
                            <span className="w-5 h-5 rounded-full bg-red-50 border border-red-100 text-[#E31D2E] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                              0{i + 1}
                            </span>
                            <span className="leading-relaxed font-semibold">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Solutions Box */}
                  {project.overview.solutions && (
                    <div className="p-6 sm:p-7 rounded-[1.75rem] bg-gradient-to-br from-emerald-50/60 to-slate-50 border border-emerald-100 space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        Our Solution & Strategy
                      </h3>
                      <ul className="space-y-3">
                        {project.overview.solutions.map((s, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-[#333333]">
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                              ✓
                            </span>
                            <span className="leading-relaxed font-semibold">{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>

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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
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
                  className="group relative p-7 sm:p-8 rounded-[2rem] bg-white border border-gray-200/90 shadow-[0_10px_30px_rgba(17,17,17,0.03)] hover:border-black/20 hover:shadow-[0_18px_44px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Red Gradient Accent Line on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E31D2E] to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-[2rem]" />
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50/90 border border-red-100/90 text-[#E31D2E] text-[10px] font-black uppercase tracking-widest mb-4">
                      <span>Feature 0{i + 1}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-[#111111] mb-2.5 group-hover:text-[#E31D2E] transition-colors leading-snug tracking-tight">
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

      {/* ── MEASURABLE RESULTS & IMPACT (LIGHT THEME) ── */}
      {project.results?.length > 0 && (
        <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
            
            <div className="bg-gradient-to-br from-red-50/60 via-white to-slate-50/80 rounded-[2.5rem] p-8 sm:p-12 md:p-14 border border-neutral-200/80 shadow-[0_15px_45px_rgba(0,0,0,0.04)] relative overflow-hidden text-[#111111]">
              
              {/* Header Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-left mb-12 sm:mb-14 relative z-10 max-w-2xl"
              >
                <div className="mb-4">
                  <SectionBadge text="Impact & Outcomes" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight leading-tight mb-3">
                  Measurable Business Growth
                </h2>
                <p className="text-[#575757] text-sm sm:text-base font-medium leading-relaxed">
                  Concrete performance metrics and real outcomes achieved through our tailored strategy and execution.
                </p>
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
                    className="p-7 sm:p-8 rounded-[1.75rem] bg-white border border-neutral-200/80 shadow-[0_8px_24px_rgba(17,17,17,0.03)] hover:border-black/20 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] flex flex-col justify-between group transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#E31D2E] bg-red-50 px-2.5 py-1 rounded-md border border-red-100/60">
                          Metric 0{i + 1}
                        </span>
                        <div className="w-2 h-2 rounded-full bg-[#E31D2E] animate-pulse" />
                      </div>

                      {/* Prominent Red Highlight Metric */}
                      <h4 className="text-2xl sm:text-3xl font-black text-[#E31D2E] group-hover:scale-[1.02] transition-transform origin-left leading-tight mb-3">
                        {r.metric}
                      </h4>
                    </div>

                    <p className="text-[#575757] text-xs sm:text-sm font-semibold leading-relaxed border-t border-gray-100 pt-4 mt-2">
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
                    className="px-5 py-2.5 rounded-full border border-gray-200 bg-white shadow-2xs hover:border-black/20 hover:text-[#E31D2E] text-[#333333] text-xs font-extrabold uppercase tracking-wider transition-all duration-200"
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
            className="p-8 sm:p-12 md:p-14 rounded-[2.5rem] bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#111111] text-white shadow-2xl relative overflow-hidden"
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
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#E31D2E] hover:bg-[#c91827] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-red-500/25 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2.5"
              >
                <span>Get Detailed Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/projects"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 hover:border-white/40 bg-white/10 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
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
  );
};

export default ProjectCaseStudy;
