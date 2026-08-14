import React from 'react';

/**
 * HeroLayout - Shared Global Hero Section Component
 * 
 * Guarantees that every page's hero section begins from the exact same vertical baseline,
 * uses the identical container width & left padding, and maintains consistent vertical rhythm.
 */
const HeroLayout = ({
  badge,
  title,
  description,
  actions,
  media,
  children,
  sectionId,
  onMouseMove,
  className = "",
  containerClassName = "",
  bgElements,
}) => {
  return (
    <section
      id={sectionId}
      onMouseMove={onMouseMove}
      className={`relative w-full overflow-hidden bg-transparent flex items-start justify-center pt-2 sm:pt-4 lg:pt-6 pb-6 sm:pb-8 lg:pb-10 ${className}`}
    >
      {/* Background Decorative Layer */}
      {bgElements}

      {/* Standardized Content Container */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 pt-2 sm:pt-3 lg:pt-4 pb-4 sm:pb-6 lg:pb-8 ${containerClassName}`}>
        {children ? (
          children
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Badge -> Heading -> Description -> Actions/Stats */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
              {badge && <div className="mb-5 flex justify-center lg:justify-start w-full">{badge}</div>}
              {title && (
                <div className="w-full">
                  {typeof title === "string" ? (
                    <h1 className="text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] font-black leading-[1.08] sm:leading-[1.1] tracking-[-0.035em] text-[#111111] font-sans mb-5 sm:mb-6 max-w-2xl">
                      {title}
                    </h1>
                  ) : (
                    title
                  )}
                </div>
              )}
              {description && (
                <div className="w-full">
                  {typeof description === "string" ? (
                    <p className="text-[#575757] text-base sm:text-lg lg:text-[19px] font-normal leading-[1.6] font-sans max-w-2xl mb-7 sm:mb-8">
                      {description}
                    </p>
                  ) : (
                    description
                  )}
                </div>
              )}
              {actions && <div className="w-full">{actions}</div>}
            </div>

            {/* Right Column: Hero Media / Interactive Feature Card */}
            {media && (
              <div className="lg:col-span-5 w-full flex justify-center lg:justify-end items-start pt-2 lg:pt-0 relative z-10">
                {media}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroLayout;
