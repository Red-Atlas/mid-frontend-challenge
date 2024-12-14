import { Link } from "react-router-dom";
import { IGetPropertiesMapped } from "../../../interfaces";
import { Image } from "../../../components";

type Props = {
  property: IGetPropertiesMapped | undefined;
  isLoading?: boolean;
};

function Info({ text }: { text: string }) {
  return (
    <div className="flex gap-2 justify-center items-center">
      <div className="w-3 h-3 bg-blue-500 rounded-full lg:mx-0 focus:outline-none" />
      <p className="text-gray-500">{text}</p>
    </div>
  );
}

export function Cta({ property, isLoading }: Props) {
  if (isLoading || !property) {
    return null;
  }

  return (
    <section className="bg-white m-auto">
      <div className="container flex flex-col items-center px-4 py-12 mx-auto xl:flex-row">
        <div className="flex justify-center xl:w-1/2">
          <Image
            className="h-80 w-80 sm:w-[28rem] sm:h-[28rem] flex-shrink-0 object-cover rounded-full"
            src={property.image}
            alt={property.title}
          />
        </div>

        <div className="flex flex-col items-center mt-6 xl:items-start xl:w-1/2 xl:mt-0 gap-2">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl ">
            {property.title}
          </h2>

          <p className="block max-w-2xl mt-4 text-gray-500 ">
            {property.description}
          </p>

          <Info text={`Precio: ${property.price}`} />

          <Info
            text={`Ubicación: lat ${property.location.lat}  lng ${property.location.lng}`}
          />

          <Info text={`Dirección: ${property.address}`} />

          <Info text={`Tipo: ${property.typeOfProperty}`} />

          <Info text={`Disponible: ${property.available}`} />

          <Info text={`Status: ${property.state}`} />

          <Info text={`Area: ${property.area}`} />

          <Info
            text={`Dueño: ${property.owner.name} - Contacto:${property.owner.contact}`}
          />

          <Info text={`Fecha de publicación: ${property.dateAt}`} />

          <Info text={`Fecha de actualización: ${property.dateAt}`} />

          <div className="mt-6 sm:-mx-2">
            <Link
              to={"/"}
              className="inline-flex items-center justify-center w-full px-4 text-sm py-2.5 overflow-hidden text-white transition-colors duration-300 bg-gray-900 rounded-lg shadow sm:w-auto sm:mx-2 hover:bg-gray-700   focus:ring focus:ring-gray-300 focus:ring-opacity-80"
            >
              <span className="mx-2">Volver a la pagina principal</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
