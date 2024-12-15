import { useEffect, useState, useMemo } from "react";
import { Pagination } from "@mui/material";
import { Location, getPropertiesFromJSON } from "../../services/PropertiesService";
import { PropertyCard } from "../PropertyCard";
import SearchBar from "../SearchBar";
import "./styles.css";
import { Map } from "../Map";
import { useNavigate } from "react-router-dom";

interface Filters {
  propertyType: string[];
  status: string[];
  sortOrder: string;
}

interface LocationInfo {
  location: Location;
  locationName: string;
}

export const Properties = () => {
  const [query, setQuery] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({
    propertyType: [],
    status: [],
    sortOrder: "",
  });
  const [page, setPage] = useState<number>(1);
  const [coordinates, setCoordinates] = useState<LocationInfo[]>([]);

  const allProperties = getPropertiesFromJSON();
  const itemsPerPage: number = 6;
  const navigate = useNavigate()

  const filteredProperties = useMemo(() => {
    return allProperties.filter((property) => {
      const matchesQuery =
        query.trim() === "" ||
        property.title.toLowerCase().includes(query.toLowerCase()) ||
        property.address.toLowerCase().includes(query.toLowerCase());

      const matchesPropertyType =
        filters.propertyType.length === 0 ||
        filters.propertyType.includes(property.type);

      const matchesStatus =
        filters.status.length === 0 ||
        filters.status.includes(property.status ?? "");

      return matchesQuery && matchesPropertyType && matchesStatus;
    });
  }, [query, filters, allProperties]);

  const sortedProperties = useMemo(() => {
    return filteredProperties.sort((a, b) => {
      if (filters.sortOrder === "asc") {
        return a.price - b.price;
      } else if (filters.sortOrder === "desc") {
        return b.price - a.price;
      }
      return 0;
    });
  }, [filteredProperties, filters.sortOrder]);

  const totalPages: number = Math.ceil(sortedProperties.length / itemsPerPage);
  const currentPageProperties = sortedProperties.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    const newCoordinates = sortedProperties.map((item) => ({
      location: {
        lat: item.location ? item.location.lat : 0,
        lng: item.location ? item.location.lng : 0,
      },
      locationName: item.title ?? "",
    }));

    if (JSON.stringify(newCoordinates) !== JSON.stringify(coordinates)) {
      setCoordinates(newCoordinates);
    }
  }, [sortedProperties, coordinates]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSearch = (searchQuery: string, searchFilters: Filters) => {
    setQuery(searchQuery);
    setFilters(searchFilters);
    setPage(1);
  };

  return (
    <section className="properties">
      <h1 className="properties__title">Properties List</h1>
      <button
        className="properties__create-button"
        onClick={()=> navigate("/create")}
        aria-label="Create"
      >
        Create Property
      </button>
      <SearchBar onSearch={handleSearch} />
      {currentPageProperties.length > 0 ? (
        <>
          <div className="properties__container">
            {currentPageProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="properties__pagination-container">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
              color="primary"
            />
          </div>
          <h1 className="properties__title">Properties Locations</h1>
          <Map
            locationInfo={coordinates}
            zoomLevel={13}
          />
        </>
      )
      :
        <div className="properties__noFound">
          No properties match the search criteria
        </div>
      }
    </section>
  );
};
