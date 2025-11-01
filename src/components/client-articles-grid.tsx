'use client';

import { useArticles } from '@/hooks/use-articles';
import { ArticleCard } from '@/components/article-card';
import { LoadingSkeleton } from '@/components/loading-skeleton';
import { ApiStatusNotice } from '@/components/api-status-notice';
import { Pagination } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface ClientArticlesGridProps {
    type: 'latest' | 'top';
    page: number;
    baseUrl: string;
    searchParams?: Record<string, string>;
}

export function ClientArticlesGrid({ type, page, baseUrl, searchParams = {} }: ClientArticlesGridProps) {
    const { articles, loading, error, hasMore } = useArticles({
        page,
        perPage: 12,
        type,
        enabled: true
    });

    const isUsingFallback = articles.length === 2 && articles[0]?.id === 1;

    if (loading && articles.length === 0) {
        return <LoadingSkeleton count={12} />;
    }

    return (
        <div className="space-y-6">
            {error && (
                <ApiStatusNotice
                    show={true}
                    message={`Error loading articles: ${error}. ${isUsingFallback ? 'Showing sample articles below.' : ''}`}
                />
            )}

            {isUsingFallback && (
                <ApiStatusNotice
                    show={true}
                    message="We're currently experiencing issues with the Dev.to API. Showing sample articles below."
                />
            )}

            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>

            {loading && articles.length > 0 && (
                <div className="flex justify-center py-4">
                    <RefreshCw className="h-6 w-6 animate-spin" />
                </div>
            )}

            {!isUsingFallback && !loading && articles.length > 0 && (
                <Pagination
                    currentPage={page}
                    totalPages={hasMore ? page + 1 : page}
                    baseUrl={baseUrl}
                    searchParams={searchParams}
                />
            )}

            {!loading && articles.length === 0 && !error && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No articles found.</p>
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
        </div>
    );
}