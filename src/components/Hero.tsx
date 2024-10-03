"use client";

import React from "react";
import Image from "next/image";
import { FlipWords } from "../../src/components/ui/flip-words";

const words = ["Hızlı", "Etkili", "Yeni"];

const Hero: React.FC = () => {
  return (
    <div className="py-8 sm:py-12 md:py-16  lg:py-20 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight text-center lg:text-left">
              Açık Hava Reklamcılığında <FlipWords words={words} />
              Çözüm
            </h1>
            <p className="text-base xs:text-lg sm:text-xl text-gray-600 text-center lg:text-left">
              PANOM ile reklam alanlarınızı kolayca kiralayın veya reklam verin.
              Dijital ve geleneksel panoları tek platformda yönetin.
            </p>
            <div className="flex flex-col xs:flex-row gap-4 justify-center lg:justify-start  ">
              <button className="w-72 h-12 xs:w-auto bg-[#3B82F6] text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-3 rounded-full font-semibold hover:bg-[#2563EB] transition duration-300 text-sm xs:text-base">
                Hemen Başla
              </button>
              <button
                className="w-72 h-12 xs:w-auto border-2 border-[#3B82F6] text-[#3B82F6] px-4 xs:px-6 sm:px-8 py-2 xs:py-3 rounded-full font-semibold hover:bg-[#3B82F6] hover:text-white transition duration-300 text-sm xs:text-base"
                onClick={() =>
                  window.open(
                    "https://calendly.com/erendoru/30dk",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                Daha Fazla Bilgi
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <Image
              src="/billboard-image.jpg"
              alt="Açık Hava Reklamcılığı"
              width={700}
              height={500}
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
