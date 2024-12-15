import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { formatDate } from "../../utils/formatDate";
import { Property } from "../../services/PropertiesService";

import "./styles.css";


interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: FC<PropertyCardProps> = ({ property }) => {
  const navigate = useNavigate()
  
  return (
    <div className="property-card__container" onClick={()=> navigate(`detail/${property.id}`)}>
      <figure 
        className="property-card__image-container" 
        style={{
          backgroundImage: `url(${Array.isArray(property.images) && property.images.length > 0 ? property.images[0] : './house-placeholder.png'})`
        }}
      />
      <div className="property-card__description">
        <div className="property-card__upper-side">
          <span className="property-card__type">{property.type}</span>
          <h3 className="property-card__title">{property.title}</h3>
          <span className="property-card__item-title">Address</span>
          <span className="property-card__item">{property.address}</span>
          <span className="property-card__item-title">Status</span>
          {property.status ? 
          (<span className="property-card__item">{property.status}</span>)
          : 
          (<span className="property-card__item">{"No status available"}</span>)
          }          <span className="property-card__item-title">Availability</span>
          <span className="property-card__item">{property.isActive ? "Active" : "Inactive"}</span>
          <span className="property-card__item-title">Area</span>
          {property.area ? 
          (<span className="property-card__item">{property.area}</span>)
          : 
          (<span className="property-card__item">{"No area available"}</span>)
          }
          <span className="property-card__item-title">Publication Date</span>
          <span className="property-card__item">{formatDate(property.createdAt)}</span>
        </div>
        <div className="property-card__bottom-side">
          <span className="property-card__price-title">Total Price</span>
          <span className="property-card__price">$ {property.price}</span>
        </div>
      </div>
    </div>
  )
}