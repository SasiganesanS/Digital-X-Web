import React from "react";

export default function BatteryIcon() {
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
      <rect x="2" y="7" width="16" height="10" rx="2" />
      <path d="M22 11v2" />
      <rect x="5" y="10" width="3" height="4" fill="#E31D2E" stroke="none" />
      <rect x="10" y="10" width="3" height="4" fill="#E31D2E" stroke="none" />
    </svg>
  );
}
