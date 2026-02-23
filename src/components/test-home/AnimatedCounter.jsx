import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

function AnimatedCounter({ to }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Trigger only once

  useEffect(() => {
    if (isInView) {
      // Animate from 0 to the target number
      animate(0, to, {
        duration: 2, // 2-second animation
        onUpdate(value) {
          // Ensure the ref is still valid
          if (ref.current) {
            // Update the text, rounding to a whole number
            ref.current.textContent = value.toFixed(0);
          }
        },
      });
    }
  }, [isInView, to]); // Rerun if the number or view state changes

  return <span ref={ref}>0</span>;
}

export default AnimatedCounter;