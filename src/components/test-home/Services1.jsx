import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Services.css";
// import "../serviceCard-reveal/serviceCard.css"

// Service data
const servicesData = [
  {
    id: "web-dev",
    title: "Web Development",
    category: "Development",
    description: "We create responsive, scalable web applications using modern technologies and best practices. Our team specializes in React, Node.js, and cloud-native solutions.",
    gradient: "from-purple-600 to-blue-600",
    featured: true
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    category: "Development",
    description: "Native and cross-platform mobile solutions for iOS and Android. We build beautiful, performant apps that users love.",
    gradient: "from-pink-500 to-rose-600"
  },
  {
    id: "cloud",
    title: "Cloud Solutions",
    category: "Infrastructure",
    description: "Scalable cloud infrastructure and deployment services. We help you leverage AWS, Azure, and GCP for optimal performance.",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    category: "Design",
    description: "Beautiful, intuitive interfaces that users love. We focus on user-centered design principles and modern aesthetics.",
    gradient: "from-orange-500 to-red-600"
  }
];

/*
  Service Card - Collapsed State
*/
const ServiceCard = ({ service, onClick }) => {
  return (
    <motion.li 
      className="relative cursor-pointer"
      layoutId={`card-container-${service.id}`}
      onClick={onClick}
    >
      <motion.div 
        className="relative overflow-hidden rounded-3xl border-2 border-gray-900 min-h-[280px]"
        layoutId={`card-content-${service.id}`}
      >
        {/* Gradient Background */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`}
          layoutId={`card-image-${service.id}`}
        />
        
        {/* Content */}
        <div className="relative z-10 p-8 h-full flex flex-col justify-end">
          <motion.div layoutId={`title-container-${service.id}`}>
            <span className="text-white/70 text-sm font-medium uppercase tracking-wider">
              {service.category}
            </span>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mt-2">
              {service.title}
            </h3>
          </motion.div>
        </div>

        {/* Decorative elements for featured card */}
        {service.featured && (
          <>
            <div className="absolute top-8 right-8 w-32 h-32 bg-white/20 rounded-full" />
            <div className="absolute top-12 right-24 space-y-2">
              <div className="w-16 h-0.5 bg-white/40"></div>
              <div className="w-16 h-0.5 bg-white/40"></div>
              <div className="w-16 h-0.5 bg-white/40"></div>
            </div>
          </>
        )}
      </motion.div>
    </motion.li>
  );
};

/*
  Expanded Service View - iOS App Store Style
*/
const ExpandedService = ({ service, onClose }) => {
  return (
    <div className="fixed inset-0" style={{ zIndex: 99999 }} onClick={onClose}>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/80"
      />

      {/* Expanded Card Container - Centered in viewport */}
      <div className="absolute inset-0 overflow-y-auto flex items-center justify-center p-4">
        <motion.div 
          className="relative w-full max-w-4xl bg-[#1c1c1e] rounded-3xl overflow-hidden shadow-2xl"
          layoutId={`card-container-${service.id}`}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hero Image Section - Full Width at Top */}
          <motion.div 
            className="relative w-full h-[420px] overflow-hidden"
            layoutId={`card-image-${service.id}`}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`} />
            
            {/* Title Overlay on Image */}
            <div className="absolute inset-0 flex items-end p-8 lg:p-12">
              <motion.div layoutId={`title-container-${service.id}`}>
                <span className="text-white/90 text-xs lg:text-sm font-semibold uppercase tracking-wider">
                  {service.category}
                </span>
                <h2 className="text-3xl lg:text-5xl font-bold text-white mt-2">
                  {service.title}
                </h2>
              </motion.div>
            </div>
          </motion.div>

          {/* Scrollable Content Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="bg-[#1c1c1e] px-8 lg:px-12 py-8 lg:py-12"
          >
            <div className="space-y-6 text-gray-300">
              <p className="text-lg lg:text-xl leading-relaxed text-gray-200">
                {service.description}
              </p>
              
              <div className="space-y-4 text-base lg:text-lg leading-relaxed">
                <p>
                  Our team brings years of experience and expertise to deliver exceptional results. 
                  We work closely with clients to understand their unique needs and create tailored 
                  solutions that drive real business value.
                </p>
                
                <p>
                  From initial consultation to final delivery and ongoing support, we're committed 
                  to your success every step of the way. Our proven methodologies and cutting-edge 
                  technologies ensure that your project is delivered on time and exceeds expectations.
                </p>
                
                <p>
                  We believe in transparent communication and collaborative partnerships. Let's work 
                  together to bring your vision to life and achieve remarkable results that make a 
                  lasting impact on your business.
                </p>

                <p>
                  Whether you're a startup looking to build your first product or an enterprise 
                  seeking to modernize your infrastructure, we have the expertise and dedication 
                  to help you succeed in today's competitive digital landscape.
                </p>
              </div>

              <div className="pt-8 pb-4">
                <button 
                  onClick={onClose}
                  className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

/*
  Services section with iOS App Store-like expansion
*/
function Services() {
  const [selectedId, setSelectedId] = useState(null);
  const selectedService = servicesData.find(s => s.id === selectedId);

  return (
    <>
      <section
        id="services"
        className="py-20 lg:py-32 bg-[#f5f0eb] relative overflow-hidden"
      >
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='0.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Text Content */}
            <motion.div
              className="lg:col-span-1 flex flex-col justify-start"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Our services
              </h2>
              <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-8">
                We focus on the data that is really important for making each of our decisions, constantly testing, configuring and optimizing processes.
              </p>
              <motion.button
                className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-[#371445] transition-colors duration-300 self-start"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn more
              </motion.button>
            </motion.div>

            {/* Right Column - Service Cards Grid */}
            <ul className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 list-none">
              {servicesData.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  onClick={() => setSelectedId(service.id)}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Expanded Service Modal */}
      <AnimatePresence>
        {selectedId && selectedService && (
          <ExpandedService 
            service={selectedService} 
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Services;
