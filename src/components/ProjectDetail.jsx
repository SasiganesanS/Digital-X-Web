import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Zap
} from "lucide-react";
import SectionBadge from "./common/SectionBadge";
import { projects } from "../data/projects";
import ContactForm from "./ContactForm";
import CaseStudySpaceBackground from "./CaseStudySpaceBackground";
import HeroLayout from "./common/HeroLayout";

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
      <div className="min-h-screen bg-[#050609] text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-xl text-[#111111]">
          <div className="w-16 h-16 rounded-xl bg-red-50 border border-red-100 text-[#E31D2E] flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-[#111111] mb-2">Project Not Found</h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">
            The requested project details could not be located.
          </p>
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2.5 bg-[#E31D2E] hover:bg-[#c91827] text-white px-7 py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 cursor-pointer"
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
        <HeroLayout
          sectionId="project-detail-hero"
          leftColClass="lg:col-span-7"
          rightColClass="lg:col-span-5"
          badge={
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white shadow-2xs hover:border-black/20 text-[#111111] text-xs font-bold uppercase tracking-wider transition-all duration-200 group cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#E31D2E]" />
                <span>{fromPath === '/' ? "Back to Home" : "Back to Projects"}</span>
              </button>
            </div>
          }
          title={
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-[44px] font-black leading-[1.1] tracking-tight text-white mb-4 max-w-2xl font-sans"
            >
              {renderStyledTitle(project.title)}
            </motion.h1>
          }
          description={
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="hero-description text-neutral-300 text-base sm:text-lg font-medium leading-relaxed mb-4 sm:mb-6 max-w-2xl font-sans"
            >
              {project.description}
            </motion.p>
          }
          actions={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center lg:items-start w-full gap-2 sm:gap-4 pt-0.5"
            >
              {/* Key Outcome & Year Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2.5 w-full">
                {project.result && (
                  <div className="inline-flex items-center gap-1.5 sm:gap-2.5 px-2.5 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-white border border-gray-200 text-[#111111] shadow-xs">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E31D2E] animate-pulse shrink-0" />
                    <span className="text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#E31D2E]">
                      Outcome:
                    </span>
                    <span className="text-[10px] sm:text-sm font-black text-[#111111]">
                      {project.result}
                    </span>
                  </div>
                )}
                {project.year && (
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl bg-white border border-gray-200 text-[#111111] text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-xs">
                    <span className="text-neutral-500 font-semibold">Year:</span>
                    <span className="text-[#111111] font-black">{project.year}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons: View Case Study + Request Proposal */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 pt-1">
                <Link
                  to={`/case-study/${project.slug || project.id}`}
                  state={{ from: fromPath || '/projects' }}
                  className="inline-flex items-center gap-1.5 sm:gap-2.5 bg-[#E31D2E] hover:bg-white hover:text-[#111111] text-white px-4 py-2 sm:px-7 sm:py-3.5 rounded-xl font-black text-[10px] sm:text-[14px] uppercase tracking-[0.02em] shadow-lg shadow-red-500/20 transition-all duration-300 hover:-translate-y-0.5 font-sans"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setShowContactForm(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-6 sm:py-3.5 rounded-xl border border-gray-300 bg-white hover:border-gray-400 text-[#111111] font-extrabold text-[10px] sm:text-[14px] uppercase tracking-[0.02em] transition-all font-sans cursor-pointer"
                >
                  <span>Request Similar Project</span>
                </button>
              </div>
            </motion.div>
          }
          media={
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[240px] sm:max-w-lg mx-auto lg:max-w-none">
                <div className="relative rounded-2xl p-1.5 sm:p-4 bg-white border border-gray-200/90 shadow-[0_20px_50px_rgba(17,17,17,0.06)] overflow-hidden max-w-[240px] sm:max-w-md mx-auto lg:max-w-none">
                  <div className="relative rounded-xl overflow-hidden aspect-[16/10] sm:aspect-square bg-[#050609]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain transition-transform duration-700"
                    />
                  </div>

                  <div className="mt-2 sm:mt-4 p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[8px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[#E31D2E]">
                        Key Outcome
                      </div>
                      <div className="text-xs sm:text-lg font-black text-[#111111] truncate max-w-[140px] sm:max-w-none">
                        {project.result}
                      </div>
                    </div>
                    <span className="text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#575757] bg-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-md border border-neutral-200">
                      Delivered
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          }
        />

        {/* ── PROJECT HIGHLIGHTS & SCOPE ── */}
        {project.overview && (
          <section className="relative w-full py-5 sm:py-16 lg:py-20 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
              <div className="bg-white p-4 sm:p-10 md:p-12 rounded-2xl border border-white/90 shadow-2xl relative overflow-hidden text-[#111111]">
                <div className="max-w-3xl mb-4 sm:mb-8">
                  <div className="mb-2 sm:mb-3">
                    <SectionBadge text="Project Scope" />
                  </div>
                  <h2 className="text-lg sm:text-3xl lg:text-4xl font-black text-[#111111] leading-tight mb-2 sm:mb-4 tracking-tight font-sans">
                    {project.overview.headline}
                  </h2>
                  <p className="text-[#575757] text-xs sm:text-base leading-relaxed font-medium font-sans">
                    {project.overview.paragraph}
                  </p>
                </div>

                {/* Deliverables & Features Grid */}
                {project.overview.features && (
                  <div>
                    <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#111111] mb-3 sm:mb-5 font-sans">
                      Deliverables & Highlights
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
                      {project.overview.features.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 sm:p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-start gap-2.5"
                        >
                          <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-neutral-200/80 text-[#111111] font-black text-[10px] sm:text-xs flex items-center justify-center shrink-0 mt-0.5">
                            ✓
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-[#111111] leading-relaxed font-sans">
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

        {/* ── CTA FOOTER (SEAMLESS DARK LAYOUT WITHOUT BOX CONTAINER) ── */}
        <section className="relative w-full py-5 sm:py-16 lg:py-20 bg-transparent">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="mb-2 sm:mb-4">
                <SectionBadge text="WORK WITH US" theme="dark" />
              </div>

              <h2 className="text-xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-2 sm:mb-4">
                Have a project similar to <span className="text-[#E31D2E]">{project.title}?</span>
              </h2>

              <p className="text-neutral-300 text-xs sm:text-base max-w-lg mx-auto mb-4 sm:mb-8 leading-relaxed font-medium">
                Let's create a tailor-made digital solution to scale your brand.
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center items-center w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setShowContactForm(true)}
                  className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-[#E31D2E] hover:bg-white hover:text-[#111111] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <Link
                  to={`/case-study/${project.slug || project.id}`}
                  className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-xl border border-white/80 bg-white text-[#111111] hover:bg-neutral-100 font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <span>View Full Case Study</span>
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

export default ProjectDetail;
