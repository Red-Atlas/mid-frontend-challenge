import { useQuery } from "@tanstack/react-query";
import propertiesService from "../services/properties.service";

export const useProperty = (id?: string) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => propertiesService.fetchProperty(id as string),
    enabled: !!id,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
  });
};
