"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa";

interface Billboard {
  id: number;
  name: string;
  dimensions: string;
  price: number;
}

interface CartItem {
  id: string;
  billboard: Billboard;
  start_date: string;
  end_date: string;
  design_url: string | null;
  campaign_name: string;
}

const CartPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [campaignName, setCampaignName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [uploadingDesign, setUploadingDesign] = useState<string | null>(null);

  const handleDeleteItem = async () => {
    if (!itemToDelete) return;

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemToDelete);

      if (error) throw error;

      fetchCartItems();
      setShowAlert(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Ürün silinirken hata oluştu:", error);
      setError("Ürün silinirken bir hata oluştu.");
    }
  };

  const fetchCartItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: carts } = await supabase
        .from("carts")
        .select("id", { count: "exact" })
        .eq("user_id", user?.id);

      const { data, error } = await supabase
        .from("cart_items")
        .select(
          `
          id,
          billboard:billboard_id (id, name, dimensions, price),
          start_date,
          end_date,
          design_url,
          campaign_name
        `
        )
        .eq("cart_id", carts?.[0]?.id);

      if (error) throw error;

      const formattedData: CartItem[] = (data || []).map((item) => ({
        id: item.id,
        billboard: Array.isArray(item.billboard)
          ? item.billboard[0]
          : item.billboard,
        start_date: item.start_date,
        end_date: item.end_date,
        design_url: item.design_url,
        campaign_name: item.campaign_name,
      }));

      setCartItems(formattedData);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Sepet öğeleri yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  const handleFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: string
  ) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDesign(itemId);

    try {
      const { data, error } = await supabase.storage
        .from("designs")
        .upload(`${user?.id}/${itemId}`, file);

      if (error) {
        if (error.message.includes("bucket not found")) {
          throw new Error(
            "Depolama alanı bulunamadı. Lütfen yöneticiyle iletişime geçin."
          );
        }
        throw error;
      }

      const { data: updateData, error: updateError } = await supabase
        .from("cart_items")
        .update({ design_url: data.path })
        .eq("id", itemId);

      if (updateError) throw updateError;

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, design_url: data.path } : item
        )
      );
    } catch (error) {
      console.error("Dosya yükleme hatası:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Dosya yüklenirken bir hata oluştu."
      );
    } finally {
      setUploadingDesign(null);
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const allDesignsUploaded = cartItems.every((item) => item.design_url);
    console.log("sipariş verildi");
    if (!allDesignsUploaded) {
      setError("Lütfen tüm panolar için tasarım yükleyin.");
      return;
    }
    if (!campaignName) {
      setError("Lütfen bir kampanya adı girin.");
      return;
    }
    router.push("/checkout");
  };

  if (loading)
    return <div className="container mx-auto px-4 py-8">Yükleniyor...</div>;
  if (error)
    return (
      <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>
    );

  return (
    <div className="container mx-auto px-4 py-8 lg:mt-16">
      <h1 className="text-2xl font-bold mb-4">Sepetim</h1>
      {cartItems.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        <div>
          <div className="flex items-center mb-4 justify-between">
            <div>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Kampanya Adı"
                className="border border-gray-300 rounded-md px-3 py-2 mr-4"
              />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Tasarım Desteği Al
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg relative"
              >
                <button
                  onClick={() => {
                    setItemToDelete(item.id);
                    setShowAlert(true);
                  }}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors duration-300"
                >
                  <FaTimes />
                </button>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    {item.billboard.name}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Boyutlar:
                      </span>
                      <span className="text-sm text-gray-800">
                        {item.billboard.dimensions}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Tarih Aralığı:
                      </span>
                      <span className="text-sm text-gray-800">
                        {new Date(item.start_date).toLocaleDateString()} -{" "}
                        {new Date(item.end_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-gray-600">
                      Fiyat:
                    </span>
                    <span className="text-lg font-bold text-gray-800">
                      {item.billboard.price.toLocaleString("tr-TR")} TL
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-sm font-medium text-gray-600 mb-2 block">
                      Tasarım:
                    </span>
                    {item.design_url ? (
                      <span className="text-sm text-gray-800 bg-gray-100 px-3 py-1 rounded-full">
                        {item.design_url.split("/").pop()}
                      </span>
                    ) : (
                      <div>
                        <label
                          htmlFor={`file-upload-${item.id}`}
                          className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-full text-sm hover:bg-blue-600 transition duration-300 ease-in-out inline-block"
                        >
                          Tasarımı Yükle
                        </label>
                        <input
                          id={`file-upload-${item.id}`}
                          type="file"
                          onChange={(e) => handleFileSelect(e, item.id)}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleCompleteOrder}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Siparişi Tamamla
            </button>
          </div>
        </div>
      )}

      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              Panoyu Silmek İstediğinize Emin Misiniz?
            </h2>
            <p className="mb-4">Panoyu Sil</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowAlert(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                İptal
              </button>
              <button
                onClick={handleDeleteItem}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
