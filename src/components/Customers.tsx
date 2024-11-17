"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[20rem] rounded-md flex flex-col antialiased bg-white  dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Normalde çok uzun süren e-posta yazışmalarıyla hallettiğimiz işleri artık çok daha hızlı bir şekilde çözüme kavuşturuyoruz. Bu platform sayesinde iş akışımız inanılmaz derecede hızlandı.",
    name: "Ayşe Yılmaz",
    title: "Dijital Vizyon Teknoloji",
  },
  {
    quote:
      "Tüm reklam panolarını tek bir platformda görebilmek ve detaylı bilgi edinebilmek müthiş bir kolaylık sağlıyor. Artık kampanyalarımızı çok daha etkili bir şekilde planlayabiliyoruz.",
    name: "Mehmet Kaya",
    title: "İnovasyon Reklam Ajansı",
  },
  {
    quote:
      "Her müşteriye özel uygun bir açık hava reklam alanı bulmak artık çok daha kolay. Müşteri memnuniyetimiz gözle görülür şekilde arttı.",
    name: "Zeynep Demir",
    title: "Kreatif Çözümler Ajansı",
  },
  {
    quote:
      "Bu platform sayesinde reklam kampanyalarımızı çok daha stratejik bir şekilde planlayabiliyoruz. Hedef kitlemize ulaşmak hiç bu kadar kolay olmamıştı.",
    name: "Ahmet Öztürk",
    title: "Dijital Dönüşüm Teknolojileri",
  },
  {
    quote:
      "Reklam alanlarını bu kadar detaylı inceleyebilmek ve hızlıca rezervasyon yapabilmek işimizi inanılmaz kolaylaştırdı. Artık çok daha verimli çalışıyoruz.",
    name: "Elif Şahin",
    title: "Yenilikçi Medya Grubu",
  },
];
