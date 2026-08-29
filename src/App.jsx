import React, { useState, useEffect, lazy, Suspense } from "react";
import { HashRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// --- Layout & Shell component imports ---
import Navbar from "./components/Navbar";
import FavIcon from "./assets/fav.webp";
import Home from "./components/home/Home";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import ContactForm from "./components/ContactForm";
import CinematicUniverse from "./components/CinematicUniverse";
import ScrollToTop from "./components/ScrollToTop";
import RocketScrollbar from "./components/RocketScrollbar";
import SearchOverlay from "./components/SearchOverlay";
import FooterReveal from "./components/FooterReveal";
import AnimatedPage from "./components/AnimatedPage";
import PageTransitionOverlay from "./components/PageTransitionOverlay";
import ErrorBoundary from "./components/ErrorBoundary";

// --- Lazy-Loaded Page Components (Code-Splitting) ---
const About = lazy(() => import("./components/about/About"));
const Clients = lazy(() => import("./components/Clients"));
const Projects = lazy(() => import("./components/Projects"));
const Careers = lazy(() => import("./components/Careers"));
const ServiceCalculator = lazy(() => import("./components/ServiceCalculator"));
const CollaboratorDirectory = lazy(() => import("./components/collaborators/CollaboratorDirectory"));
const CollaboratorProfilePage = lazy(() => import("./components/collaborators/CollaboratorProfilePage"));

const BusinessWebsitePricing = lazy(() => import("./components/pricing/BusinessWebsitePricing"));
const EcommerceWebsitePricing = lazy(() => import("./components/pricing/EcommerceWebsitePricing"));
const MobileApplicationPricing = lazy(() => import("./components/pricing/MobileApplicationPricing"));
const DigitalMarketingPricing = lazy(() => import("./components/pricing/DigitalMarketingPricing"));
const SoftwareDevelopmentPricing = lazy(() => import("./components/pricing/SoftwareDevelopmentPricing"));
const CybersecurityPricing = lazy(() => import("./components/pricing/CybersecurityPricing"));
const SustainabilityPricing = lazy(() => import("./components/pricing/SustainabilityPricing"));

const EcommerceMarketingCombo = lazy(() => import("./components/pricing/EcommerceMarketingCombo"));
const SoftwareMarketingCombo = lazy(() => import("./components/pricing/SoftwareMarketingCombo"));
const MobileMarketingCombo = lazy(() => import("./components/pricing/MobileMarketingCombo"));

const BlogPage = lazy(() => import("./components/pricing/BlogPage"));
const MainBlogPage = lazy(() => import("./components/MainBlogPage"));
const ProjectCaseStudy = lazy(() => import("./components/ProjectCaseStudy"));
const ProjectDetail = lazy(() => import("./components/ProjectDetail"));
const PlatformPlanPage = lazy(() => import("./components/PlatformPlanPage"));

const PrivacyPolicy = lazy(() => import("./components/legal/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./components/legal/TermsAndConditions"));
const CookiePolicy = lazy(() => import("./components/legal/CookiePolicy"));
const ServiceCard = lazy(() => import("./components/serviceCard-reveal/ServiceCard"));

// ===================================================================
// HomePage Wrapper with Scroll Restoration
// ===================================================================
const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    // If returning from project case study, scroll to projects section
    if (location.state?.scrollToProjects) {
      const timer = setTimeout(() => {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <AnimatedPage>
      <Home />
    </AnimatedPage>
  );
};

// ===================================================================
// AppRoutes Component (Now includes routes from both branches)
// ===================================================================
const AppRoutes = () => {
  const location = useLocation();
  console.log("[Router] location changed →", location.pathname, location.hash);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/test"
        element={
          <AnimatedPage>
            <ServiceCard />
          </AnimatedPage>
        }
      />
      <Route
        path="/about"
        element={
          <AnimatedPage>
            <About />
          </AnimatedPage>
        }
      />
      <Route
        path="/clients"
        element={
          <AnimatedPage>
            <Clients />
          </AnimatedPage>
        }
      />
      <Route
        path="/projects"
        element={
          <AnimatedPage>
            <Projects />
            {/* <Partners /> */}
          </AnimatedPage>
        }
      />
      <Route
        path="/services"
        element={
          <AnimatedPage>
            <ServiceCalculator />
          </AnimatedPage>
        }
      />
      <Route
        path="/careers"
        element={
          <AnimatedPage>
            <Careers />
          </AnimatedPage>
        }
      />
      <Route
        path="/collaborators"
        element={
          <AnimatedPage>
            <CollaboratorDirectory />
          </AnimatedPage>
        }
      />
      <Route
        path="/collaborators/:slug"
        element={
          <AnimatedPage>
            <CollaboratorProfilePage />
          </AnimatedPage>
        }
      />

      {/* --- Pricing Pages --- */}
      <Route
        path="/business-website-pricing"
        element={
          <AnimatedPage>
            <BusinessWebsitePricing />
          </AnimatedPage>
        }
      />
      <Route
        path="/ecommerce-website-pricing"
        element={
          <AnimatedPage>
            <EcommerceWebsitePricing />
          </AnimatedPage>
        }
      />
      <Route
        path="/mobile-application-pricing"
        element={
          <AnimatedPage>
            <MobileApplicationPricing />
          </AnimatedPage>
        }
      />
      <Route
        path="/digital-marketing-pricing"
        element={
          <AnimatedPage>
            <DigitalMarketingPricing />
          </AnimatedPage>
        }
      />
      <Route
        path="/software-development-pricing"
        element={
          <AnimatedPage>
            <SoftwareDevelopmentPricing />
          </AnimatedPage>
        }
      />
      <Route
        path="/cybersecurity-pricing"
        element={
          <AnimatedPage>
            <CybersecurityPricing />
          </AnimatedPage>
        }
      />
      <Route
        path="/sustainability-pricing"
        element={
          <AnimatedPage>
            <SustainabilityPricing />
          </AnimatedPage>
        }
      />

      {/* --- Combo Pages --- */}
      <Route
        path="/ecommerce-marketing-combo"
        element={
          <AnimatedPage>
            <EcommerceMarketingCombo />
          </AnimatedPage>
        }
      />
      <Route
        path="/software-marketing-combo"
        element={
          <AnimatedPage>
            <SoftwareMarketingCombo />
          </AnimatedPage>
        }
      />
      <Route
        path="/mobile-marketing-combo"
        element={
          <AnimatedPage>
            <MobileMarketingCombo />
          </AnimatedPage>
        }
      />
      <Route
        path="/website-seo-combo"
        element={
          <AnimatedPage>
            <BusinessWebsitePricing />
          </AnimatedPage>
        }
      />
      <Route
        path="/software-support-combo"
        element={
          <AnimatedPage>
            <SoftwareDevelopmentPricing />
          </AnimatedPage>
        }
      />

      <Route
        path="/blog"
        element={
          <AnimatedPage>
            <MainBlogPage />
          </AnimatedPage>
        }
      />

      <Route
        path="/blog/:id"
        element={
          <AnimatedPage>
            <BlogPage />
          </AnimatedPage>
        }
      />

      {/* MERGED: Added Mobile Plan Pages from development */}
      <Route path="/platform-plan" element={<PlatformPlanPage />} />


      <Route
        path="/case-study/:id"
        element={
          <AnimatedPage>
            <ProjectCaseStudy />
          </AnimatedPage>
        }
      />

      <Route
        path="/project/:id"
        element={
          <AnimatedPage>
            <ProjectDetail />
          </AnimatedPage>
        }
      />

      {/* --- Legal Pages --- */}
      <Route
        path="/privacy-policy"
        element={
          <AnimatedPage>
            <PrivacyPolicy />
          </AnimatedPage>
        }
      />
      <Route
        path="/privacy"
        element={
          <AnimatedPage>
            <PrivacyPolicy />
          </AnimatedPage>
        }
      />
      <Route
        path="/terms-and-conditions"
        element={
          <AnimatedPage>
            <TermsAndConditions />
          </AnimatedPage>
        }
      />
      <Route
        path="/terms"
        element={
          <AnimatedPage>
            <TermsAndConditions />
          </AnimatedPage>
        }
      />
      <Route
        path="/cookie-policy"
        element={
          <AnimatedPage>
            <CookiePolicy />
          </AnimatedPage>
        }
      />
      <Route
        path="/cookies"
        element={
          <AnimatedPage>
            <CookiePolicy />
          </AnimatedPage>
        }
      />

      <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
    </Routes>
  );
};

// ===================================================================
// Global Scroll Restoration On Route Change
// ===================================================================
const ScrollToTopOnNavigate = () => {
  const { pathname, hash, state } = useLocation();

  useEffect(() => {
    document.body.style.overflow = "";
    if (pathname === "/" && !hash && !state?.scrollToProjects) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    if (state?.scrollToProjects) {
      return;
    }

    if (hash) {
      const id = hash.replace("#", "");
      const scrollToTarget = () => {
        const element =
          document.getElementById(id) ||
          document.getElementById(`service-card-${id}`) ||
          document.getElementById(`job-${id}`) ||
          document.querySelector(`[data-id="${id}"]`) ||
          document.querySelector(`[data-id="service-card-${id}"]`);

        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          return true;
        }
        return false;
      };

      if (!scrollToTarget()) {
        const timer1 = setTimeout(scrollToTarget, 100);
        const timer2 = setTimeout(scrollToTarget, 300);
        const timer3 = setTimeout(scrollToTarget, 600);
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
          clearTimeout(timer3);
        };
      }
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, [pathname, hash, state]);

  return null;
};

// ===================================================================
// MERGED: This MainLayout component now contains logic from BOTH branches
// ===================================================================
const MainLayout = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Global CMD+K / Ctrl+K keyboard shortcut to toggle search overlay
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Check if current route is a mobile-only page (no navbar/footer)
  const isMobilePlanPage = location.pathname === "/platform-plan";

  // MERGED: Return logic from development's AppLayout
  if (isMobilePlanPage) {
    // Mobile plan pages: no navbar, no footer, no contact form
    return (
      <>
        <ScrollToTopOnNavigate />
        <AppRoutes />
      </>
    );
  }

  // Regular pages: with navbar and footer
  return (
    <div style={{ minHeight: "100vh", overflowX: "hidden", position: "relative", width: "100%" }}>
      <PageTransitionOverlay />
      <ScrollToTopOnNavigate />
      <CinematicUniverse />
      <div style={{ position: "relative", zIndex: 1 }}>
      {/* SVG Filter for Logo Dark Mode Optimization */}
      <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }} aria-hidden="true">
        <filter id="logo-dark-mode-filter">
          <feColorMatrix
            type="matrix"
            values="0 -1 -1  1  0
                   -1  0 -1  1  0
                   -1 -1  0  1  0
                    0  0  0  1  0"
          />
        </filter>
      </svg>
      <Navbar
        setShowContactForm={setShowContactForm}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        setShowContactForm={setShowContactForm}
      />
      <ContactForm
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
      />
      <main className="relative z-10 w-full">
        <Suspense fallback={null}>
          <AppRoutes />
        </Suspense>
      </main>
      <FooterReveal setShowContactForm={setShowContactForm} />
      <ScrollToTop />
      <RocketScrollbar />
      </div>
    </div>
  );
};

// ===================================================================
// App component (renders the merged MainLayout)
// ===================================================================
function App() {
  return (
    <HashRouter>
      <ErrorBoundary>
        <MainLayout />
      </ErrorBoundary>
    </HashRouter>
  );
}

export default App;
