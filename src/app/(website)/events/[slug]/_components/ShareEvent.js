'use client';

export default function ShareEvent({ url, title }) {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    url,
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            await navigator.clipboard.writeText(url);
            alert('Link copied to clipboard!');
        }
    };

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
        email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    };

    return (
        <div className="flex items-center gap-3 py-6 border-t border-b border-gray-200 my-6">
            <span className="text-sm font-medium text-gray-700">Share this event:</span>

            {/* Native Share */}
            {typeof navigator !== 'undefined' && navigator.share && (
                <button
                    onClick={handleShare}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                    aria-label="Share"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                </button>
            )}

            {/* Twitter */}
            <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 rounded-full hover:bg-blue-50 hover:text-blue-500 transition"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            </a>

            {/* Facebook */}
            <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 rounded-full hover:bg-blue-50 hover:text-blue-700 transition"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
                </svg>
            </a>

            {/* LinkedIn */}
            <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 rounded-full hover:bg-blue-50 hover:text-blue-700 transition"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
                </svg>
            </a>

            {/* WhatsApp */}
            <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 rounded-full hover:bg-green-50 hover:text-green-600 transition"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm5.12-8.868l1.249-2.089c.312-.523.479-.695.731-.695.252 0 .554.122.921.366.365.244.919.987 1.481 1.799.493.715.948 1.452 1.331 1.452.326 0 .586-.164.878-.465.485-.5.981-1.141 1.287-1.733.146-.283.029-.667-.229-.989-.257-.322-.566-.706-.87-1.074-.303-.368-.365-.58-.185-.904.18-.324.81-1.472 1.093-1.986.287-.52.576-.455.814-.455.225 0 .449 0 .669.01.392.016.794.159 1.043.514.288.41.942 1.133 1.163 1.529.221.396.235.769.022 1.199-.213.43-1.04 1.809-1.425 2.26-.385.451-.789.91-1.363.91-.573 0-1.011-.201-1.558-.524-.869-.514-1.828-1.207-2.687-2.002-.859-.795-1.691-1.684-2.131-2.561-.44-.877-.265-1.478.121-1.965.387-.487.828-.981 1.089-1.488.261-.507.231-.917-.028-1.294-.259-.377-.974-2.051-1.188-2.563-.213-.512-.491-.483-.738-.483-.247 0-.537.012-.827.012-.553 0-1.082.315-1.374.881-.49.949-.82 2.111-.472 3.293.348 1.182 1.224 2.436 2.24 3.634.976 1.148 2.474 2.193 4.041 2.848 1.567.655 3.045.857 4.395.492.901-.245 1.755-.836 2.192-1.608.436-.772.553-1.702.363-2.414-.105-.392-.326-.689-.611-.932-.285-.243-.634-.368-.977-.368-.343 0-.686.125-.972.363-.286.239-.529.592-.686.992-.157.4-.228.877-.157 1.342.071.465.284.918.605 1.293.321.375.671.65.992.938.321.288.464.542.357.795-.107.253-.464.648-1.111 1.036-.647.388-1.497.677-2.327.779-.83.102-1.766-.023-2.774-.382-1.008-.359-1.985-.964-2.946-1.677-.961-.713-1.88-1.575-2.649-2.576-.769-1.001-1.32-2.086-1.429-3.042-.109-.956.17-1.773.586-2.442.416-.669.956-1.206 1.182-1.75.226-.544.069-1.001-.341-1.523-.41-.522-1.048-1.165-1.582-1.715-.534-.55-.964-.762-1.319-.762-.354 0-.709.083-1.063.416-.354.333-.892.938-1.121 1.425-.229.487-.343 1.014-.343 1.541 0 .527.114 1.055.343 1.582.229.527.572 1.066 1.029 1.611.457.545 1.051 1.083 1.771 1.608.72.525 1.566 1.026 2.527 1.496.961.47 2.032.877 3.193 1.172 1.161.295 2.342.468 3.523.445 1.181-.023 2.333-.213 3.305-.713.972-.5 1.777-1.247 2.192-2.104.415-.857.44-1.751.285-2.451-.155-.7-.492-1.252-.907-1.724-.415-.472-.908-.847-1.37-1.144-.462-.297-.893-.504-1.248-.577-.355-.073-.629-.073-.876-.073-.247 0-.476.012-.686.012-.21 0-.402.012-.574.012z" />
                </svg>
            </a>

            {/* Email */}
            <a
                href={shareLinks.email}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                aria-label="Share via Email"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </a>
        </div>
    );
}