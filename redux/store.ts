import { configureStore } from '@reduxjs/toolkit';

import weatherReducer from './slices/weatherSlice';
import cryptoReducer from './slices/cryptoSlice';
import newsReducer from './slices/newsSlice';
import uiReducer from './slices/uiSlice';
import userPrefReducer from './slices/userPrefSlice'

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        crypto: cryptoReducer,
        news: newsReducer,
        ui: uiReducer,
        userPref: userPrefReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: true 
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
