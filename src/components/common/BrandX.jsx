import React from "react";

export const BrandX = ({
  className = "text-[#E31D2E] inline-block font-pdx align-baseline text-[1.65em] translate-y-[0.08em]",
  style,
  children = "X",
  ...props
}) => (
  <span
    className={`font-pdx inline-block leading-none ${className}`}
    style={{ fontFamily: "'PdxFont', sans-serif", ...style }}
    {...props}
  >
    {children}
  </span>
);

export default BrandX;
