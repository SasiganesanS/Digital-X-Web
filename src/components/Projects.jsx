import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "./ContactForm";
import { ArrowUpRight, Star, Check, TrendingUp } from "lucide-react";
import "../index.css";
import { clientData, data, blogPosts } from "../constants";
import { projects as projectGridData } from "../data/projects";
import ProjectDetailModal from "./ProjectDetailModal";
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
  const [selectedProject, setSelectedProject] = useState(null);
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

  return (
    <div className="w-full hero-project-container text-white">
      {/* ------------------ Hero Section ------------------ */}
      <section
        ref={sectionRef}
        className="relative w-full dark-section bg-[#080808] min-h-screen flex flex-col md:flex-row items-center justify-center pt-32 pb-16 md:pt-0 md:pb-0 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden projects-hero-4k"
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

        <div className="text-white max-w-2xl z-10 flex flex-col justify-center mb-8 md:mb-0 w-full md:w-1/2 md:pr-8 lg:pr-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-[3.2rem] lg:text-6xl xl:text-7xl text-center md:text-left font-bold leading-[1.1] mb-8 md:ml-6 tracking-tight"
          >
            Collaborate <br />
            <span className="text-[#E8192C]">
              for meaningful brand growth
            </span>
          </motion.h1>

          <p className="text-white/80 text-center md:text-left mb-6 sm:mb-7 text-lg sm:text-xl md:text-[0.95rem] max-w-lg mx-auto md:mx-0 leading-relaxed md:ml-6">
            Strategic, creative, and performance-driven marketing solutions that accelerate visibility and revenue.
          </p>
        </div>

        <div className="flex w-full md:w-1/2 items-center justify-center mt-6 md:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative w-full max-w-lg aspect-square"
          >
            <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm">
              <AnimatePresence initial={false} mode="wait">
                {projectImages.map((img, idx) => (
                  idx === imageIndex && (
                    <motion.div
                      key={img.image}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0"
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
      <section className="bg-[#080808] px-6 py-24 sm:py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[#E8192C] text-xs font-black uppercase tracking-[0.4em] mb-4">Empowering progress through mindful strategy and creative execution.</p>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              We research, create, launch, and optimize <span className="text-[#E8192C]">transformative brand experiences</span>
            </h2>
          </div>

          <div className="relative w-full py-10 md:py-16 mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-end relative z-10">
              {data.map((item, index) => {
                // Shrinking heights to form a descending staircase when items are bottom-aligned
                const heights = ["h-[450px]", "h-[400px]", "h-[350px]", "h-[320px]"];
                
                // Sparkle particles for inside the box
                const sparkles = [
                  { top: "20%", left: "15%", delay: 0 },
                  { top: "45%", left: "30%", delay: 0.4 },
                  { top: "30%", right: "25%", delay: 0.8 },
                  { top: "65%", right: "15%", delay: 0.2 },
                  { top: "15%", left: "65%", delay: 0.6 },
                ];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`group relative p-8 rounded-[2rem] w-full ${heights[index]} bg-gradient-to-br from-black/80 to-[#E8192C]/30 backdrop-blur-xl border border-white/10 hover:border-[#E8192C]/40 hover:shadow-2xl hover:shadow-[#E8192C]/20 transition-all duration-500 overflow-hidden cursor-default`}
                  >
                    {/* Decorative corner accents */}
                    <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg group-hover:border-[#E8192C]/60 transition-colors duration-500" />
                    <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-lg group-hover:border-[#E8192C]/60 transition-colors duration-500" />

                    {/* Sparkles inside the box */}
                    {sparkles.map((pos, i) => (
                      <motion.span
                        key={i}
                        className="absolute w-[2.5px] h-[2.5px] rounded-full bg-white shadow-[0_0_8px_2px_rgba(232,25,44,0.6)]"
                        style={{ top: pos.top, left: pos.left, right: pos.right }}
                        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }}
                      />
                    ))}

                    {/* Content Container (Fully Visible, No Hover Hiding) */}
                    <div className="relative z-10 w-full h-full flex flex-col justify-between pt-10 pb-2">
                      <div className="flex flex-col gap-4">
                        <h3 className="text-xl lg:text-2xl font-bold text-white tracking-wide">
                          {item.title}
                        </h3>
                        <p className="text-white/60 leading-relaxed font-medium text-sm lg:text-base pr-2">
                          {item.desc}
                        </p>
                      </div>

                      {/* Large Watermark Code */}
                      <div className="absolute bottom-4 right-4 translate-x-2 translate-y-2 pointer-events-none">
                        <span className="font-black text-white/5 select-none tracking-tighter leading-none text-6xl md:text-7xl lg:text-8xl group-hover:text-white/10 transition-colors duration-500">
                          {item.code}
                        </span>
                      </div>
                    </div>

                    {/* Subtle Background Glow */}
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#E8192C]/10 rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:bg-[#E8192C]/20" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>


      {/* ------------------ Praskla Blogs Section ------------------ */}
      <section className="relative bg-[#080808] px-6 md:px-[5%] py-24 md:py-32 border-t border-white/5 overflow-hidden">
        {/* Background mesh/orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(232,25,44,0.06) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h3 className="text-white/60 text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-3">
              Praskla Blogs
            </h3>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              Read <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8192C] to-[#E8192C]">Praskla Technologies Works</span>
            </h2>
          </motion.div>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogPosts.map((post, index) => {
              // Sparkle particles over the entire card
              const sparkles = [
                { top: "15%", left: "10%", delay: 0 },
                { top: "45%", left: "80%", delay: 0.4 },
                { top: "70%", right: "20%", delay: 0.8 },
                { top: "85%", right: "80%", delay: 0.2 },
                { top: "35%", left: "50%", delay: 0.6 },
              ];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  onClick={() => navigate(`/blog/${index}`)}
                  className="group relative flex flex-col rounded-[1.5rem] bg-[#080808] border border-white/10 hover:border-[#E8192C]/40 transition-all duration-500 overflow-hidden cursor-pointer hover:shadow-[0_10px_40px_rgba(232,25,44,0.15)]"
                >
                  {/* Global Card Sparkles */}
                  {sparkles.map((pos, i) => (
                    <motion.span
                      key={i}
                      className="absolute w-[2.5px] h-[2.5px] rounded-full bg-white shadow-[0_0_8px_2px_rgba(232,25,44,0.6)] z-30 pointer-events-none"
                      style={{ top: pos.top, left: pos.left, right: pos.right }}
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }}
                    />
                  ))}

                  {/* Image Area */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 bg-[#080808] z-0 animate-pulse" />
                    <img
                      src={post.image}
                      alt={post.title}
                      className="relative z-10 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                    
                  {/* Text / Title Area (Below the Image! Mixed Black & Red Background) */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-grow relative bg-gradient-to-br from-[#080808] via-black to-[#E8192C]/40">
                    <div className="flex items-start justify-between gap-4 relative z-10 mb-6">
                      <h4 className="text-xl md:text-[1.35rem] font-bold text-white leading-snug group-hover:text-[#E8192C] transition-colors duration-400">
                        {post.title}
                      </h4>
                    </div>

                    {/* View Live Project Button - The primary CTA */}
                    <div className="relative z-10 mb-2">
                      <div className="inline-flex items-center gap-2 bg-[#E8192C] text-white px-5 py-2.5 rounded-full hover:bg-[#b71422] transition-colors shadow-lg shadow-[#E8192C]/20 group/btn">
                        <span className="text-[13px] font-black uppercase tracking-wider">View Live Project</span>
                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                    
                    {/* Bottom Accents */}
                    <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#E8192C]/0 to-transparent group-hover:via-[#E8192C]/50 transition-all duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal and Contact Form */}
      <ProjectDetailModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />

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
