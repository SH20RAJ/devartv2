import { Suspense } from "react";
import { DevToAPI } from "@/lib/api";
import { ArticleCard } from "@/components/article-card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { VisitorBadge } from "@/components/visitor-badge";
import { Pagination } from "@/components/pagination";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp } from "lucide-react";
import Link from "next/link";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

interface TrendingPageProps {
    searchParams: {
        page?: string;
    };
}

async function TrendingArticles({ page }: { page: number }) {
    const articles = await DevToAPI.getTopArticles(page, 12);

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
            <Pagination
                currentPage={page}
                totalPages={10}
                baseUrl="/trending"
            />
        </div>
    );
}

export const metadata = {
    title: "Trending Articles | DevArt",
    description: "Discover the most popular programming articles and developer resources trending this week.",
};

export default function TrendingPage({ searchParams }: TrendingPageProps) {
    const currentPage = parseInt(searchParams.page || '1');

    return (
        <div className="container mx-auto py-8 px-4 space-y-8">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-4">
                <Link href="/" className="flex items-center space-x-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Home</span>
                </Link>
            </Button>

            {/* Page Header */}
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                        <TrendingUp className="h-8 w-8 text-primary" />
                        <h1 className="text-4xl font-bold tracking-tight">Trending Articles</h1>
                    </div>
                    <p className="text-xl text-muted-foreground">
                        Discover the most popular programming articles from the developer community
                    </p>
                </div>
                <VisitorBadge />
            </div>

            {/* Trending Articles */}
            <Card>
                <CardHeader>
                    <CardTitle>Most Popular This Week</CardTitle>
                    <CardDescription>
                        Articles with the highest engagement from the past 7 days
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<LoadingSkeleton count={12} />}>
                        <TrendingArticles page={currentPage} />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    );
}