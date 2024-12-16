import { useState } from "react";
import PropertyCard from "./PropertyCard";
import Pagination from "./Pagination";
import SortByButton from "./SortByButton";
import {
  MaterialSymbolsArrowCoolDownRounded,
  MaterialSymbolsArrowWarmUpRounded,
  MaterialSymbolsSortByAlphaRounded,
} from "../Icons";
import { usePropertiesContext } from "../../contexts/PropertiesContext";
import { useUIContext } from "../../contexts/UIContext";

export type SortOption = "relevance" | "highest" | "lowest";

export default function PropertiesList() {
  const { isPropertiesListOpen } = useUIContext();
  const { visibleProperties, pagination, setPagination, isLoading, error } =
    usePropertiesContext();

  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  const sortOptions: Record<
    SortOption,
    { label: string; icon: React.ReactNode }
  > = {
    relevance: {
      label: "Más relevante",
      icon: <MaterialSymbolsSortByAlphaRounded className="mr-2 h-4 w-4" />,
    },
    highest: {
      label: "Mayor precio",
      icon: <MaterialSymbolsArrowWarmUpRounded className="mr-2 h-4 w-4" />,
    },
    lowest: {
      label: "Menor precio",
      icon: <MaterialSymbolsArrowCoolDownRounded className="mr-2 h-4 w-4" />,
    },
  };

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, page });
  };

  const handleSort = () => {
    const options: SortOption[] = ["relevance", "highest", "lowest"];
    const currentIndex = options.indexOf(sortBy);
    const nextIndex = (currentIndex + 1) % options.length;
    setSortBy(options[nextIndex]);
  };

  const sortedProperties = visibleProperties?.slice().sort((a, b) => {
    if (sortBy === "highest") return b.price - a.price;
    if (sortBy === "lowest") return a.price - b.price;
    return 0; // Orden por relevancia (sin cambios)
  });

  if (!isPropertiesListOpen) return null; // Si el componente no debe estar visible, no se muestra nada.

  if (isLoading) {
    // Si está cargando mostramos un indicador de carga
    return (
      <section className="bg-white/90 flex-1 p-6 rounded-xl shadow-md flex flex-col gap-6 max-w-[768px]">
        <div className="flex justify-center items-center">
          <span className="text-xl font-semibold">Loading...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white/90 flex-1 p-6 rounded-xl shadow-md flex flex-col gap-6 max-w-[768px]">
        <div>
          Error: {error instanceof Error ? error.message : "Unknown error"}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white/90 backdrop-blur-sm h-full flex-1 p-6 rounded-xl shadow-md gap-6 max-w-[768px] overflow-y-auto flex flex-col">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Anuncios</h2>
        <SortByButton
          sortBy={sortBy}
          onClick={handleSort}
          options={sortOptions}
        />
      </header>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 flex-grow-0">
        {sortedProperties?.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.total_pages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
