// Somewhere in your app (e.g., NotificationTester.tsx)
'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification, Notification } from '@/redux/slices/notifSlice';
import { v4 as uuidv4 } from 'uuid';

export const NotificationTester = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            const rand = Math.random()
            const fakeNotif: Notification = {
                id: uuidv4(),
                type: rand > 0.5 ? 'price_alert' : 'weather_alert',
                message: `Test ${rand > 0.5 ? 'Price' : 'Weather'} Alert at ${new Date().toLocaleTimeString()}`,
                timestamp: Date.now(),
            };

            dispatch(addNotification(fakeNotif));
        }, 5000); // every 5 seconds

        return () => clearInterval(interval); // clean up on unmount
    }, [dispatch]);

    return null;
};
