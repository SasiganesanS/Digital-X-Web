import { useEffect } from 'react';

const usePreventScroll = (isOpen) => {
  useEffect(() => {
    if (isOpen) {
      // Add padding right to prevent layout shift when scrollbar disappears
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      // Prevent scrolling on mount
      document.body.style.overflow = 'hidden';
      
      // Re-enable scrolling on cleanup
      return () => {
        document.body.style.overflow = 'unset';
        document.body.style.paddingRight = '0px';
      };
    }
  }, [isOpen]);
};

export default usePreventScroll;
