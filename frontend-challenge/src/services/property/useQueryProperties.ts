import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Property } from "../_types";

export async function getProperties(): Promise<Property[]> {
  const response = await axios.get(
    `${import.meta.env["VITE_BASE_URL"]}/properties`
  );
  console.log(response);

  response.data = response.data.map((property: Property) => ({
    ...property,
    formattedCreatedAt: new Date(property.createdAt).toLocaleDateString("es", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  }));
  return response.data;
}

export function useQueryProperties() {
  return useQuery({ queryKey: ["properties"], queryFn: getProperties });
}
