import React from 'react';
import { createPortal } from 'react-dom';

const CinematicUniverse = () => {
  const content = (
    <>
      <style>
        {`
          .clay-bg-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: #FFFFFF;
            z-index: -9999 !important;
            pointer-events: none;
            overflow: hidden;
          }
        `}
      </style>
      <div className="clay-bg-wrapper"></div>
    </>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null;
};

export default CinematicUniverse;
