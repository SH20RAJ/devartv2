'use client';

import { useState, useEffect } from 'react';
import { DevToArticle } from '@/lib/types';

interface UseSearchOptions {
    query: string;
    page?: number;
    perPage?: number;
    enabled?: boolean;
}

interface UseSearchResult {
    articles: DevToArticle[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
}

export function useSearch({
    query,
    page = 1,
    perPage = 12,
    enabled = true
}: UseSearchOptions): UseSearchResult {
    const [articles, setArticles] = useState<DevToArticle[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (!enabled || !query.trim()) {
            setArticles([]);
            return;
        }

        const fetchSearchResults = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://dev.to/api/articles?page=${page}&per_page=${perPage}&tag=${encodeURIComponent(query)}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'User-Agent': 'DevArt-Blog/1.0 (https://devto.30tools.com)',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json() as DevToArticle[];

                // Ensure tag_list is always an array
                const processedArticles = data.map((article) => ({
                    ...article,
                    tag_list: Array.isArray(article.tag_list)
                        ? article.tag_list
                        : typeof article.tag_list === 'string'
                            ? article.tag_list.split(',').map((tag: string) => tag.trim())
                            : []
                }));

                if (page === 1) {
                    setArticles(processedArticles);
                } else {
                    setArticles(prev => [...prev, ...processedArticles]);
                }

                setHasMore(processedArticles.length === perPage);
            } catch (err) {
                console.error('Error searching articles:', err);
                setError(err instanceof Error ? err.message : 'Failed to search articles');

                if (page === 1) {
                    setArticles([]);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query, page, perPage, enabled]);

    return { articles, loading, error, hasMore };
}