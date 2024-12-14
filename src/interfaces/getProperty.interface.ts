export interface IGetProperty {
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
  updatedAt: Date;
  owner: Owner;
}

interface Location {
  lat: number;
  lng: number;
}

interface Owner {
  name: string;
  contact: string;
}

export interface IGetPropertyMapped {
  title: string;
  image: string;
  address: string;
  typeOfProperty: string;
  price: string;
  state: string;
  available: boolean;
  area: number;
  dateAt: string;
  id: string;
  location: Location;
  description: string;
  owner: Owner;
  priceWhitOutFormat: number;
}
