import {
  FiMapPin,
  FiClock,
  FiBriefcase,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
      location: "On-site",
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
      skills: [
        "Google Search Console",
        "Google Analytics",
        "Keyword Research",
        "On-Page SEO",
        "Technical SEO"
      ],
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
      skills: [
        "Copywriting",
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
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchLower));

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
          className={`px-3 sm:px-4 py-2 rounded-full font-medium transition-colors text-sm sm:text-[15px] lg:text-base ${
            currentPage === i
              ? 'bg-[#E31D2E] text-white shadow-sm font-bold'
              : 'bg-white/80 text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
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
      <div className="bg-transparent py-4 sm:py-6 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Dynamic Animated Job Count Header */}
          <div className="flex items-center justify-between mb-6 sm:mb-8 pb-4 border-b border-neutral-200/60">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E31D2E]" />
              </span>
              <span className="text-[#111111] text-base sm:text-lg font-bold tracking-tight flex items-center gap-2">
                Showing{" "}
                <motion.span
                  key={jobs.length}
                  initial={{ opacity: 0, y: -8, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="inline-block px-2.5 py-0.5 rounded-full bg-[#E31D2E]/10 text-[#E31D2E] font-black"
                >
                  {jobs.length}
                </motion.span>{" "}
                {jobs.length === 1 ? "Opportunity" : "Opportunities"}
              </span>
            </div>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-12 sm:py-16 bg-white/60 border border-neutral-200/80 rounded-[22px] shadow-xs">
              <p className="text-neutral-600 text-base sm:text-lg lg:text-xl font-medium">No jobs found matching your criteria.</p>
              <p className="text-neutral-400 mt-2 text-sm sm:text-[15px] lg:text-base">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {currentJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
                    whileHover={{ y: -5, scale: 1.015 }}
                    className="group relative rounded-[22px] bg-white border border-neutral-200/80 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-[#E31D2E]/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Title Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <h3 className="text-[#111111] text-xl sm:text-2xl font-black tracking-tight group-hover:text-[#E31D2E] transition-colors duration-300">
                          {job.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal mb-6">
                        {job.description}
                      </p>

                      {/* Metadata Pills with minimal line icons */}
                      <div className="flex gap-2.5 sm:gap-3 flex-wrap mb-6">
                        <div className="flex items-center gap-2 border border-neutral-200/80 bg-neutral-50 rounded-full px-3.5 py-1.5 shadow-xs">
                          <FiMapPin className="text-[#E31D2E] w-3.5 h-3.5" />
                          <span className="text-neutral-700 font-semibold text-xs sm:text-sm">
                            {job.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 border border-neutral-200/80 bg-neutral-50 rounded-full px-3.5 py-1.5 shadow-xs">
                          <FiClock className="text-neutral-500 w-3.5 h-3.5" />
                          <span className="text-neutral-700 font-semibold text-xs sm:text-sm">
                            {job.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 border border-neutral-200/80 bg-neutral-50 rounded-full px-3.5 py-1.5 shadow-xs">
                          <FiBriefcase className="text-neutral-500 w-3.5 h-3.5" />
                          <span className="text-neutral-700 font-semibold text-xs sm:text-sm">
                            {job.level}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Row: Skill Tags + Primary CTA Button */}
                    <div className="pt-5 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Technology / Skill Tags */}
                      <div className="flex flex-wrap gap-2 items-center">
                        {job.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-white border border-neutral-200 text-neutral-600 text-xs font-medium px-3 py-1 rounded-lg shadow-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Primary CTA Button */}
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="primary-btn px-6 py-3 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 group/btn shadow-sm hover:scale-102 transition-all flex-shrink-0"
                      >
                        <span>Apply Now</span>
                        <FiArrowUpRight className="text-base group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 sm:gap-3 mt-10 sm:mt-14 flex-wrap">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-[15px] ${
                      currentPage === 1
                        ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200'
                        : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200 shadow-xs'
                    }`}
                  >
                    <FiChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </button>

                  {/* Page Numbers */}
                  {renderPageNumbers()}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-[15px] ${
                      currentPage === totalPages
                        ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200'
                        : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200 shadow-xs'
                    }`}
                  >
                    <span>Next</span>
                    <FiChevronRight className="w-4 h-4" />
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