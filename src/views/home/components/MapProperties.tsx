import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { IGetPropertiesMapped } from "../../../interfaces";
import { Icon, LatLngExpression } from "leaflet";

type Props = {
  properties: IGetPropertiesMapped[] | undefined;
};

const customIcon = new Icon({
  iconUrl: "/red-atlas-icon.png",
  iconSize: [32, 32], // Ajusta el tamaño del icono según sea necesario
});

export function MapProperties({ properties }: Props) {
  const center: LatLngExpression =
    properties && properties.length > 0
      ? [properties[0].location.lat, properties[0].location.lng]
      : [0, 0];

  return (
    <>
      {properties?.length !== 0 && properties && (
        <MapContainer
          center={center}
          zoom={13}
          style={{
            height: "80%",
            zIndex: 99,
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {properties.length !== 0 &&
            properties?.map((property) => (
              <Marker
                key={property.id}
                position={[property.location.lat, property.location.lng]}
                icon={customIcon}
              >
                <Popup>
                  <div>
                    <h3 className="text-xl">{property.title}</h3>
                    <p>{property.description}</p>
                    <p>
                      <strong>Precio: {property.price}</strong>
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      )}
    </>
  );
}
