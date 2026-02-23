import React, { useState } from "react";
import { motion } from "framer-motion";

function Contact() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.section
      id="contact"
      className="py-24 md:py-32 bg-[#301045] relative overflow-hidden dark-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced Background System */}
      <div className="absolute inset-0">
        {/* Interactive mouse follower */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-radial from-white/8 via-white/4 to-transparent rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x * 4 - 192,
            y: mousePosition.y * 4 - 192,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />

        {/* Secondary follower */}
        <motion.div
          className="absolute w-64 h-64 bg-gradient-radial from-white/6 via-white/2 to-transparent rounded-full blur-2xl pointer-events-none"
          animate={{
            x: mousePosition.x * 2.5 - 128,
            y: mousePosition.y * 2.5 - 128,
          }}
          transition={{ type: "spring", stiffness: 80, damping: 25 }}
        />

        {/* Floating shapes */}
        <motion.div
          className="absolute top-16 right-16 w-32 h-32 border border-white/10 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 35, repeat: Infinity, ease: "linear" },
            scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        <motion.div
          className="absolute bottom-20 left-20 w-24 h-24 bg-white/5 rounded-2xl"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="w-[90%] max-w-4xl mx-auto text-center relative z-10">
        {/* Animated Headline */}
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Let’s Build Something Impactful Together
        </motion.h2>

        {/* Animated Subtext */}
        <motion.p
          className="text-xl md:text-2xl mb-10 text-gray-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Reach out for your next project or partnership.
        </motion.p>

        {/* Animated CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            type: "spring",
            stiffness: 150,
          }}
        >
          <a
            // Use mailto: for a simple link, or your Calendly link
            href="mailto:hello@yourcompany.com"
            className="inline-block bg-white text-[#301045] font-bold py-4 px-10 rounded-lg shadow-lg
                       text-lg transform transition-all duration-300
                       hover:bg-gray-200 hover:-translate-y-1 hover:shadow-2xl
                       animate-pulse" // This gives the subtle pulse effect
          >
            Schedule a Call
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Contact;
