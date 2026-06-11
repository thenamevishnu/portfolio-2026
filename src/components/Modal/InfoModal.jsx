"use client";
import { useEffect, useRef } from "react";

export const ReviewInfoModal = ({ selectedReviewInfo, setSelectedReviewInfo }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (selectedReviewInfo) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [selectedReviewInfo]);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setSelectedReviewInfo(null);
        }
    };

    useEffect(() => {
        if (selectedReviewInfo) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [selectedReviewInfo, setSelectedReviewInfo]);

    if (!selectedReviewInfo) return null;

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        }).toUpperCase();
    };

    const formattedCreatedDate = formatDate(selectedReviewInfo?.createdAt);
    const formattedUpdatedDate = formatDate(selectedReviewInfo?.updatedAt);

    const isEdited = selectedReviewInfo?.createdAt && selectedReviewInfo?.updatedAt
        ? new Date(selectedReviewInfo.createdAt).getTime() !== new Date(selectedReviewInfo.updatedAt).getTime()
        : false;

    const rating = Math.max(0, Math.min(5, Number(selectedReviewInfo?.rating) || 0));
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-neutral-950/85 backdrop-blur-sm transition-opacity duration-300"
                onClick={() => setSelectedReviewInfo(null)}
            />

            <div
                ref={modalRef}
                className="relative w-full max-w-md max-h-[calc(100vh-1rem)] overflow-y-auto rounded-xl border border-neutral-900 bg-neutral-950 p-2.5 xs:p-6 sm:p-8 text-center shadow-2xl transition-all duration-300 scrollbar-none"
            >
                <div className="relative z-10 flex items-center gap-2 p-3 xxs:p-1 text-left border-b border-neutral-900 pb-1.5 mb-2 xs:pb-4 xs:mb-4">
                    <div className="rounded-full flex w-14 shrink-0 items-center justify-center bg-neutral-900 border border-neutral-800 p-0.5">
                        {selectedReviewInfo?.picture ? (
                            <img
                                src={selectedReviewInfo.picture}
                                alt={selectedReviewInfo?.name || "User"}
                                className="rounded-full shrink-0 object-cover"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-neutral-800 flex items-center justify-center text-[10px] xs:text-sm font-bold text-neutral-400">
                                {selectedReviewInfo?.name?.charAt(0) || "U"}
                            </div>
                        )}
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="text-[12px] xs:text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                                Review Information
                            </h3>
                            <span className="text-[8px] xs:text-[10px] font-bold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 px-1 py-0.5 rounded border border-emerald-500/20 block leading-none">
                                Spotlight
                            </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 font-light mt-1 hidden xs:block">
                            Full testimonial details provided by the verified client below.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 text-left border border-neutral-900/80 bg-neutral-900/10 rounded-lg p-2 xs:p-4 space-y-2 xs:space-y-4">

                    <div className="flex flex-row items-center justify-between gap-2 border-b border-neutral-900/60 pb-1.5 xs:pb-3">
                        <div className="min-w-0">
                            <span className="text-[12px] xs:text-sm sm:text-base font-semibold text-neutral-200 block truncate leading-tight">
                                {selectedReviewInfo?.name}
                            </span>
                            {selectedReviewInfo?.uid && (
                                <span className="text-[8px] xs:text-[10px] font-mono text-neutral-500 block truncate mt-0.5">
                                    UID: {selectedReviewInfo.uid}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-1 bg-neutral-900/60 px-1.5 py-0.5 rounded border border-neutral-800/80 shrink-0">
                            <div className="flex items-center gap-0.5 text-emerald-400">
                                {[...Array(fullStars)].map((_, i) => (
                                    <svg key={`full-${i}`} fill="currentColor" viewBox="0 0 20 20" className="w-2.5 h-2.5 xs:w-3.5 xs:h-3.5">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                {hasHalfStar && (
                                    <svg viewBox="0 0 20 20" className="w-2.5 h-2.5 xs:w-3.5 xs:h-3.5 text-emerald-400">
                                        <defs>
                                            <linearGradient id="halfStarGrad">
                                                <stop offset="50%" stopColor="currentColor" />
                                                <stop offset="50%" stopColor="#262626" />
                                            </linearGradient>
                                        </defs>
                                        <path fill="url(#halfStarGrad)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                )}
                                {[...Array(emptyStars)].map((_, i) => (
                                    <svg key={`empty-${i}`} fill="currentColor" viewBox="0 0 20 20" className="w-2.5 h-2.5 xs:w-3.5 xs:h-3.5 text-neutral-800">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-[9px] xs:text-[11px] font-extrabold text-neutral-400">
                                {rating.toFixed(1)}
                            </span>
                        </div>
                    </div>

                    <p className="text-[11px] xs:text-xs sm:text-sm text-neutral-300 font-light italic leading-normal xs:leading-relaxed wrap-break-word whitespace-pre-line">
                        "{selectedReviewInfo?.description}"
                    </p>

                    <div className="flex flex-col gap-0.5 border-t border-neutral-900/50 pt-1.5 text-[8px] xs:text-[10px] text-neutral-500 font-medium">
                        {formattedCreatedDate && (
                            <div>
                                <span className="text-neutral-600">POSTED:</span> {formattedCreatedDate}
                            </div>
                        )}
                        {isEdited && formattedUpdatedDate && (
                            <div>
                                <span className="text-emerald-500/80">EDITED:</span> {formattedUpdatedDate}
                            </div>
                        )}
                    </div>
                </div>

                <div className="relative z-10 mt-2 p-2 xs:mt-5 w-full">
                    <button
                        onClick={() => setSelectedReviewInfo(null)}
                        type="button"
                        className="w-full h-9 shrink-0 inline-flex items-center justify-center rounded-lg bg-white text-[11px] xs:text-xs font-semibold text-neutral-950 hover:bg-neutral-200 active:scale-[0.98] transition-all duration-150 shadow-md cursor-pointer"
                    >
                        Close Window
                    </button>
                </div>
            </div>
        </div>
    );
};