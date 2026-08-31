import React from "react";

export default function MovieCameraIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-6 h-6 overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes reelSpinCw {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes reelSpinCcw {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        @keyframes recPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .reel-left {
          transform-origin: 10px 9px;
          animation: reelSpinCw 4s linear infinite;
        }
        .reel-right {
          transform-origin: 19px 9px;
          animation: reelSpinCcw 4s linear infinite;
        }
        .rec-dot {
          animation: recPulse 1.2s ease-in-out infinite;
        }
      `}</style>
      {/* Left Reel */}
      <g className="reel-left">
        <circle cx="10" cy="9" r="4.5" fill="#111111" fillOpacity="0.08" stroke="#111111" strokeWidth="1.4" />
        <circle cx="10" cy="9" r="1" fill="#E31D2E" />
        <line x1="10" y1="5" x2="10" y2="13" stroke="#111111" strokeWidth="1" />
        <line x1="6" y1="9" x2="14" y2="9" stroke="#111111" strokeWidth="1" />
      </g>

      {/* Right Reel */}
      <g className="reel-right">
        <circle cx="19" cy="9" r="4.5" fill="#111111" fillOpacity="0.08" stroke="#111111" strokeWidth="1.4" />
        <circle cx="19" cy="9" r="1" fill="#111111" />
        <line x1="19" y1="5" x2="19" y2="13" stroke="#111111" strokeWidth="1" />
        <line x1="15" y1="9" x2="23" y2="9" stroke="#111111" strokeWidth="1" />
      </g>

      {/* Camera Main Body */}
      <rect x="5" y="14" width="18" height="11" rx="2.5" fill="#111111" fillOpacity="0.08" stroke="#111111" strokeWidth="1.6" />

      {/* Lens Cone */}
      <path d="M23 16.5 L28 14 V25 L23 22.5 Z" fill="#111111" stroke="#111111" strokeWidth="1.4" strokeLinejoin="round" />

      {/* Red Rec Light */}
      <circle className="rec-dot" cx="8" cy="17" r="1.5" fill="#E31D2E" />
    </svg>
  );
}
