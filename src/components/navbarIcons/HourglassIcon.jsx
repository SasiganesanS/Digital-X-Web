import React from "react";

export default function HourglassIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-6 h-6 overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes hourglassFlip {
          0%, 85% { transform: rotate(0deg); }
          95%, 100% { transform: rotate(180deg); }
        }
        @keyframes sandStream {
          0% { stroke-dashoffset: 12; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes sandDrain {
          0% { transform: scaleY(1); }
          80% { transform: scaleY(0.1); }
          100% { transform: scaleY(1); }
        }
        .hourglass-body-group {
          transform-origin: 16px 16px;
          animation: hourglassFlip 10s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
        .sand-flow {
          stroke-dasharray: 3 3;
          animation: sandStream 0.6s linear infinite;
        }
        .sand-top {
          transform-origin: 16px 10px;
          animation: sandDrain 8s linear infinite;
        }
      `}</style>
      <g className="hourglass-body-group">
        {/* Top/Bottom Frames */}
        <line x1="8" y1="5" x2="24" y2="5" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="27" x2="24" y2="27" stroke="#111111" strokeWidth="2" strokeLinecap="round" />

        {/* Glass Bulb Contour */}
        <path
          d="M10 5 L16 14 L22 5 M10 27 L16 18 L22 27"
          stroke="#111111"
          strokeWidth="1.6"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Sand Top */}
        <path className="sand-top" d="M11 7 L16 13 L21 7 Z" fill="#E31D2E" opacity="0.9" />

        {/* Sand Falling Stream */}
        <line className="sand-flow" x1="16" y1="14" x2="16" y2="24" stroke="#E31D2E" strokeWidth="1.4" />

        {/* Sand Bottom Pile */}
        <path d="M12 25 C14 23, 18 23, 20 25 L21.5 27 H10.5 Z" fill="#E31D2E" opacity="0.85" />
      </g>
    </svg>
  );
}
