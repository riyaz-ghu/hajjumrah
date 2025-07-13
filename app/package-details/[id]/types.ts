export interface PackageData {
  id: string;
  name: string;
  operator: string;
  description: string;
  duration: string;
  rating: number;
  reviewsNo: number;
  departure: string;
  flightName: string;
  images: {
    makkah: string[];
    madinah: string[];
  };
  highlights: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  hotels: {
    makkah: {
      name: string;
      rating: number;
      address: string;
      distance: string;
      nights: number;
      amenities: string[];
      mapUrl: string;
    };
    madinah: {
      name: string;
      rating: number;
      address: string;
      distance: string;
      nights: number;
      amenities: string[];
      mapUrl: string;
    };
  };
  itinerary: Array<{
    day?: number;
    days?: string;
    description: string;
  }>;
  inclusions: Array<{
    icon: string;
    text: string;
  }>;
  pricing: {
    availableDates: Array<{
      date: string;
      prices: {
        single: number;
        double: number;
        triple: number;
        quad: number;
      };
      available: boolean;
    }>;
    roomTypes: Array<{
      id: string;
      label: string;
    }>;
  };
  reviews: {
    operator: {
      rating: number;
      count: number;
      reviews: Array<{
        name: string;
        rating: number;
        comment: string;
        date: string;
      }>;
    };
    makkah: {
      rating: number;
      count: number;
      reviews: Array<{
        name: string;
        rating: number;
        comment: string;
        date: string;
      }>;
    };
    madinah: {
      rating: number;
      count: number;
      reviews: Array<{
        name: string;
        rating: number;
        comment: string;
        date: string;
      }>;
    };
  };
}

export interface ApiResponse {
  success: boolean;
  data: PackageData;
  error?: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  guests: string;
  hasPassport: boolean;
}
