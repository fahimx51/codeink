import { FileText, MessageCircle, PlusCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import RecentArticles from "./RecentArticle";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Lock, ArrowLeft } from 'lucide-react';

export async function BlogDashboard() {

    const { userId } = await auth();

    if (!userId) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center px-4">
                <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
                    {/* Icon */}
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        <Lock className="h-6 w-6" />
                    </div>

                    {/* Text */}
                    <h2 className="text-xl font-bold">Sign in required</h2>
                    <p className="mt-2 text-xs text-muted-foreground">
                        Please log in to view and manage your dashboard.
                    </p>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-col gap-2">
                        <Link
                            href="/sign-in"
                            className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground py-1 transition-colors"
                        >
                            <ArrowLeft className="h-3 w-3" /> Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }


    const [articles, totalComments] = await Promise.all([
        prisma.article.findMany({
            where: {
                author: {
                    clerkUserId: userId,
                }
            },
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
        }),
        prisma.comment.count(),
    ]);


    return (
        <main className="flex-1 min-w-0 w-full p-4 sm:p-6 md:p-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                        Blog Dashboard
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Manage your content and analytics
                    </p>
                </div>

                <Button
                    className="gap-2 w-full sm:w-auto shrink-0 justify-center"
                    nativeButton={false}
                    render={<Link href="/dashboard/articles/create" />}
                >
                    <PlusCircle className="h-4 w-4" />
                    <span>New Article</span>
                </Button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
                <Card className="min-w-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
                        <CardTitle className="text-sm font-medium">
                            Total Articles
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            +5 from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="min-w-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
                        <CardTitle className="text-sm font-medium">
                            Total Comments
                        </CardTitle>
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                        <div className="text-2xl font-bold">9</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            12 awaiting moderation
                        </p>
                    </CardContent>
                </Card>

                <Card className="min-w-0 md:col-span-2 lg:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
                        <CardTitle className="text-sm font-medium">
                            Avg. Reading Time
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                        <div className="text-2xl font-bold">4.2m</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            +0.8m from last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Articles */}
            <RecentArticles articles={articles} />
        </main>
    );
}