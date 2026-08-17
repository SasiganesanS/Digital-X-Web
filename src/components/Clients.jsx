import React from 'react';
import HeroLayout from "./common/HeroLayout";
import SectionBadge from "./common/SectionBadge";
import vishnu from "../assets/clients/School.webp"
import jkk from "../assets/clients/jkk.webp"
import thilaga from "../assets/clients/Thilaga-Impex.webp"
import capturever from "../assets/clients/Captureever.webp"

const clientData = [
  {
    id: 1,
    name: "Vishnu Lakshmi School",
    description: "English medium school since 1988",
    year: "Education Partner",
    logo: vishnu
  },
  {
    id: 3,
    name: "JKK TEX",
    description: "Readymades, Elayampalayam",
    year: "Textile Partner",
    logo: jkk
  },
  {
    id: 4,
    name: "Thilaga Impex",
    description: "Mrfs. Of Quality Export Fabrics",
    year: "Export Partner",
    logo: thilaga
  },
  {
    id: 5,
    name: "Captureever",
    description: "Fashion & Photography in real life.",
    year: "Creative Partner",
    logo: capturever
  }
];

const Clients = () => {
  return (
    <HeroLayout
      badge={
        <SectionBadge text="Trusted Partners" />
      }
      title={
        <h1 className="text-2xl sm:text-3xl lg:text-[40px] xl:text-[44px] font-black leading-[1.08] sm:leading-[1.1] tracking-[-0.035em] text-[#111111] font-sans mb-5 sm:mb-6 max-w-2xl">
          Our Trusted <span className="text-[#E31D2E]">Clients</span>
        </h1>
      }
      description={
        <p className="text-[#575757] text-base sm:text-lg lg:text-[19px] font-normal leading-[1.6] font-sans max-w-2xl mb-7 sm:mb-8">
          Partners and organizations who have trusted us with their brand identity and growth systems.
        </p>
      }
    >
      <div className="py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full text-left">
          {clientData.map((client) => (
            <div 
              key={client.id} 
              className="clay-card relative flex flex-col justify-between overflow-hidden p-8 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 mb-6 flex items-center justify-center bg-white/40 rounded-2xl p-3 border border-white/60">
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-black text-[#111111] mb-3 text-center">
                  {client.name}
                </h3>
                <p className="text-[#575757] text-sm leading-relaxed text-center font-normal">
                  {client.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HeroLayout>
  );
};

export default Clients;
