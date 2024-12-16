import { createContext, useContext, useState } from "react";

interface UIContextProps {
  isFilterOpen: boolean;
  toggleFilterVisibility: () => void;

  isPropertiesListOpen: boolean;
  toggleListVisibility: () => void;

  hideAllPanes: () => void;
}

const UIContext = createContext<UIContextProps | undefined>(undefined);

export function UIContextProvider({ children }: { children: React.ReactNode }) {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isPropertiesListOpen, setIsPropertiesListOpen] =
    useState<boolean>(false);

  const hideAllPanes = () => {
    setIsFilterOpen(false);
    setIsPropertiesListOpen(false);
  };

  const toggleFilterVisibility = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const toggleListVisibility = () => {
    setIsPropertiesListOpen((prev) => !prev);

    // Si estamos cerrando la lista de propiedades y la barra de filtros esta abierto, cerramos el filtro
    if (isPropertiesListOpen && isFilterOpen) {
      setIsFilterOpen(false);
    }
  };

  return (
    <UIContext.Provider
      value={{
        isFilterOpen,
        toggleFilterVisibility,
        isPropertiesListOpen,
        toggleListVisibility,
        hideAllPanes,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUIContext() {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUIContext debe usarse dentro de UIContextProvider");
  }

  return context;
}
