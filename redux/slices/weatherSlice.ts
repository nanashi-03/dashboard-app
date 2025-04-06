import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeather } from '@/utils/api';

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
    async (city: string) => {
        const response = await fetchWeather(city);
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
