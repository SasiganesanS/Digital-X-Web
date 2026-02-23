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

import TeamHierarchy from "./TeamHierarchy";



const Teams = () => {
  // Define hierarchy relationships 
  const hierarchyData = {
    // CEO is at the top level
    1: { // Pranesh Kumar Baskaran (CEO)
      directReports: [2, 3, 4, 5, 6, 17], // Updated to include the two directors
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
    16: { // Janarthanan S
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
      role: "Managing Director / CEO",
      image: pranesh,
      bio: "Committed to delivering quality-assured software solutions that create lasting value. Guiding the team with strategic vision while fostering growth and long-term success.",
      linkedin: "https://linkedin.com",
      email: "praneshkumarbaskaran@prasklatechnology.com",
      phone: "+91 95906 07783"
    },
    {
      id: 2,
      name: "Rama Chandran Baskaran",
      role: "Legal Advisor / Director - Marketing",
      image: ram,
      bio: "Strategic legal counsel and marketing expert, ensuring compliance while driving brand growth and market presence.",
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
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
           <div className="inline-flex items-center border border-[#371445]/90 gap-2 px-3 py-1.5 bg-[#FFFFFF] rounded-full mb-6">
                <Users className="w-4 h-4 text-[#4a1c5e]" />
                <span className="text-sm font-semibold text-[#4a1c5e]">
                  Our Team
                </span>
              </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#371445] mb-6">
            Division Champions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're building the future of software development.
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
                className={`relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-3xl transition-all duration-300 ${
                  member.id !== 5 && member.id !== 6 && member.id !== 10 && member.id !== 16
                    ? 'cursor-pointer' 
                    : ''
                }`}
                onClick={(e) => handleCardClick(member, e)}
              >
                {/* Square Image Container */}
                <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
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
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  
                  {/* MODIFIED: Removed onClick and hover effects from role text */}
                  <p className="text-sm text-[#371445] font-medium">
                    {member.role}
                  </p>
                </div>

                {/* Decorative Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#371445]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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