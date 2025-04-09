'use client';

export function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
    );
}
