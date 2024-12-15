import { useNavigate } from "react-router-dom"
import "./styles.css"

export const Header = () => {
  const navigate = useNavigate()
  return (
    <section className="header__container">
      <figure className="header__logo-container">
        <img src="/red-atlas-long.png" onClick={()=> navigate("/")}/>
      </figure>
    </section>
  )
}