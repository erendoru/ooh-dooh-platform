import {
  IconSearch,
  IconUsers,
  IconLayoutGrid,
  IconHeadset,
  IconDeviceTv,
  IconPhoto,
} from "@tabler/icons-react";

const features = [
  {
    icon: <IconSearch className="w-8 h-8 text-blue-500" />,
    title: "Kolay Arama ve Rezervasyon",
    description:
      "Tek platformda tüm açık hava reklam alanlarını bulun ve anında rezervasyon yapın",
  },
  {
    icon: <IconUsers className="w-8 h-8 text-blue-500" />,
    title: "Hedef Kitle Analizi",
    description:
      "Detaylı demografik ve davranışsal verilerle en uygun lokasyonları seçin",
  },
  {
    icon: <IconLayoutGrid className="w-8 h-8 text-blue-500" />,
    title: "Esnek Kampanya Yönetimi",
    description:
      "Kampanyalarınızı gerçek zamanlı olarak düzenleyin ve optimize edin",
  },
  {
    icon: <IconHeadset className="w-8 h-8 text-blue-500" />,
    title: "7/24 Müşteri Desteği",
    description: "Uzman ekibimizle tüm sorularınıza anında yanıt alın",
  },
  {
    icon: <IconDeviceTv className="w-8 h-8 text-blue-500" />,
    title: "Çoklu Mecra Entegrasyonu",
    description:
      "Dijital billboardlardan geleneksel panolara kadar tüm mecraları tek noktadan yönetin",
  },
  {
    icon: <IconPhoto className="w-8 h-8 text-blue-500" />,
    title: "Performans Raporlama",
    description:
      "Detaylı analitiklerle kampanyalarınızın etkisini ölçün ve ROI'nizi artırın",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
