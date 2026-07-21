"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const HeroSection = () => {
    return (
        <section className="relative min-h-[600px] w-full overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Background Glow Overlay */}
            <div className="absolute inset-0 pointer-events-none before:absolute before:left-1/4 before:top-0 before:h-[500px] before:w-[500px] before:rounded-full before:bg-gradient-to-r before:from-blue-500/20 before:to-sky-400/20 dark:before:from-blue-600/20 dark:before:to-sky-500/20 before:blur-3xl" />

            <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 py-24 md:flex-row md:py-32">
                {/* Left Content Area */}
                <div className="flex-1 space-y-8 text-center md:text-left">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
                        Explore the World Through
                        <span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent">
                            {" "}
                            Words
                        </span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300 md:text-xl">
                        Discover insightful articles, thought-provoking stories, and expert
                        perspectives on technology, lifestyle, and innovation.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col items-center gap-4 sm:flex-row md:justify-start">
                        <Button
                            size="lg"
                            className="rounded-full px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            Start Reading
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full px-8 py-6 text-lg border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
                        >
                            Explore Topics
                        </Button>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800 md:max-w-md">
                        <div className="space-y-1">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1K+</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">Published Articles</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">50+</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">Expert Writers</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">10M+</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">Monthly Readers</div>
                        </div>
                    </div>
                </div>

                {/* Right Image Container */}
                <div className="mt-12 flex-1 md:mt-0">
                    <div
                        className={cn(
                            "relative mx-auto h-72 w-72 sm:h-80 sm:w-80 rounded-2xl overflow-hidden",
                            "bg-white/50 dark:bg-slate-900/50",
                            "border border-blue-500/20 dark:border-blue-400/20 backdrop-blur-lg",
                            "shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/20"
                        )}
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1485988412941-77a35537dae4?q=80&w=2992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Illustration for the blog"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;