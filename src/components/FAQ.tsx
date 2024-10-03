import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Panoların minimum kiralama süresi ve fiyatları nedir?",
    answer:
      "Tüm pano ve reklam ünitelerinin minimum kiralama süreleri ve fiyatları; konum, boyut, sezon gibi birçok faktöre göre değişebilmektedir. Panom platformu üzerinden istediğiniz kriterlere göre arama yaparak, size en uygun seçenekleri anında görebilirsiniz.",
  },
  {
    question: "Reklam tasarımı konusunda yardım alabilir miyim?",
    answer:
      "Evet, Panom olarak profesyonel ve kurumsal planlarımızda özel tasarım desteği sunuyoruz. Ayrıca, tüm müşterilerimiz için temel tasarım şablonları ve rehberler sağlıyoruz.",
  },
  {
    question: "Kampanyamın performansını nasıl ölçebilirim?",
    answer:
      "Panom, gelişmiş analitik araçlar sunarak kampanyanızın performansını gerçek zamanlı olarak izlemenize olanak tanır. Görüntülenme tahminleri, hedef kitle analizleri ve etkileşim oranları gibi önemli metrikler dashboard'unuzda yer alır.",
  },
  {
    question: "Farklı şehirlerde aynı anda reklam verebilir miyim?",
    answer:
      "Kesinlikle! Panom, Türkiye genelinde geniş bir reklam ağına sahiptir. Platformumuz üzerinden birden fazla şehirde eş zamanlı olarak reklam kampanyaları planlayabilir ve yönetebilirsiniz.",
  },
];

const FAQ: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-800 mb-16 animate-fade-in-down">
          Sıkça Sorulan Sorular
        </h2>
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white border-2 border-indigo-200 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl"
              >
                <AccordionTrigger className="flex justify-between items-center w-full px-8 py-6 text-left text-lg font-semibold text-indigo-700 hover:text-indigo-900 focus:outline-none transition-colors duration-300">
                  <span className="flex-1 pr-4">{faq.question}</span>
                  <ChevronDown className="w-6 h-6 text-indigo-500 transform transition-transform duration-300" />
                </AccordionTrigger>
                <AccordionContent className="px-8 py-6 text-gray-700 bg-indigo-50 animate-fade-in">
                  <p className="leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
