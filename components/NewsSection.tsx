import { NewsCard } from './cards/NewsCard';

export default function NewsSection() {
    return (
        <section>
            <h1 className="text-2xl font-bold mb-4">📰 Crypto News</h1>
            <NewsCard />
        </section>
    );
}
