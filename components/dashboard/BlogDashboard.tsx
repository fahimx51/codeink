import { FileText, MessageCircle, PlusCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import RecentArticles from "./RecentArticle";

export async function BlogDashboard() {
    return (
        <main className="flex-1 min-w-0 w-full p-4 sm:p-6 md:p-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                        Blog Dashboard
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Manage your content and analytics
                    </p>
                </div>

                <Button
                    className="gap-2 w-full sm:w-auto shrink-0 justify-center"
                    nativeButton={false}
                    render={<Link href="/dashboard/articles/create" />}
                >
                    <PlusCircle className="h-4 w-4" />
                    <span>New Article</span>
                </Button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
                <Card className="min-w-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
                        <CardTitle className="text-sm font-medium">
                            Total Articles
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            +5 from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="min-w-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
                        <CardTitle className="text-sm font-medium">
                            Total Comments
                        </CardTitle>
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                        <div className="text-2xl font-bold">9</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            12 awaiting moderation
                        </p>
                    </CardContent>
                </Card>

                <Card className="min-w-0 md:col-span-2 lg:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
                        <CardTitle className="text-sm font-medium">
                            Avg. Reading Time
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                        <div className="text-2xl font-bold">4.2m</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            +0.8m from last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Articles */}
            <RecentArticles />
        </main>
    );
}