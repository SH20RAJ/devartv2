'use client';

import { useArticle } from '@/hooks/use-article';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SyntaxHighlighter } from '@/components/syntax-highlighter';
import { VisitorBadge } from '@/components/visitor-badge';
import { LoadingSkeleton } from '@/components/loading-skeleton';
import { ApiStatusNotice } from '@/components/api-status-notice';
import { Heart, MessageCircle, Clock, ExternalLink, Calendar, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface ClientArticleContentProps {
    username: string;
    slug: string;
}

export function ClientArticleContent({ username, slug }: ClientArticleContentProps) {
    const { article, loading, error } = useArticle({ username, slug, enabled: true });

    if (loading) {
        return (
            <div className="container mx-auto py-4 md:py-8 px-4 max-w-4xl">
                <div className="space-y-8">
                    <div className="h-8 bg-muted rounded animate-pulse" />
                    <div className="h-64 md:h-96 bg-muted rounded animate-pulse" />
                    <div className="space-y-4">
                        <div className="h-12 bg-muted rounded animate-pulse" />
                        <div className="h-6 bg-muted rounded animate-pulse w-3/4" />
                        <div className="h-20 bg-muted rounded animate-pulse" />
                    </div>
                    <LoadingSkeleton count={1} />
                </div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="container mx-auto py-4 md:py-8 px-4 max-w-4xl">
                <div className="space-y-8">
                    <ApiStatusNotice
                        show={true}
                        message={error || "Article not found or failed to load"}
                    />
                    <div className="text-center py-12">
                        <p className="text-muted-foreground mb-4">
                            {error ? "Failed to load article" : "Article not found"}
                        </p>
                        <div className="space-x-4">
                            <Button
                                variant="outline"
                                onClick={() => window.location.reload()}
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Try Again
                            </Button>
                            <Button asChild>
                                <Link href="/">
                                    Back to Home
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const publishedDate = new Date(article.published_at);
    const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });

    return (
        <div className="container mx-auto py-4 md:py-8 px-4 max-w-4xl">
            <div className="space-y-8">
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

                        <div className="flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0 gap-4">
                            <h1 className="text-2xl md:text-4xl font-bold leading-tight flex-1">
                                {article.title}
                            </h1>
                            <div className="self-start md:self-auto">
                                <VisitorBadge />
                            </div>
                        </div>

                        <p className="text-lg md:text-xl text-muted-foreground">
                            {article.description}
                        </p>

                        {/* Author Info */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
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
                                            <div className="flex flex-col space-y-1 md:flex-row md:items-center md:space-y-0 md:space-x-4 text-sm text-muted-foreground">
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

                                    <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4">
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
                        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
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
    );
}