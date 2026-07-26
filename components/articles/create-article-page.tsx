"use client";

import { useActionState, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createArticles } from "@/actions/create-article";
import { Sparkles, FileText, Globe, Loader2 } from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export function CreateArticlePage() {
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("published");

    const [formState, action, isPending] = useActionState(createArticles, {
        errors: {},
    });

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <Card className="border border-border/60 shadow-xs">
                <CardHeader className="border-b border-border/40 bg-muted/20 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight">
                                Create New Article
                            </CardTitle>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                                Draft your post or publish it live for your readers.
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <form action={action} className="space-y-6">

                        {/* General Form Error Banner */}
                        {formState.errors?.formErrors && (
                            <div className="p-3.5 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
                                {formState.errors.formErrors.join(", ")}
                            </div>
                        )}

                        {/* Article Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-semibold">
                                Article Title
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="e.g. Getting Started with Next.js App Router"
                                required
                                className="h-10 text-sm"
                            />
                            {formState.errors?.title && (
                                <p className="font-medium text-xs text-destructive">
                                    {formState.errors.title[0]}
                                </p>
                            )}
                        </div>

                        {/* Category & Status Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Category Select */}
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-sm font-semibold">
                                    Category
                                </Label>
                                <select
                                    id="category"
                                    name="category"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:bg-zinc-950 dark:text-zinc-50 dark:border-zinc-800"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="technology">Technology</option>
                                    <option value="programming">Programming</option>
                                    <option value="web-development">Web Development</option>
                                </select>
                                {formState.errors?.category && (
                                    <p className="font-medium text-xs text-destructive">
                                        {formState.errors.category[0]}
                                    </p>
                                )}
                            </div>

                            {/* Status Select Field */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="status" className="text-sm font-semibold">
                                        Publishing Status
                                    </Label>
                                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${status === "published"
                                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                                        }`}>
                                        {status === "published" ? "Live on site" : "Hidden in dashboard"}
                                    </span>
                                </div>

                                <select
                                    id="status"
                                    name="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:bg-zinc-950 dark:text-zinc-50 dark:border-zinc-800"
                                >
                                    <option value="published">Published (Public)</option>
                                    <option value="draft">Draft (Private)</option>
                                </select>
                                {formState.errors?.status && (
                                    <p className="font-medium text-xs text-destructive">
                                        {formState.errors.status[0]}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Featured Image Input */}
                        <div className="space-y-2">
                            <Label htmlFor="featuredImage" className="text-sm font-semibold">
                                Featured Image
                            </Label>
                            <Input
                                id="featuredImage"
                                name="featuredImage"
                                type="file"
                                accept="image/*"
                                required
                                className="cursor-pointer file:font-semibold file:text-xs"
                            />
                            {formState.errors?.featuredImage && (
                                <p className="font-medium text-xs text-destructive">
                                    {formState.errors.featuredImage[0]}
                                </p>
                            )}
                        </div>

                        {/* Rich Text Editor Field */}
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold">Article Content</Label>

                            {/* Hidden input to hold state value for FormData */}
                            <input type="hidden" name="content" value={content} />

                            <div className="rounded-md border border-input overflow-hidden [&_.ql-toolbar]:!border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:!border-border [&_.ql-container]:!border-none [&_.ql-editor]:min-h-[260px] [&_.ql-editor]:text-base dark:[&_.ql-toolbar]:bg-zinc-900/50 dark:[&_.ql-stroke]:!stroke-zinc-100 dark:[&_.ql-fill]:!fill-zinc-100 dark:[&_.ql-picker-label]:!text-zinc-100 dark:[&_.ql-picker-options]:!bg-zinc-900 dark:[&_.ql-picker-options]:!text-zinc-100 dark:[&_.ql-editor]:bg-zinc-950 dark:[&_.ql-editor]:text-zinc-100 dark:[&_.ql-editor.ql-blank::before]:!text-zinc-400 dark:[&_.ql-editor.ql-blank::before]:!opacity-100">
                                <ReactQuill
                                    theme="snow"
                                    value={content}
                                    onChange={setContent}
                                    placeholder="Write your article content here..."
                                />
                            </div>

                            {formState.errors?.content && (
                                <p className="font-medium text-xs text-destructive">
                                    {formState.errors.content[0]}
                                </p>
                            )}
                        </div>

                        {/* Form Footer Action Buttons */}
                        <div className="pt-4 border-t border-border/40 flex items-center justify-end gap-3">
                            <Button type="button" variant="ghost" size="sm">
                                Cancel
                            </Button>

                            <Button
                                disabled={isPending}
                                type="submit"
                                size="sm"
                                className="font-semibold gap-2 min-w-[130px]"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Saving...</span>
                                    </>
                                ) : status === "published" ? (
                                    <>
                                        <Globe className="w-4 h-4" />
                                        <span>Publish Article</span>
                                    </>
                                ) : (
                                    <>
                                        <FileText className="w-4 h-4" />
                                        <span>Save Draft</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default CreateArticlePage;