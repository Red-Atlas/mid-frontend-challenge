import { useMutation, useQueryClient } from "react-query";
import { IPostProperty, KEY_PROPERTIES } from "../interfaces";
import { putProperty } from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type UsePutPropertyProps = {
  callback?: () => void;
};

export function usePutProperty({ callback }: UsePutPropertyProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      property,
      id,
    }: {
      property: Partial<IPostProperty>;
      id: string;
    }) => putProperty(property, id),
    onSuccess: () => {
      toast.success(
        "Propiedad editada con éxito! Sera redirigido a la lista de propiedades."
      );
      queryClient.invalidateQueries(KEY_PROPERTIES);
      if (callback) {
        callback();
      }
      navigate("/");
    },
    onError: () => {
      toast.error("Ocurrió un error al intentar editar la propiedad!");
    },
  });
}
