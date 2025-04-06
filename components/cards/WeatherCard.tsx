import { useEffect, useState } from 'react';
import { fetchWeather } from '@/utils/api';
import { Card } from './Card';

export const WeatherCard = ({ city }: { city: string }) => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const getData = async () => {
            const res = await fetchWeather(city);
            setData(res);
        };
        getData();
    }, [city]);

    if (!data) return <Card>Loading {city}...</Card>;

    const condition = data.weather?.[0]?.main;
    const temp = data.main?.temp;
    const humidity = data.main?.humidity;

    return (
        <Card>
            <h2 className="text-xl font-semibold">{city}</h2>
            <p>🌡 Temp: {temp}°C</p>
            <p>💧 Humidity: {humidity}%</p>
            <p>🌤 Condition: {condition}</p>
        </Card>
    );
};
