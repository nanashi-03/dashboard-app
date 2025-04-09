'use client';

import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import type { RootState } from '@/redux/store';
import { AlertCircle, Bitcoin, CloudSun, Bell } from 'lucide-react';

export const Notifications = () => {
    const notifications = useSelector((state: RootState) => state.notif.notifications);
    const lastSeenRef = useRef<Set<string>>(new Set());

    // 🟡 Show new notifications automatically
    useEffect(() => {
        notifications.forEach((notif) => {
            if (!lastSeenRef.current.has(notif.id)) {
                toast.custom((t) => (
                    <div
                        className={`${
                            t.visible ? 'animate-enter' : 'animate-leave'
                        } ring-opacity-5 pointer-events-auto flex w-full max-w-sm gap-2 rounded-xl bg-gray-800 p-4 shadow-lg ring-1 ring-black`}
                    >
                        {/* Icon */}
                        <span className="mt-1">
                            {notif.type === 'price_alert' ? (
                                <Bitcoin className="h-5 w-5 text-yellow-500" />
                            ) : notif.type === 'weather_alert' ? (
                                <CloudSun className="h-5 w-5 text-blue-500" />
                            ) : (
                                <AlertCircle className="h-5 w-5 text-gray-500" />
                            )}
                        </span>
                        {/* Message */}
                        <div className="w-0 flex-1">
                            <p className="text-sm font-medium">{notif.message}</p>
                            <p className="text-xs text-gray-500">
                                {new Date(notif.timestamp).toLocaleTimeString()}
                            </p>
                        </div>
                        {/* Close Button */}
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="absolute top-2 right-2 text-gray-400 transition hover:text-white"
                        >
                            ✕
                        </button>
                    </div>
                ));
                lastSeenRef.current.add(notif.id);
            }
        });
    }, [notifications]);

    const replayToasts = () => {
        notifications.forEach((notif) => {
            toast.custom((t) => (
                <div
                    className={`${
                        t.visible ? 'animate-enter' : 'animate-leave'
                    } ring-opacity-5 pointer-events-auto flex w-full max-w-sm gap-2 rounded-xl bg-gray-800 p-4 shadow-lg ring-1 ring-black`}
                >
                    {/* Icon */}
                    <span className="mt-1">
                        {notif.type === 'price_alert' ? (
                            <Bitcoin className="h-5 w-5 text-yellow-500" />
                        ) : notif.type === 'weather_alert' ? (
                            <CloudSun className="h-5 w-5 text-blue-500" />
                        ) : (
                            <AlertCircle className="h-5 w-5 text-gray-500" />
                        )}
                    </span>
                    {/* Message */}
                    <div className="w-0 flex-1">
                        <p className="text-sm font-medium">{notif.message}</p>
                        <p className="text-xs text-gray-500">
                            {new Date(notif.timestamp).toLocaleTimeString()}
                        </p>
                    </div>
                    {/* Close Button */}
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="absolute top-2 right-2 text-gray-400 transition hover:text-white"
                    >
                        ✕
                    </button>
                </div>
            ));
        });
    };

    return (
        <button
            onClick={replayToasts}
            className="flex h-12 w-12 place-items-center rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
            <Bell />
        </button>
    );
};
