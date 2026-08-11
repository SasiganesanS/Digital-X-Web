import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Briefcase,
  FolderGit2,
  Users,
  Sparkles,
  Mail,
  ShieldCheck,
  FileText,
  Globe,
  ChevronRight
} from "lucide-react";
import { performSearch } from "../data/searchIndex";

/**
 * Escapes regex special characters
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Highlight search terms in text with subtle red accent
 */
function HighlightedText({ text = "", query = "" }) {
  if (!text) return null;
  if (!query || !query.trim()) return <span>{text}</span>;

  const q = query.trim();
  const regex = new RegExp(`(${escapeRegExp(q)})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, idx) => {
        const isMatch = part.toLowerCase() === q.toLowerCase();
        return isMatch ? (
          <mark
            key={idx}
            className="bg-[#E31D2E]/10 text-[#E31D2E] font-semibold px-0.5 rounded"
          >
            {part}
          </mark>
        ) : (
          <span key={idx}>{part}</span>
        );
      })}
    </span>
  );
}

/**
 * Category Icon Helper
 */
function getCategoryIcon(category = "") {
  const cat = category.toUpperCase();
  if (cat.includes("SERVICE")) return <Briefcase className="w-4 h-4 text-[#E31D2E]" />;
  if (cat.includes("PROJECT")) return <FolderGit2 className="w-4 h-4 text-[#E31D2E]" />;
  if (cat.includes("CAREER")) return <Sparkles className="w-4 h-4 text-[#E31D2E]" />;
  if (cat.includes("TEAM")) return <Users className="w-4 h-4 text-[#E31D2E]" />;
  if (cat.includes("CONTACT")) return <Mail className="w-4 h-4 text-[#E31D2E]" />;
  if (cat.includes("LEGAL")) return <ShieldCheck className="w-4 h-4 text-[#E31D2E]" />;
  if (cat.includes("BLOG")) return <FileText className="w-4 h-4 text-[#E31D2E]" />;
  return <Globe className="w-4 h-4 text-[#E31D2E]" />;
}

const SearchOverlay = ({ isOpen, onClose, setShowContactForm }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsContainerRef = useRef(null);
  const itemRefs = useRef([]);
  const navigate = useNavigate();

  // Perform search when query changes
  const results = useMemo(() => {
    return performSearch(searchQuery);
  }, [searchQuery]);

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups = {};
    results.forEach((item) => {
      const cat = item.category || "General";
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(item);
    });
    return groups;
  }, [results]);

  // Flattened results for keyboard UP/DOWN navigation
  const flattenedResults = useMemo(() => {
    const list = [];
    Object.keys(groupedResults).forEach((cat) => {
      groupedResults[cat].forEach((item) => {
        list.push(item);
      });
    });
    return list;
  }, [groupedResults]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Auto focus input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Scroll selected item into view during keyboard navigation
  useEffect(() => {
    if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }, [selectedIndex]);

  // Handle Result Selection & Navigation
  const handleSelectResult = (item) => {
    if (!item) return;
    onClose();

    const target = item.target;

    // Contact modal or scroll to contact
    if (target === "#contact" || target === "/#contact") {
      if (setShowContactForm) {
        setShowContactForm(true);
      }
      const contactElem = document.getElementById("contact") || document.querySelector("footer");
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    // Scroll helper to find and focus target DOM element
    const executeScrollToElement = (targetStr) => {
      const hashIdx = targetStr.indexOf("#");
      const id = hashIdx !== -1 ? targetStr.slice(hashIdx + 1) : targetStr.replace("#", "");
      if (!id || id.startsWith("/")) return;

      const scrollToTarget = () => {
        const element =
          document.getElementById(id) ||
          document.getElementById(`service-card-${id}`) ||
          document.getElementById(`job-${id}`) ||
          document.querySelector(`[data-id="${id}"]`) ||
          document.querySelector(`[data-id="service-card-${id}"]`);

        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          return true;
        }
        return false;
      };

      if (!scrollToTarget()) {
        setTimeout(scrollToTarget, 100);
        setTimeout(scrollToTarget, 300);
        setTimeout(scrollToTarget, 600);
        setTimeout(scrollToTarget, 1000);
      }
    };

    const navOptions = {
      state: { selectedService: item.title, highlightService: item.title }
    };

    if (target.startsWith("/")) {
      navigate(target, navOptions);
      if (target.includes("#")) {
        executeScrollToElement(target);
      }
    } else if (target.startsWith("#")) {
      navigate("/" + target, navOptions);
      executeScrollToElement(target);
    }
  };

  // Keyboard navigation & ESC handler inside search overlay
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < flattenedResults.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (flattenedResults[selectedIndex]) {
          handleSelectResult(flattenedResults[selectedIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, flattenedResults, selectedIndex]);

  if (!isOpen) return null;

  const hasQuery = searchQuery.trim().length > 0;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-start pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-md"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        {/* SINGLE SLEEK FLOATING SEARCH CONTAINER (ZERO INNER BORDERS, ZERO RED GLOW) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="w-full max-w-xl sm:max-w-2xl bg-[#F4F4F4] rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.16)] border border-white/90 overflow-hidden flex flex-col transition-all duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* BEAUTIFULLY ALIGNED SINGLE TYPING ROW */}
          <div className="flex items-center gap-3.5 px-6 py-4 bg-[#F4F4F4]">
            <Search className="w-5 h-5 text-[#E31D2E] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services, projects, pages..."
              className="search-input w-full bg-transparent text-[#111111] placeholder:text-gray-400 text-base sm:text-lg font-medium border-0 outline-none shadow-none"
              aria-label="Search input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="p-1 rounded-full text-gray-400 hover:text-[#111111] hover:bg-gray-200/60 transition-colors shrink-0"
                aria-label="Clear query"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            )}
          </div>

          {/* RESULTS DROPDOWN (Shown ONLY when user types) */}
          {hasQuery && (
            <div className="border-t border-gray-200/80 bg-[#F4F4F4]">
              <div
                ref={resultsContainerRef}
                className="max-h-[60vh] overflow-y-auto p-3.5 sm:p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-gray-300"
              >
                {flattenedResults.length > 0 ? (
                  Object.keys(groupedResults).map((category) => (
                    <div key={category} className="space-y-1.5">
                      <div className="flex items-center justify-between px-1 py-0.5">
                        <span className="text-[11px] font-extrabold text-[#E31D2E] uppercase tracking-widest">
                          {category}
                        </span>
                        <span className="text-[10px] font-semibold text-gray-400 bg-gray-200/70 px-2 py-0.5 rounded-full">
                          {groupedResults[category].length}
                        </span>
                      </div>

                      <div className="space-y-1">
                        {groupedResults[category].map((item) => {
                          const globalIndex = flattenedResults.findIndex(
                            (r) => r.id === item.id
                          );
                          const isSelected = globalIndex === selectedIndex;

                          return (
                            <div
                              key={item.id}
                              ref={(el) => (itemRefs.current[globalIndex] = el)}
                              onClick={() => handleSelectResult(item)}
                              onMouseEnter={() => setSelectedIndex(globalIndex)}
                              className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                                isSelected
                                  ? "bg-white text-[#111111] shadow-xs border border-[#E31D2E]/30"
                                  : "bg-white/60 hover:bg-white text-gray-800 border border-transparent"
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0 pr-2">
                                <div
                                  className={`p-2 rounded-lg shrink-0 transition-colors ${
                                    isSelected
                                      ? "bg-[#E31D2E]/10"
                                      : "bg-[#F4F4F4] group-hover:bg-[#E31D2E]/10"
                                  }`}
                                >
                                  {getCategoryIcon(item.category)}
                                </div>
                                <div className="min-w-0">
                                  <h4 className="font-bold text-sm text-[#111111] leading-tight truncate">
                                    <HighlightedText
                                      text={item.title}
                                      query={searchQuery}
                                    />
                                  </h4>
                                  {item.description && (
                                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5 font-normal">
                                      <HighlightedText
                                        text={item.description}
                                        query={searchQuery}
                                      />
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-1 text-xs font-bold text-[#E31D2E] opacity-70 group-hover:opacity-100 shrink-0 ml-2">
                                <span className="hidden sm:inline">
                                  {item.category}
                                </span>
                                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 px-4">
                    <p className="text-sm font-bold text-gray-700">
                      No results for "{searchQuery}"
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Try searching for services, projects, careers, or about us.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchOverlay;
