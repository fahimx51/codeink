"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Sparkles, TrendingUp } from "lucide-react";

const HeroSection = () => {
    return (
        <section className="relative w-full overflow-hidden bg-background text-foreground py-12 sm:py-20 lg:py-24 transition-colors duration-300">
            
            {/* Background Grid Pattern + Subtle Top Center Glow */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* Left Content Column */}
                    <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">

                        {/* Main Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
                            Explore the world through{" "}
                            <span className="relative inline-block text-blue-600 dark:text-blue-400">
                                meaningful words
                                <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-500/30" viewBox="0 0 100 20" preserveAspectRatio="none">
                                    <path d="M0,15 Q50,5 100,15" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                            Discover insightful articles, thought-provoking stories, and expert perspectives on technology, programming, and web development.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto rounded-full px-8 py-6 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/30 dark:bg-blue-500 dark:hover:bg-blue-600"
                            >
                                <Link href="#featured-articles" className="flex items-center justify-center gap-2">
                                    Start Reading
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto rounded-full px-8 py-6 text-base font-medium border-border hover:bg-accent hover:text-accent-foreground"
                            >
                                <Link href="/articles">Explore Topics</Link>
                            </Button>
                        </div>

                        {/* Stats Bar */}
                        <div className="pt-6 border-t border-border/60 w-full max-w-md">
                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold text-foreground">1K+</div>
                                    <div className="text-xs sm:text-sm text-muted-foreground">Articles</div>
                                </div>
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold text-foreground">50+</div>
                                    <div className="text-xs sm:text-sm text-muted-foreground">Writers</div>
                                </div>
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold text-foreground">10M+</div>
                                    <div className="text-xs sm:text-sm text-muted-foreground">Readers</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Card / Graphic Column (Only visible on large screens) */}
                    <div className="hidden lg:col-span-5 lg:flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-[360px]">
                            
                            {/* Subtle Ambient Background Ring */}
                            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-blue-500/20 to-sky-500/0 blur-xl" />

                            {/* Main Card */}
                            <div className="relative rounded-2xl border border-border/80 bg-card p-3 shadow-xl">
                                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-muted">
                                    <Image
                                        src="https://images.unsplash.com/photo-1558174685-430919a96c8d?q=80&w=1471&auto=format&fit=crop"
                                        alt="Reading Illustration"
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="360px"
                                    />
                                    
                                    {/* Overlay Gradient on Image */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                    {/* Floating Topic Chips */}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <span className="inline-flex items-center gap-1 rounded-md bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md border border-white/10">
                                            <TrendingUp className="h-3 w-3 text-blue-400" /> Tech
                                        </span>
                                        <span className="rounded-md bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md border border-white/10">
                                            Coding
                                        </span>
                                    </div>

                                    {/* Card Footer Banner */}
                                    <div className="absolute bottom-3 left-3 right-3 rounded-lg border border-white/15 bg-white/10 dark:bg-black/40 p-3 backdrop-blur-md">
                                        <div className="flex items-center gap-3 text-white">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-600">
                                                <BookOpen className="h-4 w-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-white/70">Featured Post</p>
                                                <p className="text-sm font-semibold truncate">Modern Web Development in 2026</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;