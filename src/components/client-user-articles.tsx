'use client';

import { useUserArticles } from '@/hooks/use-user-articles';
import { ArticleCard } from '@/components/article-card';
import { LoadingSkeleton } from '@/components/loading-skeleton';
import { ApiStatusNotice } from '@/components/api-status-notice';
import { Pagination } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { RefreshCw, User } from 'lucide-react';

interface ClientUserArticlesProps {
    username: string;
    page: number;
}

export function ClientUserArticles({ username, page }: ClientUserArticlesProps) {
    const { articles, loading, error, hasMore } = useUserArticles({
        username,
        page,
        perPage: 12,
        enabled: !!username
    });

    if (loading && articles.length === 0) {
        return <LoadingSkeleton count={12} />;
    }

    return (
        <div className="space-y-6">
            {error && (
                <ApiStatusNotice
                    show={true}
                    message={`Error loading articles: ${error}`}
                />
            )}

            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    Articles by @{username}
                    {!loading && articles.length > 0 && (
                        <span className="text-muted-foreground font-normal ml-2">
                            ({articles.length} article{articles.length !== 1 ? 's' : ''})
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
                    <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-2">No articles found for @{username}</p>
                    <p className="text-sm text-muted-foreground">This user may not have published any articles yet</p>
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
                    baseUrl={`/author/${username}`}
                    searchParams={{}}
                />
            )}
        </div>
    );
}