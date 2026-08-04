import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaArrowLeft } from "react-icons/fa";

/**
 * Responsive Modal Component (NEW UI Design System)
 * - Desktop: Displays as a clean white card modal with soft shadow & rounded corners (28px)
 * - Mobile: Displays as a clean full-page drawer with smooth slide animation
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

  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
  const posX = typeof clickPosition?.x === 'number' ? clickPosition.x : centerX;
  const posY = typeof clickPosition?.y === 'number' ? clickPosition.y : centerY;

  // Mobile View
  if (isMobile) {
    return (
      <AnimatePresence onExitComplete={() => setIsMounted(false)}>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#FFFFFF] text-[#111111] z-50 flex flex-col"
          >
            {/* Mobile Header with Back Button */}
            <div className="flex-shrink-0 relative z-20 bg-white/90 backdrop-blur-md border-b border-[#ECECEC] px-4 py-3 flex items-center shadow-sm">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-neutral-700 hover:text-[#111111] transition-colors"
              >
                <FaArrowLeft className="text-base text-[#FF2B2B]" />
                <span className="font-semibold text-sm">Back</span>
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

  // Desktop Modal View (NEW UI White Surface + Soft Shadow + Rounded 28px)
  return (
    <AnimatePresence onExitComplete={() => setIsMounted(false)}>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto"
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
              scale: 0.85,
              x: posX - centerX,
              y: posY - centerY,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.85,
              x: posX - centerX,
              y: posY - centerY,
            }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`relative bg-white border border-[#ECECEC] p-4 sm:p-8 rounded-[28px] shadow-[0_16px_50px_rgba(0,0,0,0.08)] text-[#111111] w-full ${maxWidth} max-h-[90vh] my-auto overflow-hidden flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Clean Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 transition-all flex items-center justify-center z-10"
              aria-label="Close modal"
            >
              <FaTimes className="text-sm" />
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
