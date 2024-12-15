import BarChartIcon from "@mui/icons-material/BarChart";
import Crop from "@mui/icons-material/Crop";
import EditIcon from "@mui/icons-material/Edit";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TuneIcon from "@mui/icons-material/Tune";
import { CircularProgress, FormControl, InputLabel, MenuItem, Pagination, Select, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FilterDialog from "../../components/filter-dialog/filter-dialog";
import { useProperties } from "../../hooks/useProperties";
import "./properties-list.css";

const PropertiesList = () => {
  const {
    properties,
    loading,
    numberPage,
    totalPages,
    handlePageChange,
    handleSearch,
    handleApplyFilters,
    searchTerm,
    sortOrder,
    handleSortChange,
    open,
    handleOpen,
    handleClose,
    isMobile
  } = useProperties();

  const navigate = useNavigate();

  const goToDetails = (propertyId: string) => {
    navigate(`/properties/${propertyId}`);
  };

  const goToPropertyForm = () => {
    navigate(`edit-properties`);
  };

  const goToStatistics = () => {
    navigate(`statistics`);
  };

  return (
    <div>
      <div className="propiedades-list">
        {!isMobile ? (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for title or address"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
            <button className="filter-button" onClick={handleOpen}>
              <TuneIcon color="info" sx={{ fontSize: "22px" }} />
              <span className="filter-text">Filters</span>
            </button>
            <FormControl
              className="button-sort"
              size="small"
              style={{ marginLeft: "10px" }}
            >
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortOrder}
                onChange={handleSortChange}
                label="Sort By"
                disabled={searchTerm.length >= 3}
              >
                <MenuItem value="asc">Min Price</MenuItem>
                <MenuItem value="desc">Max Price</MenuItem>
              </Select>
            </FormControl>
          </div>
        ) : (
          <div className="search-bar-mobile">
            <div><input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input-mobile"
            /></div>

            <div className="mobile-buttons">
              <button className="filter-button" onClick={handleOpen}>
                <TuneIcon color="info" sx={{ fontSize: "22px" }} />
                <span className="filter-text">Filters</span>
              </button>
              <FormControl className="button-sort-mobile" size="small">
                <InputLabel>Sort</InputLabel>
                <Select
                  value={sortOrder}
                  onChange={handleSortChange}
                  label="Sort"
                  disabled={searchTerm.length >= 3}
                >
                  <MenuItem value="asc">Min Price</MenuItem>
                  <MenuItem value="desc">Max Price</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        )}
        <div
          className={`propiedades-container ${loading || properties.length === 0 ? "loading" : ""
            }`}
        >
          {loading ? (
            <div className="loading-container">
              <CircularProgress />
              <p color="info">Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <p className="text-properties-not-found">No properties found.</p>
          ) : (
            properties.map((property) => (
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
                      className={`tag disponibility ${property.isActive ? "active" : "inactive"
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
                        <EditCalendarIcon color="info" sx={{ fontSize: "16px" }} />
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

        {!loading && properties.length >= 1 && (
          <div className="pagination-container">
            <div>
              <Pagination
                count={totalPages}
                page={numberPage}
                onChange={(e, page) => handlePageChange(page)}
                color="primary"
              />
            </div>

          </div>
        )}
        <FilterDialog
          open={open}
          onClose={handleClose}
          onApplyFilters={handleApplyFilters}
        />
      </div>

      <div className="buttons-extra">
        <button className="button-edit-form" onClick={goToStatistics}>
          <BarChartIcon style={{ marginRight: "8px" }} />
          View Statistics
        </button>
        <button className="button-edit-form" onClick={goToPropertyForm}>
          <EditIcon style={{ marginRight: "8px" }} />
          Add/Edit Property
        </button>
      </div>
    </div>
  );
};

export default PropertiesList;
