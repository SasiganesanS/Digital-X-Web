import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimesCircle, FaArrowLeft } from "react-icons/fa";

/**
 * Responsive Modal Component
 * - Desktop: Displays as a modal with click-position animation
 * - Mobile: Displays as a full-page overlay with slide animation
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Callback when modal should close
 * @param {object} clickPosition - {x, y} position for origin animation (desktop only)
 * @param {string} maxWidth - Max width class (e.g., 'max-w-md', 'max-w-5xl') - desktop only
 * @param {ReactNode} children - Modal content
 */
export default function Modal({ 
  isOpen, 
  onClose, 
  clickPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 }, 
  maxWidth = "max-w-md",
  children 
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and window resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isOpen) {
      setIsMounted(true);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [isOpen]);

  if (!isOpen && !isMounted) return null;

  // Calculate center of viewport for final position
  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

  // Mobile Full-Page View - Actual page, not modal
  if (isMobile) {
    return (
      <AnimatePresence onExitComplete={() => setIsMounted(false)}>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-gradient-to-br from-[#0f0418] via-[#1a0b2e] to-[#2d1b3d] z-50 flex flex-col"
          >
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
            </div>
            
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-500 blur-[100px] pointer-events-none"
            />
            
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.08, 0.15, 0.08],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-indigo-600 blur-[120px] pointer-events-none"
            />

            {/* Mobile Header with Back Button */}
            <div className="flex-shrink-0 relative z-20 bg-gradient-to-r from-[#0f0418]/95 to-[#1a0b2e]/95 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center shadow-lg">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <FaArrowLeft className="text-lg" />
                <span className="font-medium text-sm">Back</span>
              </button>
            </div>

            {/* Mobile Content - Scrollable */}
            <div className="flex-1 relative z-10 overflow-y-auto">
              <div className="px-4 py-4">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Desktop Modal View
  return (
    <AnimatePresence onExitComplete={() => setIsMounted(false)}>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 overflow-y-auto"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            WebkitOverflowScrolling: 'touch',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.1,
              x: clickPosition.x - centerX,
              y: clickPosition.y - centerY,
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: 0,
              y: 0,
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.1,
              x: clickPosition.x - centerX,
              y: clickPosition.y - centerY,
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.34, 1.56, 0.64, 1], // Bouncy easing
            }}
            className={`relative bg-white/10 backdrop-blur-2xl border border-white/20 p-4 sm:p-8 rounded-3xl shadow-2xl w-full ${maxWidth} max-h-[90vh] my-auto overflow-hidden flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close modal"
            >
              <FaTimesCircle className="text-2xl" />
            </button>

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto overflow-x-hidden pr-2 -mr-2">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
