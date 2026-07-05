import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';

const CinematicUniverse = () => {
  // We use CSS box-shadow for a highly performant and cinematic starfield
  const generateStars = (count, maxSize, maxPos) => {
    let value = '';
    for (let i = 0; i < count; i++) {
      value += `${Math.floor(Math.random() * maxPos)}px ${Math.floor(Math.random() * maxPos)}px #FFF${i === count - 1 ? '' : ', '}`;
    }
    return value;
  };

  const starsSmall = useMemo(() => generateStars(600, 1, 2000), []);
  const starsMedium = useMemo(() => generateStars(150, 2, 2000), []);
  const starsLarge = useMemo(() => generateStars(80, 3, 2000), []);

  const content = (
    <>
      <style>
        {`
          .universe-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #000000;
            z-index: -9999 !important;
            pointer-events: none;
            overflow: hidden;
          }
          
          @keyframes animStar {
            from { transform: translateY(0px); }
            to { transform: translateY(-2000px); }
          }
          
          .stars-s {
            width: 1px;
            height: 1px;
            background: transparent;
            box-shadow: ${starsSmall};
            animation: animStar 70s linear infinite;
          }
          .stars-s:after {
            content: " ";
            position: absolute;
            top: 2000px;
            width: 1px;
            height: 1px;
            background: transparent;
            box-shadow: ${starsSmall};
          }
          
          .stars-m {
            width: 2px;
            height: 2px;
            background: transparent;
            box-shadow: ${starsMedium};
            animation: animStar 140s linear infinite;
          }
          .stars-m:after {
            content: " ";
            position: absolute;
            top: 2000px;
            width: 2px;
            height: 2px;
            background: transparent;
            box-shadow: ${starsMedium};
          }
          
          .stars-l {
            width: 3px;
            height: 3px;
            background: transparent;
            box-shadow: ${starsLarge};
            animation: animStar 210s linear infinite;
          }
          .stars-l:after {
            content: " ";
            position: absolute;
            top: 2000px;
            width: 3px;
            height: 3px;
            background: transparent;
            box-shadow: ${starsLarge};
          }
          
          /* Planet with Ring (Neutral Moon/Asteroid Design) */
          .planet-container {
            position: absolute;
            top: 25%;
            right: 12%;
            width: 140px;
            height: 140px;
            transform: rotate(-15deg);
            opacity: 0.8;
            z-index: -1;
          }

          .planet-body {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, #555555 0%, #222222 60%, #050505 100%);
            box-shadow: 
              inset -20px -20px 40px rgba(0,0,0,0.9),
              0 0 20px rgba(255, 255, 255, 0.1);
          }

          .planet-rings {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 220px;
            height: 40px;
            border: 8px solid rgba(255, 255, 255, 0.12);
            border-radius: 50%;
            transform: translate(-50%, -50%) rotateX(75deg);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
            pointer-events: none;
          }

          /* Stylized Glowing cosmic dust particles (Neutral White) */
          .cosmic-dust {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%);
            animation: floatDust 12s ease-in-out infinite alternate;
          }

          @keyframes floatDust {
            0% { transform: translateY(0px) translateX(0px) scale(0.8); opacity: 0.2; }
            50% { opacity: 0.5; }
            100% { transform: translateY(-40px) translateX(30px) scale(1.2); opacity: 0.3; }
          }
          
          /* Shooting stars */
          @keyframes shootingStar {
            0% {
              transform: translateX(0) translateY(0) rotate(-45deg) scale(0);
              opacity: 0;
            }
            8% {
              opacity: 1;
              transform: translateX(-100px) translateY(100px) rotate(-45deg) scale(1);
            }
            25% {
              transform: translateX(-700px) translateY(700px) rotate(-45deg) scale(1);
              opacity: 0;
            }
            100% {
              transform: translateX(-700px) translateY(700px) rotate(-45deg) scale(0);
              opacity: 0;
            }
          }
          
          .shooting-star {
            position: absolute;
            width: 140px;
            height: 1px;
            background: linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0));
            animation: shootingStar 12s linear infinite;
            border-radius: 999px;
            filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.8));
            opacity: 0;
          }
          
          .shooting-star:nth-child(5) { top: 12%; left: 88%; animation-delay: 0s; animation-duration: 9s; }
          .shooting-star:nth-child(6) { top: 32%; left: 92%; animation-delay: 4s; animation-duration: 12s; }
          .shooting-star:nth-child(7) { top: 60%; left: 80%; animation-delay: 7s; animation-duration: 10s; }
        `}
      </style>
      <div className="universe-wrapper">
        <div className="stars-s"></div>
        <div className="stars-m"></div>
        <div className="stars-l"></div>
        <div className="planet-container">
          <div className="planet-body"></div>
          <div className="planet-rings"></div>
        </div>
        <div className="cosmic-dust" style={{ width: '12px', height: '12px', top: '40%', left: '15%', animationDelay: '0s' }}></div>
        <div className="cosmic-dust" style={{ width: '8px', height: '8px', top: '70%', left: '40%', animationDelay: '3s' }}></div>
        <div className="cosmic-dust" style={{ width: '15px', height: '15px', top: '20%', left: '60%', animationDelay: '6s' }}></div>
        <div className="cosmic-dust" style={{ width: '10px', height: '10px', top: '80%', left: '85%', animationDelay: '9s' }}></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>
    </>
  );

  // Render to document.body to ensure it ignores parent layout properties (like overflow/transform)
  return typeof document !== 'undefined' ? createPortal(content, document.body) : null;
};

export default CinematicUniverse;
