import { incrementArticleViews } from "@/actions/increment-article-views";
import { redis } from "@/lib/redis";

jest.mock("../lib/redis", () => ({
  redis: {
    exists: jest.fn(),
    incr: jest.fn(),
    set: jest.fn(),
  },
}));

jest.mock("../lib/prisma", () => ({
  prisma: {
    article: { update: jest.fn() },
  },
}));

describe("incrementArticleViews", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("increments view count for a new viewer", async () => {
    (redis.exists as jest.Mock).mockResolvedValue(0);

    await incrementArticleViews("art-1", "user-1");

    expect(redis.incr).toHaveBeenCalledWith("article:art-1:views");
  });

  test("does not increment view count if already viewed", async () => {
    (redis.exists as jest.Mock).mockResolvedValue(1);

    await incrementArticleViews("art-1", "user-1");

    expect(redis.incr).not.toHaveBeenCalled();
  });
});