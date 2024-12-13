import { useQuery } from "@tanstack/react-query";
import { Property } from "../_types";
import axios from "axios";
import { defaultProperties } from "../properties";

export async function getProperty(id?: string): Promise<Property> {
  try {
    const response = await axios.get(
      `${import.meta.env["VITE_BASE_URL"]}/property/${id}`
    );

    if (!response.data) {
      return defaultProperties.find((pr) => pr.id === id)!;
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching property:", error);
    return defaultProperties.find((pr) => pr.id === id)!;
  }
}

export function useQueryProperty(id?: string) {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => getProperty(id),
    enabled: !!id,
  });
}
