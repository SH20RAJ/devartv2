import { DevToAPI } from "@/lib/api";

export async function GET() {
    try {
        // Fetch articles to get unique authors
        const fetchWithTimeout = async (promise: Promise<unknown>, timeout = 10000) => {
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timeout')), timeout)
            );
            return Promise.race([promise, timeoutPromise]);
        };

        const [latestArticles, topArticles] = await Promise.allSettled([
            fetchWithTimeout(DevToAPI.getLatestArticles(1, 50)),
            fetchWithTimeout(DevToAPI.getTopArticles(1, 50)),
        ]);

        const articles = [
            ...(latestArticles.status === 'fulfilled' ? latestArticles.value : []),
            ...(topArticles.status === 'fulfilled' ? topArticles.value : [])
        ];

        // Get unique authors
        const uniqueAuthors = Array.from(
            new Map(articles.map(article => [
                article.user.username,
                {
                    username: article.user.username,
                    name: article.user.name,
                    lastArticleDate: article.published_at
                }
            ])).values()
        );

        const baseUrl = 'https://devto.30tools.com';

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${uniqueAuthors
                .map(
                    (author) => `
  <url>
    <loc>${baseUrl}/author/${author.username}</loc>
    <lastmod>${new Date(author.lastArticleDate).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
                )
                .join('')}
</urlset>`;

        return new Response(sitemap, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=7200, s-maxage=7200', // 2 hours
            },
        });
    } catch (error) {
        console.error('Error generating authors sitemap:', error);

        // Return empty sitemap if there's an error
        const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

        return new Response(emptySitemap, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=300', // 5 minutes on error
            },
        });
    }
}