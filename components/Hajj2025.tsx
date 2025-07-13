"use client";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import WhatsAppButton from "../app/components/WhatsAppButton";

export default function Hajj2025() {
  return (
    <section className="py-20 px-4 bg-primary/5">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              Coming Soon
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Hajj 2025 Packages</h2>
          <p className="text-muted-foreground mb-8">
            Register now for early bird discounts and priority booking for Hajj 2025.
            Packages starting from ₹350,000.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Get WhatsApp Updates</h3>
              <div className="flex gap-2">
                <Input placeholder="Enter your WhatsApp number" type="tel" />
                <WhatsAppButton message="Hi, I would like to receive updates about Hajj 2025 packages">
                  <Bell className="h-4 w-4" />
                  Notify Me
                </WhatsAppButton>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Consultation</h3>
              <WhatsAppButton 
                className="w-full"
                message="Hi, I would like to consult about Hajj 2025 packages"
              >
                Chat with Hajj Expert
              </WhatsAppButton>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}