import React from "react";

export default function LightBulbIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-7 h-7 overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes bulbGlowBlink {
          0%, 100% { opacity: 0.35; filter: drop-shadow(0 0 0px transparent); }
          50% { opacity: 1; filter: drop-shadow(0 0 6px #E31D2E); }
        }
        @keyframes raysPulse {
          0%, 100% { opacity: 0.2; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        .bulb-glowing-core {
          transform-origin: 16px 14px;
          animation: bulbGlowBlink 2s ease-in-out infinite;
        }
        .bulb-rays-group {
          transform-origin: 16px 14px;
          animation: raysPulse 2s ease-in-out infinite;
        }
      `}</style>
      <g>
        {/* Pulsing Light Rays */}
        <g className="bulb-rays-group">
          <line x1="16" y1="1" x2="16" y2="4" stroke="#E31D2E" strokeWidth="2" strokeLinecap="round" />
          <line x1="5" y1="5" x2="8" y2="8" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="27" y1="5" x2="24" y2="8" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="1" y1="14" x2="4" y2="14" stroke="#E31D2E" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="31" y1="14" x2="28" y2="14" stroke="#E31D2E" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* Bulb Glass Body */}
        <path
          d="M16 5 C10.5 5, 7.5 9.5, 7.5 14.5 C7.5 18, 11.5 20, 11.5 23 H20.5 C20.5 20, 24.5 18, 24.5 14.5 C24.5 9.5, 21.5 5, 16 5 Z"
          fill="#111111"
          fillOpacity="0.06"
          stroke="#111111"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Red Glowing Filament Core */}
        <g className="bulb-glowing-core">
          <path d="M16 5 C10.5 5, 7.5 9.5, 7.5 14.5 C7.5 18, 11.5 20, 11.5 23 H20.5 C20.5 20, 24.5 18, 24.5 14.5 C24.5 9.5, 21.5 5, 16 5 Z" fill="#E31D2E" fillOpacity="0.25" />
          <path d="M12.5 16 L16 11.5 L19.5 16" stroke="#E31D2E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        {/* Base Screw Thread */}
        <rect x="11.5" y="23" width="9" height="2.2" fill="#111111" rx="0.6" />
        <rect x="12.5" y="25.8" width="7" height="2.2" fill="#111111" rx="0.6" />
        <path d="M13.5 28.5 C13.5 29.8, 18.5 29.8, 18.5 28.5 Z" fill="#E31D2E" />
      </g>
    </svg>
  );
}
