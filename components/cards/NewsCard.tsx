import { useEffect, useState } from 'react';
import { fetchCryptoNews } from '@/utils/api';
import { Card } from './Card';

export const NewsCard = () => {
    const [news, setNews] = useState<any[]>([]);

    useEffect(() => {
        const getNews = async () => {
            const res = await fetchCryptoNews();
            setNews(res.results.slice(0, 5)); // Top 5
        };
        getNews();
    }, []);

    return (
        <Card>
            <h2 className="text-xl font-semibold mb-2">📰 Crypto News</h2>
            <ul className="space-y-2">
                {news.map((article, i) => (
                    <Card key={i}>
                        <a href={article.link} target="_blank" className="text-blue-600 hover:underline">
                            {article.title}
                        </a>
                        <p>{article.pubDate}</p>
                    </Card>
                ))}
            </ul>
        </Card>
    );
};