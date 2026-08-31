import React from "react";

export default function GameControllerIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-6 h-6 overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes dpadMove {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-0.5px, -0.5px); }
          75% { transform: translate(0.5px, 0.5px); }
        }
        @keyframes buttonPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.25); }
        }
        .controller-dpad {
          transform-origin: 10px 15px;
          animation: dpadMove 2.4s ease-in-out infinite;
        }
        .btn-red {
          transform-origin: 22px 13px;
          animation: buttonPulse 1.6s ease-in-out infinite;
        }
        .btn-dark {
          transform-origin: 24px 16px;
          animation: buttonPulse 1.6s ease-in-out infinite 0.8s;
        }
      `}</style>
      {/* Gamepad Contour */}
      <rect
        x="4"
        y="9"
        width="24"
        height="14"
        rx="7"
        fill="#111111"
        fillOpacity="0.05"
        stroke="#111111"
        strokeWidth="1.6"
      />
      {/* Handles */}
      <path d="M6 19 C5 23, 7 25, 9 24 C10 23, 9 20, 8 19" fill="#111111" fillOpacity="0.1" stroke="#111111" strokeWidth="1.4" />
      <path d="M26 19 C27 23, 25 25, 23 24 C22 23, 23 20, 24 19" fill="#111111" fillOpacity="0.1" stroke="#111111" strokeWidth="1.4" />

      {/* D-Pad */}
      <g className="controller-dpad">
        <path d="M9 13 H11 V11 H12 V13 H14 V14 H12 V16 H11 V14 H9 Z" fill="#111111" stroke="#111111" strokeWidth="0.8" />
      </g>

      {/* Action Buttons */}
      <circle className="btn-red" cx="22" cy="13" r="1.5" fill="#E31D2E" />
      <circle className="btn-dark" cx="24" cy="16" r="1.5" fill="#111111" />
      <circle cx="20" cy="16" r="1.2" fill="#111111" fillOpacity="0.6" />
      <circle cx="22" cy="18" r="1.2" fill="#111111" fillOpacity="0.6" />

      {/* Center Select/Start */}
      <line x1="14" y1="15" x2="15.5" y2="15" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="16.5" y1="15" x2="18" y2="15" stroke="#E31D2E" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
