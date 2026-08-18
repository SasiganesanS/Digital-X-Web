import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CollaboratorCard({ collaborator }) {
  if (!collaborator) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className="group relative bg-white rounded-[2rem] p-6 flex flex-col justify-between items-start text-left border border-neutral-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-neutral-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.09)] transition-all duration-500 overflow-hidden"
    >
      {/* Top Image Container */}
      <div className="relative w-full h-56 sm:h-64 rounded-[1.5rem] overflow-hidden mb-5 bg-neutral-100 border border-neutral-200/60">
        <img
          src={collaborator.image}
          alt={collaborator.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Availability Badge Overlay */}
        <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-white/90 backdrop-blur-md text-[#111111] border border-white/40 shadow-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{collaborator.availability}</span>
        </div>

        {/* Experience Pill Overlay */}
        <div className="absolute bottom-3.5 right-3.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#111111]/80 backdrop-blur-md text-white border border-white/20">
          {collaborator.experience} Exp.
        </div>
      </div>

      {/* Main Info */}
      <div className="w-full flex-1 flex flex-col items-start">
        {/* Category Tag */}
        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-[0.2em] bg-[#E31D2E]/10 text-[#E31D2E] border border-[#E31D2E]/15 mb-2.5 inline-flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-[#E31D2E]" />
          {collaborator.categoryLabel}
        </span>

        {/* Name & Role */}
        <h3 className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight leading-tight mb-1 group-hover:text-[#E31D2E] transition-colors duration-300">
          {collaborator.name}
        </h3>
        <p className="text-xs font-bold text-neutral-500 tracking-wide uppercase mb-3">
          {collaborator.role}
        </p>

        {/* Short Description */}
        <p className="text-neutral-600 text-xs sm:text-sm font-medium leading-relaxed line-clamp-3 mb-4">
          {collaborator.shortDescription}
        </p>

        {/* Skill Tags (3-5) */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6">
          {collaborator.skills.slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-neutral-100 text-neutral-700 border border-neutral-200/80 group-hover:bg-[#E31D2E]/5 group-hover:text-[#E31D2E] group-hover:border-[#E31D2E]/15 transition-all duration-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer CTA */}
      <div className="w-full pt-4 border-t border-neutral-200/70 flex items-center justify-between mt-auto">
        <span className="text-[11px] font-extrabold text-neutral-400 tracking-wider uppercase">
          DigitalX Network
        </span>

        <Link
          to={`/collaborators/${collaborator.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-black text-[#111111] group-hover:text-[#E31D2E] transition-colors duration-300"
        >
          <span>View Profile</span>
          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>

    </motion.div>
  );
}
