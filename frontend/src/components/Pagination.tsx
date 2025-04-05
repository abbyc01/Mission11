import { useState } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onSizeChange,
}: PaginationProps) => {
  const [pageNum, setPageNum] = useState(currentPage);
  const [size, setSize] = useState(pageSize);

  return (
    <div>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => {
            setPageNum(index + 1);
            onPageChange(index + 1);
          }}
          disabled={pageNum === index + 1}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>

      <br />

      <label>
        Results per page:
        <select
          value={size}
          onChange={(e) => {
            const newSize = Number(e.target.value);
            setSize(newSize);
            setPageNum(1);
            onSizeChange(newSize);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </label>
    </div>
  );
};

export default Pagination;
