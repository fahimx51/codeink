import { Sparkles, Flame } from "lucide-react";
import ArticleCard, { Article } from "./ArticleCard";
import { prisma } from "@/lib/prisma";

export default async function TopArticles() {
    const articles = await prisma.article.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            comments: true,
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true,
                },
            },
        },
    });

    if (!articles || articles.length === 0) {
        return (
            <section className="relative py-16 text-center overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <p className="relative z-10 text-muted-foreground dark:text-zinc-400">
                    No articles found.
                </p>
            </section>
        );
    }

    return (
        <section className="relative w-full py-12 md:py-16 overflow-hidden bg-background text-foreground transition-colors duration-300">

            {/* Background Grid Pattern & Blue Ambient Light (Matches Hero) */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-[130px] pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="mb-10 flex flex-col items-start justify-between gap-4 border-b border-blue-500/15 pb-6 dark:border-blue-500/20 sm:flex-row sm:items-end">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                            Top{" "}
                            <span className="relative inline-block text-blue-600 dark:text-blue-400">
                                Articles
                                <svg className="absolute -bottom-1.5 left-0 w-full h-2 text-blue-500/30" viewBox="0 0 100 20" preserveAspectRatio="none">
                                    <path d="M0,15 Q50,5 100,15" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h2>
                    </div>

                    <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
                        Handpicked stories with the highest engagement from our community.
                    </p>
                </div>

                {/* Responsive Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                    {articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>

            </div>
        </section>
    );
}