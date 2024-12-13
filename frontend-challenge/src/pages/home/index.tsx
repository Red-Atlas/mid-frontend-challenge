import React, { useMemo, useState } from "react";
import { useQueryProperties } from "../../services/property/useQueryProperties";
import { defaultProperties } from "../../services/properties";
import { PropertyCard } from "../../components/propertyCard";
import "./styles.scss";
import { Filters } from "../../components/filters";
import { FiltersType } from "../../services/_types";
import { Pagination } from "../../components/pagination";

export const HomePage = () => {
  const { data: propertiesQuery } = useQueryProperties();
  const properties = useMemo(() => defaultProperties, [propertiesQuery]);

  const [filters, setFilters] = useState<FiltersType>({
    type: "all",
    status: "all",
    price: "down",
  });

  const [filterStr, setFilterStr] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const filteredProperties = useMemo(() => {
    return properties
      .filter((property) => {
        const matchesSearchString =
          !filterStr ||
          [property.title.toLowerCase(), property.address.toLowerCase()].some(
            (field) => field.includes(filterStr.toLowerCase())
          );

        const matchesType =
          filters.type === "all" || property.type === filters.type;

        const matchesStatus =
          filters.status === "all" || property.status === filters.status;

        return matchesSearchString && matchesType && matchesStatus;
      })
      .sort((a, b) => {
        return filters.price === "up" ? a.price - b.price : b.price - a.price;
      });
  }, [properties, filters, filterStr]);

  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProperties.slice(startIndex, endIndex);
  }, [filteredProperties, currentPage, itemsPerPage]);

  const handleFilterChange = (newFilters: FiltersType) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearchString = (str: string) => {
    setFilterStr(str);
    setCurrentPage(1);
  };

  return (
    <main className="homePage">
      <section className="content">
        <h1>Propiedades</h1>
        <Filters
          onFilter={handleFilterChange}
          onSearchString={handleSearchString}
        />
        <div className="propertiesWrapper">
          {paginatedProperties &&
            paginatedProperties.map((property) => (
              <PropertyCard
                {...property}
                status={property.status as "sale" | "rent"}
                type={
                  property.type as "house" | "land" | "office" | "apartment"
                }
                key={property.id}
              />
            ))}
        </div>
      </section>
      <Pagination
        onPageChange={setCurrentPage}
        totalItems={filteredProperties.length}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
    </main>
  );
};
