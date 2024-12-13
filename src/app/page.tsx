"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Property, usePropertyContext } from "./context/PropertyContext";
import Filters from "./view/components/Filters";
import Area from "./view/components/Icons/Area";
import ArrowLeft from "./view/components/Icons/ArrowLeft";
import ArrowRigth from "./view/components/Icons/ArrowRigth";
import Location from "./view/components/Icons/Location";
import SectionMap from "./view/components/SectionMap";
import formatDate from "./view/utils/formatDate";
import DetailsProperty from "./view/components/DetailsProperty";

export default function Home() {
  const {
    properties,
    setProperties,
    selectedLocation,
    setSelectedLocation,
    filteredProperties,
    setFilteredProperties,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    setSelectedProperty,
    setIsPanelVisible,
  } = usePropertyContext();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          `https://fake-api-listings.vercel.app/properties?page=${currentPage}&limit=10`
        );
        const data = await response.json();
        setProperties(data);
        setFilteredProperties(data);
        // Calcular el total de páginas basado en el total de propiedades
        const totalProperties = 1000; // Número total de propiedades que debes obtener de la API o calcular
        const limit = 30; // El número de elementos por página
        const pages = Math.ceil(totalProperties / limit); // Total de páginas

        setTotalPages(pages); // Establecer el número total de páginas
        // console.log(data);
      } catch (error) {
        console.log("Error fetching properties", error);
      }
    };
    fetchProperties();
  }, [setProperties, setFilteredProperties, currentPage, setTotalPages]);

  useEffect(() => {
    console.log(properties);
    console.log(selectedLocation);
  }, [properties, selectedLocation]);

  const handleCardClick = (property: Property) => {
    setSelectedLocation(property.location);
    setSelectedProperty(property);
    setIsPanelVisible(true);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="relative w-full h-screen flex">
      <div className="min-w-auto max-w-[700px] max-h-[900px] absolute z-[10] bg-white rounded-lg m-20 py-3 shadow-lg">
        <h1 className="text-center font-bold mb-2">Propiedades</h1>
        <Filters />
        <div className="custom-scroll p-4 h-[600px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div
                  key={property?.id}
                  className="w-full bg-gray-100 rounded-md  shadow-md cursor-pointer hover:scale-105 transition ease-in-out duration-200"
                  onClick={() => handleCardClick(property)}
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
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                No se encontraron propiedades.
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handlePreviousPage}
            className="px-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            disabled={currentPage === 1}
          >
            <ArrowLeft />
          </button>
          <span className="self-center font-semibold text-base">
            {currentPage} de {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            className="px-2 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            disabled={currentPage === totalPages}
          >
            <ArrowRigth />
          </button>
        </div>
      </div>

      <DetailsProperty />

      <SectionMap location={selectedLocation} />
    </div>
  );
}
