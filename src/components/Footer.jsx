import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationFrame,
} from "framer-motion";
import Logo from "../assets/Praskla_Digital_X_Logo_Trasnparent_Background.png";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
  FaLocationDot,
  FaPhone,
  FaArrowRight,
  FaPaperPlane,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

/* ============================================================
   DATA — all original footer content lives here, untouched
   ============================================================ */
const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/careers", label: "Careers" },
];

const SERVICES_A = ["SEO", "SSM", "ADS", "Website design", "Video Production", "Content marketing"];
const SERVICES_B = ["E-commerce marketing", "Email marketing", "Influencer marketing", "Performance Marketing", "ORM", "Analytics and reporting"];

const SOCIAL_VARIANTS = {
  instagram: "hover:border-transparent hover:text-white hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5]",
  whatsapp: "hover:border-[#25D366] hover:text-white hover:bg-[#25D366]",
  facebook: "hover:border-[#1877F2] hover:text-white hover:bg-[#1877F2]",
};

// 5 sections, evenly spaced 72° apart around the circle, starting at the top
const ORBIT_ORDER = ["contact", "services", "social", "newsletter", "quickLinks"];
const ORBIT_ANGLES = {
  contact: -90,
  services: -18,
  social: 54,
  newsletter: 126,
  quickLinks: 198,
};

/* ============================================================
   Deterministic pseudo-random field generator — same output
   every render (no layout jitter) used for stars / dust /
   accretion particle placement.
   ============================================================ */
function useRandomField(count, seed = 0) {
  return useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const rand = (n) => {
          const x = Math.sin((i + seed) * 999.13 + n * 37.77) * 10000;
          return x - Math.floor(x);
        };
        return {
          id: i,
          top: rand(1) * 100,
          left: rand(2) * 100,
          size: 0.6 + rand(3) * 1.8,
          duration: 2 + rand(4) * 4,
          delay: rand(5) * 5,
        };
      }),
    [count, seed]
  );
}

/* ============================================================
   SocialIcon
   ============================================================ */
const SocialIcon = ({ href, label, children, variant }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`w-9 h-9 rounded-full border border-white/10 bg-white/5
               flex items-center justify-center text-white/50
               transition-all duration-300 hover:scale-110
               ${SOCIAL_VARIANTS[variant] || "hover:text-white hover:border-[#E8192C]/50 hover:bg-[#E8192C]/10"}`}
  >
    {children}
  </a>
);

/* ============================================================
   Starfield
   ============================================================ */
function Starfield() {
  const stars = useRandomField(140, 1);
  const dust = useRandomField(30, 2);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0, scale: 1.18 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 2.2, ease: "easeOut" }}
    >
      <div
        className="absolute left-1/2 top-1/2 rounded-full opacity-[0.06] animate-[spin_140s_linear_infinite]"
        style={{
          width: 1400,
          height: 1400,
          marginLeft: -700,
          marginTop: -700,
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(232,25,44,0.5) 60deg, transparent 140deg, rgba(147,51,234,0.4) 220deg, transparent 320deg)",
        }}
      />

      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {dust.map((d) => (
        <span
          key={`dust-${d.id}`}
          className="absolute rounded-full bg-[#E8192C]"
          style={{
            top: `${d.top}%`,
            left: `${d.left}%`,
            width: d.size * 1.8,
            height: d.size * 1.8,
            opacity: 0.25,
            filter: "blur(1px)",
            animation: `drift ${6 + d.duration}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}

      {[0, 1, 2].map((i) => (
        <span
          key={`shoot-${i}`}
          className="absolute h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            top: `${8 + i * 30}%`,
            left: "-10%",
            transform: "rotate(18deg)",
            animation: `shoot ${6 + i * 2}s linear ${i * 3.5 + 1}s infinite`,
          }}
        />
      ))}
    </motion.div>
  );
}

/* ============================================================
   BlackHoleCore — click/tap it to launch the paper airplane
   ============================================================ */
function BlackHoleCore({ size, hovered, onHoverStart, onHoverEnd, onLaunch }) {
  const particles = useRandomField(12, 3);

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer select-none"
      style={{ width: size, height: size }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onLaunch}
      role="button"
      aria-label="Activate the core"
    >
      <div
        className="absolute rounded-full pointer-events-none transition-opacity duration-700"
        style={{
          width: size * 2.3,
          height: size * 2.3,
          background:
            "radial-gradient(circle, rgba(232,25,44,0.20) 0%, rgba(147,51,234,0.12) 42%, transparent 70%)",
          filter: "blur(34px)",
          opacity: hovered ? 1 : 0.65,
        }}
      />

      <svg
        className="absolute animate-[spin_16s_linear_infinite]"
        style={{ width: size * 1.5, height: size * 1.5 }}
        viewBox="0 0 200 200"
      >
        <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(232,25,44,0.35)" strokeWidth="1" strokeDasharray="6 10" />
      </svg>
      <svg
        className="absolute [animation:spin_24s_linear_infinite_reverse]"
        style={{ width: size * 1.75, height: size * 1.75 }}
        viewBox="0 0 200 200"
      >
        <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(168,85,247,0.28)" strokeWidth="1" strokeDasharray="2 14" />
      </svg>

      {particles.map((p) => {
        const angle = (p.left / 100) * Math.PI * 2;
        const r = size * 0.72;
        const sx = Math.cos(angle) * r;
        const sy = Math.sin(angle) * r;
        return (
          <span
            key={p.id}
            className="absolute rounded-full bg-[#E8192C]"
            style={{
              width: 3,
              height: 3,
              top: "50%",
              left: "50%",
              "--sx": `${sx}px`,
              "--sy": `${sy}px`,
              animation: `accretion ${3 + p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        );
      })}

      <motion.div
        className="relative rounded-full"
        style={{
          width: size * 0.52,
          height: size * 0.52,
          background: "radial-gradient(circle at 35% 32%, #200010 0%, #000000 55%, #1a0018 100%)",
          boxShadow: hovered
            ? "0 0 80px 20px rgba(232,25,44,0.55), 0 0 160px 55px rgba(147,51,234,0.28)"
            : "0 0 46px 10px rgba(232,25,44,0.35), 0 0 100px 32px rgba(147,51,234,0.15)",
        }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileTap={{ scale: 0.92 }}
      />
    </div>
  );
}

/* ============================================================
   PaperAirplane — flies from the core to a randomly chosen
   card in an arc, then fades. `onArrive` fires the impact pulse.
   ============================================================ */
function PaperAirplane({ tx, ty, onArrive }) {
  const angleDeg = (Math.atan2(ty, tx) * 180) / Math.PI;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 z-30 text-[#E8192C] drop-shadow-[0_0_10px_rgba(232,25,44,0.8)]"
      style={{ marginLeft: -11, marginTop: -11 }}
      initial={{ x: 0, y: 0, opacity: 0, scale: 0.4, rotate: angleDeg + 45 }}
      animate={{
        x: [0, tx * 0.55, tx],
        y: [0, ty * 0.55 - 70, ty],
        opacity: [0, 1, 1, 0],
        scale: [0.4, 1.05, 1, 0.4],
        rotate: [angleDeg + 45, angleDeg + 45, angleDeg + 80],
      }}
      transition={{ duration: 1.15, times: [0, 0.5, 0.85, 1], ease: "easeInOut" }}
      onAnimationComplete={onArrive}
    >
      <FaPaperPlane size={22} />
      {/* trailing spark */}
      <motion.span
        className="absolute -z-10 rounded-full bg-[#E8192C]"
        style={{ width: 4, height: 4, top: 8, left: 8 }}
        animate={{ opacity: [0.8, 0], scale: [1, 3] }}
        transition={{ duration: 0.6, repeat: Infinity }}
      />
    </motion.div>
  );
}

/* ============================================================
   OrbitCard
   ============================================================ */
function OrbitCard({ index, angle, radius, isMobile, impact, children, width = "w-60", }) {
  const floatY = useMotionValue(0);
  const magX = useSpring(0, { stiffness: 220, damping: 22 });
  const magY = useSpring(0, { stiffness: 220, damping: 22 });
  const impactScale = useSpring(1, { stiffness: 300, damping: 16 });
  const combinedY = useTransform([floatY, magY], ([f, m]) => f + m);
  const startRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useAnimationFrame((t) => {
    if (startRef.current === null) startRef.current = t;
    if (hovered) return;
    const elapsed = (t - startRef.current) / 1000;
    floatY.set(Math.sin(elapsed * 0.7 + index * 1.3) * 7);
  });

  useEffect(() => {
    if (!impact) return;
    impactScale.set(1.09);
    const t = setTimeout(() => impactScale.set(1), 350);
    return () => clearTimeout(t);
  }, [impact]);

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    magX.set(clamp(relX * 0.12, -10, 10));
    magY.set(clamp(-6 + relY * 0.12, -12, 6));
  };

  const handleEnter = () => {
    setHovered(true);
    magY.set(-6);
  };

  const handleLeave = () => {
    setHovered(false);
    magX.set(0);
    magY.set(0);
  };

  const rad = (angle * Math.PI) / 180;
  const baseX = isMobile ? 0 : Math.cos(rad) * radius;
  const baseY = isMobile ? 0 : Math.sin(rad) * radius;

  const settleVariants = {
    hidden: { opacity: 0, scale: 0.4, rotate: -12 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 130, damping: 15, delay: index * 0.12 },
    },
  };

  return (
    <div
      className={isMobile ? "relative w-full flex justify-center" : "absolute top-1/2 left-1/2"}
      style={
        isMobile
          ? {}
          : { transform: `translate(-50%, -50%) translate(${baseX}px, ${baseY}px)` }
      }
    >
      <motion.div variants={settleVariants} className={width}>\
        <motion.div
          style={{ x: magX, y: combinedY, scale: impactScale }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          className={`group relative rounded-3xl border bg-white/[0.045] backdrop-blur-xl p-5
                     shadow-[0_20px_60px_rgba(0,0,0,0.55)] transition-[border-color,box-shadow] duration-500
                     hover:border-[#E8192C]/55 hover:shadow-[0_25px_80px_rgba(232,25,44,0.25)]
                     ${impact ? "border-[#E8192C]/70 shadow-[0_0_60px_rgba(232,25,44,0.45)]" : "border-[#E8192C]/20"}`}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ============================================================
   Main Footer
   ============================================================ */
const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [coreHovered, setCoreHovered] = useState(false);
  const [layout, setLayout] = useState({ isMobile: false, radius: 300, coreSize: 210 });
  const [flight, setFlight] = useState(null);
  const [impactKey, setImpactKey] = useState(null);

  const stageRef = useRef(null);
  const rotX = useSpring(0, { stiffness: 60, damping: 16 });
  const rotY = useSpring(0, { stiffness: 60, damping: 16 });

  useEffect(() => {
    const computeLayout = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setLayout({ isMobile: true, radius: 0, coreSize: 140 });
      } else if (w < 1024) {
        setLayout({ isMobile: false, radius: 210, coreSize: 180 });
      } else if (w < 1280) {
        setLayout({ isMobile: false, radius: 260, coreSize: 210 });
      } else {
        setLayout({ isMobile: false, radius: 300, coreSize: 230 });
      }
    };
    computeLayout();
    window.addEventListener("resize", computeLayout);
    return () => window.removeEventListener("resize", computeLayout);
  }, []);

  const handleStageMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotY.set(px * 8);
    rotX.set(-py * 8);
  };

  const handleStageMouseLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

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

  // Launch the paper airplane toward a random card — never the same
  // target twice in a row, so it doesn't feel repetitive.
  const launchAirplane = () => {
    if (flight) return; // one flight at a time
    let choices = ORBIT_ORDER;
    if (ORBIT_ORDER.length > 1) {
      choices = ORBIT_ORDER.filter((k) => k !== impactKey);
    }
    const targetKey = choices[Math.floor(Math.random() * choices.length)];

    let tx = 0;
    let ty = 0;
    if (layout.isMobile) {
      const idx = ORBIT_ORDER.indexOf(targetKey);
      tx = (idx % 2 === 0 ? -1 : 1) * 30;
      ty = 90 + idx * 78;
    } else {
      const angle = ORBIT_ANGLES[targetKey];
      const rad = (angle * Math.PI) / 180;
      tx = Math.cos(rad) * layout.radius;
      ty = Math.sin(rad) * layout.radius;
    }

    setFlight({ id: Date.now(), targetKey, tx, ty });
  };

  const handleArrive = () => {
    if (!flight) return;
    setImpactKey(flight.targetKey);
    setFlight(null);
    setTimeout(() => setImpactKey(null), 700);
  };

  const stageSize = layout.isMobile ? 0 : layout.radius * 2 + 300;

  return (
    <footer id="footer" className="relative w-full overflow-hidden" style={{ background: "#050505" }}>
      <div className="w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(232,25,44,0.3), transparent)" }} />

      {/* ── Brand intro ── */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-16 pb-4 text-center">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group/logo inline-flex flex-col items-center gap-3"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-[#E8192C]/40 blur-md opacity-60 animate-[pulse_3s_ease-in-out_infinite] pointer-events-none" />
            <div
              className="relative w-14 h-14 rounded-2xl bg-white p-2 overflow-hidden ring-1 ring-white/10
                         shadow-[0_4px_20px_rgba(232,25,44,0.2)] transition-all duration-500
                         group-hover/logo:scale-110 group-hover/logo:ring-[#E8192C]/50"
            >
              <img
                src={Logo}
                alt="Praskla Digital X"
                className="w-full h-full object-contain transition-transform duration-500 group-hover/logo:rotate-[10deg]"
              />
            </div>
          </div>
          <span className="font-black text-white text-xl tracking-tight">
            Praskla Digital <span className="text-[#E8192C]">X</span>
          </span>
        </Link>
        <p className="mt-2 text-white/30 text-[11px] font-medium tracking-[0.15em] uppercase">
          A Mindful Marketing and Production Firm
        </p>
        <div
          onClick={() => window.open("https://www.prasklatechnology.com/", "_blank")}
          className="mt-1 inline-block text-[#E8192C] text-[11px] font-medium cursor-pointer hover:text-red-400 transition-colors duration-300"
        >
          A Division of Praskla Technology
        </div>
        <p className="mt-5 text-white/45 text-sm leading-relaxed">
          A mindful marketing firm empowering brands through clarity, creativity, and performance-driven growth.
        </p>
        <p className="mt-4 text-white/20 text-[11px] italic">Tap the core ✦</p>
      </div>

      {/* ── The galaxy stage ── */}
      <div
        ref={stageRef}
        onMouseMove={handleStageMouseMove}
        onMouseLeave={handleStageMouseLeave}
        className="relative w-full"
        style={{ perspective: 1400 }}
      >
        <Starfield />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } } }}
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
          className={`relative z-10 mx-auto ${layout.isMobile ? "max-w-md px-6 py-10 flex flex-col items-center gap-6" : "py-20 flex items-center justify-center"
            }`}
        >
          <div
            className={layout.isMobile ? "flex flex-col items-center gap-8 w-full" : "relative"}
            style={layout.isMobile ? {} : { width: stageSize, height: stageSize }}
          >
            {/* Core — perfectly centered via inset-0 flex, not translate math */}
            <div className={layout.isMobile ? "" : "absolute inset-0 flex items-center justify-center pointer-events-none"}>
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="pointer-events-auto"
              >
                <BlackHoleCore
                  size={layout.coreSize}
                  hovered={coreHovered}
                  onHoverStart={() => setCoreHovered(true)}
                  onHoverEnd={() => setCoreHovered(false)}
                  onLaunch={launchAirplane}
                />
              </motion.div>
            </div>

            {/* Paper airplane flight, launched from the exact center */}
            {!layout.isMobile && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-0 h-0">
                  <AnimatePresence>
                    {flight && <PaperAirplane key={flight.id} tx={flight.tx} ty={flight.ty} onArrive={handleArrive} />}
                  </AnimatePresence>
                </div>
              </div>
            )}
            {layout.isMobile && (
              <div className="absolute left-1/2 top-24 pointer-events-none">
                <AnimatePresence>
                  {flight && <PaperAirplane key={flight.id} tx={flight.tx} ty={flight.ty} onArrive={handleArrive} />}
                </AnimatePresence>
              </div>
            )}

            {/* Orbit cards */}
            {ORBIT_ORDER.map((key, index) => (
              <OrbitCard
                key={key}
                index={index}
                angle={ORBIT_ANGLES[key]}
                radius={layout.radius}
                isMobile={layout.isMobile}
                impact={impactKey === key}
                width={key === "services" ? "w-fit min-w-[360px]" : "w-60"}
              >
                {key === "contact" && (
                  <>
                    <h4 className="text-white font-bold text-xs tracking-[0.25em] uppercase mb-4">Contact</h4>
                    <div className="space-y-3">
                      <a href="tel:+919566880740" className="flex items-center gap-2.5 text-white/50 hover:text-white transition-colors text-sm">
                        <FaPhone size={12} className="text-[#E8192C]/70 flex-shrink-0" />
                        +91 9566880740
                      </a>
                      <a href="mailto:praskladigitalx@gmail.com" className="flex items-center gap-2.5 text-white/50 hover:text-white transition-colors text-sm break-all">
                        <MdEmail size={13} className="text-[#E8192C]/70 flex-shrink-0" />
                        marketing@prasklatechnology.com
                      </a>
                      <div className="flex items-start gap-2.5 text-white/50 text-sm">
                        <FaLocationDot size={12} className="text-[#E8192C]/70 flex-shrink-0 mt-1" />
                        <span>3rd Floor, A-Block, KSRCE, KSR College Campus, Tiruchengode, Namakkal - 637215</span>
                      </div>
                    </div>
                  </>
                )}

                {key === "services" && (
                  <>
                    <h4 className="text-white font-bold text-sm tracking-[0.25em] uppercase mb-5">
                      Services
                    </h4>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full overflow-y-auto pr-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {SERVICES_A.map((s) => (
                        <Link
                          key={s}
                          to="/services"
                          className="text-white/60 hover:text-white transition-colors text-sm whitespace-nowrap"
                        >
                          {s}
                        </Link>
                      ))}

                      {SERVICES_B.map((s) => (
                        <Link
                          key={s}
                          to="/services"
                          className="text-white/60 hover:text-white transition-colors text-sm whitespace-nowrap"
                        >
                          {s}
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                {key === "social" && (
                  <>
                    <h4 className="text-white font-bold text-xs tracking-[0.25em] uppercase mb-4">Social Media</h4>
                    <div className="flex gap-2.5">
                      <SocialIcon href="https://www.instagram.com/py.digitalx/" label="Instagram" variant="instagram">
                        <FaInstagram size={15} />
                      </SocialIcon>
                      <SocialIcon href="https://wa.me/9566880740" label="WhatsApp" variant="whatsapp">
                        <FaWhatsapp size={15} />
                      </SocialIcon>
                      <SocialIcon href="https://facebook.com/praskla" label="Facebook" variant="facebook">
                        <FaFacebookF size={15} />
                      </SocialIcon>
                    </div>
                  </>
                )}

                {key === "newsletter" && (
                  <>
                    <h4 className="text-white font-bold text-xs tracking-[0.25em] uppercase mb-2">Stay in the loop</h4>
                    <p className="text-white/40 text-xs mb-4 leading-relaxed">
                      Latest updates on marketing trends and case studies.
                    </p>
                    <form onSubmit={handleNewsletterSubmit} className="space-y-2.5">
                      <div className="flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2.5" style={{ background: "#111" }}>
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
                          className="w-6 h-6 rounded-full bg-[#E8192C] flex items-center justify-center flex-shrink-0
                                     hover:bg-[#ff2235] hover:scale-110 transition-all duration-300
                                     disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FaArrowRight size={10} className="text-white" />
                        </button>
                      </div>
                      {message && <p className="text-[#E8192C] text-[11px]">{message}</p>}
                    </form>
                  </>
                )}

                {key === "quickLinks" && (
                  <>
                    <h4 className="text-white font-bold text-xs tracking-[0.25em] uppercase mb-4">Quick Links</h4>
                    <ul className="space-y-2.5">
                      {QUICK_LINKS.map((l) => (
                        <li key={l.to}>
                          <Link to={l.to} className="text-white/50 hover:text-white transition-colors text-sm">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </OrbitCard>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Bottom legal bar ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-white/25 text-xs">© {new Date().getFullYear()} Praskla Digital X. All rights reserved.</p>

          <a href="https://www.prasklatechnology.com/" target="_blank" rel="noopener noreferrer" className="inline-block">
            <p className="text-white/25 text-xs hover:text-white/50 transition-colors duration-300 cursor-pointer">
              A Division of Praskla Technology
            </p>
          </a>

          <div className="flex items-center gap-5">
            <Link to="/terms" className="text-white/25 hover:text-white transition-colors text-xs">Terms of Use</Link>
            <span className="text-white/10">|</span>
            <Link to="/privacy" className="text-white/25 hover:text-white transition-colors text-xs">Privacy Policy</Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); opacity: 0.15; }
          50% { transform: translate(8px, -10px); opacity: 0.4; }
        }
        @keyframes shoot {
          0% { transform: translateX(0) translateY(0) rotate(18deg); opacity: 0; }
          5% { opacity: 1; }
          15% { opacity: 0; }
          100% { transform: translateX(130vw) translateY(60px) rotate(18deg); opacity: 0; }
        }
        @keyframes accretion {
          0% { transform: translate(var(--sx), var(--sy)) scale(1); opacity: 0; }
          12% { opacity: 1; }
          100% { transform: translate(0, 0) scale(0); opacity: 0; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;