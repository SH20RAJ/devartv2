'use client';

import { useState, useEffect } from 'react';
import { DevToArticle } from '@/lib/types';

interface UseArticleOptions {
    username: string;
    slug: string;
    enabled?: boolean;
}

interface UseArticleResult {
    article: DevToArticle | null;
    loading: boolean;
    error: string | null;
}

export function useArticle({ username, slug, enabled = true }: UseArticleOptions): UseArticleResult {
    const [article, setArticle] = useState<DevToArticle | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!enabled || !username || !slug) return;

        const fetchArticle = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`https://dev.to/api/articles/${username}/${slug}`, {
                    headers: {
                        'Accept': 'application/json',
                        'User-Agent': 'DevArt-Blog/1.0 (https://devto.30tools.com)',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json() as DevToArticle;

                // Ensure tag_list is always an array
                if (data && typeof data.tag_list === 'string') {
                    data.tag_list = data.tag_list.split(',').map((tag: string) => tag.trim());
                }
                if (data && !data.tag_list) {
                    data.tag_list = [];
                }

                setArticle(data);
            } catch (err) {
                console.error('Error fetching article:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch article');
                setArticle(null);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [username, slug, enabled]);

    return { article, loading, error };
}