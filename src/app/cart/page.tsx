"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

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
}

const CartPage: React.FC = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCartItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("cart_items")
        .select(
          `
          id,
          billboard:billboard_id (id, name, dimensions, price),
          start_date,
          end_date,
          design_url
        `
        )
        .eq("user_id", user?.id);

      if (error) throw error;

      // Veriyi doğru formata dönüştür
      const formattedData: CartItem[] = (data || []).map((item) => ({
        id: item.id,
        billboard: Array.isArray(item.billboard)
          ? item.billboard[0]
          : item.billboard,
        start_date: item.start_date,
        end_date: item.end_date,
        design_url: item.design_url,
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

  if (loading)
    return <div className="container mx-auto px-4 py-8">Yükleniyor...</div>;
  if (error)
    return (
      <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Sepetim</h1>
      {cartItems.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="mb-4 p-4 border rounded shadow-sm">
              <h2 className="text-xl font-semibold">{item.billboard.name}</h2>
              <p className="text-gray-600">
                Boyutlar: {item.billboard.dimensions}
              </p>
              <p className="text-gray-600">
                Tarih: {new Date(item.start_date).toLocaleDateString()} -{" "}
                {new Date(item.end_date).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                Fiyat: {item.billboard.price.toLocaleString("tr-TR")} TL
              </p>
              {item.design_url ? (
                <p className="text-green-500">Tasarım yüklendi</p>
              ) : (
                <p className="text-yellow-500">Tasarım henüz yüklenmedi</p>
              )}
            </div>
          ))}
          <div className="mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Siparişi Tamamla
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
