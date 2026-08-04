import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Hero.css";
import { GlassCard } from "@developer-hub/liquid-glass";
import Aurora from "../backgrounds/Aurora";

function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-background text-text px-4"
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced Professional Background System */}
      <div className="absolute inset-0 overflow-hidden">
        <Aurora
          colorStops={["#F3EFFF", "#D8D0FE", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
        {/* Subtle background container */}
        <div className="absolute inset-0 bg-white" />

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-multiply"></div>
      </div>

      {/* Content Container (z-10 to sit on top of blobs) */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Animated Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-primary"
        >
          Accelerating Innovation with Intelligent Digital Solutions
        </motion.h1>

        {/* Animated Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl mb-10 text-text-light"
        >
          Empowering businesses through cutting-edge technology and seamless
          user experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          {/* Primary CTA with secondary (emerald green) color */}
          <button
            onClick={() => {
              const projectsSection = document.getElementById("projects");
              if (projectsSection) {
                projectsSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
            className="bg-secondary text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-secondary-dark transform hover:-translate-y-1 transition-all duration-300"
          >
            Explore Our Work
          </button>
          {/* Secondary CTA with primary color outline */}
          <button
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
            className="bg-background text-primary font-semibold py-3 px-8 rounded-lg border-2 border-primary hover:bg-primary hover:text-white transform hover:-translate-y-1 transition-all duration-300"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
