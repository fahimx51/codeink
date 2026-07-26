"use client";

import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Heart } from "lucide-react";

export default function FooterMain() {
    return (
        <footer className="relative w-full border-t border-blue-500/15 bg-background text-foreground transition-colors duration-300 overflow-hidden">

            {/* Ambient Background Grid & Top Subtle Glow */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-blue-500/10 dark:border-blue-500/15">

                    {/* Brand Info & Newsletter (Spans 5 Columns on Desktop) */}
                    <div className="lg:col-span-5 space-y-6">
                        <Link href="/" className="inline-block">
                            <Logo />
                        </Link>

                        <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
                            Discover insightful articles, expert perspectives, and modern web development tutorials. Built for thinkers and creators.
                        </p>

                        {/* Newsletter Signup Form */}
                        <div className="space-y-3 pt-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                Join our newsletter
                            </p>
                            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
                                <Input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="rounded-full bg-background/80 border-blue-500/20 focus-visible:ring-blue-500 text-xs sm:text-sm h-10"
                                />
                                <Button
                                    type="submit"
                                    size="sm"
                                    className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shrink-0 px-4 h-10 shadow-md shadow-blue-500/20 dark:bg-blue-500 dark:hover:bg-blue-600"
                                >
                                    <span>Subscribe</span>
                                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Navigation Links (Spans 7 Columns on Desktop) */}
                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">

                        {/* Column 1: Main Pages */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold tracking-tight text-foreground">Navigation</h4>
                            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                                <li>
                                    <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
                                </li>
                                <li>
                                    <Link href="/articles" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Articles</Link>
                                </li>
                                <li>
                                    <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link>
                                </li>
                                <li>
                                    <Link href="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dashboard</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 2: Categories */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold tracking-tight text-foreground">Categories</h4>
                            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                                <li>
                                    <Link href="/articles?category=Web%20Dev" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Web Development</Link>
                                </li>
                                <li>
                                    <Link href="/articles?category=Technology" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Technology</Link>
                                </li>
                                <li>
                                    <Link href="/articles?category=Programming" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Programming</Link>
                                </li>
                                <li>
                                    <Link href="/articles?category=Design" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">UI/UX Design</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3: Legal & Help */}
                        <div className="space-y-4 col-span-2 sm:col-span-1">
                            <h4 className="text-sm font-bold tracking-tight text-foreground">Legal & Help</h4>
                            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                                <li>
                                    <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact Support</Link>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>

                {/* Bottom Bar (Copyright & Social Icons) */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <p className="flex items-center gap-1 text-center sm:text-left">
                        © {new Date().getFullYear()} Boipoka. All rights reserved. Crafted with{" "}
                        <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 inline" />
                    </p>
                </div>

            </div>
        </footer>
    );
}