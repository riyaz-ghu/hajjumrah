import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function TermsPage() {
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

      {/* Terms & Conditions */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-semibold">Terms & Conditions</h1>

          <p className="text-sm text-gray-700">
            These Terms & Conditions govern your use of Gohajjumrah’s services.
            By using our platform, you agree to these terms.
          </p>

          <h2 className="text-lg font-semibold mt-4">1. Service Overview</h2>
          <p className="text-sm text-gray-700">
            Gohajjumrah is an online platform that allows users to discover,
            compare, and connect with verified Umrah package providers. We act
            only as an intermediary and are not responsible for the operations
            of third-party travel operators.
          </p>

          <h2 className="text-lg font-semibold mt-4">
            2. User Responsibilities
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            <li>
              You must be at least 18 years old or have parental consent to use
              our site.
            </li>
            <li>
              Ensure that the information you submit (e.g., for inquiries or
              bookings) is accurate and up to date.
            </li>
            <li>
              You are responsible for reviewing the terms, inclusions, and
              cancellation policies of the packages before making a decision.
            </li>
          </ul>

          <h2 className="text-lg font-semibold mt-4">
            3. Vendor Relationships
          </h2>
          <p className="text-sm text-gray-700">
            While we verify the authenticity of listed vendors, Gohajjumrah does
            not directly operate the packages. Any dispute, refund, or issue
            must be resolved with the respective operator.
          </p>

          <h2 className="text-lg font-semibold mt-4">
            4. Booking and Payments
          </h2>
          <p className="text-sm text-gray-700">
            Some bookings may be redirected to third-party websites or initiated
            via direct contact. Gohajjumrah is not liable for the accuracy of
            payment or booking-related communication conducted off-platform.
          </p>

          <h2 className="text-lg font-semibold mt-4">
            5. Modifications & Availability
          </h2>
          <p className="text-sm text-gray-700">
            We may update these Terms at any time. It is your responsibility to
            review them periodically. Continued use of our site implies
            acceptance of changes.
          </p>

          <h2 className="text-lg font-semibold mt-4">6. Contact</h2>
          <p className="text-sm text-gray-700">
            For questions regarding these Terms, email us at:{" "}
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
