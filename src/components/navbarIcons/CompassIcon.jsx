import React from "react";

export default function CompassIcon() {
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
      <circle cx="12" cy="12" r="9" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#E31D2E" stroke="none" />
      <circle cx="12" cy="12" r="1.5" fill="#ffffff" stroke="none" />
    </svg>
  );
}
