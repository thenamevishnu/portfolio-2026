"use client";
import { useMe } from "@/providers/DataProvider";
import { useState } from "react";

export const Experience = () => {

    const myInfo = useMe();
    const [openId, setOpenId] = useState("exp-1");

    return (
        <section id="experience" className="relative bg-neutral-950 text-neutral-200 px-4 sm:px-6 py-24 border-t border-neutral-900">
            <div className="mx-auto max-w-[992px]"> {/* Maxes out neatly at your lg breakpoint */}

                {/* Section Heading */}
                <div className="mb-12 text-center sm:text-left">
                    <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">{myInfo.experience.label}</span>
                    <h2 className="text-2xl xs:text-3xl font-bold tracking-tight text-white mt-1 sm:text-4xl">{myInfo.experience.title}</h2>
                </div>

                {/* Accordion Container */}
                <div className="space-y-4">
                    {myInfo.experience.list.map((exp) => {
                        const isOpen = openId === exp.id;
                        return (
                            <div
                                key={exp.id}
                                className={`rounded-xl border transition-all duration-300 ${isOpen ? "border-neutral-800 bg-neutral-900/40" : "border-neutral-900 bg-transparent"}`}
                            >
                                <button
                                    onClick={() => setOpenId(isOpen ? null : exp.id)}
                                    className="flex w-full items-center justify-between p-4 sm:p-6 text-left focus:outline-none"
                                >
                                    {/* Grid layout inside accordion trigger to prevent overlap on tiny devices */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 w-full pr-4 gap-1 md:gap-4 items-start md:items-center">
                                        <div className="md:col-span-2">
                                            <h3 className="text-base sm:text-grid font-semibold text-white">{exp.role}</h3>
                                            <p className="text-xs sm:text-sm text-neutral-400">
                                                {exp.company} <span className="text-neutral-700 mx-1">|</span> {exp.location}
                                            </p>
                                        </div>
                                        <div className="text-xs text-neutral-500 md:text-right mt-1 md:mt-0">
                                            {exp.period}
                                        </div>
                                    </div>

                                    {/* Icon Indicator */}
                                    <div className="relative flex h-5 w-5 shrink-0 items-center justify-center text-neutral-400">
                                        <span className={`absolute h-0.5 w-3.5 bg-current transform transition-transform ${isOpen ? "rotate-0" : ""}`} />
                                        <span className={`absolute h-3.5 w-0.5 bg-current transform transition-transform ${isOpen ? "scale-0" : "scale-100"}`} />
                                    </div>
                                </button>

                                {/* Body Content */}
                                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                    <div className="overflow-hidden">
                                        <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-neutral-900/50">
                                            <ul className="list-disc list-outside ml-4 space-y-2 text-xs sm:text-sm text-neutral-400">
                                                {exp.description.map((bullet, index) => (
                                                    <li key={index} className="marker:text-emerald-500/70">{bullet}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};