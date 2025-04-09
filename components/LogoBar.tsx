'use client';

// import { Sparkles } from 'lucide-react';
import { Notifications } from './Notifications';
import Link from 'next/link';
import Image from 'next/image';

export const LogoBar = () => {
    return (
        <div className="relative flex justify-center items-center p-4 bg-gray-900 text-white shadow-md rounded-2xl">
            {/* Left: Notifications */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Notifications />
            </div>

            {/* Center: Logo and Brand */}
            <Link href="/" className="flex items-center gap-3">
                <Image src={'/icon.png'} alt='icon' className='w-10 h-10 sm:w-12 sm:h-12' />
                <h1 className="hidden md:flex text-2xl font-bold tracking-wide">
                    <span className="text-cyan-400">Crypto</span>
                    <span className="text-white">Weather</span>
                    <span className="text-violet-400"> Nexus</span>
                </h1>
            </Link>
        </div>
    );
};
