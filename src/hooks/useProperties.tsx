import { useEffect, useState } from 'react';
import { Property, FilterState } from '../types';
import { properties as initialProperties } from '../data/properties';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(initialProperties);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const initialFilterState: FilterState = {
    search: '',
    minRent: 0,
    maxRent: 20000,
    location: '',
    availability: '',
    propertyType: '',
    gender: ''
  };

  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  // Simulate loading from API
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProperties(initialProperties);
      setLoading(false);
    }, 500);
  }, []);

  // Apply filters when they change
  useEffect(() => {
    setLoading(true);
    
    const filtered = properties.filter(property => {
      // Search text filter
      const searchMatch = !filters.search || 
        property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.location.toLowerCase().includes(filters.search.toLowerCase());
      
      // Rent range filter
      const rentMatch = 
        property.rent >= filters.minRent && 
        property.rent <= filters.maxRent;
      
      // Location filter
      const locationMatch = !filters.location || 
        property.location === filters.location;
      
      // Availability filter (simplified)
      const availabilityMatch = !filters.availability || 
        new Date(property.availability) <= new Date(filters.availability);
      
      // Property type filter
      const typeMatch = !filters.propertyType || 
        property.propertyType === filters.propertyType;
      
      // Gender filter
      const genderMatch = !filters.gender || 
        property.gender === filters.gender;
      
      return searchMatch && rentMatch && locationMatch && 
        availabilityMatch && typeMatch && genderMatch;
    });
    
    setTimeout(() => {
      setFilteredProperties(filtered);
      setLoading(false);
    }, 300);
  }, [filters, properties]);

  // Toggle favorite status of a property
  const toggleFavorite = (propertyId: number) => {
    const newFavorites = favorites.includes(propertyId)
      ? favorites.filter(id => id !== propertyId)
      : [...favorites, propertyId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // Check if a property is favorited
  const isFavorite = (propertyId: number) => {
    return favorites.includes(propertyId);
  };

  // Get a single property by ID
  const getPropertyById = (id: number) => {
    return properties.find(property => property.id === id);
  };

  return {
    properties: filteredProperties,
    loading,
    filters,
    setFilters,
    resetFilters: () => setFilters(initialFilterState),
    toggleFavorite,
    isFavorite,
    favorites,
    getPropertyById
  };
};