import { useMutation } from "@tanstack/react-query";
import { CreateProperty, Property } from "../_types";
import axios from "axios";
import { toast } from "sonner";

export async function editProperty(
  data: CreateProperty,
  id: string
): Promise<Property> {
  const res = await axios.put(
    `${import.meta.env["VITE_BASE_URL"]}/properties/${id}`,
    data
  );
  return res.data;
}

export const useMutationEditProperty = () => {
  return useMutation({
    mutationFn: ({ values, id }: { values: CreateProperty; id: string }) =>
      editProperty(values, id),
    onError: () => {
      toast.error(
        "There was an error when trying to edit the property. Please try again later"
      );
    },
    onSuccess: () => {
      toast.success("Property successfully successfully created!");
    },
  });
};
