import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ArticleCardSkeleton() {
    return (
        <Card className="border-0 shadow-sm">
            <CardHeader className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <div className="space-y-2">
                    <div className="flex space-x-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-14" />
                    </div>
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export function LoadingSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
            ))}
        </div>
    );
}