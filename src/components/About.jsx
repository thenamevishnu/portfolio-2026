"use client";
import { useMe } from "@/providers/DataProvider";

export const About = () => {

    const myInfo = useMe();

    return (
        <section id="about" className="relative bg-neutral-950 text-neutral-200 px-4 sm:px-6 py-24 border-t border-neutral-900">
            <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">

                <div className="space-y-6 max-w-xl mx-auto md:mx-0 text-center md:text-left">
                    <div>
                        <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
                            {myInfo.about.label}
                        </span>
                        <h2 className="text-3xl xs:text-4xl font-bold tracking-tight text-white mt-1">
                            {myInfo.about.title}
                        </h2>
                    </div>

                    <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                        {myInfo.about.description1}
                    </p>

                    <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                        {myInfo.about.description2}
                    </p>

                    <div className="pt-2">
                        <a
                            href={myInfo.about.button.link}
                            className="inline-flex items-center text-xs font-semibold tracking-wider text-white uppercase border-b border-neutral-800 pb-1 transition-colors duration-300 hover:border-emerald-400 hover:text-emerald-400"
                        >
                            {myInfo.about.button.label}
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 max-w-md w-full mx-auto md:mx-0">
                    {myInfo.stat.map((stat, i) => (
                        <div
                            key={i}
                            className="group flex items-center justify-between p-6 rounded-2xl border border-neutral-900 bg-neutral-900/10 transition-all duration-300 hover:border-neutral-800 hover:bg-neutral-900/30"
                        >
                            <span className="text-xs font-medium text-neutral-400 tracking-wide transition-colors group-hover:text-neutral-200">
                                {stat.label}
                            </span>

                            <span className="text-2xl font-extrabold text-white tracking-tight font-mono group-hover:text-emerald-400 transition-colors duration-300">
                                {stat.value}
                            </span>
                        </div>
                    ))}

                    <div className="p-5 rounded-2xl border border-neutral-900/50 bg-neutral-950 text-[11px] text-neutral-500 font-light leading-relaxed text-center md:text-left">
                        Focused on performance, user access standards, and modular architecture.
                    </div>
                </div>

            </div>
        </section>
    );
};