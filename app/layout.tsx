import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { AppProviders } from './provider';
import { LogoBar } from '@/components/LogoBar';
// import WebSocketProvider from "@/components/wsProvider";

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'CryptoWeather Nexus',
    description: 'Generated with Nextjs',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <AppProviders>
                    {/* <NotificationTester /> */}
                    {/* <WebSocketProvider /> */}
                    <LogoBar />
                    {children}
                </AppProviders>
            </body>
        </html>
    );
}
