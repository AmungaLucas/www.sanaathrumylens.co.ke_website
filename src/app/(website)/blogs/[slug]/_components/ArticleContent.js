'use client';

import { useEffect, useRef } from 'react';

export default function ArticleContent({ blog }) {
    const contentRef = useRef(null);

    useEffect(() => {
        // Add anchor links to headings
        if (contentRef.current) {
            const headings = contentRef.current.querySelectorAll('h2, h3');
            headings.forEach((heading) => {
                const id = heading.textContent
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-|-$/g, '');
                heading.id = id;

                const link = document.createElement('a');
                link.href = `#${id}`;
                link.className = 'anchor-link';
                link.innerHTML = '#';
                heading.appendChild(link);
            });
        }
    }, []);

    return (
        <div className="max-w-none" ref={contentRef}>
            {/* Article Body */}
            <div
                className="article-prose"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                        {blog.tags.map(tag => (
                            <a
                                key={tag.id}
                                href={`/tags/${tag.slug}`}
                                className="inline-flex items-center px-4 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                            >
                                #{tag.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Inline article typography styles */}
            <style jsx>{`
                .article-prose {
                    font-size: 1.0625rem;
                    line-height: 1.8;
                    color: #374151;
                    letter-spacing: 0.005em;
                }
                .article-prose p {
                    margin-bottom: 1.5em;
                }
                .article-prose h2 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #111827;
                    margin-top: 2.5em;
                    margin-bottom: 0.75em;
                    line-height: 1.3;
                    letter-spacing: -0.01em;
                }
                .article-prose h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #1f2937;
                    margin-top: 2em;
                    margin-bottom: 0.6em;
                    line-height: 1.35;
                }
                .article-prose h4 {
                    font-size: 1.0625rem;
                    font-weight: 600;
                    color: #1f2937;
                    margin-top: 1.75em;
                    margin-bottom: 0.5em;
                }
                .article-prose a {
                    color: #2563eb;
                    text-decoration: underline;
                    text-underline-offset: 2px;
                    transition: color 0.2s;
                }
                .article-prose a:hover {
                    color: #1d4ed8;
                }
                .article-prose blockquote {
                    border-left: 3px solid #2563eb;
                    margin: 1.75em 0;
                    padding: 0.5em 0 0.5em 1.25em;
                    color: #6b7280;
                    font-style: italic;
                }
                .article-prose ul,
                .article-prose ol {
                    margin: 1.25em 0;
                    padding-left: 1.5em;
                }
                .article-prose ul {
                    list-style-type: disc;
                }
                .article-prose ol {
                    list-style-type: decimal;
                }
                .article-prose li {
                    margin-bottom: 0.5em;
                }
                .article-prose img {
                    border-radius: 0.75rem;
                    margin: 2em 0;
                    width: 100%;
                    height: auto;
                }
                .article-prose figure {
                    margin: 2em 0;
                }
                .article-prose figcaption {
                    font-size: 0.875rem;
                    color: #9ca3af;
                    text-align: center;
                    margin-top: 0.75em;
                }
                .article-prose code {
                    background: #f3f4f6;
                    padding: 0.15em 0.4em;
                    border-radius: 0.25rem;
                    font-size: 0.9em;
                    color: #dc2626;
                }
                .article-prose pre {
                    background: #1f2937;
                    color: #e5e7eb;
                    padding: 1.25em;
                    border-radius: 0.75rem;
                    overflow-x: auto;
                    margin: 1.75em 0;
                    font-size: 0.875rem;
                    line-height: 1.6;
                }
                .article-prose pre code {
                    background: none;
                    color: inherit;
                    padding: 0;
                    font-size: inherit;
                }
                .article-prose hr {
                    border: none;
                    border-top: 1px solid #e5e7eb;
                    margin: 2.5em 0;
                }
                .article-prose table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1.75em 0;
                }
                .article-prose th,
                .article-prose td {
                    border: 1px solid #e5e7eb;
                    padding: 0.625em 0.875em;
                    text-align: left;
                    font-size: 0.9375rem;
                }
                .article-prose th {
                    background: #f9fafb;
                    font-weight: 600;
                    color: #111827;
                }
                .article-prose iframe,
                .article-prose video {
                    border-radius: 0.75rem;
                    margin: 1.75em 0;
                    width: 100%;
                }
                .anchor-link {
                    color: #d1d5db;
                    text-decoration: none;
                    margin-left: 0.5em;
                    font-weight: 400;
                    opacity: 0;
                    transition: opacity 0.2s, color 0.2s;
                }
                .article-prose h2:hover .anchor-link,
                .article-prose h3:hover .anchor-link {
                    opacity: 1;
                }
                .anchor-link:hover {
                    color: #2563eb;
                }
            `}</style>
        </div>
    );
}
