"use client";
import { useState, useEffect, useRef } from "react";

export const MaintenanceModal = () => {
    const [isOpen, setIsOpen] = useState(true);
    const modalRef = useRef(null);

    // Prevent background scrolling while modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    // Close when clicking outside the modal box
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop Layer */}
            <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in" />

            {/* Modal Box Container */}
            <div
                ref={modalRef}
                className="relative w-full max-w-md overflow-hidden rounded-2xl border border-neutral-900 bg-neutral-950/90 p-6 sm:p-8 text-center shadow-2xl transition-all duration-300 animate-in fade-in zoom-in-95"
            >
                {/* Premium Radial Accent Glow */}
                <div className="absolute inset-0 opacity-100 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.06)_0%,transparent_70%)] pointer-events-none" />

                {/* Construction Icon */}
                <div className="relative z-10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900/50 border border-neutral-800/60 text-emerald-400 shadow-inner">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A1.79 1.79 0 0115 21l-5.83-5.83m.01 0a2.22 2.22 0 001.24-1.24m-1.24 1.24a2.22 2.22 0 01-1.24-1.24m1.24 1.24h-.01m0 0L3 9.25A1.79 1.79 0 013 7l5.83-5.83m.01 0a2.22 2.22 0 011.24 1.24m-1.24-1.24a2.22 2.22 0 001.24 1.24m-1.24 0V11m0 0L15 3.25M12 11a2.22 2.22 0 00-1.24 1.24M12 11a2.22 2.22 0 011.24 1.24" />
                    </svg>
                </div>

                {/* Content Area */}
                <div className="relative z-10 space-y-2">
                    <span className="text-[9px] font-semibold tracking-widest text-emerald-400 uppercase block">Work In Progress</span>
                    <h3 className="text-lg font-bold text-white tracking-tight">Website Under Development</h3>
                    <p className="text-[11px] sm:text-xs text-neutral-400 font-light leading-relaxed max-w-sm mx-auto">
                        Welcome! Please note that this website is currently under active development. You will encounter dummy text, placeholder content, and sample reviews as we finalize the layouts and features.
                    </p>
                </div>

                {/* Actions */}
                <div className="relative z-10 mt-6 flex flex-col gap-2">
                    <button
                        onClick={() => setIsOpen(false)}
                        type="button"
                        className="w-full h-10 inline-flex items-center justify-center rounded-xl bg-white text-xs font-semibold text-neutral-950 hover:bg-neutral-200 active:scale-98 transition-all duration-300 shadow-xl cursor-pointer"
                    >
                        Got it, take a look
                    </button>
                    <span className="text-[8px] font-mono uppercase tracking-wider text-neutral-600 block mt-1 select-none">
                        // Alpha Preview Mode
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MaintenanceModal;