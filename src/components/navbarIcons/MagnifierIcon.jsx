import React from "react";

export default function MagnifierIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-6 h-6 overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes scanSweep {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(2px, -2px); }
        }
        @keyframes lensGlare {
          0% { opacity: 0.1; transform: translateX(-6px); }
          50% { opacity: 0.8; transform: translateX(6px); }
          100% { opacity: 0.1; transform: translateX(-6px); }
        }
        .mag-group {
          animation: scanSweep 3.2s ease-in-out infinite;
        }
        .mag-glare {
          animation: lensGlare 2.4s ease-in-out infinite;
        }
      `}</style>
      <g className="mag-group">
        {/* Glass Rim */}
        <circle cx="14" cy="14" r="8" fill="#111111" fillOpacity="0.06" stroke="#111111" strokeWidth="1.8" />

        {/* Red Lens Reflection Accent */}
        <path d="M10 10 A6 6 0 0 1 18 10" stroke="#E31D2E" strokeWidth="1.4" strokeLinecap="round" />

        {/* Glare Line */}
        <line className="mag-glare" x1="10" y1="17" x2="16" y2="11" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

        {/* Handle */}
        <path d="M20 20 L27 27" stroke="#111111" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M20 20 L27 27" stroke="#E31D2E" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
