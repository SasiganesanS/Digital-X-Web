import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Praskla_Digital_X_Logo_Trasnparent_Background.png";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
  FaPhone,
  FaArrowRight,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/careers", label: "Careers" },
];

const SERVICES_ALL = [
  "SEO", "SSM", "ADS", "Website design", "Video Production", 
  "Content marketing", "E-commerce marketing", "Email marketing", 
  "Influencer marketing", "Performance Marketing", "ORM", "Analytics and reporting"
];

const Footer = ({ setShowContactForm }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setTimeout(() => {
      setMessage("Thanks for subscribing! 🎉");
      setEmail("");
      setIsSubmitting(false);
      setTimeout(() => setMessage(""), 3000);
    }, 1000);
  };

  return (
    <footer className="relative w-[92%] sm:w-[90%] md:w-[88%] max-w-[1280px] mx-auto my-16 z-10 dark-surface rounded-[2rem] border border-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.3)] overflow-hidden">
      {/* Soft overlay gradient in the footer block */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1b1b1b] via-[#151515] to-[#121212] pointer-events-none" />
      
      {/* 5-Column Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 p-8 sm:p-12 lg:p-16">
        
        {/* Column 1: Brand & Logo */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={Logo} alt="Praskla Digital X" className="w-10 h-10 object-cover" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-wide text-white">
                Praskla Digital <span className="text-[#E31D2E]">X</span>
              </span>
              <span className="text-[8px] text-white/50 tracking-wider font-light">
                A Mindful Marketing and Production Firm
              </span>
            </div>
          </Link>
          <p className="text-xs text-white/60 leading-relaxed mt-2">
            Elevating personal and corporate brands into powerful digital movements through strategic design and conversion-focused media campaigns.
          </p>
          {setShowContactForm && (
            <button
              onClick={() => setShowContactForm(true)}
              className="mt-2 w-fit px-4 py-2 bg-[#E31D2E] hover:bg-white hover:text-black text-white text-xs font-semibold rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(227,29,46,0.2)]"
            >
              Get in Touch
            </button>
          )}
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-xs tracking-[0.2em] uppercase">Quick Links</h4>
          <ul className="flex flex-col gap-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-white/60 hover:text-white transition-colors text-xs">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Services */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-xs tracking-[0.2em] uppercase">Services</h4>
          <ul className="grid grid-cols-1 gap-2.5">
            {SERVICES_ALL.slice(0, 6).map((s) => (
              <li key={s}>
                <Link to="/services" className="text-white/60 hover:text-white transition-colors text-xs">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Stay in the Loop (Newsletter) */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <h4 className="text-white font-bold text-xs tracking-[0.2em] uppercase">Stay in the Loop</h4>
          <p className="text-white/50 text-xs leading-relaxed">
            Get the latest marketing insights and case studies delivered directly to your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 bg-[#111111]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 min-w-0 bg-transparent text-white text-xs placeholder:text-white/20 outline-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                aria-label="Subscribe"
                className="w-6 h-6 rounded-full bg-[#E31D2E] flex items-center justify-center flex-shrink-0 hover:bg-[#ff3b4d] hover:scale-110 transition-all duration-300 disabled:opacity-50"
              >
                <FaArrowRight size={10} className="text-white" />
              </button>
            </div>
            {message && <p className="text-[#E31D2E] text-[10px]">{message}</p>}
          </form>
        </div>

        {/* Column 5: Contact & Socials */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-xs tracking-[0.2em] uppercase">Connect With Us</h4>
          <div className="flex flex-col gap-2 text-xs text-white/70">
            <a href="mailto:hello@praskla.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <MdEmail size={14} className="text-[#E31D2E]" />
              hello@praskla.com
            </a>
            <a href="tel:+919566880740" className="flex items-center gap-2 hover:text-white transition-colors">
              <FaPhone size={12} className="text-[#E31D2E]" />
              +91 95668 80740
            </a>
          </div>
          <div className="flex gap-3 mt-1">
            <a
              href="https://www.instagram.com/py.digitalx/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:border-[#E31D2E] hover:bg-[#E31D2E]/20 transition-all duration-300 hover:scale-110"
            >
              <FaInstagram size={14} />
            </a>
            <a
              href="https://wa.me/9566880740"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:border-[#E31D2E] hover:bg-[#E31D2E]/20 transition-all duration-300 hover:scale-110"
            >
              <FaWhatsapp size={14} />
            </a>
            <a
              href="https://facebook.com/praskla"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:border-[#E31D2E] hover:bg-[#E31D2E]/20 transition-all duration-300 hover:scale-110"
            >
              <FaFacebookF size={14} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Legal Bar */}
      <div className="relative z-10 border-t border-white/10 px-8 sm:px-12 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-xs text-white/40">
          <p>© {new Date().getFullYear()} Praskla Digital X. All rights reserved.</p>
          <a
            href="https://www.prasklatechnology.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/70 transition-colors"
          >
            A Division of Praskla Technology
          </a>
          <div className="flex gap-4">
            <Link to="/terms" className="hover:text-white/70 transition-colors">Terms of Use</Link>
            <span>|</span>
            <Link to="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;