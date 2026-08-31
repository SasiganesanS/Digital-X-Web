import React from "react";

export default function InfinityIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-6 h-6 overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes dashTravel {
          0% { stroke-dashoffset: 60; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes infinityPulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        .infinity-flow {
          stroke-dasharray: 12 18;
          animation: dashTravel 2.5s linear infinite;
        }
        .infinity-main {
          animation: infinityPulse 3s ease-in-out infinite;
        }
      `}</style>
      <g className="infinity-main">
        {/* Base Path */}
        <path
          d="M10 16 C5 10, 5 22, 10 16 C16 10, 22 10, 26 16 C30 22, 30 10, 26 16 C22 22, 16 22, 10 16 Z"
          stroke="#111111"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Red Travelling Highlight */}
        <path
          className="infinity-flow"
          d="M10 16 C5 10, 5 22, 10 16 C16 10, 22 10, 26 16 C30 22, 30 10, 26 16 C22 22, 16 22, 10 16 Z"
          stroke="#E31D2E"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
