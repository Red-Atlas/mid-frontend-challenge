import axios from "../lib/axios";
import { Property } from "../types/Property";

export interface Pagination {
  page: number;
  limit: number;
  total_pages: number;
}

export interface FetchPropertiesParams {
  page?: number;
  limit?: number;
}

export interface FetchPropertiesResponse {
  data: Property[];
  pagination: Pagination;
}

export interface FetchPropertiesCountResponse {
  count: number;
}

const { VITE_API_URL } = import.meta.env;

export class PropertiesService {
  async fetchProperties({
    page = 1,
    limit = 10,
  }: FetchPropertiesParams): Promise<FetchPropertiesResponse> {
    const { data } = await axios.get(
      `${VITE_API_URL}/properties?page=${page}&limit=${limit}`
    );

    const total_pages = await this.fetchPropertiesCount();

    return {
      data,
      pagination: {
        page,
        limit,
        total_pages: Math.ceil(total_pages.count / limit),
      },
    };
  }

  async fetchPropertiesCount() {
    const { data } = await axios.get<FetchPropertiesCountResponse>(
      `${VITE_API_URL}/properties/count`
    );

    return data;
  }

  async fetchProperty(id: string) {
    const { data } = await axios.get(`${VITE_API_URL}/properties/${id}`);

    return data;
  }

  async createProperty(property: Omit<Property, "id">) {
    const { data } = await axios.post(`${VITE_API_URL}/properties`, property);
    return data;
  }

  async updateProperty(
    id: string,
    updates: Partial<Property>
  ): Promise<Property> {
    const { data } = await axios.put(
      `${VITE_API_URL}/properties/${id}`,
      updates
    );
    return data;
  }

  async deleteProperty(id: string): Promise<void> {
    await axios.delete(`${VITE_API_URL}/properties/${id}`);
  }
}

export default new PropertiesService();
