import React from 'react';
import HeroLayout from "./common/HeroLayout";
import SectionBadge from "./common/SectionBadge";
import vishnu from "../assets/clients/School.jpg"
import vilcet from "../assets/clients/VILCET.png"
import jkk from "../assets/clients/jkk.png"
import thilaga from "../assets/clients/Thilaga-Impex.png"
import capturever from "../assets/clients/Captureever.png"

const clientData = [
  {
    id: 1,
    name: "Vishnu Lakshmi School",
    description: "English medium school since 1988",
    year: "Education Partner",
    logo: vishnu
  },
  {
    id: 2,
    name: "VILCET",
    description: "Empowering India by producing quality engineers.",
    year: "Education Partner",
    logo: vilcet
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
        <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-[#111111]">
          Our Trusted <span className="text-[#E31D2E]">Clients</span>
        </h1>
      }
      description="Partners and organizations who have trusted us with their brand identity and growth systems."
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
                    className={`max-w-full max-h-full object-contain ${client.name === "VILCET" ? "rounded-xl" : ""}`}
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
