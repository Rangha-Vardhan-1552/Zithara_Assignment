import React from 'react';

const Pagination = ({ currentPage, totalRecords, recordsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handlePageChange = newPage => {
    // Ensure newPage is within valid range
    if (newPage >= 1 && newPage <= totalPages) {
      // Call the onPageChange function provided as a prop
      onPageChange(newPage);
    }
  };

  return (
    <div className='flex flex-row text-md text-slate-700 justify-evenly font-semibold items-center mt-4'>
      {/* Disable "Previous" button if on the first page */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className={`border rounded-lg p-2 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-200'}`}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      {/* Disable "Next" button if on the last page */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className={`border rounded-lg p-2 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-200'}`}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
