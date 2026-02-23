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
        {/* Primary gradient overlay with highlight colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-highlight-purple/30 via-background to-highlight-mint/20"></div>

        {/* Interactive light following mouse - using primary color */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-radial from-primary/20 via-primary/10 to-transparent rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x * 4 - 192, // Center the 384px (96*4) width
            y: mousePosition.y * 4 - 192,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        />

        {/* Secondary mouse follower with secondary color */}
        <motion.div
          className="absolute w-64 h-64 bg-gradient-radial from-secondary/15 via-secondary/5 to-transparent rounded-full blur-2xl pointer-events-none"
          animate={{
            x: mousePosition.x * 2.5 - 128,
            y: mousePosition.y * 2.5 - 128,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />

        {/* Animated geometric shapes with UI colors */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 border-2 border-ui/30 rounded-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        <motion.div
          className="absolute bottom-32 left-16 w-48 h-48 bg-highlight-purple/40 rounded-full"
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute top-1/3 left-1/4 w-32 h-32 border border-ui/40 rotate-45"
          animate={{
            rotate: [45, 405],
            x: [0, 50, 0],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Floating orbs with highlight colors */}
        <motion.div
          className="absolute top-1/4 right-1/3 w-24 h-24 bg-gradient-to-br from-highlight-mint/60 to-highlight-mint/20 rounded-full blur-xl"
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-gradient-to-tl from-highlight-purple/50 to-transparent rounded-full blur-2xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Subtle pattern overlay with primary color */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #371445 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Gradient mesh for depth with primary color */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.03]"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-primary/[0.04] via-transparent to-transparent"></div>

        {/* Animated light rays with primary color */}
        <motion.div
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"
          animate={{
            opacity: [0, 1, 0],
            scaleY: [0.5, 1, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-secondary/15 to-transparent"
          animate={{
            opacity: [0, 0.7, 0],
            scaleY: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

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
