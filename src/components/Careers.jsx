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
        "Lead Quality Executive",
        "Jr. Video Editor / Motion Graphic Designer",
        "SEO Specialist",
        "Social Media Executive",
        "Client Acquisition Executive",
        "Videography/Photography",
        "Content Creator",
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
    <>
      <HeroLayout
        badge={
          <SectionBadge text="Careers @ Praskla Digital X" />
        }
        title={
          <h1 className="text-[#111111] text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-black leading-tight">
            Join us in creating <br />
            software that drives <br />
            <span className="text-[#E31D2E]">innovation</span>
          </h1>
        }
        description="Build high-impact digital experiences and grow with a team of strategic, creative, and engineering minds."
        actions={
          <div className="flex flex-col items-center lg:items-start gap-3.5 w-full">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full">
              <button
                onClick={scrollToJobs}
                className="primary-btn px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-wider text-white shadow-md shadow-red-500/20 inline-flex items-center gap-2"
                aria-label="Scroll to view open job positions"
              >
                <span>View Open Roles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 w-full max-w-xl">
              {[
                { icon: TrendingUp, text: "Fast Career Growth" },
                { icon: Globe, text: "Remote & Hybrid Flex" },
                { icon: Zap, text: "Creative Freedom" },
                { icon: Users, text: "Supportive Team Vibe" }
              ].map((perk, idx) => {
                const IconComponent = perk.icon;
                return (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200/90 bg-white/90 shadow-2xs text-[#111111] text-[11px] font-bold tracking-tight hover:border-black/20 transition-colors"
                  >
                    <IconComponent className="w-3.5 h-3.5 text-[#E31D2E]" />
                    <span>{perk.text}</span>
                  </span>
                );
              })}
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
        className="relative bg-transparent py-6 sm:py-8 lg:py-10 overflow-hidden"
        aria-label="Job search and filters"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 space-y-6 sm:space-y-8">
          {/* Section Heading Block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-3xl mx-auto space-y-2.5"
          >
            <div className="inline-block">
              <div className="border border-[#FF2B2B]/20 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full shadow-xs">
                <span className="font-bold text-xs uppercase tracking-widest text-[#FF2B2B]">
                  We're growing our team
                </span>
              </div>
            </div>
            <h2 className="text-[#111111] text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight">
              Find the position that fits your ambitions
            </h2>
          </motion.div>

          {/* Unified Single-Line Search & Popular Filters Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3 bg-white/70 backdrop-blur-md p-2 sm:p-2.5 rounded-3xl sm:rounded-full border border-neutral-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
          >
            {/* Compact Search Input (Left side) */}
            <div
              className={`relative flex items-center h-11 w-full lg:w-72 xl:w-80 rounded-full bg-white transition-all duration-300 shrink-0 ${
                isSearchFocused
                  ? "border-2 border-[#FF2B2B] shadow-sm scale-[1.01]"
                  : "border border-neutral-200/90 hover:border-neutral-300 shadow-2xs"
              }`}
            >
              <label htmlFor="job-search" className="sr-only">
                Search by role, skill or department
              </label>
              <div className="pl-4 text-[#FF2B2B] flex items-center justify-center">
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
                className="w-full h-full pl-2.5 pr-8 bg-transparent text-[#111111] placeholder:text-neutral-400 focus:outline-none text-xs sm:text-sm font-medium rounded-full"
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

            {/* Popular Search Chips (Right side - Single line!) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-1.5 px-2 w-full lg:w-auto">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold mr-1 shrink-0">
                Popular:
              </span>
              {quickSearchOptions.map((chip) => {
                const isActive = searchQuery.toLowerCase() === chip.toLowerCase();
                return (
                  <button
                    key={chip}
                    onClick={() => setSearchQuery(isActive ? "" : chip)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-[#E31D2E] text-white shadow-xs scale-105"
                        : "bg-white text-neutral-700 border border-neutral-200/80 hover:border-black/30 hover:bg-neutral-100 hover:text-[#111111] shadow-2xs"
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Premium Information Callout Banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-white via-white to-red-50/30 border border-neutral-200/80 p-4 sm:p-5 shadow-[0_8px_24px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group">
              <div className="flex items-center gap-3.5 flex-1 z-10">
                <div className="w-10 h-10 rounded-xl bg-[#E31D2E]/10 border border-[#E31D2E]/20 text-[#E31D2E] flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[#111111] text-base sm:text-lg font-black tracking-tight">
                    Can't find your perfect role?
                  </h3>
                  <p className="text-neutral-600 text-xs leading-relaxed font-medium">
                    Share your background with us, and our team will reach out when a suitable role opens.
                  </p>
                </div>
              </div>

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
                  className="w-full md:w-auto px-5 py-2.5 rounded-full font-bold text-xs border-2 border-[#E31D2E] text-[#E31D2E] bg-transparent hover:bg-[#E31D2E] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-2xs group/btn"
                  aria-label="Submit a general application"
                >
                  <span>Submit Application</span>
                  <FiExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
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