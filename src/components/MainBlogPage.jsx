import React, { useState } from "react";
import PHero from "../assets/P-Hero-3.jpg";
import { motion } from "framer-motion";
import { FaCalendar, FaUser, FaArrowRight, FaClock } from "react-icons/fa";
import "./MainBlog.css";

import HeroLayout from "./common/HeroLayout";

export default function BlogPage() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: "Tech Innovators Summit 2024",
      category: "Events",
      date: "Nov 15, 2024",
      author: "Praskla Team",
      readTime: "5 min read",
      description:
        "A gathering of the brightest minds in the industry where tech leaders shared valuable insights about upcoming technologies and trends.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800",
      gradient: "from-purple-600 to-blue-600",
    },
    {
      id: 2,
      title: "Startup Networking Meetup",
      category: "Networking",
      date: "Nov 10, 2024",
      author: "Event Team",
      readTime: "4 min read",
      description:
        "Business founders, investors, and creators connected and exchanged ideas to bring new opportunities to life.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
      gradient: "from-indigo-600 to-purple-600",
    },
    {
      id: 3,
      title: "AI & Machine Learning Workshop",
      category: "Workshop",
      date: "Nov 5, 2024",
      author: "Tech Labs",
      readTime: "6 min read",
      description:
        "Deep dive into the latest AI technologies and how they're transforming industries across the globe.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      id: 4,
      title: "Digital Marketing Trends",
      category: "Marketing",
      date: "Oct 28, 2024",
      author: "Marketing Team",
      readTime: "7 min read",
      description:
        "Exploring the latest digital marketing strategies that are driving success in 2024.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      gradient: "from-cyan-600 to-teal-600",
    },
    {
      id: 5,
      title: "Cybersecurity Best Practices",
      category: "Security",
      date: "Oct 20, 2024",
      author: "Security Team",
      readTime: "5 min read",
      description:
        "Essential cybersecurity strategies to protect digital assets and infrastructure.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
      gradient: "from-green-600 to-emerald-600",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#080808]">
      {/* HERO SECTION */}
      <HeroLayout
        className="bg-white"
        bgElements={
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${PHero})`,
            }}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 left-10 w-96 h-96 rounded-full bg-[#E8192C] blur-[120px]"
            />
          </div>
        }
        badge={
          <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E31D2E]/20 bg-white/60 shadow-[0_8px_16px_rgba(17,17,17,0.03)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31D2E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31D2E]" />
            </span>
            <span className="relative text-[#111111] text-xs font-bold tracking-[0.25em] uppercase">Latest Insights</span>
          </div>
        }
        title={
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-[52px] font-black text-white leading-tight"
          >
            Latest Updates & <br />
            <span className="text-[#E8192C]">
              Insights
            </span>
          </motion.h1>
        }
        description={
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed font-light blog-desc"
          >
            Stay updated with the latest news, events, and insights from the tech world.
          </motion.p>
        }
        actions={
          <button
            onClick={() =>
              document
                .getElementById("blog-posts")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="group relative inline-flex items-center justify-center gap-3 bg-[#E8192C] text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-[#ff2235] hover:scale-105"
          >
            Explore Posts
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        }
      />

      {/* CONTENT SECTIONS */}
      <section className="max-w-7xl mx-auto py-12 sm:py-14 lg:py-16 px-6 bg-[#080808]">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C] animate-pulse" />
              <span className="text-[#E8192C] text-xs font-bold tracking-[0.2em] uppercase">Our Vision</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Empowering the{" "}
              <span className="text-[#E8192C]">
                Tech Community
              </span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-6">
              We bring together developers, creators, founders, and innovators
              through engaging events, collaborative meetups, and premium learning
              experiences that drive real growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-[#E8192C] text-white rounded-full hover:bg-[#ff2235] transition-all font-bold">
                Explore Events
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white/10 text-white rounded-full hover:border-[#E8192C] transition-all font-bold">
                Join Community
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-[#E8192C]/10 rounded-3xl blur-2xl opacity-40"></div>
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000"
              alt="Tech Community"
              className="relative rounded-2xl shadow-2xl border border-white/5"
            />
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-[#0A0A0A] py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Events Hosted", value: "50+" },
              { label: "Community Members", value: "5K+" },
              { label: "Expert Speakers", value: "100+" },
              { label: "Satisfaction Rate", value: "95%" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl md:text-6xl font-black text-white mb-2">{stat.value}</h3>
                <p className="text-[#E8192C] text-sm md:text-base font-bold uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT SECTION 2 */}
      <section className="max-w-7xl mx-auto py-12 sm:py-14 lg:py-16 px-6 bg-[#080808]">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative order-2 md:order-1"
          >
            <div className="absolute -inset-4 bg-[#E8192C]/10 rounded-3xl blur-2xl opacity-40"></div>
            <img
              src="https://images.unsplash.com/photo-1485217988980-11786ced9454?w=1000"
              alt="Networking"
              className="relative rounded-2xl shadow-2xl border border-white/5"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C] animate-pulse" />
              <span className="text-[#E8192C] text-xs font-bold tracking-[0.2em] uppercase">Our Mission</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Connecting Ideas with{" "}
              <span className="text-[#E8192C]">
                Opportunities
              </span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Our platform bridges the gap between knowledge and real-world
              applications, creating meaningful connections that help individuals
              and organizations thrive in the digital age.
            </p>
            <button className="px-8 py-4 bg-[#E8192C] text-white rounded-full hover:bg-[#ff2235] transition-all font-bold">
              Get Started Today
            </button>
          </motion.div>
        </div>
      </section>

      {/* BLOG POSTS GRID */}
      <section id="blog-posts" className="bg-[#080808] py-12 sm:py-14 lg:py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C] animate-pulse" />
              <span className="text-[#E8192C] text-xs font-bold tracking-[0.2em] uppercase">Knowledge Base</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Recent <span className="text-[#E8192C]">Articles</span>
            </h2>
            <p className="text-white/40 text-lg md:text-xl">
              Discover our latest thoughts and updates
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCard(post.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:border-[#E8192C]/30 hover:shadow-2xl hover:shadow-[#E8192C]/5 transition-all duration-500 cursor-pointer"
              >
                {/* Card Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={post.image}
                    className="w-full h-full object-cover"
                    animate={{ scale: hoveredCard === post.id ? 1.1 : 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />

                  {/* Category Chip */}
                  <span className="absolute top-4 left-4 px-4 py-1.5 bg-[#E8192C] text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-4 text-[10px] text-[#E8192C] font-bold uppercase tracking-widest mb-4">
                    <div className="flex items-center gap-1.5">
                      <FaCalendar className="text-white/20" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaClock className="text-white/20" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white line-clamp-2 my-4 group-hover:text-[#E8192C] transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-white/40 text-sm leading-relaxed line-clamp-3 mb-6">
                    {post.description}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs text-white/40 group-hover:text-white/60 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <FaUser className="text-[#E8192C]" />
                      </div>
                      <span>{post.author}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#E8192C] font-bold text-sm group-hover:gap-4 transition-all duration-300 uppercase tracking-widest">
                      <span>Read</span>
                      <FaArrowRight />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
