// src/app/(website)/blogs/[slug]/page.js
import { notFound } from 'next/navigation';
import { getBlogBySlug, getRelatedArticles, getRecentStories } from '@/lib/queries';
import HeroSection from './_components/HeroSection';
import ArticleContent from './_components/ArticleContent';
import AuthorBio from './_components/AuthorBio';
import ArticleSidebar from './_components/ArticleSidebar';
import RelatedArticles from './_components/RelatedArticles';
import CommentsSection from './_components/CommentsSection';
import TableOfContents from './_components/TableOfContents';
import EngagementBar from './_components/EngagementBar';

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
      {/* JSON-LD Structured Data: Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* JSON-LD Structured Data: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.sanaathrumylens.co.ke' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.sanaathrumylens.co.ke/blogs' },
            { '@type': 'ListItem', position: 3, name: blog.title, item: `https://www.sanaathrumylens.co.ke/blogs/${blog.slug}` },
          ],
        }) }}
      />

      <div className="bg-white min-h-screen">
        {/* Full-width cinematic hero */}
        <HeroSection blog={blog} />

        {/* Main content area with sidebar */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">

            {/* Left column — Article content */}
            <main className="flex-1 min-w-0">
              <article>
                {/* Table of Contents (if article is long) */}
                {blog.content && blog.content.length > 3000 && (
                  <TableOfContents content={blog.content} />
                )}

                {/* Article Content */}
                <ArticleContent blog={blog} />

                {/* Author Bio */}
                <AuthorBio author={blog} />

                {/* Comments Section */}
                <CommentsSection blogId={blog.id} />
              </article>

              {/* Related Articles — full width below article */}
              {relatedArticles && relatedArticles.length > 0 && (
                <RelatedArticles articles={relatedArticles} />
              )}
            </main>

            {/* Right column — Sidebar (desktop only) */}
            <aside className="hidden lg:block w-80 xl:w-96 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <ArticleSidebar
                  recentStories={recentStories}
                  tags={blog.tags || []}
                  categories={blog.categories || []}
                />
              </div>
            </aside>

          </div>
        </div>

        {/* Sticky engagement bar */}
        <EngagementBar
          blogId={blog.id}
          initialLikes={blog.like_count || 0}
          url={`https://sanaathrumylens.co.ke/blogs/${blog.slug}`}
          title={blog.title}
        />

        {/* Bottom padding for sticky bar */}
        <div className="h-16" />
      </div>
    </>
  );
}
