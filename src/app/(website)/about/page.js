/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import GoogleAd from '@/components/ui/GoogleAd';

// Import required components
import NewsletterForm from '@/components/interactive/NewsletterForm';

export const metadata = {
  title: "About Us - Sanaa Thru My Lens",
  description: "Learn about Sanaa Thru My Lens - our mission to showcase Kenya's creative ecosystem, architecture, design, and artistic culture.",
  keywords: "about sanaa thru my lens, kenya creative platform, mission, team",
};

export default function AboutPage() {
  const team = [
    {
      name: "James Amunga",
      role: "Founder & Editor-in-Chief",
      bio: "Architect and urban designer passionate about documenting Kenya's evolving creative landscape.",
      avatar: "/team/james.jpg",
      social: {
        twitter: "@jamesamunga",
        linkedin: "/in/jamesamunga",
      },
    },
    // Add more team members as needed
  ];

  const values = [
    {
      icon: "🎨",
      title: "Creativity First",
      description: "Celebrating the unique creative voices shaping Kenya's cultural identity.",
    },
    {
      icon: "🏛️",
      title: "Architectural Excellence",
      description: "Showcasing outstanding design and architectural innovation.",
    },
    {
      icon: "🌍",
      title: "Community Driven",
      description: "Building a platform where creatives can share, learn, and grow together.",
    },
    {
      icon: "📚",
      title: "Knowledge Sharing",
      description: "Making insights and expertise accessible to everyone.",
    },
  ];

  const stats = [
    { number: "500+", label: "Articles Published" },
    { number: "50+", label: "Contributing Authors" },
    { number: "100k+", label: "Monthly Readers" },
    { number: "25+", label: "Categories" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            About Sanaa Thru My Lens
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Documenting Kenya&apos;s creative ecosystem through stories, insights, and perspectives
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Content */}
          <div className="flex-1">
            {/* Mission Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Sanaa Thru My Lens was born from a simple observation: Kenya&apos;s creative ecosystem
                is vibrant, diverse, and world-class, yet often overlooked. Our mission is to
                change that by documenting, celebrating, and amplifying the voices of architects,
                designers, artists, and creatives shaping our nation&apos;s cultural identity.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Through in-depth articles, interviews, and visual storytelling, we aim to create
                a comprehensive archive of Kenya&apos;s creative journey—from traditional craftsmanship
                to cutting-edge contemporary design.
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Values Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Our Values
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="text-3xl">{value.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{value.title}</h3>
                      <p className="text-gray-600 text-sm">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Meet the Team
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {team.map((member, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-blue-600 mb-2">{member.role}</p>
                      <p className="text-sm text-gray-600">{member.bio}</p>
                      <div className="flex gap-3 mt-3">
                        {member.social.twitter && (
                          <a href={`https://twitter.com/${member.social.twitter}`} className="text-gray-400 hover:text-blue-500">
                            Twitter
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a href={`https://linkedin.com${member.social.linkedin}`} className="text-gray-400 hover:text-blue-700">
                            LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
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
                <GoogleAd slot="about-sidebar" format="rectangle" style={{ minHeight: '250px' }} />
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
              <div className="text-3xl mb-3">✍️</div>
              <h3 className="text-lg font-semibold mb-2">Become a Contributor</h3>
              <p className="text-sm text-blue-100 mb-4">
                Share your expertise with our community
              </p>
              <Link
                href="/become-author"
                className="inline-block px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition text-sm font-medium"
              >
                Apply Now →
              </Link>
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

