import { FC, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Property } from "../../services/PropertiesService";
import PropertiesContext, { PropertiesContextType } from '../../context/ContextProvider';

import './styles.css';


interface EditPropertyInterface {
  property: Property;
  onSave: (newProperty: Property, context: PropertiesContextType | undefined) => void;
}

export const EditProperty: FC<EditPropertyInterface> = ({ property, onSave }) => {
  const [editedProperty, setEditedProperty] = useState(property);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const context = useContext<PropertiesContextType | undefined>(PropertiesContext);
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProperty({
      ...editedProperty,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: string[] } = {};
  
    const titleErrors: string[] = [];
    if (!editedProperty.title) {
      titleErrors.push("Title is required");
    } else if (editedProperty.title.length < 2) {
      titleErrors.push("Title must be at least 2 characters");
    } else if (editedProperty.title.length > 100) {
      titleErrors.push("Title must be less than 100 characters");
    }
    if (titleErrors.length > 0) newErrors.title = titleErrors;
  
    const addressErrors: string[] = [];
    if (!editedProperty.address) {
      addressErrors.push("Address is required");
    }
    if (addressErrors.length > 0) newErrors.address = addressErrors;

    const typeErrors: string[] = [];
    if (!editedProperty.type) {
      typeErrors.push("Property type is required");
    }
    if (typeErrors.length > 0) newErrors.type = typeErrors;
  
    const ownerNameErrors: string[] = [];
    if (!editedProperty.owner.name) {
      ownerNameErrors.push("Owner name is required");
    }
    if (ownerNameErrors.length > 0) newErrors.ownerName = ownerNameErrors;

    const ownerContactErrors: string[] = [];
    if (!editedProperty.owner.contact) {
      ownerContactErrors.push("Owner contact (email) is required");
    }
    if (ownerContactErrors.length > 0) newErrors.ownerContact = ownerContactErrors;

    const areaErrors: string[] = [];
    if (editedProperty.area && isNaN(Number(editedProperty.area))) {
      areaErrors.push("Area must be a valid number");
    }
    if (areaErrors.length > 0) newErrors.area = areaErrors;
    
    const priceErrors: string[] = [];
    if (!editedProperty.price || isNaN(Number(editedProperty.price))) {
      priceErrors.push("Price is required and must be a valid number");
    }    
    if (priceErrors.length > 0) newErrors.price = priceErrors;
  
    setErrors(newErrors);
  
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validate()) {
      await onSave(editedProperty, context);
      navigate(`/detail/${property.id}`);
    }
  };

  return (
    <div className="edit-property__container">
      <div className="edit-property__presentation">
        <figure 
          className='edit-property__image'
          style={{
            backgroundImage: `url(${Array.isArray(property.images) && property.images.length > 0 ? property.images[0] : '/house-placeholder.png'})`
          }}
        />
        <h1 className="edit-property__title">Edit Property {editedProperty.title}</h1>
        <h3 className="edit-property__subtitle">Update the property details below.</h3>
      </div>
      <div className="edit-property__form">
        <div className="edit-property__form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={editedProperty.title}
            onChange={handleChange}
          />
          {errors.title && errors.title.map((error, index) => (
            <p key={index} className="edit-property__error">{error}</p>
          ))}
        </div>
        <div className="edit-property__form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={editedProperty.address}
            onChange={handleChange}
          />
          {errors.address && errors.address.map((error, index) => (
            <p key={index} className="edit-property__error">{error}</p>
          ))}
        </div>
        <div className="edit-property__form-group">
          <label htmlFor="locationName">Location Name</label>
          <input
            type="text"
            id="locationName"
            name="locationName"
            value={editedProperty.locationName}
            onChange={handleChange}
          />
          {errors.locationName && errors.locationName.map((error, index) => (
            <p key={index} className="edit-property__error">{error}</p>
          ))}
        </div>
        <div className="edit-property__form-group">
          <label htmlFor="type">Property Type</label>
          <select
            id="type"
            name="type"
            value={editedProperty.type}
            onChange={handleChange}
          >
            <option value="">Select a type</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Office">Office</option>
            <option value="Land">Land</option>

          </select>
          {errors.type && errors.type.map((error, index) => (
            <p key={index} className="edit-property__error">{error}</p>
          ))}
        </div>
        <div className="edit-property__form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={editedProperty.status}
            onChange={handleChange}
          >
            <option value="Sale">Sale</option>
            <option value="Rent">Rent</option>
          </select>
          {errors.status && errors.status.map((error, index) => (
            <p key={index} className="edit-property__error">{error}</p>
          ))}
        </div>
        <div className="edit-property__form-group">
          <label htmlFor="isActive">Availability</label>
          <select
            id="isActive"
            name="isActive"
            value={editedProperty.isActive ? "true" : "false"}
            onChange={(e) =>
              setEditedProperty({
                ...editedProperty,
                isActive: e.target.value === "true",
              })
            }
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          {errors.isActive && errors.isActive.map((error, index) => (
            <p key={index} className="edit-property__error">{error}</p>
          ))}
        </div>
        <div className="edit-property__form-group">
          <label htmlFor="area">Area</label>
          <input
            type="text"
            id="area"
            name="area"
            value={editedProperty.area}
            onChange={handleChange}
          />
          {errors.area && errors.area.map((error, index) => (
            <p key={index} className="edit-property__error">{error}</p>
          ))}
        </div>
        <div className="edit-property__form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={editedProperty.price}
            onChange={handleChange}
          />
          {errors.price && errors.price.map((error, index) => (
            <p key={index} className="edit-property__error">{error}</p>
          ))}
        </div>
        <div className="edit-property__form-group">
          <label htmlFor="ownerName">Owner</label>
          <input
            type="text"
            id="ownerName"
            name="ownerName"
            value={editedProperty.owner.name}
            onChange={(e) =>
              setEditedProperty({
                ...editedProperty,
                owner: { ...editedProperty.owner, name: e.target.value },
              })
            }
          />
          {errors.ownerName && errors.ownerName.map((error, index) => (
            <p key={index} className="edit-property__error">{error}</p>
          ))}
        </div>
        <div className="edit-property__form-group">
          <label htmlFor="ownerContact">Email</label>
          <input
            type="email"
            id="ownerContact"
            name="ownerContact"
            value={editedProperty.owner.contact}
            onChange={(e) =>
              setEditedProperty({
                ...editedProperty,
                owner: { ...editedProperty.owner, contact: e.target.value },
              })
            }
          />
          {errors.ownerContact && errors.ownerContact.map((error, index) => (
            <p key={index} className="edit-property__error">{error}</p>
          ))}
        </div>

        <div className="edit-property__form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={editedProperty.description}
            onChange={handleChange}
          />
          {errors.description && errors.description.map((error, index) => (
            <p key={index} className="edit-property__error">{error}</p>
          ))}
        </div>
        <button className="edit-property__save-button" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};
