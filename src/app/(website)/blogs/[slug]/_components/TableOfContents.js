'use client';

import { useEffect, useMemo, useState } from 'react';

export default function TableOfContents({ content }) {
    const [activeId, setActiveId] = useState('');

    // ✅ Derive headings WITHOUT state
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

    // ✅ Effect ONLY for DOM interaction
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
        <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Table of Contents
            </h3>
            <nav className="space-y-2">
                {headings.map((heading) => (
                    <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={`block text-sm transition ${activeId === heading.id
                            ? 'text-blue-600 font-medium'
                            : 'text-gray-600 hover:text-blue-600'
                            }`}
                    >
                        {heading.text}
                    </a>
                ))}
            </nav>
        </div>
    );
}