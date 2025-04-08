'use client';

import { useEffect } from 'react';
import { startWebSocket, stopWeatherPolling } from '@/utils/websocket';

const WebSocketProvider = () => {
    useEffect(() => {
        startWebSocket(); // start on mount

        // Optional cleanup logic
        return () => {
            stopWeatherPolling();
            console.log('WebSocketProvider unmounted');
        };
    }, []);

    return null; // doesn't render anything
};

export default WebSocketProvider;
