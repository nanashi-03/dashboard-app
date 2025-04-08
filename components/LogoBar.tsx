'use client';

import { Sparkles } from 'lucide-react';
import { Notifications } from './Notifications';
import Link from 'next/link';

export const LogoBar = () => {
    return (
        <div className="relative flex justify-center items-center p-4 bg-gray-900 text-white shadow-md rounded-2xl">
            {/* Left: Notifications */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Notifications />
            </div>

            {/* Center: Logo and Brand */}
            <Link href="/" className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-600 shadow-lg">
                    <Sparkles className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-bold tracking-wide">
                    <span className="text-cyan-400">Crypto</span>
                    <span className="text-white">Weather</span>
                    <span className="text-violet-400"> Nexus</span>
                </h1>
            </Link>
        </div>
    );
};
