import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { testimonials } from "../../data/testimonials";
import testimonialBg from "../backgrounds/testimonal-bg.webp";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Testimonials() {
  const swiperRef = useRef(null);

  return (
    <section className="w-full min-h-screen flex flex-col justify-center py-14 lg:py-24 xl:py-24 2xl:py-32 relative overflow-hidden dark-section">
      {/* Purple Ornamental Pattern Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url(${testimonialBg})`,
        }}
      >
        {/* Dark overlay to make background darker */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-12 lg:gap-4">
          <div className="lg:col-span-5 col-span-12">
            <h3 className="text-sm md:text-base lg:text-lg text-white/70 font-medium">
              Testimonials
            </h3>
            <h1 className="mt-1.5 lg:mt-1.5 xl:mt-3 2xl:mt-5 text-[32px] md:text-[40px] lg:text-[48px] font-bold text-white">
              Building trust through experience
            </h1>
          </div>
          <div className="lg:col-span-7 col-span-12 lg:block hidden"></div>
        </div>

        <div className="mt-10 ">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            slidesPerGroup={1}
            speed={250}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                pagination: {
                  clickable: true,
                  dynamicBullets: true,
                },
              },
              1024: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                pagination: false,
              },
            }}
            className="testimonials-swiper pb-12 lg:pb-0" // pb-12 creates space for pagination on mobile
            style={{ height: "auto" }}
          >
            {testimonials.map((testimonial, idx) => (
              <SwiperSlide key={idx} className="h-auto lg:h-full">
                {/* Optimized glass card with better performance - using lighter backdrop blur */}
                <div
                  className="w-full h-auto lg:h-[350px] flex flex-col rounded-xl overflow-hidden 
                                border border-white/20 bg-white/5 backdrop-blur-[6px]
                                shadow-xl hover:shadow-2xl hover:bg-white/10 
                                transition-all duration-300 transform-gpu"
                >
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8 h-auto lg:h-full">
                    {/* Company Logo - Top on mobile, Left on desktop */}
                    <div className="flex-shrink-0 flex items-center justify-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-cover rounded-lg shadow-md"
                      />
                    </div>

                    {/* Content - Below logo on mobile, Right on desktop */}
                    <div className="flex-1 flex flex-col justify-between relative">
                      {/* Quote Section */}
                      <div className="flex-grow">
                        {/* Opening quotation mark */}
                        <div className="mb-3">
                          <svg
                            className="w-8 h-8 lg:w-10 lg:h-10 text-gray-700 opacity-40"
                            viewBox="0 0 24 24"
                            fill="white"
                          >
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                          </svg>
                        </div>

                        {/* Quote Text */}
                        <blockquote className="mb-4">
                          <p className="text-sm md:text-[15px] lg:text-base font-semibold text-white leading-relaxed">
                            {testimonial.quote}
                          </p>
                        </blockquote>
                      </div>

                      {/* Author Info Section */}
                      <div className="mt-auto pt-4 relative pb-4">
                        <div className="flex justify-between items-end">
                          <div>
                            <h3 className="text-xl md:text-[22px] lg:text-2xl font-bold text-white mb-1">
                              {testimonial.name}
                            </h3>
                            <p className="text-sm md:text-[15px] lg:text-base text-white/90 font-medium">
                              {testimonial.role}
                            </p>
                          </div>

                          {/* Closing quotation mark */}
                          <div className="opacity-20 flex-shrink-0 ml-4">
                            <svg
                              className="w-12 h-12 lg:w-16 lg:h-16 text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.57-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-4v-10h10z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
