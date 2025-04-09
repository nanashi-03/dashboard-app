'use client';

import {
    addFavoriteCity,
    removeFavoriteCity,
    setFavoriteCrypto,
    removeFavoriteCrypto,
} from '@/redux/slices/userPrefSlice';
import { useState } from 'react';
import { MotionlessCard } from '@/components/cards/Card';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import toast from 'react-hot-toast';

export const FavoritesManager = () => {
    const dispatch = useDispatch();
    const { favoriteCities, favoriteCrypto } = useSelector((state: RootState) => state.userPref);
    const [activeTab, setActiveTab] = useState<'cities' | 'cryptos'>('cities');
    const isCryptoDisabled = activeTab === 'cryptos' && !!favoriteCrypto;
    const [input, setInput] = useState('');
    const MAX_CITIES = 3;
    const cityLimitReached = activeTab === 'cities' && favoriteCities.length >= MAX_CITIES;

    const handleAdd = () => {
        if (!input) return;
        if (activeTab === 'cities') dispatch(addFavoriteCity(input));
        else dispatch(setFavoriteCrypto(input.toLowerCase()));
        setInput('');
        toast.success(`✅ Added ${input} to favorites`);
    };

    const handleRemove = (item: string) => {
        if (activeTab === 'cities') dispatch(removeFavoriteCity(item));
        else dispatch(removeFavoriteCrypto());
        toast.error(`❌ Removed ${item} from favorites`);
    };

    const items = activeTab === 'cities' ? favoriteCities : favoriteCrypto ? [favoriteCrypto] : [];

    return (
        <MotionlessCard className="mx-auto contents w-full max-w-2xl">
            <div className="mb-4 flex items-center justify-center gap-4">
                <button
                    onClick={() => setActiveTab('cities')}
                    className={`rounded-full px-4 py-2 font-semibold hover:cursor-pointer ${
                        activeTab === 'cities'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-800'
                    }`}
                >
                    Cities
                </button>
                <button
                    onClick={() => setActiveTab('cryptos')}
                    className={`rounded-full px-4 py-2 font-semibold hover:cursor-pointer ${
                        activeTab === 'cryptos'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-800'
                    }`}
                >
                    Cryptos
                </button>
            </div>

            <div className="mb-4 flex gap-2">
                <input
                    disabled={isCryptoDisabled || cityLimitReached}
                    type="text"
                    className="flex-1 rounded-lg border px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
                    placeholder={
                        activeTab === 'cities'
                            ? 'Enter city name'
                            : 'Enter crypto ID (e.g., bitcoin)'
                    }
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    onClick={handleAdd}
                    disabled={isCryptoDisabled || cityLimitReached || !input}
                    className="rounded-lg bg-green-500 px-4 py-2 text-white hover:cursor-pointer hover:bg-green-600"
                >
                    Add
                </button>
            </div>

            <ul className="flex place-content-evenly place-items-start">
                {items.map((item) => (
                    <li
                        key={item}
                        className="flex items-center justify-evenly gap-1 rounded-lg bg-gray-100 p-2 dark:bg-gray-800"
                    >
                        <span className="capitalize">{item}</span>
                        <button
                            onClick={() => handleRemove(item)}
                            className="text-red-500 hover:text-red-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 hover:cursor-pointer"
                                aria-hidden="true"
                                focusable="false"
                                viewBox="0 0 384 512"
                            >
                                {/*--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.*/}
                                <path
                                    fill="#fb2c36"
                                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                                />
                            </svg>
                        </button>
                    </li>
                ))}
                {items.length === 0 && <p className="text-gray-500">No favorites yet.</p>}
            </ul>
        </MotionlessCard>
    );
};
