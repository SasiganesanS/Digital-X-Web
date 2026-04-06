import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/praskla_logo.jpeg";
import {
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";
import { FaLocationDot, FaPhone, FaArrowRight } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

/* ─── Helper: nav link ─── */
const FooterLink = ({ to, children, onClick }) => (
  <li>
    <Link
      to={to}
      onClick={onClick}
      className="text-white/40 hover:text-white transition-colors duration-200 text-sm"
    >
      {children}
    </Link>
  </li>
);

/* ─── Helper: social icon ─── */
const SocialIcon = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-9 h-9 rounded-full border border-white/8 bg-white/4
               flex items-center justify-center text-white/40
               hover:text-white hover:border-[#E8192C]/50 hover:bg-[#E8192C]/10
               transition-all duration-300 hover:scale-110"
  >
    {children}
  </a>
);

/* ─── Main Footer ─── */
const Footer = () => {
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
    <footer
      id="footer"
      className="relative w-full overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* ── Top separator ── */}
      <div className="w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(232,25,44,0.25), transparent)" }} />

      {/* ── Background accents ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,25,44,0.06) 0%, transparent 65%)", transform: "translate(-30%, 30%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
        
        {/* ── Main Red Box Container ── */}
        <div 
          className="relative rounded-[2.5rem] overflow-hidden border border-[#E8192C]/50 bg-gradient-to-br from-[#111] via-black to-[#E8192C]/10 p-8 md:p-12 lg:p-16 shadow-[0_0_50px_rgba(232,25,44,0.1)] transition-all duration-700 hover:border-[#E8192C] group"
        >
          {/* Internal Glitter/Sparkles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0 pointer-events-none"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                boxShadow: "0 0 10px 2px rgba(232,25,44,0.4)",
                animation: `pulse ${2 + Math.random() * 2}s infinite ${Math.random() * 2}s`
              }}
            />
          ))}

          {/* ── Main grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">

            {/* Col 1 — Brand */}
            <div className="flex flex-col lg:col-span-1">
              {/* Logo / wordmark */}
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2.5 mb-5 group w-fit"
              >
                <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-lg">
                  <img src={Logo} alt="Praskla Digital X" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-black text-white text-base tracking-tight">
                    Praskla Digital <span className="text-[#E8192C]">X</span>
                  </span>
                  <span className="text-white/20 text-[9px] font-medium tracking-[0.15em] uppercase">
                    A Mindful Marketing and Production Firm
                  </span>
                </div>
              </Link>

              <p className="text-white/35 text-sm leading-relaxed mb-6">
                A mindful marketing firm empowering brands through clarity, creativity,
                and performance-driven growth.
              </p>

              {/* Contact */}
              <div className="space-y-2.5 mb-6">
                <a
                  href="tel:+919591310740"
                  className="flex items-center gap-2.5 text-white/35 hover:text-white transition-colors text-sm"
                >
                  <FaPhone size={12} className="text-[#E8192C]/60 flex-shrink-0" />
                  +91 95913 10740
                </a>
                <a
                  href="mailto:info@praskla.com"
                  className="flex items-center gap-2.5 text-white/35 hover:text-white transition-colors text-sm"
                >
                  <MdEmail size={13} className="text-[#E8192C]/60 flex-shrink-0" />
                  info@praskla.com
                </a>
                <div className="flex items-center gap-2.5 text-white/35 text-sm">
                  <FaLocationDot size={12} className="text-[#E8192C]/60 flex-shrink-0" />
                  Tamil Nadu, India
                </div>
              </div>

              {/* Socials */}
              <div className="flex gap-2.5">
                <SocialIcon href="https://www.linkedin.com/company/praskla-technology/" label="LinkedIn">
                  <FaLinkedinIn size={15} />
                </SocialIcon>
                <SocialIcon href="https://www.instagram.com/praskla_technology/" label="Instagram">
                  <FaInstagram size={15} />
                </SocialIcon>
                <SocialIcon href="https://wa.me/919591310740" label="WhatsApp">
                  <FaWhatsapp size={15} />
                </SocialIcon>
                <SocialIcon href="https://facebook.com/praskla" label="Facebook">
                  <FaFacebookF size={15} />
                </SocialIcon>
                <SocialIcon href="https://twitter.com/praskla" label="X (Twitter)">
                  <FaXTwitter size={15} />
                </SocialIcon>
              </div>
            </div>

            {/* Col 2 — Quick links */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wide mb-5 uppercase">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <FooterLink to="/">Home</FooterLink>
                <FooterLink to="/about">About Us</FooterLink>
                <FooterLink to="/services">Services</FooterLink>
                <FooterLink to="/projects">Projects</FooterLink>
                <FooterLink to="/careers">Careers</FooterLink>
              </ul>
            </div>

            {/* Col 3 — Services */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wide mb-5 uppercase">
                Services
              </h4>
              <ul className="space-y-3">
                <FooterLink to="/services">Content Creation</FooterLink>
                <FooterLink to="/services">Social Media Management</FooterLink>
                <FooterLink to="/services">Paid Advertising</FooterLink>
                <FooterLink to="/services">SEO Optimization</FooterLink>
                <FooterLink to="/services">Sales Strategy</FooterLink>
              </ul>
            </div>

            {/* Col 4 — Newsletter */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wide mb-2 uppercase">
                Stay in the loop
              </h4>
              <p className="text-white/35 text-sm mb-5 leading-relaxed">
                Get the latest updates on digital marketing trends and case studies.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div
                  className="flex items-center gap-2 rounded-full border border-white/8 px-4 py-2.5"
                  style={{ background: "#111" }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 bg-transparent text-white text-sm placeholder:text-white/20 outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="Subscribe"
                    className="w-7 h-7 rounded-full bg-[#E8192C] flex items-center justify-center flex-shrink-0
                               hover:bg-[#ff2235] hover:scale-110 transition-all duration-300
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaArrowRight size={12} className="text-white" />
                  </button>
                </div>
                {message && (
                  <p className="text-[#E8192C] text-xs ml-1">{message}</p>
                )}
              </form>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/20 text-xs text-center sm:text-left">
              © 2020–{new Date().getFullYear()} Praskla Digital X. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link to="/terms" className="text-white/20 hover:text-white transition-colors text-xs">
                Terms of Use
              </Link>
              <span className="text-white/10">|</span>
              <Link to="/privacy" className="text-white/20 hover:text-white transition-colors text-xs">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
