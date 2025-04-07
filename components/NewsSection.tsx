'use client'; // Add this just for debugging

import { NewsCard } from '@/components/cards/NewsCard';

export default function NewsSection() {
    return (
        <section>
            <h1 className="text-2xl font-bold mb-4">📰 Crypto News</h1>
            <NewsCard />
        </section>
    );
}

