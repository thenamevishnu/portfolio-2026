"use client";
import { Header } from "@/components/Header";
import { useReviews } from "@/providers/DataProvider";
import { add_user, remove_user } from "@/store/user.slice";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import moment from "moment";
import { Fragment, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const ReviewsSection = () => {
    const { reviews, setReviews } = useReviews();
    const loggedUser = useSelector((state) => state.user);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeMenuIndex, setActiveMenuIndex] = useState(null);
    const menuRef = useRef(null);

    const [reviewObj, setReviewObj] = useState({
        uid: "",
        name: "",
        email: "",
        picture: "",
        rating: 5,
        description: ""
    });

    const dispatch = useDispatch();

    // Sync state accurately when loggedUser changes
    useEffect(() => {
        if (loggedUser) {
            setReviewObj(prev => ({
                ...prev,
                uid: loggedUser.uid || "",
                name: loggedUser.name || "",
                email: loggedUser.email || "",
                picture: loggedUser.picture || ""
            }));
        }
    }, [loggedUser]);

    // Close action menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenuIndex(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isDrawerOpen]);

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async ({ access_token }) => {
            setIsLoggingIn(false);
            try {
                const { data } = await axios.get(process.env.NEXT_PUBLIC_GOOGLE_PROFILE_API, {
                    headers: { Authorization: `Bearer ${access_token}` }
                });
                const { sub: uid, name, email, picture } = data;
                dispatch(add_user({ uid, name, email, picture }));
            } catch (error) {
                console.error("Google Login Error:", error);
            }
        },
        onNonOAuthError: (error) => {
            setIsLoggingIn(false);
            console.error("Non-OAuth Error:", error);
        }
    });

    const signOut = () => {
        dispatch(remove_user());
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!reviewObj.description) return;
        try {
            const response = await axios.post(`/api/reviews`, reviewObj);
            const uidIndex = reviews.findIndex(review => review.uid === reviewObj.uid);
            if (uidIndex === -1) {
                setReviews([...reviews, response.data.review]);
            } else {
                const updatedReviews = [...reviews];
                updatedReviews[uidIndex] = response.data.review;
                setReviews(updatedReviews);
            }
            setIsDrawerOpen(false);
            setReviewObj(prev => ({ ...prev, description: "", rating: 5 }));
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    const handleFormChange = (e) => {
        setReviewObj({
            ...reviewObj,
            [e.target.name]: e.target.value
        });
    };

    // Card Action Handlers
    const handleEdit = (review, index) => {
        setActiveMenuIndex(null);
        setReviewObj({
            ...reviewObj,
            rating: review.rating,
            description: review.description
        });
        setIsDrawerOpen(true);
    };

    const handleDelete = async (review) => {
        setActiveMenuIndex(null);
        if (confirm("Are you sure you want to delete this review?")) {
            try {
                await axios.delete(`/api/reviews`, { params: { id: review.uid } });
                setReviews(reviews.filter((r) => r.uid !== review.uid));
            } catch (error) {
                console.error("Error deleting review:", error);
            }
        }
    };

    const handleInfo = (review) => {
        setActiveMenuIndex(null);
        alert(`Review Metadata:\nUser ID: ${review.uid}\nSubmitted via OAuth Console.`);
    };

    return (
        <Fragment>
            <Header />
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                <section className="relative px-[4%] xs:px-6 py-8 sm:py-24 z-10 bg-neutral-950 text-neutral-200">
                    <div className="mx-auto max-w-[1200px] space-y-8 sm:space-y-16">

                        <div className="text-center max-w-2xl mx-auto px-1">
                            <span className="text-[9px] sm:text-xs font-semibold tracking-widest text-emerald-400 uppercase block">Reviews</span>
                            <h2 className="text-[7.5vw] xs:text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mt-1">Client Feedback</h2>
                            <p className="mt-1.5 text-[11px] sm:text-sm text-neutral-400 font-light leading-relaxed">
                                Read authentic project breakdowns recorded by clients worldwide.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3.5 xs:gap-6 lg:gap-8">
                            {reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className="group relative flex flex-col justify-between rounded-xl border border-neutral-900 bg-neutral-900/20 p-4 xs:p-6 sm:p-8 transition-all duration-500 hover:border-emerald-500/20 hover:bg-neutral-900/40"
                                >
                                    {/* background layer with pointer-events-none ensures clicks bypass overlay safely */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.04)_0%,transparent_60%)] pointer-events-none" />

                                    <div className="relative z-10 min-w-0">
                                        <div className="flex items-center justify-between gap-4 mb-3">
                                            <div className="flex items-center gap-0.5">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <svg key={i} className="w-5 h-5 text-emerald-400 fill-current shrink-0" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                                {review.createdAt !== review.updatedAt && (
                                                    <span className="text-[8px] font-mono text-neutral-600 ml-1 select-none">[edited]</span>
                                                )}
                                            </div>

                                            {/* Bumped to relative z-30 to ensure full interactivity over layouts */}
                                            <div className="relative z-30 flex items-center gap-3">
                                                <span className="font-mono text-[9px] font-medium text-neutral-700 tracking-wider">
                                                    // 0{index + 1}
                                                </span>
                                                <div className="relative">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setActiveMenuIndex(activeMenuIndex === index ? null : index);
                                                        }}
                                                        className="p-1 rounded-md cursor-pointer text-neutral-500 hover:text-white hover:bg-neutral-900 transition-colors focus:outline-none"
                                                    >
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                                        </svg>
                                                    </button>

                                                    {/* Contextual Dropdown */}
                                                    {activeMenuIndex === index && (
                                                        <div
                                                            ref={menuRef}
                                                            className="absolute right-5 top-0 mt-1 w-28 rounded-lg border border-neutral-800 bg-neutral-950 p-1 shadow-2xl z-50"
                                                        >
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); handleInfo(review); }}
                                                                className="flex w-full cursor-pointer items-center px-2.5 py-1.5 text-[11px] font-medium text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-md transition-colors"
                                                            >
                                                                Info
                                                            </button>
                                                            {
                                                                review.uid == loggedUser?.uid && <Fragment>
                                                                    <button
                                                                        onClick={(e) => { e.stopPropagation(); handleEdit(review); }}
                                                                        className="flex w-full cursor-pointer items-center px-2.5 py-1.5 text-[11px] font-medium text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-md transition-colors"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <div className="my-1 border-t border-neutral-900" />
                                                                    <button
                                                                        onClick={(e) => { e.stopPropagation(); handleDelete(review); }}
                                                                        className="flex w-full cursor-pointer items-center px-2.5 py-1.5 text-[11px] font-medium text-red-400 hover:text-red-100 hover:bg-red-950/40 rounded-md transition-colors"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </Fragment>
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-[11px] sm:text-sm text-neutral-400 font-light leading-relaxed wrap-break-word line-clamp-5 sm:line-clamp-none">
                                            {review.description}
                                        </p>
                                    </div>

                                    <div className="relative mt-4 flex items-center gap-2.5 pt-3 border-t border-neutral-900/60 min-w-0">
                                        <div className="h-7 w-7 shrink-0 rounded-full overflow-hidden border border-neutral-800 bg-neutral-950 p-px">
                                            <img src={review.picture} alt={review.name} className="h-full w-full rounded-full object-cover filter grayscale opacity-80" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="text-[11px] font-bold text-white truncate">{review.name}</h4>
                                            <span className="text-[8px] font-medium text-neutral-500 block mt-0.5 uppercase tracking-wider">
                                                {moment(review.createdAt).fromNow()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ADAPTIVE ACTION TRIGGER (FAB) */}
                <div className="fixed bottom-4 right-4 z-40">
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        type="button"
                        className="group relative flex h-10 w-10 xs:w-auto xs:h-11 items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-neutral-900/90 p-0 xs:px-4 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-emerald-400 active:scale-95"
                    >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-neutral-950 font-black text-xs shrink-0">
                            <svg className="h-3 w-3 stroke-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </span>
                        <span className="hidden xs:inline pr-1">Write Review</span>
                    </button>
                </div>

                {/* FIXED SLIDING SHEET CONTAINER */}
                <div className={`fixed inset-0 z-50 transition-all duration-500 ${isDrawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
                    <div
                        onClick={() => setIsDrawerOpen(false)}
                        className={`absolute inset-0 bg-neutral-950/70 backdrop-blur-sm transition-opacity duration-500 ${isDrawerOpen ? "opacity-100" : "opacity-0"}`}
                    />

                    <div className={`absolute top-0 right-0 h-full w-full sm:max-w-md bg-neutral-950 border-l border-neutral-900 shadow-2xl transition-transform duration-500 ease-in-out transform flex flex-col justify-between ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
                        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-5 border-b border-neutral-900 shrink-0">
                            <div>
                                <h3 className="text-xs sm:text-base font-bold text-white tracking-wide">Submit Experience</h3>
                                <p className="text-[8px] sm:text-[10px] text-neutral-500 font-light mt-0.5 uppercase tracking-widest">Client Console</p>
                            </div>
                            <button
                                onClick={() => setIsDrawerOpen(false)}
                                className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-lg border border-neutral-900 text-neutral-400 hover:text-white transition-colors"
                            >
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                            {!loggedUser?.email ? (
                                <div className="text-center py-6 h-full flex flex-col justify-center items-center space-y-3">
                                    <div className="h-9 w-9 rounded-xl bg-neutral-900/50 border border-neutral-900 flex items-center justify-center text-emerald-400 shadow-inner">
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xs font-bold text-white">Verification Required</h4>
                                    <p className="text-[10px] text-neutral-400 max-w-[200px] mx-auto leading-normal font-light">
                                        Authenticate via Google to register your review specifications securely.
                                    </p>
                                    <button
                                        onClick={() => { setIsLoggingIn(true); handleGoogleLogin(); }}
                                        disabled={isLoggingIn}
                                        className="w-full max-w-[200px] mt-2 inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 text-[10px] font-semibold text-neutral-200 transition-all hover:bg-neutral-800"
                                    >
                                        {isLoggingIn ? (
                                            <div className="h-3 w-3 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24">
                                                    <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.33 0 3.33 2.69 1.455 6.614l3.81 3.151z" />
                                                    <path fill="#34A853" d="M16.04 15.345c-1.036.736-2.4 1.173-4.04 1.173a7.08 7.08 0 01-6.75-4.855L1.414 14.8C3.273 18.673 7.29 21.364 12 21.364c3.155 0 6.018-1.055 8.164-2.873l-4.124-3.146z" />
                                                    <path fill="#4285F4" d="M23.491 12.273c0-.818-.073-1.609-.209-2.364H12v4.51h6.464a5.533 5.533 0 01-2.4 3.636l4.123 3.145c2.41-2.227 3.804-5.509 3.804-9.291z" />
                                                    <path fill="#FBBC05" d="M5.25 11.664a7.13 7.13 0 010-2.273L1.44 6.24A11.947 11.947 0 000 12c0 2.082.536 4.045 1.464 5.764l3.786-3.1a7.062 7.062 0 010-2.999z" />
                                                </svg>
                                                Sign In
                                            </>
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmitReview} className="space-y-4 h-full flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between rounded-xl border border-neutral-900 bg-neutral-900/10 p-2 min-w-0">
                                            <div className="flex items-center gap-2 min-w-0">
                                                <img src={loggedUser.picture} alt={loggedUser.name} className="h-5 w-5 shrink-0 xs:h-8 xs:w-8 rounded-full border border-neutral-800" />
                                                <div className="min-w-0">
                                                    <span className="text-[10px] xs:text-sm font-bold text-white block truncate leading-tight">{loggedUser.name}</span>
                                                    <span className="text-[8px] xs:text-xs text-neutral-500 block truncate leading-tight">{loggedUser.email}</span>
                                                </div>
                                            </div>
                                            <button type="button" onClick={signOut} className="text-[8px] font-bold text-neutral-500 hover:text-red-400 tracking-wider uppercase pl-1.5 shrink-0">Exit</button>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[8px] sm:text-[10px] font-bold tracking-wider text-neutral-500 uppercase">Rating Score</label>
                                            <div className="flex items-center gap-1.5">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        type="button"
                                                        key={star}
                                                        onClick={() => setReviewObj(prev => ({ ...prev, rating: star }))}
                                                        className="hover:scale-110 cursor-pointer transition-transform focus:outline-none"
                                                    >
                                                        <svg className={`w-5 h-5 transition-colors duration-200 ${star <= reviewObj.rating ? "text-emerald-400" : "text-neutral-900"}`} fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label htmlFor="drawer-review-desc" className="text-[8px] sm:text-[10px] font-bold tracking-wider text-neutral-500 uppercase">Detailed Feedback</label>
                                            <textarea
                                                id="drawer-review-desc"
                                                rows={4}
                                                required
                                                name="description"
                                                value={reviewObj.description}
                                                onChange={handleFormChange}
                                                placeholder="Share your technical experience..."
                                                className="w-full bg-neutral-950 border border-neutral-900 rounded-xl p-3 text-sm xs:text-base text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-800 transition-colors resize-none leading-normal"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full h-9 shrink-0 sm:h-11 inline-flex items-center justify-center rounded-xl bg-white text-[10px] sm:text-xs font-semibold text-neutral-950 hover:bg-neutral-200 active:scale-98 transition-all duration-300 shadow-xl"
                                    >
                                        Publish Review
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

            </GoogleOAuthProvider>
        </Fragment>
    );
};

export default ReviewsSection;