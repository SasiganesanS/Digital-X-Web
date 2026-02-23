import React from "react";
import {
  Users,
  Wrench,
  Sparkles,
  Shield,
  Zap,
  TrendingUp,
  Eye,
  Target,
  Flame,
  CheckCircle2,
  Award
} from "lucide-react";
// import logoLight from "../../assets/py.jpg"
import pyLogo from "../../assets/py.png";
import { motion, AnimatePresence } from "framer-motion";
import Homesection3 from "../home/Homesection3";
import { useState, useEffect } from "react";

const About = () => {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);
  const values = [
    { icon: Award, title: "Excellence", desc: "Uncompromising quality in every project" },
    { icon: Users, title: "Collaboration", desc: "Working together for success" },
    { icon: Target, title: "Innovation", desc: "Pioneering cutting-edge solutions" },
  ];
  const phrases = [
    "We Build Fast Apps",
    "We Create Secure Systems",
    "We Deliver Great Experiences",
    "We Transform Ideas Into Products",
  ];
  const orbit1 = [
    { icon: TrendingUp, label: "Growth Focused" },
    { icon: Shield, label: "Secure & Reliable" },
  ];

  const orbit2 = [
    { icon: Sparkles, label: "Innovative" },
    { icon: Users, label: "Client Centric" },
  ];

  return (
    <div className="min-h-screen bg-white ">
      {/* Hero Section */}
      <div className="relative pt-20 pb-12 min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-purple-50/20">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #7B2D9E 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>

        <div className="relative w-[90%] max-w-[1280px] 2xl:max-w-[1920px] 3xl:max-w-[2560px] 4xl:max-w-[3440px] mx-auto z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 2xl:gap-28 3xl:gap-32 4xl:gap-40 items-center">
            {/* Left Content */}
            <div className="text-center md:text-left space-y-6 2xl:space-y-8 3xl:space-y-10 4xl:space-y-12">
              {/* Badge */}
              <div className="inline-flex items-center border border-[#371445]/90 gap-2 px-3 py-1.5 2xl:px-4 2xl:py-2 3xl:px-5 3xl:py-2.5 4xl:px-6 4xl:py-3 bg-[#FFFFFF] rounded-full mt-10">
                <Zap className="w-4 h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7 text-[#4a1c5e]" />
                <span className="text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl font-semibold text-[#4a1c5e]">
                  Innovating Since Day One
                </span>
              </div>

              {/* Main Heading */}
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl 4xl:text-[120px] font-bold text-[#371445] tracking-tight leading-[1.1] mb-4">
                  About{" "}
                  <span className="bg-gradient-to-br from-[#4a1c5e] via-[#371445] to-[#4a1c5e] bg-clip-text text-transparent">
                    Praskla
                  </span>
                  <br />
                  Technology
                </h1>
                <div className="h-1 2xl:h-1.5 3xl:h-2 4xl:h-2.5 w-20 2xl:w-24 3xl:w-28 4xl:w-32 bg-gradient-to-r from-[#7B2D9E] to-purple-400 rounded-full mx-auto lg:mx-0 mb-4"></div>
              </div>

              {/* Description */}
              <div className="space-y-4 2xl:space-y-5 3xl:space-y-6 4xl:space-y-8">
                <p className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl text-[#371445] font-light">
                  Where Innovation Meets Implementation
                </p>
                <p className="text-base sm:text-lg lg:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl text-gray-700 leading-relaxed max-w-xl lg:max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl mx-auto lg:mx-0">
                  A leading technology solutions provider specializing in{" "}
                  <span className="font-semibold text-[#371445]">digital transformation</span>,{" "}
                  <span className="font-semibold text-[#371445]">enterprise software</span>, and{" "}
                  <span className="font-semibold text-[#371445]">innovative platforms</span> that drive business growth.
                </p>
              </div>

              {/* Key Points */}
              <div
                className="hidden md:block space-y-2 2xl:space-y-3 3xl:space-y-4 4xl:space-y-5 max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl mx-auto lg:mx-0 
                [@media_(min-width:1022px)_and_(max-width:1025px)]:hidden
                [@media_(min-width:767px)_and_(max-width:769px)]:hidden"
              >
                {[
                  "Enterprise-grade solutions tailored to your needs",
                  "Proven track record across multiple industries",
                  "Dedicated team of certified professionals",
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-left">
                    <CheckCircle2 className="w-5 h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7 4xl:w-8 4xl:h-8 text-[#7B2D9E] flex-shrink-0 mt-0.5" />
                    <span className="text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Professional Stats Grid */}
            <div className="relative space-y-6 2xl:space-y-8 3xl:space-y-10 4xl:space-y-12 md:mt-10">
              {/* Main Stats Carousel */}
              <div
                className="bg-[#371445] rounded-2xl 2xl:rounded-3xl 3xl:rounded-4xl 4xl:rounded-5xl p-8 md:p-10 lg:p-12 2xl:p-16 3xl:p-20 4xl:p-24 shadow-md border border-gray-100
               [@media_(min-width:370px)_and_(max-width:376px)]:hidden
               [@media_(min-width:319px)_and_(max-width:321px)]:hidden
               [@media_(min-width:424px)_and_(max-width:426px)]:hidden"
              >
                {/* Floating Sparkles */}
                <motion.div className="absolute inset-0 pointer-events-none overflow-hidden" initial={false}>
                  {/* Twinkling dots scattered across the card */}
                  {[
                    { x: '12%', y: '18%', delay: 0, size: 3 },
                    { x: '88%', y: '22%', delay: 0.3, size: 2.5 },
                    { x: '22%', y: '68%', delay: 0.6, size: 3.5 },
                    { x: '78%', y: '72%', delay: 0.9, size: 2.5 },
                    { x: '48%', y: '12%', delay: 1.2, size: 3 },
                    { x: '65%', y: '88%', delay: 1.5, size: 2.5 },
                    { x: '8%', y: '42%', delay: 1.8, size: 3 },
                    { x: '92%', y: '58%', delay: 2.1, size: 2.5 },
                    { x: '35%', y: '35%', delay: 2.4, size: 2.5 },
                    { x: '70%', y: '45%', delay: 2.7, size: 3 },
                    { x: '18%', y: '82%', delay: 3, size: 2.5 },
                    { x: '82%', y: '8%', delay: 3.3, size: 3 },
                    { x: '28%', y: '50%', delay: 3.6, size: 2.5 },
                    { x: '58%', y: '28%', delay: 3.9, size: 3 },
                    { x: '42%', y: '78%', delay: 4.2, size: 2.5 },
                    { x: '15%', y: '60%', delay: 4.5, size: 3 },
                    { x: '85%', y: '40%', delay: 4.8, size: 2.5 },
                    { x: '52%', y: '55%', delay: 5.1, size: 3.5 },
                    { x: '25%', y: '25%', delay: 5.4, size: 2.5 },
                    { x: '75%', y: '15%', delay: 5.7, size: 3 },
                    { x: '38%', y: '92%', delay: 6, size: 2.5 },
                    { x: '68%', y: '62%', delay: 6.3, size: 3 },
                    { x: '5%', y: '28%', delay: 6.6, size: 2.5 },
                    { x: '95%', y: '75%', delay: 6.9, size: 3 },
                  ].map((pos, i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-white rounded-full shadow-lg"
                      style={{
                        left: pos.x,
                        top: pos.y,
                        width: `${pos.size}px`,
                        height: `${pos.size}px`,
                        boxShadow: "0 0 10px rgba(255,255,255,0.9)",
                      }}
                      animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [0.8, 1.3, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: pos.delay,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Logo */}
                <div className="mx-auto mb-4 2xl:mb-6 3xl:mb-8 4xl:mb-10 flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <div className="bg-white w-25 h-25 2xl:w-32 2xl:h-32 3xl:w-40 3xl:h-40 4xl:w-48 4xl:h-48 rounded-full flex items-center justify-center">
                      
                        <img
                        src={pyLogo}
                        alt="Praskla Technology"
                        className="w-20 h-20 object-contain"
                      />
                      
                    </div>
                  </motion.div>
                </div>
                {/* Cycling Text */}
                <div className="relative flex items-center justify-center min-h-[32px] 2xl:min-h-[40px] 3xl:min-h-[48px] 4xl:min-h-[64px] mb-3 2xl:mb-4 3xl:mb-6 4xl:mb-8">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl text-white text-center"
                    >
                      {phrases[index]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Indicators */}
                <div className="flex gap-2 justify-center mt-2 2xl:mt-3 3xl:mt-4 4xl:mt-6">
                  {phrases.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 2xl:h-1.5 3xl:h-2 4xl:h-2.5 rounded-full transition-all duration-300 ${idx === index ? "w-6 2xl:w-8 3xl:w-10 4xl:w-12 bg-[#7B2D9E]" : "w-3 2xl:w-4 3xl:w-5 4xl:w-6 bg-gray-300"}`}
                    ></div>
                  ))}
                </div>
              </div>
              {/* Core Values Grid */}
              <div className="hidden md:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 2xl:gap-10 3xl:gap-12 4xl:gap-14">
                {values.map((value, idx) => {
                  const Icon = value.icon
                  return (
                    <div
                      key={idx}
                      className={`bg-white rounded-xl 2xl:rounded-2xl 3xl:rounded-3xl 4xl:rounded-4xl p-4 2xl:p-6 3xl:p-8 4xl:p-10 shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all text-center
                        [@media_(min-width:767px)_and_(max-width:769px)]:hidden
                         ${idx === 2 ? "md:col-span-2 md:justify-self-center lg:col-span-1" : ""}`}
                    >
                      <div className="w-12 h-12 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 4xl:w-20 4xl:h-20 mx-auto mb-3 2xl:mb-4 3xl:mb-5 4xl:mb-6 bg-gradient-to-br from-[#7B2D9E]/10 to-purple-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8 4xl:w-10 4xl:h-10 text-[#7B2D9E]" />
                      </div>

                      <h4 className="text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl font-semibold text-[#371445] mb-1">
                        {value.title}
                      </h4>
                      <p className="text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg text-gray-600 leading-tight">
                        {value.desc}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Who We Are */}
      <div className="relative bg-white py-12 sm:py-16 md:py-12 lg:py-14 2xl:py-20 3xl:py-24 4xl:py-32 -mt-0 md:-mt-5">
        <div className="w-[90%] max-w-[1280px] 2xl:max-w-[1920px] 3xl:max-w-[2560px] 4xl:max-w-[3440px] mx-auto mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 2xl:gap-20 3xl:gap-24 4xl:gap-32 items-center">
            {/* Text Side */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center border border-[#371445]/90 gap-2 px-3 py-1.5 2xl:px-4 2xl:py-2 3xl:px-5 3xl:py-2.5 4xl:px-6 4xl:py-3 bg-[#FFFFFF] rounded-full mb-6 2xl:mb-8 3xl:mb-10 4xl:mb-12">
                <Users className="w-4 h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7 text-[#4a1c5e]" />
                <span className="text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl font-semibold text-[#4a1c5e]">
                  Who We Are
                </span>
              </div>

              <h2 className="text-2xl xs:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl 3xl:text-7xl 4xl:text-8xl font-bold text-[#371445] mb-6 lg:mb-8 2xl:mb-10 3xl:mb-12 4xl:mb-14 leading-tight">
                A dynamic force in technology innovation
              </h2>

              <p className="text-base sm:text-lg lg:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl text-gray-600 leading-relaxed mb-6 lg:mb-8 2xl:mb-10 3xl:mb-12 4xl:mb-14">
                Praskla Technology is a dynamic and forward-thinking IT solutions company committed to delivering
                cutting-edge software solutions, digital marketing services, and IT security expertise.
              </p>

              <p className="text-base sm:text-lg lg:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl text-gray-600 leading-relaxed">
                We specialize in helping businesses enhance their digital presence and operational efficiency through
                innovative technology and strategic marketing.
              </p>
            </div>

            {/* Floating Badge (Visible on mobile) */}
            <div className="inline-flex items-center gap-2 px-4 py-2 2xl:px-5 2xl:py-2.5 3xl:px-6 3xl:py-3 4xl:px-8 4xl:py-4 bg-white/80 backdrop-blur-sm rounded-full border border-[#7B2D9E]/20 shadow-lg mx-auto mt-20 sm:mt-32 md:mt-40 lg:hidden">
              <Flame className="w-4 h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7 text-[#7B2D9E]" />
              <span className="text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl font-semibold text-[#7B2D9E]">
                Our Core Value
              </span>
            </div>

            {/* Orbit Animation */}
            <div className="order-1 lg:order-2 relative flex items-center justify-center -mt-2">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative bg-[#371445]
                rounded-[3rem] 2xl:rounded-[4rem] 3xl:rounded-[5rem] 4xl:rounded-[6rem] p-8 sm:p-10 md:p-12 lg:p-14 2xl:p-20 3xl:p-24 4xl:p-32 aspect-square flex items-center justify-center
                overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.4)] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 2xl:max-w-2xl 3xl:max-w-4xl 4xl:max-w-5xl"
              >
                <motion.div className="absolute inset-0 pointer-events-none" initial={false}>
                  {[
 { x: '15%', y: '20%', delay: 0, size: 3 },
                    { x: '85%', y: '25%', delay: 0.4, size: 2.5 },
                    { x: '25%', y: '70%', delay: 0.8, size: 3.5 },
                    { x: '75%', y: '75%', delay: 1.2, size: 2.5 },
                    { x: '50%', y: '15%', delay: 1.6, size: 3 },
                    { x: '10%', y: '50%', delay: 2, size: 2.5 },
                    { x: '90%', y: '60%', delay: 2.4, size: 3 },
                    { x: '40%', y: '35%', delay: 2.8, size: 2.5 },
                    { x: '60%', y: '85%', delay: 3.2, size: 3 },
                    { x: '20%', y: '45%', delay: 3.6, size: 2.5 },
                    { x: '80%', y: '40%', delay: 4, size: 3 },
                    { x: '35%', y: '90%', delay: 4.4, size: 2.5 },
                  ].map((pos, i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-white rounded-full shadow-lg"
                      style={{
                        left: pos.x,
                        top: pos.y,
                        width: `${pos.size}px`,
                        height: `${pos.size}px`,
                        boxShadow: "0 0 10px rgba(255,255,255,0.9)",
                      }}
                      animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [0.8, 1.3, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: pos.delay,
                      }}
                    />
                  ))}
                </motion.div>
                {/* Outer Orbit */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 30,
                    ease: "linear",
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {orbit1.map(({ icon: Icon, label }, i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        transform: `rotate(${i * 180}deg) translateY(-130px) rotate(-${i * 180}deg)`,
                      }}
                    >
                      <motion.div
                        className="bg-white/10 backdrop-blur-lg rounded-2xl 2xl:rounded-3xl 3xl:rounded-4xl 4xl:rounded-5xl p-4 sm:p-6 2xl:p-8 3xl:p-10 4xl:p-12 border border-white/20"
                        whileHover={{ scale: 1.15 }}
                      >
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10 2xl:w-12 2xl:h-12 3xl:w-14 3xl:h-14 4xl:w-16 4xl:h-16 text-white" />
                        <p className="text-white/90 text-xs sm:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl font-medium text-center mt-2 2xl:mt-3 3xl:mt-4 4xl:mt-5">
                          {label}
                        </p>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>

                {/* Inner Orbit */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 34,
                    ease: "linear",
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {orbit2.map(({ icon: Icon, label }, i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        transform: `rotate(${i * 180 + 90}deg) translateY(-90px) rotate(-${i * 180 + 90}deg)`,
                      }}
                    >
                      <motion.div
                        className="bg-white/10 backdrop-blur-lg rounded-2xl 2xl:rounded-3xl 3xl:rounded-4xl 4xl:rounded-5xl p-4 sm:p-6 2xl:p-8 3xl:p-10 4xl:p-12 border border-white/20"
                        whileHover={{ scale: 1.15 }}
                      >
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10 2xl:w-12 2xl:h-12 3xl:w-14 3xl:h-14 4xl:w-16 4xl:h-16 text-white" />
                        <p className="text-white/90 text-xs sm:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl font-medium text-center mt-2 2xl:mt-3 3xl:mt-4 4xl:mt-5">
                          {label}
                        </p>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>

                {/* Center Orb */}
                <motion.div
                  className="relative z-10 flex flex-col items-center text-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-24 sm:w-28 md:w-32 2xl:w-40 3xl:w-48 4xl:w-56 h-24 sm:h-28 md:h-32 2xl:h-40 3xl:h-48 4xl:h-56 rounded-full bg-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.4)]">
                    <span className="text-white font-semibold text-base sm:text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl tracking-wide">
                      PRASKLA
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Homesection3 />

      {/* Vision & Mission Section */}
      <div className="relative bg-white py-24 2xl:py-32 3xl:py-40 4xl:py-48">
        <div className="w-[90%] max-w-[1280px] 2xl:max-w-[1920px] 3xl:max-w-[2560px] 4xl:max-w-[3440px] mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16 2xl:mb-20 3xl:mb-24 4xl:mb-32">
            <div className="inline-flex items-center border border-[#371445]/90 gap-2 px-3 py-1.5 2xl:px-4 2xl:py-2 3xl:px-5 3xl:py-2.5 4xl:px-6 4xl:py-3 bg-[#FFFFFF] rounded-full mb-6 2xl:mb-8 3xl:mb-10 4xl:mb-12">
              <Sparkles className="w-4 h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7 text-[#4a1c5e]" />
              <span className="text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl font-semibold text-[#4a1c5e]">
                Our Purpose
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl 2xl:text-6xl 3xl:text-7xl 4xl:text-8xl font-bold bg-gradient-to-br from-[#371445] via-[#4a1c5e] to-[#2a0e34] bg-clip-text text-transparent mb-3 2xl:mb-4 3xl:mb-6 4xl:mb-8 tracking-tight">
              Vision & Mission
            </h2>

            <div className="h-1 2xl:h-1.5 3xl:h-2 4xl:h-2.5 w-24 2xl:w-28 3xl:w-32 4xl:w-36 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto" />
          </div>

          {/* Cards Container */}
          <div className="space-y-8 2xl:space-y-10 3xl:space-y-12 4xl:space-y-16">
            {/* Vision Card */}
            <div className="group relative">
              <div className="relative bg-gradient-to-bl from-pink-50/50 to-white rounded-3xl 2xl:rounded-4xl 3xl:rounded-5xl 4xl:rounded-6xl border-2 border-pink-100 overflow-hidden hover:border-purple-300 hover:shadow-2xl transition-all duration-500">
                <div className="relative flex flex-col lg:flex-row items-center">
                  {/* Left Content Section */}
                  <div className="flex-1 p-10 md:p-14 lg:pr-8 2xl:p-16 3xl:p-20 4xl:p-24">
                    <div className="mb-6 2xl:mb-8 3xl:mb-10 4xl:mb-12">
                      <div className="inline-flex items-center gap-3 mb-4 2xl:mb-5 3xl:mb-6 4xl:mb-8">
                        <div className="w-14 h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 4xl:w-24 4xl:h-24 rounded-2xl 2xl:rounded-3xl 3xl:rounded-4xl 4xl:rounded-5xl bg-[#4a1c5e] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                          <Eye
                            className="w-7 h-7 2xl:w-8 2xl:h-8 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12 text-white"
                            strokeWidth={2.5}
                          />
                        </div>
                        <h3 className="text-3xl md:text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl font-bold text-[#371445]">
                          Powered by a Vision
                        </h3>
                      </div>
                      <div className="h-1 2xl:h-1.5 3xl:h-2 4xl:h-2.5 w-20 2xl:w-24 3xl:w-28 4xl:w-32 bg-gradient-to-r from-[#7B2D9E] to-purple-400 rounded-full" />
                    </div>

                    <p className="text-gray-700 text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl leading-relaxed">
                      To be a leading industry pioneer in software solutions and digital marketing within the next two
                      years by delivering high-quality, innovative, and reliable technology services. We are committed
                      to adopting sustainable green practices while empowering businesses with cutting-edge solutions
                      that enhance their digital presence. Our goal is to establish ourselves as a trusted partner,
                      ensuring long-term success for our clients and stakeholders through excellence, commitment, and
                      environmental responsibility.
                    </p>
                  </div>

                  {/* Right Decorative Section */}
                  <div className="relative lg:w-[300px] 2xl:w-[400px] 3xl:w-[500px] 4xl:w-[600px] h-72 lg:h-auto lg:aspect-square p-8 lg:p-12 2xl:p-14 3xl:p-16 4xl:p-20">
                    <div className="absolute inset-8 lg:inset-12 2xl:inset-14 3xl:inset-16 4xl:inset-20">
                      <div className="absolute inset-0 rounded-full border-2 border-purple-300/40 animate-[spin_25s_linear_infinite]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 2xl:w-4 2xl:h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6 rounded-full bg-[#2a0e34]" />
                      </div>
                      <div className="absolute inset-6 rounded-full border-2 border-purple-200/40 animate-[spin_18s_linear_infinite_reverse]">
                        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 2xl:w-3 2xl:h-3 3xl:w-4 3xl:h-4 4xl:w-5 4xl:h-5 rounded-full bg-[#2a0e34]" />
                      </div>
                      <div className="absolute inset-12 rounded-full border border-purple-100/40 animate-[spin_12s_linear_infinite]" />

                      {/* Center Orb */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-2xl animate-[pulse_3s_ease-in-out_infinite]" />
                          <div className="relative w-24 h-24 2xl:w-32 2xl:h-32 3xl:w-40 3xl:h-40 4xl:w-48 4xl:h-56 rounded-full bg-[#2a0e34] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-700">
                            <Eye
                              className="w-12 h-12 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 4xl:w-20 4xl:h-20 text-white"
                              strokeWidth={2}
                            />
                          </div>
                          <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 2xl:w-3 2xl:h-3 3xl:w-4 3xl:h-4 4xl:w-5 4xl:h-5 rounded-full bg-[#2a0e34]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group relative">
              <div className="relative bg-gradient-to-bl from-pink-50/50 to-white rounded-3xl 2xl:rounded-4xl 3xl:rounded-5xl 4xl:rounded-6xl border-2 border-pink-100 overflow-hidden hover:border-pink-300 hover:shadow-2xl transition-all duration-500">
                <div className="relative flex flex-col lg:flex-row-reverse items-center">
                  {/* Right Content Section */}
                  <div className="flex-1 p-10 md:p-14 lg:pl-8 2xl:p-16 3xl:p-20 4xl:p-24">
                    <div className="mb-6 2xl:mb-8 3xl:mb-10 4xl:mb-12">
                      <div className="inline-flex items-center gap-3 mb-4 2xl:mb-5 3xl:mb-6 4xl:mb-8">
                        <div className="w-14 h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 4xl:w-24 4xl:h-24 rounded-2xl 2xl:rounded-3xl 3xl:rounded-4xl 4xl:rounded-5xl bg-[#4a1c5e] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                          <Target
                            className="w-7 h-7 2xl:w-8 2xl:h-8 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12 text-white"
                            strokeWidth={2.5}
                          />
                        </div>
                        <h3 className="text-3xl md:text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl font-bold text-[#371445]">
                          Driven by a Mission
                        </h3>
                      </div>
                      <div className="h-1 2xl:h-1.5 3xl:h-2 4xl:h-2.5 w-20 2xl:w-24 3xl:w-28 4xl:w-32 bg-gradient-to-r from-[#7B2D9E] to-purple-400 rounded-full" />
                    </div>

                    <p className="text-gray-700 text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl leading-relaxed">
                      At Praskla Technology, our mission is to provide high-quality software solutions and result-driven
                      digital marketing strategies that drive efficiency, innovation, and growth for businesses. We are
                      dedicated to delivering value-driven technology that benefits all stakeholders while integrating
                      sustainable green practices to reduce our environmental footprint. By continuously improving,
                      prioritizing customer satisfaction, and helping our clients reach their consumers effectively, we
                      aim to set new industry standards and build lasting relationships.
                    </p>
                  </div>

                  {/* Left Decorative Section */}
                  <div className="relative lg:w-[300px] 2xl:w-[400px] 3xl:w-[500px] 4xl:w-[600px] h-72 lg:h-auto lg:aspect-square p-8 lg:p-12 2xl:p-14 3xl:p-16 4xl:p-20">
                    <div className="absolute inset-8 lg:inset-12 2xl:inset-14 3xl:inset-16 4xl:inset-20">
                      <div className="absolute inset-0 rounded-full border-2 border-pink-300/40 animate-[spin_22s_linear_infinite_reverse]">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 2xl:w-4 2xl:h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6 rounded-full bg-[#2a0e34]" />
                      </div>
                      <div className="absolute inset-6 rounded-full border-2 border-pink-200/40 animate-[spin_16s_linear_infinite]">
                        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 2xl:w-3 2xl:h-3 3xl:w-4 3xl:h-4 4xl:w-5 4xl:h-5 rounded-full  bg-[#2a0e34]" />
                      </div>
                      <div className="absolute inset-12 rounded-full border border-pink-100/40 animate-[spin_10s_linear_infinite_reverse]" />

                      {/* Center Orb */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div
                            className="absolute inset-0 bg-pink-400/20 rounded-full blur-2xl animate-[pulse_3s_ease-in-out_infinite]"
                            style={{ animationDelay: "1s" }}
                          />
                          <div className="relative w-24 h-24 2xl:w-32 2xl:h-32 3xl:w-40 3xl:h-40 4xl:w-48 4xl:h-56 rounded-full bg-[#4a1c5e] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-700">
                            <Target
                              className="w-12 h-12 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 4xl:w-20 4xl:h-20 text-white"
                              strokeWidth={2}
                            />
                          </div>
                          <div className="absolute inset-0 animate-[spin_7s_linear_infinite_reverse]">
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 2xl:w-3 2xl:h-3 3xl:w-4 3xl:h-4 4xl:w-5 4xl:h-5 rounded-full  bg-[#2a0e34]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Our Expertise */}
      <div className="relative bg-white py-20 2xl:py-28 3xl:py-36 4xl:py-44">
        <div className="w-[90%] max-w-[1280px] 2xl:max-w-[1920px] 3xl:max-w-[2560px] 4xl:max-w-[3440px] mx-auto">
          <div className="text-center mb-12 2xl:mb-16 3xl:mb-20 4xl:mb-24">
            <div className="inline-flex items-center border border-[#371445]/90 gap-2 px-3 py-1.5 2xl:px-4 2xl:py-2 3xl:px-5 3xl:py-2.5 4xl:px-6 4xl:py-3 bg-[#FFFFFF] rounded-full mb-6 2xl:mb-8 3xl:mb-10 4xl:mb-12">
              <Wrench className="w-4 h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7 text-[#4a1c5e]" />
              <span className="text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl font-semibold text-[#4a1c5e]">
                Our Purpose
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl font-bold text-[#371445] mb-4 2xl:mb-6 3xl:mb-8 4xl:mb-10">
              What we bring to the table
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 2xl:gap-8 3xl:gap-10 4xl:gap-12">
            <div className="group relative bg-gradient-to-br from-white to-purple-50/30 rounded-3xl 2xl:rounded-4xl 3xl:rounded-5xl 4xl:rounded-6xl p-8 2xl:p-10 3xl:p-12 4xl:p-16 border border-gray-200 hover:border-[#371445]/30 transition-all duration-300 hover:shadow-2xl">
              <div className="absolute top-6 right-6 text-6xl 2xl:text-7xl 3xl:text-8xl 4xl:text-9xl font-bold text-[#371445]/5">
                01
              </div>
              <div className="relative mb-6 2xl:mb-8 3xl:mb-10 4xl:mb-12">
                <div className="w-14 h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 4xl:w-24 4xl:h-24 bg-gradient-to-br from-[#371445] via-[#4a1c5e] to-[purple] rounded-2xl 2xl:rounded-3xl 3xl:rounded-4xl 4xl:rounded-5xl flex items-center justify-center text-white mb-4 2xl:mb-5 3xl:mb-6 4xl:mb-8">
                  <svg
                    className="w-7 h-7 2xl:w-8 2xl:h-8 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-bold text-[#371445] mb-3 2xl:mb-4 3xl:mb-5 4xl:mb-6">
                  Software Solutions
                </h3>
                <p className="text-gray-600 2xl:text-lg 3xl:text-xl 4xl:text-2xl leading-relaxed">
                  High-quality mobile app development and website development that ensure seamless user experiences.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-white to-purple-50/30 rounded-3xl 2xl:rounded-4xl 3xl:rounded-5xl 4xl:rounded-6xl p-8 2xl:p-10 3xl:p-12 4xl:p-16 border border-gray-200 hover:border-[#371445]/30 transition-all duration-300 hover:shadow-2xl md:mt-8">
              <div className="absolute top-6 right-6 text-6xl 2xl:text-7xl 3xl:text-8xl 4xl:text-9xl font-bold text-[#371445]/5">
                02
              </div>
              <div className="relative mb-6 2xl:mb-8 3xl:mb-10 4xl:mb-12">
                <div className="w-14 h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 4xl:w-24 4xl:h-24 bg-gradient-to-br from-[#371445] via-[#4a1c5e] to-[purple] rounded-2xl 2xl:rounded-3xl 3xl:rounded-4xl 4xl:rounded-5xl flex items-center justify-center text-white mb-4 2xl:mb-5 3xl:mb-6 4xl:mb-8">
                  <svg
                    className="w-7 h-7 2xl:w-8 2xl:h-8 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-bold text-[#371445] mb-3 2xl:mb-4 3xl:mb-5 4xl:mb-6">
                  Digital Marketing
                </h3>
                <p className="text-gray-600 2xl:text-lg 3xl:text-xl 4xl:text-2xl leading-relaxed">
                  Strategic online marketing solutions, including SEO and social media management.
                </p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-white to-purple-50/30 rounded-3xl 2xl:rounded-4xl 3xl:rounded-5xl 4xl:rounded-6xl p-8 2xl:p-10 3xl:p-12 4xl:p-16 border border-gray-200 hover:border-[#371445]/30 transition-all duration-300 hover:shadow-2xl md:mt-16">
              <div className="absolute top-6 right-6 text-6xl 2xl:text-7xl 3xl:text-8xl 4xl:text-9xl font-bold text-[#371445]/5">
                03
              </div>
              <div className="relative mb-6 2xl:mb-8 3xl:mb-10 4xl:mb-12">
                <div className="w-14 h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 4xl:w-24 4xl:h-24 bg-gradient-to-br from-[#371445] via-[#4a1c5e] to-[purple] rounded-2xl 2xl:rounded-3xl 3xl:rounded-4xl 4xl:rounded-5xl flex items-center justify-center text-white mb-4 2xl:mb-5 3xl:mb-6 4xl:mb-8">
                  <Shield className="w-7 h-7 2xl:w-8 2xl:h-8 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12" />
                </div>
                <h3 className="text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-bold text-[#371445] mb-3 2xl:mb-4 3xl:mb-5 4xl:mb-6">
                  IT Security Solutions
                </h3>
                <p className="text-gray-600 2xl:text-lg 3xl:text-xl 4xl:text-2xl leading-relaxed">
                  Advanced security services to safeguard businesses from cyber threats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;