import React from "react";

export default function ScissorsIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-6 h-6 overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes bladeCutTop {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-12deg); }
        }
        @keyframes bladeCutBottom {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(12deg); }
        }
        .blade-top {
          transform-origin: 16px 16px;
          animation: bladeCutTop 1.4s ease-in-out infinite;
        }
        .blade-bottom {
          transform-origin: 16px 16px;
          animation: bladeCutBottom 1.4s ease-in-out infinite;
        }
      `}</style>
      <g>
        {/* Top Blade & Loop */}
        <g className="blade-top">
          <circle cx="8" cy="11" r="3.5" stroke="#111111" strokeWidth="1.6" fill="none" />
          <path d="M11 12.5 L26 19 L25 15 Z" fill="#111111" fillOpacity="0.15" stroke="#111111" strokeWidth="1.4" strokeLinejoin="round" />
        </g>

        {/* Bottom Blade & Loop */}
        <g className="blade-bottom">
          <circle cx="8" cy="21" r="3.5" stroke="#E31D2E" strokeWidth="1.6" fill="none" />
          <path d="M11 19.5 L26 13 L25 17 Z" fill="#111111" fillOpacity="0.15" stroke="#111111" strokeWidth="1.4" strokeLinejoin="round" />
        </g>

        {/* Central Pivot Screw */}
        <circle cx="16" cy="16" r="1.4" fill="#E31D2E" stroke="#111111" strokeWidth="0.8" />
      </g>
    </svg>
  );
}
