'use client';

import React, { useTransition } from 'react';
import ArticleCard, { Article } from '@/components/articles/ArticleCard';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ArticlesGridProps {
    articles: Article[];
    currentPage: number;
    totalPages: number;
}

export default function ArticlesGrid({ articles, currentPage, totalPages }: ArticlesGridProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    // Handle page changes smoothly with loading state
    const handlePageChange = (newPage: number) => {
        startTransition(() => {
            router.push(`/articles?page=${newPage}`);
        });
    };

    return (
        <div className="space-y-10">
            {/* Simple Loading Spinner */}
            {isPending ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <p className="text-sm font-medium">Loading articles...</p>
                </div>
            ) : articles.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                    <p className="text-lg font-medium">No articles found.</p>
                </div>
            ) : (
                /* Articles Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage <= 1 || isPending}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-blue-500/20 text-sm font-medium transition-colors hover:bg-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => {
                        const pageNumber = index + 1;
                        const isActive = pageNumber === currentPage;
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                disabled={isPending}
                                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${isActive
                                    ? 'bg-blue-600 text-white dark:bg-blue-500'
                                    : 'border border-blue-500/20 hover:bg-blue-500/10'
                                    }`}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages || isPending}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-blue-500/20 text-sm font-medium transition-colors hover:bg-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            )}
        </div>
    );
}