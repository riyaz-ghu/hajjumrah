"use client";

import { Button } from "@/components/ui/button";
import { Check, Phone, Shield, CheckCircle, ArrowLeft } from "lucide-react";
import WhatsAppButton from "@/app/components/WhatsAppButton";

interface BookingSuccessProps {
  bookingId: string;
  onBack: () => void;
}

export function BookingSuccess({ bookingId, onBack }: BookingSuccessProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b z-20 p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Package
          </Button>
        </div>
      </div>

      <div className="p-4 flex items-center justify-center min-h-[80vh]">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold mb-4 text-green-800">
            Booking Confirmed!
          </h1>

          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600 mb-2">
              Your Temporary Booking ID
            </p>
            <p className="text-xl font-bold text-green-800">{bookingId}</p>
          </div>

          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Phone className="w-3 h-3 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Agent Contact</h3>
                <p className="text-xs text-gray-600">
                  Our travel agent will contact you within 24 hours for payment
                  processing and document collection.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-3 h-3 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Secure Booking</h3>
                <p className="text-xs text-gray-600">
                  Your booking is temporarily reserved. Complete payment to
                  confirm your Umrah package.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-3 h-3 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Next Steps</h3>
                <p className="text-xs text-gray-600">
                  Keep your booking ID safe and ensure all travelers have valid
                  passports ready.
                </p>
              </div>
            </div>
          </div>

          <WhatsAppButton
            className="h-12 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg text-base flex items-center justify-center gap-3 mt-4"
            message={`Hi, I want to get update on my booking. My Booking ID is: ${bookingId}`}
            type="support"
          >
            Check Booking Status
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
}
