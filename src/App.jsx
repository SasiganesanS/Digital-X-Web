import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// --- All component imports ---
import Navbar from "./components/Navbar";
import FavIcon from "./assets/fav.webp";
import Home from "./components/home/Home";
import Homesection2 from "./components/home/Homesection2";
import Homesection3 from "./components/home/Homesection3";
import Homesection4 from "./components/home/Homesection4";
import Homesection5 from "./components/home/Homesection5";
import About from "./components/about/About";
import Teams from "./components/Teams";
import Clients from "./components/Clients";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Careers from "./components/Careers";
import Footer from "./components/Footer";
import Partners from "./components/Partners";
import NotFound from "./components/NotFound";
import ContactForm from "./components/ContactForm";
import BusinessWebsitePricing from "./components/pricing/BusinessWebsitePricing";
import EcommerceWebsitePricing from "./components/pricing/EcommerceWebsitePricing";
import MobileApplicationPricing from "./components/pricing/MobileApplicationPricing";
import DigitalMarketingPricing from "./components/pricing/DigitalMarketingPricing";
import SoftwareDevelopmentPricing from "./components/pricing/SoftwareDevelopmentPricing";
import CybersecurityPricing from "./components/pricing/CybersecurityPricing";
import SustainabilityPricing from "./components/pricing/SustainabilityPricing";
import EcommerceMarketingCombo from "./components/pricing/EcommerceMarketingCombo";
import SoftwareMarketingCombo from "./components/pricing/SoftwareMarketingCombo";
import MobileMarketingCombo from "./components/pricing/MobileMarketingCombo";
import BlogPage from "./components/pricing/BlogPage";
import MainBlogPage from "./components/MainBlogPage";
import ProjectCaseStudy from "./components/ProjectCaseStudy";
import ProjectDetail from "./components/ProjectDetail";
import ServiceCalculator from "./components/ServiceCalculator";
import PlatformPlanPage from "./components/PlatformPlanPage";
import CinematicUniverse from "./components/CinematicUniverse";
import ScrollToTop from "./components/ScrollToTop";
import RocketScrollbar from "./components/RocketScrollbar";
import SearchOverlay from "./components/SearchOverlay";

// Legal Page Imports
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import TermsAndConditions from "./components/legal/TermsAndConditions";
import CookiePolicy from "./components/legal/CookiePolicy";

// Test Home Components
import Hero from "./components/test-home/Hero";
import TrustedBy from "./components/test-home/TrustedBy";
import FeaturedProjects from "./components/test-home/FeaturedProjects";
import Services1 from "./components/test-home/Services1";
import About1 from "./components/test-home/About1";
import Testimonials1 from "./components/test-home/Testimonials1";
import Contact from "./components/test-home/Contact";
import ServiceCard from "./components/serviceCard-reveal/ServiceCard";
import Contact_page from "./components/test-home/Contact_page";

// Animation Wrapper
import AnimatedPage from "./components/AnimatedPage";

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
      <AppRoutes />
      <Footer setShowContactForm={setShowContactForm} />
      <ScrollToTop />
      <RocketScrollbar />
      </div>
    </div>
  );
};

import ErrorBoundary from "./components/ErrorBoundary";

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
