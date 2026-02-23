// home.zip/home/Homesection2.jsx
//
// REASONING FOR CHANGES:
// 1.  RE-FRAMED: Changed "Latest insights" to "What We Do" and
//     "Stop Patching Problems. Start Building Solutions." This is clear,
//     scannable, and motivating. It speaks directly to user pain points.
// 2.  REWRITTEN CONTENT: Replaced the confusing mix of content with three
//     clear, scannable service pillars that solve specific problems.
// 3.  IMPLEMENTED LIQUID GLASS: This is the primary glassmorphism showcase.
//     The background images are now blurred *behind* the glass cards.
//     The text sits on the glass card, creating that "Apple" depth effect.
// 4.  REMOVED CAROUSEL: A carousel is the wrong UI here. Users need to
//     scan all your services at once. I've used a clear 3-column grid,
//     which is far better for scannability and clarity.
//
import React from 'react';
import web from "../../assets/web.jpeg";
import app from "../../assets/germany.jpeg"; // Re-using image, rename as needed
import security from "../../assets/sus.jpeg"; // Re-using image, rename as needed

// Service data organized for clarity
const services = [
  {
    title: "Web & App Development",
    description: "We build high-performance web and mobile apps that streamline your operations and deliver a seamless user experience.",
    problem: "Is your outdated software holding you back?",
    image: web
  },
  {
    title: "Digital Marketing",
    description: "Our data-driven SEO and marketing campaigns find your target audience and turn them into loyal customers.",
    problem: "Are you invisible to your online customers?",
    image: app
  },
  {
    title: "IT Security & Solutions",
    description: "We implement proactive IT security to safeguard your data, protect your reputation, and ensure compliance.",
    problem: "Worried about data breaches and digital threats?",
    image: security
  }
];

const Homesection2 = () => {
  return (
    <section id="services" className="w-full py-16 md:py-24 bg-white relative overflow-hidden">
      {/* BACKGROUND BLOBS */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-200 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

      <div className="max-w-[1280px] w-[90%] mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#301045] sm:text-4xl mb-4">
            Stop Patching Problems. Start Building Solutions.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We help you overcome key business challenges with technology that
            delivers real results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-[450px]">
                {/* 1. The Background Image */}
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div> {/* Dark overlay for readability */}

                {/* 2. The Liquid Glass Card */}
                <div className="absolute bottom-4 left-4 right-4 p-5
                                bg-white/30 backdrop-blur-lg 
                                rounded-2xl border border-white/20 
                                shadow-lg"
                >
                  <p className="text-sm font-semibold text-white/90 [text-shadow:_0_1px_1px_rgb(0_0_0_/_30%)]">
                    {service.problem}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-white my-2 [text-shadow:_0_1px_2px_rgb(0_0_0_/_50%)]">
                    {service.title}
                  </h3>
                  <p className="text-base text-white/90 [text-shadow:_0_1px_1px_rgb(0_0_0_/_30%)]">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Homesection2;