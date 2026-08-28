import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/Praskla_Digital_X_Logo_Trasnparent_Background.webp";
import BrandX from "./common/BrandX";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";

const Footer = ({ setShowContactForm }) => {
  return (
    <footer id="contact" className="relative w-full bg-[#0B0B0B] bg-gradient-to-b from-[#161616] via-[#111111] to-[#0A0A0A] border-t border-white/[0.08] text-white py-10 sm:py-12 lg:py-14 z-10 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        
        {/* TOP CTA BAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pb-8 border-b border-white/[0.08]"
        >
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight font-sans">
              Ready to Grow Your Brand?
            </h2>

            <p className="text-[#B5B5B5] text-xs sm:text-sm leading-relaxed font-medium max-w-xl font-sans">
              We help ambitious businesses build memorable digital experiences through strategy, creativity and technology.
            </p>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3">
            {/* Primary Red Button */}
            <motion.button
              onClick={() => setShowContactForm && setShowContactForm(true)}
              className="w-full sm:w-auto lg:w-[240px] px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-[#FF2B2B] !text-white hover:bg-[#E51D1D] transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 group cursor-pointer"
              style={{ color: "#FFFFFF", opacity: 1 }}
            >
              <span className="!text-white text-white font-bold" style={{ color: "#FFFFFF" }}>Start Your Project</span>
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform !text-white" style={{ color: "#FFFFFF" }} />
            </motion.button>

            {/* Secondary Dark Button */}
            <a
              href="https://wa.me/919566880740?text=Hi%20Praskla%20Digital%20X%2C%20I%27m%20interested%20in%20your%20expertise%20and%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto lg:w-[240px] px-6 py-3 rounded-xl font-bold text-xs sm:text-sm border border-white/20 !text-white bg-[#1F1F1F] hover:bg-[#2A2A2A] hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm text-center cursor-pointer"
              style={{ color: "#FFFFFF", opacity: 1 }}
            >
              <span className="!text-white text-white font-bold" style={{ color: "#FFFFFF" }}>
                Book a Consultation
              </span>
            </a>
          </div>
        </motion.div>

        {/* MAIN FOOTER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 py-8 lg:py-10 items-center"
        >
          {/* LEFT COLUMN: Logo, Tagline, Description */}
          <div className="md:col-span-7 space-y-3">
            <Link to="/" className="flex items-center gap-3 sm:gap-3.5 group w-fit select-none">
              {/* Logo Emblem */}
              <div className="w-[48px] h-[48px] sm:w-[54px] sm:h-[54px] lg:w-[60px] lg:h-[60px] rounded-[14px] bg-white p-1.5 flex items-center justify-center border border-white/20 shadow-md shrink-0 transition-all duration-300 group-hover:scale-105">
                <img
                  src={Logo}
                  alt="PRASKLA DIGITAL X Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* 2-line Text Column */}
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-1 sm:gap-1.5 leading-none">
                  <span className="font-inlander text-[17px] sm:text-[20px] lg:text-[22px] font-black text-white leading-none tracking-[0.01em] uppercase whitespace-nowrap">
                    PRASKLA DIGITAL
                  </span>
                  <BrandX className="text-[38px] sm:text-[46px] lg:text-[52px] leading-none shrink-0 text-[#FF2B2B] -mt-1.5 sm:-mt-2 -ml-1 sm:-ml-1.5 drop-shadow-[0_1px_4px_rgba(255,43,43,0.35)]" />
                </div>
                <span className="font-dingos text-[9px] sm:text-[10px] lg:text-[11px] font-bold text-[#FF2B2B] block tracking-tight leading-none whitespace-nowrap mt-1">
                  A Mindful Marketing and Production Firm
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed font-medium max-w-lg font-sans">
              Helping ambitious brands grow through strategy, design, technology, and marketing.
            </p>
          </div>

          {/* RIGHT COLUMN: Contact Details & Social Buttons */}
          <div className="md:col-span-5 flex flex-col items-start md:items-end justify-center space-y-4">
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-semibold text-[#9CA3AF] max-w-sm w-full sm:w-auto font-sans">
              <a
                href="mailto:marketing@prasklatechnology.com"
                className="flex items-center gap-2.5 hover:text-white transition-colors group text-left min-w-0"
              >
                <FiMail className="w-4 h-4 text-[#FF2B2B] shrink-0" />
                <span className="break-all sm:break-normal">marketing@prasklatechnology.com</span>
              </a>
              <a
                href="tel:+919566880740"
                className="flex items-center gap-2.5 hover:text-white transition-colors group text-left"
              >
                <FiPhone className="w-4 h-4 text-[#FF2B2B] shrink-0" />
                <span>+91 95668 80740</span>
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=KSRCE%2C+KSR+College+Campus%2C+Tiruchengode%2C+Namakkal+-+637215"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-[#9CA3AF] hover:text-white transition-colors group text-left cursor-pointer"
              >
                <FiMapPin className="w-4 h-4 text-[#FF2B2B] shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                <span className="leading-snug">
                  3rd Floor, A Block, KSRCE, KSR College Campus,<br className="hidden sm:inline" />
                  Tiruchengode, Namakkal - 637215
                </span>
              </a>
            </div>

            {/* Circular Social Buttons */}
            <div className="flex items-center gap-2 pt-1">
              {[
                { href: "https://www.facebook.com/profile.php?id=61572150718570", icon: FaFacebookF, label: "Facebook" },
                { href: "https://www.instagram.com/praskla_digital_x/", icon: FaInstagram, label: "Instagram" },
                { href: "https://x.com/praskladigitalx", icon: FaXTwitter, label: "X" },
                { href: "https://www.youtube.com/channel/UCE0yRo7bylROw5l5wSoXRTw", icon: FaYoutube, label: "YouTube" },
                { href: "https://www.linkedin.com/in/praskla-digital-x-a39a73429/", icon: FaLinkedinIn, label: "LinkedIn" },
                { href: "https://wa.me/919566880740?text=Hi%20Praskla%20Digital%20X%2C%20I%27m%20interested%20in%20your%20expertise%20and%20would%20like%20to%20discuss%20a%20project.", icon: FaWhatsapp, label: "WhatsApp" },
              ].map((social) => {
                const SocialIcon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-8 h-8 rounded-full border border-white/[0.1] bg-[#161616] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:border-white/40 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <SocialIcon size={13} />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* BOTTOM LEGAL BAR */}
        <div className="relative z-10 border-t border-white/[0.08] pt-5 pb-1">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left text-xs font-semibold text-[#9CA3AF] font-sans">
            <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 justify-center md:justify-start">
                © {new Date().getFullYear()} <span className="font-inlander font-bold">PRASKLA DIGITAL</span> <BrandX className="text-[18px] sm:text-[20px] font-pdx inline-block text-[#FF2B2B] translate-y-[1px] ml-0.5" />
              </span>
              <span className="text-[#9CA3AF] text-[11px] mt-0.5">
                All rights reserved.
              </span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;