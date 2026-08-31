import React from "react";

export default function TrophyIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-6 h-6 overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes trophyFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-1.5px); }
        }
        @keyframes trophyShine {
          0% { transform: translateX(-15px) skewX(-20deg); opacity: 0; }
          40% { opacity: 0.8; }
          80%, 100% { transform: translateX(25px) skewX(-20deg); opacity: 0; }
        }
        @keyframes starSparkle {
          0%, 100% { transform: scale(0.6); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        .trophy-group {
          animation: trophyFloat 2.6s ease-in-out infinite;
        }
        .trophy-glint {
          animation: trophyShine 3s ease-in-out infinite 0.5s;
        }
        .star-1 {
          transform-origin: 6px 7px;
          animation: starSparkle 2s ease-in-out infinite;
        }
        .star-2 {
          transform-origin: 26px 9px;
          animation: starSparkle 2s ease-in-out infinite 1s;
        }
      `}</style>
      <g className="trophy-group">
        {/* Handles */}
        <path d="M7 8 C4 8, 4 15, 9 15" stroke="#111111" strokeWidth="1.5" fill="none" />
        <path d="M25 8 C28 8, 28 15, 23 15" stroke="#111111" strokeWidth="1.5" fill="none" />

        {/* Cup */}
        <path
          d="M9 5 H23 V13 C23 18, 18 20, 16 20 C14 20, 9 18, 9 13 Z"
          fill="#111111"
          fillOpacity="0.06"
          stroke="#111111"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* Red Cup Inset */}
        <path d="M11 7 H21 V12 C21 15, 18 17, 16 17 C14 17, 11 15, 11 12 Z" fill="#E31D2E" fillOpacity="0.85" />

        {/* Stem & Base */}
        <path d="M16 20 V24" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
        <path d="M11 24 H21 V27 H11 Z" fill="#111111" stroke="#111111" strokeWidth="1.4" rx="1" />

        {/* Sparkles */}
        <path className="star-1" d="M6 7 L7 5 L8 7 L10 8 L8 9 L7 11 L6 9 L4 8 Z" fill="#E31D2E" />
        <path className="star-2" d="M26 9 L27 7.5 L28 9 L29.5 10 L28 11 L27 12.5 L26 11 L24.5 10 Z" fill="#111111" />
      </g>
    </svg>
  );
}
