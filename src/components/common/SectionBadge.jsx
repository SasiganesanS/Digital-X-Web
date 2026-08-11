import React from 'react';

/**
 * SectionBadge - High-Performance Compact Motion Trail Component
 * 
 * Performance Features:
 * - Hardware GPU accelerated (`transform-gpu`, `will-change-transform`)
 * - Rich neon red glowing elements matching brand UI palette
 * - Crisp brand typography & 3x2 dot matrix
 */
const SectionBadge = ({ text, children, className = "" }) => {
  const content = text || children;

  return (
    <div className={`relative inline-flex items-center gap-2 select-none py-1 px-1.5 transform-gpu will-change-transform ${className}`}>
      {/* Motion Trail Background Streak - Curved Left Pill with Seamless Gradient Fade on Right */}
      <div 
        className="absolute left-1 top-1/2 -translate-y-1/2 h-6 w-full pointer-events-none rounded-l-full"
        style={{
          background: "linear-gradient(to right, rgba(227,29,46,0.26) 0%, rgba(227,29,46,0.12) 40%, rgba(227,29,46,0.02) 75%, transparent 92%)",
        }}
      />

      {/* Left Concentric Radar Circles with Glowing Red Dot */}
      <div className="relative flex items-center justify-center shrink-0 z-10">
        <div className="w-5.5 h-5.5 rounded-full border border-[#E31D2E]/50 flex items-center justify-center bg-white/80 shadow-[0_0_10px_rgba(227,29,46,0.45)]">
          <div className="w-3.5 h-3.5 rounded-full border border-[#E31D2E]/70 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E31D2E] shadow-[0_0_8px_rgba(227,29,46,0.95)]" />
          </div>
        </div>
      </div>

      {/* Badge Text */}
      <span className="relative z-10 font-brand text-[#111111] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.22em] whitespace-nowrap antialiased pr-0.5">
        {content}
      </span>

      {/* Right 3x2 Glowing Red Dot Matrix Grid */}
      <div className="relative z-10 grid grid-cols-3 gap-0.5 shrink-0 ml-0.5">
        <span className="w-0.5 h-0.5 rounded-full bg-[#E31D2E] shadow-[0_0_3px_rgba(227,29,46,0.7)]" />
        <span className="w-0.5 h-0.5 rounded-full bg-[#E31D2E] shadow-[0_0_3px_rgba(227,29,46,0.7)]" />
        <span className="w-0.5 h-0.5 rounded-full bg-[#E31D2E] shadow-[0_0_3px_rgba(227,29,46,0.7)]" />
        <span className="w-0.5 h-0.5 rounded-full bg-[#E31D2E] shadow-[0_0_3px_rgba(227,29,46,0.7)]" />
        <span className="w-0.5 h-0.5 rounded-full bg-[#E31D2E] shadow-[0_0_3px_rgba(227,29,46,0.7)]" />
        <span className="w-0.5 h-0.5 rounded-full bg-[#E31D2E] shadow-[0_0_3px_rgba(227,29,46,0.7)]" />
      </div>
    </div>
  );
};

export default SectionBadge;
