"use client";

import React, { useState } from "react";
import { Search, X, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ArticleSearchInputProps {
    onSearch?: (query: string) => void;
    placeholder?: string;
}

export default function ArticleSearchInput({
    onSearch,
    placeholder = "Search articles by title, tag, or topic...",
}: ArticleSearchInputProps) {
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
        if (onSearch) onSearch(val);
    };

    const handleClear = () => {
        setQuery("");
        if (onSearch) onSearch("");
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            {/* Soft Ambient Glow Effect on Focus/Hover */}
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
                    onChange={handleSearch}
                    placeholder={placeholder}
                    className="w-full bg-transparent px-3 py-3.5 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                />

                {/* Right Action Items (Clear Button) */}
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
                        type="button"
                        size="sm"
                        className="rounded-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 h-9 shadow-md shadow-blue-500/20 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all"
                    >
                        <span className="hidden sm:inline">Search</span>
                    </Button>
                </div>

            </div>
        </div>
    );
}