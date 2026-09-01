import React from "react";

export default function PetriDishIcon() {
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
      <ellipse cx="12" cy="14" rx="9" ry="5" />
      <path d="M3 14V9a9 5 0 0 1 18 0v5" />
      <circle cx="10" cy="14" r="1.5" fill="#E31D2E" stroke="none" />
      <circle cx="14" cy="13" r="1" fill="#111111" stroke="none" />
      <circle cx="12" cy="16" r="1" fill="#E31D2E" stroke="none" />
    </svg>
  );
}
