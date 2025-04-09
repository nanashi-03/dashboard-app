import { configureStore } from '@reduxjs/toolkit';

import weatherReducer from './slices/weatherSlice';
import cryptoReducer from './slices/cryptoSlice';
import newsReducer from './slices/newsSlice';
import notifReducer from './slices/notifSlice';
import userPrefReducer from './slices/userPrefSlice';

export const makeStore = () =>
    configureStore({
        reducer: {
            weather: weatherReducer,
            crypto: cryptoReducer,
            news: newsReducer,
            notif: notifReducer,
            userPref: userPrefReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: true,
            }),
    });

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
