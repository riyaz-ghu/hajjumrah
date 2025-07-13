import packagesData from "../data/packages.json";
import type { UmrahPackage, FilterOptions, SearchParams } from "../types";

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchPackages = async (
  searchParams?: Partial<SearchParams>
): Promise<UmrahPackage[]> => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hd2hzdW9ubmFvdnJiaWppcXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyODc2MjEsImV4cCI6MjA0ODg2MzYyMX0.iWOgZO1du6yHemVdBjAZt2nVJdPAKjCIXsIcRbK6yeo";

  let room = searchParams?.roomType || "Quad";

  try {
    room = room.split("packages-")[1].replace(/-/g, " ");
    room = room.charAt(0).toUpperCase() + room.slice(1);
  } catch {}

  return fetch(
    `https://nawhsuonnaovrbijiqqv.functions.supabase.co/getPackageList?roomType=${room}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      let packages = data.packages as UmrahPackage[];

      console.log(searchParams);

      // Filter by search parameters if specified
      if (searchParams) {
        if (searchParams.city) {
          const cityName = searchParams.city;
          if (cityName) {
            packages = packages.filter((pkg) => pkg.departureCity === cityName);
          }
        }

        if (searchParams.roomType && searchParams.roomType !== "sharing") {
          packages = packages.filter(
            (pkg) =>
              pkg.roomType.toLowerCase() ===
              searchParams.roomType?.toLowerCase()
          );
        }
      }

      console.log(packages);

      return packages;
    })
    .catch((error) => {
      console.error(error);
      return [] as UmrahPackage[]; // Return empty array on error
    });
};

export const filterPackages = (
  packages: UmrahPackage[],
  filters: FilterOptions
): UmrahPackage[] => {
  return packages.filter((pkg) => {
    // Price filter
    if (
      pkg.price < filters.priceRange[0] ||
      pkg.price > filters.priceRange[1]
    ) {
      return false;
    }

    // Duration filter
    if (
      filters.durations.length > 0 &&
      !filters.durations.includes(pkg.duration)
    ) {
      return false;
    }

    // Distance filter (based on Makkah hotel distance)
    if (filters.distances.length > 0) {
      const makkahDistance = pkg.makkahHotel.distanceInMeters;
      let matchesDistance = false;

      filters.distances.forEach((range) => {
        switch (range) {
          case "0-100m":
            if (makkahDistance <= 100) matchesDistance = true;
            break;
          case "100-300m":
            if (makkahDistance > 100 && makkahDistance <= 300)
              matchesDistance = true;
            break;
          case "300-500m":
            if (makkahDistance > 300 && makkahDistance <= 500)
              matchesDistance = true;
            break;
          case "500m+":
            if (makkahDistance > 500) matchesDistance = true;
            break;
        }
      });

      if (!matchesDistance) return false;
    }

    // Rating filter (check both hotels)
    if (filters.ratings.length > 0) {
      const hasMatchingRating = filters.ratings.some(
        (rating) =>
          pkg.makkahHotel.rating > rating || pkg.madinahHotel.rating > rating
      );
      if (!hasMatchingRating) return false;
    }

    // Package type filter
    if (
      filters.packageTypes.length > 0 &&
      !filters.packageTypes.includes(pkg.packageType)
    ) {
      return false;
    }

    return true;
  });
};

export const sortPackages = (
  packages: UmrahPackage[],
  sortBy: "best" | "cheapest" | "fastest"
): UmrahPackage[] => {
  return [...packages].sort((a, b) => {
    switch (sortBy) {
      case "cheapest":
        return a.price - b.price;
      case "fastest":
        return Number.parseInt(a.duration) - Number.parseInt(b.duration);
      case "best":
      default:
        // Sort by rating first, then by price (lower is better for same rating)
        if (a.rating !== b.rating) {
          return b.rating - a.rating;
        }
        return a.price - b.price;
    }
  });
};

// Get popular destinations
export const getPopularDestinations = (): string[] => {
  return [
    "Mumbai to Makkah",
    "Delhi to Makkah",
    "Bangalore to Makkah",
    "Chennai to Makkah",
    "Kolkata to Makkah",
    "Hyderabad to Makkah",
  ];
};

// Get package statistics
export const getPackageStats = (packages: UmrahPackage[]) => {
  const totalPackages = packages.length;
  const avgPrice =
    packages.reduce((sum, pkg) => sum + pkg.price, 0) / totalPackages;
  const priceRange = {
    min: Math.min(...packages.map((pkg) => pkg.price)),
    max: Math.max(...packages.map((pkg) => pkg.price)),
  };

  return {
    totalPackages,
    avgPrice: Math.round(avgPrice),
    priceRange,
  };
};
