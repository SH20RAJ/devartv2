import { notFound } from "next/navigation";
import { DevToAPI } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SyntaxHighlighter } from "@/components/syntax-highlighter";
import { VisitorBadge } from "@/components/visitor-badge";
import { Heart, MessageCircle, Clock, ExternalLink, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface ArticlePageProps {
    params: Promise<{
        username: string;
        slug: string;
    }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
    const { username, slug } = await params;
    const article = await DevToAPI.getArticle(username, slug);

    if (!article) {
        return {
            title: "Article Not Found | DevArt",
            description: "The requested article could not be found.",
        };
    }

    const publishedDate = new Date(article.published_at);
    const keywords = article.tag_list?.join(', ') || 'programming, development, coding';

    return {
        title: `${article.title} | DevArt`,
        description: article.description || `Read ${article.title} by ${article.user.name} on DevArt`,
        keywords: keywords,
        authors: [{ name: article.user.name, url: `https://devto.30tools.com/author/${article.user.username}` }],
        creator: article.user.name,
        publisher: 'DevArt',
        openGraph: {
            title: article.title,
            description: article.description || `Read ${article.title} by ${article.user.name}`,
            type: 'article',
            publishedTime: publishedDate.toISOString(),
            authors: [article.user.name],
            tags: article.tag_list || [],
            images: article.cover_image ? [
                {
                    url: article.cover_image,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                }
            ] : [],
            url: `https://devto.30tools.com/article/${username}/${slug}`,
            siteName: 'DevArt',
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.description || `Read ${article.title} by ${article.user.name}`,
            images: article.cover_image ? [article.cover_image] : [],
            creator: article.user.twitter_username ? `@${article.user.twitter_username}` : undefined,
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
    const article = await DevToAPI.getArticle(username, slug);

    if (!article) {
        notFound();
    }

    const publishedDate = new Date(article.published_at);
    const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });

    // Structured data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.description,
        "image": article.cover_image ? [article.cover_image] : [],
        "datePublished": publishedDate.toISOString(),
        "dateModified": article.edited_at ? new Date(article.edited_at).toISOString() : publishedDate.toISOString(),
        "author": {
            "@type": "Person",
            "name": article.user.name,
            "url": `https://devto.30tools.com/author/${article.user.username}`,
            "image": article.user.profile_image,
        },
        "publisher": {
            "@type": "Organization",
            "name": "DevArt",
            "url": "https://devto.30tools.com",
            "logo": {
                "@type": "ImageObject",
                "url": "https://devto.30tools.com/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://devto.30tools.com/article/${username}/${slug}`
        },
        "keywords": article.tag_list?.join(', ') || 'programming, development, coding',
        "wordCount": article.body_markdown?.length || 0,
        "timeRequired": `PT${article.reading_time_minutes}M`,
        "interactionStatistic": [
            {
                "@type": "InteractionCounter",
                "interactionType": "https://schema.org/LikeAction",
                "userInteractionCount": article.public_reactions_count
            },
            {
                "@type": "InteractionCounter",
                "interactionType": "https://schema.org/CommentAction",
                "userInteractionCount": article.comments_count
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <div className="container mx-auto py-8 px-4 max-w-4xl">
                <div className="space-y-8">
                    {/* Back Button */}
                    <Button variant="ghost" asChild className="mb-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <ArrowLeft className="h-4 w-4" />
                            <span>Back to Articles</span>
                        </Link>
                    </Button>

                    {/* Article Header */}
                    <div className="space-y-6">
                        {article.cover_image && (
                            <div className="relative overflow-hidden rounded-lg">
                                <img
                                    src={article.cover_image}
                                    alt={article.title}
                                    className="w-full h-64 md:h-96 object-cover"
                                />
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {(article.tag_list || []).map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex items-start justify-between gap-4">
                                <h1 className="text-3xl md:text-4xl font-bold leading-tight flex-1">
                                    {article.title}
                                </h1>
                                <VisitorBadge className="flex-shrink-0" />
                            </div>

                            <p className="text-xl text-muted-foreground">
                                {article.description}
                            </p>

                            {/* Author Info */}
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <Link href={`/author/${article.user.username}`}>
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={article.user.profile_image_90} alt={article.user.name} />
                                                    <AvatarFallback>{article.user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            </Link>

                                            <div>
                                                <Link
                                                    href={`/author/${article.user.username}`}
                                                    className="text-lg font-semibold hover:text-primary transition-colors"
                                                >
                                                    {article.user.name}
                                                </Link>
                                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                    <span className="flex items-center space-x-1">
                                                        <Calendar className="h-3 w-3" />
                                                        <span>{timeAgo}</span>
                                                    </span>
                                                    <span className="flex items-center space-x-1">
                                                        <Clock className="h-3 w-3" />
                                                        <span>{article.reading_time_minutes} min read</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-4 text-sm">
                                                <span className="flex items-center space-x-1">
                                                    <Heart className="h-4 w-4" />
                                                    <span>{article.public_reactions_count}</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <MessageCircle className="h-4 w-4" />
                                                    <span>{article.comments_count}</span>
                                                </span>
                                            </div>

                                            <Button variant="outline" size="sm" asChild>
                                                <a href={article.url} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="h-4 w-4 mr-2" />
                                                    View on Dev.to
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <Separator />

                    {/* Article Content */}
                    <Card>
                        <CardContent className="pt-6">
                            <SyntaxHighlighter>
                                <div
                                    className="prose prose-lg max-w-none"
                                    dangerouslySetInnerHTML={{ __html: article.body_html || '' }}
                                />
                            </SyntaxHighlighter>
                        </CardContent>
                    </Card>

                    {/* Article Footer */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                    <span className="flex items-center space-x-2 text-lg">
                                        <Heart className="h-5 w-5" />
                                        <span>{article.public_reactions_count} reactions</span>
                                    </span>
                                    <span className="flex items-center space-x-2 text-lg">
                                        <MessageCircle className="h-5 w-5" />
                                        <span>{article.comments_count} comments</span>
                                    </span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Button asChild>
                                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            Discuss on Dev.to
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}