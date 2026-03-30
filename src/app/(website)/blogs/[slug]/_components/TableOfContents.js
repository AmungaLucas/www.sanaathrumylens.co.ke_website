'use client';

import { useEffect, useMemo, useState } from 'react';

export default function TableOfContents({ content }) {
    const [activeId, setActiveId] = useState('');

    const headings = useMemo(() => {
        const headingRegex = /<h2[^>]*>(.*?)<\/h2>/g;
        const matches = [];
        let match;

        while ((match = headingRegex.exec(content)) !== null) {
            const text = match[1].replace(/<[^>]*>/g, '');
            const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');

            matches.push({ id, text });
        }

        return matches;
    }, [content]);

    useEffect(() => {
        if (!headings.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -80% 0px' }
        );

        const elements = headings
            .map(({ id }) => document.getElementById(id))
            .filter(Boolean);

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <div className="my-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                In this article
            </h3>
            <nav className="space-y-1">
                {headings.map((heading, index) => (
                    <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={`flex items-center gap-3 py-1.5 text-sm transition-all duration-200 rounded-lg ${
                            activeId === heading.id
                                ? 'text-blue-600 font-medium pl-2'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 pl-2'
                        }`}
                    >
                        <span className={`flex-shrink-0 w-5 h-5 flex items-center justify-center text-xs rounded-md ${
                            activeId === heading.id
                                ? 'bg-blue-100 text-blue-600 font-bold'
                                : 'bg-gray-100 text-gray-400'
                        }`}>
                            {index + 1}
                        </span>
                        {heading.text}
                    </a>
                ))}
            </nav>
        </div>
    );
}
