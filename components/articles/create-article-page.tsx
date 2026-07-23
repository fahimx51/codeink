"use client";

import { useActionState, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createArticles } from "@/actions/create-article";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export function CreateArticlePage() {
    const [content, setContent] = useState("");

    const [formState, action, isPending] = useActionState(createArticles, {
        errors: {},
    });

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Create New Article</CardTitle>
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
                                required
                            />

                            {formState.errors?.title && (
                                <span className="font-medium text-sm text-red-500">
                                    {formState.errors.title[0]}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
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
                                <span className="font-medium text-sm text-red-500">
                                    {formState.errors.category[0]}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="featuredImage">Featured Image</Label>
                            <Input
                                id="featuredImage"
                                name="featuredImage"
                                type="file"
                                accept="image/*"
                                required
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

                            <div className="
                                rounded-md border border-input overflow-hidden
                                [&_.ql-toolbar]:!border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:!border-border
                                [&_.ql-container]:!border-none
                                [&_.ql-editor]:min-h-[250px] [&_.ql-editor]:text-base
                                dark:[&_.ql-toolbar]:bg-zinc-900 
                                dark:[&_.ql-stroke]:!stroke-zinc-100 
                                dark:[&_.ql-fill]:!fill-zinc-100 
                                dark:[&_.ql-picker-label]:!text-zinc-100 
                                dark:[&_.ql-picker-options]:!bg-zinc-900 
                                dark:[&_.ql-picker-options]:!text-zinc-100
                                dark:[&_.ql-editor.ql-blank::before]:text-zinc-500
                                dark:[&_.ql-editor]:bg-zinc-950 dark:[&_.ql-editor]:text-zinc-100
                            ">
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

                        <div className="flex justify-end gap-4">
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button disabled={isPending} type="submit">
                                {isPending ? "Publishing..." : "Publish Article"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default CreateArticlePage;