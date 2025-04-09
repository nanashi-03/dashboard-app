import { useSelector } from 'react-redux';
import { CryptoCard } from './cards/CryptoCard';
import { RootState } from '@/redux/store';

export default function CryptoSection() {
    const favoriteCoin = useSelector((state: RootState) => state.userPref.favoriteCrypto);
    const favoriteCoins = favoriteCoin
        ? ['bitcoin', 'ethereum', favoriteCoin]
        : ['bitcoin', 'ethereum'];
    return (
        <section>
            <h1 className="mb-4 text-2xl font-bold">💰 Cryptocurrencies</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteCoins.map((coin) => (
                    <CryptoCard key={coin} cryptoId={coin} />
                ))}
            </div>
        </section>
    );
}
