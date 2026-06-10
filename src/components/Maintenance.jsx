"use client";
import { useMe } from "@/providers/DataProvider";
import { useState, useEffect, useRef } from "react";

export const MaintenanceModal = ({ }) => {
   
    const myInfo = useMe();

    if (!myInfo.maintenance_mode) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in" />

            <div
                className="relative w-full max-w-md overflow-hidden rounded-2xl border border-neutral-900 bg-neutral-950/90 p-6 sm:p-8 text-center shadow-2xl transition-all duration-300 animate-in fade-in zoom-in-95"
            >
                <div className="absolute inset-0 opacity-100 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.06)_0%,transparent_70%)] pointer-events-none" />

                <div className="relative z-10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900/50 border border-neutral-800/60 text-emerald-400 shadow-inner">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A1.79 1.79 0 0115 21l-5.83-5.83m.01 0a2.22 2.22 0 001.24-1.24m-1.24 1.24a2.22 2.22 0 01-1.24-1.24m1.24 1.24h-.01m0 0L3 9.25A1.79 1.79 0 013 7l5.83-5.83m.01 0a2.22 2.22 0 011.24 1.24m-1.24-1.24a2.22 2.22 0 001.24 1.24m-1.24 0V11m0 0L15 3.25M12 11a2.22 2.22 0 00-1.24 1.24M12 11a2.22 2.22 0 011.24 1.24" />
                    </svg>
                </div>

                <div className="relative z-10 space-y-2">
                    <span className="text-[9px] font-semibold tracking-widest text-emerald-400 uppercase block">Work In Progress</span>
                    <h3 className="text-lg font-bold text-white tracking-tight">Website Under Development</h3>
                    <p className="text-[11px] sm:text-xs text-neutral-400 font-light leading-relaxed max-w-sm mx-auto">
                        This service is temporarily unavailable due to scheduled maintenance. We're working to restore full functionality as quickly as possible. Thank you for your patience.
                    </p>
                </div>
            </div>
        </div>
    );
};
