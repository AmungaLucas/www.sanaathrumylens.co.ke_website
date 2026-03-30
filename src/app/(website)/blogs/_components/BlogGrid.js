import ArticleCard from '@/app/(website)/(homepage)/_components/ArticleCard';

export default function BlogGrid({ articles }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {articles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
            ))}
        </div>
    );
}