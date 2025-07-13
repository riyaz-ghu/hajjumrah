import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    question: "What is Gohajjumrah?",
    answer:
      "Gohajjumrah is a platform that helps users discover, compare, and connect with verified Umrah travel operators. We simplify the process of finding the right Umrah package for your needs.",
  },
  {
    question: "Do you operate the Umrah packages directly?",
    answer:
      "No, we do not operate or manage the packages. We list packages from trusted travel operators and help you connect with them directly.",
  },
  {
    question: "Is it safe to book a package through Gohajjumrah?",
    answer:
      "We only list packages from verified and reviewed travel operators. However, it’s always recommended to review the details and terms of the package directly with the operator.",
  },
  {
    question: "How do I contact a travel operator?",
    answer:
      "Each package page provides direct contact options or inquiry buttons. You’ll be connected directly to the operator offering the package.",
  },
  {
    question: "What if I need help selecting a package?",
    answer:
      "We offer unbiased advice to help you choose a package that fits your preferences and budget. Feel free to contact our support team for help.",
  },
  {
    question: "Are the prices shown final?",
    answer:
      "The prices displayed are provided by the operators and are subject to change. Always confirm the final price and inclusions with the operator before booking.",
  },
  {
    question: "Do you store my personal data?",
    answer:
      "Yes, we store only necessary information to improve your experience. We do not sell your data. Please see our Privacy Policy for full details.",
  },
];

export default function FAQsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <a href="/">
          <Image
            src="https://nawhsuonnaovrbijiqqv.supabase.co/storage/v1/object/public/gohajjumrah//logo-side.png"
            alt="Gohajjumrah Logo"
            width={220}
            height={60}
            className="cursor-pointer"
          />
        </a>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-semibold text-center">
            Frequently Asked Questions
          </h1>

          <div className="space-y-5">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h4 className="text-base font-medium text-gray-900 mb-1">
                  {faq.question}
                </h4>
                <p className="text-sm text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
