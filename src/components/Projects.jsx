import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import HeroLayout from "./common/HeroLayout";
import ContactForm from "./ContactForm";
import { ArrowUpRight, ArrowRight, Star, Check, TrendingUp, Filter, ChevronDown } from "lucide-react";
import "../index.css";
import { data, blogPosts } from "../constants";
import { projects } from "../data/projects";
import ProjectDetailModal from "./ProjectDetailModal";
import ProjectsSpaceBackground from "./ProjectsSpaceBackground";
import SectionBadge from "./common/SectionBadge";
import "./Projects.css"

import img1 from '../assets/project-cover/photo 1.webp';
import img2 from '../assets/project-cover/photo 2.webp';
import img3 from '../assets/project-cover/photo 3.webp';
import img4 from '../assets/project-cover/photo 4.webp';
import img5 from '../assets/project-cover/photo 5.webp';

// ── Portfolio Hero Helper Components ──
function ProjectCounter({ targetNum, suffix = "+", label, delay = 0 }) {
  const [count, setCount] = useState(targetNum || 0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-20px" });

  useEffect(() => {
    if (!isInView) {
      setCount(targetNum || 0);
      return;
    }

    const duration = 1800; // ms
    const numVal = parseFloat(targetNum) || 0;
    const isFloat = targetNum.toString().includes(".");
    let start = null;
    let animFrameId = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const val = easeOut * numVal;
      setCount(isFloat ? val.toFixed(1) : Math.floor(val));
      if (progress < 1) {
        animFrameId = requestAnimationFrame(step);
      } else {
        setCount(isFloat ? numVal.toFixed(1) : numVal);
      }
    };

    const timer = setTimeout(() => {
      animFrameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [isInView, targetNum, delay]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.95 }}
      transition={{ duration: 0.6, delay: delay * 0.3, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="clay-card relative flex flex-col items-start p-2 px-3 sm:p-3.5 sm:px-5 rounded-xl sm:rounded-2xl border border-white/90 shadow-xl bg-white hover:bg-white cursor-default group transition-all duration-300 w-full min-w-0"
    >
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/70 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col">
        <span className="text-lg sm:text-3xl font-black text-[#111111] tracking-tight group-hover:text-[#E31D2E] transition-colors duration-300">
          {count}{suffix}
        </span>
        <span className="text-[#575757] text-[8.5px] sm:text-[10px] font-bold uppercase tracking-[0.18em] mt-0.5 truncate">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

function ProjectShowcase({ projectImages, imageIndex }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, px: 0, py: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    setTilt({
      x: yPct * -10,
      y: xPct * 10,
      px: xPct * -14,
      py: yPct * -14,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, px: 0, py: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[240px] sm:max-w-[420px] lg:max-w-[450px] mx-auto perspective-[1000px] select-none"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative transition-transform duration-300 ease-out transform-gpu cursor-pointer"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Outer Showcase Frame */}
        <div className={`relative rounded-2xl p-1.5 sm:p-2.5 bg-white border border-white/90 shadow-2xl transition-all duration-500 overflow-hidden ${
          isHovered ? "shadow-[0_25px_60px_rgba(0,0,0,0.15)] bg-white" : ""
        }`}>
          {/* Slideshow Image Container */}
          <div className="relative rounded-xl overflow-hidden aspect-[16/10] sm:aspect-square bg-neutral-900">
            <AnimatePresence initial={false} mode="wait">
              {projectImages.map((img, idx) => (
                idx === imageIndex && (
                  <motion.div
                    key={img.image}
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: isHovered ? 1.03 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <img
                      src={img.image}
                      alt={img.title || "Project showcase"}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* SUCCESS BADGE Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="absolute bottom-2 left-2 sm:bottom-8 sm:left-8 z-20 p-1.5 px-2.5 sm:p-3.5 sm:px-4.5 rounded-xl sm:rounded-2xl bg-white border border-white/90 shadow-xl flex items-center gap-2 sm:gap-3"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-[#111111] font-black text-xs sm:text-sm shrink-0">
              ★
            </div>
            <div>
              <div className="text-[#E31D2E] text-[8px] sm:text-[10px] font-black tracking-widest uppercase flex items-center gap-0.5">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <div className="text-[#111111] text-[9.5px] sm:text-xs font-black tracking-tight">
                Trusted by Growing Brands
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

const WORKFLOW_LABELS = [
  "Discovery & Strategy",
  "Creative Execution",
  "Go Live",
  "Continuous Growth",
];

const Projects = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [counts, setCounts] = useState({ clients: 0, projects: 0, tieups: 0 });
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState("ALL");
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const filteredProjects = projects.filter((project) => {
    if (selectedYear === "ALL") return true;
    return String(project.year) === selectedYear;
  });

  // Scroll to project card on return navigation
  useEffect(() => {
    if (location.state?.scrollToId) {
      const targetSlug = location.state.scrollToId;
      setTimeout(() => {
        const element = document.getElementById(`project-card-${targetSlug}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 200);
    }
  }, [location.state]);

  const projectImages = [
    { image: img1, title: 'Web Development', desc: 'Responsive and fast-loading websites' },
    { image: img2, title: 'Mobile Application', desc: 'User-friendly interface with smooth navigation' },
    { image: img3, title: 'Cloud Solutions', desc: 'Scalable cloud infrastructure and expertise' },
    { image: img4, title: 'UI/UX Design', desc: 'Intuitive designs that users love' },
    { image: img5, title: 'Honeybee Platform', desc: 'Modern e-commerce solution' },
  ];

  useEffect(() => {
    const t = setInterval(
      () => setImageIndex((p) => (p + 1) % projectImages.length),
      4000
    );
    return () => clearInterval(t);
  }, [projectImages.length]);

  useEffect(() => {
    projectImages.forEach((proj) => {
      const img = new Image();
      img.src = proj.image;
    });
  }, [projectImages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const duration = 2000;
            const start = performance.now();

            const animateCount = (timestamp) => {
              const progress = Math.min((timestamp - start) / duration, 1);
              setCounts({
                clients: Math.floor(15 * progress),
                projects: Math.floor(20 * progress),
                tieups: Math.floor(20 * progress),
              });
              if (progress < 1) requestAnimationFrame(animateCount);
            };
            requestAnimationFrame(animateCount);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-[#050609]">
      {/* Projects-scoped Continuous Parallax Earth Space Environment */}
      <ProjectsSpaceBackground />

      {/* Main Projects Content Sections */}
      <div className="relative z-10 w-full">
        {/* ------------------ Hero Section ------------------ */}
        <HeroLayout
          sectionId="projects-hero"
          bgElements={null}
          badge={
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionBadge text="OUR PORTFOLIO" theme="dark" />
            </motion.div>
          }
          title={
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] font-black leading-[1.08] sm:leading-[1.1] tracking-[-0.035em] text-white font-sans mb-5 sm:mb-6 max-w-2xl"
            >
              Collaborate for{" "}
              <span className="text-[#E31D2E]">
                meaningful brand growth
              </span>
            </motion.h1>
          }
          description={
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="hero-description text-neutral-300 text-base sm:text-lg lg:text-[19px] font-normal leading-[1.6] font-sans max-w-2xl mb-7 sm:mb-8"
            >
              A curated showcase of performance campaigns, digital products, and brand identity projects built for growth.
            </motion.p>
          }
        actions={
          <div className="flex flex-col items-center lg:items-start gap-3.5 relative z-10 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2.5 w-full max-w-xl justify-center lg:justify-start">
              <ProjectCounter targetNum="10" suffix="+" label="Projects Completed" delay={0} />
              <ProjectCounter targetNum="8" suffix="+" label="Brands Supported" delay={0.1} />
              <ProjectCounter targetNum="90" suffix="%+" label="Client Retention" delay={0.2} />
              <ProjectCounter targetNum="1.5" suffix="+" label="Years Experience" delay={0.3} />
            </div>
          </div>
        }
        media={
          <div className="w-full flex justify-center lg:justify-end z-20">
            <ProjectShowcase projectImages={projectImages} imageIndex={imageIndex} />
          </div>
        }
      />

      {/* ------------------ Our Workflow Process Section ------------------ */}
      <section className="projects-empower-section relative bg-transparent py-5 sm:py-12 lg:py-14 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center mb-4 sm:mb-10 lg:mb-12 max-w-4xl mx-auto"
          >
            {/* Small Badge */}
            <div className="mb-2 sm:mb-4">
              <SectionBadge text="OUR WORKFLOW" theme="dark" />
            </div>

            {/* Heading */}
            <h2 className="text-xl md:text-5xl lg:text-[46px] font-black text-white leading-tight tracking-tight mb-2 sm:mb-4">
              Empowering progress through{" "}
              <span className="relative inline-block text-[#E31D2E]">
                mindful strategy and creative execution.
              </span>
            </h2>
            <p className="text-neutral-300 text-xs sm:text-lg leading-relaxed font-medium max-w-3xl">
              We transform insights into impactful brand experiences strategically created, seamlessly launched and constantly optimized for growth.
            </p>
          </motion.div>

          {/* Connected Timeline Track Container */}
          <div className="relative w-full">
            {/* Subtle Thin Timeline Track (Desktop) */}
            <div className="hidden lg:block absolute top-[60px] left-[8%] right-[8%] h-[1.5px] bg-neutral-200/80 rounded-full pointer-events-none z-0">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-neutral-300 origin-left rounded-full"
              />
            </div>

            {/* 4 Step Milestone Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 relative z-10 pt-5 sm:pt-8">
              {data.map((item, index) => {
                const icons = [
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#111111]" />,
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#111111]" />,
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#111111]" />,
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#111111]" />
                ];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="clay-card relative group p-3.5 sm:p-7 pt-6 sm:pt-8 flex flex-col justify-between rounded-xl sm:rounded-2xl border border-white/90 shadow-xl bg-white hover:bg-white transition-all duration-500 min-h-[150px] sm:min-h-[270px] overflow-visible select-none"
                  >
                    {/* Light Inner Glass Highlight */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Step Number Badge — Top Right */}
                    <div className="absolute -top-3 right-4 sm:right-7 px-2.5 py-0.5 rounded-lg sm:rounded-xl bg-white/95 border border-neutral-200 text-[#111111] font-black text-[10px] sm:text-xs shadow-sm tracking-wider flex items-center gap-1 z-20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                      <span>0{index + 1}</span>
                    </div>

                    {/* Overlapping Icon Capsule — Top Left */}
                    <div className="absolute -top-5 left-4 sm:left-7 z-20">
                      <div className="relative z-10 w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white border border-neutral-200 flex items-center justify-center shadow-sm group-hover:rotate-[8deg] group-hover:scale-105 transition-all duration-500">
                        {icons[index]}
                      </div>
                    </div>

                    {/* Content & Phase Tag */}
                    <div className="relative z-10 pt-2 sm:pt-5">
                      <span className="text-[#111111] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-1 block">
                        {WORKFLOW_LABELS[index] || "Phase"}
                      </span>
                      <h3 className="text-sm sm:text-xl font-black mb-1.5 sm:mb-2 leading-snug tracking-tight text-[#111111]">
                        {item.title.split(' & ').map((part, i) => (
                          <React.Fragment key={i}>
                            {part} {i === 0 && <br />}
                          </React.Fragment>
                        ))}
                      </h3>
                      <p className="text-[11px] sm:text-xs leading-relaxed font-medium text-[#575757]">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bottom Framework Note — Bright White Section Divider */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-center text-white text-[10px] sm:text-sm font-black uppercase tracking-[0.28em] mt-6 sm:mt-16 flex items-center justify-center gap-4 drop-shadow-sm"
          >
            <span className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-white/70 to-white hidden sm:block" />
            <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)]">Every project follows a structured growth framework.</span>
            <span className="w-16 h-[1.5px] bg-gradient-to-l from-transparent via-white/70 to-white hidden sm:block" />
          </motion.div>

        </div>
      </section>

      {/* ------------------ Featured Case Studies Section ------------------ */}
      <section className="relative bg-transparent py-5 sm:py-12 lg:py-14 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center mb-4 sm:mb-10 lg:mb-12"
          >
            {/* Small Badge */}
            <div className="mb-2 sm:mb-4">
              <SectionBadge text="SELECTED CASE STUDIES" theme="dark" />
            </div>

            {/* Heading with Animated Underline */}
            <h2 className="text-xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-4xl tracking-tight">
              Building Brands That{" "}
              <span className="relative inline-block text-[#FF2B2B]">
                Perform
              </span>
            </h2>
          </motion.div>

          {/* Unified Scrollable Project Container */}
          <div className="clay-card relative w-full rounded-2xl p-3 sm:p-8 lg:p-10 bg-white border border-white/90 shadow-2xl text-[#111111]">
            {/* Top Row: Year Filter Select Dropdown on Top Left */}
            <div className="flex items-center justify-between gap-2 mb-3 sm:mb-6 px-1 flex-wrap">
              <div className="flex items-center gap-2">
                <label htmlFor="year-filter-select" className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-neutral-500 flex items-center gap-1 cursor-pointer">
                  <Filter className="w-3 h-3 text-[#E31D2E]" />
                  <span>Filter Year:</span>
                </label>

                <div className="relative">
                  <select
                    id="year-filter-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="appearance-none bg-white text-neutral-900 font-extrabold text-[10px] sm:text-xs tracking-wider px-2.5 py-1 pr-6 rounded-lg sm:rounded-xl border border-neutral-200/90 shadow-2xs hover:border-black/30 focus:border-[#E31D2E] focus:outline-none cursor-pointer transition-all duration-200"
                  >
                    <option value="ALL">All Years</option>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <span className="text-[9.5px] sm:text-[11px] font-extrabold text-neutral-500 tracking-wider uppercase bg-white/80 border border-neutral-200/80 px-2.5 py-1 rounded-lg sm:rounded-xl shadow-2xs">
                Showing {filteredProjects.length} Projects
              </span>
            </div>

            {/* Scrollable Container with Custom Scrollbar & Mobile Scroll Snapping */}
            <div className="max-h-[62dvh] sm:max-h-[720px] lg:max-h-[760px] overflow-y-auto overscroll-contain pr-1.5 sm:pr-3 custom-scrollbar snap-y snap-mandatory">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch py-1 sm:py-2">
                {filteredProjects.map((project, index) => {
                  const categoryTag = project.tags || "Featured Case Study";
                  const description = project.overview?.paragraph || project.description;
                  const techTags = project.services?.slice(0, 3) || ["Digital Strategy"];

                  return (
                    <motion.div
                      key={project.id || index}
                      id={`project-card-${project.slug || project.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -4 }}
                      onClick={() => navigate(`/project/${project.slug || project.id}`, { state: { from: '/projects', projectSlug: project.slug || project.id } })}
                      className="group relative flex flex-col justify-between cursor-pointer p-3 sm:p-4 rounded-2xl border border-neutral-200/80 shadow-[0_8px_24px_rgba(0,0,0,0.03)] bg-white hover:border-black/20 hover:shadow-[0_14px_36px_rgba(0,0,0,0.08)] transition-all duration-300 select-none snap-start"
                    >
                      {/* 1. Image Area — Sleek 16:10 Banner on Mobile, 1:1 Square on Desktop */}
                      <div className="relative w-full aspect-[16/10] sm:aspect-square overflow-hidden rounded-xl border border-neutral-200/60 mb-2.5 sm:mb-3 bg-white shadow-2xs">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      </div>

                      {/* 2. Project Name & Case Study CTA Row */}
                      <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3 px-0.5">
                        <h3 className="text-sm sm:text-lg font-black text-[#111111] leading-snug group-hover:text-[#E31D2E] transition-colors duration-300 tracking-tight">
                          {project.title}
                        </h3>

                        {/* Compact Case Study Pill Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/case-study/${project.slug || project.id}`, { state: { from: '/projects', projectSlug: project.slug || project.id } });
                          }}
                          className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-[#E31D2E] text-white font-black text-[9.5px] sm:text-[10px] uppercase tracking-wider flex items-center gap-1 shrink-0 shadow-2xs hover:bg-[#c91827] hover:scale-105 transition-all duration-300 cursor-pointer"
                        >
                          <span>Case Study</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* 3. Options / Service Chips */}
                      <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-2 sm:pt-2.5 border-t border-neutral-100 px-0.5">
                        {techTags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-neutral-100/90 text-neutral-600 text-[9px] sm:text-[10px] font-bold tracking-wide transition-colors duration-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {showContactForm && (
        <ContactForm
          isOpen={showContactForm}
          onClose={() => setShowContactForm(false)}
        />
      )}
      </div>
    </div>
  );
};

export default Projects;
