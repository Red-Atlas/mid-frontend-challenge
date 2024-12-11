"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Area from "./view/components/Icons/Area";
import Location from "./view/components/Icons/Location";
import SectionMap from "./view/components/SectionMap";
import formatDate from "./view/utils/formatDate";

interface Property {
  id: number;
  type: string;
  status: string;
  isActive: boolean;
  images: string[];
  title: string;
  address: string;
  price: number;
  area: number;
  createdAt: string;
  location: {
    lat: number;
    lng: number;
  };
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "https://fake-api-listings.vercel.app/properties?page=1&limit=30"
        );
        const data = await response.json();
        setProperties(data);
        // console.log(data);
      } catch (error) {
        console.log("Error fetching properties", error);
      }
      setLoading(false);
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    console.log(properties);
    console.log(selectedLocation);
  }, [properties, selectedLocation]);

  const handleCardClick = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location); // Actualizar el estado con la ubicación de la propiedad seleccionada
  };

  return (
    <div className="relative w-full h-screen">
      <div className="min-w-auto max-w-[700px] max-h-[800px] absolute z-[10] bg-white rounded-lg m-20 py-3 shadow-lg">
        <h1 className="text-center font-bold mb-2">Listado de propiedades</h1>
        <div className="custom-scroll p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {properties.map((property) => (
              <div
                key={property?.id}
                className="w-full bg-gray-100 rounded-md  shadow-md cursor-pointer hover:scale-105 transition ease-in-out duration-200"
                onClick={() => handleCardClick(property.location)}
              >
                <div className="relative">
                  <div className="absolute px-2 m-2 bg-blue-200 rounded-2xl">
                    <span className="text-gray-700 font-semibold text-sm">
                      {property?.type}
                    </span>
                  </div>
                  <div className="absolute top-8 px-2 m-2 bg-yellow-200 rounded-2xl">
                    <span className="text-gray-700 font-semibold text-sm">
                      {property.status}
                    </span>
                  </div>
                  <div className="absolute top-16 px-2 m-2 bg-green-200 rounded-2xl">
                    <span className="text-gray-700 font-semibold text-sm">
                      {property.isActive ? "Disponible" : "No disponible"}
                    </span>
                  </div>
                </div>
                <Image
                  src={property.images[0]}
                  width={200}
                  height={200}
                  alt="Imagen"
                  className="w-full h-36 rounded-t-md"
                />

                <div className="p-2">
                  <h1 className="font-semibold mb-2 text-lg">
                    {property.title}
                  </h1>
                  <h2 className="font-semibold flex flex-row items-center text-base">
                    <Location />
                    {property.address}
                  </h2>
                  <h3 className="font-medium ml-1 text-base">
                    ${property.price}
                  </h3>
                  <h4 className="font-medium flex flex-row items-center text-base">
                    <Area />
                    {property.area}
                  </h4>
                  <h5 className="text-right text-sm font-semibold items-center">
                    {formatDate(property.createdAt)}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionMap location={selectedLocation} />
    </div>
  );
}
