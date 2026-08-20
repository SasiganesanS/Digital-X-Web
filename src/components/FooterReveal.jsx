import React, { useRef, useState, useEffect } from "react";
import Footer from "./Footer";

/**
 * FooterReveal Component
 * Creates a fixed/reveal footer effect where the footer sits underneath (z-0)
 * and is revealed as the main content layer (z-10) with curved bottom corners scrolls upward.
 */
export default function FooterReveal({ setShowContactForm }) {
  const footerRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();

    let resizeObserver;
    if (footerRef.current) {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(footerRef.current);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeObserver && footerRef.current) {
        resizeObserver.unobserve(footerRef.current);
      }
    };
  }, []);

  // Desktop: Fixed reveal effect sitting underneath (z-0)
  // Mobile / Small screens: Native sticky/relative flow to preserve perfect readability & touch scrolling
  if (!isDesktop) {
    return (
      <div className="relative z-10 w-full">
        <Footer setShowContactForm={setShowContactForm} />
      </div>
    );
  }

  return (
    <div
      className="relative w-full z-0 pointer-events-auto"
      style={{ height: footerHeight ? `${footerHeight}px` : "auto" }}
    >
      <div
        ref={footerRef}
        className="fixed bottom-0 left-0 right-0 z-0 w-full"
      >
        <Footer setShowContactForm={setShowContactForm} />
      </div>
    </div>
  );
}
