import { useMutation } from "@tanstack/react-query";
import propertiesService from "../services/properties.service";
import { Property } from "@/types/Property";
import { toast } from "sonner";

export const useUpdateProperty = () => {
  return useMutation({
    mutationKey: ["update-property"],
    mutationFn: (property: Partial<Property>) =>
      propertiesService.updateProperty(property.id as string, property),
    onSuccess: () => {
      toast.success("La propiedad se actualizó correctamente.");
    },
    onError: (error) => {
      console.error("Error al actualizar la propiedad:", error);
      toast.error("Ocurrió un error al actualizar la propiedad.");
    },
  });
};
