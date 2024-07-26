"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const steps = [
  "Pano Lokasyonunu Seç",
  "Bütçe ve Tarihleri Belirle",
  "Pano Görsellerinizi Yükleyin",
  "Reklam Onayı İçin Bekleyin",
];

const features = [
  {
    title: "Bilinirlik",
    description:
      "Reklam Panoları markanızın bilinirliğini ve marka değerini arttırmanın en kolay yoludur.",
  },
  {
    title: "Kolaylık",
    description:
      "Panom istediğiniz lokasyonda, istediğiniz tarih ve istediğiniz bütçe ile kolayca reklam vermenizi sağlar.",
  },
  {
    title: "Avantajları",
    description:
      "Panom şehir içi reklamcılık konusunda uzmanlaşmış bir ekiple çalışmanın kolaylık ve efektif yönüdür.",
  },
  {
    title: "Yaratıcılık",
    description:
      "Alanında yaratıcı bir tasarımla reklam panonuzun geri dönüşleri maliyeti açısından en uygun ve doğru müşteri eğilimlerine ulaşmanızdır.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-left text-[#3B82F6]">
          Panom Nasıl Çalışır?
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="lg:w-1/2">
            <ul className="space-y-4 list-none pl-0">
              {steps.map((step, index) => (
                <li key={index} className="text-[#1F2937]">
                  {step}
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-[#1F2937] mr-2">
                  Tasarım aşamasında nelere dikkat edilmeli?
                </p>
                <button className="bg-[#3B82F6] text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-90 transition duration-300 flex-shrink-0">
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[#1F2937] mr-2">
                  Reklam panosu tasarlamak için yardıma mı ihtiyacın var?
                </p>
                <button className="bg-[#3B82F6] text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-90 transition duration-300 flex-shrink-0">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-gray-300 w-full h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Görsel Alanı</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white shadow-lg hover:shadow-xl transition duration-300 rounded-xl overflow-hidden"
            >
              <CardHeader className="bg-[#3B82F6] text-white">
                <CardTitle className="text-center">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-[#1F2937] text-center">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
