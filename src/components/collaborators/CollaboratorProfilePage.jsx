import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, ArrowUpRight } from "lucide-react";
import SectionBadge from "../common/SectionBadge";
import HeroLayout from "../common/HeroLayout";
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
    document.title = "Praskla Digital X";
  }, [collaborator, slug]);

  if (!collaborator) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 text-center bg-[#050609] text-white">
        <h2 className="text-3xl font-black text-white mb-4">Collaborator Not Found</h2>
        <p className="text-neutral-400 font-medium mb-6">The requested collaborator profile does not exist.</p>
        <Link to="/collaborators" className="px-6 py-3 rounded-xl bg-[#E31D2E] text-white font-black text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all">
          Back to Collaborators
        </Link>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden bg-[#050609]">
      {/* Collaborator-scoped Continuous Parallax Uranus Space Environment */}
      <CollaboratorSpaceBackground />

      {/* ── HERO SECTION: Sole Profile Hero Card ── */}
      <HeroLayout sectionId="collaborator-profile-hero" verticalCenter={true}>
        <div className="w-full max-w-7xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
            <ol className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-400 flex-wrap">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-[#E31D2E] transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/collaborators" className="text-neutral-300 hover:text-[#E31D2E] transition-colors">Collaborators</Link>
              </li>
              <li>/</li>
              <li className="text-[#E31D2E] font-bold">{collaborator.name}</li>
            </ol>
          </nav>

          {/* Profile Hero Card — Sole Component in Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full min-w-0 rounded-2xl bg-white border border-neutral-200/90 p-3 sm:p-7 lg:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.1)] text-[#111111] overflow-hidden box-border"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-8 items-center w-full min-w-0">
              
              {/* Left Image Column (5 Cols) — Sleek Compact Avatar Box */}
              <div className="lg:col-span-5 w-full min-w-0 flex justify-center">
                <div className="relative w-full max-w-[200px] sm:max-w-[300px] h-32 sm:h-64 lg:h-72 rounded-xl sm:rounded-2xl overflow-hidden border border-neutral-200/80 shadow-xs bg-neutral-100/90 flex items-center justify-center">
                  <User className="w-12 h-12 sm:w-20 sm:h-20 text-neutral-400 stroke-[1.4]" />
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-bold bg-white/95 backdrop-blur-md text-[#111111] border border-white/60 shadow-2xs flex items-center gap-1 sm:gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{collaborator.availability}</span>
                  </div>
                </div>
              </div>

              {/* Right Info Column (7 Cols) */}
              <div className="lg:col-span-7 w-full min-w-0 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="mb-1.5">
                  <SectionBadge text={collaborator.categoryLabel} />
                </div>

                <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#111111] tracking-tight leading-tight mb-1 break-words">
                  {collaborator.name}
                </h1>

                <p className="text-[10px] sm:text-xs font-extrabold text-[#E31D2E] uppercase tracking-widest mb-2 leading-snug">
                  {collaborator.role} • {collaborator.experience} Experience
                </p>

                <p className="hero-description text-neutral-600 text-xs sm:text-sm font-medium leading-relaxed mb-3 max-w-xl">
                  {collaborator.shortDescription}
                </p>

                {/* Quick Metrics */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full min-w-0 mb-3.5 p-2 sm:p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 shadow-2xs box-border">
                  <div className="min-w-0 text-center lg:text-left">
                    <span className="text-[8.5px] sm:text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest block mb-0.5">
                      Experience Level
                    </span>
                    <span className="text-xs sm:text-sm font-black text-[#111111] block truncate">
                      {collaborator.experience}
                    </span>
                  </div>
                  <div className="min-w-0 text-center lg:text-left">
                    <span className="text-[8.5px] sm:text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest block mb-0.5">
                      Engagement Status
                    </span>
                    <span className="text-xs sm:text-sm font-black text-[#111111] block truncate">
                      Agency Network Partner
                    </span>
                  </div>
                </div>

                {/* Primary Action CTA Button */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 rounded-xl bg-[#E31D2E] hover:bg-black text-white font-black text-[10px] sm:text-xs tracking-widest uppercase transition-all duration-300 shadow-md hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request This Collaborator</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>

                <p className="text-[9px] sm:text-[10px] font-semibold text-neutral-400 mt-1.5 sm:mt-2.5">
                  Praskla DigitalX coordinates every collaboration from project requirements to execution.
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      </HeroLayout>

      {/* ── CONTENT SCROLL SECTIONS (COMES NEXT WHEN SCROLLING) ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-14 lg:py-16 pb-12 sm:pb-32 lg:pb-40 box-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 mb-8 sm:mb-20 w-full min-w-0">
          
          {/* Left Bio Box (7 Cols) */}
          <div className="lg:col-span-7 w-full min-w-0 bg-white rounded-2xl p-4 sm:p-8 lg:p-10 border border-neutral-200/90 shadow-sm box-border">
            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#E31D2E] mb-2 sm:mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E31D2E]" />
              About {collaborator.name}
            </h3>
            <p className="text-neutral-700 text-xs sm:text-base font-medium leading-relaxed mb-4 sm:mb-6">
              {collaborator.bio}
            </p>

            <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.18em] text-[#111111] mb-2 sm:mb-3">
              Capabilities & Expertise
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {collaborator.services.map((svc, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-neutral-50 p-2 sm:p-3 rounded-xl border border-neutral-200/80 min-w-0">
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#111111] text-white flex items-center justify-center text-[8px] sm:text-[9px] font-black shrink-0">
                    ✓
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-neutral-800 truncate">{svc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Skills Box (5 Cols) */}
          <div className="lg:col-span-5 w-full min-w-0 bg-white rounded-2xl p-4 sm:p-8 lg:p-10 border border-neutral-200/90 shadow-sm flex flex-col justify-between box-border">
            <div>
              <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#111111] mb-2 sm:mb-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                Specialized Skills
              </h3>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                {collaborator.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-extrabold bg-neutral-100 text-[#111111] border border-neutral-200/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 mt-2 sm:mt-4">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#E31D2E] block mb-0.5">
                Collaborator Engagement
              </span>
              <p className="text-[10.5px] sm:text-xs font-medium text-neutral-600">
                Project scheduling, scope definition, contracts, and commercial terms are fully managed by Praskla DigitalX.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom CTA Section */}
        <div className="relative py-5 sm:py-16 text-center text-white overflow-hidden w-full max-w-3xl mx-auto my-3 sm:my-6">
          <div className="relative z-10 w-full min-w-0 flex flex-col items-center">
            <div className="mb-2 sm:mb-4">
              <SectionBadge text="AGENCY MANAGED ENGAGEMENT" theme="dark" />
            </div>

            <h3 className="text-xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-2 sm:mb-4">
              Ready to Collaborate with <span className="text-[#E31D2E]">{collaborator.name}</span>?
            </h3>

            <p className="text-neutral-300 text-xs sm:text-base font-medium leading-relaxed mb-4 sm:mb-8 max-w-xl">
              Submit your project details to Praskla DigitalX. We handle project scoping, terms, commercial arrangements, and team coordination.
            </p>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-[#E31D2E] hover:bg-white hover:text-[#111111] text-white font-black text-[10px] sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Request This Collaborator</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
          </div>
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
