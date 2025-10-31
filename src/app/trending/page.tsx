import { Suspense } from "react";
import { DevToAPI } from "@/lib/api";
import { ArticleCard } from "@/components/article-card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp } from "lucide-react";
import Link from "next/link";

async function TrendingArticles() {
    const articles = await DevToAPI.getTopArticles(1, 20);

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
}

export const metadata = {
    title: "Trending Articles | DevArt",
    description: "Discover the most popular programming articles and developer resources trending this week.",
};

export default function TrendingPage() {
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
            <div className="space-y-2">
                <div className="flex items-center space-x-3">
                    <TrendingUp className="h-8 w-8 text-primary" />
                    <h1 className="text-4xl font-bold tracking-tight">Trending Articles</h1>
                </div>
                <p className="text-xl text-muted-foreground">
                    Discover the most popular programming articles from the developer community
                </p>
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
                    <Suspense fallback={<LoadingSkeleton count={20} />}>
                        <TrendingArticles />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    );
}