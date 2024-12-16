import { Property } from "../../types/Property";
import { MaterialSymbolsOpenInFullRounded } from "../Icons";
import Link from "../ui/link";

interface PropertyCardProps {
  property: Property;
}

const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  dateStyle: "medium",
  timeStyle: "short",
});

function PropertyBadge({ type }: { type: string }) {
  return (
    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 capitalize rounded-xl">
      {type}
    </span>
  );
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link
      to={`/propiedad/${property.id}`}
      className="flex flex-col items-center h-full w-full overflow-hidden rounded-xl border-2 border-neutral-300/40"
    >
      <div className="relative w-full">
        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black/50 to-transparent">
          <span className="absolute top-4 text-xs font-semibold bg-red-700 text-red-50 px-5 py-0.5 rounded-r-xl">
            {property.isActive ? "Activo" : "Inactivo"}
          </span>
          <div className="absolute left-4 bottom-4 flex text-white">
            <PropertyBadge type={property.type} />
            <PropertyBadge type={property.status} />
          </div>
        </div>
        <img
          src={property.images[0]}
          alt="Logo"
          className="h-[200px] w-full object-contain bg-black"
        />
      </div>
      <div className="flex flex-col p-4 bg-white/90 w-full h-full">
        <h3 className="text-xl font-semibold text-ellipsis w-full overflow-hidden whitespace-nowrap">
          {property.title}
        </h3>
        <div className="flex items-end">
          {currencyFormatter.format(property.price)}
          <span className="text-sm ml-2 flex items-center gap-1">
            <MaterialSymbolsOpenInFullRounded className="h-4 w-4" />
            {property.area} m²
          </span>
        </div>
        <span className="text-sm">{property.address}</span>
        <span className="text-sm">
          {dateFormatter.format(new Date(property.createdAt))}
        </span>
      </div>
    </Link>
  );
}
