"use client";

import Image from "next/image";
import { useEffect } from "react";
import Area from "./view/components/Icons/Area";
import Location from "./view/components/Icons/Location";
import SectionMap from "./view/components/SectionMap";
import formatDate from "./view/utils/formatDate";
import { usePropertyContext } from "./context/PropertyContext";
import Search from "./view/components/Icons/Search";
import ArrowRigth from "./view/components/Icons/ArrowRigth";
import ArrowLeft from "./view/components/Icons/ArrowLeft";

export default function Home() {
  const {
    properties,
    setProperties,
    selectedLocation,
    setSelectedLocation,
    filteredProperties,
    setFilteredProperties,
    searchTerm,
    setSearchTerm,
    propertyType,
    setPropertyType,
    propertyStatus,
    setPropertyStatus,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
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
      // setLoading(false);
    };
    fetchProperties();
  }, [setProperties, setFilteredProperties, currentPage, setTotalPages]);

  useEffect(() => {
    console.log(properties);
    console.log(selectedLocation);
  }, [properties, selectedLocation]);

  useEffect(() => {
    const result = properties
      .filter((property) => {
        const matchesSearch =
          property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.address.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType =
          !propertyType ||
          property.type.toLowerCase() === propertyType.toLowerCase();

        const matchesStatus =
          !propertyStatus ||
          property.status.toLowerCase() === propertyStatus.toLowerCase();
        return matchesSearch && matchesType && matchesStatus;
      })
      .sort((a, b) => {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      });
    setFilteredProperties(result);
  }, [
    searchTerm,
    properties,
    setFilteredProperties,
    propertyType,
    propertyStatus,
    sortOrder,
  ]);

  const handleCardClick = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location); // Actualizar el estado con la ubicación de la propiedad seleccionada
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="relative w-full h-screen">
      <div className="min-w-auto max-w-[700px] max-h-[900px] absolute z-[10] bg-white rounded-lg m-20 py-3 shadow-lg">
        <h1 className="text-center font-bold mb-2">Propiedades</h1>
        <div className="px-4 ">
          <div className="relative w-full mb-2">
            <Search className="size-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por título o dirección..."
              className="w-full pl-10 h-10 text-sm border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4 mb-2">
            <select
              className="w-1/2 h-8 text-sm font-medium border rounded-md"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="">Tipo de propiedad</option>
              <option value="house">Casa</option>
              <option value="apartment">Departamento</option>
              <option value="land">Terreno</option>
              <option value="office">Oficina</option>
            </select>
            <select
              className="w-1/2 h-8 text-sm font-medium border rounded-md"
              value={propertyStatus}
              onChange={(e) => setPropertyStatus(e.target.value)}
            >
              <option value="">Estado</option>
              <option value="rent">Alquiler</option>
              <option value="sale">Venta</option>
            </select>
          </div>
          <div className="flex flex-row items-center gap-2 justify-end">
            <label className="text-gray-700 font-semibold">
              Ordenar por precio:
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm">Mayor precio</span>
              <label>
                <input
                  type="checkbox"
                  checked={sortOrder === "desc"}
                  onChange={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                  className=""
                />
              </label>
              <span className="text-sm">Menor precio</span>
              <label>
                <input
                  type="checkbox"
                  checked={sortOrder === "asc"}
                  onChange={() =>
                    setSortOrder(sortOrder === "desc" ? "asc" : "desc")
                  }
                  className=""
                />
              </label>
            </div>
          </div>
        </div>
        <div className="custom-scroll p-4 h-[600px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
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

      <SectionMap location={selectedLocation} />
    </div>
  );
}
