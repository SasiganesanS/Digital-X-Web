import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, ArrowUpRight } from "lucide-react";
import SectionBadge from "../common/SectionBadge";
import { COLLABORATORS_DATA } from "../../data/collaborators";
import CollaboratorApplyModal from "./CollaboratorApplyModal";

export default function CollaboratorSection() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-transparent overflow-hidden border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Card Banner — 100% Solid White Container */}
        <div className="relative rounded-2xl bg-white border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-8 sm:p-10 lg:p-12 overflow-hidden text-[#111111]">
          
          {/* Top Right Corner "Apply" Button */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20">
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(true)}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#111111] hover:bg-[#E31D2E] text-white font-black text-xs tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Apply</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content Area (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left pr-0 sm:pr-12">
              {/* Eyebrow Badge */}
              <div className="mb-4">
                <SectionBadge text="CREATIVE COLLABORATOR NETWORK" />
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#111111] leading-[1.12] tracking-tight mb-5">
                Meet the Creative Network <br className="hidden sm:block" />
                Behind <span className="text-[#E31D2E]">DigitalX</span>
              </h2>

              {/* Supporting Text */}
              <p className="text-neutral-600 text-sm sm:text-base lg:text-lg font-medium leading-relaxed mb-7 max-w-2xl">
                From content creators and models to editors, influencers, executives, and specialist freelancers, DigitalX works with a curated network of creative professionals to bring ambitious brand projects to life.
              </p>

              {/* Action CTA Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                <Link
                  to="/collaborators"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#111111] hover:bg-[#E31D2E] text-white font-extrabold text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Explore Collaborators</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>

              {/* Small Supporting Line */}
              <p className="text-[#575757] text-xs font-semibold mt-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                Need someone specific? Tell us what you&apos;re looking for and we&apos;ll coordinate the right creative partner for your project.
              </p>
            </div>

            {/* Right Preview Grid Area (5 Cols) — Default Avatar DP Previews */}
            <div className="lg:col-span-5 w-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
                {COLLABORATORS_DATA.slice(0, 4).map((c, i) => (
                  <motion.div
                    key={c.slug}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <Link
                      to={`/collaborators/${c.slug}`}
                      className="group flex flex-col items-center sm:items-start p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-sm hover:border-black/30 hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden mb-3 border border-neutral-200 shadow-xs flex-shrink-0 bg-neutral-100 flex items-center justify-center text-neutral-400 group-hover:bg-neutral-200 group-hover:text-neutral-600 transition-colors">
                        <User className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.7]" />
                        <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                      </div>

                      <h4 className="text-sm font-black text-[#111111] group-hover:text-[#E31D2E] transition-colors">
                        {c.name}
                      </h4>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        {c.role}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Apply Modal */}
      <CollaboratorApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </section>
  );
}
