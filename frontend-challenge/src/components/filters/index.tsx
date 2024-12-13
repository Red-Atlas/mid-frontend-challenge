import React, { useEffect, useState } from "react";
import { LiaSortAmountUpAltSolid } from "react-icons/lia";
import { FiltersType } from "../../services/_types";
import "./styles.scss";

interface FiltersProps {
  onFilter: (filters: FiltersType) => void;
  onSearchString: (str: string) => void;
}

export const Filters = ({ onFilter, onSearchString }: FiltersProps) => {
  const [filters, setFilters] = useState<FiltersType>({
    type: "all",
    status: "all",
    price: "down",
  });

  const typeOptions = ["house", "land", "office", "apartment", "all"];

  const statusOptions = ["sale", "rent", "all"];

  const [filterString, setFilterString] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterString(value);
  };

  const handleFilter = (
    filterType: "type" | "status" | "price",
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  useEffect(() => {
    onFilter(filters);
  }, [filters]);

  useEffect(() => {
    onSearchString(filterString);
  }, [filterString]);

  return (
    <div className="filtersWrapper">
      <div className="leftRow">
        <div className="inputWrapper">
          <input
            type="text"
            onChange={onChange}
            placeholder="Ingrese su termino de busqueda"
          />
        </div>
      </div>
      <div className="rightRow">
        <div className="selectWrapper">
          <select onChange={(e) => handleFilter("status", e.target.value)}>
            {statusOptions &&
              statusOptions.map((opt) => <option>{opt}</option>)}
          </select>
        </div>
        <div className="selectWrapper">
          <select onChange={(e) => handleFilter("type", e.target.value)}>
            {typeOptions && typeOptions.map((opt) => <option>{opt}</option>)}
          </select>
        </div>
        <div
          className={`sortPrice ${filters.price === "up" ? "up" : "down"}`}
          onClick={() =>
            handleFilter("price", filters.price === "up" ? "down" : "up")
          }
        >
          <LiaSortAmountUpAltSolid />
        </div>
      </div>
    </div>
  );
};
