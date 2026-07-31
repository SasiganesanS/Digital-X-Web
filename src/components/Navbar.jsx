import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import Logo from "../assets/Praskla_Digital_X_Logo_Trasnparent_Background.png";

const navItemsList = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Careers", href: "/careers" }
];

const navStyles = `
.pill-nav-container {
  position: fixed;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%) translateY(0);
  opacity: 1;
  width: 90%;
  max-width: 1350px;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.35s ease-out, opacity 0.35s ease-out;
  will-change: transform, opacity;
}

.nav-cta-btn {
  height: 44px;
  padding: 0 24px;
  border-radius: 999px;
  background: linear-gradient(135deg, #FF2D2D 0%, #E61C24 100%);
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 12px 30px rgba(255, 40, 40, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: transform 250ms ease-out, box-shadow 250ms ease-out, background 250ms ease-out;
  outline: none;
  box-sizing: border-box;
}

.nav-cta-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 36px rgba(255, 40, 40, 0.38);
  background: linear-gradient(135deg, #FF3D3D 0%, #F5232B 100%);
}

.nav-cta-btn .cta-arrow {
  transition: transform 250ms ease-out;
  display: inline-block;
}

.nav-cta-btn:hover .cta-arrow {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .pill-nav-container {
    width: 100%;
    left: 0;
    transform: translateY(0);
    padding: 0 1rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.pill-nav-container.nav-hidden {
  transform: translateX(-50%) translateY(-120%);
  opacity: 0;
  pointer-events: none;
}

@media (max-width: 768px) {
  .pill-nav-container.nav-hidden {
    transform: translateY(-120%);
    opacity: 0;
  }
}

.pill-nav {
  --nav-h: 42px;
  --logo: 36px;
  --pill-pad-x: 18px;
  --pill-gap: 3px;
  width: max-content;
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
  background: var(--base, #000);
  border-radius: 9999px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}

.pill-logo {
  height: 38px;
  width: auto;
  background: transparent;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.pill-logo img {
  height: 38px;
  width: auto;
  object-fit: contain;
  display: block;
}

.pill-list {
  list-style: none;
  display: flex;
  align-items: stretch;
  gap: var(--pill-gap);
  margin: 0;
  padding: 3px;
  height: 100%;
}

.pill-list > li {
  display: flex;
  height: 100%;
}

.pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 var(--pill-pad-x);
  background: var(--base, #fff);
  color: var(--pill-text, var(--base, #000));
  text-decoration: none;
  border-radius: 9999px;
  box-sizing: border-box;
  font-weight: 600;
  font-size: 16px;
  line-height: 0;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  white-space: nowrap;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.pill .hover-circle {
  position: absolute;
  left: 50%;
  bottom: 0;
  border-radius: 50%;
  background: var(--pill-bg, #ef2029);
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
  background: var(--pill-bg, #ef2029) !important;
  color: var(--hover-text, #ffffff) !important;
}

.pill.is-active::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background: var(--base, #000);
  border-radius: 50px;
  z-index: 4;
}

.desktop-only {
  display: block;
}

.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }
}

.mobile-menu-button {
  width: var(--nav-h);
  height: var(--nav-h);
  border-radius: 50%;
  background: var(--base, #000);
  border: none;
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
  background: var(--pill-bg, #fff);
  border-radius: 1px;
  transition: all 0.01s ease;
  transform-origin: center;
}

.mobile-menu-popover {
  position: absolute;
  top: 3em;
  left: 1rem;
  right: 1rem;
  background: var(--base, #f0f0f0);
  border-radius: 27px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  z-index: 998;
  opacity: 0;
  transform-origin: top center;
  visibility: hidden;
}

.mobile-menu-list {
  list-style: none;
  margin: 0;
  padding: 3px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.mobile-menu-popover .mobile-menu-link {
  display: block;
  padding: 12px 16px;
  color: var(--pill-text, #fff);
  background-color: var(--pill-bg, #fff);
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  border-radius: 50px;
  transition: all 0.2s ease;
}

.mobile-menu-popover .mobile-menu-link:hover {
  cursor: pointer;
  background-color: var(--base);
  color: var(--hover-text, #fff);
}
`;

const Navbar = ({ setShowContactForm }) => {
  const location = useLocation();
  const activeHref = location.pathname;

  const ease = 'power3.easeOut';
  const baseColor = '#ffffff';
  const pillColor = '#ef2029';
  const hoveredPillTextColor = '#ffffff';
  const pillTextColor = '#111111';
  const initialLoadAnimation = false;

  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
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
      y: -3,
      scale: 1.06,
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
      scale: 1,
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

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: navStyles }} />
      <div className={`pill-nav-container${!isVisible && !isMobileMenuOpen ? ' nav-hidden' : ''}`}>
        {/* DEDICATED BRAND BLOCK */}
        <Link
          to="/"
          className="brand-block flex items-center gap-3 sm:gap-4 mr-6 md:mr-8 shrink-0 text-left group no-underline select-none cursor-pointer"
          aria-label="Praskla Digital X Home"
          onMouseEnter={handleLogoEnter}
          onMouseLeave={handleLogoLeave}
          ref={el => {
            logoRef.current = el;
          }}
        >
          <div className="pill-logo shrink-0">
            <img
              src={Logo}
              alt="Praskla Digital X Logo"
              ref={logoImgRef}
              className="h-[38px] sm:h-[40px] w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_6px_16px_rgba(227,29,46,0.35)]"
              style={{ willChange: 'transform, filter' }}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <span className="font-signature text-[24px] sm:text-[28px] lg:text-[30px] font-normal text-[#111111] leading-none tracking-normal antialiased">
              Praskla Digital <span className="text-[#E31D2E]">X</span>
            </span>
            <span className="hidden md:block font-space-grotesk text-[10px] sm:text-[11px] font-medium text-[#6B7280] tracking-[0.08em] leading-[1.4] mt-[1px]">
              Where Strategy Meets Creativity
            </span>
          </motion.div>
        </Link>

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

        {/* DESKTOP CTA BUTTON */}
        <button
          type="button"
          onClick={handleCtaClick}
          className="nav-cta-btn desktop-only"
          aria-label="Let's Talk"
        >
          <span>Let's Talk</span>
          <ArrowRight className="w-4 h-4 cta-arrow" />
        </button>

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
            <li className="pt-2 pb-1 px-1">
              <button
                type="button"
                onClick={handleCtaClick}
                className="nav-cta-btn w-full justify-center"
                aria-label="Let's Talk"
              >
                <span>Let's Talk</span>
                <ArrowRight className="w-4 h-4 cta-arrow" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;