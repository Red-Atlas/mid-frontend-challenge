import { useMutation } from "@tanstack/react-query";
import { CreateProperty, Property } from "../_types";
import axios from "axios";
import { toast } from "sonner";

export async function createProperty(data: CreateProperty): Promise<Property> {
  const res = await axios.post(
    `${import.meta.env["VITE_BASE_URL"]}/properties`,
    data
  );
  return res.data;
}

export const useMutationAddProperty = () => {
  return useMutation({
    mutationFn: (values: CreateProperty) => createProperty(values),
    onError: () => {
      toast.error(
        "There was an error when trying to create a property. Please try again later"
      );
    },
    onSuccess: () => {
      toast.success("New property successfully created!");
    },
  });
};
