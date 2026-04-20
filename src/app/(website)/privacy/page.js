import Link from 'next/link';
import GoogleAd from '@/components/ui/GoogleAd';
import NewsletterForm from '@/components/interactive/NewsletterForm';

export const metadata = {
  title: "Privacy Policy - Sanaa Thru My Lens",
  description: "Read our privacy policy to understand how Sanaa Thru My Lens collects, uses, and protects your personal information.",
  keywords: "privacy policy, data protection, sanaa thru my lens, personal information",
};

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            How we collect, use, and protect your personal information
          </p>
          <p className="text-sm text-blue-200 mt-4">
            Last updated: January 2025
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Content */}
          <div className="flex-1">
            {/* Introduction */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <p className="text-gray-700 text-lg leading-relaxed">
                At Sanaa Thru My Lens, we are committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your information when you visit
                our website sanaathrumylens.co.ke. Please read this policy carefully. By accessing or
                using our website, you acknowledge that you have read, understood, and agree to be
                bound by the terms of this Privacy Policy.
              </p>
            </div>

            {/* Information Collection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Information We Collect
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may collect information about you in a variety of ways. The information we may
                collect includes:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Personal Data</h3>
                  <p className="text-gray-700 leading-relaxed">
                    When you create an account, subscribe to our newsletter, or contact us, we may
                    collect personally identifiable information such as your name, email address,
                    and any other information you choose to provide.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Usage Data</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We automatically collect certain information when you visit our website, including
                    your IP address, browser type, operating system, referring URLs, pages viewed,
                    links clicked, and the date and time of your visit.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Comments and Interactions</h3>
                  <p className="text-gray-700 leading-relaxed">
                    When you leave comments, like articles, or bookmark content, we collect this
                    interaction data to personalise your experience and improve our platform.
                  </p>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect about you for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li className="leading-relaxed">To provide, operate, and maintain our website and services</li>
                <li className="leading-relaxed">To improve, personalise, and expand our website and content</li>
                <li className="leading-relaxed">To understand and analyse how you use our website</li>
                <li className="leading-relaxed">To develop new products, services, features, and functionality</li>
                <li className="leading-relaxed">To send you newsletters, marketing communications, and promotional information (with your consent)</li>
                <li className="leading-relaxed">To respond to your comments, questions, and requests</li>
                <li className="leading-relaxed">To monitor and analyse usage and trends to improve your experience</li>
                <li className="leading-relaxed">To detect, prevent, and address technical issues and security threats</li>
              </ul>
            </div>

            {/* Cookies */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track activity on our website
                and hold certain information. Cookies are files with a small amount of data which
                may include an anonymous unique identifier. For more details, please visit our{' '}
                <Link href="/cookie-policy" className="text-blue-600 hover:text-blue-800 font-medium">
                  Cookie Policy
                </Link>.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is
                being sent. However, if you do not accept cookies, some portions of our website
                may not function properly.
              </p>
            </div>

            {/* Third-Party Services */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Third-Party Services
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may employ third-party companies and individuals to facilitate our website,
                provide services on our behalf, perform website-related services, or assist us
                in analysing how our website is used. These third parties have access to your
                personal information only to perform these tasks on our behalf and are obligated
                not to disclose or use it for any other purpose.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Third-party services we use include analytics tools, advertising networks, email
                service providers, and content delivery networks. Each of these third parties has
                their own privacy policies addressing how they use such information.
              </p>
            </div>

            {/* Data Security */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Data Security
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We take the security of your data seriously and implement appropriate technical
                and organisational measures to protect your personal information against
                unauthorised access, alteration, disclosure, or destruction. However, no method
                of transmission over the Internet or method of electronic storage is 100% secure.
                While we strive to use commercially acceptable means to protect your personal
                information, we cannot guarantee its absolute security.
              </p>
            </div>

            {/* Your Rights */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your Rights
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Under the Kenya Data Protection Act, 2019, you have the following rights
                regarding your personal data:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li className="leading-relaxed">
                  <strong>Right to Access:</strong> You can request a copy of the personal data we hold about you.
                </li>
                <li className="leading-relaxed">
                  <strong>Right to Rectification:</strong> You can request correction of any inaccurate or incomplete data.
                </li>
                <li className="leading-relaxed">
                  <strong>Right to Erasure:</strong> You can request deletion of your personal data, subject to legal obligations.
                </li>
                <li className="leading-relaxed">
                  <strong>Right to Restrict Processing:</strong> You can request that we limit how we use your data.
                </li>
                <li className="leading-relaxed">
                  <strong>Right to Data Portability:</strong> You can request your data in a structured, commonly used format.
                </li>
                <li className="leading-relaxed">
                  <strong>Right to Object:</strong> You can object to our processing of your personal data.
                </li>
                <li className="leading-relaxed">
                  <strong>Right to Withdraw Consent:</strong> Where processing is based on consent, you can withdraw it at any time.
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, or if you wish to exercise
                any of your data rights, please contact us:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:privacy@sanaathrumylens.co.ke" className="text-blue-600 hover:text-blue-800">
                    privacy@sanaathrumylens.co.ke
                  </a>
                </li>
                <li>
                  <strong>Address:</strong> Nairobi, Kenya
                </li>
              </ul>
              <div className="mt-6">
                <Link
                  href="/contacts"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-6">
            {/* Ad */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-3 bg-gray-50 border-b border-gray-100">
                <p className="text-xs text-gray-400 text-center">Sponsored</p>
              </div>
              <div className="p-4">
                <GoogleAd slot="privacy-sidebar" format="rectangle" style={{ minHeight: '250px' }} />
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Related Pages</h3>
              <div className="space-y-2">
                <Link href="/terms" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition">
                  <span className="font-medium">Terms of Service</span>
                  <p className="text-xs text-gray-500 mt-0.5">Read our terms and conditions</p>
                </Link>
                <Link href="/cookie-policy" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition">
                  <span className="font-medium">Cookie Policy</span>
                  <p className="text-xs text-gray-500 mt-0.5">Learn about our cookie usage</p>
                </Link>
                <Link href="/faq" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition">
                  <span className="font-medium">FAQ</span>
                  <p className="text-xs text-gray-500 mt-0.5">Find quick answers</p>
                </Link>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Subscribe to Newsletter</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get the latest stories delivered to your inbox
              </p>
              <NewsletterForm />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
