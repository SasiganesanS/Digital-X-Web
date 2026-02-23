import React, { useState } from "react";
import { motion } from "framer-motion";
import "./TrustedBy.css"; // We'll create this for the marquee animation

// Import your client logos
import vishnu from "../../assets/clients/School.jpg";
import vilcet from "../../assets/clients/VILCET.png";
import jkk from "../../assets/clients/jkk.png";
import thilaga from "../../assets/clients/Thilaga-Impex.png";
import capturever from "../../assets/clients/Captureever.png";
// Add 1-3 more logos here if you have them for a smoother scroll

// We'll put them in an array to make it easy to manage
const logos = [
  { src: vishnu, alt: "Vishnu Lakshmi School" },
  { src: vilcet, alt: "VILCET" },
  { src: jkk, alt: "JKK TEX" },
  { src: thilaga, alt: "Thilaga Impex" },
  { src: capturever, alt: "Captureever" },
  // Let's duplicate them if you only have 5, to make the loop look full
  { src: vishnu, alt: "Vishnu Lakshmi School" },
  { src: vilcet, alt: "VILCET" },
];

function TrustedBy() {
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
      id="trusted-by"
      className="relative py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced Background System */}
      <div className="absolute inset-0">
        {/* Interactive mouse follower */}
        <motion.div
          className="absolute w-72 h-72 bg-gradient-radial from-[#371445]/12 via-[#371445]/6 to-transparent rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x * 2.5 - 144,
            y: mousePosition.y * 2.5 - 144,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 25 }}
        />

        {/* Floating elements */}
        <motion.div
          className="absolute top-16 left-16 w-24 h-24 border border-[#371445]/10 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        <motion.div
          className="absolute bottom-20 right-20 w-16 h-16 bg-[#371445]/8 rounded-lg"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `linear-gradient(#371445 1px, transparent 1px), linear-gradient(90deg, #371445 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>
      <div className="relative z-10 w-[90%] max-w-6xl mx-auto text-center">
        {/* Section Headline */}
        <h2 className="text-xl md:text-[22px] lg:text-2xl font-semibold text-[#371445] mb-12">
          Trusted by industry leaders and innovators
        </h2>

        {/* Marquee Container: 
          - `overflow-hidden` hides the scrolling logos outside the box
          - `[mask-image:...]` creates a soft fade-out effect on the left and right edges
        */}
        <div className="w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          {/* Animated Track:
            - `flex` and `animate-scroll` are the key
            - We map the logos array TWICE to create the seamless infinite loop
          */}
          <div className="flex w-max animate-scroll pause-on-hover">
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="flex-shrink-0 mx-8 md:mx-12">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-14 md:h-16 lg:h-20 w-auto object-contain opacity-90
                             grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 
                             transition-all duration-300 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustedBy;
