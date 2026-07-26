"use client";

import { useActionState, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { Article } from "@/app/generated/prisma/client";
import Image from "next/image";
import { editArticle } from "@/actions/edit-article";
import { FileText, Globe, Loader2 } from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type EditArticlePageProps = {
    article: Article
}

export function EditArticlePage({ article }: EditArticlePageProps) {
    const [content, setContent] = useState(article.content);
    const [status, setStatus] = useState(
        article.isPublished ? "published" : "draft"
    );

    const [formState, action, isPending] = useActionState(editArticle.bind(null, article.id), {
        errors: {},
    });

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Edit Article</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* 1. Pass 'action' directly to the form */}
                    <form action={action} className="space-y-6">

                        {/* Show general form errors if any */}
                        {formState.errors?.formErrors && (
                            <div className="p-3 rounded-md bg-red-500/15 text-red-500 text-sm font-medium">
                                {formState.errors.formErrors.join(", ")}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="title">Article Title</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Enter article title"
                                defaultValue={article.title}
                                required
                            />

                            {formState.errors?.title && (
                                <span className="font-medium text-sm text-red-500">
                                    {formState.errors.title[0]}
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Category Select */}
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-sm font-semibold">
                                    Category
                                </Label>
                                <select
                                    id="category"
                                    name="category"
                                    defaultValue={article.category}
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

                        <div className="space-y-2">
                            <Label htmlFor="featuredImage">Featured Image</Label>
                            <Input
                                id="featuredImage"
                                name="featuredImage"
                                type="file"
                                accept="image/*"
                            />

                            {/* Show the image */}
                            <Image
                                src={article.featuredImage}
                                alt="featured-image"
                                width={200}
                                height={200}
                                className="object-cover"
                            />

                            {formState.errors?.featuredImage && (
                                <span className="font-medium text-sm text-red-500">
                                    {formState.errors.featuredImage[0]}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Content</Label>

                            {/* 2. Hidden input so ReactQuill value is automatically included in FormData */}
                            <input type="hidden" name="content" value={content} />

                            <div className="rounded-md border border-input overflow-hidden [&_.ql-toolbar]:!border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:!border-border [&_.ql-container]:!border-none [&_.ql-editor]:min-h-[250px] [&_.ql-editor]:text-base dark:[&_.ql-toolbar]:bg-zinc-900 dark:[&_.ql-stroke]:!stroke-zinc-100 dark:[&_.ql-fill]:!fill-zinc-100 dark:[&_.ql-picker-label]:!text-zinc-100 dark:[&_.ql-picker-options]:!bg-zinc-900 dark:[&_.ql-picker-options]:!text-zinc-100 dark:[&_.ql-editor]:bg-zinc-950 dark:[&_.ql-editor]:text-zinc-100 dark:[&_.ql-editor.ql-blank::before]:!text-zinc-400 dark:[&_.ql-editor.ql-blank::before]:!opacity-100">
                                <ReactQuill
                                    theme="snow"
                                    value={content}
                                    onChange={setContent}
                                    placeholder="Write your article content here..."
                                />
                            </div>

                            {formState.errors?.content && (
                                <span className="font-medium text-sm text-red-500">
                                    {formState.errors.content[0]}
                                </span>
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

export default EditArticlePage;