"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface ArticleSearchInputProps {
    placeholder?: string;
}

export default function ArticleSearchInput({
    placeholder = "Search articles by title, tag, or topic...",
}: ArticleSearchInputProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    // 1. Get initial value from URL search param directly
    const currentSearch = searchParams.get("search") || "";
    const [query, setQuery] = useState(currentSearch);

    // 2. Helper to update URL search parameter
    const updateSearchQuery = (term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (term.trim()) {
            params.set("search", term.trim());
        } else {
            params.delete("search");
        }
        
        // Reset to page 1 on new search
        params.set("page", "1");

        router.push(`${pathname}?${params.toString()}`);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleClear = () => {
        setQuery("");
        updateSearchQuery("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateSearchQuery(query);
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
            {/* Soft Ambient Glow Effect */}
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-400 opacity-20 blur-md transition duration-300 group-hover:opacity-40" />

            {/* Input Container Card */}
            <div className="relative flex items-center rounded-full border border-blue-500/20 bg-background/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-lg shadow-blue-500/5 transition-all duration-300 hover:border-blue-500/40 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">

                {/* Search Icon */}
                <div className="pl-4 text-blue-500 dark:text-blue-400 flex items-center justify-center">
                    <Search className="h-5 w-5 transition-transform duration-200" />
                </div>

                {/* Input Field */}
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="w-full bg-transparent px-3 py-3.5 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                />

                {/* Right Action Items */}
                <div className="pr-3 flex items-center gap-2">
                    {query && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Clear search</span>
                        </button>
                    )}

                    {/* Search Submit Button */}
                    <Button
                        type="submit"
                        size="sm"
                        className="rounded-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 h-9 shadow-md shadow-blue-500/20 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all"
                    >
                        <span className="hidden sm:inline">Search</span>
                    </Button>
                </div>

            </div>
        </form>
    );
}