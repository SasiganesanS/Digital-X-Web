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
      className={`relative w-full overflow-hidden bg-transparent flex items-start justify-center min-h-[calc(100vh-var(--hero-top-offset))] ${className}`}
    >
      {/* Background Decorative Layer */}
      {bgElements}

      {/* Standardized Content Container */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 pt-4 sm:pt-6 lg:pt-8 pb-12 lg:pb-16 ${containerClassName}`}>
        {children ? (
          children
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Badge -> Heading -> Description -> Actions/Stats */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
              {badge && <div className="mb-5 flex justify-center lg:justify-start w-full">{badge}</div>}
              {title && (
                <div className="mb-5 w-full">
                  {typeof title === "string" ? (
                    <h1 className="font-black text-[#111111] leading-[1.08] tracking-tight text-3xl sm:text-4xl lg:text-[52px]">
                      {title}
                    </h1>
                  ) : (
                    title
                  )}
                </div>
              )}
              {description && (
                <div className="mb-8 w-full max-w-xl">
                  {typeof description === "string" ? (
                    <p className="text-[#575757] text-base sm:text-lg font-medium leading-relaxed">
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
              <div className="lg:col-span-5 w-full flex justify-center lg:justify-end items-start pt-2 lg:pt-0">
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
