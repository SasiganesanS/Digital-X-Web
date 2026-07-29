import React from 'react';
import { motion } from 'framer-motion';
import ErrorBoundary from './ErrorBoundary';

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
      className="page-layout-wrapper"
      // Always fill the viewport with a transparent bg so the universe background shows through
      style={{ minHeight: "100vh", backgroundColor: "transparent" }}
    >
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </motion.div>
  );
};

export default AnimatedPage;