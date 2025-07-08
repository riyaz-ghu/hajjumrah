import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQs() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

        <Accordion type="single" collapsible className="mb-12">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is the best time to perform Umrah?</AccordionTrigger>
            <AccordionContent>
              Umrah can be performed at any time throughout the year. However, some prefer to avoid the peak Hajj season and Ramadan when Makkah is most crowded.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>How long does an Umrah trip typically last?</AccordionTrigger>
            <AccordionContent>
              A typical Umrah package ranges from 7 to 14 days, depending on your preference and the cities you wish to visit.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>What's included in the package price?</AccordionTrigger>
            <AccordionContent>
              Our packages typically include flights, hotel accommodation, visa processing, ground transportation, and guided assistance. Specific inclusions vary by package type.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>How far in advance should I book?</AccordionTrigger>
            <AccordionContent>
              We recommend booking at least 3-4 months in advance to secure the best rates and preferred accommodation, especially during peak seasons.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="text-center">
          <Link href="/">
            <Button>Return to Homepage</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}