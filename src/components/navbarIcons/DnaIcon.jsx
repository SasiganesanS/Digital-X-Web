import React from "react";

export default function DnaIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-7 h-7 overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes dnaCircling3D {
          0%, 100% { transform: rotate(0deg) scaleX(1); }
          50% { transform: rotate(0deg) scaleX(-0.9); }
        }
        .dna-circling-group {
          transform-origin: 16px 16px;
          animation: dnaCircling3D 3.6s ease-in-out infinite;
        }
      `}</style>
      <g className="dna-circling-group">
        {/* Base Pair Rungs */}
        <line x1="9" y1="7" x2="23" y2="7" stroke="#E31D2E" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="11" y1="11.5" x2="21" y2="11.5" stroke="#111111" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="13.5" y1="16" x2="18.5" y2="16" stroke="#E31D2E" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="11" y1="20.5" x2="21" y2="20.5" stroke="#111111" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="9" y1="25" x2="23" y2="25" stroke="#E31D2E" strokeWidth="1.8" strokeLinecap="round" />

        {/* Strand A */}
        <path
          d="M8 4 C16 10, 16 22, 24 28"
          stroke="#111111"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Strand B */}
        <path
          d="M24 4 C16 10, 16 22, 8 28"
          stroke="#111111"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Outer Node Balls */}
        <circle cx="8" cy="4" r="2" fill="#E31D2E" />
        <circle cx="24" cy="4" r="2" fill="#111111" />
        <circle cx="8" cy="28" r="2" fill="#111111" />
        <circle cx="24" cy="28" r="2" fill="#E31D2E" />
      </g>
    </svg>
  );
}
