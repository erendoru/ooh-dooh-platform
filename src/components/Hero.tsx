"use client";

import React from "react";
import Image from "next/image";

const Hero: React.FC = () => {
  return (
    <div className="bg-[#FFF8E1] py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Açık Hava Reklamcılığında Yeni Nesil Çözüm
            </h1>
            <p className="text-xl text-gray-600">
              PANOM ile reklam alanlarınızı kolayca kiralayın veya reklam verin.
              Dijital ve geleneksel panoları tek platformda yönetin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#3B82F6] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#2563EB] transition duration-300">
                Hemen Başla
              </button>
              <button className="border-2 border-[#3B82F6] text-[#3B82F6] px-8 py-3 rounded-full font-semibold hover:bg-[#3B82F6] hover:text-white transition duration-300">
                Daha Fazla Bilgi
              </button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="/billboard-image.jpg"
              alt="Açık Hava Reklamcılığı"
              width={700}
              height={500}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
