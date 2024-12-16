import { createContext, useContext, useEffect, useState } from "react";
import { usePropertiesContext } from "./PropertiesContext";

export interface Filters {
  search?: string;
  type?: "house" | "apartment" | "land" | "office";
  availability?: "sale" | "rent";
}

interface FiltersContextProps {
  localFilters: Filters;
  setLocalFilters: (filters: Partial<Filters>) => void;
}

const initialState: FiltersContextProps = {
  localFilters: {},
  setLocalFilters: () => {},
};

const FiltersContext = createContext<FiltersContextProps>(initialState);

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const { setFilters } = usePropertiesContext();

  const [localFilters, setLocalFiltersState] = useState<Filters>({});

  useEffect(() => {
    setFilters(localFilters);
  }, [localFilters]);

  return (
    <FiltersContext.Provider
      value={{
        localFilters,
        setLocalFilters: setLocalFiltersState,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export function useFiltersContext() {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error("useFiltersContext debe usarse dentro de FiltersProvider");
  }

  return context;
}
