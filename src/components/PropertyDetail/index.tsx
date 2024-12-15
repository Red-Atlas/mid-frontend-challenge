import './styles.css'
import { Property } from "../../services/PropertiesService";
import { FC, useState } from 'react';

import { formatDate } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { Map } from '../Map';

interface PropertyDetailInterface {
  property: Property;
}

export const PropertyDetail: FC<PropertyDetailInterface> = ({ property }) => {
  const navigate = useNavigate()
  const zoomLevel = 13;

  console.log(property);
  

  return (
    <>
      <div className="property-detail__container">
        <div className="property-detail__presentation">
          <figure 
            className='property-detail__image' 
            style={{
              backgroundImage: `url(${Array.isArray(property.images) && property.images.length > 0 ? property.images[0] : '/house-placeholder.png'})`
            }}
          />
          <h1 className="property-detail__title">{property.title}</h1>
          <h3 className="property-detail__subtitle">Discover more about this property!</h3>
        </div>
        <div className="property-detail__bottom-side">
          <div className="property-detail__description">
            <div className="property-detail__details">
              <p className="property-detail__details-title">Property Details</p>
              <p className="property-detail__details-item">
                <span className="property-detail__details-item-title">Price</span>
                <span>$ {property.price}</span>
              </p>
              <p className="property-detail__details-item">
                <span className="property-detail__details-item-title">Address</span>
                <span>{property.address}</span>
              </p>
              <p className="property-detail__details-item">
                <span className="property-detail__details-item-title">Property Type</span>
                <span>{property.type}</span>
              </p>
              <p className="property-detail__details-item">
                <span className="property-detail__details-item-title">Status</span>
                {property.status ? (<span>{property.status}</span>) : <div>No status available</div>}
              </p>
              <p className="property-detail__details-item">
                <span className="property-detail__details-item-title">Availability</span>
                <span>{property.isActive ? "Active" : "Inactive"}</span>
              </p>
              <p className="property-detail__details-item">
                <span className="property-detail__details-item-title">Area</span>
                {property.area ? (<span>{property.area}</span>) : <div>No area available</div>}
              </p>
              <p className="property-detail__details-item">
                <span className="property-detail__details-item-title">Publication Date</span>
                <span>{formatDate(property.createdAt)}</span>
              </p>
              {property.updatedAt && (
                <p className="property-detail__contact-item">
                  <span className="property-detail__contact-item-title">Last Update Date</span>
                  <span>{formatDate(property.updatedAt)}</span>
                </p>
              )}
            </div>
            <div className="property-detail__contact">
              <p className="property-detail__contact-title">Contact Info</p>
              <p className="property-detail__contact-item">
                <span className="property-detail__contact-item-title">Owner</span>
                <span>{property.owner.name}</span>
              </p>
              <p className="property-detail__contact-item">
                <span className="property-detail__contact-item-title">Email</span>
                <span>{property.owner.contact}</span>
              </p>
            </div>
          </div>
          <div className="property-detail__description-container">
            <p className="property-detail__description-title">Description</p>
            <p className="property-detail__description-text">
              {property.description ?? "No description available"}
            </p>
          </div>

          <p className="property-detail__details-title">Property Location</p>

          <Map
            locationInfo={[
              {
                location: { 
                  lat: property.location?.lat || 0, 
                  lng: property.location?.lng || 0 
                },
                locationName: property.title
              }
            ]}
            zoomLevel={zoomLevel}
          />

          <button 
            className="property-detail__edit-button"
            onClick={() => navigate(`/edit/${property.id}`)}
          >
            Edit Property
          </button>

        </div>
      </div>
    </>
  )
}
