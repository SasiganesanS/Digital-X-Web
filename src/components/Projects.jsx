import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "./ContactForm";
import { ArrowUpRight, Star, Check, TrendingUp } from "lucide-react";
import "../index.css";
import { clientData, data } from "../constants";
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

          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-7 md:ml-6">
            {[
              { label: "Clients", value: counts.clients },
              { label: "Projects", value: counts.projects },
              { label: "Tie-ups", value: counts.tieups },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md py-2.5 md:py-3 rounded-xl flex flex-col items-center hover:bg-white/10 transition duration-300 border border-white/5"
              >
                <span className="text-white font-black text-xl md:text-2xl">
                  {item.value}+
                </span>
                <span className="text-[#E8192C] text-[10px] uppercase font-black tracking-[0.2em]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex projects-cta sm:flex-row gap-4 sm:gap-4 w-full sm:w-auto justify-center md:justify-start pt-6 md:ml-6">
            <button
              className="bg-[#E8192C] text-white rounded-full font-bold px-8 py-4 shadow-lg shadow-[#E8192C]/20 hover:bg-[#ff2235] transition-all"
              onClick={() => setShowContactForm(true)}
            >
              Contact Us
            </button>
            <button
              className="bg-white/5 border border-white/10 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all"
              onClick={() => navigate("/services")}
            >
              Start Your Plan
            </button>
          </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-end">
            {data.map((item, index) => {
              const heights = ["h-[480px]", "h-[400px]", "h-[320px]", "h-[240px]"];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group relative p-10 ${heights[index]} rounded-[2rem] bg-gradient-to-br from-black/80 to-[#E8192C]/30 backdrop-blur-xl border border-white/10 hover:border-[#E8192C]/30 hover:shadow-2xl hover:shadow-[#E8192C]/10 transition-all duration-500 overflow-hidden cursor-default`}
                >
                  {/* Decorative corner accents */}
                  <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/10 rounded-tl-lg group-hover:border-[#E8192C]/40 transition-colors" />
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/10 rounded-br-lg group-hover:border-[#E8192C]/40 transition-colors" />

                  <div className="relative z-10 h-full">
                    {/* Default State: Title (Centered) */}
                    <div className="absolute inset-0 flex items-center justify-center p-6 transition-all duration-500 group-hover:opacity-0 group-hover:scale-90 group-hover:pointer-events-none">
                      <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter text-center">
                        {item.title}
                      </h3>
                    </div>

                    {/* Hover State: Sub-content (Flex distribution to prevent overlap) */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0 pointer-events-none">
                      <p className={`text-white/70 leading-relaxed font-medium text-center ${index === 3 ? "text-[10px] sm:text-xs leading-tight" :
                        index === 2 ? "text-sm" : "text-sm sm:text-base"
                        }`}>
                        {item.desc}
                      </p>
                      <div className="flex justify-end w-full">
                        <span className={`font-black text-white/10 select-none italic tracking-tighter leading-none ${index === 0 || index === 1 ? "text-7xl" :
                          index === 2 ? "text-5xl" : "text-4xl"
                          }`}>
                          {item.code}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Subtle Background Glow */}
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#E8192C]/5 rounded-full blur-3xl pointer-events-none transition-colors duration-500 group-hover:bg-[#E8192C]/15" />
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
