import { CreateProperty } from "../../components/CreateProperty"
import { createProperty as createPropertyFunction } from "../../services/PropertiesService"

import "./styles.css"


export const Create = () => {
  return (
    <main className="create-container">
      <CreateProperty onCreate={createPropertyFunction}/>
    </main>
  )
}