'use client';

import React from 'react';
import Link from 'next/link';

import {
    ArrowLeft,
    Calendar,
    Clock,
    Share2,
    Bookmark,
    User,
    Sparkles,
    Check,
    MessageSquare,
    Eye
} from 'lucide-react';

// Import Quill theme styles
import 'react-quill-new/dist/quill.snow.css';
import { Prisma } from '@/app/generated/prisma/client';
import CommentInput from './CommentInput';
import CommentList from './comment-list';
import LikeBtn from '../shared/LikeBtn';

export type ArticleWithAuthor = Prisma.ArticleGetPayload<{
    include: {
        author: {
            select: {
                name: true;
                email: true;
                imageUrl: true;
            };
        };
    };
}> & {
    views?: number;
};

export type CommentWithAuthor = Prisma.CommentGetPayload<{
    include: {
        author: {
            select: {
                name: true;
                email: true;
                imageUrl: true;
            };
        };
    };
}>;

type ArticleDetailsPageProps = {
    article: ArticleWithAuthor;
    comments: CommentWithAuthor[];
    totalLikes: number;
    isLiked: boolean;
};

// Helper to estimate read time from HTML content
function calculateReadTime(htmlContent?: string): number {
    if (!htmlContent) return 1;
    const plainText = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = plainText ? plainText.split(/\s+/).length : 0;
    return Math.max(1, Math.ceil(wordCount / 200));
}

export default function ArticleDetailsPage({
    article,
    comments,
    totalLikes = 0,
    isLiked = false,
}: ArticleDetailsPageProps) {

    const [copied, setCopied] = React.useState(false);

    // Dynamic views count fallback
    const viewsCount = article.views ?? 0;

    // Calculate dynamic read time
    const readTime = calculateReadTime(article.content);

    // Format created date
    const formattedDate = article.createdAt
        ? new Date(article.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
        : 'Recent';

    // Share link handler
    const handleShare = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            {/* Top Bar Navigation */}
            <div className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
                <div className="container mx-auto flex h-14 sm:h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
                    <Link
                        href="/articles"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Articles</span>
                    </Link>

                    <button
                        onClick={handleShare}
                        className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-all cursor-pointer"
                    >
                        {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
                        {copied ? 'Copied!' : 'Share'}
                    </button>
                </div>
            </div>

            {/* Article Main Container */}
            <main className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-14">
                <article className="space-y-6 sm:space-y-10">

                    {/* Header Section */}
                    <header className="space-y-4 sm:space-y-6">
                        {/* Category Badge */}
                        {article.category && (
                            <div className="flex items-center">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 backdrop-blur-sm">
                                    {article.category}
                                </span>
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight sm:leading-tight text-foreground">
                            {article.title}
                        </h1>

                        {/* Author & Meta Info Box */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-blue-500/10 dark:border-blue-500/15 bg-card/60 p-4 sm:p-5 backdrop-blur-sm shadow-sm">
                            {/* Author Info */}
                            <div className="flex items-center gap-3">
                                {article.author?.imageUrl ? (
                                    <img
                                        src={article.author.imageUrl}
                                        alt={article.author.name || 'Author'}
                                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover ring-2 ring-blue-500/20 border border-border"
                                    />
                                ) : (
                                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20">
                                        <User className="h-5 w-5" />
                                    </div>
                                )}
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-foreground truncate">
                                        {article.author?.name || 'Anonymous'}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {article.author?.email}
                                    </p>
                                </div>
                            </div>

                            {/* Date, Read Time & Views Count */}
                            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground font-medium pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40">
                                <div className="flex items-center gap-1.5" title="Published Date">
                                    <Calendar className="h-4 w-4 text-blue-500" />
                                    <span>{formattedDate}</span>
                                </div>
                                <span className="h-1 w-1 rounded-full bg-muted-foreground/40 hidden xs:inline-block" />
                                <div className="flex items-center gap-1.5" title="Estimated Reading Time">
                                    <Clock className="h-4 w-4 text-blue-500" />
                                    <span>{readTime} min read</span>
                                </div>
                                <span className="h-1 w-1 rounded-full bg-muted-foreground/40 hidden xs:inline-block" />
                                <div className="flex items-center gap-1.5 text-foreground/80 font-semibold" title="Total Views">
                                    <Eye className="h-4 w-4 text-blue-500" />
                                    <span>{viewsCount.toLocaleString()} views</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image Section */}
                    {article.featuredImage && (
                        <div className="relative w-full h-[220px] xs:h-[280px] sm:h-[400px] md:h-[480px] overflow-hidden rounded-2xl border border-blue-500/15 shadow-md bg-muted">
                            <img
                                src={article.featuredImage}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Article Body Content */}
                    <div className="py-2 sm:py-4">
                        {article.content ? (
                            <div className="ql-container ql-snow !border-0">
                                <div
                                    className="ql-editor !p-0 prose prose-blue dark:prose-invert max-w-none text-foreground/90 text-base sm:text-lg leading-relaxed sm:leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                />
                            </div>
                        ) : (
                            <p className="text-muted-foreground italic text-base">No content available.</p>
                        )}
                    </div>

                    {/* Action Bar & Comments Footer */}
                    <footer className="pt-8 border-t border-border/60 space-y-10">
                        {/* Article Actions Container */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-blue-500/15 bg-blue-500/5 dark:bg-neutral-900/40 p-4 sm:p-5 backdrop-blur-md">
                            <div className="flex items-center gap-2 sm:gap-3">
                                {/* Interactive Like Button */}
                                <LikeBtn
                                    articleId={article.id}
                                    totalLikes={totalLikes}
                                    isLiked={isLiked}
                                />

                                <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border border-border/60 bg-background/80 px-4 py-2.5 text-xs sm:text-sm font-medium hover:bg-accent transition-colors cursor-pointer">
                                    <Bookmark className="h-4 w-4 text-blue-500" />
                                    <span>Bookmark</span>
                                </button>
                            </div>

                            <button
                                onClick={handleShare}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all cursor-pointer shadow-md shadow-blue-500/20"
                            >
                                {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                                <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
                            </button>
                        </div>

                        {/* Comments Section */}
                        <section className="space-y-6 pt-2">
                            <div className="flex items-center gap-2.5 border-b border-border/40 pb-3">
                                <MessageSquare className="h-5 w-5 text-blue-500" />
                                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                                    Comments ({comments?.length || 0})
                                </h2>
                            </div>

                            {/* Comment Input */}
                            <CommentInput articleId={article.id} />

                            {/* Comment List */}
                            <CommentList comments={comments} />
                        </section>
                    </footer>
                </article>
            </main>
        </div>
    );
}