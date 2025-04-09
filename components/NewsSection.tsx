'use client'; // Add this just for debugging

import { NewsCard } from '@/components/cards/NewsCard';

export default function NewsSection() {
    return (
        <section>
            <h1 className="mb-4 text-2xl font-bold">📰 Crypto News</h1>
            <NewsCard />
        </section>
    );
}
