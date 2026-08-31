import React from "react";

export default function FerrisWheelIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-7 h-7 overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes mainWheelSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes cabinUprightSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        .ferris-spinning-wheel {
          transform-origin: 16px 14px;
          animation: mainWheelSpin 7s linear infinite;
        }
        .cabin-upright-group {
          animation: cabinUprightSpin 7s linear infinite;
        }
      `}</style>
      <g>
        {/* Support Base Structure */}
        <line x1="16" y1="14" x2="8" y2="29" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="14" x2="24" y2="29" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
        <line x1="6" y1="29" x2="26" y2="29" stroke="#111111" strokeWidth="2" strokeLinecap="round" />

        {/* Spinning Main Wheel */}
        <g className="ferris-spinning-wheel">
          <circle cx="16" cy="14" r="10.5" stroke="#111111" strokeWidth="1.8" fill="none" />
          <circle cx="16" cy="14" r="3.2" stroke="#E31D2E" strokeWidth="1.6" fill="none" />

          {/* Spokes */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <line
              key={i}
              x1="16"
              y1="3.5"
              x2="16"
              y2="24.5"
              stroke="#111111"
              strokeWidth="1.2"
              transform={`rotate(${angle} 16 14)`}
            />
          ))}

          {/* Cabins (6 cabins staying upright via counter-rotation) */}
          {[
            { x: 16, y: 3.5 },
            { x: 25.09, y: 8.75 },
            { x: 25.09, y: 19.25 },
            { x: 16, y: 24.5 },
            { x: 6.91, y: 19.25 },
            { x: 6.91, y: 8.75 }
          ].map((pos, idx) => (
            <g key={idx} transform={`translate(${pos.x}, ${pos.y})`}>
              <g className="cabin-upright-group" style={{ transformOrigin: "0 0" }}>
                <rect
                  x="-2.2"
                  y="-2.2"
                  width="4.4"
                  height="4.4"
                  rx="1.2"
                  fill={idx % 2 === 0 ? "#E31D2E" : "#111111"}
                  stroke="#FFFFFF"
                  strokeWidth="0.6"
                />
              </g>
            </g>
          ))}
        </g>

        {/* Center Axle Pin */}
        <circle cx="16" cy="14" r="1.6" fill="#111111" />
      </g>
    </svg>
  );
}
