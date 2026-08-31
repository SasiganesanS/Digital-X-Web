import React from "react";

export default function UmbrellaIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-6 h-6 overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes umbrellaSway {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }
        .umbrella-canopy-group {
          transform-origin: 16px 26px;
          animation: umbrellaSway 3s ease-in-out infinite;
        }
      `}</style>
      <g className="umbrella-canopy-group">
        {/* Canopy */}
        <path
          d="M4 17 C4 9, 9 4, 16 4 C23 4, 28 9, 28 17 C24 16, 20 18, 16 16 C12 18, 8 16, 4 17 Z"
          fill="#111111"
          fillOpacity="0.08"
          stroke="#111111"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* Red Stripes */}
        <path d="M12 4.8 C9.5 8, 8 12, 8 16.5 C10.5 16, 12.5 16.8 12 16.5 V4.8 Z" fill="#E31D2E" />
        <path d="M20 4.8 C22.5 8, 24 12, 24 16.5 C21.5 16, 19.5 16.8 20 16.5 V4.8 Z" fill="#E31D2E" />

        {/* Top Finial */}
        <line x1="16" y1="2" x2="16" y2="4" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" />

        {/* Pole & Hook Handle */}
        <path d="M16 16 V26 C16 28, 14 29, 13 28" stroke="#111111" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
