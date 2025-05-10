import React, { useState } from 'react';
import { useProperties } from '../hooks/useProperties';
import { PropertyCard } from '../components/PropertyCard';
import { FilterBar } from '../components/FilterBar';
import { Pagination } from '../components/Pagination';
import { Loader2 } from 'lucide-react';

interface HomeProps {
  navigateToDetails: (id: number) => void;
}

export const Home: React.FC<HomeProps> = ({ navigateToDetails }) => {
  const { 
    properties, 
    loading, 
    filters, 
    setFilters, 
    resetFilters,
    toggleFavorite,
    isFavorite
  } = useProperties();
  
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;
  
  // Calculate pagination values
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  
  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle property click
  const handlePropertyClick = (id: number) => {
    navigateToDetails(id);
  };

  // Handle favorite toggle
  const handleToggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-8 mb-8 text-white">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Find Your Perfect Student Accommodation
          </h1>
          <p className="text-indigo-100 mb-6">
            Browse through our curated list of PGs, hostels, and apartments near your campus.
            Filter by location, rent, and amenities to find your ideal student home.
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-indigo-700 px-6 py-3 rounded-md font-medium hover:bg-indigo-50 transition-colors">
              Explore Listings
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors">
              How It Works
            </button>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <FilterBar 
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
      />

      {/* Properties Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Available Properties
            {!loading && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({properties.length} results)
              </span>
            )}
          </h2>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 size={36} className="animate-spin text-indigo-600" />
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No properties found</h3>
            <p className="text-gray-500 mb-4">
              We couldn't find any properties matching your criteria.
            </p>
            <button 
              onClick={resetFilters}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onClick={() => handlePropertyClick(property.id)}
                  isFavorite={isFavorite(property.id)}
                  onToggleFavorite={(e) => handleToggleFavorite(e, property.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};