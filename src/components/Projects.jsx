import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "./ContactForm";
import { ArrowUpRight } from "lucide-react";
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
        className="relative w-full dark-section bg-gradient-to-br from-[#0f0418] via-[#1a0b2e] to-[#2d1b3d] min-h-screen flex flex-col md:flex-row items-center justify-center pt-33 pb-16 md:pt-0 md:pb-0 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden projects-hero-4k"
      >
        <motion.div
          animate={{
            x: [0, 150, 0],
            y: [0, -100, 0],
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        />

        {/* Animated mesh gradient overlay */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(184, 41, 255, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.2) 0%, transparent 50%)`,
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
          className="absolute bottom-1/3 right-1/3 w-80 h-80 border border-purple-300/10 rounded-full"
        />

        {/* Left content */}
        <div className="text-white max-w-2xl z-10 flex flex-col justify-center mb-8 md:mb-0 w-full md:w-1/2 md:pr-8 lg:pr-12">
          <h1 className="text-3xl sm:text-4xl md:text-[2.7rem] lg:text-5xl xl:text-6xl text-center md:text-left text-white font-semibold leading-[1.2] md:leading-[1.3] mb-6 md:ml-6">
            Collaborate <br />
            for innovative solutions
          </h1>

          <p className="text-white/80 text-center md:text-left mb-6 sm:mb-7 text-lg sm:text-xl md:text-[0.95rem] max-w-lg mx-auto md:mx-0 leading-relaxed md:ml-6">
            Scalable, secure, and sustainable digital products that accelerate
            growth.
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
              className="bg-white/10  cta-font backdrop-blur-sm border border-white/20 text-white rounded-full font-medium px-6 sm:px-8 py-3 text-sm sm:text-base shadow-md w-full sm:w-fit  hover:bg-purple-500/30 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/30 transition-colors duration-300"
              onClick={() => setShowContactForm(true)}
            >
              Contact Us
            </button>
            <button
              className="bg-white/10 cta-font backdrop-blur-sm border border-white/20 text-white font-medium px-6 sm:px-8 py-3 text-sm sm:text-base rounded-full w-full sm:w-fit  hover:bg-purple-500/30 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/30 transition-colors duration-300"
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
      <section className="min-h-screen bg-white flex flex-col items-center justify-center px-10 py-12 sm:py-16">
        {/* Section Header */}
        <div className="w-full text-center mb-10 sm:mb-14">
          <p className="text-[#371445]/70 text-sm sm:text-base font-medium mb-3 projects-section-header">
            Empowering progress through innovation and engineering excellence.
          </p>
          <h1 className="text-xl text-center sm:text-2xl md:text-[33px] font-bold text-[#371445] leading-loose projects-section-header">
            We research, design, build, and deploy transformative digital <br />
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
              rounded-2xl shadow-2xl shadow-purple-500/40 overflow-hidden cursor-pointer transition-all duration-500
              bg-gradient-to-br from-[#371445] via-[#4a1a5c] to-[#5d2073] text-white translate-y-[-8px]"
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
                    "radial-gradient(circle at 50% 50%, rgba(184, 41, 255, 0.3), transparent 70%)",
                }}
              />

              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg border-purple-300/50" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 rounded-br-lg border-purple-300/50" />

              {/* Animated border glow - always active */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(184, 41, 255, 0.3)",
                    "0 0 40px rgba(184, 41, 255, 0.5)",
                    "0 0 20px rgba(184, 41, 255, 0.3)",
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
                  className="absolute w-2 h-2 bg-purple-300 rounded-full blur-sm"
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
                className="relative z-10 text-lg sm:text-xl font-bold mb-3 transition-all duration-300 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent bg-[length:200%_100%] dev-card-text"
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
                className="absolute bottom-4 right-4 text-5xl sm:text-6xl md:text-8xl font-extrabold select-none transition-all duration-300 bg-gradient-to-br from-purple-300/40 to-purple-500/20 bg-clip-text text-transparent"
              >
                {item.code}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ------------------ Blog Section ------------------ */}
      <section className="bg-white py-4 sm:py-6 px-2 md:pb-14 ">
        <div className="max-w-10xl mx-auto px-2  sm:px-6 ">
          <p className="text-[#371445]/70 text-center sm:text-lg mb-2 font-medium projects-section-header">
            Praskla Blogs
          </p>
          <h1 className="text-lg text-center sm:text-[28px] md:text-[35px] font-bold text-[#371445] mb-6 sm:mb-10 projects-section-header">
            Read Praskla Technologies <br className="sm:hidden" /> Works
          </h1>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                role="button"
                tabIndex={0}
                onClick={() =>
                  navigate(`/blog/${index}`, {
                    state: post,
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    navigate(`/blog/${index}`, {
                      state: post,
                    });
                }}
                className="group block rounded-md relative aspect-[3/3] overflow-hidden shadow-lg transform transition duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                <div className="absolute inset-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                  <div className="flex items-end justify-between gap-1">
                    <h3 className="text-white text-xs sm:text-[15px] font-normal leading-snug line-clamp-3 flex-1">
                      {post.title}
                    </h3>
                    <div className="flex-shrink-0">
                      <ArrowUpRight className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
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
