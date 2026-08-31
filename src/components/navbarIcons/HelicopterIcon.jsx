import React from "react";

export default function HelicopterIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-7 h-7 overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes topRotorWingSpin {
          0% { transform: scaleX(1); }
          50% { transform: scaleX(-1); }
          100% { transform: scaleX(1); }
        }
        @keyframes tailRotorBladeSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes heliHoverBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-1.5px); }
        }
        .heli-hover-group {
          animation: heliHoverBob 1.8s ease-in-out infinite;
        }
        .top-rotor-wings {
          transform-origin: 16px 4.5px;
          animation: topRotorWingSpin 0.09s linear infinite;
        }
        .tail-rotor-wings {
          transform-origin: 27.5px 14px;
          animation: tailRotorBladeSpin 0.12s linear infinite;
        }
      `}</style>
      <g className="heli-hover-group">
        {/* Main Top Rotor Shaft & Wings */}
        <line x1="16" y1="4.5" x2="16" y2="8.5" stroke="#111111" strokeWidth="2" />
        <g className="top-rotor-wings">
          <line x1="3" y1="4.5" x2="29" y2="4.5" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="4.5" r="1.5" fill="#E31D2E" />
        </g>

        {/* Tail Rotor Wings */}
        <g className="tail-rotor-wings">
          <line x1="27.5" y1="9.5" x2="27.5" y2="18.5" stroke="#E31D2E" strokeWidth="1.6" strokeLinecap="round" />
        </g>
        <circle cx="27.5" cy="14" r="1.2" fill="#111111" />

        {/* Tail Boom */}
        <path d="M17.5 14 L27.5 14" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
        <path d="M26.5 14 L28.5 10.5" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" />

        {/* Aircraft Body Fuselage */}
        <path
          d="M6.5 14 C6.5 8.5, 13 8.5, 18 11.5 L19 16.5 C19 19.5, 13 19.5, 6.5 17.5 Z"
          fill="#111111"
          fillOpacity="0.08"
          stroke="#111111"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Glass Windshield */}
        <path d="M7.5 13.5 C7.5 10, 12 10, 14 13.5 Z" fill="#E31D2E" opacity="0.95" />

        {/* Landing Skids */}
        <line x1="9.5" y1="19.5" x2="9.5" y2="23.5" stroke="#111111" strokeWidth="1.6" />
        <line x1="16" y1="19.5" x2="16" y2="23.5" stroke="#111111" strokeWidth="1.6" />
        <line x1="5.5" y1="23.5" x2="20" y2="23.5" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
