import Link from 'next/link';
import GoogleAd from '@/components/ui/GoogleAd';
import NewsletterForm from '@/components/interactive/NewsletterForm';

export const metadata = {
  title: "Cookie Policy - Sanaa Thru My Lens",
  description: "Learn about how Sanaa Thru My Lens uses cookies and tracking technologies to improve your browsing experience.",
  keywords: "cookie policy, cookies, tracking, browser settings, sanaa thru my lens",
};

export default function CookiePolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Cookie Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            How we use cookies and tracking technologies on our website
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
                This Cookie Policy explains how Sanaa Thru My Lens (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses
                cookies and similar technologies when you visit our website sanaathrumylens.co.ke.
                This policy should be read alongside our{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
                  Privacy Policy
                </Link>.
              </p>
            </div>

            {/* What Are Cookies */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                What Are Cookies?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies are small text files that are stored on your computer or mobile device
                when you visit a website. They are widely used to make websites work more
                efficiently, provide a better browsing experience, and supply information to
                the website owners.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Cookies can be &quot;persistent&quot; (remaining on your device until they expire or you
                delete them) or &quot;session&quot; (deleted automatically when you close your browser).
                They may also be set by the website you are visiting (&quot;first-party cookies&quot;) or
                by third-party services operating on that website (&quot;third-party cookies&quot;).
              </p>
            </div>

            {/* How We Use Cookies */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                How We Use Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies for several important reasons:
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Essential Functionality</h3>
                    <p className="text-gray-700 leading-relaxed">
                      To remember your login session, preferences, and settings so you have a
                      consistent and personalised experience across visits.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Analytics</h3>
                    <p className="text-gray-700 leading-relaxed">
                      To understand how visitors interact with our website, what pages are most
                      popular, and how we can improve the user experience.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Personalisation</h3>
                    <p className="text-gray-700 leading-relaxed">
                      To remember your preferences, such as your preferred categories and
                      reading history, to recommend relevant content.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Advertising</h3>
                    <p className="text-gray-700 leading-relaxed">
                      To display relevant advertisements and measure the effectiveness of our
                      advertising campaigns.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Types of Cookies */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Types of Cookies We Use
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 pr-4 font-semibold text-gray-900">Cookie Type</th>
                      <th className="text-left py-3 pr-4 font-semibold text-gray-900">Purpose</th>
                      <th className="text-left py-3 font-semibold text-gray-900">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-medium">Essential</td>
                      <td className="py-3 pr-4">Authentication, security, and site functionality</td>
                      <td className="py-3">Session</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-medium">Preferences</td>
                      <td className="py-3 pr-4">Remember your settings and preferences</td>
                      <td className="py-3">1 year</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-medium">Analytics</td>
                      <td className="py-3 pr-4">Traffic analysis and website improvement</td>
                      <td className="py-3">2 years</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-medium">Marketing</td>
                      <td className="py-3 pr-4">Targeted advertising and campaign tracking</td>
                      <td className="py-3">1 year</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium">Social Media</td>
                      <td className="py-3 pr-4">Social sharing and embedded content</td>
                      <td className="py-3">Session</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Managing Cookies */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Managing Your Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to decide whether to accept or reject cookies. You can manage
                your cookie preferences in the following ways:
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-1">Cookie Settings Panel</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Click the cookie settings button at the bottom of any page to adjust your
                    cookie preferences at any time. You can enable or disable different cookie
                    categories according to your preferences.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-1">Browser Settings</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Most web browsers allow you to control cookies through their settings. You
                    can set your browser to refuse cookies, delete existing cookies, or alert
                    you when a cookie is being set.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-1">Opt-Out Links</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    For third-party advertising cookies, you can opt out through the Digital
                    Advertising Alliance or the Network Advertising Initiative opt-out pages.
                  </p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>Please note:</strong> Disabling certain cookies may affect the functionality
                  of our website and limit your ability to use some features, such as personalised
                  content, saved preferences, and social sharing.
                </p>
              </div>
            </div>

            {/* Third-Party Cookies */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Third-Party Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                In addition to our own cookies, we may use cookies from third-party services that
                operate on our website. These include:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li className="leading-relaxed">
                  <strong>Google Analytics:</strong> Used to analyse website traffic and user behaviour.
                </li>
                <li className="leading-relaxed">
                  <strong>Google AdSense:</strong> Used to serve personalised advertisements.
                </li>
                <li className="leading-relaxed">
                  <strong>Social Media Platforms:</strong> Used for social sharing buttons and
                  embedded content (e.g., Twitter, Facebook, Instagram).
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We do not control these third-party cookies and recommend that you review the
                privacy policies of these services for more information about their cookie practices.
              </p>
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
                <GoogleAd slot="cookie-sidebar" format="rectangle" style={{ minHeight: '250px' }} />
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
                <Link href="/terms" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition">
                  <span className="font-medium">Terms of Service</span>
                  <p className="text-xs text-gray-500 mt-0.5">Read our terms and conditions</p>
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
