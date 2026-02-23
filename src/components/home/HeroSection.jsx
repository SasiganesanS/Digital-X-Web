import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";

import PyBlob from "../../assets/py-blob.png";

// Move quotes outside component to prevent recreation on every render
const quotes = [
    "'The best way to predict the future is to invent it.' — Alan Kay",
    "'Programs must be written for people to read, and only incidentally for machines to execute.' — Harold Abelson",
    "'Simplicity is the soul of efficiency.' — Austin Freeman",
    "'First, solve the problem. Then, write the code.' — John Johnson",
    "'Make it work, make it right, make it fast.' — Kent Beck",
    "'Optimism is an occupational hazard of programming: feedback is the treatment.' — Kent Beck",
    "'Any sufficiently advanced technology is indistinguishable from magic.' — Arthur C. Clarke",
    "'Code is like humor. When you have to explain it, it's bad.' — Cory House",
    "'Testing leads to failure, and failure leads to understanding.' — Burt Rutan"
];

const HeroSection = () => {
    const [text, setText] = useState('');
    const quoteIndexRef = useRef(Math.floor(Math.random() * quotes.length));
    const charIndexRef = useRef(0);
    const isDeletingRef = useRef(false);

    // Generate stars once and memoize them to prevent re-rendering issues
    const stars = useMemo(() => {
        return [...Array(50)].map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 2
        }));
    }, []);

    useEffect(() => {
        let timeout;

        const typeText = () => {
            const currentQuote = quotes[quoteIndexRef.current];
            
            if (!isDeletingRef.current) {
                // Typing
                if (charIndexRef.current < currentQuote.length) {
                    charIndexRef.current += 1;
                    setText(currentQuote.slice(0, charIndexRef.current));
                    timeout = setTimeout(typeText, 200); // Slowed down to 200ms for very comfortable reading
                } else {
                    // Pause before deleting
                    timeout = setTimeout(() => {
                        isDeletingRef.current = true;
                        typeText();
                    }, 4000); // Increased pause to 4 seconds
                }
            } else {
                // Deleting
                if (charIndexRef.current > 0) {
                    charIndexRef.current -= 1;
                    setText(currentQuote.slice(0, charIndexRef.current));
                    timeout = setTimeout(typeText, 25); // Faster delete for smoother effect
                } else {
                    // Move to next quote
                    isDeletingRef.current = false;
                    quoteIndexRef.current = (quoteIndexRef.current + 1) % quotes.length;
                    timeout = setTimeout(typeText, 1200); // 1.2 second pause before next quote
                }
            }
        };

        typeText();

        return () => clearTimeout(timeout);
    }, []); // Empty dependency array since quotes is now static

    return (
        <section className="dark-section relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#0f0418] via-[#1a0b2e] to-[#2d1b3d]">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Starfield effect */}
                <div className="absolute inset-0">
                    {stars.map((star) => (
                        <div
                            key={star.id}
                            className="absolute w-1 h-1 bg-white rounded-full opacity-50"
                            style={{
                                left: `${star.left}%`,
                                top: `${star.top}%`,
                                animation: `twinkle ${star.duration}s infinite ${star.delay}s`
                            }}
                        />
                    ))}
                </div>

                {/* Diagonal lines (hidden on small) */}
                <div className="absolute top-0 right-0 w-full h-full hidden sm:block">
                    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent transform rotate-12 translate-x-1/4"></div>
                    <div className="absolute bottom-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent transform -rotate-12 -translate-x-1/4"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 min-h-screen">
                <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-6 lg:gap-12">
                    {/* Left Content */}
                    <div className="flex-1 text-white space-y-3 sm:space-y-4 md:space-y-6 max-w-full sm:max-w-3xl md:max-w-xl lg:max-w-3xl text-center lg:text-left">
                        {/* Main Heading */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
                            Transform your ideas into digital success with us!
                        </h1>

                        {/* Description */}
                        <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            We're your partner in product design, website creation, and branding for every stage of your business.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                            <Link
                                to="/services"
                                className="bg-[#371445] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-medium 
                                         hover:bg-[#4a1c5e] transition-all duration-300 ease-out border-2 border-transparent hover:border-[#4a1c5e]"
                                style={{ boxShadow: '0 6px 20px rgba(45, 27, 78, 0.3)' }}
                            >
                                Services
                            </Link>
                            <Link
                                to="/projects"
                                className="group relative inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-light text-sm sm:text-base overflow-hidden transition-all duration-300 hover:bg-purple-500/30 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/30"
                            >
                                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                                    Our work
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Content - Star Blob Shape */}
                    <div className="flex-1 flex items-center justify-center lg:justify-end">
                        <div className="relative w-full max-w-[180px] sm:max-w-[240px] md:max-w-sm lg:max-w-md xl:max-w-2xl h-36 sm:h-48 md:h-56 lg:h-72 xl:h-[500px] flex items-center justify-center">
                            {/* PyBlob Image */}
                            <img 
                                src={PyBlob} 
                                alt="Praskla Technology Logo" 
                                className="w-full h-full object-contain animate-blob-float drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom animations */}
            <style>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 1; }
                }

                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-30px); }
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.5; }
                }

                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }

                /* Typing cursor */
                .typing-cursor {
                    display: inline-block;
                    margin-left: 2px;
                    color: #1a1a2e;
                    font-weight: 400;
                    animation: blink 0.8s ease-in-out infinite;
                }

                @keyframes blink {
                    0%, 49% { opacity: 1; }
                    50%, 100% { opacity: 0; }
                }

                /* Blob animation */
                @keyframes blob-float {
                    0%, 100% {
                        transform: translate(0px, 0px) scale(1) rotate(0deg);
                    }
                    33% {
                        transform: translate(30px, -30px) scale(1.05) rotate(5deg);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.95) rotate(-5deg);
                    }
                }

                .animate-blob-float {
                    animation: blob-float 20s ease-in-out infinite;
                }

                /* Smaller float range on small screens to avoid large left-right movement */
                @keyframes blob-float-sm {
                    0%, 100% {
                        transform: translate(0px, 0px) scale(1) rotate(0deg);
                    }
                    33% {
                        transform: translate(10px, -8px) scale(1.02) rotate(3deg);
                    }
                    66% {
                        transform: translate(-8px, 8px) scale(0.98) rotate(-3deg);
                    }
                }

                @media (max-width: 640px) {
                    .animate-blob-float {
                        /* Use a shorter duration and smaller translation on mobile */
                        animation: blob-float-sm 12s ease-in-out infinite;
                    }
                }
            `}</style>
        </section>
    );
};

export default HeroSection;
