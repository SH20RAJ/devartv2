import { LoadingSkeleton } from "@/components/loading-skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto py-8">
            <div className="space-y-8">
                <div className="space-y-2">
                    <div className="h-10 bg-muted rounded w-1/3 animate-pulse" />
                    <div className="h-6 bg-muted rounded w-2/3 animate-pulse" />
                </div>
                <LoadingSkeleton count={12} />
            </div>
        </div>
    );
}