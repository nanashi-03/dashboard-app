'use client';

import NewsSection from '@/components/NewsSection';
import CryptoSection from '@/components/CryptoSection';
import WeatherSection from '@/components/WeatherSection';
import { FavoritesManager } from '@/components/FavouriteManager';

export default function Home() {
  return (
    <main className="p-4 md:p-8 space-y-6">
      <FavoritesManager />

      {/* Weather Section */}
      <WeatherSection />

      {/* Crypto Section */}
      <CryptoSection />

      {/* News Section */}
      <NewsSection />
    </main>
  );
}
