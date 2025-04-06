import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import weatherReducer from './slices/weatherSlice';
import cryptoReducer from './slices/cryptoSlice';
import newsReducer from './slices/newsSlice';
import uiReducer from './slices/uiSlice';
import userPrefReducer from './slices/userPrefSlice'

const rootReducer = combineReducers({
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
    ui: uiReducer,
    userPref: userPrefReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userPreferences'], // only persist this slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }, 
        thunk: true 
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
