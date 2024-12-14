import { useMutation, useQueryClient } from "react-query";
import { deleteProperty } from "../services/deleteProperty.services";
import { KEY_PROPERTIES } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useDeleteProperty() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProperty(id),
    onSuccess: () => {
      toast.success("Propiedad borrada con éxito!");
      queryClient.invalidateQueries(KEY_PROPERTIES);
    },
    onError: () => {
      toast.error("Ocurrió un error al intentar borrar la propiedad!");
      navigate("/error");
    },
  });
}
