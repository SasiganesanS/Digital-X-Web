import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import HeroLayout from "./common/HeroLayout";
import ContactForm from "./ContactForm";
import { ArrowUpRight, ArrowRight, Star, Check, TrendingUp } from "lucide-react";
import "../index.css";
import { data, blogPosts } from "../constants";
import { projects } from "../data/projects";
import ProjectDetailModal from "./ProjectDetailModal";
import "./Projects.css"

import img1 from '../assets/project-cover/photo 1.png';
import img2 from '../assets/project-cover/photo 2.png';
import img3 from '../assets/project-cover/photo 3.png';
import img4 from '../assets/project-cover/photo 4.png';
import img5 from '../assets/project-cover/photo 5.png';

// ── Portfolio Hero Helper Components ──
function ProjectCounter({ targetNum, suffix = "+", label, delay = 0 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1800; // ms
    const numVal = parseInt(targetNum, 10) || 0;
    let start = null;
    let animFrameId = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * numVal));
      if (progress < 1) {
        animFrameId = requestAnimationFrame(step);
      } else {
        setCount(numVal);
      }
    };

    const timer = setTimeout(() => {
      animFrameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [targetNum, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 + delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="clay-card relative flex flex-col items-start p-3.5 px-4 sm:px-5 rounded-2xl border border-white/70 shadow-[0_10px_28px_rgba(17,17,17,0.03)] backdrop-blur-xl bg-white/75 hover:bg-white/90 cursor-default group transition-all duration-300 min-w-[120px] sm:min-w-[135px]"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/70 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col">
        <span className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight group-hover:text-[#E31D2E] transition-colors duration-300">
          {count}{suffix}
        </span>
        <span className="text-[#575757] text-[10px] font-bold uppercase tracking-[0.18em] mt-0.5">
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
      className="relative w-full max-w-lg mx-auto lg:max-w-none perspective-[1000px] select-none"
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
        {/* Outer Claymorphic Showcase Frame */}
        <div className={`relative rounded-[2.5rem] p-3.5 sm:p-4 bg-white/50 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_rgba(17,17,17,0.06)] transition-all duration-500 overflow-hidden ${
          isHovered ? "border-[#ECECEC] shadow-[0_12px_40px_rgba(0,0,0,0.08)] bg-white/70" : ""
        }`}>
          {/* Inner Light Highlight */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-white/80 via-transparent to-white/40 pointer-events-none z-10" />

          {/* Slideshow Image Container */}
          <div className="relative rounded-[2rem] overflow-hidden aspect-square">
            <AnimatePresence initial={false} mode="wait">
              {projectImages.map((img, idx) => (
                idx === imageIndex && (
                  <motion.div
                    key={img.image}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: isHovered ? 1.06 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${img.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transform: isHovered ? `translate(${tilt.px}px, ${tilt.py}px)` : "none",
                    }}
                  />
                )
              ))}
            </AnimatePresence>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />
          </div>

          {/* SUCCESS BADGE Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-20 p-3.5 px-4.5 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/70 shadow-[0_16px_36px_rgba(17,17,17,0.08)] flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-xl bg-[#E31D2E]/10 flex items-center justify-center text-[#E31D2E] font-black text-sm">
              ★
            </div>
            <div>
              <div className="text-[#E31D2E] text-[10px] font-black tracking-widest uppercase flex items-center gap-0.5">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <div className="text-[#111111] text-xs font-black tracking-tight">
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
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  const projectImages = [
    { image: img1, title: 'Web Development', desc: 'Responsive and fast-loading websites' },
    { image: img2, title: 'Mobile Application', desc: 'User-friendly interface with smooth navigation' },
    { image: img3, title: 'Cloud Solutions', desc: 'Scalable cloud infrastructure and services' },
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
    <div className="w-full hero-project-container bg-transparent text-[#111111] overflow-x-hidden">
      
      {/* ------------------ Hero Section ------------------ */}
      <HeroLayout
        bgElements={null}
        badge={
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-[#E31D2E]/25 bg-white/70 shadow-[0_8px_20px_rgba(17,17,17,0.04)] backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31D2E]" />
            </span>
            <span className="relative text-[#111111] text-xs font-black tracking-[0.25em] uppercase">
              OUR PORTFOLIO
            </span>
          </motion.div>
        }
        title={
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-black leading-[1.08] tracking-tight text-[#111111]"
          >
            Collaborate for <br />
            <span className="relative inline-block text-[#E31D2E]">
              meaningful brand growth
            </span>
          </motion.h1>
        }
        description={
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#575757] text-xs sm:text-sm lg:text-base leading-relaxed font-medium max-w-xl"
          >
            A powerful blend of strategy, creativity and performance marketing designed to boost visibility and accelerate revenue growth.
          </motion.p>
        }
        actions={
          <div className="flex flex-col items-center lg:items-start gap-3.5 relative z-10 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-xl justify-center lg:justify-start">
              <ProjectCounter targetNum="50" suffix="+" label="Projects Delivered" delay={0} />
              <ProjectCounter targetNum="15" suffix="+" label="Brands" delay={0.1} />
              <ProjectCounter targetNum="98" suffix="%" label="Client Satisfaction" delay={0.2} />
              <ProjectCounter targetNum="5" suffix="+" label="Years Experience" delay={0.3} />
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 w-full">
              <a
                href="#portfolio-grid"
                className="primary-btn px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-wider text-white shadow-md shadow-red-500/20 inline-flex items-center gap-2"
              >
                <span>View Featured Work</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-[10px] sm:text-xs font-bold text-[#575757] flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-gray-200/80 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#E31D2E] animate-pulse" />
                <span>Crafting Scalable Digital Ecosystems</span>
              </span>
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
      <section className="projects-empower-section relative bg-transparent py-12 sm:py-14 lg:py-16 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center mb-16 md:mb-20 max-w-4xl mx-auto"
          >
            {/* Small Badge */}
            <div className="relative inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-neutral-200 bg-white/70 shadow-[0_8px_20px_rgba(17,17,17,0.04)] backdrop-blur-md mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31D2E]" />
              </span>
              <span className="relative text-[#111111] text-xs font-black tracking-[0.25em] uppercase">
                OUR WORKFLOW
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-5xl lg:text-[46px] font-black text-[#111111] leading-tight tracking-tight mb-4">
              Empowering progress through{" "}
              <span className="relative inline-block text-[#E31D2E]">
                mindful strategy and creative execution.
              </span>
            </h2>
            <p className="text-[#575757] text-base sm:text-lg leading-relaxed font-medium max-w-3xl">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10 pt-8">
              {data.map((item, index) => {
                const icons = [
                  <TrendingUp className="w-5 h-5 sm:w-5 sm:h-5 text-[#FF2B2B]" />,
                  <ArrowUpRight className="w-5 h-5 sm:w-5 sm:h-5 text-[#FF2B2B]" />,
                  <Star className="w-5 h-5 sm:w-5 sm:h-5 text-[#FF2B2B]" />,
                  <Check className="w-5 h-5 sm:w-5 sm:h-5 text-[#FF2B2B]" />
                ];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="clay-card relative group p-6 sm:p-7 pt-8 flex flex-col justify-between rounded-[1.75rem] md:rounded-[2rem] border border-white/80 shadow-[0_8px_24px_rgba(17,17,17,0.03)] backdrop-blur-xl bg-white/75 hover:bg-white transition-all duration-500 min-h-[250px] sm:min-h-[270px] overflow-visible select-none"
                  >
                    {/* Light Inner Glass Highlight */}
                    <div className="absolute inset-0 rounded-[1.75rem] md:rounded-[2rem] bg-gradient-to-br from-white/80 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Step Number Badge — Top Right */}
                    <div className="absolute -top-3.5 right-6 sm:right-7 px-3 py-0.5 rounded-full bg-white/95 border border-neutral-200 text-[#FF2B2B] font-black text-[11px] sm:text-xs shadow-sm tracking-wider flex items-center gap-1 z-20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF2B2B]" />
                      <span>0{index + 1}</span>
                    </div>

                    {/* Overlapping Icon Capsule — Top Left */}
                    <div className="absolute -top-6 left-6 sm:left-7 z-20">
                      <div className="relative z-10 w-12 h-12 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center shadow-sm group-hover:rotate-[8deg] group-hover:scale-105 transition-all duration-500">
                        {icons[index]}
                      </div>
                    </div>

                    {/* Content & Phase Tag */}
                    <div className="relative z-10 pt-4 sm:pt-5">
                      <span className="text-[#FF2B2B] text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 block">
                        {WORKFLOW_LABELS[index] || "Phase"}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black mb-2 leading-snug tracking-tight text-[#111111] group-hover:text-[#FF2B2B] transition-colors duration-300">
                        {item.title.split(' & ').map((part, i) => (
                          <React.Fragment key={i}>
                            {part} {i === 0 && <br />}
                          </React.Fragment>
                        ))}
                      </h3>
                      <p className="text-xs leading-relaxed font-medium text-[#575757]">
                        {item.desc}
                      </p>
                    </div>

                    {/* Bottom Accent Line */}
                    <div className="absolute bottom-3.5 left-6 right-6 sm:left-7 sm:right-7 h-1 bg-[#FF2B2B] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bottom Framework Note */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-center text-[#575757] text-xs font-black uppercase tracking-[0.25em] mt-16 flex items-center justify-center gap-3"
          >
            <span className="w-12 h-[1px] bg-neutral-200 hidden sm:block" />
            <span>Every project follows a structured growth framework.</span>
            <span className="w-12 h-[1px] bg-neutral-200 hidden sm:block" />
          </motion.div>

        </div>
      </section>

      {/* ------------------ Featured Case Studies Section ------------------ */}
      <section className="relative bg-transparent py-12 sm:py-14 lg:py-16 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center mb-16 md:mb-20"
          >
            {/* Small Badge */}
            <div className="relative inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-neutral-200 bg-white/70 shadow-[0_8px_20px_rgba(17,17,17,0.04)] backdrop-blur-md mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF2B2B] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF2B2B]" />
              </span>
              <span className="relative text-[#111111] text-xs font-black tracking-[0.25em] uppercase">
                SELECTED CASE STUDIES
              </span>
            </div>

            {/* Heading with Animated Underline */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#111111] leading-tight max-w-4xl tracking-tight">
              Building Brands That{" "}
              <span className="relative inline-block text-[#FF2B2B]">
                Perform
              </span>
            </h2>
          </motion.div>

          {/* Unified Scrollable Project Container */}
          <div className="relative w-full rounded-[2.5rem] p-4 sm:p-6 lg:p-8 bg-neutral-50/60 border border-neutral-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] backdrop-blur-xl">
            {/* Scrollable Container with Custom Scrollbar */}
            <div className="max-h-[660px] sm:max-h-[720px] lg:max-h-[760px] overflow-y-auto overscroll-contain pr-2 sm:pr-3 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch py-2">
                {projects.map((project, index) => {
                  const categoryTag = project.tags || "Featured Case Study";
                  const description = project.overview?.paragraph || project.description;
                  const techTags = project.services?.slice(0, 3) || ["Digital Strategy"];

                  return (
                    <motion.div
                      key={project.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -4 }}
                      onClick={() => navigate(`/project/${project.slug || project.id}`)}
                      className="group relative flex flex-col justify-between cursor-pointer p-3.5 sm:p-4 rounded-[1.75rem] border border-neutral-200/80 shadow-[0_8px_24px_rgba(0,0,0,0.03)] bg-white hover:border-[#E31D2E]/30 hover:shadow-[0_14px_36px_rgba(227,29,46,0.1)] transition-all duration-300 select-none"
                    >
                      {/* 1. Image Area — Crisp & Unobstructed */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl border border-neutral-200/60 mb-3 bg-neutral-900 shadow-2xs">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      </div>

                      {/* 2. Project Name & Case Study CTA Row */}
                      <div className="flex items-start justify-between gap-3 mb-3 px-0.5">
                        <h3 className="text-base sm:text-lg font-black text-[#111111] leading-snug group-hover:text-[#E31D2E] transition-colors duration-300 tracking-tight line-clamp-2">
                          {project.title}
                        </h3>

                        {/* Compact Case Study Pill Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/case-study/${project.slug || project.id}`);
                          }}
                          className="px-3 py-1.5 rounded-full bg-[#E31D2E] text-white font-black text-[10px] uppercase tracking-wider flex items-center gap-1 shrink-0 shadow-2xs hover:bg-[#c91827] hover:scale-105 transition-all duration-300 cursor-pointer"
                        >
                          <span>Case Study</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* 3. Options / Service Chips */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-2.5 border-t border-neutral-100 px-0.5">
                        {techTags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-md bg-neutral-100/90 text-neutral-600 text-[10px] font-bold tracking-wide group-hover:bg-[#E31D2E]/10 group-hover:text-[#E31D2E] transition-colors duration-200 truncate max-w-[140px]"
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
  );
};

export default Projects;
