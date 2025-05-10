import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  const pageNumbers = [];
  
  // Create page number array
  if (totalPages <= 5) {
    // If 5 or fewer pages, show all
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Always include first page
    pageNumbers.push(1);
    
    // If not on first few pages, add ellipsis
    if (currentPage > 3) {
      pageNumbers.push('...');
    }
    
    // Add pages around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    // If not on last few pages, add ellipsis
    if (currentPage < totalPages - 2) {
      pageNumbers.push('...');
    }
    
    // Always include last page
    pageNumbers.push(totalPages);
  }
  
  return (
    <div className="flex justify-center items-center space-x-1 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-md flex items-center justify-center ${
          currentPage === 1 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
        }`}
      >
        <ChevronLeft size={18} />
      </button>
      
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`w-9 h-9 rounded-md flex items-center justify-center transition-colors ${
            page === currentPage
              ? 'bg-indigo-600 text-white'
              : page === '...'
                ? 'text-gray-500 cursor-default'
                : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md flex items-center justify-center ${
          currentPage === totalPages 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
        }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};