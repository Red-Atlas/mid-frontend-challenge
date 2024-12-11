import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Importa los estilos de Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect } from "react";

// Configurar los íconos de los marcadores
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41], // Ajusta el punto de anclaje del ícono
});

L.Marker.prototype.options.icon = defaultIcon; // Configura el ícono predeterminado para todos los marcadores

interface MapProps {
  location: { lat: number; lng: number } | null; // Recibe location como prop
}

function UpdateMapCenter({
  location,
}: {
  location: { lat: number; lng: number } | null;
}) {
  const map = useMap(); // Obtener referencia al mapa

  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 13, { animate: true });
      map.flyToBounds(
        [
          [location.lat, location.lng],
          [location.lat, location.lng],
        ],
        {
          paddingTopLeft: [800, 0],
          maxZoom: 17,
        }
      );
    }
  }, [location, map]);

  return null;
}

export default function Map({ location }: MapProps) {
  return (
    <>
      <MapContainer
        center={
          location ? [location.lat, location.lng] : [18.449804, -66.492857]
        }
        zoom={13}
        scrollWheelZoom={true}
        className="h-screen w-screen z-[2]"
      >
        {/* Capa base: Imágenes satelitales */}
        <TileLayer
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {/* Capa superpuesta: Calles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://server.arcgisonline.com/arcgis/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
          opacity={0.7} // Ajusta la opacidad para mezclar con la capa base
        />

        {/* Capa superpuesta: Fronteras y países */}
        <TileLayer
          attribution='&copy; <a href="https://www.naturalearthdata.com/">Natural Earth</a> contributors'
          url="https://server.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
          opacity={0.9} // Ajusta la opacidad para que sea visible
        />
        <UpdateMapCenter location={location} />
        <Marker
          position={
            location ? [location.lat, location.lng] : [18.449804, -66.492857]
          }
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}
