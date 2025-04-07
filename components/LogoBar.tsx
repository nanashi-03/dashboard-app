'use client';

import { Sparkles } from 'lucide-react';

export const LogoBar = () => {
    return (
        <div className="flex justify-center items-center gap-3 p-4 bg-gray-900 text-white shadow-md">
            {/* Logo Icon */}
            <div className="p-2 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-600 shadow-lg">
                <Sparkles className="w-6 h-6" />
            </div>

            {/* Brand Text */}
            <h1 className="text-2xl font-bold tracking-wide">
                <span className="text-cyan-400">Crypto</span>
                <span className="text-white">Weather</span>
                <span className="text-violet-400"> Nexus</span>
            </h1>
        </div>
    );
};
