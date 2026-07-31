'use client';

import ArticleSearchInput from '@/components/articles/ArticleSearchInput';
import FooterMain from '@/components/home/footer/FooterMain';
import Navbar from '@/components/home/header/Navbar';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

// Example dummy articles data
const SAMPLE_ARTICLES = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Article Title ${i + 1}`,
    description: `This is a short summary for article number ${i + 1}. Learn more about modern web development.`,
    category: i % 2 === 0 ? 'Tutorial' : 'Insight',
    date: 'Jul 30, 2026',
}));

const ITEMS_PER_PAGE = 6;

export default function ArticlePage() {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total pages
    const totalPages = Math.ceil(SAMPLE_ARTICLES.length / ITEMS_PER_PAGE);

    // Get current page items
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentArticles = SAMPLE_ARTICLES.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Handlers
    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
            {/* Sticky Glassmorphic Navbar */}
            <Navbar />

            <main className="flex-1">
                {/* Hero / Header Section */}
                <section className="relative w-full py-16 md:py-24 overflow-hidden border-b border-blue-500/15">
                    {/* Background Grid Pattern & Ambient Glow */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_40%,#000_70%,transparent_100%)]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-[130px] pointer-events-none" />

                    <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                        {/* Pill Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 backdrop-blur-md">
                            <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                            <span>Knowledge Base & Insights</span>
                        </div>

                        {/* Main Page Title */}
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                            Explore Our{" "}
                            <span className="relative inline-block text-blue-600 dark:text-blue-400">
                                Articles
                                <svg
                                    className="absolute -bottom-2 left-0 w-full h-3 text-blue-500/30"
                                    viewBox="0 0 100 20"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        d="M0,15 Q50,5 100,15"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
                            Discover tutorials, web development insights, and stories handpicked for tech enthusiasts and creators.
                        </p>

                        {/* Search Bar Container */}
                        <div className="pt-4 max-w-2xl mx-auto">
                            <ArticleSearchInput />
                        </div>
                    </div>
                </section>

                {/* Articles Section */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
                    {/* Articles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentArticles.map((article) => (
                            <div
                                key={article.id}
                                className="p-6 rounded-xl border border-blue-500/15 bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
                            >
                                <span className="text-xs font-medium text-blue-500 uppercase tracking-wider">
                                    {article.category}
                                </span>
                                <h3 className="text-xl font-bold mt-2 mb-2">{article.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{article.description}</p>
                                <span className="text-xs text-muted-foreground">{article.date}</span>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-center gap-2 pt-6">
                        {/* Previous Button */}
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-blue-500/20 text-sm font-medium transition-colors hover:bg-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, index) => {
                            const pageNumber = index + 1;
                            const isActive = pageNumber === currentPage;
                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => handlePageClick(pageNumber)}
                                    className={`h-9 w-9 rounded-lg text-sm font-semibold transition-colors ${isActive
                                            ? 'bg-blue-600 text-white dark:bg-blue-500'
                                            : 'border border-blue-500/20 hover:bg-blue-500/10'
                                        }`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}

                        {/* Next Button */}
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-blue-500/20 text-sm font-medium transition-colors hover:bg-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </section>
            </main>

            <FooterMain />
        </div>
    );
}