import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostProperty } from "../../../hooks";
import { Status } from "../../../interfaces/postProperty.interface";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      const number = Number(value);
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

export function useFormCreate() {
  const uniqueId = uuidv4();
  const navigate = useNavigate();

  const { control, handleSubmit, getValues, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: undefined,
    mode: "all",
  });

  function resetFields() {
    Object.keys(getValues()).forEach((key) => {
      setValue(key as keyof FormData, "");
    });
  }
  const { mutate, isLoading, isSuccess } = usePostProperty({
    callback: resetFields,
  });

  const onSubmit = (data: FormData) => {
    mutate({
      id: uniqueId,
      address: data.address,
      title: data.title,
      description: data.description,
      location: {
        lat: 0,
        lng: 0,
      },
      images: ["https://dummyimage.com/800x600/cccccc/000000&text=Property+1"],
      type: data.typeOfProperty,
      status: data.state as Status,
      isActive: true,
      price: Number(data.price) || 0,
      area: 0,
      createdAt: new Date(),
      updatedAt: new Date("2024-12-12T14:10:43.027Z"),
      owner: {
        name: data.ownerName,
        contact: data.ownerAddress,
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return { control, onSubmit: handleSubmit(onSubmit), isLoading, isSuccess };
}
