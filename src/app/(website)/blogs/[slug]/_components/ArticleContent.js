'use client';

import { useEffect, useRef } from 'react';
import GoogleAd from '@/components/ui/GoogleAd';

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

    // Split content to insert ads
    const paragraphs = blog.content.split('</p>');
    const adPosition = Math.floor(paragraphs.length / 3);

    return (
        <div className="prose prose-lg max-w-none" ref={contentRef}>
            {/* First part of content */}
            <div dangerouslySetInnerHTML={{ __html: paragraphs.slice(0, adPosition).join('</p>') }} />

            {/* In-Content Ad 1 */}
            <div className="my-8">
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                    <p className="text-xs text-gray-400 mb-2">Advertisement</p>
                    <GoogleAd slot="blog-in-content-1" format="auto" style={{ minHeight: '90px' }} />
                </div>
            </div>

            {/* Middle part of content */}
            <div dangerouslySetInnerHTML={{ __html: paragraphs.slice(adPosition, adPosition * 2).join('</p>') }} />

            {/* In-Content Ad 2 */}
            <div className="my-8">
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                    <p className="text-xs text-gray-400 mb-2">Advertisement</p>
                    <GoogleAd slot="blog-in-content-2" format="auto" style={{ minHeight: '90px' }} />
                </div>
            </div>

            {/* Rest of content */}
            <div dangerouslySetInnerHTML={{ __html: paragraphs.slice(adPosition * 2).join('</p>') }} />

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {blog.tags.map(tag => (
                            <a
                                key={tag.id}
                                href={`/tags/${tag.slug}`}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200"
                            >
                                #{tag.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}