import { useGetProperties } from "../../hooks";
import { TableProperties } from "./components/TableProperties";
import { MapProperties } from "./components/MapProperties";
import { useCallback, useState } from "react";
import { Layout } from "../../components";
import { useFilter, useOptionSelects } from "./hooks";
import FilterSearch from "./components/FilterSearch";

export default function HomeView() {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useGetProperties({ page: page });

  const {
    filteredData,
    handleInputChange,
    setPriceFilter,
    setPropertyType,
    setSearch,
    setStateFilter,
    search,
  } = useFilter({ data: data });

  const { price, states, types } = useOptionSelects({ data: data });

  const handlePage = useCallback(
    (direction: "next" | "prev") => {
      if (direction === "prev" && page === 1) return;

      if (direction === "next") {
        setPage((prev) => prev + 1);
      } else {
        setPage((prev) => prev - 1);
      }
    },
    [page]
  );

  const hasData = filteredData && filteredData.length > 0;

  return (
    <Layout isLoading={isLoading} className="bg-white">
      <div className="flex  sm:flex-row gap-4 h-full relative">
        <div className="bg-white rounded-md shadow-md p-2 mb-2 flex gap-2 absolute top-2 sm:w-1/3 w-full items-center justify-between">
          <FilterSearch
            handleInputChange={handleInputChange}
            price={price}
            search={search}
            setPriceFilter={setPriceFilter}
            setPropertyType={setPropertyType}
            setSearch={setSearch}
            setStateFilter={setStateFilter}
            states={states}
            types={types}
          />
        </div>

        {!hasData && !isLoading && (
          <div className="w-full h-96 flex items-center justify-center">
            <h1>No encontramos propiedades con tus búsquedas y filtros.</h1>
          </div>
        )}

        {hasData && (
          <>
            <div className="w-1/3 hidden sm:flex flex-col justify-center gap-5">
              <MapProperties properties={filteredData} />
            </div>

            <div className="sm:w-2/3 w-full mt-20 sm:mt-10">
              <TableProperties
                properties={filteredData}
                handlePage={handlePage}
              />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
