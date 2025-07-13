"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Filter,
  Star,
  MapPin,
  Calendar,
  Loader2,
  AlertCircle,
  Users,
  ArrowLeft,
  Building,
  Plane,
  User,
  ArrowRight,
  BedDouble,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { fetchPackages, filterPackages, sortPackages } from "./api/mock-api";
import type { UmrahPackage, FilterOptions, SearchParams } from "./types";

type SortOption = "best" | "cheapest" | "fastest";
type RoomType = "sharing" | "double" | "triple" | "quad";

export default function UmrahPackages() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  let city = params.city as string;

  try {
    city = city.split("packages-")[1].replace(/-/g, " ");
    city = city.charAt(0).toUpperCase() + city.slice(1);
    console.log(city); // Mumbai
  } catch {
    console.log("not a valid url");
  }

  const [allPackages, setAllPackages] = useState<UmrahPackage[]>([]);
  const [displayedPackages, setDisplayedPackages] = useState<UmrahPackage[]>(
    []
  );
  const [filteredPackages, setFilteredPackages] = useState<UmrahPackage[]>([]);
  const [packagesOutsideFilters, setPackagesOutsideFilters] = useState<
    UmrahPackage[]
  >([]);
  const [sortBy, setSortBy] = useState<SortOption>("best");
  const [roomType, setRoomType] = useState<RoomType>("sharing");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [roomLoading, setRoomLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter states (client-side only)
  const [priceRange, setPriceRange] = useState<[number, number]>([
    30000, 200000,
  ]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedDistances, setSelectedDistances] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isRoomTypeOpen, setIsRoomTypeOpen] = useState(false);
  const [showFavoriteMessage, setShowFavoriteMessage] = useState<string | null>(
    null
  );

  // Get search parameters
  const cityCode = searchParams.get("city") || "BOM";

  const initialRoomType =
    (searchParams.get("roomType") as RoomType) || "sharing";
  const guestCount = Number(searchParams.get("guests")) || 1;

  // Load packages on mount
  useEffect(() => {
    setRoomType(initialRoomType);
    loadPackages({
      city: city,
      roomType: initialRoomType,
      guests: guestCount,
    });
  }, [cityCode, initialRoomType, guestCount]);

  // Load packages when room type changes (API call)
  useEffect(() => {
    loadPackages({
      city: city,
      roomType: roomType,
      guests: guestCount,
    });
  }, [roomType]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      // Ensure storedFavorites is always an array
      const favoritesArray = Array.isArray(storedFavorites)
        ? storedFavorites
        : [];
      const favoriteIds = new Set<string>(
        favoritesArray.map((pkg: UmrahPackage) => pkg.id)
      );
      setFavorites(favoriteIds);
    } catch (error) {
      console.error("Error loading favorites:", error);
      setFavorites(new Set());
    }
  }, []);

  // Apply filters and sorting when dependencies change (client-side)
  useEffect(() => {
    if (allPackages.length > 0) {
      applyFiltersAndSort();
    }
  }, [
    allPackages,
    priceRange,
    selectedDurations,
    selectedDistances,
    selectedRatings,
    sortBy,
  ]);

  const loadPackages = async (params: SearchParams) => {
    try {
      if (params.roomType !== roomType) {
        setRoomLoading(true);
      } else {
        setLoading(true);
      }
      setError(null);
      const packages = await fetchPackages(params);
      console.log(packages);
      setAllPackages(packages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
      setRoomLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    const filters: FilterOptions = {
      priceRange,
      durations: selectedDurations,
      distances: selectedDistances,
      ratings: selectedRatings,
      packageTypes: [],
    };

    const filtered = filterPackages(allPackages, filters);
    const outsideFilters = allPackages.filter(
      (pkg) => !filtered.some((f) => f.id === pkg.id)
    );
    const sortedOutsideFilters = sortPackages(outsideFilters, sortBy);

    setFilteredPackages(filtered);
    setDisplayedPackages(filtered); // Display filtered packages
    setPackagesOutsideFilters(sortedOutsideFilters);
  };

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
  };

  const handleRoomTypeChange = (type: RoomType) => {
    setRoomType(type);
    setIsRoomTypeOpen(false);
  };

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    const packageToToggle = allPackages.find((pkg) => pkg.id === id);

    if (!packageToToggle) return;

    if (newFavorites.has(id)) {
      newFavorites.delete(id);
      setShowFavoriteMessage("Removed from favourites");
      // Remove from localStorage
      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      const updatedStoredFavorites = storedFavorites.filter(
        (pkg: UmrahPackage) => pkg.id !== id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedStoredFavorites));
    } else {
      newFavorites.add(id);
      setShowFavoriteMessage("Added to favourites");
      // Add to localStorage
      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      storedFavorites.push(packageToToggle);
      localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    }
    setFavorites(newFavorites);

    setTimeout(() => setShowFavoriteMessage(null), 2000);
  };

  const getSortedPrice = (option: SortOption) => {
    if (allPackages.length === 0) return 0;
    const sorted = sortPackages(allPackages, option);
    return sorted[0]?.price || 0;
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const resetFilters = () => {
    setPriceRange([30000, 200000]);
    setSelectedDurations([]);
    setSelectedDistances([]);
    setSelectedRatings([]);
  };

  const hasActiveFilters = () => {
    return (
      priceRange[0] !== 30000 ||
      priceRange[1] !== 200000 ||
      selectedDurations.length > 0 ||
      selectedDistances.length > 0 ||
      selectedRatings.length > 0
    );
  };

  const getRoomTypeLabel = (type: RoomType) => {
    switch (type) {
      case "double":
        return "Double";
      case "triple":
        return "Triple";
      case "quad":
        return "Quad";
      default:
        return "Sharing (5+)";
    }
  };

  const getCityName = (code: string) => {
    const cities: { [key: string]: string } = {
      BOM: "Mumbai",
      DEL: "Delhi",
      BLR: "Bangalore",
      CCU: "Kolkata",
      HYD: "Hyderabad",
      LKO: "Lucknow",
    };
    return cities[code] || "Delhi";
  };

  const handleSelectPackage = (packageId: string) => {
    router.push(
      `/package-details/${packageId.toString()}?roomType=${roomType}`
    );
  };

  const renderPackageCard = (pkg: UmrahPackage, isOutsideFilter = false) => (
    <Card
      key={pkg.id}
      className={`overflow-hidden bg-white border-gray-200 max-w-4xl mx-auto ${
        isOutsideFilter ? "opacity-75" : ""
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold text-lg`}
            >
              {pkg.logo}
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{pkg.name}</h2>
              <div className="text-sm text-gray-600">
                by {pkg.provider.split(" ").slice(0, 2).join(" ")} |{" "}
                {pkg.duration}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(pkg.id)}
            className="text-gray-400 hover:text-red-500 hover:bg-gray-100"
          >
            <Heart
              className={`w-6 h-6 ${
                favorites.has(pkg.id) ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
        </div>

        {/* Makkah Hotel */}
        <div className="mb-3">
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
            <Building className="w-4 h-4" />
            <span className="font-medium">Makkah</span>
          </div>
          <div className="font-medium text-gray-900 mb-1">
            {pkg.makkahHotel.name}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {Array.from({ length: pkg.makkahHotel.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">
                {pkg.makkahHotel.rating} stars
              </span>
            </div>
            <span className="text-sm text-gray-600">
              {pkg.makkahHotel.distanceFromHaram}
            </span>
          </div>
        </div>

        {/* Madinah Hotel */}
        <div className="mb-4">
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">Madinah</span>
          </div>
          <div className="font-medium text-gray-900 mb-1">
            {pkg.madinahHotel.name}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {Array.from({ length: pkg.madinahHotel.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">
                {pkg.madinahHotel.rating} stars
              </span>
            </div>
            <span className="text-sm text-gray-600">
              {pkg.madinahHotel.distanceFromHaram}
            </span>
          </div>
        </div>

        {/* Inclusions */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 items-center">
            {pkg.inclusions.slice(0, 3).map((inclusion) => (
              <Badge
                key={inclusion}
                className="text-xs px-3 py-1 bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100"
              >
                {inclusion}
              </Badge>
            ))}
            {pkg.inclusions.length > 3 && (
              <Badge className="text-xs px-3 py-1 bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100">
                +{pkg.inclusions.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Flight-style Dates */}
        <div className="mb-4 bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-center gap-3 text-sm">
            <div className="flex items-center gap-1 text-gray-700">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">{pkg.departureDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Plane className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex items-center gap-1 text-gray-700">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">{pkg.returnDate}</span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-end justify-between">
          <div>
            <div className="text-sm text-gray-600 mb-1">
              {roomType} rooms from
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ₹{pkg.price.toLocaleString()}
            </div>
          </div>
          <Button
            onClick={() => handleSelectPackage(pkg.url)}
            className="bg-green-600 hover:bg-green-700 text-white text-base px-6 py-3 rounded-lg w-1/2 h-12"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-green-600" />
          <p className="text-gray-600">Loading Umrah packages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="mb-4">{error}</AlertDescription>
          <Button
            onClick={() =>
              loadPackages({ city: cityCode, roomType, guests: guestCount })
            }
            className="bg-green-600 hover:bg-green-700"
          >
            Try Again
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/*Header*/}
      <div className="bg-white pt-8 pb-4 relative max-w-4xl mx-auto">
        <div className="px-4 flex items-center justify-between relative h-10">
          {/* Back button on the left */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="z-10"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Button>

          {/* Centered Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Image
              src="https://nawhsuonnaovrbijiqqv.supabase.co/storage/v1/object/public/gohajjumrah//logo-side.png"
              alt="GoHajjUmrah Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </div>

          {/* Right-side icons */}
          <div className="flex items-center gap-2 z-10">
            <Button
              onClick={() => {
                router.push("/profile");
              }}
              variant="ghost"
              size="icon"
              className="relative"
            >
              <User className="w-5 h-5 text-gray-600" />
              {favorites.size > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {favorites.size}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Sort Tabs - Card Style */}
      <div className="bg-white pl-4 pr-4 max-w-4xl mx-auto">
        <Card className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="flex">
              <button
                onClick={() => handleSortChange("best")}
                className={`flex-1 p-4 text-center rounded-l-2xl transition-colors ${
                  sortBy === "best"
                    ? "bg-gray-700 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                <div className="font-semibold text-sm">Best</div>
                <div
                  className={`text-lg font-bold ${
                    sortBy === "best" ? "text-white" : "text-green-600"
                  }`}
                >
                  {formatPrice(getSortedPrice("best"))}
                </div>
              </button>
              <button
                onClick={() => handleSortChange("cheapest")}
                className={`flex-1 p-4 text-center border-l border-r border-gray-200 transition-colors ${
                  sortBy === "cheapest"
                    ? "bg-gray-700 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                <div className="font-semibold text-sm">Cheapest</div>
                <div
                  className={`text-lg font-bold ${
                    sortBy === "cheapest" ? "text-white" : "text-green-600"
                  }`}
                >
                  {formatPrice(getSortedPrice("cheapest"))}
                </div>
              </button>
              <button
                onClick={() => handleSortChange("fastest")}
                className={`flex-1 p-4 text-center rounded-r-2xl transition-colors ${
                  sortBy === "fastest"
                    ? "bg-gray-700 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                <div className="font-semibold text-sm">Shortest</div>
                <div
                  className={`text-lg font-bold ${
                    sortBy === "fastest" ? "text-white" : "text-green-600"
                  }`}
                >
                  {formatPrice(getSortedPrice("fastest"))}
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Header */}
      <div className="bg-white border-b sticky top-0 z-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-between p-4">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 bg-transparent text-xs px-2 py-1.5 h-8 min-w-0"
              >
                <Filter className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="hidden xl:inline">Filter</span>
                {hasActiveFilters() && (
                  <span className="bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0">
                    {selectedDurations.length +
                      selectedDistances.length +
                      selectedRatings.length +
                      (priceRange[0] !== 30000 || priceRange[1] !== 200000
                        ? 1
                        : 0)}
                  </span>
                )}
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] bg-white">
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between">
                  Filter Packages
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-green-600 hover:bg-green-50"
                  >
                    Reset
                  </Button>
                </SheetTitle>
              </SheetHeader>
              <div className="space-y-6 mt-6 pb-20">
                <div>
                  <Label className="text-base font-medium">Price Range</Label>
                  <div className="mt-4 px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={(value) =>
                        setPriceRange(value as [number, number])
                      }
                      max={200000}
                      min={30000}
                      step={5000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Duration</Label>
                  <div className="space-y-2 mt-2">
                    {["7 days", "10 days", "15 days", "20 days"].map(
                      (duration) => (
                        <div
                          key={duration}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={duration}
                            checked={selectedDurations.includes(duration)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedDurations([
                                  ...selectedDurations,
                                  duration,
                                ]);
                              } else {
                                setSelectedDurations(
                                  selectedDurations.filter(
                                    (d) => d !== duration
                                  )
                                );
                              }
                            }}
                          />
                          <Label htmlFor={duration}>{duration}</Label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Hotel Rating</Label>
                  <div className="space-y-2 mt-2">
                    {[3, 4, 5].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={selectedRatings.includes(rating)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedRatings([...selectedRatings, rating]);
                            } else {
                              setSelectedRatings(
                                selectedRatings.filter((r) => r !== rating)
                              );
                            }
                          }}
                        />
                        <Label
                          htmlFor={`rating-${rating}`}
                          className="flex items-center"
                        >
                          {rating}{" "}
                          <Star className="w-4 h-4 ml-1 fill-green-900 text-green-900" />
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4">
                <Button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-2/3 h-12 bg-green-600 hover:bg-green-700"
                >
                  Apply ({filteredPackages.length} packages)
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet open={isRoomTypeOpen} onOpenChange={setIsRoomTypeOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 bg-transparent relative text-xs px-2 py-1.5 h-8 min-w-0"
              >
                {roomLoading && (
                  <Loader2 className="w-3.5 h-3.5 animate-spin flex-shrink-0" />
                )}
                {!roomLoading && (
                  <BedDouble className="w-3.5 h-3.5 flex-shrink-0" />
                )}
                <span className="hidden xs:inline truncate">
                  {roomType === "sharing"
                    ? "Sharing"
                    : roomType.charAt(0).toUpperCase() + roomType.slice(1)}
                </span>
                <svg
                  className="w-3 h-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                {getRoomTypeLabel(roomType)}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[50vh] bg-white">
              <SheetHeader>
                <SheetTitle>Select Room Type</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <button
                  onClick={() => handleRoomTypeChange("sharing")}
                  className={`w-full p-4 text-left rounded-lg border ${
                    roomType === "sharing"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="font-semibold text-gray-900">
                    Sharing (5+)
                  </div>
                  <div className="text-sm text-gray-500">
                    5 or more persons sharing
                  </div>
                </button>
                <button
                  onClick={() => handleRoomTypeChange("quad")}
                  className={`w-full p-4 text-left rounded-lg border ${
                    roomType === "quad"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="font-semibold text-gray-900">Quad Room</div>
                  <div className="text-sm text-gray-500">4 persons sharing</div>
                </button>
                <button
                  onClick={() => handleRoomTypeChange("triple")}
                  className={`w-full p-4 text-left rounded-lg border ${
                    roomType === "triple"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="font-semibold text-gray-900">Triple Room</div>
                  <div className="text-sm text-gray-500">3 persons sharing</div>
                </button>
                <button
                  onClick={() => handleRoomTypeChange("double")}
                  className={`w-full p-4 text-left rounded-lg border ${
                    roomType === "double"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="font-semibold text-gray-900">Double Room</div>
                  <div className="text-sm text-gray-500">2 persons sharing</div>
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Favorite Message - Floating */}
        {showFavoriteMessage && (
          <div className="absolute top-16 left-4 right-4 bg-green-100 border border-green-500 text-green-700 p-3 text-sm text-center rounded-lg shadow-lg z-20 animate-in slide-in-from-top-2 duration-300">
            {showFavoriteMessage}
          </div>
        )}
      </div>

      <h1 className="text-xl font-bold text-gray-900 mt-4 flex justify-center">
        Umrah Packages From {city}
      </h1>

      {/* Package List */}
      <div className="p-4 space-y-4">
        {displayedPackages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              No packages in your criteria for{" "}
              {getRoomTypeLabel(roomType).toLowerCase()}
            </p>
            <Button
              onClick={() => handleRoomTypeChange("sharing")}
              variant="outline"
              className="border-green-600 text-green-600 bg-transparent"
            >
              Show Sharing Rooms
            </Button>
          </div>
        )}

        {displayedPackages.length > 0 &&
          displayedPackages.map((pkg) => renderPackageCard(pkg, false))}

        {packagesOutsideFilters.length > 0 && (
          <>
            <div className="flex items-center gap-4 my-8 py-4">
              <hr className="flex-1 border-green-300" />
              <div className="bg-green-50 border border-green-200 rounded-full px-4 py-2">
                <span className="text-sm font-medium text-green-700">
                  More packages outside your filters (
                  {packagesOutsideFilters.length})
                </span>
              </div>
              <hr className="flex-1 border-green-300" />
            </div>
            {packagesOutsideFilters.map((pkg) => renderPackageCard(pkg, false))}
          </>
        )}
      </div>
    </div>
  );
}
