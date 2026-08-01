"use server";

import { redis } from "@/lib/redis";
import { prisma } from "@/lib/prisma";

export async function incrementArticleViews(articleId: string, viewerId: string) {
    if (!articleId) return;

    try {
        const viewedKey = `viewed:${articleId}:${viewerId}`;
        const alreadyViewed = await redis.exists(viewedKey);

        if (alreadyViewed) return; // Skip if viewed within cooldown window

        // Increment total views in Redis
        const views = await redis.incr(`article:${articleId}:views`);

        // 30-minute cooldown per viewer
        await redis.set(viewedKey, "1", "EX", 60 * 30);

        // Batch update DB every 5 views
        if (views % 5 === 0) {
            await prisma.article.update({
                where: { id: articleId },
                data: { views: { increment: 5 } },
            });
        }
    } catch (error) {
        console.error("Failed to increment views:", error);
    }
}