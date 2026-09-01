import React from "react";

export default function SaturnPlanetIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#111111"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6 shrink-0 transition-colors duration-300"
    >
      <circle cx="12" cy="12" r="5" fill="#E31D2E" stroke="none" />
      <circle cx="12" cy="12" r="5" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-25 12 12)" />
    </svg>
  );
}
