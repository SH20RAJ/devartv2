import { ClientArticleContent } from "@/components/client-article-content";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface ArticlePageProps {
    params: Promise<{
        username: string;
        slug: string;
    }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const { username, slug } = await params;

    // For client-side fetching, we provide basic SEO metadata
    // The client component will handle the actual article loading
    return {
        title: `Article by @${username} | DevArt`,
        description: `Read the latest article by @${username} on DevArt - your source for programming articles and developer insights.`,
        keywords: 'programming, development, coding, tutorials, javascript, python, react, nextjs, web development',
        authors: [{ name: username, url: `https://devto.30tools.com/author/${username}` }],
        creator: username,
        publisher: 'DevArt',
        openGraph: {
            title: `Article by @${username} | DevArt`,
            description: `Read the latest article by @${username} on DevArt - your source for programming articles and developer insights.`,
            type: 'article',
            url: `https://devto.30tools.com/article/${username}/${slug}`,
            siteName: 'DevArt',
        },
        twitter: {
            card: 'summary_large_image',
            title: `Article by @${username} | DevArt`,
            description: `Read the latest article by @${username} on DevArt - your source for programming articles and developer insights.`,
        },
        alternates: {
            canonical: `https://devto.30tools.com/article/${username}/${slug}`,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { username, slug } = await params;

    return (
        <div className="space-y-4">
            {/* Back Button */}
            <div className="container mx-auto px-4 pt-4">
                <Button variant="ghost" asChild>
                    <Link href="/" className="flex items-center space-x-2">
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Articles</span>
                    </Link>
                </Button>
            </div>

            {/* Client-side Article Content */}
            <ClientArticleContent username={username} slug={slug} />
        </div>
    );
}