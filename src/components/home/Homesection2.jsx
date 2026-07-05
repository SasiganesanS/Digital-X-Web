import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import { ArrowUpRight, Sparkles } from "lucide-react";

const fadeSlide = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

function ProjectPreview({ project }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        variants={fadeSlide}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[36px] border border-white/15 bg-white/5 bg-clip-padding shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl"
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1800ms] ease-out hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent" />
        </div>

        <div className="relative z-10 grid gap-8 p-8 sm:p-10 lg:p-12">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-[#E8192C] shadow-[0_0_20px_rgba(232,25,44,0.08)]">
              <Sparkles className="w-3 h-3" />
              {project.tags}
            </div>
            <div>
              <h3 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
                {project.title}
              </h3>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
                {project.description}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.results.slice(0, 3).map((result) => (
              <div key={result.id} className="rounded-[28px] border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-sm uppercase tracking-[0.32em] text-white/50">{result.metric}</p>
                <p className="mt-4 text-sm leading-6 text-white/70">{result.text}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {project.services.slice(0, 4).map((service, index) => (
              <span key={index} className="rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/80">
                {service}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">Featured case study</p>
              <p className="mt-2 text-xl font-black text-white sm:text-2xl">{project.title}</p>
            </div>
            <Link
              to={`/project/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#E8192C] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.25em] text-white shadow-[0_20px_50px_rgba(232,25,44,0.24)] transition-all duration-300 hover:-translate-y-0.5"
            >
              View Case Study
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectNavItem({ project, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-[28px] border p-5 text-left transition-all duration-300 ${
        active
          ? "border-[#E8192C] bg-[#1d0a10]/70 shadow-[0_20px_60px_rgba(232,25,44,0.18)]"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
      }`}
    >
      <span className={`absolute inset-y-0 left-0 w-1 rounded-r-full ${active ? "bg-[#E8192C]" : "bg-transparent"}`} />
      <div className="relative z-10">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#E8192C]">Project {String(project.id).padStart(2, "0")}</p>
        <h4 className="mt-4 text-lg font-extrabold text-white">{project.title}</h4>
        <p className="mt-3 text-sm leading-6 text-white/65">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.services.slice(0, 2).map((service, index) => (
            <span key={index} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-white/70">
              {service}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

export default function FeaturedWorks() {
  const featuredProjects = projects.slice(0, 4);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = featuredProjects[activeIndex] || featuredProjects[0];

  return (
    <section id="projects" className="relative overflow-hidden bg-[#040404] text-white py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-16 h-72 w-72 rounded-full bg-[#E8192C]/10 blur-[110px]" />
        <div className="absolute right-0 bottom-16 h-80 w-80 rounded-full bg-[#E8192C]/12 blur-[140px]" />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-6 sm:px-8 lg:px-12">
        <div className="mb-12 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#E8192C]/20 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.34em] text-[#E8192C] shadow-[0_0_20px_rgba(232,25,44,0.12)]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E8192C] animate-pulse" />
            Featured Works
          </div>
          <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Spotlight your best work with a story-driven selector.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
                A curated collection of our most compelling cases. Use the selector to explore the top work, or view the full portfolio if you want every project.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold uppercase tracking-[0.24em] text-white transition hover:bg-white/15"
            >
              View all projects
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.5fr_0.9fr] xl:gap-10">
          <div>
            <ProjectPreview project={activeProject} />
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-[#0c0c0c] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
              <p className="text-sm uppercase tracking-[0.34em] text-[#E8192C]">Choose a case study</p>
              <p className="mt-4 text-2xl font-black text-white">Tap any project to preview its story.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <ProjectNavItem
                  key={project.id}
                  project={project}
                  active={index === activeIndex}
                  onSelect={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
