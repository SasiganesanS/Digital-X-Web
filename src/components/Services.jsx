import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Terminal,
  Smartphone,
  ShieldCheck,
  BarChart3,
  Leaf,
  Zap,
  ArrowRight
} from "lucide-react";

const Services = () => {
  return (
    <div className="bg-[#080808] min-h-screen text-white pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative px-[5%] pt-12 pb-10 md:pt-16 md:pb-12 overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#E8192C]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#E8192C]/3 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center border border-white/10 gap-2 px-3 py-1.5 bg-white/5 rounded-full mb-6">
              <Zap className="w-4 h-4 text-[#E8192C]" />
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Our Services</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
              Transforming Brands into <br />
              <span className="text-[#E8192C]">Digital Authority</span>
            </h1>

            <p className="text-white/50 text-xl md:text-2xl leading-relaxed max-w-3xl">
              Comprehensive branding, media, and performance marketing solutions designed to help your business grow strategically, creatively, and profitably.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid — Minimalist Icon Matrix */}
      <section className="relative px-[5%] py-10 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12 md:gap-x-16">
            {[
              {
                icon: <Code2 className="w-8 h-8" />,
                title: "Web Development",
                desc: "We craft fast, responsive, and visually refined websites that strengthen brand presence and deliver seamless experiences across all devices."
              },
              {
                icon: <Terminal className="w-8 h-8" />,
                title: "Software Development",
                desc: "We design and build reliable, scalable software solutions tailored to business needs, enabling efficiency, performance, and long-term growth."
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "App Development",
                desc: "We develop high-performance mobile applications that combine intuitive design with robust functionality across Android and iOS platforms."
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Cyber Security",
                desc: "We secure digital ecosystems through advanced security architectures, continuous monitoring, and proactive risk management to safeguard data and build trust."
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Digital Marketing",
                desc: "We deliver data-driven digital marketing strategies that enhance brand visibility, engage audiences, and drive measurable business results."
              },
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "Sustainability",
                desc: "We integrate smart technologies and sustainable practices to support responsible growth while reducing environmental impact and creating lasting value."
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                {/* Visual Accent on Hover */}
                <div className="absolute -inset-4 bg-white/[0.02] rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none scale-95 group-hover:scale-100" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 transition-all duration-500 group-hover:bg-[#E8192C]/10 group-hover:border-[#E8192C]/40 group-hover:scale-110 group-hover:rotate-6">
                    <div className="text-white/40 group-hover:text-[#E8192C] transition-colors duration-500">
                      {service.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#E8192C] transition-colors duration-300 flex items-center gap-3">
                    {service.title}
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>

                  <p className="text-white/50 text-base leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-[5%] py-12 md:py-16 pb-20">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] bg-gradient-to-r from-[#E8192C] to-[#b71422] p-8 md:p-12 text-center relative overflow-hidden shadow-[0_0_50px_rgba(232,25,44,0.15)]"
          >
            {/* Particles/Grain Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <h2 className="text-2xl md:text-3xl font-black text-white mb-6 relative z-10 leading-tight">
              See the Impact <br className="hidden md:block" />
              We've Delivered
            </h2>

            <Link
              to="/projects"
              className="inline-flex items-center justify-center bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95 relative z-10 shadow-2xl"
            >
              View Our Portfolio
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
