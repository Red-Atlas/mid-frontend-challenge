import { useCallback, useEffect, useState } from "react";
import { IGetPropertiesMapped } from "../../../interfaces";

type useFilterProps = {
  data: IGetPropertiesMapped[] | undefined;
};

export function useFilter({ data }: useFilterProps) {
  const [search, setSearch] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [stateFilter, setStateFilter] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    let filtered = data;

    if (search) {
      filtered = filtered?.filter((property) =>
        property.address.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (propertyType) {
      filtered = filtered?.filter(
        (property) =>
          property.typeOfProperty.toLowerCase() === propertyType.toLowerCase()
      );
    }

    if (stateFilter) {
      filtered = filtered?.filter(
        (property) => property.state.toLowerCase() === stateFilter.toLowerCase()
      );
    }

    if (priceFilter === "desc") {
      filtered = filtered?.sort(
        (a, b) => a.priceWhitOutFormat - b.priceWhitOutFormat
      );
    }

    if (priceFilter === "asc") {
      filtered = filtered?.sort(
        (a, b) => b.priceWhitOutFormat - a.priceWhitOutFormat
      );
    }

    setFilteredData(filtered);
  }, [search, propertyType, stateFilter, priceFilter, data]);

  const handleInputChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
      (
        e:
          | React.ChangeEvent<HTMLSelectElement>
          | React.ChangeEvent<HTMLInputElement>
      ) => {
        setter(e.target.value);
      },
    []
  );

  return {
    search,
    setSearch,
    setPropertyType,
    setStateFilter,
    setPriceFilter,
    filteredData,
    handleInputChange,
  };
}
