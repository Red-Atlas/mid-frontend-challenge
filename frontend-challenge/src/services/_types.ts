export interface Property {
  id?: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  images: string[];
  type: "house" | "land" | "office" | "apartment" | string;
  status: "sale" | "rent" | string;
  isActive: boolean;
  price: number;
  area: number;
  createdAt?: string;
  updatedAt?: string;
  owner: {
    name: string;
    contact: string;
  };
  formattedCreatedAt?: string;
}

export interface CreateProperty {
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  images: string[];
  type: "house" | "land" | "office" | "apartment" | string;
  status: "sale" | "rent" | string;
  isActive: boolean;
  price: number;
  area: number;
  owner: string;
  formattedCreatedAt?: string;
}

export interface FiltersType {
  type: "house" | "land" | "office" | "apartment" | "all";
  status: "sale" | "rent" | "all";
  price: "up" | "down";
}
