export interface Property {
    id?: string;
    address: string;
    title: string;
    description: string;
    location: {
      lat: number;
      lng: number;
    };
    images: string[];
    type: "apartment" | "house" | "office" | "land"; 
    status: "sale" | "rent";
    isActive: boolean;
    price: number;
    area: number;
    createdAt?: string; 
    updatedAt: string;
    owner: {
      name: string;
      contact: string;
    };
  }
  