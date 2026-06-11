"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuMoveLeft, LuHash, LuCircleAlert } from "react-icons/lu";

const NotFound = () => {
    const currentPath = usePathname();
    const [coordinate, setCoordinate] = useState({ x: 0, y: 0 });
    const router = useRouter();

    useEffect(() => {
        let sum = 0;
        for (let i = 0; i < currentPath.length; i++) {
            sum += currentPath.charCodeAt(i);
        }
        setCoordinate({
            x: (sum % 900) + 100,
            y: ((sum * 7) % 900) + 100
        });
    }, [currentPath]);

    return (
        <div className="min-h-screen bg-black text-neutral-500 font-mono text-[10px] xs:text-[11px] flex flex-col justify-between p-3.5 xs:p-6 sm:p-12 select-none antialiased relative overflow-hidden">

            {/* Structural Vector Accent Lines - Calibrated to clear text space on tiny layouts */}
            <div className="absolute top-0 bottom-0 left-[4%] xs:left-[10%] w-px bg-neutral-900/30 pointer-events-none" />
            <div className="absolute top-0 bottom-0 left-[8%] xs:left-[30%] w-px bg-neutral-900/30 pointer-events-none" />
            <div className="absolute top-[15%] xs:top-[20%] left-0 right-0 h-px bg-neutral-900/30 pointer-events-none" />

            {/* Top Navigation Row */}
            <header className="flex items-center justify-between w-full max-w-4xl mx-auto z-10 shrink-0 gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                    <LuHash className="h-3 w-3 xs:h-3.5 xs:w-3.5 text-neutral-700 shrink-0" />
                    <span className="text-[9px] xs:text-[10px] font-black tracking-[0.2em] text-neutral-400 uppercase truncate">
                        INDEX_FAULT
                    </span>
                </div>
                <span className="text-[8px] xs:text-[9px] text-neutral-700 font-bold tracking-wider shrink-0">
                    SYS.V_3.04
                </span>
            </header>

            {/* Center Content Typography */}
            <main className="w-full max-w-sm mx-auto my-auto py-4 space-y-5 xs:space-y-7 text-left z-10 relative">

                {/* Structural Intercept Block */}
                <div className="space-y-1 bg-black border border-neutral-900 rounded-xl p-3.5 xs:p-4 shadow-2xl relative">
                    <div className="absolute top-3 right-3 flex items-center gap-1 text-red-500/80 shrink-0">
                        <LuCircleAlert className="h-3 w-3 shrink-0" />
                        <span className="text-[7px] font-bold tracking-wider hidden xs:inline">NULL_VECTOR</span>
                    </div>

                    <span className="text-[8px] xs:text-[9px] font-black tracking-widest text-red-500 uppercase block">
                        LOCATOR_ERR_404
                    </span>
                    <h1 className="text-sm xs:text-lg font-black text-white tracking-tight pt-0.5 truncate">
                        Coordinate Unmapped
                    </h1>

                    <div className="pt-2.5 font-mono text-[9px] xs:text-[10px] text-neutral-600 space-y-1 border-t border-neutral-900/80 mt-3 select-text">
                        <p className="leading-tight"><span className="text-neutral-500 block xs:inline">TARGET :</span> <span className="text-neutral-300 break-all">{currentPath}</span></p>
                        <p className="leading-none"><span className="text-neutral-500">V_X    :</span> <span className="text-neutral-400 font-bold">{coordinate.x}.0043</span></p>
                        <p className="leading-none"><span className="text-neutral-500">V_Y    :</span> <span className="text-neutral-400 font-bold">{coordinate.y}.0912</span></p>
                    </div>
                </div>

                {/* Micro CTA Navigation Rows */}
                <div className="space-y-2 pt-0.5 pl-0.5 text-[10px] xs:text-[11px]">
                    <button
                        onClick={() => router.back()}
                        type="button"
                        className="flex items-center gap-2.5 text-neutral-400 hover:text-white transition-colors cursor-pointer font-bold focus:outline-none text-left w-max whitespace-nowrap"
                    >
                        <LuMoveLeft className="h-3 w-3 shrink-0" />
                        <span>[ RETREAT_NODE ]</span>
                    </button>

                    <Link
                        href="/"
                        className="block text-emerald-400 hover:text-emerald-300 transition-colors font-bold w-max whitespace-nowrap"
                    >
                        <span>[ RETURN_GRID ]</span>
                    </Link>
                </div>
            </main>

            {/* Bottom Structural Info Footer */}
            <footer className="w-full max-w-4xl mx-auto flex items-center justify-between text-[8px] xs:text-[9px] text-neutral-700 tracking-wider uppercase font-bold shrink-0 z-10 gap-2">
                <span className="truncate">CLEARANCE_LOST</span>
                <span className="shrink-0">0x00404_VOID</span>
            </footer>
        </div>
    );
};

export default NotFound;