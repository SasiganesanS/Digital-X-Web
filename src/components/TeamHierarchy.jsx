import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import pranesh from "../assets/team/Pranesh.png";
import Jaillesh from "../assets/team/Jaillesh-Kathirvel.png";
import sathya from "../assets/team/Satya.jpg";
import Bright from "../assets/team/Bright.png";
import divakar from "../assets/team/Divakar.png";
import rajkumar from "../assets/team/Rajkumar.png";
import kamalesh from "../assets/team/Kamalesh.png";
import ragavi from "../assets/team/ragavi.jpg";
import vishnu from "../assets/team/vishnu.png";
import vikash from "../assets/team/Vikash.png";
import kamal from "../assets/team/kamal.jpg";
import yogech from "../assets/team/Yogech.png";
import ram from "../assets/team/Ramachandran.png";
import tharun from "../assets/team/Tharun.png";

const TeamHierarchy = ({ 
  showHierarchy, 
  closeHierarchy, 
  selectedMember
}) => {
  // State to track if in mobile view
  const [isMobile, setIsMobile] = useState(false);
  // State to track which member's hierarchy to display in mobile
  const [mobileViewingMember, setMobileViewingMember] = useState(null);
  
  // Check if screen is mobile size on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Define team members data directly in the component
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
      id: 7,
      name: "Vishnudhasan Govindharajan",
      role: "Head of Systems & Development",
      image: vishnu,
      bio: "Software architecture expert specializing in scalable and secure solutions. Driving technical excellence in system design and implementation.",
      linkedin: "https://linkedin.com",
      email: "vishnudhasan@prasklatechnology.com",
      phone: "+91 63835 17750"
    },
    {
      id: 8,
      name: "Vikash Thirumurugan",
      role: "Full Stack Developer & Designer",
      image: vikash,
      bio: "Full stack developer with a passion for creating user-friendly and efficient web applications. Skilled in both frontend and backend development, with a keen eye for design and user experience.",
      linkedin: "https://linkedin.com",
      email: "vikash@prasklatechnology.com",
      phone: "+91 93455 24097"
    },
    {
      id: 9,
      name: "Tharun Saravanan",
      role: "Full Stack Developer",
      image: tharun,
      bio: "Full stack developer with a passion for creating user-friendly and efficient web applications. Skilled in both frontend and backend development, with a keen eye for design and user experience.",
      linkedin: "https://linkedin.com",
      email: "tharunsaravanan@prasklatechnology.com",
      phone: "+91 87543 05657"
    },
    {
      id: 10,
      name: "Balaji",
      role: "Head of Sustainability",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaHfpIhAPZHSbZstaGEgFBIjZZ-Y-K533dag&s",
      bio: "Leading sustainability initiatives and ensuring environmentally responsible practices across all operations. Driving green innovation and sustainable development.",
      linkedin: "https://linkedin.com",
      email: "balaji@prasklatechnology.com",
      phone: "+91 xxxxx xxxxx"
    },
    {
      id: 11,
      name: "Kamal",
      role: "Head of Social Media",
      image: kamal,
      bio: "Managing social media strategy and digital presence. Creating engaging content and building strong online communities to enhance brand visibility.",
      linkedin: "https://linkedin.com",
      email: "kamal@prasklatechnology.com",
      phone: "+91 63613 36181"
    },
    {
      id: 12,
      name: "Arjun Thambidurai",
      role: "UX/UI & Design Engineer",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaHfpIhAPZHSbZstaGEgFBIjZZ-Y-K533dag&s",
      bio: "Creating intuitive and visually appealing user interfaces. Focused on delivering exceptional user experiences through innovative design solutions.",
      linkedin: "https://linkedin.com",
      email: "arjunthambidurai@prasklatechnology.com",
      phone: "+91 82748 59819"
    },
    {
      id: 13,
      name: "Kamlesh",
      role: "Content Marketer",
      image: kamalesh,
      bio: "Developing and executing content strategies that engage audiences and drive growth. Creating compelling narratives that strengthen brand identity.",
      linkedin: "https://linkedin.com",
      email: "kamlesh@prasklatechnology.com",
      phone: "+91 93622 36590"
    },
    {
      id: 14,
      name: "Divakar",
      role: "SEO Specialist",
      image: divakar,
      bio: "Optimizing digital presence and improving search engine rankings. Implementing data-driven strategies to enhance online visibility and traffic.",
      linkedin: "https://linkedin.com",
      email: "divakar@prasklatechnology.com",
      phone: "+91 63698 08533"
    },
    {
      id: 15,
      name: "Rajkumar Velumani",
      role: "Affiliate Marketing Manager",
      image: rajkumar,
      bio: "Managing affiliate partnerships and developing strategic marketing initiatives. Building and nurturing relationships to drive business growth through affiliate channels.",
      linkedin: "https://linkedin.com",
      email: "rajkumarvelumani@prasklatechnology.com",
      phone: "+91 99940 80769"
    },
    {
      id: 16,
      name: "Ragavi Venugopal",
      role: "UI/UX & Graphic Designer",
      image: ragavi,
      bio: "Creating intuitive and visually stunning user interfaces. Combining artistic vision with technical expertise to deliver exceptional user experiences and brand identity.",
      linkedin: "https://linkedin.com",
      email: "ragavivenugopal@prasklatechnology.com",
      phone: "+91 xxxxx xxxxx"
    }
  ];

  // Define hierarchy relationships directly in the component
  const hierarchyData = {
    // CEO is at the top level
    1: { // Pranesh Kumar Baskaran (CEO)
      directReports: [2, 3, 4, 5, 6], // IDs of direct reports
    },
    // Second level - Department Heads
    2: { // Rama Chandran Baskaran
      directReports: [14, 15],
      reportingTo: 1,
    },
    3: { // Jaillesh Kathirvel
      directReports: [16, 11, 12],
      reportingTo: 1,
    },
    4: { // Nitin Patel
      directReports: [7],
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
    // Third level
    7: { // Vishnudhasan Govindharajan
      directReports: [8, 9],
      reportingTo: 4,
    },
    8: { // Vikash Thirumurugan
      directReports: [],
      reportingTo: 7,
    },
    9: { // Tharun Saravanan
      directReports: [],
      reportingTo: 7,
    },
    10: { // Balaji
      directReports: [],
      reportingTo: 3,
    },
    11: { // Kamal
      directReports: [13],
      reportingTo: 3,
    },
    12: { // Arjun Thambidurai
      directReports: [],
      reportingTo: 3,
    },
    13: { // Kamlesh
      directReports: [],
      reportingTo: 11,
    },
    14: { // Divakar
      directReports: [],
      reportingTo: 2,
    },
    15: { // Rajkumar Velumani
      directReports: [],
      reportingTo: 2,
    },
    16: { // Ragavi Venugopal
      directReports: [],
      reportingTo: 3,
    }
  };

  // Find a team member by ID
  const findMemberById = (id) => {
    return teamMembers.find(member => member.id === id);
  };

  // Render team member card for mobile hierarchy view
  const renderMobileCard = (memberId, isRoot = false) => {
    const member = findMemberById(memberId);
    if (!member) return null;

    const hasDirectReports = hierarchyData[member.id] && 
                            hierarchyData[member.id].directReports && 
                            hierarchyData[member.id].directReports.length > 0;

    return (
      <motion.div
        key={`mobile-hierarchy-${member.id}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 * member.id }}
        className="w-full"
      >
        <div 
          className={`bg-white rounded-lg overflow-hidden shadow-md mx-auto border ${isRoot ? 'border-blue-400' : 'border-gray-200'} cursor-pointer`}
          style={{ maxWidth: isRoot ? '90%' : '85%' }}
          onClick={() => {
            // Simple approach: Force a redirect to show the hierarchy for this team member
            // This uses window.location to ensure it works even if React state is not updating correctly
            if (memberId === 1) { // Check if this is Pranesh/CEO card
              console.log("Clicked on Pranesh card");
              
              // Create popup directly in DOM
              const container = document.createElement('div');
              container.id = 'mobileHierarchyPopup';
              container.style.position = 'fixed';
              container.style.top = '0';
              container.style.left = '0';
              container.style.width = '100%';
              container.style.height = '100%';
              container.style.backgroundColor = 'white';
              container.style.zIndex = '999';
              container.style.overflowY = 'auto';
              container.style.padding = '20px';
              
              // Add header
              const header = document.createElement('div');
              header.style.display = 'flex';
              header.style.justifyContent = 'space-between';
              header.style.alignItems = 'center';
              header.style.marginBottom = '20px';
              header.style.paddingBottom = '10px';
              header.style.borderBottom = '1px solid #eee';
              
              const title = document.createElement('h3');
              title.textContent = "Pranesh's Team";
              title.style.fontSize = '18px';
              title.style.fontWeight = 'bold';
              
              const backButton = document.createElement('button');
              backButton.innerHTML = '&times;';
              backButton.style.width = '30px';
              backButton.style.height = '30px';
              backButton.style.borderRadius = '50%';
              backButton.style.backgroundColor = '#f0f0f0';
              backButton.style.border = 'none';
              backButton.style.fontSize = '20px';
              backButton.style.display = 'flex';
              backButton.style.alignItems = 'center';
              backButton.style.justifyContent = 'center';
              backButton.onclick = () => {
                document.body.removeChild(container);
              };
              
              header.appendChild(title);
              header.appendChild(backButton);
              container.appendChild(header);
              
              // Add CEO card
              const ceoCard = document.createElement('div');
              ceoCard.style.backgroundColor = 'white';
              ceoCard.style.borderRadius = '8px';
              ceoCard.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              ceoCard.style.padding = '12px';
              ceoCard.style.marginBottom = '16px';
              ceoCard.style.border = '1px solid #3b82f6';
              ceoCard.style.display = 'flex';
              ceoCard.style.alignItems = 'center';
              
              const ceoAvatar = document.createElement('div');
              ceoAvatar.style.width = '48px';
              ceoAvatar.style.height = '48px';
              ceoAvatar.style.borderRadius = '50%';
              ceoAvatar.style.overflow = 'hidden';
              ceoAvatar.style.border = '2px solid #3b82f6';
              ceoAvatar.style.flexShrink = '0';
              
              const ceoImg = document.createElement('img');
              ceoImg.src = member.image;
              ceoImg.alt = member.name;
              ceoImg.style.width = '100%';
              ceoImg.style.height = '100%';
              ceoImg.style.objectFit = 'cover';
              
              ceoAvatar.appendChild(ceoImg);
              
              const ceoInfo = document.createElement('div');
              ceoInfo.style.marginLeft = '12px';
              ceoInfo.style.flexGrow = '1';
              
              const ceoName = document.createElement('h4');
              ceoName.textContent = member.name;
              ceoName.style.fontSize = '16px';
              ceoName.style.fontWeight = '600';
              ceoName.style.color = '#333';
              ceoName.style.margin = '0';
              
              const ceoRole = document.createElement('p');
              ceoRole.textContent = member.role;
              ceoRole.style.fontSize = '14px';
              ceoRole.style.color = '#666';
              ceoRole.style.margin = '4px 0 0 0';
              
              ceoInfo.appendChild(ceoName);
              ceoInfo.appendChild(ceoRole);
              
              ceoCard.appendChild(ceoAvatar);
              ceoCard.appendChild(ceoInfo);
              container.appendChild(ceoCard);
              
              // Add connector
              const connector = document.createElement('div');
              connector.style.width = '2px';
              connector.style.height = '16px';
              connector.style.backgroundColor = '#93c5fd';
              connector.style.margin = '0 auto 16px auto';
              container.appendChild(connector);
              
              // Add direct reports
              const directReports = hierarchyData[memberId].directReports || [];
              
              directReports.forEach((reportId, index) => {
                const reportMember = findMemberById(reportId);
                
                const reportCard = document.createElement('div');
                reportCard.style.backgroundColor = 'white';
                reportCard.style.borderRadius = '8px';
                reportCard.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                reportCard.style.padding = '12px';
                reportCard.style.marginBottom = '16px';
                reportCard.style.border = '1px solid #eee';
                reportCard.style.display = 'flex';
                reportCard.style.alignItems = 'center';
                
                const reportAvatar = document.createElement('div');
                reportAvatar.style.width = '48px';
                reportAvatar.style.height = '48px';
                reportAvatar.style.borderRadius = '50%';
                reportAvatar.style.overflow = 'hidden';
                reportAvatar.style.border = '1px solid #ddd';
                reportAvatar.style.flexShrink = '0';
                
                const reportImg = document.createElement('img');
                reportImg.src = reportMember.image;
                reportImg.alt = reportMember.name;
                reportImg.style.width = '100%';
                reportImg.style.height = '100%';
                reportImg.style.objectFit = 'cover';
                
                reportAvatar.appendChild(reportImg);
                
                const reportInfo = document.createElement('div');
                reportInfo.style.marginLeft = '12px';
                reportInfo.style.flexGrow = '1';
                
                const reportName = document.createElement('h4');
                reportName.textContent = reportMember.name;
                reportName.style.fontSize = '16px';
                reportName.style.fontWeight = '600';
                reportName.style.color = '#333';
                reportName.style.margin = '0';
                
                const reportRole = document.createElement('p');
                reportRole.textContent = reportMember.role;
                reportRole.style.fontSize = '14px';
                reportRole.style.color = '#666';
                reportRole.style.margin = '4px 0 0 0';
                
                reportInfo.appendChild(reportName);
                reportInfo.appendChild(reportRole);
                
                reportCard.appendChild(reportAvatar);
                reportCard.appendChild(reportInfo);
                container.appendChild(reportCard);
                
                // Add connector except for the last one
                if (index < directReports.length - 1) {
                  const reportConnector = document.createElement('div');
                  reportConnector.style.width = '2px';
                  reportConnector.style.height = '16px';
                  reportConnector.style.backgroundColor = '#93c5fd';
                  reportConnector.style.margin = '0 auto 16px auto';
                  container.appendChild(reportConnector);
                }
              });
              
              // Add the container to the document body
              document.body.appendChild(container);
            }
          }}
        >
          <div className="flex items-center p-3">
            <div className={`w-12 h-12 rounded-full overflow-hidden ${isRoot ? 'border-2 border-blue-400' : 'border border-gray-300'} bg-white flex-shrink-0`}>
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3 flex-grow">
              <h4 className={`text-base font-semibold ${isRoot ? 'text-gray-800' : 'text-gray-700'}`}>{member.name.split(' ')[0]}</h4>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
            {isRoot && (
              <div className="flex-shrink-0">
                <button 
                  className="text-blue-400 text-sm border border-blue-400 rounded px-2 py-1"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click from firing
                    // Edit functionality here if needed
                  }}
                >Edit</button>
              </div>
            )}
          </div>
          {!isRoot && member.id !== 2 && (
            <div className="text-xs text-gray-500 pl-5 pb-2 flex items-center">
              <span className="mr-1">{member.id % 2 === 0 ? '1' : '0'}</span>
              <span>▶</span>
            </div>
          )}
        </div>
        {/* Connector line for all but the last card */}
        {memberId !== 1 && (
          <div className="w-0.5 h-4 bg-blue-300 mx-auto my-1"></div>
        )}
      </motion.div>
    );
  };

  // Render mobile member hierarchy
  const renderMobileDetailView = () => {
    if (!mobileViewingMember) return null;
    
    const memberId = mobileViewingMember;
    const member = findMemberById(memberId);
    const directReports = hierarchyData[memberId]?.directReports || [];
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-white z-[99999] flex flex-col overflow-auto"
      >
        {/* Header with back button */}
        <div className="flex justify-between items-center p-4 border-b">
          <button 
            className="p-2 rounded-full bg-gray-100"
            onClick={() => setMobileViewingMember(null)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
          <h3 className="text-lg font-bold text-gray-800">
            {member.name}'s Team
          </h3>
          <div className="w-10"></div> {/* Empty div for balance */}
        </div>
        
        {/* Content area */}
        <div className="flex-1 overflow-auto p-4">
          {/* Current member card */}
          <div className="mb-4">
            <div className="bg-white rounded-lg shadow-md p-3 border border-blue-400 flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400 bg-white flex-shrink-0">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3 flex-grow">
                <h4 className="text-base font-semibold text-gray-800">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            </div>
          </div>
          
          {/* Connector line */}
          {directReports.length > 0 && (
            <div className="w-0.5 h-4 bg-blue-300 mx-auto my-1"></div>
          )}
          
          {/* Direct reports */}
          <div className="space-y-3">
            {directReports.length > 0 ? directReports.map((reportId, index) => {
              const reportMember = findMemberById(reportId);
              if (!reportMember) return null;
              
              const hasNestedReports = hierarchyData[reportId]?.directReports?.length > 0;
              
              return (
                <div key={`mobile-sub-${reportId}`}>
                  <div 
                    className={`bg-white rounded-lg shadow-md p-3 border border-gray-200 flex items-center ${hasNestedReports ? 'cursor-pointer' : ''}`}
                    onClick={() => {
                      if (hasNestedReports) {
                        setMobileViewingMember(reportId);
                      }
                    }}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 bg-white flex-shrink-0">
                      <img 
                        src={reportMember.image} 
                        alt={reportMember.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3 flex-grow">
                      <h4 className="text-base font-semibold text-gray-700">{reportMember.name}</h4>
                      <p className="text-sm text-gray-600">{reportMember.role}</p>
                    </div>
                  </div>
                  
                  {/* Connector line if not the last report */}
                  {index < directReports.length - 1 && (
                    <div className="w-0.5 h-4 bg-blue-300 mx-auto my-1"></div>
                  )}
                </div>
              );
            }) : (
              <div className="text-center p-4 text-gray-500">
                No direct reports
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // Mobile hierarchy view
  const renderMobileHierarchy = () => {
    if (!selectedMember) return null;
    
    // Determine which member's hierarchy to show based on selectedMember
    // Just like in desktop view, use different root IDs based on selection
    const rootId = selectedMember.id === 2 ? 2 : 
                  selectedMember.id === 3 ? 3 :
                  selectedMember.id === 4 ? 4 : 1;
    
    const rootMember = findMemberById(rootId);
    if (!rootMember) return null;
    
    const directReports = hierarchyData[rootId]?.directReports || [];
    
    return (
      <div className="w-full flex flex-col overflow-auto py-4 px-4 bg-white rounded-lg shadow-sm" style={{maxHeight: '80vh'}}>
        {/* Root card (selected member) */}
        <div className="w-full max-w-md mx-auto mb-5">
          <div className="bg-white rounded-lg border border-[#371445] p-3 flex items-center shadow-sm">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#371445] mr-3">
              <img 
                src={rootMember.image} 
                alt={rootMember.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-[#371445]">{rootMember.name}</h4>
              <p className="text-xs text-gray-500">{rootMember.role}</p>
            </div>
          </div>
        </div>
        
        <div className="relative mx-auto pl-8 w-full max-w-md">
          {/* Main vertical line - aligned with root and children */}
          <div className="absolute left-4 top-[-10px] bottom-0 w-[1px] bg-[#371445]"></div>
          
          {/* Direct reports */}
          <div className="space-y-4 mt-4">
            {directReports.map((reportId, index) => {
              const reportMember = findMemberById(reportId);
              if (!reportMember) return null;
              
              // Get the sub-reports for special cases
              let subReports = [];
              if (rootId === 3 && hierarchyData[reportId]?.directReports) {
                // For Jaillesh's hierarchy
                subReports = hierarchyData[reportId].directReports;
              } else if (rootId === 4 && hierarchyData[reportId]?.directReports) {
                // For Yogech's hierarchy
                subReports = hierarchyData[reportId].directReports;
              }
              
              return (
                <div key={`mobile-report-${reportId}`} className="relative">
                  {/* Horizontal connector line positioned higher to avoid overlap */}
                  <div className="absolute left-[-4px] top-[12px] w-4 h-[1px] bg-[#371445]"></div>
                  
                  {/* Card */}
                  <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center shadow-sm">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-[#371445] mr-3">
                      <img 
                        src={reportMember.image} 
                        alt={reportMember.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-[#371445]">{reportMember.name}</h4>
                      <p className="text-xs text-gray-500">{reportMember.role}</p>
                    </div>
                  </div>
                  
                  {/* Sub-reports (like Kamlesh under Kamal) */}
                  {subReports.length > 0 && (
                    <div className="pl-8 mt-1 relative">
                      {/* Vertical line for sub-reports */}
                      <div className="absolute left-4 top-[-4px] bottom-0 w-[1px] bg-[#371445]"></div>
                      
                      <div className="space-y-4 mt-4">
                        {subReports.map((subReportId, subIndex) => {
                          const subReportMember = findMemberById(subReportId);
                          if (!subReportMember) return null;
                          
                          return (
                            <div key={`mobile-subreport-${subReportId}`} className="relative">
                              {/* Horizontal connector positioned to avoid overlap */}
                              <div className="absolute left-[-4px] top-[12px] w-4 h-[1px] bg-[#371445]"></div>
                              
                              <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center shadow-sm">
                                <div className="w-10 h-10 rounded-full overflow-hidden border border-[#371445] mr-3">
                                  <img 
                                    src={subReportMember.image} 
                                    alt={subReportMember.name} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium text-[#371445]">{subReportMember.name}</h4>
                                  <p className="text-xs text-gray-500">{subReportMember.role}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Render team member card for hierarchy view (desktop)
  const renderMemberCard = (memberId, position = {}, isRoot = false) => {
    const member = findMemberById(memberId);
    if (!member) return null;

    return (
      <motion.div
        key={`hierarchy-${member.id}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: memberId === 1 ? 0 : 0.3 }}
        style={{
          position: 'absolute',
          ...position,
          zIndex: 10
        }}
      >
        <div className="bg-white rounded-lg overflow-hidden shadow-xl" 
          style={{ width: isRoot ? '350px' : '300px' }}>
          <div className="flex items-center p-3">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#371445] bg-white">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-bold text-[#371445]">Mr. {member.name}</h4>
              <p className="text-xs text-gray-600">{member.role}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Generate the hierarchical view (desktop)
  const renderHierarchy = () => {
    if (!selectedMember) return null;

    // Use Rama Chandran (ID 2) as the root when selected or showing his hierarchy
    // For Jaillesh (ID 3) use him as root when selected
    // For Nitin Patel (ID 4) use him as root when selected
    const rootId = selectedMember.id === 2 ? 2 : 
                  selectedMember.id === 3 ? 3 :
                  selectedMember.id === 4 ? 4 : 1;
    const rootMember = findMemberById(rootId);
    
    if (!rootMember) return null;
    
    const directReports = hierarchyData[rootId].directReports || [];
    
    // Special case for Jaillesh's hierarchy - need to show Kamlesh (ID 13) under Kamal (ID 11)
    const secondLevelIds = [];
    if (rootId === 3) {
      // For each direct report of Jaillesh, check if they have direct reports
      directReports.forEach(reportId => {
        const nestedReports = hierarchyData[reportId].directReports || [];
        secondLevelIds.push(...nestedReports);
      });
    }
    // Special case for Nitin Patel's hierarchy - need to show Tharun (ID 9) and Vikash (ID 8) under Vishnudhasan (ID 7)
    else if (rootId === 4) {
      // For each direct report of Nitin, check if they have direct reports
      directReports.forEach(reportId => {
        const nestedReports = hierarchyData[reportId].directReports || [];
        secondLevelIds.push(...nestedReports);
      });
    }
    
    // Calculate container dimensions
    const containerWidth = Math.min(1200, window.innerWidth - 40);
    const containerHeight = 500; // Standard container height
    
    // Card dimensions
    const rootCardWidth = 350;
    const directorCardWidth = 300;
    const cardHeight = 70;
    
    // Root position (centered at top, moved up)
    const rootPosition = { 
      top: 30, // Reduced top margin to move root card up
      left: containerWidth / 2 - rootCardWidth / 2
    };
    
    // Calculate positions for rows - reduced vertical gaps
    const verticalGap = 70; // Reduced vertical gap between rows (was 90)
    const rowY1 = rootPosition.top + cardHeight + verticalGap; // First row Y position
    const rowY2 = rowY1 + cardHeight + verticalGap; // Second row Y position
    
    // First row - direct reports
    const firstRowCards = directReports.length;
    const firstRowPositions = [];
    const firstRowWidth = 700; // Width of first row
    
    for (let i = 0; i < firstRowCards; i++) {
      let leftPos;
      if (firstRowCards === 1) {
        leftPos = containerWidth / 2 - directorCardWidth / 2;
      } else {
        const spacing = firstRowWidth / (firstRowCards - 1);
        leftPos = (containerWidth / 2 - firstRowWidth / 2) + (i * spacing) - (directorCardWidth / 2);
      }
      
      const memberId = directReports[i];
      const member = findMemberById(memberId);
      
      // Check if this is Jailesh (ID 3) or Satya and position them lower
      const adjustedTop = (member && (member.id === 3 || member.name.includes("Satya"))) 
        ? rowY1 + 150 // Position Jailesh and Satya cards much lower (increased from 50px to 150px)
        : rowY1;
      
      firstRowPositions.push({
        top: adjustedTop,
        left: leftPos
      });
    }
    
    // Second row - nested reports (like Kamlesh)
    const secondRowCards = secondLevelIds.length;
    const secondRowPositions = [];
    const secondRowWidth = 500; // Width of second row
    
    for (let i = 0; i < secondRowCards; i++) {
      let leftPos;
      if (secondRowCards === 1) {
        leftPos = containerWidth / 2 - directorCardWidth / 2;
      } else {
        const spacing = secondRowWidth / (secondRowCards - 1);
        leftPos = (containerWidth / 2 - secondRowWidth / 2) + (i * spacing) - (directorCardWidth / 2);
      }
      
      secondRowPositions.push({
        top: rowY2,
        left: leftPos
      });
    }
    
    return (
      <div className="relative mx-auto" style={{ width: containerWidth, height: containerHeight + 150, borderRadius: '12px', marginTop: '0' }}>
        
        {/* Root card */}
        {renderMemberCard(rootId, rootPosition, true)}
        
        {/* SVG connections */}
        <svg className="absolute top-0 left-0 w-full h-full z-5 pointer-events-none">
          {/* Main vertical line from root to first row */}
          <motion.line
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            x1={containerWidth / 2}
            y1={rootPosition.top + cardHeight}
            x2={containerWidth / 2}
            y2={rowY1 - 30}
            stroke="#371445"
            strokeWidth="2"
          />
          
          {/* Horizontal line for first row */}
          {firstRowPositions.length > 1 && (
            <motion.line
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              x1={firstRowPositions[0].left + directorCardWidth / 2}
              y1={rowY1 - 30}
              x2={firstRowPositions[firstRowPositions.length - 1].left + directorCardWidth / 2}
              y2={rowY1 - 30}
              stroke="#371445"
              strokeWidth="2"
            />
          )}
          
          {/* Vertical lines down to first row cards */}
          {firstRowPositions.map((pos, idx) => {
            const memberId = directReports[idx];
            const member = findMemberById(memberId);
            const isSpecial = member && (member.id === 3 || member.name.includes("Satya"));
            
            // For Jailesh and Satya, we need longer lines
            return (
              <motion.line
                key={`vline1-${idx}`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + (idx * 0.1) }}
                x1={pos.left + directorCardWidth / 2}
                y1={rowY1 - 30}
                x2={pos.left + directorCardWidth / 2}
                y2={isSpecial ? rowY1 + 150 : rowY1}
                stroke="#371445"
                strokeWidth="2"
              />
            );
          })}
          
          {/* Second level connections - for Kamlesh under Kamal */}
          {rootId === 3 && secondLevelIds.map((reportId, idx) => {
            // Find which first-level person this reports to
            const parentId = hierarchyData[reportId].reportingTo;
            const parentIndex = directReports.indexOf(parentId);
            
            // Only proceed if we found the parent
            if (parentIndex === -1) return null;
            
            const parentPosition = firstRowPositions[parentIndex];
            const childPosition = secondRowPositions[idx];
            
            return (
              <motion.path
                key={`second-level-${idx}`}
                d={`M ${parentPosition.left + directorCardWidth / 2} ${parentPosition.top + cardHeight}
                    L ${parentPosition.left + directorCardWidth / 2} ${parentPosition.top + cardHeight + 30}
                    L ${childPosition.left + directorCardWidth / 2} ${parentPosition.top + cardHeight + 30}
                    L ${childPosition.left + directorCardWidth / 2} ${childPosition.top}`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                stroke="#371445"
                strokeWidth="2"
                fill="none"
              />
            );
          })}
          
          {/* Second level connections - for Vikash and Tharun under Vishnudhasan in Nitin's hierarchy */}
          {rootId === 4 && secondLevelIds.map((reportId, idx) => {
            // Find which first-level person this reports to
            const parentId = hierarchyData[reportId].reportingTo;
            const parentIndex = directReports.indexOf(parentId);
            
            // Only proceed if we found the parent
            if (parentIndex === -1) return null;
            
            const parentPosition = firstRowPositions[parentIndex];
            const childPosition = secondRowPositions[idx];
            
            return (
              <motion.path
                key={`second-level-nitin-${idx}`}
                d={`M ${parentPosition.left + directorCardWidth / 2} ${parentPosition.top + cardHeight}
                    L ${parentPosition.left + directorCardWidth / 2} ${parentPosition.top + cardHeight + 30}
                    L ${childPosition.left + directorCardWidth / 2} ${parentPosition.top + cardHeight + 30}
                    L ${childPosition.left + directorCardWidth / 2} ${childPosition.top}`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                stroke="#371445"
                strokeWidth="2"
                fill="none"
              />
            );
          })}
          
          {/* Default connections for other hierarchies */}
          {rootId !== 3 && rootId !== 4 && secondRowPositions.map((pos, idx) => {
            // Determine if this is the left or right card in the bottom row
            const isLeftCard = idx === 0;
            
            // Calculate the gap positions between first row cards
            const leftGapPosition = firstRowPositions.length >= 2 
              ? (firstRowPositions[0].left + directorCardWidth + firstRowPositions[1].left) / 2
              : containerWidth / 2 - 100;
            
            const rightGapPosition = firstRowPositions.length >= 3
              ? (firstRowPositions[1].left + directorCardWidth + firstRowPositions[2].left) / 2
              : containerWidth / 2 + 100;
            
            // Create paths that go through the gaps and avoid intersecting any cards
            return (
              <motion.path
                key={`direct-path-${idx}`}
                d={`M ${containerWidth / 2} ${rootPosition.top + cardHeight} 
                    L ${containerWidth / 2} ${rowY1 - 30}
                    ${isLeftCard 
                      ? `L ${leftGapPosition} ${rowY1 - 30}
                         L ${leftGapPosition} ${rowY1 + cardHeight + 30}
                         L ${pos.left + directorCardWidth / 2} ${rowY1 + cardHeight + 30}
                         L ${pos.left + directorCardWidth / 2} ${pos.top}`
                      : `L ${rightGapPosition} ${rowY1 - 30}
                         L ${rightGapPosition} ${rowY1 + cardHeight + 30}
                         L ${pos.left + directorCardWidth / 2} ${rowY1 + cardHeight + 30}
                         L ${pos.left + directorCardWidth / 2} ${pos.top}`
                    }`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.6 + (idx * 0.1) }}
                stroke="#371445"
                strokeWidth="2"
                fill="none"
              />
            );
          })}
        </svg>
        
        {/* First row cards (direct reports) */}
        {directReports.map((reportId, idx) => (
          renderMemberCard(reportId, firstRowPositions[idx], false)
        ))}
        
        {/* Second row cards (like Kamlesh) */}
        {secondLevelIds.map((reportId, idx) => (
          renderMemberCard(reportId, secondRowPositions[idx], false)
        ))}
      </div>
    );
  };

  const overlay = (
    <AnimatePresence>
      {showHierarchy && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-white/95 backdrop-blur-sm z-[99999] flex items-start justify-center overflow-auto  pt-4"
          onClick={closeHierarchy}
        >
          {/* Centered white panel that contains the hierarchy (keeps white background for the tree) */}
          <div className="w-full flex flex-col items-center">
            {/* Simple title at the top */}
            <h2 className="text-3xl font-bold text-[#371445] mb-4 text-center">
             Driven by These Minds
            </h2>

            {/* Close button - positioned absolutely in the top-right of the panel */}
            <button 
              onClick={closeHierarchy}
              className="bg-[#371445]/10 rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#371445]/20 transition-colors absolute top-4 right-4 z-50"
            >
              <svg className="w-6 h-6 text-[#371445]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            {/* Always display the correct view based on screen size */}
            <div className="w-full px-2">
              {isMobile ? renderMobileHierarchy() : renderHierarchy()}
            </div>

            {/* Mobile detail view overlay (renders above the white panel) */}
            <AnimatePresence>
              {isMobile && mobileViewingMember && renderMobileDetailView()}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Use a portal to ensure overlay is rendered at document.body level (avoid stacking-context issues)
  return typeof document !== 'undefined' ? createPortal(overlay, document.body) : overlay;
};

export default TeamHierarchy; 