import React from "react";

export default function AstronautIcon() {
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
      <path d="M12 2a7 7 0 0 0-7 7v4a7 7 0 0 0 14 0V9a7 7 0 0 0-7-7z" />
      <rect x="8" y="7" width="8" height="5" rx="2.5" fill="#E31D2E" stroke="none" />
      <path d="M6 19v2" />
      <path d="M18 19v2" />
      <path d="M5 16h14" />
    </svg>
  );
}
