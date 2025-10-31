import { notFound } from "next/navigation";
import { DevToAPI } from "@/lib/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
            title: "Article Not Found",
        };
    }

    return {
        title: `${article.title} | DevArt`,
        description: article.description,
        openGraph: {
            title: article.title,
            description: article.description,
            images: article.cover_image ? [article.cover_image] : [],
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

    return (
        <div className="container mx-auto py-8 max-w-4xl">
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

                        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                            {article.title}
                        </h1>

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
                        <div
                            className="prose prose-lg max-w-none dark:prose-invert"
                            dangerouslySetInnerHTML={{ __html: article.body_html || '' }}
                        />
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
    );
}