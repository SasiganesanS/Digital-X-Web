import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionBadge from "../common/SectionBadge";
import CollaboratorCard from "./CollaboratorCard";
import { COLLABORATORS_DATA } from "../../data/collaborators";
import CollaboratorSpaceBackground from "./CollaboratorSpaceBackground";
import CollaboratorApplyModal from "./CollaboratorApplyModal";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "influencers", label: "Influencers" },
  { id: "executives", label: "Executives" },
  { id: "experts", label: "Specialists & Experts" },
  { id: "content-creators", label: "Content Creators" },
  { id: "models", label: "Models" },
  { id: "video-editors", label: "Video Editors" },
  { id: "freelancers", label: "Freelancers" },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Tell Us What You Need",
    desc: "Share your project requirements, goals, and preferred creative scope with Praskla DigitalX."
  },
  {
    num: "02",
    title: "We Match the Right Creative",
    desc: "Our agency team evaluates the most suitable collaborator for your brand & project."
  },
  {
    num: "03",
    title: "We Coordinate Everything",
    desc: "Praskla DigitalX manages communication, requirements, commercial terms, and agreements."
  },
  {
    num: "04",
    title: "Your Project Gets Delivered",
    desc: "The selected creative partner executes the project while Praskla DigitalX oversees quality & delivery."
  }
];

export default function CollaboratorDirectory() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Praskla Digital X";
    window.scrollTo(0, 0);
  }, []);

  const filteredCollaborators = activeCategory === "all"
    ? COLLABORATORS_DATA
    : COLLABORATORS_DATA.filter((c) => c.category === activeCategory);

  return (
    <div className="relative w-full overflow-hidden bg-[#050609]">
      {/* Collaborator-scoped Continuous Parallax Uranus Space Environment */}
      <CollaboratorSpaceBackground />

      {/* Main Content Sections */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        
        {/* Header Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-4">
            <SectionBadge text="Collaborator Network" theme="dark" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-5">
            Creative <span className="text-[#E31D2E]">Collaborators</span>
          </h1>

          <p className="text-neutral-300 text-base sm:text-lg font-medium leading-relaxed mb-8">
            A curated network of creative professionals, influencers, executives, and specialists working with Praskla DigitalX to bring ideas to life. Praskla DigitalX coordinates every engagement from project scope to final delivery.
          </p>

          {/* Top Apply Button Action */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-[#E31D2E] hover:bg-white hover:text-[#111111] text-white font-black text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Apply as Collaborator</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </motion.div>

        {/* Category Filters Pill Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12 sm:mb-16">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#E31D2E] text-white shadow-md scale-105"
                    : "bg-white text-[#111111] hover:bg-neutral-100 border border-white/90 shadow-sm"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Collaborators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-20">
          {filteredCollaborators.map((collaborator) => (
            <CollaboratorCard key={collaborator.slug} collaborator={collaborator} />
          ))}
        </div>

        {/* How Collaboration Works — Process Section */}
        <div className="rounded-2xl bg-neutral-50 border border-neutral-200/80 p-8 sm:p-12 lg:p-14 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#E31D2E] block mb-2">
              Agency Managed Engagement
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight">
              How Collaboration Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="group flex flex-col items-start text-left relative">
                <span className="text-3xl sm:text-4xl font-black text-[#E31D2E] mb-3">
                  {step.num}
                </span>
                <h4 className="text-lg font-black text-[#111111] mb-2 leading-snug">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust & Contact Safeguard Note */}
        <div className="text-center max-w-xl mx-auto py-4 border-t border-neutral-200">
          <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Collaborator availability and commercial terms are coordinated through Praskla DigitalX.
          </p>
        </div>

      </div>

      {/* Apply Modal */}
      <CollaboratorApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
}
