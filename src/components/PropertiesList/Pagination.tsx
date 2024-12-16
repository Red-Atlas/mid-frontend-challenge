import { cn } from "../../lib/utils";
import {
  MaterialSymbolsChevronLeftRounded,
  MaterialSymbolsChevronRightRounded,
} from "../Icons";
import Button from "../ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevious = () => {
    if (!isFirstPage) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (!isLastPage) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <Button
        variant="secondary"
        className={cn("cursor-pointer p-2", isFirstPage && "opacity-50")}
        onClick={handlePrevious}
        disabled={isFirstPage}
      >
        <MaterialSymbolsChevronLeftRounded className="h-6 w-6" />
      </Button>
      <span className="text-sm">
        Página {currentPage} de {totalPages}
      </span>
      <Button
        variant="secondary"
        className={cn("cursor-pointer p-2", isLastPage && "opacity-50")}
        onClick={handleNext}
        disabled={isLastPage}
      >
        <MaterialSymbolsChevronRightRounded className="h-6 w-6" />
      </Button>
    </div>
  );
}
