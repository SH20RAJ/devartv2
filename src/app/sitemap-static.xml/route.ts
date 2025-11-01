export async function GET() {
    const baseUrl = 'https://devto.30tools.com';
    const currentDate = new Date().toISOString();

    // Static pages
    const staticPages = [
        { url: '', priority: '1.0', changefreq: 'daily' },
        { url: '/trending', priority: '0.8', changefreq: 'daily' },
        { url: '/authors', priority: '0.7', changefreq: 'weekly' },
        { url: '/search', priority: '0.6', changefreq: 'weekly' },
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400', // 24 hours
        },
    });
}