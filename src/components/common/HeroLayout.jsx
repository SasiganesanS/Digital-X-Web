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
  leftColClass = "lg:col-span-6",
  rightColClass = "lg:col-span-6",
  bgElements,
  verticalCenter = false,
}) => {
  return (
    <section
      id={sectionId}
      onMouseMove={onMouseMove}
      className={`relative w-full hero-screen-edge overflow-hidden bg-transparent flex flex-col justify-between items-center pt-2 sm:pt-4 lg:pt-6 pb-0 ${className}`}
    >
      {/* Background Decorative Layer */}
      {bgElements}

      {/* Top Flexible Spacer when verticalCenter is requested */}
      {verticalCenter && <div className="flex-1 w-full pointer-events-none" />}

      {/* Standardized Content Container - Optimized Mobile & Tablet Responsive Layout */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 pt-1.5 sm:pt-3 lg:pt-4 pb-2 sm:pb-4 lg:pb-6 ${containerClassName}`}>
        {children ? (
          children
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center">
            {/* Left Column: Badge -> Heading -> Description -> Actions/Stats */}
            <div className={`${leftColClass || "lg:col-span-6"} flex flex-col items-center lg:items-start text-center lg:text-left w-full`}>
              {badge && <div className="mb-3 sm:mb-4 lg:mb-5 flex justify-center lg:justify-start w-full">{badge}</div>}
              {title && (
                <div className="w-full">
                  {typeof title === "string" ? (
                    <h1 className="text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] font-black leading-[1.08] sm:leading-[1.1] tracking-[-0.035em] text-inherit font-sans mb-3 sm:mb-5 lg:mb-6 max-w-2xl">
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
                    <p className="text-inherit opacity-85 text-sm sm:text-base lg:text-[19px] font-normal leading-[1.5] sm:leading-[1.6] font-sans max-w-2xl mb-5 sm:mb-7 lg:mb-8">
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
              <div className={`${rightColClass || "lg:col-span-6"} w-full flex justify-center lg:justify-end items-center pt-1 sm:pt-2 lg:pt-0 relative z-10`}>
                {media}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Flexible Spacer */}
      <div className="flex-1 w-full pointer-events-none" />

      {/* Sleek Hero Section Separator Line - Positioned at Exact Screen Edge Fold */}
      <div className="w-full relative z-20 flex-shrink-0">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-700/80 to-transparent" />
      </div>
    </section>
  );
};

export default HeroLayout;
