export default function formatDate(date: string): string {
  const d = new Date(date); // Convertir la cadena ISO a un objeto Date
  const day = d.getDate().toString().padStart(2, "0"); // Obtener el día, asegurándose de que sea de dos dígitos
  const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Obtener el mes (añadir 1 porque getMonth() es 0-indexado)
  const year = d.getFullYear(); // Obtener el año

  return `${day}-${month}-${year}`;
}
