import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Heart, MessageSquare, ArrowUpRight, Eye } from "lucide-react";

export type Article = {
    id: string;
    title: string;
    content: string;
    category: string;
    views: number;
    featuredImage: string;
    createdAt: Date | string;
    author: {
        name: string;
        imageUrl?: string;
    };
    _count?: {
        comments?: number;
        likes?: number;
    };
};

interface ArticleCardProps {
    article: Article;
}

// Helper to clean Quill HTML into plain text
function getPlainText(htmlContent: string): string {
    if (!htmlContent) return "";

    // 1. Remove HTML tags
    let text = htmlContent.replace(/<[^>]*>/g, " ");

    // 2. Fix common HTML entities
    text = text
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'");

    // 3. Remove extra double spaces
    return text.replace(/\s+/g, " ").trim();
}

export default function ArticleCard({ article }: ArticleCardProps) {
    // Format date
    const formattedDate = new Date(article.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    // Get clean text version of Quill HTML
    const plainTextContent = getPlainText(article.content);

    // Estimate reading time based on clean word count
    const wordCount = plainTextContent ? plainTextContent.split(/\s+/).length : 0;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    // Fallback for views count
    const viewsCount = article.views ?? 0;

    return (
        <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-blue-500/10 dark:border-blue-500/15 bg-card/80 text-card-foreground backdrop-blur-sm shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/40 hover:shadow-[0_10px_30px_rgba(37,99,235,0.12)] dark:hover:shadow-[0_10px_35px_rgba(59,130,246,0.18)]">

            {/* Top Glowing Edge Accent on Hover */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30" />

            {/* Featured Image Container */}
            <div className="relative h-52 w-full overflow-hidden bg-muted">
                <Image
                    src={article.featuredImage || "/placeholder-image.png"}
                    alt={article.title}
                    fill
                    className="object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Gradient Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                {/* Top Overlay Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                    <span className="rounded-full bg-background/80 dark:bg-neutral-900/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-md border border-blue-500/20 shadow-sm transition-colors duration-300 group-hover:border-blue-500/40">
                        {article.category}
                    </span>

                    {/* Corner Action Button */}
                    <div className="h-8 w-8 rounded-full bg-background/90 dark:bg-neutral-900/90 text-foreground backdrop-blur-md border border-blue-500/20 flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                        <ArrowUpRight className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>
            </div>

            {/* Card Body */}
            <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div className="space-y-3">

                    {/* Meta: Date, Read Time & Views */}
                    <div className="flex items-center gap-2.5 text-xs text-muted-foreground font-medium flex-wrap">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-blue-500" />
                            <time>{formattedDate}</time>
                        </div>
                        <span className="h-1 w-1 rounded-full bg-blue-500/40" />
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-blue-500" />
                            <span>{readTime} min read</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="line-clamp-2 text-xl font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        <Link href={`/articles/${article.id}`}>
                            <span className="absolute inset-0 z-10" />
                            {article.title}
                        </Link>
                    </h3>

                    {/* Content Preview (Cleaned Plain Text) */}
                    <p className="line-clamp-2 text-sm text-muted-foreground/90 leading-relaxed">
                        {plainTextContent}
                    </p>
                </div>

                {/* Card Footer */}
                <div className="mt-6 pt-4 border-t border-blue-500/10 dark:border-blue-500/15 flex items-center justify-between text-xs text-muted-foreground">

                    {/* Author Info */}
                    <div className="flex items-center gap-2.5 z-20">
                        {article.author.imageUrl ? (
                            <Image
                                src={article.author.imageUrl}
                                alt={article.author.name}
                                width={28}
                                height={28}
                                className="h-7 w-7 rounded-full object-cover ring-2 ring-blue-500/20 border border-border"
                            />
                        ) : (
                            <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center font-bold text-white text-[11px] shadow-sm">
                                {article.author.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <span className="font-medium text-foreground/90 text-sm">{article.author.name}</span>
                    </div>

                    {/* Views, Likes & Comments Count */}
                    <div className="flex items-center gap-3 z-20 font-medium">
                        {/* Views */}
                        <div className="flex items-center gap-1 transition-colors hover:text-blue-500" title="Total Views">
                            <Eye className="h-3.5 w-3.5 text-muted-foreground/80 group-hover:text-blue-400 transition-colors" />
                            <span>{viewsCount}</span>
                        </div>

                        {/* Likes */}
                        {article._count?.likes !== undefined && (
                            <div className="flex items-center gap-1 transition-colors hover:text-red-500" title="Likes">
                                <Heart className="h-3.5 w-3.5 text-muted-foreground/80 group-hover:text-red-400 transition-colors" />
                                <span>{article._count.likes}</span>
                            </div>
                        )}

                        {/* Comments */}
                        {article._count?.comments !== undefined && (
                            <div className="flex items-center gap-1 transition-colors hover:text-blue-500" title="Comments">
                                <MessageSquare className="h-3.5 w-3.5 text-muted-foreground/80 group-hover:text-blue-400 transition-colors" />
                                <span>{article._count.comments}</span>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </article>
    );
}