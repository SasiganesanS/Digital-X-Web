import React from "react";
import { useLanguage } from "../../context/LanguageContext";

// HD Crisp SVG USA Flag Circle
const USAFlag = () => (
  <svg viewBox="0 0 512 512" className="w-full h-full rounded-full object-cover pointer-events-none">
    <path fill="#f0f0f0" d="M0 0h512v512H0z"/>
    <path fill="#d80027" d="M0 56.8h512v39.38H0zm0 78.76h512v39.38H0zm0 78.77h512v39.38H0zm0 78.77h512v39.38H0zm0 78.77h512v39.38H0zm0 78.77h512v39.38H0z"/>
    <path fill="#0052b4" d="M0 0h256v275.69H0z"/>
    <circle fill="#f0f0f0" cx="42.6" cy="39.4" r="10"/>
    <circle fill="#f0f0f0" cx="128" cy="39.4" r="10"/>
    <circle fill="#f0f0f0" cx="213.3" cy="39.4" r="10"/>
    <circle fill="#f0f0f0" cx="85.3" cy="78.8" r="10"/>
    <circle fill="#f0f0f0" cx="170.6" cy="78.8" r="10"/>
    <circle fill="#f0f0f0" cx="42.6" cy="118.1" r="10"/>
    <circle fill="#f0f0f0" cx="128" cy="118.1" r="10"/>
    <circle fill="#f0f0f0" cx="213.3" cy="118.1" r="10"/>
    <circle fill="#f0f0f0" cx="85.3" cy="157.5" r="10"/>
    <circle fill="#f0f0f0" cx="170.6" cy="157.5" r="10"/>
    <circle fill="#f0f0f0" cx="42.6" cy="196.9" r="10"/>
    <circle fill="#f0f0f0" cx="128" cy="196.9" r="10"/>
    <circle fill="#f0f0f0" cx="213.3" cy="196.9" r="10"/>
    <circle fill="#f0f0f0" cx="85.3" cy="236.3" r="10"/>
    <circle fill="#f0f0f0" cx="170.6" cy="236.3" r="10"/>
  </svg>
);

// HD Crisp SVG German Flag Circle
const GermanyFlag = () => (
  <svg viewBox="0 0 512 512" className="w-full h-full rounded-full object-cover pointer-events-none">
    <path fill="#000000" d="M0 0h512v170.67H0z"/>
    <path fill="#d80027" d="M0 170.67h512v170.66H0z"/>
    <path fill="#ffda44" d="M0 341.33h512V512H0z"/>
  </svg>
);

export default function LanguageToggleSwitch({ compact = false }) {
  const { language, toggleLanguage, t } = useLanguage();
  const isGerman = language === "de";

  const toggleWidth = compact ? "54px" : "64px";
  const toggleHeight = compact ? "26px" : "30px";
  const flagSize = compact ? "20px" : "24px";

  return (
    <button
      className="language-toggle notranslate select-none focus:outline-none"
      data-language={language}
      type="button"
      onClick={toggleLanguage}
      aria-label={t("lang_switch_tooltip", "Switch language / Sprache wechseln")}
      title={t("lang_switch_tooltip", "Switch language / Sprache wechseln")}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        width: toggleWidth,
        height: toggleHeight,
        padding: "2px",
        boxSizing: "border-box",
        overflow: "hidden",
        borderRadius: "999px",
        flexShrink: 0,
        cursor: "pointer",
        border: "1px solid rgba(255, 255, 255, 0.22)",
        backgroundColor: "#141414",
        boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.6)",
      }}
    >
      {/* Sliding Active Flag Circle Knob */}
      <span
        className="language-toggle__slider"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          pointerEvents: "none",
          transform: isGerman ? "translate3d(100%, 0, 0)" : "translate3d(0, 0, 0)",
          transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      >
        {/* Perfectly symmetric flag circle with ultra-thin 1.5px white border */}
        <span
          style={{
            width: flagSize,
            height: flagSize,
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 0 0 1.5px rgba(255, 255, 255, 0.9), 0 2px 5px rgba(0, 0, 0, 0.4)",
          }}
        >
          {isGerman ? <GermanyFlag /> : <USAFlag />}
        </span>
      </span>

      {/* Option 1: EN label (Visible when German active) */}
      <span
        className="language-toggle__option"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          fontWeight: 900,
          fontSize: compact ? "8.5px" : "9.5px",
          color: "#ffffff",
          userSelect: "none",
          pointerEvents: "none",
          opacity: isGerman ? 1 : 0,
          transition: "opacity 220ms ease",
        }}
      >
        EN
      </span>

      {/* Option 2: DE label (Visible when English active) */}
      <span
        className="language-toggle__option"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          fontWeight: 900,
          fontSize: compact ? "8.5px" : "9.5px",
          color: "rgba(255, 255, 255, 0.9)",
          userSelect: "none",
          pointerEvents: "none",
          opacity: isGerman ? 0 : 1,
          transition: "opacity 220ms ease",
        }}
      >
        DE
      </span>
    </button>
  );
}
