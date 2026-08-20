import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const styles = `
.scroll-to-top-btn {
  position: fixed;
  bottom: calc(32px + env(safe-area-inset-bottom, 0px));
  right: calc(32px + env(safe-area-inset-right, 0px));
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #E31D2E;
  border: none;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 49;
  outline: none;
  opacity: 0;
  transform: translateY(12px) scale(0.9);
  pointer-events: none;
  transition: opacity 300ms ease, transform 300ms ease, background-color 250ms ease, box-shadow 250ms ease;
  will-change: opacity, transform, box-shadow;
}

.scroll-to-top-btn.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

.scroll-to-top-btn:hover {
  transform: translateY(-4px) scale(1);
  background-color: #FF4545;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.22);
}

.scroll-to-top-btn .scroll-arrow-icon {
  transition: transform 250ms ease;
  display: inline-block;
}

.scroll-to-top-btn:hover .scroll-arrow-icon {
  transform: translateY(-2px);
}

.scroll-to-top-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: rgba(255, 45, 45, 0.35);
  pointer-events: none;
  z-index: -1;
  opacity: 0;
  transform: scale(0.85);
}

.scroll-to-top-pulse.active-pulse {
  animation: pulseExpand 1.2s ease-out forwards;
}

@keyframes pulseExpand {
  0% {
    opacity: 0.4;
    transform: scale(0.85);
  }
  100% {
    opacity: 0;
    transform: scale(1.65);
  }
}

@media (max-width: 768px) {
  .scroll-to-top-btn {
    bottom: calc(20px + env(safe-area-inset-bottom, 0px));
    right: calc(20px + env(safe-area-inset-right, 0px));
  }
}
`;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 500) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Check initial scroll position
    if (window.scrollY > 500) {
      setIsVisible(true);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setIsPulsing(false);
      return;
    }

    const triggerPulse = () => {
      // Pause if tab is inactive
      if (document.visibilityState === 'hidden') return;

      setIsPulsing(true);
      setTimeout(() => {
        setIsPulsing(false);
      }, 1200);
    };

    const interval = setInterval(triggerPulse, 5000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <button
        type="button"
        onClick={scrollToTop}
        className={`scroll-to-top-btn${isVisible ? ' is-visible' : ''}`}
        aria-label="Scroll to top"
      >
        <span className={`scroll-to-top-pulse${isPulsing ? ' active-pulse' : ''}`} aria-hidden="true" />
        <ArrowUp size={22} color="#ffffff" className="scroll-arrow-icon" />
      </button>
    </>
  );
};

export default ScrollToTop;
