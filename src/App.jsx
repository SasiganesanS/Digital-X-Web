import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// --- All component imports ---
import Navbar from "./components/Navbar";
import FavIcon from "./assets/fav.ico";
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
import CaseStudy from "./components/CaseStudy";
// MERGED: Added new imports from development
import PlatformPlanPage from "./components/PlatformPlanPage";

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
            <Services />
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

      {/* --- Case Study Listing --- */}
      <Route
        path="/case-study"
        element={
          <AnimatedPage>
            <CaseStudy />
          </AnimatedPage>
        }
      />

      {/* --- Project Case Study Route --- */}
      <Route
        path="/project/:id"
        element={
          <AnimatedPage>
            <ProjectCaseStudy />
          </AnimatedPage>
        }
      />

      {/* MERGED: Added Mobile Plan Pages from development */}
      <Route path="/platform-plan" element={<PlatformPlanPage />} />

      <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
    </Routes>
  );
};

// ===================================================================
// MERGED: This MainLayout component now contains logic from BOTH branches
// ===================================================================
const MainLayout = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const location = useLocation();

  // Check if current route is a mobile-only page (no navbar/footer)
  const isMobilePlanPage = location.pathname === "/platform-plan";

  // MERGED: Return logic from development's AppLayout
  if (isMobilePlanPage) {
    // Mobile plan pages: no navbar, no footer, no contact form
    return <AppRoutes />;
  }

  // Regular pages: with navbar and footer
  return (
    <div style={{ backgroundColor: "#080808", minHeight: "100vh" }}>
      <Navbar
        setShowContactForm={setShowContactForm}
      />
      <ContactForm
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
      />
      <AppRoutes />
      <Footer setShowContactForm={setShowContactForm} />
    </div>
  );
};

// ===================================================================
// App component (renders the merged MainLayout)
// ===================================================================
function App() {
  return (
    <HashRouter>
      <MainLayout />
    </HashRouter>
  );
}

export default App;
