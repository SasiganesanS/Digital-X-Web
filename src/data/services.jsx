// src/data/services.js
import React from "react"; // We need React to use JSX for icons
import {
  HiOutlinePaintBrush,
  HiCodeBracket,
  HiOutlineLightBulb,
} from "react-icons/hi2"; // Using sleek Heroicons

export const services = [
  {
    title: "Design",
    description:
      "Creating intuitive user experiences through strategic design thinking and careful attention to detail.",
    icon: <HiOutlinePaintBrush className="w-6 h-6" />,
  },
  {
    title: "Development",
    description:
      "Building robust, scalable applications with modern technologies and best practices.",
    icon: <HiCodeBracket className="w-6 h-6" />,
  },
  {
    title: "Strategy",
    description:
      "Defining clear paths forward through research, planning, and strategic consultation.",
    icon: <HiOutlineLightBulb className="w-6 h-6" />,
  },
];
