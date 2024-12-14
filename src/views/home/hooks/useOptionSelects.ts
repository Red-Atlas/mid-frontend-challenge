import { useMemo } from "react";
import { IGetPropertiesMapped } from "../../../interfaces";

type useOptionSelectsProps = {
  data: IGetPropertiesMapped[] | undefined;
};

const BASE_SELECT = [
  {
    label: "Seleccione",
    value: "",
  },
];

const ASC_FILTER = [
  { label: "Ascendente", value: "asc" },
  { label: "Descendente", value: "desc" },
];

export function useOptionSelects({ data }: useOptionSelectsProps) {
  const types = useMemo(() => {
    return Array.from(
      new Set(
        data?.map((property) =>
          JSON.stringify({
            label: property.typeOfProperty,
            value: property.typeOfProperty,
          })
        )
      )
    ).map((type) => JSON.parse(type));
  }, [data]);

  const states = useMemo(() => {
    return Array.from(new Set(data?.map((property) => property.state))).map(
      (state) => ({
        label: state,
        value: state,
      })
    );
  }, [data]);

  return {
    types: [...BASE_SELECT, ...types],
    states: [...BASE_SELECT, ...states],
    price: [...BASE_SELECT, ...ASC_FILTER],
  };
}
