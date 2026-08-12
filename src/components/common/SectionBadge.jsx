import React from 'react';

/**
 * SectionBadge - High-Performance Compact Motion Trail Component
 * 
 * Custom Styling:
 * - All red elements replaced with sleek monochrome black palette
 * - Black motion trail background streak & dark shadow
 * - Black typography (`text-[#111111]`)
 * - Concentric radar & 3x2 matrix elements in black
 */
const SectionBadge = ({ text, children, className = "" }) => {
  const content = text || children;

  return (
    <div className={`relative inline-flex items-center gap-2 select-none py-1 px-1.5 transform-gpu will-change-transform ${className}`}>
      {/* Motion Trail Background Streak - Curved Left Pill with Seamless Black Gradient Fade on Right */}
      <div 
        className="absolute left-1 top-1/2 -translate-y-1/2 h-6 w-full pointer-events-none rounded-l-full"
        style={{
          background: "linear-gradient(to right, rgba(17,17,17,0.18) 0%, rgba(17,17,17,0.08) 40%, rgba(17,17,17,0.02) 75%, transparent 92%)",
        }}
      />

      {/* Left Concentric Radar Circles with Black Dot */}
      <div className="relative flex items-center justify-center shrink-0 z-10">
        <div className="w-5.5 h-5.5 rounded-full border border-[#111111]/30 flex items-center justify-center bg-white/80 shadow-[0_0_10px_rgba(0,0,0,0.12)]">
          <div className="w-3.5 h-3.5 rounded-full border border-[#111111]/50 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111] shadow-[0_0_6px_rgba(17,17,17,0.5)]" />
          </div>
        </div>
      </div>

      {/* Badge Text — Black */}
      <span className="relative z-10 font-brand text-[#111111] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.22em] whitespace-nowrap antialiased pr-0.5">
        {content}
      </span>

      {/* Right 3x2 Dot Matrix Grid — Black */}
      <div className="relative z-10 grid grid-cols-3 gap-0.5 shrink-0 ml-0.5">
        <span className="w-0.5 h-0.5 rounded-full bg-[#111111]/70" />
        <span className="w-0.5 h-0.5 rounded-full bg-[#111111]/70" />
        <span className="w-0.5 h-0.5 rounded-full bg-[#111111]/70" />
        <span className="w-0.5 h-0.5 rounded-full bg-[#111111]/70" />
        <span className="w-0.5 h-0.5 rounded-full bg-[#111111]/70" />
        <span className="w-0.5 h-0.5 rounded-full bg-[#111111]/70" />
      </div>
    </div>
  );
};

export default SectionBadge;
