"use client";

import WhatsAppButton from "./WhatsAppButton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Hotel, Bus, Utensils } from "lucide-react";
import { motion } from "framer-motion";

const packages = [
  {
    title: "Economy Package",
    price: "₹75,000+",
    providers: 5,
    inclusions: [
      { icon: Hotel, text: "3-Star Hotels (2km from Haram)" },
      { icon: Bus, text: "Bus Transportation" },
      { icon: Utensils, text: "Basic Meal Plan" },
    ],
  },
  {
    title: "Standard Package",
    price: "₹85,000+",
    providers: 7,
    inclusions: [
      { icon: Hotel, text: "4-Star Hotels (1km from Haram)" },
      { icon: Bus, text: "Premium Bus Service" },
      { icon: Utensils, text: "Full Board Meals" },
    ],
  },
  {
    title: "Premium Package",
    price: "₹120,000+",
    providers: 3,
    inclusions: [
      { icon: Hotel, text: "5-Star Hotels" },
      { icon: Bus, text: "VIP Transportation" },
      { icon: Utensils, text: "Luxury Dining" },
    ],
  },
];

export default function PackageCategories() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Umrah Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex"
            >
              <Card className="flex flex-col w-full">
                <CardHeader className="flex-none">
                  <CardTitle>{pkg.title}</CardTitle>
                  <p className="text-2xl font-bold text-primary">
                    Starting {pkg.price}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {pkg.providers} providers available
                  </p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4">
                    {pkg.inclusions.map((inclusion, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <inclusion.icon className="h-5 w-5 shrink-0 text-primary" />
                        <span>{inclusion.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex-none pt-4">
                  <WhatsAppButton 
                    className="w-full"
                    message={`Hi, I'm interested in the ${pkg.title} starting at ${pkg.price}`}
                  >
                    Get Details
                  </WhatsAppButton>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}