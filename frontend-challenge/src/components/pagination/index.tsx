import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
import "./styles.scss";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="paginationWrapper">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <BiCaretLeft />
        Prev
      </button>
      <p>
        Page: <span>{currentPage}</span> of <span>{totalPages}</span>
      </p>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next
        <BiCaretRight />
      </button>
    </div>
  );
};
