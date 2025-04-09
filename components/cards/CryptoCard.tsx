'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';
import { getCrypto } from '@/redux/slices/cryptoSlice';
import { Card } from './Card';
import Link from 'next/link';

export const CryptoCard = ({ cryptoId }: { cryptoId: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.crypto);

    useEffect(() => {
        dispatch(getCrypto(cryptoId));
    }, [cryptoId, dispatch]);

    let cryptoData = null;

    if (data[cryptoId]) {
        cryptoData = data[cryptoId][0];
    }
    // console.log(cryptoId);
    // console.log(cryptoData.price_change_percentage_24h);

    if (loading && !cryptoData)
        return <Card className="dark:bg-gray-900">Loading {cryptoId}...</Card>;
    if (error && !cryptoData) return <Card className="dark:bg-gray-900">Error: {error}</Card>;
    if (!cryptoData) return null;

    const { name, current_price, price_change_percentage_24h, market_cap, id } = cryptoData;

    // console.log(market_data);
    // const price = market_data?.current_price?.usd;
    // const change = market_data?.price_change_percentage_24h;
    // const marketCap = market_data?.market_cap?.usd;

    return (
        <Link href={`/crypto/${id}`}>
            <Card className="dark:bg-gray-900">
                <h2 className="text-xl font-semibold capitalize">{name}</h2>
                <p>💰 Price: ₹{current_price?.toFixed(2)}</p>
                <p>📉 24h Change: {price_change_percentage_24h?.toFixed(2)}%</p>
                <p>🏦 Market Cap: ₹{market_cap?.toLocaleString()}</p>
            </Card>
        </Link>
    );
};
