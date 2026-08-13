import {
  FiMapPin,
  FiClock,
  FiBriefcase,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiX,
} from "react-icons/fi";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";

// component imports
import JobApplication from "./JobApplication";

function JobListing({ searchQuery = "", filters = {}, onSelectJob, onClearFilters }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const containerRef = useRef(null);
  const jobsPerPage = 5;

  const allJobs = useMemo(
    () => [
      {
        id: 1,
        title: "Jr. Video Editor / Motion Graphic Designer",
        description:
          "Bring our brand stories to life through compelling edits and motion graphics. Work on reels, brand videos, and campaign content for a range of clients.",
        location: "On-site",
        type: "Full-time",
        role: "Jr. Video Editor / Motion Graphic Designer",
        department: "VISCOM",
        level: "Entry Level",
        skills: [
          "Adobe Premiere Pro",
          "After Effects",
          "CapCut",
          "Motion Graphics",
          "Video Editing",
          "Designer",
        ],
        requirements: [
          "Hands-on experience with Premiere Pro and After Effects",
          "Strong sense of pacing, storytelling, and visual rhythm",
          "Ability to work across multiple projects and deadlines",
        ],
      },
      {
        id: 2,
        title: "Lead Quality Executive",
        description:
          "Ensure the quality and accuracy of leads generated through digital marketing campaigns. Monitor lead data, identify invalid or low-quality leads, coordinate with marketing and sales teams, and maintain consistent lead quality standards.",
        location: "Remote",
        type: "Full-time",
        role: "Lead Quality Executive",
        department: "Quality",
        level: "Mid Level",
        skills: [
          "Lead Quality",
          "Lead Validation",
          "CRM",
          "Data Analysis",
          "Digital Marketing",
          "Quality Control",
        ],
        requirements: [
          "Monitor lead data and identify invalid or low-quality leads",
          "Coordinate with marketing and sales teams to maintain quality standards",
          "Experience with CRM systems, data validation, and digital marketing workflows",
        ],
      },
      {
        id: 4,
        title: "SEO & Performance Marketing Specialist",
        description:
          "Lead search engine optimization strategies, conduct technical SEO audits, and optimize organic performance to drive scalable traffic and leads.",
        location: "Hybrid",
        type: "Full-time",
        role: "SEO Specialist",
        department: "Marketing",
        level: "Mid Level",
        skills: [
          "SEO",
          "Marketing",
          "Google Search Console",
          "Google Analytics",
          "Digital Marketing",
          "Keyword Research",
        ],
        requirements: [
          "Proven track record of improving organic search rankings",
          "Hands-on experience with SEMrush, Ahrefs, and Google Search Console",
          "Knowledge of technical, on-page, and off-page SEO strategies",
        ],
      },
      {
        id: 5,
        title: "Social Media Executive",
        description:
          "Manage social media channels, create engaging campaign posts, analyze engagement metrics, and track digital marketing trends.",
        location: "Hybrid",
        type: "Internship",
        role: "Social Media Executive",
        department: "Marketing",
        level: "Intern",
        skills: [
          "Marketing",
          "Meta Business Suite",
          "Canva",
          "Content Planning",
          "Instagram Marketing",
          "Social Media Strategy",
        ],
        requirements: [
          "Active understanding of social media platforms and trends",
          "Good written communication skills",
          "Duration: 6m to 1yr",
        ],
      },
      {
        id: 6,
        title: "Client Acquisition Executive",
        description:
          "Drive new business growth by identifying, pitching, and onboarding clients. Build lasting relationships and help expand our client portfolio.",
        location: "On-site",
        type: "Full-time",
        role: "Client Acquisition Executive",
        department: "Sales",
        level: "Entry Level",
        skills: [
          "Lead Generation",
          "Cold Calling",
          "CRM",
          "Sales Pitching",
          "Client Communication",
        ],
        requirements: [
          "Strong communication and interpersonal skills",
          "Comfortable with cold outreach and client pitching",
          "Prior experience in sales or business development is a plus",
        ],
      },
      {
        id: 7,
        title: "Videography / Photography Specialist",
        description:
          "Capture high-quality photo and video content for brand shoots, events, and campaigns. Collaborate closely with the creative team to bring concepts to life on set.",
        location: "On-site",
        type: "Full-time",
        role: "Videography/Photography",
        department: "VISCOM",
        level: "Entry Level",
        skills: [
          "DSLR Camera",
          "Adobe Lightroom",
          "Adobe Photoshop",
          "Cinematography",
          "Photo Editing",
          "Photography",
        ],
        requirements: [
          "Solid understanding of camera equipment, lighting, and composition",
          "Portfolio showcasing photography and/or videography work",
          "Willingness to travel for shoots when required",
        ],
      },
      {
        id: 8,
        title: "Content Creator & Strategist",
        description:
          "Ideate and create engaging content for brand and client social channels, including short-form video, captions, and campaign concepts.",
        location: "Hybrid",
        type: "Internship",
        role: "Content Creator",
        department: "Marketing",
        level: "Intern",
        skills: [
          "Copywriting",
          "Canva",
          "Content Creation",
          "Storytelling",
          "Branding",
          "Marketing",
        ],
        requirements: [
          "A creative eye and strong storytelling instinct",
          "Comfortable being on camera or scripting for others",
          "Duration: 6m to 1yr",
        ],
      },
    ],
    []
  );

  // Filter jobs based on search query and filters
  const jobs = useMemo(() => {
    const searchLower = searchQuery.trim().toLowerCase();

    return allJobs.filter((job) => {
      // Search matching across all relevant fields
      const matchesSearch =
        !searchLower ||
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.role.toLowerCase().includes(searchLower) ||
        job.department.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower) ||
        job.type.toLowerCase().includes(searchLower) ||
        job.level.toLowerCase().includes(searchLower) ||
        job.skills.some((skill) => skill.toLowerCase().includes(searchLower)) ||
        job.requirements.some((req) => req.toLowerCase().includes(searchLower));

      // Filter matching
      const matchesRole =
        !filters.role ||
        job.role.toLowerCase() === filters.role.toLowerCase() ||
        job.title.toLowerCase().includes(filters.role.toLowerCase());

      const matchesDepartment =
        !filters.department ||
        job.department.toLowerCase() === filters.department.toLowerCase();

      const matchesType =
        !filters.type ||
        job.type.toLowerCase() === filters.type.toLowerCase() ||
        (filters.type.toLowerCase() === "full-time intern" && job.type.toLowerCase() === "full-time");

      const matchesLevel =
        !filters.level ||
        job.level.toLowerCase() === filters.level.toLowerCase();

      const matchesLocation =
        !filters.location ||
        job.location.toLowerCase() === filters.location.toLowerCase();

      return (
        matchesSearch &&
        matchesRole &&
        matchesDepartment &&
        matchesType &&
        matchesLevel &&
        matchesLocation
      );
    });
  }, [allJobs, searchQuery, filters]);

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
    if (containerRef.current) {
      const elementPosition = containerRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - 120);
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleJobClick = (job) => {
    if (onSelectJob) {
      onSelectJob(job);
    } else {
      setSelectedJob(job);
    }
  };

  const [windowStart, setWindowStart] = useState(1);

  const handleEllipsisClick = () => {
    const maxStart = Math.max(1, totalPages - 3);
    setWindowStart((prev) => Math.min(prev + 1, maxStart));
  };

  const getSlidingWindowItems = (winStart, total) => {
    if (total <= 1) return [];
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

    const maxStart = total - 3;
    const currentStart = Math.min(Math.max(1, winStart), maxStart);

    if (currentStart >= maxStart) {
      return [total - 3, total - 2, total - 1, total];
    }

    return [currentStart, currentStart + 1, "...", total - 1, total];
  };

  const renderPageNumbers = () => {
    const pages = getSlidingWindowItems(windowStart, totalPages);

    return pages.map((item, idx) => {
      if (item === "...") {
        return (
          <button
            key={`dots-${idx}`}
            onClick={handleEllipsisClick}
            className="px-2 py-1 text-neutral-400 font-extrabold hover:text-[#E31D2E] transition-colors select-none text-xs sm:text-sm cursor-pointer"
            aria-label="Shift pagination window forward"
          >
            ...
          </button>
        );
      }
      return (
        <button
          key={item}
          onClick={() => handlePageChange(item)}
          className={`h-9 w-9 rounded-full font-black transition-all text-xs sm:text-sm flex items-center justify-center cursor-pointer ${
            currentPage === item
              ? "bg-[#E31D2E] text-white shadow-md scale-105"
              : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
          }`}
          aria-label={`Page ${item}`}
        >
          {item}
        </button>
      );
    });
  };

  return (
    <>
      <div ref={containerRef} className="bg-transparent py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
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
            <div className="text-center py-12 sm:py-16 bg-white/60 border border-neutral-200/80 rounded-[22px] shadow-xs px-6">
              <div className="w-12 h-12 rounded-full bg-[#E31D2E]/10 text-[#E31D2E] flex items-center justify-center mx-auto mb-4">
                <FiSearch className="w-6 h-6" />
              </div>
              <p className="text-[#111111] text-lg sm:text-xl font-bold mb-2">No jobs match your search.</p>
              <p className="text-neutral-500 text-sm sm:text-base font-normal max-w-md mx-auto mb-6">
                We couldn't find any positions matching your search criteria. Try searching for another keyword or clear your filters.
              </p>
              {onClearFilters && (
                <button
                  onClick={onClearFilters}
                  className="primary-btn px-6 py-3 rounded-full font-bold text-xs sm:text-sm inline-flex items-center gap-2"
                >
                  <FiX className="w-4 h-4" />
                  <span>Clear Search & Filters</span>
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {currentJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    id={`job-${job.id}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
                    whileHover={{ y: -5, scale: 1.015 }}
                    onClick={() => handleJobClick(job)}
                    className="group relative rounded-[22px] bg-white border border-neutral-200/80 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-black/20 transition-all duration-300 flex flex-col justify-between cursor-pointer"
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

                      {/* Metadata Pills */}
                      <div className="flex gap-2.5 sm:gap-3 flex-wrap mb-6">
                        <div className="flex items-center gap-2 border border-neutral-200/80 bg-neutral-50 rounded-full px-3.5 py-1.5 shadow-xs">
                          <FiMapPin className="text-[#E31D2E] w-3.5 h-3.5" />
                          <span className="text-neutral-700 font-semibold text-xs sm:text-sm">
                            {job?.location || 'Remote'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 border border-neutral-200/80 bg-neutral-50 rounded-full px-3.5 py-1.5 shadow-xs">
                          <FiClock className="text-neutral-500 w-3.5 h-3.5" />
                          <span className="text-neutral-700 font-semibold text-xs sm:text-sm">
                            {job?.type === 'Full-time' ? 'Full-time Intern' : (job?.type || 'Full-time Intern')}
                          </span>
                        </div>
                        {job?.level && job.level !== 'Intern' && (
                          <div className="flex items-center gap-2 border border-neutral-200/80 bg-neutral-50 rounded-full px-3.5 py-1.5 shadow-xs">
                            <FiBriefcase className="text-neutral-500 w-3.5 h-3.5" />
                            <span className="text-neutral-700 font-semibold text-xs sm:text-sm">
                              {job.level}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer Row: Skill Tags + Primary CTA Button */}
                    <div className="pt-5 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Technology / Skill Tags */}
                      <div className="flex flex-wrap gap-2 items-center">
                        {(job?.skills || []).map((skill, idx) => (
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJobClick(job);
                        }}
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
                    className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-[15px] ${currentPage === 1
                        ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200"
                        : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200 shadow-xs"
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
                    className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-[15px] ${currentPage === totalPages
                        ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200"
                        : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200 shadow-xs"
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

      {/* Job Application Modal (used when JobListing rendered standalone) */}
      {!onSelectJob && selectedJob && (
        <JobApplication job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </>
  );
}

export default JobListing;