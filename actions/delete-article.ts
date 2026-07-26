"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteArticle = async (articleId: string) => {
    try {
        await prisma.article.deleteMany({
            where: {
                id: articleId,
            },
        });
        revalidatePath("/dashboard");
    } catch (error) {
        console.error("Delete failed:", error);
    }
};