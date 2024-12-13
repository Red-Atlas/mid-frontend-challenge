import PropertiesDetails from "./components/properties-details/properties-details";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MapLayout from "./components/map-layout/map-layout";
import PropertiesList from "./components/properties-list/properties-list";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MapLayout />
      <Routes>
        <Route path="/" element={<PropertiesList />} />
        <Route path="/properties/:id" element={<PropertiesDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
