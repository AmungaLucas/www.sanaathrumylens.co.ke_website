// src/app/(website)/blogs/[slug]/page.js
import { notFound } from 'next/navigation';
import { getBlogBySlug, getRelatedArticles, getRecentStories } from '@/lib/queries';
import ArticleHeader from './_components/ArticleHeader';
import ArticleContent from './_components/ArticleContent';
import ArticleSidebar from './_components/ArticleSidebar';
import AuthorBio from './_components/AuthorBio';
import RelatedArticles from './_components/RelatedArticles';
import CommentsSection from './_components/CommentsSection';
import TableOfContents from './_components/TableOfContents';
import ShareButtons from './_components/ShareButtons';
import GoogleAd from '@/components/ui/GoogleAd';

// Generate SEO metadata dynamically
export async function generateMetadata({ params }) {
  // In Next.js 15+, params is a Promise - must await it
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: blog.meta_title || blog.title,
    description: blog.meta_description || blog.excerpt,
    keywords: blog.tags?.map(t => t.name).join(', '),
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `https://sanaathrumylens.co.ke/blogs/${blog.slug}`,
      type: 'article',
      authors: [blog.author_name],
      publishedTime: blog.published_at,
      modifiedTime: blog.updated_at,
      images: blog.featured_image ? [{
        url: blog.featured_image,
        width: 1200,
        height: 630,
        alt: blog.title,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: blog.featured_image ? [blog.featured_image] : [],
    },
    alternates: {
      canonical: `https://sanaathrumylens.co.ke/blogs/${blog.slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }) {
  // In Next.js 15+, params is a Promise - must await it
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Safely get category IDs (handle if categories is undefined)
  const categoryIds = blog.categories?.map(c => c.id) || [];

  // Get related articles and recent stories in parallel
  const [relatedArticles, recentStories] = await Promise.all([
    getRelatedArticles(blog.id, categoryIds, 3),
    getRecentStories(4)
  ]);

  // Structured Data for SEO (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.featured_image,
    datePublished: blog.published_at,
    dateModified: blog.updated_at,
    author: {
      '@type': 'Person',
      name: blog.author_name,
      url: `https://sanaathrumylens.co.ke/authors/${blog.author_slug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sanaa Thru My Lens',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sanaathrumylens.co.ke/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://sanaathrumylens.co.ke/blogs/${blog.slug}`,
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Main Content */}
            <article className="flex-1 min-w-0">
              {/* Article Header */}
              <ArticleHeader blog={blog} />

              {/* Table of Contents (if article is long) */}
              {blog.content && blog.content.length > 3000 && (
                <TableOfContents content={blog.content} />
              )}

              {/* Article Content with In-Content Ads */}
              <ArticleContent blog={blog} />

              {/* Share Buttons */}
              <ShareButtons
                url={`https://sanaathrumylens.co.ke/blogs/${blog.slug}`}
                title={blog.title}
              />

              {/* Author Bio */}
              <AuthorBio author={blog} />

              {/* Ad Position: Between Author Bio and Comments */}
              <div className="my-8">
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                  <p className="text-xs text-gray-400 mb-2">Advertisement</p>
                  <GoogleAd slot="blog-between-content" format="auto" style={{ minHeight: '90px' }} />
                </div>
              </div>

              {/* Comments Section */}
              <CommentsSection blogId={blog.id} />
            </article>

            {/* Sidebar */}
            <ArticleSidebar
              recentStories={recentStories}
              tags={blog.tags || []}
              categories={blog.categories || []}
            />
          </div>

          {/* Related Articles */}
          {relatedArticles && relatedArticles.length > 0 && (
            <RelatedArticles articles={relatedArticles} />
          )}
        </div>
      </div>
    </>
  );
}