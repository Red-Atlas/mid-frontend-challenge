import FilterWrapper from "../components/Filters/FilterWrapper";
import PropertiesList from "../components/PropertiesList/PropertiesList";

export default function Home() {
  return (
    <aside className="flex-1 h-full w-full flex flex-col gap-6 overflow-hidden !pointer-events-none [&>*]:!pointer-events-auto">
      <FilterWrapper />
      <PropertiesList />
    </aside>
  );
}
