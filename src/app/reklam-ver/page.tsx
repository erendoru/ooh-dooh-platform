"use client";

import React, { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import BillboardModal from "../../components/BillboardModal";
import HowToUseSidebar from "../../components/HowToUseSidebar";
import { Billboard, BillboardType } from "@/types";

const MapComponent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {
    user,
    loading: authLoading,
    error: authError,
    refreshUser,
  } = useAuth();
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [filteredBillboards, setFilteredBillboards] = useState<Billboard[]>([]);
  const [selectedBillboard, setSelectedBillboard] = useState<Billboard | null>(
    null
  );
  const [billboardTypes, setBillboardTypes] = useState<BillboardType[]>([]);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  useEffect(() => {
    const fetchBillboardsAndTypes = async () => {
      setLoading(true);
      setError(null);
      try {
        const [billboardsResponse, typesResponse] = await Promise.all([
          supabase
            .from("billboards")
            .select("*, type:billboard_types(id, name)"),
          supabase.from("billboard_types").select("*"),
        ]);

        if (billboardsResponse.error) throw billboardsResponse.error;
        if (typesResponse.error) throw typesResponse.error;

        setBillboards(billboardsResponse.data as Billboard[]);
        setFilteredBillboards(billboardsResponse.data as Billboard[]);
        setBillboardTypes(typesResponse.data as BillboardType[]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBillboardsAndTypes();
    } else {
      setBillboards([]);
      setFilteredBillboards([]);
      setSelectedBillboard(null);
    }
  }, [user]);

  useEffect(() => {
    if (selectedType) {
      setFilteredBillboards(
        billboards.filter((billboard) => billboard.type?.id === selectedType)
      );
    } else {
      setFilteredBillboards(billboards);
    }
  }, [selectedType, billboards]);

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Panoları görmek için giriş yapın veya kayıt olun...
      </div>
    );
  }
  const handleCartUpdate = (newCount: number) => {
    setCartItemCount(newCount);
  };
  if (authError || error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-500 mb-4">{authError || error}</p>
        <button
          onClick={refreshUser}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Tekrar Deneyin
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Panoları görmek için giriş yapın.
      </div>
    );
  }

  return (
    <div
      className="relative"
      style={{ width: "100vw", height: "calc(110vh - 64px)" }}
    >
      <div className="absolute top-4 left-4 z-10 p-6 rounded-lg ">
        <h3 className="font-bold mb-2">Pano Türü Filtrele:</h3>
        <div className="flex flex-wrap gap-2">
          <label className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <input
              type="radio"
              name="billboardType"
              value=""
              checked={selectedType === null}
              onChange={() => setSelectedType(null)}
              className="mr-2"
            />
            Tümü
          </label>
          {billboardTypes.map((type) => (
            <label
              key={type.id}
              className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
            >
              <input
                type="radio"
                name="billboardType"
                value={type.id}
                checked={selectedType === type.id}
                onChange={() => setSelectedType(type.id)}
                className="mr-2"
              />
              {type.name}
            </label>
          ))}
        </div>
      </div>

      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: 28.9784,
          latitude: 41.0082,
          zoom: 10,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {filteredBillboards.map((billboard) => (
          <Marker
            key={billboard.id}
            longitude={billboard.longitude}
            latitude={billboard.latitude}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedBillboard(billboard);
            }}
          >
            <img
              src="/pin.png"
              alt="Billboard Location"
              style={{ width: "30px", height: "30px" }}
            />
          </Marker>
        ))}
      </Map>
      {selectedBillboard && (
        <BillboardModal
          billboard={selectedBillboard}
          onClose={() => setSelectedBillboard(null)}
          onCartUpdate={handleCartUpdate}
        />
      )}
      <HowToUseSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out"
        >
          Nasıl Kullanılır?
        </button>
      )}
    </div>
  );
};

export default MapComponent;
