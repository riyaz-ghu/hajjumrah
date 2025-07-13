"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  User,
  Phone,
  Users,
  Loader2,
  CircleCheck,
} from "lucide-react";
import type { PackageData, BookingFormData } from "../types";

interface BookingFormProps {
  packageData: PackageData;
  selectedRoom: string;
  selectedDate: string;
  onBack: () => void;
  onSuccess: (bookingId: string) => void;
}

export function BookingForm({
  packageData,
  selectedRoom,
  selectedDate,
  onBack,
  onSuccess,
}: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    phone: "",
    guests: "2",
    hasPassport: false,
  });
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<BookingFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.guests || Number.parseInt(formData.guests) < 1) {
      newErrors.guests = "Number of guests is required";
    }

    if (!formData.hasPassport) {
      newErrors.hasPassport =
        "Please confirm all travelers have valid passports";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate booking ID
    const bookingId = `UMR${Date.now().toString().slice(-6)}`;

    setIsSubmitting(false);
    onSuccess(bookingId);
  };

  const getSelectedRoomPrice = () => {
    const dateOption = packageData.pricing.availableDates.find(
      (d) => d.date === selectedDate
    );
    return (
      dateOption?.prices[selectedRoom as keyof typeof dateOption.prices] || 0
    );
  };

  const getSelectedRoomLabel = () => {
    const room = packageData.pricing.roomTypes.find(
      (r) => r.id === selectedRoom
    );
    return room?.label || "Double Sharing";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b z-20 p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
          </Button>
          <h2 className="font-semibold">Booking Information</h2>
          <div></div>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        {/* Package Summary */}
        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-green-800 mb-2">Package Summary</h3>
          <div className="space-y-1 text-sm">
            <p>
              <span className="text-gray-600">Package:</span>{" "}
              {packageData.operator}
            </p>
            <p>
              <span className="text-gray-600">Duration:</span>{" "}
              {packageData.duration}
            </p>
            <p>
              <span className="text-gray-600">Room Type:</span>{" "}
              {getSelectedRoomLabel()}
            </p>
            <p>
              <span className="text-gray-600">Departure:</span>{" "}
              {new Date(selectedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="font-semibold text-green-800">
              <span className="text-gray-600">Total Price:</span> ₹
              {getSelectedRoomPrice().toLocaleString()}
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <User className="w-4 h-4 inline mr-2" />
              Full Name *
            </label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter your full name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number *
            </label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Enter your phone number"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="guests"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <Users className="w-4 h-4 inline mr-2" />
              Number of Guests *
            </label>
            <Select
              value={formData.guests}
              onValueChange={(value) =>
                setFormData({ ...formData, guests: value })
              }
            >
              <SelectTrigger className={errors.guests ? "border-red-500" : ""}>
                <SelectValue placeholder="Select number of guests" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.guests && (
              <p className="text-red-500 text-xs mt-1">{errors.guests}</p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="passport"
                checked={formData.hasPassport}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, hasPassport: checked as boolean })
                }
                className={errors.hasPassport ? "border-red-500" : ""}
              />
              <label
                htmlFor="passport"
                className="text-sm text-gray-700 leading-5"
              >
                I confirm that all travelers have valid passports with at least
                6 months validity remaining *
              </label>
            </div>
            {errors.hasPassport && (
              <p className="text-red-500 text-xs">{errors.hasPassport}</p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Important Notes:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• This is a temporary booking reservation</li>
              <li>• Our agent will contact you for payment processing</li>
              <li>• Final confirmation after payment completion</li>
              <li>• Visa processing assistance included</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white text-base px-6 py-3 rounded-lg h-12 mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CircleCheck className="w-4 h-4 mr-2" />
                  Confirm Booking
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
