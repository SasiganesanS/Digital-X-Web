import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/Praskla_Digital_X_Logo_Trasnparent_Background.png";
import {
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaFacebookF,
} from "react-icons/fa6";
import {
  FiSearch,
  FiTrendingUp,
  FiCode,
  FiLayers,
  FiVideo,
  FiFileText,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/careers", label: "Careers" },
];

const SERVICES_LIST = [
  { name: "SEO", icon: FiSearch },
  { name: "Performance Marketing", icon: FiTrendingUp },
  { name: "Website Design", icon: FiCode },
  { name: "Brand Identity", icon: FiLayers },
  { name: "Video Production", icon: FiVideo },
  { name: "Content Marketing", icon: FiFileText },
];

const Footer = ({ setShowContactForm }) => {
  return (
    <footer id="contact" className="relative w-full py-10 sm:py-12 z-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="relative w-full bg-[#0B0B0B] bg-gradient-to-b from-[#171717] via-[#121212] to-[#0B0B0B] rounded-[32px] border border-white/[0.06] shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden p-8 sm:p-12 lg:p-16 text-white dark-surface">
          {/* TOP CTA: Two-Column Agency Composition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center pt-2 sm:pt-4 pb-10 sm:pb-12 border-b border-white/[0.06]"
          >
            {/* LEFT COLUMN (60% / 7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Small badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FF2B2B]/40 bg-[#FF2B2B]/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#FF2B2B] animate-pulse" />
                <span className="font-bold text-[11px] sm:text-xs uppercase tracking-widest text-white">
                  LET'S BUILD SOMETHING AMAZING
                </span>
              </div>

              {/* Large heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FFFFFF] leading-[1.15] tracking-tight">
                Ready to Grow Your Brand?
              </h2>

              {/* Short paragraph */}
              <p className="text-[#B5B5B5] text-sm sm:text-base leading-relaxed font-medium max-w-xl">
                We help ambitious businesses build memorable digital experiences through strategy, creativity and technology.
              </p>
            </div>

            {/* RIGHT COLUMN (40% / 5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center space-y-6">
              {/* Vertically stacked buttons */}
              <div className="flex flex-col gap-3.5 w-full sm:w-[280px]">
                <motion.button
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  onClick={() => setShowContactForm && setShowContactForm(true)}
                  className="w-full px-7 py-4 rounded-[18px] font-bold text-sm bg-[#FF2B2B] !text-white hover:bg-[#E51D1D] transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_10px_24px_rgba(255,43,43,0.22)] hover:-translate-y-1 group"
                  style={{ color: "#FFFFFF", opacity: 1 }}
                >
                  <span className="!text-white text-white font-bold" style={{ color: "#FFFFFF", opacity: 1 }}>Start Your Project</span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform !text-white" style={{ color: "#FFFFFF" }} />
                </motion.button>

                <a
                  href="https://wa.me/919566880740"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-7 py-4 rounded-[18px] font-bold text-sm border border-white/20 !text-white bg-[#1F1F1F] hover:bg-[#2A2A2A] hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1 shadow-sm text-center"
                  style={{ color: "#FFFFFF", opacity: 1 }}
                >
                  <span className="!text-white text-white font-bold" style={{ color: "#FFFFFF", opacity: 1 }}>
                    Book a Free Consultation
                  </span>
                </a>
              </div>

              {/* Direct contact info below buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-semibold text-[#B5B5B5] pt-1">
                <a
                  href="mailto:hello@praskla.com"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                >
                  <FiMail className="w-3.5 h-3.5 text-[#E31D2E]" />
                  <span>hello@praskla.com</span>
                </a>
                <span className="hidden sm:inline text-white/30">•</span>
                <a
                  href="tel:+919566880740"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                >
                  <FiPhone className="w-3.5 h-3.5 text-[#E31D2E]" />
                  <span>+91 95668 80740</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* MAIN FOOTER: 4 Columns */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
            className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-12 lg:py-16 items-start"
          >
            {/* COLUMN 1: Logo & Description */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="space-y-4"
            >
              <Link to="/" className="flex items-center gap-[18px] group w-fit">
                <div
                  className="w-[52px] h-[52px] rounded-[14px] bg-[#FFFFFF] p-[8px] flex items-center justify-center border border-black/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.18)] shrink-0 transition-all duration-300 group-hover:scale-[1.06] group-hover:-translate-y-1 group-hover:shadow-[0_12px_25px_rgba(0,0,0,0.25)]"
                >
                  <img
                    src={Logo}
                    alt="Praskla Digital X"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-signature text-[26px] sm:text-[30px] font-normal text-white leading-none tracking-normal antialiased">
                    Praskla Digital <span className="text-[#FF2B2B]">X</span>
                  </span>
                  <span className="font-space-grotesk text-xs font-medium text-[#9CA3AF] tracking-[0.08em] leading-[1.4] mt-0.5">
                    Where Strategy Meets Creativity
                  </span>
                </div>
              </Link>
              <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed font-medium">
                Helping ambitious brands grow through strategy, design, technology, and marketing.
              </p>

              {setShowContactForm && (
                <button
                  onClick={() => setShowContactForm(true)}
                  className="mt-2 px-6 py-3 rounded-[18px] bg-[#E31D2E] text-white text-xs font-bold hover:bg-[#ff2d3f] transition-all duration-300 hover:-translate-y-1 shadow-md shadow-[#E31D2E]/25"
                >
                  Get In Touch
                </button>
              )}
            </motion.div>

            {/* COLUMN 2: Navigation */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="space-y-4"
            >
              <h4 className="text-white font-bold text-xs tracking-[0.2em] uppercase">Navigation</h4>
              <ul className="flex flex-col gap-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="group relative inline-flex items-center text-xs sm:text-sm font-semibold text-[#9CA3AF] hover:text-white transition-all duration-200 hover:translate-x-1"
                    >
                      <span>{link.label}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E31D2E] group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* COLUMN 3: Services */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="space-y-4"
            >
              <h4 className="text-white font-bold text-xs tracking-[0.2em] uppercase">Services</h4>
              <ul className="flex flex-col gap-3">
                {SERVICES_LIST.map((service) => {
                  const Icon = service.icon;
                  return (
                    <li key={service.name}>
                      <Link
                        to="/services"
                        className="group inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#9CA3AF] hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                      >
                        <div className="w-6 h-6 rounded-md bg-[#141414] border border-white/[0.06] flex items-center justify-center text-[#E31D2E] group-hover:bg-[#E31D2E] group-hover:text-white transition-all duration-300 shrink-0">
                          <Icon className="w-3 h-3" />
                        </div>
                        <span className="group-hover:translate-x-1 transition-transform">{service.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            {/* COLUMN 4: Contact & Socials */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="space-y-4"
            >
              <h4 className="text-white font-bold text-xs tracking-[0.2em] uppercase">Contact</h4>
              <div className="flex flex-col gap-3 text-xs sm:text-sm font-semibold text-[#9CA3AF]">
                <a href="mailto:hello@praskla.com" className="flex items-center gap-3 hover:text-white transition-colors group p-2 rounded-xl bg-[#141414]/50 border border-white/[0.04] hover:border-white/[0.12]">
                  <div className="w-7 h-7 rounded-full bg-[#E31D2E]/10 flex items-center justify-center text-[#E31D2E] shrink-0 group-hover:bg-[#E31D2E] group-hover:text-white transition-colors">
                    <FiMail size={13} />
                  </div>
                  <span className="truncate">hello@praskla.com</span>
                </a>
                <a href="tel:+919566880740" className="flex items-center gap-3 hover:text-white transition-colors group p-2 rounded-xl bg-[#141414]/50 border border-white/[0.04] hover:border-white/[0.12]">
                  <div className="w-7 h-7 rounded-full bg-[#E31D2E]/10 flex items-center justify-center text-[#E31D2E] shrink-0 group-hover:bg-[#E31D2E] group-hover:text-white transition-colors">
                    <FiPhone size={13} />
                  </div>
                  <span>+91 95668 80740</span>
                </a>
                <div className="flex items-center gap-3 text-[#9CA3AF] p-2">
                  <div className="w-7 h-7 rounded-full bg-[#E31D2E]/10 flex items-center justify-center text-[#E31D2E] shrink-0">
                    <FiMapPin size={13} />
                  </div>
                  <span>Coimbatore, Tamil Nadu, India</span>
                </div>
              </div>

              {/* Circular Social Buttons */}
              <div className="flex items-center gap-3 pt-2">
                {[
                  { href: "https://www.instagram.com/py.digitalx/", icon: FaInstagram, label: "Instagram" },
                  { href: "https://www.linkedin.com/company/praskla", icon: FaLinkedinIn, label: "LinkedIn" },
                  { href: "https://wa.me/919566880740", icon: FaWhatsapp, label: "WhatsApp" },
                  { href: "https://facebook.com/praskla", icon: FaFacebookF, label: "Facebook" },
                ].map((social) => {
                  const SocialIcon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="social-icon-link w-10 h-10 rounded-full border border-white/[0.08] bg-[#141414] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:border-[#FF2B2B] hover:bg-[#FF2B2B]/20 hover:-translate-y-1 hover:scale-105 hover:rotate-6 hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-300 relative overflow-hidden"
                    >
                      <SocialIcon size={15} />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* BOTTOM BAR */}
          <div className="relative z-10 border-t border-white/[0.06] pt-8 pb-2">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-xs font-semibold text-[#9CA3AF]">
              <p>© {new Date().getFullYear()} Praskla Digital X. All rights reserved.</p>
              <a
                href="https://www.prasklatechnology.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative hover:text-white transition-colors"
              >
                <span>Crafted with ❤️ by Praskla Technology</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E31D2E] group-hover:w-full transition-all duration-300" />
              </a>
              <div className="flex items-center gap-3">
                <Link to="/privacy-policy" className="group relative hover:text-white transition-colors">
                  <span>Privacy Policy</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E31D2E] group-hover:w-full transition-all duration-300" />
                </Link>
                <span className="text-white/20">•</span>
                <Link to="/terms-and-conditions" className="group relative hover:text-white transition-colors">
                  <span>Terms & Conditions</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E31D2E] group-hover:w-full transition-all duration-300" />
                </Link>
                <span className="text-white/20">•</span>
                <Link to="/cookie-policy" className="group relative hover:text-white transition-colors">
                  <span>Cookie Policy</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E31D2E] group-hover:w-full transition-all duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;