'use client';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    const [store, setStore] = useState<any>(null);
    const [persistor, setPersistor] = useState<any>(null);

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
