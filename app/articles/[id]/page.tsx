import ArticleDetailsPage from '@/components/articles/ArticleDetailsPage';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { redis } from '@/lib/redis';

type ArticleDetailsProps = {
    params: Promise<{ id: string }>;
};

async function ArticleDetails({ params }: ArticleDetailsProps) {
    const { id } = await params;
    const { userId: clerkUserId } = await auth();

    let article = null;

    try {
        // Try getting article from Redis cache
        const cachedArticle = await redis.get(`article:${id}`);

        if (cachedArticle) {
            article = typeof cachedArticle === 'string'
                ? JSON.parse(cachedArticle)
                : cachedArticle;
        }
    } catch (error) {
        console.error('Redis cache error:', error);
    }

    // Cache miss -> Fetch from database
    if (!article) {
        article = await prisma.article.findUnique({
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
                        likes: true,
                    },
                },
            },
        });

        if (article) {
            try {
                // Save to Redis (EX 86400 = 24 hours)
                await redis.set(
                    `article:${id}`,
                    JSON.stringify(article),
                    'EX',
                    86400
                );
            } catch (error) {
                console.error('Failed to set Redis key:', error);
            }
        }
    }

    if (!article) {
        return notFound();
    }

    // Fetch user like status and comments in parallel
    const [userLike, comments] = await Promise.all([
        clerkUserId
            ? prisma.like.findFirst({
                where: {
                    articleId: id,
                    user: { clerkUserId },
                },
                select: { id: true },
            })
            : Promise.resolve(null),

        prisma.comment.findMany({
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
        }),
    ]);

    return (
        <div>
            <ArticleDetailsPage
                article={article}
                comments={comments}
                totalLikes={article._count?.likes ?? 0}
                isLiked={Boolean(userLike)}
            />
        </div>
    );
}

export default ArticleDetails;