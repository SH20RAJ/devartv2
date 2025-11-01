import { ClientArticlesGrid } from "@/components/client-articles-grid";
import { VisitorBadge } from "@/components/visitor-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface TrendingPageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

export const metadata: Metadata = {
    title: "Trending Articles | DevArt",
    description: "Discover the most popular programming articles and developer resources trending this week.",
    keywords: "trending, popular, programming, development, coding, articles, javascript, python, react",
    openGraph: {
        title: "Trending Articles | DevArt",
        description: "Discover the most popular programming articles and developer resources trending this week.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Trending Articles | DevArt",
        description: "Discover the most popular programming articles and developer resources trending this week.",
    },
};

export default async function TrendingPage({ searchParams }: TrendingPageProps) {
    const params = await searchParams;
    const currentPage = parseInt(params.page || '1');

    return (
        <div className="container mx-auto py-4 md:py-8 px-4 space-y-6 md:space-y-8">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-4">
                <Link href="/" className="flex items-center space-x-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Home</span>
                </Link>
            </Button>

            {/* Page Header */}
            <div className="flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0">
                <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                        <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Trending Articles</h1>
                    </div>
                    <p className="text-base md:text-xl text-muted-foreground">
                        Discover the most popular programming articles from the developer community
                    </p>
                </div>
                <div className="self-start md:self-auto">
                    <VisitorBadge />
                </div>
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
                    <ClientArticlesGrid
                        type="top"
                        page={currentPage}
                        baseUrl="/trending"
                        searchParams={{}}
                    />
                </CardContent>
            </Card>
        </div>
    );
}