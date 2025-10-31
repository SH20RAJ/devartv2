import { DevToAPI } from "@/lib/api";

export async function GET() {
    try {
        // Fetch articles for sitemap
        const [latestArticles, topArticles] = await Promise.all([
            DevToAPI.getLatestArticles(1, 100),
            DevToAPI.getTopArticles(1, 100),
        ]);

        // Combine and deduplicate articles
        const allArticles = [...latestArticles, ...topArticles];
        const uniqueArticles = allArticles.filter((article, index, self) =>
            index === self.findIndex(a => a.id === article.id)
        );

        // Get unique authors
        const uniqueAuthors = Array.from(
            new Set(uniqueArticles.map(article => article.user.username))
        );

        const baseUrl = 'https://dev.30tools.com';
        const currentDate = new Date().toISOString();

        // Static pages
        const staticPages = [
            { url: '', priority: '1.0', changefreq: 'daily' },
            { url: '/trending', priority: '0.8', changefreq: 'daily' },
            { url: '/authors', priority: '0.7', changefreq: 'weekly' },
            { url: '/search', priority: '0.6', changefreq: 'weekly' },
        ];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${staticPages
                .map(
                    (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
                )
                .join('')}
  ${uniqueArticles
                .map(
                    (article) => `
  <url>
    <loc>${baseUrl}/article/${article.user.username}/${article.slug}</loc>
    <lastmod>${new Date(article.published_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
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
    </image:image>` : ''}
  </url>`
                )
                .join('')}
  ${uniqueAuthors
                .map(
                    (username) => `
  <url>
    <loc>${baseUrl}/author/${username}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
                )
                .join('')}
</urlset>`;

        return new Response(sitemap, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            },
        });
    } catch (error) {
        console.error('Error generating sitemap:', error);

        // Return a basic sitemap if there's an error
        const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dev.30tools.com</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

        return new Response(basicSitemap, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=300',
            },
        });
    }
}