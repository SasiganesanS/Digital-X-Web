import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import PageTransitionOverlay from './PageTransitionOverlay';

const AnimatedPage = ({ children }) => {
  return (
    <div className="page-layout-wrapper relative" style={{ minHeight: "100vh", backgroundColor: "transparent" }}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </div>
  );
};

export default AnimatedPage;