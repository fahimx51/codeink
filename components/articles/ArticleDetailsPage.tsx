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
    MessageSquare
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
}>;

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

export default function ArticleDetailsPage({
    article,
    comments,
    totalLikes = 0,
    isLiked = false,
}: ArticleDetailsPageProps) {

    const [copied, setCopied] = React.useState(false);

    // Format created date
    const formattedDate = article.createdAt
        ? new Date(article.createdAt).toLocaleDateString('en-US', {
            month: 'long',
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
                <div className="container mx-auto flex h-14 sm:h-16 max-w-5xl items-center justify-between px-3 sm:px-6">
                    <Link
                        href="/articles"
                        className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Back to Articles
                    </Link>

                    <button
                        onClick={handleShare}
                        className="inline-flex items-center gap-1 sm:gap-1.5 rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors"
                    >
                        {copied ? <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> : <Share2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
                        {copied ? 'Copied!' : 'Share'}
                    </button>
                </div>
            </div>

            {/* Article Main Container */}
            <main className="container mx-auto max-w-4xl px-3 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-16">
                <article className="space-y-5 sm:space-y-8">
                    {/* Header Section */}
                    <header className="space-y-3 sm:space-y-6">
                        {/* Category Badge */}
                        {article.category && (
                            <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold text-blue-600 dark:text-blue-400">
                                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                {article.category}
                            </span>
                        )}

                        {/* Title */}
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-snug sm:leading-tight">
                            {article.title}
                        </h1>

                        {/* Author & Meta Row */}
                        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 border-y border-border/50 py-3 sm:py-4">
                            {/* Author Info */}
                            <div className="flex items-center gap-2.5 sm:gap-3">
                                {article.author?.imageUrl ? (
                                    <img
                                        src={article.author.imageUrl}
                                        alt={article.author.name || 'Author'}
                                        className="h-8 w-8 sm:h-11 sm:w-11 rounded-full object-cover border border-blue-500/20"
                                    />
                                ) : (
                                    <div className="flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20">
                                        <User className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </div>
                                )}
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                                        {article.author?.name || 'Anonymous'}
                                    </p>
                                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                                        {article.author?.email}
                                    </p>
                                </div>
                            </div>

                            {/* Date & Reading Time */}
                            <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs md:text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
                                    <span>{formattedDate}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
                                    <span>5 min read</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image Section */}
                    {article.featuredImage && (
                        <div className="relative w-full h-[200px] xs:h-[260px] sm:h-[380px] md:h-[450px] overflow-hidden rounded-xl sm:rounded-2xl border border-blue-500/15 shadow-sm">
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
                                    className="ql-editor !p-0 prose prose-blue dark:prose-invert max-w-none text-foreground/90 text-sm sm:text-base md:text-lg leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                />
                            </div>
                        ) : (
                            <p className="text-muted-foreground italic text-sm sm:text-base">No content available.</p>
                        )}
                    </div>

                    {/* Action Bar & Comments Footer */}
                    <footer className="pt-6 sm:pt-10 border-t border-border/50 space-y-10">
                        {/* Article Actions */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-xl border border-blue-500/15 bg-blue-500/5 p-3 sm:p-4">
                            <div className="flex items-center justify-stretch gap-2 sm:gap-3">
                                {/* Interactive Like Button */}
                                <LikeBtn
                                    articleId={article.id}
                                    totalLikes={totalLikes}
                                    isLiked={isLiked}
                                />

                                <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-lg border border-border/60 bg-background px-3.5 py-2 text-xs sm:text-sm font-medium hover:bg-accent transition-colors">
                                    <Bookmark className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
                                    <span>Save</span>
                                </button>
                            </div>

                            <button
                                onClick={handleShare}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                            >
                                <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                {copied ? 'Link Copied!' : 'Share Article'}
                            </button>
                        </div>

                        {/* Comments Section */}
                        <section className="space-y-6 pt-2">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-blue-500" />
                                <h2 className="text-lg sm:text-xl font-bold">
                                    Comments ({comments?.length || 0})
                                </h2>
                            </div>

                            {/* Comment Box */}
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