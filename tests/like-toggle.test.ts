
import { toggleLike } from "@/actions/like-toggle";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// 1. Mock dependencies
jest.mock("@clerk/nextjs/server", () => ({
    auth: jest.fn(),
}));

jest.mock("../lib/prisma", () => ({
    prisma: {
        user: { findUnique: jest.fn() },
        like: {
            findFirst: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
        },
    },
}));

jest.mock("next/cache", () => ({
    revalidatePath: jest.fn(),
}));

describe("toggleLike", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("throws error if user is not logged in", async () => {
        (auth as unknown as jest.Mock).mockResolvedValue({ userId: null });

        await expect(toggleLike("article-1")).rejects.toThrow(
            "You must be logged in to like an article"
        );
    });

    test("throws error if user is not in database", async () => {
        (auth as unknown as jest.Mock).mockResolvedValue({ userId: "clerk-1" });
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(toggleLike("article-1")).rejects.toThrow(
            "User does not exist in the database."
        );
    });

    test("creates a like if article is not liked yet", async () => {
        (auth as unknown as jest.Mock).mockResolvedValue({ userId: "clerk-1" });
        (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "db-user-1" });
        (prisma.like.findFirst as jest.Mock).mockResolvedValue(null); // No existing like

        await toggleLike("article-1");

        expect(prisma.like.create).toHaveBeenCalledWith({
            data: { articleId: "article-1", userId: "db-user-1" },
        });
        expect(revalidatePath).toHaveBeenCalledWith("/articles/article-1");
    });

    test("deletes the like if article is already liked", async () => {
        (auth as unknown as jest.Mock).mockResolvedValue({ userId: "clerk-1" });
        (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "db-user-1" });
        (prisma.like.findFirst as jest.Mock).mockResolvedValue({ id: "like-1" }); // Existing like

        await toggleLike("article-1");

        expect(prisma.like.delete).toHaveBeenCalledWith({
            where: { id: "like-1" },
        });
        expect(revalidatePath).toHaveBeenCalledWith("/articles/article-1");
    });
});