import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import IrisOverlay from './IrisOverlay';

const AnimatedPage = ({ children }) => {
  return (
    <div className="page-layout-wrapper relative" style={{ minHeight: "100vh", backgroundColor: "transparent" }}>
      <IrisOverlay color="#0a0a0a" duration={0.65} />
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </div>
  );
};

export default AnimatedPage;