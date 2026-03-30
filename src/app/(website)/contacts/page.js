import GoogleAd from '@/components/ui/GoogleAd';
import Link from 'next/link';
import ContactForm from './_components/ContactForm';

export const metadata = {
  title: "Contact Us - Sanaa Thru My Lens",
  description: "Get in touch with Sanaa Thru My Lens. Send us your thoughts, questions, or collaboration ideas.",
  keywords: "contact sanaa thru my lens, reach out, feedback",
};

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Get in Touch
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Have a question, idea, or collaboration proposal? We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <ContactForm />

        {/* Ad */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-8 max-w-3xl mx-auto">
          <div className="p-3 bg-gray-50 border-b border-gray-100">
            <p className="text-xs text-gray-400 text-center">Sponsored</p>
          </div>
          <div className="p-4">
            <GoogleAd slot="contact-sidebar" format="rectangle" style={{ minHeight: '250px' }} />
          </div>
        </div>

        {/* FAQ Link */}
        <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-6 text-center max-w-3xl mx-auto mt-8">
          <div className="text-3xl mb-2">❓</div>
          <h3 className="font-semibold text-gray-900 mb-2">Frequently Asked Questions</h3>
          <p className="text-sm text-gray-600 mb-4">
            Find quick answers to common questions
          </p>
          <Link href="/faq" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Read FAQ →
          </Link>
        </div>
      </div>
    </div>
  );
}