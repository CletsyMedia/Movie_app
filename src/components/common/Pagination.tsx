import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedPage: { selected: number }) => void;
  isMobile: boolean;
  selectedPage: number; // Add selectedPage prop
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
  isMobile,
  selectedPage,
}) => {
  return (
    <div className="flex justify-center mt-6 mb-20 lg:mb-6">
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={isMobile ? 3 : 5} // Use 3 for mobile, 5 for desktop
        marginPagesDisplayed={isMobile ? 1 : 2} // Adjust margin pages for mobile
        onPageChange={onPageChange}
        forcePage={selectedPage}
        containerClassName="flex items-center space-x-2 flex-wrap justify-center"
        pageClassName={`${
          isMobile ? "px-2 py-1 text-xs" : "px-4 py-2 text-base"
        } cursor-pointer bg-gray-700 text-white rounded hover:bg-gray-600 transition duration-200`}
        pageLinkClassName="text-white"
        activeClassName="bg-red-600 text-white"
        disabledClassName="opacity-50 cursor-not-allowed"
        previousLabel="Prev"
        nextLabel="Next"
        previousClassName={`${
          isMobile ? "px-3 py-1 text-xs" : "px-4 py-2"
        } bg-gray-700 text-white rounded hover:bg-gray-600`}
        nextClassName={`${
          isMobile ? "px-3 py-1 text-xs" : "px-4 py-2"
        } bg-gray-700 text-white rounded hover:bg-gray-600`}
      />
    </div>
  );
};

export default Pagination;
