import { configureStore } from '@reduxjs/toolkit';

import weatherReducer from './slices/weatherSlice';
import cryptoReducer from './slices/cryptoSlice';
import newsReducer from './slices/newsSlice';
import uiReducer from './slices/uiSlice';
import userPrefReducer from './slices/userPrefSlice'

export const makeStore = () => configureStore({
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

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];