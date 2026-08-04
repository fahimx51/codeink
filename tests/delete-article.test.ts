import { deleteArticle } from "@/actions/delete-article";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

jest.mock("../lib/prisma", () => ({
    prisma: {
        article: { deleteMany: jest.fn() },
    },
}));

jest.mock("next/cache", () => ({
    revalidatePath: jest.fn(),
}));

describe("deleteArticle", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("deletes article and revalidates dashboard", async () => {
        await deleteArticle("123");

        expect(prisma.article.deleteMany).toHaveBeenCalledWith({
            where: { id: "123" },
        });
        expect(revalidatePath).toHaveBeenCalledWith("/dashboard");
    });

    test("handles error without revalidating dashboard", async () => {
        // Hide expected console.error during test execution
        jest.spyOn(console, "error").mockImplementation(() => { });

        (prisma.article.deleteMany as jest.Mock).mockRejectedValueOnce(new Error());

        await deleteArticle("123");

        expect(revalidatePath).not.toHaveBeenCalled();
    });
});