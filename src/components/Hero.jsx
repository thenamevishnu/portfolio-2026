"use client";

import { useMe } from "@/providers/DataProvider";

export const Hero = () => {

    const myInfo = useMe();

    return (
        <section id="home" className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-neutral-950 text-neutral-200 px-4 sm:px-6 py-12 md:py-24">
            {/* Background Matrix Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />

            {/* Centered layout wrapper */}
            <div className="relative z-10 mx-auto max-w-2xl text-center flex flex-col items-center">

                {/* Badge */}
                <span className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-3 py-1 text-[11px] font-medium tracking-wider text-emerald-400 uppercase mb-4 sm:mb-6 w-fit">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    {myInfo.hero.label}
                </span>

                {/* Heading */}
                <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                    {myInfo.hero.title.split(" ").slice(0, 3).join(" ")}&nbsp;
                    
                    <span className="bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                        {myInfo.hero.title.split(" ").slice(3).join(" ")}
                    </span>
                </h1>

                {/* Paragraph Description */}
                <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-neutral-400 font-light leading-relaxed max-w-md sm:max-w-xl">
                        {myInfo.hero.description}
                </p>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <a href={myInfo.hero.buttons[0].link} className="inline-flex h-11 sm:h-12 items-center justify-center rounded-xl bg-white px-5 sm:px-6 text-sm font-semibold text-neutral-950 transition-transform active:scale-95">
                        {myInfo.hero.buttons[0].label}
                    </a>
                    <a href={myInfo.hero.buttons[1].link} className="inline-flex h-11 sm:h-12 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/50 px-5 sm:px-6 text-sm font-semibold text-neutral-300 transition-colors hover:bg-neutral-900">
                        {myInfo.hero.buttons[1].label}
                    </a>
                </div>

            </div>
        </section>
    );
};