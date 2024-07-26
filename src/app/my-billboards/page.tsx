"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/components/ProtectedRoute";

// Billboard tipini tanımlayalım
interface Billboard {
  id: number;
  name: string;
  owner_id: string;
  // Diğer billboard özellikleri...
}

const MyBillboards = () => {
  const { user } = useAuth();
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBillboards = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("billboards")
          .select("*")
          .eq("owner_id", user.id);

        if (error) throw error;

        setBillboards((data as Billboard[]) || []);
      } catch (error) {
        console.error("Error fetching billboards:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBillboards();
  }, [user]);

  return (
    <ProtectedRoute requiredRole="billboard_owner">
      <div>
        <h1>Panolarım</h1>
        {loading ? (
          <div>Yükleniyor...</div>
        ) : error ? (
          <div>Hata: {error}</div>
        ) : billboards.length === 0 ? (
          <p>Henüz pano eklenmemiş.</p>
        ) : (
          <ul>
            {billboards.map((billboard) => (
              <li key={billboard.id}>{billboard.name}</li>
            ))}
          </ul>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default MyBillboards;
