import { Suspense } from "react";
import { DevToAPI } from "@/lib/api";
import { ArticleCard } from "@/components/article-card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { VisitorBadge } from "@/components/visitor-badge";
import { Pagination } from "@/components/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

interface SearchPageProps {
    searchParams: {
        q?: string;
        page?: string;
    };
}

async function SearchResults({ query, page }: { query: string; page: number }) {
    const articles = await DevToAPI.searchArticles(query, page, 12);

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
                Found {articles.length}+ articles for &quot;{query}&quot;
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
            <Pagination
                currentPage={page}
                totalPages={10}
                baseUrl="/search"
                searchParams={{ q: query }}
            />
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

            {/* Search Header */}
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">
                        {query ? `Search Results` : 'Search Articles'}
                    </h1>
                    {query && (
                        <p className="text-xl text-muted-foreground">
                            Results for &quot;{query}&quot;
                        </p>
                    )}
                </div>
                <VisitorBadge />
            </div>

            {/* Search Results */}
            {query ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Search Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Suspense fallback={<LoadingSkeleton count={12} />}>
                            <SearchResults query={query} page={currentPage} />
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