import { useContext } from "react";

import PropertiesContext, { PropertiesContextType } from "../context/ContextProvider";
import { formatDate } from "../utils/formatDate";
import { generateRandomUUID } from "../utils/generateRandomUUID";
import { getCoordinates } from "../utils/getCoordinates";


export interface Location {
  lat: number;
  lng: number;
}

export interface Owner {
  name: string;
  contact: string;
}

export interface Property {
  id: string;
  title: string;
  description?: string;
  location?: Location;
  locationName?: string;
  address: string;
  images?: string[];
  type: string;
  status?: string;
  isActive?: boolean;
  price: number;
  area?: number;
  createdAt: string;
  updatedAt?: string;
  owner: Owner;
}

export type CreateProperty = Omit<Property, "id" | "createdAt" | "updatedAt">

export async function fetchProperties(): Promise<Property[]> {
  try {
    const response = await fetch("https://fake-api-listings.vercel.app/api-docs/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Response Error');
    }

    const data: Property[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}


export const getPropertiesFromJSON = () => {
  const context = useContext<PropertiesContextType | undefined>(PropertiesContext);
  const properties: Property[] = context?.state ?? [];

  return properties
}

export const getPropertyFromJSON = (id: string | undefined) => {
  const context = useContext<PropertiesContextType | undefined>(PropertiesContext);
  const properties: Property[] = context?.state ?? [];

  if (!id) {
    throw new Error("Id missing");
  }

  const filteredProperty = properties.find((item) => item.id === id);

  if (!filteredProperty) {
    throw new Error(`Property with id ${id} not found`);
  }

  return filteredProperty;
}

export const editProperty = async (property: Property, context: PropertiesContextType | undefined) => {
  const propertyToSave: Property = {
    ...property,
    updatedAt: formatDate(new Date())
  }

  if(property.locationName) {
    
    const propertyCoordinates = await getCoordinates(property.locationName)
    
    propertyToSave.location = {
      lat: propertyCoordinates?.lat || 0,
      lng: propertyCoordinates?.lng || 0
    }
  }
  
  context?.editProperty(propertyToSave);
}

export const createProperty = async (property: CreateProperty, context: PropertiesContextType | undefined) => {

  const propertyToSave: Property = {
    ...property,
    id: generateRandomUUID(),
    createdAt: formatDate(new Date())
  };

  if(property.locationName) {
    const propertyCoordinates = await getCoordinates(property.locationName)
    propertyToSave.location = {
      lat: propertyCoordinates?.lat || 0,
      lng: propertyCoordinates?.lng || 0
    }
  }

  context?.addProperty(propertyToSave);
}

