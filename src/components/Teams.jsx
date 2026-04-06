import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import pranesh from "../assets/team/Pranesh.png";
import Jaillesh from "../assets/team/Jaillesh-Kathirvel.png";
import sathya from "../assets/team/Satya.jpg";
import Bright from "../assets/team/Bright.png";
import janarathanan from "../assets/team/Janarthanan.png";
import yogech from "../assets/team/Yogech.png";
import ram from "../assets/team/Ramachandran.png";
import Balaji from "../assets/team/balaji.jpg";
import BaskaranK from "../assets/team/Baskaran-Krishnaswamy.png";

const glitterParticles = [
  { top: "20%", left: "8%", delay: 0 },
  { top: "70%", left: "15%", delay: 0.4 },
  { top: "30%", right: "10%", delay: 0.8 },
  { top: "65%", right: "18%", delay: 0.2 },
  { top: "15%", left: "45%", delay: 0.6 },
];

// Only these 4 members show a bio popup
const BIO_MEMBERS = new Set([1, 21, 22, 2]);

const Teams = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Pranesh Kumar Baskaran",
      role: "CEO",
      image: pranesh,
      bio: "Committed to delivering quality-assured software solutions that generate sustainable value for all stakeholders. With a strategic vision and a focus on long-term growth, the CEO leads the organization by empowering teams, fostering innovation, and steering the company toward enduring success.",
    },
    {
      id: 21,
      name: "Baskaran Krishnaswamy",
      role: "Advisor",
      image: BaskaranK,
      bio: "Great businesses are built through informed decisions, forward thinking, and well-timed risks. My role is to guide and mentor leadership, navigate complex challenges, and ensure the organization stays ahead in an ever-evolving business landscape.",
    },
    {
      id: 22,
      name: "Janarthanan S",
      role: "Financial Advisor",
      image: janarathanan,
      bio: "Focused on ensuring financial resilience and strategic investments that support long-term growth. Disciplined financial planning and data-driven decision-making form the foundation of sustainable and scalable success.",
    },
    {
      id: 2,
      name: "Rama Chandran Baskaran",
      role: "Legal Advisor & Director – Marketing",
      image: ram,
      bio: "Responsible for overseeing all legal governance while driving strategic marketing initiatives that unlock new business opportunities. Effective marketing is about crafting compelling narratives that build trust, strengthen brand identity, and connect meaningfully with audiences.",
    },
    {
      id: 3,
      name: "Jaillesh Kathirvel",
      role: "Director - Planning & Operations",
      image: Jaillesh,
      bio: null,
    },
    {
      id: 4,
      name: "Yogech",
      role: "Director - Engineering & Technology",
      image: yogech,
      bio: null,
    },
    {
      id: 5,
      name: "Satya Sagar Dandela",
      role: "Director - Security",
      image: sathya,
      bio: null,
    },
    {
      id: 6,
      name: "Bright Rajathi Victoria",
      role: "Director - HR",
      image: Bright,
      bio: null,
    },
    {
      id: 10,
      name: "Balaji",
      role: "Head of Sustainability",
      image: Balaji,
      bio: null,
    },
  ];

  const handleCardClick = (member) => {
    if (!BIO_MEMBERS.has(member.id)) return;
    setSelectedMember(member);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedMember(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ background: "#080808" }}>
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[clamp(300px,50vw,600px)] h-[clamp(300px,50vw,600px)] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,25,44,0.08) 0%, transparent 65%)", transform: "translate(20%, -20%)" }} />
        <div className="absolute bottom-0 left-0 w-[clamp(300px,50vw,500px)] h-[clamp(300px,50vw,500px)] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 65%)", transform: "translate(-20%, 20%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Glitter badge */}
          <div className="flex justify-center mb-6">
            <div
              className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(232,25,44,0.18) 0%, rgba(0,0,0,0.6) 50%, rgba(232,25,44,0.12) 100%)",
                border: "1px solid rgba(232,25,44,0.5)",
                boxShadow: "0 0 18px rgba(232,25,44,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)" }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
              />
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-[#E8192C]/80 to-transparent" />
              {glitterParticles.map((pos, i) => (
                <motion.span key={i} className="absolute w-[3px] h-[3px] rounded-full bg-white"
                  style={{ top: pos.top, left: pos.left, right: pos.right }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }} />
              ))}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8192C] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E8192C]" />
              </span>
              <span className="relative text-white text-xs sm:text-sm font-bold tracking-[0.3em] uppercase"
                style={{ textShadow: "0 0 10px rgba(232,25,44,0.7)" }}>Our Team</span>
              <motion.span className="relative text-[#E8192C] text-base leading-none"
                animate={{ rotate: [0, 180, 360], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>✦</motion.span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Division Champions
          </h1>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            We're building the future of technology and marketing through focused leadership and expert execution.
          </p>
        </motion.div>

        {/* ── Team Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => {
            const clickable = BIO_MEMBERS.has(member.id);
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div
                  className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${clickable ? "cursor-pointer" : ""}`}
                  style={{
                    background: "linear-gradient(160deg, rgba(232,25,44,0.13) 0%, rgba(12,12,12,1) 45%, rgba(232,25,44,0.07) 100%)",
                    border: clickable ? "1px solid rgba(232,25,44,0.45)" : "1px solid rgba(232,25,44,0.18)",
                    boxShadow: clickable
                      ? "0 0 40px rgba(232,25,44,0.18), 0 12px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)"
                      : "0 0 20px rgba(232,25,44,0.08), 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                  onClick={() => handleCardClick(member)}
                >
                  {/* top glow line — all cards */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#E8192C]/60 to-transparent z-10" />
                  {/* bottom glow line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#E8192C]/20 to-transparent z-10" />
                  {/* left accent bar */}
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] rounded-full bg-gradient-to-b from-transparent via-[#E8192C]/50 to-transparent" />

                  {/* Image */}
                  <div className="relative w-full aspect-square overflow-hidden">
                    <img src={member.image} alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    {/* red tint overlay always subtle */}
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: "linear-gradient(to bottom, rgba(232,25,44,0.04) 0%, transparent 40%, rgba(0,0,0,0.75) 100%)" }} />
                    {/* hover overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      style={{ background: "linear-gradient(to top, rgba(232,25,44,0.35) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)" }} />
                    {/* corner red glow on image */}
                    <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: "radial-gradient(circle at top right, rgba(232,25,44,0.4), transparent 70%)" }} />
                  </div>


                  {/* Info */}
                  <div className="relative p-5 text-center">
                    {/* subtle red glow behind info */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(232,25,44,0.12), transparent 70%)" }} />
                    <h3 className="relative text-base font-bold text-white mb-1 group-hover:text-white transition-colors">{member.name}</h3>
                    <p className="relative text-sm font-bold tracking-wide"
                      style={{ color: "#E8192C", textShadow: "0 0 10px rgba(232,25,44,0.4)" }}>
                      {member.role}
                    </p>
                  </div>

                  {/* corner accent top-right */}
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-30 group-hover:opacity-60 transition-opacity duration-300"
                    style={{ background: "radial-gradient(circle at top right, rgba(232,25,44,0.4), transparent 70%)" }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Bio Modal ── */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            {/* Backdrop */}
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }} />

            {/* Modal box */}
            <motion.div
              className="relative w-full max-w-lg rounded-[2rem] overflow-hidden z-10"
              style={{
                background: "linear-gradient(135deg, rgba(232,25,44,0.08) 0%, rgba(12,12,12,0.98) 40%, rgba(232,25,44,0.05) 100%)",
                border: "1px solid rgba(232,25,44,0.35)",
                boxShadow: "0 0 80px rgba(232,25,44,0.15), 0 0 160px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.07)",
              }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* top glow line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#E8192C]/70 to-transparent" />
              {/* corner accent */}
              <div className="absolute top-0 left-0 w-32 h-32 opacity-20"
                style={{ background: "radial-gradient(circle at top left, rgba(232,25,44,0.6), transparent 70%)" }} />
              {/* glitter particles */}
              {glitterParticles.map((pos, i) => (
                <motion.span key={i} className="absolute w-[2px] h-[2px] rounded-full bg-white/60 pointer-events-none"
                  style={{ top: pos.top, left: pos.left, right: pos.right }}
                  animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: pos.delay + 0.3, ease: "easeInOut" }} />
              ))}

              <div className="relative z-10 p-8 md:p-10">
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: "rgba(232,25,44,0.15)", border: "1px solid rgba(232,25,44,0.3)" }}
                >
                  <svg className="w-4 h-4 text-[#E8192C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Header row */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative flex-shrink-0">
                    <img src={selectedMember.image} alt={selectedMember.name}
                      className="w-16 h-16 rounded-2xl object-cover"
                      style={{ border: "2px solid rgba(232,25,44,0.4)", boxShadow: "0 0 20px rgba(232,25,44,0.2)" }} />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: "#E8192C", boxShadow: "0 0 8px rgba(232,25,44,0.6)" }}>
                      <span className="text-white text-[8px] font-black">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-black text-xl leading-tight">{selectedMember.name}</h3>
                    <span className="text-xs font-bold px-3 py-1 rounded-full mt-1 inline-block"
                      style={{ color: "#E8192C", background: "rgba(232,25,44,0.1)", border: "1px solid rgba(232,25,44,0.3)" }}>
                      {selectedMember.role}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px mb-6 bg-gradient-to-r from-[#E8192C]/30 via-white/5 to-transparent" />

                {/* Bio text */}
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  {selectedMember.bio}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Teams;
