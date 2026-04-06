import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Terminal,
  Smartphone,
  ShieldCheck,
  BarChart3,
  Leaf,
  Zap,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const Services = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const servicesData = [
    {
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
      title: "Web Development",
      desc: "We craft fast, responsive, and visually refined websites that strengthen brand presence."
    },
    {
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80",
      title: "Software Development",
      desc: "Reliable solutions tailored to business needs, enabling performance and growth."
    },
    {
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80",
      title: "App Development",
      desc: "High-performance applications that combine intuitive design with robustness."
    },
    {
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=400&q=80",
      title: "Cyber Security",
      desc: "Securing systems through advanced architectures, monitoring, and proactive risk management."
    },
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
      title: "Digital Marketing",
      desc: "Data-driven marketing strategies that enhance visibility and drive business results."
    },
    {
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
      title: "Sustainability",
      desc: "Integrating smart technologies and practices to support responsible digital scaling."
    }
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      // Calculate which dot to activate based on scroll position heavily factored by total scrolling children
      const scrollX = scrollRef.current.scrollLeft;
      const index = Math.min(
        servicesData.length - 1,
        Math.round((scrollX / scrollRef.current.scrollWidth) * servicesData.length)
      );
      setActiveIndex(index);
    }
  };

  return (
    <div className="bg-[#080808] min-h-screen text-white pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative px-[5%] pt-12 pb-10 md:pt-16 md:pb-12 overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#E8192C]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#E8192C]/3 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center border border-white/10 gap-2 px-3 py-1.5 bg-white/5 rounded-full mb-6">
              <Zap className="w-4 h-4 text-[#E8192C]" />
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Our Services</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
              Transforming Brands into <br />
              <span className="text-[#E8192C]">Digital Authority</span>
            </h1>

            <p className="text-white/50 text-xl md:text-2xl leading-relaxed max-w-3xl">
              Comprehensive branding, media, and performance marketing solutions designed to help your business grow strategically, creatively, and profitably.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Infinite Carousel Slider Section */}
      <section className="relative w-full px-[5%] py-20 pb-32 overflow-hidden bg-[#080808]">
        {/* Tilted Container with rich red/black mix and sparkles */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#080808] via-[#1a0000] to-[#250000] -rotate-3 scale-[1.2] shadow-2xl pointer-events-none" />
        
        {/* Animated Background Glows */}
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#E8192C]/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#E8192C]/5 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

        {/* Floating Sparkles in Background */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`bg-sparkle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full pointer-events-none z-0"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: "0 0 10px 2px rgba(232,25,44,0.6)",
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}

        <div className="relative z-10 w-full max-w-[1400px] mx-auto min-h-[550px]">
          
          <div className="flex flex-col items-center justify-center gap-2 mb-16 transform -rotate-2">
            <h2 className="text-4xl md:text-5xl font-black text-white text-center tracking-tight">
              Our <span className="text-[#E8192C]">Core Expertise</span>
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-[#E8192C] to-transparent rounded-full" />
          </div>

          <div className="relative w-full flex items-center justify-center transform -rotate-2">
            
            {/* Left Button */}
            <button
              onClick={scrollLeft}
              className="absolute -left-2 md:-left-12 lg:-left-16 z-30 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(232,25,44,0.3)] hover:scale-110 transition-transform active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Slider Track Container */}
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto gap-6 sm:gap-8 overflow-y-hidden snap-x snap-mandatory px-4 md:px-10 py-10 w-full no-scrollbar"
              onScroll={handleScroll}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* Loop the array endlessly or map multiple times */}
              {[...servicesData, ...servicesData].map((service, i) => (
                <div
                  key={i}
                  className="w-[85vw] sm:w-[320px] md:w-[350px] lg:w-[380px] flex-shrink-0 snap-center"
                >
                  <div className="relative bg-gradient-to-br from-[#080808] via-black to-[#E8192C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-8 pt-10 flex flex-col items-center text-center h-[340px] md:h-[360px] cursor-pointer hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(232,25,44,0.2)] transition-all duration-700 group border border-white/5 hover:border-[#E8192C]/40 overflow-hidden">
                    
                    {/* Internal sparkles inside the card */}
                    {[...Array(6)].map((_, si) => (
                      <motion.div
                        key={`card-sparkle-${si}`}
                        className="absolute w-1 h-1 bg-white rounded-full pointer-events-none z-0"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          boxShadow: "0 0 10px 2px rgba(232,25,44,0.6)",
                        }}
                        animate={{
                          opacity: [0, 0.8, 0],
                          scale: [0.5, 1.2, 0.5],
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 3,
                          ease: "easeInOut"
                        }}
                      />
                    ))}

                    {/* Circle Image */}
                    <div className="relative z-10 w-[110px] h-[110px] mb-8 rounded-full p-1.5 border-[3px] border-[#E8192C]/30 group-hover:border-[#E8192C] transition-all duration-500 flex items-center justify-center -mt-8 bg-black shadow-xl">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>

                    <h3 className="relative z-10 text-xl md:text-2xl font-black text-white mb-3 tracking-tight group-hover:text-[#E8192C] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="relative z-10 text-white/50 font-medium text-sm md:text-base leading-relaxed px-2 group-hover:text-white/70 transition-colors duration-300">
                      {service.desc}
                    </p>

                    {/* Bottom accent glow */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E8192C]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  </div>
                </div>
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={scrollRight}
              className="absolute -right-2 md:-right-12 lg:-right-16 z-30 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_20px_rgba(232,25,44,0.3)] hover:scale-110 transition-transform active:scale-95"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-12 transform -rotate-2">
            {servicesData.map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-500 rounded-full cursor-pointer ${
                  activeIndex % servicesData.length === i ? "w-8 h-2.5 bg-white scale-110" : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
                }`}
                onClick={() => {
                  if (scrollRef.current) {
                    scrollRef.current.scrollTo({ left: i * 360, behavior: "smooth" });
                  }
                }}
              />
            ))}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="px-[5%] py-12 md:py-16 pb-20">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] bg-gradient-to-r from-[#E8192C] to-[#b71422] p-8 md:p-12 text-center relative overflow-hidden shadow-[0_0_50px_rgba(232,25,44,0.15)]"
          >
            {/* Particles/Grain Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <h2 className="text-2xl md:text-3xl font-black text-white mb-6 relative z-10 leading-tight">
              See the Impact <br className="hidden md:block" />
              We've Delivered
            </h2>

            <Link
              to="/projects"
              className="inline-flex items-center justify-center bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95 relative z-10 shadow-2xl"
            >
              View Our Portfolio
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
