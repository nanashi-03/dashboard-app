import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeather } from '@/utils/api';
import { addNotification } from './uiSlice';

interface WeatherState {
    data: Record<string, any>;
    loading: boolean;
    error: string | null;
}

const initialState: WeatherState = {
    data: {},
    loading: false,
    error: null,
};

export const getWeather = createAsyncThunk(
    'weather/getWeather',
    async (city: string, { dispatch }) => {
        const response = await fetchWeather(city);

        const mainCondition = response.weather?.[0]?.main?.toLowerCase();
        const windSpeed = response.wind?.speed;

        const isStorm = ['thunderstorm', 'snow', 'rain', 'drizzle'].includes(mainCondition);
        const isWindy = windSpeed > 10;

        if (isStorm || isWindy) {
            const alertMsg = isStorm
                ? `⚠️ Weather Alert: ${city} is experiencing ${mainCondition}!`
                : `🌬️ Weather Alert: Strong winds in ${city} (${windSpeed} m/s)`;

            dispatch(addNotification({
                id: `weather_${Date.now()}`,
                type: 'weather_alert',
                message: alertMsg,
                timestamp: Date.now(),
            }));
        }

        return { city, data: response };
    }
);


const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.data[action.payload.city] = action.payload.data;
            })
            .addCase(getWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch weather';
            });
    },
});

export default weatherSlice.reducer;
