import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HajjGuide() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Complete Hajj Guide</h1>
        
        <div className="prose prose-neutral dark:prose-invert">
          <h2>Preparation for Hajj</h2>
          <p>Hajj is a once-in-a-lifetime journey that requires extensive preparation, both spiritually and physically.</p>

          <h2>Five Days of Hajj</h2>
          <ol>
            <li>
              <strong>8th Dhul Hijjah - Yawm al-Tarwiyah</strong>
              <p>Enter into Ihram and proceed to Mina.</p>
            </li>
            <li>
              <strong>9th Dhul Hijjah - Yawm al-Arafah</strong>
              <p>The most important day of Hajj, spent in prayer at Arafat.</p>
            </li>
            <li>
              <strong>10th Dhul Hijjah - Yawm al-Nahr</strong>
              <p>Stoning of Jamarat, sacrifice, and return to Makkah for Tawaf.</p>
            </li>
            <li>
              <strong>11th-12th Dhul Hijjah - Ayyam al-Tashreeq</strong>
              <p>Days spent in Mina for stoning of all Jamarats.</p>
            </li>
          </ol>

          <h2>Essential Requirements</h2>
          <ul>
            <li>Hajj visa and permit</li>
            <li>Physical fitness certification</li>
            <li>Mandatory vaccinations</li>
            <li>Proper Ihram clothing</li>
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