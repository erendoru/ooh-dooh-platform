"use client";

import React, { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import BillboardModal from "@/components/BillboardModal";
import { getBillboards } from "@/lib/supabase";

interface Billboard {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  location: string;
  dimensions: string;
  side: string;
  price: number;
  images: string[];
}

export default function AdvertisePage() {
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [selectedBillboard, setSelectedBillboard] = useState<Billboard | null>(
    null
  );

  useEffect(() => {
    async function fetchBillboards() {
      try {
        const data = await getBillboards();
        setBillboards(data);
      } catch (error) {
        console.error("Error fetching billboards:", error);
      }
    }
    fetchBillboards();
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
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
        {billboards.map((billboard) => (
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
        />
      )}
    </div>
  );
}
