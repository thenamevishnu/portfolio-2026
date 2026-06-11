import { usePathname, useRouter } from "next/navigation";
import { LuArrowLeft, LuGamepad2 } from "react-icons/lu";

export const FloatingGameButton = () => {

    const router = useRouter();
    const path = usePathname();

    if (path == "/reviews") return null;

    return <div className="fixed bottom-2 right-2 z-50 select-none antialiased">
        <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping pointer-events-none scale-110" />
            <button
                onClick={() => router.push(path == "/dino-game" ? "/" : "/dino-game")}
                type="button"
                className="relative flex h-10 w-10 xs:h-11 xs:w-11 items-center justify-center rounded-full border border-emerald-500/30 bg-neutral-950 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)] backdrop-blur-md transition-all duration-300 hover:border-emerald-400 active:scale-95 cursor-pointer focus:outline-none z-10"
            >
                {path == "/dino-game" ? <LuArrowLeft className="w-4 h-4 stroke-[2.2]"/> : <LuGamepad2 className="h-4 w-4 stroke-[2.2]" />}
            </button>
        </div>
    </div>
};