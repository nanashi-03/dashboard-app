'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCrypto } from '@/redux/slices/cryptoSlice';
import { RootState, AppDispatch } from '@/redux/store';
import Image from 'next/image';
import { fetchCryptoHistory } from '@/utils/api';
import { CryptoPriceChart } from '@/components/charts/CryptoPriceChart';
import { Loading } from '@/components/Loading'

const dayOptions = [7, 14, 30, 90, 180];

export function CryptoDetailsCard({ id }: { id: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const cryptoData = useSelector((state: RootState) => state.crypto.data[id]);
    const loading = useSelector((state: RootState) => state.crypto.loading);
    const error = useSelector((state: RootState) => state.crypto.error);

    const [days, setDays] = useState(30);
    const [chartData, setChartData] = useState<{ time: string; price: number }[]>([]);
    const [chartLoading, setChartLoading] = useState(true);

    useEffect(() => {
        dispatch(getCrypto(id));
    }, [id, dispatch]);

    useEffect(() => {
        const loadData = async () => {
            setChartLoading(true);
            try {
                const data = await fetchCryptoHistory(id, days);
                if (!data?.prices || !Array.isArray(data.prices)) {
                    throw new Error("No valid price data found.");
                }

                const formatted = data.prices.map(([timestamp, price]: [number, number]) => ({
                    time: new Date(timestamp).toLocaleDateString(),
                    price,
                }));
                setChartData(formatted);
            } catch (err) {
                console.error("Chart load error:", err);
                setChartData([]);
            } finally {
                setChartLoading(false);
            }
        };

        loadData();
    }, [id, days]);


    if (loading) return <Loading />;
    if (error) return <div className="p-6 text-red-500 text-center">⚠️ Error: {error}</div>;
    if (!cryptoData) return <p>No crypto data found.</p>;

    const crypto = cryptoData[0];
    if (!crypto) return <p>No crypto detail data available for &quot;{id}&quot;.</p>;

    const {
        name,
        image,
        current_price,
        market_cap,
        market_cap_rank,
        total_volume,
        price_change_percentage_24h,
        ath,
        ath_change_percentage,
        ath_date,
        atl,
        atl_change_percentage,
        atl_date,
        last_updated,
    } = crypto;

    return (
        <div className="p-6 m-6 rounded-lg bg-white dark:bg-gray-900 shadow-lg max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Image src={image} alt={name} width={64} height={64} />
                <h2 className="text-2xl font-bold">{name}</h2>
                <span className="text-gray-500 text-sm">Rank #{market_cap_rank}</span>
            </div>

            <div className="grid gap-2 text-sm">
                <p>💰 Price: <strong>₹{current_price.toLocaleString()}</strong></p>
                <p>📊 Market Cap: ₹{market_cap.toLocaleString()}</p>
                <p>🔄 24h Change: <span className={price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}>
                    {price_change_percentage_24h.toFixed(2)}%
                </span></p>
                <p>📈 24h Volume: ₹{total_volume.toLocaleString()}</p>
                <p>🚀 All Time High: ₹{ath.toLocaleString()} ({ath_change_percentage.toFixed(2)}%) on {new Date(ath_date).toLocaleDateString()}</p>
                <p>📉 All Time Low: ₹{atl.toLocaleString()} ({atl_change_percentage.toFixed(2)}%) on {new Date(atl_date).toLocaleDateString()}</p>
                <p>⏱️ Last Updated: {new Date(last_updated).toLocaleString()}</p>
            </div>

            <div className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-3">
                    <h1 className="text-2xl font-bold text-white capitalize">
                        {id} Price Chart
                    </h1>
                    <select
                        value={days}
                        onChange={(e) => setDays(Number(e.target.value))}
                        className="bg-gray-800 text-white rounded px-3 py-2"
                    >
                        {dayOptions.map((option) => (
                            <option key={option} value={option}>
                                Last {option} days
                            </option>
                        ))}
                    </select>
                </div>

                {chartLoading ? (
                    <Loading />
                ) : chartData.length > 0 ? (
                    <CryptoPriceChart data={chartData} />
                ) : (
                    <p className="text-red-500">No chart data available for &quot;{id}&quot;</p>
                )}
            </div>
        </div>
    );
}