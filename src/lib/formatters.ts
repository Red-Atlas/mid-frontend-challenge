export const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "USD",
});

export const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  dateStyle: "medium",
  timeStyle: "short",
});
