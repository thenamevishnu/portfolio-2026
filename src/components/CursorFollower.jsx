"use client";
import { useEffect, useRef } from "react";

export const CursorFollower = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const handleCursorPosition = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }
        };

        window.addEventListener("mousemove", handleCursorPosition);
        return () => window.removeEventListener("mousemove", handleCursorPosition);
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed hidden md:block top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400 pointer-events-none z-9999 transition-transform duration-1000 ease-out"
        />
    );
};