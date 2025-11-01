export async function GET() {
    const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://devto.30tools.com/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Allow all search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

# Block unnecessary paths
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: *.json$

# Allow important pages
Allow: /sitemap*.xml
Allow: /article/
Allow: /author/
Allow: /trending
Allow: /search`;

    return new Response(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400', // 24 hours
        },
    });
}