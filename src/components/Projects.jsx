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
import img1 from '../assets/project-cover/photo 1.png';
import img2 from '../assets/project-cover/photo 2.png';
import img3 from '../assets/project-cover/photo 3.png';
import img4 from '../assets/project-cover/photo 4.png';
import img5 from '../assets/project-cover/photo 5.png';

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
    { image: img1, title: 'Web Development', desc: 'Responsive and fast-loading websites' },
    { image: img2, title: 'Mobile Application', desc: 'User-friendly interface with smooth navigation' },
    { image: img3, title: 'Cloud Solutions', desc: 'Scalable cloud infrastructure and services' },
    { image: img4, title: 'UI/UX Design', desc: 'Intuitive designs that users love' },
    { image: img5, title: 'Honeybee Platform', desc: 'Modern e-commerce solution' },
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
    <div className="w-full hero-project-container text-white overflow-x-hidden">
      {/* ------------------ Hero Section ------------------ */}
      <section
        ref={sectionRef}
        className="relative w-full dark-section bg-[#080808] h-screen min-h-[100vh] max-h-[100vh] flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden projects-hero-4k"
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
      <section className="projects-empower-section bg-[#080808] py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#E8192C] text-xs font-black uppercase tracking-[0.4em] mb-4"
            >
              Our Workflow
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black text-white leading-tight"
            >
              We research, create, launch, and optimize{" "}
              <span className="text-[#E8192C]">transformative brand experiences</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {data.map((item, index) => {
              const icons = [
                <TrendingUp className="w-6 h-6 text-white" />,
                <ArrowUpRight className="w-6 h-6 text-white" />,
                <Star className="w-6 h-6 text-white" />,
                <Check className="w-6 h-6 text-white" />
              ];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="relative group rounded-[2rem] p-10 min-h-[520px] flex flex-col overflow-hidden transition-all duration-500 bg-[#0c0c0c] border border-white/5 hover:border-[#E8192C]/40 hover:shadow-[0_0_30px_rgba(232,25,44,0.15)]"
                >
                  {/* Numeral with Red Underline */}
                  <div className="absolute top-10 right-10 flex flex-col items-end">
                    <span className="text-4xl font-black text-white/20 group-hover:text-[#E8192C]/30 transition-colors">
                      0{index + 1}
                    </span>
                    <div className="w-8 h-[2px] mt-2 bg-[#E8192C]" />
                  </div>

                  {/* Icon Container with Red Theme */}
                  <div className="w-14 h-14 flex items-center justify-center mb-10 shadow-xl rounded-2xl bg-gradient-to-br from-[#E8192C] to-black border border-white/10">
                    {icons[index]}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 mb-8">
                    <h3 className="text-2xl font-black mb-5 leading-tight text-white">
                      {item.title.split(' & ').map((part, i) => (
                        <React.Fragment key={i}>
                          {part} {i === 0 && <br />}
                        </React.Fragment>
                      ))}
                    </h3>
                    <p className="text-sm leading-relaxed font-medium text-white/50 group-hover:text-white/70 transition-colors">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Illustration (Red SVG Patterns - Increased Visibility) */}
                  <div className="mt-auto relative w-full h-32 overflow-hidden pointer-events-none opacity-80">
                    {index === 0 && (
                      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#E8192C]/40 to-transparent" 
                           style={{ clipPath: "polygon(0 80%, 20% 60%, 40% 90%, 60% 50%, 80% 85%, 100% 70%, 100% 100%, 0 100%)" }} />
                    )}
                    {index === 1 && (
                      <div className="grid grid-cols-10 gap-2 absolute bottom-2 left-0 opacity-40">
                        {[...Array(30)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#E8192C]" />)}
                      </div>
                    )}
                    {index === 2 && (
                      <div className="absolute bottom-4 left-0 w-full h-full flex items-end">
                        <div className="flex items-end gap-1 h-16 w-full px-2">
                           {[...Array(8)].map((_, i) => <div key={i} className="flex-1 bg-[#E8192C]/20 rounded-t-sm" style={{ height: `${20 + i * 10}%` }} />)}
                        </div>
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
                          <path d="M0,80 Q50,70 100,40 T200,10" fill="none" stroke="#E8192C" strokeWidth="3" strokeLinecap="round" />
                          <circle cx="100" cy="40" r="4" fill="#E8192C" className="animate-pulse" />
                        </svg>
                      </div>
                    )}
                    {index === 3 && (
                      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-40">
                        <div className="grid grid-cols-3 gap-2">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-8 h-8 bg-[#E8192C]" style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Red Ambient Glow */}
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#E8192C]/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#E8192C]/10 transition-all duration-700" />
                </motion.div>
              );
            })}
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
