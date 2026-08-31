import React, { useRef, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

const bounceKeyframes = [
  {
    opacity: 0,
    transform: "translateY(40px) scale(0.96)",
  },
  {
    opacity: 1,
    transform: "translateY(-8px) scale(1.01)",
  },
  {
    transform: "translateY(2px) scale(0.995)",
  },
  {
    transform: "translateY(0) scale(1)",
  },
];

const bounceOptions = {
  duration: 900,
  easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  fill: "both",
};

const AnimatedPage = ({ children }) => {
  const location = useLocation();
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    if (pageRef.current && typeof pageRef.current.animate === 'function') {
      pageRef.current.animate(bounceKeyframes, bounceOptions);
    }
  }, [location.pathname, location.search]);

  return (
    <div
      ref={pageRef}
      className="page-layout-wrapper relative"
      style={{ minHeight: "100vh", backgroundColor: "transparent", willChange: "transform, opacity" }}
    >
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </div>
  );
};

export default AnimatedPage;