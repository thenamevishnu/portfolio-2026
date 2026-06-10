"use client";
import { useState } from "react";
import { useGlobalError, useMe } from "@/providers/DataProvider";
import axios from "axios";
import { regex } from "@/validations/regex";

export const Contact = () => {
    const myInfo = useMe();
    const [pending, setPending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [errorMessage, setErrorMessage] = useState({ name: "", email: "", message: "" });
    const { setGlobalError } = useGlobalError();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        const errors = { name: "", email: "", message: "" };
        let hasError = false;
        if (!regex.name.test(formData.name)) {
            errors.name = "Only letters, ', - and space are allowed.";
            hasError = true;
        }
        if (!regex.email.test(formData.email)) {
            errors.email = "Invalid email";
            hasError = true;
        }
        if (formData.message.length < 10) {
            errors.message = "Message should be at least 10 characters.";
            hasError = true;
        }
        if (hasError) {
            return setErrorMessage(errors);
        }
        setErrorMessage({ name: "", email: "", message: "" });
        setPending(true);
        try {
            const msg = `<b>👤 Message From: ${formData.name}\n\n📧 GMail: <code>${formData.email}</code>\n\n💬 MessageText: ${formData.message}</b>`
            await axios.get("/api/tg", {
                params: {
                    message: msg
                }
            });
            setFormData(prev => ({...prev, name: "", email: "", message: "" })); 
            setSuccess(true);
            setTimeout(() => setSuccess(false), 4000);
        } catch (error) {
            return setGlobalError({
                label: "Message Not Sent",
                title: "Unable to Send Your Message",
                description:
                    "We're unable to send your message at the moment. Please try again later or check your internet connection."
            });
        } finally {
            setPending(false);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errorMessage[name]) {
            setErrorMessage(prev => ({ ...prev, [name]: "" }));
        }
    };

    return (
        <section
            id="contact"
            className="relative bg-neutral-950 text-neutral-200 px-[4%] xs:px-6 py-12 sm:py-24 border-t border-neutral-900"
        >
            <div className="mx-auto max-w-[1200px]">

                <div className="mb-10 sm:mb-16 text-center">
                    <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-emerald-400 uppercase block">
                        {myInfo.contact.label}
                    </span>
                    <h2 className="text-[7.5vw] xs:text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mt-1">
                        {myInfo.contact.title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start">

                    <div className="space-y-3 w-full max-w-xl mx-auto md:mx-0">
                        <h3 className="text-lg sm:text-xl font-bold text-white">Contact Information</h3>
                        <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                            Reach out directly through email. I typically respond within 24 business hours.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5 sm:gap-4 pt-3 w-full">
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

                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="space-y-3.5 w-full max-w-xl mx-auto md:mx-0 bg-neutral-900/10 border border-neutral-900 p-4 xs:p-6 sm:p-8 rounded-2xl"
                    >
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3.5">
                            <div className="space-y-1">
                                <label htmlFor="name" className="text-[10px] font-semibold tracking-wide text-neutral-400 uppercase">Name</label>
                                <input type="text" name="name" onChange={handleChange} value={formData.name} id="name" placeholder="John Doe" className={`w-full h-10 sm:h-11 bg-neutral-950 border ${errorMessage.name ? 'border-red-500/50 focus:border-red-500' : 'border-neutral-900 focus:border-neutral-700'} rounded-xl px-3.5 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors`} />
                                {errorMessage.name && (
                                    <span className="text-[10px] text-red-400 tracking-wide block mt-0.5">{errorMessage.name}</span>
                                )}
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="email" className="text-[10px] font-semibold tracking-wide text-neutral-400 uppercase">Email</label>
                                <input type="email" name="email" onChange={handleChange} value={formData.email} id="email" placeholder="john@example.com" className={`w-full h-10 sm:h-11 bg-neutral-950 border ${errorMessage.email ? 'border-red-500/50 focus:border-red-500' : 'border-neutral-900 focus:border-neutral-700'} rounded-xl px-3.5 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors`} />
                                {errorMessage.email && (
                                    <span className="text-[10px] text-red-400 tracking-wide block mt-0.5">{errorMessage.email}</span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="message" className="text-[10px] font-semibold tracking-wide text-neutral-400 uppercase">Message</label>
                            <textarea id="message" name="message" onChange={handleChange} value={formData.message} rows={4} placeholder="Tell me about your project ideas..." className={`w-full bg-neutral-950 border ${errorMessage.message ? 'border-red-500/50 focus:border-red-500' : 'border-neutral-900 focus:border-neutral-700'} rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors resize-none`} ></textarea>
                            {errorMessage.message && (
                                <span className="text-[10px] text-red-400 tracking-wide block mt-0.5">{errorMessage.message}</span>
                            )}
                        </div>

                        {success && (
                            <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs text-emerald-400 transition-all duration-300">
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span>Your message has been sent successfully!</span>
                            </div>
                        )}

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