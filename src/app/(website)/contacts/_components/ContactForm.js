'use client';

import { useState } from 'react';

const contactInfo = [
    {
        icon: "📧",
        title: "Email",
        details: "hello@sanaathrumylens.co.ke",
        link: "mailto:hello@sanaathrumylens.co.ke",
    },
    {
        icon: "📱",
        title: "Phone",
        details: "+254 700 123 456",
        link: "tel:+254700123456",
    },
    {
        icon: "📍",
        title: "Address",
        details: "Nairobi, Kenya",
        link: null,
    },
    {
        icon: "⏰",
        title: "Hours",
        details: "Monday - Friday: 9am - 5pm",
        link: null,
    },
];

const socialLinks = [
    { name: "Twitter", url: "https://twitter.com/sanaathrumylens", icon: "🐦" },
    { name: "Instagram", url: "https://instagram.com/sanaathrumylens", icon: "📸" },
    { name: "LinkedIn", url: "https://linkedin.com/company/sanaathrumylens", icon: "🔗" },
    { name: "YouTube", url: "https://youtube.com/@sanaathrumylens", icon: "▶️" },
];

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully! We\'ll get back to you soon.' });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus({ type: 'error', message: data.error || 'Something went wrong. Please try again.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Network error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Contact Form */}
            <div className="flex-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Send us a Message
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Subject
                            </label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Message *
                            </label>
                            <textarea
                                name="message"
                                rows="6"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {status && (
                            <div className={`p-3 rounded-lg text-sm ${status.type === 'success'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-red-50 text-red-700'
                                }`}>
                                {status.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-80 space-y-6">
                {/* Contact Info */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Contact Information
                    </h3>
                    <div className="space-y-4">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="flex gap-3">
                                <div className="text-2xl">{info.icon}</div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700">{info.title}</p>
                                    {info.link ? (
                                        <a href={info.link} className="text-sm text-blue-600 hover:text-blue-800">
                                            {info.details}
                                        </a>
                                    ) : (
                                        <p className="text-sm text-gray-600">{info.details}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Connect With Us
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                            >
                                <span>{social.icon}</span>
                                <span className="text-sm text-gray-700">{social.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    );
}