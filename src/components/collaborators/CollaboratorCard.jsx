import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, ArrowUpRight } from "lucide-react";

export default function CollaboratorCard({ collaborator }) {
  if (!collaborator) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      className="group relative bg-white rounded-2xl p-4 sm:p-5 flex flex-col justify-between items-start text-left border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-neutral-300 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden h-full w-full"
    >
      {/* Top Header — Sleek Default Avatar */}
      <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden mb-3.5 bg-neutral-100 group-hover:bg-neutral-200/80 border border-neutral-200/60 group-hover:border-neutral-300 flex items-center justify-center shrink-0 transition-colors duration-300">
        <User className="w-16 h-16 text-neutral-400 group-hover:text-neutral-700 stroke-[1.4] group-hover:scale-105 transition-all duration-300" />

        {/* Availability Badge Overlay */}
        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-md text-neutral-800 border border-white/60 shadow-xs flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available</span>
        </div>

        {/* Experience Pill Overlay */}
        <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/75 backdrop-blur-md text-white border border-white/10">
          {collaborator.experience} Exp.
        </div>
      </div>

      {/* Main Info */}
      <div className="w-full flex-1 flex flex-col justify-between">
        <div>
          {/* Name & Role */}
          <h3 className="text-lg sm:text-xl font-black text-[#111111] tracking-tight leading-snug group-hover:text-black transition-colors duration-300 mb-0.5">
            {collaborator.name}
          </h3>
          <p className="text-[11px] font-extrabold text-neutral-500 tracking-wider uppercase mb-2.5 block">
            {collaborator.role}
          </p>

          {/* Full Short Description */}
          <p className="text-neutral-600 text-xs font-medium leading-relaxed mb-4 min-h-[3.6rem]">
            {collaborator.shortDescription}
          </p>
        </div>
      </div>

      {/* Clean Action Footer */}
      <Link
        to={`/collaborators/${collaborator.slug}`}
        className="w-full pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-black text-[#111111] group-hover:text-black transition-colors duration-300 mt-auto"
      >
        <span>View Profile</span>
        <div className="w-6.5 h-6.5 rounded-full bg-neutral-100 group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center transition-all duration-300">
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      </Link>
    </motion.div>
  );
}

