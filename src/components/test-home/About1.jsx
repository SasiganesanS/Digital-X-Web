import React from "react";
function About() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden py-10 md:py-20 px-4">
      <div className="relative max-w-7xl mx-auto">
        {/* Mobile View - Single Card (visible only on mobile) */}
        <div className="block lg:hidden">
          <div className="w-full max-w-md mx-auto">
            <div className="relative bg-white rounded-3xl shadow-xl border border-neutral-200 p-6 sm:p-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-3">About Us</h1>
              <h5 className="text-sm sm:text-base text-[#555555] leading-relaxed mb-4">
                Empowering Businesses through Collaborative Digital Excellence.
              </h5>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6">
                Praskla is an agency that's forward-thinking, believing in the transformative power of collaboration. We offer full-service IT consulting, digital marketing, and software development services. Our team is passionate about digging into business challenges more profoundly and crafting innovative solutions for success; we believe collaboration unlocks new possibilities and delivers remarkable outcomes.
              </p>
              <div className="text-center bg-[#111111] rounded-2xl shadow-md p-6">
                <div className="mb-6">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white">10+</h2>
                  <div className="w-12 h-1 bg-[#FF2B2B] mx-auto my-3 rounded-full"></div>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Projects Delivered
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white">8+</h2>
                  <div className="w-12 h-1 bg-[#FF2B2B] mx-auto my-3 rounded-full"></div>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Brands
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white">1.5+</h2>
                  <div className="w-12 h-1 bg-[#FF2B2B] mx-auto my-3 rounded-full"></div>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Years of Experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop/Tablet View - Two Tilted Cards (hidden on mobile) */}
        <div className="hidden lg:block h-[900px]">
          {/* Large Background Card 1 - Left Tilted */}
          <div className="absolute top-[300px] left-[6%] w-[500px] xl:w-[720px] h-[850px] z-10">
            <div className="relative bg-white rounded-3xl shadow-xl border border-neutral-200 transform rotate-[18deg] h-full p-8 xl:p-10">
              <h1 className="text-2xl xl:text-3xl font-bold text-[#111111] mb-4">About Us</h1>
              <h5 className="text-sm xl:text-base text-[#555555] leading-relaxed mb-4">
                Empowering Businesses through Collaborative Digital Excellence.
              </h5>
              <p className="text-xs xl:text-sm text-[#555555] leading-relaxed">
                Praskla is an agency that's forward-thinking, believing in the transformative power of collaboration. We offer full-service IT consulting, digital marketing, and software development services. Our team is passionate about digging into business challenges more profoundly and crafting innovative solutions for success; we believe collaboration unlocks new possibilities and delivers remarkable outcomes.
              </p>
              <div className="text-center mt-10 bg-[#111111] rounded-2xl shadow-md p-6 xl:p-8">
                <h2 className="text-3xl xl:text-4xl font-extrabold text-white">10+</h2>
                <div className="w-12 h-1 bg-[#FF2B2B] mx-auto my-3 rounded-full"></div>
                <p className="text-xs xl:text-sm text-gray-400">
                  Projects Delivered
                </p>

                <h2 className="text-3xl xl:text-4xl font-extrabold text-white mt-6">8+</h2>
                <div className="w-12 h-1 bg-[#FF2B2B] mx-auto my-3 rounded-full"></div>
                <p className="text-xs xl:text-sm text-gray-400">
                  Brands
                </p>

                <h2 className="text-3xl xl:text-4xl font-extrabold text-white mt-6">1.5+</h2>
                <div className="w-12 h-1 bg-[#FF2B2B] mx-auto my-3 rounded-full"></div>
                <p className="text-xs xl:text-sm text-gray-400">
                  Years of Experience
                </p>
              </div>
            </div>
          </div>

          {/* Large Background Card 2 - Right Tilted */}
          <div className="absolute top-[80px] right-[1%] w-[450px] xl:w-[550px] h-[850px] z-5">
            <div className="relative bg-white rounded-3xl shadow-xl border border-neutral-200 transform -rotate-[20deg] h-full p-8 xl:p-10">
              <h1 className="text-2xl xl:text-3xl font-bold text-[#111111] mb-4">About Us</h1>
              <h5 className="text-sm xl:text-base text-[#555555] leading-relaxed mb-4">
                Empowering Businesses through Collaborative Digital Excellence.
              </h5>
              <p className="text-xs xl:text-sm text-[#555555] leading-relaxed">
                Praskla is an agency that's forward-thinking, believing in the transformative power of collaboration. We offer full-service IT consulting, digital marketing, and software development services. Our team is passionate about digging into business challenges more profoundly and crafting innovative solutions for success; we believe collaboration unlocks new possibilities and delivers remarkable outcomes.
              </p>
              <div className="text-center mt-10 bg-[#111111] rounded-2xl shadow-md p-6 xl:p-8">
                <h2 className="text-3xl xl:text-4xl font-extrabold text-white">10+</h2>
                <div className="w-12 h-1 bg-[#FF2B2B] mx-auto my-3 rounded-full"></div>
                <p className="text-xs xl:text-sm text-gray-400">
                  Projects Delivered
                </p>

                <h2 className="text-3xl xl:text-4xl font-extrabold text-white mt-6">8+</h2>
                <div className="w-12 h-1 bg-[#FF2B2B] mx-auto my-3 rounded-full"></div>
                <p className="text-xs xl:text-sm text-gray-400">
                  Brands
                </p>

                <h2 className="text-3xl xl:text-4xl font-extrabold text-white mt-6">1.5+</h2>
                <div className="w-12 h-1 bg-[#FF2B2B] mx-auto my-3 rounded-full"></div>
                <p className="text-xs xl:text-sm text-gray-400">
                  Years of Experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;