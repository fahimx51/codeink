import ArticleSearchInput from '@/components/articles/ArticleSearchInput';
import ArticlesGrid from '@/components/articles/ArticlesGrid';
import FooterMain from '@/components/home/footer/FooterMain';
import Navbar from '@/components/home/header/Navbar';
import { prisma } from '@/lib/prisma';
import { BookOpen } from 'lucide-react';
import React from 'react';

const PAGE_SIZE = 6;

async function getPaginatedArticles(page: number) {
    try {
        const skip = (page - 1) * PAGE_SIZE;

        // Run query and total count in parallel using a transaction
        const [articles, totalArticles] = await prisma.$transaction([
            prisma.article.findMany({
                take: PAGE_SIZE, // LIMIT
                skip: skip,      // OFFSET
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    author: {
                        select: {
                            name: true,
                            imageUrl: true,
                        },
                    },
                    _count: {
                        select: {
                            comments: true,
                            likes: true,
                        },
                    },
                },
            }),
            prisma.article.count(), // Needed to calculate total pages
        ]);

        const totalPages = Math.ceil(totalArticles / PAGE_SIZE) || 1;

        return { articles, totalPages };
    } catch (error) {
        console.error("Error fetching articles from DB:", error);
        return { articles: [], totalPages: 1 };
    }
}

interface PageProps {
    searchParams: Promise<{ page?: string }>;
}

export default async function ArticlePage({ searchParams }: PageProps) {
    // Read page number from URL query params (e.g. /articles?page=2)
    const resolvedParams = await searchParams;
    const currentPage = Math.max(1, Number(resolvedParams.page) || 1);

    // Fetch ONLY 6 articles for the current page
    const { articles, totalPages } = await getPaginatedArticles(currentPage);

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
            <Navbar />

            <main className="flex-1">
                {/* Hero / Header Section */}
                <section className="relative w-full py-16 md:py-24 overflow-hidden border-b border-blue-500/15">
                    <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 backdrop-blur-md">
                            <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                            <span>Knowledge Base & Insights</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                            Explore Our{" "}
                            <span className="relative inline-block text-blue-600 dark:text-blue-400">
                                Articles
                            </span>
                        </h1>

                        <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
                            Discover tutorials, web development insights, and stories handpicked for tech enthusiasts and creators.
                        </p>

                        <div className="pt-4 max-w-2xl mx-auto">
                            <ArticleSearchInput />
                        </div>
                    </div>
                </section>

                {/* Articles Section */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <ArticlesGrid
                        articles={articles}
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                </section>
            </main>

            <FooterMain />
        </div>
    );
}