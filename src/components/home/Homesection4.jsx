import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code2, Terminal, Smartphone, ShieldCheck, BarChart3, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

import ourServicesImg from "../../assets/services-img/our services.png";

const Homesection4 = () => {
  const servicesData = [
    {
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
      title: "SEO",
      desc: "SEO helps improve the website’s visibility in search engines."
    },
    {
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80",
      title: "SSM",
      desc: "SSM (Social Media Management) is used to manage and grow social media presence."
    },
    {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
      title: "ADS",
      desc: "ADS include platforms like Google, Facebook, and Instagram for promotions."
    },
    {
      image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=400&q=80",
      title: "Content Marketing",
      desc: "Content marketing involves creating and sharing valuable content like videos and blogs."
    },
    {
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80",
      title: "Email Marketing",
      desc: "Email marketing is used to communicate offers, updates, and build customer relationships."
    },
    {
      image: "https://images.unsplash.com/photo-1507238692062-810ceecf79bd?auto=format&fit=crop&w=400&q=80",
      title: "Website Design",
      desc: "Website design focuses on creating user-friendly and effective UI/UX websites."
    },
    {
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=400&q=80",
      title: "ORM",
      desc: "ORM (Online Reputation Management) helps in managing brand ratings, reviews, and customer feedback."
    },
    {
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=400&q=80",
      title: "Influencer Marketing",
      desc: "Influencer marketing is used to promote the brand through popular personalities."
    },
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
      title: "Analytics & Reporting",
      desc: "Analytics and reporting help track performance and improve strategies."
    },
    {
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80",
      title: "E-commerce Marketing",
      desc: "E-commerce marketing focuses on promoting online stores and increasing sales."
    }
  ];

  return (
    <>
      {/* ── Our Services Section (Split Layout) ── */}
      <section
        id="services"
        className="relative w-full h-[100vh] flex flex-col justify-center overflow-hidden"
        style={{ background: "#080808", zIndex: 1 }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ background: "radial-gradient(circle, rgba(232,25,44,0.05) 0%, transparent 65%)" }}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start text-left"
            >
              <div className="inline-flex items-center border border-white/10 gap-2 px-4 py-1.5 bg-[#E8192C]/10 rounded-full mb-8 shadow-[0_0_15px_rgba(232,25,44,0.2)]">
                <div className="w-2 h-2 rounded-full bg-[#E8192C] shadow-[0_0_8px_rgba(232,25,44,0.8)]" />
                <span className="text-xs font-bold text-white uppercase tracking-[0.2em] ml-1">Our Services</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-8 leading-[1.05] tracking-tight text-white">
                Transforming Brands into <br />
                <span className="text-[#E8192C]">Digital Authority</span>
              </h1>

              <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-xl font-medium mb-10">
                Comprehensive branding, media, and performance marketing solutions designed to help your business grow strategically, creatively, and profitably.
              </p>

              <Link to="/services">
                <button className="px-8 py-4 bg-gradient-to-r from-[#E8192C] to-red-800 text-white rounded-full font-bold hover:scale-105 transition-all shadow-[0_10px_30px_rgba(232,25,44,0.2)]">
                  Explore All Services
                </button>
              </Link>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group hidden lg:block"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#E8192C]/20 to-transparent mix-blend-overlay z-10" />
                <img
                  src={ourServicesImg}
                  alt="Digital Strategy"
                  className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#E8192C]/20 blur-[60px] rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Our Core Expertise section removed ── */}
    </>
  );
};

export default Homesection4;