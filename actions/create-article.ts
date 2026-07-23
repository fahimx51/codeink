"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";

import { revalidatePath } from "next/cache";
import { prisma } from '../lib/prisma';
import { uploadOnCloudinary } from "@/lib/cloudinary";

const createArticleSchema = z.object({
    title: z.string().min(3).max(100),
    category: z.string().min(3).max(50),
    content: z.string().min(10),
});

type CreateArticleFormState = {
    errors: {
        title?: string[];
        category?: string[];
        featuredImage?: string[];
        content?: string[];
        formErrors?: string[];
    };
};

export const createArticles = async (
    prevState: CreateArticleFormState,
    formData: FormData
): Promise<CreateArticleFormState> => {

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

    const imageFile = formData.get("featuredImage") as File | null;

    if (!imageFile || imageFile?.name === "undefined") {
        return {
            errors: {
                featuredImage: ["Image file is required."],
            },
        };
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await uploadOnCloudinary(buffer, "Article-Images");

    const imageUrl = uploadResult?.secure_url;

    if (!imageUrl) {
        return {
            errors: {
                featuredImage: ["Failed to upload image. Please try again."],
            },
        };
    }

    try {

        await prisma.article.create({
            data: {
                title: result.data.title,
                category: result.data.category,
                content: result.data.content,
                featuredImage: imageUrl,
                authorId: existingUser.id,
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