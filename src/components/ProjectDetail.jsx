import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
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

const ProjectDetail = () => {
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
            The requested project details could not be located.
          </p>
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2.5 bg-[#E31D2E] hover:bg-[#c91827] text-white px-7 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{fromPath === '/' ? "Back to Home" : "Back to Projects"}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden bg-[#050609]">
      {/* ProjectDetail-scoped Continuous Parallax Jupiter Space Environment */}
      <CaseStudySpaceBackground />

      {/* Main Content Sections */}
      <div className="relative z-10 w-full">
        {/* ── PROJECT SHOWCASE HERO ── */}
        <section className="relative w-full pt-2 sm:pt-3 lg:pt-4 pb-10 sm:pb-12 lg:pb-14 bg-transparent">
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
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-2xs hover:border-black/20 text-[#111111] text-xs font-bold uppercase tracking-wider transition-all duration-200 group cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#E31D2E]" />
                    <span>{fromPath === '/' ? "Back to Home" : "Back to Projects"}</span>
                  </button>

                  <SectionBadge text="Project Showcase" theme="dark" />
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] font-black leading-[1.08] sm:leading-[1.1] tracking-[-0.035em] text-white mb-5 sm:mb-6 max-w-2xl font-sans">
                  {renderStyledTitle(project.title)}
                </h1>

                {/* Subtitle */}
                <p className="text-neutral-300 text-base sm:text-lg lg:text-[19px] font-normal leading-[1.6] mb-7 sm:mb-8 max-w-2xl font-sans">
                  {project.description}
                </p>

              {/* Action Buttons: View Case Study + Get Proposal */}
              <div className="flex flex-wrap items-center gap-4 mb-7 sm:mb-8">
                <Link
                  to={`/case-study/${project.slug || project.id}`}
                  state={{ from: fromPath || '/projects' }}
                  className="inline-flex items-center gap-2.5 bg-[#E31D2E] hover:bg-[#c91827] text-white px-7 py-3.5 rounded-full font-bold text-[13px] sm:text-[14px] uppercase tracking-[0.02em] shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 font-sans"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setShowContactForm(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-gray-300 bg-white hover:border-gray-400 text-[#111111] font-bold text-[13px] sm:text-[14px] uppercase tracking-[0.02em] transition-all font-sans cursor-pointer"
                >
                  <span>Request Similar Project</span>
                </button>
              </div>

              {/* Deliverables Badges */}
              <div className="flex flex-wrap gap-2.5">
                {project.services.map((svc, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-2 rounded-xl border border-slate-200/90 bg-white text-[#333333] hover:text-[#E31D2E] text-xs sm:text-[13px] font-semibold tracking-[0.04em] shadow-2xs font-sans"
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
                <div className="relative rounded-2xl p-3.5 sm:p-4 bg-white border border-gray-200/90 shadow-[0_20px_50px_rgba(17,17,17,0.06)] overflow-hidden">
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-white">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
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
        <section className="relative w-full py-14 sm:py-16 lg:py-20 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
            <div className="bg-white p-8 sm:p-10 md:p-12 rounded-2xl border border-white/90 shadow-2xl relative overflow-hidden text-[#111111]">
              <div className="max-w-3xl mb-8">
                <div className="inline-flex items-center gap-2 text-[#E31D2E] text-xs font-black uppercase tracking-[0.25em] mb-4">
                  <span className="w-6 h-[2px] bg-[#E31D2E]" />
                  Project Scope
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] leading-tight mb-4 tracking-tight font-sans">
                  {project.overview.headline}
                </h2>
                <p className="text-[#575757] text-base leading-relaxed font-medium font-sans">
                  {project.overview.paragraph}
                </p>
              </div>

              {/* Deliverables & Features Grid */}
              {project.overview.features && (
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#111111] mb-5 font-sans">
                    Deliverables & Highlights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.overview.features.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-start gap-3"
                      >
                        <span className="w-5 h-5 rounded-full bg-neutral-200/80 text-[#111111] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="text-sm font-semibold text-[#111111] leading-relaxed font-sans">
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
          <div className="p-8 sm:p-12 md:p-14 rounded-2xl bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#111111] text-white shadow-2xl relative overflow-hidden">
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
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/90 bg-white text-[#111111] hover:bg-neutral-100 font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
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
    </div>
  );
};

export default ProjectDetail;
