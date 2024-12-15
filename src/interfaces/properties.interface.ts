export interface PropertyResponse {
  limit: number
  page: number
  properties: Property[]
  total: number
  totalPages: number
}

export interface Property {
  id: string
  title: string
  description: string
  location: Location
  address: string
  images: string[]
  type: string
  status: string
  isActive: boolean
  price: number
  area: number
  createdAt: string
  updatedAt: string
  owner: Owner
}

export interface Location {
  lat: number
  lng: number
}

export interface Owner {
  name: string
  contact: string
}

export interface PropertyStatusInterface {
  property: Property[];
}

export interface AllPropertiesResponse {
    properties: Property[];
}

export interface CreatePropertyPayload {
  id?: string;
  address: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  images: string[];
  type: string;
  status: string;
  price: number;
  area: number;
  owner: {
    name: string;
    contact: string;
  };
}