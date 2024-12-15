import { usePropertyContext } from "@/app/context/PropertyContext";
import Image from "next/image";
import formatDate from "../utils/formatDate";
import ArrowLeft from "./Icons/ArrowLeft";
import ArrowRigth from "./Icons/ArrowRigth";
import Edit from "./Icons/Edit";
import { useState } from "react";
import EditPropertyModal from "./EditPropertyModal";

export default function DetailsProperty() {
  const { selectedProperty, isPanelVisible, setIsPanelVisible } =
    usePropertyContext();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <div
        className={`fixed  right-0 top-0 rounded-l-lg mt-8 z-20 bg-gray-100 shadow-lg transition-transform duration-300 ${
          isPanelVisible ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "400px" }}
      >
        {selectedProperty && (
          <button
            className="absolute left-[-36px] top-1/2 transform -translate-y-1/2 bg-blue-500 text-white py-6 px-2 rounded-l-lg"
            onClick={() => setIsPanelVisible(!isPanelVisible)}
          >
            {isPanelVisible ? <ArrowRigth /> : <ArrowLeft />}
          </button>
        )}

        {selectedProperty && (
          <div className="p-4 overflow-y-auto ">
            <h2 className="text-xl font-bold mb-4">{selectedProperty.title}</h2>
            <Image
              src={selectedProperty.images[0]}
              width={300}
              height={200}
              alt="Imagen de propiedad"
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="text-sm mt-2 font-medium">
              {selectedProperty.description}
            </p>
            <h3 className="font-semibold mt-2">
              Precio: ${selectedProperty.price}
            </h3>
            <h4 className="font-semibold">Área: {selectedProperty.area} m²</h4>
            <p className="mt-2 text-gray-700">{selectedProperty.address}</p>

            <div className="flex flex-row justify-between">
              <p className="text-sm text-gray-500 mt-2">
                Publicado: {formatDate(selectedProperty.createdAt)}
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-sm py-2 px-2 rounded-md text-white font-medium flex flex-row gap-1"
              >
                <Edit />
                Editar propiedad
              </button>
            </div>
            <div className="mt-4 border-t pt-2">
              <h3 className="font-semibold mb-2">Contacto</h3>
              <p className="text-sm font-medium">
                Nombre: {selectedProperty.owner.name}
              </p>
              <p className="text-sm font-medium">
                Contacto: {selectedProperty.owner.contact}
              </p>
            </div>
          </div>
        )}
      </div>
      <EditPropertyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
