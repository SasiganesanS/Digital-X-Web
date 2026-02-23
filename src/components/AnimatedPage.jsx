import React from 'react';
import { motion } from 'framer-motion';

// Pure opacity crossfade — no Y-slide to avoid layout gaps that expose the background
const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3,
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      // Always fill the viewport with the dark bg so no white shows through during fade
      style={{ minHeight: "100vh", backgroundColor: "#080808" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;