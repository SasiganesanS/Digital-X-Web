import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { blogPosts, clientData } from "../../constants";
import "../MainBlog.css";

const DEFAULT_CLIENT_IMAGE =
  "https://via.placeholder.com/1200x675?text=Client+Image";

const BlogPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

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
      <section className="py-20 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-3xl font-bold mb-4">
            No blog post selected
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            Please select a blog from the Projects page.
          </p>
          <button
            className="bg-[#E8192C] text-white px-6 py-3 rounded-full text-sm sm:text-base font-bold hover:bg-[#ff2235] transition-colors"
            onClick={() => navigate("/projects")}
          >
            Back to Projects
          </button>
        </div>
      </section>
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

  const getGradient = (title) => {
    if (!title) return "from-[#080808] via-[#080808]/80 to-transparent";
    const lower = title.toLowerCase();
    if (lower.includes("jkk tex"))
      return "from-[#4a0a0a] via-[#080808]/90 to-transparent";
    if (lower.includes("tipy"))
      return "from-[#4a0a0a] via-[#080808]/90 to-transparent";
    return "from-[#4a0a0a] via-[#080808]/90 to-transparent";
  };

  const gradientClass = getGradient(post.title || post.name);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative dark-section w-full h-[100vh] md:h-[105vh] flex items-center justify-start overflow-hidden md:pl-20">
        
        {/* Universal Back Button */}
        <div className="absolute top-6 md:top-8 left-4 md:left-20 z-50">
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2 px-5 py-2.5 bg-black/50 backdrop-blur-md text-white/80 hover:text-white rounded-full border border-white/10 hover:border-[#E8192C]/50 transition-all group shadow-xl"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase">Back to Projects</span>
          </button>
        </div>

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${heroImage || DEFAULT_CLIENT_IMAGE}')`,
          }}
        ></div>

        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradientClass}`}
        ></div>

        <div className="relative z-10 px-4 sm:px-8 md:px-16 max-w-4xl text-center md:text-left text-white blog-hero-left">
          <p className="text-[10px] sm:text-xs md:text-sm mb-4 opacity-90 blog-texts">
            Blog / {post.title || post.name}
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold mb-6 blog-hero">
            {post.title || post.name}
          </h1>

          <p className="text-sm sm:text-lg md:text-xl max-w-xl blog-desc">
            {post.description ||
              "Discover how we built impactful digital solutions for our clients."}
          </p>
        </div>

      </section>

      {/* OVERVIEW SECTION */}
      {overview ? (
        <section className="w-full flex items-center justify-center bg-[#080808] px-4 sm:px-8 md:px-20 py-12 sm:py-20 md:py-32 border-t border-white/5">
          <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {/* LEFT TEXT */}
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C] animate-pulse" />
                <span className="text-[#E8192C] text-xs font-bold tracking-[0.2em] uppercase">Overview</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                {overview.headline || "Client Overview"}
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed">
                {overview.paragraph}
              </p>

              {overview.features && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <ul className="space-y-3">
                    {featuresLeft.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E8192C]/10 border border-[#E8192C]/25 text-[#E8192C] text-[10px] font-black flex items-center justify-center mt-0.5">{i + 1}</span>
                        <span className="text-white/50 text-sm md:text-base leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-3">
                    {featuresRight.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E8192C]/10 border border-[#E8192C]/25 text-[#E8192C] text-[10px] font-black flex items-center justify-center mt-0.5">{i + featuresLeft.length + 1}</span>
                        <span className="text-white/50 text-sm md:text-base leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {overview.caseStudy && (
                <div className="pt-6">
                  <a
                    href={overview.caseStudy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#E8192C] text-white px-8 py-4 rounded-full font-bold hover:bg-[#ff2235] transition-all duration-300 group"
                  >
                    <span>View Live Project</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              )}
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center md:justify-end">
              <div className="relative group">
                <img
                  src={overview.image || heroImage || DEFAULT_CLIENT_IMAGE}
                  alt={overview.headline || post.title || post.name}
                  className="relative rounded-2xl shadow-2xl border border-white/5 w-full max-w-md sm:max-w-lg md:max-w-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* VALUE ADDITION */}
      {post.valueAddition && post.valueAddition.length > 0 && (
        <section className="w-full bg-[#080808] px-4 sm:px-8 md:px-20 pb-20 md:pb-32 border-t border-white/5">
          <div className="max-w-7xl mx-auto pt-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C] animate-pulse" />
              <span className="text-[#E8192C] text-xs font-bold tracking-[0.2em] uppercase">Impact</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-16">
              Value <span className="text-[#E8192C]">Addition</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
              {post.valueAddition.map((item, i) => (
                <div
                  key={item.id || i}
                  className="group flex items-start gap-6 bg-white/[0.02] p-8 rounded-3xl border border-white/5 hover:border-[#E8192C]/30 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-full bg-[#E8192C]/10 text-[#E8192C] flex items-center justify-center text-lg font-black shrink-0 border border-[#E8192C]/20 group-hover:bg-[#E8192C] group-hover:text-white transition-all duration-300 italic">
                    {item.id}
                  </div>
                  <p className="text-white/60 text-base md:text-lg leading-relaxed group-hover:text-white/90 transition-colors">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogPage;
