import React from "react";
function About() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0418] via-[#1a0b2e] to-[#2d1b3d] overflow-hidden py-10 md:py-20 px-4">
      <div className="relative max-w-7xl mx-auto">
        {/* Mobile View - Single Card (visible only on mobile) */}
        <div className="block lg:hidden">
          <div className="w-full max-w-md mx-auto">
            <div className="relative bg-white rounded-3xl shadow-2xl transition-transform duration-500 hover:-translate-y-2">
              <div className="p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1a0b2e] mb-3">About Us</h1>
                <h5 className="text-sm sm:text-base text-[#371445] leading-relaxed mb-4">
                  Empowering Businesses through Collaborative Digital Excellence.
                </h5>
                <p className="text-xs sm:text-sm text-[#1a0b2e] leading-relaxed mb-6">
                  Praskla is an agency that's forward-thinking, believing in the transformative power of collaboration. We offer full-service IT consulting, digital marketing, and software development services. Our team is passionate about digging into business challenges more profoundly and crafting innovative solutions for success; we believe collaboration unlocks new possibilities and delivers remarkable outcomes.
                </p>
                <div className="text-center bg-gradient-to-br from-[#0f0418] via-[#1a0b2e] to-[#2d1b3d] rounded-2xl shadow-md p-6 hover:shadow-xl transition">
                  <div className="mb-6">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">50+</h2>
                    <div className="w-12 h-1 bg-purple-600 mx-auto my-3 rounded-full"></div>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Certified full-time professionals
                    </p>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">30+</h2>
                    <div className="w-12 h-1 bg-purple-600 mx-auto my-3 rounded-full"></div>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Successful projects delivered
                    </p>
                  </div>

                  <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">4+</h2>
                    <div className="w-12 h-1 bg-purple-600 mx-auto my-3 rounded-full"></div>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Years of collaboration & innovation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop/Tablet View - Two Tilted Cards (hidden on mobile) */}
        <div className="hidden lg:block h-[900px]">
          {/* Large Background Card 1 - Left Tilted (Purple) */}
          <div className="absolute top-[300px] left-[6%] w-[500px] xl:w-[720px] h-[850px] z-10">
            <div className="relative bg-white rounded-3xl shadow-2xl transform rotate-[18deg] h-full transition-transform duration-500 hover:-translate-y-5">
              <div className="p-8 xl:p-10">
                <h1 className="text-2xl xl:text-3xl font-bold text-[#1a0b2e] mb-4">About Us</h1>
                <h5 className="text-sm xl:text-base text-[#371445] leading-relaxed mb-4">
                  Empowering Businesses through Collaborative Digital Excellence.
                </h5>
                <p className="text-xs xl:text-sm text-[#1a0b2e] leading-relaxed">
                  Praskla is an agency that's forward-thinking, believing in the transformative power of collaboration. We offer full-service IT consulting, digital marketing, and software development services. Our team is passionate about digging into business challenges more profoundly and crafting innovative solutions for success; we believe collaboration unlocks new possibilities and delivers remarkable outcomes.
                </p>
                <div className="text-center mt-10 bg-gradient-to-br from-[#0f0418] via-[#1a0b2e] to-[#2d1b3d] rounded-2xl shadow-md p-6 xl:p-8 hover:shadow-xl transition">
                  <h2 className="text-3xl xl:text-4xl font-extrabold text-white">50+</h2>
                  <div className="w-12 h-1 bg-purple-600 mx-auto my-3 rounded-full"></div>
                  <p className="text-xs xl:text-sm text-gray-400">
                    Certified full-time professionals
                  </p>

                  <h2 className="text-3xl xl:text-4xl font-extrabold text-white mt-6">30+</h2>
                  <div className="w-12 h-1 bg-purple-600 mx-auto my-3 rounded-full"></div>
                  <p className="text-xs xl:text-sm text-gray-400">
                    Successful projects delivered
                  </p>

                  <h2 className="text-3xl xl:text-4xl font-extrabold text-white mt-6">4+</h2>
                  <div className="w-12 h-1 bg-purple-600 mx-auto my-3 rounded-full"></div>
                  <p className="text-xs xl:text-sm text-gray-400">
                    Years of collaboration & innovation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Large Background Card 2 - Right Tilted (Blue/White) */}
          <div className="absolute top-[80px] right-[1%] w-[450px] xl:w-[550px] h-[850px] z-5">
            <div className="relative bg-white rounded-3xl shadow-2xl transform -rotate-[20deg] h-full transition-transform duration-500 hover:-translate-y-5">
              <div className="p-8 xl:p-10">
                <h1 className="text-2xl xl:text-3xl font-bold text-[#1a0b2e] mb-4">About Us</h1>
                <h5 className="text-sm xl:text-base text-[#371445] leading-relaxed mb-4">
                  Empowering Businesses through Collaborative Digital Excellence.
                </h5>
                <p className="text-xs xl:text-sm text-[#1a0b2e] leading-relaxed">
                  Praskla is an agency that's forward-thinking, believing in the transformative power of collaboration. We offer full-service IT consulting, digital marketing, and software development services. Our team is passionate about digging into business challenges more profoundly and crafting innovative solutions for success; we believe collaboration unlocks new possibilities and delivers remarkable outcomes.
                </p>
                <div className="text-center mt-10 bg-gradient-to-br from-[#0f0418] via-[#1a0b2e] to-[#2d1b3d] rounded-2xl shadow-md p-6 xl:p-8 hover:shadow-xl transition">
                  <h2 className="text-3xl xl:text-4xl font-extrabold text-white">50+</h2>
                  <div className="w-12 h-1 bg-purple-600 mx-auto my-3 rounded-full"></div>
                  <p className="text-xs xl:text-sm text-gray-400">
                    Certified full-time professionals
                  </p>

                  <h2 className="text-3xl xl:text-4xl font-extrabold text-white mt-6">30+</h2>
                  <div className="w-12 h-1 bg-purple-600 mx-auto my-3 rounded-full"></div>
                  <p className="text-xs xl:text-sm text-gray-400">
                    Successful projects delivered
                  </p>

                  <h2 className="text-3xl xl:text-4xl font-extrabold text-white mt-6">4+</h2>
                  <div className="w-12 h-1 bg-purple-600 mx-auto my-3 rounded-full"></div>
                  <p className="text-xs xl:text-sm text-gray-400">
                    Years of collaboration & innovation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;