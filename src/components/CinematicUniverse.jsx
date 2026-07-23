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
            background-color: #F3E9E9;
            z-index: -9999 !important;
            pointer-events: none;
            overflow: hidden;
          }
          
          .clay-blob {
            position: absolute;
            border-radius: 50%;
            mix-blend-mode: multiply;
            filter: blur(130px);
            will-change: transform, opacity;
          }
          
          /* Blob 1: Brand Red (Top Left) */
          .blob-1 {
            top: -15%;
            left: -10%;
            width: 60vw;
            height: 60vw;
            background: radial-gradient(circle, rgba(227,29,46,0.08) 0%, rgba(227,29,46,0.02) 50%, transparent 70%);
            animation: clayBreathe1 24s ease-in-out infinite;
          }
          
          /* Blob 2: Soft White highlight (Center Right) */
          .blob-2 {
            top: 20%;
            right: -15%;
            width: 55vw;
            height: 55vw;
            background: radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 50%, transparent 70%);
            mix-blend-mode: overlay;
            animation: clayBreathe2 30s ease-in-out infinite;
          }
          
          /* Blob 3: Brand Red (Bottom Right) */
          .blob-3 {
            bottom: -20%;
            right: -10%;
            width: 65vw;
            height: 65vw;
            background: radial-gradient(circle, rgba(227,29,46,0.06) 0%, rgba(227,29,46,0.01) 55%, transparent 70%);
            animation: clayBreathe3 28s ease-in-out infinite;
          }
          
          /* Blob 4: Soft Muted Dark (Bottom Left/Center) */
          .blob-4 {
            bottom: 10%;
            left: 10%;
            width: 45vw;
            height: 45vw;
            background: radial-gradient(circle, rgba(17,17,17,0.03) 0%, rgba(17,17,17,0.005) 50%, transparent 70%);
            animation: clayBreathe4 35s ease-in-out infinite;
          }
          
          @keyframes clayBreathe1 {
            0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); opacity: 0.8; }
            33% { transform: translate(40px, -60px) scale(1.12) rotate(120deg); opacity: 1; }
            66% { transform: translate(-20px, 30px) scale(0.92) rotate(240deg); opacity: 0.7; }
          }
          
          @keyframes clayBreathe2 {
            0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
            50% { transform: translate(-50px, 60px) scale(1.15) rotate(-180deg); }
          }
          
          @keyframes clayBreathe3 {
            0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); opacity: 0.7; }
            40% { transform: translate(-60px, -40px) scale(1.18) rotate(140deg); opacity: 0.9; }
            70% { transform: translate(30px, 20px) scale(0.88) rotate(280deg); opacity: 0.6; }
          }
          
          @keyframes clayBreathe4 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(50px, -30px) scale(1.12); }
          }
        `}
      </style>
      <div className="clay-bg-wrapper">
        <div className="clay-blob blob-1"></div>
        <div className="clay-blob blob-2"></div>
        <div className="clay-blob blob-3"></div>
        <div className="clay-blob blob-4"></div>
      </div>
    </>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null;
};

export default CinematicUniverse;
