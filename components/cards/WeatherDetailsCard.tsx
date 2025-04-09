'use client'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWeather } from '@/redux/slices/weatherSlice';
import { RootState, AppDispatch } from '@/redux/store';
import Image from 'next/image';
import { fetchWeatherForecast } from '@/utils/api';
import { Loading } from '@/components/Loading';
import WeatherForecastChart from '@/components/charts/WeatherForecastChart';

type ForecastPoint = {
    time: string;   // formatted date string
    temp: string;   // temperature as a formatted string (e.g., "22.3")
};

type RawForecastItem = {
    dt: number;
    main: {
        temp: number;
    };
    // Add more if needed
};

export function WeatherDetailsCard({ city }: { city: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const weatherData = useSelector((state: RootState) => state.weather.data[city]);
    const loading = useSelector((state: RootState) => state.weather.loading);
    const error = useSelector((state: RootState) => state.weather.error);
    const [forecast, setForecast] = useState<ForecastPoint[]>([]);
    const [chartLoading, setChartLoading] = useState(true);

    useEffect(() => {
        dispatch(getWeather(city));
    }, [city, dispatch]);

    useEffect(() => {
        const loadForecast = async () => {
            if (weatherData?.coord) {
                setChartLoading(true);
                try {
                    const data = await fetchWeatherForecast(weatherData.coord.lat, weatherData.coord.lon);
                    const formatted = data.list.map((item: RawForecastItem) => ({
                        time: new Date(item.dt * 1000).toLocaleString('en-IN', {
                            hour: '2-digit',
                            day: 'numeric',
                            month: 'short',
                        }),
                        temp: item.main.temp.toFixed(1), // convert from Kelvin to Celsius
                    }));
                    setForecast(formatted);
                } catch (err) {
                    console.error("Forecast fetch failed:", err);
                } finally {
                    setChartLoading(false);
                }
            }
        };
        loadForecast();
    }, [weatherData]);

    if (loading) return <Loading />;
    if (error) return <div className="p-6 text-red-500 text-center">⚠️ Error: {error}</div>;
    if (!weatherData) return <p>No weather data found.</p>;

    const { main, weather, wind, sys, visibility, clouds, dt, name } = weatherData;

    // console.log(forecast);

    const formatTime = (unix: number) =>
        new Date(unix * 1000).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
        });

    const windDirection = (deg: number) => {
        const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        return dirs[Math.round(deg / 45) % 8];
    };

    return (
        <div className="p-6 m-6 max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg text-gray-800 dark:text-white space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    {name}, {sys.country}
                </h1>
                <div className="flex items-center gap-2">
                    <Image
                        src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                        alt={weather[0].description}
                        width={64}
                        height={64}
                    />
                    <div>
                        <p className="text-xl font-semibold">{weather[0].main}</p>
                        <p className="text-sm text-gray-400">{weather[0].description}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                    <p><strong>🌡️ Temp:</strong> {main.temp}°C</p>
                    <p><strong>Feels like:</strong> {main.feels_like}°C</p>
                    <p><strong>Min/Max:</strong> {main.temp_min}°C / {main.temp_max}°C</p>
                </div>
                <div>
                    <p><strong>💧 Humidity:</strong> {main.humidity}%</p>
                    <p><strong>🌫️ Visibility:</strong> {visibility / 1000} km</p>
                    <p><strong>☁️ Cloudiness:</strong> {clouds.all}%</p>
                </div>
                <div>
                    <p><strong>💨 Wind:</strong> {wind.speed} m/s</p>
                    <p><strong>Direction:</strong> {windDirection(wind.deg)} ({wind.deg}°)</p>
                    {wind.gust && <p><strong>Gust:</strong> {wind.gust} m/s</p>}
                </div>
                <div>
                    <p><strong>🕒 Last Updated:</strong> {formatTime(dt)}</p>
                    <p><strong>🌅 Sunrise:</strong> {formatTime(sys.sunrise)}</p>
                    <p><strong>🌇 Sunset:</strong> {formatTime(sys.sunset)}</p>
                </div>
                <div>
                    <p><strong>📈 Pressure:</strong> {main.pressure} hPa</p>
                    <p><strong>🌊 Sea Level:</strong> {main.sea_level ?? 'N/A'}</p>
                    <p><strong>🏔️ Ground Level:</strong> {main.grnd_level ?? 'N/A'}</p>
                </div>
            </div>

            {chartLoading ? (
                <Loading /> 
            ) : forecast.length > 0 ? (
                <WeatherForecastChart data={forecast} />
            ) : (
                <p className="text-gray-500">No forecast data available.</p>
            )}
        </div>
    );
}