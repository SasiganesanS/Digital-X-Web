import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Users } from "lucide-react";
import pranesh from "../assets/team/Pranesh.png"
import Jaillesh from "../assets/team/Jaillesh-Kathirvel.png"
import sathya from "../assets/team/Satya.jpg"
import Bright from "../assets/team/Bright.png"
import janarathanan from "../assets/team/Janarthanan.png";
import yogech from "../assets/team/Yogech.png";
import ram from "../assets/team/Ramachandran.png";
import Balaji from "../assets/team/balaji.jpg"
import BaskaranK from "../assets/team/Baskaran-Krishnaswamy.png"

import TeamHierarchy from "./TeamHierarchy";



const Teams = () => {
  // Define hierarchy relationships 
  const hierarchyData = {
    // CEO is at the top level
    1: { // Pranesh Kumar Baskaran (CEO)
      directReports: [2, 3, 4, 5, 6, 17, 21, 22], // Added Advisors
    },
    // Second level - Department Heads
    2: { // Rama Chandran Baskaran
      directReports: [],
      reportingTo: 1,
    },
    3: { // Jaillesh Kathirvel
      directReports: [10],
      reportingTo: 1,
    },
    4: { // Nitin Patel
      directReports: [],
      reportingTo: 1,
    },
    5: { // Satya Sagar Dandela
      directReports: [],
      reportingTo: 1,
    },
    6: { // Bright Rajathi Victoria
      directReports: [],
      reportingTo: 1,
    },
    10: { // Balaji
      directReports: [],
      reportingTo: 3,
    },
    16: { // Ragavi
      directReports: [],
      reportingTo: 3,
    },
    21: { // Baskaran K
      directReports: [],
      reportingTo: 1,
    },
    22: { // Janarthanan S
      directReports: [],
      reportingTo: 1,
    },
    17: { // Yogech
      directReports: [],
      reportingTo: 1,
    }
  };


  const teamMembers = [
    {
      id: 1,
      name: "Pranesh Kumar Baskaran",
      role: "CEO",
      image: pranesh,
      bio: "Committed to delivering quality-assured software solutions that generate sustainable value for all stakeholders. With a strategic vision and a focus on long-term growth, the CEO leads the organization by empowering teams, fostering innovation, and steering the company toward enduring success.",
      linkedin: "https://linkedin.com",
      email: "praneshkumarbaskaran@prasklatechnology.com",
      phone: "+91 95906 07783"
    },
    {
      id: 21,
      name: "Baskaran Krishnaswamy",
      role: "Advisor",
      image: BaskaranK,
      bio: "Great businesses are built through informed decisions, forward thinking, and well-timed risks. My role is to guide and mentor leadership, navigate complex challenges, and ensure the organization stays ahead in an ever-evolving business landscape.",
      linkedin: "https://linkedin.com",
      email: "advisor@prasklatechnology.com",
      phone: "+91 xxxxx xxxxx"
    },
    {
      id: 22,
      name: "Janarthanan S",
      role: "Financial Advisor",
      image: janarathanan,
      bio: "Focused on ensuring financial resilience and strategic investments that support long-term growth. Disciplined financial planning and data-driven decision-making form the foundation of sustainable and scalable success.",
      linkedin: "https://linkedin.com",
      email: "janarthanan@prasklatechnology.com",
      phone: "+91 63613 36181"
    },
    {
      id: 2,
      name: "Rama Chandran Baskaran",
      role: "Legal Advisor & Director – Marketing",
      image: ram,
      bio: "Responsible for overseeing all legal governance while driving strategic marketing initiatives that unlock new business opportunities. Effective marketing is about crafting compelling narratives that build trust, strengthen brand identity, and connect meaningfully with audiences.",
      linkedin: "https://linkedin.com",
      email: "ramachandranbaskaran@prasklatechnology.com",
      phone: "+91 93644 33740"
    },
    {
      id: 3,
      name: "Jaillesh Kathirvel",
      role: "Director - Planning & Operations",
      image: Jaillesh,
      bio: "Turning vision into actions by aligning strategy with execution. Optimizing workflows and bringing teams together for efficient and sustainable growth.",
      linkedin: "https://linkedin.com",
      email: "jailleshkathirvel@prasklatechnology.com",
      phone: "+91 70550 62004"
    },
    {
      id: 4,
      name: "Yogech",
      role: "Director - Engineering & Technology",
      image: yogech,
      bio: "Orchestrating engineering excellence and technology strategy. Driving innovation while ensuring technical solutions align with business objectives for optimal results.",
      linkedin: "https://linkedin.com",
      email: "yogech@prasklatechnology.com",
      phone: "+91 xxxxx xxxxx"
    },
    {
      id: 5,
      name: "Satya Sagar Dandela",
      role: "Director - Security",
      image: sathya,
      bio: "Leading the security team and developing practical cybersecurity strategies to protect assets and data. Ensuring compliance while staying ahead of emerging threats.",
      linkedin: "https://linkedin.com",
      email: "satyasagar@prasklatechnology.com",
      phone: "+91 90035 51135"
    },
    {
      id: 6,
      name: "Bright Rajathi Victoria",
      role: "Director - HR",
      image: Bright,
      bio: "Committed to building a thriving, inclusive, and motivated team. Creating an environment where talent flourishes and everyone feels valued.",
      linkedin: "https://linkedin.com",
      email: "brightrajathi@prasklatechnology.com",
      phone: "+91 63615 37355"
    },
    {
      id: 10,
      name: "Balaji",
      role: "Head of Sustainability",
      image: Balaji,
      bio: "Leading sustainability initiatives and ensuring environmentally responsible practices across all operations. Driving green innovation and sustainable development.",
      linkedin: "https://linkedin.com",
      email: "balaji@prasklatechnology.com",
      phone: "+91 xxxxx xxxxx"
    },
  ];

  const [showHierarchy, setShowHierarchy] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // NEW: Handle card click - works for entire card
  const handleCardClick = (member, e) => {
    // Don't show hierarchy for specific members
    if (member.id === 5 || member.id === 6 || member.id === 10 || member.id === 16) {
      return;
    }
    setSelectedMember(member);
    setShowHierarchy(true);
    document.body.style.overflow = 'hidden';
  };

  const closeHierarchy = () => {
    setShowHierarchy(false);
    document.body.style.overflow = 'auto';
    setTimeout(() => setSelectedMember(null), 300);
  };

  return (
    <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ background: "#080808" }}>
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[clamp(300px,50vw,600px)] h-[clamp(300px,50vw,600px)] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,25,44,0.08) 0%, transparent 65%)", transform: "translate(20%, -20%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[clamp(300px,50vw,500px)] h-[clamp(300px,50vw,500px)] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 65%)", transform: "translate(-20%, 20%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center border border-white/10 gap-2 px-3 py-1.5 bg-white/5 rounded-full mb-6 backdrop-blur-sm">
            <Users className="w-4 h-4 text-[#E8192C]" />
            <span className="text-sm font-semibold text-white/80">
              Our Team
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Division Champions
          </h1>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            We're building the future of technology and marketing through focused leadership and expert execution.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              {/* MODIFIED: Added onClick to the entire card wrapper and cursor-pointer class */}
              <div
                className={`relative bg-[#111] border border-white/5 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${member.id !== 5 && member.id !== 6 && member.id !== 10 && member.id !== 16
                  ? 'cursor-pointer hover:border-[#E8192C]/40'
                  : ''
                  }`}
                onClick={(e) => handleCardClick(member, e)}
              >
                {/* Square Image Container */}
                <div className="relative w-full aspect-square overflow-hidden bg-white/2">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Social Icon Overlay */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg hover:bg-[#0A66C2] hover:text-white transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-5 text-center">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {member.name}
                  </h3>

                  {/* MODIFIED: Removed onClick and hover effects from role text */}
                  <p className="text-sm text-[#E8192C] font-semibold">
                    {member.role}
                  </p>
                </div>

                {/* Decorative Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#E8192C]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hierarchy Modal */}
      <TeamHierarchy
        showHierarchy={showHierarchy}
        closeHierarchy={closeHierarchy}
        selectedMember={selectedMember}
        teamMembers={teamMembers}
        hierarchyData={hierarchyData}
      />

    </div>
  );
};

export default Teams;