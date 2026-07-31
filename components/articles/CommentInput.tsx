'use client';

import React, { useActionState, useState, useEffect } from 'react';
import { Send, User as UserIcon, Loader2, AlertCircle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { createComments } from '@/actions/create-comment';

type CommentInputProps = {
    articleId: string;
};

export default function CommentInput({ articleId }: CommentInputProps) {
    const { user, isLoaded } = useUser();
    const [comment, setComment] = useState('');

    const maxLength = 500;

    const [formState, action, isPending] = useActionState(
        createComments.bind(null, articleId),
        { errors: {} }
    );

    // Reset textarea after successful comment creation
    useEffect(() => {
        if (!isPending && !formState.errors.body && !formState.errors.formErrors) {
            setComment('');
        }
    }, [isPending, formState]);

    const isLimitReached = comment.length >= maxLength;

    return (
        <form action={action} className="w-full">
            <div className="flex gap-3 sm:gap-4 items-start">
                {/* User Avatar */}
                <div className="flex-shrink-0 mt-1">
                    {isLoaded && user?.imageUrl ? (
                        <img
                            src={user.imageUrl}
                            alt={user.fullName || 'User'}
                            className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover border border-border shadow-sm"
                        />
                    ) : (
                        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20">
                            <UserIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                    )}
                </div>

                {/* Input Container */}
                <div className="flex-1 space-y-2">
                    <div className="relative rounded-2xl border border-border/80 bg-card/50 shadow-sm backdrop-blur-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 hover:border-border">
                        {/* Textarea */}
                        <textarea
                            name="body"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            maxLength={maxLength}
                            rows={3}
                            placeholder="Write a comment..."
                            className="w-full resize-none bg-transparent p-3 sm:p-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                        />

                        {/* Character Counter Inside Box */}
                        <div className="flex items-center justify-between px-3 sm:px-4 pb-2 text-[10px] sm:text-xs">
                            {/* Validation error for body */}
                            {formState?.errors?.body ? (
                                <span className="text-destructive font-medium flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {formState.errors.body[0]}
                                </span>
                            ) : (
                                <span />
                            )}

                            <span
                                className={`font-mono transition-colors ${isLimitReached
                                    ? 'text-destructive font-semibold'
                                    : 'text-muted-foreground/70'
                                    }`}
                            >
                                {comment.length}/{maxLength}
                            </span>
                        </div>
                    </div>

                    {/* General Server Errors */}
                    {formState?.errors?.formErrors && (
                        <div className="flex items-center gap-1.5 text-xs text-destructive bg-destructive/10 p-2.5 rounded-lg border border-destructive/20">
                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                            <p>{formState.errors.formErrors[0]}</p>
                        </div>
                    )}

                    {/* Submit Button Row */}
                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            disabled={isPending || !comment.trim()}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white dark:bg-blue-500 text-xs sm:text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    <span>Posting...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="h-3.5 w-3.5" />
                                    <span>Comment</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}