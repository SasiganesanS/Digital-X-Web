import React, { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

const glitterParticles = [
  { top: "20%", left: "8%", delay: 0 },
  { top: "70%", left: "15%", delay: 0.4 },
  { top: "30%", right: "10%", delay: 0.8 },
  { top: "65%", right: "18%", delay: 0.2 },
  { top: "15%", left: "45%", delay: 0.6 },
];

const ProjectCaseStudy = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const project = projects.find((p) => String(p.id) === id || p.slug === id);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <section
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: "#080808" }}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Project not found</h2>
          <button
            className="inline-flex items-center gap-2 bg-[#E8192C] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#ff2235] transition-colors"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
        </div>
      </section>
    );
  }

  return (
    <div style={{ background: "#080808" }}>

      {/* ── HERO ── */}
      <motion.section
        className="relative w-full min-h-screen flex items-end overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #080808 35%, rgba(8,8,8,0.7) 100%)" }} />
          {/* Red glow */}
          <div
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(232,25,44,0.14) 0%, transparent 65%)", transform: "translate(-20%,20%)" }}
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full pointer-events-none blur-[120px]"
            style={{ background: "radial-gradient(circle, rgba(232,25,44,0.1) 0%, transparent 60%)" }}
          />
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pb-20 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-start"
          >
            {/* Back Button */}
            <div className="mb-12">
              <Link 
                to="/" 
                className="inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 hover:bg-[#E8192C] hover:border-[#E8192C] transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </div>
                <span className="text-sm font-bold uppercase tracking-widest">Back to Home</span>
              </Link>
            </div>

            {/* Eyebrow badge */}
            <div
              className="relative inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(232,25,44,0.18) 0%, rgba(0,0,0,0.6) 50%, rgba(232,25,44,0.12) 100%)",
                border: "1px solid rgba(232,25,44,0.5)",
                boxShadow: "0 0 18px rgba(232,25,44,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)" }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
              />
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-[#E8192C]/80 to-transparent" />
              {glitterParticles.map((pos, i) => (
                <motion.span
                  key={i}
                  className="absolute w-[3px] h-[3px] rounded-full bg-white"
                  style={{ top: pos.top, left: pos.left, right: pos.right }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }}
                />
              ))}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8192C] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E8192C]" />
              </span>
              <span className="relative text-white text-xs sm:text-sm font-bold tracking-[0.3em] uppercase"
                style={{ textShadow: "0 0 10px rgba(232,25,44,0.7)" }}>
                Case Study
              </span>
              <motion.span
                className="relative text-[#E8192C] text-base leading-none"
                animate={{ rotate: [0, 180, 360], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >✦</motion.span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-none tracking-tight">
              {project.title}
            </h1>
            <p className="text-white/50 text-lg md:text-xl mb-8 max-w-2xl">{project.description}</p>

            {/* Tags + result */}
            <div className="flex flex-wrap gap-3 mb-10">
              <span
                className="px-4 py-1.5 rounded-full text-sm font-semibold"
                style={{ color: "#E8192C", border: "1px solid rgba(232,25,44,0.35)", background: "rgba(232,25,44,0.08)" }}
              >
                {project.tags}
              </span>
              <span className="px-4 py-1.5 rounded-full border border-white/10 text-white/50 text-sm"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                ✓ {project.result}
              </span>
            </div>

            {/* Services */}
            <div className="flex flex-wrap gap-2">
              {project.services.map((svc, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold px-4 py-1.5 rounded-full"
                  style={{ color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {svc}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-16 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="w-6 h-10 border border-white/15 rounded-full flex items-start justify-center p-1.5">
              <motion.div
                className="w-1 h-2 bg-[#E8192C] rounded-full"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <span className="text-white/25 text-xs tracking-widest uppercase">Scroll to explore</span>
          </motion.div>
        </div>
      </motion.section>

      {/* ── OVERVIEW ── */}
      {project.overview && (
        <section className="w-full py-20 md:py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <div 
              className="relative rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden" 
              style={{
                border: "1px solid rgba(232,25,44,0.3)",
                background: "linear-gradient(135deg, rgba(232,25,44,0.05) 0%, rgba(10,10,10,0.8) 50%, rgba(232,25,44,0.02) 100%)",
                boxShadow: "0 0 40px rgba(232,25,44,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* top glow line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#E8192C]/60 to-transparent" />
              {/* corner accent */}
              <div className="absolute top-0 left-0 w-32 h-32 opacity-20"
                style={{ background: "radial-gradient(circle at top left, rgba(232,25,44,0.5), transparent 70%)" }} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <span className="text-[#E8192C] text-base md:text-lg font-bold tracking-[0.2em] uppercase mb-4 block">Overview</span>
                  <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
                    {project.overview.headline}
                  </h2>
                  <p className="text-white/50 text-base leading-relaxed">{project.overview.paragraph}</p>
                </motion.div>

                <motion.div
                  className="space-y-10"
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  {project.overview.challenges && (
                    <div>
                      <h3 className="text-white font-bold text-lg mb-4">Key Challenges</h3>
                      <ul className="space-y-3">
                        {project.overview.challenges.map((c, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black mt-0.5"
                              style={{ background: "rgba(232,25,44,0.1)", border: "1px solid rgba(232,25,44,0.25)", color: "#E8192C" }}>
                              {i + 1}
                            </span>
                            <span className="text-white/50 text-sm leading-relaxed">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.overview.solutions && (
                    <div>
                      <h3 className="text-white font-bold text-lg mb-4">Our Approach</h3>
                      <ul className="space-y-3">
                        {project.overview.solutions.map((s, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black mt-0.5"
                              style={{ background: "rgba(232,25,44,0.1)", border: "1px solid rgba(232,25,44,0.25)", color: "#E8192C" }}>
                              ✓
                            </span>
                            <span className="text-white/50 text-sm leading-relaxed">{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURES ── */}
      {project.features?.length > 0 && (
        <section className="w-full py-20 md:py-28" style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#E8192C] text-base md:text-lg font-bold tracking-[0.2em] uppercase mb-3 block">
                {project.featuresLabel || "Features"}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                {project.featuresTitle || "Key Capabilities"}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.features.map((f, i) => (
                <motion.div
                  key={f.id || i}
                  className="group relative rounded-2xl p-6 overflow-hidden transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(232,25,44,0.06) 0%, rgba(17,17,17,1) 50%)",
                    border: "1px solid rgba(232,25,44,0.15)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  whileHover={{ y: -4, borderColor: "rgba(232,25,44,0.35)" }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#E8192C]/40 to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "radial-gradient(circle at 30% 0%, rgba(232,25,44,0.08) 0%, transparent 65%)" }} />
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="text-white font-bold text-base mb-2">{f.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{f.description}</p>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#E8192C] to-transparent rounded-full transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RESULTS ── */}
      {project.results?.length > 0 && (
        <section className="w-full py-20 md:py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#E8192C] text-base md:text-lg font-bold tracking-[0.2em] uppercase mb-3 block">Impact</span>
              <h2 className="text-3xl md:text-4xl font-black text-white">Measurable Results</h2>
            </motion.div>

            <div className="relative w-full max-w-6xl mx-auto py-10 md:py-24">
              
              {/* Desktop Laser Line */}
              <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <filter id="red-glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="blur1" />
                      <feGaussianBlur stdDeviation="6" result="blur2" />
                      <feMerge>
                        <feMergeNode in="blur2" />
                        <feMergeNode in="blur1" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* The diagonal line */}
                  <line 
                    x1="12.5%" y1="calc(50% + 45px)" 
                    x2="87.5%" y2="calc(50% - 45px)" 
                    stroke="#E8192C" 
                    strokeWidth="1.5" 
                    opacity="0.8"
                    filter="url(#red-glow)"
                  />
                  {/* Connecting dots */}
                  <circle cx="12.5%" cy="calc(50% + 45px)" r="3" fill="#fff" filter="url(#red-glow)" />
                  <circle cx="37.5%" cy="calc(50% + 15px)" r="3" fill="#fff" filter="url(#red-glow)" />
                  <circle cx="62.5%" cy="calc(50% - 15px)" r="3" fill="#fff" filter="url(#red-glow)" />
                  <circle cx="87.5%" cy="calc(50% - 45px)" r="3" fill="#fff" filter="url(#red-glow)" />
                </svg>
              </div>

              {/* Box grid layout ensures uniform width/height across screen sizes */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-4 lg:gap-6 relative z-10 items-center">
                {project.results.map((r, i) => {
                  // Uniform staggering logic
                  // Box 1: +45px (lowest), Box 2: +15px, Box 3: -15px, Box 4: -45px (highest)
                  const stepOffsets = [
                    "md:translate-y-[45px]",
                    "md:translate-y-[15px]",
                    "md:-translate-y-[15px]",
                    "md:-translate-y-[45px]"
                  ];

                  return (
                    <motion.div
                      key={r.id || i}
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.15 }}
                      className={`relative w-full h-full min-h-[180px] lg:min-h-[220px] flex flex-col justify-center items-center text-center rounded-[1.2rem] p-5 lg:p-7 group ${stepOffsets[i]}`}
                      style={{
                        background: "linear-gradient(135deg, rgba(35,0,0,0.92) 0%, rgba(8,0,0,0.98) 100%)",
                        border: "1px solid rgba(232,25,44,0.4)",
                        boxShadow: "0 0 30px rgba(232,25,44,0.2), inset 0 0 20px rgba(232,25,44,0.15)",
                      }}
                    >
                      {/* Top/Bottom edge neon highlights */}
                      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#E8192C] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#E8192C] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                      <h4 className="text-xl lg:text-2xl font-black text-white leading-tight mb-2 drop-shadow-[0_0_10px_rgba(232,25,44,0.6)]">
                        {r.metric}
                      </h4>
                      <p className="text-white/60 text-xs lg:text-sm font-medium leading-relaxed">
                        {r.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TECH STACK ── */}
      {project.techStack?.length > 0 && (
        <section className="w-full py-20 md:py-28" style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#E8192C] text-base md:text-lg font-bold tracking-[0.2em] uppercase mb-3 block">
                {project.techLabel || "Technologies"}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                {project.techTitle || "Built With Modern Tools"}
              </h2>
              <p className="text-white/35 text-base max-w-xl mx-auto">
                {project.techDesc || "Leveraging industry-leading tools to deliver exceptional results"}
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3">
              {project.techStack.map((tech, i) => (
                <motion.span
                  key={i}
                  className="px-5 py-2.5 rounded-full text-sm font-medium cursor-default"
                  style={{
                    background: "rgba(232,25,44,0.06)",
                    border: "1px solid rgba(232,25,44,0.2)",
                    color: "rgba(255,255,255,0.65)",
                  }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  whileHover={{ y: -2, color: "#fff", borderColor: "rgba(232,25,44,0.5)" }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER CTA ── */}
      <section className="w-full py-20 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-white/25 text-xs tracking-widest uppercase mb-6">Next Step</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
            Ready to build something <span className="text-[#E8192C]">great?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-white/10 text-white/60 text-sm font-semibold hover:text-white hover:border-white/30 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Home
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#E8192C] text-white text-sm font-bold hover:bg-[#ff2235] hover:shadow-[0_0_25px_rgba(232,25,44,0.5)] transition-all duration-300"
            >
              View All Projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectCaseStudy;
