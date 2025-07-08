"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BedDouble, FileText, Users, CalendarCheck2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const rules = [
  {
    icon: BedDouble,
    title: "Hotel Booking Now Mandatory",
    description: (
      <>
        All Umrah visa applicants must have a <span className="font-semibold text-primary">confirmed hotel booking</span> <span className="font-semibold">before applying for a visa</span>. Bookings must be made <span className="font-semibold text-primary">exclusively through the official Nusuk Masar platform</span> (<a href="https://www.nusuk.sa" target="_blank" rel="noopener noreferrer" className="underline">nusuk.sa</a>). <span className="font-semibold text-destructive">Third-party bookings are NOT accepted</span> for visa approval.
      </>
    ),
    accent: "from-primary/80 to-primary/40",
  },
  {
    icon: FileText,
    title: "Digital-First Process",
    description: (
      <>
        The <span className="font-semibold text-primary">Nusuk platform</span> is now the central digital gateway for all Umrah-related services: hotel bookings, uploading contracts, managing permits, and accessing travel materials. <span className="font-semibold">All documentation must be handled electronically</span> for transparency and fraud prevention.
      </>
    ),
    accent: "from-blue-500/80 to-blue-300/40",
  },
  {
    icon: Users,
    title: "Group Bookings: Save More",
    description: (
      <>
        <span className="font-semibold text-primary">Group bookings</span> are encouraged and can lead to <span className="font-semibold text-primary">significant savings</span> on accommodation and transportation. Book as a group via Nusuk Masar to access better rates and share costs.
      </>
    ),
    accent: "from-green-500/80 to-green-300/40",
  },
  {
    icon: CalendarCheck2,
    title: "Visa Dates & Closures",
    description: (
      <>
        <span className="font-semibold">Umrah visas will not be issued during the Hajj season (Dhul-Hijjah)</span>. The last date for Umrah entry before Hajj 2025 is expected to be late April. Umrah resumes after Hajj, with the new season opening around <span className="font-semibold text-primary">June 11, 2025</span>. Plan your trip to avoid the closure period.
      </>
    ),
    accent: "from-yellow-500/80 to-yellow-300/40",
  },
  {
    icon: ShieldCheck,
    title: "Other Key Points",
    description: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>Women over 45 can travel in groups without a mahram; under 45, a mahram is required.</li>
          <li>Medical fitness certificate required for pilgrims above 60.</li>
          <li>Visa cannot be extended beyond 90 days.</li>
          <li>Only use <span className="font-semibold text-primary">licensed Umrah operators</span>; verify credentials via the Ministry of Hajj and Umrah.</li>
        </ul>
      </>
    ),
    accent: "from-muted/80 to-muted/40",
  },
];

export default function UmrahVisaRules() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-muted/60 to-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-primary tracking-tight drop-shadow-sm">Umrah Visa 2025: Latest Rules & Requirements</h2>
        <div className="flex flex-col gap-8">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="flex flex-row items-center shadow-lg hover:shadow-xl transition-shadow duration-300 group overflow-hidden">
                {/* Accent bar */}
                <div className={`w-2 h-full bg-gradient-to-b ${rule.accent}`} />
                {/* Icon */}
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mx-6">
                  <rule.icon className="h-10 w-10 text-primary" />
                </div>
                {/* Content */}
                <div className="flex-1 py-6 pr-6">
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-xl font-bold">{rule.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 text-base text-muted-foreground">
                    {rule.description}
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <span className="inline-block bg-primary text-white font-semibold rounded-full px-6 py-3 shadow-lg text-lg">Book early via Nusuk Masar and consider group bookings for the best rates and a smooth Umrah experience in 2025!</span>
        </div>
      </div>
    </section>
  );
} 