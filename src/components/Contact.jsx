"use client";
import { useState } from "react";
import { useMe } from "@/providers/DataProvider";

export const Contact = () => {
    const myInfo = useMe();
    const [pending, setPending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPending(true);
        setTimeout(() => setPending(false), 2000);
    };

    return (
        <section
            id="contact"
            className="relative bg-neutral-950 text-neutral-200 px-[4%] xs:px-6 py-12 sm:py-24 border-t border-neutral-900"
        >
            <div className="mx-auto max-w-[1200px]">

                {/* Section Header */}
                <div className="mb-10 sm:mb-16 text-center">
                    <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-emerald-400 uppercase block">
                        {myInfo.contact.label}
                    </span>
                    {/* Fluid sizing prevents heading breakage on 240px wide devices */}
                    <h2 className="text-[7.5vw] xs:text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mt-1">
                        {myInfo.contact.title}
                    </h2>
                </div>

                {/* Content Grid Stack */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start">

                    {/* Information Context Panel */}
                    <div className="space-y-3 w-full max-w-xl mx-auto md:mx-0">
                        <h3 className="text-lg sm:text-xl font-bold text-white">Contact Information</h3>
                        <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                            Reach out directly through email. I typically respond within 24 business hours.
                        </p>

                        {/* Interactive Info Cards Layout */}
                        {/* - Switches to single columns on tiny screens to protect layout constraints */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5 sm:gap-4 pt-3 w-full">

                            {/* Email Card Anchor */}
                            <a
                                href={`mailto:${myInfo.contact.info.email}`}
                                className="group flex items-center gap-3 rounded-xl border border-neutral-900 bg-neutral-900/20 p-3 sm:p-4 transition-all duration-300 hover:border-neutral-800 hover:bg-neutral-900/40 min-w-0"
                            >
                                <div className="flex h-[9vw] w-[9vw] min-h-[36px] min-w-[36px] max-h-10 max-w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-neutral-400 group-hover:text-emerald-400 transition-colors">
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <span className="text-[9px] font-semibold tracking-wider text-neutral-500 uppercase block">Email Me</span>
                                    <span className="text-xs sm:text-sm font-medium text-neutral-200 group-hover:text-white transition-colors block truncate">
                                        {myInfo.contact.info.email}
                                    </span>
                                </div>
                            </a>

                            {/* Phone Card Anchor */}
                            <a
                                href={`tel:${myInfo.contact.info.phone}`}
                                className="group flex items-center gap-3 rounded-xl border border-neutral-900 bg-neutral-900/20 p-3 sm:p-4 transition-all duration-300 hover:border-neutral-800 hover:bg-neutral-900/40 min-w-0"
                            >
                                <div className="flex h-[9vw] w-[9vw] min-h-[36px] min-w-[36px] max-h-10 max-w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-neutral-400 group-hover:text-emerald-400 transition-colors">
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293a1.125 1.125 0 0 1-1.21.38 12.035 12.035 0 0 1-7.143-7.143 1.125 1.125 0 0 1 .38-1.21l1.293-.97a1.125 1.125 0 0 0 .417-1.173L7.213 3.102A1.125 1.125 0 0 0 6.122 2.25H4.75A2.25 2.25 0 0 0 2.5 4.5v2.25Z" />
                                    </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <span className="text-[9px] font-semibold tracking-wider text-neutral-500 uppercase block">Call Me</span>
                                    <span className="text-xs sm:text-sm font-medium text-neutral-200 group-hover:text-white transition-colors block truncate">
                                        {myInfo.contact.info.phone}
                                    </span>
                                </div>
                            </a>

                        </div>
                    </div>

                    {/* Form Component Container */}
                    {/* - Padding scales tightly from p-4 up to standard p-8 metrics to give text elements max width */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-3.5 w-full max-w-xl mx-auto md:mx-0 bg-neutral-900/10 border border-neutral-900 p-4 xs:p-6 sm:p-8 rounded-2xl"
                    >
                        {/* Name and Email input row splits only on screens above 'xs' breakpoint */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3.5">
                            <div className="space-y-1">
                                <label htmlFor="name" className="text-[10px] font-semibold tracking-wide text-neutral-400 uppercase">Name</label>
                                <input type="text" id="name" required placeholder="John Doe" className="w-full h-10 sm:h-11 bg-neutral-950 border border-neutral-900 rounded-xl px-3.5 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 transition-colors" />
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="email" className="text-[10px] font-semibold tracking-wide text-neutral-400 uppercase">Email</label>
                                <input type="email" id="email" required placeholder="john@example.com" className="w-full h-10 sm:h-11 bg-neutral-950 border border-neutral-900 rounded-xl px-3.5 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="message" className="text-[10px] font-semibold tracking-wide text-neutral-400 uppercase">Message</label>
                            <textarea id="message" rows={4}  required placeholder="Tell me about your project ideas..." className="w-full bg-neutral-950 border border-neutral-900 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 transition-colors resize-none" ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={pending}
                            className="w-full h-11 sm:h-12 inline-flex items-center justify-center rounded-xl bg-white text-xs sm:text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed pt-0.5"
                        >
                            {pending ? <div className="h-4 w-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" /> : "Send Message"}
                        </button>
                    </form>

                </div>
            </div>
        </section>
    );
};