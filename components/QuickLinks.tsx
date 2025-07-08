"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export default function QuickLinks() {
  const handleDownload = (guide: string) => {
    window.open(`/guides/${guide}-guide.pdf`, "_blank");
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardContent className="p-6">
                <FileText className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Umrah Guide</h3>
                <p className="text-muted-foreground mb-4">
                  Complete guide for first-time pilgrims
                </p>
                <Button
                  variant="outline"
                  className="w-full mb-2"
                  onClick={() => handleDownload("umrah")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF Guide
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <FileText className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Hajj Guide</h3>
                <p className="text-muted-foreground mb-4">
                  Essential information for Hajj preparation
                </p>
                <Button
                  variant="outline"
                  className="w-full mb-2"
                  onClick={() => handleDownload("hajj")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF Guide
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}