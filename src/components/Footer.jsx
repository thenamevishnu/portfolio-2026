"use client";
import { useMe } from "@/providers/DataProvider";

export const Footer = () => {

    const myInfo = useMe();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900 px-4 sm:px-6 py-8">
            <div className="mx-auto max-w-[1400px] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">

                {/* Copyright */}
                <div className="text-neutral-500 order-2 sm:order-1 text-center sm:text-left">
                    &copy; {currentYear} Personal Portfolio. All rights reserved.
                </div>

                {/* Social Links */}
                <div className="order-1 sm:order-2">
                    <ul className="flex items-center gap-6">
                        {myInfo.social.list.map((social) => (
                            <li key={social.name}>
                                <a
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors duration-200"
                                >
                                    {social.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </footer>
    );
};