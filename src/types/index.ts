export interface Property {
  id: number;
  title: string;
  description: string;
  rent: number;
  location: string;
  availability: string;
  amenities: string[];
  images: string[];
  propertyType: 'PG' | 'Hostel' | 'Apartment';
  gender: 'Male' | 'Female' | 'Co-ed';
  rating: number;
  distance: string;
}

export interface FilterState {
  search: string;
  minRent: number;
  maxRent: number;
  location: string;
  availability: string;
  propertyType: string;
  gender: string;
}