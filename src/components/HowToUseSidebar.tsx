import React, { useState } from "react";
import { X } from "lucide-react";

interface HowToUseSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowToUseSidebar: React.FC<HowToUseSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed rounded m-2 right-0 top-16 h-[calc(100vh-28rem)] w-64 bg-white bg-opacity-90 shadow-lg p-6 overflow-y-auto transition-all duration-300 ease-in-out">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <X size={24} />
      </button>

      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Nasıl Kullanılır?
      </h2>

      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">
        <li>Kiralamak istediğiniz pano lokasyonunu seçin.</li>
        <li>Bilgileri kontrol edin.</li>
        <li>Sizden istenen boyut ve özelliklerde görselleri yükleyin.</li>
      </ol>

      <p className="text-sm text-gray-600 mb-4">
        Görsel tasarımı hakkında bilgi almak için:
      </p>

      <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
        Tasarım Bilgisi Al
      </button>

      <p className="mt-4 text-gray-700 font-light">
        Ödemenizi tamamladıktan sonra belirlediğiniz tarihlerde reklamınız
        panomuzda yayınlanacaktır.
      </p>
    </div>
  );
};

export default HowToUseSidebar;
