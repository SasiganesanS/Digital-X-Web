import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import Logo from "../assets/Praskla_Digital_X_Logo_Trasnparent_Background.webp";

const navItemsList = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Careers", href: "/careers" }
];

const BRAND_TAGLINES = [
  "A Mindful Marketing and Production Firm",
  "Where Strategy Meets Performance",
  "Scale Your Brand with Clarity",
  "Transforming Ideas into Digital Success",
  "Crafting Scalable Brand Ecosystems",
  "Creative Production & Measurable ROI",
];

function AnimatedBrandTagline() {
  const [taglineIdx, setTaglineIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIdx((prev) => (prev + 1) % BRAND_TAGLINES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const currentTagline = BRAND_TAGLINES[taglineIdx];

  return (
    <div className="h-[10px] sm:h-[11px] lg:h-[12px] overflow-hidden relative mt-[3px] w-full max-w-[220px] sm:max-w-[260px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentTagline}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="font-dingos text-[8px] sm:text-[9px] lg:text-[9.5px] font-bold text-[#E31D2E] block tracking-tight leading-none whitespace-nowrap truncate"
        >
          {currentTagline}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

const navStyles = `
.pill-nav-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 76px;
  padding: 0 2rem;
  background: #FFFFFF !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  box-sizing: border-box;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease-out;
  will-change: transform, opacity;
  pointer-events: auto;
}

.pill-nav-container > * {
  pointer-events: auto;
}

.nav-brand-capsule {
  position: relative;
  left: auto;
  top: auto;
  transform: none;
  background: transparent !important;
  padding: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  border: none !important;
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  min-width: auto;
  max-width: none;
  flex-shrink: 0;
  box-sizing: border-box;
  transition: opacity 0.2s ease;
}

.nav-brand-capsule:hover {
  box-shadow: none !important;
  opacity: 0.92;
}

.nav-links-capsule {
  background: #ECECEC;
  padding: 5px 12px 5px 14px;
  border-radius: 999px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04), inset 0 1px 2px rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  flex-shrink: 0;
}

.nav-search-pill {
  height: var(--nav-h);
  width: var(--nav-h);
  padding: 0;
  border-radius: 9999px;
  background: transparent;
  border: none;
  color: #333333;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.nav-search-pill:hover {
  background-color: #F0F0F0;
  color: #E31D2E;
}

.nav-cta-btn {
  height: 46px;
  padding: 0 24px;
  border-radius: 999px;
  background: #111111;
  color: #ffffff;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.12);
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: transform 250ms ease-out, box-shadow 250ms ease-out, background 250ms ease-out, border-color 250ms ease-out;
  outline: none;
  box-sizing: border-box;
}

.nav-cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
  background: linear-gradient(135deg, #E51D1D 0%, #C81515 100%);
  border-color: rgba(255, 255, 255, 0.2);
}

.nav-cta-btn .cta-arrow {
  transition: transform 250ms ease-out;
  display: inline-block;
}

.nav-cta-btn:hover .cta-arrow {
  transform: translateX(4px);
}

@media (max-width: 1024px) {
  .pill-nav-container {
    width: calc(100% - 2rem);
    top: 1.25rem;
    justify-content: space-between;
  }
  .nav-brand-capsule {
    position: relative;
    left: auto;
    top: auto;
    transform: none;
    min-width: auto;
    padding: 6px 16px;
  }
  .nav-links-capsule {
    margin: 0;
    padding: 4px 6px;
  }
}

.pill-nav-container.nav-hidden {
  transform: translateX(-50%) translateY(-160%);
  opacity: 0;
  pointer-events: none;
}

.pill-nav {
  --nav-h: 42px;
  --pill-pad-x: 18px;
  --pill-gap: 4px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .pill-nav {
    width: auto;
    justify-content: flex-end;
    padding: 0;
    background: transparent;
  }
}

.pill-nav-items {
  position: relative;
  display: flex;
  align-items: center;
  height: var(--nav-h);
  background: transparent;
  border: none;
  box-sizing: border-box;
}

.pill-logo {
  height: auto;
  width: auto;
  background: transparent;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.pill-logo img {
  height: 60px;
  max-height: 76px;
  width: auto;
  object-fit: contain;
  display: block;
}

@media (min-width: 640px) {
  .pill-logo img {
    height: 72px;
  }
}

.pill-list {
  list-style: none;
  display: flex;
  align-items: center;
  gap: var(--pill-gap);
  margin: 0;
  padding: 0;
  height: 100%;
}

.pill-list > li {
  display: flex;
  align-items: center;
  height: 100%;
}

.pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 var(--pill-pad-x);
  background: transparent;
  color: #333333;
  text-decoration: none;
  border-radius: 9999px;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 14px;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  white-space: nowrap;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.pill:hover:not(.is-active) {
  background-color: #F0F0F0;
  color: #111111;
}

.pill .hover-circle {
  position: absolute;
  left: 50%;
  bottom: 0;
  border-radius: 50%;
  background: var(--pill-bg, #FF2B2B);
  z-index: 1;
  display: block;
  pointer-events: none;
  will-change: transform;
}

.pill .label-stack {
  position: relative;
  display: inline-block;
  line-height: 1;
  z-index: 2;
}

.pill .pill-label {
  position: relative;
  z-index: 2;
  display: inline-block;
  line-height: 1;
  will-change: transform;
}

.pill .pill-label-hover {
  position: absolute;
  left: 0;
  top: 0;
  color: var(--hover-text, #fff);
  z-index: 3;
  display: inline-block;
  will-change: transform, opacity;
}

.pill.is-active {
  background: var(--pill-bg, #E31D2E) !important;
  color: var(--hover-text, #ffffff) !important;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12) !important;
  border-radius: 9999px !important;
}

.mobile-menu-button {
  width: var(--nav-h);
  height: var(--nav-h);
  border-radius: 50%;
  background: #FFFFFF;
  border: 1px solid #ECECEC;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  padding: 0;
  position: relative;
}

@media (max-width: 768px) {
  .mobile-menu-button {
    display: flex;
  }
}

.hamburger-line {
  width: 16px;
  height: 2px;
  background: #111111;
  border-radius: 1px;
  transition: all 0.01s ease;
  transform-origin: center;
}

.mobile-menu-popover {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 240px;
  background: #FFFFFF;
  border: 1px solid #ECECEC;
  border-radius: 24px;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.12);
  z-index: 998;
  opacity: 0;
  transform-origin: top right;
  visibility: hidden;
}

.mobile-menu-list {
  list-style: none;
  margin: 0;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-menu-popover .mobile-menu-link {
  display: block;
  padding: 10px 16px;
  color: #111111;
  background-color: #FAFAFA;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.2s ease;
}

.mobile-menu-popover .mobile-menu-link:hover {
  cursor: pointer;
  background-color: #FF2B2B;
  color: #ffffff;
}

.nav-search-btn {
  height: 42px;
  width: 42px;
  padding: 0;
  border-radius: 50%;
  background: #FFFFFF;
  color: #111111;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 200ms ease;
  margin-left: 2px;
  outline: none;
  flex-shrink: 0;
}

.nav-search-btn:hover {
  background: #FFFFFF;
  color: #E31D2E;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  border-color: rgba(0, 0, 0, 0.12);
}

@media (max-width: 768px) {
  .nav-search-btn {
    height: var(--nav-h);
    width: var(--nav-h);
    margin-left: 0;
    margin-right: 6px;
  }
}
`;

const Navbar = ({ setShowContactForm, onOpenSearch }) => {
  const location = useLocation();
  const activeHref = location.pathname;

  const ease = 'power3.easeOut';
  const baseColor = '#ffffff';
  const pillColor = '#FF2B2B';
  const hoveredPillTextColor = '#ffffff';
  const pillTextColor = '#111111';
  const initialLoadAnimation = false;

  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isTopHovered, setIsTopHovered] = useState(false);
  const topHoverDebounceRef = useRef(null);
  const lastScrollY = useRef(0);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);

  // Reveal on Top Hover (Mouse entering top 70px of viewport)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const isTopZone = e.clientY <= 70;

      if (isTopZone) {
        if (topHoverDebounceRef.current) {
          clearTimeout(topHoverDebounceRef.current);
          topHoverDebounceRef.current = null;
        }
        setIsTopHovered(true);
      } else {
        if (!topHoverDebounceRef.current && isTopHovered) {
          topHoverDebounceRef.current = setTimeout(() => {
            setIsTopHovered(false);
            topHoverDebounceRef.current = null;
          }, 200);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (topHoverDebounceRef.current) {
        clearTimeout(topHoverDebounceRef.current);
      }
    };
  }, [isTopHovered]);

  useEffect(() => {
    let ticking = false;

    const updateNavbarVisibility = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 20) {
        setIsVisible(true);
      } else if (Math.abs(scrollDelta) >= 8) {
        if (scrollDelta > 0 && currentScrollY > 80) {
          setIsVisible(false);
        } else if (scrollDelta < 0) {
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbarVisibility);
        ticking = true;
      }
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector('.pill-label');
        const white = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => { });
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1 });
    }

    if (initialLoadAnimation) {
      const logo = logoRef.current;
      const navItems = navItemsRef.current;

      if (logo) {
        gsap.set(logo, { scale: 0 });
        gsap.to(logo, {
          scale: 1,
          duration: 0.6,
          ease
        });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' });
        gsap.to(navItems, {
          width: 'auto',
          duration: 0.6,
          ease
        });
      }
    }

    return () => window.removeEventListener('resize', onResize);
  }, [ease, initialLoadAnimation]);

  const handleEnter = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    logoTweenRef.current = gsap.to(img, {
      y: -2,
      scale: 1.12,
      duration: 0.3,
      ease: "power2.out",
      overwrite: 'auto'
    });
  };

  const handleLogoLeave = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    logoTweenRef.current = gsap.to(img, {
      y: 0,
      scale: 1.08,
      duration: 0.3,
      ease: "power2.out",
      overwrite: 'auto'
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center'
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }
  };

  const handleCtaClick = (e) => {
    if (e) e.preventDefault();
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }

    const contactElem = document.getElementById('contact') || document.querySelector('footer');
    if (contactElem) {
      const navbarOffset = 90;
      const elementPosition = contactElem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    if (setShowContactForm) {
      setShowContactForm(true);
    }
  };

  const isExternalLink = href =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

  const isRouterLink = href => href && !isExternalLink(href);

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor
  };

  const shouldShowNavbar = isVisible || isTopHovered || isMobileMenuOpen;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: navStyles }} />
      <div className={`pill-nav-container${!shouldShowNavbar ? ' nav-hidden' : ''}`}>
        
        {/* ── LEFT SEPARATE CAPSULE: DEDICATED BRAND BLOCK ── */}
        <Link
          to="/"
          className="nav-brand-capsule group select-none cursor-pointer flex items-center gap-1 sm:gap-1.5"
          aria-label="Praskla Digital X Home"
          onMouseEnter={handleLogoEnter}
          onMouseLeave={handleLogoLeave}
          ref={el => {
            logoRef.current = el;
          }}
        >
          {/* Logo Emblem (Big logo emblem) */}
          <div className="pill-logo shrink-0 flex items-center">
            <img
              src={Logo}
              alt="Praskla Digital X Logo"
              ref={logoImgRef}
              className="h-[60px] sm:h-[68px] lg:h-[76px] !important w-auto object-contain transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)] group-hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.18)]"
              style={{ willChange: 'transform, filter' }}
            />
          </div>

          {/* 2-line Text Column (PRASKLA DIGITAL + Animated Single-Line Tagline) */}
          <div className="flex flex-col justify-center min-w-0">
            <span className="font-inlander text-[17px] sm:text-[20px] lg:text-[22px] font-black text-[#111111] leading-none tracking-[0.01em] uppercase whitespace-nowrap">
              PRASKLA DIGITAL
            </span>
            <AnimatedBrandTagline />
          </div>

          {/* Brand Stylized Red Swoosh X Graphic */}
          <svg
            viewBox="155 125 705 455"
            className="h-[34px] sm:h-[38px] lg:h-[42px] w-auto shrink-0 select-none text-[#E31D2E] -ml-2 sm:-ml-3 lg:-ml-3.5 self-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
            fill="currentColor"
            fillRule="evenodd"
            aria-hidden="true"
          >
            <path d="M 162.344 127.547 C 161.972 128.516, 165.486 134.586, 171.752 143.797 C 216.594 209.714, 252 262.339, 252 263.072 C 252 263.556, 249.366 267.675, 246.147 272.226 C 240.970 279.544, 180.406 366.557, 162.614 392.238 C 158.903 397.594, 156.154 402.440, 156.504 403.006 C 156.924 403.687, 170.682 404.016, 197.040 403.977 C 231.438 403.926, 237.150 403.707, 238.467 402.390 C 239.307 401.550, 246.365 391.331, 254.151 379.681 C 261.937 368.032, 275.264 348.253, 283.766 335.730 L 299.225 312.960 307.951 327.230 C 352.104 399.438, 397.728 453.946, 446.013 492.176 C 537.703 564.772, 637.259 576.269, 738.133 525.909 C 776.265 506.873, 815.308 477.947, 847.500 444.882 C 858.201 433.891, 858.657 432.680, 848.509 442.200 C 831.870 457.809, 805.614 475.583, 781.090 487.838 C 754.801 500.975, 731.982 508.564, 703.421 513.669 C 690 516.068, 686.037 516.340, 664 516.377 C 643.070 516.411, 637.606 516.092, 626.500 514.184 C 598.849 509.435, 575.987 501.872, 550 488.878 C 479.268 453.511, 414.870 386.417, 354.795 285.500 C 345.954 270.648, 340 259.991, 340 259.018 C 340 258.576, 361.096 229.412, 386.879 194.208 C 412.662 159.004, 434.095 129.655, 434.507 128.989 C 434.923 128.316, 434.643 127.388, 433.878 126.904 C 433.120 126.423, 414.608 126.024, 392.740 126.015 L 352.981 126 350.338 129.750 C 348.884 131.813, 336.401 150.375, 322.597 171 C 308.794 191.625, 297.061 208.500, 296.526 208.500 C 295.990 208.500, 284.290 190.671, 270.526 168.880 C 256.761 147.089, 244.882 128.527, 244.128 127.630 C 242.901 126.173, 238.508 126, 202.846 126 C 167.757 126, 162.866 126.187, 162.344 127.547" />
          </svg>
        </Link>

        {/* ── RIGHT SEPARATE CAPSULE: NAVIGATION LINKS & CTA ── */}
        <div className="nav-links-capsule relative">
          <nav className="pill-nav" aria-label="Primary" style={cssVars}>
            <div className="pill-nav-items desktop-only" ref={navItemsRef}>
              <ul className="pill-list" role="menubar">
                {navItemsList.map((item, i) => (
                  <li key={item.href || `item-${i}`} role="none">
                    {isRouterLink(item.href) ? (
                      <Link
                        role="menuitem"
                        to={item.href}
                        className={`pill${activeHref === item.href ? ' is-active' : ''}`}
                        aria-label={item.label}
                        onMouseEnter={() => handleEnter(i)}
                        onMouseLeave={() => handleLeave(i)}
                      >
                        <span
                          className="hover-circle"
                          aria-hidden="true"
                          ref={el => {
                            circleRefs.current[i] = el;
                          }}
                        />
                        <span className="label-stack">
                          <span className="pill-label">{item.label}</span>
                          <span className="pill-label-hover" aria-hidden="true">
                            {item.label}
                          </span>
                        </span>
                      </Link>
                    ) : (
                      <a
                        role="menuitem"
                        href={item.href}
                        className={`pill${activeHref === item.href ? ' is-active' : ''}`}
                        aria-label={item.label}
                        onMouseEnter={() => handleEnter(i)}
                        onMouseLeave={() => handleLeave(i)}
                      >
                        <span
                          className="hover-circle"
                          aria-hidden="true"
                          ref={el => {
                            circleRefs.current[i] = el;
                          }}
                        />
                        <span className="label-stack">
                          <span className="pill-label">{item.label}</span>
                          <span className="pill-label-hover" aria-hidden="true">
                            {item.label}
                          </span>
                        </span>
                      </a>
                    )}
                  </li>
                ))}
                {/* SEARCH BUTTON (Adopted to navbar UI as pill item) */}
                <li role="none">
                  <button
                    type="button"
                    onClick={() => {
                      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
                      if (onOpenSearch) onOpenSearch();
                    }}
                    className="nav-search-pill group"
                    aria-label="Search website"
                    title="Search website (⌘K)"
                  >
                    <Search className="w-4 h-4 text-[#111111] group-hover:text-[#E31D2E] transition-colors" />
                  </button>
                </li>
              </ul>
            </div>

            <button
              className="mobile-menu-button mobile-only"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              ref={hamburgerRef}
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </nav>

          {/* MOBILE POPOVER MENU */}
          <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef} style={cssVars}>
            <ul className="mobile-menu-list">
              {navItemsList.map((item, i) => (
                <li key={item.href || `mobile-item-${i}`}>
                  {isRouterLink(item.href) ? (
                    <Link
                      to={item.href}
                      className={`mobile-menu-link${activeHref === item.href ? ' is-active' : ''}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className={`mobile-menu-link${activeHref === item.href ? ' is-active' : ''}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
              <li className="pt-1 px-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onOpenSearch) onOpenSearch();
                  }}
                  className="w-full flex items-center justify-between px-4 py-2 rounded-full bg-[#FAFAFA] hover:bg-[#F4F4F4] text-[#111111] font-semibold text-sm transition-colors border border-gray-200/80"
                >
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#E31D2E]" />
                    <span>Search Site</span>
                  </div>
                  <kbd className="px-1.5 py-0.5 text-[10px] font-bold text-gray-500 bg-gray-200/80 rounded">
                    ⌘K
                  </kbd>
                </button>
              </li>
              <li className="pt-1 pb-1 px-1">
                <button
                  type="button"
                  onClick={handleCtaClick}
                  className="nav-cta-btn w-full justify-center group"
                  aria-label="Get in Touch"
                >
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] group-hover:bg-white opacity-75 transition-colors duration-300" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31D2E] group-hover:bg-white transition-colors duration-300" />
                  </span>
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* DESKTOP CTA BUTTON (Separated in Far Right Corner) */}
        <div className="hidden lg:block shrink-0">
          <button
            type="button"
            onClick={handleCtaClick}
            className="nav-cta-btn group"
            aria-label="Get in Touch"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] group-hover:bg-white opacity-75 transition-colors duration-300" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31D2E] group-hover:bg-white transition-colors duration-300" />
            </span>
            <span>Get in Touch</span>
            <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </button>
        </div>

      </div>
    </>
  );
};

export default Navbar;