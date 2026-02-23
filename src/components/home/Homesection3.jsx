import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown } from 'lucide-react';
import pranesh from "../../assets/team/Pranesh.png"
import BaskaranKrishnaswamy from "../../assets/team/Baskaran-Krishnaswamy.png"
import KokilaA from "../../assets/team/Kokila-A.png"
import ram from "../../assets/team/Ramachandran.png";
import pyLogo from "../../assets/py.png";

const Homesection3 = () => {
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [titleProgress, setTitleProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const leadershipTeam = [
        {
            name: "Pranesh Kumar Baskaran",
            role: "Managing Director / CEO",
            text: "Committed to delivering quality-assured software solutions that create lasting value for all stakeholders. I believe in guiding my team with strategic vision, fostering growth, and driving the firm toward long-term success.",
            color: "from-[#4b5563] via-[#374151] to-[#1f2937]",
            img: pranesh
        },
        {
            name: "Baskaran Krishnaswamy",
            role: "Advisor",
            text: "Great businesses grow by making smart decisions, thinking ahead, and taking risks when it truly matters. My role is to guide, mentor, and help navigate challenges so we stay ahead in a constantly evolving market.",
            color: "from-[#4b5563] via-[#374151] to-[#1f2937]",
            img: BaskaranKrishnaswamy
        },
        {
            name: "Kokila A",
            role: "Financial Advisor",
            text: "My focus is on ensuring financial stability and strategic investments that drive long-term growth. Sound financial planning and informed decision-making are the foundation of sustainable success.",
            color: "from-[#4b5563] via-[#374151] to-[#1f2937]",
            img: KokilaA
        },
        {
            name: "Rama Chandran Baskaran",
            role: "Legal Advisor / Director - Marketing",
            text: "I am committed to handling all the legal aspects of the firm while ensuring that proper marketing strategies create new business opportunities. Marketing is about creating a story that connects with people.",
            color: "from-[#4b5563] via-[#374151] to-[#1f2937]",
            img: ram
        },
        {
            name: "Praskla",
            role: "Technology",
            text: "",
            isCompanyCard: true,
            color: "from-[#4b5563] via-[#374151] to-[#1f2937]",
        }
    ];

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1200);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const handleScroll = () => {
            const titleSection = document.getElementById('title-section');
            const cardsSection = document.getElementById('cards-section');

            if (!titleSection || !cardsSection) return;

            const titleRect = titleSection.getBoundingClientRect();
            const cardsRect = cardsSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (titleRect.top > 0) {
                setTitleProgress(0);
            } else if (titleRect.bottom < windowHeight / 2) {
                setTitleProgress(1);
            } else {
                const progress = Math.abs(titleRect.top) / (windowHeight / 2);
                setTitleProgress(Math.min(Math.max(progress, 0), 1));
            }

            const sectionTop = cardsRect.top;
            const sectionHeight = cardsRect.height;

            if (sectionTop > windowHeight * 0.5) {
                setCurrentIndex(-1);
            } else if (sectionTop + sectionHeight < windowHeight) {
                setCurrentIndex(leadershipTeam.length - 1);
            } else {
                const scrolledIntoSection = Math.max(0, (windowHeight * 0.5) - sectionTop);
                const scrollPerCard = windowHeight * 0.9;
                const cardIndex = (scrolledIntoSection / scrollPerCard) - 1.7;
                const maxIndex = leadershipTeam.length - 1;
                setCurrentIndex(Math.min(Math.max(cardIndex, -1), maxIndex));
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile, leadershipTeam.length]);

    const getCardPosition = (index) => {
        const cardSpacing = 320;

        if (currentIndex < 0) {
            const progress = Math.max(0, currentIndex + 1);

            if (index === 0 && currentIndex > -1) {
                const startX = -((3) * cardSpacing) / 2;
                const startY = -180;
                const startScale = 0.85;

                return {
                    x: startX * (1 - progress),
                    y: startY * (1 - progress),
                    scale: startScale + (1.0 - startScale) * progress,
                    opacity: 1,
                    zIndex: 50
                };
            }

            if (index === 4) {
                return {
                    x: 0,
                    y: 0,
                    scale: 0.75,
                    opacity: 0,
                    zIndex: 5
                };
            }

            const startX = -((3) * cardSpacing) / 2;
            return {
                x: startX + (index * cardSpacing),
                y: -180,
                scale: 0.85,
                opacity: 1,
                zIndex: 10 + index
            };
        }

        const floorIndex = Math.floor(currentIndex);
        const progress = currentIndex - floorIndex;

        if (index <= floorIndex) {
            return {
                x: 0,
                y: 0,
                scale: 1.0,
                opacity: 1,
                zIndex: 50 + index
            };
        }

        if (index === floorIndex + 1 && progress > 0 && floorIndex < leadershipTeam.length - 1) {
            if (index === 4) {
                return {
                    x: 0,
                    y: 0,
                    scale: 0.75 + (0.25 * progress),
                    opacity: progress,
                    zIndex: 50 + index
                };
            }

            const startX = -((3) * cardSpacing) / 2 + (index * cardSpacing);
            const startY = -180;
            const startScale = 0.85;

            return {
                x: startX * (1 - progress),
                y: startY * (1 - progress),
                scale: startScale + (1.0 - startScale) * progress,
                opacity: 1,
                zIndex: 50 + index
            };
        }

        if (index === 4) {
            return {
                x: 0,
                y: 0,
                scale: 0.75,
                opacity: 0,
                zIndex: 5
            };
        }

        const startX = -((3) * cardSpacing) / 2;
        return {
            x: startX + (index * cardSpacing),
            y: -180,
            scale: 0.85,
            opacity: 1,
            zIndex: 10 + index
        };
    };

    if (isMobile) {
        return (
            <div className="w-full bg-white overflow-hidden">
                <section className="relative w-full h-10 flex items-center justify-center bg-gradient-to-b from-white via-purple-50/40 to-purple-100/30 px-4 py-20">
                    <motion.div
                        className="absolute top-10 left-4 w-20 h-20 rounded-full bg-gradient-to-br from-[#7B2D9E]/10 to-purple-200/10 blur-2xl"
                        animate={{
                            y: [0, 20, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-4 w-24 h-24 rounded-full bg-gradient-to-br from-purple-300/10 to-[#7B2D9E]/10 blur-2xl"
                        animate={{
                            y: [0, -30, 0],
                            scale: [1, 1.15, 1],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    <div className="relative text-center z-10">
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-[#7B2D9E]/20 shadow-lg mb-6"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <Crown className="w-4 h-4 text-[#4a1c5e]" />
                            <span className="text-sm font-semibold text-[#4a1c5e] ">
                                Meet Our Leaders
                            </span>
                        </motion.div>

                        <motion.h1
                            className="text-5xl sm:text-6xl font-bold bg-gradient-to-br from-[#371445] via-[#4a1c5e] to-[#2a0e34] bg-clip-text text-transparent uppercase tracking-wide leading-tight"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            Executive Team
                        </motion.h1>

                        <motion.p
                            className="text-lg sm:text-xl text-gray-600 mt-6 font-light"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            The minds behind innovation
                        </motion.p>
                    </div>
                </section>

                <div className="relative w-full bg-gradient-to-b from-purple-100/30 via-purple-50/40 to-white py-16 px-4 sm:px-6">
                    <div className="max-w-3xl mx-auto space-y-8">
                        {leadershipTeam.filter(member => !member.isCompanyCard).map((member, index) => (
                            <motion.div
                                key={index}
                                className="relative pl-0"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100/50 hover:shadow-2xl transition-shadow duration-300">
                                    <div className="h-1.5 bg-gradient-to-br from-[#371445] via-[#4a1c5e] to-[#2a0e34]"></div>

                                    <div className="p-5 sm:p-6">
                                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
                                            <div className="relative">
                                                <div className="w-24 h-24 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200 flex-shrink-0 border-3 border-[#7B2D9E]/30 shadow-lg">
                                                    <img
                                                        src={member.img}
                                                        alt={member.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#7B2D9E]/20 to-purple-400/20 -z-10 blur-sm"></div>
                                            </div>

                                            <div className="flex-1 text-center sm:text-left">
                                                <h3 className="text-xl sm:text-lg font-bold text-[#371445] mb-1 leading-tight">{member.name}</h3>
                                                <p className="text-sm font-semibold text-[#371445] inline-flex items-center justify-center sm:justify-start gap-1">
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                    </svg>
                                                    {member.role}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <div className="absolute -left-3 top-0 w-1 h-full bg-gradient-to-b from-[#7B2D9E]/30 to-transparent rounded-full"></div>
                                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base pl-3 text-justify">
                                                {member.text}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="h-1 bg-gradient-to-r from-transparent via-[#7B2D9E]/20 to-transparent"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const activeIndex = Math.floor(currentIndex + 0.5);
    const activeMember = leadershipTeam[activeIndex] || {};

    return (
        <div className="w-full bg-white -mt-10">
            <section
                id="title-section"
                className="relative w-full h-[150vh] bg-gradient-to-b from-white via-purple-50/40 to-purple-100/30"
            >
                <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                    <motion.div
                        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#7B2D9E]/10 to-purple-200/10 blur-3xl"
                        animate={{
                            y: [0, 30, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    <motion.div
                        className="relative text-center"
                        style={{
                            scale: 1 + titleProgress * 0.2,
                            opacity: 1 - titleProgress * 0.3,
                        }}
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#7B2D9E]/20 shadow-lg mb-14 -mt-14"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Crown className="w-4 h-4 text-[#4a1c5e]" />
                            <span className="text-sm font-semibold text-[#4a1c5e] ">
                                Meet Our Leaders
                            </span>
                        </motion.div>

                        <motion.h1
                            className="text-6xl md:text-7xl lg:text-9xl font-bold bg-gradient-to-br from-[#371445] via-[#4a1c5e] to-[#2a0e34] bg-clip-text text-transparent uppercase tracking-wide"
                            style={{
                                letterSpacing: `${titleProgress * 20}px`,
                            }}
                        >
                            Executive Team
                        </motion.h1>

                        <motion.p
                            className="text-xl md:text-2xl text-[#5F5F5F] mt-6 font-light"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            style={{
                                opacity: 1 - titleProgress * 1.5,
                            }}
                        >
                            The minds behind innovation
                        </motion.p>

                        <motion.div
                            className="h-1 bg-gradient-to-r from-[#7B2D9E] via-purple-500 to-purple-600 mt-8 mx-auto rounded-full shadow-lg shadow-purple-300/50"
                            style={{
                                width: `${(1 - titleProgress) * 100}%`,
                                opacity: 1 - titleProgress,
                            }}
                        />
                    </motion.div>

                    <motion.div
                        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-[#7B2D9E]/70 text-sm flex flex-col items-center font-medium"
                        style={{
                            opacity: 1 - titleProgress * 2,
                        }}
                    >
                        <span className="mb-2">Scroll to meet the team</span>
                        <motion.svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </motion.svg>
                    </motion.div>
                </div>
            </section>

            <div
                id="cards-section"
                className="relative w-full bg-gradient-to-b from-purple-100/30 via-purple-50/40 to-white"
                style={{ height: `${(leadershipTeam.length + 1) * 100}vh` }}>
                <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                    <div className="relative w-full h-full flex items-center justify-center">
                        {leadershipTeam.map((member, index) => {
                            const position = getCardPosition(index);

                            return (
                                <motion.div
                                    key={index}
                                    className="absolute"
                                    animate={{
                                        x: position.x,
                                        y: position.y,
                                        scale: position.scale,
                                        opacity: position.opacity,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeOut"
                                    }}
                                    style={{
                                        zIndex: position.zIndex
                                    }}
                                >
                                    {member.isCompanyCard ? (
                                        <div className={`w-[280px] h-[400px] rounded-3xl bg-gradient-to-br ${member.color} shadow-[0_20px_60px_rgba(123,45,158,0.4)] flex flex-col items-center justify-center p-8 border border-white/20`}>
                                            <div className="bg-white/20 rounded-2xl p-6 mb-6 backdrop-blur-sm shadow-lg">
                                                <img src={pyLogo} alt="" className="w-full h-auto" />
                                            </div>
                                            <h3 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">Praskla</h3>
                                            <p className="text-xl text-white/95 font-medium">Technology</p>
                                        </div>
                                    ) : (
                                        <div className="w-[280px] h-[400px] rounded-3xl shadow-[0_20px_60px_rgba(123,45,158,0.4)] flex flex-col items-end justify-end relative overflow-hidden border border-white/10">
                                            <div className="absolute inset-0">
                                                <img
                                                    src={member.img}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover object-top"
                                                />
                                            </div>

                                            <div className="relative z-10 text-left px-6 w-full bg-gradient-to-t from-black/70 via-black/40 to-transparent pt-8 pb-4 backdrop-blur-sm">
                                                <h3 className="text-xl font-bold text-white mb-1 leading-tight drop-shadow-lg">{member.name}</h3>
                                                <p className="text-sm text-white/95 font-medium drop-shadow">{member.role}</p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>

                    <AnimatePresence mode="wait">
                        {currentIndex >= -0.5 &&
                            Math.floor(currentIndex + 0.5) < leadershipTeam.length &&
                            leadershipTeam[Math.floor(currentIndex + 0.5)] &&
                            !leadershipTeam[Math.floor(currentIndex + 0.5)].isCompanyCard && (
                                <motion.div
                                    key={Math.floor(currentIndex + 0.5)}
                                    className="absolute bottom-4 left-0 right-0 max-w-5xl mx-auto px-6 md:bottom-auto md:left-8 md:top-1/2 md:-translate-y-1/2 md:max-w-md md:mx-0 md:px-0 2xl:left-96"
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -30, scale: 0.95 }}
                                    transition={{
                                        duration: 0.45,
                                        ease: [0.25, 0.1, 0.25, 1]
                                    }}
                                >
                                    <div className="relative rounded-xl p-6 bg-white/90 backdrop-blur-lg shadow-xl border border-[#371445] overflow-hidden 2xl:p-8">
                                        <div className="absolute -top-24 -left-20 w-60 h-60  bg-gradient-to-br from-[#0f0418] via-[#1a0b2e] to-[#2d1b3d] rounded-full blur-3xl opacity-40"></div>
                                        <div className="absolute -bottom-24 -right-20 w-60 h-60  bg-gradient-to-br from-[#0f0418] via-[#1a0b2e] to-[#2d1b3d] rounded-full blur-3xl opacity-40"></div>
                                        <div className="relative z-10">
                                            <p className="text-base text-[#371445] leading-relaxed font-medium italic tracking-wide 2xl:text-lg">
                                                {activeMember.text}
                                            </p>
                                        </div>
                                    </div>

                                </motion.div>
                            )}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        {currentIndex >= -0.5 &&
                            Math.floor(currentIndex + 0.5) < leadershipTeam.length &&
                            leadershipTeam[Math.floor(currentIndex + 0.5)] &&
                            leadershipTeam[Math.floor(currentIndex + 0.5)].isCompanyCard && (
                                <motion.div
                                    key="company-text"
                                    className="absolute top-1/2 right-32 -translate-y-1/2 2xl:right-80"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: [0.25, 0.1, 0.25, 1]
                                    }}
                                >
                                    <h2 className="text-6xl font-bold text-[#371445] leading-tight [@media(min-width:1199px)]:mr-[-50px] [@media(min-width:1300px)]:mr-[0px] mr-20 2xl:text-8xl">
                                        Praskla<br /> Innovations
                                    </h2>
                                </motion.div>
                            )}
                    </AnimatePresence>

                    {currentIndex < -0.5 && (
                        <motion.div
                            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#7B2D9E]/70 text-sm flex flex-col items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <span className="mb-2">Scroll to explore</span>
                            <span className="w-2 h-2 bg-[#7B2D9E] rounded-full animate-pulse block"></span>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Homesection3;