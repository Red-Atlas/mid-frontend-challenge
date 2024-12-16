import PropertyCreationFrom from "@/components/PropertyCreationForm/PropertyFrom";
import { useProperty } from "@/hooks/useProperty";
import { useParams } from "react-router-dom";

export default function PropertyEditPage() {
  const { id } = useParams<{ id: string }>();

  const { data: propertyData, isLoading, isError, error } = useProperty(id);

  if (isLoading) return <p>Cargando datos de la propiedad...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return <PropertyCreationFrom mode="edit" property={propertyData} />;
}
