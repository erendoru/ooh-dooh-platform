"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    title: "Pano Lokasyonunu Seç",
    description:
      "Panonun gözükmesini istediğin lokasyonu seç. İstediğin kadar çok ya da bütçenin yettiği kadar az lokasyon seçebilirsin.",
  },
  {
    title: "Bütçe ve Tarihleri Belirle",
    description:
      "Kampanyanın süresini ve bütçeni belirle. Esnek seçenekler sunuyoruz.",
  },
  {
    title: "Pano Görsellerinizi Yükleyin",
    description:
      "Hazırladığınız reklam görsellerini kolayca yükleyin. Gerekirse tasarım desteği de alabilirsiniz.",
  },
  {
    title: "Reklam Onayı İçin Bekleyin",
    description:
      "Reklamınızı hızlıca inceleyip onaylıyoruz. Onay sonrası kampanyanız hemen başlıyor!",
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
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Panom Nasıl Çalışır?
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="w-full md:w-1/2 pr-0 md:pr-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="mb-8 flex"
              >
                <div className="mr-4 flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 text-white bg-gray-600 rounded-full">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <div className="aspect-w-16 aspect-h-9 rounded-lg">
              <Image
                src="/shopgorsel.png"
                alt="Panom Nasıl Çalışır"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
