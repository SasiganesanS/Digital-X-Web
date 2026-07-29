import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "./ContactForm";
import { ArrowUpRight, Star, Check, TrendingUp } from "lucide-react";
import "../index.css";
import { data, blogPosts } from "../constants";
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
          isHovered ? "border-[#E31D2E]/40 shadow-[0_25px_60px_rgba(227,29,46,0.16)] bg-white/70" : ""
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
      <section
        ref={sectionRef}
        className="relative w-full min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 md:px-[5%] py-12 lg:py-20 overflow-hidden bg-transparent"
      >
        {/* Subtle Decorative Background Elements */}
        <div className="absolute top-1/4 left-0 w-[550px] h-[550px] bg-[#E31D2E]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-[#E31D2E]/4 rounded-full blur-[130px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle,#111 1.2px,transparent 1.2px)", backgroundSize: "44px 44px" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

            {/* LEFT — Text & Metric Cards Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col items-start text-left z-10"
            >
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-[#E31D2E]/25 bg-white/70 shadow-[0_8px_20px_rgba(17,17,17,0.04)] backdrop-blur-md mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31D2E]" />
                </span>
                <span className="relative text-[#111111] text-xs font-black tracking-[0.25em] uppercase">
                  OUR PORTFOLIO
                </span>
              </motion.div>

              {/* Heading with Animated Underline */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl xl:text-[4.25rem] font-black leading-[1.08] mb-6 tracking-tight text-[#111111]"
              >
                Collaborate <br />
                <span className="relative inline-block text-[#E31D2E]">
                  for meaningful brand growth
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#E31D2E] via-[#E31D2E]/80 to-transparent origin-left rounded-full"
                  />
                </span>
              </motion.h1>

              {/* Description Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="text-[#575757] text-base md:text-lg leading-relaxed max-w-xl font-medium mb-10"
              >
                Strategic, creative, and performance-driven marketing solutions that accelerate visibility and revenue.
              </motion.p>

              {/* Floating Metric Cards */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mt-2 relative z-10 w-full">
                <ProjectCounter targetNum="50" suffix="+" label="Projects Delivered" delay={0} />
                <ProjectCounter targetNum="15" suffix="+" label="Brands" delay={0.1} />
                <ProjectCounter targetNum="98" suffix="%" label="Client Satisfaction" delay={0.2} />
                <ProjectCounter targetNum="5" suffix="+" label="Years Experience" delay={0.3} />
              </div>
            </motion.div>

            {/* RIGHT — Interactive Showcase Frame */}
            <div className="lg:col-span-5 w-full flex justify-center lg:justify-end z-20">
              <ProjectShowcase projectImages={projectImages} imageIndex={imageIndex} />
            </div>

          </div>
        </div>
      </section>

      {/* ------------------ Our Workflow Process Section ------------------ */}
      <section className="projects-empower-section relative bg-transparent py-24 px-6 md:px-[5%] overflow-hidden">
        {/* Subtle Decorative Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#E31D2E]/4 rounded-full blur-[160px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle,#111 1px,transparent 1px)", backgroundSize: "40px 40px" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center mb-16 md:mb-20"
          >
            {/* Small Badge */}
            <div className="relative inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-[#E31D2E]/25 bg-white/70 shadow-[0_8px_20px_rgba(17,17,17,0.04)] backdrop-blur-md mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31D2E]" />
              </span>
              <span className="relative text-[#111111] text-xs font-black tracking-[0.25em] uppercase">
                OUR WORKFLOW
              </span>
            </div>

            {/* Heading with Animated Underline */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#111111] leading-tight max-w-4xl tracking-tight">
              We research, create, launch, and optimize{" "}
              <span className="relative inline-block text-[#E31D2E]">
                transformative brand experiences
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#E31D2E] via-[#E31D2E]/80 to-transparent origin-left rounded-full"
                />
              </span>
            </h2>
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
                className="h-full bg-gradient-to-r from-[#E31D2E]/60 via-[#E31D2E]/40 to-[#E31D2E]/20 origin-left rounded-full"
              />
            </div>

            {/* 4 Step Milestone Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10 pt-8">
              {data.map((item, index) => {
                const icons = [
                  <TrendingUp className="w-5 h-5 sm:w-5 sm:h-5 text-[#E31D2E]" />,
                  <ArrowUpRight className="w-5 h-5 sm:w-5 sm:h-5 text-[#E31D2E]" />,
                  <Star className="w-5 h-5 sm:w-5 sm:h-5 text-[#E31D2E]" />,
                  <Check className="w-5 h-5 sm:w-5 sm:h-5 text-[#E31D2E]" />
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
                    <div className="absolute -top-3.5 right-6 sm:right-7 px-3 py-0.5 rounded-full bg-white/95 border border-[#E31D2E]/25 text-[#E31D2E] font-black text-[11px] sm:text-xs shadow-sm tracking-wider flex items-center gap-1 z-20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E31D2E]" />
                      <span>0{index + 1}</span>
                    </div>

                    {/* Overlapping Icon Capsule — Top Left */}
                    <div className="absolute -top-6 left-6 sm:left-7 z-20">
                      <div className="absolute inset-0 rounded-2xl bg-[#E31D2E]/10 blur-md group-hover:bg-[#E31D2E]/20 group-hover:scale-110 transition-all duration-500" />
                      <div className="relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-white via-white/95 to-white/70 border border-white/90 flex items-center justify-center shadow-sm group-hover:rotate-[8deg] group-hover:scale-105 transition-all duration-500">
                        {icons[index]}
                      </div>
                    </div>

                    {/* Content & Phase Tag */}
                    <div className="relative z-10 pt-4 sm:pt-5">
                      <span className="text-[#E31D2E] text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 block">
                        {WORKFLOW_LABELS[index] || "Phase"}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black mb-2 leading-snug tracking-tight text-[#111111] group-hover:text-[#E31D2E] transition-colors duration-300">
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

                    {/* Bottom Accent Glow Line */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E31D2E] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
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
            <span className="w-12 h-[1px] bg-[#E31D2E]/30 hidden sm:block" />
            <span>Every project follows a structured growth framework.</span>
            <span className="w-12 h-[1px] bg-[#E31D2E]/30 hidden sm:block" />
          </motion.div>

        </div>
      </section>

      {/* ------------------ Featured Case Studies Section ------------------ */}
      <section className="relative bg-transparent px-6 md:px-[5%] py-24 md:py-32 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#E31D2E]/4 rounded-full blur-[150px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle,#111 1px,transparent 1px)", backgroundSize: "40px 40px" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center mb-16 md:mb-20"
          >
            {/* Small Badge */}
            <div className="relative inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-[#E31D2E]/25 bg-white/70 shadow-[0_8px_20px_rgba(17,17,17,0.04)] backdrop-blur-md mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31D2E]" />
              </span>
              <span className="relative text-[#111111] text-xs font-black tracking-[0.25em] uppercase">
                SELECTED CASE STUDIES
              </span>
            </div>

            {/* Heading with Animated Underline */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#111111] leading-tight max-w-4xl tracking-tight">
              Building Brands That{" "}
              <span className="relative inline-block text-[#E31D2E]">
                Perform
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#E31D2E] via-[#E31D2E]/80 to-transparent origin-left rounded-full"
                />
              </span>
            </h2>
          </motion.div>

          {/* Featured Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {blogPosts.map((post, index) => {
              const categoryTag = post.overview?.headline || "Featured Project";
              const description = post.overview?.paragraph || "Strategic digital solution engineered for growth and visibility.";
              const techTags = post.overview?.features?.slice(0, 3) || ["Web App", "UI/UX", "Strategy"];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  onClick={() => navigate(`/blog/${index}`)}
                  className="clay-card group relative flex flex-col overflow-hidden cursor-pointer p-4 sm:p-5 rounded-[2rem] border border-white/80 shadow-[0_10px_30px_rgba(17,17,17,0.03)] backdrop-blur-xl bg-white/80 hover:bg-white hover:border-[#E31D2E]/40 hover:shadow-[0_16px_36px_rgba(227,29,46,0.12)] transition-all duration-500 select-none"
                >
                  {/* Light Inner Glass Highlight */}
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/80 via-transparent to-transparent pointer-events-none z-10" />

                  {/* Image Area (~70% Visual Height) */}
                  <div className="relative w-full aspect-[16/11] overflow-hidden rounded-[1.5rem] border border-white/60 mb-5 z-10">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-75 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none" />

                    {/* Category Tag — Top Left */}
                    <div className="absolute top-3.5 left-3.5 z-20 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-white/70 shadow-sm text-[#111111] font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E31D2E]" />
                      <span className="truncate max-w-[140px]">{categoryTag}</span>
                    </div>

                    {/* Year / Case Study Tag — Top Right */}
                    <div className="absolute top-3.5 right-3.5 z-20 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white font-bold text-[10px] uppercase tracking-widest">
                      2024
                    </div>
                  </div>

                  {/* Bottom Content Area */}
                  <div className="flex flex-col justify-between flex-grow px-1.5 pb-1 relative z-10">
                    <div>
                      {/* Title */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-lg sm:text-xl font-black text-[#111111] leading-snug group-hover:text-[#E31D2E] group-hover:-translate-y-0.5 transition-all duration-300 tracking-tight line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Action Circle Arrow */}
                        <div className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-[#111111] group-hover:bg-[#E31D2E] group-hover:border-[#E31D2E] group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-sm">
                          <ArrowUpRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:rotate-45" />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs leading-relaxed font-medium text-[#575757] line-clamp-2 mb-4">
                        {description}
                      </p>
                    </div>

                    {/* Tech / Feature Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-neutral-100">
                      {techTags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-neutral-100/80 text-[#575757] text-[10px] font-bold tracking-wide group-hover:bg-[#E31D2E]/10 group-hover:text-[#E31D2E] transition-colors duration-300 truncate max-w-[130px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
