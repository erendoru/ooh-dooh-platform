import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Başlangıç",
    price: "1.000₺",
    duration: "/ hafta",
    features: ["5 pano seçeneği", "Temel raporlama", "E-posta desteği"],
  },
  {
    name: "Profesyonel",
    price: "3.500₺",
    duration: "/ ay",
    features: [
      "20 pano seçeneği",
      "Gelişmiş raporlama",
      "7/24 destek",
      "Özel tasarım desteği",
    ],
  },
  {
    name: "Kurumsal",
    price: "Özel fiyat",
    duration: "",
    features: [
      "Sınırsız pano seçeneği",
      "Tam kapsamlı raporlama",
      "Öncelikli destek",
      "Kişiselleştirilmiş kampanya yönetimi",
    ],
  },
];

export default function PricingPlans() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Fiyatlandırma Planları
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={index === 1 ? "border-primary" : ""}>
              <CardHeader>
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-3xl font-bold">
                  {plan.price}
                  <span className="text-sm font-normal">{plan.duration}</span>
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Planı Seç</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
