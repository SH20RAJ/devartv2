import { Suspense } from "react";
import { DevToAPI } from "@/lib/api";
import { ArticleCard } from "@/components/article-card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

interface SearchPageProps {
    searchParams: {
        q?: string;
    };
}

async function SearchResults({ query }: { query: string }) {
    const articles = await DevToAPI.searchArticles(query, 1, 20);

    if (articles.length === 0) {
        return (
            <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                    Try searching with different keywords or browse our latest articles.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <p className="text-muted-foreground">
                Found {articles.length} articles for "{query}"
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
}

export function generateMetadata({ searchParams }: SearchPageProps) {
    const query = searchParams.q || '';

    return {
        title: query ? `Search results for "${query}" | DevArt` : 'Search | DevArt',
        description: query
            ? `Search results for "${query}" on DevArt`
            : 'Search programming articles and developer resources',
    };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
    const query = searchParams.q || '';

    return (
        <div className="container mx-auto py-8 px-4 space-y-8">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-4">
                <Link href="/" className="flex items-center space-x-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Home</span>
                </Link>
            </Button>

            {/* Search Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">
                    {query ? `Search Results` : 'Search Articles'}
                </h1>
                {query && (
                    <p className="text-xl text-muted-foreground">
                        Results for "{query}"
                    </p>
                )}
            </div>

            {/* Search Results */}
            {query ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Search Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Suspense fallback={<LoadingSkeleton count={6} />}>
                            <SearchResults query={query} />
                        </Suspense>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center py-12">
                            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Start searching</h3>
                            <p className="text-muted-foreground">
                                Use the search bar above to find articles, topics, or authors.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}