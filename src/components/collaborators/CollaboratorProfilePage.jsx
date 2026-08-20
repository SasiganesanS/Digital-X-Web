import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SectionBadge from "../common/SectionBadge";
import CollaborationRequestModal from "./CollaborationRequestModal";
import { getCollaboratorBySlug } from "../../data/collaborators";
import CollaboratorSpaceBackground from "./CollaboratorSpaceBackground";

export default function CollaboratorProfilePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const collaborator = getCollaboratorBySlug(slug);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (collaborator) {
      document.title = `${collaborator.name} — ${collaborator.role} | DigitalX Collaborator Network`;
    }
  }, [collaborator, slug]);

  if (!collaborator) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 text-center">
        <h2 className="text-3xl font-black text-[#111111] mb-4">Collaborator Not Found</h2>
        <p className="text-neutral-600 font-medium mb-6">The requested collaborator profile does not exist.</p>
        <Link to="/collaborators" className="px-6 py-3 rounded-full bg-[#111111] text-white font-bold text-sm hover:bg-[#E31D2E] transition-all">
          Back to Collaborators
        </Link>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden bg-[#050609]">
      {/* Collaborator-scoped Continuous Parallax Uranus Space Environment */}
      <CollaboratorSpaceBackground />

      {/* Main Content Sections */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-500">
            <li>
              <Link to="/" className="hover:text-black transition-colors">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/collaborators" className="hover:text-black transition-colors">Collaborators</Link>
            </li>
            <li>/</li>
            <li className="text-[#E31D2E] font-bold">{collaborator.name}</li>
          </ol>
        </nav>

        {/* Profile Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2.5rem] bg-gradient-to-br from-neutral-50 via-white to-neutral-50 border border-neutral-200/90 p-6 sm:p-10 lg:p-12 shadow-[0_16px_50px_rgba(0,0,0,0.05)] mb-14"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Image Column (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[4/5] max-h-[460px] rounded-[2rem] overflow-hidden border border-neutral-200 shadow-md bg-neutral-100">
                <img
                  src={collaborator.image}
                  alt={collaborator.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-white/90 backdrop-blur-md text-[#111111] border border-white/50 shadow-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{collaborator.availability}</span>
                </div>
              </div>
            </div>

            {/* Right Info Column (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-[#E31D2E]/10 text-[#E31D2E] border border-[#E31D2E]/20 mb-3 inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E31D2E]" />
                {collaborator.categoryLabel}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight leading-tight mb-2">
                {collaborator.name}
              </h1>

              <p className="text-sm font-extrabold text-[#E31D2E] uppercase tracking-widest mb-4">
                {collaborator.role} • {collaborator.experience} Experience
              </p>

              <p className="text-neutral-600 text-sm sm:text-base font-medium leading-relaxed mb-6">
                {collaborator.shortDescription}
              </p>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 gap-4 w-full mb-8 p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
                <div>
                  <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest block mb-0.5">
                    Experience Level
                  </span>
                  <span className="text-base font-black text-[#111111]">
                    {collaborator.experience}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest block mb-0.5">
                    Engagement Status
                  </span>
                  <span className="text-base font-black text-[#111111]">
                    DigitalX Network Partner
                  </span>
                </div>
              </div>

              {/* Primary Action CTA Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#E31D2E] via-[#FF2B2B] to-[#E31D2E] text-white font-extrabold text-sm tracking-wide shadow-[0_10px_25px_rgba(227,29,46,0.35)] hover:shadow-[0_16px_35px_rgba(227,29,46,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <span>Request This Collaborator</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>

              <p className="text-[11px] font-semibold text-neutral-400 mt-3">
                DigitalX coordinates every collaboration from project requirements to execution.
              </p>
            </div>

          </div>
        </motion.div>

        {/* Bio & Skills Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          
          {/* Left Bio Box (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-[2rem] p-8 border border-neutral-200/90 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#E31D2E] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E31D2E]" />
              About {collaborator.name}
            </h3>
            <p className="text-neutral-700 text-sm sm:text-base font-medium leading-relaxed mb-6">
              {collaborator.bio}
            </p>

            <h4 className="text-xs font-black uppercase tracking-[0.18em] text-[#111111] mb-3">
              Capabilities & Services
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {collaborator.services.map((svc, idx) => (
                <div key={idx} className="flex items-center gap-2.5 bg-neutral-50 p-3 rounded-xl border border-neutral-200/80">
                  <div className="w-4 h-4 rounded-full bg-[#E31D2E] text-white flex items-center justify-center text-[9px] font-black flex-shrink-0">
                    ✓
                  </div>
                  <span className="text-xs font-bold text-neutral-800">{svc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Skills Box (5 Cols) */}
          <div className="lg:col-span-5 bg-neutral-50 rounded-[2rem] p-8 border border-neutral-200/90 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#111111] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E31D2E]" />
                Specialized Skills
              </h3>

              <div className="flex flex-wrap gap-2 mb-6">
                {collaborator.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-white text-[#111111] border border-neutral-200 shadow-2xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 mt-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#E31D2E] block mb-1">
                Collaborator Engagement
              </span>
              <p className="text-xs font-medium text-neutral-600">
                Project scheduling, scope definition, contracts, and commercial terms are fully managed by DigitalX.
              </p>
            </div>
          </div>

        </div>

        {/* Portfolio / Sample Work Gallery */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#E31D2E] block mb-1">
                Selected Work
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                Sample Work Portfolio
              </h3>
            </div>

            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider hidden sm:block">
              Curated by DigitalX
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {collaborator.portfolio.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden border border-neutral-200/90 bg-neutral-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 bg-white border-t border-neutral-200/80">
                  <span className="text-[9px] font-black uppercase tracking-wider text-[#E31D2E] block mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-black text-[#111111]">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="rounded-[2.5rem] bg-[#111111] p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black mb-4">
            Ready to Collaborate with {collaborator.name}?
          </h3>
          <p className="text-neutral-400 text-sm sm:text-base font-medium max-w-xl mx-auto mb-6">
            Submit your project details to DigitalX. We handle project scoping, terms, commercial arrangements, and team coordination.
          </p>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 rounded-full bg-white hover:bg-[#E31D2E] text-black hover:text-white font-extrabold text-sm transition-all duration-300 shadow-md cursor-pointer inline-flex items-center gap-2"
          >
            <span>Request This Collaborator</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

      </div>

      {/* Collaboration Request Modal */}
      <CollaborationRequestModal
        collaborator={collaborator}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
