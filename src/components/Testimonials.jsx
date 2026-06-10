"use client";
import { useMe, useReviews } from "@/providers/DataProvider";
import moment from "moment";
import { useRouter } from "next/navigation";

export const Testimonials = () => {
    const myInfo = useMe();
    const { reviews } = useReviews();
    const router = useRouter();

    const handleNavigateToReviews = () => router.push("/reviews");

    return (
        <section id="reviews" className="relative bg-neutral-950 text-neutral-200 px-[4%] xs:px-6 py-12 sm:py-24 border-t border-neutral-900">
            <div className="mx-auto max-w-[1200px]">

                <div className="mb-10 sm:mb-16 text-center">
                    <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-emerald-400 uppercase block">
                        {myInfo.reviews.label}
                    </span>
                    <h2 className="text-[7.5vw] xs:text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mt-1">
                        {myInfo.reviews.title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    {reviews.slice(0, 4).map((item) => (
                        <div
                            key={item.uid}
                            className="group relative flex flex-col justify-between rounded-2xl border border-neutral-900 bg-neutral-900/20 p-4 xs:p-6 sm:p-8 transition-all duration-300 hover:border-neutral-800 hover:bg-neutral-900/40"
                        >
                            <div>
                                <div className="flex items-center gap-0.5 sm:gap-1 mb-[4vw] sm:mb-5">
                                    {[...Array(item.rating)].map((_, starIndex) => (
                                        <svg
                                            key={starIndex}
                                            className="w-5 h-5 text-emerald-400 shrink-0"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-light leading-relaxed italic">
                                    "{item.description}"
                                </p>
                            </div>

                            <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4 pt-4 border-t border-neutral-900/60 min-w-0">
                                <div className="h-9 w-9 sm:h-11 sm:w-11 shrink-0 rounded-full overflow-hidden border border-neutral-800 bg-neutral-900">
                                    <img
                                        src={item.picture}
                                        alt={item.name}
                                        className="h-full w-full object-cover filter grayscale transition-all duration-300 group-hover:grayscale-0"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                                        {item.name}
                                    </h4>

                                    <span className="text-[10px] sm:text-[11px] font-medium text-neutral-500 block mt-0.5 truncate">
                                        {moment(item.createdAt).fromNow()}
                                    </span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                <div className="mt-10 sm:mt-16 flex justify-center w-full px-4">
                    <button
                        type="button"
                        onClick={handleNavigateToReviews}
                        className="group relative inline-flex h-10 sm:h-11 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/30 px-6 sm:px-8 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-neutral-400 transition-all duration-300 hover:border-emerald-500/30 hover:bg-neutral-900/60 hover:text-white active:scale-95 w-full max-w-[200px] xs:w-auto"
                    >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />

                        <span className="relative z-10 flex items-center gap-2">
                            Show More
                            <svg className="h-3 w-3 text-neutral-500 group-hover:text-emerald-400 transition-colors transform group-hover:translate-y-0.5 duration-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </span>
                    </button>
                </div>

            </div>
        </section>
    );
};