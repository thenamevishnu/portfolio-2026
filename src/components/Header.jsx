"use client";
import { useState, useEffect } from "react";
import { useMe } from "@/providers/DataProvider";
import Link from "next/link";

export const Header = () => {
    const myInfo = useMe();
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll efficiently when mobile menu is active
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    return (
        <>
            {/* Main Header Bar */}
            <header className="sticky top-0 z-50 w-full border-b border-neutral-900 bg-neutral-950/80 text-neutral-200 backdrop-blur-md">
                <div className="mx-auto flex h-14 sm:h-16 items-center justify-between px-3 xs:px-4 sm:px-6 max-w-[1400px]">

                    {/* Logo / Name */}
                    <Link href="/" className="relative z-50 group max-w-[70%] truncate" onClick={() => setIsOpen(false)}>
                        <h1 className="text-xs xs:text-sm sm:text-base font-bold tracking-wider text-white transition-colors duration-300 group-hover:text-emerald-400 truncate">
                            {myInfo.profile.name}
                        </h1>
                    </Link>

                    {/* Desktop Navigation Link Menu */}
                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-6 lg:gap-8 text-xs font-semibold tracking-widest uppercase">
                            {myInfo.nav_links.map((item) => (
                                <li key={item}>
                                    <Link
                                        href={`/#${item}`}
                                        className="relative block py-2 text-neutral-400 transition-colors duration-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-400 after:transition-all after:duration-300 hover:after:w-full"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Premium Morphing Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="relative cursor-pointer z-50 flex h-9 w-9 sm:h-10 sm:w-10 flex-col items-center justify-center gap-1 sm:gap-1.5 md:hidden text-neutral-400 hover:text-white focus:outline-none"
                        aria-label="Toggle main menu"
                        aria-expanded={isOpen}
                    >
                        <span className={`h-0.5 w-5 sm:w-6 rounded bg-current transition-all duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-[6px] sm:translate-y-[8px] text-emerald-400" : ""
                            }`} />
                        <span className={`h-0.5 w-5 sm:w-6 rounded bg-current transition-all duration-300 ease-in-out ${isOpen ? "opacity-0 scale-x-0" : ""
                            }`} />
                        <span className={`h-0.5 w-5 sm:w-6 rounded bg-current transition-all duration-300 ease-in-out ${isOpen ? "-rotate-45 translate-y-[-6px] sm:translate-y-[-8px] text-emerald-400" : ""
                            }`} />
                    </button>
                </div>
            </header>

            {/* Next-Gen Glassmorphic Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-neutral-950/95 backdrop-blur-2xl md:hidden transition-all duration-500 ease-in-out ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                {/* Internal Wrapper to handle alignment and safe padding */}
                <div className="flex h-full flex-col justify-between px-4 pt-20 pb-8 xs:px-6 xs:pb-12 overflow-y-auto">

                    {/* Menu Header Label */}
                    <div className={`transition-all duration-500 delay-75 transform ${isOpen ? "translate-y-0 opacity-40" : "-translate-y-4 opacity-0"}`}>
                        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-neutral-400 border-b border-neutral-900 pb-2">
                            Navigation
                        </p>
                    </div>

                    {/* Bento-Style Grid Menu */}
                    <nav className="my-auto py-6">
                        {/* - 2 columns on xxs/xs screens, switches cleanly to 3 columns on sm/md screens.
                          - Uses micro gaps (gap-2) on tiny screens to save room, spacing out on larger displays.
                        */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 xs:gap-3 w-full max-w-lg mx-auto">
                            {myInfo.nav_links.map((item, index) => (
                                <Link
                                    key={item}
                                    href={`/#${item}`}
                                    onClick={() => setIsOpen(false)}
                                    style={{ transitionDelay: isOpen ? `${index * 40 + 100}ms` : "0ms" }}
                                    className={`group relative flex flex-col items-center justify-center p-4 xs:p-5 rounded-xl border border-neutral-900 bg-neutral-900/30 backdrop-blur-md text-center transition-all duration-500 ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                                        } hover:border-emerald-500/30 hover:bg-neutral-900/60 active:scale-95`}
                                >
                                    {/* Glassmorphism Subtle Background Radial Glow on Hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)] pointer-events-none" />

                                    {/* Number Badge Indicator */}
                                    <span className="text-[9px] font-mono font-medium text-neutral-600 group-hover:text-emerald-400 transition-colors duration-300 mb-1">
                                        0{index + 1}
                                    </span>

                                    {/* Link Title */}
                                    <span className="text-xs xs:text-sm font-semibold tracking-wider uppercase text-neutral-300 group-hover:text-white transition-colors duration-300 truncate w-full">
                                        {item}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* Minimalist Footer inside Menu for Small Screens */}
                    <div className={`text-center transition-all duration-500 delay-300 transform ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                        <p className="text-[9px] font-medium tracking-widest uppercase text-neutral-600">
                            &copy; {new Date().getFullYear()} &middot; Premium Portfolio
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
};