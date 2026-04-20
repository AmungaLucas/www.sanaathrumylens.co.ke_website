import Link from 'next/link';
import GoogleAd from '@/components/ui/GoogleAd';
import NewsletterForm from '@/components/interactive/NewsletterForm';

export const metadata = {
  title: "Become an Author - Sanaa Thru My Lens",
  description: "Join Sanaa Thru My Lens as a contributing author. Share your expertise on Kenyan architecture, design, and creative culture with our growing audience.",
  keywords: "become author, write for us, guest post, contribute, sanaa thru my lens, kenya architecture",
};

export default function BecomeAuthorPage() {
  const benefits = [
    {
      icon: "📰",
      title: "Published Author Profile",
      description: "Get a dedicated author page with your bio, photo, and all your published articles in one place.",
    },
    {
      icon: "🌍",
      title: "Reach a Growing Audience",
      description: "Connect with over 100,000 monthly readers passionate about Kenyan architecture, design, and culture.",
    },
    {
      icon: "🤝",
      title: "Creative Community",
      description: "Join a network of architects, designers, artists, and creatives shaping Kenya's cultural narrative.",
    },
    {
      icon: "📊",
      title: "Analytics & Insights",
      description: "Track the performance of your articles with detailed readership analytics and engagement metrics.",
    },
    {
      icon: "📢",
      title: "Social Media Promotion",
      description: "Your articles are promoted across our social media channels and newsletter to maximise visibility.",
    },
    {
      icon: "🎫",
      title: "Event Access",
      description: "Get priority access and invitations to design events, exhibitions, and industry networking opportunities.",
    },
  ];

  const guidelines = [
    {
      title: "Original Content",
      description: "All submissions must be original, unpublished work. We do not accept content that has been published elsewhere.",
    },
    {
      title: "Kenya-Focused",
      description: "Articles should relate to Kenya's creative ecosystem — architecture, design, art, urbanism, or cultural topics.",
    },
    {
      title: "Quality Writing",
      description: "Well-researched, engaging, and free of grammatical errors. We value depth, insight, and unique perspectives.",
    },
    {
      title: "Word Count",
      description: "Articles should be between 800 and 2,500 words. Longer, in-depth features may be considered for our special series.",
    },
    {
      title: "Images & Media",
      description: "Include high-quality images (minimum 1200px wide) where relevant. You must have the rights to use all submitted media.",
    },
    {
      title: "Accurate Information",
      description: "Fact-check all claims, dates, and statistics. Include sources where applicable. We value journalistic integrity.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Submit Your Application",
      description: "Fill out the application form below with your details, areas of expertise, and a brief writing sample or link to your published work.",
    },
    {
      number: "02",
      title: "Editorial Review",
      description: "Our editorial team will review your application within 5-7 business days. We may reach out for additional information or a trial article.",
    },
    {
      number: "03",
      title: "Start Publishing",
      description: "Once approved, you'll receive access to our author dashboard where you can submit articles, track performance, and manage your profile.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Become an Author
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Share your perspective on Kenya&apos;s architecture, design, and creative culture with a growing audience
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Content */}
          <div className="flex-1">
            {/* Why Write For Us */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Why Write For Sanaa Thru My Lens?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Kenya&apos;s creative scene is one of the most dynamic in Africa, and stories about our
                architecture, design, and culture deserve a world-class platform. By joining our
                team of contributors, you become part of a movement to document, celebrate, and
                amplify the voices shaping our built environment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="text-3xl">{benefit.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What We Look For */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                What We Look For
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We welcome submissions from architects, designers, artists, urban planners,
                historians, students, and anyone with a unique perspective on Kenya&apos;s creative
                landscape. Here are our submission guidelines:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {guidelines.map((guideline, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm">{guideline.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{guideline.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Apply */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                How to Apply
              </h2>
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{step.number}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Form CTA */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center mb-8">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="text-2xl font-bold mb-2">Ready to Share Your Story?</h3>
              <p className="text-blue-100 mb-6 max-w-lg mx-auto">
                We&apos;re always looking for fresh voices and unique perspectives. Apply today and
                start contributing to Kenya&apos;s premier creative platform.
              </p>
              <Link
                href="/contacts"
                className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-semibold"
              >
                Apply Now →
              </Link>
            </div>

            {/* Topics We Cover */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Topics We Cover
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  'Architecture', 'Interior Design', 'Urban Planning', 'Landscape Design',
                  'Art & Culture', 'Sustainable Design', 'Heritage & Conservation',
                  'Contemporary Art', 'Product Design', 'Furniture Design',
                  'Photography', 'Design Thinking', 'Smart Cities', 'Public Spaces',
                  'Traditional Craft', 'Exhibition Reviews', 'Studio Visits',
                ].map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {topic}
                  </span>
                ))}
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
                <GoogleAd slot="author-sidebar" format="rectangle" style={{ minHeight: '250px' }} />
              </div>
            </div>

            {/* Author Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Our Author Community</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Contributing Authors</span>
                  <span className="font-bold text-blue-600">50+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Articles Published</span>
                  <span className="font-bold text-blue-600">500+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Monthly Readers</span>
                  <span className="font-bold text-blue-600">100k+</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Helpful Links</h3>
              <div className="space-y-2">
                <Link href="/about" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition">
                  <span className="font-medium">About Us</span>
                  <p className="text-xs text-gray-500 mt-0.5">Our mission and values</p>
                </Link>
                <Link href="/faq" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition">
                  <span className="font-medium">FAQ</span>
                  <p className="text-xs text-gray-500 mt-0.5">Common questions answered</p>
                </Link>
                <Link href="/authors" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition">
                  <span className="font-medium">Our Authors</span>
                  <p className="text-xs text-gray-500 mt-0.5">Meet our writing team</p>
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
