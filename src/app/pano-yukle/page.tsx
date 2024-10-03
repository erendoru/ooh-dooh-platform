"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import L from "leaflet";
import { LeafletMouseEvent } from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface BillboardType {
  id: number;
  name: string;
}
interface MapPickerProps {
  position: [number, number];
  setPosition: (position: [number, number]) => void;
}

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapPicker: React.FC<MapPickerProps> = ({ position, setPosition }) => {
  const map = useMapEvents({
    click(e: LeafletMouseEvent) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} icon={redIcon} /> : null;
};
const AddBillboard: React.FC = () => {
  const { user, userType } = useAuth();
  const router = useRouter();
  const [billboardTypes, setBillboardTypes] = useState<BillboardType[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    dimensions: "",
    side: "",
    price: "",
    latitude: "",
    longitude: "",
    images: [] as string[],
    type_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [mapPosition, setMapPosition] = useState([40.83, 29.45]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  useEffect(() => {
    if (userType !== "billboard_owner") {
      router.push("/");
    }
  }, [userType, router]);

  useEffect(() => {
    const fetchBillboardTypes = async () => {
      const { data, error } = await supabase
        .from("billboard_types")
        .select("*");
      if (error) {
        console.error("Pano türleri getirilirken hata oluştu:", error);
      } else {
        setBillboardTypes(data);
      }
    };
    fetchBillboardTypes();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user?.id}/${fileName}`;

      try {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("billboard-images")
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        if (!uploadData) {
          throw new Error("Yükleme başarılı oldu ancak veri döndürülmedi.");
        }

        const { data: urlData } = supabase.storage
          .from("billboard-images")
          .getPublicUrl(filePath);

        if (!urlData || !urlData.publicUrl) {
          throw new Error("Public URL alınamadı.");
        }

        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, urlData.publicUrl],
        }));
      } catch (error: unknown) {
        console.error("Görsel yüklenirken hata oluştu: ", error);
        setError(
          `Görsel yüklenemedi: ${
            error instanceof Error ? error.message : "Bilinmeyen hata"
          }`
        );
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.from("billboards").insert([
        {
          ...formData,
          price: parseFloat(formData.price),
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
          type_id: parseInt(formData.type_id),
          owner_id: user?.id,
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      setFormData({
        name: "",
        description: "",
        location: "",
        dimensions: "",
        side: "",
        price: "",
        latitude: "",
        longitude: "",
        images: [],
        type_id: "",
      });
    } catch (error) {
      console.error("Pano eklenirken hata oluştu: ", error);
      setError("Pano eklenemedi. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const [isBillboardOwner, setIsBillboardOwner] = useState(false);

  useEffect(() => {
    const checkBillboardOwnership = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("is_billboard_owner")
          .eq("id", user.id)
          .single();

        if (data && !error) {
          setIsBillboardOwner(data.is_billboard_owner);
        }
      }
    };

    checkBillboardOwnership();
  }, [user]);

  useEffect(() => {
    if (formData.latitude && formData.longitude) {
      setMapPosition([
        parseFloat(formData.latitude),
        parseFloat(formData.longitude),
      ]);
    }
  }, [formData.latitude, formData.longitude]);

  const handleMapChange = (newPosition: [number, number]) => {
    setMapPosition(newPosition);
    setFormData((prev) => ({
      ...prev,
      latitude: newPosition[0].toString(),
      longitude: newPosition[1].toString(),
    }));
  };

  if (userType !== "billboard_owner") {
    return (
      <div className="text-center mt-10">
        Bu sayfaya erişim izniniz bulunmamaktadır.
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto p-4 my-32">
      <h1 className="text-2xl font-bold mb-6">Yeni Pano Ekle</h1>
      {success && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Başarılı! </strong>
          <span className="block sm:inline">
            Panonuz başarıyla yüklenmiştir.
          </span>
        </div>
      )}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Hata! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Pano Adı
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Konum
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Açıklama
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="dimensions"
              className="block text-sm font-medium text-gray-700"
            >
              Boyutlar
            </label>
            <input
              type="text"
              id="dimensions"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="side"
              className="block text-sm font-medium text-gray-700"
            >
              Yön
            </label>
            <input
              type="text"
              id="side"
              name="side"
              value={formData.side}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Fiyat
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex gap-2">
            <div>
              <label
                htmlFor="latitude"
                className="block text-sm font-medium text-gray-700"
              >
                Enlem
              </label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                required
                step="any"
                min="-90"
                max="90"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="longitude"
                className="block text-sm font-medium text-gray-700"
              >
                Boylam
              </label>
              <input
                type="number"
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                required
                step="any"
                min="-180"
                max="180"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="type_id"
            className="block text-sm font-medium text-gray-700"
          >
            Pano Türü
          </label>
          <select
            id="type_id"
            name="type_id"
            value={formData.type_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Pano türü seçin</option>
            {billboardTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Görseller
          </label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageUpload}
            accept="image/*"
            multiple
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>
        {formData.images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Yüklenen ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        )}
        <div className="h-64 w-full mb-4">
          <MapContainer
            center={[mapPosition[0], mapPosition[1]]}
            zoom={10}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapPicker
              position={[mapPosition[0], mapPosition[1]]}
              setPosition={handleMapChange}
            />
          </MapContainer>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? "Ekleniyor..." : "Panoyu Kaydet"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBillboard;
