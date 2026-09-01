import React from "react";

export default function AtomIcon() {
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
      <circle cx="12" cy="12" r="2" fill="#E31D2E" stroke="none" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(150 12 12)" />
    </svg>
  );
}
