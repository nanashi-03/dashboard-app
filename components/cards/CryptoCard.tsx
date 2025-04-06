import { useEffect, useState } from 'react';
import { fetchCrypto } from '@/utils/api';
import { Card } from './Card';

export const CryptoCard = ({ coinId }: { coinId: string }) => {
    const [coin, setCoin] = useState<any>(null);

    useEffect(() => {
        const getCoin = async () => {
            const res = await fetchCrypto(coinId);
            // console.log(res[0]); //test
            
            setCoin(res[0]);
        };
        getCoin();
    }, [coinId]);

    if (!coin) return <Card>Loading {coinId}...</Card>;
    // console.log(coin); //test
    

    return (
        <Card>
            <h2 className="text-xl font-semibold">{coin.name}</h2>
            <p>💰 Price: ${coin.current_price}</p>
            <p>📉 24h Change: {coin.price_change_percentage_24h?.toFixed(2)}%</p>
            <p>🏦 Market Cap: ${coin.market_cap.toLocaleString()}</p>
        </Card>
    );
};
