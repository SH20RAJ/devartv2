"use client";

import { DevToArticle } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface ArticleCardProps {
    article: DevToArticle;
}

export function ArticleCard({ article }: ArticleCardProps) {
    const publishedDate = new Date(article.published_at);
    const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });

    return (
        <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm">
            <CardHeader className="space-y-4">
                {article.cover_image && (
                    <div className="relative overflow-hidden rounded-lg">
                        <img
                            src={article.cover_image}
                            alt={article.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                    </div>
                )}

                <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                        {(article.tag_list || []).slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                            </Badge>
                        ))}
                    </div>

                    <Link
                        href={`/article/${article.user.username}/${article.slug}`}
                        className="block"
                    >
                        <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                            {article.title}
                        </h3>
                    </Link>

                    <p className="text-muted-foreground text-sm line-clamp-2">
                        {article.description}
                    </p>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                    <Link href={`/author/${article.user.username}`}>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={article.user.profile_image_90} alt={article.user.name} />
                            <AvatarFallback>{article.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Link>

                    <div className="flex-1 min-w-0">
                        <Link
                            href={`/author/${article.user.username}`}
                            className="text-sm font-medium hover:text-primary transition-colors"
                        >
                            {article.user.name}
                        </Link>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{timeAgo}</span>
                            </span>
                            <span>{article.reading_time_minutes} min read</span>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between pt-0">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{article.public_reactions_count}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{article.comments_count}</span>
                    </span>
                </div>

                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={`/article/${article.user.username}/${article.slug}`}>
                            Read More
                        </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}