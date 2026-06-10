"use client";
import { useMe } from "@/providers/DataProvider";
import { LuLink2 } from "react-icons/lu"

export const Projects = () => {
    
    const myInfo = useMe();

    return (
        <section id="portfolio" className="relative bg-neutral-950 text-neutral-200 px-4 sm:px-6 py-24 border-t border-neutral-900">
            <div className="mx-auto max-w-[1200px]">

                <div className="mb-16 text-center">
                    <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
                        {myInfo.portfolio.label}
                    </span>
                    <h2 className="text-3xl xs:text-4xl font-bold tracking-tight text-white mt-1">
                        {myInfo.portfolio.title}
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-md mx-auto font-light">
                        {myInfo.portfolio.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {myInfo.portfolio.list.map((project, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col justify-between rounded-2xl border border-neutral-900 bg-neutral-900/20 p-6 sm:p-8 transition-all duration-300 hover:border-neutral-800 hover:bg-neutral-900/40"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-4 mb-4">
                                    <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                                        {project.category}
                                    </span>

                                    <div className="text-neutral-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-emerald-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                        </svg>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-emerald-400">
                                    {project.title}
                                </h3>

                                <p className="mt-3 text-sm text-neutral-400 font-light leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            <div className="mt-8">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="rounded-md border border-neutral-800/60 bg-neutral-900/50 px-2.5 py-1 text-[11px] font-medium text-neutral-400"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    {
                                        project.link.map((item, idx) => {
                                            
                                            return <a
                                                key={idx}
                                                href={item.link}
                                                target="_blank"
                                                className="inline-flex items-center text-xs font-semibold tracking-wider text-white uppercase border border-neutral-800 p-2 rounded-full transition-colors duration-300 hover:border-emerald-400 hover:text-emerald-400"
                                            >
                                                <span className="flex gap-1 items-center">{item.type} <LuLink2 /></span>
                                            </a>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};