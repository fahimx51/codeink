"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";

import { revalidatePath } from "next/cache";
import { prisma } from '../lib/prisma';
import { uploadOnCloudinary } from "@/lib/cloudinary";

const createArticleSchema = z.object({
    title: z.string().min(3).max(100),
    category: z.string().min(3).max(25),
    content: z.string().min(10),
});

type EditArticleFormState = {
    errors: {
        title?: string[];
        category?: string[];
        featuredImage?: string[];
        content?: string[];
        formErrors?: string[];
    };
};

export const editArticle = async (
    articleId: string,
    prevState: EditArticleFormState,
    formData: FormData
): Promise<EditArticleFormState> => {

    const result = createArticleSchema.safeParse({
        title: formData.get("title"),
        category: formData.get("category"),
        content: formData.get("content"),
    });

    if (!result.success) {
        return {
            errors: z.flattenError(result.error).fieldErrors,
        };
    }

    const { userId } = await auth();

    if (!userId) {
        return {
            errors: {
                formErrors: ["You have to login first"],
            },
        };
    }

    const existingUser = await prisma.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!existingUser) {
        return {
            errors: {
                formErrors: ["User not found. Please register before creating an article."],
            },
        };
    }

    const exisingArticle = await prisma.article.findUnique({
        where: { id: articleId }
    });

    if (!exisingArticle) {
        return {
            errors: {
                formErrors: ["Article doesn't exist"],
            },
        };
    }

    const imageFile = formData.get("featuredImage") as File | null;
    let imageUrl = exisingArticle.featuredImage;

    if (imageFile) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await uploadOnCloudinary(buffer, "Article-Images");

        const url = uploadResult?.secure_url;

        if (!url) {
            return {
                errors: {
                    featuredImage: ["Failed to upload image. Please try again."],
                },
            };
        }
        imageUrl = url;
    }

    try {

        await prisma.article.update({
            where: { id: articleId },
            data: {
                title: result.data.title,
                category: result.data.category,
                content: result.data.content,
                featuredImage: imageUrl,
            },
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    formErrors: [error.message],
                },
            };
        } else {
            return {
                errors: {
                    formErrors: ["Some internal server error occurred."],
                },
            };
        }
    }

    revalidatePath("/dashboard");
    redirect("/dashboard");
};