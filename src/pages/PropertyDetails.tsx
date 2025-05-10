import React, { useState } from 'react';
import { useProperties } from '../hooks/useProperties';
import { MapPin, Calendar, Home, Users, ArrowLeft, Star, Wifi, Coffee, Utensils, Shirt, Book, Power, Heart } from 'lucide-react';

interface PropertyDetailsProps {
  propertyId: number;
  navigateToHome: () => void;
  isLoggedIn: boolean;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ 
  propertyId, 
  navigateToHome,
  isLoggedIn
}) => {
  const { getPropertyById, toggleFavorite, isFavorite } = useProperties();
  const property = getPropertyById(propertyId);
  const [activeImage, setActiveImage] = useState(0);
  
  // Handle favorite toggle
  const handleToggleFavorite = () => {
    toggleFavorite(propertyId);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  // Return to home if property not found
  if (!property) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h2>
        <button 
          onClick={navigateToHome}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Listings
        </button>
      </div>
    );
  }

  // Get amenity icon
  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wifi')) return <Wifi size={16} />;
    if (amenityLower.includes('ac')) return <Wifi size={16} />;
    if (amenityLower.includes('meal')) return <Utensils size={16} />;
    if (amenityLower.includes('laundry')) return <Shirt size={16} />;
    if (amenityLower.includes('study')) return <Book size={16} />;
    if (amenityLower.includes('power')) return <Power size={16} />;
    return <Coffee size={16} />;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={navigateToHome}
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft size={18} className="mr-1" />
        Back to Listings
      </button>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Image Gallery */}
        <div className="relative">
          <img 
            src={property.images[activeImage]} 
            alt={property.title} 
            className="w-full h-64 md:h-96 object-cover"
          />
          
          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md transition-colors duration-300 hover:bg-gray-100"
          >
            <Heart 
              size={24} 
              className={isFavorite(propertyId) ? 'fill-red-500 text-red-500' : 'text-gray-400'} 
            />
          </button>
          
          {/* Thumbnails */}
          {property.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeImage === index 
                      ? 'bg-white w-5' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {property.title}
              </h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={18} className="text-indigo-500 mr-1" />
                <span>{property.location}</span>
                <span className="mx-2">•</span>
                <span>{property.distance}</span>
                
                <div className="ml-4 flex items-center text-amber-500">
                  <Star size={18} className="fill-amber-500" />
                  <span className="ml-1">{property.rating}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-4">
                {property.propertyType && (
                  <span className="flex items-center bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                    <Home size={16} className="mr-1" />
                    {property.propertyType}
                  </span>
                )}
                {property.gender && (
                  <span className="flex items-center bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    <Users size={16} className="mr-1" />
                    {property.gender} Only
                  </span>
                )}
                <span className="flex items-center bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                  <Calendar size={16} className="mr-1" />
                  Available from {formatDate(property.availability)}
                </span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 bg-indigo-50 p-4 rounded-lg text-center">
              <p className="text-sm text-indigo-700 font-medium">Monthly Rent</p>
              <p className="text-2xl font-bold text-indigo-800">₹{property.rent.toLocaleString()}</p>
              
              <button 
                className={`mt-3 w-full py-2 px-4 rounded-md font-medium ${
                  isLoggedIn
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!isLoggedIn}
              >
                {isLoggedIn ? 'Book Now' : 'Login to Book'}
              </button>
              
              {!isLoggedIn && (
                <p className="text-xs text-gray-500 mt-2">
                  Please login to book this property
                </p>
              )}
            </div>
          </div>

          <hr className="my-6" />
          
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {property.description}
            </p>
          </div>
          
          {/* Amenities */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {property.amenities.map((amenity, index) => (
                <div 
                  key={index} 
                  className="flex items-center bg-gray-50 p-3 rounded-lg"
                >
                  <div className="text-indigo-500 mr-3">
                    {getAmenityIcon(amenity)}
                  </div>
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Location Map - Placeholder */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Location</h2>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Location map would appear here</p>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-indigo-800 mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For more information about this property, please contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                Call Owner
              </button>
              <button className="flex-1 border border-indigo-600 text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-50 transition-colors">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};