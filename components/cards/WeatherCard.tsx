'use client';

import { useEffect } from 'react';
import { getWeather } from '@/redux/slices/weatherSlice';
import { Card } from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import Link from 'next/link';

export const WeatherCard = ({ city }: { city: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.weather);

    useEffect(() => {
        dispatch(getWeather(city));
    }, [city, dispatch]);

    const cityData = data[city];

    if (loading && !cityData) return <Card className='dark:bg-gray-900'>Loading {city}...</Card>;
    if (error && !cityData) return <Card className='dark:bg-gray-900'>Error: {error}</Card>;
    if (!cityData) return null;

    const condition = cityData.weather?.[0]?.main;
    const temp = cityData.main?.temp;
    const humidity = cityData.main?.humidity;

    return (
        <Link href={`/weather/${city}`}>
            <Card className='dark:bg-gray-900'>
                <h2 className="text-xl font-semibold">{city}</h2>
                <p>🌡 Temp: {temp}°C</p>
                <p>💧 Humidity: {humidity}%</p>
                <p>🌤 Condition: {condition}</p>
            </Card>
        </Link>
    );
};
