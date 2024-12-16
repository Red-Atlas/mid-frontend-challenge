export interface Property {
  id: string;
  title: string;
  description: string;
  location: Location;
  address: string;
  images: string[];
  type: string;
  status: string;
  isActive: boolean;
  price: number;
  area: number;
  createdAt: string;
  updatedAt: string;
  owner: Owner;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Owner {
  name: string;
  contact: string;
}
