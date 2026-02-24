import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "./ContactForm";
import { ArrowUpRight, Star, Check, TrendingUp } from "lucide-react";
import "../index.css";
import { clientData, data, blogPosts } from "../constants";
import "./Projects.css"
// Import all images used in the sliding showcase
import webImg from '../assets/services-img/web.jpg';
import mobileImg from '../assets/services-img/mobile.jpg';
import cloudImg from '../assets/services-img/cloud.jpg';
import uiImg from '../assets/services-img/ui.jpg';
import honeybeeImg from '../assets/project-cover/honeybee1.jpeg';
import skillBridgeImg from '../assets/project-cover/skillBridge1.jpeg';
import tipyImg from '../assets/project-cover/tipy1.jpeg';
import customImg from '../assets/web.jpeg';

const Projects = () => {
  const [active, setActive] = useState(null);
  const [isTouch, setIsTouch] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [counts, setCounts] = useState({ clients: 0, projects: 0, tieups: 0 });
  const [imageIndex, setImageIndex] = useState(0);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  // Project images data - IT & Modern Tech focused
  const projectImages = [
    { image: webImg, title: 'Web Development', desc: 'Responsive and fast-loading websites' },
    { image: mobileImg, title: 'Mobile Application', desc: 'User-friendly interface with smooth navigation' },
    { image: cloudImg, title: 'Cloud Solutions', desc: 'Scalable cloud infrastructure and services' },
    { image: uiImg, title: 'UI/UX Design', desc: 'Intuitive designs that users love' },
    { image: honeybeeImg, title: 'Honeybee Platform', desc: 'Modern e-commerce solution' },
    { image: skillBridgeImg, title: 'SkillBridge', desc: 'Educational technology platform' },
    { image: tipyImg, title: 'Tipy Application', desc: 'Innovative mobile app' },
    { image: customImg, title: 'Custom Solutions', desc: 'Tailored development for unique needs' },
  ];

  // Auto-slide images
  useEffect(() => {
    const t = setInterval(
      () => setImageIndex((p) => (p + 1) % projectImages.length),
      4000
    );
    return () => clearInterval(t);
  }, [projectImages.length]);

  // Preload images
  useEffect(() => {
    projectImages.forEach((proj) => {
      const img = new Image();
      img.src = proj.image;
    });
  }, [projectImages]);

  // Detect touch devices
  useEffect(() => {
    const handleTouch = () => setIsTouch(true);
    window.addEventListener("touchstart", handleTouch);
    return () => window.removeEventListener("touchstart", handleTouch);
  }, []);

  // Counting animation when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const duration = 2000; // slower count duration (ms)
            const start = performance.now();

            const animate = (timestamp) => {
              const progress = Math.min((timestamp - start) / duration, 1);
              setCounts({
                clients: Math.floor(15 * progress),
                projects: Math.floor(20 * progress),
                tieups: Math.floor(20 * progress),
              });
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleClick = (index) => {
    setActive(active === index ? null : index);
  };

  // Add responsive styles for tab view
  const responsiveStyles = `
    @media (min-width: 768px) and (max-width: 1024px) {
      .grid-cols-1 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .md\:flex-row {
        flex-direction: column;
      }
      .md\:gap-4 {
        gap: 2rem;
      }
      .text-4xl {
        font-size: 2rem;
      }
    }
  `;

  // Inject responsive styles
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = responsiveStyles;
  document.head.appendChild(styleSheet);

  return (
    <div className="w-full hero-project-container">
      {/* ------------------ Hero Section ------------------ */}
      <section
        ref={sectionRef}
        className="relative w-full dark-section bg-[#080808] min-h-screen flex flex-col md:flex-row items-center justify-center pt-33 pb-16 md:pt-0 md:pb-0 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden projects-hero-4k"
      >
        <motion.div
          animate={{
            x: [0, 150, 0],
            y: [0, -100, 0],
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-[#E8192C]/10 rounded-full blur-3xl"
        />

        {/* Animated mesh gradient overlay */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(232, 25, 44, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(232, 25, 44, 0.1) 0%, transparent 50%)`,
            backgroundSize: "200% 200%",
          }}
        />

        {/* Floating particles/stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              x: [0, i % 2 ? 30 : -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-white/40"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${5 + i * 4.5}%`,
              top: `${10 + ((i * 4) % 80)}%`,
            }}
          />
        ))}

        {/* Animated grid pattern */}
        <motion.div
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Pulsing rings/circles */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/10 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 3 }}
          className="absolute bottom-1/3 right-1/3 w-80 h-80 border border-[#E8192C]/10 rounded-full"
        />

        {/* Left content */}
        <div className="text-white max-w-2xl z-10 flex flex-col justify-center mb-8 md:mb-0 w-full md:w-1/2 md:pr-8 lg:pr-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-[3.2rem] lg:text-6xl xl:text-7xl text-center md:text-left text-white font-bold leading-[1.1] mb-8 md:ml-6 tracking-tight"
          >
            Collaborate <br />
            <span className="text-[#E8192C]">
              for meaningful brand growth
            </span>
          </motion.h1>

          <p className="text-white/80 text-center md:text-left mb-6 sm:mb-7 text-lg sm:text-xl md:text-[0.95rem] max-w-lg mx-auto md:mx-0 leading-relaxed md:ml-6">
            Strategic, creative, and performance-driven marketing solutions that accelerate visibility and revenue.
          </p>

          {/* Mobile/Tablet: single-line infinite marquee */}
          <style>{`
            @keyframes praskla-marquee { 0% { transform: translateX(0%);} 100% { transform: translateX(-50%);} }
            .praskla-marquee { display: flex; gap: 2.5rem; align-items: center; white-space: nowrap; }
            .praskla-marquee-wrap { overflow: hidden; }
          `}</style>

          <div className="md:hidden mb-5 praskla-marquee-wrap w-full">
            <div
              className="praskla-marquee"
              style={{ animation: "praskla-marquee 12s linear infinite" }}
            >
              {[
                { label: "Clients", value: counts.clients },
                { label: "Projects", value: counts.projects },
                { label: "Tie-ups", value: counts.tieups },
              ]
                .concat([
                  { label: "Clients", value: counts.clients },
                  { label: "Projects", value: counts.projects },
                  { label: "Tie-ups", value: counts.tieups },
                ])
                .map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-white/90 px-1"
                  >
                    <span className="font-bold text-lg">{item.value}+</span>
                    <span className="text-sm text-white/70">{item.label}</span>
                    {i % 3 !== 2 && (
                      <span className="mx-2 text-white/40">•</span>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Desktop view*/}
          <div className="hidden md:grid md:grid-cols-4 gap-3 md:gap-4 mb-7 md:ml-6">
            {[
              { label: "Clients", value: counts.clients },
              { label: "Projects", value: counts.projects },
              { label: "Tie-ups", value: counts.tieups },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md py-2.5 md:py-3 rounded-lg flex flex-col items-center hover:bg-white/20 transition duration-300"
              >
                <span className="text-white font-bold text-base md:text-lg lg:text-xl">
                  {item.value}+
                </span>
                <span className="text-white/70 text-xs md:text-sm">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex projects-cta sm:flex-row gap-4 sm:gap-4 w-full sm:w-auto justify-center md:justify-start pt-6 md:ml-6">
            <button
              className="bg-white/10  cta-font backdrop-blur-sm border border-white/20 text-white rounded-full font-medium px-6 sm:px-8 py-3 text-sm sm:text-base shadow-md w-full sm:w-fit  hover:bg-[#E8192C]/30 hover:border-[#E8192C]/50 hover:shadow-lg hover:shadow-[#E8192C]/30 transition-colors duration-300"
              onClick={() => setShowContactForm(true)}
            >
              Contact Us
            </button>
            <button
              className="bg-white/10 cta-font backdrop-blur-sm border border-white/20 text-white font-medium px-6 sm:px-8 py-3 text-sm sm:text-base rounded-full w-full sm:w-fit  hover:bg-[#E8192C]/30 hover:border-[#E8192C]/50 hover:shadow-lg hover:shadow-[#E8192C]/30 transition-colors duration-300"
              onClick={() => navigate("/services")}
            >
              Start Your Plan
            </button>
          </div>
        </div>

        {/* Right content — Hero image for mobile, sliding showcase for md+ */}
        {/* Mobile: show static hero image and text */}
        <div className="flex w-full md:w-1/2 items-center justify-center mt-6 md:mt-0 md:pl-8 lg:pl-12">
          {/* Desktop: show sliding image showcase only on md+ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
          >
            {/* Subtle accent lines */}
            <div className="absolute -top-4 left-0 w-20 h-px bg-gradient-to-r from-white/40 to-transparent" />
            <div className="absolute -top-4 right-0 w-20 h-px bg-gradient-to-l from-white/40 to-transparent" />
            <div className="absolute -bottom-4 left-0 w-20 h-px bg-gradient-to-r from-white/40 to-transparent" />
            <div className="absolute -bottom-4 right-0 w-20 h-px bg-gradient-to-l from-white/40 to-transparent" />

            {/* Image container with professional frame */}
            <div className="relative w-full h-[22vh] sm:h-[40vh] md:h-[45vh] lg:h-[50vh] max-h-[600px] rounded-xl overflow-hidden border border-white/20 shadow-2xl shadow-black/30 bg-white/5 backdrop-blur-sm">
              <AnimatePresence initial={false} mode="wait">
                {projectImages.map((img, idx) => (
                  idx === imageIndex && (
                    <motion.div
                      key={img.image}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-xl"
                      style={{
                        backgroundImage: `url(${img.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  )
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
      {/* ------------------ Development Cards Section ------------------ */}
      <section className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-10 py-12 sm:py-16 border-t border-white/5">
        {/* Section Header */}
        <div className="w-full text-center mb-10 sm:mb-14 px-4">
          <p className="text-[#E8192C]/80 text-sm sm:text-base font-medium mb-3 uppercase tracking-widest">
            Empowering progress through mindful strategy and creative execution.
          </p>
          <h1 className="text-xl sm:text-2xl md:text-[33px] font-bold text-[#E8192C] leading-tight">
            We research, create, launch, and optimize transformative brand experiences
          </h1>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full justify-items-center">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              viewport={{ once: true }}
              onClick={() => handleClick(index)}
              className="group relative p-5 sm:p-6 min-h-[260px] sm:min-h-[350px] w-full max-w-[340px] sm:max-w-[380px]
              rounded-2xl shadow-2xl shadow-[#E8192C]/20 overflow-hidden cursor-pointer transition-all duration-500
              bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#0A0A0A] text-white translate-y-[-8px] border border-white/5"
              style={{
                marginTop: `${index * 30}px`,
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              <motion.div
                className="absolute inset-0 opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(232, 25, 44, 0.1), transparent 70%)",
                }}
              />

              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg border-[#E8192C]/30" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 rounded-br-lg border-[#E8192C]/30" />

              {/* Animated border glow - always active */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(232, 25, 44, 0.1)",
                    "0 0 40px rgba(232, 25, 44, 0.2)",
                    "0 0 20px rgba(232, 25, 44, 0.1)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl pointer-events-none"
              />

              {/* Particle effect dots - always active */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: [0, i % 2 ? 30 : -30],
                    y: [0, i % 3 ? 30 : -30],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut",
                  }}
                  className="absolute w-2 h-2 bg-[#E8192C] rounded-full blur-sm"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${10 + i * 15}%`,
                  }}
                />
              ))}

              {/* Title with shimmer effect - always active */}
              <motion.h2
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="relative z-10 text-lg sm:text-xl font-bold mb-3 transition-all duration-300 bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent bg-[length:200%_100%] dev-card-text"
              >
                {item.title}
              </motion.h2>

              {/* Description - only visible on hover */}
              <p
                className="text-base sm:text-lg leading-relaxed absolute left-6 right-6 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 text-white/0 group-hover:text-white/95 tracking-wide transition-all duration-500 text-left dev-card-text"
                style={{
                  fontFamily:
                    "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  textShadow: "0 2px 2px rgba(0, 0, 0, 0.4)",
                  letterSpacing: "-0.01em",
                  fontWeight: "200",
                }}
              >
                {item.desc}
              </p>

              {/* Animated code number with gradient - always active */}
              <motion.span
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-4 right-4 text-5xl sm:text-6xl md:text-8xl font-extrabold select-none transition-all duration-300 bg-gradient-to-br from-[#E8192C]/40 to-[#E8192C]/10 bg-clip-text text-transparent"
              >
                {item.code}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ------------------ Portfolio Content Section ------------------ */}
      <section className="bg-[#080808] py-20 px-4 md:px-10 lg:px-20 border-t border-white/5 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <p className="text-[#E8192C] text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-4">
              Portfolio
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
              Our Portfolio & <span className="text-[#E8192C]">Creative Works</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-4xl">
              A curated selection of web, mobile, and design projects that reflect our versatility—from agile small-business solutions to enterprise-grade digital platforms. Our work emphasizes clean design, robust engineering, and user-centric experiences across every build.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Highlights */}
            <div className="space-y-8">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#E8192C]/10 flex items-center justify-center border border-[#E8192C]/20">
                  <Star className="w-5 h-5 text-[#E8192C]" />
                </span>
                Highlights include:
              </h3>
              <div className="space-y-4 pt-4">
                {[
                  "Responsive, mobile-first websites",
                  "E-commerce platforms & custom storefronts",
                  "Brand identity, UI & UX design systems",
                  "Seamless cross-platform compatibility",
                  "Performance-optimized, scalable builds",
                  "Modern technology stacks with built-in SEO optimization"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#E8192C]/10 flex items-center justify-center shrink-0 border border-[#E8192C]/20 group-hover:bg-[#E8192C] transition-all duration-300">
                      <Check className="w-3 h-3 text-[#E8192C] group-hover:text-white" />
                    </div>
                    <span className="text-white/80 group-hover:text-white transition-colors text-base md:text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Value Addition */}
            <div className="relative">
              {/* Decorative glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#E8192C]/5 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative bg-white/[0.02] backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/5 hover:border-white/10 transition-all duration-500 group">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-10 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#E8192C]/10 flex items-center justify-center border border-[#E8192C]/20">
                    <TrendingUp className="w-5 h-5 text-[#E8192C]" />
                  </span>
                  Value Addition
                </h3>

                <div className="space-y-8">
                  {[
                    "Presented the individual’s skills, experience, and achievements through a clear and well-structured portfolio layout, making it easy for visitors to quickly understand their professional profile.",
                    "Designed a responsive and visually consistent interface that reflects the individual’s personal brand while ensuring accessibility across devices and screen sizes.",
                    "Highlighted key projects, expertise, and career milestones in a concise and engaging format, helping the individual stand out to recruiters, clients, and collaborators.",
                    "Optimized the portfolio for performance and search visibility, improving loading speed and discoverability while maintaining a clean, modern user experience."
                  ].map((text, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-6"
                    >
                      <span className="text-3xl md:text-4xl font-black text-[#E8192C]/20 leading-none shrink-0 italic pt-1">
                        {i + 1}
                      </span>
                      <p className="text-white/60 text-sm md:text-base leading-relaxed group-hover:text-white/80 transition-colors">
                        {text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ Blogs Section ------------------ */}
      <section className="bg-[#080808] py-20 px-4 md:px-10 lg:px-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <p className="text-[#E8192C] text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-4">
              Our Stories
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
              Latest <span className="text-[#E8192C]">Blogs</span> & Case Studies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.slice(1, 3).map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => navigate(`/blog/${index + 1}`, { state: post })}
                className="group relative bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden cursor-pointer hover:border-[#E8192C]/30 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[#E8192C] text-xs font-bold uppercase tracking-widest">Case Study</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-white/40 text-xs">Praskla Technologies</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#E8192C] transition-colors duration-300 mb-4 line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/50 group-hover:text-white transition-colors duration-300 text-sm font-medium">
                    Read Full Story <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ContactForm modal */}
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
