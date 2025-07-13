import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Link href="/">
          <Image
            src="https://nawhsuonnaovrbijiqqv.supabase.co/storage/v1/object/public/gohajjumrah//logo-side.png"
            alt="Gohajjumrah Logo"
            width={220}
            height={60}
          />
        </Link>
      </div>

      {/* Privacy Policy */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-semibold">Privacy Policy</h1>

          <p className="text-sm text-gray-700">
            This Privacy Policy explains how we collect, use, and protect your
            personal information when you use Gohajjumrah.
          </p>

          <h2 className="text-lg font-semibold mt-4">
            1. Information We Collect
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            <li>
              Name and contact information (email, phone) when you inquire or
              sign up
            </li>
            <li>Device and browser information for analytics</li>
            <li>Booking preferences or package interest</li>
            <li>Cookies and usage data to enhance user experience</li>
          </ul>

          <h2 className="text-lg font-semibold mt-4">
            2. How We Use Your Data
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            <li>To provide personalized content and suggestions</li>
            <li>To connect you with relevant travel operators</li>
            <li>To send important service or booking updates</li>
            <li>To improve our services and analyze traffic trends</li>
          </ul>

          <h2 className="text-lg font-semibold mt-4">
            3. Sharing of Information
          </h2>
          <p className="text-sm text-gray-700">
            Your data is never sold. We may share your information with trusted
            third-party travel providers when you express interest in a specific
            package. We ensure these providers meet necessary data protection
            standards.
          </p>

          <h2 className="text-lg font-semibold mt-4">4. Data Security</h2>
          <p className="text-sm text-gray-700">
            We take appropriate security measures to protect your data from
            unauthorized access, alteration, or disclosure.
          </p>

          <h2 className="text-lg font-semibold mt-4">5. Your Rights</h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            <li>
              You can request access to or deletion of your data at any time.
            </li>
            <li>
              You can opt out of email communication by clicking "unsubscribe"
              in our emails.
            </li>
          </ul>

          <h2 className="text-lg font-semibold mt-4">
            6. Changes to This Policy
          </h2>
          <p className="text-sm text-gray-700">
            This Privacy Policy may be updated from time to time. The latest
            version will always be available on this page.
          </p>

          <h2 className="text-lg font-semibold mt-4">7. Contact</h2>
          <p className="text-sm text-gray-700">
            For privacy-related questions or data requests, email us at:{" "}
            <a
              href="mailto:support@gohajjumrah.com"
              className="text-green-700 underline"
            >
              support@gohajjumrah.com
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
