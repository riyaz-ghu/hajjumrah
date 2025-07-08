import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UmrahGuide() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Complete Umrah Guide</h1>
        
        <div className="prose prose-neutral dark:prose-invert">
          <h2>Before You Begin</h2>
          <p>Umrah is a sacred journey that requires proper preparation and understanding. This guide will help you understand the essential steps and requirements.</p>

          <h2>Steps of Umrah</h2>
          <ol>
            <li>
              <strong>Ihram</strong>
              <p>The state of purity and dedication before beginning the pilgrimage.</p>
            </li>
            <li>
              <strong>Tawaf</strong>
              <p>Circumambulating the Kaaba seven times in a counterclockwise direction.</p>
            </li>
            <li>
              <strong>Sa'i</strong>
              <p>Walking between the hills of Safa and Marwa seven times.</p>
            </li>
            <li>
              <strong>Halq/Taqsir</strong>
              <p>Cutting or trimming of the hair to mark the completion of Umrah.</p>
            </li>
          </ol>

          <h2>Essential Requirements</h2>
          <ul>
            <li>Valid passport with at least 6 months validity</li>
            <li>Umrah visa</li>
            <li>Vaccination requirements</li>
            <li>Appropriate clothing for Ihram</li>
          </ul>
        </div>

        <div className="mt-12 text-center">
          <Link href="/">
            <Button>Return to Homepage</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}