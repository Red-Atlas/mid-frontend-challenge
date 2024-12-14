export function Title({ isSuccess }: { isSuccess: boolean }) {
  return (
    <h2
      className={`text-lg font-semibold text-gray-700 capitalize py-8 sm:py-4 ${
        isSuccess && "text-green-700 font-bold underline"
      }`}
    >
      {isSuccess ? "¡Registro exitoso!" : "Registrar propiedad"}
    </h2>
  );
}
