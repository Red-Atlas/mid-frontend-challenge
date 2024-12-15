import PropertiesDetails from "./components/properties-details/properties-details";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MapLayout from "./components/map-layout/map-layout";
import PropertiesList from "./components/properties-list/properties-list";
import PropertyForm from "./components/property-form/property-form";
import StatisticLayout from "./components/statistics-layout/statistics-layout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MapLayout />
      <Routes>
        <Route path="/" element={<PropertiesList />} />
        <Route path="/properties/:id" element={<PropertiesDetails />} />
        <Route path="/edit-properties" element={<PropertyForm />} />
        <Route path="/statistics" element={<StatisticLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
