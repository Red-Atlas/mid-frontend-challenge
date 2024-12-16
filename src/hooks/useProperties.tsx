import { useQuery } from "@tanstack/react-query";
import propertiesService, {
  FetchPropertiesParams,
} from "../services/properties.service";

interface UsePropertiesParams extends FetchPropertiesParams {}

export const useProperties = ({ page, limit }: UsePropertiesParams) => {
  return useQuery({
    queryKey: ["properties", page, limit],
    queryFn: () => propertiesService.fetchProperties({ page, limit }),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
  });
};
