import React, { useEffect, useState } from "react";
import "./styles.css";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string, filters: Filters) => void;
}

interface Filters {
  propertyType: string[];
  status: string[];
  sortOrder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search by property or address...", onSearch }) => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    propertyType: [],
    status: [], // Renombrado de isActive a status
    sortOrder: "",
  });

  const [isPropertyMenuOpen, setPropertyMenuOpen] = useState(false);
  const [isStatusMenuOpen, setStatusMenuOpen] = useState(false);

  const handleSearch = () => {
    onSearch(query, filters);
  };

  const handleCheckboxChange = (filterKey: keyof Filters, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[filterKey] as string[];
      return {
        ...prev,
        [filterKey]: currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value],
      };
    });
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        aria-label="Search"
      />

      <div className="search-bar__menus__wrapper">
        <div className="search-bar__menus">
          <div className="search-bar__menu">
            <button
              className="search-bar__menu__toggle"
              onClick={() => setPropertyMenuOpen(!isPropertyMenuOpen)}
            >
              Property Type
            </button>
            {isPropertyMenuOpen && (
              <div className="search-bar__menu-content">
                <label>
                  <input
                    type="checkbox"
                    value="house"
                    checked={filters.propertyType.includes("house")}
                    onChange={(e) => handleCheckboxChange("propertyType", e.target.value)}
                  />
                  House
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="office"
                    checked={filters.propertyType.includes("office")}
                    onChange={(e) => handleCheckboxChange("propertyType", e.target.value)}
                  />
                  Office
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="apartment"
                    checked={filters.propertyType.includes("apartment")}
                    onChange={(e) => handleCheckboxChange("propertyType", e.target.value)}
                  />
                  Apartment
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="land"
                    checked={filters.propertyType.includes("land")}
                    onChange={(e) => handleCheckboxChange("propertyType", e.target.value)}
                  />
                  Land
                </label>
              </div>
            )}
          </div>

          <div className="search-bar__menu">
            <button
              className="search-bar__menu__toggle"
              onClick={() => setStatusMenuOpen(!isStatusMenuOpen)}
            >
              Status
            </button>
            {isStatusMenuOpen && (
              <div className="search-bar__menu-content">
                <label>
                  <input
                    type="checkbox"
                    value="rent"
                    checked={filters.status.includes("rent")}
                    onChange={(e) => handleCheckboxChange("status", e.target.value)}
                  />
                  Rent
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="sale"
                    checked={filters.status.includes("sale")}
                    onChange={(e) => handleCheckboxChange("status", e.target.value)}
                  />
                  Sale
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="search-bar__right-side">
          <select
            className="search-bar__select"
            value={filters.sortOrder}
            onChange={(e) => setFilters((prev) => ({ ...prev, sortOrder: e.target.value }))}
            aria-label="Orden"
          >
            <option value="">Sort by</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          <button
            className="search-bar__button"
            onClick={handleSearch}
            aria-label="Search"
          >
            🔍 Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
