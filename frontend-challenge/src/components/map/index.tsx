import GoogleMapReact from "google-map-react";
import { Property } from "../../services/_types";
import { MapMarker } from "../mapMarker";
import "./styles.scss";

interface MapProps {
  property: Property;
}

export const Map = ({ property }: MapProps) => {
  return (
    <div className="mapWrapper">
      <GoogleMapReact
        defaultCenter={{
          lat: property.location.lat,
          lng: property.location.lng,
        }}
        bootstrapURLKeys={{ key: "" }}
        defaultZoom={13}
        center={{
          lat: property.location.lat,
          lng: property.location.lng,
        }}
      >
        <MapMarker property={property} />
      </GoogleMapReact>
    </div>
  );
};
