import { store } from '@/redux/store';
import { addNotification } from '@/redux/slices/uiSlice';
import { fetchWeather } from './api';

const state = store.getState();
const WEATHER_CITIES = state.userPref.favoriteCities;
const third_crypto = state.userPref.favoriteCrypto;

const COINCAP_WS_URL = `wss://ws.coincap.io/prices?assets=bitcoin,ethereum,${third_crypto}`;

const WEATHER_INTERVAL = 60 * 1000; 

let socket: WebSocket | null = null;
let weatherIntervalId: NodeJS.Timeout | null = null;

export const startWebSocket = () => {
    if (socket) return;

    socket = new WebSocket(COINCAP_WS_URL);

    socket.onopen = () => {
        console.log('CoinCap WebSocket connected');
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        Object.entries(data).forEach(([symbol, price]) => {
            const priceFloat = parseFloat(price as string);
            const id = `${symbol}_${Date.now()}`;

            store.dispatch(
                addNotification({
                    id,
                    type: 'price_alert',
                    message: `${symbol.toUpperCase()} is now $${priceFloat.toFixed(2)}`,
                    timestamp: Date.now(),
                })
            );
        });
    };

    socket.onerror = (err) => {
        console.error('WebSocket error:', err);
    };

    socket.onclose = () => {
        console.warn('WebSocket closed, reconnecting in 5s...');
        socket = null;
        setTimeout(startWebSocket, 5000);
    };

    // Start weather polling every 5 minutes
    if (!weatherIntervalId) {
        console.log('Starting weather polling...');
        weatherIntervalId = setInterval(() => {
            WEATHER_CITIES.forEach((city) => {
                fetchWeather(city).catch((err) => {
                    console.error(`Weather fetch failed for ${city}:`, err);
                });
            });
        }, WEATHER_INTERVAL);

        // Also fetch immediately on startup
        WEATHER_CITIES.forEach((city) => fetchWeather(city));
    }
};

export const stopWeatherPolling = () => {
    if (weatherIntervalId) {
        clearInterval(weatherIntervalId);
        weatherIntervalId = null;
    }
};