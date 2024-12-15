import { usePropertyContext } from "@/app/context/PropertyContext";
import React, { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function CreatePropertyModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    selectedProperty,
    setProperties,
    newLocation,
    setNewLocation,
    setIsSelectingLocation,
  } = usePropertyContext();
  console.log(newLocation?.lat, newLocation?.lng);

  // const [newLocation, setNewLocation] = useState({ lat: "", lng: "" });

  // Estado inicial con las propiedades requeridas
  const [formData, setFormData] = useState({
    title: selectedProperty?.title || "",
    description: selectedProperty?.description || "",
    price: selectedProperty?.price || "",
    area: selectedProperty?.area || "",
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: "",
    address: selectedProperty?.address || "",
    images: ["https://dummyimage.com/800x600/cccccc/000000&text=Property+1"],
    type: selectedProperty?.type || "",
    status: selectedProperty?.status || "",
    isActive: selectedProperty?.isActive || true,
    owner: {
      name: selectedProperty?.owner?.name || "",
      contact: selectedProperty?.owner?.contact || "",
    },
    location: {
      lat: selectedProperty?.location?.lat || "",
      lng: selectedProperty?.location?.lng || "",
    },
  });

  useEffect(() => {
    if (newLocation?.lat && newLocation?.lng) {
      setFormData((prev) => ({
        ...prev,
        location: {
          lat: newLocation.lat,
          lng: newLocation.lng,
        },
      }));
    }
  }, [newLocation]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("owner.")) {
      // Si el campo pertenece al objeto owner
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        owner: {
          ...prev.owner,
          [key]: value,
        },
      }));
    } else if (name === "location.lat" || name === "location.lng") {
      // Actualiza la latitud o longitud en el estado de ubicación
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "price" || name === "area" ? Number(value) : value, // Convertimos a número si es necesario
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mostrar la alerta de confirmación
    const result = await Swal.fire({
      title: "Estas seguro que deseas crear esta propiedad?",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "red",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://fake-api-listings.vercel.app/properties`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          const newProperty = await response.json();
          console.log(newProperty);

          // Actualiza la lista de propiedades añadiendo la nueva propiedad
          setProperties((prev) => [...prev, newProperty]);
          Swal.fire("OK!", "Su propiedad ha sido creada con exito!", "success"); // Alerta de éxito
          onClose(); // Cerrar el modal
        } else {
          console.error("Error al crear la propiedad");
          Swal.fire(
            "Error!",
            "Ocurrio un error al crear la propiedad.",
            "error"
          ); // Alerta de error
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire("Error!", "Something went wrong.", "error"); // Alerta de error
      }
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info"); // Alerta de cambios no guardados
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh] custom-scroll">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Crear una nueva propiedad</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Título</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Precio</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Área</label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Dirección</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tipo</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="">Seleccione tipo de inmueble</option>
              <option value="apartment">Departamento</option>
              <option value="house">Casa</option>
              <option value="land">Terreno</option>
              <option value="office">Oficina</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Estado</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="">Seleccione estado</option>
              <option value="sale">Venta</option>
              <option value="rent">Alquiler</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Propietario</label>
            <div className="space-y-2">
              <input
                type="text"
                name="owner.name"
                value={formData.owner.name}
                onChange={handleChange}
                placeholder="Nombre del propietario"
                className="w-full border rounded-md p-2"
                required
              />
              <input
                type="email"
                name="owner.contact"
                value={formData.owner.contact}
                onChange={handleChange}
                placeholder="Contacto del propietario"
                className="w-full border rounded-md p-2"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Latitud</label>
            <input
              type="text"
              name="location.lat"
              value={formData.location.lat}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Longitud</label>
            <input
              type="text"
              name="location.lng"
              value={formData.location.lng}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          {/* Botón para seleccionar la ubicación en el mapa */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => {
                setIsSelectingLocation(true);
                onClose();
              }}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Seleccionar ubicación en el mapa
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                onClose();
                setIsSelectingLocation(false);
                setNewLocation({ lat: 0, lng: 0 });
              }}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
            >
              Cancelar
            </button>
            <button
              onClick={() => setIsSelectingLocation(false)}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
