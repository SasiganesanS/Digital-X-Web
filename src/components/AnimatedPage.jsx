import React from 'react';
import { motion } from 'framer-motion';

// These are the animation settings
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20 // Start 20px down
  },
  in: {
    opacity: 1,
    y: 0 // Animate to 0
  },
  out: {
    opacity: 0,
    y: -20 // Exit 20px up
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;