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
import py from "../assets/Praskla_Digital_X_Logo_Trasnparent_Background.png";

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
      role: [
        "Jr. Video Editor/ Motion Graphic Designer",
        "Client Acquisition Executive",
        "SEO Specialist",
        "Videography/Photography",
        "Social Media Executive",
        "Content Creator",
      ],
      department: ["VISCOM"],
      type: ["Full-time", "Internship"],
      level: ["Intern", "Entry Level", "Mid Level"],
      location: ["On-site", "Hybrid"],
    }),
    []
  );

  // Memoize team members array to prevent re-creation on every render
  const teamMembers = useMemo(
    () => [
      { id: 1, image: career01, alt: "Our Work" },
      { id: 2, image: career02, alt: "Our Work" },
      { id: 3, image: career03, alt: "Our Work" },
      { id: 4, image: career04, alt: "Our Work" },
      { id: 5, image: py, alt: "Praskla Digital X logo" }, // center company logo
      { id: 6, image: career05, alt: "Our Work" },
      { id: 7, image: career06, alt: "Our Work" },
      { id: 8, image: career07, alt: "Our Work" },
      { id: 9, image: career08, alt: "Our Work" },
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
        className="h-screen min-h-[100vh] max-h-[100vh] w-full overflow-x-hidden bg-transparent flex items-center justify-center px-4 sm:px-8 overflow-hidden"
        aria-label="Careers hero section"
      >
        <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-8 lg:gap-20">
          {/* Left Content */}
          <div className="z-10 w-full px-6 sm:px-0 lg:max-w-xl text-center lg:text-left max-[1200px]:landscape:text-center max-[1200px]:landscape:max-w-2xl max-[1200px]:landscape:mx-auto min-[768px]:max-[1100px]:portrait:text-center min-[768px]:max-[1100px]:portrait:max-w-2xl min-[768px]:max-[1100px]:portrait:mx-auto">
            {/* Logo/Brand */}
            <div
              className="flex items-center justify-center lg:justify-start max-[1200px]:landscape:justify-center min-[768px]:max-[1100px]:portrait:justify-center gap-3 mb-6"
              role="banner"
            >
              <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E31D2E]/20 bg-white/60 shadow-[0_8px_16px_rgba(17,17,17,0.03)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31D2E]" />
                </span>
                <span className="relative text-[#111111] text-xs font-bold tracking-[0.25em] uppercase">Careers @ Praskla Digital X</span>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-[#111111] text-[36px] sm:text-[44px] lg:text-[56px] font-black leading-tight mb-8">
              Join us in creating
              <br />
              software that drives
              <br />
              <span className="text-[#E31D2E]">innovation</span>
            </h1>

            {/* CTA Button */}
            <button
              onClick={scrollToJobs}
              className="primary-btn px-8 py-4 rounded-full font-bold text-sm sm:text-base"
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
                const hideOnTablet = index !== 4;
                const bgColor = isCenter
                  ? "bg-white border border-gray-100 shadow-sm"
                  : "bg-white/60 border border-white/80 shadow-md";

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
                        className={
                          isCenter
                            ? "w-8/12 h-8/12 object-contain"
                            : "w-full h-full object-cover rounded-full"
                        }
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
                              className="text-[#E31D2E]"
                            />
                          </svg>
                        ) : (
                          <>
                            <div className="text-[#111111] text-xs sm:text-sm lg:text-lg font-medium">
                              Employee
                            </div>
                            <div className="text-[#111111] text-xs sm:text-sm lg:text-lg font-medium">
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
        className="bg-transparent py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 mt-[100px]"
        aria-label="Job search and filters"
      >
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <div className="inline-block mb-6">
            <div className="border border-[#E31D2E]/20 bg-white/60 px-5 py-2.5 rounded-full shadow-sm">
              <span className="font-bold text-xs sm:text-sm uppercase tracking-wider text-[#E31D2E]">
                We're growing our team
              </span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-[#111111] text-[32px] sm:text-[40px] lg:text-[48px] font-black mb-6 sm:mb-8 max-w-3xl leading-tight">
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
                className="w-full px-6 py-4 bg-white/50 border border-white/80 rounded-full text-[#111111] placeholder:text-[#8B8B8B] focus:ring-2 focus:ring-[#E31D2E]/20 focus:border-[#E31D2E]/40 outline-none text-sm sm:text-[15px] lg:text-base transition-all shadow-sm"
                aria-label="Search for job positions"
              />
              <FiSearch
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#E31D2E] w-5 h-5 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Filter Dropdowns - Grid Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {Object.keys(filterOptions).map((filterName) => (
                <div key={filterName} className="relative filter-dropdown">
                  <button
                    onClick={() => toggleFilter(filterName)}
                    className="w-full bg-white/50 border border-white/80 text-[#111111] px-5 py-3 rounded-full font-bold hover:bg-white/80 active:bg-gray-100 transition-colors flex items-center gap-2 capitalize justify-between text-sm sm:text-[15px] lg:text-base shadow-sm"
                    aria-expanded={openFilter === filterName}
                    aria-haspopup="listbox"
                    aria-label={`Filter by ${filterName}`}
                  >
                    <span className="truncate text-left font-semibold">
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
                      className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 min-w-full overflow-hidden p-1"
                      role="listbox"
                      aria-label={`${filterName} filter options`}
                    >
                      <div className="py-1 max-h-64 overflow-y-auto">
                        {/* Clear option */}
                        <button
                          onClick={() => handleFilterChange(filterName, "")}
                          className="w-full px-4 py-2.5 text-left rounded-xl hover:bg-gray-50 transition-colors text-[#575757] font-semibold text-xs sm:text-sm"
                        >
                          All {filterName}s
                        </button>
                        {filterOptions[filterName].map((option) => (
                          <button
                            key={option}
                            onClick={() =>
                              handleFilterChange(filterName, option)
                            }
                            className={`w-full px-4 py-2.5 text-left rounded-xl hover:bg-gray-50 transition-colors text-xs sm:text-sm ${filters[filterName] === option
                              ? "bg-[#E31D2E]/10 text-[#E31D2E] font-bold"
                              : "text-[#575757] font-semibold"
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
                className="bg-[#E31D2E]/10 text-[#E31D2E] px-6 py-3 rounded-full font-bold hover:bg-[#111111] hover:text-white transition-all text-xs sm:text-sm border border-[#E31D2E]/20 shadow-sm"
                aria-label="Clear all filters and show all jobs"
              >
                Clear Filters & Show All Jobs
              </button>
            </div>
          )}

          {/* Info Box */}
          <div className="clay-card p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <p className="text-[#575757] text-sm sm:text-base leading-relaxed font-medium">
                Don't see a role that matches your expertise? We're always
                seeking exceptional talent with unique perspectives.
                <span className="font-black text-[#111111]">
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
              className="flex items-center gap-2 text-[#E31D2E] font-bold whitespace-nowrap hover:text-[#111111] transition-colors text-xs sm:text-sm uppercase tracking-wider group"
              aria-label="Submit a general application"
            >
              Submit Application
              <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
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