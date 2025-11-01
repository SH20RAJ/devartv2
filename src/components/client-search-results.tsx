'use client';

import { useSearch } from '@/hooks/use-search';
import { ArticleCard } from '@/components/article-card';
import { LoadingSkeleton } from '@/components/loading-skeleton';
import { ApiStatusNotice } from '@/components/api-status-notice';
import { Pagination } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { RefreshCw, Search } from 'lucide-react';

interface ClientSearchResultsProps {
    query: string;
    page: number;
}

export function ClientSearchResults({ query, page }: ClientSearchResultsProps) {
    const { articles, loading, error, hasMore } = useSearch({
        query,
        page,
        perPage: 12,
        enabled: !!query.trim()
    });

    if (!query.trim()) {
        return (
            <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Enter a search term to find articles</p>
            </div>
        );
    }

    if (loading && articles.length === 0) {
        return <LoadingSkeleton count={12} />;
    }

    return (
        <div className="space-y-6">
            {error && (
                <ApiStatusNotice
                    show={true}
                    message={`Error searching articles: ${error}`}
                />
            )}

            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    Search results for &quot;{query}&quot;
                    {!loading && articles.length > 0 && (
                        <span className="text-muted-foreground font-normal ml-2">
                            ({articles.length} result{articles.length !== 1 ? 's' : ''})
                        </span>
                    )}
                </h2>

                {loading && articles.length > 0 && (
                    <RefreshCw className="h-5 w-5 animate-spin" />
                )}
            </div>

            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>

            {!loading && articles.length === 0 && !error && (
                <div className="text-center py-12">
                    <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-2">No articles found for &quot;{query}&quot;</p>
                    <p className="text-sm text-muted-foreground">Try searching with different keywords</p>
                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => window.location.reload()}
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                    </Button>
                </div>
            )}

            {!loading && articles.length > 0 && hasMore && (
                <Pagination
                    currentPage={page}
                    totalPages={page + 1}
                    baseUrl="/search"
                    searchParams={{ q: query }}
                />
            )}
        </div>
    );
}