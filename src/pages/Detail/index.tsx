
import { useParams } from "react-router-dom";

import { PropertyDetail } from "../../components/PropertyDetail";
import { Property, getPropertyFromJSON } from "../../services/PropertiesService";

import './styles.css';


export const Detail = () => {
  const { id } = useParams();
  const property: Property | undefined = getPropertyFromJSON(id);  

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <main className="detail-container">
      <PropertyDetail property={property}/>
    </main>
  )
}