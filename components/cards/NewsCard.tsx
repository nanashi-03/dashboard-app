'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';
import { getNews } from '@/redux/slices/newsSlice';
import { Card } from './Card';

type Article = {
    link: string;
    title: string;
    pubDate: string;
    // [key: string]: any; // allows other props too
};

export const NewsCard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { articles, loading, error } = useSelector((state: RootState) => state.news);

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    if (loading) return <Card className="dark:bg-gray-900">Loading news...</Card>;
    if (error) return <Card className="dark:bg-gray-900">Error: {error}</Card>;
    if (!articles || articles.length === 0)
        return <Card className="dark:bg-gray-900">No news found</Card>;

    return (
        <Card className="dark:bg-gray-900">
            <div className="mt-2 list-disc space-y-1 pl-4">
                {articles.slice(0, 5).map((article: Article, index: number) => (
                    <a key={index} href={article.link} target="_blank" rel="noopener noreferrer">
                        <Card className="m-4 dark:bg-gray-800">
                            <p className="text-blue-600 hover:underline">{article.title}</p>
                            <p>{article.pubDate}</p>
                        </Card>
                    </a>
                ))}
            </div>
        </Card>
    );
};
