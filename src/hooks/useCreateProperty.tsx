import { useMutation } from "@tanstack/react-query";
import propertiesService from "../services/properties.service";
import { toast } from "sonner";

export const useCreateProperty = () => {
  return useMutation({
    mutationKey: ["create-property"],
    mutationFn: propertiesService.createProperty,
    onSuccess: (newProperty) => {
      console.log("Propiedad creada:", newProperty);
      toast.success("La propiedad se creó correctamente.");
    },
    onError: (error) => {
      console.error("Error al crear la propiedad:", error);
      toast.error("Ocurrió un error al crear la propiedad.");
    },
  });
};
