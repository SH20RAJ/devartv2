import { DevToAPI } from "@/lib/api";

export async function GET() {
    try {
        // Fetch articles for sitemap with timeout
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

        // Deduplicate articles
        const uniqueArticles = articles.filter((article, index, self) =>
            index === self.findIndex(a => a.id === article.id)
        );

        const baseUrl = 'https://devto.30tools.com';

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${uniqueArticles
                .map(
                    (article) => `
  <url>
    <loc>${baseUrl}/article/${article.user.username}/${article.slug}</loc>
    <lastmod>${new Date(article.published_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${article.cover_image ? `
    <image:image>
      <image:loc>${article.cover_image}</image:loc>
      <image:title>${article.title.replace(/[<>&"']/g, (match) => {
                        const entities: Record<string, string> = {
                            '<': '&lt;',
                            '>': '&gt;',
                            '&': '&amp;',
                            '"': '&quot;',
                            "'": '&apos;'
                        };
                        return entities[match];
                    })}</image:title>
      <image:caption>${(article.description || '').replace(/[<>&"']/g, (match) => {
                        const entities: Record<string, string> = {
                            '<': '&lt;',
                            '>': '&gt;',
                            '&': '&amp;',
                            '"': '&quot;',
                            "'": '&apos;'
                        };
                        return entities[match];
                    })}</image:caption>
    </image:image>` : ''}
    ${isRecentArticle(article.published_at) ? `
    <news:news>
      <news:publication>
        <news:name>DevArt</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(article.published_at).toISOString()}</news:publication_date>
      <news:title>${article.title.replace(/[<>&"']/g, (match) => {
                        const entities: Record<string, string> = {
                            '<': '&lt;',
                            '>': '&gt;',
                            '&': '&amp;',
                            '"': '&quot;',
                            "'": '&apos;'
                        };
                        return entities[match];
                    })}</news:title>
      <news:keywords>${(article.tag_list || []).join(', ')}</news:keywords>
    </news:news>` : ''}
  </url>`
                )
                .join('')}
</urlset>`;

        return new Response(sitemap, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600', // 1 hour
            },
        });
    } catch (error) {
        console.error('Error generating articles sitemap:', error);

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

// Helper function to check if article is recent (within 2 days for news sitemap)
function isRecentArticle(publishedAt: string): boolean {
    const publishedDate = new Date(publishedAt);
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    return publishedDate > twoDaysAgo;
}