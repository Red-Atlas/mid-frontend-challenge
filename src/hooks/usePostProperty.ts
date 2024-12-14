import { useMutation, useQueryClient } from "react-query";
import { IPostProperty, KEY_PROPERTIES } from "../interfaces";
import { postProperty } from "../services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type UsePostProperty = {
  callback?: () => void;
};

export function usePostProperty({ callback }: UsePostProperty) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (property: IPostProperty) => postProperty(property),
    onSuccess: () => {
      toast.success("Propiedad creada con éxito!");
      queryClient.invalidateQueries(KEY_PROPERTIES);
      if (callback) {
        callback();
      }
    },
    onError: () => {
      toast.error("Ocurrió un error al intentar crear la propiedad!");
      navigate("/error");
    },
  });
}
