import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
    id: string;
    type: 'price_alert' | 'weather_alert';
    message: string;
    timestamp: number;
}

interface UIState {
    favorites: {
        cities: string[];
        cryptos: string[];
    };
    notifications: Notification[];
}

const initialState: UIState = {
    favorites: {
        cities: [],
        cryptos: [],
    },
    notifications: [],
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        addFavoriteCity(state, action: PayloadAction<string>) {
            if (!state.favorites.cities.includes(action.payload)) {
                state.favorites.cities.push(action.payload);
            }
        },
        addFavoriteCrypto(state, action: PayloadAction<string>) {
            if (!state.favorites.cryptos.includes(action.payload)) {
                state.favorites.cryptos.push(action.payload);
            }
        },
        addNotification(state, action: PayloadAction<Notification>) {
            state.notifications.unshift(action.payload);
            if (state.notifications.length > 10) {
                state.notifications.pop();
            }
        },
        clearNotifications(state) {
            state.notifications = [];
        },
    },
});

export const {
    addFavoriteCity,
    addFavoriteCrypto,
    addNotification,
    clearNotifications,
} = uiSlice.actions;

export default uiSlice.reducer;
