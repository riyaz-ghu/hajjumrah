"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heart,
  Star,
  MapPin,
  Users,
  Plane,
  Hotel,
  ArrowLeft,
  Building2,
  CheckCircle,
  Trophy,
  Utensils,
  Navigation,
  X,
  ChevronLeft,
  ChevronRight,
  Car,
  Shield,
  Headphones,
  UserCheck,
  Waves,
  MapIcon,
  User,
  ArrowRight,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import type { PackageData, ApiResponse } from "./types";
import type { UmrahPackage } from "../../packages/[city]/types";
import { BookingSuccess } from "./components/booking-success";
import { BookingForm } from "./components/booking-form";
import { LoadingState } from "./components/loading-state";
import { ErrorState } from "./components/error-state";
import { fetchPackages } from "./api";

export default function UmrahPackageDetails() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract URL parameters
  const packageId = params.id as string;
  console.log(packageId);
  const roomTypeParam = searchParams.get("roomType") || "quad";

  // State management
  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLiked, setIsLiked] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showPhotoGallery, setShowPhotoGallery] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedHotel, setSelectedHotel] = useState<
    "makkah" | "madinah" | null
  >(null);
  const [selectedRoom, setSelectedRoom] = useState(roomTypeParam);
  const [selectedDate, setSelectedDate] = useState("2024-02-15");
  const [reviewTab, setReviewTab] = useState("operator");
  const [photoFilter, setPhotoFilter] = useState("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Refs for scrolling
  const overviewRef = useRef<HTMLDivElement>(null);
  const hotelsRef = useRef<HTMLDivElement>(null);
  const itineraryRef = useRef<HTMLDivElement>(null);
  const inclusionsRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Icon mapping
  const iconMap = {
    trophy: Trophy,
    utensils: Utensils,
    navigation: Navigation,
    plane: Plane,
    car: Car,
    hotel: Hotel,
    waves: Waves,
    checkCircle: CheckCircle,
    shield: Shield,
    headphones: Headphones,
    userCheck: UserCheck,
    mapIcon: MapIcon,
  };

  // API fetch function
  const fetchPackageData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Import mock data
      const mockData = await fetchPackages(packageId);
      console.log(mockData);
      const mockApiResponse: ApiResponse = {
        success: true,
        data: {
          ...mockData.data,
          id: packageId,
        },
      };

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!mockApiResponse.success) {
        throw new Error(
          mockApiResponse.error || "Failed to fetch package data"
        );
      }

      setPackageData(mockApiResponse.data);
    } catch (err) {
      console.error("Error fetching package data:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount and when packageId changes
  useEffect(() => {
    console.log(packageId);
    if (packageId) {
      fetchPackageData();
    } else {
      setError("Package ID not found");
      setLoading(false);
    }
  }, [packageId]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    const favoriteIds = new Set<string>(
      storedFavorites.map((pkg: UmrahPackage) => pkg.id)
    );
    setFavorites(favoriteIds);
  }, []);

  // Update selected room when URL param changes
  useEffect(() => {
    console.log(roomTypeParam);
    setSelectedRoom(roomTypeParam);
  }, [roomTypeParam]);

  // Scroll position tracking with better sensitivity
  useEffect(() => {
    if (!packageData) return;

    const handleScroll = () => {
      const sections = [
        { id: "overview", ref: overviewRef },
        { id: "hotels", ref: hotelsRef },
        { id: "itinerary", ref: itineraryRef },
        { id: "inclusions", ref: inclusionsRef },
        { id: "reviews", ref: reviewsRef },
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (
          section.ref.current &&
          section.ref.current.offsetTop <= scrollPosition
        ) {
          if (activeTab !== section.id) {
            setActiveTab(section.id);
            scrollTabIntoView(section.id);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab, packageData]);

  const scrollTabIntoView = (tabId: string) => {
    if (tabsRef.current) {
      const tabElement = tabsRef.current.querySelector(
        `[data-tab="${tabId}"]`
      ) as HTMLElement;
      if (tabElement) {
        tabElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  const scrollToSection = (section: string) => {
    const refs = {
      overview: overviewRef,
      hotels: hotelsRef,
      itinerary: itineraryRef,
      inclusions: inclusionsRef,
      reviews: reviewsRef,
    };
    refs[section as keyof typeof refs]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      offset: 100,
    });
  };

  const handleProceedToDetails = () => {
    setShowBookingModal(false);
    setShowBookingForm(true);
  };

  const handleBookingSuccess = (newBookingId: string) => {
    setBookingId(newBookingId);
    setShowBookingForm(false);
    setShowBookingSuccess(true);
  };

  const handleBack = () => {
    router.back();
  };

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
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
      // Add to localStorage - we need to create a package object from the current package data
      if (packageData) {
        const storedFavorites = JSON.parse(
          localStorage.getItem("favorites") || "[]"
        );
        const packageToAdd: UmrahPackage = {
          id: packageData.id,
          name: packageData.name,
          score: 0,
          url: packageData.id,
          provider: packageData.operator,
          logo: packageData.operator.split(" ")[0].charAt(0),
          logoColor: "#000000",
          duration: packageData.duration,
          price: packageData.pricing.availableDates[0]?.prices.quad || 50000, // Use first available price
          rating: packageData.rating,
          reviews: packageData.reviews,
          makkahHotel: {
            name: packageData.hotels.makkah.name,
            rating: packageData.hotels.makkah.rating,
            distanceFromHaram: packageData.hotels.makkah.distance,
            distanceInMeters: 0,
          },
          madinahHotel: {
            name: packageData.hotels.madinah.name,
            rating: packageData.hotels.madinah.rating,
            distanceFromHaram: packageData.hotels.madinah.distance,
            distanceInMeters: 0,
          },
          departureDate: packageData.departure,
          returnDate: packageData.departure, // Use departure as return since return is not available
          departureCity: packageData.departure,
          inclusions: packageData.inclusions.map((inc) => inc.text),
          roomType: selectedRoom,
          availability: "Available",
          deals: 0,
          flightDetails: {
            airline: packageData.flightName,
            stops: 0,
            duration: packageData.duration,
          },
          packageType: "standard",
        };
        storedFavorites.push(packageToAdd);
        localStorage.setItem("favorites", JSON.stringify(storedFavorites));
      }
    }
    setFavorites(newFavorites);
  };

  const getSelectedRoomPrice = () => {
    if (!packageData) return 0;

    const valid = packageData.pricing.availableDates.filter(
      (d) => d.available && d.prices[selectedRoom] != null
    );

    if (!valid.length) return 0; // nothing available

    const best = valid.reduce((min, d) =>
      d.prices[selectedRoom] < min.prices[selectedRoom] ? d : min
    );

    //setSelectedDate(best.date); // update the chosen date
    return best.prices[selectedRoom]; // return the lowest price
  };

  const getSelectedRoomLabel = () => {
    if (!packageData) return "double sharing";
    const room = packageData.pricing.roomTypes.find(
      (r) => r.id === selectedRoom
    );
    return room?.label.toLowerCase() || "double sharing";
  };

  const getFilteredImages = () => {
    if (!packageData) return [];
    const allImages = [
      ...packageData.images.makkah,
      ...packageData.images.madinah,
    ];
    if (photoFilter === "all") return allImages;
    if (photoFilter === "makkah") return packageData.images.makkah;
    if (photoFilter === "madinah") return packageData.images.madinah;
    return allImages;
  };

  const nextImage = () => {
    const images = getFilteredImages();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = getFilteredImages();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageClick = () => {
    nextImage();
  };

  const handlePhotoCountClick = () => {
    setShowPhotoGallery(true);
  };

  // Show loading state
  if (loading) {
    return <LoadingState />;
  }

  // Show error state
  if (error) {
    return <ErrorState error={error} onRetry={fetchPackageData} />;
  }

  // Show booking success
  if (showBookingSuccess) {
    return (
      <BookingSuccess
        bookingId={bookingId}
        onBack={() => {
          setShowBookingSuccess(false);
          setShowBookingForm(false);
          setShowBookingModal(false);
        }}
      />
    );
  }

  // Show booking form
  if (showBookingForm && packageData) {
    return (
      <BookingForm
        packageData={packageData}
        selectedRoom={selectedRoom}
        selectedDate={selectedDate}
        onBack={() => {
          setShowBookingForm(false);
          setShowBookingModal(true);
        }}
        onSuccess={handleBookingSuccess}
      />
    );
  }

  // Package data not available
  if (!packageData) {
    return (
      <ErrorState
        error="Package data not available"
        onRetry={fetchPackageData}
      />
    );
  }

  const allImages = [
    ...packageData.images.makkah,
    ...packageData.images.madinah,
  ];
  const photoCategories = [
    { id: "all", label: "All", count: allImages.length },
    {
      id: "makkah",
      label: "Makkah Hotel",
      count: packageData.images.makkah.length,
    },
    {
      id: "madinah",
      label: "Madinah Hotel",
      count: packageData.images.madinah.length,
    },
  ];

  return (
    <div className="min-h-screen bg-white max-w-4xl mx-auto ">
      {/* Header */}

      <div className="sticky top-0 bg-white border-b z-20 p-4">
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

      {/* Image Gallery */}
      <div className="relative">
        <div
          className="aspect-[4/3] overflow-hidden mx-auto 
      lg:aspect-[5/2] xl:aspect-[6/2.5]" // slimmer on desktop"
          onClick={handleImageClick}
        >
          <Image
            src={allImages[currentImageIndex] || "/placeholder.svg"}
            alt="Umrah Package"
            width={600}
            height={400}
            className="w-full h-full object-cover cursor-pointer"
          />
        </div>
        <div className="absolute bottom-4 right-4">
          <Badge
            className="bg-black/70 text-white cursor-pointer"
            onClick={handlePhotoCountClick}
          >
            +{allImages.length - 1} photos
          </Badge>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-16 bg-white border-b z-10">
        <div ref={tabsRef} className="flex overflow-x-auto scrollbar-hide">
          {[
            { id: "overview", label: "Overview" },
            { id: "hotels", label: "Hotels" },
            { id: "itinerary", label: "Itinerary" },
            { id: "inclusions", label: "Inclusions" },
            { id: "reviews", label: "Reviews" },
          ].map((tab) => (
            <Button
              key={tab.id}
              data-tab={tab.id}
              variant="ghost"
              className={`rounded-none border-b-2 px-6 py-3 whitespace-nowrap relative ${
                activeTab === tab.id
                  ? "border-gray-700 text-gray-700"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => scrollToSection(tab.id)}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-700"></div>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6 pb-32 bg-gray-50">
        {/* Overview Section */}
        <div ref={overviewRef} className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold mb-2">{packageData.name}</h1>
            <p className="text-gray-600 mb-3">
              by {packageData.operator.split(" ").slice(0, 2).join(" ")} |{" "}
              {packageData.duration}
            </p>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{packageData.rating}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-sm">{packageData.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="text-sm">{packageData.departure}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-500" />
                <span className="text-sm">Double Sharing</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-gray-500" />
                <span className="text-sm">{packageData.flightName}</span>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">Highlights</h3>
            <div className="space-y-4">
              {packageData.highlights.map((highlight, index) => {
                const IconComponent =
                  iconMap[highlight.icon as keyof typeof iconMap] || Trophy;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{highlight.title}</h4>
                      <p className="text-gray-600 text-sm">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Separator />

        {/* Hotels Section */}
        <div ref={hotelsRef} className="space-y-6">
          <h2 className="text-xl font-semibold">Hotel Details</h2>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden max-w-md mx-auto group border border-gray-100">
            {/* Image Section */}
            <div
              className="relative h-48 overflow-hidden cursor-pointer"
              onClick={() => {
                setPhotoFilter("makkah");
                setCurrentImageIndex(0);
                setShowPhotoGallery(true);
              }}
            >
              <Image
                src={packageData.images.makkah[0]}
                alt={packageData.hotels.makkah.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Custom Icon top-left (Kaaba/Madina) */}

              {/* Distance top-right */}
              <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                {packageData.hotels.makkah.distance} from Haram
              </div>

              {/* Photos label hover */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                <span className="opacity-0 hover:opacity-100 bg-white/90 text-gray-800 text-xs px-3 py-1 rounded-md">
                  View Photos
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                  {packageData.hotels.makkah.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {Array.from({
                      length: packageData.hotels.makkah.rating,
                    }).map((_, star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {packageData.hotels.makkah.rating} stars
                  </span>
                </div>
              </div>
              {/* Action Row */}
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-700 text-green-700 hover:bg-green-50 h-12"
                  onClick={() => {
                    setSelectedHotel("makkah");
                    setShowMapModal(true);
                  }}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  View on map
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden max-w-md mx-auto group border border-gray-100">
            {/* Image Section */}
            <div
              className="relative h-48 overflow-hidden cursor-pointer"
              onClick={() => {
                setPhotoFilter("madinah");
                setCurrentImageIndex(0);
                setShowPhotoGallery(true);
              }}
            >
              <Image
                src={packageData.images.madinah[0]}
                alt={packageData.hotels.madinah.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Distance top-right */}
              <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                {packageData.hotels.makkah.distance} from Masjid Nabwi
              </div>

              {/* Photos label hover */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                <span className="opacity-0 hover:opacity-100 bg-white/90 text-gray-800 text-xs px-3 py-1 rounded-md">
                  View Photos
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex justify-between">
              <div>
                <h3
                  className="text-lg font-bold text-gray-900 mb-2 leading-tight 
               whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]"
                >
                  {packageData.hotels.madinah.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {Array.from({
                      length: packageData.hotels.madinah.rating,
                    }).map((_, star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {packageData.hotels.madinah.rating} stars
                  </span>
                </div>
              </div>
              {/* Action Row */}
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-700 text-green-700 hover:bg-green-50 h-12"
                  onClick={() => {
                    setSelectedHotel("madinah");
                    setShowMapModal(true);
                  }}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  View on map
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Itinerary Section */}
        <div ref={itineraryRef} className="space-y-4">
          <h2 className="text-xl font-semibold">Complete Itinerary</h2>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="pl-1">
              <h3 className="font-semibold text-green-600 mb-3">
                {packageData.duration}
              </h3>
              <div className="space-y-3 text-sm">
                {packageData.itinerary.map((item, index) => (
                  <div key={index}>
                    <strong>
                      {item.day ? `Day ${item.day}:` : `Days ${item.days}:`}
                    </strong>{" "}
                    {item.description}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Inclusions Section */}
        <div ref={inclusionsRef} className="space-y-4">
          <h2 className="text-xl font-semibold">What's Included</h2>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 gap-3">
              {packageData.inclusions.map((inclusion, index) => {
                const IconComponent =
                  iconMap[inclusion.icon as keyof typeof iconMap] ||
                  CheckCircle;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5 text-green-700 flex-shrink-0" />
                    <span className="text-sm">{inclusion.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Separator />

        {/* Reviews Section */}
        <div ref={reviewsRef} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Reviews</h2>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">
                {
                  packageData.reviews[
                    reviewTab as keyof typeof packageData.reviews
                  ].rating
                }
              </span>
              <span className="text-gray-600">
                (
                {
                  packageData.reviews[
                    reviewTab as keyof typeof packageData.reviews
                  ].count
                }
                )
              </span>
            </div>
          </div>

          {/* Review Tabs */}
          <div className="flex border-b bg-white rounded-t-lg">
            {[
              { id: "operator", label: "Tour Operator" },
              { id: "makkah", label: "Makkah Hotel" },
              { id: "madinah", label: "Madinah Hotel" },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                className={`rounded-none border-b-2 px-4 py-2 ${
                  reviewTab === tab.id
                    ? "border-green-700 text-green-700"
                    : "border-transparent"
                }`}
                onClick={() => setReviewTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Review Content */}

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="space-y-4">
              {packageData.reviews[
                reviewTab as keyof typeof packageData.reviews
              ].reviews.map((review, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 pb-4 last:border-b-0"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{review.name}</h4>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {review.formattedDate}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {review.review}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Selection Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1">
            <div className="text-2xl font-bold text-green-700">
              ₹{getSelectedRoomPrice().toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">
              for {getSelectedRoomLabel()}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowBookingModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white text-base px-6 py-3 rounded-lg h-12"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Select Date
            </Button>
          </div>
        </div>
      </div>

      {/* Photo Gallery Modal */}
      {showPhotoGallery && (
        <div className="fixed inset-0 bg-black z-50">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 text-white">
              <div>
                <h3 className="text-lg font-semibold">
                  {packageData.operator}
                </h3>
                <p className="text-sm text-gray-300">
                  {currentImageIndex + 1} of {getFilteredImages().length}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPhotoGallery(false)}
                className="text-white"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Photo Categories */}
            <div className="px-4 pb-4">
              <div className="flex gap-2 overflow-x-auto">
                {photoCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={
                      photoFilter === category.id ? "default" : "outline"
                    }
                    size="sm"
                    className={`whitespace-nowrap ${
                      photoFilter === category.id
                        ? "bg-white text-black"
                        : "bg-transparent border-white text-white hover:bg-white/10"
                    }`}
                    onClick={() => {
                      setPhotoFilter(category.id);
                      setCurrentImageIndex(0);
                    }}
                  >
                    {category.label} ({category.count})
                  </Button>
                ))}
              </div>
            </div>

            {/* Main Image */}
            <div className="flex-1 relative">
              <Image
                src={
                  getFilteredImages()[currentImageIndex] || "/placeholder.svg"
                }
                alt="Gallery Image"
                fill
                className="object-contain"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70"
                onClick={prevImage}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70"
                onClick={nextImage}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Thumbnail Strip */}
            <div className="p-4">
              <div className="flex gap-2 overflow-x-auto">
                {getFilteredImages().map((image, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 ${
                      index === currentImageIndex
                        ? "border-white"
                        : "border-transparent"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Configuration Modal - Fixed Layout */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl flex flex-col max-h-[85vh]">
            {/* Fixed Header */}
            <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
              <h3 className="text-xl font-semibold">Select Date & Room</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBookingModal(false)}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Room Type Selection */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Room Type</h4>
                <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    {packageData.pricing.roomTypes.map((room) => (
                      <SelectItem key={room.id} value={room.id}>
                        {room.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Departure Date</h4>
                <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                  {packageData.pricing.availableDates.map(
                    (dateOption, index) => (
                      <div
                        key={index}
                        className={`p-3 border rounded-lg cursor-pointer ${
                          selectedDate === dateOption.date
                            ? "border-green-700 bg-green-50"
                            : dateOption.available
                            ? "border-gray-200 hover:border-gray-300"
                            : "border-gray-200 bg-gray-50 cursor-not-allowed"
                        }`}
                        onClick={() =>
                          dateOption.available &&
                          setSelectedDate(dateOption.date)
                        }
                      >
                        <div className="font-medium">
                          {new Date(dateOption.date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {(dateOption.prices[
                            selectedRoom as keyof typeof dateOption.prices
                          ] ?? 0) > 0
                            ? `₹${dateOption.prices[
                                selectedRoom as keyof typeof dateOption.prices
                              ].toLocaleString()}`
                            : "Not available"}
                        </div>
                        {!dateOption.available && (
                          <div className="text-xs text-red-500">Sold out</div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="p-4 border-t bg-white flex justify-center">
              <Button
                onClick={handleProceedToDetails}
                className="bg-green-600 hover:bg-green-700 text-white text-base px-6 py-3 rounded-lg h-12"
              >
                Proceed to Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-semibold">
                  {selectedHotel === "makkah"
                    ? `Makkah - ${packageData.hotels.makkah.name}`
                    : `Madinah - ${packageData.hotels.madinah.name}`}
                </h3>
                <p className="text-sm text-gray-600">
                  Use 2 fingers to move map
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMapModal(false)}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Interactive Map */}
            <div className="flex-1 relative">
              <iframe
                src={
                  selectedHotel === "makkah"
                    ? packageData.hotels.makkah.mapUrl
                    : packageData.hotels.madinah.mapUrl
                }
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-b-lg"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t bg-gray-50 rounded-b-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  📍{" "}
                  {selectedHotel === "makkah"
                    ? packageData.hotels.makkah.distance
                    : packageData.hotels.madinah.distance}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMapModal(false)}
                >
                  Close Map
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingForm
          packageData={packageData}
          selectedRoom={selectedRoom}
          selectedDate={selectedDate}
          onSuccess={handleBookingSuccess}
          onClose={() => setShowBookingForm(false)}
        />
      )}

      {/* Booking Success Modal */}
      {showBookingSuccess && (
        <BookingSuccess
          bookingId={bookingId}
          onClose={() => setShowBookingSuccess(false)}
        />
      )}
    </div>
  );
}
