import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import "./serviceCard.css";

// Import service images

import webImg from "../../assets/services-img/web.jpeg";

import mobileImg from "../../assets/services-img/mobile.jpeg";

import cloudImg from "../../assets/services-img/cloud.jpeg";

import uiImg from "../../assets/services-img/ui.jpeg";

// Service data with images

const servicesData = [
  {
    id: "web-dev",

    title: "Web Development",

    category: "Development",

    description:
      "We create responsive, scalable web applications using modern technologies and best practices. Our team specializes in React, Node.js, and cloud-native solutions.",

    image: webImg,

    featured: true,
  },

  {
    id: "mobile-apps",

    title: "Mobile Apps",

    category: "Development",

    description:
      "Native and cross-platform mobile solutions for iOS and Android. We build beautiful, performant apps that users love.",

    image: mobileImg,
  },

  {
    id: "cloud",

    title: "Cloud Solutions",

    category: "Infrastructure",

    description:
      "Scalable cloud infrastructure and deployment services. We help you leverage AWS, Azure, and GCP for optimal performance.",

    image: cloudImg,
  },

  {
    id: "uiux",

    title: "UI/UX Design",

    category: "Design",

    description:
      "Beautiful, intuitive interfaces that users love. We focus on user-centered design principles and modern aesthetics.",

    image: uiImg,
  },
];

// Service Card Component

const ServiceCardItem = ({ service, onClick }) => {
  return (
    <motion.div
      className="card cursor-pointer"
      layoutId={`card-container-${service.id}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="card-content-container">
        <motion.div
          className="card-content"
          layoutId={`card-content-${service.id}`}
        >
          <motion.div
            className="card-image-container relative overflow-hidden"
            layoutId={`card-image-${service.id}`}
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />

            {/* Dark overlay for better text readability */}

            <div className="absolute inset-0 bg-black/20"></div>

            {/* Decorative lines for featured card */}

            {service.featured && (
              <div className="absolute top-8 right-8 space-y-2 opacity-30 z-10">
                <div className="w-16 h-0.5 bg-white"></div>

                <div className="w-16 h-0.5 bg-white"></div>

                <div className="w-16 h-0.5 bg-white"></div>
              </div>
            )}
          </motion.div>

          <motion.div
            className="title-container"
            layoutId={`title-container-${service.id}`}
          >
            <span className="category uppercase text-sm md:text-base lg:text-lg text-white/70">
              {service.category}
            </span>

            <h2 className="text-2xl md:text-[28px] lg:text-[32px] font-bold text-white">
              {service.title}
            </h2>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Expanded Item Component

const ExpandedItem = ({ service, onClose }) => {
  const content = (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        style={{ pointerEvents: "auto" }}
        className="overlay"
        onClick={onClose}
      />

      <div className="card-content-container open">
        <motion.div
          className="card-content"
          layoutId={`card-container-${service.id}`}
        >
          <motion.div
            className="card-image-container relative overflow-hidden"
            layoutId={`card-image-${service.id}`}
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-[400px] md:h-[400px] object-cover"
            />

            {/* Dark overlay for better text readability */}

            <div className="absolute inset-0 bg-black/20"></div>

            {/* Decorative lines for featured card */}

            {service.featured && (
              <div className="absolute top-8 right-8 space-y-2 opacity-30 z-10">
                <div className="w-16 h-0.5 bg-white"></div>

                <div className="w-16 h-0.5 bg-white"></div>

                <div className="w-16 h-0.5 bg-white"></div>
              </div>
            )}
          </motion.div>

          <motion.div
            className="title-container"
            layoutId={`title-container-${service.id}`}
          >
            <span className="category uppercase text-sm md:text-base lg:text-lg text-white/70">
              {service.category}
            </span>

            <h2 className="text-2xl md:text-[28px] lg:text-[32px] font-bold text-white">
              {service.title}
            </h2>
          </motion.div>

          <motion.div className="content-container" animate>
            <p className="text-sm md:text-[15px] lg:text-base text-white leading-relaxed mb-4">
              {service.description}
            </p>

            <p className="text-sm md:text-[15px] lg:text-base text-white/80 leading-relaxed mb-4">
              Our team brings years of experience and expertise to deliver
              exceptional results.
            </p>

            <p className="text-sm md:text-[15px] lg:text-base text-white/80 leading-relaxed mb-4">
              From initial consultation to final delivery and ongoing support,
              we're committed.
            </p>

            <p className="text-sm md:text-[15px] lg:text-base text-white/80 leading-relaxed">
              Whether you're a startup looking to build your first product or an
              enterprise.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );

  return ReactDOM.createPortal(content, document.body);
};

// Main Component

export default function ServiceCard() {
  const [selectedId, setSelectedId] = useState(null);

  const selectedService = servicesData.find((s) => s.id === selectedId);

  const sectionRef = React.useRef(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-4 md:py-20 lg:py-32 bg-[#fff] min-h-screen flex items-center"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 w-full">
          {/* Left Column - Text Content */}

          <motion.div
            className="lg:col-span-1 flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#371445] mb-2 md:mb-4 lg:mb-6">
              Our services
            </h2>

            <p className="text-sm md:text-[15px] lg:text-base text-[#5F5F5F] leading-relaxed mb-3 md:mb-6 lg:mb-8">
              We focus on the data that is really important for making each of
              our decisions, constantly testing, configuring and optimizing
              processes.
            </p>

            <Link to="/services">
              <motion.button
                className="group relative inline-flex items-center justify-center gap-2 bg-[#371445]/90 backdrop-blur-sm border border-[#fff] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-light text-sm sm:text-base overflow-hidden transition-all duration-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/50 w-auto max-w-fit"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                  Learn more
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Right Column - Service Cards Grid */}

          <div className="lg:col-span-2">
            <ul className="card-list">
              {servicesData.map((service) => (
                <ServiceCardItem
                  key={service.id}
                  service={service}
                  onClick={() => {
                    setSelectedId(service.id);
                  }}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Render expanded card via portal at body level */}
      <AnimatePresence>
        {selectedId && selectedService && (
          <ExpandedItem
            service={selectedService}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
