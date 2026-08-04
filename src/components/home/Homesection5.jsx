import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// CLIENT LOGO IMPORTS
import vishnu from "../../assets/clients/School.jpg";
import vilcet from "../../assets/clients/VILCET.png";
import jkk from "../../assets/clients/jkk.png";
import thilaga from "../../assets/clients/Thilaga-Impex.png";
import capturever from "../../assets/clients/Captureever.png";

// Simple SVG Icons for buttons
const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

// This is a new icon for the quote
const QuoteIcon = () => (
  <svg className="w-12 h-12 md:w-16 md:h-16 text-[#301045] opacity-10 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a2 2 0 0 0 2 2h2v-2H7a1 1 0 0 1-1-1V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a2 2 0 0 0 2 2h2v-2h-1a1 1 0 0 1-1-1V2a2 2 0 0 0-2-2Z" />
  </svg>
);

const reviews = [
  {
    id: 1, name: "Vishnu Lakshmi School", role: "Management", image: vishnu,
    review: "Praskla Digital X has helped us strengthen our foundation. Their innovative digital solutions seamlessly integrated technology into our learning, enhancing student engagement and administrative efficiency."
  },
  {
    id: 2, name: "VILCET", role: "Director", image: vilcet,
    review: "Praskla Digital X has been instrumental in bringing our vision to life. Their advanced digital tools and seamless automation have transformed our operations, ensuring efficiency and scalability."
  },
  {
    id: 3, name: "JKK TEX", role: "Founder", image: jkk,
    review: "Quality and innovation define us, and Praskla has elevated our business with cutting-edge solutions. From inventory management to digital storefronts, their tech streamlined our operations and expanded our reach."
  },
  {
    id: 4, name: "Thilaga Impex", role: "CEO", image: thilaga,
    review: "Efficiency and precision are crucial for us. Praskla provided seamless digital solutions that enhance our supply chain, optimize production, and ensure we meet global standards. A game-changer for our business."
  },
  {
    id: 5, name: "Captureever", role: "Creative Director", image: capturever,
    review: "Praskla Digital X helped us bring our creative vision to a larger audience. Their digital solutions optimized our workflow, enhanced our online presence, and streamlined customer engagement. A perfect tech partner!"
  }
];

// Define animation variants for the content
const textVariants = {
  enter: (direction) => ({
    y: direction > 0 ? 50 : -50,
    opacity: 0
  }),
  center: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: (direction) => ({
    y: direction < 0 ? 50 : -50,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" }
  })
};

const imageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.8
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3, ease: "easeIn" }
  })
};


const Homesection5 = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const review = reviews[page];

  const paginate = (newDirection) => {
    let newPage = page + newDirection;
    if (newPage < 0) {
      newPage = reviews.length - 1;
    } else if (newPage >= reviews.length) {
      newPage = 0;
    }
    setPage([newPage, newDirection]);
  };

  // Autoplay timer
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1); // Go to the next slide
    }, 8000); // Same 8-second interval
    return () => clearInterval(timer);
  }, [page]); // Re-run effect when page changes

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-12 sm:py-14 lg:py-16 bg-white relative overflow-hidden flex items-center"
    >
      {/* Background Blobs (using the custom blur from config) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neutral-100 rounded-full filter blur-[100px] opacity-40 animate-blob"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-100 rounded-full filter blur-[100px] opacity-40 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative z-10">

        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-[#301045] sm:text-4xl mb-4">
            Trusted by businesses like yours
          </h2>
          <div className="w-20 h-1 bg-[#301045] mx-auto mb-4 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our clients say about their success.
          </p>
        </motion.div>

        {/* New Slider Layout */}
        <div className="relative min-h-[400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

            {/* Left Side: Text Content */}
            <div className="relative flex flex-col justify-center h-[350px] md:h-[400px]">
              <QuoteIcon />
              {/* Animated Quote */}
              <AnimatePresence initial={false} custom={direction}>
                <motion.p
                  key={page}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute text-xl md:text-2xl italic text-gray-700 leading-relaxed"
                >
                  "{review.review}"
                </motion.p>
              </AnimatePresence>

              {/* Animated Author */}
              <div className="absolute bottom-0 left-0">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={page + "author"} // Unique key for author
                    custom={direction}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ delay: 0.1 }} // Stagger author animation
                  >
                    <h3 className="text-xl font-bold text-[#301045]">{review.name}</h3>
                    <p className="text-md font-medium text-[#301045]/70">{review.role}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side: Visual (Liquid Glass Card) */}
            <div className="relative flex items-center justify-center h-[350px] md:h-[400px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={page + "image"} // Unique key for image
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute w-72 h-72 md:w-80 md:h-80"
                >
                  {/* THIS IS THE LIQUID GLASS CARD FROM THE HERO */}
                  <div className="relative w-full h-full bg-white/30 rounded-3xl shadow-lg border border-white/20 backdrop-blur-lg transform -rotate-12 flex items-center justify-center p-8">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute -bottom-16 md:-bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xs flex items-center justify-center space-x-4">

            {/* Prev Button */}
            <button
              onClick={() => paginate(-1)}
              className="p-2 rounded-full text-[#301045] bg-white shadow-md hover:bg-gray-100 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft />
            </button>

            {/* Dots */}
            <div className="flex justify-center space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPage([index, index > page ? 1 : -1])}
                  className={`transition-all duration-300 ${page === index ? 'w-6 bg-[#301045]' : 'w-3 bg-gray-300 hover:bg-gray-400'
                    } h-3 rounded-full`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => paginate(1)}
              className="p-2 rounded-full text-[#301045] bg-white shadow-md hover:bg-gray-100 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Homesection5;