import React, { useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight, Check, Sparkles, Zap, Layers } from "lucide-react";
import { blogPosts, clientData } from "../../constants";
import ContactForm from "../ContactForm";
import "../MainBlog.css";

const DEFAULT_CLIENT_IMAGE =
  "https://via.placeholder.com/1200x675?text=Client+Image";

const BlogPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [showContactForm, setShowContactForm] = useState(false);

  let post = location.state;

  if (!post) {
    if (id !== undefined) {
      const index = parseInt(id, 10);
      if (!isNaN(index) && index >= 0 && index < blogPosts.length) {
        post = blogPosts[index];
      }
    }

    if (!post) {
      const params = new URLSearchParams(location.search);
      const titleParam = params.get("title");
      if (titleParam) {
        const decoded = decodeURIComponent(titleParam);
        post =
          blogPosts.find((p) => p.title === decoded) ||
          clientData.find((c) => c.name === decoded);
      }
    }
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#111111] flex items-center justify-center px-6">
        <div className="text-center max-w-md bg-white p-8 sm:p-10 rounded-[2.5rem] border border-gray-200 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 text-[#E31D2E] flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-[#111111] mb-2">Blog Post Not Found</h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">
            Please select a blog or case study from the Projects page.
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-2.5 bg-[#E31D2E] hover:bg-[#c91827] text-white px-7 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 cursor-pointer"
            onClick={() => navigate("/projects")}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const safe = (s) => (typeof s === "string" ? s.trim().toLowerCase() : "");
  let overview = post.overview;

  if (!overview) {
    const postName = post.name || post.title || "";
    const target = safe(postName);
    let found = clientData.find(
      (c) => safe(c.name) === target || String(c.id) === String(post.id)
    );
    if (!found && post.title) {
      const lowerTitle = safe(post.title);
      found = clientData.find(
        (c) =>
          lowerTitle.includes(safe(c.name)) || safe(c.name).includes(lowerTitle)
      );
    }
    overview = found?.overview;
  }

  const featuresLeft = overview?.features
    ? overview.features.slice(0, Math.ceil(overview.features.length / 2))
    : [];
  const featuresRight = overview?.features
    ? overview.features.slice(Math.ceil(overview.features.length / 2))
    : [];

  const heroImage = post.heroImage || post.image || overview?.image;

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#111111] font-sans overflow-x-hidden selection:bg-[#E31D2E] selection:text-white">
      
      {/* ── HERO SECTION: NATURAL COVER IMAGE WITH NO RED OVERLAY ── */}
      <section className="relative w-full min-h-[75vh] lg:min-h-[82vh] flex items-end overflow-hidden pt-28 pb-16 lg:pb-20">
        
        {/* Full-Width Background Cover Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage || DEFAULT_CLIENT_IMAGE}
            alt={post.title || post.name}
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Natural Black/Dark Neutral Gradient Overlay (NO RED COLOR TINT) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/75 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/40" />
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start max-w-4xl"
          >
            {/* Back Button */}
            <div className="mb-6">
              <button
                type="button"
                onClick={() => navigate("/projects")}
                className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 group cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#E31D2E]" />
                <span>Back to Projects</span>
              </button>
            </div>

            {/* Breadcrumb Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 text-xs font-bold tracking-wider mb-5">
              <span className="w-2 h-2 rounded-full bg-[#E31D2E] animate-pulse" />
              <span>Blog / {post.title || post.name}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.22] tracking-tight text-white mb-4 drop-shadow-sm">
              {post.title || post.name}
            </h1>

            {/* Description */}
            <p className="text-gray-200 text-base sm:text-xl font-medium leading-relaxed max-w-2xl drop-shadow-sm">
              {post.description ||
                "Discover how we built impactful digital solutions for our clients."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── OVERVIEW SECTION (LIGHT CLEAN THEME) ── */}
      {overview && (
        <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
            
            <div className="bg-white p-8 sm:p-12 md:p-14 rounded-[2.5rem] border border-gray-200/90 shadow-[0_20px_50px_rgba(17,17,17,0.04)] relative overflow-hidden">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
                
                {/* Left Text */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="lg:col-span-7 space-y-6"
                >
                  <div className="inline-flex items-center gap-2.5 text-[#E31D2E] text-xs font-black uppercase tracking-[0.25em]">
                    <span className="w-6 h-[2px] bg-[#E31D2E]" />
                    Overview
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-[#111111] leading-tight tracking-tight">
                    {overview.headline || "Client Overview"}
                  </h2>
                  <p className="text-[#575757] text-base sm:text-lg leading-relaxed font-medium">
                    {overview.paragraph}
                  </p>

                  {/* Features List */}
                  {overview.features && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                      <ul className="space-y-3">
                        {featuresLeft.map((f, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-[#333333]">
                            <span className="w-5 h-5 rounded-full bg-red-50 border border-red-100 text-[#E31D2E] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                              0{i + 1}
                            </span>
                            <span className="leading-relaxed font-semibold">{f}</span>
                          </li>
                        ))}
                      </ul>
                      <ul className="space-y-3">
                        {featuresRight.map((f, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-[#333333]">
                            <span className="w-5 h-5 rounded-full bg-red-50 border border-red-100 text-[#E31D2E] font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                              0{i + featuresLeft.length + 1}
                            </span>
                            <span className="leading-relaxed font-semibold">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* View Live Project CTA */}
                  {overview.caseStudy && (
                    <div className="pt-6">
                      <a
                        href={overview.caseStudy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#E31D2E] to-[#C71B2B] hover:from-[#EE2436] hover:to-[#E31D2E] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-wider shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 group cursor-pointer"
                      >
                        <span>View Live Project</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    </div>
                  )}
                </motion.div>

                {/* Right Image Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="lg:col-span-5 flex justify-center lg:justify-end"
                >
                  <div className="relative rounded-[2rem] p-3 bg-white border border-gray-200/90 shadow-[0_20px_50px_rgba(17,17,17,0.06)] overflow-hidden w-full max-w-md">
                    <img
                      src={overview.image || heroImage || DEFAULT_CLIENT_IMAGE}
                      alt={overview.headline || post.title || post.name}
                      className="w-full h-auto aspect-[4/3] object-cover rounded-[1.5rem]"
                    />
                  </div>
                </motion.div>

              </div>
            </div>

          </div>
        </section>
      )}

      {/* ── VALUE ADDITION / IMPACT SECTION ── */}
      {post.valueAddition && post.valueAddition.length > 0 && (
        <section className="relative w-full py-16 sm:py-20 lg:py-24 border-t border-gray-200/60 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <div className="inline-flex items-center gap-2.5 text-[#E31D2E] text-xs font-black uppercase tracking-[0.25em] mb-3">
                <span className="w-6 h-[2px] bg-[#E31D2E]" />
                Measurable Impact
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
                Value <span className="text-[#E31D2E]">Addition</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {post.valueAddition.map((item, i) => (
                <motion.div
                  key={item.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="group flex items-start gap-5 bg-white p-7 rounded-[2rem] border border-gray-200/90 shadow-[0_10px_30px_rgba(17,17,17,0.03)] hover:border-[#E31D2E]/40 hover:shadow-[0_16px_36px_rgba(227,29,46,0.08)] transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-2xl bg-red-50 text-[#E31D2E] flex items-center justify-center text-sm font-black shrink-0 border border-red-100 group-hover:bg-[#E31D2E] group-hover:text-white transition-all duration-300 italic shadow-2xs">
                    0{item.id || i + 1}
                  </div>
                  <p className="text-[#333333] text-base font-semibold leading-relaxed group-hover:text-[#111111] transition-colors">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ── CTA FOOTER SECTION ── */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 border-t border-gray-200/60 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-8 sm:p-12 md:p-14 rounded-[2.5rem] bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#111111] text-white shadow-2xl relative overflow-hidden"
          >
            <span className="text-[#E31D2E] text-xs font-black tracking-[0.3em] uppercase mb-3 block">
              Transform Your Digital Reach
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
              Ready to build solutions like <span className="text-[#E31D2E]">{post.title || post.name}?</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed font-medium">
              Get in touch with our strategy team to discuss your project requirements.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                type="button"
                onClick={() => setShowContactForm(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#E31D2E] hover:bg-[#c91827] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-red-500/25 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2.5"
              >
                <span>Get Detailed Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigate("/projects")}
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 hover:border-white/40 bg-white/10 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore All Projects</span>
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Contact Form Modal */}
      <ContactForm
        isOpen={showContactForm}
        onClose={() => setShowContactForm(false)}
      />

    </div>
  );
};

export default BlogPage;
