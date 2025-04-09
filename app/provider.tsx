'use client';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react";

import type { Persistor } from 'redux-persist';
import type { Store } from '@reduxjs/toolkit';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    const [store, setStore] = useState<Store | null>(null);
    const [persistor, setPersistor] = useState<Persistor | null>(null);

    useEffect(() => {
    const loadStore = async () => {
        const mod = await import('@/redux/store.client');
        setStore(mod.store);
        setPersistor(mod.persistor);
    };

    loadStore();
    }, []);

    if (!store || !persistor) return null;

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <Toaster position="top-right" />
            {children}
            </PersistGate>
        </Provider>
    );
}
