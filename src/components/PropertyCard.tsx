import React from 'react';
import { Property } from '../types';
import { MapPin, CalendarClock, Home, Star, Heart } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onClick,
  isFavorite,
  onToggleFavorite
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const getAvailabilityClass = () => {
    const availDate = new Date(property.availability);
    const now = new Date();
    const daysDiff = Math.floor((availDate.getTime() - now.getTime()) / (1000 * 3600 * 24));

    if (daysDiff < 0) return 'bg-emerald-100 text-emerald-800'; // Available now
    if (daysDiff < 7) return 'bg-amber-100 text-amber-800'; // Available soon
    return 'bg-indigo-100 text-indigo-800'; // Available later
  };

  const getAvailabilityText = () => {
    const availDate = new Date(property.availability);
    const now = new Date();
    
    if (availDate <= now) {
      return 'Available Now';
    }
    return `Available ${formatDate(property.availability)}`;
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md transition-colors duration-300 hover:bg-gray-100"
        >
          <Heart 
            size={20} 
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'} 
          />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center justify-between">
            <span className="text-white font-bold">₹{property.rent.toLocaleString()}/mo</span>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${getAvailabilityClass()}`}>
              {getAvailabilityText()}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4" onClick={onClick}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-800 hover:text-indigo-600 transition-colors cursor-pointer">
            {property.title}
          </h3>
          <span className="flex items-center text-amber-500">
            <Star size={16} className="fill-amber-500" />
            <span className="ml-1 text-sm">{property.rating}</span>
          </span>
        </div>

        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin size={16} className="mr-1 text-indigo-500" />
          <span>{property.location}</span>
          <span className="mx-2">•</span>
          <span>{property.distance}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {property.propertyType && (
            <span className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded font-medium flex items-center">
              <Home size={12} className="mr-1" />
              {property.propertyType}
            </span>
          )}
          {property.gender && (
            <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded font-medium">
              {property.gender} Only
            </span>
          )}
          <span className="bg-gray-50 text-gray-700 text-xs px-2 py-1 rounded font-medium flex items-center">
            <CalendarClock size={12} className="mr-1" />
            {formatDate(property.availability)}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {property.amenities.slice(0, 4).map((amenity, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
            >
              {amenity}
            </span>
          ))}
          {property.amenities.length > 4 && (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
              +{property.amenities.length - 4} more
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {property.description}
        </p>

        <button 
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
          onClick={onClick}
        >
          View Details
        </button>
      </div>
    </div>
  );
};