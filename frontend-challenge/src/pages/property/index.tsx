import React from "react";
import { useNavigate, useParams } from "react-router";
import { useQueryProperty } from "../../services/property/useQueryProperty";
import { BsArrowLeft, BsHouse } from "react-icons/bs";
import { FiClock, FiEdit, FiMapPin } from "react-icons/fi";
import { PiMapPinSimpleArea } from "react-icons/pi";
import "./styles.scss";
import { Map } from "../../components/map";

export const PropertyPage = () => {
  const { id } = useParams();
  const { data: property } = useQueryProperty(id);
  const navigate = useNavigate();

  return (
    property && (
      <main className="propertyPage">
        <section className="propertyHead">
          <button
            onClick={() => navigate("/")}
            className="goBack"
          >
            <BsArrowLeft />
            <p>Volver</p>
          </button>
          <div className="bottomRow">
            <h2>{property.title}</h2>
            <div className="rightRow">
              <p>{property.status === "rent" ? "En alquiler" : "En venta"}</p>
              <p>{property.price.toLocaleString()}</p>
              <button
                className="edit"
                onClick={() => navigate(`/newProperty/${id}`)}
              >
                <FiEdit />
                Editar propiedad
              </button>
            </div>
          </div>
        </section>
        <section className="propertyContent">
          <div className="imageWrapper">
            {property.images && property.images.length !== 0 && (
              <img
                src={property.images[0]}
                alt={property.description}
              />
            )}
          </div>
          <div className="infoWrapper">
            <div className="iconWrapper">
              <BsHouse />
              <p>{property.type}</p>
            </div>
            <div className="iconWrapper">
              <FiClock />
              <p>{property.formattedCreatedAt}</p>
            </div>
            <div className="iconWrapper">
              <FiMapPin />
              <p>{property.address}</p>
            </div>
            <div className="iconWrapper">
              <PiMapPinSimpleArea />
              <p>{property.area}</p>
            </div>
          </div>
        </section>
        <Map property={property} />
      </main>
    )
  );
};
