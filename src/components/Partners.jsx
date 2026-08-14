import React from 'react';
import balajipotraits from "../assets/tie/Balaji-Portraits.webp"
import ibodhiacademy from "../assets/tie/ibodhi-academy.webp"
import vilcet from "../assets/clients/VILCET.webp"

const Partners = () => {
  const partners = [
    {
      name: 'Balaji Portraits',
      logo: balajipotraits,
    },
    {
      name: 'IBODHI ACADEMY',
      logo: ibodhiacademy,
    },
    {
      name: 'VILCET',
      logo: vilcet,
    },
    
  ];

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.style.opacity = 0.5;
    e.target.style.width = '40px';
  };

  return (
    <div className="bg-white py-6 sm:py-8 md:py-10 md:pt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-[#371445] mb-6 sm:mb-8">
          In Tie-up with
        </h2>
        
        <div className="marquee-container" style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div className="marquee-content" style={{
            display: 'flex',
            animation: 'marquee 30s linear infinite',
            whiteSpace: 'nowrap',
            gap: '2.5rem',
            willChange: 'transform',
          }}>
            {/* Original set */}
            {partners.map((partner, index) => (
              <div key={`logo-${index}`} className="logo-item group">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
            ))}
            {/* First copy */}
            {partners.map((partner, index) => (
              <div key={`logo-copy1-${index}`} className="logo-item group">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
            ))}
            {/* Second copy for smoother loop */}
            {partners.map((partner, index) => (
              <div key={`logo-copy2-${index}`} className="logo-item group">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
        
        <style>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.33%);
            }
          }
          
          .marquee-container {
            -webkit-mask-image: linear-gradient(
              to right,
              transparent,
              black 10%,
              black 90%,
              transparent
            );
            mask-image: linear-gradient(
              to right,
              transparent,
              black 10%,
              black 90%,
              transparent
            );
          }
          
          .logo-item {
            padding: 0 1.25rem;
            flex-shrink: 0;
            display: flex;
            align-items: center;
          }

          .marquee-content {
            animation-timing-function: linear;
            backface-visibility: hidden;
            perspective: 1000px;
          }

          .marquee-content:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Partners;
