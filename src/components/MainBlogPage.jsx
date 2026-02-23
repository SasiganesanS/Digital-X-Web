import React, { useState } from "react";
import PHero from "../assets/P-Hero-3.jpg";
import { motion } from "framer-motion";
import { FaCalendar, FaUser, FaArrowRight, FaClock } from "react-icons/fa";
import "./MainBlog.css";

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
      title: "Web Development Best Practices",
      category: "Development",
      date: "Oct 20, 2024",
      author: "Dev Team",
      readTime: "8 min read",
      description:
        "Learn about modern web development practices that ensure scalability and performance.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      gradient: "from-teal-600 to-green-600",
    },
    {
      id: 6,
      title: "Cybersecurity Essentials",
      category: "Security",
      date: "Oct 15, 2024",
      author: "Security Team",
      readTime: "6 min read",
      description:
        "Essential security practices every business needs to implement in today's digital landscape.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
      gradient: "from-green-600 to-emerald-600",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white dark-section">
      {/* HERO SECTION */}
      <section
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white"
        style={{
          backgroundImage: `url(${PHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
        </div>

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-96 h-96 rounded-full bg-purple-300 blur-[120px]"
        />

        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-blue-300 blur-[140px]"
        />

        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(147, 51, 234, 0.08) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[2px] bg-gradient-to-r from-purple-400 to-transparent mb-6 mx-auto"
          />

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white/80 leading-tight mb-6 blog-hero"
          >
            Latest Updates & <br />
            <span className="text-white/80">
              Insights
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-lg md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light mb-8 blog-desc"
          >
            Stay updated with the latest news, events, and insights from the tech
            world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() =>
                document
                  .getElementById("blog-posts")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="group relative inline-flex items-center justify-center gap-2 bg-white/80 text-[#371445] px-8 py-4 rounded-full font-light transition-all hover:bg-[#371445] hover:text-white"
            >
              Explore Posts
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* CONTENT SECTION 1 (Left Text / Right Image) */}
      <section className="max-w-7xl mx-auto py-24 px-6 bg-white">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="text-[#371445] text-sm font-semibold uppercase tracking-wider">
                Our Vision
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#371445] mb-6 leading-tight">
              Empowering the{" "}
              <span className="bg-gradient-to-r from-[#371445] to-[#371445] bg-clip-text text-transparent">
                Tech Community
              </span>
            </h2>
            <p className="text-[#371445]/70 text-lg leading-relaxed mb-4">
              We bring together developers, creators, founders, and innovators
              through engaging events, collaborative meetups, and premium learning
              experiences that drive real growth.
            </p>
            <p className="text-[#371445]/70 text-lg leading-relaxed mb-8">
              Our platform serves as a catalyst for innovation, connecting passionate
              individuals with the resources, knowledge, and network they need to
              transform ideas into impactful solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-[#371445] text-white rounded-full hover:shadow-lg transition-all font-medium">
                Explore Events
              </button>
              <button className="px-8 py-3 bg-white border-2 border-[#371445] text-[#371445] rounded-full transition-all font-medium">
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
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-200 to-blue-200 rounded-3xl blur-2xl opacity-30"></div>
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000"
              alt="Tech Community"
              className="relative rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-gradient-to-r  from-[#371445] to-[#371445] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">50+</h3>
              <p className="text-white/70 text-sm md:text-base">Events Hosted</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">5K+</h3>
              <p className="text-purple-100 text-sm md:text-base">Community Members</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">100+</h3>
              <p className="text-white/70 text-sm md:text-base">Expert Speakers</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">95%</h3>
              <p className="text-white/70 text-sm md:text-base">Satisfaction Rate</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION 2 (Left Image / Right Text) */}
      <section className="max-w-7xl mx-auto py-24 px-6 bg-white">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative order-2 md:order-1"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded-3xl blur-2xl opacity-30"></div>
            <img
              src="https://images.unsplash.com/photo-1485217988980-11786ced9454?w=1000"
              alt="Networking"
              className="relative rounded-2xl shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <div className="inline-block mb-4">
               <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-1"
            >
              <span className="text-[#371445] text-sm font-semibold uppercase tracking-wider">
                Our Mission
              </span>
            </motion.div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#371445] mb-6 leading-tight">
              Connecting Ideas with{" "}
              <span className="bg-gradient-to-r from-[#371445] to-[#371445] bg-clip-text text-transparent">
                Opportunities
              </span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Our platform bridges the gap between knowledge and real-world
              applications, creating meaningful connections that help individuals
              and organizations thrive in the digital age.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              From hands-on workshops to inspiring keynotes, we provide diverse
              opportunities for learning, networking, and career advancement in the
              ever-evolving tech landscape.
            </p>
            <button className="px-8 py-3 bg-[#371445] text-white rounded-full transition-all font-medium">
              Get Started Today
            </button>
          </motion.div>
        </div>
      </section>

      {/* BLOG POSTS GRID */}
      <section id="blog-posts" className="relative bg-white">
        <div className="border-t border-gray-200"></div>
        <div className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#371445] mb-4">
              Recent{" "}
              <span className="bg-gradient-to-r from-[#371445] to-[#371445] bg-clip-text text-transparent">
                Articles
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              Discover our latest thoughts and updates
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCard(post.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-purple-400 hover:shadow-xl transition-all cursor-pointer"
              >
                {/* Card Image */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={post.image}
                    className="w-full h-full object-cover"
                    animate={{ scale: hoveredCard === post.id ? 1.1 : 1 }}
                    transition={{ duration: 0.6 }}
                  />

                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${post.gradient} opacity-60`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Category */}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-purple-600 rounded-full text-xs">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <FaCalendar className="text-[#371445]" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaClock className="text-[#371445]" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#371445] line-clamp-2 my-3 group-hover:text-[#371445]/80 transition">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-3">
                    {post.description}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <FaUser className="text-[#371445]" />
                      <span>{post.author}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#371445] font-medium text-sm group-hover:gap-3 transition">
                      <span>Read More</span>
                      <FaArrowRight />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}
