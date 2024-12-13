import React, { useState } from "react";
import { CiMapPin } from "react-icons/ci";
import "./styles.scss";
import { Property } from "../../services/_types";

interface MapMarkerProps {
  property: Property;
}

export const MapMarker = ({ property }: MapMarkerProps) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowInfo(!showInfo);
  };

  return (
    <>
      <div
        onClick={handleOnClick}
        className="markerWrapper"
      >
        <CiMapPin />
      </div>
      {showInfo && (
        <div className="infoBox">
          <h4>{property.title}</h4>
          <p>{property.description}</p>
        </div>
      )}
    </>
  );
};
