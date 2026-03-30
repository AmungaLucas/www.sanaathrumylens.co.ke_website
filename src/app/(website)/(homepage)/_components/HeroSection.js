'use client';

import { useState, useEffect } from 'react';

const slides = [
    {
        id: 1,
        title: "Exploring Nairobi's Urban Architecture",
        description: "How modern design is transforming Kenya's capital city",
        image: "/hero-1.jpg",
        category: "Architecture",
        link: "/blogs/nairobi-urban-architecture"
    },
    {
        id: 2,
        title: "The Rise of Sustainable Design in Kenya",
        description: "Local materials and innovative approaches shaping the future",
        image: "/hero-2.jpg",
        category: "Design",
        link: "/blogs/sustainable-design-kenya"
    },
    {
        id: 3,
        title: "Meet Kenya's Emerging Creative Voices",
        description: "Interviews with artists reshaping the cultural landscape",
        image: "/hero-3.jpg",
        category: "Culture",
        link: "/blogs/emerging-creative-voices"
    }
];

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-[70vh] min-h-125 bg-gray-900 overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/50" />

                    {/* Content */}
                    <div className="relative h-full flex items-center">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
                            <div className="max-w-2xl">
                                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-full mb-4">
                                    {slide.category}
                                </span>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                                    {slide.title}
                                </h1>
                                <p className="text-lg text-gray-200 mb-6">
                                    {slide.description}
                                </p>
                                <a
                                    href={slide.link}
                                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                                >
                                    Read Article
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Dots Navigation */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentSlide
                            ? 'w-8 bg-white'
                            : 'bg-white/50 hover:bg-white/75'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}