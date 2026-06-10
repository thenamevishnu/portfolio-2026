"use client";
import { useMe } from "@/providers/DataProvider";

export const Expertise = () => {

    const myInfo = useMe();

    return (
        <section id="expertise" className="relative bg-neutral-950 text-neutral-200 px-4 sm:px-6 py-24 border-t border-neutral-900">
            <div className="mx-auto max-w-[1400px]">

                <div className="mb-16 text-center">
                    <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
                        {myInfo.expertise.label}
                    </span>
                    <h2 className="text-3xl xs:text-4xl font-bold tracking-tight text-white mt-1">
                        {myInfo.expertise.title}
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-md mx-auto font-light">
                        {myInfo.expertise.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                    {myInfo.expertise.list.map((block, blockIndex) => (
                        <div
                            key={blockIndex}
                            className="group rounded-2xl border border-neutral-900 bg-neutral-900/10 p-6 sm:p-8 transition-all duration-300 hover:border-neutral-800 hover:bg-neutral-900/30"
                        >
                            <div className="mb-6 border-b border-neutral-900 pb-4">
                                <span className="text-[10px] font-semibold tracking-widest text-neutral-500 uppercase">
                                    {block.subtitle}
                                </span>
                                <h3 className="text-lg font-bold text-white mt-0.5 group-hover:text-emerald-400 transition-colors duration-300">
                                    {block.category}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-2.5">
                                {block.skills.map((skill, skillIndex) => (
                                    <span
                                        key={skillIndex}
                                        className="inline-flex items-center rounded-lg border border-neutral-900 bg-neutral-900/40 px-3 py-1.5 text-xs text-neutral-400 font-medium transition-colors duration-300 group-hover:border-neutral-800 group-hover:text-neutral-200"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};