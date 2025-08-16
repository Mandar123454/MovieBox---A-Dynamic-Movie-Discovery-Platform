const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Limit the number of visible page buttons
  const maxVisibleButtons = 5;
  
  // Calculate the range of pages to display
  const getPageNumbers = () => {
    const pages = [];
    
    // Calculate start and end page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = startPage + maxVisibleButtons - 1;
    
    // Adjust if we're near the end
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }
    
    // Create page number array
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };
  
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center my-8">
      <nav className="flex items-center">
        {/* First page button */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-2 border rounded-l-md bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="First Page"
        >
          &laquo;
        </button>
        
        {/* Previous page button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 border-t border-b bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous Page"
        >
          &lsaquo;
        </button>
        
        {/* Page numbers */}
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-3 py-2 border-t border-b ${
              currentPage === pageNumber
                ? 'bg-[var(--secondary-color)] text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            {pageNumber}
          </button>
        ))}
        
        {/* Next page button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 border-t border-b bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next Page"
        >
          &rsaquo;
        </button>
        
        {/* Last page button */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 border rounded-r-md bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Last Page"
        >
          &raquo;
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
