"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Tag, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

const aboutPoints = [
  {
    icon: Users,
    text: "We help you compare packages from multiple vendors quickly at one place",
  },
  {
    icon: Tag,
    text: "Provide you with the best rates on packages",
  },
  {
    icon: ThumbsUp,
    text: "Honest advice on selecting a package as per your needs",
  },
];

export default function AboutGohajjumrah() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">About Gohajjumrah</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <Card className="h-full flex flex-col items-center text-center">
                <CardContent className="flex flex-col items-center p-8">
                  <point.icon className="h-10 w-10 text-primary mb-4" />
                  <span className="text-lg font-medium text-muted-foreground">
                    {point.text}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 