import {
  FiMapPin,
  FiClock,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useState, useEffect } from "react";

// component imports
import JobApplication from "./JobApplication";

function JobListing({ searchQuery = "", filters = {} }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const jobsPerPage = 5;

  const allJobs = [
    {
      id: 1,
      title: "Jr. Video Editor/ Motion Graphic Designer",
      description:
        "Bring our brand stories to life through compelling edits and motion graphics. Work on reels, brand videos, and campaign content for a range of clients.",
      location: "On-site",
      type: "Full-time",
      role: "Jr. Video Editor/ Motion Graphic Designer",
      department: "VISCOM",
      level: "Entry Level",
      skills: [
        "Adobe Premiere Pro",
        "After Effects",
        "CapCut",
        "Motion Graphics",
        "Video Editing"
      ],
      requirements: [
        "Hands-on experience with Premiere Pro and After Effects",
        "Strong sense of pacing, storytelling, and visual rhythm",
        "Ability to work across multiple projects and deadlines",
      ],
    },
    {
      id: 2,
      title: "Client Acquisition Executive",
      description:
        "Drive new business growth by identifying, pitching, and onboarding clients. Build lasting relationships and help expand our client portfolio.",
      location: "on-site",
      type: "Full-time",
      role: "Client Acquisition Executive",
      department: "VISCOM",
      level: "Entry Level",
      skills: ["Lead Generation", "Cold Calling", "CRM", "Sales Pitching", "Client Communication"],

      requirements: [
        "Strong communication and interpersonal skills",
        "Comfortable with cold outreach and client pitching",
        "Prior experience in sales or business development is a plus",
      ],
    },
    {
      id: 3,
      title: "Videography/Photography",
      description:
        "Capture high-quality photo and video content for brand shoots, events, and campaigns. Collaborate closely with the creative team to bring concepts to life on set.",
      location: "On-site",
      type: "Full-time",
      role: "Videography/Photography",
      department: "VISCOM",
      level: "Entry Level",
      skills: ["DSLR Camera", "Adobe Lightroom", "Adobe Photoshop", "Cinematography", "Photo Editing"],
      requirements: [
        "Solid understanding of camera equipment, lighting, and composition",
        "Portfolio showcasing photography and/or videography work",
        "Willingness to travel for shoots when required",
      ],
    },
    {
      id: 4,
      title: "SEO Specialist",
      description:
        "Learn and apply on-page and off-page SEO techniques to improve client search rankings. Assist with keyword research, audits, and performance tracking.",
      location: "Hybrid",
      type: "Internship",
      role: "SEO Specialist",
      department: "VISCOM",
      level: "Intern",
      skills: [ "Google Search Console",
        "Google Analytics",
        "Keyword Research",
        "On-Page SEO",
        "Technical SEO"],
      requirements: [
        "Basic understanding of SEO principles",
        "Eagerness to learn and analyze data",
        "Duration: 6m to 1yr",
      ],
    },
    {
      id: 5,
      title: "Social Media Executive",
      description:
        "Support the planning, scheduling, and posting of content across client social media channels. Help track engagement and stay on top of platform trends.",
      location: "Hybrid",
      type: "Internship",
      role: "Social Media Executive",
      department: "VISCOM",
      level: "Intern",
      skills: ["Meta Business Suite", "Canva", "Content Planning", "Instagram Marketing", "Social Media Strategy"],

      requirements: [
        "Active understanding of social media platforms and trends",
        "Good written communication skills",
        "Duration: 6m to 1yr",
      ],
    },
    {
      id: 6,
      title: "Content Creator",
      description:
        "Ideate and create engaging content for brand and client social channels, including short-form video, captions, and campaign concepts.",
      location: "Hybrid",
      type: "Internship",
      role: "Content Creator",
      department: "VISCOM",
      level: "Intern",
      skills: ["Copywriting",
"Canva",
"Content Writing",
"Storytelling",
"Creative Thinking"
],
      requirements: [
        "A creative eye and strong storytelling instinct",
        "Comfortable being on camera or scripting for others",
        "Duration: 6m to 1yr",
      ],
    },
  ];

  // Filter jobs based on search query and filters
  const jobs = allJobs.filter((job) => {
    // Search query filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchLower));

    // Filter pills
    const matchesRole = !filters.role || job.role === filters.role;
    const matchesDepartment =
      !filters.department || job.department === filters.department;
    const matchesType = !filters.type || job.type === filters.type;
    const matchesLevel = !filters.level || job.level === filters.level;
    const matchesLocation =
      !filters.location || job.location === filters.location;

    return (
      matchesSearch &&
      matchesRole &&
      matchesDepartment &&
      matchesType &&
      matchesLevel &&
      matchesLocation
    );
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  // Pagination logic
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 sm:px-4 py-2 rounded-full font-medium transition-colors text-sm sm:text-[15px] lg:text-base ${currentPage === i
              ? 'bg-[#E8192C] text-white shadow-[0_6px_20px_rgba(232,25,44,0.3)]'
              : 'bg-transparent text-white hover:bg-white/5 border border-white/10'
            }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <div className="bg-[#080808] py-4 sm:py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {jobs.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <p className="text-white/60 text-base sm:text-lg lg:text-xl">No jobs found matching your criteria.</p>
              <p className="text-white/40 mt-2 text-sm sm:text-[15px] lg:text-base">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <>
              {currentJobs.map((job, index) => (
                <div key={job.id}>
                  <div className="flex flex-col sm:flex-row items-start justify-between py-6 sm:py-8 gap-4">
                    {/* Left Side - Job Info */}
                    <div className="flex-1 w-full">
                      <h3 className="text-[#E8192C] text-xl sm:text-[22px] lg:text-2xl font-bold mb-2 sm:mb-3">
                        {job.title}
                      </h3>
                      <p className="text-white/70 text-sm sm:text-[15px] lg:text-base mb-4 sm:mb-6">
                        {job.description}
                      </p>

                      {/* Tags */}
                      <div className="flex gap-2 sm:gap-3 flex-wrap">
                        <div className="flex items-center gap-2 border border-[#E8192C] rounded-full px-3 sm:px-5 py-1.5 sm:py-2">
                          <FiMapPin className="text-[#E8192C] w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-[#E8192C] font-medium text-xs sm:text-sm lg:text-base">
                            {job.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 border border-white/20 rounded-full px-3 sm:px-5 py-1.5 sm:py-2">
                          <FiClock className="text-white/80 w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-white/80 font-medium text-xs sm:text-sm lg:text-base">
                            {job.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-[#E8192C]/10 rounded-full px-3 sm:px-5 py-1.5 sm:py-2">
                          <span className="text-[#E8192C] font-medium text-xs sm:text-sm lg:text-base">
                            {job.level}
                          </span>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                        {job.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-white/5 text-white/50 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Side - Apply Button */}
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="w-full sm:w-auto text-[#E8192C] text-lg sm:text-xl lg:text-2xl font-bold hover:text-[#C0141C] transition-colors flex items-center justify-center sm:justify-start gap-2 sm:ml-8 hover:-translate-y-1 transition-all duration-300 mt-2 sm:mt-0"
                    >
                      Apply
                      <FiArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                  <div className="border-b border-white/5"></div>
                </div>
              ))}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 sm:gap-3 mt-8 sm:mt-12 flex-wrap">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 sm:px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-[15px] lg:text-base ${currentPage === 1
                        ? 'bg-white/5 text-white/20 cursor-not-allowed'
                        : 'bg-transparent text-white hover:bg-white/5 border border-white/20'
                      }`}
                  >
                    <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                  </button>

                  {/* Page Numbers */}
                  {renderPageNumbers()}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 sm:px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-[15px] lg:text-base ${currentPage === totalPages
                        ? 'bg-white/5 text-white/20 cursor-not-allowed'
                        : 'bg-transparent text-white hover:bg-white/5 border border-white/20'
                      }`}
                  >
                    Next
                    <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Job Application Modal */}
      {selectedJob && (
        <JobApplication job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </>
  );
}

export default JobListing;