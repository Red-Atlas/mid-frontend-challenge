"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Property {
  id: number;
  type: string;
  status: string;
  isActive: boolean;
  images: string[];
  title: string;
  description: string;
  address: string;
  price: number;
  area: number;
  createdAt: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface PropertyContextProps {
  properties: Property[];
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  selectedLocation: { lat: number; lng: number } | null;
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number } | null>
  >;
  filteredProperties: Property[];
  setFilteredProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  propertyType: string;
  setPropertyType: React.Dispatch<React.SetStateAction<string>>;
  propertyStatus: string;
  setPropertyStatus: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  selectedProperty: Property | null;
  setSelectedProperty: React.Dispatch<React.SetStateAction<Property | null>>;
  isPanelVisible: boolean;
  setIsPanelVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PropertyContext = createContext<PropertyContextProps | undefined>(
  undefined
);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [propertyStatus, setPropertyStatus] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1); // Página actual
  const [totalPages, setTotalPages] = useState<number>(0); // Total de páginas disponibles
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);

  return (
    <PropertyContext.Provider
      value={{
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
        selectedProperty,
        setSelectedProperty,
        isPanelVisible,
        setIsPanelVisible,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error(
      "usePropertyContext must be used within a PropertyProvider"
    );
  }
  return context;
};
