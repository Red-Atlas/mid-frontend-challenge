import { Crop } from "@mui/icons-material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CircularProgress, Stack, Tooltip } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Property } from "../../interfaces/properties.interface";
import {
  clearPropertySlice,
  setPropertySlice,
} from "../../reducers/propertiesSlice";
import {
  filterProperties,
  getPropertiesPage,
  searchProperties,
} from "../../services/properties.service";
import "./properties-list.css";
import TuneIcon from "@mui/icons-material/Tune";
import FilterDialog from "../../components/filter-dialog/filter-dialog";
import { filterDialogs } from "../../interfaces/filterProperties.interface";
import { useNavigate } from "react-router-dom";

const PropertiesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [numberPage, setNumberPage] = useState(1);
  const [totalPages, setTotalPages] = useState(45);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<filterDialogs>();
  const [searchedProperties, setSearchedProperties] = useState<Property[]>([]);
  const [filtersFromDialog, setFiltersFromDialog] = useState<any>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isSearching && !isFiltering) {
      getPropertiesForPage();
    } else if (isFiltering && filters) {
      getPropertiesFiltered(filters);
    }
  }, [numberPage, isSearching, isFiltering]);

  useEffect(() => {
    if (isSearching) {
      const filtered = properties.filter(
        (property) =>
          property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      dispatch(clearPropertySlice());
      dispatch(setPropertySlice(filtered));
    }
  }, [searchTerm, properties, isSearching]);

  const getSearchedProperties = async (textSearched: string) => {
    try {
      setLoading(true);
      const data = await searchProperties(textSearched);
      console.log(data);
      setProperties(data.properties);
      setNumberPage(data.page);
      setTotalPages(data.totalPages);
      setSearchedProperties(data.properties);
    } catch (error) {
      console.error("Error al cargar todas las propiedades:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPropertiesForPage = async () => {
    try {
      dispatch(clearPropertySlice());
      setLoading(true);
      const data = await getPropertiesPage(numberPage);
      console.log(data);
      setProperties(data.properties);
      setSearchedProperties(data.properties);
      setNumberPage(data.page);
      setTotalPages(data.totalPages);
      dispatch(setPropertySlice(data.properties));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterRequest = event.target.value;
    setSearchTerm(filterRequest);
    if (filterRequest.length >= 3) {
      setIsSearching(true);
      getSearchedProperties(filterRequest);
    } else {
      setIsSearching(false);
      setNumberPage(1);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setNumberPage(value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log();
    setOpen(false);
  };

  const handleApplyFilters = (newFilters: filterDialogs) => {
    setNumberPage(1);
    if (newFilters.status.length === 0 && newFilters.type.length === 0) {
      setIsFiltering(false);
    } else {
      getPropertiesFiltered(newFilters);
      setFilters(newFilters);
    }
  };

  const getPropertiesFiltered = async (filters: filterDialogs) => {
    try {
      dispatch(clearPropertySlice());
      setLoading(true);
      const data = await filterProperties(
        filters.type,
        filters.status,
        numberPage
      );
      setProperties(data.properties);
      setSearchedProperties(data.properties);
      setIsFiltering(true);
      setNumberPage(data.page);
      setTotalPages(data.totalPages);
      dispatch(setPropertySlice(data.properties));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const goToDetails = (propertyId: string) => {
    navigate(`/properties/${propertyId}`);
  };

  return (
    <div className="propiedades-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for title or address"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <div className="filter-button" onClick={handleOpen}>
          <TuneIcon color="info" sx={{ fontSize: "22px" }} />
          <span className="filter-text">Filters</span>
        </div>
      </div>
      <div className={`propiedades-container ${loading ? "loading" : ""}`}>
        {loading ? (
          <div className="loading-container">
            <CircularProgress />
            <p color="info">Loading properties...</p>
          </div>
        ) : (
          searchedProperties.map((property) => (
            <div
              key={property.id}
              className="propiedad-card"
              onClick={() => goToDetails(property.id)}
            >
              <div className="image-container">
                <img
                  src={property.images[0]}
                  className="img-card"
                  alt={property.title}
                />
                <div className="tags">
                  <span className="tag tipo">{property.type}</span>
                  <span className="tag estado">{property.status}</span>
                  <span
                    className={`tag disponibility ${
                      property.isActive ? "active" : "inactive"
                    }`}
                  >
                    {property.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <div className="text-container">
                <div className="icon-text">
                  <Tooltip title="Price" arrow>
                    <h3>$ {property.price}</h3>
                  </Tooltip>
                </div>
                <div className="icon-text">
                  <Tooltip title="Area" arrow>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <Crop color="info" sx={{ fontSize: "16px" }} />
                      <span>{property.area}</span>
                    </span>
                  </Tooltip>
                </div>
                <div className="icon-text">
                  <Tooltip title="Published Date" arrow>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <EditCalendarIcon
                        color="info"
                        sx={{ fontSize: "16px" }}
                      />
                      <span>{property.createdAt}</span>
                    </span>
                  </Tooltip>
                </div>
                <div className="icon-text">
                  <Tooltip title="Address" arrow>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <LocationOnIcon color="info" sx={{ fontSize: "16px" }} />
                      <span>{property.address}</span>
                    </span>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {!loading && (
        <Stack spacing={2} className="pagination-container">
          <Pagination
            count={totalPages}
            page={numberPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      )}
      <FilterDialog
        open={open}
        onClose={handleClose}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default PropertiesList;
