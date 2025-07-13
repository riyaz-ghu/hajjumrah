"use client";

import WhatsAppButton from "../app/components/WhatsAppButton";
import { Users, Shield, Building } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-primary/10 to-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Find Trusted Umrah Packages
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Compare packages from verified providers in your city
        </p>
        <WhatsAppButton 
          className="w-full md:w-auto px-8 mx-auto"
          message="Hi, I would like to know more about your Hajj & Umrah packages"
        >
          Get Details
        </WhatsAppButton>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center"
          >
            <Users className="h-8 w-8 mb-2 text-primary" />
            <p className="font-semibold">100+ Pilgrims Served</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center"
          >
            <Shield className="h-8 w-8 mb-2 text-primary" />
            <p className="font-semibold">10+ Verified Providers</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center col-span-2 md:col-span-1"
          >
            <Building className="h-8 w-8 mb-2 text-primary" />
            <p className="font-semibold">Various Hotel Options</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}