import { useNavigate, useParams } from "react-router-dom";

import {
  MaterialSymbolsChevronLeftRounded,
  MaterialSymbolsEditRounded,
} from "@/components/Icons";
import { currencyFormatter, dateFormatter } from "@/lib/formatters";
import { useUIContext } from "@/contexts/UIContext";
import { useProperty } from "@/hooks/useProperty";
import Button from "@/components/ui/button";
import Link from "@/components/ui/link";

export default function PropertyDetails() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  if (!params.id) {
    navigate("/");
    return null;
  }

  const { toggleListVisibility } = useUIContext();
  const { data, isLoading, error } = useProperty(params.id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-xl font-semibold text-gray-700">Cargando...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-xl font-semibold text-red-500">
          Error: {error instanceof Error ? error.message : "Desconocido"}
        </span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-xl font-semibold text-gray-700">
          Propiedad no encontrada.
        </span>
      </div>
    );
  }

  const {
    id,
    title,
    description,
    location,
    address,
    images,
    type,
    status,
    isActive,
    price,
    area,
    createdAt,
    updatedAt,
    owner,
  } = data;

  const handleBackWithPropertiesListOpen = () => {
    toggleListVisibility();
    navigate("/");
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm h-full flex-1 p-6 rounded-xl shadow-md gap-6 max-w-[768px] overflow-y-auto flex flex-col">
      <header className="flex items-center gap-6">
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={handleBackWithPropertiesListOpen}
            className="p-2"
          >
            <MaterialSymbolsChevronLeftRounded className="h-6 w-6" />
          </Button>
          <Link
            variant="secondary"
            to={`/propiedad/editar/${id}`}
            className="p-2"
          >
            <MaterialSymbolsEditRounded className="h-6 w-6" />
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </header>
      <img
        src={images[0]}
        alt={title}
        className="rounded-lg shadow-md object-cover w-full h-[400px]"
      />

      {/* Información general */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-gray-700">Detalles</h2>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>
            <strong>Dirección:</strong> {address}
          </li>
          <li>
            <strong>Precio:</strong> {currencyFormatter.format(price)}
          </li>
          <li>
            <strong>Área:</strong> {area} m²
          </li>
          <li>
            <strong>Tipo:</strong> <span className="capitalize">{type}</span>
          </li>
          <li>
            <strong>Estado:</strong>{" "}
            <span className="capitalize">{status}</span>
          </li>
          <li>
            <strong>Activo:</strong> {isActive ? "Sí" : "No"}
          </li>
          <li>
            <strong>Ubicación:</strong>{" "}
            {`Lat: ${location.lat}, Lng: ${location.lng}`}
          </li>
          <li>
            <strong>Creado el:</strong>{" "}
            {dateFormatter.format(new Date(createdAt))}
          </li>
          <li>
            <strong>Actualizado el:</strong>{" "}
            {dateFormatter.format(new Date(updatedAt))}
          </li>
        </ul>
      </div>

      {/* Descripción */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-700">Descripción</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {/* Propietario */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-700">Propietario</h2>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>
            <strong>Nombre:</strong> {owner.name}
          </li>
          <li>
            <strong>Contacto:</strong>{" "}
            <a
              href={`mailto:${owner.contact}`}
              className="text-blue-500 hover:underline"
            >
              {owner.contact}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
