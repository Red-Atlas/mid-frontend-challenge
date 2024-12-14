import { NavBar } from "../navbar/NavBar";

type TLayout = {
  children: React.ReactNode | React.ReactNode[];
  isLoading?: boolean;
  className?: string;
};

export function Layout(props: TLayout) {
  const { children, isLoading = false, className } = props;

  return (
    <div
      className={`bg-[#F6F6F6] h-screen w-screen bg-red flex flex-col sm:px-2 ${className}`}
    >
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="text-white">Cargando...</div>
        </div>
      )}

      <NavBar />
      {children}
    </div>
  );
}
