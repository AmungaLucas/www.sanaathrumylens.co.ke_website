/* eslint-disable @next/next/no-img-element */
export default function AuthorBio({ author }) {
    if (!author.author_bio) return null;

    return (
        <div className="bg-gray-50 rounded-xl p-6 mt-8 border border-gray-200">
            <div className="flex items-start gap-4">
                <img
                    src={author.author_avatar || '/default-avatar.png'}
                    alt={author.author_name}
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                            Written by {author.author_name}
                        </h3>
                        {author.author_verified && (
                            <span className="text-blue-500 text-xs bg-blue-50 px-2 py-0.5 rounded">
                                Verified
                            </span>
                        )}
                    </div>
                    {author.author_title && (
                        <p className="text-sm text-gray-600 mb-2">{author.author_title}</p>
                    )}
                    <p className="text-gray-700 text-sm mb-3">{author.author_bio}</p>
                    <div className="flex gap-3">
                        <a
                            href={`/authors/${author.author_slug}`}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                            View all articles →
                        </a>
                        {author.twitter_handle && (
                            <a
                                href={`https://twitter.com/${author.twitter_handle}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-gray-500 hover:text-blue-500"
                            >
                                Twitter
                            </a>
                        )}
                        {author.linkedin_url && (
                            <a
                                href={author.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-gray-500 hover:text-blue-700"
                            >
                                LinkedIn
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}