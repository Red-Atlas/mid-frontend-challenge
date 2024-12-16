import { usePropertyContext } from "@/app/context/PropertyContext";
import React, { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function EditPropertyModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { selectedProperty, setProperties, setSelectedProperty } =
    usePropertyContext();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    area: 0,
    address: "",
    type: "apartment",
    status: "sale",
    isActive: true,
    owner: {
      name: "",
      contact: "",
    },
  });

  useEffect(() => {
    if (selectedProperty) {
      setFormData({
        title: selectedProperty.title || "",
        description: selectedProperty.description || "",
        price: selectedProperty.price || 0,
        area: selectedProperty.area || 0,
        address: selectedProperty.address || "",
        type: selectedProperty.type || "",
        status: selectedProperty.status || "",
        isActive: selectedProperty.isActive || false,
        owner: {
          name: selectedProperty.owner?.name || "",
          contact: selectedProperty.owner?.contact || "",
        },
      });
    }
  }, [selectedProperty]);

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
      title: "Estas seguro que deseas modificar esta propiedad?",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "red",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://fake-api-listings.vercel.app/properties/${selectedProperty?.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          const updatedProperty = await response.json();
          setProperties((prev) =>
            prev.map((property) =>
              property.id === updatedProperty.id ? updatedProperty : property
            )
          );
          if (selectedProperty?.id === updatedProperty.id) {
            setSelectedProperty(updatedProperty);
          }
          Swal.fire(
            "OK!",
            "Su propiedad ha sido modificada con exito!",
            "success"
          ); // Alerta de éxito
          onClose(); // Cerrar el modal
        } else {
          console.error("Error al actualizar la propiedad");
          Swal.fire(
            "Error!",
            "Ocurrio un error al modificar la propiedad.",
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
        <h2 className="text-xl font-bold mb-4">Editar Propiedad</h2>
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
              <option value="sale">Venta</option>
              <option value="rent">Alquiler</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Disponibilidad
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive === true}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, isActive: true }))
                  }
                  className="mr-2"
                />
                Disponible
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive === false}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, isActive: false }))
                  }
                  className="mr-2"
                />
                No disponible
              </label>
            </div>
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
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
            >
              Cancelar
            </button>
            <button
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
