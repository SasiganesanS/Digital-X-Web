import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/py.jpg";
import {
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";
import { FaLocationDot, FaPhone, FaArrowRight } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // Simulate newsletter signup (replace with actual API call)
    setTimeout(() => {
      setMessage("Thank you for subscribing!");
      setEmail("");
      setIsSubmitting(false);
      setTimeout(() => setMessage(""), 3000);
    }, 1000);
  };

  return (
    <footer
      id="footer"
      className="bg-transparent text-white relative py-8 px-4 md:px-6 lg:px-8 dark-section"
    >
      <div className="max-w-[1400px] mx-auto bg-[#301045] rounded-3xl shadow-2xl px-8 md:px-12 lg:px-16 py-12 md:py-16 relative z-10 dark-section overflow-hidden">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 dark-section">
          {/* Column 1: Brand & Description */}
          <div className="flex flex-col">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center mb-4"
            >
              <img
                src={logo}
                alt="Praskla Logo"
                className="h-12 w-12 rounded-lg object-cover"
              />
              <div className="ml-3">
                <h3 className="text-xl md:text-[22px] lg:text-2xl font-bold text-white">
                  Praskla
                </h3>
              </div>
            </Link>
            <p className="text-white/90 text-sm md:text-[15px] lg:text-base leading-relaxed mb-6">
              Innovative Solutions Connecting Brands and Customers. We provide
              full-service IT consulting, digital marketing, and software
              development. Our objective is to use automation and rich media to
              close the gap that exists between brands and consumers.
            </p>

            {/* Contact Info */}
            <div className="space-y-2.5">
              <a
                href="tel:+919591310740"
                className="flex items-center gap-2.5 text-white/90 hover:text-white transition-colors"
              >
                <FaPhone size={14} />
                <span className="text-sm md:text-[15px] lg:text-base">
                  +91 95913 10740
                </span>
              </a>
              <a
                href="mailto:info@praskla.com"
                className="flex items-center gap-2.5 text-white/90 hover:text-white transition-colors"
              >
                <MdEmail size={15} />
                <span className="text-sm md:text-[15px] lg:text-base">
                  info@praskla.com
                </span>
              </a>
              <div className="flex items-center gap-2.5 text-white/90">
                <FaLocationDot size={14} />
                <span className="text-sm md:text-[15px] lg:text-base">
                  Tamil Nadu, India
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: For Clients */}
          <div className="flex flex-col">
            <h4 className="font-semibold text-white text-xl md:text-[22px] lg:text-2xl mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/services">Our Services</FooterLink>
              <FooterLink to="/projects">Case Studies</FooterLink>
              <FooterLink to="/clients">Clients & Partners</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink
                to="#footer"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("footer")
                    .scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact Us
              </FooterLink>
            </ul>
          </div>

          {/* Column 3: For Talent */}
          <div className="flex flex-col">
            <h4 className="font-semibold text-white text-xl md:text-[22px] lg:text-2xl mb-5">
              Services
            </h4>
            <ul className="space-y-2.5">
              <FooterLink to="/business-website-pricing">
                Web Development
              </FooterLink>
              <FooterLink to="/mobile-application-pricing">
                Mobile App Development
              </FooterLink>
              <FooterLink to="/software-development-pricing">
                Software Development
              </FooterLink>
              <FooterLink to="/digital-marketing-pricing">
                Digital Marketing
              </FooterLink>
              <FooterLink to="/cybersecurity-pricing">Cybersecurity</FooterLink>
              <FooterLink to="/ecommerce-website-pricing">
                E-commerce Solutions
              </FooterLink>
              <FooterLink to="/sustainability-pricing">
                Sustainability Tech
              </FooterLink>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="flex flex-col">
            <h4 className="font-semibold text-white text-xl md:text-[22px] lg:text-2xl mb-5">
              Solutions
            </h4>
            <ul className="space-y-2.5">
              <FooterLink to="/ecommerce-marketing-combo">
                E-commerce & Marketing
              </FooterLink>
              <FooterLink to="/software-marketing-combo">
                Software & Marketing
              </FooterLink>
              <FooterLink to="/mobile-marketing-combo">
                Mobile & Marketing
              </FooterLink>
              <FooterLink to="/website-seo-combo">Website & SEO</FooterLink>
              <FooterLink to="/software-support-combo">
                Software Support
              </FooterLink>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="font-medium text-white text-sm md:text-[15px] lg:text-base mb-3">
                Follow Us
              </h5>
              <div className="flex gap-3">
                <SocialIcon
                  href="https://www.linkedin.com/company/praskla-technology/"
                  label="LinkedIn"
                >
                  <FaLinkedinIn size={18} />
                </SocialIcon>
                <SocialIcon
                  href="https://www.instagram.com/praskla_technology/"
                  label="Instagram"
                >
                  <FaInstagram size={18} />
                </SocialIcon>
                <SocialIcon href="https://wa.me/919591310740" label="WhatsApp">
                  <FaWhatsapp size={18} />
                </SocialIcon>
                <SocialIcon
                  href="https://facebook.com/praskla"
                  label="Facebook"
                >
                  <FaFacebookF size={18} />
                </SocialIcon>
                <SocialIcon
                  href="https://twitter.com/praskla"
                  label="X (Twitter)"
                >
                  <FaXTwitter size={18} />
                </SocialIcon>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mb-12 pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            {/* Newsletter Info */}
            <div className="flex-1">
              <h3 className="text-white font-semibold text-2xl md:text-[28px] lg:text-[32px] mb-2">
                Stay in the loop
              </h3>
              <p className="text-white/90 text-sm md:text-[15px] lg:text-base">
                Stay updated with the latest from Praskla.
              </p>
            </div>

            {/* Newsletter Form */}
            <div className="flex-1 lg:max-w-md">
              <form onSubmit={handleNewsletterSubmit} className="relative">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-5 py-3 rounded-full bg-white text-gray-800 text-sm md:text-[15px] lg:text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#371445]"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-12 h-12 rounded-full bg-[#371445] hover:bg-[#371445]/90 flex items-center justify-center text-white transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ boxShadow: "0 6px 20px rgba(45, 27, 78, 0.3)" }}
                    aria-label="Subscribe to newsletter"
                  >
                    <FaArrowRight size={18} />
                  </button>
                </div>
                {message && (
                  <p className="text-white text-xs mt-2 ml-1">{message}</p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-white/70 text-sm md:text-[15px] lg:text-base text-center md:text-left">
              © 2020-{new Date().getFullYear()} Praskla Technology. All rights
              reserved.
            </p>

            {/* Legal Links & Social */}
            <div className="flex items-center gap-6">
              <Link
                to="/terms"
                className="text-white/70 hover:text-white transition-colors text-sm md:text-[15px] lg:text-base"
              >
                Terms of Use
              </Link>
              <span className="text-white/30">|</span>
              <Link
                to="/privacy"
                className="text-white/70 hover:text-white transition-colors text-sm md:text-[15px] lg:text-base"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper component for clean footer links
const FooterLink = ({ to, children, onClick }) => (
  <li>
    <Link
      to={to}
      onClick={onClick}
      className="text-white/90 hover:text-white transition-colors duration-200 text-sm md:text-[15px] lg:text-base"
    >
      {children}
    </Link>
  </li>
);

// Helper component for social icons
const SocialIcon = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 hover:scale-110"
    aria-label={label}
  >
    {children}
  </a>
);

export default Footer;
