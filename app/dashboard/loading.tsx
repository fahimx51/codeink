import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
    return (
        <main className="flex-1 min-w-0 w-full p-4 sm:p-6 md:p-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48 sm:w-64 rounded-md" />
                    <Skeleton className="h-4 w-36 sm:w-48 rounded-md" />
                </div>
                <Skeleton className="h-10 w-full sm:w-36 rounded-md shrink-0" />
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="min-w-0 border-border/60">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
                            <Skeleton className="h-4 w-28 rounded-md" />
                            <Skeleton className="h-4 w-4 rounded-full" />
                        </CardHeader>
                        <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0 space-y-2">
                            <Skeleton className="h-8 w-16 rounded-md" />
                            <Skeleton className="h-3 w-32 rounded-md" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Table Skeleton */}
            <Card className="mb-8 w-full border-border/60">
                <CardHeader className="p-4 sm:p-6 bg-muted/20 border-b border-border/40">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-36 rounded-md" />
                        <Skeleton className="h-8 w-20 rounded-md" />
                    </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                    {/* Fake Table Header */}
                    <div className="grid grid-cols-4 gap-4 pb-2 border-b border-border/40">
                        <Skeleton className="h-4 w-20 rounded-md" />
                        <Skeleton className="h-4 w-16 rounded-md justify-self-center" />
                        <Skeleton className="h-4 w-16 rounded-md justify-self-center hidden sm:block" />
                        <Skeleton className="h-4 w-20 rounded-md justify-self-center" />
                    </div>

                    {/* Fake Table Rows */}
                    {[1, 2, 3, 4, 5].map((row) => (
                        <div key={row} className="grid grid-cols-4 items-center gap-4 py-2 border-b border-border/20">
                            <Skeleton className="h-5 w-3/4 rounded-md" />
                            <Skeleton className="h-5 w-16 rounded-full justify-self-center" />
                            <Skeleton className="h-5 w-8 rounded-md justify-self-center hidden sm:block" />
                            <Skeleton className="h-8 w-24 rounded-md justify-self-center" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </main>
    );
}