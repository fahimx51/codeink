import ArticleDetailsPage from '@/components/articles/ArticleDetailsPage';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react';
import { auth } from '@clerk/nextjs/server';

type ArticleDetailsProps = {
    params: Promise<{ id: string }>;
};

async function ArticleDetails({ params }: ArticleDetailsProps) {
    const { id } = await params;
    const { userId: clerkUserId } = await auth();

    // 1. Fetch Article with author and TOTAL likes count
    const article = await prisma.article.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true,
                },
            },
            _count: {
                select: {
                    likes: true, // Gets total number of likes
                },
            },
        },
    });

    if (!article) {
        return notFound();
    }

    // 2. Check if current user has already liked this article
    let isLikedByCurrentUser = false;

    if (clerkUserId) {
        const userLike = await prisma.like.findFirst({
            where: {
                articleId: id,
                user: { clerkUserId },
            },
            select: { id: true },
        });
        isLikedByCurrentUser = Boolean(userLike);
    }

    // 3. Fetch Comments
    const comments = await prisma.comment.findMany({
        where: { articleId: id },
        orderBy: { createdAt: 'desc' },
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true,
                },
            },
        },
    });

    return (
        <div>
            <ArticleDetailsPage
                article={article}
                comments={comments}
                totalLikes={article._count.likes}
                isLiked={isLikedByCurrentUser}
            />
        </div>
    );
}

export default ArticleDetails;