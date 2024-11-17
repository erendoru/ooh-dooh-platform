import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LeafletMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ onLocationSelect }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [redIcon, setRedIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    // Google Maps benzeri kırmızı ikonu oluştur
    const icon = L.icon({
      iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
      iconSize: [32, 32], // Google Maps ikonunun boyutu
      iconAnchor: [16, 32], // İkonun alt orta noktası
      popupAnchor: [0, -32], // Popup'ın ikonun üstünde görünmesi için
    });
    setRedIcon(icon);
  }, []);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        onLocationSelect(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  const AddScaleControl = () => {
    const map = useMap();
    useEffect(() => {
      if (!map.getContainer().querySelector(".leaflet-control-scale")) {
        L.control.scale().addTo(map);
      }
    }, [map]);
    return null;
  };

  return (
    <MapContainer
      center={[41.0082, 28.9784]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents />
      <AddScaleControl />
      {position && redIcon && <Marker position={position} icon={redIcon} />}
    </MapContainer>
  );
};

export default LeafletMap;
