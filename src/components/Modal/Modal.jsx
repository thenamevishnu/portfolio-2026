"use client";
import { useGlobalError } from "@/providers/DataProvider";
import { useState, useEffect, useRef } from "react";
import { BiNoSignal } from "react-icons/bi";

export const Modal = () => {

    const { globalError, setGlobalError } = useGlobalError();
    const [isOpen, setIsOpen] = useState(globalError?.label && globalError?.title && globalError?.description);
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setGlobalError({});
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in" />

            <div
                ref={modalRef}
                className="relative w-full max-w-md overflow-hidden rounded-2xl border border-neutral-900 bg-neutral-950/90 p-6 sm:p-8 text-center shadow-2xl transition-all duration-300 animate-in fade-in zoom-in-95"
            >
                <div className="absolute inset-0 opacity-100 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.06)_0%,transparent_70%)] pointer-events-none" />

                <div className="relative z-10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900/50 border border-neutral-800/60 text-emerald-400 shadow-inner">
                    <BiNoSignal />
                </div>

                <div className="relative z-10 space-y-2">
                    <span className="text-[9px] font-semibold tracking-widest text-emerald-400 uppercase block">{globalError?.label || "Network issue"}</span>
                    <h3 className="text-lg font-bold text-white tracking-tight">{globalError?.title || "Unable to process your request"}</h3>
                    <p className="text-[11px] sm:text-xs text-neutral-400 font-light leading-relaxed max-w-sm mx-auto">
                        {globalError?.description || "We're unable to process your request at the moment due to a temporary issue. Please try again after some time. If the problem persists, feel free to contact us for assistance."}
                    </p>
                </div>

                <div className="relative z-10 mt-6 flex flex-col gap-2">
                    <button
                        onClick={() => setIsOpen(false)}
                        type="button"
                        className="w-full h-10 inline-flex items-center justify-center rounded-xl bg-white text-xs font-semibold text-neutral-950 hover:bg-neutral-200 active:scale-98 transition-all duration-300 shadow-xl cursor-pointer"
                    >
                        Okay, Understood
                    </button>
                </div>
            </div>
        </div>
    );
};
