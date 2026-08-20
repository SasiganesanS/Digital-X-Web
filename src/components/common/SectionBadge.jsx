import React from 'react';

/**
 * SectionBadge - High-Performance Compact Motion Trail Component
 */
const SectionBadge = ({ text, children, theme = "auto", className = "" }) => {
  const content = text || children;
  const isDarkTheme = theme === "dark";

  return (
    <div className={`relative inline-flex items-center gap-2 select-none py-1 px-1.5 transform-gpu will-change-transform ${className}`}>
      {/* Motion Trail Background Streak */}
      <div 
        className="absolute left-1 top-1/2 -translate-y-1/2 h-6 w-full pointer-events-none rounded-l-full"
        style={{
          background: isDarkTheme
            ? "linear-gradient(to right, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 50%, transparent 90%)"
            : "linear-gradient(to right, rgba(17,17,17,0.08) 0%, rgba(17,17,17,0.03) 50%, transparent 90%)",
        }}
      />

      {/* Left Concentric Radar Circles */}
      <div className="relative flex items-center justify-center shrink-0 z-10">
        <div className={`w-5.5 h-5.5 rounded-full border flex items-center justify-center shadow-xs ${
          isDarkTheme ? "border-white/40 bg-[#050609]/90" : "border-neutral-300 bg-white"
        }`}>
          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
            isDarkTheme ? "border-white/60" : "border-neutral-300"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              isDarkTheme ? "bg-[#E31D2E] shadow-[0_0_8px_#E31D2E]" : "bg-[#111111]"
            }`} />
          </div>
        </div>
      </div>

      {/* Badge Text */}
      <span
        className={`relative z-10 font-brand text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] whitespace-nowrap antialiased pr-0.5 !text-white drop-shadow-sm`}
      >
        {content}
      </span>

      {/* Right 3x2 Dot Matrix Grid */}
      <div className="relative z-10 grid grid-cols-3 gap-0.5 shrink-0 ml-0.5">
        <span className={`w-0.5 h-0.5 rounded-full ${isDarkTheme ? "bg-white/70" : "bg-neutral-400"}`} />
        <span className={`w-0.5 h-0.5 rounded-full ${isDarkTheme ? "bg-white/70" : "bg-neutral-400"}`} />
        <span className={`w-0.5 h-0.5 rounded-full ${isDarkTheme ? "bg-white/70" : "bg-neutral-400"}`} />
        <span className={`w-0.5 h-0.5 rounded-full ${isDarkTheme ? "bg-white/70" : "bg-neutral-400"}`} />
        <span className={`w-0.5 h-0.5 rounded-full ${isDarkTheme ? "bg-white/70" : "bg-neutral-400"}`} />
        <span className={`w-0.5 h-0.5 rounded-full ${isDarkTheme ? "bg-white/70" : "bg-neutral-400"}`} />
      </div>
    </div>
  );
};

export default SectionBadge;
