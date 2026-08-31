import React from "react";

export default function KiteIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-6 h-6 overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes kiteTilt {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
        @keyframes kiteTailWave1 {
          0%, 100% { transform: rotate(-12deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes kiteTailWave2 {
          0%, 100% { transform: rotate(15deg); }
          50% { transform: rotate(-18deg); }
        }
        .kite-main {
          transform-origin: 16px 14px;
          animation: kiteTilt 3.2s ease-in-out infinite;
        }
        .kite-tail-1 {
          transform-origin: 16px 23px;
          animation: kiteTailWave1 1.8s ease-in-out infinite;
        }
        .kite-tail-2 {
          transform-origin: 19px 27px;
          animation: kiteTailWave2 1.6s ease-in-out infinite 0.2s;
        }
      `}</style>
      <g className="kite-main">
        {/* Kite Diamond Body */}
        <polygon
          points="16,3 26,13 16,23 6,13"
          fill="#111111"
          fillOpacity="0.06"
          stroke="#111111"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* Cross Struts */}
        <line x1="16" y1="3" x2="16" y2="23" stroke="#111111" strokeWidth="1.2" strokeDasharray="1 1" />
        <line x1="6" y1="13" x2="26" y2="13" stroke="#111111" strokeWidth="1.2" strokeDasharray="1 1" />
        {/* Red Accent Center Rib */}
        <polygon points="16,3 26,13 16,13" fill="#E31D2E" fillOpacity="0.8" />
        
        {/* Waving Tail */}
        <g className="kite-tail-1">
          <path d="M16 23 C14 25, 19 26, 19 28" stroke="#111111" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <polygon points="17,25 20,25 18.5,27" fill="#E31D2E" />
          <g className="kite-tail-2">
            <path d="M19 28 C17 30, 21 31, 20 33" stroke="#111111" strokeWidth="1.3" fill="none" strokeLinecap="round" />
            <polygon points="18,30 21,30 19.5,32" fill="#111111" />
          </g>
        </g>
      </g>
    </svg>
  );
}
