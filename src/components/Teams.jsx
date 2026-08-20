import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import TiltedCard from "./TiltedCard";
import SectionBadge from "./common/SectionBadge";
import pranesh from "../assets/team/Pranesh.webp";
import Jaillesh from "../assets/team/Jaillesh-Kathirvel.webp";
import naveen from "../assets/team/Naveen.webp";
import sathya from "../assets/team/Satya.webp";
import Bright from "../assets/team/Bright.webp";
import janarathanan from "../assets/team/Janarthanan.webp";
import yogech from "../assets/team/Yogech.webp";
import ram from "../assets/team/Ramachandran.webp";
import Balaji from "../assets/team/balaji.webp";
import BaskaranK from "../assets/team/Baskaran-Krishnaswamy.webp";

// Only these members show a bio popup — must match the `id` used in teamMembers below
const BIO_MEMBERS = new Set([1, 3, 7]);

const Teams = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      id: 3,
      name: "Jaillesh Kathirvel",
      role: "Founder & Business Head & Manager",
      image: Jaillesh,
      bio: "Drives business growth and client partnerships with a sharp eye for opportunity and execution. As Founder & Business Head & Manager, Jaillesh bridges strategy and day-to-day operations, ensuring every engagement is handled with precision, accountability, and a genuine commitment to client success.",
    },
    {
      id: 1,
      name: "Pranesh Kumar Baskaran",
      role: "Co-Founder & Business Head",
      image: pranesh,
      bio: "Committed to delivering quality-assured software solutions that generate sustainable value for all stakeholders. With a strategic vision and a focus on long-term growth, the Co-Founder leads the organization by empowering teams, fostering innovation, and steering the company toward enduring success.",
    },
    {
      id: 7,
      name: "Naveen",
      role: "Team Lead",
      image: naveen,
      bio: "Leads the team with a hands-on approach, balancing creative direction with operational discipline. Naveen ensures projects move smoothly from concept to delivery, mentoring the team while keeping quality and deadlines front and center.",
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
    <>
      <div className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
        <div className="relative z-10 max-w-7xl mx-auto">

          {/* ── Standalone Section Header (Outside of Boxes) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="flex justify-center mb-4">
              <SectionBadge text="Our Team" theme="dark" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight font-sans">
              Division <span className="text-[#E31D2E]">Champions</span>
            </h2>
            <p className="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed font-sans">
              We&apos;re building the future of technology and marketing through focused leadership and expert execution.
            </p>
          </motion.div>

          {/* ── Separate Individual Team Member Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, idx) => {
              const clickable = BIO_MEMBERS.has(member.id);
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => handleCardClick(member)}
                  className={`flex flex-col items-center p-5 rounded-3xl bg-white border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group text-center ${clickable ? "cursor-pointer" : ""}`}
                >
                  {/* Image Container with White Background */}
                  <div className="relative w-full rounded-2xl overflow-hidden bg-white mb-5 border border-neutral-100 shadow-xs flex justify-center">
                    <TiltedCard
                      imageSrc={member.image}
                      altText={member.name}
                      captionText={member.name}
                      containerHeight="380px"
                      containerWidth="100%"
                      imageHeight="380px"
                      imageWidth="100%"
                      rotateAmplitude={10}
                      scaleOnHover={1.04}
                      showTooltip={false}
                      displayOverlayContent={false}
                      showMobileWarning={false}
                    />
                  </div>

                  {/* Name and Role */}
                  <div className="w-full pb-2">
                    <h3 className="text-lg font-bold text-[#111111] mb-1 tracking-tight group-hover:text-[#E31D2E] transition-colors">{member.name}</h3>
                    <p className="text-sm font-semibold tracking-wide text-[#E31D2E]">
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>

      {/* ── Bio Modal ── */}
      {createPortal(
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              {/* Subtle backdrop overlay */}
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" }} />

              {/* Clean Apple / Linear Style Modal Box */}
              <motion.div
                className="relative w-full max-w-lg rounded-[28px] overflow-hidden z-10 bg-white border border-neutral-200/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] text-[#111111]"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative z-10 p-8 md:p-10">
                  {/* Close button */}
                  <button
                    onClick={closeModal}
                    className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center bg-neutral-100 border border-neutral-200 text-neutral-600 hover:bg-neutral-200 transition-all duration-200 hover:scale-105"
                  >
                    <svg className="w-4 h-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Header row */}
                  <div className="flex items-center gap-5 mb-6">
                    <div className="relative flex-shrink-0">
                      {selectedMember.image ? (
                        <img src={selectedMember.image} alt={selectedMember.name}
                          className="w-16 h-16 rounded-2xl object-cover border border-neutral-200 shadow-md" />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-neutral-100 border border-neutral-200 shadow-md">
                          <span className="text-2xl text-neutral-400 font-black uppercase">{selectedMember.name.charAt(0)}</span>
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center bg-[#E31D2E] shadow-sm">
                        <span className="text-white text-[8px] font-black">✓</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[#111111] font-black text-xl md:text-2xl leading-tight">{selectedMember.name}</h3>
                      <span className="text-xs font-bold px-3 py-1 rounded-full mt-1.5 inline-block text-[#E31D2E] bg-[#E31D2E]/10 border border-[#E31D2E]/20">
                        {selectedMember.role}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px mb-6 bg-neutral-200/80" />

                  {/* Bio text */}
                  <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-normal">
                    {selectedMember.bio}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Teams;