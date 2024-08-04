"use client";
import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    title: "Pano Lokasyonunu Seç",
    description:
      "Panonun gözükmesini istediğin lokasyonu seç. isteiğin kadar çok ya da bütçenin yettiği kadar az lokasyon seçebilirsin.",
  },
  {
    title: "Bütçe ve Tarihleri Belirle",
    description:
      "Panonun gözükmesini istediğin lokasyonu seç. istediğin kadar çok ya da bütçenin yettiği kadar az lokasyon seçebilirsin.",
  },
  {
    title: "Pano Görsellerinizi Yükleyin",
    description:
      "Panonun gözükmesini istediğin lokasyonu seç. istediğin kadar çok ya da bütçenin yettiği kadar az lokasyon seçebilirsin.",
  },
  {
    title: "Reklam Onayı İçin Bekleyin",
    description:
      "Panonun gözükmesini istediğin lokasyonu seç. istediğin kadar çok ya da bütçenin yettiği kadar az lokasyon seçebilirsin.",
  },
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
    <div className=" w-full pt-44 text-gray-600 container mx-auto px-4 ">
      <h1 className=" text-4xl md:text-5xl lg:text-5xl font-bold text-gray-800 leading-tight">
        Panom Nasıl Çalışır
      </h1>
      <div className="infos md:flex  gap-8 pt-5 justify-between">
        <div className="border-l border-gray-700 pl-3 w-[500px]">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="text-3xl font-bold text-gray-800">
                {index + 1}.
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {step.title}
                </h2>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="image">
          <Image
            src="/7065476.webp"
            alt="Açık Hava Reklamcılığı"
            width={600}
            height={400}
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
      <div className="md:flex justify-around pt-20 gap-8 text-center  md:visible">
        {features.map((step, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
