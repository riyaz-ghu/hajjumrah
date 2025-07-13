"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Users,
  User,
  Heart,
  Star,
  FileText,
  Plane,
  Plus,
  Minus,
  ArrowLeft,
  Car,
  TreePalm,
  Bus,
  BedDouble,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import type { City, RoomType, SearchFormData, QuickSearchLink } from "./types";
import { useEffect } from "react"; // Import useEffect
import seoLinks from "@/app/search/links.json"; // adjust path if needed
import Link from "next/link";
import type { UmrahPackage } from "../packages/[city]/types";

const cities: City[] = [
  { name: "Mumbai", code: "BOM", url: "mumbai" },
  { name: "Delhi", code: "DEL", url: "delhi" },
  { name: "Bengaluru", code: "BLR", url: "bengaluru" },
  { name: "Hyderabad", code: "HYD", url: "hyderabad" },
  { name: "Lucknow", code: "LKO", url: "lucknow" },
];

export default function UmrahSearch() {
  const router = useRouter();
  const [searchForm, setSearchForm] = useState<SearchFormData>({
    city: cities[0],
    roomType: "sharing",
    guestCount: 1,
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", "true");
  }, []);

  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isRoomTypeOpen, setIsRoomTypeOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"best" | "cheapest" | "fastest">("best");
  const handleSortChange = (option: "best" | "cheapest" | "fastest") =>
    setSortBy(option);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

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

  const getRoomTypeLabel = (type: RoomType): string => {
    switch (type) {
      case "double":
        return "Double Room";
      case "triple":
        return "Triple Room";
      case "quad":
        return "Quad Room";
      default:
        return "Sharing (5+)";
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams({
      roomType: searchForm.roomType,
    });
    router.push(
      `/packages/umrah-packages-${searchForm.city.url}?${params.toString()}`
    );
  };

  const updateSearchForm = (updates: Partial<SearchFormData>) => {
    setSearchForm((prev) => ({ ...prev, ...updates }));
  };

  const incrementGuests = () => {
    if (searchForm.guestCount < 20) {
      updateSearchForm({ guestCount: searchForm.guestCount + 1 });
    }
  };

  const decrementGuests = () => {
    if (searchForm.guestCount > 1) {
      updateSearchForm({ guestCount: searchForm.guestCount - 1 });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Logo and Heart */}

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

      {/*header options*/}
      <div className="bg-white p-4 max-w-4xl mx-auto">
        <Card className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="flex">
              <button
                onClick={() => handleSortChange("best")}
                className={`flex-1 p-3 text-center rounded-l-2xl transition-colors flex flex-col items-center ${
                  sortBy === "best"
                    ? "bg-gray-700 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Bus
                  className={`mx-auto mb-1 ${
                    sortBy === "best" ? "text-white" : "text-green-600"
                  }`}
                  size={18}
                />
                <span
                  className={`text-xs font-semibold ${
                    sortBy === "best" ? "text-white" : "text-green-600"
                  }`}
                >
                  Group
                </span>
              </button>
              <button
                onClick={() => handleSortChange("cheapest")}
                className={`flex-1 p-3 text-center border-l border-r border-gray-200 transition-colors flex flex-col items-center ${
                  sortBy === "cheapest"
                    ? "bg-gray-700 text-white"
                    : "bg-white text-green-600 hover:bg-gray-50"
                }`}
              >
                <Car
                  className={`mx-auto mb-1 ${
                    sortBy === "cheapest" ? "text-white" : "text-green-600"
                  }`}
                  size={18}
                />
                <span className="text-xs font-semibold">Custom</span>
              </button>
              <button
                onClick={() => handleSortChange("fastest")}
                className={`flex-1 p-3 text-center rounded-r-2xl transition-colors flex flex-col items-center ${
                  sortBy === "fastest"
                    ? "bg-gray-700 text-white"
                    : "bg-white text-green-600 hover:bg-gray-50"
                }`}
              >
                <TreePalm
                  className={`mx-auto mb-1 ${
                    sortBy === "fastest" ? "text-white" : "text-green-600"
                  }`}
                  size={18}
                />
                <span className="text-xs font-semibold">Hajj</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Form */}
      <div className="px-4 pb-6 bg-white max-w-4xl mx-auto">
        <Card className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <CardContent className="p-0">
            {/* Departure City */}
            <Sheet open={isCityOpen} onOpenChange={setIsCityOpen}>
              <SheetTrigger asChild>
                <button className="w-full p-4 text-left border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500">From</div>
                      <div className="font-semibold text-gray-900">
                        {searchForm.city.name} ({searchForm.city.code})
                      </div>
                    </div>
                  </div>
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[70vh] bg-white">
                <SheetHeader>
                  <SheetTitle>Select Departure City</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-2">
                  {cities.map((city) => (
                    <button
                      key={city.code}
                      onClick={() => {
                        updateSearchForm({ city });
                        setIsCityOpen(false);
                      }}
                      className={`w-full p-4 text-left rounded-lg border transition-colors ${
                        searchForm.city.code === city.code
                          ? "border-green-600 bg-green-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="font-semibold text-gray-900">
                        {city.name}
                      </div>
                      <div className="text-sm text-gray-500">{city.code}</div>
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            {/* Room Type */}
            <Sheet open={isRoomTypeOpen} onOpenChange={setIsRoomTypeOpen}>
              <SheetTrigger asChild>
                <button className="w-full p-4 text-left border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <BedDouble className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500">Room Type</div>
                      <div className="font-semibold text-gray-900">
                        {getRoomTypeLabel(searchForm.roomType)}
                      </div>
                    </div>
                  </div>
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[60vh] bg-white">
                <SheetHeader>
                  <SheetTitle>Select Room Type</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {[
                    {
                      type: "sharing" as RoomType,
                      label: "Sharing (5+)",
                      desc: "5 or more persons sharing",
                    },
                    {
                      type: "quad" as RoomType,
                      label: "Quad Room",
                      desc: "4 persons sharing",
                    },
                    {
                      type: "triple" as RoomType,
                      label: "Triple Room",
                      desc: "3 persons sharing",
                    },
                    {
                      type: "double" as RoomType,
                      label: "Double Room",
                      desc: "2 persons sharing",
                    },
                  ].map(({ type, label, desc }) => (
                    <button
                      key={type}
                      onClick={() => {
                        updateSearchForm({ roomType: type });
                        setIsRoomTypeOpen(false);
                      }}
                      className={`w-full p-4 text-left rounded-lg border transition-colors ${
                        searchForm.roomType === type
                          ? "border-green-600 bg-green-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="font-semibold text-gray-900">{label}</div>
                      <div className="text-sm text-gray-500">{desc}</div>
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            {/* Guest Count with +/- buttons */}
            <div className="w-full p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500">Guests</div>
                  <div className="font-semibold text-gray-900">
                    {searchForm.guestCount}{" "}
                    {searchForm.guestCount === 1 ? "Guest" : "Guests"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={decrementGuests}
                    disabled={searchForm.guestCount <= 1}
                    className="w-8 h-8 p-0 rounded-full bg-transparent"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold text-gray-900">
                    {searchForm.guestCount}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={incrementGuests}
                    disabled={searchForm.guestCount >= 20}
                    className="w-8 h-8 p-0 rounded-full"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Button */}
        {sortBy === "best" ? (
          <div className="flex justify-center mt-2">
            <Button
              onClick={handleSearch}
              className="bg-green-600 hover:bg-green-700 text-white text-base px-6 py-3 rounded-lg h-12 mt-4"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Packages
            </Button>
          </div>
        ) : (
          <div className="flex justify-center mt-2">
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white text-base px-6 py-3 rounded-lg h-12 mt-4"
            >
              <a
                href={`https://wa.me/966568022972?text=${encodeURIComponent(
                  `Hi, I want a custom Umrah quote.\nCity: ${
                    searchForm.city.name
                  } (${searchForm.city.code})\nRoom Type: ${getRoomTypeLabel(
                    searchForm.roomType
                  )}\nGuests: ${searchForm.guestCount}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* WhatsApp Icon */}
                <span className="mr-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <g clipPath="url(#clip0_3_4)">
                      <path
                        d="M1.98669 48.1079L5.23643 36.2407C3.23143 32.7678 2.17743 28.8276 2.17857 24.7921C2.18353 12.1654 12.4592 1.89282 25.0847 1.89282C31.2126 1.89549 36.964 4.28044 41.288 8.60898C45.6131 12.9375 47.9934 18.6912 47.9911 24.81C47.9858 37.437 37.7098 47.7108 25.0858 47.7108C25.0847 47.7108 25.0862 47.7108 25.0858 47.7108H25.0755C21.2421 47.7092 17.4751 46.7472 14.1296 44.9238L1.98669 48.1079Z"
                        fill="#64B161"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.1585 14.8678C18.7145 13.8805 18.2468 13.8607 17.8241 13.8435C17.4785 13.8287 17.0829 13.8294 16.6881 13.8294C16.2929 13.8294 15.6505 13.9782 15.1073 14.5714C14.5637 15.1646 13.0317 16.5989 13.0317 19.516C13.0317 22.4335 15.1565 25.2522 15.4529 25.6482C15.7493 26.0438 19.5545 32.2213 25.5805 34.5979C30.5888 36.5731 31.6077 36.1802 32.6949 36.0814C33.7821 35.9826 36.2025 34.6471 36.6965 33.2627C37.1909 31.8784 37.1909 30.692 37.0425 30.4436C36.8941 30.1968 36.4989 30.0484 35.9061 29.752C35.3133 29.4556 32.3985 28.0209 31.8549 27.8233C31.3113 27.6253 30.9161 27.5269 30.5209 28.1205C30.1254 28.7133 28.9901 30.0484 28.6441 30.4436C28.2981 30.84 27.9521 30.8896 27.3593 30.5928C26.7665 30.2956 24.8569 29.67 22.5917 27.6501C20.8293 26.0788 19.6392 24.1379 19.2932 23.5444C18.9476 22.9515 19.2874 22.6586 19.5537 22.3347C20.0332 21.7514 20.8377 20.7028 21.0353 20.3076C21.2329 19.9116 21.1341 19.5656 20.9861 19.2688C20.8377 18.9724 19.6853 16.0404 19.1585 14.8678Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3_4">
                        <rect width="50" height="50" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Get Quotes
              </a>
            </Button>
          </div>
        )}
      </div>

      {/* Gray background starts here */}
      <div className="bg-gray-100 min-h-[200px]">
        {/* Quick Search Links */}
        {SeoLinkList()}
        {/* Bottom Spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}

function SeoLinkList() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 pb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex justify-center">
        Popular Searches
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {seoLinks.map((item, idx) => (
          <Link
            key={idx}
            href={item.slug}
            className="block bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <div className="text-gray-900 font-medium">{item.title}</div>
            <div className="text-gray-600 text-sm mt-1">Explore Now</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
