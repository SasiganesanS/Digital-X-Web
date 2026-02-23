import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

const DEFAULT_IMAGE = "https://via.placeholder.com/1200x675?text=Project+Image";

const ProjectCaseStudy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // Try to get project from location state first, then from URL param
  let project = location.state?.project;
  if (!project && id) {
    project = projects.find((p) => p.id === parseInt(id));
  }

  const handleBackClick = () => {
    // Navigate back to homepage
    navigate("/", {
      state: { scrollToProjects: true },
      replace: false,
    });
  };

  if (!project) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Project not found
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            The project you're looking for doesn't exist.
          </p>
          <button
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            onClick={handleBackClick}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </section>
    );
  }

  const getGradient = (title) => {
    if (!title) return "from-gray-900/80 via-gray-800/60 to-transparent";
    const lower = title.toLowerCase();
    if (lower.includes("honeybee"))
      return "from-blue-900/80 via-blue-800/60 to-transparent";
    if (lower.includes("skillbridge"))
      return "from-purple-900/80 via-purple-800/60 to-transparent";
    if (lower.includes("tipy"))
      return "from-indigo-900/80 via-indigo-800/60 to-transparent";
    return "from-gray-900/80 via-gray-800/60 to-transparent";
  };

  const gradientClass = getGradient(project.title);
  const heroImage = project.heroImage || project.image || DEFAULT_IMAGE;

  return (
    <div className="bg-white">
      {/* Back Button */}
      <div className="fixed top-24 left-8 z-50">
        <button
          onClick={handleBackClick}
          className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full shadow-lg hover:bg-white transition-all border border-gray-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* === HERO SECTION === */}
      <motion.section
        className="relative w-full h-screen flex items-center justify-center dark-section overflow-hidden bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-sm md:text-base font-medium tracking-wider uppercase mb-6 opacity-90">
              Case Study
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {project.title}
            </h1>
            <p className="text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto opacity-95">
              {project.description ||
                "Discover how we built this impactful digital solution."}
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </motion.section>

      {/* === PROJECT OVERVIEW SECTION === */}
      {project.overview && (
        <section className="w-full min-h-screen flex items-center justify-center bg-white py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: Text Content */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <div>
                  <h2 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">
                    Overview
                  </h2>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    {project.overview.headline || "The Challenge"}
                  </h3>
                </div>

                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  {project.overview.paragraph}
                </p>

                {project.overview.challenges && (
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-gray-900">
                      Key Challenges
                    </h4>
                    <ul className="space-y-3">
                      {project.overview.challenges.map((challenge, i) => (
                        <li
                          key={`challenge-${i}`}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-base md:text-lg">
                            {challenge}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.overview.solutions && (
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-gray-900">
                      Our Approach
                    </h4>
                    <ul className="space-y-3">
                      {project.overview.solutions.map((solution, i) => (
                        <li
                          key={`solution-${i}`}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold mt-0.5">
                            ✓
                          </span>
                          <span className="text-base md:text-lg">
                            {solution}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.overview.liveLink && (
                  <a
                    href={project.overview.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    View Live Project
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                )}
              </motion.div>

              {/* Right: Image */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={project.overview.image || heroImage}
                    alt={project.overview.headline || project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* === KEY FEATURES SECTION === */}
      {project.features && project.features.length > 0 && (
        <section className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">
                  Features
                </h2>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                  Key Capabilities
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {project.features.map((feature, i) => (
                  <motion.div
                    key={feature.id || i}
                    className="bg-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    {feature.icon && (
                      <div className="w-14 h-14 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold text-xl mb-6">
                        {feature.icon}
                      </div>
                    )}
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* === RESULTS & IMPACT SECTION === */}
      {project.results && project.results.length > 0 && (
        <section className="w-full min-h-screen flex items-center justify-center bg-white py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">
                  Impact
                </h2>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                  Measurable Results
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.results.map((item, i) => (
                  <motion.div
                    key={item.id || i}
                    className="relative bg-gradient-to-br from-gray-50 to-white p-8 md:p-10 rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gray-900/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

                    {item.metric && (
                      <motion.p
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 + 0.2 }}
                      >
                        {item.metric}
                      </motion.p>
                    )}
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* === TECH STACK SECTION === */}
      {project.techStack && project.techStack.length > 0 && (
        <section className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">
                  Technologies
                </h2>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Built With Modern Tools
                </h3>
                <p className="text-gray-600 text-lg">
                  Leveraging industry-leading technologies to deliver
                  exceptional results
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {project.techStack.map((tech, i) => (
                  <motion.div
                    key={i}
                    className="bg-white px-6 py-3 rounded-lg font-medium text-gray-900 border border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all duration-300 cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ y: -2 }}
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectCaseStudy;
