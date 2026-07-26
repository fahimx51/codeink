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
import { Pencil, Trash2, Loader2, ArrowRight } from "lucide-react";
import { deleteArticle } from "@/actions/delete-article";

type Article = {
    id: string;
    title: string;
    isPublished: boolean;
    comments: { id: string }[];
    createdAt: Date | string;
};

type RecentArticlesProps = {
    articles: Article[];
};

const RecentArticles = ({ articles }: RecentArticlesProps) => {
    return (
        <Card className="mb-8 w-full max-w-full overflow-hidden border border-border/60">
            <CardHeader className="p-4 sm:p-6 bg-muted/20 border-b border-border/40">
                <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-base sm:text-xl font-bold tracking-tight">
                        Recent Articles
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="font-semibold text-muted-foreground hover:text-foreground shrink-0 text-xs sm:text-sm px-3 gap-1.5 transition-colors"
                        nativeButton={false}
                        render={<Link href="/dashboard/articles" />}
                    >
                        <span>View All</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                </div>
            </CardHeader>

            {!articles?.length ? (
                <CardContent className="p-8 text-center text-sm text-muted-foreground">
                    No articles found.
                </CardContent>
            ) : (
                <CardContent className="p-0">
                    <div className="w-full min-w-0 overflow-x-auto">
                        <Table className="w-full text-xs sm:text-sm">
                            <TableHeader className="bg-muted/30">
                                <TableRow className="hover:bg-transparent border-b border-border/60">
                                    <TableHead className="px-4 py-3 align-middle text-center font-bold text-foreground uppercase tracking-wider text-[11px] sm:text-xs">
                                        Title
                                    </TableHead>
                                    <TableHead className="px-4 py-3 align-middle text-center font-bold text-foreground uppercase tracking-wider text-[11px] sm:text-xs">
                                        Status
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell px-4 py-3 align-middle text-center font-bold text-foreground uppercase tracking-wider text-[11px] sm:text-xs">
                                        Comments
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell px-4 py-3 align-middle text-center font-bold text-foreground uppercase tracking-wider text-[11px] sm:text-xs">
                                        Date
                                    </TableHead>
                                    <TableHead className="px-4 py-3 align-middle text-center font-bold text-foreground uppercase tracking-wider text-[11px] sm:text-xs">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {articles.slice(0, 5).map((article) => (
                                    <TableRow key={article.id} className="transition-colors hover:bg-muted/40 border-b border-border/40">
                                        <TableCell className="font-semibold px-4 py-3.5 align-middle text-center max-w-[140px] xs:max-w-[200px] sm:max-w-none truncate">
                                            {article.title}
                                        </TableCell>
                                        <TableCell className="px-4 py-3.5 align-middle text-center">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold border ${article.isPublished
                                                        ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20"
                                                        : "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20"
                                                    }`}
                                            >
                                                {article.isPublished ? "Published" : "Draft"}
                                            </span>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell px-4 py-3.5 align-middle text-center font-medium text-muted-foreground">
                                            {article.comments.length}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell text-xs sm:text-sm px-4 py-3.5 align-middle text-center text-muted-foreground font-medium">
                                            {new Date(article.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric"
                                            })}
                                        </TableCell>
                                        <TableCell className="px-4 py-3.5 align-middle text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 px-2.5 font-semibold text-xs border-border/80 shadow-2xs hover:bg-muted hover:text-foreground transition-all gap-1.5"
                                                    nativeButton={false}
                                                    render={
                                                        <Link href={`/dashboard/articles/${article.id}/edit`} />
                                                    }
                                                >
                                                    <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                                                    <span>Edit</span>
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

const DeleteButton = ({ articleId }: DeleteButtonProps) => {
    const [isPending, startTransition] = useTransition();

    return (
        <form
            action={() => {
                startTransition(async () => {
                    await deleteArticle(articleId);
                });
            }}
            className="inline-flex items-center"
        >
            <Button
                disabled={isPending}
                variant="destructive"
                size="sm"
                type="submit"
                className="h-8 w-[92px] justify-center font-semibold text-xs shadow-2xs shrink-0 gap-1.5 transition-all"
            >
                {isPending ? (
                    <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Deleting</span>
                    </>
                ) : (
                    <>
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                    </>
                )}
            </Button>
        </form>
    );
};