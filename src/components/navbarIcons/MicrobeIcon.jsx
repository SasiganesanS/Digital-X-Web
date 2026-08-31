import React from "react";

export default function MicrobeIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-6 h-6 overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes microbeBreathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes spikesSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .microbe-body {
          transform-origin: 16px 16px;
          animation: microbeBreathe 3s ease-in-out infinite;
        }
        .microbe-spikes {
          transform-origin: 16px 16px;
          animation: spikesSpin 12s linear infinite;
        }
      `}</style>
      <g className="microbe-body">
        {/* Spikes */}
        <g className="microbe-spikes">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1="16"
              y1="6"
              x2="16"
              y2="4"
              stroke={i % 2 === 0 ? "#E31D2E" : "#111111"}
              strokeWidth="1.6"
              strokeLinecap="round"
              transform={`rotate(${angle} 16 16)`}
            />
          ))}
        </g>

        {/* Core Body */}
        <circle cx="16" cy="16" r="8" fill="#111111" fillOpacity="0.08" stroke="#111111" strokeWidth="1.8" />

        {/* Internal Dots */}
        <circle cx="13" cy="14" r="1.5" fill="#E31D2E" />
        <circle cx="19" cy="14" r="1" fill="#111111" />
        <circle cx="16" cy="18" r="1.2" fill="#E31D2E" opacity="0.8" />
      </g>
    </svg>
  );
}
