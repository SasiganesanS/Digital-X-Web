import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import Logo from "../assets/Praskla_Digital_X_Logo_Trasnparent_Background.webp";
import BrandX from "./common/BrandX";

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
  return (
    <div className="h-[10px] sm:h-[11px] lg:h-[12px] relative mt-[3px] w-full max-w-[220px] sm:max-w-[260px]">
      <span className="font-dingos text-[8px] sm:text-[9px] lg:text-[9.5px] font-bold text-[#E31D2E] block tracking-tight leading-none whitespace-nowrap truncate">
        A Mindful Marketing and Production Firm
      </span>
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
  transform: translateY(0);
  transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1);
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
  background: #111111;
  height: 44px;
  padding: 0 6px;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  flex-shrink: 0;
  box-sizing: border-box;
}

.nav-search-pill {
  height: var(--nav-h);
  width: var(--nav-h);
  padding: 0;
  border-radius: 10px;
  background: transparent;
  border: none;
  color: #ffffff !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.nav-search-pill svg {
  color: #ffffff !important;
  stroke: #ffffff !important;
  transition: color 0.2s ease, stroke 0.2s ease;
}

.nav-search-pill:hover {
  background-color: rgba(255, 255, 255, 0.15) !important;
  color: #FF2B2B !important;
}

.nav-search-pill:hover svg {
  color: #FF2B2B !important;
  stroke: #FF2B2B !important;
}

.nav-cta-btn {
  height: 44px;
  padding: 0 22px;
  border-radius: 14px;
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
  gap: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.12);
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: transform 250ms ease-out, box-shadow 250ms ease-out, background 250ms ease-out, border-color 250ms ease-out;
  outline: none;
  box-sizing: border-box;
}

.nav-cta-btn svg {
  color: #ffffff !important;
  stroke: #ffffff !important;
  fill: none !important;
  transition: transform 250ms ease-out, color 250ms ease-out, stroke 250ms ease-out;
}

.nav-cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
  background: linear-gradient(135deg, #E51D1D 0%, #C81515 100%);
  border-color: rgba(255, 255, 255, 0.2);
  color: #ffffff !important;
}

.nav-cta-btn:hover svg {
  color: #111111 !important;
  stroke: #111111 !important;
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
  transform: translateY(-115%);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.75s cubic-bezier(0.32, 0, 0.2, 1), opacity 0.65s cubic-bezier(0.32, 0, 0.2, 1);
}

.pill-nav {
  --nav-h: 32px;
  --pill-pad-x: 13px;
  --pill-gap: 6px;
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
  height: var(--nav-h);
  padding: 0 var(--pill-pad-x);
  background: transparent;
  color: #ffffff;
  text-decoration: none;
  border-radius: 10px;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  white-space: nowrap;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;
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

/* ── Atomic Orbital Rings Animation around Logo ── */
.atom-orbit-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 52px;
  height: 52px;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 600px;
  transform-style: preserve-3d;
  z-index: 5;
  transition: opacity 0.5s ease-in-out;
}

@media (min-width: 640px) {
  .atom-orbit-container {
    width: 60px;
    height: 60px;
  }
}

@media (min-width: 1024px) {
  .atom-orbit-container {
    width: 66px;
    height: 66px;
  }
}

.atom-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid rgba(227, 29, 46, 0.55);
  box-shadow: none !important;
  transform-style: preserve-3d;
}

.atom-ring-1 {
  transform: rotateX(68deg) rotateY(20deg);
}

.atom-ring-2 {
  transform: rotateX(68deg) rotateY(-50deg) rotateZ(60deg);
}

.atom-ring-3 {
  transform: rotateX(72deg) rotateY(60deg) rotateZ(-50deg);
}

.atom-electron-orbit {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  transform-style: preserve-3d;
}

.atom-electron-orbit-1 {
  animation: atomOrbitSpin1 3.5s linear infinite;
}

.atom-electron-orbit-2 {
  animation: atomOrbitSpin2 4.2s linear infinite reverse;
}

.atom-electron-orbit-3 {
  animation: atomOrbitSpin3 3.8s linear infinite;
}

.atom-electron {
  position: absolute;
  top: -2.5px;
  left: 50%;
  transform: translateX(-50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #111111;
  box-shadow: none !important;
}

.nav-brand-capsule:hover .atom-electron-orbit-1 {
  animation-duration: 1.8s;
}
.nav-brand-capsule:hover .atom-electron-orbit-2 {
  animation-duration: 2.2s;
}
.nav-brand-capsule:hover .atom-electron-orbit-3 {
  animation-duration: 2s;
}

@keyframes atomOrbitSpin1 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes atomOrbitSpin2 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes atomOrbitSpin3 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

const Navbar = ({ setShowContactForm, onOpenSearch }) => {
  const location = useLocation();
  const activeHref = location.pathname;

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const activeIndex = navItemsList.findIndex(
    item => item.href === activeHref || (item.href !== '/' && activeHref.startsWith(item.href))
  );
  const resolvedActiveIndex = activeIndex !== -1 ? activeIndex : 0;
  const currentHighlightIndex = hoveredIndex !== null ? hoveredIndex : resolvedActiveIndex;

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
  const [isSparkAnimating, setIsSparkAnimating] = useState(false);
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

  // Periodic 15-Second Logo Spark Animation ("Google Doodle-style surprise")
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const triggerSpark = () => {
      setIsSparkAnimating(true);
      setTimeout(() => {
        setIsSparkAnimating(false);
      }, 1600);
    };

    const intervalId = setInterval(triggerSpark, 15000);

    return () => clearInterval(intervalId);
  }, []);

  // Atom Rings Timing Cycle: Visible for 5 seconds, then Hidden for 15 seconds (repeats every 20s)
  const [showAtomRings, setShowAtomRings] = useState(true);

  useEffect(() => {
    let hideTimer;
    let cycleInterval;

    const startCycle = () => {
      setShowAtomRings(true);
      hideTimer = setTimeout(() => {
        setShowAtomRings(false);
      }, 5000); // Stays visible for 5 seconds
    };

    startCycle();

    // Repeat cycle every 20s (5s visible + 15s hidden)
    cycleInterval = setInterval(() => {
      startCycle();
    }, 20000);

    return () => {
      clearTimeout(hideTimer);
      clearInterval(cycleInterval);
    };
  }, []);

  // Reveal on Top Hover (Mouse entering top 70px of viewport)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const isTopZone = e.clientY <= 80;

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
          }, 400);
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
        const { height: h } = rect;

        circle.style.width = '100%';
        circle.style.height = '100%';
        circle.style.top = '0';
        circle.style.left = '0';
        circle.style.bottom = 'auto';

        gsap.set(circle, {
          scaleX: 0,
          scaleY: 1,
          transformOrigin: 'left center'
        });

        const label = pill.querySelector('.pill-label');
        const white = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });
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

  const isHomePage = location.pathname === '/' || location.pathname === '';
  const shouldShowNavbar = isVisible || isTopHovered || isMobileMenuOpen;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: navStyles }} />
      <div className={`pill-nav-container${!shouldShowNavbar ? ' nav-hidden' : ''}`}>
        
        {/* ── LEFT SEPARATE CAPSULE: DEDICATED BRAND BLOCK ── */}
        <Link
          to="/"
          className="nav-brand-capsule group select-none cursor-pointer flex items-center gap-1 sm:gap-1.5"
          aria-label="PRASKLA DIGITAL X Home"
          onMouseEnter={handleLogoEnter}
          onMouseLeave={handleLogoLeave}
          ref={el => {
            logoRef.current = el;
          }}
        >
          {/* Logo Emblem (Big logo emblem with 3D Atomic Orbit Rings & periodic 15s spark animation) */}
          <motion.div
            className="pill-logo shrink-0 flex items-center justify-center relative overflow-visible"
            animate={
              isSparkAnimating
                ? {
                    y: [0, -3, -1, -2, 0],
                    scale: [1, 1.025, 1.035, 1.01, 1],
                  }
                : { y: 0, scale: 1 }
            }
            transition={{
              duration: 1.5,
              ease: [0.25, 1, 0.5, 1],
              times: [0, 0.3, 0.6, 0.85, 1],
            }}
          >
            {/* 3D Atomic Orbital Rings Surrounding Logo Nucleus */}
            <div className={`atom-orbit-container ${showAtomRings ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              {/* Orbital Ring 1 & Black Electron */}
              <div className="atom-ring atom-ring-1">
                <div className="atom-electron-orbit atom-electron-orbit-1">
                  <div className="atom-electron" />
                </div>
              </div>

              {/* Orbital Ring 2 & Black Electron */}
              <div className="atom-ring atom-ring-2">
                <div className="atom-electron-orbit atom-electron-orbit-2">
                  <div className="atom-electron" />
                </div>
              </div>

              {/* Orbital Ring 3 & Black Electron */}
              <div className="atom-ring atom-ring-3">
                <div className="atom-electron-orbit atom-electron-orbit-3">
                  <div className="atom-electron" />
                </div>
              </div>
            </div>

            <img
              src={Logo}
              alt="PRASKLA DIGITAL X Logo"
              ref={logoImgRef}
              className="h-[60px] sm:h-[68px] lg:h-[76px] !important w-auto object-contain transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)] group-hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.18)] relative z-10"
              style={{ willChange: 'transform, filter' }}
            />

            {/* Phase 3: Premium Light Highlight Sweep Across Logo */}
            {isSparkAnimating && (
              <motion.div
                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 z-20"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "200%", opacity: [0, 0.45, 0] }}
                transition={{ duration: 1.2, delay: 0.15, ease: "easeInOut" }}
              />
            )}
          </motion.div>

          {/* 2-line Text Column (PRASKLA DIGITAL + Animated Single-Line Tagline) */}
          <div className="flex flex-col justify-center min-w-0">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-inlander text-[17px] sm:text-[20px] lg:text-[22px] font-black text-[#111111] leading-none tracking-[0.01em] uppercase whitespace-nowrap">
                PRASKLA DIGITAL
              </span>
              <motion.div
                animate={
                  isSparkAnimating
                    ? {
                        scale: [1, 1.08, 1],
                        rotate: [0, 2, -2, 0],
                      }
                    : { scale: 1, rotate: 0 }
                }
                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              >
                <BrandX className="h-[23px] sm:h-[27px] lg:h-[30px] w-auto shrink-0 select-none text-[#E31D2E] translate-y-[2px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]" />
              </motion.div>
            </div>
            <AnimatedBrandTagline />
          </div>
        </Link>

        {/* ── RIGHT SEPARATE CAPSULE: NAVIGATION LINKS & CTA ── */}
        <div className="nav-links-capsule relative">
          <nav className="pill-nav" aria-label="Primary" style={cssVars}>
            <div className="pill-nav-items desktop-only" ref={navItemsRef}>
              <ul
                className="pill-list"
                role="menubar"
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {navItemsList.map((item, i) => {
                  const isHighlighted = i === currentHighlightIndex;
                  return (
                    <li key={item.href || `item-${i}`} role="none">
                      {isRouterLink(item.href) ? (
                        <Link
                          role="menuitem"
                          to={item.href}
                          className="pill group"
                          aria-label={item.label}
                          onMouseEnter={() => setHoveredIndex(i)}
                        >
                          {isHighlighted && (
                            <motion.span
                              layoutId="activeNavPill"
                              className="absolute inset-0 bg-[#E31D2E] rounded-xl z-0 shadow-[0_4px_14px_rgba(227,29,46,0.4)]"
                              transition={{ type: "spring", stiffness: 450, damping: 35 }}
                            />
                          )}
                          <span className="relative z-10 font-bold text-[12px] uppercase tracking-[0.03em] select-none text-white transition-colors duration-200">
                            {item.label}
                          </span>
                        </Link>
                      ) : (
                        <a
                          role="menuitem"
                          href={item.href}
                          className="pill group"
                          aria-label={item.label}
                          onMouseEnter={() => setHoveredIndex(i)}
                        >
                          {isHighlighted && (
                            <motion.span
                              layoutId="activeNavPill"
                              className="absolute inset-0 bg-[#E31D2E] rounded-xl z-0 shadow-[0_4px_14px_rgba(227,29,46,0.4)]"
                              transition={{ type: "spring", stiffness: 450, damping: 35 }}
                            />
                          )}
                          <span className="relative z-10 font-bold text-[12px] uppercase tracking-[0.03em] select-none text-white transition-colors duration-200">
                            {item.label}
                          </span>
                        </a>
                      )}
                    </li>
                  );
                })}
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
                  className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-[#FAFAFA] hover:bg-[#F4F4F4] text-[#111111] font-semibold text-sm transition-colors border border-gray-200/80"
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
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:!text-[#111111] group-hover:!stroke-[#111111] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
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
            <ArrowUpRight className="w-4 h-4 text-white group-hover:!text-[#111111] group-hover:!stroke-[#111111] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
          </button>
        </div>

      </div>
    </>
  );
};

export default Navbar;