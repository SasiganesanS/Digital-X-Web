import React from "react";

export default function RocketIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-6 h-6 overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes rocketVibe {
          0%, 100% { transform: translate(0, 0) rotate(45deg); }
          25% { transform: translate(0.4px, -0.4px) rotate(45deg); }
          75% { transform: translate(-0.4px, 0.4px) rotate(45deg); }
        }
        @keyframes flameFlicker {
          0%, 100% { transform: scaleY(1); opacity: 0.9; }
          50% { transform: scaleY(1.4); opacity: 1; }
        }
        .rocket-main {
          transform-origin: 16px 16px;
          animation: rocketVibe 0.15s ease-in-out infinite;
        }
        .flame-core {
          transform-origin: 16px 25px;
          animation: flameFlicker 0.2s ease-in-out infinite alternate;
        }
      `}</style>
      <g className="rocket-main">
        {/* Flame */}
        <g className="flame-core">
          <path d="M13 24 C13 28, 16 31, 16 31 C16 31, 19 28, 19 24 Z" fill="#E31D2E" />
          <path d="M14.5 24 C14.5 27, 16 29, 16 29 C16 29, 17.5 27, 17.5 24 Z" fill="#FF8A00" />
        </g>

        {/* Rocket Body */}
        <path
          d="M16 3 C16 3, 23 8, 23 18 L19 22 H13 L9 18 C9 8, 16 3, 16 3 Z"
          fill="#111111"
          fillOpacity="0.08"
          stroke="#111111"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* Nose Cone */}
        <path d="M16 3 C16 3, 21.5 7, 22.5 12 H9.5 C10.5 7, 16 3, 16 3 Z" fill="#E31D2E" />

        {/* Porthole */}
        <circle cx="16" cy="14" r="3" fill="#FFFFFF" stroke="#111111" strokeWidth="1.4" />
        <circle cx="16" cy="14" r="1.5" fill="#111111" />

        {/* Fins */}
        <path d="M9 15 L4 21 V24 L9 22 Z" fill="#111111" stroke="#111111" strokeWidth="1.2" />
        <path d="M23 15 L28 21 V24 L23 22 Z" fill="#111111" stroke="#111111" strokeWidth="1.2" />
      </g>
    </svg>
  );
}
