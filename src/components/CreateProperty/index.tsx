import { FC, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { CreateProperty as CreatePropertyModel } from "../../services/PropertiesService";
import PropertiesContext, { PropertiesContextType } from '../../context/ContextProvider';

import './styles.css';



interface CreatePropertyInterface {
  onCreate: (newProperty: CreatePropertyModel, context: PropertiesContextType | undefined) => void;
}

export const CreateProperty: FC<CreatePropertyInterface> = ({ onCreate }) => {
  const [newProperty, setNewProperty] = useState<CreatePropertyModel>({
    title: "",
    description: "",
    locationName: "",
    address: "",
    images: [],
    type: "",
    status: "",
    isActive: false,
    price: 0,
    area: 0,
    owner: {
      name: "",
      contact: "",
    },
  });

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const context = useContext<PropertiesContextType | undefined>(PropertiesContext);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProperty({
      ...newProperty,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: string[] } = {};

    const titleErrors: string[] = [];
    if (!newProperty.title) {
      titleErrors.push("Title is required");
    }
    if (titleErrors.length > 0) newErrors.title = titleErrors;

    const addressErrors: string[] = [];
    if (!newProperty.address) {
      addressErrors.push("Address is required");
    }
    if (addressErrors.length > 0) newErrors.address = addressErrors;

    const typeErrors: string[] = [];
    if (!newProperty.type) {
      typeErrors.push("Property type is required");
    }
    if (typeErrors.length > 0) newErrors.type = typeErrors;

    const areaErrors: string[] = [];
    if (newProperty.area && isNaN(Number(newProperty.area))) {
      areaErrors.push("Area must be a valid number");
    }
    if (areaErrors.length > 0) newErrors.area = areaErrors;

    const priceErrors: string[] = [];
    if (!newProperty.price || isNaN(Number(newProperty.price))) {
      priceErrors.push("Price is required and must be a valid number");
    }
    if (priceErrors.length > 0) newErrors.price = priceErrors;

    const ownerNameErrors: string[] = [];
    if (!newProperty.owner.name) {
      ownerNameErrors.push("Owner name is required");
    }
    if (ownerNameErrors.length > 0) newErrors.ownerName = ownerNameErrors;

    const ownerContactErrors: string[] = [];
    if (!newProperty.owner.contact) {
      ownerContactErrors.push("Owner contact (email) is required");
    }
    if (ownerContactErrors.length > 0) newErrors.ownerContact = ownerContactErrors;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (validate()) {
      await onCreate(newProperty, context);
      navigate("/");
    }
  };

  return (
    <div className="create-property__container">
      <div className="create-property__presentation-container">
        <div className="create-property__presentation">
          <h1 className="create-property__title">Create New Property</h1>
          <h3 className="create-property__subtitle">Fill in the property details below.</h3>
        </div>
      </div> 
      <div className="create-property__form">
        <div className="create-property__form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newProperty.title}
            onChange={handleChange}
          />
          {errors.title && errors.title.map((error, index) => (
            <p key={index} className="create-property__error">{error}</p>
          ))}
        </div>
        <div className="create-property__form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={newProperty.address}
            onChange={handleChange}
          />
          {errors.address && errors.address.map((error, index) => (
            <p key={index} className="create-property__error">{error}</p>
          ))}
        </div>
        <div className="create-property__form-group">
          <label htmlFor="locationName">Location Name</label>
            <input
              type="text"
              id="locationName"
              name="locationName"
              value={newProperty.locationName}
              onChange={handleChange}
            />
          </div>
        <div className="create-property__form-group">
          <label htmlFor="type">Property Type</label>
          <select
            id="type"
            name="type"
            value={newProperty.type}
            onChange={handleChange}
          >
            <option value="">Select a type</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Office">Office</option>
            <option value="Land">Land</option>
          </select>
          {errors.type && errors.type.map((error, index) => (
            <p key={index} className="create-property__error">{error}</p>
          ))}
        </div>
        <div className="create-property__form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={newProperty.status}
            onChange={handleChange}
          >
            <option value="">Select a status</option>
            <option value="Sale">Sale</option>
            <option value="Rent">Rent</option>
          </select>
          {errors.status && errors.status.map((error, index) => (
            <p key={index} className="create-property__error">{error}</p>
          ))}
        </div>
        <div className="create-property__form-group">
          <label htmlFor="isActive">Availability</label>
          <select
            id="isActive"
            name="isActive"
            value={newProperty.isActive ? "true" : "false"}
            onChange={(e) =>
              setNewProperty({
                ...newProperty,
                isActive: e.target.value === "true",
              })
            }
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          {errors.isActive && errors.isActive.map((error, index) => (
            <p key={index} className="create-property__error">{error}</p>
          ))}
        </div>
        <div className="create-property__form-group">
          <label htmlFor="area">Area</label>
          <input
            type="text"
            id="area"
            name="area"
            value={newProperty.area}
            onChange={handleChange}
          />
          {errors.area && errors.area.map((error, index) => (
            <p key={index} className="create-property__error">{error}</p>
          ))}
        </div>
        <div className="create-property__form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={newProperty.price}
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
            value={newProperty.owner.name}
            onChange={(e) =>
              setNewProperty({
                ...newProperty,
                owner: { ...newProperty.owner, name: e.target.value },
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
            value={newProperty.owner.contact}
            onChange={(e) =>
              setNewProperty({
                ...newProperty,
                owner: { ...newProperty.owner, contact: e.target.value },
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
            value={newProperty.description}
            onChange={handleChange}
          />
          {errors.description && errors.description.map((error, index) => (
            <p key={index} className="edit-property__error">{error}</p>
          ))}
        </div>
        <button className="edit-property__save-button" onClick={handleCreate}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

