"use client";

import React, { useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import Link from "next/link";

type Article = {
    id: string;
    title: string;
    status: "Published" | "Draft";
    comments: { id: string }[];
    createdAt: string;
};

const mockArticles: Article[] = [
    {
        id: "1",
        title: "Getting Started with Next.js App Router",
        status: "Published",
        comments: [{ id: "c1" }, { id: "c2" }],
        createdAt: "2026-07-20T10:00:00Z",
    },
    {
        id: "2",
        title: "Mastering Tailwind CSS and DaisyUI",
        status: "Published",
        comments: [{ id: "c3" }],
        createdAt: "2026-07-18T14:30:00Z",
    },
    {
        id: "3",
        title: "Building Real-time Webhooks with Clerk",
        status: "Published",
        comments: [],
        createdAt: "2026-07-15T09:15:00Z",
    },
    {
        id: "4",
        title: "Prisma ORM Best Practices with PostgreSQL",
        status: "Published",
        comments: [{ id: "c4" }, { id: "c5" }, { id: "c6" }],
        createdAt: "2026-07-10T18:00:00Z",
    },
];

const deleteArticle = async (articleId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Deleted article with ID: ${articleId}`);
};

const RecentArticles = ({ articles = mockArticles }: { articles?: Article[] }) => {
    return (
        <Card className="mb-8 w-full max-w-full overflow-hidden">
            <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-base sm:text-xl">Recent Articles</CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground shrink-0 text-xs sm:text-sm px-2 sm:px-3"
                        nativeButton={false}
                        render={<Link href="/dashboard/articles" />}
                    >
                        View All →
                    </Button>
                </div>
            </CardHeader>

            {!articles.length ? (
                <CardContent className="p-4 sm:p-6 text-sm text-muted-foreground">
                    No articles found.
                </CardContent>
            ) : (
                <CardContent className="p-0 sm:p-6 sm:pt-0">
                    {/* Horizontal scroll container for small screens */}
                    <div className="w-full min-w-0 overflow-x-auto">
                        <Table className="w-full text-xs sm:text-sm">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="px-3 sm:px-4">Title</TableHead>
                                    <TableHead className="px-2 sm:px-4">Status</TableHead>
                                    <TableHead className="hidden sm:table-cell px-4">Comments</TableHead>
                                    <TableHead className="hidden md:table-cell px-4">Date</TableHead>
                                    <TableHead className="text-right sm:text-left px-3 sm:px-4">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {articles.slice(0, 5).map((article) => (
                                    <TableRow key={article.id}>
                                        <TableCell className="font-medium px-3 sm:px-4 max-w-[120px] xs:max-w-[180px] sm:max-w-none truncate">
                                            {article.title}
                                        </TableCell>
                                        <TableCell className="px-2 sm:px-4">
                                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300">
                                                {article.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell px-4">
                                            {article.comments.length}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell text-xs sm:text-sm px-4">
                                            {new Date(article.createdAt).toDateString()}
                                        </TableCell>
                                        <TableCell className="px-3 sm:px-4">
                                            <div className="flex items-center justify-end sm:justify-start gap-1 sm:gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 px-2 text-xs sm:text-sm"
                                                    nativeButton={false}
                                                    render={
                                                        <Link href={`/dashboard/articles/${article.id}/edit`} />
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                                <DeleteButton articleId={article.id} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            )}
        </Card>
    );
};

export default RecentArticles;

type DeleteButtonProps = {
    articleId: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ articleId }) => {
    const [isPending, startTransition] = useTransition();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                startTransition(async () => {
                    await deleteArticle(articleId);
                });
            }}
        >
            <Button
                disabled={isPending}
                variant="ghost"
                size="sm"
                type="submit"
                className="h-8 px-2 text-xs sm:text-sm"
            >
                {isPending ? "Deleting..." : "Delete"}
            </Button>
        </form>
    );
};