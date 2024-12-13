import "./styles.scss";
import { useNavigate } from "react-router";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div
        className="leftRow"
        onClick={() => navigate("/")}
      >
        <img
          src="/logo.webp"
          alt="Red atlas logo"
        />
        <p>Properties</p>
      </div>
      <div className="rightRow">
        <button onClick={() => navigate("/newProperty")}>New property</button>
      </div>
    </div>
  );
};
