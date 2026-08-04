import { auth } from "@clerk/nextjs/server";
import { uploadOnCloudinary } from "@/lib/cloudinary";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createArticles } from "@/actions/create-article";
import { prisma } from "../lib/prisma";

// 1. Setup module mocks
jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(),
}));

// Fixed path to match your import relative to the test file
jest.mock("../lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
    article: {
      create: jest.fn(),
    },
  },
}));

jest.mock("../lib/cloudinary", () => ({
  uploadOnCloudinary: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

// Helper references typed as Jest Mocks
const mockAuth = auth as unknown as jest.Mock;
const mockFindUnique = prisma.user.findUnique as unknown as jest.Mock;
const mockCreateArticle = prisma.article.create as unknown as jest.Mock;
const mockUpload = uploadOnCloudinary as unknown as jest.Mock;

describe("createArticles", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return validation error when title is missing", async () => {
    const formData = new FormData();
    formData.append("title", "");
    formData.append("category", "Programming");
    formData.append("status", "published");
    formData.append("content", "This is article content.");

    const result = await createArticles({ errors: {} }, formData);

    expect(result.errors.title).toBeDefined();
  });

  test("should return login error when user is not authenticated", async () => {
    mockAuth.mockResolvedValue({ userId: null });

    const formData = new FormData();
    formData.append("title", "Next.js");
    formData.append("category", "Programming");
    formData.append("status", "published");
    formData.append("content", "This is article content.");

    const result = await createArticles({ errors: {} }, formData);

    expect(result.errors.formErrors).toEqual(["You have to login first"]);
  });

  test("should return error when user does not exist", async () => {
    mockAuth.mockResolvedValue({ userId: "clerk123" });
    mockFindUnique.mockResolvedValue(null);

    const formData = new FormData();
    formData.append("title", "Next.js");
    formData.append("category", "Programming");
    formData.append("status", "published");
    formData.append("content", "This is article content.");

    const result = await createArticles({ errors: {} }, formData);

    expect(result.errors.formErrors).toEqual([
      "User not found. Please register before creating an article.",
    ]);
  });

  test("should return image required error", async () => {
    mockAuth.mockResolvedValue({ userId: "clerk123" });
    mockFindUnique.mockResolvedValue({ id: "user1" });

    const formData = new FormData();
    formData.append("title", "Next.js");
    formData.append("category", "Programming");
    formData.append("status", "published");
    formData.append("content", "This is article content.");

    const result = await createArticles({ errors: {} }, formData);

    expect(result.errors.featuredImage).toEqual(["Image file is required."]);
  });

  test("should create article successfully", async () => {
    mockAuth.mockResolvedValue({ userId: "clerk123" });
    mockFindUnique.mockResolvedValue({ id: "user1" });
    mockUpload.mockResolvedValue({ secure_url: "https://image.com/test.jpg" });
    mockCreateArticle.mockResolvedValue({});

    const file = new File(["dummy"], "image.png", { type: "image/png" });

    const formData = new FormData();
    formData.append("title", "Next.js");
    formData.append("category", "Programming");
    formData.append("status", "published");
    formData.append("content", "This is article content.");
    formData.append("featuredImage", file);

    await createArticles({ errors: {} }, formData);

    expect(uploadOnCloudinary).toHaveBeenCalled();
    expect(prisma.article.create).toHaveBeenCalled();
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard");
    expect(redirect).toHaveBeenCalledWith("/dashboard");
  });
});