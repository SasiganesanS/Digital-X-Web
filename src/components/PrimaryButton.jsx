import React from "react";
import { motion } from "framer-motion";

const PrimaryButton = ({
  href = "#",
  onClick,
  delay = 0,
  className = "",
  children,
}) => {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={`bg-[#371445] text-white px-8 py-3 rounded-full inline-flex justify-center items-center group transition-all duration-300 border-2 border-transparent hover:border-[#4a1c5e] relative overflow-hidden ${className}`}
      style={{
        boxShadow: "0 6px 20px rgba(45, 27, 78, 0.3)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: delay },
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        y: -5,
        boxShadow: "0 20px 30px rgba(45, 27, 78, 0.5)",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-0 group-hover:duration-1000 ease-in-out -skew-x-12" />
      <span className="text-sm md:text-base uppercase font-medium relative z-10">
        {children || "Learn More"}
      </span>
      <svg
        fill="none"
        height="24"
        className="ml-2 -rotate-90 transition-transform group-hover:translate-x-1 relative z-10"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m16 14.5858-8.99997-8.99998-1.41421 1.41421 8.99998 8.99997h-7.5858v2h11v-11h-2"
          fill="currentColor"
        />
      </svg>
    </motion.a>
  );
};

export default PrimaryButton;
