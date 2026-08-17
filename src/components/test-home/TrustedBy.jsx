import React, { useState } from "react";
import { motion } from "framer-motion";
import "./TrustedBy.css"; // We'll create this for the marquee animation

// Import your client logos
import vishnu from "../../assets/clients/School.webp";
import jkk from "../../assets/clients/jkk.webp";
import thilaga from "../../assets/clients/Thilaga-Impex.webp";
import capturever from "../../assets/clients/Captureever.webp";

// We'll put them in an array to make it easy to manage
const logos = [
  { src: vishnu, alt: "Vishnu Lakshmi School" },
  { src: jkk, alt: "JKK TEX" },
  { src: thilaga, alt: "Thilaga Impex" },
  { src: capturever, alt: "Captureever" },
  { src: vishnu, alt: "Vishnu Lakshmi School" },
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
      {/* Background System */}
      <div className="absolute inset-0 bg-white" />
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
