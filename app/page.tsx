import React, { Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TopArticles from "@/components/articles/TopArticles";
import Navbar from "@/components/home/header/Navbar";
import FooterMain from "@/components/home/footer/FooterMain";

const Page = async () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Articles Section */}
      <section className="relative py-16 md:py-24 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Heading */}
          <div className="mb-12 text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Featured Articles
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Discover our most popular and trending content carefully picked for you
            </p>
          </div>

          {/* Top Articles List */}
          <Suspense fallback={<TopArticlesSkeleton />}>
            <TopArticles />
          </Suspense>

          {/* View All Button */}
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-base font-semibold border-border hover:bg-muted transition-colors"
            >
              <Link href="/articles">View All Articles</Link>
            </Button>
          </div>

        </div>
      </section>
      <footer>
        <FooterMain />
      </footer>
    </main>
  );
};

// Polished Skeleton Loader for Async TopArticles
function TopArticlesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-80 w-full animate-pulse rounded-2xl bg-muted/50 border border-border/40"
        />
      ))}
    </div>
  );
}

export default Page;