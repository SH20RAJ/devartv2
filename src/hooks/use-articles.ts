'use client';

import { useState, useEffect } from 'react';
import { DevToArticle } from '@/lib/types';

interface UseArticlesOptions {
    page?: number;
    perPage?: number;
    type?: 'latest' | 'top';
    enabled?: boolean;
}

interface UseArticlesResult {
    articles: DevToArticle[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
}

export function useArticles({
    page = 1,
    perPage = 12,
    type = 'latest',
    enabled = true
}: UseArticlesOptions = {}): UseArticlesResult {
    const [articles, setArticles] = useState<DevToArticle[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (!enabled) return;

        const fetchArticles = async () => {
            setLoading(true);
            setError(null);

            try {
                const endpoint = type === 'latest'
                    ? `https://dev.to/api/articles/latest?page=${page}&per_page=${perPage}`
                    : `https://dev.to/api/articles?page=${page}&per_page=${perPage}&top=7`;

                const response = await fetch(endpoint, {
                    headers: {
                        'Accept': 'application/json',
                        'User-Agent': 'DevArt-Blog/1.0 (https://devto.30tools.com)',
                    },
                });

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
                console.error('Error fetching articles:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch articles');

                // Fallback data on error
                if (page === 1) {
                    setArticles(getFallbackArticles());
                }
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [page, perPage, type, enabled]);

    return { articles, loading, error, hasMore };
}

// Fallback data when API fails
function getFallbackArticles(): DevToArticle[] {
    return [
        {
            id: 1,
            title: "Getting Started with React Hooks",
            description: "Learn the basics of React Hooks and how to use them effectively in your applications.",
            url: "https://dev.to/example/getting-started-with-react-hooks",
            slug: "getting-started-with-react-hooks",
            user: {
                name: "John Developer",
                username: "johndev",
                twitter_username: "johndev",
                github_username: "johndev",
                user_id: 1,
                website_url: "https://johndev.com",
                profile_image: "https://via.placeholder.com/150",
                profile_image_90: "https://via.placeholder.com/90"
            },
            tag_list: ["react", "javascript", "hooks", "frontend"],
            tags: "react, javascript, hooks, frontend",
            published_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            edited_at: null,
            crossposted_at: null,
            last_comment_at: new Date().toISOString(),
            social_image: "https://via.placeholder.com/1000x420",
            canonical_url: "https://dev.to/example/getting-started-with-react-hooks",
            comments_count: 15,
            positive_reactions_count: 42,
            public_reactions_count: 42,
            page_views_count: 1250,
            published_timestamp: new Date().toISOString(),
            body_markdown: "# Getting Started with React Hooks\n\nReact Hooks are a powerful feature...",
            body_html: "<h1>Getting Started with React Hooks</h1><p>React Hooks are a powerful feature...</p>",
            ltag_style: [],
            ltag_script: [],
            reading_time_minutes: 5,
            organization: null,
            flare_tag: null,
            collection_id: null
        },
        {
            id: 2,
            title: "Building Modern Web Applications with Next.js",
            description: "Explore the features of Next.js and learn how to build fast, scalable web applications.",
            url: "https://dev.to/example/building-modern-web-applications-with-nextjs",
            slug: "building-modern-web-applications-with-nextjs",
            user: {
                name: "Sarah Frontend",
                username: "sarahfe",
                twitter_username: "sarahfe",
                github_username: "sarahfe",
                user_id: 2,
                website_url: "https://sarahfe.dev",
                profile_image: "https://via.placeholder.com/150",
                profile_image_90: "https://via.placeholder.com/90"
            },
            tag_list: ["nextjs", "react", "javascript", "webdev"],
            tags: "nextjs, react, javascript, webdev",
            published_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            edited_at: null,
            crossposted_at: null,
            last_comment_at: new Date().toISOString(),
            social_image: "https://via.placeholder.com/1000x420",
            canonical_url: "https://dev.to/example/building-modern-web-applications-with-nextjs",
            comments_count: 23,
            positive_reactions_count: 67,
            public_reactions_count: 67,
            page_views_count: 2100,
            published_timestamp: new Date().toISOString(),
            body_markdown: "# Building Modern Web Applications with Next.js\n\nNext.js is a powerful React framework...",
            body_html: "<h1>Building Modern Web Applications with Next.js</h1><p>Next.js is a powerful React framework...</p>",
            ltag_style: [],
            ltag_script: [],
            reading_time_minutes: 8,
            organization: null,
            flare_tag: null,
            collection_id: null
        }
    ];
}