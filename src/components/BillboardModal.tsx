import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { getBillboardViews, addToCart } from "@/lib/supabase";
import DatePicker from "react-datepicker";
import { X } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { Billboard } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

interface BillboardModalProps {
  billboard: Billboard;
  onClose: () => void;
  onCartUpdate?: (newCount: number) => void;
}

const excludedDates = [
  new Date("2024-08-15"),
  new Date("2024-08-20"),
  new Date("2024-08-25"),
];

const BillboardModal: React.FC<BillboardModalProps> = ({
  billboard,
  onClose,
  onCartUpdate,
}) => {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [views, setViews] = useState<
    { view_date: string; view_count: number }[]
  >([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    async function fetchViews() {
      try {
        const data = await getBillboardViews(
          billboard.id,
          startDate.toISOString().split("T")[0],
          endDate.toISOString().split("T")[0]
        );
        setViews(data);
      } catch (error) {
        console.error("Error fetching views:", error);
      }
    }
    fetchViews();
  }, [billboard.id, startDate, endDate]);

  const handleStartDateChange = (date: Date | null) => {
    if (date) setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date) setEndDate(date);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === billboard.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? billboard.images.length - 1 : prevIndex - 1
    );
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert("Sepete eklemek için giriş yapmalısınız.");
      return;
    }

    setIsAddingToCart(true);
    try {
      const newCount = await addToCart(
        user.id,
        billboard.id,
        startDate.toISOString(),
        endDate.toISOString(),
        `Kampanya ${billboard.id}`
      );
      if (onCartUpdate) onCartUpdate(newCount);
      onClose();
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Sepete eklerken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogDescription>
            Bu dialog, reklam verme işlemi için kullanılmaktadır.
          </DialogDescription>
          {/* Dialog içeriği */}
          <Dialog.Close className="absolute top-2 right-2 p-1">
            <X className="h-6 w-6" />
          </Dialog.Close>

          <div className="relative w-full h-64 mb-4">
            <img
              src={billboard.images[currentImageIndex]}
              alt={`${billboard.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover rounded"
            />
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
            >
              →
            </button>
          </div>

          <Dialog.Title className="text-xl font-bold mb-4">
            {billboard.name}
          </Dialog.Title>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p>
                <strong>Konum:</strong> {billboard.location}
              </p>
              <p>
                <strong>Boyutlar:</strong> {billboard.dimensions}
              </p>
              <p>
                <strong>Taraf:</strong> {billboard.side}
              </p>
              <p>
                <strong>Ücret:</strong> {billboard.price} TL
              </p>
              <p>
                <strong>Pano Türü:</strong>{" "}
                {billboard.type?.name || "Belirtilmemiş"}
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong>Görüntülenme İstatistikleri:</strong>
              </p>
              <div className="flex flex-col space-y-2 mb-2">
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="w-full p-2 border rounded"
                  excludeDates={excludedDates}
                />
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="w-full p-2 border rounded"
                />
              </div>
              <ul className="max-h-32 overflow-y-auto">
                {views.map((view) => (
                  <li key={view.view_date}>
                    {view.view_date}: {view.view_count} görüntülenme
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              İptal
            </button>
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isAddingToCart ? "Ekleniyor..." : "Sepete Ekle"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BillboardModal;
