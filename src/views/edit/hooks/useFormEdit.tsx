import { z } from "zod";
import { IGetPropertyMapped } from "../../../interfaces";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { usePutProperty } from "../../../hooks";
import { Status } from "../../../interfaces/postProperty.interface";

type FormData = {
  title: string;
  description: string;
  address: string;
  typeOfProperty: string;
  state: string;
  price: string;
  ownerName: string;
  ownerAddress: string;
};
const REQUIRED = "Campo requerido";
const schemaString = z
  .string({ required_error: REQUIRED })
  .min(3, { message: REQUIRED });
const schemaPrice = z
  .string({ required_error: REQUIRED })
  .min(1, { message: REQUIRED })
  .refine(
    (value) => {
      const refine = value.replace(/[$.]/g, "");
      const number = Number(refine);
      if (isNaN(number)) {
        return false;
      }
      return true;
    },
    { message: "Solo se pueden ingresar números" }
  );

const schema = z.object({
  title: schemaString,
  description: schemaString,
  address: schemaString,
  typeOfProperty: schemaString,
  state: schemaString,
  price: schemaPrice,
  ownerName: schemaString,
  ownerAddress: schemaString,
});

function getDefaultValue(data: IGetPropertyMapped | undefined): FormData {
  const defaultValues = {
    title: data?.title || "",
    description: data?.description || "",
    address: data?.address || "",
    typeOfProperty: data?.typeOfProperty || "",
    state: data?.state || "",
    price: data?.price || "",
    ownerName: data?.owner?.name || "",
    ownerAddress: data?.owner?.contact || "",
  };

  return defaultValues;
}

function normalizePrice(price: string) {
  if (!price) return 0;
  return parseFloat(price.replace(/[$.]/g, "").trim()) || 0;
}

type useFormEditProp = {
  data: IGetPropertyMapped | undefined;
  id: string;
};

export function useFormEdit({ data, id }: useFormEditProp) {
  const { mutate, isLoading: isLoadingEdit } = usePutProperty({});

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: getDefaultValue(data),
    mode: "all",
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (data) {
      reset(getDefaultValue(data));
    }
  }, [data, reset]);

  function onSubmit(formData: FormData) {
    const dataToSend = {
      title: formData.title,
      description: formData.description,
      address: formData.address,
      type: formData.typeOfProperty,
      status: formData.state as Status,
      price: normalizePrice(formData.price),
      owner: {
        name: formData.ownerName,
        contact: formData.ownerAddress,
      },
    };

    mutate({ id: id || "", property: dataToSend });
  }
  return {
    onSubmit: handleSubmit(onSubmit),
    isLoadingEdit,
    control,
  };
}
