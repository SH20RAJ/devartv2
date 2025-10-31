import { DevToArticle } from './types';

const BASE_URL = 'https://dev.to/api';

export class DevToAPI {
    static async getLatestArticles(page = 1, perPage = 30): Promise<DevToArticle[]> {
        try {
            const response = await fetch(
                `${BASE_URL}/articles/latest?page=${page}&per_page=${perPage}`,
                { next: { revalidate: 300 } } // Cache for 5 minutes
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const articles = await response.json() as DevToArticle[];

            // Ensure tag_list is always an array for all articles
            return articles.map((article) => ({
                ...article,
                tag_list: Array.isArray(article.tag_list) ? article.tag_list :
                    typeof article.tag_list === 'string' ? article.tag_list.split(',').map((tag: string) => tag.trim()) : []
            }));
        } catch (error) {
            console.error('Error fetching latest articles:', error);
            return [];
        }
    }

    static async getTopArticles(page = 1, perPage = 30): Promise<DevToArticle[]> {
        try {
            const response = await fetch(
                `${BASE_URL}/articles?page=${page}&per_page=${perPage}&top=7`,
                { next: { revalidate: 600 } } // Cache for 10 minutes
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const articles = await response.json() as DevToArticle[];

            // Ensure tag_list is always an array for all articles
            return articles.map((article) => ({
                ...article,
                tag_list: Array.isArray(article.tag_list) ? article.tag_list :
                    typeof article.tag_list === 'string' ? article.tag_list.split(',').map((tag: string) => tag.trim()) : []
            }));
        } catch (error) {
            console.error('Error fetching top articles:', error);
            return [];
        }
    }

    static async searchArticles(query: string, page = 1, perPage = 30): Promise<DevToArticle[]> {
        try {
            const response = await fetch(
                `${BASE_URL}/articles?page=${page}&per_page=${perPage}&tag=${encodeURIComponent(query)}`,
                { next: { revalidate: 300 } }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const articles = await response.json() as DevToArticle[];

            // Ensure tag_list is always an array for all articles
            return articles.map((article) => ({
                ...article,
                tag_list: Array.isArray(article.tag_list) ? article.tag_list :
                    typeof article.tag_list === 'string' ? article.tag_list.split(',').map((tag: string) => tag.trim()) : []
            }));
        } catch (error) {
            console.error('Error searching articles:', error);
            return [];
        }
    }

    static async getArticle(username: string, slug: string): Promise<DevToArticle | null> {
        try {
            const response = await fetch(
                `${BASE_URL}/articles/${username}/${slug}`,
                { next: { revalidate: 3600 } } // Cache for 1 hour
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const article = await response.json() as DevToArticle;

            // Ensure tag_list is always an array
            if (article && typeof article.tag_list === 'string') {
                article.tag_list = article.tag_list.split(',').map((tag: string) => tag.trim());
            }
            if (article && !article.tag_list) {
                article.tag_list = [];
            }

            return article;
        } catch (error) {
            console.error('Error fetching article:', error);
            return null;
        }
    }

    static async getUserArticles(username: string, page = 1, perPage = 30): Promise<DevToArticle[]> {
        try {
            const response = await fetch(
                `${BASE_URL}/articles?username=${username}&page=${page}&per_page=${perPage}`,
                { next: { revalidate: 600 } }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const articles = await response.json() as DevToArticle[];

            // Ensure tag_list is always an array for all articles
            return articles.map((article) => ({
                ...article,
                tag_list: Array.isArray(article.tag_list) ? article.tag_list :
                    typeof article.tag_list === 'string' ? article.tag_list.split(',').map((tag: string) => tag.trim()) : []
            }));
        } catch (error) {
            console.error('Error fetching user articles:', error);
            return [];
        }
    }
}