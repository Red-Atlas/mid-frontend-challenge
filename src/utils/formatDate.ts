export const formatDate = (dateToFormat: string | Date): string => {
  if (typeof dateToFormat === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(dateToFormat)) {
    return dateToFormat;
  }

  const date: Date = typeof dateToFormat === 'string' ? new Date(dateToFormat) : dateToFormat;

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const day = String(date.getDate()).padStart(2, '0');  
  const month = String(date.getMonth() + 1).padStart(2, '0');  
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
