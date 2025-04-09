'use client';

// import { Sparkles } from 'lucide-react';
import { Notifications } from './Notifications';
import Link from 'next/link';
import Image from 'next/image';

export const LogoBar = () => {
    return (
        <div className="relative flex items-center justify-center rounded-2xl bg-gray-900 p-4 text-white shadow-md">
            {/* Left: Notifications */}
            <div className="absolute top-1/2 left-4 -translate-y-1/2">
                <Notifications />
            </div>

            {/* Center: Logo and Brand */}
            <Link href="/" className="flex items-center gap-3">
                <Image src={'/icon.png'} alt="icon" className="h-10 w-10 sm:h-12 sm:w-12" />
                <h1 className="hidden text-2xl font-bold tracking-wide md:flex">
                    <span className="text-cyan-400">Crypto</span>
                    <span className="text-white">Weather</span>
                    <span className="text-violet-400"> Nexus</span>
                </h1>
            </Link>
        </div>
    );
};
