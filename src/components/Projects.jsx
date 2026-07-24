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
        className="relative w-full h-screen min-h-[100vh] max-h-[100vh] flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden projects-hero-4k bg-transparent"
      >
        <div className="max-w-2xl z-10 flex flex-col justify-center mb-8 md:mb-0 w-full md:w-1/2 md:pr-8 lg:pr-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-[3.2rem] lg:text-6xl xl:text-7xl text-center md:text-left font-black leading-[1.1] mb-8 md:ml-6 tracking-tight text-[#111111]"
          >
            Collaborate <br />
            <span className="text-[#E31D2E]">
              for meaningful brand growth
            </span>
          </motion.h1>

          <p className="text-[#575757] text-center md:text-left mb-6 sm:mb-7 text-lg sm:text-xl md:text-base max-w-lg mx-auto md:mx-0 leading-relaxed md:ml-6 font-medium">
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
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/60 shadow-[0_12px_32px_rgba(17,17,17,0.04)] bg-white/40 backdrop-blur-md">
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
      <section className="projects-empower-section bg-transparent py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#E31D2E] text-xs font-black uppercase tracking-[0.25em] mb-4"
            >
              Our Workflow
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black text-[#111111] leading-tight"
            >
              We research, create, launch, and optimize{" "}
              <span className="text-[#E31D2E]">transformative brand experiences</span>
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
                  className="clay-card relative group p-8 min-h-[460px] flex flex-col overflow-hidden"
                >
                  {/* Numeral */}
                  <div className="absolute top-8 right-8 flex flex-col items-end">
                    <span className="text-3xl font-black text-[#111111]/10 group-hover:text-[#E31D2E]/20 transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Icon Container */}
                  <div className="w-12 h-12 flex items-center justify-center mb-8 shadow-md rounded-2xl bg-[#E31D2E] border border-white/20">
                    {icons[index]}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 mb-4">
                    <h3 className="text-xl font-black mb-4 leading-tight text-[#111111]">
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------ Praskla Blogs Section ------------------ */}
      <section className="relative bg-transparent px-6 md:px-[5%] py-24 md:py-32 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h3 className="text-[#575757] text-xs font-bold tracking-[0.25em] uppercase mb-3">
              Praskla Blogs
            </h3>
            <h2 className="text-3xl md:text-5xl font-black text-[#111111] leading-tight mb-4">
              Read <span className="text-[#E31D2E]">Praskla Technologies Works</span>
            </h2>
          </motion.div>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogPosts.map((post, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  onClick={() => navigate(`/blog/${index}`)}
                  className="clay-card group relative flex flex-col overflow-hidden cursor-pointer p-3 pb-6"
                >
                  {/* Image Area */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[20px] border border-white/50 shadow-sm mb-5">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                    
                  {/* Text / Title Area */}
                  <div className="px-3 flex flex-col justify-between flex-grow relative">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <h4 className="text-lg font-black text-[#111111] leading-snug group-hover:text-[#E31D2E] transition-colors duration-300">
                        {post.title}
                      </h4>
                    </div>

                    {/* View Live Project Button */}
                    <div className="relative">
                      <div className="primary-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full group/btn">
                        <span className="text-[11px] font-black uppercase tracking-wider text-white">View Live Project</span>
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </div>
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
