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
  const jobsPerPage = 6;

  const allJobs = useMemo(
    () => [
      {
        id: 1,
        title: "Jr. Video Editor / Motion Graphic Designer",
        description:
          "Bring our brand stories to life through compelling video edits and motion graphics. Create engaging reels, promo videos, and campaign content for diverse clients.",
        location: "On-site",
        type: "Full-time Intern",
        role: "Jr. Video Editor / Motion Graphic Designer",
        department: "VISCOM",
        level: "Entry Level",
        skills: [
          "Adobe Premiere",
          "After Effects",
          "CapCut",
          "Motion Graphics",
          "Video Editing",
        ],
        requirements: [
          "Hands-on experience with Premiere Pro and After Effects",
          "Strong sense of pacing, storytelling, and visual rhythm",
          "Ability to work across multiple projects and deadlines",
        ],
      },
      {
        id: 7,
        title: "Videographer / Photographer",
        description:
          "Capture high-quality photo and video content for brand shoots, events, and ad campaigns. Collaborate on set to bring creative concepts to life with technical precision.",
        location: "On-site",
        type: "Full-time Intern",
        role: "Videographer / Photographer",
        department: "VISCOM",
        level: "Entry Level",
        skills: [
          "DSLR Camera",
          "Lightroom",
          "Photoshop",
          "Cinematography",
          "Photo Editing",
        ],
        requirements: [
          "Solid understanding of camera equipment, lighting, and composition",
          "Portfolio showcasing photography and/or videography work",
          "Willingness to travel for shoots when required",
        ],
      },
      {
        id: 2,
        title: "Lead Quality Executive",
        description:
          "Audit and verify the accuracy of leads generated through digital marketing campaigns. Identify low-quality data and maintain strict lead quality standards.",
        location: "Remote",
        type: "Full-time Intern",
        role: "Lead Quality Executive",
        department: "Quality",
        level: "Mid Level",
        skills: [
          "Lead Validation",
          "CRM Systems",
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
        id: 6,
        title: "Client Acquisition Executive",
        description:
          "Drive new business growth by identifying, pitching, and onboarding target clients. Build lasting brand relationships and expand our agency portfolio.",
        location: "On-site",
        type: "Full-time Intern",
        role: "Client Acquisition Executive",
        department: "Sales",
        level: "Entry Level",
        skills: [
          "Lead Generation",
          "Cold Outreach",
          "CRM Systems",
          "Sales Pitching",
          "Client Pitching",
        ],
        requirements: [
          "Strong communication and interpersonal skills",
          "Comfortable with cold outreach and client pitching",
          "Prior experience in sales or business development is a plus",
        ],
      },
      {
        id: 4,
        title: "SEO & Performance Marketing Analyst",
        description:
          "Lead search engine optimization strategies, conduct technical SEO audits, and optimize organic performance to drive scalable traffic, rankings, and lead growth.",
        location: "Hybrid",
        type: "Full-time Intern",
        role: "SEO & Performance Marketing Analyst",
        department: "Marketing",
        level: "Mid Level",
        skills: [
          "SEO Strategy",
          "Google Search",
          "Google Analytics",
          "Keyword Research",
          "SEM & Ads",
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
          "Manage social media channels, craft engaging campaign posts, analyze performance metrics, and stay ahead of emerging digital marketing trends for client growth.",
        location: "Hybrid",
        type: "Internship",
        role: "Social Media Executive",
        department: "Marketing",
        level: "Intern",
        skills: [
          "Meta Suite",
          "Canva Pro",
          "Content Planning",
          "Instagram Growth",
          "Social Strategy",
        ],
        requirements: [
          "Active understanding of social media platforms and trends",
          "Good written communication skills",
          "Duration: 6m to 1yr",
        ],
      },
      {
        id: 8,
        title: "Content Creator & Strategist",
        description:
          "Ideate and produce compelling content for brand channels, including short-form video scripts, caption copy, and creative campaign concepts.",
        location: "Hybrid",
        type: "Internship",
        role: "Content Creator & Strategist",
        department: "Marketing",
        level: "Intern",
        skills: [
          "Copywriting",
          "Canva Pro",
          "Content Strategy",
          "Storytelling",
          "Brand Marketing",
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
        (filters.type.toLowerCase() === "full-time intern" && job.type.toLowerCase().includes("full-time"));

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
          className={`h-9 w-9 rounded-xl font-black transition-all text-xs sm:text-sm flex items-center justify-center cursor-pointer ${
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
          {/* Centered Premium Section Header */}
          <div className="flex flex-col items-center justify-center mb-8 sm:mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Open <span className="text-[#E31D2E]">Opportunities</span>
            </h2>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-12 sm:py-16 bg-white/60 border border-neutral-200/80 rounded-2xl shadow-xs px-6">
              <div className="w-12 h-12 rounded-xl bg-[#E31D2E]/10 text-[#E31D2E] flex items-center justify-center mx-auto mb-4">
                <FiSearch className="w-6 h-6" />
              </div>
              <p className="text-[#111111] text-lg sm:text-xl font-bold mb-2">No jobs match your search.</p>
              <p className="text-neutral-500 text-sm sm:text-base font-normal max-w-md mx-auto mb-6">
                We couldn't find any positions matching your search criteria. Try searching for another keyword or clear your filters.
              </p>
              {onClearFilters && (
                <button
                  onClick={onClearFilters}
                  className="primary-btn px-6 py-3 rounded-xl font-bold text-xs sm:text-sm inline-flex items-center gap-2"
                >
                  <FiX className="w-4 h-4" />
                  <span>Clear Search & Filters</span>
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                {currentJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    id={`job-${job.id}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
                    whileHover={{ y: -6 }}
                    onClick={() => handleJobClick(job)}
                    className="group relative rounded-2xl bg-white border border-neutral-200/80 p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-black/20 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer box-border"
                  >
                    <div className="flex flex-col flex-1">
                      {/* 1. Header: Department Badge & Apply Action */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className="font-mono text-[10px] font-black text-[#111111] tracking-wider uppercase bg-neutral-100 px-2.5 py-1 rounded-lg border border-neutral-200/80">
                          {job.department}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleJobClick(job);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-[#E31D2E] text-white font-black text-[10px] uppercase tracking-wider flex items-center gap-1 shrink-0 shadow-2xs hover:bg-[#c91827] hover:scale-105 transition-all duration-300 cursor-pointer"
                          aria-label={`Apply for ${job.title}`}
                        >
                          <span>Apply</span>
                          <FiArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* 2. Job Title — Equalized Min Height */}
                      <h3 className="text-base sm:text-lg font-black text-[#111111] leading-snug tracking-tight mb-2.5 min-h-[3rem] flex items-center">
                        <span>{job.title}</span>
                      </h3>

                      {/* 3. Metadata Chips (Location, Type, Level) — Equalized Min Height */}
                      <div className="flex items-center gap-2 flex-wrap mb-3.5 min-h-[2rem]">
                        <div className="flex items-center gap-1 border border-neutral-200/80 bg-neutral-50 rounded-xl px-2.5 py-1 shadow-2xs shrink-0">
                          <FiMapPin className="text-neutral-500 w-3 h-3" />
                          <span className="text-neutral-700 font-bold text-[11px] whitespace-nowrap">
                            {job?.location || 'Remote'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 border border-neutral-200/80 bg-neutral-50 rounded-xl px-2.5 py-1 shadow-2xs shrink-0">
                          <FiClock className="text-neutral-500 w-3 h-3" />
                          <span className="text-neutral-700 font-bold text-[11px] whitespace-nowrap">
                            {job?.type === 'Full-time' ? 'Full-time Intern' : (job?.type || 'Full-time Intern')}
                          </span>
                        </div>
                        {job?.level && job.level !== 'Intern' && (
                          <div className="flex items-center gap-1 border border-neutral-200/80 bg-neutral-50 rounded-xl px-2.5 py-1 shadow-2xs shrink-0">
                            <FiBriefcase className="text-neutral-500 w-3 h-3" />
                            <span className="text-neutral-700 font-bold text-[11px] whitespace-nowrap">
                              {job.level}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* 4. Short Description */}
                      <div className="mb-4">
                        <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-medium">
                          {job.description}
                        </p>
                      </div>
                    </div>

                    {/* 5. Skill / Tech Stack Chips — Fixed Top Border Alignment */}
                    <div className="pt-3 border-t border-neutral-100 flex flex-wrap gap-1.5 items-center min-h-[4.25rem] content-start">
                      {(job?.skills || []).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700 text-[10px] font-bold tracking-wide border border-neutral-200/80 group-hover:bg-neutral-200 group-hover:text-[#111111] transition-colors duration-200"
                        >
                          {skill}
                        </span>
                      ))}
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
                    className={`px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-[15px] ${currentPage === 1
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
                    className={`px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-[15px] ${currentPage === totalPages
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