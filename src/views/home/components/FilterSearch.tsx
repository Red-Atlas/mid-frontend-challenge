import { InputText, Select } from "../../../components/inputs";

type FilterSearchProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setPropertyType: React.Dispatch<React.SetStateAction<string>>;
  setStateFilter: React.Dispatch<React.SetStateAction<string>>;
  setPriceFilter: React.Dispatch<React.SetStateAction<string>>;
  handleInputChange: (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  search: string;
  types: { label: string; value: string }[];
  states: { label: string; value: string }[];
  price: { label: string; value: string }[];
};

export default function FilterSearch({
  setPriceFilter,
  setPropertyType,
  setSearch,
  setStateFilter,
  handleInputChange,
  search,
  states,
  types,
  price,
}: FilterSearchProps) {
  return (
    <>
      <InputText
        type="text"
        placeholder="Buscar por dirección"
        onChange={handleInputChange(setSearch)}
        value={search}
      />

      <Select options={types} onChange={handleInputChange(setPropertyType)} />

      <Select options={states} onChange={handleInputChange(setStateFilter)} />

      <Select options={price} onChange={handleInputChange(setPriceFilter)} />
    </>
  );
}
