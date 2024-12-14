import { Table } from "../../../components";
import { IGetPropertiesMapped } from "../../../interfaces";

const HEADERS = [
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Status",
    key: "status",
  },
  {
    title: "Dirección",
    key: "address",
  },
  {
    title: "Tipo",
    key: "type",
  },
  {
    title: "Precio",
    key: "price",
  },
  {
    title: "Disponible",
    key: "available",
  },
];

export function TableProperties({
  properties,
  handlePage,
}: {
  properties: IGetPropertiesMapped[] | undefined;
  handlePage: (direction: "next" | "prev") => void;
}) {
  return (
    <Table properties={properties} headers={HEADERS} handlePage={handlePage} />
  );
}
