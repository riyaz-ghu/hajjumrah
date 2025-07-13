"use client";

import {
  Users,
  Shield,
  Building2,
  Tag,
  ThumbsUp,
  Building,
  Bus,
  Utensils,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import WhatsAppButton from "@/app/components/WhatsAppButton";

const WhatsAppIcon = () => (
  <svg
    width="24"
    height="24"
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
);

export default function LandingPage() {
  const handleGetDetails = (packageType?: string) => {
    const phoneNumber = "+919876543210";
    const message = packageType
      ? `Hi, I'm interested in the ${packageType} package. Can you provide more details?`
      : "Hi, I'm interested in Umrah packages. Can you provide more details?";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleWhatsAppSupport = () => {
    const phoneNumber = "+919876543210";
    const message = "Hi, I need support regarding Umrah packages.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Image
              src="https://nawhsuonnaovrbijiqqv.supabase.co/storage/v1/object/public/gohajjumrah//logo-side.png"
              alt="GoHajjUmrah Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white px-4 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
            Find Trusted Umrah Packages
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed mb-8 lg:mb-12 max-w-3xl mx-auto">
            Compare packages from verified providers in your city
          </p>

          <div className="flex justify-center">
            <WhatsAppButton
              className="bg-green-600 hover:bg-green-700 text-white text-base px-6 py-3 rounded-lg h-12 mt-4"
              message="Hi, I would like to know more about your Hajj & Umrah packages"
            >
              Get Details
            </WhatsAppButton>
          </div>
          {/* Statistics - Improved Mobile Layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-12 lg:gap-2">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center">
                <Users className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
              </div>
              <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                100+
              </div>
              <div className="text-sm lg:text-base text-gray-600">
                Pilgrims Served
              </div>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center">
                <Shield className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
              </div>
              <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                10+
              </div>
              <div className="text-sm lg:text-base text-gray-600">
                Verified Providers
              </div>
            </div>

            <div className="text-center col-span-2 md:col-span-1 md:col-start-auto">
              <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center">
                <Building2
                  className="w-8 h-8 text-gray-700"
                  strokeWidth={1.5}
                />
              </div>
              <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                Various
              </div>
              <div className="text-sm lg:text-base text-gray-600">
                Hotel Options
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="px-4 py-12 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 lg:mb-12">
            Umrah Packages
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Economy Package */}
            <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                    Economy Umrah Package
                  </h2>
                  <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                    Starting ₹75,000+
                  </div>
                  <div className="text-sm lg:text-base text-gray-600">
                    5 providers available
                  </div>
                </div>

                <div className="space-y-3 lg:space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Building className="w-4 h-4 lg:w-5 lg:h-5 text-gray-700 flex-shrink-0" />
                    <span className="text-sm lg:text-base text-gray-700">
                      3-Star Hotels (2km from Haram)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bus className="w-4 h-4 lg:w-5 lg:h-5 text-gray-700 flex-shrink-0" />
                    <span className="text-sm lg:text-base text-gray-700">
                      Bus Transportation
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Utensils className="w-4 h-4 lg:w-5 lg:h-5 text-gray-700 flex-shrink-0" />
                    <span className="text-sm lg:text-base text-gray-700">
                      Basic Meal Plan
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => handleGetDetails("Economy")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl text-base lg:text-lg font-semibold flex items-center justify-center gap-3"
                >
                  <WhatsAppIcon />
                  Get Details
                </Button>
              </CardContent>
            </Card>

            {/* Standard Package */}
            <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                    Standard Umrah Package
                  </h2>
                  <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                    Starting ₹85,000+
                  </div>
                  <div className="text-sm lg:text-base text-gray-600">
                    7 providers available
                  </div>
                </div>

                <div className="space-y-3 lg:space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Building className="w-4 h-4 lg:w-5 lg:h-5 text-gray-700 flex-shrink-0" />
                    <span className="text-sm lg:text-base text-gray-700">
                      4-Star Hotels (1km from Haram)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bus className="w-4 h-4 lg:w-5 lg:h-5 text-gray-700 flex-shrink-0" />
                    <span className="text-sm lg:text-base text-gray-700">
                      Premium Bus Service
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Utensils className="w-4 h-4 lg:w-5 lg:h-5 text-gray-700 flex-shrink-0" />
                    <span className="text-sm lg:text-base text-gray-700">
                      Full Board Meals
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => handleGetDetails("Standard")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl text-base lg:text-lg font-semibold flex items-center justify-center gap-3"
                >
                  <WhatsAppIcon />
                  Get Details
                </Button>
              </CardContent>
            </Card>

            {/* Premium Package */}
            <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                    Premium Umrah Package
                  </h2>
                  <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                    Starting ₹120,000+
                  </div>
                  <div className="text-sm lg:text-base text-gray-600">
                    3 providers available
                  </div>
                </div>

                <div className="space-y-3 lg:space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Building className="w-4 h-4 lg:w-5 lg:h-5 text-gray-700 flex-shrink-0" />
                    <span className="text-sm lg:text-base text-gray-700">
                      5-Star Hotels
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bus className="w-4 h-4 lg:w-5 lg:h-5 text-gray-700 flex-shrink-0" />
                    <span className="text-sm lg:text-base text-gray-700">
                      VIP Transportation
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Utensils className="w-4 h-4 lg:w-5 lg:h-5 text-gray-700 flex-shrink-0" />
                    <span className="text-sm lg:text-base text-gray-700">
                      Luxury Dining
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => handleGetDetails("Premium")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl text-base lg:text-lg font-semibold flex items-center justify-center gap-3"
                >
                  <WhatsAppIcon />
                  Get Details
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-4 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 lg:mb-12">
            Why GohajjUmrah?
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {/* 1st Card */}
            <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Timer className="w-6 h-6 text-green-600" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Save Time</h4>
                  <p className="text-gray-600 text-sm">
                    Compare packages from multiple vendors quickly at one place
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 2nd Card */}
            <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Tag className="w-6 h-6 text-green-600" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Best Pricing</h4>
                  <p className="text-gray-600 text-sm">
                    We negotiate on your behalf to get you the best rate on
                    packages
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 3rd Card */}
            <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ThumbsUp
                    className="w-6 h-6 text-green-600"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Honest Advice</h4>
                  <p className="text-gray-600 text-sm">
                    We help you select the best package according to your needs
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12 lg:py-16">
          {/* Logo */}
          <div className="flex justify-center mb-8 lg:mb-12">
            <Image
              src="https://nawhsuonnaovrbijiqqv.supabase.co/storage/v1/object/public/gohajjumrah//logo-side.png"
              alt="GoHajjUmrah Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Resources */}
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">
                Resources
              </h3>
              <div className="space-y-3 lg:space-y-4">
                <div>
                  <a
                    href="/faqs"
                    className="text-base lg:text-lg text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    FAQs
                  </a>
                </div>
                <div>
                  <a
                    href="/terms-conditions"
                    className="text-base lg:text-lg text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Terms & Conditions
                  </a>
                </div>
                <div>
                  <a
                    href="/privacy-policy"
                    className="text-base lg:text-lg text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Privacy
                  </a>
                </div>
              </div>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">
                Support
              </h3>
              <Button
                onClick={handleWhatsAppSupport}
                className="w-full lg:w-auto bg-green-600 hover:bg-green-700 text-white py-3 lg:py-4 px-6 lg:px-8 rounded-xl text-base lg:text-lg font-semibold flex items-center justify-center gap-3"
              >
                <WhatsAppIcon />
                WhatsApp Support
              </Button>
            </div>
          </div>
          {/* Copyright and Contact */}
          <div className="text-center text-gray-500 space-y-4">
            <div className="text-sm">
              © Gohajjumrah.com 2024, All rights reserved.
            </div>
            <div className="text-xs leading-relaxed max-w-2xl mx-auto">
              Garage Coworks, Sun Mill Compound, 210, Senapati Bapat Marg, Lower
              Parel, Mumbai, Maharashtra 400013
            </div>
            <div className="text-sm">
              <a
                href="mailto:support@gohajjumrah.com"
                className="text-green-600 transition-colors mb-10"
              >
                support@gohajjumrah.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
