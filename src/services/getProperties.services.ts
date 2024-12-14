import axios from "axios";

import { axiosInstance } from "./axios-instance";
import { IGetProperties, IGetPropertiesMapped } from "../interfaces";
import {
  capitalizeFirstLetter,
  formatCurrency,
  formatDateToEnglish,
} from "../utils";

function propertiesMapper(
  properties: IGetProperties[]
): IGetPropertiesMapped[] {
  return properties.map((property) => ({
    title: capitalizeFirstLetter(property.title) || "No title",
    image: property.images[0] || "https://via.placeholder.com/150",
    address: capitalizeFirstLetter(property.address) || "No address",
    typeOfProperty: capitalizeFirstLetter(property.type) || "No type",
    price: formatCurrency(property.price) || "No price",
    state: capitalizeFirstLetter(property.status) || "No state",
    available: property.isActive || false,
    area: property.area || 0,
    dateAt: formatDateToEnglish(property.createdAt) || "No date",
    id: property.id,
    location: property.location,
    description:
      capitalizeFirstLetter(property.description) || "No description",
    owner: property.owner,
    priceWhitOutFormat: property.price,
  }));
}

export async function getProperties({ page = 1, limit = 10 } = {}) {
  try {
    const response = await axiosInstance.get<IGetProperties[]>("/properties", {
      params: { page, limit },
    });
    return propertiesMapper(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error fetching properties"
      );
    } else {
      throw new Error("Error fetching properties");
    }
  }
}