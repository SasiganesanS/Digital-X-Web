import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
import ContactForm from "./ContactForm";

const ProjectCaseStudy = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showContactForm, setShowContactForm] = useState(false);

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
          <Link
            to="/projects"
            className="inline-flex items-center gap-2.5 bg-[#E31D2E] hover:bg-[#c91827] text-white px-7 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#111111] font-sans overflow-x-hidden selection:bg-[#E31D2E] selection:text-white">
      
      {/* ── HERO SECTION: FULL-WIDTH COVER IMAGE BACKGROUND ── */}
      <section className="relative w-full min-h-[75vh] lg:min-h-[82vh] flex items-end overflow-hidden pt-28 pb-16 lg:pb-20">
        
        {/* Full-Width Background Cover Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Rich Gradient Overlay for Image & Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-black/50" />
          <div className="absolute inset-0 bg-[#080808]/20 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start max-w-4xl"
          >
            {/* Back Button */}
            <div className="mb-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 group"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#E31D2E]" />
                <span>Back to Case Studies</span>
              </Link>
            </div>

            {/* Breadcrumb Tag */}
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gray-300 text-xs font-semibold">
              <span>{project.breadcrumb || `Blog / ${project.title}`}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight text-white mb-4 drop-shadow-sm">
              {project.title}
            </h1>

            {/* Subtitle */}
            <p className="text-gray-300 text-base sm:text-lg font-medium leading-relaxed mb-8 max-w-2xl drop-shadow-sm">
              {project.description}
            </p>

            {/* Impact Result Pill Banner */}
            <div className="p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20 mb-8 w-full max-w-xl flex items-center gap-4 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-[#E31D2E] text-white flex items-center justify-center shrink-0 shadow-md shadow-red-500/30">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#E31D2E]">
                  Impact Metric
                </div>
                <div className="text-sm sm:text-base font-black text-white">
                  {project.result}
                </div>
              </div>
            </div>

            {/* Service Badges */}
            <div className="flex flex-wrap gap-2.5">
              {project.services.map((svc, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 rounded-lg border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-wider"
                >
                  {svc}
                </span>
              ))}
            </div>

          </motion.div>

          {/* Scroll Down Hint */}
          <motion.div
            className="mt-12 flex items-center gap-3 text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="w-5 h-9 border border-white/25 rounded-full flex items-start justify-center p-1">
              <motion.div
                className="w-1 h-2 bg-[#E31D2E] rounded-full"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-white/70">
              Scroll to explore case study
            </span>
          </motion.div>
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
                  className="group relative p-7 rounded-[2rem] bg-white border border-gray-200/80 hover:border-[#E31D2E]/50 hover:shadow-[0_16px_40px_rgba(227,29,46,0.08)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 text-2xl flex items-center justify-center mb-5 group-hover:bg-[#E31D2E] group-hover:text-white transition-all duration-300 shadow-2xs">
                      {f.icon}
                    </div>
                    <h3 className="text-lg font-extrabold text-[#111111] mb-2 group-hover:text-[#E31D2E] transition-colors leading-snug">
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

      {/* ── MEASURABLE RESULTS & IMPACT ── */}
      {project.results?.length > 0 && (
        <section className="relative w-full py-16 sm:py-20 lg:py-24 border-t border-gray-200/60 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-[#E31D2E] text-xs font-black tracking-[0.25em] uppercase mb-3 block">
                Impact & Outcomes
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
                Measurable Business Growth
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.results.map((r, i) => (
                <motion.div
                  key={r.id || i}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="p-7 rounded-[2rem] bg-white border border-gray-200/90 hover:border-[#E31D2E]/50 shadow-[0_10px_30px_rgba(17,17,17,0.03)] hover:shadow-[0_16px_36px_rgba(227,29,46,0.1)] text-center flex flex-col justify-center items-center relative overflow-hidden group transition-all"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E31D2E] mb-4 animate-pulse" />
                  <h4 className="text-2xl sm:text-3xl font-black text-[#111111] mb-2 group-hover:text-[#E31D2E] transition-colors leading-tight">
                    {r.metric}
                  </h4>
                  <p className="text-[#575757] text-xs sm:text-sm font-semibold leading-relaxed">
                    {r.text}
                  </p>
                </motion.div>
              ))}
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
                    className="px-5 py-2.5 rounded-full border border-gray-200 bg-white shadow-2xs hover:border-[#E31D2E] hover:text-[#E31D2E] text-[#333333] text-xs font-extrabold uppercase tracking-wider transition-all duration-200"
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
