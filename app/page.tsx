'use client';

import { Provider, useSelector } from 'react-redux';
import { RootState, store } from '@/redux/store';
import NewsSection from '@/components/NewsSection';
import CryptoSection from '@/components/CryptoSection';
import WeatherSection from '@/components/WeatherSection';
import { FavoritesManager } from '@/components/FavouriteManager';

export default function DashboardPage() {
  return (
    <Provider store={store}>
      <main className="p-4 md:p-8 space-y-6">
        <FavoritesManager />

        {/* Weather Section */}
        <WeatherSection />

        {/* Crypto Section */}
        <CryptoSection />

        {/* News Section */}
        <NewsSection />
      </main>
    </Provider>
  );
}
