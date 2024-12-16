import {
  MaterialSymbolsFilterListRounded,
  MaterialSymbolsListRounded,
  MaterialSymbolsAddNotesRounded,
} from "@/components/Icons";

import Link from "@/components/ui/link";

import { useUIContext } from "@/contexts/UIContext";

export default function Header() {
  const { toggleListVisibility, toggleFilterVisibility } = useUIContext();

  return (
    <>
      <header className="flex items-center bg-white/90 backdrop-blur-sm rounded-xl justify-between md:backdrop-blur-none md:bg-transparent md:!pointer-events-none md:w-full">
        <div className="md:bg-white/90 md:backdrop-blur-sm h-full px-6 md:rounded-xl md:shadow-md flex items-center gap-4 md:!pointer-events-auto">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-6 my-4 md:my-3 w-auto object-cover"
          />
          <Link to="/" onClick={toggleFilterVisibility}>
            <MaterialSymbolsFilterListRounded className="h-8 w-8 md:h-6 md:w-6" />
            <span className="hidden md:block text-base font-semibold uppercase">
              Filtros
            </span>
          </Link>
        </div>

        <div className="md:bg-white/90 md:backdrop-blur-sm h-full px-6 md:rounded-xl md:shadow-md flex items-center gap-4 md:!pointer-events-auto">
          <Link to="/" onClick={toggleListVisibility}>
            <MaterialSymbolsListRounded className="h-8 w-8 md:h-6 md:w-6" />
            <span className="hidden md:block text-base font-semibold uppercase">
              Listado
            </span>
          </Link>
          <Link to="/propiedad/crear" onClick={toggleListVisibility}>
            <span className="hidden md:block text-base font-semibold uppercase">
              Publicar
            </span>
            <MaterialSymbolsAddNotesRounded className="h-8 w-8 md:h-6 md:w-6" />
          </Link>
        </div>
      </header>
    </>
  );
}
