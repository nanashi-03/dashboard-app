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
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'
                            } gap-2 max-w-sm w-full bg-gray-800 shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4`}
                    >
                        {/* Icon */}
                        <span className="mt-1">
                            {notif.type === 'price_alert' ? (
                                <Bitcoin className="text-yellow-500 w-5 h-5" />
                            ) : notif.type === 'weather_alert' ? (
                                <CloudSun className="text-blue-500 w-5 h-5" />
                            ) : (
                                <AlertCircle className="text-gray-500 w-5 h-5" />
                            )}
                        </span>
                        {/* Message */}
                        <div className="flex-1 w-0">
                            <p className="text-sm font-medium">{notif.message}</p>
                            <p className="text-xs text-gray-500">
                                {new Date(notif.timestamp).toLocaleTimeString()}
                            </p>
                        </div>
                        {/* Close Button */}
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-white transition"
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
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } gap-2 max-w-sm w-full bg-gray-800 shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4`}
                >
                    {/* Icon */}
                    <span className="mt-1">
                        {notif.type === 'price_alert' ? (
                            <Bitcoin className="text-yellow-500 w-5 h-5" />
                        ) : notif.type === 'weather_alert' ? (
                            <CloudSun className="text-blue-500 w-5 h-5" />
                        ) : (
                            <AlertCircle className="text-gray-500 w-5 h-5" />
                        )}
                    </span>
                    {/* Message */}
                    <div className="flex-1 w-0">
                        <p className="text-sm font-medium">{notif.message}</p>
                        <p className="text-xs text-gray-500">
                            {new Date(notif.timestamp).toLocaleTimeString()}
                        </p>
                    </div>
                    {/* Close Button */}
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white transition"
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
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
            <Bell />
        </button>
    );
};
