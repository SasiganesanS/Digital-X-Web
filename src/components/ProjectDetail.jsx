import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  ExternalLink,
  Layers,
  Award,
  Zap,
  ChevronRight
} from "lucide-react";
import SectionBadge from "./common/SectionBadge";
import { projects } from "../data/projects";
import ContactForm from "./ContactForm";

const ProjectDetail = () => {
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
            The requested project details could not be located.
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
      
      {/* ── PROJECT SHOWCASE HERO ── */}
      <section className="relative w-full pt-2 sm:pt-3 lg:pt-4 pb-10 sm:pb-12 lg:pb-14 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Project Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              {/* Back Button & Category Badge */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-2xs hover:border-[#E31D2E]/40 text-[#111111] text-xs font-bold uppercase tracking-wider transition-all duration-200 group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#E31D2E]" />
                  <span>Back to Projects</span>
                </Link>

                <SectionBadge text="Project Showcase" />
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-[48px] xl:text-[52px] font-black leading-[1.22] tracking-tight text-[#111111] mb-4 sm:mb-5">
                {project.title}
              </h1>

              {/* Subtitle */}
              <p className="text-[#575757] text-base sm:text-lg font-medium leading-relaxed mb-6 sm:mb-7 max-w-2xl">
                {project.description}
              </p>

              {/* Action Buttons: View Case Study + Get Proposal */}
              <div className="flex flex-wrap items-center gap-4 mb-7">
                <Link
                  to={`/case-study/${project.slug || project.id}`}
                  className="inline-flex items-center gap-2.5 bg-[#E31D2E] hover:bg-[#c91827] text-white px-7 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setShowContactForm(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-gray-300 bg-white hover:border-gray-400 text-[#111111] font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Request Similar Project</span>
                </button>
              </div>

              {/* Deliverables Badges */}
              <div className="flex flex-wrap gap-2.5">
                {project.services.map((svc, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white text-[#333333] text-xs font-extrabold uppercase tracking-wider shadow-2xs"
                  >
                    {svc}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Project Media Card */}
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

                  <div className="mt-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#E31D2E]">
                        Key Outcome
                      </div>
                      <div className="text-base sm:text-lg font-black text-[#111111]">
                        {project.result}
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#575757] bg-white px-3 py-1 rounded-md border border-neutral-200">
                      Delivered
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── PROJECT HIGHLIGHTS & SCOPE ── */}
      {project.overview && (
        <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-transparent border-t border-gray-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
            <div className="bg-white p-8 sm:p-12 md:p-14 rounded-[2.5rem] border border-gray-200/90 shadow-sm relative overflow-hidden">
              <div className="max-w-3xl mb-10">
                <div className="inline-flex items-center gap-2 text-[#E31D2E] text-xs font-black uppercase tracking-[0.25em] mb-4">
                  <span className="w-6 h-[2px] bg-[#E31D2E]" />
                  Project Scope
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-[#111111] leading-tight mb-4 tracking-tight">
                  {project.overview.headline}
                </h2>
                <p className="text-[#575757] text-base sm:text-lg leading-relaxed font-medium">
                  {project.overview.paragraph}
                </p>
              </div>

              {/* Deliverables & Features Grid */}
              {project.overview.features && (
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#111111] mb-6">
                    Deliverables & Highlights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.overview.features.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-red-50 text-[#E31D2E] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="text-sm font-semibold text-[#333333] leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── TECH STACK & CTA FOOTER ── */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 border-t border-gray-200/60 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          
          {/* Tech Stack Pills */}
          {project.techStack?.length > 0 && (
            <div className="mb-16">
              <span className="text-gray-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4 block">
                Tech Stack & Tools
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] mb-6">
                Built with Modern Technologies
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-5 py-2.5 rounded-full border border-gray-200 bg-white text-[#333333] text-xs font-extrabold uppercase tracking-wider shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Box */}
          <div className="p-8 sm:p-12 md:p-14 rounded-[2.5rem] bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#111111] text-white shadow-2xl relative overflow-hidden">
            <span className="text-[#E31D2E] text-xs font-black tracking-[0.3em] uppercase mb-3 block">
              Work With Us
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
              Have a project similar to <span className="text-[#E31D2E]">{project.title}?</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed font-medium">
              Let's create a tailor-made digital solution to scale your brand.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                type="button"
                onClick={() => setShowContactForm(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#E31D2E] hover:bg-[#c91827] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-red-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to={`/case-study/${project.slug || project.id}`}
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 hover:border-white/40 bg-white/10 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>View Full Case Study</span>
              </Link>
            </div>
          </div>

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

export default ProjectDetail;
