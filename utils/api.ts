const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API || " ";
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API || " ";
const PUBLIC_CRYPTO_API = process.env.NEXT_PUBLIC_CRYPTO_API || " "; 

const COIN_GECKO_BASE = 'https://api.coingecko.com/api/v3';
const OPEN_WEATHER_BASE = 'https://api.openweathermap.org/data/2.5';
const NEWS_API_BASE = 'https://newsdata.io/api/1';

// Weather: Current weather data by city
export const fetchWeather = async (city: string) => {
    const url = `${OPEN_WEATHER_BASE}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();

        return data;
    } catch (err) {
        console.error('FetchWeather error:', err);
        throw err;
    }
};

// Crypto: Get market data for single crypto coin
export const fetchCrypto = async (id: string) => {
    let currency = "inr"
    const url = `${COIN_GECKO_BASE}/coins/markets?vs_currency=${currency}&ids=${id}`;
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': PUBLIC_CRYPTO_API }
    };
    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('FetchCrypto error:', err);
        throw err;
    }
};

// Crypto: Get historical data for the details page
export const fetchCryptoHistory = async (id: string, days = 7) => {
    let currency = "inr"
    const url = `${COIN_GECKO_BASE}/coins/${id.toLowerCase()}/market_chart?vs_currency=${currency}&days=${days}`;
    const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': PUBLIC_CRYPTO_API }
    };

    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status} for ${url}`);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("FetchCryptoMarket error:", err)
        throw err;
    }
};
//Weather: Get forecast data for the details page
export const fetchWeatherForecast = async (lat: number, lon: number) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("fetchWeatherForecast error:", err);
        throw err;
    }
};

// News: Crypto headlines
export const fetchCryptoNews = async () => {
    const url = `${NEWS_API_BASE}/news?apikey=${NEWS_API_KEY}&category=business&language=en&q=crypto`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('FetchCryptoNews error:', err);
        throw err;
    }
};
