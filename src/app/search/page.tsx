import { ClientSearchResults } from "@/components/client-search-results";
import { VisitorBadge } from "@/components/visitor-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface SearchPageProps {
    searchParams: Promise<{
        q?: string;
        page?: string;
    }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
    const params = await searchParams;
    const query = params.q || '';

    return {
        title: query ? `Search results for "${query}" | DevArt` : 'Search | DevArt',
        description: query
            ? `Search results for "${query}" on DevArt - Find programming articles and developer resources`
            : 'Search programming articles and developer resources on DevArt',
        keywords: query ? `${query}, programming, development, coding` : 'search, programming, development, coding, articles',
        openGraph: {
            title: query ? `Search results for "${query}" | DevArt` : 'Search | DevArt',
            description: query
                ? `Search results for "${query}" on DevArt`
                : 'Search programming articles and developer resources',
            type: 'website',
        },
    };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const query = params.q || '';
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

            {/* Search Header */}
            <div className="flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0">
                <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        {query ? `Search Results` : 'Search Articles'}
                    </h1>
                    {query && (
                        <p className="text-lg md:text-xl text-muted-foreground">
                            Results for &quot;{query}&quot;
                        </p>
                    )}
                </div>
                <div className="self-start md:self-auto">
                    <VisitorBadge />
                </div>
            </div>

            {/* Search Results */}
            {query ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Search Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ClientSearchResults query={query} page={currentPage} />
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