import Link from 'next/link';
import GoogleAd from '@/components/ui/GoogleAd';
import NewsletterForm from '@/components/interactive/NewsletterForm';

export const metadata = {
  title: "Terms of Service - Sanaa Thru My Lens",
  description: "Read the terms of service for Sanaa Thru My Lens. Understand the rules and guidelines for using our creative blog platform.",
  keywords: "terms of service, terms and conditions, sanaa thru my lens, usage policy",
};

export default function TermsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            The rules and guidelines for using our platform
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
                Welcome to Sanaa Thru My Lens. These Terms of Service (&quot;Terms&quot;) apply to your
                use of our website sanaathrumylens.co.ke and all associated services. By accessing
                or using our website, you agree to be bound by these Terms. If you do not agree
                to these Terms, please do not use our website.
              </p>
            </div>

            {/* Acceptance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing, browsing, or using the Sanaa Thru My Lens website, you acknowledge
                that you have read, understood, and agree to be bound by these Terms of Service,
                as well as our{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link href="/cookie-policy" className="text-blue-600 hover:text-blue-800 font-medium">
                  Cookie Policy
                </Link>.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will be effective
                immediately upon posting on the website. Your continued use of the website
                following any changes constitutes your acceptance of the new Terms.
              </p>
            </div>

            {/* User Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. User Content
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our website may allow you to post, submit, or share content, including but not
                limited to comments, feedback, and article submissions. By submitting content,
                you agree to the following:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li className="leading-relaxed">
                  You are solely responsible for the content you submit.
                </li>
                <li className="leading-relaxed">
                  Your content must not be false, defamatory, misleading, harassing, obscene,
                  or otherwise objectionable.
                </li>
                <li className="leading-relaxed">
                  Your content must not infringe upon the intellectual property rights of any
                  third party.
                </li>
                <li className="leading-relaxed">
                  You grant Sanaa Thru My Lens a non-exclusive, royalty-free, worldwide licence
                  to use, reproduce, modify, and display your content in connection with the
                  website and our services.
                </li>
                <li className="leading-relaxed">
                  We reserve the right to remove or edit any content at our discretion without
                  prior notice.
                </li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Intellectual Property
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content on the Sanaa Thru My Lens website, including but not limited to text,
                articles, images, photographs, graphics, logos, icons, audio clips, video clips,
                data compilations, and software, is the property of Sanaa Thru My Lens or its
                content creators and is protected by applicable intellectual property laws.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not reproduce, distribute, modify, create derivative works of, publicly
                display, publicly perform, republish, download, store, or transmit any of the
                material on our website without prior written consent, except as follows:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li className="leading-relaxed">
                  Your computer may temporarily store copies of such materials in RAM incidental
                  to your accessing and viewing those materials.
                </li>
                <li className="leading-relaxed">
                  You may store files that are automatically cached by your web browser for
                  display enhancement purposes.
                </li>
                <li className="leading-relaxed">
                  You may share links to pages on our website through social media or other
                  platforms.
                </li>
              </ul>
            </div>

            {/* Limitation of Liability */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To the fullest extent permitted by applicable law, Sanaa Thru My Lens, its
                directors, employees, partners, agents, suppliers, and affiliates shall not be
                liable for any indirect, incidental, special, consequential, or punitive damages,
                including without limitation:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li className="leading-relaxed">Loss of profits, data, use, goodwill, or other intangible losses</li>
                <li className="leading-relaxed">Damages resulting from your access to or use of (or inability to access or use) the website</li>
                <li className="leading-relaxed">Damages resulting from any conduct or content of any third party on the website</li>
                <li className="leading-relaxed">Damages resulting from unauthorised access, use, or alteration of your transmissions or content</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                This limitation of liability applies whether the alleged liability is based on
                contract, tort, negligence, strict liability, or any other basis, even if we
                have been advised of the possibility of such damage.
              </p>
            </div>

            {/* Governing Law */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Governing Law
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms shall be governed and construed in accordance with the laws of the
                Republic of Kenya, without regard to its conflict of law provisions.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Any disputes arising out of or relating to these Terms or the use of the website
                shall be resolved in the courts of Nairobi, Kenya. You agree to submit to the
                personal jurisdiction of such courts and waive any objection to venue therein.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Changes to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to update or modify these Terms of Service at any time
                without prior notice. Changes will become effective immediately upon being posted
                on this page. The &quot;Last updated&quot; date at the top of these Terms indicates when
                they were last revised.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We encourage you to review these Terms periodically for any changes. Your
                continued use of the website after any modifications to the Terms constitutes
                your acknowledgement of the modifications and your consent to abide by the
                updated Terms.
              </p>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Questions?</strong> If you have any questions about these Terms, please{' '}
                  <Link href="/contacts" className="text-blue-600 hover:text-blue-800 font-medium">
                    contact us
                  </Link>{' '}
                  or visit our{' '}
                  <Link href="/faq" className="text-blue-600 hover:text-blue-800 font-medium">
                    FAQ page
                  </Link>.
                </p>
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
                <GoogleAd slot="terms-sidebar" format="rectangle" style={{ minHeight: '250px' }} />
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Related Pages</h3>
              <div className="space-y-2">
                <Link href="/privacy" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition">
                  <span className="font-medium">Privacy Policy</span>
                  <p className="text-xs text-gray-500 mt-0.5">How we handle your data</p>
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
