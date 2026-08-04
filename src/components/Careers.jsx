import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import HeroLayout from "./common/HeroLayout";

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
import {
  FiSearch,
  FiChevronDown,
  FiExternalLink,
  FiBriefcase,
  FiLayers,
  FiClock,
  FiTrendingUp,
  FiMapPin,
  FiX,
  FiFilter,
} from "react-icons/fi";
import { Sparkles } from "lucide-react";

import CareersImageGrid from "./CareersImageGrid";

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openFilter, setOpenFilter] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filters, setFilters] = useState({
    role: "",
    department: "",
    type: "",
    level: "",
    location: "",
  });

  // Ref for job search section
  const jobSearchRef = useRef(null);

  // Quick search suggestion chips
  const quickSearchOptions = useMemo(
    () => [
      "UI/UX",
      "Marketing",
      "React",
      "SEO",
      "Video Editing",
      "Branding",
      "Content Creation",
      "Photography",
    ],
    []
  );

  // Memoize filter options to prevent unnecessary re-renders
  const filterOptions = useMemo(
    () => ({
      role: [
        "React / Frontend Developer",
        "UI/UX Designer",
        "Jr. Video Editor / Motion Graphic Designer",
        "SEO Specialist",
        "Social Media Executive",
        "Client Acquisition Executive",
        "Videography/Photography",
        "Content Creator",
      ],
      department: ["Engineering", "Design", "Marketing", "VISCOM", "Sales"],
      type: ["Full-time", "Internship", "Part-time", "Contract"],
      level: ["Intern", "Entry Level", "Mid Level", "Senior Level"],
      location: ["Remote", "Hybrid", "On-site"],
    }),
    []
  );

  // Keyboard accessibility: close dropdowns and modals on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpenFilter(null);
        setSelectedJob(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
      <HeroLayout
        badge={
          <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E31D2E]/20 bg-white/60 shadow-[0_8px_16px_rgba(17,17,17,0.03)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31D2E]" />
            </span>
            <span className="relative text-[#111111] text-xs font-bold tracking-[0.25em] uppercase">Careers @ Praskla Digital X</span>
          </div>
        }
        title={
          <h1 className="text-[#111111] text-[36px] sm:text-[44px] lg:text-[52px] font-black leading-tight">
            Join us in creating <br />
            software that drives <br />
            <span className="text-[#E31D2E]">innovation</span>
          </h1>
        }
        description="Build high-impact digital experiences and grow with a team of strategic, creative, and engineering minds."
        actions={
          <div className="flex justify-center lg:justify-start w-full">
            <button
              onClick={scrollToJobs}
              className="primary-btn px-8 py-4 rounded-full font-bold text-sm sm:text-base"
              aria-label="Scroll to view open job positions"
            >
              View Open Roles
            </button>
          </div>
        }
        media={
          <div
            className="relative w-full flex justify-center"
            aria-label="Team culture illustrations"
          >
            <CareersImageGrid teamMembers={teamMembers} />
          </div>
        }
      />

      {/* Job search section */}
      <section
        ref={jobSearchRef}
        className="relative bg-transparent py-12 sm:py-14 lg:py-16 overflow-hidden"
        aria-label="Job search and filters"
      >
        {/* Soft background ambient radial gradients & blurred circles */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 space-y-10 sm:space-y-12">
          {/* Section Heading Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <div className="inline-block">
              <div className="border border-[#FF2B2B]/20 bg-white/70 backdrop-blur-md px-5 py-2 rounded-full shadow-xs">
                <span className="font-bold text-xs sm:text-sm uppercase tracking-widest text-[#FF2B2B]">
                  We're growing our team
                </span>
              </div>
            </div>
            <h2 className="text-[#111111] text-[32px] sm:text-[44px] lg:text-[50px] font-black leading-tight tracking-tight">
              Find the position that fits your ambitions
            </h2>
          </motion.div>

          {/* Search Bar Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative w-full max-w-4xl mx-auto space-y-4"
          >
            {/* Primary Focal Point Search Bar */}
            <div
              className={`relative flex items-center h-[72px] w-full rounded-full bg-white transition-all duration-300 ${isSearchFocused
                  ? "border-2 border-[#FF2B2B] shadow-[0_4px_20px_rgba(0,0,0,0.08)] scale-[1.01]"
                  : "border border-neutral-200/80 hover:border-neutral-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.03),_0_12px_32px_rgba(0,0,0,0.05)]"
                }`}
            >
              <label htmlFor="job-search" className="sr-only">
                Search by role, skill or department
              </label>
              <div className="pl-6 text-[#FF2B2B] flex items-center justify-center">
                <FiSearch className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" />
              </div>
              <input
                id="job-search"
                type="search"
                placeholder="Search by role, skill or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full h-full px-4 bg-transparent text-[#111111] placeholder:text-neutral-400 focus:outline-none text-base sm:text-lg font-medium rounded-full"
                aria-label="Search for job positions"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="pr-6 text-neutral-400 hover:text-[#111111] transition-colors"
                  aria-label="Clear search input"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Quick Search Chips */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-2"
            >
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold mr-1">
                Popular:
              </span>
              {quickSearchOptions.map((chip) => {
                const isActive = searchQuery.toLowerCase() === chip.toLowerCase();
                return (
                  <motion.button
                    key={chip}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      show: { opacity: 1, y: 0 },
                    }}
                    onClick={() =>
                      setSearchQuery(isActive ? "" : chip)
                    }
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${isActive
                        ? "bg-[#E31D2E] text-white shadow-md shadow-[#E31D2E]/25 scale-105"
                        : "bg-white text-neutral-700 border border-neutral-200/80 hover:-translate-y-1 hover:border-[#E31D2E] hover:bg-[#E31D2E]/5 hover:text-[#E31D2E] shadow-xs"
                      }`}
                  >
                    {chip}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Unified Filter Bar Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-xl border border-white/80 rounded-[28px] p-3.5 sm:p-4 shadow-[0_16px_40px_rgba(0,0,0,0.04)]">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
                {Object.keys(filterOptions).map((filterName) => {
                  const icons = {
                    role: FiBriefcase,
                    department: FiLayers,
                    type: FiClock,
                    level: FiTrendingUp,
                    location: FiMapPin,
                  };
                  const FilterIcon = icons[filterName] || FiFilter;
                  const selectedVal = filters[filterName];

                  return (
                    <div key={filterName} className="relative filter-dropdown">
                      <button
                        onClick={() => toggleFilter(filterName)}
                        className={`w-full h-12 px-4 rounded-full font-bold flex items-center justify-between gap-2 text-xs sm:text-sm transition-all duration-200 ${selectedVal
                            ? "bg-[#E31D2E]/10 text-[#E31D2E] border border-[#E31D2E]/30 shadow-xs"
                            : "bg-white text-neutral-700 border border-neutral-200/80 hover:-translate-y-0.5 hover:border-[#E31D2E]/40 hover:shadow-sm"
                          }`}
                        aria-expanded={openFilter === filterName}
                        aria-haspopup="listbox"
                        aria-label={`Filter by ${filterName}`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <FilterIcon
                            className={`w-3.5 h-3.5 flex-shrink-0 ${selectedVal ? "text-[#E31D2E]" : "text-neutral-400"
                              }`}
                          />
                          <span className="truncate text-left font-bold capitalize">
                            {selectedVal || filterName}
                          </span>
                        </div>
                        <FiChevronDown
                          className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${openFilter === filterName
                              ? "rotate-180 text-[#E31D2E]"
                              : "text-neutral-400"
                            }`}
                          aria-hidden="true"
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {openFilter === filterName && (
                        <div
                          className="absolute top-full mt-2 left-0 right-0 bg-white/95 backdrop-blur-md border border-neutral-200/80 rounded-2xl shadow-xl z-50 min-w-[200px] overflow-hidden p-1.5"
                          role="listbox"
                          aria-label={`${filterName} filter options`}
                        >
                          <div className="py-1 max-h-60 overflow-y-auto">
                            <button
                              onClick={() => handleFilterChange(filterName, "")}
                              className={`w-full px-3.5 py-2.5 text-left rounded-xl transition-colors font-bold text-xs flex items-center justify-between ${!selectedVal
                                  ? "bg-[#E31D2E]/10 text-[#E31D2E]"
                                  : "hover:bg-neutral-50 text-neutral-500"
                                }`}
                            >
                              <span>All {filterName}s</span>
                            </button>
                            {filterOptions[filterName].map((option) => (
                              <button
                                key={option}
                                onClick={() =>
                                  handleFilterChange(filterName, option)
                                }
                                className={`w-full px-3.5 py-2.5 text-left rounded-xl transition-colors text-xs font-semibold ${selectedVal === option
                                    ? "bg-[#E31D2E] text-white font-bold"
                                    : "hover:bg-neutral-50 text-neutral-700"
                                  }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Clear active filters button */}
              {hasActiveFilters && (
                <div className="mt-3 pt-3 border-t border-neutral-100 flex justify-center">
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-bold text-[#E31D2E] hover:text-[#111111] flex items-center gap-1.5 py-1 px-3.5 rounded-full hover:bg-neutral-100 transition-all"
                    aria-label="Clear all active filters"
                  >
                    <FiX className="w-3.5 h-3.5" />
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Premium Information Callout Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-white via-white to-red-50/30 border border-neutral-200/80 p-6 sm:p-8 md:p-10 shadow-[0_12px_36px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 group">
              {/* Soft decorative background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E31D2E]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#E31D2E]/10 transition-all duration-500" />

              {/* Left Side: Icon + Headline + Subtext */}
              <div className="flex items-start gap-4 sm:gap-6 flex-1 z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#E31D2E]/10 border border-[#E31D2E]/20 text-[#E31D2E] flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-[#111111] text-lg sm:text-xl md:text-2xl font-black tracking-tight">
                    Can't find your perfect role?
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-medium max-w-xl">
                    We're always seeking exceptional talent with unique perspectives. Share your background and interests with us, and our team will reach out if there's a potential fit.
                  </p>
                </div>
              </div>

              {/* Right Side: Outlined Button with Arrow */}
              <div className="z-10 w-full md:w-auto flex-shrink-0">
                <button
                  onClick={() =>
                    setSelectedJob({
                      title: "General Application",
                      description:
                        "Apply for future opportunities at Praskla Technology",
                      requirements: [
                        "Share your skills and experience with us",
                      ],
                      skills: [],
                    })
                  }
                  className="w-full md:w-auto px-7 py-4 rounded-full font-bold text-sm sm:text-base border-2 border-[#E31D2E] text-[#E31D2E] bg-transparent hover:bg-[#E31D2E] hover:text-white transition-all duration-300 flex items-center justify-center gap-2.5 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-[#E31D2E]/20 group/btn"
                  aria-label="Submit a general application"
                >
                  <span>Submit Application</span>
                  <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <JobListing
        searchQuery={searchQuery}
        filters={filters}
        onSelectJob={(job) => setSelectedJob(job)}
        onClearFilters={clearAllFilters}
      />

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