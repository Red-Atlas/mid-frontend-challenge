import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPropertyById } from "../../services/properties.service";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import "./properties-details.css";
import { Property } from "../../interfaces/properties.interface";

function PropertiesDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(true);
  const [propertyDetails, setPropertyDetails] = useState<Property | null>(null);

  useEffect(() => {
    getPropertyDetail();
  }, [id]);

  const getPropertyDetail = async () => {
    if (id) {
      try {
        const data = await getPropertyById(id);
        setPropertyDetails(data);
      } catch (err: any) {
        console.error(err);
      }
    }
  };

  function closeDialog() {
    navigate(`/`);
  }

  if (!propertyDetails) {
    return <div>Error: No property details found</div>;
  }

  const {
    title,
    description,
    images,
    address,
    area,
    price,
    isActive,
    status,
    type,
    owner,
    location,
  } = propertyDetails;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; 
  };

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="lg">
      <div className="price-title-dialog">
        <span className="title">{title}</span>
        <span className="price">$ {price.toLocaleString()}</span>
      </div>
      <DialogContent>
        <div className="property-details-container">
          <img
            src={images[0]}
            alt={title}
            className="property-image"
          />
          <div className="details">
            <div className="tag-list">
              <span className="tag-type">{type}</span>
              <span className="tag-status">{status}</span>
              <span
                className={`tag-disponibility ${
                  isActive ? "active" : "inactive"
                }`}
              >
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <p className="description">{description}</p>
            <ul className="details-list">
              <li>
                <strong>Address:</strong> {address}
              </li>
              <li>
                <strong>Area:</strong> {area}
              </li>
              <li>
                <strong>Owner:</strong> {owner.name} ({owner.contact})
              </li>
              <li>
                <strong>Location:</strong> Lat {location.lat}, Lng{" "}
                {location.lng}
              </li>
              <li>
                <strong>Published on:</strong> {formatDate(propertyDetails.createdAt)}
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PropertiesDetails;
