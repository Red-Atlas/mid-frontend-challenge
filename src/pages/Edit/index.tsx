import { useParams } from "react-router-dom"
import { EditProperty } from "../../components/EditProperty"
import { Property, editProperty, getPropertyFromJSON } from "../../services/PropertiesService"
import { useContext } from "react"
import PropertiesContext from "../../context/ContextProvider"

import "./styles.css"

export const Edit = () => {
  const { id } = useParams()
  const property: Property = getPropertyFromJSON(id);

  const context = useContext(PropertiesContext)

  if (!context) {
    throw new Error ("Context Not Found")
  }

  if (!property) {
    throw new Error ("Property Not Found")
  }

  return (
    <main className="edit-container">
      <EditProperty property={property} onSave={editProperty}/>
    </main>
  )
}