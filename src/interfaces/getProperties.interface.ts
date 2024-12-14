export interface IGetProperties {
  id: string;
  title: string;
  description: string;
  location: Location;
  address: string;
  images: string[];
  type: string;
  status: Status;
  isActive: boolean;
  price: number;
  area: number;
  createdAt: string;
  updatedAt: Date;
  owner: Owner;
}

export interface IGetPropertiesMapped {
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

interface Location {
  lat: number;
  lng: number;
}

interface Owner {
  name: string;
  contact: string;
}

enum Status {
  Rent = "rent",
  Sale = "sale",
}
