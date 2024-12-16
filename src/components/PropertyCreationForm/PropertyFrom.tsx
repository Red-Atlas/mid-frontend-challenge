import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Property } from "@/types/Property";

import { useCreateProperty } from "@/hooks/useCreateProperty";
import { useUpdateProperty } from "@/hooks/useUpdateProperty";

const errorMessages = {
  title: "El Título es obligatorio",
  address: "La Dirección es obligatoria",
  description: "Debe ingresar una descripción",
  lat: {
    min: "¿Latitud menor a -90? Si existe eso se me congelan las coordenadas 🥶.",
    max: "Máxima latitud: 90. Más allá de eso das la vuelta.",
  },
  lng: {
    min: "¿Menor a -180? ¿Acaso se puede girar para atrás en una esfera?",
    max: "¿Mayor a 180? ¡Pará! Si das otra vuelta, volvés al principio.",
  },
  image: "Debe ser una URL válida",
  type: "Tipo de propiedad inválido",
  status: "Estado de propiedad inválido",
  price: {
    min: "No podés regalar una propiedad",
  },
  area: "El área debe ser mayor a 0",
  owner: {
    name: "El nombre es obligatorio",
    contact: "El contacto es obligatorio y debe ser un email válido",
  },
};

const PropertyCreationFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, errorMessages.title).max(100),
  address: z.string().min(3, errorMessages.address).max(100),
  description: z.string().min(3, errorMessages.description).max(400),
  location: z.object({
    lat: z
      .number({ message: "La latitud debe ser un número" })
      .min(-90, { message: errorMessages.lat.min })
      .max(90, { message: errorMessages.lat.max }),
    lng: z
      .number({ message: "La longitud debe ser un número" })
      .min(-180, { message: errorMessages.lng.min })
      .max(180, { message: errorMessages.lng.max }),
  }),
  image: z.string().url(errorMessages.image),
  type: z.enum(["apartment", "house", "land", "office"], {
    message: errorMessages.type,
  }),
  status: z.enum(["sale", "rent"], { message: errorMessages.status }),
  price: z
    .number({ message: "El precio debe ser un número válido" })
    .min(1, errorMessages.price.min),
  area: z
    .number({ message: "El área debe ser un número" })
    .min(1, errorMessages.area),
  owner: z.object({
    name: z.string().min(3, errorMessages.owner.name).max(100),
    contact: z.string().email(errorMessages.owner.contact).max(100),
  }),
});

type PropertyCreationFormSchemaType = z.infer<
  typeof PropertyCreationFormSchema
>;

interface PropertyCreationFormProps {
  mode: "create" | "edit";
  property?: Property;
}

export const mapPropertyToFormData = (
  property: Property
): PropertyCreationFormSchemaType => ({
  id: property.id,
  title: property.title,
  address: property.address,
  description: property.description,
  location: {
    lat: property.location.lat,
    lng: property.location.lng,
  },
  image: property.images[0] || "", // Usa la primera imagen o una cadena vacía
  type: property.type as "apartment" | "house" | "land" | "office",
  status: property.status as "sale" | "rent",
  price: property.price,
  area: property.area,
  owner: {
    name: property.owner.name,
    contact: property.owner.contact,
  },
});

export default function PropertyCreationForm({
  mode = "create",
  property,
}: PropertyCreationFormProps) {
  const createPropertyMutation = useCreateProperty();
  const updatePropertyMutation = useUpdateProperty();

  const defaultValues = property ? mapPropertyToFormData(property) : {};

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PropertyCreationFormSchemaType>({
    resolver: zodResolver(PropertyCreationFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    console.log("Mode:", mode);
    console.log("Valores por defecto:", defaultValues);
    reset();
  }, []);

  const onSubmit = async (data: PropertyCreationFormSchemaType) => {
    if (mode === "edit") {
      console.log("Editando propiedad:", data);
      await updatePropertyMutation.mutateAsync({
        ...data,
        images: [data.image],
        isActive: true,
        updatedAt: new Date().toISOString(),
      });
    } else {
      console.log("Creando nueva propiedad:", data);
      await createPropertyMutation.mutateAsync({
        ...data,
        images: [data.image],
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    reset();
  };

  return (
    <form
      className="max-w-2xl w-full flex flex-col m-auto flex-1 gap-4 pb-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className="flex flex-col">
        <h1 className="text-lg font-semibold text-gray-700">
          Crear nueva propiedad
        </h1>
        <p className="text-sm text-gray-600">
          Ingresa los datos de tu propiedad para que la puedas ver en el mapa.
        </p>
      </header>

      <label className="flex flex-col gap-2">
        <span className="text-sm text-gray-600">Título de la propiedad</span>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 p-2 px-4"
          {...register("title")}
          aria-invalid={!!errors.title}
        />
        {errors.title && (
          <span className="text-red-500 text-xs -mt-1 italic">
            {errors.title.message}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm text-gray-600">Dirección de la propiedad</span>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 p-2 px-4"
          {...register("address")}
          aria-invalid={!!errors.address}
        />
        {errors.address && (
          <span className="text-red-500 text-xs -mt-1 italic">
            {errors.address.message}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm text-gray-600">
          Descripción de la propiedad
        </span>
        <textarea
          className="w-full rounded-lg border border-gray-300 p-2 px-4"
          {...register("description")}
          aria-invalid={!!errors.description}
        />
        {errors.description && (
          <span className="text-red-500 text-xs -mt-1 italic">
            {errors.description.message}
          </span>
        )}
      </label>

      <div className="flex gap-2">
        <label className="flex flex-col gap-2 flex-1">
          <span className="text-sm text-gray-600">Latitud de la propiedad</span>
          <input
            type="number"
            step="0.00000001"
            className="w-full rounded-lg border border-gray-300 p-2 px-4"
            placeholder="Latitud"
            {...register("location.lat", { valueAsNumber: true })}
            aria-invalid={!!errors.location?.lat}
          />
          {errors.location?.lat && (
            <span className="text-red-500 text-xs -mt-1 italic">
              {errors.location.lat.message}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-2 flex-1">
          <span className="text-sm text-gray-600">
            Longitud de la propiedad
          </span>
          <input
            type="number"
            step="0.00000001"
            className="w-full rounded-lg border border-gray-300 p-2 px-4"
            placeholder="Longitud"
            {...register("location.lng", { valueAsNumber: true })}
            aria-invalid={!!errors.location?.lng}
          />
          {errors.location?.lng && (
            <span className="text-red-500 text-xs -mt-1 italic">
              {errors.location.lng.message}
            </span>
          )}
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm text-gray-600">Imagen de la propiedad</span>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 p-2 px-4"
          {...register("image")}
          aria-invalid={!!errors.image}
        />
        {errors.image && (
          <span className="text-red-500 text-xs -mt-1 italic">
            {errors.image.message}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm text-gray-600">Tipo de propiedad</span>
        <select
          className="w-full rounded-lg border border-gray-300 p-2 px-4"
          {...register("type")}
          aria-invalid={!!errors.type}
        >
          <option value="apartment">Apartamento</option>
          <option value="house">Casa</option>
          <option value="land">Tierra</option>
          <option value="office">Oficina</option>
        </select>
        {errors.type && (
          <span className="text-red-500 text-xs -mt-1 italic">
            {errors.type.message}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm text-gray-600">Estado</span>
        <select
          className="w-full rounded-lg border border-gray-300 p-2 px-4"
          {...register("status")}
          aria-invalid={!!errors.status}
        >
          <option value="sale">Venta</option>
          <option value="rent">Alquiler</option>
        </select>
        {errors.status && (
          <span className="text-red-500 text-xs -mt-1 italic">
            {errors.status.message}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm text-gray-600">Precio</span>
        <input
          type="number"
          className="w-full rounded-lg border border-gray-300 p-2 px-4"
          {...register("price", { valueAsNumber: true })}
          aria-invalid={!!errors.price}
        />
        {errors.price && (
          <span className="text-red-500 text-xs -mt-1 italic">
            {errors.price.message}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm text-gray-600">Área</span>
        <input
          type="number"
          className="w-full rounded-lg border border-gray-300 p-2 px-4"
          {...register("area", { valueAsNumber: true })}
          aria-invalid={!!errors.area}
        />
        {errors.area && (
          <span className="text-red-500 text-xs -mt-1 italic">
            {errors.area.message}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm text-gray-600">Propietario</span>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 p-2 px-4"
          placeholder="Nombre (Juan Perez)"
          {...register("owner.name")}
          aria-invalid={!!errors.owner?.name}
        />
        {errors.owner?.name && (
          <span className="text-red-500 text-xs -mt-1 italic">
            {errors.owner.name.message}
          </span>
        )}
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 p-2 px-4"
          placeholder="Contacto (jperez@gmail.com)"
          {...register("owner.contact")}
          aria-invalid={!!errors.owner?.contact}
        />
        {errors.owner?.contact && (
          <span className="text-red-500 text-xs -mt-1 italic">
            {errors.owner.contact.message}
          </span>
        )}
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`rounded-lg px-4 py-2 ${
          isSubmitting
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-red-700 text-white"
        }`}
      >
        {isSubmitting ? "Cargando..." : "Crear"}
      </button>
    </form>
  );
}
