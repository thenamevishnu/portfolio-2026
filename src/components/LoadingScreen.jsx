"use client";

export const LoadingScreen = () => {
    return <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950/90 backdrop-blur-sm transition-all duration-300">
        <div className="flex items-center gap-3">
            <div className="h-4 w-4 border-2 border-transparent border-t-emerald-400 border-r-emerald-400 rounded-full animate-spin" />

            <span className="text-xs font-semibold tracking-widest text-neutral-200 uppercase flex items-center">
                Loading
                <span className="inline-flex w-6 text-left ml-0.5 animate-[pulse_1.5s_infinite_steps(3)]">...</span>
            </span>
        </div>
    </div>
};