export interface UmrahPackage {
  id: string;
  name: string;
  score: number;
  url: string;
  provider: string;
  logo: string;
  logoColor: string;
  duration: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  makkahHotel: {
    name: string;
    rating: number;
    distanceFromHaram: string;
    distanceInMeters: number;
  };
  madinahHotel: {
    name: string;
    rating: number;
    distanceFromHaram: string;
    distanceInMeters: number;
  };
  departureDate: string;
  returnDate: string;
  departureCity: string;
  inclusions: string[];
  roomType: string;
  availability: string;
  deals: number;
  flightDetails: {
    airline: string;
    stops: number;
    duration: string;
  };
  packageType: "economy" | "standard" | "premium" | "luxury";
}

export interface FilterOptions {
  priceRange: [number, number];
  durations: string[];
  distances: string[];
  ratings: number[];
  packageTypes: string[];
}

export interface SearchParams {
  city: string;
  roomType: string;
  guests: number;
  departureDate?: string;
  returnDate?: string;
}
