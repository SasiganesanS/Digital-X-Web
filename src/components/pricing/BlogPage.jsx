import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
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
            className="bg-[#371445] text-white px-4 py-2 rounded text-sm sm:text-base"
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
    if (!title) return "from-[#003d8f] via-[#004aad]/90 to-transparent";
    const lower = title.toLowerCase();
    if (lower.includes("general portfolio"))
      return "from-[#003d8f] via-[#004aad]/90 to-transparent";
    if (lower.includes("premium and advanced"))
      return "from-[#001f3f] via-[#003366]/90 to-transparent";
    if (lower.includes("jkk tex"))
      return "from-[#661e19] via-[#a05252]/90 to-transparent";
    if (lower.includes("thilaga impex"))
      return "from-[#7a1c1c] via-[#a83232]/90 to-transparent";
    return "from-[#003d8f] via-[#004aad]/90 to-transparent";
  };

  const gradientClass = getGradient(post.title || post.name);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative dark-section w-full h-[100vh] md:h-[105vh] flex items-center justify-start overflow-hidden md:pl-20">
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
        <section className="w-full flex items-center justify-center bg-white px-4 sm:px-8 md:px-20 py-12 sm:py-20 md:py-32 blog-overview-4k">
          <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 blog-overview-grid-4k">
            {/* LEFT TEXT */}
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              <h2 className="text-xl sm:text-3xl md:text-4xl  font-bold text-[#371445] blog-headline ">
                {overview.headline || "Client Overview"}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed blog-paragraph">
                {overview.paragraph}
              </p>

              {overview.features && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm sm:text-base blog-paragraph">
                    {featuresLeft.map((f, i) => (
                      <li key={i}>{i + 1}. {f}</li>
                    ))}
                  </ol>
                  <ol start={featuresLeft.length + 1} className="list-decimal list-inside text-gray-700 space-y-2 text-sm sm:text-base blog-paragraph">
                    {featuresRight.map((f, i) => (
                      <li key={i}>{i + featuresLeft.length + 1}. {f}</li>
                    ))}
                  </ol>
                </div>
              )}

              {overview.caseStudy && (
                <a
                  href={overview.caseStudy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border border-[#371445] text-[#371445] hover:bg-[#371445] px-4 py-2 rounded-md text-sm sm:text-base hover:text-white transition-all view-work-4k"
                  style={{ justifyContent: 'space-between', minWidth: 0 }}
                >
                  <span>View Work</span>
                  <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                    <ArrowUpRight className="w-4 h-4 view-work-icon-4k" />
                  </span>
                </a>
              )}
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center md:justify-end">
              <img
                src={overview.image || heroImage || DEFAULT_CLIENT_IMAGE}
                alt={overview.headline || post.title || post.name}
                className="rounded-xl shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl object-cover blog-image"
              />
            </div>
          </div>
        </section>
      ) : null}

      {/* VALUE ADDITION */}
      {post.valueAddition && post.valueAddition.length > 0 && (
        <section className="w-full bg-white px-4 sm:px-8 md:px-20 pb-20 md:pb-32 blog-value-section-4k">
          <div className="max-w-7xl mx-auto blog-value-container-4k">
            <h2 className="text-2xl text-[#371445] sm:text-3xl md:text-4xl font-bold mb-10 blog-headline">
              Value Addition
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
              {post.valueAddition.map((item, i) => (
                <div
                  key={item.id || i}
                  className="flex items-start gap-4 bg-white p-5 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-all blog-value-card"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#553067] text-white flex items-center justify-center text-xs sm:text-sm font-semibold">
                    {item.id}
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed blog-paragraph">
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
