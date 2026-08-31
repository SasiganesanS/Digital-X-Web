import React from "react";

export default function UfoIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-6 h-6 overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes ufoHover {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-2px) rotate(2deg); }
        }
        @keyframes beamGlow {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.65; }
        }
        @keyframes ufoLightPulse {
          0%, 100% { fill: #E31D2E; }
          50% { fill: #111111; }
        }
        .ufo-craft-group {
          transform-origin: 16px 14px;
          animation: ufoHover 2.6s ease-in-out infinite;
        }
        .ufo-tractor-beam {
          animation: beamGlow 1.8s ease-in-out infinite;
        }
        .ufo-bulb-1 { animation: ufoLightPulse 1.2s infinite 0s; }
        .ufo-bulb-2 { animation: ufoLightPulse 1.2s infinite 0.4s; }
        .ufo-bulb-3 { animation: ufoLightPulse 1.2s infinite 0.8s; }
      `}</style>
      <g className="ufo-craft-group">
        {/* Light Beam */}
        <polygon className="ufo-tractor-beam" points="11,18 21,18 26,29 6,29" fill="#E31D2E" opacity="0.3" />

        {/* Cockpit Glass Dome */}
        <path d="M11 14 C11 9, 21 9, 21 14 Z" fill="#111111" fillOpacity="0.1" stroke="#111111" strokeWidth="1.6" />

        {/* Outer Disc Body */}
        <ellipse cx="16" cy="15" rx="12" ry="4" fill="#111111" fillOpacity="0.08" stroke="#111111" strokeWidth="1.8" />
        <ellipse cx="16" cy="15" rx="7" ry="2" fill="#E31D2E" fillOpacity="0.8" />

        {/* Bottom Sensor Lights */}
        <circle className="ufo-bulb-1" cx="8" cy="16.5" r="1" fill="#E31D2E" />
        <circle className="ufo-bulb-2" cx="16" cy="17.5" r="1" fill="#111111" />
        <circle className="ufo-bulb-3" cx="24" cy="16.5" r="1" fill="#E31D2E" />
      </g>
    </svg>
  );
}
