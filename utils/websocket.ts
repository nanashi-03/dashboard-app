import { store } from '@/redux/store.client';
import { addNotification } from '@/redux/slices/notifSlice';
import { fetchWeather } from './api';

const state = store.getState();
const WEATHER_CITIES = state.userPref.favoriteCities;
const third_crypto = state.userPref.favoriteCrypto || 'tether';

const COINCAP_WS_URL = `wss://ws.coincap.io/prices?assets=bitcoin,ethereum,${third_crypto}`;

const WEATHER_INTERVAL = 60 * 1000;

let socket: WebSocket | null = null;
let weatherIntervalId: NodeJS.Timeout | null = null;

export const startWebSocket = () => {
    if (socket) return;

    socket = new WebSocket(COINCAP_WS_URL);
    const PRICE_CHANGE_THRESHOLD = 0.05; // 5%
    const lastPrices: Record<string, number> = {};

    socket.onopen = (event) => {
        console.log(event);
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);

        Object.entries(data).forEach(([symbol, price]) => {
            const priceFloat = parseFloat(price as string);
            const prevPrice = lastPrices[symbol];

            // If we have a previous price, check % change
            if (prevPrice !== undefined) {
                const diff = Math.abs(priceFloat - prevPrice);
                const percentChange = diff / prevPrice;

                if (percentChange < PRICE_CHANGE_THRESHOLD) {
                    // Not a major change — skip
                    return;
                }
            }

            lastPrices[symbol] = priceFloat;

            const id = `${symbol}_${Date.now()}`;

            store.dispatch(
                addNotification({
                    id,
                    type: 'price_alert',
                    message: `${symbol.toUpperCase()} moved to $${priceFloat.toFixed(2)} ${prevPrice ? (priceFloat > prevPrice ? '↑' : '↓') : ''}`,
                    timestamp: Date.now(),
                }),
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
