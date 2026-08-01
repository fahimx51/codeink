'use client';

import React, { useOptimistic, useTransition } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { toggleLike } from '@/actions/like-toggle';

type LikeButtonProps = {
    articleId: string;
    totalLikes: number;
    isLiked: boolean;
};

export default function LikeBtn({ articleId, totalLikes, isLiked }: LikeButtonProps) {
    const [isPending, startTransition] = useTransition();

    // Optimistically update likes state
    const [optimisticState, setOptimisticState] = useOptimistic(
        { isLiked, totalLikes },
        (currentState) => ({
            isLiked: !currentState.isLiked,
            totalLikes: currentState.isLiked
                ? currentState.totalLikes - 1
                : currentState.totalLikes + 1,
        })
    );

    const handleToggleLike = () => {
        startTransition(async () => {
            // Trigger optimistic update
            setOptimisticState(undefined);

            try {
                await toggleLike(articleId);
            } catch (error) {
                console.error('Failed to toggle like:', error);
            }
        });
    };

    return (
        <button
            onClick={handleToggleLike}
            disabled={isPending}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg border px-3.5 py-2 text-xs sm:text-sm font-medium transition-all duration-200 ${optimisticState.isLiked
                    ? 'border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20'
                    : 'border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20'
                }`}
        >
            {optimisticState.isLiked ? (
                <>
                    <ThumbsDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current scale-110" />
                    <span>Unlike</span>
                </>
            ) : (
                <>
                    <ThumbsUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />
                    <span>Like</span>
                </>
            )}

            <span className="ml-1 rounded-full bg-background/80 dark:bg-blue-500 px-2 py-0.5 text-[10px] sm:text-xs font-bold text-foreground">
                {optimisticState.totalLikes}
            </span>
        </button>
    );
}