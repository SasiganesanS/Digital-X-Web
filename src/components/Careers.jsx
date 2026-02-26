import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";

// Component imports
import JobApplication from "./JobApplication";
import JobListing from "./JobListing";

// Vector illustration imports
import career01 from "../assets/Careers/career01.png";
import career02 from "../assets/Careers/career02.png";
import career03 from "../assets/Careers/career03.png";
import career04 from "../assets/Careers/career04.png";
import career05 from "../assets/Careers/career05.png";
import career06 from "../assets/Careers/career06.png";
import career07 from "../assets/Careers/career07.png";
import career08 from "../assets/Careers/career08.png";
import py from "../assets/py.jpg";

// Icon imports
import { FiSearch, FiChevronDown, FiExternalLink } from "react-icons/fi";

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openFilter, setOpenFilter] = useState(null);
  const [filters, setFilters] = useState({
    role: "",
    department: "",
    type: "",
    level: "",
    location: "",
  });

  // Ref for job search section
  const jobSearchRef = useRef(null);

  // Memoize filter options to prevent unnecessary re-renders
  const filterOptions = useMemo(
    () => ({
      role: ["Software Engineer"],
      department: ["Engineering"],
      type: ["Full-time", "Internship"],
      level: ["Intern", "Entry Level", "Mid Level"],
      location: ["On-site", "Hybrid"],
    }),
    []
  );

  // Memoize team members array to prevent re-creation on every render
  const teamMembers = useMemo(
    () => [
      { id: 1, image: career01, alt: "Software development illustration" },
      { id: 2, image: career02, alt: "Team collaboration illustration" },
      { id: 3, image: career03, alt: "Innovation and creativity illustration" },
      { id: 4, image: career04, alt: "Problem solving illustration" },
      { id: 5, image: py, alt: "Praskla Digital X logo" }, // center company logo
      { id: 6, image: career05, alt: "Code development illustration" },
      { id: 7, image: career06, alt: "Team meeting illustration" },
      { id: 8, image: career07, alt: "Project management illustration" },
      { id: 9, image: career08, alt: "Technology innovation illustration" },
    ],
    []
  );

  // Function to scroll to job listings
  const scrollToJobs = useCallback(() => {
    jobSearchRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const handleFilterChange = useCallback((filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
    setOpenFilter(null);
  }, []);

  const toggleFilter = useCallback(
    (filterName) => {
      setOpenFilter(openFilter === filterName ? null : filterName);
    },
    [openFilter]
  );

  const clearAllFilters = useCallback(() => {
    setSearchQuery("");
    setFilters({
      role: "",
      department: "",
      type: "",
      level: "",
      location: "",
    });
  }, []);

  const hasActiveFilters = useMemo(
    () => searchQuery || Object.values(filters).some((value) => value !== ""),
    [searchQuery, filters]
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openFilter && !event.target.closest(".filter-dropdown")) {
        setOpenFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openFilter]);

  return (
    <>
      <section
        className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a0b12] flex items-center justify-center px-4 sm:px-8 py-14 lg:py-18 pt-28 sm:pt-32 md:pt-36 lg:pt-32 pb-10 sm:pb-12 relative overflow-hidden dark-section"
        aria-label="Careers hero section"
      >
        <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-8 lg:gap-20">
          {/* Left Content */}
          <div className="z-10 w-full lg:max-w-xl text-center lg:text-left max-[1200px]:landscape:text-center max-[1200px]:landscape:max-w-2xl max-[1200px]:landscape:mx-auto min-[768px]:max-[1100px]:portrait:text-center min-[768px]:max-[1100px]:portrait:max-w-2xl min-[768px]:max-[1100px]:portrait:mx-auto">
            {/* Logo/Brand */}
            <div
              className="flex items-center justify-center lg:justify-start max-[1200px]:landscape:justify-center min-[768px]:max-[1100px]:portrait:justify-center gap-3 mb-4 sm:mb-5 md:mb-6 lg:mt-8"
              role="banner"
            >
              <div className="grid grid-cols-3 gap-1" aria-hidden="true">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-sm"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-sm"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-sm"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-sm"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-sm"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-sm"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-sm"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-sm"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-sm"></div>
              </div>
              <span className="text-white text-base sm:text-lg md:text-xl font-light">
                Careers @ Praskla Digital X
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-white text-[24px] sm:text-[28px] md:text-[36px] lg:text-[48px] font-bold leading-tight mb-4 sm:mb-5 md:mb-6 lg:mb-8">
              Join us in creating
              <br />
              software that drives
              <br />
              innovation
            </h1>

            {/* CTA Button */}
            <button
              onClick={scrollToJobs}
              className="bg-[#E8192C] text-white px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-full text-xs sm:text-sm md:text-[15px] lg:text-base font-medium 
                       hover:bg-[#C0141C] transition-all duration-300 ease-out border-2 border-transparent hover:border-[#C0141C]"
              style={{ boxShadow: "0 6px 20px rgba(232, 25, 44, 0.2)" }}
              aria-label="Scroll to view open job positions"
            >
              View Open Roles
            </button>
          </div>

          {/* Right Side - Team Illustrations Grid */}
          <div
            className="relative w-full lg:w-1/2 flex justify-center"
            aria-label="Team culture illustrations"
          >
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-8 w-full max-w-[280px] sm:max-w-[320px] md:max-w-sm lg:max-w-xl mx-auto items-center justify-items-center max-[1200px]:landscape:flex max-[1200px]:landscape:justify-center max-[1200px]:landscape:max-w-md min-[768px]:max-[1100px]:portrait:flex min-[768px]:max-[1100px]:portrait:justify-center min-[768px]:max-[1100px]:portrait:max-w-md">
              {teamMembers.map((member, index) => {
                const isCenter = index === 4;
                // Hide all circles except center (index 4) on landscape iPad and portrait iPad Pro
                const hideOnTablet = index !== 4;
                // Use a whitish, professional background for illustration circles. Center remains white for logo.
                // Increase opacity for non-center circles so darker vectors remain clearly visible on the dark hero.
                const bgColor = isCenter
                  ? "bg-white"
                  : "bg-white/30 ring-1 ring-white/30 shadow-sm";

                return (
                  <div
                    key={member.id}
                    className={`w-16 h-16 sm:w-[72px] sm:h-[72px] md:w-24 md:h-24 lg:w-40 lg:h-40 rounded-full ${bgColor} flex items-center justify-center overflow-hidden backdrop-blur-sm
                            hover:scale-105 hover:shadow-xl
                            transition-all duration-300 ease-out
                            cursor-pointer ${hideOnTablet ? 'max-[1200px]:landscape:hidden min-[768px]:max-[1100px]:portrait:hidden' : 'max-[1200px]:landscape:!w-48 max-[1200px]:landscape:!h-48 min-[768px]:max-[1100px]:portrait:!w-48 min-[768px]:max-[1100px]:portrait:!h-48'}`}
                  >
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.alt}
                        className="w-10/12 h-10/12 object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-center">
                        {isCenter ? (
                          <svg
                            viewBox="0 0 100 100"
                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-24 lg:h-24"
                          >
                            <path
                              d="M30 50 Q50 30 70 50 Q50 70 30 50 M50 30 Q70 50 50 70 Q30 50 50 30"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              className="text-[#E8192C]"
                            />
                          </svg>
                        ) : (
                          <>
                            <div className="text-white text-xs sm:text-sm lg:text-lg font-medium">
                              Employee
                            </div>
                            <div className="text-white text-xs sm:text-sm lg:text-lg font-medium">
                              Image
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Job search section */}
      <section
        ref={jobSearchRef}
        className="bg-[#080808] py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8"
        aria-label="Job search and filters"
      >
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <div className="inline-block mb-4 sm:mb-6">
            <div className="border-2 border-[#E8192C] rounded-full px-5 sm:px-6 py-2.5 sm:py-3">
              <span
                className="font-semibold text-sm sm:text-base lg:text-lg"
                style={{ color: "rgba(232, 25, 44, 0.7)" }}
              >
                We're growing our team
              </span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-white text-[32px] sm:text-[40px] lg:text-[48px] font-bold mb-6 sm:mb-8 max-w-3xl leading-tight">
            Find the position that fits your ambitions
          </h2>

          {/* Search and Filters */}
          <div className="space-y-4 mb-6 sm:mb-8">
            {/* Search Bar */}
            <div className="relative w-full">
              <label htmlFor="job-search" className="sr-only">
                Search for jobs
              </label>
              <input
                id="job-search"
                type="search"
                placeholder="Search for positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 sm:px-6 py-3.5 sm:py-4 bg-[#111111] border-2 border-[#2A2A2A] rounded-full text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E8192C] focus:border-[#E8192C] text-sm sm:text-[15px] lg:text-base transition-all"
                aria-label="Search for job positions"
              />
              <FiSearch
                className="absolute right-5 sm:right-6 top-1/2 transform -translate-y-1/2 text-[#E8192C] w-5 h-5 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Filter Dropdowns - Grid Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {Object.keys(filterOptions).map((filterName) => (
                <div key={filterName} className="relative filter-dropdown">
                  <button
                    onClick={() => toggleFilter(filterName)}
                    className="w-full bg-[#111111] border border-[#2A2A2A] text-white px-4 sm:px-5 py-3 sm:py-3.5 rounded-full font-medium hover:bg-[#E8192C]/80 active:bg-[#C0141C] transition-colors flex items-center gap-2 capitalize justify-between text-sm sm:text-[15px] lg:text-base"
                    style={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)" }}
                    aria-expanded={openFilter === filterName}
                    aria-haspopup="listbox"
                    aria-label={`Filter by ${filterName}`}
                  >
                    <span className="truncate text-left">
                      {filters[filterName] || filterName}
                    </span>
                    <FiChevronDown
                      className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${openFilter === filterName ? "rotate-180" : ""
                        }`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {openFilter === filterName && (
                    <div
                      className="absolute top-full mt-2 left-0 right-0 bg-[#111111] border-2 border-[#2A2A2A] rounded-2xl shadow-2xl z-50 min-w-full overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                      role="listbox"
                      aria-label={`${filterName} filter options`}
                    >
                      <div className="py-2 max-h-64 overflow-y-auto">
                        {/* Clear option */}
                        <button
                          onClick={() => handleFilterChange(filterName, "")}
                          className="w-full px-4 sm:px-5 py-2.5 text-left hover:bg-white/5 active:bg-white/10 transition-colors text-white/70 font-medium text-sm sm:text-[15px] lg:text-base"
                        >
                          All {filterName}s
                        </button>
                        {filterOptions[filterName].map((option) => (
                          <button
                            key={option}
                            onClick={() =>
                              handleFilterChange(filterName, option)
                            }
                            className={`w-full px-4 sm:px-5 py-2.5 text-left hover:bg-white/5 active:bg-white/10 transition-colors text-sm sm:text-[15px] lg:text-base ${filters[filterName] === option
                              ? "bg-red-500/10 text-[#E8192C] font-semibold"
                              : "text-white/70 font-medium"
                              }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Show All Button*/}
          {hasActiveFilters && (
            <div className="mb-6 sm:mb-8">
              <button
                onClick={clearAllFilters}
                className="bg-white/10 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-white/20 active:bg-white/30 transition-colors text-sm sm:text-[15px] lg:text-base border border-white/10"
                aria-label="Clear all filters and show all jobs"
              >
                Clear Filters & Show All Jobs
              </button>
            </div>
          )}

          {/* Info Box */}
          <div className="border border-red-500/20 bg-red-500/5 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
              <div className="flex-1">
                <p className="text-white/70 text-sm sm:text-[15px] lg:text-base leading-relaxed">
                  Don't see a role that matches your expertise? We're always
                  seeking exceptional talent with unique perspectives.
                  <span className="font-semibold text-white">
                    {" "}
                    Share your background and interests with us
                  </span>
                  , and our team will reach out if there's a potential fit.
                </p>
              </div>
              <button
                onClick={() =>
                  setSelectedJob({
                    title: "General Application",
                    description:
                      "Apply for future opportunities at Praskla Technology",
                    requirements: ["Share your skills and experience with us"],
                    skills: [],
                  })
                }
                className="flex items-center gap-2 text-[#E8192C] font-semibold whitespace-nowrap hover:text-[#C0141C] active:text-[#E8192C] transition-colors text-sm sm:text-[15px] lg:text-base group"
                aria-label="Submit a general application"
              >
                Submit Application
                <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <JobListing searchQuery={searchQuery} filters={filters} />

      {/* General Application Modal */}
      {selectedJob && (
        <JobApplication
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </>
  );
};

export default Careers;
