'use client';

import React from "react";
import { User } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CommentWithAuthor } from "./ArticleDetailsPage";

// Extend dayjs with relative time plugin
dayjs.extend(relativeTime);

type CommentListProps = {
    comments: CommentWithAuthor[];
};

export default function CommentList({ comments }: CommentListProps) {
    if (!comments || comments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-10 text-center rounded-xl border border-dashed border-border/60 bg-card/30 p-6">
                <p className="text-sm font-medium text-muted-foreground">No comments yet</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Be the first to share your thoughts!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {comments.map((comment) => {
                // Formats to "5 minutes ago", "2 days ago", etc.
                const timeAgo = dayjs(comment.createdAt).fromNow();

                return (
                    <div
                        key={comment.id}
                        className="group flex gap-3 sm:gap-4 p-4 rounded-xl border border-border/60 bg-card/40 hover:bg-card/80 transition-all duration-200"
                    >
                        {/* Author Avatar */}
                        <div className="flex-shrink-0 mt-0.5">
                            {comment.author?.imageUrl ? (
                                <img
                                    src={comment.author.imageUrl}
                                    alt={comment.author.name || "User"}
                                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover border border-blue-500/20"
                                />
                            ) : (
                                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20">
                                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                                </div>
                            )}
                        </div>

                        {/* Comment Content */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                            {/* Author & Meta Row */}
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
                                    {comment.author?.name || "Anonymous"}
                                </span>

                                <span className="text-[10px] sm:text-xs text-muted-foreground/80 flex-shrink-0">
                                    {timeAgo}
                                </span>
                            </div>

                            {/* Comment Text */}
                            <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap break-words">
                                {comment.text}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}