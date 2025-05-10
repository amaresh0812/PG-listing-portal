import React, { useState } from 'react';
import { FilterState } from '../types';
import { properties } from '../data/properties';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  resetFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  filters, 
  setFilters, 
  resetFilters 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get unique locations from the properties data
  const locations = Array.from(new Set(properties.map(p => p.location)));
  
  // Get unique property types
  const propertyTypes = Array.from(new Set(properties.map(p => p.propertyType)));
  
  // Get unique gender options
  const genderOptions = Array.from(new Set(properties.map(p => p.gender)));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect in useProperties
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative mb-4">
        <div className="flex">
          <div className="relative flex-grow">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleInputChange}
              placeholder="Search by location, PG name or description..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>
          <button 
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-indigo-600 text-white px-4 rounded-r-md hover:bg-indigo-700 transition-colors"
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </form>

      {/* Expanded Filters */}
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label 
              htmlFor="location" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <select
              id="location"
              name="location"
              value={filters.location}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label 
              htmlFor="propertyType" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Property Type
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={filters.propertyType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Types</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label 
              htmlFor="gender" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={filters.gender}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All</option>
              {genderOptions.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label 
              htmlFor="availability" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Available From
            </label>
            <input
              type="date"
              id="availability"
              name="availability"
              value={filters.availability}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label 
              htmlFor="minRent" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Min Rent (₹)
            </label>
            <input
              type="number"
              id="minRent"
              name="minRent"
              value={filters.minRent}
              onChange={handleInputChange}
              min="0"
              step="500"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label 
              htmlFor="maxRent" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Max Rent (₹)
            </label>
            <input
              type="number"
              id="maxRent"
              name="maxRent"
              value={filters.maxRent}
              onChange={handleInputChange}
              min="0"
              step="500"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors mr-2"
          >
            <X size={16} className="mr-1" />
            Reset Filters
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.location || filters.propertyType || filters.gender || 
        filters.availability || filters.minRent > 0 || filters.maxRent < 20000) && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-gray-500">Active filters:</span>
          
          {filters.location && (
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full flex items-center">
              Location: {filters.location}
              <button 
                onClick={() => setFilters({ ...filters, location: '' })}
                className="ml-1 text-indigo-800 hover:text-indigo-900"
              >
                <X size={14} />
              </button>
            </span>
          )}
          
          {filters.propertyType && (
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full flex items-center">
              Type: {filters.propertyType}
              <button 
                onClick={() => setFilters({ ...filters, propertyType: '' })}
                className="ml-1 text-indigo-800 hover:text-indigo-900"
              >
                <X size={14} />
              </button>
            </span>
          )}
          
          {filters.gender && (
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full flex items-center">
              Gender: {filters.gender}
              <button 
                onClick={() => setFilters({ ...filters, gender: '' })}
                className="ml-1 text-indigo-800 hover:text-indigo-900"
              >
                <X size={14} />
              </button>
            </span>
          )}
          
          {filters.availability && (
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full flex items-center">
              Available From: {filters.availability}
              <button 
                onClick={() => setFilters({ ...filters, availability: '' })}
                className="ml-1 text-indigo-800 hover:text-indigo-900"
              >
                <X size={14} />
              </button>
            </span>
          )}
          
          {(filters.minRent > 0 || filters.maxRent < 20000) && (
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full flex items-center">
              Rent: ₹{filters.minRent} - ₹{filters.maxRent}
              <button 
                onClick={() => setFilters({ ...filters, minRent: 0, maxRent: 20000 })}
                className="ml-1 text-indigo-800 hover:text-indigo-900"
              >
                <X size={14} />
              </button>
            </span>
          )}
          
          <button 
            onClick={resetFilters}
            className="text-xs text-indigo-600 hover:text-indigo-800 underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};