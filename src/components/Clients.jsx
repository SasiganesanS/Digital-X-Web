import React from 'react';
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
    <section className=" pt-24 pb-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-[#371445] mb-4">
          Our Trusted Clients
          </h2>
          <div className="w-24 h-1 bg-[#371445] mx-auto mb-8 rounded-full"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Trusted Clients who have been with us for years and have been a part of our journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {clientData.map((client) => (
            <div 
              key={client.id} 
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#371445]"></div>
              <div className="p-8">
                
                <div className="space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 mb-6 flex items-center justify-center">
                      <img
                        src={client.logo}
                        alt={`${client.name} logo`}
                        className={`max-w-full max-h-full object-contain ${client.name === "VILCET" ? "rounded-xl" : ""}`}
                      />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                      {client.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-center">
                    {client.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
