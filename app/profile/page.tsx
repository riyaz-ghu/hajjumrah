"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Users,
  User,
  Heart,
  Star,
  Building,
  Calendar,
  Plane,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { UmrahPackage } from "../packages/[city]/types";

export default function ProfilePage() {
  const router = useRouter();
  const [preferences, setPreferences] = useState({
    city: "Mumbai",
    roomType: "Sharing (5+)",
    guests: 2,
  });

  const [favourites, setFavourites] = useState<UmrahPackage[]>([]);

  useEffect(() => {
    try {
      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      // Ensure storedFavorites is always an array
      const favoritesArray = Array.isArray(storedFavorites)
        ? storedFavorites
        : [];
      setFavourites(favoritesArray);
      console.log(favoritesArray);
    } catch (error) {
      console.error("Error loading favorites:", error);
      setFavourites([]);
    }
  }, []);

  const removeFavorite = (id: string) => {
    const updatedFavorites = favourites.filter((pkg) => pkg.id !== id);
    setFavourites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white pt-8 pb-4 relative">
        <div className="px-4 flex items-center justify-between relative h-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="z-10"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Button>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Image
              src="https://nawhsuonnaovrbijiqqv.supabase.co/storage/v1/object/public/gohajjumrah//logo-side.png"
              alt="GoHajjUmrah Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </div>
          <div className="z-10 w-6" />
        </div>
      </div>

      {/* Assalamo Alaikum */}
      <div className="px-4 text-2xl font-semibold text-gray-900 mt-4">
        Assalamo Alaikum 👋
      </div>

      {/* Preferences */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Your Preferences
        </h2>
        <Card className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-600" />
              <div>
                <div className="text-sm text-gray-500">City</div>
                <div className="font-semibold text-gray-900">
                  {preferences.city}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-600" />
              <div>
                <div className="text-sm text-gray-500">Room Type</div>
                <div className="font-semibold text-gray-900">
                  {preferences.roomType}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-600" />
              <div>
                <div className="text-sm text-gray-500">No. of Guests</div>
                <div className="font-semibold text-gray-900">
                  {preferences.guests}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Favourites */}
      <div className="px-4 mt-6 mb-16">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Favourites</h2>
        {favourites.length === 0 ? (
          <div className="text-center py-8">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No favorite packages yet</p>
            <Button
              onClick={() => router.push("/packages/mumbai")}
              className="mt-4 bg-green-600 hover:bg-green-700"
            >
              Browse Packages
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {favourites.map((pkg) => (
              <Card
                key={pkg.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold text-sm`}
                      >
                        {pkg.logo}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {pkg.name}
                        </h3>
                        <div className="text-xs text-gray-600">
                          by {pkg.provider.split(" ").slice(0, 2).join(" ")} |{" "}
                          {pkg.duration}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFavorite(pkg.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Heart className="w-5 h-5 fill-red-500" />
                    </Button>
                  </div>

                  {/* Hotels */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Building className="w-3 h-3" />
                      <span className="font-medium">Makkah:</span>{" "}
                      {pkg.makkahHotel.name}
                      <div className="flex items-center ml-2">
                        {Array.from({ length: pkg.makkahHotel.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            />
                          )
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span className="font-medium">Madinah:</span>{" "}
                      {pkg.madinahHotel.name}
                      <div className="flex items-center ml-2">
                        {Array.from({ length: pkg.madinahHotel.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-600 mb-3 bg-gray-50 rounded-lg p-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{pkg.departureDate}</span>
                    </div>
                    <Plane className="w-3 h-3 text-gray-400" />
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{pkg.returnDate}</span>
                    </div>
                  </div>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-600">Starting from</div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatPrice(pkg.price)}
                      </div>
                    </div>
                    <Button
                      onClick={() =>
                        router.push(
                          `/package-details/${pkg.url}?roomType=sharing`
                        )
                      }
                      className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
