'use client';

import { useState } from 'react';
import Link from 'next/link';
import GoogleAd from '@/components/ui/GoogleAd';

const faqCategories = [
  {
    title: 'General',
    icon: 'ℹ️',
    questions: [
      {
        q: 'What is Sanaa Thru My Lens?',
        a: 'Sanaa Thru My Lens is a Kenyan creative blog dedicated to documenting and celebrating the country\'s creative ecosystem. We cover architecture, design, urbanism, art, culture, and the creative industries that shape Kenya\'s identity. "Sanaa" means "art" in Swahili, reflecting our focus on the artistic side of Kenya\'s built and cultural environment.',
      },
      {
        q: 'Who is behind Sanaa Thru My Lens?',
        a: 'Sanaa Thru My Lens was founded by James Amunga, an architect and urban designer passionate about documenting Kenya\'s evolving creative landscape. We have a growing team of contributing writers, photographers, and editors who share our vision of showcasing Kenyan creativity to the world.',
      },
      {
        q: 'How often do you publish new content?',
        a: 'We publish new articles regularly throughout the week. You can expect fresh content covering architecture, design reviews, event coverage, artist profiles, and opinion pieces. Subscribe to our newsletter to never miss a new publication.',
      },
      {
        q: 'Is the content free to read?',
        a: 'Yes! All our articles are free to read. We believe in making knowledge and insights about Kenya\'s creative ecosystem accessible to everyone. We sustain our platform through advertising and partnerships.',
      },
    ],
  },
  {
    title: 'Submissions & Content',
    icon: '✍️',
    questions: [
      {
        q: 'Can I write for Sanaa Thru My Lens?',
        a: 'Absolutely! We welcome contributions from architects, designers, artists, urban planners, and anyone passionate about Kenya\'s creative landscape. Visit our Become an Author page to learn about our submission guidelines and how to apply. We offer both one-time guest contributions and ongoing author partnerships.',
      },
      {
        q: 'What kind of articles do you publish?',
        a: 'We publish a wide range of content including architecture reviews, design features, artist profiles, event coverage, opinion pieces, how-to guides, and cultural essays. We\'re particularly interested in stories that highlight Kenyan innovation, sustainability, and the intersection of traditional and contemporary design.',
      },
      {
        q: 'Can I submit photos or visual content?',
        a: 'Yes, we love visual storytelling! High-quality photography and visual content that showcases Kenyan architecture, design, and art are welcome. Please ensure you have the rights to share any images you submit. Contact us with your portfolio for consideration.',
      },
      {
        q: 'Do you pay contributing authors?',
        a: 'We offer competitive compensation for published articles based on the length, depth, and quality of the content. Regular contributing authors may also receive additional benefits such as author profiles, social media promotion, and networking opportunities within the creative community.',
      },
    ],
  },
  {
    title: 'Events',
    icon: '📅',
    questions: [
      {
        q: 'Do you organise events?',
        a: 'Yes! We organise and promote events related to architecture, design, and creative culture in Kenya. This includes design talks, studio tours, exhibitions, workshops, and networking events. Check our Events page regularly for upcoming happenings.',
      },
      {
        q: 'How can I attend your events?',
        a: 'Most of our events have RSVP functionality on our website. Simply visit the event page and click the RSVP button to reserve your spot. Some events may be free while others may require a ticket. Event details including location, time, and any costs are listed on each event page.',
      },
      {
        q: 'Can my organisation partner with Sanaa Thru My Lens for an event?',
        a: 'We are always open to collaborations with organisations that align with our mission. Whether it\'s a conference, exhibition, workshop, or design talk, we\'d love to hear from you. Please reach out through our Contact page with details about your proposed partnership.',
      },
    ],
  },
  {
    title: 'Subscriptions & Account',
    icon: '👤',
    questions: [
      {
        q: 'How do I create an account?',
        a: 'Click the "Sign In" button in the top navigation bar and choose your preferred sign-in method. You can create an account using your email address or through social media authentication. Having an account allows you to comment on articles, bookmark content, and manage your preferences.',
      },
      {
        q: 'How do I subscribe to the newsletter?',
        a: 'You can subscribe to our newsletter through the subscription form found in our sidebar, at the bottom of articles, or on various pages throughout the site. Simply enter your email address and you\'ll start receiving our latest articles and updates.',
      },
      {
        q: 'How do I manage my bookmarks?',
        a: 'If you\'re logged in, you can bookmark any article by clicking the bookmark icon. To view all your saved articles, visit your Profile page and click on the Bookmarks section. From there, you can manage and organise your saved content.',
      },
      {
        q: 'How can I update my profile information?',
        a: 'Once logged in, visit your Profile page to update your name, bio, avatar, and other personal information. Keeping your profile updated helps other readers and potential collaborators learn more about you.',
      },
    ],
  },
  {
    title: 'Technical & Support',
    icon: '🔧',
    questions: [
      {
        q: 'The website is not loading properly. What should I do?',
        a: 'Try clearing your browser cache and cookies, then refresh the page. If the issue persists, try accessing the site from a different browser or device. If you\'re still experiencing problems, please contact us through our Contact page with details about the issue, including your browser type and any error messages you see.',
      },
      {
        q: 'How do I report a bug or suggest a feature?',
        a: 'We appreciate your feedback! You can report bugs or suggest features through our Contact page. Please include as much detail as possible, such as screenshots and steps to reproduce the issue. Our team reviews all submissions and prioritises improvements accordingly.',
      },
      {
        q: 'Can I advertise on Sanaa Thru My Lens?',
        a: 'Yes, we offer advertising opportunities for brands and businesses that align with our creative audience. We have various ad placements including sidebar banners, in-article ads, and sponsored content options. Contact us through our Contact page for our media kit and rates.',
      },
    ],
  },
];

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left hover:bg-gray-50 px-4 rounded-lg transition"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-900">{question}</span>
        <span
          className={`text-gray-500 flex-shrink-0 transition-transform duration-200 text-xl ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600 leading-relaxed px-4">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (categoryIdx, questionIdx) => {
    const key = `${categoryIdx}-${questionIdx}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const [activeCategory, setActiveCategory] = useState('General');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Find answers to common questions about Sanaa Thru My Lens
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Content */}
          <div className="flex-1">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {faqCategories.map((category) => (
                <button
                  key={category.title}
                  onClick={() => setActiveCategory(category.title)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    activeCategory === category.title
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {category.icon} {category.title}
                </button>
              ))}
            </div>

            {/* FAQ Sections */}
            {faqCategories
              .filter((category) => activeCategory === 'General' || activeCategory === category.title)
              .map((category, catIdx) => (
                <div
                  key={category.title}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 overflow-hidden"
                >
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h2 className="text-lg font-bold text-gray-900">{category.title}</h2>
                    <span className="text-sm text-gray-500 ml-auto">
                      {category.questions.length} questions
                    </span>
                  </div>
                  <div className="px-2">
                    {category.questions.map((item, qIdx) => (
                      <FAQItem
                        key={qIdx}
                        question={item.q}
                        answer={item.a}
                        isOpen={!!openItems[`${catIdx}-${qIdx}`]}
                        onToggle={() => toggleItem(catIdx, qIdx)}
                      />
                    ))}
                  </div>
                </div>
              ))}

            {/* Still Have Questions */}
            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Still Have Questions?
              </h3>
              <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                Can&apos;t find what you&apos;re looking for? We&apos;re here to help. Reach out
                to us and we&apos;ll get back to you as soon as possible.
              </p>
              <Link
                href="/contacts"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Contact Us
              </Link>
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
                <GoogleAd slot="faq-sidebar" format="rectangle" style={{ minHeight: '250px' }} />
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Helpful Links</h3>
              <div className="space-y-2">
                <Link href="/about" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition">
                  <span className="font-medium">About Us</span>
                  <p className="text-xs text-gray-500 mt-0.5">Learn more about our mission</p>
                </Link>
                <Link href="/become-author" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition">
                  <span className="font-medium">Become an Author</span>
                  <p className="text-xs text-gray-500 mt-0.5">Start writing for us</p>
                </Link>
                <Link href="/contacts" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition">
                  <span className="font-medium">Contact Us</span>
                  <p className="text-xs text-gray-500 mt-0.5">Get in touch directly</p>
                </Link>
              </div>
            </div>

            {/* Become an Author CTA */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
              <div className="text-3xl mb-3">✍️</div>
              <h3 className="text-lg font-semibold mb-2">Share Your Story</h3>
              <p className="text-sm text-blue-100 mb-4">
                Have a unique perspective on Kenyan design and architecture?
              </p>
              <Link
                href="/become-author"
                className="inline-block px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition text-sm font-medium"
              >
                Become an Author →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
