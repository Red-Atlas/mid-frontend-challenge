import { ReactNode } from "react";
import { UIContextProvider } from "./UIContext";
import { PropertiesProvider } from "./PropertiesContext";
import { FiltersProvider } from "./FiltersContext";

export default function ContextWrapper({ children }: { children: ReactNode }) {
  return (
    <UIContextProvider>
      <PropertiesProvider>
        <FiltersProvider>{children}</FiltersProvider>
      </PropertiesProvider>
    </UIContextProvider>
  );
}
