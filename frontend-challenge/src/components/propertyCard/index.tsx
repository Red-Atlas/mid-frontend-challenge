import { Property } from "../../services/_types";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BsHouse } from "react-icons/bs";
import { FiClock, FiMapPin } from "react-icons/fi";
import { PiMapPinSimpleArea } from "react-icons/pi";
import "./styles.scss";
import { useNavigate } from "react-router";

export const PropertyCard = ({
  id,
  title,
  description,
  address,
  images,
  type,
  status,
  isActive,
  price,
  area,
  createdAt,
}: Property) => {
  const navigate = useNavigate();

  const onNavigate = (id: string) => {
    navigate(`/property/${id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "numeric",
    });
  };

  return (
    <div
      className="propertyCard"
      onClick={() => onNavigate(id)}
      key={id}
    >
      <div className="imageWrapper">
        {images && images.length > 0 && (
          <img
            src={images[0]}
            alt={description}
          />
        )}
      </div>
      <div className="bottomCard">
        <h4>{title}</h4>
        <p>{description}</p>
        <div className="iconWrapper">
          <MdOutlineAttachMoney size={16} />
          <p className="price">{price.toLocaleString()}</p>
        </div>
        <div className="iconWrapper">
          <BsHouse />
          <p>{type}</p>
        </div>
        <div className="iconWrapper">
          <FiClock />
          <p>{formatDate(createdAt!)}</p>
        </div>
        <div className="info">
          <div className="iconWrapper">
            <span
              className={`status ${isActive ? "active" : "inactive"}`}
            ></span>
            <p> {isActive ? "Activo" : "Inactivo"}</p>
          </div>
          <div className="iconWrapper">
            <p>{status === "rent" ? "En alquiler" : "En venta"}</p>
          </div>
        </div>

        <div className="info">
          <div className="iconWrapper">
            <FiMapPin />
            <p>{address}</p>
          </div>
          <div className="iconWrapper">
            <PiMapPinSimpleArea />
            <p>{area}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
