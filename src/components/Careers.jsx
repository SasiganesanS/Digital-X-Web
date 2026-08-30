import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Globe, Zap, Users } from "lucide-react";
import HeroLayout from "./common/HeroLayout";

// Component imports
import JobApplication from "./JobApplication";
import JobListing from "./JobListing";

// Vector illustration imports
import career01 from "../assets/Careers/career01.webp";
import career02 from "../assets/Careers/career02.webp";
import career03 from "../assets/Careers/career03.webp";
import career04 from "../assets/Careers/career04.webp";
import career05 from "../assets/Careers/career05.webp";
import career06 from "../assets/Careers/career06.webp";
import career07 from "../assets/Careers/career07.webp";

import career08 from "../assets/Careers/career08.webp";
import py from "../assets/Praskla_Digital_X_Logo_Trasnparent_Background.webp";

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

import CareersImageGrid from "./CareersImageGrid";
import SectionBadge from "./common/SectionBadge";
import CareersSpaceBackground from "./CareersSpaceBackground";

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
      "Marketing",
      "SEO",
      "Video Editing",
      "Branding",
      "Content Creation",
      "Photography",
      "Lead Quality",
    ],
    []
  );

  // Memoize filter options to prevent unnecessary re-renders
  const filterOptions = useMemo(
    () => ({
      role: [
        "Jr. Video Editor / Motion Graphic Designer",
        "Videographer / Photographer",
        "Lead Quality Executive",
        "Client Acquisition Executive",
        "SEO & Performance Marketing Analyst",
        "Social Media Executive",
        "Content Creator & Strategist",
      ],
      department: ["Engineering", "Design", "Marketing", "VISCOM", "Sales", "Quality"],
      type: ["Full-time Intern", "Internship", "Part-time", "Contract"],
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
    <div className="relative w-full overflow-hidden bg-[#050609]">
      {/* Careers-scoped Continuous Parallax Venus Space Environment */}
      <CareersSpaceBackground />

      {/* Main Careers Content Sections */}
      <div className="relative z-10 w-full">
        <HeroLayout
          sectionId="careers-hero"
          badge={
            <SectionBadge text="Careers" theme="dark" />
          }
          title={
            <h1 className="text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] font-black leading-[1.08] sm:leading-[1.1] tracking-[-0.035em] text-white font-sans mb-5 sm:mb-6 max-w-2xl">
              Join us in driving marketing strategies that power{" "}
              <span className="text-[#E31D2E]">brand growth</span>
            </h1>
          }
          description={
            <p className="hero-description text-neutral-300 text-base sm:text-lg lg:text-[19px] font-normal leading-[1.6] font-sans max-w-2xl mb-7 sm:mb-8">
              Craft high-impact digital campaigns, elevate brands, and grow alongside a team of strategic, creative, and performance marketing minds.
            </p>
          }
        actions={
          <div className="flex flex-col items-center lg:items-start gap-3.5 w-full">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full">
              <button
                onClick={scrollToJobs}
                className="primary-btn px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider text-white shadow-md shadow-red-500/20 inline-flex items-center gap-2"
                aria-label="Scroll to view open job positions"
              >
                <span>View Open Roles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
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
        className="relative bg-transparent py-4 sm:py-6 overflow-hidden"
        aria-label="Job search and filters"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="clay-card bg-white p-5 sm:p-7 lg:p-8 rounded-2xl border border-white/90 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center text-[#111111]"
          >
            {/* Left Column: Badge, Heading, and Search Bar */}
            <div className="lg:col-span-6 flex flex-col space-y-3">
              <div className="inline-flex">
                <div className="border border-neutral-200/80 bg-neutral-100 px-3.5 py-1 rounded-xl shadow-2xs">
                  <span className="font-bold text-[11px] uppercase tracking-widest text-[#111111]">
                    We're growing our team
                  </span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight tracking-[-0.025em] text-[#111111] font-sans">
                Find the position that fits your ambitions
              </h2>

              {/* Compact Search Input */}
              <div
                className={`relative flex items-center h-11 w-full rounded-xl bg-white transition-all duration-300 ${
                  isSearchFocused
                    ? "border-2 border-[#E31D2E] shadow-sm scale-[1.005]"
                    : "border border-neutral-200/90 hover:border-neutral-300 shadow-2xs"
                }`}
              >
                <label htmlFor="job-search" className="sr-only">
                  Search by role, skill or department
                </label>
                <div className="pl-4 text-[#E31D2E] flex items-center justify-center">
                  <FiSearch className="w-4 h-4 flex-shrink-0" />
                </div>
                <input
                  id="job-search"
                  type="search"
                  placeholder="Search roles or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full h-full pl-2.5 pr-8 bg-transparent text-[#111111] placeholder:text-neutral-400 focus:outline-none text-xs sm:text-sm font-medium rounded-xl"
                  aria-label="Search for job positions"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 text-neutral-400 hover:text-[#111111] transition-colors"
                    aria-label="Clear search input"
                  >
                    <FiX className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Quick Tags and Callout Banner */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-3.5 lg:border-l lg:border-neutral-200/60 lg:pl-8">
              {/* Popular Search Chips */}
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">
                  Popular Searches:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {quickSearchOptions.map((chip) => {
                    const isActive = searchQuery.toLowerCase() === chip.toLowerCase();
                    return (
                      <button
                        key={chip}
                        onClick={() => setSearchQuery(isActive ? "" : chip)}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all duration-200 ${
                          isActive
                            ? "bg-[#E31D2E] text-white shadow-xs"
                            : "bg-white text-neutral-700 border border-neutral-200/80 hover:border-black/30 hover:bg-neutral-100 hover:text-[#111111] shadow-2xs"
                        }`}
                      >
                        {chip}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Compact Callout Banner */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-50/90 via-white to-red-50/40 border border-neutral-200/80 p-3 sm:p-3.5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group">
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-neutral-100 border border-neutral-200 text-[#111111] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[#111111] text-xs sm:text-sm font-black tracking-tight">
                      Can't find your perfect role?
                    </h3>
                    <p className="text-neutral-500 text-[11px] leading-tight font-medium">
                      Submit your profile and we'll reach out when a role opens.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setSelectedJob({
                      title: "General Application",
                      description:
                        "Apply for future opportunities at PRASKLA DIGITAL X",
                      requirements: [
                        "Share your skills and experience with us",
                      ],
                      skills: [],
                    })
                  }
                  className="w-full sm:w-auto shrink-0 px-3.5 py-1.5 rounded-xl font-bold text-[11px] sm:text-xs border border-[#E31D2E] text-[#E31D2E] bg-white hover:bg-[#E31D2E] hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 shadow-2xs group/btn"
                  aria-label="Submit a general application"
                >
                  <span className="whitespace-nowrap">Submit Application</span>
                  <FiExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
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
      </div>
    </div>
  );
};

export default Careers;