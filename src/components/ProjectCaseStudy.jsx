import React from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

const ProjectCaseStudy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  let project = location.state?.project;
  if (!project && id) {
    // Try finding by numeric id first, then by slug
    project = projects.find((p) => String(p.id) === id || p.slug === id);
  }

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
            onClick={() => navigate("/case-study")}
          >
            ← Back to Case Studies
          </button>
        </div>
      </section>
    );
  }

  const heroImage = project.image;

  return (
    <div style={{ background: "#080808" }}>

      {/* ── Back button ── */}
      <div className="fixed top-24 left-6 z-50">
        <button
          onClick={() => navigate("/case-study")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                     border border-white/10 text-white/60 hover:text-white hover:border-white/30
                     transition-all duration-300 text-sm font-medium backdrop-blur-sm"
          style={{ background: "rgba(10,10,10,0.8)" }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Case Studies
        </button>
      </div>

      {/* ── HERO ── */}
      <motion.section
        className="relative w-full min-h-screen flex items-end overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Background image with dark overlay */}
        <div className="absolute inset-0">
          <img src={heroImage} alt={project.title} className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #080808 30%, rgba(8,8,8,0.6) 100%)" }} />
          {/* Red glow */}
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(232,25,44,0.12) 0%, transparent 65%)", transform: "translate(-20%,20%)" }} />
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pb-20 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C] animate-pulse" />
              <span className="text-[#E8192C] text-xs font-semibold tracking-[0.2em] uppercase">Case Study</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-none tracking-tight">
              {project.title}
            </h1>
            <p className="text-white/40 text-lg md:text-xl mb-8">{project.description}</p>

            {/* Tags + result chip */}
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 rounded-full border border-[#E8192C]/30 text-[#E8192C] text-sm font-medium bg-[#E8192C]/8">
                {project.tags}
              </span>
              <span className="px-4 py-1.5 rounded-full border border-white/10 text-white/50 text-sm bg-white/4">
                ✓ {project.result}
              </span>
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
            <span className="text-white/20 text-xs tracking-widest uppercase">Scroll to explore</span>
          </motion.div>
        </div>
      </motion.section>

      {/* ── OVERVIEW ── */}
      {project.overview && (
        <section className="w-full py-20 md:py-28 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

              {/* Left */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <span className="text-[#E8192C] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Overview</span>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
                  {project.overview.headline}
                </h2>
                <p className="text-white/45 text-base leading-relaxed">
                  {project.overview.paragraph}
                </p>
              </motion.div>

              {/* Right — challenges + solutions */}
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
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E8192C]/10 border border-[#E8192C]/25
                                           text-[#E8192C] text-[9px] font-black flex items-center justify-center mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-white/45 text-sm leading-relaxed">{c}</span>
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
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E8192C]/10 border border-[#E8192C]/25
                                           text-[#E8192C] text-[9px] font-black flex items-center justify-center mt-0.5">
                            ✓
                          </span>
                          <span className="text-white/45 text-sm leading-relaxed">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURES ── */}
      {project.features?.length > 0 && (
        <section className="w-full py-20 md:py-28 border-t border-white/6" style={{ background: "#0A0A0A" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#E8192C] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">Features</span>
              <h2 className="text-3xl md:text-4xl font-black text-white">Key Capabilities</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.features.map((f, i) => (
                <motion.div
                  key={f.id || i}
                  className="group relative rounded-2xl border border-white/6 p-6 hover:border-[#E8192C]/25
                             transition-all duration-300 overflow-hidden"
                  style={{ background: "#111" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "radial-gradient(circle at 30% 0%, rgba(232,25,44,0.07) 0%, transparent 65%)" }} />
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="text-white font-bold text-base mb-2">{f.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{f.description}</p>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full
                                  bg-gradient-to-r from-[#E8192C] to-transparent rounded-full transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RESULTS ── */}
      {project.results?.length > 0 && (
        <section className="w-full py-20 md:py-28 border-t border-white/6">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#E8192C] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">Impact</span>
              <h2 className="text-3xl md:text-4xl font-black text-white">Measurable Results</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.results.map((r, i) => (
                <motion.div
                  key={r.id || i}
                  className="relative rounded-2xl border border-white/6 p-8 md:p-10 overflow-hidden group"
                  style={{ background: "#0F0F0F" }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(circle at 80% 20%, rgba(232,25,44,0.06) 0%, transparent 60%)" }} />
                  <p className="text-5xl md:text-6xl font-black text-[#E8192C] mb-3 leading-none">{r.metric}</p>
                  <p className="text-white/40 text-base leading-relaxed">{r.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TECH STACK ── */}
      {project.techStack?.length > 0 && (
        <section className="w-full py-20 md:py-28 border-t border-white/6" style={{ background: "#0A0A0A" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#E8192C] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">Technologies</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Built With Modern Tools</h2>
              <p className="text-white/35 text-base">
                Leveraging industry-leading technologies to deliver exceptional results
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3">
              {project.techStack.map((tech, i) => (
                <motion.span
                  key={i}
                  className="px-5 py-2.5 rounded-full border border-white/8 text-white/60 text-sm font-medium
                             hover:border-[#E8192C]/40 hover:text-white hover:bg-[#E8192C]/5 transition-all duration-300 cursor-default"
                  style={{ background: "#111" }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  whileHover={{ y: -2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER CTA ── */}
      <section className="w-full py-20 border-t border-white/6 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-white/25 text-xs tracking-widest uppercase mb-6">Next Step</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Ready to build something <span className="text-[#E8192C]">great?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/case-study"
              className="px-6 py-3 rounded-full border border-white/10 text-white/50 text-sm font-semibold
                         hover:text-white hover:border-white/30 transition-all duration-300"
            >
              ← More Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectCaseStudy;
